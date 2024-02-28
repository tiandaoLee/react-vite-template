/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-20 15:34:29
 * @LastEditors: Li Yong
 * @LastEditTime: 2024-02-28 10:02:32
 */
import './index.scss'
import userStore from '@/store/user'
function UserDetail(props) {
  const user = userStore((state) => state.user)
  const isAdmin = userStore((state) => state.isAdmin)
  return (
    <div className='test-style'>
      <h1>User子页面Detail</h1>
      <div>
        登录人的名字是{user?.name}，他的身份是{isAdmin ? '管理员' : ''}
      </div>
    </div>
  )
}

export default UserDetail
