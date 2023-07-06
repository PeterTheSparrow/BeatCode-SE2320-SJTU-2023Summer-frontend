import React from "react";
// import { login, registerFunc } from "../services/UserService";
import { Button, Checkbox, Form, Input, Select } from "antd";
import {
    LockOutlined,
    PhoneOutlined,
    SendOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { RegisterService } from "../../services/userService"

const { Option } = Select;

const RegisterForm = () => {
    const handleSubmit = (data) => {
        console.log(data);
        // 对表单所有内容进行检验，不能有任何一个为空
        if (
            data.username === "" ||
            data.password === "" ||
            data.confirm === "" ||
            data.email === "" ||
            data.phone === "" ||
            data.role === ""
        ) {
            window.alert("请填写完整信息！");
            return;
        }

        // 定义正则表达式，来检查邮箱格式是否正确
        let emailReg = new RegExp("[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+");

        if (!emailReg.test(data.email)) {
            window.alert("邮箱格式不正确！");
            return;
        }

        // 前端antd已经封装好了检验两次密码不一致的功能，只需要向后端发送请求即可
        // TODO: 向后端发送请求
        /*
        *      * @param map 参数：<br/>
     *            {<br/>
     *            &emsp;&emsp;"name": string, // 用户名<br/>
     *            &emsp;&emsp;"pass": string,  // 密码<br/>
     *            &emsp;&emsp;"email": string,  //邮箱<br/>
     *            &emsp;&emsp;"phone": string,  //电话<br/>
     *            }<br/>
     * @return bookstore经典Message格式，不含数据
        * */
        RegisterService({
            "name": data.username,
            "pass": data.password,
            "email": data.email,
            "phone": data.phone,
        });


    };

    return (
        <Form
            name="normal_register"
            className="register-form"
            initialValues={{
                remember: false,
            }}
            style={{
                width: 300,
            }}
            onFinish={handleSubmit}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please input your Username!",
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your Password!",
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item
                name="confirm"
                rules={[
                    {
                        required: true,
                        message: "Please confirm your Password!",
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Repeat Password"
                />
            </Form.Item>

            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Please input your email!",
                    },
                ]}
            >
                <Input
                    prefix={<SendOutlined />}
                    placeholder="Email"
                />
            </Form.Item>

            <Form.Item
                name="phone"
                rules={[
                    {
                        required: true,
                        message: "Please input your telephone!",
                    },
                ]}
            >
                <Input
                    prefix={<PhoneOutlined />}
                    placeholder="Telephone"
                />
            </Form.Item>

            {/*<Form.Item*/}
            {/*    name="role"*/}
            {/*    label="Role"*/}
            {/*    rules={[*/}
            {/*        {*/}
            {/*            required: true,*/}
            {/*            message: "Please select Role!",*/}
            {/*        },*/}
            {/*    ]}*/}
            {/*>*/}
            {/*    <Select placeholder="select your role">*/}
            {/*        <Option value="admin">Admin</Option>*/}
            {/*        <Option value="student">Student</Option>*/}
            {/*    </Select>*/}
            {/*</Form.Item>*/}

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                >
                    Register NOW!
                </Button>
            </Form.Item>
            <Form.Item>
                Or <Link to="/login">I already have an account!</Link>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
