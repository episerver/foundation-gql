import { Text } from "@chakra-ui/react"
import { TextBlock } from "generated"

import { XHTMLContent } from "../shared/content/XHTMLContent"

export const TextBlockComponent: React.FC<{data: TextBlock}> = ({data}) => {
  return (
    <Text
      color={data?.MainBody ? "inherit" : "red"}
      border={data?.MainBody ? "inherit" : "1px solid red"}
    >
      <XHTMLContent>{data?.MainBody ?? ''}</XHTMLContent>
    </Text>
  )
}
