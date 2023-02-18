import { render } from "preact";
import { registerSW } from "virtual:pwa-register";

import App from "./App";

registerSW({
  onRegistered() {
    console.info("[SW]:", "Registered!");
  },
});

render(<App />, document.getElementById("app")!);
