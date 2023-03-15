import { SunIcon } from "@chakra-ui/icons"
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Tag,
  TagLabel,
  TagLeftIcon,
  LinkOverlay,
  LinkBox,
  Image,
  Wrap,
} from "@chakra-ui/react"

import { NextLink } from "client/components/shared/NextLink"

export const LocationListItem: React.FC<{
  Country: string,
  IntroText: string,
  AvgTemp: number,
  Continent: string,
  Created: Date,
  Location: string,
  RelativePath: string,
  ImageUrl: string
}> = ({Country, IntroText, AvgTemp, Continent, Created, Location, RelativePath, ImageUrl}) => {
  const formattedDate =
    Created &&
    new Date(Created).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  const readTime = IntroText && `${Math.round(IntroText.split(" ").length / 10)} min read`

  return (
    <Center>
      <LinkBox>
        <LinkOverlay href={RelativePath || "#"} as={NextLink}></LinkOverlay>
        <Box
          maxW={"445px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
        >
          <Box h={"210px"} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
            <Image
              w={"full"}
              h={"full"}
              fit={"cover"}
              src={ImageUrl}
              alt={""}
            />
          </Box>
          <Stack>
            <Wrap justify={"space-between"}>
              <Wrap>
                <Text
                  color={"green.500"}
                  textTransform={"uppercase"}
                  fontWeight={800}
                  fontSize={"sm"}
                  letterSpacing={1.1}
                >
                  {Country}
                </Text>
                <Text color={"blackAlpha.400"} ml={2} mr={1}>
                  |
                </Text>
                <Text
                  color={"green.500"}
                  textTransform={"uppercase"}
                  fontWeight={300}
                  fontSize={"sm"}
                  letterSpacing={1.1}
                >
                  {Continent}
                </Text>
              </Wrap>
              <Tag size={"sm"} variant="subtle" colorScheme="pink">
                <TagLeftIcon as={SunIcon} />
                <TagLabel>{AvgTemp + " °C"}</TagLabel>
              </Tag>
            </Wrap>
            <Heading
              color={useColorModeValue("gray.700", "white")}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              {Location}
            </Heading>
            <Text color={"gray.500"}>{IntroText}</Text>
          </Stack>
          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Avatar src={"https://avatars0.githubusercontent.com/u/1164541?v=4"} />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>Achim Rolle</Text>
              <Text color={"gray.500"}>
                {[formattedDate, readTime].filter((x) => x).join(" · ")}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </LinkBox>
    </Center>
  )
}
