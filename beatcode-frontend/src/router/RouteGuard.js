import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {postRequest} from "../utils/ajax";
import {apiUrlWindows} from "../utils/config-overrides";

/**
 * @Description: 路由守卫
 * @param {element} 组件
 *
 * 说明：
 * 1. 检测是否已经登录
 * 2. 如果已经登录，跳转到原来的页面
 * 3. 如果没有登录，跳转到登录页面
 * 4. 用户与管理员的身份鉴权：
 * （1）用户和管理员不能进入互相的页面
 * */

class RouteGuard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // userId，初始值为空
            userId: '',
            isAdmin: false,
            isUser: false,
            isLoadingUser: true,
            isLoadingAdmin: true,
        };
    }

    componentDidMount() {
        // 检查是否是管理员
        postRequest(apiUrlWindows + '/CheckAdmin', {}, (data) => {
            // console.log("judge admin:::", data);
            this.setState({
                isAdmin: data.msg === 'yes',
                userId: data.data.user_id,
                isLoadingAdmin: false,
            });
        });

        // 检查是否是用户（是管理员就不是用户）
        if (!this.state.isAdmin) {
            postRequest(apiUrlWindows + '/CheckUser', {}, (data) => {
                // console.log("judge user:::",data);
                this.setState({
                    isUser: data.msg === 'yes',
                    userId: data.data.user_id,
                    isLoadingUser: false,
                });
            });
        } else {
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { element: Element, currURL: url, ...rest } = this.props;
        const { isAdmin, isUser, isLoadingAdmin, isLoadingUser } = this.state;

        if (isLoadingAdmin || isLoadingUser) {
            // console.log('isLoading');
            return null;
        }

        if (!isAdmin && !isUser) {
            // console.log('isAdmin: ' + isAdmin);
            // console.log('isUser: ' + isUser);
            return <Navigate to='/login' />;
        }

        if (isAdmin || isUser) {

            // 如果是管理员的url
            if (url.startsWith('/admin'))
            {
                if (isAdmin)
                {
                    return <Element userId={this.state.userId} {...rest} />;
                }
                else
                {
                    return <Navigate to='/' />;
                }
            }
            else{
                if (isAdmin)
                {
                    return <Navigate to='/admin' />;
                }
                else
                {
                    return <Element userId={this.state.userId} {...rest} />;
                }
                // if (isUser)
                // {
                //     return <Element userId={this.state.userId} {...rest} />;
                // }
                // else if (isAdmin)
                // {
                //     return <Navigate to='/admin' />;
                // }
            }
        }
    }
}

export default RouteGuard;