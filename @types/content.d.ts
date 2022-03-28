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

type BlogItemPage = {
  BlogName: string
  Author: string
  TeaserText: string
  MainBody: string
  Created: date
}

type BlogFacets = {
  author: Bucket[]
}

type BlogFilter = {
  authors: string[]
  mainBlogGuid: string
}

type MonthBlogListPageItem = {
  Name: string
} & Children<{
  BlogItemPage: Items<BlogItemPage> & Facets<BlogFacets>
}>

type YearBlogListPageItem = {
  Name: string
} & Children<{
  BlogListPage: Items<MonthBlogListPageItem> & Facets<BlogFacets>
}>

type BlogListPage = Items<YearBlogListPageItem>