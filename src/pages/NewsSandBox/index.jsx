import React from "react"
//progress主要应用的场景为页面切换和请求数据，在进行这两项操作时浏览器的顶部会出现进度条，优化用户体验
import NProgress from "nprogress"
import { Layout } from 'antd';
import 'nprogress/nprogress.css'
import "./index.css"

import NewsRouter from "./NewsRouter"

const { Content } = Layout;

export default function NewsSandBox() {
    return (
        <Layout>
            <Layout className="site-layout">
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