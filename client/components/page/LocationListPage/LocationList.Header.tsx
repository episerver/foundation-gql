import { Heading, Text, Container, Wrap, Flex, WrapItem } from "@chakra-ui/react"
import { useContext } from "react"

import { LocationListContext } from "./LocationList.Context"
import { LocationListSearch } from "./LocationList.Search"
import { LocationListSort } from "./LocationList.Sort"

export const LocationListHeader: React.FC = () => {
  const { result: { total = 0 } = {} } = useContext(LocationListContext)

  return (
    <Flex p={4} pb={0} gap={2} w={"full"} wrap={"wrap"}>
      <Flex align={"end"} gap={3} wrap={"wrap"}>
        <Heading>Locations</Heading>
        <Text fontSize={"xl"} pb={"1px"} color={"blackAlpha.500"}>
          {total} items
        </Text>
      </Flex>

      <Flex align={"end"} gap={2} ml={"auto"}>
        <LocationListSearch />
        <LocationListSort />
      </Flex>
    </Flex>
  )
}
