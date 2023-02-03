import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"

export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          scope: "openid profile email api://57413648-65f9-4093-9078-120cdd6cd901/tasks.read",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      // Persist the OAuth access_token to the token right after sign-in
      if (account) {
        console.log({ token, account, profile, user })
        token.accessToken = account.access_token
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
  theme: {
    colorScheme: "light",
  },
})
