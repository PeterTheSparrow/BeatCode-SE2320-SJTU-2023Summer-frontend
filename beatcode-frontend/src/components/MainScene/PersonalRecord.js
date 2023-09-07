import React, {useEffect, useState} from 'react';
import {Button, Input, Space, Statistic, Table, Tag, Tooltip} from 'antd';
import HeatMap from '@uiw/react-heat-map';
import {getPassedProblemList, getProblemSet} from "../../services/problemSetService";
import Loading from "../Loading";
import {useOutletContext} from "react-router-dom";
import {PAGE_SIZE} from "../../utils/config-overrides";

const PassProblemTable = (props) => {
    const {userId} = props;
    const [problemList, setProblemList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    // 有关分页的信息
    // const PAGE_SIZE = 2;
    const [totalPage, setTotalPage] = useState(0);

    // 表格的列信息
    const columns = [
        {
            title: 'problem Id',
            dataIndex: 'problemId',
            key: 'problemId',
            width: '20%',
            render: (text, record) => (
                // <a href={`/problem/${record.id}`}>{text}</a>
                <div>{text}</div>
            ),
        },
        {
            title: 'title',
            dataIndex: 'problemTitle',
            key: 'problemTitle',
            width: '25%',
            render: (text, record) => (
                // <a href={`/problem/${record.id}`}>{text}</a>
                <div>{text}</div>
            ),
        },
        {
            title: 'difficulty',
            dataIndex: 'problemDifficulty',
            key: 'problemDifficulty',
            width: '15%',
        }
    ];

    // 获取题目列表
    useEffect(() => {
        const callback = (data) => {
            console.log("@@@",data.data);
            setTotalPage(data.data.total)
            setProblemList(data.data.problems)
            setIsLoading(false);
        }

        const data = {
            "pageIndex": currentPage,
            "pageSize": PAGE_SIZE,
            // "userId": userId,
            // userId转换为字符串
            "userId": userId.toString(),
        }

        getPassedProblemList(data, callback);
    }, [currentPage]);

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
                    width: "100%",
                }}
            >
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
                    },
                }}
            />
        </div>);
};

/**
* 说明：
* hotmap的实现参考了https://uiwjs.github.io/react-heat-map/
* 但是其中tooltip的实现是buggy的，因此我使用antd中的tooltip来实现
*
* 接口：
* 1. 日期：开始日期和结束日期；时间间隔为1year
* 2. 提交次数：时间+提交次数
*
* input:
* - startDate: '2016/01/01'
* - endDate: '2016/12/31'
* - value: [
*  { date: '2016/01/11', count:2 },
* ...
* ]
*
* */
function HotMap() {
    const value = [
        { date: '2016/01/11', count:2 },
        ...[...Array(17)].map((_, idx) => ({ date: `2016/01/${idx + 10}`, count: idx, })),
        ...[...Array(17)].map((_, idx) => ({ date: `2016/12/${idx + 10}`, count: idx, })),
        { date: '2016/04/12', count:2 },
        { date: '2016/05/01', count:5 },
        { date: '2016/05/02', count:5 },
        { date: '2016/05/03', count:1 },
        { date: '2016/05/04', count:11 },
        { date: '2016/05/08', count:32 },
        { date: '2016/12/09', count:2 },
    ];

    return (
        <HeatMap
            value={value}
            width={600}
            startDate={new Date('2016/01/01')}
            endDate={new Date('2016/12/31')}
            rectSize={8}
            rectRender={(props, data) => {
                // 如果日期不在范围内，则不显示
                // TODO 这的日期判别是buggy不严谨的，需要改进
                // if (data.date < '2016/01/01' || data.date > '2016/12/31') {
                //     return null;
                // }

                // 切出日期，如果年份不是2016，则不显示
                const year = data.date.split('/')[0];
                if (year !== '2016') {
                    return null;
                }

                return (
                    <Tooltip title={`日期: ${data.date},提交: ${data.count || 0}`}>
                        {/*<span>Tooltip will show on mouse enter.</span>*/}
                        <rect {...props} />
                    </Tooltip>
                );

            }}
        />
    );
}


/*
* 个人记录页面。
* 包含：
* 1. 个人提交的HotMap
* 2. 个人提交的题目列表
* */
function PersonalRecord() {
    const outletData = useOutletContext();

    return (
        <div
            style = {{
                width : '100%',
                }}
        >
            <div
                style = {{
                    width : '72%',
                    marginLeft : '22%',
                    marginRight : '6%',
                    }}
            >
                <div style = {{height : '30px',}}/>
                {/*TODO 把这里写死的数据改为计算得到的真实值*/}
                <Statistic title="今年您的提交次数：" value={114514} />
                <HotMap/>
                {/*加粗、字体变大显示标题，灰色*/}
                <div
                    style={{
                        // fontWeight: 'bold',
                        fontSize: '16px',
                        color: '#8c8989',
                        }}
                >已通过的题目：</div>

            </div>
            <div
                style = {{
                    width : '60%',
                    marginLeft : '20%',
                    marginRight : '20%',
                }}
            >
                <PassProblemTable userId={outletData.userId}/>
                <div style = {{height : '30px',}}/>
            </div>
        </div>
    );
}

export default PersonalRecord;

