import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/kimochiiPointer.ts"),
      name: "KimochiiPointer",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["gsap"],
    },
  },
});
