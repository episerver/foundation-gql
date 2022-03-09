import { useQuery } from "@apollo/client"
import { useContext } from "react"

import { LayoutContext } from "client/context/Layout.Context"

type UseQueryHook = typeof useQuery

export const useOptiQuery: UseQueryHook = (query, variables) => {
  const {
    loading: [_, setLoading],
  } = useContext(LayoutContext)

  const result = useQuery(query, variables)

  setLoading(result.loading)

  return result
}
