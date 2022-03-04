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
  AverageTemperature: FacetItem[]
  Continent: FacetItem[]
  Country: FacetItem[]
}

type LocationListParams = {
  countries: string[]
  continents: string[]
}

type LocationListPage = Content<{
  MainBody: string
  Name: string
  _children: {
    LocationItemPage: Content<LocationItem> & Facet<LocationFacets>
  }
}>
