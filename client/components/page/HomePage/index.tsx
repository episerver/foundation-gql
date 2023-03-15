import { VStack, Flex } from "@chakra-ui/react"

import { Block, BlockComponent } from "client/components/block"
import { useRouter } from "client/hooks/optimizely/useRouter"
import { Locales, useHomePageQueryQuery } from "generated"

export default function HomePage() {
  const { locale } = useRouter()
  const { data } = useHomePageQueryQuery({
    variables: {
      locale: locale as Locales,
    }
  });

  return (
    <VStack spacing={4} align="stretch">
      {data?.HomePage?.items![0]?.MainContentArea?.map((item) => (
        <Flex
          key={item?.ContentLink?.Expanded?.ContentLink?.GuidValue}
          direction={"column"}
          align={"center"}
        >
          <BlockComponent data={item?.ContentLink?.Expanded as Block} />
        </Flex>
      ))}
    </VStack>
  )
}
