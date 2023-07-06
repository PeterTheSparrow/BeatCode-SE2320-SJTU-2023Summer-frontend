import React, { useState, useEffect } from 'react';
import { postRequest_receive_string } from '../utils/ajax';
import { apiUrl } from "../utils/config-overrides";
import {Route} from "react-router-dom";


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
 * */
const PrivateRoute = ({ component: Component, path = '/', exact = false, strict = false }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const uri_user = apiUrl + '/checkUser';
    const uri_admin = apiUrl + '/checkAdmin';

    useEffect(() => {
        // TODO 向后端进行一个检查
        // 检查是否是用户？
        postRequest_receive_string(uri_user, {}, (data) => {
            if (data === 'yes') {
                setIsLogin(true);
                setIsAdmin(false);
            }
        });
        // 检查是否是管理员？
        postRequest_receive_string(uri_admin, {}, (data) => {
            if (data === 'yes') {
                setIsLogin(true);
                setIsAdmin(true);
            }
        });

    }, []);

    return (
        // 没有登录就传送回登录界面
        // 用户和管理员不能互相登录彼此的界面
        // 可以通过解析url判断是谁的界面
        // TODO
        <div></div>
    );
}

export default PrivateRoute;
