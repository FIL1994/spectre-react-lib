import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  target: 'es2016',
  format: ['cjs', 'esm'],
  loader: {
    '.js': 'jsx',
  },
  external: ['react', 'react-dom'],
  treeshake: true,
  sourcemap: 'inline',
  minify: true,
  clean: true,
  dts: true,
  splitting: false,
  injectStyle: false,
});
