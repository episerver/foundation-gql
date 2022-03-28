import { HStack, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { BlogListContainer } from "./BlogList.Container"
import { BlogListContext } from "./BlogList.Context"
import { BlogListFacet } from "./BlogList.Facet"
import { BlogListFilter } from "./BlogList.Filter"
import { BlogListHeader } from "./BlogList.Header"

import { useQuery } from "client/hooks/optimizely/useQuery"
import BlogsQuery from "gql/BlogsQuery.gql"

type BlogListQueryResult = {
    BlogListPage: BlogListPage
}

export default function BlogListPage() {
  const [items, setItems] = useState<BlogItemPage[]>([])
  const [facets, setFacets] = useState<Partial<BlogFacets>>({})
  const [filters, setFilters] = useState<Partial<BlogFilter>>({})

  const { data } = useQuery<BlogListQueryResult>(BlogsQuery, {
    variables: filters,
  })

  useEffect(() => {
    let items: BlogItemPage[] = []

    data?.BlogListPage.items.forEach(x => {
        x._children.BlogListPage.items.forEach(y => {
            y._children.BlogItemPage.items.forEach(z => {
                items.push(z)
            })
        })
    })

    setItems(items || [])
  }, [data])

  return (
    <BlogListContext.Provider value={{ filters: [filters, setFilters], facets, items }}>
      <HStack spacing={8}>
        <BlogListFacet />

        <VStack flex={1} alignSelf={"start"}>
          <BlogListHeader />
          <BlogListFilter />
          <BlogListContainer />
        </VStack>
      </HStack>
    </BlogListContext.Provider>
  )
}
