import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import path from 'path';

export default defineConfig({
  plugins: [preact()],
  build: {
    outDir: path.resolve(__dirname, '../src/main/resources/static'), // Output to Spring Boot static directory
    emptyOutDir: true, // Clears old files before building
  },
});
