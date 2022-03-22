import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
  },
  components: {
    Checkbox: {
      baseStyle: {
        label: {
          flex: 1,
        },
      },
    },
  },
})
