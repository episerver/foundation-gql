type Content = {
  Name: string
  RouteSegment: string
  ContentType: string[]
  ContentLink: {
    GuidValue: string
  }
}

type ContentReference = {
  Id: Int
  WorkId: Int
  GuidValue: String
  ProviderName: String
  Url: String
  Language: LanguageModel
  Expanded: ContentApiModel
}

type ContentAreaItem = {
  DisplayOption: String
  Tag: String
  ContentLink: ContentReference
}

type LocationItem = {
  AvgTemp: number
  ContentLink: { GuidValue: string }
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
}

type LocationListPageItem = {
  MainBody: string
  Name: string
} & Children<{
  LocationItemPage: Items<LocationItem> & Facets<LocationFacets>
}>

type LocationListPage = Items<LocationListPageItem>
