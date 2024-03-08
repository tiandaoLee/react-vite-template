/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2024-02-29 15:43:06
 * @LastEditors: Li Yong
 * @LastEditTime: 2024-03-08 10:48:38
 */
export const genClassNames = (arr) => {
  return arr.join(' ')
}
/**
 * 将promise包装，以便可以与React Suspense一起使用
 * @param {Promise} 要处理的promise
 * @returns {Object} 与Suspense兼容的响应对象
 */
export function wrapPromise(promise) {
  let status = 'pending'
  let response
  const suspender = promise.then(
    (res) => {
      status = 'success'
      response = res
    },
    (err) => {
      status = 'error'
      response = err
    },
  )

  const read = () => {
    if (status === 'pending') {
      throw suspender
    } else if (status === 'error') {
      throw response
    } else if (status === 'success') {
      return response
    }
  }
  return { read }
}
