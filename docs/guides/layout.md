# Layout

All relative paths of contents are fetched at once on the load of site. After that, data is mapped to route object that will help to load content related components.

---

## Query

- Create `gql/fragments/ContentFragment.gql` file to select content data partially

  ```gql
  fragment ContentFragment on IContent {
    ContentLink {
      GuidValue
    }
    Name
    RouteSegment
    Url
    RelativePath
    ContentType
  }
  ```

- Create `gql/LayoutQuery.gql` file to fetch all partial content data

  ```gql
  #import "./fragments/ContentFragment.gql"

  query LayoutQuery($locale: [Locale] = [EN], $cursor: String = "", $limit: Int! = 100) {
    Content(
      locale: $locale
      where: { ContentType: { eq: "Page" } }
      cursor: $cursor
      limit: $limit
    ) {
      total
      cursor
      items {
        ...ContentFragment
        ParentLink {
          GuidValue
        }
        ExistingLanguages {
          DisplayName
          Name
        }
        MasterLanguage {
          DisplayName
          Name
        }
      }
    }
  }
  ```

  > `cursor` parameter is used to fetch all content data

## Component

- Create `Layout.tsx` file to render navigation components

  ```tsx
  import LayoutQuery from "gql/LayoutQuery.gql"

  export const Layout: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [routeMap, setRouteMap] = useState<RouteMap>()
    const { path, locale } = useRouter()
    const { data, fetchMore } = useQuery<LayoutQueryResult>(LayoutQuery, {
      variables: {
        locale,
      },
    })
  }
  ```

- Call `useEffect` hook to fetch all layout data with cursor.

  ```tsx
  useEffect(() => {
    if (data) {
      const { items, total, cursor } = data.Content

      if (items.length < total) {
        fetchMore({
          variables: { cursor },
        })
      } else {
        setRouteMap(new RouteMap(items))
      }
    }
  }, [data, fetchMore])
  ```

  > All required config to have `cursor` support within apollo client has been set up in `optiq.client.ts` file. You can check it out for further info.

- Render component

  ```tsx
  if (routeMap) {
    const route = routeMap.getRoute(path)

    return (
      <LayoutContext.Provider
        value={{
          loading: [loading, setLoading],
        }}
      >
        <Head>
          <title>{route?.name}</title>
        </Head>

        <Navbar home={routeMap.home!} path={path} locales={routeMap.locales} />

        {loading && <Progress size="xs" colorScheme={"yellow"} isIndeterminate />}

        <Flex justify={"center"} pb={10}>
          <Page route={route} />
        </Flex>
      </LayoutContext.Provider>
    )
  }

  return <Center h={"100vh"}>Loading...</Center>
  ```

  > `Page` component is a dynamic component which loads content specific component implementation respect to `route` object.
