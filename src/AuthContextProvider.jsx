/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-20 15:14:00
 * @LastEditors: Li Yong
 * @LastEditTime: 2024-02-27 15:56:57
 */
import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { App } from 'antd'
import userStore from './store/user'

// 高阶组件，用于检查权限
const PrivateRoute = ({ element, ...props }) => {
  const isAuthenticated = true // 根据实际情况获取认证状态
  // 是否登录
  const isLogin = userStore((state) => state.isLoggedIn)()
  const location = useLocation()
  const staticFunction = App.useApp()
  useEffect(() => {
    const message = staticFunction.message
    return () => {
      !isLogin &&
        message.error({
          content: '请先登录',
          duration: 2,
        })
    }
  }, [isLogin])
  return isAuthenticated ? (
    !isLogin ? (
      <Navigate to={`/login?redirect=${location.pathname}`} replace />
    ) : (
      React.cloneElement(element, props)
    )
  ) : (
    <Navigate to='/404' replace />
  )
}

export { PrivateRoute }
