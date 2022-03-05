import { useQuery } from "@apollo/client"
import { Center } from "@chakra-ui/react"
import { useState } from "react"

import { LocationContext } from "./Location.Context"
import { LocationFilter } from "./Location.Filter"
import { LocationList } from "./Location.List"

import LocationListQuery from "gql/LocationListQuery.gql"

type QueryResult = {
  LocationListPage: LocationListPage
}

export const LocationsPage: React.FC = () => {
  const params = useState<LocationListParams>()

  const { data, loading } = useQuery<QueryResult, LocationListParams>(LocationListQuery, {
    variables: params[0],
  })

  return (
    <LocationContext.Provider value={{ params }}>
      <Center>
        {loading && <p>loading..</p>}
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
