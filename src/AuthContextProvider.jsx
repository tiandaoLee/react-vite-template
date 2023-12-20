/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-20 15:14:00
 * @LastEditors: Li Yong
 * @LastEditTime: 2023-12-20 15:18:05
 */
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

// 创建权限上下文
const AuthContext = React.createContext()

// 提供者组件
const AuthProvider = ({ children }) => {
  const isAuthenticated = true // 根据实际情况获取认证状态

  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
}

// 高阶组件，用于检查权限
const PrivateRoute = ({ element, ...props }) => {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated ? React.cloneElement(element, props) : <Navigate to='/404' replace />
}

export { AuthProvider, PrivateRoute, AuthContext }
