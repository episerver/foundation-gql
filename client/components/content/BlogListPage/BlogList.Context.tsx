import { createContext } from "react"

type BlogContextProps = {
  items: BlogItemPage[]
  facets: Partial<BlogFacets>
  filters: State<Partial<BlogFilter>>
}

export const BlogListContext = createContext<BlogContextProps>({
  items: [],
  facets: {},
  filters: [{}, () => {}],
})
