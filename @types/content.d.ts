type ContentLink = {
  ContentLink: {
    GuidValue: string
  }
}

type Content = ContentLink & {
  Name: string
  RouteSegment: string
  Url?: string
  RelativePath: string
  ContentType: string[]
}

type LanguageModel = {
  Name: string
  DisplayName: string
}

type Language = {
  Language: LanguageModel
}

type Expanded<ContentApiModel = Content> = {
  Expanded: ContentApiModel
}

type ContentReference<TExpanded = Content> = Language &
  Expanded<TExpanded> & {
    Id: number
    WorkId: number
    GuidValue: string
    ProviderName: string
    Url: string
  }

type ContentAreaItem<TExpanded = Content> = {
  DisplayOption: string
  Tag: string
  ContentLink: ContentReference<TExpanded>
}

type ExistingLanguages = {
  ExistingLanguages: LanguageModel[]
}

// common types
type Bucket = {
  name: string
  count: number
}

type FullText = {
  _fulltext: string[]
}

type Items<T> = {
  items: T[]
}

type Facets<T extends { [k: string]: Bucket[] }> = {
  facets: T
}

type Total = {
  total: number
}

type Children<T> = {
  _children: T
}

type OrderBy = "ASC" | "DESC"
