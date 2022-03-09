declare module "*.graphql" {
  import { DocumentNode } from "graphql"
  const Schema: DocumentNode

  export = Schema
}

declare module "*.gql" {
  import { DocumentNode } from "graphql"
  const Schema: DocumentNode

  export = Schema
}

type FacetItem = {
  name: string
  count: number
}

type Items<T> = {
  items: T[]
}

type Facets<T extends { [k: string]: FacetItem[] }> = {
  facets: T
}

type Children<T> = {
  _children: T
}
