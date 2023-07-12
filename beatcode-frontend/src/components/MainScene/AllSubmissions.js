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
    const [tableLoading, setTableLoading] = useState(true);

    // sorting的列名，sorting的方式
    const [sortingColumn, setSortingColumn] = useState('submission_time');
    const [sortingOrder, setSortingOrder] = useState('desc');

    const [submissions, setSubmissions] = useState([]);
    const getCallback = (data) => {
        console.log(data.content);
        console.log(JSON.stringify(data.content[0]._id));
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
        }));
        setSubmissions(extractedSubmissions);

        // 已经加载完成，设置为false
        setTableLoading(false);
    }
    useEffect(() => {
        getSubmissions({
            page: "1",
            pageSize: "50",
        }, getCallback);
    }, [])

    const options = [
        {
            value: 'submission_time',
            label: 'time',
            children: [
                {
                    value: 'asc',
                    label: 'asc',
                },
                {
                    value: 'desc',
                    label: 'desc',
                }
            ],
        },
        {
            value: 'problem_id',
            label: 'problem id',
            children: [
                {
                    value: 'asc',
                    label: 'asc',
                },
                {
                    value: 'desc',
                    label: 'desc',
                }
            ],
        },
        {
            value: 'problem_name',
            label: 'problem name',
            children: [
                {
                    value: 'asc',
                    label: 'asc',
                },
                {
                    value: 'desc',
                    label: 'desc',
                }
            ],
        }
    ];
    const onChange = (value) => {
        console.log(value);
        setSortingColumn(value[0]);
        setSortingOrder(value[1]);
    };

    const onSearch = value => {
        // 向后端发送请求，更新前端的搜索结果
        /*
        * 请求中需要包含的参数：
        *
        //needing params:
        //sortDirection: asc or desc(default)
        //sortBy: sorted field (set time as default)
        //user_name: filtered username
        //problem_name: filtered problem name
        //problem_id: filtered problem id
        //page: present page
        //pageSize: size of per page
        * */
        getSubmissions({
            // 新搜索的话，页数一定是1
            page: "1",
            pageSize: "50",

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

    if (tableLoading) {
        return <Loading/>;
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
                    <Cascader options={options} onChange={onChange} placeholder="排序" />;
                </div>
                {/*pageSize是50*/}
                <Table dataSource={submissions}
                       pagination={{pageSize: 50}}

                       style={{
                           marginLeft: 40,
                           marginRight: 40,
                       }}

                       columns={[
                           // 单击提交id，可以跳转到提交详情界面
                           {title: '提交时间', dataIndex: 'submission_time'},
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
                               dataIndex: 'result_score',
                               render: (text, record) => (
                                   <span style={{
                                       color: text === "100" ? "lightgreen" : "red",
                                       fontWeight: "bold"
                                   }}>{text}</span>
                               )
                           },
                           {title: '得分', dataIndex: 'result_score'},
                           {
                               title: '运行时间', dataIndex: 'result_time',
                               render: (text, record) => (
                                   <span>{text} ms</span>
                               )
                           },
                           {
                               title: '运行内存', dataIndex: 'result_memory',
                               render: (text, record) => (
                                   <span>{text} MB</span>
                               )
                           },
                           {
                               title: '详情',
                               dataIndex: '_id',
                               // 渲染一个按钮，点击按钮跳转到提交详情界面
                               render: (text, record) => (
                                   <NavLink to={`/submission/${record._id}`}>
                                       <Button>
                                           详情
                                       </Button>
                                   </NavLink>)
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


// <div
//               style={{
//                 marginTop: 20,
//                 marginLeft: 20,
//                 marginRight: 20,
//               }}
//         >
//             {/*占位*/}
// <div style={{height: 50,}}/>
// <Row>
//     <Col span={12}>
//         <h1>提交历史</h1>
//         <Table dataSource={[{submissionNum, passedProblemNum, passedSubmissionNum, passedRate}]}
//                pagination={false}
//                style={{
//                    marginLeft: 40,
//                    marginRight: 40,
//                    marginBottom: 40,
//                }}
//                columns={[
//                    { title: '提交数目', dataIndex: 'submissionNum' },
//                    { title: '通过题目数目', dataIndex: 'passedProblemNum' },
//                    { title: '通过提交数目', dataIndex: 'passedSubmissionNum' },
//                    { title: '通过率', dataIndex: 'passedRate' },
//                ]}
//         />
//     </Col>
//     <Col span={12}>
//         <div style={{ marginTop: 20 }}>
//             <PieChart width={400} height={300}>
//                 <Pie
//                     data={passedRateData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     fill="#8884d8"
//                     label
//                 >
//                     {/*饼图*/}
//                     {passedRateData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={index === 0 ? "#82ca9d" : "#8884d8"} />
//                     ))}
//                 </Pie>
//                 <Legend />
//             </PieChart>
//         </div>
//     </Col>
// </Row>
//
// </div>