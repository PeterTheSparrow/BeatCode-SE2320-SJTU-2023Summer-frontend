import React, {useEffect, useState} from "react";
import {Button, Cascader,Spin, Table} from "antd";
import {NavLink, useNavigate, useOutletContext} from "react-router-dom";
import {getSubmissions} from "../../services/submissionService";

import {Input,  Space} from 'antd';

/**
 * @Description: 可以看到所有用户的所有提交
 *
 * 1. 搜索栏：可以根据题目id、题目名称、用户名进行搜索；可以根据提交时间、题目id、题目名称进行排序
 * 2. 提交列表：每一次提交：题目id	题目名称	用户名	通过状态	得分	运行时间	运行内存	提交时间
 * */
function AllSubmissions() {
    const outletData = useOutletContext();

    const [urlParam0, setUrlParam0] = useState('');

    const query = new URLSearchParams(window.location.search);
    const urlParamProblemId=query.get('id');
    const urlParamProblemName=query.get('title');
    const urlParamUserName=query.get('user');
    const [searchTextProblemId, setSearchTextProblemId] = useState(urlParamProblemId===null?'':urlParamProblemId);
    const [searchTextProblemName, setSearchTextProblemName] = useState(urlParamProblemName===null?'':urlParamProblemName);
    const [searchTextUserName, setSearchTextUserName] = useState(urlParamUserName===null?'':urlParamUserName);
    // for (let param of query) {
    //     if(param[0]==="id")setSearchTextProblemId(param[1]);
    //     else if(param[0]==="title")setSearchTextProblemId(param[1]);
    //     else if(param[0]==="user")setSearchTextProblemId(param[1]);
    // }
    const [isLoading, setIsLoading] = useState(true);

    // sorting的列名，sorting的方式
    const [sortingColumn, setSortingColumn] = useState('submission_time');
    const [sortingOrder, setSortingOrder] = useState('desc');

    const [submissions, setSubmissions] = useState([]);
    const [pageNum,setPageNum]=useState("1");
    const [pageSize,setPageSize]=useState("15");
    const [totalPage,setTotalPage]=useState(0);
    const [totalElements,setTotalElements]=useState(0);

    const navigate=useNavigate();

    const getCallback = (data) => {
        console.log("received data for getSubmissions: ");
        console.log(data);

        setTotalElements(data.totalElements);
        setTotalPage(data.totalPages);
        setPageNum(data.number+1);
        setPageSize(data.size);
        const extractedSubmissions = data.content.map((item) => ({
            _id: item.string_id,
            key: item.string_id,
            problem_id: item.problemId,
            problem_name: item.problemName,
            user_name: item.userName,
            result_score: item.result_score,
            result_time: item.result_time,
            result_memory: item.result_memory,
            submission_time: item.submission_time,
            state:item.state,
        }));
        setSubmissions(extractedSubmissions);
    }
    useEffect(() => {
        setIsLoading(true);
        setSearchTextProblemId(urlParamProblemId===null?'':urlParamProblemId);
        setSearchTextProblemName(urlParamProblemName===null?'':urlParamProblemName);
        setSearchTextUserName(urlParamUserName===null?'':urlParamUserName);
        getSubmissions({
            // 新搜索的话，页数一定是1
            page: pageNum,
            pageSize: pageSize,

            // 这三个都是搜索框里的东西
            user_name: urlParamUserName,
            problem_name: urlParamProblemName,
            problem_id: urlParamProblemId,

            // 这两个是排序的东西
            sortBy: sortingColumn,
            sortDirection: sortingOrder,

        }, getCallback);
    }, [pageNum,pageSize,urlParamProblemId,urlParamProblemName,urlParamUserName]);
    useEffect(() => {
        // submissions 更新时，将 isLoading 设置为 false
        if(totalElements>0||urlParamUserName!==null||urlParamProblemName!==null||urlParamProblemId!==null)setIsLoading(false);
    }, [submissions])

    useEffect(() => {
        // set urlParam
        if (outletData.isAdmin){
            setUrlParam0(`/admin`);
        }
        else{
            setUrlParam0(``);
        }
    } , [] )

    const options = [
        {
            value: 'submission_time',
            label: '提交时间',
            children: [
                {
                    value: 'asc',
                    label: '升序',
                },
                {
                    value: 'desc',
                    label: '降序',
                }
            ],
        },
        {
            value: 'problem_id',
            label: '题目id',
            children: [
                {
                    value: 'asc',
                    label: '升序',
                },
                {
                    value: 'desc',
                    label: '降序',
                }
            ],
        },
        {
            value: 'problem_name',
            label: '题目名称',
            children: [
                {
                    value: 'asc',
                    label: '升序',
                },
                {
                    value: 'desc',
                    label: '降序',
                }
            ],
        }
    ];

    const onSearch = value => {
        if(searchTextProblemId!==''&&searchTextProblemName!==''&&searchTextUserName!=='')
            // navigate(`/submissions?id=${searchTextProblemId}&&title=${searchTextProblemName}&&user=${searchTextUserName}`);
            navigate(urlParam0+`/submissions?id=${searchTextProblemId}&&title=${searchTextProblemName}&&user=${searchTextUserName}`);
        else if(searchTextProblemId!==''&&searchTextProblemName!=='')
            // navigate(`/submissions?id=${searchTextProblemId}&&title=${searchTextProblemName}`);
            navigate(urlParam0+`/submissions?id=${searchTextProblemId}&&title=${searchTextProblemName}`);
        else if(searchTextProblemId!==''&&searchTextUserName!=='')
            // navigate(`/submissions?id=${searchTextProblemId}&&user=${searchTextUserName}`);
            navigate(urlParam0+`/submissions?id=${searchTextProblemId}&&user=${searchTextUserName}`);
        else if(searchTextProblemName!==''&&searchTextUserName!=='')
            // navigate(`/submissions?title=${searchTextProblemName}&&user=${searchTextUserName}`);
            navigate(urlParam0+`/submissions?title=${searchTextProblemName}&&user=${searchTextUserName}`);
        else if(searchTextProblemId!=='')
            // navigate(`/submissions?id=${searchTextProblemId}`);
            navigate(urlParam0+`/submissions?id=${searchTextProblemId}`);
        else if(searchTextProblemName!=='')
            // navigate(`/submissions?title=${searchTextProblemName}`);
            navigate(urlParam0+`/submissions?title=${searchTextProblemName}`);
        else if(searchTextUserName!=='')
            // navigate(`/submissions?user=${searchTextUserName}`);
            navigate(urlParam0+`/submissions?user=${searchTextUserName}`);
        else
            // navigate(`/submissions`);
            navigate(urlParam0+`/submissions`);

    };

    // TODO: const handlePageChange

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
        <div>
            <div
                style={{
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                }}
            >
                <div style={{height: 20,}}/>
                {/*占位*/}
                <div style={{height: 20,}}/>
                {/*搜索框居中*/}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 30,
                    }}
                >
                    <Space.Compact size="large">
                        <Input
                            placeholder="输入题目id"
                            value={searchTextProblemId}
                            onChange={(e) => setSearchTextProblemId(e.target.value)}
                        />
                        <Input
                            placeholder="输入题目名称"
                            value={searchTextProblemName}
                            onChange={(e) => setSearchTextProblemName(e.target.value)}
                        />
                        <Input
                            placeholder="输入用户名"
                            value={searchTextUserName}
                            onChange={(e) => setSearchTextUserName(e.target.value)}
                        />
                        <Button
                            onClick={onSearch}
                        >
                            搜索
                        </Button>
                    </Space.Compact>
                    <div style={{
                        width: 20,
                    }}></div>
                </div>
                {/*pageSize是50*/}
                <Table dataSource={submissions}
                       pagination={{
                           pageSize: parseInt(pageSize),
                           current: parseInt(pageNum),
                           showQuickJumper: true,
                           total: totalElements,
                           defaultCurrent: 1,
                           showTotal: ()=>`共有${totalElements}条记录`,
                           onChange: (page,pageSize)=>{
                               setPageNum(page.toString());
                               setPageSize(pageSize.toString());
                           },
                       }}

                       style={{
                           marginLeft: 40,
                           marginRight: 40,
                       }}

                       columns={[
                           // 单击提交id，可以跳转到提交详情界面
                           {
                               title: '题目id',
                               dataIndex: 'problem_id',
                               // 渲染一个链接，单击后跳到题目详情
                               render: (text, record) => (
                                   // <NavLink to={`/problem/${record.problem_id}`}>
                                   <NavLink to={urlParam0 + `/problem/${record.problem_id}`}>
                                       {text}
                                   </NavLink>)
                           },
                           {
                               title: '题目名称',
                               dataIndex: 'problem_name',
                               // 渲染一个链接，单击后根据题号跳到题目详情
                               render: (text, record) => (
                                   // <NavLink to={`/problem/${record.problem_id}`}>
                                   <NavLink to={urlParam0 + `/problem/${record.problem_id}`}>
                                       {text}
                                   </NavLink>)
                           },
                           {title: '用户名', dataIndex: 'user_name'},
                           // 除了Accepted，其他的都是红色，加粗；Accepted是绿色，加粗
                           {
                               title: '通过状态',
                               dataIndex: 'state',
                               render: (text, record) => (
                                   <NavLink to={urlParam0 + `/submission/${record._id}`}>
                                       <span style={{
                                           color: text === "Accepted" ? "#2ecc71" :
                                               text === "Wrong Answer" ? "#c0392b" :
                                               text === "Time Limit Exceeded" ? "#f39c12" :
                                               text === "Output Limit Exceeded" ? "#8e44ad" :
                                               text === "Memory Limit Exceeded" ? "#16a085" :
                                               text === "Judgement Failed" ? "#2c3e50" :
                                               text === "Compile Error" ? "#d35400" :
                                                   text === "Runtime Error" ? "#0b0286" :
                                               "#7f8c8d",
                                           fontWeight: "bold"
                                       }}>{text}</span>
                                   </NavLink>
                               )
                           },
                           {title: '得分', dataIndex: 'result_score',
                               render: (text, record) => (
                                   <span>{text?text:"0"}</span>
                               )},
                           {
                               title: '运行时间', dataIndex: 'result_time',
                               render: (text, record) => (
                                   <span>{text?text:"0"} ms</span>
                               )
                           },
                           {
                               title: '运行内存', dataIndex: 'result_memory',
                               render: (text, record) => (
                                   <span>{text?text:"0"} KB</span>
                               )
                           },
                           {
                               title: '提交时间', dataIndex: 'submission_time',
                               render: (text,record) => (
                                   <NavLink to={urlParam0 + `/submission/${record._id}`}>
                                       {text}
                                   </NavLink>
                               )
                           },
                       ]}

                />
                {/*占位*/}
                <div style={{height: 50,}}/>
            </div>
        </div>
    );
}

export default AllSubmissions;
