import { ComponentType } from "react"

import { HomePage } from "client/components/home/Home.Page"
import { LocationsPage } from "client/components/location/Locations.Page"

type ContentType = string

const excludedContentTypes = ["Content", "Page"]

const componentMap: Record<ContentType, ComponentType | undefined> = {
  HomePage: HomePage,
  LocationListPage: LocationsPage,
}

export const getContentType = (content: Content) => {
  return content.ContentType.filter((ct) => !excludedContentTypes.includes(ct))[0]
}

export const getContentComponent = (contentType?: ContentType) => {
  return contentType && componentMap[contentType]
}
