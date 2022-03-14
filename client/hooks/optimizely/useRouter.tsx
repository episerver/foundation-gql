import { useRouter as useNextRouter } from "next/router"

export const useRouter = () => {
  const router = useNextRouter()
  const page = router.query.page as string[]
  const [...fragments] = page || []

  return {
    router,
    path: fragments.join("/"),
  }
}
