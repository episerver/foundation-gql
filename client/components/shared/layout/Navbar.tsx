import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons"
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react"

import { NextLink } from "../NextLink"

import { LocaleSelector } from "./LocaleSelector"

import { Route } from "client/sitemap"

type NavbarProps = {
  home: Route
  path: string
  locales: LanguageModel[]
}

const DesktopNav: React.FC<NavbarProps> = ({ home, path }) => {
  const linkColor = useColorModeValue("gray.600", "gray.200")
  const linkHoverColor = useColorModeValue("gray.800", "white")
  const popoverContentBgColor = useColorModeValue("white", "gray.800")

  return (
    <Stack direction={"row"} spacing={4} align={"center"}>
      {home.subRoutes?.map((route) => (
        <Box key={route.name}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <NextLink
                href={route.path ?? "#"}
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  color: linkHoverColor,
                }}
                bg={route.path === path ? "gray.200" : "transparent"}
                borderRadius={4}
              >
                {route.name}
              </NextLink>
            </PopoverTrigger>

            {route.subRoutes && route.subRoutes.length > 0 && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack maxH={400} overflow={"auto"}>
                  {route.subRoutes.map((child) => (
                    <DesktopSubNav key={child.name} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav: React.FC<Route> = ({ name, path }) => {
  return (
    <NextLink
      href={path}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text transition={"all .3s ease"} _groupHover={{ color: "pink.400" }} fontWeight={500}>
            {name}
          </Text>
          <Text fontSize={"sm"}>{name}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </NextLink>
  )
}

const MobileNav: React.FC<NavbarProps> = ({ home }) => {
  return (
    <Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{ md: "none" }}>
      {home.subRoutes?.map((route) => (
        <MobileNavItem key={route.path} {...route} />
      ))}
    </Stack>
  )
}

const MobileNavItem: React.FC<Route> = ({ name, path, subRoutes }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={subRoutes && onToggle}>
      <Flex
        py={2}
        as={NextLink}
        href={path}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
          {name}
        </Text>
        {subRoutes && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {subRoutes?.map(({ name, path }) => (
            <NextLink key={path} py={2} href={path}>
              {name}
            </NextLink>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

export const Navbar: React.FC<NavbarProps> = (props) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box pos={"sticky"} top={0} zIndex={999}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
          align={"center"}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <NextLink href={props.home.path || "#"}>
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
              fontSize={"x-large"}
            >
              {props.home.name}
            </Text>
          </NextLink>

          <Flex display={{ base: "none", md: "flex" }} ml={10} align={"center"}>
            <DesktopNav {...props} />
          </Flex>
        </Flex>

        {props.locales && (
          <Stack mr={10}>
            <LocaleSelector locales={props.locales} />
          </Stack>
        )}

        <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
          <Button as={"a"} fontSize={"sm"} fontWeight={400} variant={"link"} href={"#"}>
            Sign In
          </Button>
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            _hover={{
              bg: "pink.300",
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav {...props} />
      </Collapse>
    </Box>
  )
}
