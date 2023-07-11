import {apiUrl} from "../utils/config-overrides";
import axios from "axios";
import {theme} from "antd";

export const submit=(data,callback)=>{
    axios.post(`${apiUrl}/Submit`,data )
        .then(res=>{
            callback(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
}
export const getSubmissions=(data,callback)=>{
    axios.post(`${apiUrl}/GetSubmissions`,data)
        .then(res=>{
            callback(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
}
export const getFullSubmission=(data,callback)=>{
    axios.post(`${apiUrl}/GetFullSubmission`,data)
        .then(res=>{
            callback(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
}