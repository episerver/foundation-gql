import { VStack, StackDivider, Flex } from "@chakra-ui/react"

import { useQuery } from "client/hooks/optimizely/useQuery"
import { useRouter } from "client/hooks/optimizely/useRouter"
import HomePageQuery from "gql/HomePageQuery.gql"

type HomePageItem = {
  MainContentArea: ContentAreaItem[]
}

type HomePageQueryResult = {
  HomePage: Items<HomePageItem>
}

export default function HomePage() {
  const { locale } = useRouter()
  const { data } = useQuery<HomePageQueryResult>(HomePageQuery, {
    variables: {
      locale,
    },
  })

  return (
    <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
      {data?.HomePage.items[0].MainContentArea.map(({ ContentLink }) => (
        <Flex
          key={ContentLink.Expanded.ContentLink.GuidValue}
          direction={"column"}
          align={"center"}
        >
          <h1>{ContentLink.Expanded.Name}</h1>
          <p>{ContentLink.Expanded.ContentType}</p>
          <p>{ContentLink.Expanded.ContentLink.GuidValue}</p>
        </Flex>
      ))}
    </VStack>
  )
}
