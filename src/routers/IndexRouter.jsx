// React.Fragment 组件能够在不额外创建 DOM 元素的情况下，让 render() 方法中返回多个元素。一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。
//Switch包裹Route来实现单一匹配，既一个路由对应第一个该路由的路由组件。原理为遍历到该路由组件后，停止遍历
import React, { Fragment } from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import Login from "../pages/Login"

import NewsSandBox from "../pages/NewsSandBox"

export default function IndexRouter() {
    return (
        <Fragment>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" render={() =>
                    localStorage.getItem("token") ?
                        <NewsSandBox></NewsSandBox> :
                        <NewsSandBox></NewsSandBox>
                }></Route>
                {/* <Redirect to="/login"></Redirect> */}
            </Switch>
        </Fragment>
    )
}

