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
        },
        '/baidu': {
          target: 'https://api.map.baidu.com',
          changeOrigin: true,
          rewrite: (path) => path.replace('/baidu', '')
        },
        '/tencent': {
          target: 'https://apis.map.qq.com',
          changeOrigin: true,
          rewrite: (path) => path.replace('/tencent', '')
        },
      },
      port: env.VITE_PORT as unknown as number,
      host: env.VITE_HOST
    },
    base: './',
    esbuild: {
      drop: []
    },
    build: {
      rollupOptions: {
        input: './index.html',
      },
      assetsDir: './assets',
      sourcemap: true
    }
  }
})
