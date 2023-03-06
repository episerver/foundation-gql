import { Container } from "@chakra-ui/react"
import { ContentArea } from "client/components/shared/content/ContentArea"
import { useRouter } from "client/hooks/optimizely/useRouter";
import { RouteProps } from "client/routeMap";
import { ContentAreaItemModel, Locales, useLandingPageQueryQuery } from "generated"

export default function LandingPage({ route }: RouteProps) {
  const { locale } = useRouter()
  const { data } = useLandingPageQueryQuery({
    variables: {
      locale: locale as Locales,
      id: route!.ContentLink!.GuidValue!
    }
  });

  const content = data?.LandingPage?.items![0]
  return (
    <Container maxW={"container.xl"} mt={10}>
      <ContentArea data={content?.TopContentArea as ContentAreaItemModel[]} />
      <ContentArea data={content?.MainContentArea as ContentAreaItemModel[]} />
    </Container>
  )
}
