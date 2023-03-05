import React, { useState, useEffect } from 'react'
// withRouter作用是将一个组件包裹进Route里面, 然后react-router的三个对象history, location, match就会被放进这个组件的props属性中
import { NavLink, withRouter } from 'react-router-dom'
import axios from 'axios'
import { Layout, Menu } from 'antd';
import './index.css'
import {
    UserOutlined,
    HomeOutlined,
    ControlOutlined,
    SoundOutlined,
    AuditOutlined,
    SmileOutlined
} from '@ant-design/icons';
// 要在图标后导入
const { Sider } = Layout;
const { SubMenu } = Menu;

// 图标映射
const iconList = {
    "/home": <HomeOutlined />,
    "/user-manage": <UserOutlined />,
    "/right-manage": <ControlOutlined />,
    "/news-manage": <SoundOutlined />,
    "/audit-manage": <AuditOutlined />,
    "/publish-manage": <SmileOutlined />
}

function SideMenu(props) {
    //获取当前url中的keys值，传入Menu中，作为选中/展开条件
    const selectKeys = [props.location.pathname] //加上[]是为了让他们成为数组传入

    // 刷新页面后还没打开页面已选中的菜单
    const openKeys = ["/" + props.location.pathname.split("/")[1]]

    const [collapsed, setCollapsed] = useState(false);
    const [menuList, setMenuList] = useState([])

    const currentUser = JSON.parse(localStorage.getItem("token"))

    // 进行表关联，请求数据； 加上[]，只在页面渲染完后请求一次
    useEffect(() => {
        axios.get('/rights?_embed=children').then(res => {
            setMenuList(res?.data)
        })
    }, [])

    //根据数据遍历列表
    const decision = (item) => {
        // pagepermisson 侧边栏页面权限
        return item.pagepermisson === 1 && (currentUser.role.rights).includes(item.key)
    }

    // 遍历循环生成一二级菜单
    const menuRender = (menuList) => {
        return menuList?.map(item => {
            // 如果有二级菜单
            if (item.children?.length > 0 && decision(item)) {
                return (
                    <SubMenu key={item.key} title={item.title} icon={iconList[item.key]}>
                        {/* 如果是二级列表，调用递归 */}
                        {menuRender(item.children)}
                    </SubMenu>
                )
            }
            // 可以点击的菜单
            return decision(item) &&
                <Menu.Item key={item.key} icon={iconList[item.key]}>
                    <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>
        })
    }


    return (
        <Sider trigger={null} collapsible>
            <div style={{ display: 'flex', height: "100%", flexDirection: "column" }}>
                <div className="logo">新闻</div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                    <Menu theme="dark" mode="inline" selectedKeys={selectKeys} defaultOpenKeys={openKeys}>
                        {/* 封装函数遍历生成菜单项 */}
                        {menuRender(menuList)}
                    </Menu>
                </div>
            </div>
        </Sider>
    )
}

export default withRouter(SideMenu)