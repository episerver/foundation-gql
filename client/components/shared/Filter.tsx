import {
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  CheckboxGroup,
  Stack,
  Checkbox,
  Flex,
  Spacer,
  Text,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  VStack,
  HStack,
  Input,
} from "@chakra-ui/react"
import { useState } from "react"

type BaseFilterProps = {
  title: string
  buckets: Bucket[]
  values: any[]
  setValues: (values: any[]) => void
}

type StringFilterProps = BaseFilterProps & {
  type: "select"
}

type RangeFilterProps = BaseFilterProps & {
  type: "range"
  min: number
  max: number
}

type FilterProps = StringFilterProps | RangeFilterProps

const SelectionControl: React.FC<StringFilterProps> = ({ values, setValues, buckets }) => {
  return (
    <CheckboxGroup defaultValue={values} onChange={setValues}>
      <Stack spacing={4}>
        {buckets.map((item) => (
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
  )
}

const RangeControl: React.FC<RangeFilterProps> = ({
  buckets,
  values,
  setValues,
  min = 0,
  max = 100,
}) => {
  const [minVal, setMinVal] = useState(parseInt(values[0] || min))
  const [maxVal, setMaxVal] = useState(parseInt(values[1] || max))

  return (
    <VStack>
      <HStack justify={"space-between"} w={"100%"} mb={4}>
        <Input placeholder="min" size={"sm"} w={100} value={minVal} disabled />
        <Input placeholder="max" size={"sm"} w={100} value={maxVal} disabled />
      </HStack>
      <RangeSlider
        min={min}
        max={max}
        value={[minVal, maxVal]}
        onChange={([min, max]) => {
          setMinVal(min)
          setMaxVal(max)
        }}
        onChangeEnd={() => setValues([minVal, maxVal])}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </VStack>
  )
}

export const Filter: React.FC<FilterProps> = (props) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Text fontSize={"lg"}>{props.title}</Text>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        {props.type === "select" && <SelectionControl {...props} />}
        {props.type === "range" && <RangeControl {...props} />}
      </AccordionPanel>
    </AccordionItem>
  )
}
