import {
  CheckboxGroup,
  Stack,
  Checkbox,
  Flex,
  Spacer,
  VStack,
  HStack,
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Input,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
  Tooltip,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

type BaseFacetProps = {
  title: string
  values: Bucket[]
}

type SelectFacetProps = BaseFacetProps & {
  type: "select"
  filters: string[]
  onChange: (selected: string[]) => void
}

type RangeFacetProps = BaseFacetProps & {
  type: "range"
  range: [number, number]
  showPits?: boolean
  filters: [number?, number?]
  onChange: (min: number, max: number) => void
}

type FacetProps = SelectFacetProps | RangeFacetProps

const SelectFacet: React.FC<SelectFacetProps> = ({ filters, onChange, values }) => {
  return (
    <CheckboxGroup onChange={onChange} value={filters}>
      <Stack spacing={4}>
        {values.map((val) => (
          <Checkbox key={val.name} value={val.name} size={"sm"} spacing="1rem">
            <Flex direction={"row"}>
              <Text fontSize={"sm"}>{val.name}</Text>
              <Spacer />
              <Text fontSize={"sm"}>{val.count}</Text>
            </Flex>
          </Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  )
}

const RangeFacet: React.FC<RangeFacetProps> = ({
  range: [min, max],
  filters: [minFilter, maxFilter],
  onChange,
  showPits,
  values,
}) => {
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)

  useEffect(() => {
    setMinVal(parseInt(`${minFilter || min || "0"}`))
    setMaxVal(parseInt(`${maxFilter || max || "0"}`))
  }, [minFilter, maxFilter, min, max])

  const maxBucketVal = 40 / Math.max(...values.map((b) => b.count))

  return (
    <VStack>
      {showPits && (
        <HStack justify={"space-between"} align={"flex-end"} w={"full"} pl={3}>
          {values.map((val) => (
            <Tooltip key={val.name} hasArrow label={val.count} bg="orange.500" placement="top">
              <Box bg="orange.100" w={100} h={`${val.count * maxBucketVal}px`} />
            </Tooltip>
          ))}
        </HStack>
      )}

      <RangeSlider
        top={-1}
        min={min}
        max={max}
        value={[minVal, maxVal]}
        onChange={([min, max]) => {
          setMinVal(min)
          setMaxVal(max)
        }}
        onChangeEnd={() => onChange(minVal, maxVal)}
      >
        <RangeSliderTrack bg="orange.100">
          <RangeSliderFilledTrack bg="orange.400" />
        </RangeSliderTrack>
        <RangeSliderThumb index={0}>
          <Box color="tomato" />
        </RangeSliderThumb>
        <RangeSliderThumb index={1}>
          <Box color="tomato" />
        </RangeSliderThumb>
      </RangeSlider>
      <HStack justify={"space-between"} w={"full"}>
        <Input placeholder="min" size={"sm"} w={100} value={minVal} disabled />
        <Input placeholder="max" size={"sm"} w={100} value={maxVal} disabled />
      </HStack>
    </VStack>
  )
}

export const Facet: React.FC<FacetProps> = (props) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Text fontSize={"lg"}>{props.title}</Text>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        {props.type === "select" && <SelectFacet {...props} />}
        {props.type === "range" && <RangeFacet {...props} />}
      </AccordionPanel>
    </AccordionItem>
  )
}
