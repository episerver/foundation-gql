import { VStack, Flex } from "@chakra-ui/react"

import { Block } from "client/components/block"
import { useQuery } from "client/hooks/optimizely/useQuery"
import { useRouter } from "client/hooks/optimizely/useRouter"
import HomePageQuery from "gql/HomePageQuery.gql"

type HomePageItem = {
  MainContentArea: ContentAreaItem<Block>[]
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
    <VStack spacing={4} align="stretch">
      {data?.HomePage.items[0].MainContentArea.map(({ ContentLink }) => (
        <Flex
          key={ContentLink.Expanded.ContentLink.GuidValue}
          direction={"column"}
          align={"center"}
        >
          <Block data={ContentLink.Expanded} />
        </Flex>
      ))}
    </VStack>
  )
}
