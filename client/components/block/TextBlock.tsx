import { Text } from "@chakra-ui/react"

import { XHTMLContent } from "../shared/content/XHTMLContent"

export const TextBlock: BlockComponent<TextBlock> = ({ data }) => {
  return (
    <Text
      color={data.MainBody ? "inherit" : "red"}
      border={data.MainBody ? "inherit" : "1px solid red"}
    >
      <XHTMLContent>{data.MainBody || "Missing TextBlock data"}</XHTMLContent>
    </Text>
  )
}
