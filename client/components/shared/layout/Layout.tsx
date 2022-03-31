import { useQuery } from "@apollo/client"
import { Progress } from "@chakra-ui/react"
import Head from "next/head"
import { useEffect, useState } from "react"

import { DynamicContent } from "../DynamicContent"

import { Navbar } from "./Navbar"

import { LayoutContext } from "client/context/Layout.Context"
import { useRouter } from "client/hooks/optimizely/useRouter"
import { SiteMap } from "client/sitemap"
import LayoutQuery from "gql/LayoutQuery.gql"

type LayoutQueryResult = {
  HomePage: Items<NavigationItem>
}

export const Layout: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [sitemap, setSitemap] = useState<SiteMap>()
  const { path, locale } = useRouter()
  const { data } = useQuery<LayoutQueryResult>(LayoutQuery, {
    variables: {
      locale,
    },
  })

  useEffect(() => {
    const home = data?.HomePage.items[0]
    const siteMap = home && new SiteMap(home)
    setSitemap(siteMap)
  }, [data])

  if (sitemap) {
    const route = sitemap.getRoute(path)

    return (
      <LayoutContext.Provider
        value={{
          loading: [loading, setLoading],
        }}
      >
        <Head>
          <title>{route?.name}</title>
        </Head>

        <Navbar home={sitemap.home} path={path} locales={sitemap.locales} />
        {loading && <Progress size="xs" colorScheme={"yellow"} isIndeterminate />}
        <DynamicContent contentType={route?.contentType} />

        {/* <Footer /> */}
      </LayoutContext.Provider>
    )
  }

  return null
}
