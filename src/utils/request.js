/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-22 14:53:45
 * @LastEditors: Li Yong
 * @LastEditTime: 2024-02-27 18:17:27
 */
import axios from 'axios'
import { AjaxMethod, Errors, LogoutCode } from '@/dataMap/api'
import { message } from 'antd'
import userStore from '@/store/user'

const TIMEOUT = 30000

export const getBaseUrl = (_param) => {
  return process.env.NODE_ENV === 'development' ? '/api' : process.env.VITE_APP_TEST_URL
}
const config = {
  timeout: TIMEOUT,
  withCredentials: true,

  // `headers`选项是需要被发送的自定义请求头信息
  headers: {
    'Content-Type': 'application/json',
  },
}
// 生成cookie
// const createCustomCookie = () => {
//   const _cookies = [
//     { key: 'token', value: CookiesTools.getToken() || '' },
//     { key: 'role_id', value: CookiesTools.getRole() || '' },
//   ]
//   const _cookiesText = _cookies.map((item) => `${item.key}=${item.value}`).join('&')
//   return _cookiesText
// }
export const _axios = axios.create(config)
_axios.interceptors.request.use(
  function (config) {
    // 将cookie中的值放到header头中
    // config.headers['Custom-Cookie'] = createCustomCookie()
    // config.headers['authorization'] = `Bearer ${CookiesTools.getToken()}`
    // config.headers['tenant-id'] = store.state.vuex_tenantId
    // config.headers['data-view-id'] = store.state.vuex_dataViewId
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// 返回拦截器
_axios.interceptors.response.use(
  function (response) {
    // Do something
    return response
  },
  function (error) {
    if (error.message.includes('timeout')) {
      // 超时
      error.code = Errors.timeout.code
      error.message = '请求超时，请检查网络后重试'
      return Promise.reject(error)
    }
    return Promise.reject(error)
  },
)

const request = async (_param) => {
  try {
    if (!_param.method) {
      _param.method = AjaxMethod.post
    }
    _axios.defaults.baseURL = getBaseUrl(_param)
    const response = await _axios(_param)
    const { status, data } = response
    if (status === 200) {
      // 登录失效
      if (LogoutCode.includes(data.code)) {
        // 只有有token的情况才会展示提示内容
        const state = userStore.getState()
        const token = state.token
        if (token) {
          message.error(data.message)
        }
        // 清除缓存数据

        if (location.pathname !== '/login') {
          location.replace('/login')
        }
        return data
      }
      if (data.code !== 0 && data.code !== 2010002) {
        message.error(data.message)
        return _param.notOrigin
          ? Promise.reject(new Error({ code: data.code, message: data.message }))
          : data
      }
      return _param.notOrigin ? data.data : data
    }
  } catch (err) {
    return Promise.reject(
      new Error({
        code: 1,
        message: err.message,
      }),
    )
  }
}

export default request
