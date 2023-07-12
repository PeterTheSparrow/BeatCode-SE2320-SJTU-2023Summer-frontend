import React, {useEffect, useRef, useState} from 'react';
import Search from "antd/es/input/Search";

import {Button, Input, Space, Spin, Table, Tag} from 'antd';
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import {getProblemSet} from "../../services/problemSetService";
import Loading from "../Loading";


/**
 * 题目数据
 * 1. 题号
 * 2. 题目名称
 * 3. 题目标签+标签对应的颜色（用tag渲染）；颜色是和标签一一对应的；不同的标签对应不同的颜色；
 *
 * 单击题目名称或者题号，跳转到题目详情界面
 * */
// const data = [
//     // 新增难度
//     {
//         key: '1',
//         id: '1',
//         name: '两数之和',
//         tags: ['数组', '哈希表'],
//         tagColors: ['blue', 'green'],
//         difficulty: '简单',
//     },
//     {
//         key: '2',
//         id: '2',
//         name: '两数相加',
//         tags: ['链表', '数学'],
//         tagColors: ['red', 'yellow'],
//         difficulty: '中等',
//     },
//     {
//         key: '3',
//         id: '3',
//         name: '无重复字符的最长子串',
//         tags: ['哈希表', '双指针', '字符串', '滑动窗口'],
//         tagColors: ['blue', 'green', 'red', 'yellow'],
//         difficulty: '中等',
//     },
//     {
//         key: '4',
//         id: '4',
//         name: '寻找两个正序数组的中位数',
//         tags: ['数组', '二分查找', '分治算法'],
//         tagColors: ['blue', 'green', 'red'],
//         difficulty: '困难',
//     },
//     {
//         key: '5',
//         id: '5',
//         name: '最长回文子串',
//         tags: ['字符串', '动态规划'],
//         tagColors: ['red', 'yellow'],
//         difficulty: '中等',
//     },
//     {
//         key: '6',
//         id: '6',
//         name: 'Z 字形变换',
//         tags: ['字符串'],
//         tagColors: ['red'],
//         difficulty: '中等',
//     },
// ];

/**
 * @Description: 题目列表
 * 单击题目名称或者题号，跳转到题目详情界面
 * url: /problem/:id
 * */
const ProblemTable = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('title');
    const searchInput = useRef(null);

    const [problemList, setProblemList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                </Space>
            </div>
        ),
        /**
         * @Description: 用于设置表格的筛选规则
         * @Param value: 筛选的值
         * @Param record: 当前行的数据
         * @Return: boolean
         * */
        onFilter: (value, record) =>
            // record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    // 表格的列信息；TODO 实现跳转
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
            ...getColumnSearchProps('id'),
            render: (text, record) => (
                <a href={`/problem/${record.id}`}>{text}</a>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'title',
            width: '25%',
            ...getColumnSearchProps('name'),
            render: (text, record) => (
                <a href={`/problem/${record.id}`}>{text}</a>
            ),
        },
        {
            title: 'Difficulty',
            dataIndex: 'difficulty',
            key: 'difficulty',
            width: '15%',
            ...getColumnSearchProps('difficulty'),
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
                            {tag.caption}
                        </Tag>
                    ))}
                </>
            ),
        },
    ];

    // 获取题目列表
    useEffect(() => {
        const callback = (data) => {
            setProblemList(data);
            console.log(data);
            setIsLoading(false);
        }

        /*
         *
         * 请求的格式：
         *  {
                "pageIndex": 1,
                "pageSize": 10,
                "searchIndex": "title",
                "searchKeyWord": "路"
            }
        * */
        const data = {
            "pageIndex": currentPage,
            "pageSize": 20,
            "searchIndex": searchedColumn,
            "searchKeyWord": searchText
        }


        getProblemSet(data, callback);
    }, []);

    if (isLoading) {
        return <Loading/>;
    }

    // 表格最多展示20题
    return <Table
        columns={columns}
        dataSource={problemList}
        pagination={{pageSize: 20}}
        pagination={{
            onChange: (page) => {
                console.log(page);
                setCurrentPage(page);
            },
        }}
    />;
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