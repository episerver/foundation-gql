import { createContext } from "react"

type LocationContextProps = {
  result?: LocationItemResult | undefined
  filters: State<Partial<LocationFilter>>
}

export const LocationListContext = createContext<LocationContextProps>({
  filters: [{}, () => {}],
})
