import React from "react";
import {Button, Col, Form, Input, message, Row, Select} from "antd";
import {
    CheckOutlined,
    LockOutlined,
    PhoneOutlined,
    SendOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import {RegisterService, sendCodeService} from "../../services/userService"

const { Option } = Select;

const RegisterForm = () => {
    // 存储邮箱地址
    const [email, setEmail] = React.useState("");

    const [count, setCount] = React.useState(10);
    const [isDisabled, setIsDisabled] = React.useState(false);

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
            message.error("请填写完整信息！");
            return;
        }

        // 定义正则表达式，来检查邮箱格式是否正确
        let emailReg = new RegExp("[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+");

        if (!emailReg.test(data.email)) {
            message.error("邮箱格式不正确！");
            return;
        }

        // 正则表达式检查手机号码格式是否正确
        let phoneReg = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");
        if (!phoneReg.test(data.phone)) {
            message.error("手机号码格式不正确！");
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
            "code": data.code,
        });


    };

    // 发送验证码
    const sendCode = () => {
        // 检查邮箱是否为空
        if (email === "") {
            message.error("邮箱不能为空！");
            return;
        }

        // 用正则表达式检查邮箱
        // 邮箱格式形如：
        // 1. 123456789@qq.com
        // 2. 12345ddd6789@sjtu.edu.cn
        let emailReg = new RegExp("[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+");

        if (!emailReg.test(email)) {
            message.error("邮箱格式不正确！");
            return;
        }

        // 如果不为空，发送验证码
        let data = {
            "email": email,
        }

        // call-back function
        const callback0 = (data) => {
            console.log("data", data.status);
            console.log("data msg", data.msg)
            if (data.status === 0) {
                message.success("验证码已发送，请注意查收");

                // 验证码成功发送后，将按钮设置为不可用状态，持续60s
                // 设置时间为10s
                setCount(10);
                setIsDisabled(true);
                let timer = setInterval(() => {
                    setCount((preCount) => preCount - 1);
                }, 1000);

                setTimeout(() => {
                    clearInterval(timer);
                    setIsDisabled(false);
                    setCount(10);
                }, 10000);


            }
            else if (data.status === 4) {
                message.error("邮箱已被注册！");
            }
            else {
                message.error("验证码发送失败！请稍后重试");
            }
        }

        sendCodeService(data, callback0);


    }

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
                <Row gutter={8}> {/* 使用 Row 组件 */}
                    <Col span={16}> {/* 使用 Col 组件，邮箱输入框占比16 */}
                        <Input
                            prefix={<SendOutlined />}
                            placeholder="Email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </Col>
                    <Col span={8}> {/* 使用 Col 组件，按钮占比8 */}
                        <Button
                            type="primary"
                            style={{
                                width: "100%",
                            }}
                            onClick={sendCode}
                            disabled={isDisabled}
                        >
                            {isDisabled ? `${count} s` : "Send Code"}
                        </Button>
                    </Col>
                </Row>
            </Form.Item>

            <Form.Item
                name="code"
                rules={[
                    {
                        required: true,
                        message: "Please input your verify code!",
                    },
                ]}
            >
                <Input
                    prefix={<CheckOutlined />}
                    placeholder="Verify Code"
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
