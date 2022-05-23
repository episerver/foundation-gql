import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"

class OptiqClient extends ApolloClient<NormalizedCacheObject> {
  constructor(url?: string, auth?: string) {
    if (!url) throw new Error("url is required")
    if (!auth) throw new Error("auth is required")

    const httpLink = new HttpLink({
      uri: `${url}/content/v2`,
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
        dataIdFromObject(response: any, { typename }) {
          const id = response.Id || response.ContentLink?.Id
          return typename && id //
            ? `${typename}:${id}`
            : false
        },
      }),
    })
  }
}

export const optiqClient = new OptiqClient(
  process.env.NEXT_PUBLIC_OPTIQ_URL,
  process.env.NEXT_PUBLIC_OPTIQ_AUTH
)
