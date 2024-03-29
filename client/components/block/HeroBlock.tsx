import { Flex, Image } from "@chakra-ui/react"

export const HeroBlock: BlockComponent<HeroBlock> = ({ data }) => {
  return (
    <Flex maxH={500} minH={350}>
      <Image src={data.BackgroundImage.Url} fit="cover" w={"full"} alt="" />
    </Flex>
  )
}
