import { Flex, FlexProps } from "@chakra-ui/react"
import { ContentAreaItemModel } from "generated"

import { Block, BlockComponent } from "../../block"

type ContentAreaProps = {
  container?: FlexProps
  data?: ContentAreaItemModel[]
}

export const ContentArea: React.FC<ContentAreaProps> = ({ container, data }) => {
  return (
    <Flex direction={"column"} {...container}>
      {data?.map(({ ContentLink }) => (
        <Flex
          key={ContentLink?.Expanded?.ContentLink?.GuidValue}
          direction={"column"}
          align={"center"}
        >
          <BlockComponent data={ContentLink?.Expanded as Block} />
        </Flex>
      ))}
    </Flex>
  )
}
