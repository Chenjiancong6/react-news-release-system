import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import './index.css'

const { Header, Sider, Content } = Layout;


export default function TopHeader() {
    const currentUser = JSON.parse(localStorage.getItem("token"))
    const [collapsed, setCollapsed] = useState(false);
    // const {
    //     token: { colorBgContainer },
    // } = theme.useToken();
    return (
        <Header style={{ padding: 0, background: '#fff' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
            })}
        </Header>
    )

}
