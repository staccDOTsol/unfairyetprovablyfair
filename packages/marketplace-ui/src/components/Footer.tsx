import {
  Center,
  Container,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { RiExternalLinkLine } from "react-icons/ri";
const sections = [
  {
    title: "Social",
    items: [
      {
        title: "@STACCArt",
        href: "https://twitter.com/STACCArt",
      },
    ],
  },
  {
    title: "DYOR",
    items: [
      {
        title: "Github",
        href: "https://github.com/staccDOTsol",
      },
      {
        title: "Roadmap",
        href: "https://hackernoon.com/preview/ecnPaRfyGF5G1lL7sF9N",
      },
      {
        title: "Manifesto",
        href: "https://hackernoon.com/preview/plldDkBVadTqNWSfLa3l",
      },
      {
        title: "Manifesto: Elaboration",
        href: "https://hackernoon.com/hehimmaster-of-discovery",
      },
    ],
  },
  {
    title: "Apps",
    items: [
      {
        title: "Social",
        href: "https://autist.design",
      },
      {
        title: "Launchpad",
        href: "https://dyor.market",
      },
    ],
  },
];
export const Footer = () => {
  return (
    <VStack backgroundColor="#303846" padding="29px">
      <Container maxW="container.lg">
        <Stack spacing={16} direction={["column", "row"]}>
          {sections.map(({ title, items }) => (
            <VStack align="left" key={title}>
              <Text fontWeight={700} fontSize="15px" color="white">
                {title}
              </Text>
              {items.map((item) => (
                <Link
                  href={item.href}
                  key={item.title}
                  fontWeight={400}
                  fontSize="15px"
                  color="orange.500"
                  isExternal
                >
                  <HStack spacing={1}>
                    <Text>{item.title}</Text>
                    <Icon as={RiExternalLinkLine} />
                  </HStack>
                </Link>
              ))}
            </VStack>
          ))}
        </Stack>
      </Container>
      <Center textColor="rgba(255, 255, 255, 0.49)" w="full">
        Copyright © 2022 Jare&apos;s Crypto and Not Holding Co.
      </Center>
    </VStack>
  );
};
