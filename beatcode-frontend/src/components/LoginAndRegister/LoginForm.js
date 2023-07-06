import {Link} from "react-router-dom";
import {Button, Checkbox, Form, Input, message} from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {login} from "../../services/userService";

const LoginForm = () => {
    const handleSubmit = (data) => {
        console.log(data);
        // TODO 对表单字段进行校验，保证不为空
        if (data.username === undefined || data.username === "" ) {
            message.error("用户名不能为空");
            return;
        }
        if (data.password === undefined || data.password === "" ) {
            message.error("密码不能为空");
            return;
        }

        // TODO 发送ajax请求
        /*
        * 请求格式：
        * {
                "name":"alice",
                "pass":"123456"
            }
        * */
        login({
            "name": data.username,
            "pass": data.password
        });
    }

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            style={{
                width : 300,
                // textAlign: 'center',
                // margin: '0 auto',
            }}
            onFinish={handleSubmit}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                {/*Or <a href="/register">register now!</a>*/}
                Or <Link to="/register">Register now!</Link>
            </Form.Item>
        </Form>
    );
}

export default LoginForm;