import {apiUrl} from "../utils/config-overrides";
import axios from "axios";
import {theme} from "antd";

export const submit=(data,callback)=>{
    let token= localStorage.getItem('seDeToken');
    if (token === null) {
        token = '';
    }
    axios.post(`${apiUrl}/Submit`,data , {
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
export const getSubmissions=(data,callback)=>{
    let token= localStorage.getItem('seDeToken');
    if (token === null) {
        token = '';
    }
    axios.post(`${apiUrl}/GetSubmissions`,data , {
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
export const getProblemSubmissions=(data,callback,navigate)=>{
    let token= localStorage.getItem('seDeToken');
    if (token === null) {
        token = '';
    }
    axios.post(`${apiUrl}/GetProblemSubmissions`,data , {
        headers: {
            'Content-Type': 'application/json',
            'golden-class-token': token
        }})
        .then(res=>{
            callback(res.data);
        })
        .catch(err=>{
            navigate("/error");
            console.log(err);
        })
}
export const getFullSubmission=(data,callback,navigate)=>{
    let token= localStorage.getItem('seDeToken');
    if (token === null) {
        token = '';
    }
    axios.post(`${apiUrl}/GetFullSubmission`,data , {
        headers: {
            'Content-Type': 'application/json',
            'golden-class-token': token
        }})
        .then(res=>{
            callback(res.data);
        })
        .catch(err=>{
            navigate("/error");
            console.log(err);
        })
}