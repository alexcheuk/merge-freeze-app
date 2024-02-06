import { PluginOption, defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

const fullReloadAlways: PluginOption = {
  name: 'full-reload-always',
  handleHotUpdate({ server }) {
    console.log('RELAOD')
    server.restart()
    return []
  },
} as PluginOption

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  plugins: [
    fullReloadAlways,
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
