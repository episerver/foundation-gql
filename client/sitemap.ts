import { getContentType } from "./utils/content.utils"

export type Route = {
  name: string
  path: string
  contentType?: string
  subRoutes?: Array<Route>
}

type RouteMap = Record<string, Route | undefined>

export class SiteMap {
  private _routeMap: RouteMap
  private _home: Route
  private _locales: LanguageModel[]

  constructor(home: NavigationItem) {
    this._routeMap = {}
    this._home = this.mapNavItem(home)
    this._locales = home.ExistingLanguages
    console.table(Object.values(this._routeMap), ["path", "contentType", "name", "subRoutes"])
  }

  get home() {
    return this._home
  }

  get navItems() {
    return this._home.subRoutes
  }

  get locales() {
    return this._locales
  }

  getRoute(path: string) {
    return this._routeMap[path]
  }

  private mapNavItem = (content: NavigationItem) => {
    const contentPath = content.RelativePath
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
