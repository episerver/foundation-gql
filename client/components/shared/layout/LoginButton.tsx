import { Button, Flex, Text } from "@chakra-ui/react"
import { useSession, signIn, signOut } from "next-auth/react"
export const LoginButton = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <Flex gap={2} ml={4} align={"center"}>
        <Text
          whiteSpace={"nowrap"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          fontWeight={"semibold"}
        >
          {session.user?.email}
        </Text>
        <Button onClick={() => signOut()}>Sign out</Button>
      </Flex>
    )
  }
  return (
    <Button ml={4} onClick={() => signIn()}>
      Sign in
    </Button>
  )
}
