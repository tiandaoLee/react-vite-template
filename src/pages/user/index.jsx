/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-20 09:12:50
 * @LastEditors: Li Yong
 * @LastEditTime: 2023-12-20 16:43:56
 */
import { Link } from 'react-router-dom'
function User(props) {
  console.log(props)
  return (
    <div>
      {props.children ? (
        props.children
      ) : (
        <>
          <h1>User</h1>
          <div>
            <Link to='list'>去list子页面</Link>
            <Link to='detail'>去detail子页面</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default User
