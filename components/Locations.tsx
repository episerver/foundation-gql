import { useQuery } from "@apollo/client"
import LocationsQuery from "../gql/LocationsQuery.gql"

type LocationsResponse = {
  LocationListPage: {
    items: {
      MainBody: string
      Name: string
      _children: {
        LocationItemPage: {
          items: {
            AvgTemp: number
            ContentLink: { GuidValue: string }
            Continent: string
            Country: string
            IntroText: string
            Latitude: number
            Location: string
            Longitude: number
          }[]
          facets: {
            AvgTemp: FacetItem[]
            Continent: FacetItem[]
            Country: FacetItem[]
          }
        }
      }
    }[]
  }
}

export const Locations: React.FC = () => {
  const { data, loading } = useQuery<LocationsResponse>(LocationsQuery)

  return (
    <>
      {loading && <p>loading..</p>}
      <p>
        {data?.LocationListPage.items.map((list) => {
          return (
            <>
              {list.Name}
              <p>
                {list._children.LocationItemPage.items.map((item) => {
                  return (
                    <p key={item.Location}>
                      {item.Location} - {item.AvgTemp} | {item.Continent}
                    </p>
                  )
                })}
              </p>
            </>
          )
        })}
      </p>
    </>
  )
}
