import { Heading, Text, Flex } from "@chakra-ui/react"
import { useContext } from "react"

import { LocationListContext } from "./LocationList.Context"
import { LocationListSearch } from "./LocationList.Search"
import { LocationListSort } from "./LocationList.Sort"

export const LocationListHeader: React.FC = () => {
  const { result } = useContext(LocationListContext)

  return (
    <Flex p={4} pb={0} gap={2} w={"full"} wrap={"wrap"}>
      <Flex align={"end"} gap={3} wrap={"wrap"}>
        <Heading>Locations</Heading>
        <Text fontSize={"xl"} pb={"1px"} color={"blackAlpha.500"}>
          {result?.LocationListPage?.items![0]?._children?.LocationItemPage?.total} items
        </Text>
      </Flex>

      <Flex align={"end"} gap={2} ml={"auto"}>
        <LocationListSearch />
        <LocationListSort />
      </Flex>
    </Flex>
  )
}
