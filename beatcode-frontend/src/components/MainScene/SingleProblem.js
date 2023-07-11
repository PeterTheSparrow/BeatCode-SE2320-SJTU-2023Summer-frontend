import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { Button, Col, Row, Select, Space } from 'antd';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useHistory } from "react-router-dom";
import { submit } from "../../services/submissionService";

/*下面这些import用于支持语法高亮*/
import 'monaco-editor/esm/vs/basic-languages/python/python.contribution';
import 'monaco-editor/esm/vs/basic-languages/java/java.contribution';
import 'monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution';

const markdownText = ` # 数字求和！
...
`;

const CodeEditor = () => {
    const [language, setLanguage] = useState('C++');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const [theme, setTheme] = useState('vs-dark');

    const handleThemeChange = (event) => {
        console.log(event);
        setTheme(event);
    }

    const editorOptions = {
        selectOnLineNumbers: true,
        roundedSelection: true,
    };

    const handleEditorChange = (value, event) => {
        setCode(value);
    };

    const handleLanguageChange = (event) => {
        console.log(event);
        setLanguage(event);
    };

    const handleSubmit = () => {
        setLoading(true);

        const callback = (res) => {
            history.push(`/submission/${res}`);
        }

        submit({
            "language": language,
            "code": code,
        }, callback);

        setTimeout(() => {
            // navigate(`/submissions`);
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
                        />
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
                    <div>
                    </div>
                    <MonacoEditor
                        height="600"
                        language={language}
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

function SingleProblem() {
    return (
        <div>
            <div style={{ height: 20 }} />
            <div
                style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '16px' }}
            >
                <CodeEditor />
            </div>
        </div>
    );
}

export default SingleProblem;
