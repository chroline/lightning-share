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
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { DocumentSearchIcon } from "@heroicons/react/outline";
import { useShallowCompareEffect } from "react-use";
import { AsyncState } from "react-use/lib/useAsyncFn";

import { HostedFileItem } from "../components/HostedFileItem";
import ErrorHandlingService from "../services/error-handling";
import FileService from "../services/file";
import UserDataService from "../services/user-data";

export default function ServerView({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [hostedFilesState, setHostedFilesState] = useState<AsyncState<[string, string][]>>({ loading: true });

  useShallowCompareEffect(
    function loadHostedFiles() {
      try {
        UserDataService.getHostedFiles()
          .then(hostedFiles =>
            Promise.all(
              hostedFiles.map(async fileId => {
                const { name } = await FileService.getInfo(fileId);
                return [fileId, name] as [string, string];
              }) || []
            )
          )
          .then(files => setHostedFilesState({ loading: false, value: files }));
      } catch (e) {
        setHostedFilesState({ loading: false, error: e });
        ErrorHandlingService.notifyUserOfError("Error loading hosted files", e);
        onClose();
      }
    },
    [isOpen]
  );

  const initialRef = useRef();

  return (
    <>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen} initialFocusRef={initialRef as any}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton ref={initialRef as any} />
          <DrawerHeader borderBottomWidth={"1px"}>
            <Heading fontSize={"xl"}>Hosted files</Heading>
          </DrawerHeader>
          <DrawerBody pt={4}>
            <Stack spacing={4} minH={"full"}>
              {hostedFilesState.value?.map(([fileId, name]) => (
                <HostedFileItem key={fileId} wordCode={fileId} filename={name} />
              ))}
              {(!hostedFilesState.value || hostedFilesState.value.length === 0) && (
                <Flex align={"center"} justify={"center"} flex={1}>
                  <VStack>
                    <Box w={12} color={"gray.500"}>
                      <DocumentSearchIcon />
                    </Box>
                    <Text fontSize={"md"} fontWeight={"medium"} textAlign={"center"}>
                      No hosted files
                    </Text>
                  </VStack>
                </Flex>
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
