import { Box, Heading, HStack, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, ServerIcon, SunIcon } from "@heroicons/react/outline";

import { useViewController } from "../ViewController";
import { LogoColor } from "../icons/logo-color";
import { LogoWhite } from "../icons/logo-white";

export const Navbar = () => {
  const [, setView] = useViewController();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack h={20} w={"full"} px={{ base: 4, sm: 8 }} justify={"space-between"} flexShrink={0}>
      <IconButton
        aria-label={"Toggle color mode"}
        icon={
          <Box w={6}>
            <ServerIcon />
          </Box>
        }
        onClick={() => setView({ slug: "server" })}
      />
      <HStack spacing={{ base: 0, sm: 4 }}>
        <Box w={10}>{colorMode === "dark" ? <LogoWhite /> : <LogoColor />}</Box>
        <Heading fontSize={"2xl"} fontWeight={"bold"} display={{ base: "none", sm: "block" }}>
          LIGHTNING SHARE
        </Heading>
      </HStack>
      <IconButton
        aria-label={"Toggle color mode"}
        icon={<Box w={6}>{colorMode === "dark" ? <SunIcon /> : <MoonIcon />}</Box>}
        onClick={toggleColorMode}
      />
    </HStack>
  );
};
