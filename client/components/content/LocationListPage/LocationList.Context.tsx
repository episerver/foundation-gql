import { createContext } from "react"

type LocationContextProps = {
  params: State<LocationListParams>
}

export const LocationListContext = createContext<LocationContextProps>({
  params: [undefined, () => {}],
})
