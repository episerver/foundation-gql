import { SearchIcon } from "@chakra-ui/icons"
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  CloseButton,
  FlexProps,
  Flex,
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"

import { LocationListContext } from "./LocationList.Context"

export const LocationListSearch: React.FC<FlexProps> = (props) => {
  const {
    filters: [filters, setFilters],
  } = useContext(LocationListContext)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilters({
        ...filters,
        searchTerm: searchTerm && `%${searchTerm}%`,
      })
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [filters, searchTerm, setFilters])

  return (
    <Flex {...props}>
      <InputGroup maxW={300}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search.."
          value={searchTerm || ""}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filters.searchTerm && (
          <InputRightElement>
            <CloseButton onClick={() => setSearchTerm("")} />
          </InputRightElement>
        )}
      </InputGroup>
    </Flex>
  )
}
