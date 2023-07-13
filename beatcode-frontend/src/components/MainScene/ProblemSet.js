import React, {useEffect, useState} from 'react';
import {Button, Input, Space, Table, Tag} from 'antd';
import {getProblemSet} from "../../services/problemSetService";
import Loading from "../Loading";

/**
 * @Description: 题目列表
 * 单击题目名称或者题号，跳转到题目详情界面
 * url: /problem/:id
 * */
const ProblemTable = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('title');

    const [problemList, setProblemList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    // TODO 待实现
    const [searchText1, setSearchText1] = useState('');
    const [searchText2, setSearchText2] = useState('');
    const [searchText3, setSearchText3] = useState('');

    const onSearch = (value) => {

        const callback = (data) => {
            setProblemList(data.data.page);
            setIsLoading(false);
        }

        const data = {
            "pageIndex": currentPage,
            "pageSize": 20,
            "titleContains": searchText2,
            "hardLevel": searchText3,
        }

        getProblemSet(data, callback);
    }

    // 表格的列信息
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
            render: (text, record) => (
                <a href={`/problem/${record.id}`}>{text}</a>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'title',
            width: '25%',
            render: (text, record) => (
                <a href={`/problem/${record.id}`}>{text}</a>
            ),
        },
        {
            title: 'Difficulty',
            dataIndex: 'difficulty',
            key: 'difficulty',
            width: '15%',
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            width: '40%',
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
    ];

    // 获取题目列表
    useEffect(() => {
        const callback = (data) => {
            setProblemList(data.data.page);
            setIsLoading(false);
        }

        const data = {
            "pageIndex": currentPage,
            "pageSize": 20,
            "titleContains": searchText2,
            "hardLevel": searchText3,
        }


        getProblemSet(data, callback);
    }, []);

    if (isLoading) {
        return <Loading/>;
    }

    // 表格最多展示20题
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
            }}
        >
            <Space.Compact size="large">
                {/*<Input*/}
                {/*    placeholder="输入题目id"*/}
                {/*    value={searchText1}*/}
                {/*    onChange={(e) => setSearchText1(e.target.value)}*/}
                {/*/>*/}
                <Input
                    placeholder="输入题目名称"
                    value={searchText2}
                    onChange={(e) => setSearchText2(e.target.value)}
                    style={{
                        width: 300,
                    }}
                />
                <Input
                    placeholder="输入题目难度"
                    value={searchText3}
                    onChange={(e) => setSearchText3(e.target.value)}
                    style={{
                        width: 300,
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
                marginLeft: 20,
                marginRight: 20,
            }}
            dataSource={problemList}
            pagination={{
                pageSize: 20,
                onChange: (page) => {
                    console.log(page);
                    setCurrentPage(page);
                },
            }}
        />;
    </div>);
};

/**
 * @Description: 题库
 * 包括的组件：
 * 1. 顶部：所有标签的展示
 * 2. 题目列表
 * */
export function ProblemSet() {


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
                {/*<div*/}
                {/*    style={{*/}
                {/*            marginLeft: 20,*/}
                {/*            marginRight: 20,*/}
                {/*            marginBottom: 20,*/}
                {/*        }}*/}
                {/*>*/}
                {/*    {tags.map((tag, index) => (*/}
                {/*        // <Tag key={index} color={tag.color}>*/}
                {/*        //     {tag.name}*/}
                {/*        // </Tag>*/}

                {/*        <React.Fragment key={index}>*/}
                {/*            <Tag color={tag.color} style={{ fontSize: '16px', padding: '8px 12px' }}>{tag.name}</Tag>*/}
                {/*            {index < tags.length - 1 && <span style={{ height:40, display: 'inline-block' }} />}*/}
                {/*        </React.Fragment>*/}
                {/*    ))}*/}
                {/*</div>*/}
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