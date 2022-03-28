type Content = {
  Name: string
  RouteSegment: string
  Url?: string
  ContentType: string[]
  ContentLink: {
    GuidValue: string
  }
}

type LanguageModel = {
  Name: string
  DisplayName: string
}

type Language = {
  Language: LanguageModel
}

type Expanded = {
  Expanded: ContentApiModel
}

type ContentReference = Language &
  Expanded & {
    Id: Int
    WorkId: Int
    GuidValue: String
    ProviderName: String
    Url: String
  }

type ContentAreaItem = {
  DisplayOption: String
  Tag: String
  ContentLink: ContentReference
}

type NavigationItem = Content & Children<{ Content: Items<HomePageItem> }>

type LocationItem = Content & {
  AvgTemp: number
  Continent: string
  Country: string
  Created: string
  IntroText: string
  Latitude: number
  Location: string
  Longitude: number
}

type LocationFacets = {
  AverageTemperature: Bucket[]
  Continent: Bucket[]
  Country: Bucket[]
}

type LocationFilter = {
  countries: string[]
  continents: string[]
  minAvgTemp: number
  maxAvgTemp: number
  fullTextSearch: string
}

type LocationItemResult = Items<LocationItem> & Facets<LocationFacets> & Total

type LocationListPageItem = {
  MainBody: string
  Name: string
} & Children<{
  LocationItemPage: LocationItemResult
}>

type LocationListPage = Items<LocationListPageItem>

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
