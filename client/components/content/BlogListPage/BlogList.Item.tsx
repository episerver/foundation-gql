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

export const BlogListItem: React.FC<BlogItemPage> = ({
  BlogName,
  Author,
  TeaserText,
  MainBody,
  Created
}) => {
  const formattedDate = new Date(Created).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
  const readTime = Math.round(MainBody.split(" ").length / 10)

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
        <Stack>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {BlogName}
          </Heading>
          <Text color={"gray.500"}>{TeaserText}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{Author}</Text>
            <Text color={"gray.500"}>
              {formattedDate} · {readTime} min read
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}
