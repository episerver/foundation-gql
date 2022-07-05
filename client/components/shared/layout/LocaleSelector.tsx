import { Tabs, TabList, Tab, Tooltip } from "@chakra-ui/react"

import { SiteLocales, useRouter } from "client/hooks/optimizely/useRouter"

type LocaleSelectorProps = {
  locales: SiteLocales
}

export const LocaleSelector: React.FC<LocaleSelectorProps> = ({ locales }) => {
  const { router, getPath, locale } = useRouter()

  const onLocaleChange = (index: number) => {
    const locale = Object.keys(locales)[index]
    const path = getPath(locale)
    return router.push(path)
  }

  return (
    <Tabs variant="line" colorScheme="orange" onChange={onLocaleChange}>
      <TabList>
        {Object.entries(locales).map(([name, displayName], index) => (
          <Tooltip key={index} label={displayName}>
            <Tab _hover={{ backgroundColor: "blackAlpha.50" }}>{name}</Tab>
          </Tooltip>
        ))}
      </TabList>
    </Tabs>
  )
}
