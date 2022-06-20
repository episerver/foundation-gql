import { Box, Image, LinkBox, LinkOverlay, SimpleGrid, Text } from "@chakra-ui/react"

import { useQuery } from "client/hooks/optimizely/useQuery"
import StandardPageQuery from "gql/StandardPageQuery.gql"

type StandardPageItem = ContentLink & {
  Name: string
  PageImage: {
    Url: string
  }
  RelativePath: string
  TeaserText: string
}

type StandardPageQueryResult = {
  StandardPage: Items<StandardPageItem>
}

export const PageListBlock: BlockComponent<PageListBlock> = (props) => {
  const { data } = useQuery<StandardPageQueryResult>(StandardPageQuery, {
    variables: {
      limit: props.data.Count,
      ancestors: props.data.Roots[0].ContentLink.GuidValue,
    },
  })

  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing={1}>
      {data?.StandardPage.items.map((item) => (
        <LinkBox key={item.ContentLink.GuidValue} pos={"relative"} height={300} color={"white"}>
          <LinkOverlay href={item.RelativePath} />
          <Box pos={"absolute"} w={"100%"} h={"100%"} backdropFilter={"blur(2px) brightness(70%)"}>
            <Text
              px={5}
              py={5}
              fontSize={"1.2em"}
              //   backgroundColor={"#ffffffbd"}
              color={"white"}
              textShadow={"2px 2px 5px black"}
            >
              {item.TeaserText}
            </Text>
            <Text
              pos={"absolute"}
              fontSize={"1.5em"}
              px={5}
              py={3}
              backgroundColor={"#000000cf"}
              bottom={0}
              zIndex={1}
            >
              {item.Name}
            </Text>
          </Box>
          <Image fit="cover" w={"100%"} h={"100%"} src={item.PageImage.Url} alt="" />
        </LinkBox>
      ))}
    </SimpleGrid>
  )
}
