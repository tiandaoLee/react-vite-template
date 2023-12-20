/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-19 14:06:59
 * @LastEditors: Li Yong
 * @LastEditTime: 2023-12-20 09:06:57
 */
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { presetUno, transformerAttributify } from 'unocss'
import path from 'path'

export default defineConfig({
  base: './',
  plugins: [
    UnoCSS({
      presets: [presetUno, transformerAttributify],
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
    },
  },
  server: {
    port: 5173, // 开发环境启动的端口
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: 'http://xx.xx.xx.xx:8080/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 将 /api 重写为空
      },
    },
  },
})
