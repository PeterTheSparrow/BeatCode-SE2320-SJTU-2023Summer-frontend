import React from 'react';
import Search from "antd/es/input/Search";


/**
 * @Description: 题库
 * 包括的组件：
 * 1. 顶部：搜索框、标签筛选
 * 2. 题目列表
 * */
export function ProblemSet() {
    const onSearch = value => console.log(value);
    return (
        <div>
            <Search
                placeholder="根据题目名称搜索"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                style={{
                    width: 660,
                    marginBottom: 20,
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                }}
            />
        </div>
    );
}