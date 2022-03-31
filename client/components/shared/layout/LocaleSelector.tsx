import { Tabs, TabList, Tab, Tooltip } from "@chakra-ui/react"

import { useRouter } from "client/hooks/optimizely/useRouter"

type LocaleSelectorProps = {
  locales: LanguageModel[]
}

export const LocaleSelector: React.FC<LocaleSelectorProps> = ({ locales }) => {
  const { router, getPath } = useRouter()

  const onLocaleChange = (index: number) => {
    const locale = locales[index].Name
    const path = getPath(locale)
    return router.push(path)
  }

  return (
    <Tabs variant="line" colorScheme="orange" onChange={onLocaleChange}>
      <TabList>
        {locales.map((locale, index) => (
          <Tooltip key={index} label={locale.DisplayName}>
            <Tab _hover={{ backgroundColor: "blackAlpha.50" }}>{locale.Name}</Tab>
          </Tooltip>
        ))}
      </TabList>
    </Tabs>
  )
}
