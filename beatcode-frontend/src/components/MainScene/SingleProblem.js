import React, {useEffect, useState} from 'react';
import MonacoEditor from 'react-monaco-editor';
import {Button, Col, Descriptions, Row, Select, Space, Tag} from 'antd';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


/*下面这些import用于支持语法高亮*/
import 'monaco-editor/esm/vs/basic-languages/python/python.contribution';
import 'monaco-editor/esm/vs/basic-languages/java/java.contribution';
import 'monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution';
import {useNavigate} from "react-router-dom";
import {submit} from "../../services/submissionService";
import {getProblemDetail} from "../../services/problemSetService";
import Loading from "../Loading";




/**
 * @Description: 单个题目的组件，包含题目描述、代码编辑器、提交按钮等
 * */
const CodeEditor = () => {
    const [language, setLanguage] = useState('C++');
    // 代码编辑器的内容
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(true);

    // 代码编辑器的主题（深色/浅色）
    const [theme, setTheme] = useState('vs-light');

    const navigate = useNavigate();


    const editorOptions = {
        // selectOnLineNumbers: true，意思是点击行号就可以选中一整行
        selectOnLineNumbers: true,
        // roundedSelection: false，意思是选中的时候是否为圆角
        roundedSelection: true,
    };

    /*
    * 以下是和题目相关的信息
    * */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [id, setId] = useState(1);
    const [title, setTitle] = useState('数字求和');
    // markdown格式的题目描述
    const [detail, setDetail] = useState("1");
    const [timeLimit, setTimeLimit] = useState(1000);
    const [memoryLimit, setMemoryLimit] = useState(128);
    const [difficulty, setDifficulty] = useState('easy');

    const [tags, setTags] = useState([
    ]);
    const [suggestions, setSuggestions] = useState([
    ]);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // 用钩子初始化获取题目信息
    useEffect(() => {

        const callback=(data)=>{
            console.log(data);

            setId(data.id);
            setTitle(data.title);
            setDetail(data.detail);
            setTimeLimit(data.time_limit);
            setMemoryLimit(data.memory_limit);
            setDifficulty(data.difficulty);
            // setTags(data.tags);
            // tag要一个一个读然后放进去
            let tempTags=[];
            for(let i=0;i<data.tags.length;i++){
                tempTags.push(data.tags[i]);
            }
            setTags(tempTags);

            setLoading(false);


        }

        // 需要发送的数据就是题号（只是数字，不是json），根据当前界面的url确定题号
        const id = window.location.pathname.split('/')[2];

        getProblemDetail(id,callback);
        // getSingleProblem(id,callback);


    }, []);




    const handleThemeChange = (event) => {
        // 处理主题选择变化的逻辑
        console.log(event);
        setTheme(event);
    }


    const handleEditorChange = (value, event) => {
        // 处理编辑器内容变化的逻辑
        setCode(value);


        // // 使用ajax请求
        // let opts = {
        //     method: "POST",
        //     body: JSON.stringify({
        //         prompt: value,
        //         max_tokens: 64,
        //     }),
        //
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer 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',
        //     }
        // };
        //
        // fetch('https://api.openai.com/v1/engines/davinci/completions',opts)
        //     .then((response) => {
        //         console.log(response);
        //         return response.json()
        //     }
        //     )
        //     .then((data) => {
        //         console.log(data);
        //         setSuggestions(data.choices);
        //     }
        //     )
        //     .catch((error) => {
        //         console.log(error);
        //     }
        //     );
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
        const callback=(res)=>{
            console.log(res);
        }
        submit({
            "language":language,
            "code":code,
            "problem_id":"1",
            "user_id":114,
            "user_name":514,
        },callback)
        setTimeout(() => {
            // TODO 2秒以内未能得到返回值并跳转，因此跳转回题目列表页面
           navigate(`/submissions`);

        }, 2000);
    }

    const labelStyle = {
        fontWeight: 'bold',
        // fontSize: '1.2rem',
        fontSize: '1.0rem',
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <h1
                style={{
                    textAlign: 'center',
                    marginTop: 10,
                    marginBottom: 30,
                    fontSize: 40,
                    }}
            >
                {id}. {title}
            </h1>
            {/*渲染tag，居中*/}
            <div
                style={{
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20,
                    marginTop: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {tags.map((tag, index) => (

                    <React.Fragment key={index}>
                        <Tag color={tag.color} style={{ fontSize: '16px', padding: '8px 12px' }}>{tag.tag}</Tag>
                        {index < tags.length - 1 && <span style={{ height:40, display: 'inline-block' }} />}
                    </React.Fragment>
                ))}
            </div>
            <div
                style={{
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20,
                    marginTop: 20,
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    }}
            >
                <Descriptions
                    // title="Responsive Descriptions"
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label={<span style={labelStyle}>难度</span>}>{difficulty}</Descriptions.Item>
                    <Descriptions.Item label={<span style={labelStyle}>时间限制</span>}>{timeLimit}ms</Descriptions.Item>
                    <Descriptions.Item label={<span style={labelStyle}>内存限制</span>}>{memoryLimit}MB</Descriptions.Item>
                </Descriptions>
            </div>
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
                        <ReactMarkdown
                            // children={markdownText}
                            children={detail}
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
                                defaultValue="vs-light"
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