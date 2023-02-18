import { useRef } from "preact/hooks";

import {
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useAsyncFn } from "react-use";

import { AppleIcon } from "../components/icons/apple";
import { GithubIcon } from "../components/icons/github";
import { GoogleIcon } from "../components/icons/google";
import AuthService from "../services/auth";
import ErrorHandlingService from "../services/error-handling";
import toast from "../util/toast";

const _SignInBtn = ({
  name,
  color,
  icon,
  onClick,
}: {
  name: string;
  color: string;
  icon: JSX.Element;
  onClick: () => void;
}) => (
  <Button w={"full"} h={"auto"} py={3} colorScheme={color} variant={"ghost"} onClick={onClick}>
    <VStack>
      {icon}
      <Text fontSize={"xs"} display={{ base: "none", sm: "initial" }}>
        {name} Sign-in
      </Text>
    </VStack>
  </Button>
);

export default function AuthView({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [signInState, signInFn] = useAsyncFn(async function signIn(provider: "google" | "github" | "apple") {
    signInState.error = undefined;

    try {
      await AuthService.I.signInWithProvider(provider);
    } catch (e) {
      ErrorHandlingService.I.notifyUserOfError("Error signing in", e);
      return;
    }
  });

  const [signOutState, signOutFn] = useAsyncFn(async function signOut() {
    signOutState.error = undefined;

    try {
      await AuthService.I.signOut();
      toast({
        title: "Successfully signed out!",
        status: "success",
        isClosable: true,
      });
      onClose();
    } catch (e) {
      ErrorHandlingService.I.notifyUserOfError("Error signing out", e);
      return;
    }
  });

  const initialRef = useRef();

  const { colorMode } = useColorMode();

  const isAnonymous = AuthService.I.userInfo$.value?.isAnonymous ?? true;

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef as any}>
        <ModalOverlay />
        <ModalContent mx={3}>
          <ModalHeader>
            <Heading fontSize={"xl"}>Manage Account</Heading>
          </ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            {!isAnonymous ? (
              <Text>
                Signed in as{" "}
                <Text as={"span"} fontWeight={"bold"}>
                  {`${AuthService.I.userInfo$.value!.email} (${
                    { "google.com": "Google", "github.com": "Github", "apple.com": "Apple" }[
                      AuthService.I.userInfo$.value!.providerData[0].providerId
                    ]
                  })`}
                </Text>
              </Text>
            ) : (
              <>
                <HStack spacing={2} w={"full"}>
                  <_SignInBtn
                    name={"Google"}
                    color={"red"}
                    icon={<GoogleIcon h={5} />}
                    onClick={() => signInFn("google")}
                  />
                  <_SignInBtn
                    name={"Github"}
                    color={"purple"}
                    icon={<GithubIcon h={5} />}
                    onClick={() => signInFn("github")}
                  />
                  <_SignInBtn
                    name={"Apple"}
                    color={"gray"}
                    icon={<AppleIcon h={5} />}
                    onClick={() => signInFn("apple")}
                  />
                </HStack>
                <Text
                  fontWeight={"medium"}
                  textAlign={"center"}
                  color={`gray.${colorMode === "light" ? 500 : 400}`}
                  my={3}
                >
                  Choose a sign-in method
                </Text>
              </>
            )}
          </ModalBody>
          {!isAnonymous && (
            <ModalFooter>
              <Button colorScheme={"red"} isLoading={signOutState.loading} onClick={() => signOutFn()}>
                Sign Out
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
