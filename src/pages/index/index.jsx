/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-20 16:52:15
 * @LastEditors: Li Yong
 * @LastEditTime: 2023-12-20 17:00:03
 */
import { Outlet } from 'react-router-dom'
function Catalog(props) {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  )
}

export default Catalog
