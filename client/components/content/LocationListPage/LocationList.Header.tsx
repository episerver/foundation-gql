import { SearchIcon } from "@chakra-ui/icons"
import {
  HStack,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Container,
  InputRightElement,
  CloseButton,
} from "@chakra-ui/react"
import { useContext } from "react"

import { LocationListContext } from "./LocationList.Context"

export const LocationListHeader: React.FC = () => {
  const {
    items = [],
    filters: [filters, setFilters],
  } = useContext(LocationListContext)

  const search = (text?: string) => setFilters({ ...filters, fullTextSearch: text || "" })

  return (
    <HStack alignSelf={"start"} pt={6} pb={4} alignItems="flex-end" w={"100%"}>
      <Heading>Locations</Heading>
      <Text fontSize="xl" pb={"1px"} color="blackAlpha.500">
        {items.length} items
      </Text>
      <Container w={300}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search.."
            value={filters.fullTextSearch || ""}
            onChange={(e) => search(e.target.value)}
          />
          {filters.fullTextSearch && (
            <InputRightElement>
              <CloseButton onClick={() => search()} />
            </InputRightElement>
          )}
        </InputGroup>
      </Container>
    </HStack>
  )
}
