import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

import webmanifest from "./webmanifest.config";

export default defineConfig({
  plugins: [preact(), VitePWA({ registerType: "autoUpdate", manifest: webmanifest as any })],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("firebase")) {
            return "firebase";
          }
        },
      },
    },
  },
});
