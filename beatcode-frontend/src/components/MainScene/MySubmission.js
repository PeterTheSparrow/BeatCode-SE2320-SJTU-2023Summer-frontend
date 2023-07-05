import React from "react";
import {Col, Row, Table} from "antd";
import {NavLink} from "react-router-dom";
import { PieChart, Pie, Cell, Legend } from "recharts";

/**
 * @Description: 某个用户所有的提交
 *
 * 1. 统计信息：提交数目、通过数目、通过率（列表+统计图）
 * 2. 提交列表：每一次提交，包含提交id、题目id、题目名称、提交时间戳、语言、结果
 *
 * TODO 点击提交id，可以跳转到提交详情界面
 * */
function MySubmission() {
  const submissionList = [
    // 假设这是提交列表数据
    { id: 1, problemId: 1, problemName: "Problem 1", timestamp: "2023-06-28", language: "JavaScript", result: "Accepted" },
    { id: 2, problemId: 2, problemName: "Problem 2", timestamp: "2023-06-29", language: "Python", result: "Wrong Answer" },
    // ...
  ];

  const [submissionNum, setSubmissionNum] = React.useState(0);
  const [passedProblemNum, setPassedProblemNum] = React.useState(0);
  const [passedSubmissionNum, setPassedSubmissionNum] = React.useState(0);
  const [passedRate, setPassedRate] = React.useState(0);

  // const passedRateData = [
  //     { name: "通过提交数目", value: parseInt(passedSubmissionNum) },
  //     { name: "未通过提交数目", value: submissionNum - parseInt(passedSubmissionNum) },
  // ];

    const passedRateData = [
        { name: "通过提交数目", value: parseInt(65) },
        { name: "未通过提交数目", value: parseInt(5) },
    ];


  return (
      <div>
        <div
              style={{
                marginTop: 20,
                marginLeft: 20,
                marginRight: 20,
              }}
        >
            {/*占位*/}
            <div style={{height: 50,}}/>
            <Row>
                <Col span={12}>
                    <h1>提交历史</h1>
                    <Table dataSource={[{submissionNum, passedProblemNum, passedSubmissionNum, passedRate}]}
                           pagination={false}
                           style={{
                               marginLeft: 40,
                               marginRight: 40,
                               marginBottom: 40,
                           }}
                           columns={[
                               { title: '提交数目', dataIndex: 'submissionNum' },
                               { title: '通过题目数目', dataIndex: 'passedProblemNum' },
                               { title: '通过提交数目', dataIndex: 'passedSubmissionNum' },
                               { title: '通过率', dataIndex: 'passedRate' },
                           ]}
                    />
                </Col>
                <Col span={12}>
                    <div style={{ marginTop: 20 }}>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={passedRateData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {/*饼图*/}
                                {passedRateData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? "#82ca9d" : "#8884d8"} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </div>
                </Col>
            </Row>

        </div>

        <div
            style={{
                marginTop: 20,
                marginLeft: 20,
                marginRight: 20,
            }}
        >
          <h1>提交列表</h1>
            {/*占位*/}
            <div style={{height: 20,}}/>
            <Table dataSource={submissionList}
                     pagination={false}
                        style={{
                            marginLeft: 40,
                            marginRight: 40,
                        }}
                        columns={[
                            // 单击提交id，可以跳转到提交详情界面
                            {
                                title: '提交id',
                                dataIndex: 'id' ,
                                render: (text, record) => (
                               <NavLink to={`/submission/${record.id}`}>{text}</NavLink>)
                            },
                            { title: '题目id', dataIndex: 'problemId' },
                            { title: '题目名称', dataIndex: 'problemName' },
                            { title: '提交时间', dataIndex: 'timestamp' },
                            { title: '语言', dataIndex: 'language' },
                            { title: '结果', dataIndex: 'result' },
                        ]}

            />
            {/*占位*/}
            <div style={{height: 50,}}/>
        </div>
      </div>
  );
}

export default MySubmission;