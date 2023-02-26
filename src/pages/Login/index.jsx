import React from 'react'
// withRouter是不通过路由跳转的组件，将history、locattion、math放在页面的props 对象中
import { withRouter } from 'react-router-dom';

function Login(props) {
    return (
        <div>
            登录页面
        </div>
    )
}

export default withRouter(Login)