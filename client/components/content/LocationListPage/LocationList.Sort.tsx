import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { CgSortAz } from "react-icons/cg"

import { LocationListContext } from "./LocationList.Context"

const sortMap: Record<string, Partial<LocationSort>> = {
  name: { Name: "ASC" },
  highTemp: { AvgTemp: "DESC" },
  lowTemp: { AvgTemp: "ASC" },
}

export const LocationListSort: React.FC = () => {
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
    <Menu closeOnSelect={true}>
      <MenuButton
        as={Button}
        colorScheme={"purple"}
        variant={"ghost"}
        leftIcon={<CgSortAz fontSize={"24px"} />}
      >
        Sorting
      </MenuButton>
      <MenuList zIndex={999}>
        <MenuOptionGroup value={orderBy} type="radio" onChange={handleSortSelection}>
          <MenuItemOption value="name">Name</MenuItemOption>
          <MenuItemOption value="highTemp">Highest temperature</MenuItemOption>
          <MenuItemOption value="lowTemp">Lowest temperature</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
