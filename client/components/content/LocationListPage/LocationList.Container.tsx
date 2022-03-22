import { Wrap, WrapItem } from "@chakra-ui/react"
import { useContext } from "react"

import { LocationListContext } from "./LocationList.Context"
import { LocationListItem } from "./LocationList.Item"

export const LocationListContainer: React.FC = () => {
  const { result: { items = [] } = {} } = useContext(LocationListContext)

  return (
    <Wrap spacing={"30px"} align={"center"} justify={"center"} flex={1} width={"100%"}>
      {items.map((item) => (
        <WrapItem key={item.Location} alignSelf={"start"}>
          <LocationListItem {...item} />
        </WrapItem>
      ))}
    </Wrap>
  )
}
