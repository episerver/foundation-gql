import { Flex, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { LocationListContainer } from "./LocationList.Container"
import { LocationListContext } from "./LocationList.Context"
import { LocationListFacet } from "./LocationList.Facet"
import { LocationListFilter } from "./LocationList.Filter"
import { LocationListHeader } from "./LocationList.Header"

import { useQuery } from "client/hooks/optimizely/useQuery"
import { useRouter } from "client/hooks/optimizely/useRouter"
import LocationListQuery from "gql/LocationListQuery.gql"

type LocationListQueryResult = {
  LocationListPage: LocationListPage
}

export default function LocationListPage() {
  const { path, locale } = useRouter()
  const [result, setResult] = useState<LocationItemResult>()
  const [filters, setFilters] = useState<Partial<LocationFilter>>({})
  const { data } = useQuery<LocationListQueryResult>(LocationListQuery, {
    variables: {
      ...filters,
      path,
      locale,
    },
  })

  useEffect(() => {
    if (data) {
      setResult(data?.LocationListPage.items[0]._children.LocationItemPage)
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
