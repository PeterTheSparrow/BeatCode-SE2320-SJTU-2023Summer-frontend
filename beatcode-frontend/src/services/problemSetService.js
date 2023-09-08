import {apiUrl, apiUrlWindows} from "../utils/config-overrides";
import {postRequest} from "../utils/ajax";
import {postRequestWithNavigate} from "../utils/ajax";

/*
* 获得所有题目的列表
* */
export const getProblemSet = (data, callback) => {
    const url = `${apiUrlWindows}/GetProblemList`;

    postRequest(url, data, callback);
}

/*
* 获得一道题目的详细信息
* */
export const getProblemDetail = (data, callback, navigate) => {
    const url = `${apiUrlWindows}/GetProblemDetail`;

    console.log(url);

    postRequestWithNavigate(url, data, callback, navigate);
}

export const updateProblem = (data, callback) => {
    const url = `${apiUrlWindows}/UpdateProblem`;

    postRequest(url, data, callback);
}

export const updateTestCase = (data, callback) => {
    const url = `${apiUrlWindows}/UpdateTestcase`;

    postRequest(url, data, callback);
}

/*
* 获取某个用户通过的题目的列表
* */
export const getPassedProblemList = (data, callback) => {
const url = `${apiUrlWindows}/getProblemList`;

    postRequest(url, data, callback);
}