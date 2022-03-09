import { useRouter } from "next/router"

export const useOptiRouter = () => {
  const router = useRouter()
  const page = router.query.page as string[]
  const [...fragments] = page || []

  return {
    router,
    path: fragments.join("/"),
  }
}
