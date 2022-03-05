type Dict<T = any> = Record<string, T>
type State<S = undefined> = [S | undefined, Dispatch<SetStateAction<S>>]
