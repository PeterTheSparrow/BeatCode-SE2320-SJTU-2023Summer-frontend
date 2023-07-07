import {apiUrl} from "../utils/config-overrides";
import axios from "axios";

export const submit=(data,callback)=>{
    axios.post(`${apiUrl}/Submit`,data)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
}