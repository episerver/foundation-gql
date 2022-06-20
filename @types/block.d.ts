type BlockComponent<T> = React.FC<{ data: T }>

type Block =
  | HeroBlock
  | TeaserBlock
  | TextBlock
  | ContainerBlock
  | ImageMediaData
  | PageListBlock
  | FormContainerBlock

type HeroBlock = {
  __typename: "HeroBlock"
  BlockRation: string
  BackgroundImage: {
    Url: string
  }
  Callout: {
    CalloutContent: string
  }
}

type TeaserBlock = {
  __typename: "TeaserBlock"
  Text: string
  Heading: string
  Image: {
    Url: string
  }
}
type TextBlock = {
  __typename: "TextBlock"
  MainBody
}

type ContainerBlock = {
  __typename: "ContainerBlock"
  MainContentArea: ContentAreaItem<Block>[]
}

type ImageMediaData = {
  __typename: "ImageMediaData"
  Url: string
  AltText: string
}

type PageListBlock = {
  __typename: "PageListBlock"
  Count: number
  Heading: string
  Roots: ContentLink[]
}

type FormContainerBlock = {
  __typename: "FormContainerBlock"
}
