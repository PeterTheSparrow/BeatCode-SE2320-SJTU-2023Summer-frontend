import React, {useEffect, useState} from "react";
import {Input, Button, Col, Row, Card, Form, Tooltip, Divider, message} from 'antd';
import {
    getUserInfo,
    logout, sendCodeService,
    updateEmail,
    updatePassword,
    updatePhoneNumber,
    updateUsername
} from "../../services/userService";
import {postRequest} from "../../utils/ajax";
import {apiUrlWindows} from "../../utils/config-overrides";
import { useOutletContext } from "react-router-dom";

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
 *
 * 因为这几个字段的修改都需要不同的验证，所以各自独立实现
 * 1. 修改用户名
 *  1.1 验证用户名是否重复
 * 2. 修改邮箱
 *  2.1 验证邮箱格式是否正确
 *  2.2 验证邮箱是否重复
 *  2.3 验证邮箱验证码是否正确
 * 3. 修改密码
 *  3.1 通过已经验证的邮箱发送验证码，如果正确则修改密码
 *
 * 1. 每次点击save之后，都需要从后台重新加载数据
 * 2. 【用户信息的获取】现在的问题是去两个服务里面分别请求，还是在一个服务里面请求（这样就需要后端两个服务来通信了，
 *  感觉还是后端两个服务来通信比较合理一些）
 * 3. 【用户信息的修改】
 * 4. 所以每次查询的时候，我如何判断是哪个用户来查了？
 * */
function PersonalInfo() {
    const outletData = useOutletContext(); // {userId: 82}


    // 使用 state 来存储每个字段的编辑状态和值
    // const [userid, setUserid] = useState(0);
    const [userData, setUserData] = useState({});
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);

    // 用于控制验证码的按钮
    const [count, setCount] = React.useState(10);
    const [isDisabled, setIsDisabled] = React.useState(false);

    // 使用 state 来存储正在编辑的用户信息
    const [editedData, setEditedData] = useState({});

    // 处理编辑按钮点击事件
    const handleEditClick = (field) => {
        // 将正在编辑的字段初始化为当前用户信息的值
        setEditedData({ [field]: userData[field] });

        // 设置对应字段的编辑状态为 true
        if (field === 'username') setIsEditingUsername(true);
        if (field === 'password') setIsEditingPassword(true);
        if (field === 'email') setIsEditingEmail(true);
        if (field === 'phoneNumber') setIsEditingPhoneNumber(true);
    };

    // 处理取消编辑按钮点击事件
    /*
    * field指的是哪个字段
    * */
    const handleCancelEdit = (field) => {
        // 取消编辑状态并清除编辑数据
        setEditedData({});
        if (field === 'username') setIsEditingUsername(false);
        if (field === 'password') setIsEditingPassword(false);
        if (field === 'email') setIsEditingEmail(false);
        if (field === 'phoneNumber') setIsEditingPhoneNumber(false);
    };

    // 处理单独字段的表单提交事件
    const handleSubmit = (field) => {
        // // 更新用户信息，这里只是一个示例，实际情况中应该将数据提交到后端进行保存
        // setUserData({ ...userData, ...editedData });
        //
        //

        // 取消对应字段的编辑状态
        if (field === 'username') {
            setIsEditingUsername(false);

            // 发送请求到后端
            const callback = (data) => {
                // 打印后端传回的message
                if (data.status === 0) {
                    message.success(data.msg);
                    // 更新用户信息
                    setUserData({ ...userData, ...editedData });
                }
                else {
                    message.error(data.msg);
                    // 因为修改失败，所以不更新
                }
            }
            // console.log("send info:", {userId: outletData.userId, userName: editedData.username})
            updateUsername({userId: outletData.userId, name: editedData.username}, callback)
        }
        if (field === 'password') {
            setIsEditingPassword(false);

            // 发送请求到后端
            const callback = (data) => {
                // 打印后端传回的message
                if (data.status === 0) {
                    message.success(data.msg);
                    // 更新用户信息
                    setUserData({ ...userData, ...editedData });
                }
                else {
                    message.error(data.msg);
                    // 因为修改失败，所以不更新
                }
            }

            updatePassword({userId: outletData.userId, password: editedData.password}, callback)
        }
        if (field === 'email') {
            setIsEditingEmail(false);

            // 发送请求到后端
            /* @param data 传入的数据
            *            data中包含的数据：
            *             userId: 用户id
            *             email: 新邮箱
            *             code: 验证码
            */
            const callback = (data) => {
                // 打印后端传回的message
                if (data.status === 0) {
                    message.success(data.msg);
                    // 更新用户信息
                    setUserData({ ...userData, ...editedData });
                }
                else {
                    message.error(data.msg);
                    // 因为修改失败，所以不更新
                }
            }

            let data = {
                "userId": outletData.userId,
                "email": editedData.email,
                "code": editedData.emailCode,
            }

            updateEmail(data, callback)
        }
        if (field === 'phoneNumber') {
            setIsEditingPhoneNumber(false);

            // 发送请求到后端
            const callback = (data) => {
                // 打印后端传回的message
                if (data.status === 0) {
                    message.success(data.msg);
                    // 更新用户信息
                    setUserData({ ...userData, ...editedData });
                }
                else {
                    message.error(data.msg);
                    // 因为修改失败，所以不更新
                }
            }

            updatePhoneNumber({userId: outletData.userId, phone: editedData.phoneNumber}, callback)
        }
    };

    const sendVerificationCode = () => {
        // 检查邮箱是否为空
        if (editedData.email === "") {
            message.error("邮箱不能为空！");
            return;
        }

        // 如果邮箱和之前一样，就不发送验证码
        if (editedData.email === userData.email) {
            message.error("邮箱和之前一样！");
            return;
        }

        // 如果不为空，发送验证码
        let data = {
            "email": editedData.email,
        }

        // call-back function
        const callback0 = (data) => {
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

        sendCodeService(data, callback0)
    }

    // useEffect从后端获取初始化用户数据
    useEffect(() => {
        // 根据用户id从后端获得用户数据
        const callback = (data) => {
            // 更新用户信息
            setUserData({
                username: data.userName,
                email: data.email,
                phoneNumber: data.phone,
                password: data.password,
            });
        }

        getUserInfo({userId: outletData.userId}, callback)

    }, []);

    return (
        <div>
            <Form
                layout="vertical"
                style={{
                    marginLeft: '23%',
                    marginRight: '23%',
                    }}
            >
                {/*padding*/}
                <div
                    style={{
                        height: 40,
                    }}
                >
                </div>

                {/*用户名的label加粗*/}
                <Form.Item label={<span style={{ fontWeight: 'bold' }}>用户名</span>}>
                    {/*如果正在编辑用户名，则显示输入框*/}
                    {isEditingUsername ? (
                        <>
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input
                                        value={editedData.username}
                                        onChange={(e) => setEditedData({ ...editedData, username: e.target.value })}
                                    />
                                </Col>
                                <Col span={4}>
                                    <Button type="primary"
                                            onClick={() => handleSubmit('username')}
                                            style={{
                                                width: '90%',
                                            }}>
                                        提交
                                    </Button>
                                </Col>
                                <Col span={4}>
                                    <Button
                                        onClick={() => handleCancelEdit('username')}
                                        style={{
                                            width: '90%',
                                        }}>
                                        取消
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <Tooltip title="编辑">
                            <span onClick={() => handleEditClick('username')}>{userData.username}</span>
                        </Tooltip>
                    )}
                </Form.Item>

                <Divider />

                {/*密码，label加粗*/}
                <Form.Item label={<span style={{ fontWeight: 'bold' }}>密码</span>}>
                    {/*如果正在编辑密码，则显示输入框*/}
                    {isEditingPassword ? (
                        <>
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input
                                        value={editedData.password}
                                        onChange={(e) => setEditedData({ ...editedData, password: e.target.value })}
                                    />
                                </Col>
                                <Col span={4}>
                                    <Button type="primary"
                                            onClick={() => handleSubmit('password')}
                                            style={{
                                                width: '90%',
                                            }}>
                                        提交
                                    </Button>
                                </Col>
                                <Col span={4}>
                                    <Button
                                        onClick={() => handleCancelEdit('password')}
                                        style={{
                                            width: '90%',
                                        }}>
                                        取消
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <Tooltip title="编辑">
                            <span onClick={() => handleEditClick('password')}>{userData.password}</span>
                        </Tooltip>
                    )}
                </Form.Item>




                <Divider />


                <Form.Item label={<span style={{ fontWeight: 'bold' }}>邮箱</span>}>
                    {isEditingEmail ? (
                        <>
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input
                                        value={editedData.email}
                                        onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                                    />
                                </Col>
                                <Col span={4}>
                                    <Button type="primary"
                                            onClick={() => handleSubmit('email')}
                                            style={{
                                                width: '90%',
                                    }}>
                                        提交
                                    </Button>
                                </Col>
                                <Col span={4}>
                                    <Button
                                        onClick={() => handleCancelEdit('email')}
                                        style={{
                                            width: '90%',
                                        }}>
                                        取消
                                    </Button>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ marginTop: 10 }}>
                                <Col span={12}>
                                    <Input
                                        value={editedData.emailCode}
                                        onChange={(e) => setEditedData({ ...editedData, emailCode: e.target.value })}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Button
                                        disabled={isDisabled}
                                        onClick={sendVerificationCode}
                                    >
                                        {isDisabled ? `${count} s` : '发送验证码'}
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <Tooltip title="编辑">
                            <span onClick={() => handleEditClick('email')}>{userData.email}</span>
                        </Tooltip>
                    )}
                </Form.Item>

                <Divider />

                <Form.Item label={<span style={{ fontWeight: 'bold' }}>电话</span>}>
                    {isEditingPhoneNumber ? (
                        <>
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input
                                        value={editedData.phoneNumber}
                                        onChange={(e) => setEditedData({ ...editedData, phoneNumber: e.target.value })}
                                    />
                                </Col>
                                <Col span={4}>
                                    <Button type="primary"
                                            onClick={() => handleSubmit('phoneNumber')}
                                            style={{
                                                width: '90%',
                                            }}>
                                        提交
                                    </Button>
                                </Col>
                                <Col span={4}>
                                    <Button
                                        onClick={() => handleCancelEdit('phoneNumber')}
                                        style={{
                                            width: '90%',
                                        }}>
                                        取消
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <Tooltip title="编辑">
                            <span onClick={() => handleEditClick('phoneNumber')}>{userData.phoneNumber}</span>
                        </Tooltip>
                    )}
                </Form.Item>



            </Form>
            <div
                style={{
                    height: 40,
                }}
            ></div>
        </div>
    );
}

export default PersonalInfo;