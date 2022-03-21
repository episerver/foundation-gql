import { SunIcon } from "@chakra-ui/icons"
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Flex,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react"
import Image from "next/image"

export const LocationListItem: React.FC<Partial<LocationItem>> = ({
  Country,
  IntroText,
  AvgTemp,
  Continent,
  Created,
  Location,
}) => {
  const formattedDate =
    Created &&
    new Date(Created).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  const readTime = IntroText && `${Math.round(IntroText.split(" ").length / 10)} min read`

  return (
    <Center py={6}>
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
            src={
              "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
            layout={"fill"}
            alt={""}
          />
        </Box>
        <Stack>
          <Flex justify={"space-between"}>
            <Flex>
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
            </Flex>
            <Tag size={"sm"} variant="subtle" colorScheme="pink">
              <TagLeftIcon as={SunIcon} />
              <TagLabel>{AvgTemp + " °C"}</TagLabel>
            </Tag>
          </Flex>
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
            <Text color={"gray.500"}>{[formattedDate, readTime].filter((x) => x).join(" · ")}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}
