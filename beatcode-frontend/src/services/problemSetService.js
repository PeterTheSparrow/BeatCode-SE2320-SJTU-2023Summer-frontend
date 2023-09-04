import {apiUrl, apiUrlWindows} from "../utils/config-overrides";
import {postRequest} from "../utils/ajax";
import axios from "axios";

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
export const getProblemDetail = (data, callback) => {
    const url = `${apiUrlWindows}/GetProblemDetail`;

    console.log(url);

    postRequest(url, data, callback);
}

export const updateProblem = (data, callback) => {
    const url = `${apiUrlWindows}/UpdateProblem`;

    postRequest(url, data, callback);
}

export const updateTestCase = (data, callback) => {
    const url = `${apiUrlWindows}/UpdateTestcase`;

    postRequest(url, data, callback);
}