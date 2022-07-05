import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"

import { cursorPagination } from "./cursorPagination"

import possibleTypes from "possibleTypes.json"

class OptiqClient extends ApolloClient<NormalizedCacheObject> {
  constructor(url?: string, auth?: string) {
    if (!url) throw new Error("url is required")
    if (!auth) throw new Error("auth is required")

    const httpLink = new HttpLink({
      uri: url,
    })

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (process.env.NODE_ENV !== "production") {
        graphQLErrors?.forEach(console.error)
        networkError && console.error(networkError)
      }
    })

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: `epi-single ${auth}`,
        },
      }))
      return forward(operation)
    })

    super({
      link: from([errorLink, authMiddleware, httpLink]),
      cache: new InMemoryCache({
        possibleTypes,
        typePolicies: {
          Query: {
            fields: {
              Content: cursorPagination(),
            },
          },
        },
      }),
    })
  }
}

export const optiqClient = new OptiqClient(
  process.env.NEXT_PUBLIC_OPTIQ_URL,
  process.env.NEXT_PUBLIC_OPTIQ_AUTH
)
