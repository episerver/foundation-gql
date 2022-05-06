import { VStack, StackDivider, Accordion } from "@chakra-ui/react"
import { useContext } from "react"

import { LocationListContext } from "./LocationList.Context"

import { Facet } from "client/components/shared/Facet"

export const LocationListFacet: React.FC = () => {
  const {
    result: { facets = undefined } = {},
    filters: [filters, setFilters],
  } = useContext(LocationListContext)

  const defaultIndex = [1, 2]

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      align={"stretch"}
      alignSelf={"start"}
      width={"300px"}
    >
      <Accordion defaultIndex={defaultIndex} allowMultiple>
        {facets?.Country && (
          <Facet
            type="select"
            title="Country"
            values={facets.Country}
            filters={filters.countries || []}
            onChange={(countries) => {
              setFilters({ ...filters, countries })
            }}
          />
        )}

        {facets?.Continent && (
          <Facet
            type="select"
            title="Continent"
            values={facets.Continent}
            filters={filters.continents || []}
            onChange={(continents) => {
              setFilters({ ...filters, continents })
            }}
          />
        )}

        {facets?.AverageTemperature && (
          <Facet
            type="range"
            title="Average Temperature"
            range={[0, 30]}
            showPits={true}
            values={facets.AverageTemperature}
            filters={[filters.minAvgTemp, filters.maxAvgTemp]}
            onChange={(minAvgTemp, maxAvgTemp) => {
              setFilters({ ...filters, minAvgTemp, maxAvgTemp })
            }}
          />
        )}
      </Accordion>
    </VStack>
  )
}
