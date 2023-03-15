import { Divider, Flex, Image } from "@chakra-ui/react"
import { ContainerBlock, FormContainerBlock, HeroBlock, IContent, ImageMediaData, PageListBlock, TeaserBlock, TextBlock } from "generated"

import { ContainerBlockComponent } from "./ContainerBlock"
import { FormContainerBlockComponent } from "./FormContainerBlock"
import { HeroBlockComponent } from "./HeroBlock"
import { PageListBlockComponent } from "./PageListBlock"
import { TeaserBlockComponent } from "./TeaserBlock"
import { TextBlockComponent } from "./TextBlock"

export type Block = IContent &
(
  | HeroBlock
  | TeaserBlock
  | TextBlock
  | ContainerBlock
  | ImageMediaData
  | PageListBlock
  | FormContainerBlock
)

export const BlockComponent: React.FC<{data: Block}> = ({data}) => {
  if (data.__typename === "HeroBlock") return <HeroBlockComponent data={data} />
  if (data.__typename === "ContainerBlock") return <ContainerBlockComponent data={data} />
  if (data.__typename === "TeaserBlock") return <TeaserBlockComponent data={data} />
  if (data.__typename === "TextBlock") return <TextBlockComponent data={data} />
  if (data.__typename === "PageListBlock") return <PageListBlockComponent props={data} />
  if (data.__typename === "FormContainerBlock") return <FormContainerBlockComponent data={data} />
  if (data.__typename === "ImageMediaData") return <Image src={data?.Url ?? ''} alt={data?.AltText ?? ''} />

  const fallback = data as IContent

  return (
    <Flex color="gray" direction={"column"} m={5}>
      <h1>{fallback.Name}</h1>
      <p>[{fallback?.ContentType?.join(", ")}]</p>
      <p>{fallback?.ContentLink?.GuidValue}</p>
      <Divider pt={2} />
    </Flex>
  )
}
