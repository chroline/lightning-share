import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

import webmanifest from "./webmanifest.config";

export default defineConfig({
  plugins: [VitePWA({ manifest: webmanifest as any }), preact()],
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
