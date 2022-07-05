import { LinkBox, LinkOverlay, Tag, VStack } from "@chakra-ui/react"

import { NextLink } from "../NextLink"

import { XHTMLContent } from "./XHTMLContent"

type ContentListProps = {
  data?: ContentListItemProps[]
}

type ContentListItemProps = Content & {
  Body?: string
}

const ContentListItem: React.FC<ContentListItemProps> = (item) => (
  <LinkBox minH={100} w={"full"} borderWidth={1} borderRadius={10} p={4}>
    <LinkOverlay href={item.RelativePath} as={NextLink} />
    <Tag ml={"auto"} colorScheme={"teal"}>
      {item.Name}
    </Tag>
    <XHTMLContent>{item.Body}</XHTMLContent>
  </LinkBox>
)

export const ContentList: React.FC<ContentListProps> = ({ data }) => {
  return (
    <VStack gap={4}>
      {data?.map((item) => (
        <ContentListItem key={item.ContentLink.GuidValue} {...item} />
      ))}
    </VStack>
  )
}
