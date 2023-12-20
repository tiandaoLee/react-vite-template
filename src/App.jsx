/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-19 14:21:43
 * @LastEditors: Li Yong
 * @LastEditTime: 2023-12-20 19:17:27
 */
import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Spin } from 'antd'
import routes from '@/route/index.jsx'
import { AuthProvider } from './AuthContextProvider'

// 递归渲染路由配置
const generateRoutes = (config) => {
  return config.map(({ path, children, element, redirect }) => (
    <React.Fragment key={path}>
      {/* 父级页面的重定向 */}
      {children &&
        children.length > 0 &&
        (redirect ? (
          <Route path={path} element={<Navigate to={redirect} />}></Route>
        ) : (
          <Route path={path} element={<Navigate to={children[0].path} />}></Route>
        ))}

      {/* 子路由配置 */}
      {children && children.length > 0 ? (
        <Route path={path} element={element}>
          {generateRoutes(children)}
        </Route>
      ) : (
        <Route path={path} element={element}></Route>
      )}
    </React.Fragment>
  ))
}
const AppRoutes = () => {
  return <Routes>{generateRoutes(routes)}</Routes>
}
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<Spin />}>
          <AppRoutes />
        </Suspense>
      </AuthProvider>
    </Router>
  )
}

export default App
