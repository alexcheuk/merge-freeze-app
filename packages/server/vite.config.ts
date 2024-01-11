import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/app.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'esbuild',
      swcOptions: {},
      initAppOnBoot: true,
    }),
  ],
  build: {
    ssr: true,
    emptyOutDir: true,
  },
})
