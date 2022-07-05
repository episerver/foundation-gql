import { Container } from "@chakra-ui/react"

import { ContentList } from "client/components/shared/content/ContentList"
import { useQuery } from "client/hooks/optimizely/useQuery"
import { useRouter } from "client/hooks/optimizely/useRouter"
import FolderPageQuery from "gql/FolderPageQuery.gql"

type TagItem = Content & {
  MainBody?: string
}

type FolderPageQueryResult = {
  Content: Items<TagItem>
}

export default function FolderPage({ route }: RouteProps) {
  const { locale } = useRouter()
  const { data } = useQuery<FolderPageQueryResult>(FolderPageQuery, {
    variables: {
      locale,
      ancestors: route?.id,
      limit: 20,
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
