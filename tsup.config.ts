import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  target: 'es2018',
  format: ['cjs', 'esm'],
  loader: {
    '.js': 'jsx',
  },
  external: ['react', 'react-dom'],
  treeshake: true,
  sourcemap: true,
  minify: true,
  clean: true,
  dts: true,
  splitting: false,
  injectStyle: false,
});
