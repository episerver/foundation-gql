import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
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
