import { ApolloProvider } from "@apollo/client"
import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"

import { optiqClient } from "lib/clients/optiq.client"
import { theme } from "styles/theme"

const _App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={optiqClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  )
}

export default _App
