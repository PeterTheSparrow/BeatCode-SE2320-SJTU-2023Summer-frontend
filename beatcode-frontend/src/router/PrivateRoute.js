import React, { useState, useEffect } from 'react';
import postRequest_receive_string  from '../utils/ajax';
import {apiUrl, apiUrlWindows} from "../utils/config-overrides";
import {Navigate, Route} from "react-router-dom";


/**
 * @Description: 私有路由，需要登录才能访问
 * @param {component} 组件
 * @param {path} 路径，默认为根路径
 * @param {exact} 是否精确匹配
 * @param {strict} 是否严格匹配
 * @return {*} 返回值
 *
 * 说明：
 * 1. 跳转逻辑。前端向后端发送请求checkAuth，后端返回是否登录的信息，前端根据信息判断是否跳转。
 * 2. 如果没有登录，跳转到登录页面，登录成功后跳转到原来的页面。
 *
 * 【注】本私有路由已经废弃，由路由守卫替代。
 * */
export default class PrivateRoute extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hasAuthed: false, // 是否已经向后端发送请求
            isLogin: false, // 是否已经登录
            isAdmin: false, // 是否是管理员
        };
    }

    componentDidMount() {
        // TODO 向后端进行一个检查
        // 检查是否是用户？
        postRequest_receive_string(apiUrlWindows + '/checkUser', {}, (data) => {
            if (data === 'yes') {
                this.setState({isLogin: true, isAdmin: false});
            }
        });
        // 检查是否是管理员？
        postRequest_receive_string(apiUrlWindows + '/checkAdmin', {}, (data) => {
            if (data === 'yes') {
                this.setState({isLogin: true, isAdmin: true});
            }
        });

        this.setState({hasAuthed: true});
    }

    render() {
        const {component: Component, path = '/', exact = false, strict = false} = this.props;

        console.log(this.state.hasAuthed);

        // if (!this.state.hasAuthed) {
        //     return null;
        // }

        return (
            <Route path={path} exact={exact} strict={strict} render={(props) => (
                this.state.isLogin ? (
                    this.state.isAdmin ? (
                        // 检查path前缀是否是/admin
                        path.startsWith('/admin') ? (
                            <Component {...props} />
                        ) : (
                            <div>您没有权限访问该页面</div>
                        )
                    ) : (
                        <Component {...props} />
                    )
                ) : (
                    <Navigate to='/login'
                        state = {{from: props.location}}
                        replace={true}
                    />
                )
            )}/>
        );
    }
}
