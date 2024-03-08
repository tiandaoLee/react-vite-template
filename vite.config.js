/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-19 14:06:59
 * @LastEditors: Li Yong
 * @LastEditTime: 2024-02-28 11:28:04
 */
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { presetUno, transformerAttributify } from 'unocss'
import { presetUno, transformerAttributifyJsx } from 'unocss'
import path from 'path'

export default defineConfig({
  base: './',
  plugins: [
    UnoCSS({
      presets: [presetUno, transformerAttributifyJsx],
    }),
    react(),
  ],
  build: {
    // 编译时独立输出css
    cssCodeSplit: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // src 路径
      '/image': 'src/assets/images',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";',
      },
    },
  },
  server: {
    port: 5173, // 开发环境启动的端口
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 将 /api 重写为空
      },
    },
  },
})
