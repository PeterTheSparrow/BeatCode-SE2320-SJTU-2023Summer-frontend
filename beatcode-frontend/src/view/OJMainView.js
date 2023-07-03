import React from 'react';
import {Col, Layout, Menu, Row, theme} from 'antd';
import {Link, Outlet, useLocation} from "react-router-dom";
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
        <Layout className="layout">
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
                            <Menu.Item key="/my-submissions" style={location.pathname === '/my-submissions' ? { fontWeight: 'bold' } : null}>
                                <Link to="/my-submissions">我的提交</Link>
                            </Menu.Item>
                            <Menu.Item key="/personal-info" style={location.pathname === '/personal-info' ? { fontWeight: 'bold' } : null}>
                                <Link to="/personal-info">个人信息</Link>
                            </Menu.Item>
                        </Menu>

                    </Col>
                    <Col span={8}>
                        <h1 style={{color: 'black'}}>TODO User-Profile</h1>
                    {/*    TODO 这里插一个用户头像的组件component     */}
                    </Col>
                </Row>

            </Header>
            <Content
                style={{
                    padding: '0 50px',
                    marginTop: 32,
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