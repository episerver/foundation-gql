import { ApolloProvider } from "@apollo/client"
import { ChakraProvider } from "@chakra-ui/react"

import { ClientOnly } from "./components/shared/ClientOnly"
import { Layout } from "./components/shared/layout/Layout"
import { contentGraphClient } from "./data/contentgraph.client"

import { theme } from "styles/theme"

export const App: React.FC = () => {
  return (
    <ClientOnly>
      <ChakraProvider theme={theme}>
        <ApolloProvider client={contentGraphClient}>
          <Layout />
        </ApolloProvider>
      </ChakraProvider>
    </ClientOnly>
  )
}
