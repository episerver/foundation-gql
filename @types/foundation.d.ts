type LocationItems = {
  AvgTemp: number
  ContentLink: { GuidValue: string }
  Continent: string
  Country: string
  IntroText: string
  Latitude: number
  Location: string
  Longitude: number
}

type LocationFacets = {
  AvgTemp: FacetItem[]
  Continent: FacetItem[]
  Country: FacetItem[]
}

type Locations = {
  LocationListPage: Content<{
    MainBody: string
    Name: string
    _children: {
      LocationItemPage: Content<LocationItems> & Facet<LocationFacets>
    }
  }>
}
