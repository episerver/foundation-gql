import { FieldPolicy } from "@apollo/client"

export function cursorPagination<T, C extends { items: T[], cursor: string, total: number }>(): FieldPolicy {
  return {
    keyArgs: ["where", "orderBy"],
    merge(existing: C | undefined, incoming: C) {
      const merged = { ...existing, ...incoming }
      merged.items = [...(existing?.items || []), ...incoming.items]
      return merged
    },
  }
}
