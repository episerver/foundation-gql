import { createContext } from "react"

type LocationContextProps = {
  params: State<LocationListParams>
}

export const LocationContext = createContext<LocationContextProps>({
  params: [undefined, () => {}],
})
