import { Text } from "@chakra-ui/react"

export const TextBlock: BlockComponent<TextBlock> = ({ data }) => {
  return (
    <Text
      color={data.MainBody ? "inherit" : "red"}
      border={data.MainBody ? "inherit" : "1px solid red"}
    >
      {data.MainBody || "Missing TextBlock data"}
    </Text>
  )
}
