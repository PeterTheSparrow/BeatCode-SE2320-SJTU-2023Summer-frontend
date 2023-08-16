import React from 'react';
import { Col, Layout, Menu, Row, theme} from 'antd';
import {Link, Outlet, useLocation} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";
const { Header, Content, Footer } = Layout;



/**
 * @Description: oj平台主界面，使用函数式组件
 * 组成：
 * 1. Header：导航栏，由三部分组成：logo，菜单，用户信息
 * 2. Content：内容区域，由一个组件组成（component）
 * 3. Footer：版权信息
 * */
function OJMainView() {
    const location = useLocation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout className="layout"  style={{ minHeight: '100vh' }}>
            <Header
                style={{
                    display: 'flex',
                    // alignItems: 'center',
                    backgroundColor: colorBgContainer,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // 添加了这一行
                }}
            >
                <Row
                    style={{
                        width: '100%',
                    }}
                >
                    <Col span={8}>
                        {/*单击logo能够从任何地方跳转到根目录*/}
                        <Link to="/">
                            <img
                                src={require('../img/logo.jpg')}
                                alt="logo"
                                style={
                                    {
                                        width: '60px',
                                        height: '60px',
                                    }
                                }
                            />
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Menu
                            theme={'light'}
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            selectedKeys={[location.pathname]}
                        >
                            <Menu.Item key="/" style={location.pathname === '/' ? { fontWeight: 'bold' } : null}>
                                <Link to="/">题库</Link>
                            </Menu.Item>
                            <Menu.Item key="/ranking-board" style={location.pathname === '/ranking-board' ? { fontWeight: 'bold' } : null}>
                                <Link to="/ranking-board">排行榜</Link>
                            </Menu.Item>
                            <Menu.Item key="/submissions" style={location.pathname === '/submissions' ? { fontWeight: 'bold' } : null}>
                                <Link to="/submissions">评测状态</Link>
                            </Menu.Item>
                            <Menu.Item key="/personal-info" style={location.pathname === '/personal-info' ? { fontWeight: 'bold' } : null}>
                                <Link to="/personal-info">个人信息</Link>
                            </Menu.Item>
                        </Menu>

                    </Col>
                    <Col span={8}>
                        {/*超链接，点击一下跳跃到用户信息界面*/}
                        <Link to="/personal-info">
                            {/*大小：很大*/}
                            <UserOutlined
                                style={{
                                    fontSize: '32px',
                                    color: '#1890ff',
                                    // float: 'right',
                                    marginTop: '20px',
                                    marginBottom: '10px',
                                    marginRight: '20px',
                                    marginLeft: '180px',
                                }}
                            />
                        </Link>
                    </Col>
                </Row>

            </Header>
            {/*minHeight用于使得content撑满父组件，防止露出白边，很丑*/}
            <Content
                style={{
                    padding: '0 50px',
                    marginTop: 32,
                    minHeight: '100%',
                }}
            >
                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    {/*定义二级路由的出口*/}
                    < Outlet />
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                BeatCode ©2023 Created by BeatCode dev team
            </Footer>
        </Layout>
    );
}


export default OJMainView;