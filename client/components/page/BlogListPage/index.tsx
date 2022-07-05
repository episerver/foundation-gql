import { Container } from "@chakra-ui/react"

import { ContentList } from "client/components/shared/content/ContentList"
import { useQuery } from "client/hooks/optimizely/useQuery"
import BlogListPageQuery from "gql/BlogListPageQuery.gql"

type BlogListPageItem = Content & {
  MainBody: string
}

type BlogListPageQueryResult = {
  Content: Items<BlogListPageItem>
}

export default function BlogListPage({ route }: RouteProps) {
  const { data } = useQuery<BlogListPageQueryResult>(BlogListPageQuery, {
    variables: {
      id: route?.id,
    },
  })

  return (
    <Container maxW={"lg"} mt={10}>
      <ContentList
        data={data?.Content.items.map((item) => ({
          ...item,
          Body: item.MainBody,
        }))}
      />
    </Container>
  )
}
