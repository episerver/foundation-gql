import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react"
import { useContext } from "react"
import { CgSortAz } from "react-icons/cg"

import { LocationListContext } from "./LocationList.Context"

const sortMap: Record<string, Partial<LocationSort>> = {
  name: { Name: "ASC" },
  highTemp: { AvgTemp: "DESC" },
  lowTemp: { AvgTemp: "ASC" },
}

export const LocationListSort: React.FC = () => {
  const {
    filters: [filters, setFilters],
  } = useContext(LocationListContext)

  const handleSortSelection = (option: any) => {
    if (option) {
      setFilters({ orderBy: sortMap[option] })
    }
  }

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
        <MenuOptionGroup type="radio" onChange={handleSortSelection}>
          <MenuItemOption value="name">Name</MenuItemOption>
          <MenuItemOption value="highTemp">Highest temperature</MenuItemOption>
          <MenuItemOption value="lowTemp">Lowest temperature</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
