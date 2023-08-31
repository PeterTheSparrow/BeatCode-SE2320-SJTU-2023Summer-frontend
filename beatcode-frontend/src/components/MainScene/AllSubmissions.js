import React, {useEffect, useState} from "react";
import {Button, Cascader, Col, Row, Spin, Table} from "antd";
import {NavLink} from "react-router-dom";
import {PieChart, Pie, Cell, Legend} from "recharts";
import {getSubmissions} from "../../services/submissionService";
import Search from "antd/es/input/Search";
import { Radio } from 'antd';

import {Input,  Space} from 'antd';
import Loading from "../Loading";

/**
 * @Description: 某个用户所有的提交
 *
 * 1. 统计信息：提交数目、通过数目、通过率（列表+统计图）
 * 2. 提交列表：每一次提交，包含提交id、题目id、题目名称、提交时间戳、语言、结果
 *
 * TODO 点击提交id，可以跳转到提交详情界面
 * */
function AllSubmissions() {

    const [searchText1, setSearchText1] = useState('');
    const [searchText2, setSearchText2] = useState('');
    const [searchText3, setSearchText3] = useState('');
    // 在没加载完数据之前，不显示表格
    const [isLoading, setIsLoading] = useState(true);

    // sorting的列名，sorting的方式
    const [sortingColumn, setSortingColumn] = useState('submission_time');
    const [sortingOrder, setSortingOrder] = useState('desc');

    const [submissions, setSubmissions] = useState([]);
    const [pageNum,setPageNum]=useState("1");
    const [pageSize,setPageSize]=useState("20");
    const [totalPage,setTotalPage]=useState(0);
    const [totalElements,setTotalElements]=useState(0);
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
        getSubmissions({
            // 新搜索的话，页数一定是1
            page: pageNum,
            pageSize: pageSize,

            // 这三个都是搜索框里的东西
            user_name: searchText3,
            problem_name: searchText2,
            problem_id: searchText1,

            // 这两个是排序的东西
            sortBy: sortingColumn,
            sortDirection: sortingOrder,

        }, getCallback);
    }, [pageNum,pageSize])
    useEffect(() => {
        // submissions 更新时，将 isLoading 设置为 false
        if(totalElements>0) setIsLoading(false);
    }, [submissions])

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
    const onChange = (value) => {
        console.log(value);
        if(!value)return;
        setSortingColumn(value[0]);
        setSortingOrder(value[1]);
    };

    const onSearch = value => {
        setIsLoading(true);
        getSubmissions({
            // 新搜索的话，页数一定是1
            page: pageNum,
            pageSize: pageSize,

            // 这三个都是搜索框里的东西
            user_name: searchText3,
            problem_name: searchText2,
            problem_id: searchText1,

            // 这两个是排序的东西
            sortBy: sortingColumn,
            sortDirection: sortingOrder,


        }, getCallback);
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
                            value={searchText1}
                            onChange={(e) => setSearchText1(e.target.value)}
                        />
                        <Input
                            placeholder="输入题目名称"
                            value={searchText2}
                            onChange={(e) => setSearchText2(e.target.value)}
                        />
                        <Input
                            placeholder="输入用户名"
                            value={searchText3}
                            onChange={(e) => setSearchText3(e.target.value)}
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
                    <Cascader options={options} onChange={onChange} placeholder="排序" />
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
                                   <NavLink to={`/problem/${record.problem_id}`}>
                                       {text}
                                   </NavLink>)
                           },
                           {
                               title: '题目名称',
                               dataIndex: 'problem_name',
                               // 渲染一个链接，单击后根据题号跳到题目详情
                               render: (text, record) => (
                                   <NavLink to={`/problem/${record.problem_id}`}>
                                       {text}
                                   </NavLink>)
                           },
                           {title: '用户名', dataIndex: 'user_name'},
                           // 除了Accepted，其他的都是红色，加粗；Accepted是绿色，加粗
                           {
                               title: '通过状态',
                               dataIndex: 'state',
                               render: (text, record) => (
                                   <NavLink to={`/submission/${record._id}`}>
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
                                   <NavLink to={`/submission/${record._id}`}>
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
