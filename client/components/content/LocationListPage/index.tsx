import { HStack, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { LocationListContainer } from "./LocationList.Container"
import { LocationListContext } from "./LocationList.Context"
import { LocationListFacet } from "./LocationList.Facet"
import { LocationListFilter } from "./LocationList.Filter"
import { LocationListHeader } from "./LocationList.Header"

import { useQuery } from "client/hooks/optimizely/useQuery"
import LocationListQuery from "gql/LocationListQuery.gql"

type LocationListQueryResult = {
  LocationListPage: LocationListPage
}

export default function LocationListPage() {
  const [items, setItems] = useState<LocationItem[]>([])
  const [facets, setFacets] = useState<Partial<LocationFacets>>({})
  const [filters, setFilters] = useState<Partial<LocationFilter>>({})

  const { data } = useQuery<LocationListQueryResult>(LocationListQuery, {
    variables: filters,
  })

  useEffect(() => {
    const { facets, items } = data?.LocationListPage.items[0]._children.LocationItemPage || {}
    setItems(items || [])
    setFacets(facets || {})
  }, [data])

  return (
    <LocationListContext.Provider value={{ filters: [filters, setFilters], facets, items }}>
      <HStack spacing={8}>
        <LocationListFacet />

        <VStack flex={1} alignSelf={"start"}>
          <LocationListHeader />
          <LocationListFilter />
          <LocationListContainer />
        </VStack>
      </HStack>
    </LocationListContext.Provider>
  )
}
