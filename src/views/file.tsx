import { useRef } from "preact/hooks";

import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import copyToClipboard from "copy-to-clipboard";
import { useAsync, useAsyncFn } from "react-use";

import { useViewController } from "../ViewController";
import AuthService from "../services/auth";
import ErrorHandlingService from "../services/error-handling";
import FileService from "../services/file";
import toast from "../util/toast";

export default function FileView({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [view] = useViewController(),
    { wordCode } = view.params || {};

  const fileState = useAsync(async () => {
    if (!wordCode) return;
    try {
      return await FileService.I.getInfo(wordCode);
    } catch (e) {
      ErrorHandlingService.I.notifyUserOfError("Error retrieving file information", e);
      onClose();
    }
  }, [wordCode]);

  const [downloadFileState, downloadFileFn] = useAsyncFn(async function downloadFile(
    wordCode: string,
    filename: string
  ) {
    try {
      await FileService.I.download(wordCode, filename);
    } catch (e) {
      ErrorHandlingService.I.notifyUserOfError("Error downloading file", e);
    }
  });

  const { isOpen: isRemoveModalOpen, onOpen: openRemoveModal, onClose: closeRemoveModal } = useDisclosure();
  const [removeFileState, removeFileFn] = useAsyncFn(async function removeFile(wordCode: string, filename: string) {
    try {
      await FileService.I.remove(wordCode, filename);
      closeRemoveModal();
      onClose();
    } catch (e) {
      ErrorHandlingService.I.notifyUserOfError("Error removing file", e);
    }
  });

  function copyWordCode() {
    try {
      copyToClipboard(wordCode);
      toast({
        title: "Word code copied!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (e) {
      ErrorHandlingService.I.notifyUserOfError("Copying word code unsuccessful", e);
    }
  }

  const initialRef = useRef();

  return (
    <>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen} initialFocusRef={initialRef as any}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth={"1px"}>
            <Heading fontSize={"xl"}>File information</Heading>
          </DrawerHeader>

          <DrawerBody pt={4}>
            <Stack spacing={4}>
              <Box>
                <FormLabel htmlFor={"filename"}>Name</FormLabel>
                <Input
                  value={fileState.value?.name || ""}
                  id={"filename"}
                  variant={fileState.loading ? "filled" : "outline"}
                  placeholder={"Loading..."}
                  isReadOnly
                />
              </Box>
              <Box>
                <FormLabel htmlFor={"filetype"}>Filetype</FormLabel>
                <Input
                  value={fileState.value?.filetype || ""}
                  id={"filetype"}
                  variant={fileState.loading ? "filled" : "outline"}
                  placeholder={"Loading..."}
                  isReadOnly
                />
              </Box>
              <Box>
                <FormLabel htmlFor={"uploadDate"}>Upload date</FormLabel>
                <Input
                  value={fileState.value?.uploadDate.toLocaleString() || ""}
                  id={"uploadDate"}
                  variant={fileState.loading ? "filled" : "outline"}
                  placeholder={"Loading..."}
                  isReadOnly
                />
              </Box>
              <Divider />
              <Box>
                <FormLabel htmlFor={"wordCode"}>Word code</FormLabel>
                <Textarea
                  ref={initialRef as any}
                  value={wordCode}
                  id={"wordCode"}
                  variant={"outline"}
                  isReadOnly
                  fontFamily={"heading"}
                  fontWeight={"medium"}
                  fontSize={"lg"}
                  focusBorderColor={"green.500"}
                />
                <Flex justify={"flex-end"} mt={2}>
                  <Button colorScheme={"green"} variant={"outline"} onClick={copyWordCode}>
                    Copy word code
                  </Button>
                </Flex>
              </Box>
            </Stack>
          </DrawerBody>
          <DrawerFooter borderTopWidth={"1px"}>
            {fileState.value?.owner === AuthService.I.userId$.value && (
              <Button
                colorScheme={"red"}
                variant={"outline"}
                mr={3}
                isLoading={removeFileState.loading}
                onClick={openRemoveModal}
              >
                Remove
              </Button>
            )}
            <Button
              colorScheme={"green"}
              isLoading={downloadFileState.loading}
              isDisabled={!fileState.value}
              onClick={() => downloadFileFn(wordCode, fileState.value!.name)}
            >
              Download
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Modal isOpen={isRemoveModalOpen} onClose={closeRemoveModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove file</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to remove this file? This action is irreversible!</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={"red"}
              isLoading={removeFileState.loading}
              onClick={() => removeFileFn(wordCode, fileState.value!.name)}
            >
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
