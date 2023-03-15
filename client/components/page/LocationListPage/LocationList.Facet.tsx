import { VStack, StackDivider, Accordion } from "@chakra-ui/react"
import { useContext } from "react"

import { LocationListContext } from "./LocationList.Context"

import { Facet } from "client/components/shared/Facet"
import { StringFacet } from "generated"

export const LocationListFacet: React.FC = () => {
  const {
    result: result,
    filters: [filters, setFilters],
  } = useContext(LocationListContext)

  const defaultIndex = [1, 2]
  const facets = result?.LocationListPage?.items![0]?._children?.LocationItemPage?.facets

  return (
    <VStack
      divider={<StackDivider borderColor={"gray.200"} />}
      align={"stretch"}
      alignSelf={"start"}
      w={"full"}
    >
      <Accordion defaultIndex={defaultIndex} allowMultiple>
        {facets?.Country && (
          <Facet
            type="select"
            title="Country"
            values={facets.Country.filter(x => x?.count! > 0) as StringFacet[]}
            filters={filters?.countries as string[]}
            onChange={(countries: string[] | undefined) => {
              if(countries?.length != null && countries.length < 1) {
                countries = undefined
              }
              
              setFilters({ ...filters, countries })
            }}
          />
        )}

        {facets?.Continent && (
          <Facet
            type="select"
            title="Continent"
            values={facets.Continent.filter(x => x?.count! > 0) as StringFacet[]}
            filters={filters.continents as string[]}
            onChange={(continents: string[] | undefined) => {
              if(continents?.length != null && continents.length < 1) {
                continents = undefined
              }
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
            values={facets.AverageTemperature as StringFacet[]}
            filters={[filters?.minAvgTemp ?? 0, filters?.maxAvgTemp ?? 30]}
            onChange={(minAvgTemp, maxAvgTemp) => {
              setFilters({ ...filters, minAvgTemp, maxAvgTemp })
            }}
          />
        )}
      </Accordion>
    </VStack>
  )
}
