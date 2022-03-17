import { Dispatch, SetStateAction } from "react"

declare global {
  type Dict<T = any> = Record<string, T>
  type State<S = any> = [S, Dispatch<SetStateAction<S>>]
}
