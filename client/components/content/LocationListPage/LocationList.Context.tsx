import { createContext } from "react"

type LocationContextProps = {
  items: LocationItem[]
  facets: Partial<LocationFacets>
  filters: State<Partial<LocationFilter>>
}

export const LocationListContext = createContext<LocationContextProps>({
  items: [],
  facets: {},
  filters: [{}, () => {}],
})
