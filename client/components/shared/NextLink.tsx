import { forwardRef, Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react"
import Link, { LinkProps as NextLinkProps } from "next/link"

type LinkProps = NextLinkProps & ChakraLinkProps

export const NextLink = forwardRef<LinkProps, "a">(({ href, children, ...props }, ref) => {
  return (
    <Link href={href} {...props} passHref>
      <ChakraLink
        ref={ref}
        _hover={{
          textDecoration: "none",
        }}
        {...props}
      >
        {children}
      </ChakraLink>
    </Link>
  )
})
