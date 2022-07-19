# Project structure

Most of the existing folders/files are based on next.js project structure. In order to ease local development, there are couple of convention that are followed.

When you load a page, app component hierarchy will be similar the state below.

- `App`: (top level wrapper)
  - `ClientOnly` (ensure to load app once on the client)
    - `ChakraProvider` (store chakra context)
      - `ApolloProvider` (stores apollo client)
        - `LayoutProvider` (stores all available routes)
          - `Page` (dynamic page load for current route)

## Next.js components

Next.js apps use `pages` folder to identify request and navigate related content. Since that project is in SPA format, we should catch any path and load app only once then navigate to proper page on the client side.

- `pages/_app.tsx` file is the entry point of any next.js app. It's used for loading global stylesheet file.
- `pages/[[..page]].tsx` file captures any sub route and load `App` as SPA.

## GraphQL queries

All graphql queries are stored under `gql` folder. Fragments are supported by default.

You can create a new graphql query with function wrapper then reference it from any component.

## React components

As it's mentioned before, in order to provide smooth navigation experience, that app had designed as SPA.

### App

- `App`: Wrapper component top on `Layout.tsx` that contains `apollo` client and `chakra` UI lib provider
- `ChakraProvider`: UI library to build react app
- `ApolloProvider`: HOC that contains apollo client that interacts with Content Graph API.

### Layout

`Layout` component contains app state (data fetch, existing routes etc.) and resolves page view respect to current path.

### UI components

You can add any React component under `client/components` folder. By default components are grouped as `block`, `page` and `shared` concepts.

### Hooks

- `useLayout`: Allow to access `LayoutContext` which stores app-wide available data. One of the use case is `loading` status.

- `useQuery`: Allow to execute graphql query via apollo client. It's using `ApolloProvider` context which is initiated in `App.tsx` file.

- `useRouter`: Allow to interact with next.js router which store active routing info as well.
