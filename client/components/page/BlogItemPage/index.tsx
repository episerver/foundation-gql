import { Container, Flex, Heading, Image } from "@chakra-ui/react"
import { XHTMLContent } from "client/components/shared/content/XHTMLContent"
import { useRouter } from "client/hooks/optimizely/useRouter";
import { RouteProps } from "client/routeMap";
import { Locales, useBlogItemPageQueryQuery } from "generated"

export default function BlogItemPage({ route }: RouteProps) {
  const { locale } = useRouter()
  const { data } = useBlogItemPageQueryQuery({
    variables: {
      locale: locale as Locales,
      id: route!.ContentLink!.GuidValue!
    }
  });

  const content = data?.BlogItemPage?.items![0]

  return (
    <Container maxW={"container.lg"} mb={10}>
      <Heading textAlign={"left"} my={10}>
        {content?.Name}
      </Heading>

      <Flex maxH={300} mb={5}>
        <Image fit={"cover"} w={"full"} src={content?.PageImage?.Url ?? ''} alt="" />
      </Flex>

      <XHTMLContent pb={10}>{content?.MainBody ?? ''}</XHTMLContent>
    </Container>
  )
}
