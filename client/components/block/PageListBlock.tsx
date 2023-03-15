import {
  Box,
  Divider,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react"

import { NextLink } from "../shared/NextLink"
import { PageListBlock, usePageListQueryQuery } from "generated"
import parse from 'html-react-parser';

export const PageListBlockComponent: React.FC<{props: PageListBlock}> = ({props}) => {

  const { data } = usePageListQueryQuery({
    variables: {
      limit: props?.Count,
      ancestors: props?.Roots![0]?.ContentLink?.GuidValue
    }
  });

  return (
    <>
      <Heading>{props?.Heading}</Heading>
      <Divider my={4} />
      <SimpleGrid columns={[1, 1, 2, 3]} spacing={1} w={"full"}>
        {data?.StandardPage?.items?.map((item) => (
          <LinkBox key={item?.ContentLink?.GuidValue} pos={"relative"} height={300} color={"white"}>
            <LinkOverlay href={item?.RelativePath ?? ''} as={NextLink} />
            <Box
              pos={"absolute"}
              w={"full"}
              h={"full"}
              backdropFilter={"blur(2px) brightness(70%)"}
            >
              <Text
                px={5}
                py={5}
                fontSize={"1.2em"}
                color={"white"}
                textShadow={"2px 2px 5px black"}
              >
                { parse(item?.TeaserText ?? '') }
              </Text>
              <Text
                pos={"absolute"}
                fontSize={"1.5em"}
                px={5}
                py={3}
                backgroundColor={"#000000cf"}
                bottom={0}
                zIndex={1}
              >
                {item?.Name ?? ''}
              </Text>
            </Box>
            <Image fit="cover" w={"full"} h={"full"} src={item?.PageImage?.Url ?? ''} alt="" />
          </LinkBox>
        ))}
      </SimpleGrid>
    </>
  )
}
