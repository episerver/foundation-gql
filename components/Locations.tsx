import { useQuery } from "@apollo/client"
import LocationsQuery from "../gql/LocationsQuery.gql"

export const Locations: React.FC = () => {
  const { data, loading } = useQuery<Locations>(LocationsQuery)

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
