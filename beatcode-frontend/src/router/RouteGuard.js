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
// const RouteGuard = ({element: Element, ...rest}) => {
//     // 从后端鉴权获得用户是否登录、是否是管理员的信息
//     const isAuthed = false;
//     const isAdmin = false;
//
//
// }

class RouteGuard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false,
            isUser: false,
            isLoadingUser: true,
            isLoadingAdmin: true
        };
    }

    componentDidMount() {
        // 检查是否是管理员
        postRequest(apiUrlWindows + '/CheckAdmin', {}, (data) => {
            console.log("judge admin:::", data);
            this.setState({
                isAdmin: data.msg === 'yes',
                isLoadingAdmin: false
            });
        });

        // 检查是否是用户（是管理员就不是用户）
        if (!this.state.isAdmin) {
            postRequest(apiUrlWindows + '/CheckUser', {}, (data) => {
                console.log("judge user:::",data);
                this.setState({
                    isUser: data.msg === 'yes',
                    isLoadingUser: false
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
            console.log('isLoading');
            return null;
        }

        if (!isAdmin && !isUser) {
            console.log('isAdmin: ' + isAdmin);
            console.log('isUser: ' + isUser);
            return <Navigate to='/login' />;
        }

        if (isAdmin || isUser) {
            console.log('isAdmin: ' + isAdmin);
            console.log('isUser: ' + isUser);

            if (url.startsWith('/admin')) {
                if (isAdmin) {
                    return <Element {...rest} />;
                } else {
                    return <Navigate to='/' />;
                }
            } else {
                if (isUser) {
                    return <Element {...rest} />;
                } else {
                    return <Navigate to='/admin' />;
                }
            }
        }
    }
}

// 写成函数组件
// function RouteGuard({element: Element,currURL: url, ...rest}) {
//     // 从后端鉴权获得用户是否登录、是否是管理员的信息
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [isUser, setIsUser] = useState(false);
//
//     const [isLoading, setIsLoading] = useState(true);
//
//     // 从后端鉴权获得用户是否登录、是否是管理员的信息
//     useEffect(() => {
//         // 检查是否是管理员
//         postRequest(apiUrlWindows + '/CheckAdmin', {}, (data) => {
//             console.log(data);
//             setIsAdmin(prevIsAdmin => {
//                 if (data.msg === 'yes') {
//                     return true;
//                 }
//                 else {
//                     return false;
//                 }
//             });
//         });
//
//         // 检查是否是用户（是管理员就不是用户）
//         if (!isAdmin) {
//             postRequest(apiUrlWindows + '/CheckUser', {}, (data) => {
//                 console.log(data);
//                 setIsUser(prevIsUser => {
//                     if (data.msg === 'yes') {
//                         return true;
//                     }
//                     else {
//                         return false;
//                     }
//                 });
//             });
//         }
//
//         setIsLoading(false);
//
//
//     } ,[]);
//
//     if (isLoading) {
//         console.log('isLoading');
//         return null;
//     }
//
//     // 如果没有登录，跳转到登录页面
//     if (!isAdmin && !isUser) {
//         console.log('isAdmin: ' + isAdmin);
//         console.log('isUser: ' + isUser);
//
//         return <Navigate to='/login' />;
//     }
//
//     // 如果已经登录：注意用户和管理员的页面不能相互跳转
//     if (isAdmin || isUser) {
//         /*
//         * 解析url
//         * 1. url 以 '/admin'开头，说明是管理员
//         * 2. url 以 '/'开头，说明是用户
//         * */
//         if (url.startsWith('/admin')) {
//             if (isAdmin) {
//                 return <Element {...rest} />;
//             }
//             else {
//                 return <Navigate to='/' />;
//             }
//         }
//         else {
//             if (isUser) {
//                 return <Element {...rest} />;
//             }
//             else {
//                 return <Navigate to='/admin' />;
//             }
//         }
//
//
//     }
//
//
//
//
// }



export default RouteGuard;

/*
* 特别说明：
* （1）react v5和v6的版本中，对于私有路由/路由守卫的写法，有所不同。陈昊鹏老师的版本直接移植到v6中会报错。
* （2）react v6中，路由守卫的写法参考：
* 官方采用的写法：（散开来写）
* https://blog.csdn.net/weixin_68537886/article/details/130688392
*
* javaScript风格的写法：
* import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

// 自定义路由守卫组件
const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

const Routes = ({ isAuthenticated }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default Routes;
*
*
*
*
* import React, { useState } from 'react';
import Routes from './Routes';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 在这里根据您的实际逻辑设置 isAuthenticated 状态

  return (
    <div>
      <Routes isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default App;

* */