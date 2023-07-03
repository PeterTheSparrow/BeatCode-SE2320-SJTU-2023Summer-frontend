import React, {useState} from 'react';
import MonacoEditor from 'react-monaco-editor';
import {Button, Col, Row, Select, Space} from 'antd';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

const CodeEditor = () => {
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('');

    const editorOptions = {
        selectOnLineNumbers: true,
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
        // 提交代码的逻辑
        console.log('提交代码');
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
                                defaultValue="c"
                                style={{
                                    width: 120,
                                    marginBottom: 20,
                                    marginLeft: 20,
                            }}
                                onChange={handleLanguageChange}
                                options={[
                                    { value: 'c', label: 'C' },
                                    { value: 'cpp', label: 'C++' },
                                    { value: 'java', label: 'Java' },
                                    { value: 'python', label: 'Python' },
                                ]}
                            />
                        </Space>
                        <Button
                            value="large"
                            style={{
                                marginLeft: 20,
                            }}
                            onClick={handleSubmit}
                        >
                            提交评测
                        </Button>
                    </div>

                    {/*需要实现语法高亮*/}
                    <MonacoEditor
                        // height="500"
                        language={language}
                        theme="vs-dark"
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
            <CodeEditor />
        </div>
    );
}

export default SingleProblem;