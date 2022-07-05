import { useContext } from "react"

import { LayoutContext } from "client/components/shared/layout/Layout.Context"

export const useLayout = () => useContext(LayoutContext)
