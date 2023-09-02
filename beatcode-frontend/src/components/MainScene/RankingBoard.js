import React, {useEffect, useState} from 'react';
import {getRanking} from "../../services/userService";
import {Button, Cascader, Input, Space, Spin, Table} from "antd";
import {NavLink} from "react-router-dom";

/**
 * @Description: 排行榜
 * antd
 * */

function RankingBoard() {
    // 在没加载完数据之前，不显示表格
    const [isLoading, setIsLoading] = useState(true);
    const [ranking, setRanking] = useState([]);
    const [pageNum,setPageNum]=useState("1");
    const [pageSize,setPageSize]=useState("10");
    const [totalPage,setTotalPage]=useState(0);
    const [totalElements,setTotalElements]=useState(0);
    const getCallback = (data) => {
        console.log("received data for ranking: ");
        console.log(data);

        setTotalElements(data.totalElements);
        setTotalPage(data.totalPages);
        setPageNum(data.number+1);
        setPageSize(data.size);
        const extractedRanking = data.content.map((item) => ({
            _id: item._id,
            key: item._id,
            user_id: item.userId,
            user_name: item.userName,
            ACount: item.acount,
        }));
        setRanking(extractedRanking);
    }
    useEffect(() => {
        setIsLoading(true);
        getRanking({
            // 新搜索的话，页数一定是1
            page: pageNum,
            pageSize: pageSize,
        }, getCallback);
    }, [pageNum,pageSize]);
    useEffect(() => {
        // submissions 更新时，将 isLoading 设置为 false
        setIsLoading(false);
    }, [ranking]);
    if (isLoading) {
        return <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 20,
            }}
        >
            {/*spin居中*/}
            <Spin
                tip="Loading..."
                size={"large"}
                style={{
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                }}
            />
            <div>
                loading...
            </div>
            <div style={{height: 500,}}/>
        </div>;
    }
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
                {/*搜索框居中*/}

                <Table dataSource={ranking}
                       pagination={{
                           pageSize: parseInt(pageSize),
                           current: parseInt(pageNum),
                           showQuickJumper: true,
                           total: totalElements,
                           defaultCurrent: 1,
                           showTotal: ()=>`共有${totalElements}条记录`,
                           onChange: (page,pageSize)=>{
                               setPageNum(page.toString());
                               setPageSize(pageSize.toString());
                           },
                       }}

                       style={{
                           marginLeft: 40,
                           marginRight: 40,
                       }}

                       columns={[
                           // 单击提交id，可以跳转到提交详情界面
                           {
                               title: '排名',
                               dataIndex: 'key',
                               // 渲染一个链接，单击后根据题号跳到题目详情
                               render: ( text, record, index ) => (
                                   <text>
                                       {index+1+(pageNum-1)*pageSize}
                                   </text>
                               )
                           },
                           {
                               title: '用户名',
                               dataIndex: 'user_name',
                               // 渲染一个链接，单击后跳到题目详情
                               render: (text, record) => (
                                   <NavLink to={`/user/${record.user_id}`}>
                                       {text}
                                   </NavLink>)
                           },
                           {
                               title: '做题数',
                               dataIndex: 'ACount',
                               // 渲染一个链接，单击后根据题号跳到题目详情
                               render: (text) => (
                                   <text>
                                       {text}
                                   </text>
                               )
                           },
                       ]}

                />
                {/*占位*/}
                <div style={{height: 50,}}/>
            </div>
        </div>
    );
}

export default RankingBoard;