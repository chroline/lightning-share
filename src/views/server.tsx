import { useRef, useState } from "preact/hooks";

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useShallowCompareEffect } from "react-use";
import { AsyncState } from "react-use/lib/useAsyncFn";

import { useViewController } from "../ViewController";
import { HostedFileItem } from "../components/HostedFileItem";
import { FileMagnifyingGlassIcon } from "../components/icons/file-magnifying-glass";
import AuthService from "../services/auth";
import ErrorHandlingService from "../services/error-handling";
import FileService from "../services/file";
import UserDataService from "../services/user-data";

export default function ServerView({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [hostedFilesState, setHostedFilesState] = useState<AsyncState<[string, string][]>>({ loading: true });

  useShallowCompareEffect(
    function loadHostedFiles() {
      if (AuthService.I.userInfo$.value?.isAnonymous) return;

      try {
        UserDataService.I.getHostedFiles()
          .then(hostedFiles =>
            Promise.all(
              hostedFiles.map(async fileId => {
                const { name } = await FileService.I.getInfo(fileId);
                return [fileId, name] as [string, string];
              }) || []
            )
          )
          .then(files => setHostedFilesState({ loading: false, value: files }));
      } catch (e) {
        setHostedFilesState({ loading: false, error: e });
        ErrorHandlingService.I.notifyUserOfError("Error loading hosted files", e);
        onClose();
      }
    },
    [isOpen]
  );

  const initialRef = useRef();

  const { colorMode } = useColorMode();
  const [, setView] = useViewController();

  return (
    <>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen} initialFocusRef={initialRef as any}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton ref={initialRef as any} />
          <DrawerHeader>
            <Heading fontSize={"xl"}>Hosted files</Heading>
          </DrawerHeader>
          <DrawerBody pt={4}>
            <Stack spacing={4} minH={"full"}>
              {(() => {
                if (AuthService.I.userInfo$.value?.isAnonymous) {
                  return (
                    <Flex align={"center"} justify={"center"} flex={1}>
                      <VStack color={`gray.${colorMode === "light" ? 500 : 400}`}>
                        <Box w={8} mb={2}>
                          <FileMagnifyingGlassIcon sx={{ strokeWidth: 1.5 }} />
                        </Box>
                        <Text fontSize={"md"} fontWeight={"medium"} textAlign={"center"}>
                          <Link
                            color={`blue.${colorMode === "light" ? 500 : 400}`}
                            onClick={() => setView({ slug: "auth" })}
                          >
                            Sign in
                          </Link>{" "}
                          to view hosted files
                        </Text>
                      </VStack>
                    </Flex>
                  );
                }
                if (!hostedFilesState.value || hostedFilesState.value.length === 0) {
                  return (
                    <Flex align={"center"} justify={"center"} flex={1}>
                      <VStack color={`gray.${colorMode === "light" ? 500 : 400}`}>
                        <Box w={8} mb={2}>
                          <FileMagnifyingGlassIcon sx={{ strokeWidth: 1.5 }} />
                        </Box>
                        <Text fontSize={"md"} fontWeight={"medium"} textAlign={"center"}>
                          No hosted files
                        </Text>
                      </VStack>
                    </Flex>
                  );
                } else {
                  return hostedFilesState.value?.map(([fileId, name]) => (
                    <HostedFileItem key={fileId} wordCode={fileId} filename={name} />
                  ));
                }
              })()}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
