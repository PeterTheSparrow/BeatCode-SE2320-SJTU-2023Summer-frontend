import React, {useState} from "react";
import {Input, Button, Col, Row, Card} from 'antd';
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
 * */
function PersonalInfo() {
    const [isEditModeUsername, setIsEditModeUsername] = useState(false);
    const [isEditModeEmail, setIsEditModeEmail] = useState(false);
    const [isEditModePassword, setIsEditModePassword] = useState(false);
    const [isEditModePhone, setIsEditModePhone] = useState(false);

    // const [showEditButton, setShowEditButton] = useState(false);
    const [showEditButtonUsername, setShowEditButtonUsername] = useState(false);
    const [showEditButtonEmail, setShowEditButtonEmail] = useState(false);
    const [showEditButtonPassword, setShowEditButtonPassword] = useState(false);
    const [showEditButtonPhone, setShowEditButtonPhone] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const [userData, setUserData] = useState({
        username: 'JohnDoe', // Replace with actual user data
        password: '********',
        email: '123@gmail.com',
        phone: '12345678910',
    });


    const handleInputChange = event => {
        const { name, value } = event.target;
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const logout_service = () => {
        logout();
    }

    const { username, password , email, phone } = userData;

    return (
        <div
            className="user-profile"
            style = {{
                marginBottom: 50,
                marginTop: 10,
                marginLeft: 50,
                marginRight: 50,
                width: "70%",
            }}
        >
            <div
                style={{
                    height: 50,
                }}
            ></div>
            <Card
                title="Username"
                onMouseEnter={() => setShowEditButtonUsername(true)}
                onMouseLeave={() => setShowEditButtonUsername(false)}
                extra={
                    showEditButtonUsername && (
                        <Button onClick={() => setIsEditModeUsername(true)}>Edit</Button>
                    )
                }
            >
                {isEditModeUsername ? (
                        <Row gutter={10} align="middle" style={{ marginBottom: 10 }}>
                            <Col flex="auto">
                                <Input
                                    name="username"
                                    value={username}
                                    onChange={handleInputChange}
                                    style={{ width: "60%" }}
                                />
                            </Col>
                            <Col>
                                <Button onClick={() => setIsEditModeUsername(false)}>Save</Button>
                            </Col>
                            <Col>
                                <Button onClick={() => setIsEditModeUsername(false)}>Cancel</Button>
                            </Col>
                        </Row>

                    ) : (
                    <div>
                        <p>{username}</p>
                    </div>
                )}
            </Card>



            <Card
                title="Email"
                onMouseEnter={() => setShowEditButtonEmail(true)}
                onMouseLeave={() => setShowEditButtonEmail(false)}
                extra={
                    showEditButtonEmail && (
                        <Button onClick={() => setIsEditModeEmail(true)}>Edit</Button>
                    )
                }
            >
                {isEditModeEmail ? (
                    <Row gutter={10} align="middle" style={{ marginBottom: 10 }}>
                        <Col flex="auto">
                            <Input
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                                style={{ width: "60%" }}
                            />
                        </Col>
                        <Col>
                            <Button onClick={() => setIsEditModeEmail(false)}>Save</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => setIsEditModeEmail(false)}>Cancel</Button>
                        </Col>
                    </Row>
                ) : (
                    <div>
                        <p>{email}</p>
                    </div>
                )}
            </Card>

            <Card
                title="Password"
                onMouseEnter={() => setShowEditButtonPassword(true)}
                onMouseLeave={() => setShowEditButtonPassword(false)}
                extra={
                    showEditButtonPassword && (
                        <Button onClick={() => setIsEditModePassword(true)}>Edit</Button>
                    )
                }
            >
                {isEditModePassword ? (
                    <Row gutter={10} align="middle" style={{ marginBottom: 10 }}>
                        <Col flex="auto">
                            <Input
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                                style={{ width: "60%" }}
                            />
                        </Col>
                        <Col>
                            <Button onClick={() => setIsEditModePassword(false)}>Save</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => setIsEditModePassword(false)}>Cancel</Button>
                        </Col>
                    </Row>
                ) : (
                    <div>
                        <p>{password}</p>
                    </div>
                )}
            </Card>

            <Card
                title="Phone"
                onMouseEnter={() => setShowEditButtonPhone(true)}
                onMouseLeave={() => setShowEditButtonPhone(false)}
                extra={
                    showEditButtonPhone && (
                        <Button onClick={() => setIsEditModePhone(true)}>Edit</Button>
                    )
                }
            >
                {isEditModePhone ? (
                    <Row gutter={10} align="middle" style={{ marginBottom: 10 }}>
                        <Col flex="auto">
                            <Input
                                name="phone"
                                value={phone}
                                onChange={handleInputChange}
                                style={{ width: "60%" }}
                            />
                        </Col>
                        <Col>
                            <Button onClick={() => setIsEditModePhone(false)}>Save</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => setIsEditModePhone(false)}>Cancel</Button>
                        </Col>
                    </Row>
                ) : (
                    <div>
                        <p>{phone}</p>
                    </div>
                )}
            </Card>

            <Button type="primary" htmlType="submit"
                    danger={true}
                    onClick={logout_service}
                    size={"large"}
                    style={{
                        marginTop: 20,
                        marginLeft: 0,
                    }}>
                退出登录
            </Button>

            <div
                style={{
                    height: 50,
                }}
            ></div>
        </div>
    );
}

export default PersonalInfo;


// const [username, setUsername] = useState('');
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [telephone, setTelephone] = useState('');
//
// const [isLoading, setIsLoading] = useState(false);
//
// // 初始化
// useEffect(() => {
//
// } , []);
//
// const onFinish = (values) => {
//     console.log(values);
//     // implement save logic
// };
//
// const logout_service = () => {
//     console.log("logout");
//     logout();
// }
//
// if (isLoading) {
//     return <Loading />;
// }
//
//
// return (
//     // 组件位于页面居中偏左
//     <div
//         style={{
//             height: 530,
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             flexDirection: 'column',
//         }}
//     >
//         {/*需要两个占位组件*/}
//         <div
//             style={{
//                 height: 60,
//             }}
//         />
//         {/*表格居中*/}
//         <Form
//             name="personal-info"
//             onFinish={onFinish}
//             labelCol={{ span: 8 }}
//             wrapperCol={{ span: 16 }}
//             style={{
//                 // marginTop: 20,
//                 marginLeft: 20,
//                 marginRight: 20,
//                 marginBottom: 20,
//                 width: 550,
//             }}
//         >
//             <Form.Item label="用户名" name="username">
//                 <Input />
//             </Form.Item>
//             <Form.Item label="邮箱" name="email">
//                 <Input />
//             </Form.Item>
//             <Form.Item label="密码" name="password">
//                 <Input.Password />
//             </Form.Item>
//             <Form.Item label="电话" name="phone">
//                 <Input />
//             </Form.Item>
//             <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//                 <Row gutter={8}> {/* 使用 Row 组件 */}
//                     <Col span={16}> {/* 使用 Col 组件，邮箱输入框占比16 */}
//                         <Button type="primary" htmlType="submit">
//                             保存
//                         </Button>
//                     </Col>
//                     <Col span={8}> {/* 使用 Col 组件，按钮占比8 */}
//                         <Button type="primary" htmlType="submit"
//                                 danger={true}
//                                 onClick={logout_service}
//                                 style={{
//                                     marginLeft: 0,
//                                 }}>
//                             退出登录
//                         </Button>
//                     </Col>
//                 </Row>
//             </Form.Item>
//         </Form>
//
//     </div>
// );
