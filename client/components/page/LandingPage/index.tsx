import { Container } from "@chakra-ui/react"

import { ContentArea } from "client/components/shared/content/ContentArea"
import { useQuery } from "client/hooks/optimizely/useQuery"
import LandingPageQuery from "gql/LandingPageQuery.gql"

type LandingPageItem = {
  TopContentArea: ContentAreaItem<Block>[]
  MainContentArea: ContentAreaItem<Block>[]
}

type LandingPageQueryResult = {
  LandingPage: Items<LandingPageItem>
}

export default function LandingPage({ route }: RouteProps) {
  const { data } = useQuery<LandingPageQueryResult>(LandingPageQuery, {
    variables: {
      id: route?.id,
    },
  })
  const content = data?.LandingPage.items[0]

  return (
    <Container maxW={"container.xl"} mt={10}>
      <ContentArea data={content?.TopContentArea} />
      <ContentArea data={content?.MainContentArea} />
    </Container>
  )
}
