import { Text, TextProps } from "@chakra-ui/react"

type XHTMLContentProps = TextProps & {
  children: string | undefined
}

const headingStyle = {
  mt: "1rem",
  mb: "1rem",
}

export const XHTMLContent: React.FC<XHTMLContentProps> = ({ children, ...rest }) => {
  return (
    <Text
      sx={{
        p: {
          mb: "1rem",
          mt: "1rem",
        },
        ul: {
          pl: "2rem",
        },
        h1: {
          fontSize: "4xl",
          fontWeight: "bold",
          ...headingStyle,
        },
        h2: {
          fontSize: "3xl",
          fontWeight: "bold",
          ...headingStyle,
        },
        h3: {
          fontSize: "2xl",
          ...headingStyle,
        },
        h4: {
          fontSize: "xl",
          ...headingStyle,
        },
        tbody: {
          borderTop: "2px solid currentColor",
        },
      }}
      dangerouslySetInnerHTML={{ __html: children || "" }}
      {...rest}
    />
  )
}
