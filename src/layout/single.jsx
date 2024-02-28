/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-21 15:59:16
 * @LastEditors: Li Yong
 * @LastEditTime: 2023-12-21 15:59:46
 */
import { Outlet } from 'react-router-dom'
function SingleLayout(props) {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  )
}

export default SingleLayout
