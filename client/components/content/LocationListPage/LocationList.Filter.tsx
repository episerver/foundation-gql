import { HStack, Tag, TagCloseButton, TagLabel, ThemeTypings } from "@chakra-ui/react"
import { useContext } from "react"

import { LocationListContext } from "./LocationList.Context"

import { useLayout } from "client/hooks/optimizely/useLayout"

type FilterTag = {
  display: string
  onRemove: Function
  colorSchema?: ThemeTypings["colorSchemes"]
}

const FilterTag: React.FC<FilterTag> = ({ colorSchema, display, onRemove }) => {
  return (
    <Tag size={"lg"} variant="subtle" colorScheme={colorSchema || "blue"}>
      <TagLabel>{display}</TagLabel>
      <TagCloseButton onClick={() => onRemove()} />
    </Tag>
  )
}

export const LocationListFilter: React.FC = () => {
  const {
    loading: [loading],
  } = useLayout()

  const {
    filters: [filters, setFilters],
  } = useContext(LocationListContext)

  return !loading && filters && Object.keys(filters).length ? (
    <HStack alignSelf={"start"} mx={35} mt={25}>
      {filters.continents?.map((val, index) => (
        <FilterTag
          key={index}
          display={val}
          onRemove={() => {
            const { continents: oldContinents, ...newFilters } = filters
            const continents = oldContinents?.filter((x) => x !== val)
            setFilters({
              ...newFilters,
              ...(continents?.length ? { continents } : undefined),
            })
          }}
        />
      ))}

      {filters.countries?.map((val, index) => (
        <FilterTag
          key={index}
          display={val}
          onRemove={() => {
            const { countries: oldCountries, ...newFilters } = filters
            const countries = oldCountries?.filter((x) => x !== val)
            setFilters({
              ...newFilters,
              ...(countries?.length ? { countries } : undefined),
            })
          }}
        />
      ))}

      {(filters.minAvgTemp !== undefined || filters.maxAvgTemp !== undefined) && (
        <FilterTag
          display={`${filters.minAvgTemp} °C ... ${filters.maxAvgTemp || ""} °C`}
          onRemove={() => {
            const { minAvgTemp, maxAvgTemp, ...newFilters } = filters
            setFilters({ ...newFilters })
          }}
        />
      )}

      {filters.orderBy && (
        <FilterTag
          colorSchema={"purple"}
          display={` ${Object.values(filters.orderBy)[0] === "ASC" ? "▲" : "▼"} ${
            Object.keys(filters.orderBy)[0]
          }`}
          onRemove={() => {
            const { orderBy, ...rest } = filters
            setFilters({ ...rest })
          }}
        />
      )}
    </HStack>
  ) : null
}
