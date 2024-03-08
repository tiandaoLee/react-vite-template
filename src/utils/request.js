/*
 * @Descripttion: axois二次封装，支持请求取消，请求重复数据
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-22 14:53:45
 * @LastEditors: Li Yong
 * @LastEditTime: 2024-03-08 16:29:50
 */
import axios from 'axios'
import { AjaxMethod, Errors, LogoutCode } from '@/dataMap/api'
import { message } from 'antd'
import userStore from '@/store/user'

const TIMEOUT = 30000

const requestMap = new Map()
const pendingMap = new Map()

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
const genRequestKey = (config, excluParams = false) => {
  const { url, method, data, params } = config
  const reqParams = method === AjaxMethod.get ? params : data
  return excluParams ? `${url}&${method}` : `${url}&${method}&${JSON.stringify(reqParams)}`
}

const addRequestToMap = (config) => {
  const key = genRequestKey(config)
  const existRequest = requestMap.get(key)
  requestMap.set(key, { ...existRequest, config, time: new Date().getTime() })
}

const deleteRequest = (config) => {
  const key1 = genRequestKey(config)
  requestMap.delete(key1)
}

const addPendingToMap = (config) => {
  const key = genRequestKey(config, true)
  const controller = new AbortController()
  config.signal = controller.signal
  pendingMap.set(key, controller)
  delete config.autoAbort
}
const deletePengding = (config) => {
  const key = genRequestKey(config, true)
  pendingMap.delete(key)
}

const deleteExistPendingRequest = (config) => {
  const key = genRequestKey(config, true)
  const existPendingRequest = pendingMap.get(key)
  if (existPendingRequest) {
    existPendingRequest.abort()
    pendingMap.delete(key)
    const key1 = genRequestKey(config)
    requestMap.delete(key1)
  }
}

export const _axios = axios.create(config)
_axios.interceptors.request.use(
  function (config) {
    // 将cookie中的值放到header头中
    // config.headers['Custom-Cookie'] = createCustomCookie()
    // config.headers['authorization'] = `Bearer ${CookiesTools.getToken()}`
    // config.headers['tenant-id'] = store.state.vuex_tenantId
    // config.headers['data-view-id'] = store.state.vuex_dataViewId
    addRequestToMap(config)
    config.autoAbort && addPendingToMap(config)
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
    deleteRequest(response.config)
    deletePengding(response.config)
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
    // 删除已存在的请求
    deleteExistPendingRequest(_param)
    // 生成请求key
    const key = genRequestKey(_param)
    const existRequest = requestMap.get(key)
    const reqPromise = existRequest ? existRequest.promise : _axios(_param)
    if (!existRequest) {
      requestMap.set(key, { promise: reqPromise })
    }
    const response = await reqPromise
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
    console.log('🚀 ~ request ~ err:', err)
    return Promise.reject(
      new Error({
        code: 1,
        message: err.message,
      }),
    )
  }
}

export default request
