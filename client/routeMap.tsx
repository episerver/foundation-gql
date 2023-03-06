import { IContent } from "generated"
import { getContentType } from "./utils/content.utils"

export type RouteProps = {
  route: IContent | undefined
}

export class Route implements IContent {
  private routeMap: Dict<Route> = {}
  constructor(private navItem: IContent) {}

  ContentLink = this.navItem.ContentLink
  ParentLink = this.navItem.ParentLink
  ContentType = this.navItem.ContentType
  Name = this.navItem.Name
  RelativePath = this.navItem.RelativePath
  ExistingLanguages = this.navItem.ExistingLanguages

  get subRoutes() {
    return Object.values(this.routeMap)
  }

  set parent(parent: Route | undefined) {
    if (parent) {
      parent.routeMap[this.ContentLink?.GuidValue ?? ''] = this
    }
  }
}

export class RouteMap {
  private routeMap: Dict<Route> = {}
  home?: Route
  locales: Dict<string>

  constructor(navItems: IContent[]) {
    console.table(navItems, ["RelativePath", "ContentLink"])
    this.bindRouteMap(navItems, this.routeMap)
    this.bindSubRoutes(this.routeMap)

    this.home = this.routes.find((route) => getContentType(route?.ContentType as string[]) === "HomePage")
    this.locales = this.routes.reduce((acc, route) => {
      route?.ExistingLanguages?.forEach((language) => {
        const name: string = language?.Name as string
        acc[name] = language?.DisplayName as string
      })
      return acc
    }, {} as Dict<string>)
  }

  get routes() {
    return Object.values(this.routeMap)
  }

  getRoute(path: string) {
    return Object.values(this.routeMap).find((route) => route.RelativePath === path)
  }

  private bindSubRoutes(routeMap: Dict<Route>) {
    Object.values(routeMap).forEach((route) => {
      const parent = routeMap[route!.ParentLink!.GuidValue!]
      route.parent = parent
    })
  }

  private bindRouteMap(navItems: IContent[], routeMap: Dict<Route>) {
    navItems.forEach((navItem) => {
      const route = new Route(navItem)
      routeMap[route!.ContentLink!.GuidValue!] = route
    }, routeMap)
  }
}
