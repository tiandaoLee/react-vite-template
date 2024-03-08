/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-21 16:01:48
 * @LastEditors: Li Yong
 * @LastEditTime: 2024-03-08 16:32:24
 */
import { Layout, Menu, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import React from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'

const { Header, Content, Sider } = Layout

const items2 = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1)

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1
      return {
        key: subKey,
        label: `option${subKey}`,
      }
    }),
  }
})
function PageLayout(props) {
  const {
    token: { headerHeight, sideWidth },
  } = theme.useToken()
  return (
    <Layout>
      <Header
        className='bg-white shadow-lg'
        style={{
          height: headerHeight,
        }}
      >
        header
      </Header>
      <Layout>
        <Sider
          width={sideWidth}
          style={{
            height: `calc(100vh - ${headerHeight})`,
          }}
        >
          <Menu
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            className='overflow-auto h-full'
            style={{ borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Content>{props.component ? props.component : <Outlet></Outlet>}</Content>
      </Layout>
    </Layout>
  )
}

export default PageLayout
