import { LocationListQueryQuery, LocationListQueryQueryVariables } from "generated"
import { createContext } from "react"

type LocationContextProps = {
  result?: LocationListQueryQuery | undefined
  filters: State<Partial<LocationListQueryQueryVariables>>
}

export const LocationListContext = createContext<LocationContextProps>({
  filters: [{}, () => {}, ],
})
