import { Container, Flex, Heading, Image } from "@chakra-ui/react"

import { XHTMLContent } from "client/components/shared/content/XHTMLContent"
import { useQuery } from "client/hooks/optimizely/useQuery"

import BlogItemPageQuery from "gql/BlogItemPageQuery.gql"

type BlogItemPageItem = Content & {
  MainBody?: string
  PageImage: {
    Url: string
  }
}

type BlogItemPageQueryResult = {
  BlogItemPage: Items<BlogItemPageItem>
}

export default function BlogItemPage({ route }: RouteProps) {
  const { data } = useQuery<BlogItemPageQueryResult>(BlogItemPageQuery, {
    variables: {
      id: route?.id,
    },
  })

  const content = data?.BlogItemPage.items[0]

  return (
    <Container maxW={"container.lg"} mb={10}>
      <Heading textAlign={"left"} my={10}>
        {content?.Name}
      </Heading>

      <Flex maxH={300} mb={5}>
        <Image fit={"cover"} w={"full"} src={content?.PageImage.Url} alt="" />
      </Flex>

      <XHTMLContent pb={10}>{content?.MainBody}</XHTMLContent>
    </Container>
  )
}
