import { createContext } from "react"

type LocationContextProps = LocationListParams & {
  setCountries: (countries: string[]) => void
  setContinents: (continents: string[]) => void
}

export const LocationContext = createContext<Partial<LocationContextProps>>({})
