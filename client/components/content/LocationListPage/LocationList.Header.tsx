import { HStack, Heading, Text } from "@chakra-ui/react"
import { useContext } from "react"

import { LocationListContext } from "./LocationList.Context"

export const LocationListHeader: React.FC = () => {
  const { items = [] } = useContext(LocationListContext)

  return (
    <HStack alignSelf={"start"} pt={6} pb={4} alignItems="flex-end">
      <Heading>Locations</Heading>
      <Text fontSize="xl" pb={"1px"} color="blackAlpha.500">
        {items.length} items
      </Text>
    </HStack>
  )
}
