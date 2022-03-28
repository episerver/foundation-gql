import { Wrap, WrapItem } from "@chakra-ui/react"
import { useContext } from "react"

import { BlogListContext } from "./BlogList.Context"
import { BlogListItem } from "./BlogList.Item"

export const BlogListContainer: React.FC = () => {
  const { items = [] } = useContext(BlogListContext)

  return (
    <Wrap spacing={"30px"} align={"center"} justify={"center"} flex={1}>
      {items.map((item) => (
        <WrapItem key={item.BlogName} alignSelf={"start"}>
          <BlogListItem {...item} />
        </WrapItem>
      ))}
    </Wrap>
  )
}
