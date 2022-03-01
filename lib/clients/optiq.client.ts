import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client"

class OptiqClient extends ApolloClient<NormalizedCacheObject> {
  constructor(url?: string, auth?: string) {
    if (!url) throw new Error("url is required")
    if (!auth) throw new Error("auth is required")

    const httpLink = new HttpLink({
      uri: `${url}/content/v2?auth=${auth}`,
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
      link: from([authMiddleware, httpLink]),
      cache: new InMemoryCache(),
    })
  }
}

export const optiqClient = new OptiqClient(
  process.env.NEXT_PUBLIC_OPTIQ_URL,
  process.env.NEXT_PUBLIC_OPTIQ_AUTH
)
