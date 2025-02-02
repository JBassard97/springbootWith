import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import path from 'path'

export default defineConfig({
  plugins: [solid()],
  build: {
    outDir: path.resolve(__dirname, '../src/main/resources/static'), // Output to Spring Boot static directory
    emptyOutDir: true, // Clears old files before building
  },
})
