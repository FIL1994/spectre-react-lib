import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    entry: ['src/index.ts', 'src/icons.ts', 'src/experimental.ts'],
    outDir: 'dist',
    target: 'es2021',
    format: ['esm', 'cjs'],
    platform: 'neutral',
    fixedExtension: false,
    deps: {
      neverBundle: ['react', 'react-dom'],
    },
    treeshake: true,
    sourcemap: true,
    minify: true,
    clean: true,
    dts: false,
  },
});
