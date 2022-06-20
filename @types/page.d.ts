// Layout
type NavigationItem = Content & ExistingLanguages & Children<{ Content: Items<NavigationItem> }>

// Location
type LocationListPage = Items<LocationListPageItem>
type LocationItemPage = Items<LocationItem>
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
  fullTextSearch: string
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
