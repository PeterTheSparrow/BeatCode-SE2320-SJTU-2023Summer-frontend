import React, {useEffect,  useState} from 'react';
import MonacoEditor from 'react-monaco-editor';
import {Button, Col, Descriptions, Row, Select, Space, Tag} from 'antd';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you


/*下面这些import用于支持语法高亮*/
import 'monaco-editor/esm/vs/basic-languages/python/python.contribution';
import 'monaco-editor/esm/vs/basic-languages/java/java.contribution';
import 'monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution';

import {NavLink, useNavigate, useOutletContext} from "react-router-dom";
import {submit} from "../../services/submissionService";
import {getProblemDetail} from "../../services/problemSetService";
import Loading from "../Loading";



/**
 * @Description: 单个题目的组件，包含题目描述、代码编辑器、提交按钮等
 *
 * 关于题目信息展示ReactMarkdown不支持渲染数学公式的问题，解决方案：
 * https://blog.csdn.net/weixin_44589651/article/details/121044772?ydreferer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8%3D
 * */
//由于后端的语言名称和monaco-editor的语言名称不一致，因此需要一个映射
const defaultLanguage="C++20";
const CodeEditor = () => {
    /*
    * 需要通过钩子获取的信息：
    * 用户是否是管理员；这决定了跳转url的地址
    * */
    // const [isAdmin, setIsAdmin] = useState(false);
    const outletData = useOutletContext();
    const [jumpingUrl, setJumpingUrl] = useState('');

    const [submitUrl, setSubmitUrl] = useState('');

    const [language, setLanguage] = useState(defaultLanguage);
    const [languageForMonaco, setLanguageForMonaco] = useState('cpp');
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

            // 根据outletData判断是否是管理员，设置跳转url
            console.log("outletData.isAdmin: ",{outletData})
            let id1;
            if(window.location.pathname.split('/')[1]==='admin'){
                id1 = window.location.pathname.split('/')[3];
            }
            else{
                id1 = window.location.pathname.split('/')[2];
            }

            if (outletData.isAdmin){
                setJumpingUrl(`/admin/problem-info/${id1}`);
                setSubmitUrl(`/admin/problemSubmitView/${id1}`);
            }
            else{
                setJumpingUrl(`/problem-info/${id1}`);
                setSubmitUrl(`/problemSubmitView/${id1}`);
            }

            console.log("jumpingUrl: ",jumpingUrl)


        }

        // 由于管理员和普通用户的url不同，因此需要判断
        let id;
        if(window.location.pathname.split('/')[1]==='admin'){
            id = window.location.pathname.split('/')[3];
        }
        else{
            id = window.location.pathname.split('/')[2];
        }

        getProblemDetail(id,callback,navigate);

    }, []);




    const handleThemeChange = (event) => {
        // 处理主题选择变化的逻辑
        console.log(event);
        setTheme(event);
    }


    const handleEditorChange = (value, event) => {
        // 处理编辑器内容变化的逻辑
        setCode(value);
    };

    const handleLanguageChange = (event) => {
        // 处理语言选择变化的逻辑
        // setLanguage(event.target.value);
        console.log(event);
        setLanguage(event);

        // 由于后端的语言名称和monaco-editor的语言名称不一致，因此需要一个映射
        if (event === 'C++20') {
            setLanguageForMonaco('cpp');
        }
        else if (event === 'C') {
            setLanguageForMonaco('c');
        }
        else if (event === 'Java17') {
            setLanguageForMonaco('java');
        }
        else if (event === 'Python3') {
            setLanguageForMonaco('python');
        }
        else if (event === 'Pascal') {
            setLanguageForMonaco('pascal');
        }
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
            "problem_id":id,
        },callback)
        setTimeout(() => {
           navigate(`/submissions`);
        }, 500);
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
            {/* 居中展示切换到提交界面的按钮 */}
            <div
                style={{
                    // 居中
                    display: 'flex',
                    justifyContent: 'center',
                    }}
            >
                <Button
                    size="large"
                >
                    <NavLink to={submitUrl}>
                        提交界面
                    </NavLink>
                </Button>
            </div>
            <div
                style={{
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20,
                    marginTop: 20,
                    overflow: 'auto',
                }}
            >
                <ReactMarkdown
                    children={detail}
                    remarkPlugins={[remarkGfm]}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                />
            </div>

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
        </div>
    );
}

export default SingleProblem;