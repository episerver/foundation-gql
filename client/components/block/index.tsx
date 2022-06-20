import { Flex, Image } from "@chakra-ui/react"

import { ContainerBlock } from "./ContainerBlock"
import { FormContainerBlock } from "./FormContainerBlock"
import { HeroBlock } from "./HeroBlock"
import { PageListBlock } from "./PageListBlock"
import { TeaserBlock } from "./TeaserBlock"
import { TextBlock } from "./TextBlock"

export const Block: BlockComponent<Block> = ({ data }) => {
  if (data.__typename === "HeroBlock") return <HeroBlock data={data} />
  if (data.__typename === "ContainerBlock") return <ContainerBlock data={data} />
  if (data.__typename === "TeaserBlock") return <TeaserBlock data={data} />
  if (data.__typename === "TextBlock") return <TextBlock data={data} />
  if (data.__typename === "PageListBlock") return <PageListBlock data={data} />
  if (data.__typename === "FormContainerBlock") return <FormContainerBlock data={data} />
  if (data.__typename === "ImageMediaData") return <Image src={data.Url} alt={data.AltText} />

  const fallback = data as Content

  return (
    <Flex color="gray" direction={"column"}>
      <h1>{fallback.Name}</h1>
      <p>[{fallback.ContentType.join(", ")}]</p>
      <p>{fallback.ContentLink.GuidValue}</p>
    </Flex>
  )
}
