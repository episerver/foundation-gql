import { useQuery as useApolloQuery } from "@apollo/client"
import { useContext, useEffect } from "react"

import { LayoutContext } from "client/context/Layout.Context"

type UseQueryHook = typeof useApolloQuery

export const useQuery: UseQueryHook = (query, variables) => {
  const {
    loading: [_, setLoading],
  } = useContext(LayoutContext)

  const result = useApolloQuery(query, variables)

  useEffect(() => {
    setLoading(result.loading)
  }, [result.loading, setLoading])

  return result
}
