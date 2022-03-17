import { useQuery as useApolloQuery } from "@apollo/client"
import { useEffect } from "react"

import { useLayout } from "./useLayout"

type UseQueryHook = typeof useApolloQuery

export const useQuery: UseQueryHook = (query, variables) => {
  const {
    loading: [_, setLoading],
  } = useLayout()

  const result = useApolloQuery(query, variables)

  useEffect(() => {
    setLoading(result.loading)
  }, [setLoading, result])

  return result
}
