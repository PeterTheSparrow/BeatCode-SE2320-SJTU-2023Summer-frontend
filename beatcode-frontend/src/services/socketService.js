const socketAddr = 'ws://localhost:8763/info';
let socket;
// 就用token标识吧
let socketUser;

const createSocket = () => {
    const token = localStorage.getItem('seDeToken');
    if (token === null) {
        console.log("no token! please login");
        return false;
    }
    socket = new WebSocket(`${socketAddr}?Token=${
        token
            .replace('+', '-')
            .replace('/', '_')}`);
    console.log(socket);
    socket.onopen = () => {
        console.log("socket opened");
    };
    socket.onmessage = (event) => {
        const got = event.data;
        console.log('got socket: ', got);
        // 处于所有提交页面且收到指定信息则刷新
        // todo 判断指定信息稍显暴力且weak
        if (window.location.pathname.includes('submissions') && got.includes('submission')) {
            window.location.reload();
        }
    };
    socket.onclose = () => {
        console.log('socket closed');
    };
    return true;
}

/**
 * @param user 确保：socket为开启状态，并且指定用户是user。传入null则确保socket是关闭的。
 */
export const setupSocket = (user) => {
    if (user == null) {
        // 关闭socket
        if (socket != null && socket instanceof WebSocket && socket) {
            socket.close();
        }
    }
    else {
        // socket不存在或未开启时开启socket
        if (socket == null || (!socket instanceof WebSocket) || !socket) {
            if (!createSocket()) return;
        }
        // 不是指定用户
        else if (socketUser !== user) {
            socket.close();
            createSocket();
        }
    }
    // 指定当前用户
    socketUser = user;
};
