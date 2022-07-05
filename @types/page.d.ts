// Layout
type NavigationItem = Content & ExistingLanguages & ParentLink
type IRoute = {
  id: string
  parentId: string
  contentType?: string
  name: string
  path: string
  language: LanguageModel[]
}
type RouteProps = {
  route: IRoute | undefined
}

// Location
type LocationListPage = Items<LocationListPageItem>
type LocationItemPage = Items<LocationItem & { MainBody: string }>
type LocationItemResult = Items<LocationItem> & Facets<LocationFacets> & Total

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

type LocationListPageItem = {
  MainBody: string
  Name: string
} & Children<{
  LocationItemPage: LocationItemResult
}>

type LocationFilter = {
  countries: string[]
  continents: string[]
  minAvgTemp: number
  maxAvgTemp: number
  searchTerm: string
  orderBy: Partial<LocationSort>
}

type LocationFacets = {
  AverageTemperature: Bucket[]
  Continent: Bucket[]
  Country: Bucket[]
}

type LocationSort = {
  Name: OrderBy
  AvgTemp: OrderBy
}

// Standard
type PageListItem = ContentLink & {
  Name: string
  PageImage: {
    Url: string
  }
  RelativePath: string
  TeaserText: string
  TeaserButtonText: string
}

type PageListResult = {
  StandardPage: Items<PageListItem>
}

type StandardPageItem = PageListItem & {
  MainBody: string
  MainContentArea?: ContentAreaItem<PageListItem>[]
}

type StandardPageResult = {
  StandardPage: Items<StandardPageItem>
}
