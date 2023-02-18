import { Box, Heading, HStack, IconButton, useColorMode } from "@chakra-ui/react";

import { useViewController } from "../ViewController";
import { LogoColor } from "./icons/logo-color";
import { LogoWhite } from "./icons/logo-white";
import { MoonStarsIcon } from "./icons/moon-stars";
import { ServerIcon } from "./icons/server";
import { SunIcon } from "./icons/sun";
import { UserIcon } from "./icons/user";

export const Navbar = () => {
  const [, setView] = useViewController();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack h={20} w={"full"} px={{ base: 4, sm: 8 }} justify={"space-between"} flexShrink={0}>
      <HStack>
        <IconButton
          aria-label={"Toggle color mode"}
          icon={
            <Box w={6}>
              <ServerIcon sx={{ strokeWidth: 2 }} />
            </Box>
          }
          onClick={() => setView({ slug: "server" })}
        />
        <IconButton
          aria-label={"Manage account"}
          icon={
            <Box w={6}>
              <UserIcon sx={{ strokeWidth: 2 }} />
            </Box>
          }
          onClick={() => setView({ slug: "auth" })}
        />
      </HStack>
      <HStack spacing={{ base: 0, sm: 4 }} position={"absolute"} left={"50%"} transform={"translateX(-50%)"}>
        <Box w={10}>{colorMode === "dark" ? <LogoWhite /> : <LogoColor />}</Box>
        <Heading fontSize={"2xl"} fontWeight={"bold"} display={{ base: "none", sm: "block" }}>
          LIGHTNING SHARE
        </Heading>
      </HStack>
      <IconButton
        aria-label={"Toggle color mode"}
        icon={
          <Box w={6}>
            {colorMode !== "dark" ? <SunIcon sx={{ strokeWidth: 2 }} /> : <MoonStarsIcon sx={{ strokeWidth: 2 }} />}
          </Box>
        }
        onClick={toggleColorMode}
      />
    </HStack>
  );
};
