# Project setup

This project is using Apollo client as graphql client and based on next.js project. In order to provide smooth navigation experience, it's developed as SPA which does not totally follow next.js best practices.

You can develop a headless Optimizely CMS app in an easy way by following guides in this tutorial which suggests tools, methods and code samples.

---

## Install

Suggested apps and tools for better local app development

- [VSCode](https://code.visualstudio.com/)
- VSCode extension: [Apollo GraphQL](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo) (optional)
- VSCode extension: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (optional)
- [Node.js 12.22.0](https://nodejs.org/) or later
- Chrome extension: [GraphQL Network Inspector](https://chrome.google.com/webstore/detail/graphql-network-inspector/ndlbedplllcgconngcnfmkadhokfaaln) (optional)

## Config

- Create `.env.local` file on the root

  > That file is required to communicate with `Content Graph` service. You can copy `.env.example` file as `.env.local` with proper values.

- Run `npm install`

- Run `npm run update:types` command (optional)

  > If you use your own custom content types, it's better to run the command in order to update `possibleTypes.json` file

## Develop

- Run `npm run dev` command

## Deploy

Since that project is using next.js structure, you can deploy your app to your [vercel](https://vercel.com/) account which with built-in CI/CD and edge capabilities.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fepiserver%2Ffoundation-gql&env=NEXT_PUBLIC_OPTIQ_URL,NEXT_PUBLIC_OPTIQ_AUTH&project-name=foundation&repo-name=foundation-gql&demo-title=Foundation%20%7C%20Content%20Graph&demo-description=Optimizely%20CMS%20foundation%20demo%20implementation%20with%20Content%20Graph&demo-url=https%3A%2F%2Ffoundation-gql.vercel.app&demo-image=https%3A%2F%2Fi.imgur.com%2FOKJvLdB.png)
