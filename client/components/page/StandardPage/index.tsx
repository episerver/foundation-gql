import {
  Container,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/react"

import { XHTMLContent } from "client/components/shared/content/XHTMLContent"
import { NextLink } from "client/components/shared/NextLink"

import { useQuery } from "client/hooks/optimizely/useQuery"
import StandardPageQuery from "gql/StandardPageQuery.gql"

export default function StandardPage({ route }: RouteProps) {
  const { data } = useQuery<StandardPageResult>(StandardPageQuery, {
    variables: {
      id: route?.id,
    },
  })
  const content = data?.StandardPage.items[0]

  return (
    <Container maxW={"container.lg"} mb={10}>
      <Heading textAlign={"left"} my={10}>
        {content?.Name}
      </Heading>

      <Flex maxH={300} mb={5}>
        <Image fit={"cover"} w={"full"} src={content?.PageImage.Url} alt="" />
      </Flex>

      <XHTMLContent pb={10}>{content?.MainBody}</XHTMLContent>

      <VStack spacing={4} align="stretch">
        {content?.MainContentArea?.map(({ ContentLink: { GuidValue, Expanded } }, i) => (
          <LinkBox key={`${i}.${GuidValue}`} height={500} color={"white"}>
            <LinkOverlay href={Expanded.RelativePath} as={NextLink} />
            <VStack
              spacing={4}
              align={"start"}
              justify={"center"}
              pos={"absolute"}
              w={"full"}
              h={"full"}
              p={20}
              backdropFilter={"blur(2px) brightness(70%)"}
            >
              <Heading>{Expanded.Name}</Heading>
              <Text>{Expanded.TeaserText}</Text>
              <Text py={3} px={5} bgColor={"whiteAlpha.500"} borderRadius={5}>
                {Expanded.TeaserButtonText}
              </Text>
            </VStack>
            <Image fit="cover" w={"full"} h={"full"} src={Expanded.PageImage.Url} alt="" />
          </LinkBox>
        ))}
      </VStack>
    </Container>
  )
}
