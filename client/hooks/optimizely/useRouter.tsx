import { useRouter as useNextRouter } from "next/router"

import { DEFAULT_LOCALE } from "client/constants"

export type SiteLocales = Dict<string>

const defaults = {
  locale: DEFAULT_LOCALE,
}

export const useRouter = () => {
  const router = useNextRouter()
  const page = router.query.page as string[]
  const config = defaults
  const [locale = config.locale.Name, ...route] = page || []

  const segments = route.filter((x) => x)
  const getPath = (_locale = locale) => ["", _locale, ...segments].join("/")

  return {
    router,
    locale: locale.toUpperCase(),
    path: getPath(),
    getPath,
  }
}
