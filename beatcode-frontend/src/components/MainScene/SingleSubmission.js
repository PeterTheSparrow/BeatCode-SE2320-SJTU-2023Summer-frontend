import React from "react";
import {Table, Typography} from "antd";
import MonacoEditor from "react-monaco-editor";

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
 * */
const { Title } = Typography;

function SingleSubmission() {
    // 存储的信息：submissionId
    const [submissionId, setSubmissionId] = React.useState(0);

    const [language, setLanguage] = React.useState('cpp');
    // 模拟评测结果数据
    const evaluationData = [
        { testPoint: 'Test Point 1', result: 'Passed' , time: '0.1s', memory: '1.0MB'},
        { testPoint: 'Test Point 2', result: 'Failed' , time: '0.2s', memory: '2.0MB'},
        // 其他测试点...
    ];

    const [code, setCode] = React.useState(''); // 代码内容

    // 硬编码的评测结果
    const evaluationResult = {
        problemId: 1,
        submissionTime: '2020-12-12 12:12:12',
        language: 'cpp',
        testPointNum: 2,
        passedTestPointNum: 1,
        totalRuntime: '0.3s',
        totalMemory: '3.0MB',
    };


    // 硬编码code
    const codeString = `#include <iostream>
#include <vector>

using namespace std;

void dfs(int node, vector<bool>& visited, vector<vector<int>>& graph) {
    // 访问当前节点
    visited[node] = true;
    cout << "访问节点: " << node << endl;

    // 遍历当前节点的邻居节点
    for (int neighbor : graph[node]) {
        // 如果邻居节点还未被访问，则继续递归调用 DFS
        if (!visited[neighbor]) {
            dfs(neighbor, visited, graph);
        }
    }
}

int main() {
    int numNodes = 6; // 节点数量

    vector<vector<int>> graph(numNodes); // 图的邻接表表示
    graph[0] = {1, 2}; // 节点0的邻居节点为1和2
    graph[1] = {3, 4}; // 节点1的邻居节点为3和4
    graph[2] = {4, 5}; // 节点2的邻居节点为4和5

    vector<bool> visited(numNodes, false); // 记录节点是否已经访问过

    // 从节点0开始进行深度优先搜索
    dfs(0, visited, graph);

    return 0;
}
`

    return (
        // 组件长度固定，超过长度滚动
        <div>
            {/*占位符*/}
            <div style={{height: 10,}}/>

            <Title level={2} style={{textAlign: 'center',}}>
                评测详情：评测{submissionId}
            </Title>

            <Title level={3} style={{marginLeft: 20,}}>
                评测结果
            </Title>

            {/* 评测结果表格 */}
            {/*包含题号，题目名称*/}
            <Table dataSource={[evaluationResult]}
                     pagination={false}
                        style={{
                            marginLeft: 40,
                            marginRight: 40,
                        }}
                        columns={[
                            { title: '题目id', dataIndex: 'problemId' },
                            { title: '提交时间', dataIndex: 'submissionTime' },
                            { title: '语言', dataIndex: 'language' },
                            { title: '测试点数目', dataIndex: 'testPointNum' },
                            { title: '通过的测试点数目', dataIndex: 'passedTestPointNum' },
                            { title: '总运行时间', dataIndex: 'totalRuntime' },
                            { title: '总运行内存', dataIndex: 'totalMemory' },
                        ]}
            />



            <Title level={3} style={{marginLeft: 20,}}>
                代码
            </Title>

            {/* 代码展示框 */}
            <div style={{
                marginLeft: 30,
                marginRight: 30,
            }}>
                <MonacoEditor
                    height={700}
                    language={language}
                    theme="vs-light"
                    value={codeString}
                    options={{
                        readOnly: true,
                        wordWrap: 'on', // 自动换行
                        minimap: { enabled: false }, // 不显示代码缩略图
                    }}
                />
            </div>

            <Title
                level={3}
                style={{
                    marginLeft: 20,
                }}
            >
                评测详情
            </Title>
            {/*table一页展示5个*/}
            <Table dataSource={evaluationData}
                   pagination={{
                       pageSize: 5,
                   }}
                   style={{
                       marginLeft: 40,
                       marginRight: 40,
                   }}
                   columns={[
                       { title: '测试点', dataIndex: 'testPoint' },
                       { title: '结果', dataIndex: 'result' },
                       { title: '时间', dataIndex: 'time' },
                       { title: '内存', dataIndex: 'memory' }]}
            />
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