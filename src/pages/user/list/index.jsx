/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-20 15:33:56
 * @LastEditors: Li Yong
 * @LastEditTime: 2023-12-20 19:06:25
 */
import { useParams, useLocation } from 'react-router-dom'
function UserList(props) {
  console.log('🚀 ~ file: index.jsx:11 ~ UserList ~ props:', props)
  const { id } = useParams()
  const location = useLocation()
  console.log('🚀 ~ file: index.jsx:13 ~ UserList ~ location:', location)
  return (
    <div>
      <h1>User子页面list,id:{id}</h1>
    </div>
  )
}

export default UserList
