import { useContext } from "react"

import { LayoutContext } from "client/context/Layout.Context"

export const useLayout = () => useContext(LayoutContext)
