import { Dispatch, SetStateAction } from "react"

declare global {
  type Dict<T = any> = Record<string, T>
  type State<S = any> = [S, Dispatch<SetStateAction<S>>]

  namespace NodeJS {
    interface ProcessEnv {
      AZURE_AD_CLIENT_ID: string
      AZURE_AD_CLIENT_SECRET: string
      AZURE_AD_TENANT_ID?: string
    }
  }
}
