import { HStack, Heading, Text } from "@chakra-ui/react"
import { useContext } from "react"

import { BlogListContext } from "./BlogList.Context"

export const BlogListHeader: React.FC = () => {
  const { items = [] } = useContext(BlogListContext)

  return (
    <HStack alignSelf={"start"} pt={6} pb={4} alignItems="flex-end">
      <Heading>Blogs</Heading>
      <Text fontSize="xl" pb={"1px"} color="blackAlpha.500">
        {items.length} items
      </Text>
    </HStack>
  )
}
