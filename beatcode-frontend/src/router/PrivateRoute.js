import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as userService from '../services/userService';
import { message } from 'antd';

/**
 * @Description: 私有路由，需要登录才能访问
 * @param {component} 组件
 * @param {path} 路径
 * @param {exact} 是否精确匹配
 * @param {strict} 是否严格匹配
 * @return {*} 返回值
 *
 * 说明：
 * 1. 跳转逻辑
 * */
const PrivateRoute = ({ component: Component, path = '/', exact = false, strict = false }) => {
    const [isAuthed, setIsAuthed] = useState(false);
    const [hasAuthed, setHasAuthed] = useState(false);

    // const checkAuth = (data) => {
    //     console.log(data);
    //     if (data.status >= 0) {
    //         setIsAuthed(true);
    //         setHasAuthed(true);
    //     } else {
    //         message.error(data.msg);
    //         localStorage.removeItem('user');
    //         setIsAuthed(false);
    //         setHasAuthed(true);
    //     }
    // };

    useEffect(() => {
        // userService.checkSession(checkAuth);
    }, []);

    console.log(isAuthed);

    if (!hasAuthed) {
        return null;
    }

    return (
        <Route
            path={path}
            exact={exact}
            strict={strict}
            render={(props) =>
                isAuthed ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
