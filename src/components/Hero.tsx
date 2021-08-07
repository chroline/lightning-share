import { Box, Button, Flex, Heading, Stack, Text, useColorMode, VStack } from "@chakra-ui/react";
import { DownloadIcon, UploadIcon } from "@heroicons/react/solid";
import React from "react";

import { useViewController } from "../ViewController";

export const Hero: React.FC = () => {
  const [, setView] = useViewController();

  const { colorMode } = useColorMode();

  return (
    <Flex align={"center"} justify={"center"} flex={1}>
      <Box p={8}>
        <VStack spacing={4}>
          <Heading as={"h1"} fontSize={"6xl"} color={"green.500"} fontWeight={"bold"} lineHeight={"none"}>
            LIGHTNING SHARE
          </Heading>
          <Heading as={"h2"} fontSize={"3xl"} fontWeight={"normal"}>
            send files to other devices,{" "}
            <Text as={"span"} color={"yellow.500"} fontWeight={"medium"}>
              lightning fast.
            </Text>
          </Heading>
          <Stack direction={{ base: "column", md: "row" }} pt={6} w={"full"} justify={"center"}>
            <Button
              size={"lg"}
              leftIcon={
                <Box w={5}>
                  <UploadIcon />
                </Box>
              }
              colorScheme={{ light: "blueGray", dark: "gray" }[colorMode]}
              shadow={"md"}
              onClick={() => setView({ slug: "upload" })}
            >
              Share new file
            </Button>
            <Button
              size={"lg"}
              leftIcon={
                <Box w={5}>
                  <DownloadIcon />
                </Box>
              }
              colorScheme={{ light: "blueGray", dark: "gray" }[colorMode]}
              shadow={"md"}
              onClick={() => setView({ slug: "download" })}
            >
              Download file
            </Button>
          </Stack>
        </VStack>
      </Box>
    </Flex>
  );
};
