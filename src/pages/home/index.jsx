/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-20 09:07:28
 * @LastEditors: Li Yong
 * @LastEditTime: 2023-12-20 15:15:56
 */
import { Link } from 'react-router-dom'
function Home(props) {
  return (
    <div>
      <h1>Home</h1>
      <Link to='/user'>user</Link>
      <br />
      <Link to='/user?id=111'>user(search)</Link>
      <br />
      <Link to={{ pathname: '/user', search: 'id=123' }}>user(search)</Link>
      <br />
      <Link to={{ pathname: '/user', state: { num: '002' } }}>user</Link>
      <br />
      <Link to={{ pathname: '/user', query: { num: '002' } }}>user</Link>
      <br />
    </div>
  )
}

export default Home
