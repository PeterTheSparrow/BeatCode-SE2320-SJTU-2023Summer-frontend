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

    const submissionData = [
        { id: 1, problemId: 1, problemName: "Problem 1", username: "user1", result: "Accepted", score: 100, runtime: 100, memory: 100, timestamp: "2023-06-28" },
    ]

    // 存储的信息：submissionId
    const [submissionId, setSubmissionId] = React.useState(0);

    const [language, setLanguage] = React.useState('cpp');
    // 模拟评测结果数据
    /*
    * 每个测试点的数据包括：
    * index 测试点编号
    * score 得分
    * info 详细信息
    * time 运行时间
    * memory 运行内存
    *
    * */
    const evaluationData = [
        { index: 1, score: 100, info: "Accepted", time: 100, memory: 100 },
        { index: 2, score: 100, info: "Accepted", time: 100, memory: 100 },
        { index: 3, score: 100, info: "Accepted", time: 100, memory: 100 },
        { index: 4, score: 100, info: "Accepted", time: 100, memory: 100 },
        { index: 5, score: 100, info: "Accepted", time: 100, memory: 100 },
    ];

    const [code, setCode] = React.useState(''); // 代码内容



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
            <Table dataSource={submissionData}
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
                            },
                            {
                                title: '题目名称',
                                dataIndex: 'problemName',
                                key: 'problemName',
                            },
                            {
                                title: '提交者',
                                dataIndex: 'username',
                                key: 'username',
                            },
                            {
                                title: '评测结果',
                                dataIndex: 'result',
                                key: 'result',
                                // Accepted： bold, lightgreen
                                render: (text, record) => {
                                    if (text === "Accepted") {
                                        return <span style={{fontWeight: "bold", color: "lightgreen"}}>{text}</span>
                                    }
                                    else {
                                        return <span style={{fontWeight: "bold", color: "red"}}>{text}</span>
                                    }
                                }
                            },
                            {
                                title: '得分',
                                dataIndex: 'score',
                                key: 'score',
                            },
                            {
                                title: '运行时间',
                                dataIndex: 'runtime',
                                key: 'runtime',
                                render: (text, record) => {
                                    return <span>{text}ms</span>
                                }
                            },
                            {
                                title: '内存消耗',
                                dataIndex: 'memory',
                                key: 'memory',
                                render: (text, record) => {
                                    return <span>{text}MB</span>
                                }
                            },
                            {
                                title: '提交时间',
                                dataIndex: 'timestamp',
                                key: 'timestamp',
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
                            {title: '测试点', dataIndex: 'index', key: 'index',},
                            {title: '得分', dataIndex: 'score', key: 'score',},
                            {title: '状态', dataIndex: 'info', key: 'info',
                                // Accept绿色加粗，其他红色加粗
                                render: (text, record) => {
                                    if (text === 'Accepted') {
                                        return <div style={{color: 'lightgreen', fontWeight: 'bold'}}>{text}</div>
                                    } else {
                                        return <div style={{color: 'red', fontWeight: 'bold'}}>{text}</div>
                                    }
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