import { SearchIcon } from "@chakra-ui/icons"
import { Divider, Input, InputGroup, InputLeftElement, VStack } from "@chakra-ui/react"
import { Ref, useCallback, useEffect, useState } from "react"

import { SearchResultItem } from "./SearchResult.Item"

import { useQuery } from "client/hooks/optimizely/useQuery"
import { useRouter } from "client/hooks/optimizely/useRouter"
import SearchQuery from "gql/SearchQuery.gql"

type SearchResult = {
  language: string
  contentTypes: string[]
  text: string
  href: string
}

type SearchQueryResult = {
  Content: Items<Content & FullText & Language>
}

export const SearchResultContainer: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [text, setText] = useState("")
  const [result, setResult] = useState<SearchResult[]>([])
  const { router } = useRouter()
  const { data } = useQuery<SearchQueryResult>(SearchQuery, {
    variables: { text: text && `%${text}%` },
    skip: !text,
  })

  const setNewSelectedIndex = useCallback(
    (index: number) => index >= 0 && index < result.length && setSelectedIndex(index),
    [result.length]
  )

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") setNewSelectedIndex(selectedIndex - 1)
      if (event.key === "ArrowDown") setNewSelectedIndex(selectedIndex + 1)
      if (event.key === "Enter") router.push(result[selectedIndex].href)
    },
    [result, router, selectedIndex, setNewSelectedIndex]
  )

  const setSearchResult = useCallback((data: SearchQueryResult | undefined, query: string) => {
    const result = (data?.Content.items || []).reduce(
      (acc, item) => [
        ...acc,
        ...item._fulltext
          .filter((x) => x.toLowerCase().includes(query.toLowerCase()))
          .map(
            (text) =>
              ({
                text: text,
                contentTypes: item.ContentType,
                language: item.Language.Name,
                href: item.RelativePath || "#",
              } as SearchResult)
          ),
      ],
      [] as SearchResult[]
    )
    setResult(result)
  }, [])

  const scrollRef: Ref<HTMLAnchorElement> = (instance) => {
    instance && instance.scrollIntoView({ behavior: "auto", block: "nearest" })
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])

  useEffect(() => {
    setSearchResult(data, text)
  }, [data, setSearchResult, text])

  return (
    <>
      <InputGroup justifyItems={"center"}>
        <InputLeftElement pointerEvents="none" height={"100%"} width={"60px"}>
          <SearchIcon color="teal.500" fontSize={"xl"} />
        </InputLeftElement>
        <Input
          placeholder="Search the docs"
          height={"68px"}
          pl={"60px"}
          fontWeight={500}
          autoFocus
          variant="unstyled"
          size="md"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </InputGroup>

      {result && result.length ? (
        <>
          <Divider />
          <VStack align={"stretch"} p={4} maxH={600} overflow={"auto"}>
            {result.map((item, i) => (
              <SearchResultItem
                key={i}
                text={item.text}
                contentTypes={item.contentTypes}
                language={item.language}
                href={item.href}
                active={i === selectedIndex}
                refObj={i === selectedIndex ? scrollRef : undefined}
                onHover={() => setNewSelectedIndex(i)}
              />
            ))}
          </VStack>
        </>
      ) : null}
    </>
  )
}
