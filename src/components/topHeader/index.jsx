import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { connect } from 'react-redux'; // 高阶函数，包裹在函数中，可以进行redux读写操作
import './index.css'
import { offCollapsed, onCollapsed } from '../../redux/action/isCollapsed';

const { Header, Sider, Content } = Layout;


function TopHeader(props) {
    console.log(props,"propsssss")
    const currentUser = JSON.parse(localStorage.getItem("token"))
    // const [collapsed, setCollapsed] = useState(false);

    // const {
    //     token: { colorBgContainer },
    // } = theme.useToken();

    // 从store的action 拿到对应的方法,并传到redux里
    const offCollapsed = () => {
        props.offCollapsed()
    }
    const onCollapsed = () => {
        props.onCollapsed()
    }
    return (
        <Header className="site-layout-background" style={{ padding: "0 16px" }}>
            {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
            })} */}
            {props.switch ? <MenuUnfoldOutlined onClick={()=>offCollapsed()} /> : <MenuFoldOutlined onClick={()=>onCollapsed()} />}
        </Header>
    )

}


/**
 * connect 的两个参数
 * 1.从redux拿到state 的值
 * 2.把需要改变的值传递（分发）到redux里处理，处理完成后返回到页面的props里（state）
 */
export default connect(
    state => ({switch:state.isCollapsedReducers}),
    {
        offCollapsed,
        onCollapsed,
    }
)(TopHeader)
