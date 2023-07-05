# BeatCode-frontend (React) 前端代码

## 目录

- [BeatCode-frontend (React) 前端代码](#beatcode-frontend-react-前端代码)
  - [目录](#目录)
  - [1. 文件结构](#1-文件结构)
  - [2. 代码规范](#2-代码规范)
  - [3. 具体内容介绍](#3-具体内容介绍)
    - [3.1 具体题目界面](#31-具体题目界面)
      - [3.1.1 markdown](#311-markdown)
      - [3.1.2 代码编辑框](#312-代码编辑框)
  - [4. url一览](#4-url一览)
  - [5. TODO-List](#5-todo-list)

## 1. 文件结构

- src
  - components 组件
    - AdminScene 管理员界面
    - MainScene 主界面
    - LoginAndRegister 登录注册界面
  - css 样式
  - img 图片
  - view 页面
    - LoginView 登录界面
    - RegisterView 注册界面
    - OJMainView 主界面（用户）
    - OJAdminView 主界面（管理员）
  - router 路由
  - service 服务
  - utils 工具
    - ajax 封装的ajax请求
    - history 封装的history

## 2. 代码规范

1. 全部使用函数式组件编写！严禁使用类组件！

## 3. 具体实现

这里主要记录采用的一些第三方库。

### 3.1 具体题目界面

#### 3.1.1 markdown渲染

参考文章：https://blog.csdn.net/weixin_44589651/article/details/121044772

使用的库：react-markdown。
使用的插件：remark-gfm，用于支持github的markdown语法。

#### 3.1.2 代码编辑框

使用monaco-editor库。
这个东西本质上就是网页版、残疾版的vscode。

关于语法高亮的实现：
https://blog.csdn.net/sd19871122/article/details/121204194

### 3.2 题目修改界面

TODO 
还需要找到一个比较合适的markdown编辑器，用于题目的信息修改；
富文本编辑器不适合，功能太多了。
如果找不到的话，就只能使用monaco-editor了。

## 4. url一览

以下是所有出现的url和对应的页面。

用户模式：

| url                 | 页面名称 |
|---------------------| -------- |
| /                   | 主界面   |
| /login              | 登录界面 |
| /register           | 注册界面 |
| /problem/:problemId | 题目界面 |
| /ranking-board      | 排行榜   |
| /my-submissions     | 我的提交 |
| /submission/:id     | 提交详情 |

管理员模式：基本就是用户模式前加了一个/admin

| url                       | 页面名称 |
|---------------------------| -------- |
| /admin                    | 主界面   |
| /admin/problem/:problemId | 题目界面 |
| /admin/ranking-board      | 排行榜   |
| /admin/my-submissions     | 我的提交 |
| /admin/submission/:id     | 提交详情 |
| /admin/edit-problem/:id   | 编辑题目 |

## 5. TODO-List

- 界面原型实现
  - ranking界面（用户+管理员）
  - edit-problem界面（管理员）
- 前后端通信（Service）
- 通过路由实现鉴权（参考陈昊鹏）