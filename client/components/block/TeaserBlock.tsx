import { Stack, Flex, Text, Image } from "@chakra-ui/react"
import { TeaserBlock } from "generated"

export const TeaserBlockComponent: React.FC<{data: TeaserBlock}> = ({data}) => {
  return (
    <Stack p={5}>
      <Flex w={16} h={16} align={"center"} justify={"center"} mb={1}>
        <Image src={data?.Image?.Url ?? ''} alt="" />
      </Flex>
      <Text fontWeight={600}>{data.Heading}</Text>
      <Text color={"gray.600"} dangerouslySetInnerHTML={{ __html: data?.Text ?? '' }}></Text>
    </Stack>
  )
}
