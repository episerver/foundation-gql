import { Flex, Image } from "@chakra-ui/react"

export const HeroBlock: BlockComponent<HeroBlock> = ({ data }) => {
  return (
    <Flex maxH={500}>
      <Image src={data.BackgroundImage.Url} fit="cover" alt="" />
    </Flex>
  )
}
