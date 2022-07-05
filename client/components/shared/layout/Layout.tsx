import { useQuery } from "@apollo/client"
import { Center, Flex, Progress } from "@chakra-ui/react"
import Head from "next/head"
import { useEffect, useState } from "react"

import { Navbar } from "./Navbar"

import { Page } from "client/components/page"
import { LayoutContext } from "client/components/shared/layout/Layout.Context"
import { useRouter } from "client/hooks/optimizely/useRouter"
import { RouteMap } from "client/routeMap"
import LayoutQuery from "gql/LayoutQuery.gql"

type LayoutQueryResult = {
  Content: Items<NavigationItem> & Cursor & Total
}

export const Layout: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [routeMap, setRouteMap] = useState<RouteMap>()
  const { path, locale } = useRouter()
  const { data, fetchMore } = useQuery<LayoutQueryResult>(LayoutQuery, {
    variables: {
      locale,
    },
  })

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

        {/* <Footer /> */}
      </LayoutContext.Provider>
    )
  }

  return <Center h={"100vh"}>Loading...</Center>
}
