import { Flex, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { LocationListContainer } from "./LocationList.Container"
import { LocationListContext } from "./LocationList.Context"
import { LocationListFacet } from "./LocationList.Facet"
import { LocationListFilter } from "./LocationList.Filter"
import { LocationListHeader } from "./LocationList.Header"

import { useRouter } from "client/hooks/optimizely/useRouter"
import { Locales, LocationListQueryQuery, LocationListQueryQueryVariables, useLocationListQueryQuery } from "generated"


export default function LocationListPage() {
  const { path, locale } = useRouter()
  const [result, setResult] = useState<LocationListQueryQuery>()
  const [filters, setFilters] = useState<Partial<LocationListQueryQueryVariables>>({})

  const {data} = useLocationListQueryQuery({
    variables: {
      continents: filters.continents,
      countries: filters.countries,
      minAvgTemp: filters.minAvgTemp,
      maxAvgTemp: filters.maxAvgTemp,
      orderBy: filters.orderBy,
      searchTerm: filters.searchTerm,
      path: path,
      locale: locale as Locales,
    }
  });

  useEffect(() => {
    if (data) {
      setResult(data)
    }
  }, [data])

  return (
    <LocationListContext.Provider value={{ filters: [filters, setFilters], result }}>
      <Flex direction={{ base: "column", md: "row" }} w={"full"}>
        <Flex w={{ base: "full", md: 300 }}>
          <LocationListFacet />
        </Flex>

        <VStack w={"full"}>
          <LocationListHeader />
          <LocationListFilter />
          <LocationListContainer />
        </VStack>
      </Flex>
    </LocationListContext.Provider>
  )
}
