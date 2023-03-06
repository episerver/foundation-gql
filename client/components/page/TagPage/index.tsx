import { Container, Heading, Text } from "@chakra-ui/react"
import { XHTMLContent } from "client/components/shared/content/XHTMLContent"
import { useRouter } from "client/hooks/optimizely/useRouter";
import { RouteProps } from "client/routeMap";
import { Locales, useTagPageQueryQuery } from "generated"

export default function TagPage({ route }: RouteProps) {
  const { locale } = useRouter()
  const { data } = useTagPageQueryQuery({
    variables: {
      locale: locale as Locales,
      id: route!.ContentLink!.GuidValue!
    }
  });

  const content = data?.TagPage?.items![0]

  return (
    <Container maxW={"md"}>
      <Heading my={10}>{content?.Name}</Heading>
      <Text mb={10} fontSize={"xl"}>
        {content?.MainIntro}
      </Text>
      <XHTMLContent>{content?.MainBody ?? ''}</XHTMLContent>
    </Container>
  )
}
