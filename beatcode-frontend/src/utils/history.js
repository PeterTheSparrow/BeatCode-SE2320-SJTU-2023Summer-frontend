import { createBrowserHistory } from 'history';

/**
 * @Description: history。使用createBrowserHistory创建history对象，然后在Router中引入
 * 创建一个与浏览器会话历史记录交互的history对象
 *
 * 使用history进行导航：
 * 1. history.push(path, [state])：将新的URL添加到历史记录堆栈
 * */
export const history = createBrowserHistory();