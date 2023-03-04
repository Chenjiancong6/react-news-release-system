import React from "react"
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from '../Home'
import RightList from "../RightManage/RightList"
import RoleList from "../RightManage/RoleList"

function NewsRouter() {
    return (

        <Switch>
            <Route path="/home" component={Home}></Route>
            <Route path="/right-manage/right/list" component={RightList}></Route>
            <Route path="/right-manage/role/list" component={RoleList}></Route>
            <Redirect from='/' to='/home'></Redirect>
        </Switch>
    )
}

export default NewsRouter;