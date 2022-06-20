import { SimpleGrid } from "@chakra-ui/react"

import { Block } from "."

export const ContainerBlock: BlockComponent<ContainerBlock> = ({ data }) => {
  return (
    <SimpleGrid columns={[1, 1, 2, data.MainContentArea.length]} px={50} py={30}>
      {data.MainContentArea.map(({ ContentLink: { GuidValue, Expanded: block } }) => (
        <Block key={GuidValue} data={block} />
      ))}
    </SimpleGrid>
  )
}
