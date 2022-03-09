import { useQuery } from "@apollo/client"
import { Progress } from "@chakra-ui/react"
import Error from "next/error"
import Head from "next/head"
import { useState } from "react"

import { Navbar, NavItem } from "./Navbar"

import { LayoutContext } from "client/context/Layout.Context"
import { getContentComponent, getContentType } from "client/data/content.map"
import { useOptiRouter } from "client/hooks/useOptiRouter"
import LayoutQuery from "gql/LayoutQuery.gql"

type LayoutQueryResult = {
  HomePage: Items<Content & Children<{ Content: Items<Content> }>>
}

const mapNavItem = (item: Content): NavItem => ({
  label: item.Name,
  href: item.RouteSegment,
  contentType: getContentType(item),
})

export const Layout: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { router, path } = useOptiRouter()
  const { data } = useQuery<LayoutQueryResult>(LayoutQuery)

  if (data) {
    const root = data.HomePage.items[0]
    const home = mapNavItem(root)
    const items = root._children.Content.items.map(mapNavItem)
    const route = [home, ...items].find((x) => x.href === path)

    if (route) {
      const Component = getContentComponent(route.contentType)
      if (!Component) console.error("Unmapped content type: ", route.contentType)

      return (
        <LayoutContext.Provider value={{ loading: [loading, setLoading] }}>
          <Head>
            <title>{route.label}</title>
          </Head>

          <Navbar home={home} items={items} />
          {loading && <Progress size="xs" colorScheme={"yellow"} isIndeterminate />}
          {Component ? <Component /> : <Error statusCode={404} />}
          {/* <Footer /> */}
        </LayoutContext.Provider>
      )
    }

    if (!path) {
      router.push(home.href!)
    }
  }

  return null
}
