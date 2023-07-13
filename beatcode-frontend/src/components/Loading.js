import React from "react";
import {Spin} from "antd";

export default function Loading() {
    return (<div
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
    </div>);
}