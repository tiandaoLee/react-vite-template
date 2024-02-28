/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2024-02-26 11:06:40
 * @LastEditors: Li Yong
 * @LastEditTime: 2024-02-27 16:33:00
 */
import { useState } from 'react'
import { Input, Button, App } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { loginApi } from '@/api/user'
import userStore from '@/store/user'

function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const setToken = userStore((state) => state.setToken)
  const setUser = userStore((state) => state.setUser)
  const staticFunction = App.useApp()
  const message = staticFunction.message

  const goLogin = async () => {
    // 获取重定向地址，如果没有则默认跳转到首页
    const redirectUrl = new URLSearchParams(location.search).get('redirect') || '/'
    // 开启按钮loading
    setLoading(true)
    try {
      // 发送登录请求
      const { data: { token, name } = {} } = await loginApi({
        username,
        password,
      })
      // 如果返回信息中有token和name则登录成功，否则提示登录失败
      if (token) {
        // 登录成功提示
        message.success('登录成功')
        // 保存token和用户信息
        setToken(token)
        setUser({ name })
        // 跳转到重定向地址
        navigate(redirectUrl)
      } else {
        // 登录失败提示
        message.error('登录失败')
      }
    } catch (error) {
      message.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='h-screen'>
      <div className='fixed left-0 top-0 right-0 bottom-0 bg-blue-600 blur-2px z--1'></div>
      <div className='flex flex-row justify-center items-center w-100% h-100%'>
        <div className='w-[600px] h-[700px] border-width-1 border-solid border-white rounded-[20px] flex flex-col justify-center items-center'>
          {/* 账号 */}
          <div className='flex flex-row justify-center items-center w-100% h-[100px]'>
            <Input placeholder='请输入账号' onChange={(e) => setUsername(e.target.value)}></Input>
          </div>
          {/* 密码 */}
          <div className='flex flex-row justify-center items-center w-100% h-[100px]'>
            <Input
              placeholder='请输入密码'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </div>
          <Button type='primary' onClick={goLogin} loading={loading}>
            登录
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Login
