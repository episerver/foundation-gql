import { getContentPath, getContentType } from "./utils/content.utils"

export type Route = {
  name: string
  path: string
  contentType?: string
  subRoutes?: Array<Route>
}

type RouteMap = Record<string, Route | undefined>

export class SiteMap {
  private _home: Route
  private _routeMap: RouteMap

  constructor(home: NavigationItem) {
    this._routeMap = {}
    this._home = this.mapNavItem(home)
  }

  get home() {
    return this._home
  }

  get navItems() {
    return this._home.subRoutes
  }

  getRoute(path: string) {
    return this._routeMap[path]
  }

  private mapNavItem = (content: NavigationItem) => {
    const contentPath = getContentPath(content.Url!)
    const route: Route = {
      name: content.Name,
      path: contentPath,
      contentType: getContentType(content.ContentType),
      subRoutes: content._children?.Content.items.map(this.mapNavItem),
    }
    this._routeMap[contentPath] = route
    return route
  }
}
