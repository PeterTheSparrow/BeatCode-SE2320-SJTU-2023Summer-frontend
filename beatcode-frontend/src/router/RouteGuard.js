import React from 'react';
import {Navigate} from "react-router-dom";

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
const RouteGuard = ({element: Element, isAuthed, ...rest}) => {
    return isAuthed ? <Element {...rest} /> : <Navigate to={"/login"} />;
}

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