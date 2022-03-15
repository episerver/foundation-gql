import { Center } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { LocationListContainer } from "./LocationList.Container"
import { LocationListContext } from "./LocationList.Context"
import { LocationListFilter } from "./LocationList.Filter"

import { useQuery } from "client/hooks/optimizely/useQuery"
import LocationListQuery from "gql/LocationListQuery.gql"

type LocationListQueryResult = {
  LocationListPage: LocationListPage
}

export default function LocationListPage() {
  const [items, setItems] = useState<LocationItem[]>([])
  const [facets, setFacets] = useState<LocationFacets>()
  const [params, setParams] = useState<LocationListParams>()

  const { data } = useQuery<LocationListQueryResult, LocationListParams>(LocationListQuery, {
    variables: params,
  })

  useEffect(() => {
    setItems(data?.LocationListPage.items[0]._children.LocationItemPage.items || [])
    if (!facets) {
      setFacets(data?.LocationListPage.items[0]._children.LocationItemPage.facets)
    }
  }, [data])

  return (
    <LocationListContext.Provider value={{ params: [params, setParams] }}>
      <Center>
        <LocationListFilter {...{ facets }} />
        <LocationListContainer {...{ items }} />
      </Center>
    </LocationListContext.Provider>
  )
}
