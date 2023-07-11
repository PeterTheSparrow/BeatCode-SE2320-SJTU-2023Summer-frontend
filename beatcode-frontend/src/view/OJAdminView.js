import React from 'react';
import { Col, Layout, Menu, Row, theme } from 'antd';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { SmileTwoTone, UserOutlined } from '@ant-design/icons';
import {ProblemSet} from "../components/MainScene/ProblemSet";
import RankingBoard from "../components/MainScene/RankingBoard";
import ProblemSetAdmin from "../components/AdminScene/ProblemSetAdmin";
import AllSubmissions from "../components/MainScene/AllSubmissions";
import PersonalInfo from "../components/MainScene/PersonalInfo";

const { Header, Content, Footer } = Layout;

/**
 * @Description: oj平台主界面，使用函数式组件
 * 组成：
 * 1. Header：导航栏，由三部分组成：logo，菜单，用户信息
 * 2. Content：内容区域，由一个组件组成（component）
 * 3. Footer：版权信息
 * */
function OJAdminView() {
    const location = useLocation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Header
                style={{
                    display: 'flex',
                    backgroundColor: colorBgContainer,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // 添加了这一行
                }}
            >
                <Row style={{ width: '100%' }}>
                    <Col span={8}>
                        <Link to="/">
                            <img
                                src={require('../img/logo.jpg')}
                                alt="logo"
                                style={{
                                    width: '60px',
                                    height: '60px',
                                }}
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
                            <Menu.Item
                                key="/admin/"
                                style={location.pathname === '/admin/' ? { fontWeight: 'bold' } : null}
                            >
                                <Link to="/admin/">题库</Link>
                            </Menu.Item>
                            <Menu.Item
                                key="/admin/ranking-board"
                                style={location.pathname === '/admin/ranking-board' ? { fontWeight: 'bold' } : null}
                            >
                                <Link to="/admin/ranking-board">排行榜</Link>
                            </Menu.Item>
                            <Menu.Item
                                key="/admin/my-submissions"
                                style={location.pathname === '/admin/my-submissions' ? { fontWeight: 'bold' } : null}
                            >
                                <Link to="/admin/my-submissions">我的提交</Link>
                            </Menu.Item>
                            <Menu.Item
                                key="/admin/personal-info"
                                style={location.pathname === '/admin/personal-info' ? { fontWeight: 'bold' } : null}
                            >
                                <Link to="/admin/personal-info">个人信息</Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={8}>
                        <Link to="/personal-info">
                            <UserOutlined
                                style={{
                                    fontSize: '32px',
                                    color: '#1890ff',
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
                    <Switch>
                        <Route exact path="/admin/" component={ProblemSetAdmin} />
                        <Route path="/admin/ranking-board" component={RankingBoard} />
                        <Route path="/admin/my-submissions" component={AllSubmissions} />
                        <Route path="/admin/personal-info" component={PersonalInfo} />
                    </Switch>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                BeatCode ©2023 Created by BeatCode dev team
            </Footer>
        </Layout>
    );
}

export default OJAdminView;
