import { VStack, StackDivider, Accordion } from "@chakra-ui/react"
import { useContext } from "react"

import { LocationListContext } from "./LocationList.Context"

import { Filter } from "client/components/shared/Filter"

type LocationListFilterProps = {
  facets?: LocationFacets
}

export const LocationListFilter: React.FC<LocationListFilterProps> = ({ facets }) => {
  const {
    params: [params, setParams],
  } = useContext(LocationListContext)
  const { continents, countries, minAvgTemp, maxAvgTemp } = params || {}
  const defaultIndex = [1, 2]

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align={"stretch"}
      alignSelf={"start"}
      width={"300px"}
    >
      <Accordion defaultIndex={defaultIndex} allowMultiple>
        {facets?.Country && (
          <Filter
            type="select"
            title="Country"
            buckets={facets?.Country}
            values={countries || []}
            setValues={(countries) => setParams({ ...params, countries })}
          />
        )}

        {facets?.Continent && (
          <Filter
            type="select"
            title="Continent"
            buckets={facets?.Continent}
            values={continents || []}
            setValues={(continents) => setParams({ ...params, continents })}
          />
        )}

        {facets?.AverageTemperature && (
          <Filter
            type="range"
            title="Average Temperature"
            min={-50}
            max={50}
            buckets={facets?.AverageTemperature}
            values={[minAvgTemp, maxAvgTemp]}
            setValues={([minAvgTemp, maxAvgTemp]) =>
              setParams({
                ...params,
                minAvgTemp,
                maxAvgTemp,
              })
            }
          />
        )}
      </Accordion>
    </VStack>
  )
}
