/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-22 14:56:26
 * @LastEditors: Li Yong
 * @LastEditTime: 2023-12-22 15:56:19
 */
export const AjaxMethod = {
  post: 'post',
  get: 'get',
  put: 'put',
  delete: 'delete',
  head: 'head',
  patch: 'patch',
}
export const Errors = {
  netErr: {
    code: 10000010,
    message: '网络出问题了',
  },
  noLogin: {
    code: 401, // 为登录
    message: '未登录',
  },
  forbidden: {
    code: 403,
    message: '您没有该权限',
  },
  serviceErr: {
    code: 500,
    message: '服务器异常',
  },
  timeout: {
    code: 10000011, // 超时
    message: '请求超时',
    data: null,
  },
}

export const LogoutCode = [
  2000001, //
  1600002, //
  401, // 账号未登录
  2000003, // 当前角色禁用
]
