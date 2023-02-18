import { lazy, Suspense } from "preact/compat";
import { useState } from "preact/hooks";

import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { registerPlugin } from "filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useAsyncFn } from "react-use";

import { useViewController } from "../ViewController";
import ErrorHandlingService from "../services/error-handling";
import FileService from "../services/file";
import toast from "../util/toast";

const FilePond = lazy(async () => (await import("react-filepond")).FilePond);
registerPlugin(FilePondPluginImagePreview);

export default function UploadView({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [, setView] = useViewController();

  const [files, setFiles] = useState<File[]>([]);

  const _onClose = () => {
    onClose();
    setFiles([]);
  };

  const [uploadFileState, uploadFileFn] = useAsyncFn(async function uploadFile(file: File) {
    // reject files >20MB
    if ((file.size || 0) > 20 * 1024 * 1024) {
      toast({
        title: "File must be under 20MB",
        status: "error",
        isClosable: true,
      });
      return;
    }

    try {
      const wordCode = await FileService.I.upload(file);
      toast({
        title: "File uploaded!",
        description: "Your file was successfully uploaded.",
        status: "success",
        isClosable: true,
      });
      setView({ slug: "file", params: { wordCode } });
      setFiles([]);
    } catch (e) {
      ErrorHandlingService.I.notifyUserOfError("Error uploading file", e);
    }
  });

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={_onClose}>
        <ModalOverlay />
        <ModalContent mx={3}>
          <ModalHeader>
            <Heading fontSize={"xl"}>Upload file</Heading>
          </ModalHeader>
          <ModalCloseButton onClick={_onClose} />
          <ModalBody>
            {/* @ts-ignore */}
            <Suspense fallback={<></>}>
              <FilePond
                files={files}
                allowMultiple={false}
                maxFiles={1}
                onupdatefiles={fileItems => {
                  const file = fileItems[0]?.file;
                  setFiles([file].filter(Boolean));
                }}
              />
            </Suspense>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={"green"}
              isDisabled={files.length === 0}
              isLoading={uploadFileState.loading}
              onClick={() => uploadFileFn(files[0])}
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
