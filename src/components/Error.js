import React, { Component } from 'react'
import { Result } from 'antd';

export default class Error extends Component {
    render() {
        return (
            <div>
                <Result
                    status="500"
                    title="500"
                    subTitle="抱歉，出了一些问题。"
                />
            </div>
        )
    }
}
