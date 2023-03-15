import { Tag, TagCloseButton, TagLabel, ThemeTypings, Wrap } from "@chakra-ui/react"
import { useContext } from "react"

import { LocationListContext } from "./LocationList.Context"

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
    filters: [ctxFilters, setFilters],
  } = useContext(LocationListContext)

  const { searchTerm, ...filters } = ctxFilters || {}
  const continents = filters?.continents as string[]
  const countries = filters?.countries as string[]

  return Object.keys(filters).length ? (
    <Wrap alignSelf={"start"} gap={3} px={5} pt={3}>
      {continents?.map((val, index) => (
        <FilterTag
          key={index}
          display={val}
          onRemove={() => {
            const { continents: oldContinents, ...newFilters } = filters
            const continents = (oldContinents as string[])?.filter((x) => x !== val)
            setFilters({
              ...newFilters,
              ...(continents?.length ? { continents } : undefined),
            })
          }}
        />
      ))}

      {countries?.map((val, index) => (
        <FilterTag
          key={index}
          display={val}
          onRemove={() => {
            const { countries: oldCountries, ...newFilters } = filters
            const countries = (oldCountries as string[])?.filter((x) => x !== val)
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
    </Wrap>
  ) : null
}
