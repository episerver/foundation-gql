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
import { LocationListSort } from "./LocationList.Sort"

export const LocationListHeader: React.FC = () => {
  const {
    result: { items = [], total = 0 } = {},
    filters: [filters, setFilters],
  } = useContext(LocationListContext)

  const search = (text?: string) => setFilters({ ...filters, fullTextSearch: text || "" })

  return (
    <HStack
      alignSelf={"start"}
      pt={6}
      pb={4}
      alignItems="flex-end"
      justifyContent={"space-between"}
      w={"100%"}
    >
      <HStack alignItems="flex-end">
        <Heading>Locations</Heading>
        <Text fontSize="xl" pb={"1px"} color="blackAlpha.500">
          {total} items
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
      <HStack px={10}>
        <LocationListSort />
      </HStack>
    </HStack>
  )
}
