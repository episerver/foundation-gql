# Foundation GraphQL example

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Demo

### https://foundation-gql.vercel.app/

---

## Development

### Environment

- VSCode
- VSCode extension: [Apollo GraphQL ](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo) (optional)
- [Node.js 12.22.0](https://nodejs.org/) or later
- Chrome extension: [GraphQL Network Inspector](https://chrome.google.com/webstore/detail/graphql-network-inspector/ndlbedplllcgconngcnfmkadhokfaaln) (optional)

### Project

- Create `.env.local` file on project root and populate with following
  ```sh
  NEXT_PUBLIC_OPTIQ_URL="https://cg.optimizely.com/content/v2"
  NEXT_PUBLIC_OPTIQ_AUTH="auth-key"
  ```
- Restore node packages
  ```bash
  npm install
  # or
  yarn
  ```
- Run dev server
  ```bash
  npm run dev
  # or
  yarn dev
  ```
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
