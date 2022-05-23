import { useRouter as useNextRouter } from "next/router"

import { DEFAULT_LOCALE } from "client/constants"

const defaults = {
  locale: DEFAULT_LOCALE,
}

export const useRouter = (config?: Partial<typeof defaults>) => {
  const router = useNextRouter()
  const page = router.query.page as string[]
  const cfg = { ...config, ...defaults }
  const [locale = cfg.locale.Name, ...route] = page || []
  const segments = route.filter((x) => x)
  const getPath = (locale: string) => ["", locale, ...segments].join("/")
  const getLocale = () => locale.toUpperCase()

  return {
    router,
    locale: getLocale(),
    path: getPath(locale),
    getLocale,
    getPath,
  }
}
