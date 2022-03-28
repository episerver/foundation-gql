import { useRouter as useNextRouter } from "next/router"

const defaults = {
  lang: "en",
  route: "",
}

export const useRouter = (config?: Partial<typeof defaults>) => {
  const router = useNextRouter()
  const page = router.query.page as string[]
  const cfg = { ...config, ...defaults }
  const [lang = cfg.lang, route = cfg.route, ...fragments] = page || []

  return {
    router,
    lang,
    path: [lang, route, ...fragments] //
      .filter((x) => x)
      .join("/"),
  }
}
