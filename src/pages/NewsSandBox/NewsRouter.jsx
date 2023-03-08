

import React, { useEffect, useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from '../Home'
import Nopermission from '../Nopermission'
import RightList from "../RightManage/RightList"
import RoleList from "../RightManage/RoleList"
import UserManage from "../userManage"
import NewsPreview from '../NewsPreview'
import NewsAdd from '../NewsAdd'
import NewsDraft from '../NewsDraft'
import NewsAudit from '../NewsAudit'
import AuditList from '../AuditList'
import PublishUnpublished from '../PublishUnpublished'
import PublishPublished from '../PublishPublished'
import PublishSunset from '../PublishSunset'
import axios from 'axios'
import { Spin } from 'antd'

// 路由映射表
const routerList = {
    "/home": Home,
    "/user-manage/list": UserManage,
    "/right-manage/role/list": RoleList,
    "/right-manage/right/list": RightList,
    "/news-manage/add": NewsAdd,
    "/news-manage/draft": NewsDraft,
    "/audit-manage/audit": NewsAudit,
    "/audit-manage/list": AuditList,
    "/publish-manage/unpublished": PublishUnpublished,
    "/publish-manage/published": PublishPublished,
    "/publish-manage/sunset": PublishSunset,
    "/news-manage/preview/:id": NewsPreview,
    "/news-manage/update/:id": NewsAdd
}


function NewsRouter(props) {
    const saveUser = JSON.parse(localStorage.getItem("token"))
    const [saveRouterList, setSaveRouterList] = useState([])

    // 保存从接口返回的数据
    useEffect(() => {
        Promise.all([
            axios.get("/rights"),
            axios.get("/children")
        ]).then((res) => {
            setSaveRouterList([...res[0].data, ...res[1].data])
        })
    }, [])

    // 路由权限
    const checkRouter = (item) => {
        return routerList[item.key] && (item.pagepermisson || item.routepermisson)
    }
    // 用户权限
    const checkUserRights = (item) => {
        return saveUser.role.rights.includes(item.key)
    }
    return (
        <Spin tip="Loading..." size="large" spinning={props.switch}>
            <Switch>
                {
                    saveRouterList?.map(item => {
                        if (checkRouter(item) && checkUserRights(item)) {
                            return <Route path={item.key} key={item.key} component={routerList[item.key]} exact />
                        }
                        return null;
                    })
                }
                <Redirect path="/" to="/home" exact />
                {
                    saveRouterList.length > 0 && <Route path="*" component={Nopermission} />
                }
            </Switch>
        </Spin>
    )
}

export default connect(
    state => ({ switch: state.loadingReducers }),
    {}
)(NewsRouter);