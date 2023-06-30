/*
* oj平台主界面，使用函数式组件
* */
import React from 'react';
// import "../css/Header.css"
import {Col, Layout, Menu, Row, theme} from 'antd';
const { Header, Content, Footer } = Layout;

const MainViewElement = () => {
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
                    </Col>
                    <Col span={8}>
                        <Menu
                            theme={'light'}
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            items={[
                                {
                                    key: '1',
                                    label: '题库',
                                },
                                {
                                    key: '2',
                                    label: '排行榜',
                                },
                                {
                                    key: '3',
                                    label: '我的提交',
                                },
                                {
                                    key: '4',
                                    label: '个人信息',
                                }
                            ]}
                        />
                    </Col>
                    <Col span={8}>
                        <h1 style={{color: 'black'}}>BeatCode</h1>
                    {/*    TODO 这里插一个用户头像的组件component     */}
                    </Col>
                </Row>

            </Header>
            <Content
                style={{
                    padding: '0 50px',
                    marginTop: 64,
                }}
            >
                {/*TODO 这里插一个component */}
                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    Content
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
};

function OJMainView() {
    return (
        <MainViewElement />
    );
}

export default OJMainView;