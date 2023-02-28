// useEffect 在渲染后执行某些操作,并且在执行 DOM 更新之后调用它
import React, { useEffect } from "react"
//progress主要应用的场景为页面切换和请求数据，在进行这两项操作时浏览器的顶部会出现进度条，优化用户体验
import NProgress from "nprogress"
import { Layout } from 'antd';
import 'nprogress/nprogress.css'
import "./index.css"

import NewsRouter from "./NewsRouter"
import SideMenu from "../../components/sideMenu"
import TopHeader from "../../components/topHeader"

const { Content } = Layout;

export default function NewsSandBox() {
    NProgress.start()
    useEffect(() => {
        NProgress.done()
    })

    return (
        <Layout>
            <SideMenu></SideMenu>
            <Layout className="site-layout">
                <TopHeader></TopHeader>
                <Content className="site-layout-background" style={
                    {
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow: "auto"
                    }
                }>
                    <NewsRouter></NewsRouter>
                </Content>
            </Layout>
        </Layout>
    )
}