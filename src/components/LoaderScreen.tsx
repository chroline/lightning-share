import React from "react";

import { Flex, CircularProgress } from "@chakra-ui/react";

export const LoaderScreen = () => (
  <Flex
    w={"full"}
    h={"full"}
    bg={"blackAlpha.700"}
    pos={"fixed"}
    top={0}
    left={0}
    zIndex={1}
    align={"center"}
    justify={"center"}
  >
    <CircularProgress isIndeterminate size={24} trackColor={"blackAlpha.700"} color={"gray.100"} />
  </Flex>
);
