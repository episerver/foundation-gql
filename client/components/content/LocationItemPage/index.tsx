import { Box, Container, Divider, Heading, List, ListItem, Text } from "@chakra-ui/react"

import { useQuery } from "client/hooks/optimizely/useQuery"
import { useRouter } from "client/hooks/optimizely/useRouter"
import LocationItemQuery from "gql/LocationItemQuery.gql"

type LocationItemQueryResult = {
  LocationItemPage: LocationItemPage
}

export default function LocationItemPage() {
  const { path } = useRouter()
  const { data } = useQuery<LocationItemQueryResult>(LocationItemQuery, {
    variables: {
      route: `%${path}/`,
    },
  })
  const location = data?.LocationItemPage.items[0]

  return (
    (location && (
      <Container maxW={"container.md"}>
        <Heading size={"2xl"} textAlign={"center"} my={10}>
          {location.Location}
        </Heading>
        <Text fontSize={"large"} my={6}>
          {location.IntroText}
        </Text>
        <Divider my={5} />

        <Box>
          <Text
            fontSize={{ base: "16px", lg: "18px" }}
            color={"yellow.500"}
            fontWeight={"500"}
            textTransform={"uppercase"}
            mb={"4"}
          >
            Details
          </Text>

          <List spacing={2}>
            <ListItem>
              <Text as={"span"} fontWeight={"bold"}>
                Country:
              </Text>{" "}
              {location.Country}
            </ListItem>
            <ListItem>
              <Text as={"span"} fontWeight={"bold"}>
                Continent:
              </Text>{" "}
              {location.Continent}
            </ListItem>
            <ListItem>
              <Text as={"span"} fontWeight={"bold"}>
                Average Temperature:
              </Text>{" "}
              {location.AvgTemp}
            </ListItem>
            <ListItem>
              <Text as={"span"} fontWeight={"bold"}>
                Longitude:
              </Text>{" "}
              {location.Longitude}
            </ListItem>
            <ListItem>
              <Text as={"span"} fontWeight={"bold"}>
                Latitude:
              </Text>{" "}
              {location.Latitude}
            </ListItem>
          </List>
        </Box>

        {/* <Text whiteSpace={"break-spaces"}>
          {JSON.stringify(data.LocationItemPage.items[0], undefined, 2)}
        </Text> */}
      </Container>
    )) ||
    null
  )
}
