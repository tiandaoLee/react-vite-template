/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-22 15:19:10
 * @LastEditors: Li Yong
 * @LastEditTime: 2024-02-27 16:03:17
 */
import request from '@/utils/request'
import { AjaxMethod } from '@/dataMap/api.js'

export const loginApi = (data) => {
  console.log(data)
  return request({
    url: '/login',
    method: AjaxMethod.post,
    data,
  })
}
