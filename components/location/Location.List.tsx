import { Wrap, WrapItem } from "@chakra-ui/react"

import { LocationListItem } from "./Location.ListItem"

export const LocationList: React.FC<Content<LocationItem>> = ({ items }) => {
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
