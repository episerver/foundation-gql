import { getContentType } from "./utils/content.utils"

export class Route implements IRoute {
  private routeMap: Dict<Route> = {}
  constructor(private navItem: NavigationItem) {}

  id = this.navItem.ContentLink.GuidValue
  parentId = this.navItem.ParentLink?.GuidValue
  contentType = getContentType(this.navItem.ContentType)
  name = this.navItem.Name
  path = this.navItem.RelativePath
  language = this.navItem.ExistingLanguages

  get subRoutes() {
    return Object.values(this.routeMap)
  }

  set parent(parent: Route | undefined) {
    if (parent) {
      parent.routeMap[this.id] = this
    }
  }
}

export class RouteMap {
  private routeMap: Dict<Route> = {}
  home?: Route
  locales: Dict<string>

  constructor(navItems: NavigationItem[]) {
    console.table(navItems, ["RelativePath", "ContentLink"])
    this.bindRouteMap(navItems, this.routeMap)
    this.bindSubRoutes(this.routeMap)
    // console.table(this.routes, ["path", "contentType", "name"])
    // console.log(this)

    this.home = this.routes.find((route) => route.contentType === "HomePage")
    this.locales = this.routes.reduce((acc, route) => {
      route.language.forEach((language) => {
        acc[language.Name] = language.DisplayName
      })
      return acc
    }, {} as Dict<string>)
  }

  get routes() {
    return Object.values(this.routeMap)
  }

  getRoute(path: string) {
    return Object.values(this.routeMap).find((route) => route.path === path)
  }

  private bindSubRoutes(routeMap: Dict<Route>) {
    Object.values(routeMap).forEach((route) => {
      if (route.parentId) {
        const parent = routeMap[route.parentId]
        route.parent = parent
      }
    })
  }

  private bindRouteMap(navItems: NavigationItem[], routeMap: Dict<Route>) {
    navItems.forEach((navItem) => {
      const route = new Route(navItem)
      routeMap[route.id] = route
    }, routeMap)
  }
}
