import "../styles/globals.css"
import type { AppProps } from "next/app"
import { optiqClient } from "../lib/clients/optiq.client"
import { ApolloProvider } from "@apollo/client"

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={optiqClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
