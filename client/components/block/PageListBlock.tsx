import {
  Box,
  Divider,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react"

import { NextLink } from "../shared/NextLink"

import { useQuery } from "client/hooks/optimizely/useQuery"
import PageListQuery from "gql/PageListQuery.gql"

export const PageListBlock: BlockComponent<PageListBlock> = (props) => {
  const { data } = useQuery<PageListResult>(PageListQuery, {
    variables: {
      limit: props.data.Count,
      ancestors: props.data.Roots[0].ContentLink.GuidValue,
    },
  })

  return (
    <>
      <Heading>{props.data.Heading}</Heading>
      <Divider my={4} />
      <SimpleGrid columns={[1, 1, 2, 3]} spacing={1} w={"full"}>
        {data?.StandardPage.items.map((item) => (
          <LinkBox key={item.ContentLink.GuidValue} pos={"relative"} height={300} color={"white"}>
            <LinkOverlay href={item.RelativePath} as={NextLink} />
            <Box
              pos={"absolute"}
              w={"full"}
              h={"full"}
              backdropFilter={"blur(2px) brightness(70%)"}
            >
              <Text
                px={5}
                py={5}
                fontSize={"1.2em"}
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
            <Image fit="cover" w={"full"} h={"full"} src={item.PageImage.Url} alt="" />
          </LinkBox>
        ))}
      </SimpleGrid>
    </>
  )
}
