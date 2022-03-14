import { Wrap, WrapItem } from "@chakra-ui/react"

import { LocationListItem } from "./LocationList.Item"

export const LocationListContainer: React.FC<Items<LocationItem>> = ({ items }) => {
  return (
    <Wrap spacing={"30px"} align={"center"} justify={"center"} flex={1}>
      {items.map((item) => (
        <WrapItem key={item.Location} alignSelf={"start"}>
          <LocationListItem {...item} />
        </WrapItem>
      ))}
    </Wrap>
  )
}
