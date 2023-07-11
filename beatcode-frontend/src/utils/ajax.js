/**
 * @Description: 封装ajax请求
 * @param {url} 请求地址
 * @param {json} 请求参数
 * @param {callback} 回调函数
 * @return {*} 返回值
 *
 * 说明：
 * 本函数中，返回为string类型，不要解析为json
 * */
let postRequest_receive_string = (url, json, callback) => {
    // 从localStorage中获取token，添加到请求头，如果没有token，则设置为空
    let token = localStorage.getItem('seDeToken');
    if (token === null) {
        token = '';
    }

    let opts = {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json',
            'golden-class-token' : token
        },
        // credentials: "include"
    };

    // 返回值类型为string，不要解析为json
    fetch(url,opts)
        .then((response) => {
            return response
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

export default postRequest_receive_string;

/**
 * @Description: 封装ajax请求
 * @param {url} 请求地址
 * @param {json} 请求参数
 * @param {callback} 回调函数
 * @return {*} 返回值
 *
 * 说明：
 * 本函数中，将data封装为FormData类型
 * */
let postRequest_v2 = (url, data, callback) => {
    let formData = new FormData();

    for (let p in data){
        if(data.hasOwnProperty(p))
            formData.append(p, data[p]);
    }

    let opts = {
        method: "POST",
        body: formData,
        credentials: "include"
    };

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

/**
 * @Description: 封装ajax请求
 * @param {url} 请求地址
 * @param {json} 请求参数
 * @param {callback} 回调函数
 * @return {*} 返回值
 *
 * 说明：
 * 本函数中，将data封装为json类型
 * */
let postRequest = (url, json, callback) => {

    // 从localStorage中获取token，如果没有则设置为null
    let token = localStorage.getItem('seDeToken');
    if (token === null) {
        token = '';
    }

    let opts = {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json',
            'golden-class-token' : token
        },
        // credentials: "include"
    };

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

/*
*
* `credentials: "include"`是一个在发起网络请求时设置的参数，用于指定是否在请求中包含凭据（例如Cookie、HTTP身份验证等）。

当将`credentials`设置为"include"时，浏览器会自动将跨域请求的凭据（如Cookie）包含在请求中。这允许在跨域请求中进行身份验证和会话管理，以确保服务器可以识别并处理用户的身份。

通常，在跨域请求中，默认情况下不会发送凭据，因为浏览器默认遵循同源策略。但是，通过将`credentials`设置为"include"，可以覆盖这个行为，告诉浏览器包括凭据，并允许跨域请求携带这些凭据。

需要注意的是，使用`credentials: "include"`时，服务器端需要正确配置响应头来接受和处理发送的凭据。具体而言，服务器需要配置正确的CORS（跨源资源共享）头部信息，包括`Access-Control-Allow-Credentials: true`和`Access-Control-Allow-Origin`等。

总结起来，`credentials: "include"`的作用是在发起跨域请求时，告诉浏览器要包含凭据，以便进行身份验证和会话管理。
* */

export {postRequest,postRequest_v2};