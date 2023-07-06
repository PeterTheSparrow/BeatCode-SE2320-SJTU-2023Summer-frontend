import React from "react";
import { Form, Input, Button } from 'antd';
import {logout} from "../../services/userService";

/**
 * @Description: 个人信息界面
 * 1. 用户名
 * 2. 邮箱
 * 3. 密码
 * 4. 电话
 * 5. 退出登录
 * 6. 保存
 *
 * 这里默认显示的内容是从后端通过ajax请求获得的用户之前的内容
 * */
function PersonalInfo() {
    const onFinish = (values) => {
        console.log(values);
        // TODO: implement save logic
    };

    const logout_service = () => {
        console.log("logout");
        logout();
    }

    return (
        // 组件位于页面居中偏左
        <div
            style={{
                height: 530,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            {/*需要两个占位组件*/}
            <div
                style={{
                    height: 60,
                }}
            />
            {/*表格居中*/}
            <Form
                name="personal-info"
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{
                    // marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20,
                    width: 550,
                }}
            >
                <Form.Item label="用户名" name="username">
                    <Input />
                </Form.Item>
                <Form.Item label="邮箱" name="email">
                    <Input />
                </Form.Item>
                <Form.Item label="密码" name="password">
                    <Input.Password />
                </Form.Item>
                {/*<Form.Item label="个人信息" name="info">*/}
                {/*    <Input.TextArea />*/}
                {/*</Form.Item>*/}
                <Form.Item label="电话" name="phone">
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Form.Item>
            </Form>
            <Button type="primary" htmlType="submit"
                    danger={true}
                    onClick={logout_service}
                    style={{
                        marginLeft: 0,
                    }}>
                退出登录
            </Button>
        </div>
    );
}

export default PersonalInfo;
