import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd())
  return {
    plugins: [
      vue(),
      svgLoader()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@use '@/assets/css/element/index.scss' as *;`
        }
      }
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:9090',
          changeOrigin: true,
          rewrite: (path) => path.replace('/api', '')
        },
        '/ws': {
          target: 'ws://localhost:9090',
          changeOrigin: true,
          rewrite: (path) => path.replace('/ws', '')
        }
      },
      port: env.VITE_PORT as unknown as number,
      host: env.VITE_HOST
    }
  }
})
