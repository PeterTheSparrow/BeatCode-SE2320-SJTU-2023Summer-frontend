import React, {useState} from 'react';
import MonacoEditor from 'react-monaco-editor';
import {Button, Col, Row, Select, Space} from 'antd';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


/*下面这些import用于支持语法高亮*/
import 'monaco-editor/esm/vs/basic-languages/python/python.contribution';
import 'monaco-editor/esm/vs/basic-languages/java/java.contribution';
import 'monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {submit} from "../../services/submissionService";


/**
 * @Description: 前端硬编码的题目，格式为markdown
 * */
const markdownText = ` # 数字求和！

## 题目描述

请编写一个函数 \`sumDigits\`，计算给定整数中所有数字的总和。

## 函数签名

\`\`\`python
def sumDigits(n: int) -> int:
    pass
\`\`\`

### 输入

- 整数 \`n\`，满足 1 ≤ n ≤ 10^9。

### 输出

- 返回整数 \`n\` 中所有数字的总和。

## 示例

#### 示例 1

输入：

\`\`\`plaintext
12345
\`\`\`

输出：

\`\`\`plaintext
15
\`\`\`

解释：\`1 + 2 + 3 + 4 + 5 = 15\`。

#### 示例 2

输入：

\`\`\`plaintext
987654321
\`\`\`

输出：

\`\`\`plaintext
45
\`\`\`

解释：\`9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 = 45\`。

## 时间要求

你需要确保你的实现在所有测试用例下都能高效地运行。预期的时间复杂度应为 O(log n)，其中 n 是输入整数的位数。`;

/**
 * @Description: 单个题目的组件，包含题目描述、代码编辑器、提交按钮等
 * */
const CodeEditor = () => {
    const [language, setLanguage] = useState('C++');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();



    /**
    * 用户选择深色主题或浅色主题
    * */
    const [theme, setTheme] = useState('vs-dark');

    const handleThemeChange = (event) => {
        // 处理主题选择变化的逻辑
        console.log(event);
        setTheme(event);
    }

    const editorOptions = {
        // selectOnLineNumbers: true，意思是点击行号就可以选中一整行
        selectOnLineNumbers: true,
        // roundedSelection: false，意思是选中的时候是否为圆角
        roundedSelection: true,
    };

    const handleEditorChange = (value, event) => {
        // 处理编辑器内容变化的逻辑
        setCode(value);
    };

    const handleLanguageChange = (event) => {
        // 处理语言选择变化的逻辑
        // setLanguage(event.target.value);
        console.log(event);
        setLanguage(event);
    };

    const handleSubmit = () => {
        // 设置按钮处于加载状态
        setLoading(true);

        // TODO 提交代码
        const callback=()=>{
            navigate(`/submissions`);
        }
        submit({
            "language":language,
            "code":code,
        },callback)
        setTimeout(() => {
            // TODO 2秒以内未能得到返回值并跳转，因此跳转回题目列表页面
           navigate(`/submissions`);

        }, 2000);
    }

    return (
        <div>
            <Row>
                <Col span={12}>
                    <div
                        style={{
                            marginLeft: 20,
                            marginRight: 20,
                            marginBottom: 20,
                            marginTop: 20,
                            maxHeight: '600px',
                            overflow: 'auto',
                        }}
                    >
                        <h1>ProblemDescription</h1>
                        <ReactMarkdown
                            children={markdownText}
                            remarkPlugins={[remarkGfm]}
                        />,
                    </div>
                </Col>
                <Col span={12}>
                    <div>
                        <Space wrap>
                            <Select
                                defaultValue="C++"
                                style={{
                                    width: 120,
                                    marginBottom: 20,
                                    marginLeft: 20,
                            }}
                                onChange={handleLanguageChange}
                                options={[
                                    { value: 'C++', label: 'C++' },
                                    { value: 'C', label: 'C' },
                                    { value: 'java', label: 'Java' },
                                    { value: 'python', label: 'Python' },
                                ]}
                            />
                            <Select
                                defaultValue="vs-dark"
                                style={{
                                    width: 120,
                                    marginBottom: 20,
                                    marginLeft: 20,
                                }}
                                onChange={handleThemeChange}
                                options={[
                                    { value: 'vs-dark', label: 'Dark' },
                                    { value: 'vs-light', label: 'Light' },
                                ]}
                            />
                        </Space>
                        <Button
                            value="large"
                            style={{
                                marginLeft: 20,
                            }}
                            onClick={handleSubmit}
                            loading={loading}
                        >
                            提交评测
                        </Button>
                    </div>
                    <div

                    >

                    </div>
                    {/*TODO 需要实现语法高亮*/}
                    <MonacoEditor
                        height="600"
                        language={language}
                        // theme="vs-dark"
                        // theme={'vs-light'}
                        theme={theme}
                        value={code}
                        options={editorOptions}
                        onChange={handleEditorChange}
                    />
                </Col>
            </Row>
        </div>
    );
};


/**
 * @Description: 单个题目的界面
 * 界面组成：
 * 1. 题目描述：包括题面、样例输入输出
 * 2. 提交区域：包括代码编辑器、提交按钮、语言选择
 * */
function SingleProblem() {
    return (
        <div>
            {/*空的标签，纯粹占位为了好看*/}
            <div style={{height: 20}}/>
            <div
                style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '16px' }}
            >
                <CodeEditor />
            </div>
            {/*<CodeEditor />*/}
        </div>
    );
}

export default SingleProblem;