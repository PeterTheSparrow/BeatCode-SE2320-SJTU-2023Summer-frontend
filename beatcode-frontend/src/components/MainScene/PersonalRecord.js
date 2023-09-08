import React, {useEffect, useState} from 'react';
import {Button, Col, DatePicker, Input, Row, Space, Statistic, Table, Tag, Tooltip} from 'antd';
import HeatMap from '@uiw/react-heat-map';
import {getPassedProblemList, getProblemSet} from "../../services/problemSetService";
import Loading from "../Loading";
import {useOutletContext} from "react-router-dom";
import {PAGE_SIZE} from "../../utils/config-overrides";
import {getUserActivities} from "../../services/userService";
import moment from 'moment';
import dayjs from "dayjs";

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
const HotMap=(props)=>{
    const {userId} = props;
    const [value,setValue]=useState([]);
    const [presentYear,setPresentYear]=useState("2023");
    const [selectedYear,setSelectedYear]=useState("2023");
    const [totalCount,setTotalCount]=useState(0);
    useEffect(() => {
        let dateTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString();
        setPresentYear(dateTime.split("T")[0].split("-")[0]);
        setSelectedYear(dateTime.split("T")[0].split("-")[0]);
    },[]);
    useEffect(()=>{
        const data = {
            "userId": userId.toString(),
            "year": selectedYear,
        }
        const callback = (data) => {
            console.log("get from get User Activity:",data.data);
            let counter= 0;
            setValue(data.data);
            data.data.map(entry=>{
                counter+=entry.count;
            })
            setTotalCount(counter);
        }
        getUserActivities(data,callback);
    }, [selectedYear]);

    const onChange = (date, dateString) => {
        setSelectedYear(dateString);
    };
    const DisabledDate= (current)=>{
        let dateTime = new Date(+new Date() +8*3600*1000).toISOString();
        let timeArray =dateTime.split("T")[0].split("-");
        let newDate = timeArray[0]+"-"+timeArray[1]+"-"+timeArray[2] ;//当前年月日
        let earliestDate="2020-01-01";
        if(current>moment(newDate))return true;
        if(current<moment(earliestDate))return true;
        return false;
    }
    return (
        <div>
            <Row>
                <Col span={8}>
                    <Statistic title="提交总次数：" value={totalCount} />
                </Col>

                <Col span={8}>
                    <DatePicker
                        onChange={onChange}
                        picker="year"
                        disabledDate={DisabledDate}
                        defaultValue={dayjs(presentYear)}
                    />
                </Col>
                <Col span={8}></Col>
            </Row>

            <HeatMap
                value={value}
                width={600}
                startDate={new Date(selectedYear+"/01/01")}
                endDate={new Date(selectedYear+"/12/31")}
                rectSize={8}
                rectRender={(props, data) => {
                    const year = data.date.split('/')[0];
                    if (year !== selectedYear) {
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

        </div>

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
                <HotMap userId={outletData.userId}/>
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

