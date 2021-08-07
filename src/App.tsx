import { ChakraProvider, ColorModeScript, extendTheme, VStack } from "@chakra-ui/react";
import "filepond/dist/filepond.min.css";
import { Helmet } from "react-helmet";
import { useAsync, useObservable } from "react-use";

import { ViewController, ViewControllerProvider } from "./ViewController";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { LoaderScreen } from "./components/LoaderScreen";
import { Navbar } from "./components/Navbar";
import ErrorHandlingService from "./services/error-handling";
import FirebaseService from "./services/firebase";
import "./util/base.css";
import theme from "./util/theme";

function App() {
  const setupState = useAsync(async () => {
    try {
      await FirebaseService.init();
    } catch (e) {
      ErrorHandlingService.notifyUserOfError("Error while initializing Firebase", e);
      return;
    }
    try {
      await FirebaseService.anonymousAuth();
    } catch (e) {
      ErrorHandlingService.notifyUserOfError("Error during anonymous authorization", e);
      return;
    }
  });

  const userId = useObservable(FirebaseService.userId$);

  return (
    <ViewControllerProvider>
      <Helmet>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      </Helmet>
      <ChakraProvider resetCSS theme={extendTheme(theme)}>
        {(setupState.loading || setupState.error) && <LoaderScreen />}
        <VStack justify={"stretch"} h={"full"} w={"full"}>
          <Navbar />
          <Hero />
          <Footer />
        </VStack>
        {!!userId && <ViewController />}
      </ChakraProvider>
    </ViewControllerProvider>
  );
}

export default App;
