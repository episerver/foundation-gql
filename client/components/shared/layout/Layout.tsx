import { Center, Flex, Progress } from "@chakra-ui/react"
import Head from "next/head"
import { useEffect, useState } from "react"

import { Navbar } from "./Navbar"

import { Page } from "client/components/page"
import { LayoutContext } from "client/components/shared/layout/Layout.Context"
import { useRouter } from "client/hooks/optimizely/useRouter"
import { RouteMap } from "client/routeMap"
import { Content, ContentLanguageModel, IContent, Locales, useLayoutQueryQuery } from "generated"

export const Layout: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [routeMap, setRouteMap] = useState<RouteMap>()
  const { path, locale } = useRouter()

  const { data, fetchMore } = useLayoutQueryQuery({
    variables: {
      locale: locale as Locales
    }
  }); 

  useEffect(() => {
    if (data?.Content?.items && data?.Content?.total && data?.Content?.cursor) {

      const cursor = data.Content.cursor
      if (data.Content.items.length < data.Content.total) {
        fetchMore({
          variables: { cursor },
        })
      } else {
        let navigationItems: Array<IContent> = new Array<IContent>();
        data.Content.items.map(x => {
          const navigationItem: IContent = {
            ContentLink: { GuidValue: x?.ContentLink?.GuidValue} ,
            Name: x?.Name,
            RouteSegment: x?.RouteSegment,
            Url: x?.Url,
            RelativePath: x?.RelativePath,
            ContentType: x?.ContentType as string[],
            ParentLink: { GuidValue: x?.ParentLink?.GuidValue },
            ExistingLanguages: x?.ExistingLanguages as ContentLanguageModel[]
          }
          navigationItems.push(navigationItem)
        })
        setRouteMap(new RouteMap(navigationItems))
      }
    }
  }, [data, fetchMore])

  if (routeMap) {
    const route = routeMap.getRoute(path)

    return (
      <LayoutContext.Provider
        value={{
          loading: [loading, setLoading],
        }}
      >
        <Head>
          <title>{route?.Name}</title>
        </Head>

        <Navbar home={routeMap.home!} path={path} locales={routeMap.locales} />
        {loading && <Progress size="xs" colorScheme={"yellow"} isIndeterminate />}
        <Flex justify={"center"} pb={10}>
          <Page route={route} />
        </Flex>

        {/* <Footer /> */}
      </LayoutContext.Provider>
    )
  }

  return <Center h={"100vh"}>Loading...</Center>
}
