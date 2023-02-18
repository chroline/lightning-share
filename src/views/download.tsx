import { useRef, useState } from "preact/hooks";

import {
  Button,
  FormControl,
  FormHelperText,
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
} from "@chakra-ui/react";
import { useAsyncFn } from "react-use";

import { useViewController } from "../ViewController";
import ErrorHandlingService from "../services/error-handling";
import FileService from "../services/file";
import toast from "../util/toast";

export default function DownloadView({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [, setView] = useViewController();

  const [wordCode, setWordCode] = useState<string>("");

  const [openFileState, openFileFn] = useAsyncFn(async function openFile(wordCode: string) {
    openFileState.error = undefined;

    let exists;
    try {
      exists = await FileService.I.doesExist(wordCode);
    } catch (e) {
      ErrorHandlingService.I.notifyUserOfError("Error checking for file existance", e);
      return;
    }

    if (exists) {
      await setView({ slug: "file", params: { wordCode } });
      setWordCode("");
    } else {
      toast({
        title: "This file doesn't exist",
        status: "error",
        duration: undefined,
        isClosable: true,
      });
      throw new Error();
    }
  });

  const _onClose = () => {
    onClose();
    setWordCode("");
  };

  const initialRef = useRef();

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={_onClose} initialFocusRef={initialRef as any}>
        <ModalOverlay />
        <ModalContent mx={3}>
          <ModalHeader>
            <Heading fontSize={"xl"}>Download file</Heading>
          </ModalHeader>
          <ModalCloseButton onClick={_onClose} />
          <ModalBody>
            <form
              onSubmit={async e => {
                e.preventDefault();
                await openFileFn(wordCode);
              }}
            >
              <FormControl id={"wordCode"} isInvalid={!!openFileState.error}>
                <FormLabel>Word code</FormLabel>
                <Input
                  ref={initialRef as any}
                  placeholder={"3-word unique code"}
                  size={"lg"}
                  fontFamily={"heading"}
                  fontWeight={"medium"}
                  fontSize={"lg"}
                  value={wordCode}
                  onChange={e => {
                    openFileState.error = undefined;
                    setWordCode(e.target.value);
                  }}
                  onSubmit={() => openFileFn(wordCode)}
                />
                <FormHelperText>Enter the word code that is displayed on the file information page.</FormHelperText>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={"green"}
              mr={3}
              isDisabled={wordCode.split(" ").length !== 3}
              onClick={() => openFileFn(wordCode)}
            >
              Open file
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
