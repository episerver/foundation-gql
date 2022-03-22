import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react"
import { Ref } from "react"
import { GrDocument, GrImage, GrCube } from "react-icons/gr"

import { NextLink } from "client/components/shared/NextLink"
import { getContentType } from "client/utils/content.utils"

type SearchResultItemProps = {
  contentTypes: string[]
  language: string
  text: string
  href: string
  active?: boolean
  onHover: Function
  refObj?: Ref<HTMLAnchorElement>
}

const getIcon = (contentTypes: string[]) => {
  if (contentTypes.includes("Image")) return GrImage
  if (contentTypes.includes("Block")) return GrCube
  return GrDocument
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  text,
  contentTypes,
  language,
  href,
  active,
  onHover,
  refObj,
}) => {
  const title = getContentType(contentTypes)

  return (
    <NextLink
      ref={refObj}
      href={href}
      _active={{
        boxShadow: "none",
      }}
      _focus={{
        boxShadow: "none",
      }}
    >
      <Box
        bg={active ? "teal.500" : "gray.100"}
        borderRadius={5}
        p={4}
        onMouseOver={() => onHover()}
        sx={{
          cursor: "pointer",
        }}
      >
        <HStack align={"stretch"}>
          <Box mr={2}>
            <Icon
              fontSize={24}
              h={"100%"}
              color={active ? "whiteAlpha.500" : "blackAlpha.300"}
              as={getIcon(contentTypes)}
            />
          </Box>
          <VStack align={"start"} spacing={0}>
            {title && (
              <Text
                color={active ? "whiteAlpha.700" : "blackAlpha.600"}
                fontWeight={"medium"}
                fontSize={12}
              >
                {title} {language && `[${language}]`}
              </Text>
            )}
            <Text color={active ? "white" : "gray.700"} fontWeight={"semibold"}>
              {text}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </NextLink>
  )
}
