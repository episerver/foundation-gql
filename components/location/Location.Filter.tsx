import {
  VStack,
  StackDivider,
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Checkbox,
  Text,
  Flex,
  Spacer,
  Stack,
  CheckboxGroup,
} from "@chakra-ui/react"
import { useContext } from "react"

import { LocationContext } from "./Location.Context"

type FilterProps = {
  title: string
  values: FacetItem[]
  selection: string[]
  setSelection: (selection: string[]) => void
}

const Filter: React.FC<FilterProps> = ({ title, values, selection, setSelection }) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Text fontSize={"lg"}>{title}</Text>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <CheckboxGroup defaultValue={selection} onChange={setSelection}>
          <Stack spacing={4}>
            {values.map((item) => (
              <Checkbox key={item.name} value={item.name} size={"sm"} spacing="1rem">
                <Flex direction={"row"}>
                  <Text fontSize={"sm"}>{item.name}</Text>
                  <Spacer />
                  <Text fontSize={"sm"}>{item.count}</Text>
                </Flex>
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </AccordionPanel>
    </AccordionItem>
  )
}

export const LocationFilter: React.FC<Facet<LocationFacets>> = ({ facets }) => {
  const { continents, countries, setContinents, setCountries } = useContext(LocationContext)
  const defaultIndex = []
  if (countries?.length) defaultIndex.push(0)
  if (continents?.length) defaultIndex.push(1)
  if (!defaultIndex.length) defaultIndex.push(0)

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align={"stretch"}
      alignSelf={"start"}
      width={"300px"}
    >
      <Accordion defaultIndex={defaultIndex} allowMultiple>
        <Filter
          title="Country"
          values={facets.Country}
          selection={countries || []}
          setSelection={setCountries || (() => {})}
        />
        <Filter
          title="Continent"
          values={facets.Continent}
          selection={continents || []}
          setSelection={setContinents || (() => {})}
        />
      </Accordion>
    </VStack>
  )
}
