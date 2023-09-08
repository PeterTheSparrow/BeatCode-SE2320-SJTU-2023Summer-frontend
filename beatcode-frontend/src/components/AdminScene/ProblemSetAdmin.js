import React, {useEffect, useRef, useState} from 'react';

import {Button, Input, Space, Table, Tag, Tooltip} from 'antd';
import {getProblemSet} from "../../services/problemSetService";
import Loading from "../Loading";

import {PAGE_SIZE} from "../../utils/config-overrides";


/**
 * @Description: 题目列表
 * 单击题目名称或者题号，跳转到题目详情界面
 * url: /problem/:id
 * */
const ProblemTable = () => {
    // 定义：PAGE_SIZE常量
    // const PAGE_SIZE = 2;
    const [totalPage, setTotalPage] = useState(0);
    const [problemList, setProblemList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const [searchText1, setSearchText1] = useState('');
    const [searchText2, setSearchText2] = useState('');
    const [searchText3, setSearchText3] = useState('');

    const onSearch = (value) => {
        const callback = (data) => {
            console.log("王肇国：：",data);
            console.log("::臧斌宇！",data.data.page);
            setProblemList(data.data.page);
            setIsLoading(false);
            setTotalPage(data.data.total)


        }

        const data = {
            // "pageIndex": currentPage,
            "pageIndex": 1,
            "pageSize": PAGE_SIZE,
            "titleContains": searchText2,
            "hardLevel": searchText3,
            "problemId": searchText1,
        }

        console.log("searchtext2",searchText2)
        console.log("searchtext3",searchText3)

        getProblemSet(data, callback);
    }

    // 表格的列信息
    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
            render: (text, record) => (
                <a href={`/problem/${record.id}`} style={{
                    fontWeight:"bold"
                }}>{text}</a>
            ),
        },
        {
            title: '题目名',
            dataIndex: 'title',
            key: 'title',
            width: '30%',
            render: (text, record) => (
                <a href={`/admin/problem/${record.id}`}>{text}</a>
            ),
        },
        {
            // title: 'Difficulty',
            title: (
                <Tooltip title="入门<普及<提高<省选<NOI<CTSC">
                    难度
                </Tooltip>
            ),
            dataIndex: 'difficulty',
            key: 'difficulty',
            width: '10%',
            render:(text,record)=>(
                <Tag color={text==="入门"?`#01cbac`:
                    text==="普及"?`#bbb102`:
                        text==="提高"?`#ff6a00`:
                            text==="省选"?`#8d002a`:
                                text==="NOI"?`#d000b4`:
                                    text==="CTSC"?`#0b0196`:
                                        `#00ff00`}
                     key={text}
                     style={{ fontSize: '13px', padding: '3px 6px' ,fontWeight:"bold"}}
                >
                    {text}
                </Tag>
            )
        },
        {
            title: '标签',
            dataIndex: 'tags',
            key: 'tags',
            width: '50%',
            render: (tags, record) => (
                <>
                    {tags.map((tag) => (
                        <Tag color={tag.color} key={tag.tag} style={{ fontSize: '13px', padding: '3px 6px' }}>
                            {tag.tag}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            // title: 'Condition',
            title: (
                <Tooltip title="这是你的历史最高分">
                    状态
                </Tooltip>
            ),
            dataIndex: 'condition',
            key: 'condition',
            width: '5%',

            render: (text, record) => (
                <>
                    {
                        text === "100" ? (
                            <text style={{ color: `#00ff00` , fontWeight:"bold"}}>{text}</text>
                        ) : (
                            <text style={{ color: `#ff0000` , fontWeight:"bold"}}>{text}</text>
                        )
                    }

                </>
            ),

        },
        {
                title: '功能',
                key: 'action',
                width: '10%',
                render: (text, record) => (
                    <Space size="middle">
                        <a href={`/admin/edit-problem/${record.id}`}>编辑</a>
                    </Space>
                ),
        },
    ];

    // 获取题目列表
    useEffect(() => {
        const callback = (data) => {
            console.log("::陈昊鹏",data);
            setProblemList(data.data.page);
            setTotalPage(data.data.total)
            console.log("pagenum",data.data.total)
            setIsLoading(false);
        }

        const data = {
            "pageIndex": currentPage,
            "pageSize": PAGE_SIZE,
            "titleContains": searchText2,
            "hardLevel": searchText3,
            "problemId": searchText1,
        }


        getProblemSet(data, callback);
    }, [currentPage]);

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div>
            <div style={{height: 20,}}/>
            {/*搜索框居中*/}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 30,
                    width: "100%",
                }}
            >
                <Space.Compact size="large">
                    <Input
                        placeholder="输入题号"
                        value={searchText1}
                        onChange={(e) => setSearchText1(e.target.value)}
                        style={{
                            width: '33%',
                        }}
                    />
                    <Input
                        placeholder="输入题目名称"
                        value={searchText2}
                        onChange={(e) => setSearchText2(e.target.value)}
                        style={{
                            width: '33%',
                        }}
                    />
                    <Input
                        placeholder="输入题目难度"
                        value={searchText3}
                        onChange={(e) => setSearchText3(e.target.value)}
                        style={{
                            width: '33%',
                        }}
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
            <Table
                columns={columns}
                style={{
                    marginLeft: '2.5%',
                    marginRight: '2.5%',
                    width: '95%',
                }}
                dataSource={problemList}
                pagination={{
                    pageSize: PAGE_SIZE,
                    totalPage: totalPage,
                    current: currentPage,
                    showQuickJumper: true,
                    defaultCurrent: 1,
                    total: totalPage * PAGE_SIZE,
                    onChange: (page) => {
                        console.log(page);
                        setCurrentPage(page);
                    }

                }}
            />
        </div>);
};

/**
 * @Description: 题库
 * 包括的组件：
 * 1. 顶部：所有标签的展示
 * 2. 题目列表
 * */
function ProblemSetAdmin() {
    useEffect(() => {
    }, []);


    return (
        <div>
            {/*展示所有标签信息*/}
            <div>
                <div
                    style={{
                        height: 20,
                    }}
                >
                </div>
            </div>
            <div
                style={{
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20,
                }}
            >
                <div
                    style={{
                        height: 20,
                    }}
                >
                </div>
                <ProblemTable/>
            </div>

        </div>
    );
}

export default ProblemSetAdmin;