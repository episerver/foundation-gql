import { Center } from "@chakra-ui/react"
import { useState } from "react"

import { LocationListContainer } from "./LocationList.Container"
import { LocationListContext } from "./LocationList.Context"
import { LocationListFilter } from "./LocationList.Filter"

import { useQuery } from "client/hooks/optimizely/useQuery"
import LocationListQuery from "gql/LocationListQuery.gql"

type LocationListQueryResult = {
  LocationListPage: LocationListPage
}

export default function LocationListPage() {
  const [params, setParams] = useState<LocationListParams>()
  const { data } = useQuery<LocationListQueryResult, LocationListParams>(LocationListQuery, {
    variables: params,
  })

  return (
    <LocationListContext.Provider value={{ params: [params, setParams] }}>
      <Center>
        {data && (
          <>
            <LocationListFilter
              facets={data.LocationListPage.items[0]._children.LocationItemPage.facets}
            />
            <LocationListContainer //
              items={data.LocationListPage.items[0]._children.LocationItemPage.items}
            />
          </>
        )}
      </Center>
    </LocationListContext.Provider>
  )
}
