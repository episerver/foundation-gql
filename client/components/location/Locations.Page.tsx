import { Center } from "@chakra-ui/react"
import { useState } from "react"

import { LocationContext } from "./Location.Context"
import { LocationFilter } from "./Location.Filter"
import { LocationList } from "./Location.List"

import { useOptiQuery } from "client/hooks/useOptiQuery"
import LocationListQuery from "gql/LocationListQuery.gql"

type LocationListQueryResult = {
  LocationListPage: LocationListPage
}

export const LocationsPage: React.FC = () => {
  const [params, setParams] = useState<LocationListParams>()
  const { data } = useOptiQuery<LocationListQueryResult, LocationListParams>(LocationListQuery, {
    variables: params,
  })

  return (
    <LocationContext.Provider value={{ params: [params, setParams] }}>
      <Center>
        {data && (
          <>
            <LocationFilter
              facets={data.LocationListPage.items[0]._children.LocationItemPage.facets}
            />
            <LocationList //
              items={data.LocationListPage.items[0]._children.LocationItemPage.items}
            />
          </>
        )}
      </Center>
    </LocationContext.Provider>
  )
}
