import React from "react";
import {List} from "antd";

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
    // 假设这是您的提交列表数据
    { id: 1, problemId: 1, problemName: "Problem 1", timestamp: "2023-06-28", language: "JavaScript", result: "Accepted" },
    { id: 2, problemId: 2, problemName: "Problem 2", timestamp: "2023-06-29", language: "Python", result: "Wrong Answer" },
    // ...
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

        </div>
        <div
            style={{
                marginTop: 20,
                marginLeft: 20,
                marginRight: 20,
            }}
        >
          <h1>提交列表</h1>

        </div>
      </div>
  );
}

export default MySubmission;

// function MySubmission() {
//   return <div>MySubmission</div>;
// }
//
// export default MySubmission;