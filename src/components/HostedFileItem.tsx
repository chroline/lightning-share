import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";

import { useViewController } from "../ViewController";

export const HostedFileItem: React.FC<{ wordCode: string; filename: string }> = ({ wordCode, filename }) => {
  const [, setView] = useViewController();

  return (
    <Stack spacing={4} borderWidth={"1px"} borderRadius={"md"} p={4}>
      <Box>
        <Text fontWeight={"medium"} fontSize={"md"}>
          File
        </Text>
        <Input value={filename} isReadOnly variant={"flushed"} />
      </Box>
      <Button colorScheme={"green"} onClick={() => setView({ slug: "file", params: { wordCode } })}>
        View file info
      </Button>
    </Stack>
  );
};
