import React, {useEffect, useState} from "react";
import {Col, Row, Table} from "antd";
import {NavLink} from "react-router-dom";
import { PieChart, Pie, Cell, Legend } from "recharts";
import {getSubmissions} from "../../services/submissionService";

/**
 * @Description: 某个用户所有的提交
 *
 * 1. 统计信息：提交数目、通过数目、通过率（列表+统计图）
 * 2. 提交列表：每一次提交，包含提交id、题目id、题目名称、提交时间戳、语言、结果
 *
 * TODO 点击提交id，可以跳转到提交详情界面
 * */
function AllSubmissions() {

    const [submissions,setSubmissions]=useState([]);
    const getCallback=(data)=>{
        console.log(data.content);
        console.log(JSON.stringify(data.content[0]._id));
        const extractedSubmissions = data.content.map((item) => ({
            _id:item.string_id,
            key:item.string_id,
            problem_id:item.problemId,
            problem_name:item.problemName,
            user_name:item.userName,
            result_score:item.result_score,
            result_time:item.result_time,
            result_memory:item.result_memory,
            submission_time:item.submission_time,
        }));
        setSubmissions(extractedSubmissions);
    }
    useEffect(()=>{
        getSubmissions({
            page:"1",
            pageSize:"50",
        },getCallback);
    },[])
  /*
  * 列表中的数据格式：
  *  id: 提交id
  * problemId: 题目id
  * problemName: 题目名称
  * username: 用户名
  * result: 通过状态
  * score: 得分
  * runtime: 运行时间
  * memory: 运行内存
  * timestamp: 提交时间戳
  * language: 语言
  * */
  // const submissionData = [
  //       { id: 1, problemId: 1, problemName: "Problem 1", username: "user1", result: "Accepted", score: 100, runtime: 100, memory: 100, timestamp: "2023-06-28", language: "JavaScript" },
  //       { id: 2, problemId: 2, problemName: "Problem 2", username: "user2", result: "Wrong Answer", score: 0, runtime: 100, memory: 100, timestamp: "2023-06-29", language: "Python" },
  //       { id: 3, problemId: 3, problemName: "Problem 3", username: "user3", result: "Accepted", score: 100, runtime: 100, memory: 100, timestamp: "2023-06-30", language: "C++" },
  //       { id: 4, problemId: 4, problemName: "Problem 4", username: "user4", result: "Accepted", score: 100, runtime: 100, memory: 100, timestamp: "2023-07-01", language: "Java" },
  //       { id: 5, problemId: 5, problemName: "Problem 5", username: "user5", result: "Accepted", score: 100, runtime: 100, memory: 100, timestamp: "2023-07-02", language: "JavaScript" },
  // ]

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
            <Table dataSource={submissions}
                     pagination={false}
                        style={{
                            marginLeft: 40,
                            marginRight: 40,
                        }}
                        columns={[
                            // 单击提交id，可以跳转到提交详情界面
                            {
                                title: '提交id',
                                dataIndex: '_id' ,
                                render: (text, record) => (
                               <NavLink to={`/submission/${record._id}`}>{text}</NavLink>)
                            },
                            { title: '题目id', dataIndex: 'problem_id' },
                            { title: '题目名称', dataIndex: 'problem_name' },
                            { title: '用户名', dataIndex: 'user_name' },
                            // 除了Accepted，其他的都是红色，加粗；Accepted是绿色，加粗
                            {
                                title: '通过状态',
                                dataIndex: 'result_score' ,
                                render: (text, record) => (
                                    <span style={{color: text === "100" ? "lightgreen" : "red", fontWeight: "bold"}}>{text}</span>
                                )
                            },
                            { title: '得分', dataIndex: 'result_score' },
                            { title: '运行时间', dataIndex: 'result_time' ,
                                render: (text, record) => (
                                    <span>{text} ms</span>
                                )
                            },
                            { title: '运行内存', dataIndex: 'result_memory' ,
                                render: (text, record) => (
                                    <span>{text} MB</span>
                                )},
                            { title: '提交时间', dataIndex: 'submission_time' },
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