import React from "react";
import RegisterForm from "../components/LoginAndRegister/RegisterForm";
import "../css/Register.css";

const RegisterView = () => {
    return (
        <div>
            <div className="register-page">
                <div className="register-container">
                    <div className="register-box">
                        <h1 className="page-title">Register Now!...</h1>
                        <div className="register-content">
                            <RegisterForm/>
                            {/*<h1>RegisterForm</h1>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterView;