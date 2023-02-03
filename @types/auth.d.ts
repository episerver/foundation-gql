import NextAuth from "next-auth"

declare module "next-auth" {
  interface Profile {
    groups: string[]
  }
}
