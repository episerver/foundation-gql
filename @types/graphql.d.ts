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

type Content<T> = {
  items: T[]
}

type Facet<T extends { [k: string]: FacetItem[] }> = {
  facets: T
}
