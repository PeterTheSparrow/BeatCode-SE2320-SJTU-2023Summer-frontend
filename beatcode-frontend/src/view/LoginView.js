import React from 'react';
import LoginForm from '../components/LoginAndRegister/LoginForm';
// import {withRouter} from "react-router-dom";
import "../css/Login.css"
import {Layout} from 'antd';
const { Footer } = Layout;

const LoginView = () => {
    return (
        <div className="login-page">
            <div
                className="login-container"
                style={
                    {
                        marginTop: 180,
                    }
                }
            >
                <div className="login-box">
                    <h1
                        className="page-title"
                        style={{
                            // textAlign: 'center',
                            color: 'black',
                            fontFamily: 'Microsoft YaHei UI',
                            }}
                    >
                        Login To BeatCode...
                    </h1>
                    <div className="login-content">
                        <LoginForm/>
                    </div>
                </div>
                {/*footer底部居中，透明背景*/}
                <Footer
                    style={{
                        textAlign: 'center',
                        background: 'transparent',
                        marginTop: 80,
                    }}
                >
                    BeatCode ©2023 Created by BeatCode dev team
                </Footer>
            </div>
        </div>
    );
};
export default LoginView;
