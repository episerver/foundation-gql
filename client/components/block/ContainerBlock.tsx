import { SimpleGrid } from "@chakra-ui/react"
import {
  ContainerBlock,
 } from "generated"

 import { Block, BlockComponent } from "."

export const ContainerBlockComponent: React.FC<{data: ContainerBlock}> = ({data}) => {
  return (
    <SimpleGrid columns={[1, 1, 1, data?.MainContentArea?.length ?? 1]} px={50} py={30} w={"full"}>
      {data?.MainContentArea?.map((item) => (
        <BlockComponent key={item?.ContentLink?.GuidValue} data={item?.ContentLink?.Expanded as Block} />
      ))}
    </SimpleGrid>
  )
}
