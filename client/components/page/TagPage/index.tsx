import { Container, Heading, Text } from "@chakra-ui/react"

import { XHTMLContent } from "client/components/shared/content/XHTMLContent"

import { useQuery } from "client/hooks/optimizely/useQuery"
import TagPageQuery from "gql/TagPageQuery.gql"

type TagPageQueryResult = {
  TagPage: Items<{
    Name: string
    MainIntro: string
    MainBody: string
  }>
}

export default function TagPage({ route }: RouteProps) {
  const { data } = useQuery<TagPageQueryResult>(TagPageQuery, {
    variables: {
      id: route?.id,
    },
  })

  const content = data?.TagPage.items[0]

  return (
    <Container maxW={"md"}>
      <Heading my={10}>{content?.Name}</Heading>
      <Text mb={10} fontSize={"xl"}>
        {content?.MainIntro}
      </Text>
      <XHTMLContent>{content?.MainBody}</XHTMLContent>
    </Container>
  )
}
