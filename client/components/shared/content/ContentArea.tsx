import { Flex, FlexProps } from "@chakra-ui/react"

import { Block } from "../../block"

type ContentAreaProps = {
  container?: FlexProps
  data?: ContentAreaItem<Block>[]
}

export const ContentArea: React.FC<ContentAreaProps> = ({ container, data }) => {
  return (
    <Flex direction={"column"} {...container}>
      {data?.map(({ ContentLink }) => (
        <Flex
          key={ContentLink.Expanded.ContentLink.GuidValue}
          direction={"column"}
          align={"center"}
        >
          <Block data={ContentLink.Expanded} />
        </Flex>
      ))}
    </Flex>
  )
}
