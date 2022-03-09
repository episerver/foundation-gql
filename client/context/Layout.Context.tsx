import { createContext } from "react"

type LayoutContextProps = {
  loading: State<boolean>
}

export const LayoutContext = createContext<LayoutContextProps>({
  loading: [false, () => {}],
})
