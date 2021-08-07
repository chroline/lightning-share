import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { HeartIcon } from "@heroicons/react/solid";
import React from "react";

export const Footer = () => (
  <Stack
    direction={{ base: "column", sm: "row" }}
    h={20}
    w={"full"}
    px={8}
    align={"center"}
    justify={"center"}
    flexShrink={0}
    spacing={2}
  >
    <HStack spacing={1}>
      <Text>made with</Text>
      <Box w={5} color={"rose.600"}>
        <HeartIcon />
      </Box>
      <Text>by Cole Gawin</Text>
    </HStack>
    {/*<Text display={{ base: "none", sm: "block" }}>•</Text>
    <Button as={"a"} variant={"link"} href={"https://projects.colegaw.in/lighting-share"} target={"_blank"}>
      Read about Lightning Share
    </Button>*/}
  </Stack>
);
