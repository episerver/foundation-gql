import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Flex,
  FlexProps,
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { CgSortAz } from "react-icons/cg"

import { LocationListContext } from "./LocationList.Context"

const sortMap: Record<string, Partial<LocationSort>> = {
  cityName: { Name: "ASC" },
  highTemp: { AvgTemp: "DESC" },
  lowTemp: { AvgTemp: "ASC" },
}

export const LocationListSort: React.FC<FlexProps> = (props) => {
  const [orderBy, setOrderBy] = useState("")
  const {
    filters: [filters, setFilters],
  } = useContext(LocationListContext)

  const handleSortSelection = (option: any) => {
    setOrderBy(option)
    setFilters({ ...filters, orderBy: sortMap[option] })
  }

  useEffect(() => {
    if (!filters.orderBy) {
      setOrderBy("")
    }
  }, [filters])

  return (
    <Flex {...props}>
      <Menu closeOnSelect={true}>
        <MenuButton
          as={Button}
          p={2}
          colorScheme={"purple"}
          variant={"ghost"}
          leftIcon={<CgSortAz fontSize={"24px"} />}
        >
          Sorting
        </MenuButton>
        <MenuList zIndex={999}>
          <MenuOptionGroup value={orderBy} type="radio" onChange={handleSortSelection}>
            <MenuItemOption value="cityName">City name</MenuItemOption>
            <MenuItemOption value="highTemp">Highest temperature</MenuItemOption>
            <MenuItemOption value="lowTemp">Lowest temperature</MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Flex>
  )
}
