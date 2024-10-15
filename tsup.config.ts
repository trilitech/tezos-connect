import { defineConfig } from "tsup";

export default defineConfig(
  {
    entry: [
      "src/index.ts"
    ],
    external: ['esbuild'],
    dts: true,
    clean: true,
    format: [
      "cjs",
      "esm"
    ],
});