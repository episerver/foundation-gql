import { useQuery } from "@apollo/client"
import { Progress } from "@chakra-ui/react"
import Error from "next/error"
import Head from "next/head"
import { lazy, Suspense, useState } from "react"

import { Navbar, NavItem } from "./Navbar"

import { LayoutContext } from "client/context/Layout.Context"
import { useRouter } from "client/hooks/optimizely/useRouter"
import LayoutQuery from "gql/LayoutQuery.gql"

type LayoutQueryResult = {
  HomePage: Items<Content & Children<{ Content: Items<Content> }>>
}

const excludedContentTypes = ["Content", "Page"]

const mapNavItem = (item: Content): NavItem => ({
  label: item.Name,
  href: item.RouteSegment,
  contentType: item.ContentType.find((x) => !excludedContentTypes.includes(x)),
})

export const Layout: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { router, path } = useRouter()
  const { data } = useQuery<LayoutQueryResult>(LayoutQuery)

  if (data) {
    const root = data.HomePage.items[0]
    const home = mapNavItem(root)
    const items = root._children.Content.items.map(mapNavItem)
    const route = [home, ...items].find((x) => x.href === path)

    if (route) {
      const Content = lazy(() =>
        import(`client/components/content/${route.contentType}`).catch(() => ({
          default: () => <Error statusCode={404}></Error>,
        }))
      )

      return (
        <LayoutContext.Provider value={{ loading: [loading, setLoading] }}>
          <Head>
            <title>{route.label}</title>
          </Head>

          <Navbar home={home} items={items} />
          {loading && <Progress size="xs" colorScheme={"yellow"} isIndeterminate />}

          <Suspense fallback={<></>}>
            <Content />
          </Suspense>

          {/* <Footer /> */}
        </LayoutContext.Provider>
      )
    }

    router.push(home.href!)
  }

  return null
}
