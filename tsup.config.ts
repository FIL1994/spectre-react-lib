import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  target: "es2016",
  format: ["cjs", "esm"],
});
