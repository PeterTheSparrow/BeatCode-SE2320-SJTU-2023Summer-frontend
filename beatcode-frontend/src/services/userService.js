import {postRequest} from "../utils/ajax";
import {message} from "antd";
import {history} from "../utils/history";
import {apiUrl, apiUrlWindows} from "../utils/config-overrides";
import axios from "axios";

export const getUserInfo = (data, callback) => {
    const url = `${apiUrlWindows}/getUserInfo`;

    postRequest(url, data, callback);
}

/**
 * @Description: 用户注册
 * 用户注册完成后，默认为直接登录完成。跳转到用户主界面
 * */
export const RegisterService = (data) => {
    const url = `${apiUrlWindows}/Register`;

    // call-back function
    const callback = (data) => {
        if (data.status === 0) {
            message.success(data.msg);
            history.push('/');
            history.go();
        }
        else {
            message.error(data.msg);
        }
    }

    postRequest(url, data, callback);
}

export const sendCodeService = (data, callback) => {
    const url = `${apiUrlWindows}/createCode`;

    postRequest(url, data, callback);
}

export const logout = () => {
    const url = `${apiUrlWindows}/Logout`;

    // call-back function
    const callback = (data) => {
        if (data.status === 0) {
            message.success(data.msg);
            history.push('/login');
            history.go();
            // 清除token
            localStorage.removeItem('seDeToken');
        }
        else {
            message.error(data.msg);
        }
    };

    postRequest(url, {}, callback);
}

export const login = (data) => {
    const url = `${apiUrlWindows}/Login`;

    // call-back function
    const callback = (data) => {
        if (data.status === 0) {
            message.success(data.msg);
            /*
            * 新增内容：存储token
            * token的存储其实有很多选择
            * 1. cookie
            * 2. localStorage（就你了）
            * 3. sessionStorage
            * */
            const tokenKey = ['golden-class-token'];
            localStorage.setItem('seDeToken', data.data[tokenKey]);

            console.log("token!!!", localStorage.getItem('seDeToken'));

            // 延时1s跳转
            setTimeout(() => {
                // 普通用户 or 管理员
                if (data.data.is_admin === 0) {
                    history.push('/');
                    history.go();
                }
                else
                {
                    history.push('/admin');
                    history.go();
                }
            } , 1000);


        }
        else {
            message.error(data.msg);
        }
    };

    postRequest(url, data, callback);
}
export const getRanking=(data,callback)=>{
    let token= localStorage.getItem('seDeToken');
    if (token === null) {
        token = '';
    }
    axios.post(`${apiUrl}/getRanking`,data , {
        headers: {
            'Content-Type': 'application/json',
            'golden-class-token': token
        }})
        .then(res=>{
            console.log(data);
            callback(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
}

export const updateUsername = (data, callback) => {
    const url = `${apiUrlWindows}/updateUserName`;

    postRequest(url, data, callback);
}

export const updatePassword = (data, callback) => {
    const url = `${apiUrlWindows}/updatePassWord`;

    postRequest(url, data, callback);
}

export const updatePhoneNumber = (data, callback) => {
    const url = `${apiUrlWindows}/updatePhone`;

    postRequest(url, data, callback);
}

export const updateEmail = (data, callback) => {
    const url = `${apiUrlWindows}/updateEmail`;

    postRequest(url, data, callback);
}
export const getUserActivities=(data,callback)=>{
    let token= localStorage.getItem('seDeToken');
    if (token === null) {
        token = '';
    }
    axios.post(`${apiUrl}/getUserActivity`,data , {
        headers: {
            'Content-Type': 'application/json',
            'golden-class-token': token
        }})
        .then(res=>{
            callback(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
}