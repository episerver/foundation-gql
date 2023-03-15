import { Flex, Image } from "@chakra-ui/react"
import { HeroBlock } from "generated"

export const HeroBlockComponent: React.FC<{data: HeroBlock}> = ({data}) => {
  return (
    <Flex maxH={500} minH={350}>
      <Image src={data?.BackgroundImage?.Url ?? ''} fit="cover" w={"full"} alt="" />
    </Flex>
  )
}
