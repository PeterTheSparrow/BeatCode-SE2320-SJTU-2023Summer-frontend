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

选择React SimpleMDE Editor作为题目信息修改的markdown编辑器。

安装：
```bash
npm install react-simplemde-editor
```

模块引入：
```javascript
import React from 'react';
import SimpleMDEEditor from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

function YourComponent() {
  // 在这里使用React SimpleMDE Editor组件
  return (
    <SimpleMDEEditor
      // 设置props
    />
  );
}

export default YourComponent;
```

React SimpleMDE Editor组件提供了一些可用的props，用于设置编辑器的行为和样式。以下是一些常用的props：

- `value`: 设置编辑器的初始值，可以是Markdown格式的字符串。
- `onChange`: 监听编辑器内容变化的回调函数，接收一个参数表示当前编辑器的内容。
- `options`: 用于配置SimpleMDE编辑器的选项，可以参考SimpleMDE的文档来设置各种选项。
- `uploadImage`: 设置一个函数来处理图片上传，可以自定义实现图片上传的逻辑。
- `extraKeys`: 设置额外的按键快捷键。
- `events`: 设置事件监听器，可以监听编辑器的各种事件，如`toggleFullScreen`、`previewRendered`等。

除了以上列出的常用props外，还有其他一些props可供设置，例如`autofocus`、`placeholder`、`minHeight`、`status`等，具体的可用props和它们的用法可以参考React SimpleMDE Editor的文档。

如果你想禁用React SimpleMDE Editor中的某些按钮并让它们不显示，你可以通过设置`options` prop来实现。在`options`对象中，你可以使用SimpleMDE的选项来配置编辑器的行为和样式。

要禁用特定按钮，你可以使用以下选项：

1. `toolbar`
   通过设置`toolbar`选项来定义自定义工具栏，只包含你需要显示的按钮，并且不包含你想要禁用的按钮。例如，如果你只想显示粗体、斜体和链接按钮，可以将`toolbar`选项设置为`["bold", "italic", "|", "link"]`。

2. `hideIcons`
   可以使用`hideIcons`选项来隐藏特定按钮的图标。将要隐藏的按钮的名称添加到`hideIcons`数组中，例如：`["guide", "side-by-side"]`将隐藏指南和并列查看按钮的图标。

3. `showIcons`
   如果你只想显示特定按钮的图标，可以使用`showIcons`选项来指定要显示的按钮。将要显示的按钮的名称添加到`showIcons`数组中，其他按钮将被隐藏。

下面是一个示例，展示如何使用`options` prop禁用和隐藏编辑器中的按钮：

```jsx
import React from 'react';
import SimpleMDEEditor from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

function YourComponent() {
  const options = {
    toolbar: ["bold", "italic", "|", "link"], // 只显示粗体、斜体和链接按钮
    hideIcons: ["guide", "side-by-side"], // 隐藏指南和并列查看按钮的图标
  };

  return (
    <SimpleMDEEditor
      options={options}
    />
  );
}

export default YourComponent;
```

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