import { useQuery } from "@apollo/client"
import { Progress } from "@chakra-ui/react"
import Head from "next/head"
import { useState } from "react"

import { DynamicContent } from "../DynamicContent"

import { Navbar, NavItem } from "./Navbar"

import { LayoutContext } from "client/context/Layout.Context"
import { useRouter } from "client/hooks/optimizely/useRouter"
import LayoutQuery from "gql/LayoutQuery.gql"

type LayoutQueryResult = {
  HomePage: Items<Content & Children<{ Content: Items<Content> }>>
}

const excludedContentTypes = ["Content", "Page"]

const mapNavItem =
  (activePath: string) =>
  (item: Content): NavItem => ({
    label: item.Name,
    active: item.RouteSegment === activePath,
    href: item.RouteSegment,
    contentType: item.ContentType.find((x) => !excludedContentTypes.includes(x)),
  })

export const Layout: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { router, path } = useRouter()
  const { data } = useQuery<LayoutQueryResult>(LayoutQuery)

  if (data) {
    const root = data.HomePage.items[0]
    const home = mapNavItem(path)(root)
    const items = root._children.Content.items.map(mapNavItem(path))
    const route = [home, ...items].find((x) => x.active)

    if (route) {
      return (
        <LayoutContext.Provider value={{ loading: [loading, setLoading] }}>
          <Head>
            <title>{route.label}</title>
          </Head>

          <Navbar home={home} items={items} />
          {loading && <Progress size="xs" colorScheme={"yellow"} isIndeterminate />}
          <DynamicContent contentType={route.contentType} />

          {/* <Footer /> */}
        </LayoutContext.Provider>
      )
    }

    router.push(home.href!)
  }

  return null
}
