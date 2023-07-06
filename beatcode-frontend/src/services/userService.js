import {postRequest, postRequest_v2} from "../utils/ajax";
import {message} from "antd";
import {history} from "../utils/history";
import {apiUrl} from "../utils/config-overrides";

export const logout = () => {
    const url = `${apiUrl}/Logout`;

    // call-back function
    const callback = (data) => {
        if (data.status === 0) {
            message.success(data.msg);
            history.push('/login');
            history.go();
        }
        else {
            message.error(data.msg);
        }
    };

    postRequest(url, {}, callback);
}

export const login = (data) => {
    const url = `${apiUrl}/Login`;

    // call-back function
    const callback = (data) => {
        if (data.status === 0) {
            message.success(data.msg);
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
        }
        else {
            message.error(data.msg);
        }
    };

    postRequest(url, data, callback);
}