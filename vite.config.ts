import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["gsap"],
    },
  },
});
