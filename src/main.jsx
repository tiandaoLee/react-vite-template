/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-19 14:20:44
 * @LastEditors: Li Yong
 * @LastEditTime: 2023-12-21 16:49:33
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// 重置浏览器默认样式
import '@unocss/reset/normalize.css'
import './styles/reset.css'
// 动态加载uno.css
import 'virtual:uno.css'
import 'virtual:unocss-devtools'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
