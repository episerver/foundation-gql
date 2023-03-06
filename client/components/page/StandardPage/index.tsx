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
import { useRouter } from "client/hooks/optimizely/useRouter";
import { RouteProps } from "client/routeMap";
import { Locales, useStandardPageQueryQuery } from "generated"

export default function StandardPage({ route }: RouteProps) {
  const { locale } = useRouter()
  const { data } = useStandardPageQueryQuery({
    variables: {
      locale: locale as Locales,
      id: route!.ContentLink!.GuidValue!
    }
  });
  const content = data?.StandardPage?.items![0]

  return (
    <Container maxW={"container.lg"} mb={10}>
      <Heading textAlign={"left"} my={10}>
        {content?.Name}
      </Heading>

      <Flex maxH={300} mb={5}>
        <Image fit={"cover"} w={"full"} src={content?.PageImage?.Url ?? ''} alt="" />
      </Flex>

      <XHTMLContent pb={10}>{content?.MainBody ?? ''}</XHTMLContent>

      <VStack spacing={4} align="stretch">
        {content?.MainContentArea?.map((item) => (
          <LinkBox key={item?.ContentLink?.Expanded?.__typename == 'StandardPage' ? item?.ContentLink?.Expanded?.ContentLink?.GuidValue : ''} height={500} color={"white"}>
            <LinkOverlay href={item?.ContentLink?.Expanded?.__typename == 'StandardPage' ? item?.ContentLink?.Expanded?.RelativePath ?? '' : ''} as={NextLink} />
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
              <Heading>{item?.ContentLink?.Expanded?.__typename == 'StandardPage' ? item?.ContentLink?.Expanded?.Name ?? '' : ''}</Heading>
              <Text>{item?.ContentLink?.Expanded?.__typename == 'StandardPage' ? item?.ContentLink?.Expanded?.TeaserText ?? '' : ''}</Text>
              <Text py={3} px={5} bgColor={"whiteAlpha.500"} borderRadius={5}>
                {item?.ContentLink?.Expanded?.__typename == 'StandardPage' ? item?.ContentLink?.Expanded?.TeaserButtonText ?? '' : ''}
              </Text>
            </VStack>
            <Image fit="cover" w={"full"} h={"full"} src={item?.ContentLink?.Expanded?.__typename == 'StandardPage' ? item?.ContentLink?.Expanded?.PageImage?.Url ?? '' : ''} alt="" />
          </LinkBox>
        ))}
      </VStack>
    </Container>
  )
}
