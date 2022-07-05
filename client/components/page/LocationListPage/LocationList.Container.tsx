import { Wrap, WrapItem } from "@chakra-ui/react"
import { useContext } from "react"

import { LocationListContext } from "./LocationList.Context"
import { LocationListItem } from "./LocationList.Item"

export const LocationListContainer: React.FC = () => {
  const { result: { items = [] } = {} } = useContext(LocationListContext)

  return (
    <Wrap p={4} spacing={5} align={"center"} justify={"center"} flex={1} w={"full"}>
      {items.map((item) => (
        <WrapItem key={item.Location} alignSelf={"start"}>
          <LocationListItem {...item} />
        </WrapItem>
      ))}
    </Wrap>
  )
}
