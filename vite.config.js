import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  base: "/Portfolio/", // For GitHub Pages deployment
  publicDir: "public",
  build: {
    assetsDir: "assets",
  },
  server: {
    fs: {
      strict: false
    }
  }
});