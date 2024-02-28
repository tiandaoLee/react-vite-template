/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-20 10:06:42
 * @LastEditors: Li Yong
 * @LastEditTime: 2024-02-26 11:08:18
 */
import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { PrivateRoute } from '../AuthContextProvider'
import Layout from '@/layout'

const Home = lazy(() => import('@/pages/home/index.jsx'))
const Login = lazy(() => import('@/pages/login/index.jsx'))
const Page404 = lazy(() => import(`@/pages/404/index.jsx`))
const UserList = lazy(() => import(`@/pages/user/list/index.jsx`))
const UserDetail = lazy(() => import(`@/pages/user/detail/index.jsx`))

const routers = [
  {
    path: '/',
    element: <PrivateRoute element={<Navigate to='home' replace />} />,
  },
  {
    path: 'home',
    element: <PrivateRoute element={<Home />} />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'user',
    element: <PrivateRoute element={<Layout />} />,
    redirect: 'list',
    children: [
      {
        path: 'list/:id?',
        element: <PrivateRoute element={<UserList />} />,
      },
      {
        path: 'detail',
        element: <PrivateRoute element={<UserDetail />} />,
      },
    ],
  },
  {
    path: '404',
    element: <Page404 />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
]

export default routers
