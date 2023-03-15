import { Wrap, WrapItem } from "@chakra-ui/react"
import { LocationItemPage } from "generated"
import { useContext } from "react"

import { LocationListContext } from "./LocationList.Context"
import { LocationListItem } from "./LocationList.Item"

export const LocationListContainer: React.FC = () => {
  const {result} = useContext(LocationListContext)

  const urlString = result?.LocationListPage?.items![0]?.Url
  const url: URL | null  = urlString ? new URL(urlString) : null
  const baseUrl = `${url?.protocol}//${url?.hostname}`

  return (
    <Wrap p={4} spacing={5} align={"center"} justify={"center"} flex={1} w={"full"}>
      {result?.LocationListPage?.items![0]?._children?.LocationItemPage?.items?.map((locationItem) => (
          <WrapItem key={locationItem?.Location} alignSelf={"start"}>  
            <LocationListItem 
              Country={locationItem?.Country ?? ''} 
              IntroText={locationItem?.IntroText ?? ''} 
              AvgTemp={locationItem?.AvgTemp ?? 0} 
              Continent={locationItem?.Continent ?? ''} 
              Created={locationItem?.Created ?? ''} 
              Location={locationItem?.Location ?? ''} 
              RelativePath={locationItem?.RelativePath ?? ''}
              ImageUrl={`${baseUrl}/${locationItem?.Image?.Url}` }
             />
          </WrapItem>
      ))}
    </Wrap>
  )
}
