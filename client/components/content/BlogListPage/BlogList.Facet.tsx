import { VStack, StackDivider, Accordion } from "@chakra-ui/react"
import { useContext } from "react"

import { BlogListContext } from "./BlogList.Context"

import { Facet } from "client/components/shared/Facet"

export const BlogListFacet: React.FC = () => {
  const {
    facets,
    filters: [filters, setFilters],
  } = useContext(BlogListContext)

  const defaultIndex = [1, 2]

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      align={"stretch"}
      alignSelf={"start"}
      width={"300px"}
    >
      <Accordion defaultIndex={defaultIndex} allowMultiple>
        {facets.author && (
          <Facet
            type="select"
            title="author"
            values={facets.author}
            filters={filters.authors || []}
            onChange={(authors) => {
              setFilters({ ...filters, authors })
            }}
          />
        )}
      </Accordion>
    </VStack>
  )
}
