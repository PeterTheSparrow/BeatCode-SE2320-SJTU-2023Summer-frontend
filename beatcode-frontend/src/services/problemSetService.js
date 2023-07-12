import {apiUrl, apiUrlWindows} from "../utils/config-overrides";
import {postRequest} from "../utils/ajax";
import axios from "axios";

/*
* 获得所有题目的列表
* */
export const getProblemSet = (data, callback) => {
    // TODO
}

/*
* 获得一道题目的详细信息
* */
export const getProblemDetail = (data, callback) => {
    const url = `${apiUrlWindows}/GetProblemDetail`;

    postRequest(url, data, callback);
}