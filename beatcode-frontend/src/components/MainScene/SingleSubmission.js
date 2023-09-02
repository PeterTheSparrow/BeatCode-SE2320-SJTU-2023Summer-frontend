import React, {useEffect, useState} from "react";
import {Collapse, Popover, Spin, Table, Typography} from "antd";
import MonacoEditor from "react-monaco-editor";
import {NavLink, useParams} from "react-router-dom";
import {getFullSubmission} from "../../services/submissionService";


/**
 * @Description: 某一道题的一次提交结果
 *
 * 页面组成：
 * 1. 标题：评测详情：评测id
 * 2. 评测结果：整体评测结果的表格：题目id，提交时间，语言，测试点数目，通过的测试点数目，总运行时间，总运行内存
 * 3. 代码：代码展示框
 * 4. 评测详情：每一个测试点的情况的list列表
 *
 * TODO 其实这里最好展示一下题目的信息，否则不太人性化
 * TODO new 可以不显示题目信息，通过题号设置跳转即可
 * */
const { Title } = Typography;

function SingleSubmission() {

    const { id } = useParams();
    const [submission,setSubmission]=useState({});
    const [details,setDetails]=useState([]);
    const [monacoLanguage,setMonacoLanguage]=useState('') ;
    const [isLoading,setIsLoading]=useState(true);
    const getCallback=(data)=>{
        console.log(data);
        setSubmission({
            case_n:data.case_n,
            full_result:data.full_result,
            problemId:data.problemId,
            problemName:data.problemName,
            result_score:data.result_score,
            result_time:data.result_time,
            result_memory:data.result_memory,
            string_id:data.string_id,
            submission_code:data.submission_code,
            submission_language:data.submission_language,
            submission_time:data.submission_time,
            userId:data.userId,
            userName:data.userName,
            state:data.state,
            error:data.error,
        });
        setDetails(data.details);
        if(data.submission_language.toString()==="C++") {setMonacoLanguage("cpp");}
        if(data.submission_language.toString()==="Java") {setMonacoLanguage("java");}
    }
    useEffect(()=>{
        getFullSubmission({
            id:id,
        },getCallback)
    },[id]);
    useEffect(()=>{
        setIsLoading(false);
    },[submission]);

    if (isLoading) {
        return <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 20,
            }}
        >
            {/*spin居中*/}
            <Spin
                tip="Loading..."
                size={"large"}
                style={{
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                }}
            />
            <div>
                loading...
            </div>
            <div style={{height: 500,}}/>
        </div>;
    }

    return (
        // 组件长度固定，超过长度滚动
        <div>
            {/*占位符*/}
            <div style={{height: 10,}}/>

            <Title level={2} style={{textAlign: 'center',}}>
                评测时间{submission.submission_time}
            </Title>

            <Title level={3} style={{marginLeft: 20,}}>
                评测结果
            </Title>

            {/* 评测结果表格 */}
            {/*包含题号，题目名称*/}
            <Table dataSource={[submission]}
                     pagination={false}
                        style={{
                            marginLeft: 40,
                            marginRight: 40,
                        }}
                        columns={[
                            {
                                title: '题号',
                                dataIndex: 'problemId',
                                key: 'problemId',
                                render: (text, record) => (
                                    <NavLink to={`/problem/${record.problemId}`}>
                                        {text}
                                    </NavLink>)
                            },
                            {
                                title: '题目名称',
                                dataIndex: 'problemName',
                                key: 'problemName',
                                render: (text, record) => (
                                    <NavLink to={`/problem/${record.problemId}`}>
                                        {text}
                                    </NavLink>)
                            },
                            {
                                title: '提交者',
                                dataIndex: 'userName',
                                key: 'userName',
                            },
                            {
                                title: '评测结果',
                                dataIndex: 'state',
                                key: 'state',
                                render: (text, record) => (
                                    <span style={{
                                        color: text === "Accepted" ? "#2ecc71" :
                                            text === "Wrong Answer" ? "#c0392b" :
                                                text === "Time Limit Exceeded" ? "#f39c12" :
                                                    text === "Output Limit Exceeded" ? "#8e44ad" :
                                                        text === "Memory Limit Exceeded" ? "#16a085" :
                                                            text === "Judgement Failed" ? "#2c3e50" :
                                                                text === "Compile Error" ? "#d35400" :
                                                                    "#7f8c8d",
                                        fontWeight: "bold"
                                    }}>{text}</span>
                                )
                            },
                            {
                                title: '得分',
                                dataIndex: 'result_score',
                                key: 'result_score',
                                render: (text, record) => {
                                    return <span>{text?text:0}</span>
                                }
                            },
                            {
                                title: '运行时间',
                                dataIndex: 'result_time',
                                key: 'result_time',
                                render: (text, record) => {
                                    return <span>{text?text:0} ms</span>
                                }
                            },
                            {
                                title: '内存消耗',
                                dataIndex: 'result_memory',
                                key: 'result_memory',
                                render: (text, record) => {
                                    return <span>{text?text:0} KB</span>
                                }
                            },
                        ]}
            />

            <Title
                level={3}
                style={{
                    marginLeft: 20,
                }}
            >
                评测详情
            </Title>
            {(submission.state === "Judgement Failed" || submission.state === "Compile Error")?
                <div
                    style={{
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 20,
                    }}
                >

                    <Collapse
                        items={[{ key: '1', label: '单击查看关于本次评测的更多信息',
                            children: <p style={{ whiteSpace: 'pre-wrap' }}>
                                {submission.full_result+"\n错误信息：\n"+
                                    submission.error.toString()
                                        .replace(/&lt;/g, "<")
                                        .replace(/&gt;/g, ">")
                                        .replace(/&amp;/g, "&")
                                        .replace(/&quot;/g, "\"")
                                        .replace(/&#39;/g, "\'")
                                        .replace(/&apos;/g, "\'")
                                }
                        </p> }]}
                    />
                    {/*占位*/}
                    <div>
                        <div style={{height: 30,}}/>
                    </div>
                </div>
                :
                <Table dataSource={details}
                       style={{
                           marginLeft: 40,
                           marginRight: 40,
                       }}
                       columns={[
                           {title: '测试点', dataIndex: 'num', key: 'num',},
                           {title: '得分', dataIndex: 'score', key: 'score',},
                           {title: '状态', dataIndex: 'info', key: 'info',
                               // Accept绿色加粗，其他红色加粗
                               render: (text, record) => {
                                       return (
                                           <Popover placement="rightBottom"
                                                    content={record.res
                                                        .replace(/&lt;/g, "<")
                                                        .replace(/&gt;/g, ">")
                                                        .replace(/&amp;/g, "&")
                                                        .replace(/&quot;/g, "\"")
                                                        .replace(/&#39;/g, "\'")
                                                        .replace(/&apos;/g, "\'")}
                                                    title="测试点详细信息">
                                               <a style={{
                                                   color: text === "Accepted" ? "#2ecc71" :
                                                       text === "Extra Test Passed" ? "#63ffa4" :
                                                       text === "Wrong Answer" ? "#c0392b" :
                                                       text === "Time Limit Exceeded" ? "#f39c12" :
                                                       text === "Output Limit Exceeded" ? "#8e44ad" :
                                                       text === "Memory Limit Exceeded" ? "#16a085" :
                                                       text === "Judgement Failed" ? "#2c3e50" :
                                                       text === "Compile Error" ? "#d35400" :
                                                           text === "Runtime Error" ? "#0b0286" :
                                                       "#7f8c8d",
                                                   fontWeight: 'bold'
                                               }}>{text}</a>
                                            </Popover>
                                       );

                               }
                           },
                           {title: '运行时间', dataIndex: 'time', key: 'time',
                               render: (text, record) => {
                                   return <span>{text}ms</span>
                               },
                           },
                           {title: '运行内存', dataIndex: 'memory', key: 'memory',
                               render: (text, record) => {
                                   return <span>{text}MB</span>
                               },
                           },
                       ]}
                />
            }

            <Title level={3} style={{marginLeft: 20,}}>
                代码
            </Title>

            {/* 代码展示框 */}
            <div style={{
                marginLeft: 30,
                marginRight: 30,
            }}>
                <MonacoEditor
                    height={500}
                    language={monacoLanguage}
                    theme="vs-light"
                    value={submission.submission_code}
                    options={{
                        readOnly: true,
                        wordWrap: 'on', // 自动换行
                        minimap: { enabled: false }, // 不显示代码缩略图
                    }}
                />
            </div>
        </div>
    );
}

export default SingleSubmission;
// function SingleSubmission() {
//     // 存储的信息：submissionId
//     const [submissionId, setSubmissionId] = React.useState(0);
//
//     return <div>SingleSubmission</div>;
// }
//
// export default SingleSubmission;