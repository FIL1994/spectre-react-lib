import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  target: 'es2018',
  format: ['cjs', 'esm'],
  treeshake: true,
  sourcemap: true,
  minify: true,
  clean: true,
  dts: true,
  outExtensions: ({ format }) => ({
    js: format === 'cjs' ? '.cjs' : '.js',
    dts: format === 'cjs' ? '.d.cts' : '.d.ts',
  }),
  deps: {
    neverBundle: ['react', 'react-dom'],
  },
});
