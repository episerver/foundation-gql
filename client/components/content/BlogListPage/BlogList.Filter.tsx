import { HStack, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react"
import { useContext } from "react"

import { BlogListContext } from "./BlogList.Context"

import { useLayout } from "client/hooks/optimizely/useLayout"

type FilterTag = {
  display: string
  onRemove: Function
}

const FilterTag: React.FC<FilterTag> = ({ display, onRemove }) => {
  return (
    <Tag size={"lg"} variant="subtle" colorScheme="blue">
      <TagLabel>{display}</TagLabel>
      <TagCloseButton onClick={() => onRemove()} />
    </Tag>
  )
}

export const BlogListFilter: React.FC = () => {
  const {
    loading: [loading],
  } = useLayout()

  const {
    filters: [filters, setFilters],
  } = useContext(BlogListContext)

  return !loading && filters && Object.keys(filters).length ? (
    <HStack alignSelf={"start"} mx={35} mt={25}>
      {filters.authors?.map((val, index) => (
        <FilterTag
          key={index}
          display={val}
          onRemove={() => {
            const { authors: oldAuthors, ...newFilters } = filters
            const authors = oldAuthors?.filter((x) => x !== val)
            setFilters({
              ...newFilters,
              ...(authors?.length ? { authors } : undefined),
            })
          }}
        />
      ))}
    </HStack>
  ) : null
}
