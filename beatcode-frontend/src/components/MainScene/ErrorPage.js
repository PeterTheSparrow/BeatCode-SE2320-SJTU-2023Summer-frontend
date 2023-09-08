import React from 'react';
import { Button, Result } from 'antd';
import {NavLink} from "react-router-dom";
const ErrorPage = () => (
    <Result
        status="404"
        title="404"
        subTitle="哦不，你似乎进入了不存在的空间"
        extra={
        <NavLink to={"/"}>
            <Button type="primary">返回主页</Button>
        </NavLink>
    }
    />
);
export default ErrorPage;