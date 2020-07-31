import React, { PureComponent } from 'react'
import { Input, DatePicker,Row, Col } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';

class discussManage extends PureComponent {
  render() {
    function onChange(date, dateString) {
        console.log(date, dateString);
      }
    return (
        <div>
            <Row justify="space-around">
                <Col span={2}>探讨名称</Col>
                <Col span={4}><Input placeholder="请输入" /></Col>
                <Col span={2}>主持人</Col>
                <Col span={4}><Input placeholder="请输入" /></Col>
                <Col span={2}>探讨状态</Col>
                <Col span={4}><Input placeholder="请输入" /></Col>                    
            </Row>
            <>
            <span>报名开始时间</span><DatePicker locale={locale} onChange={onChange} />
            <span>报名结束时间</span><DatePicker locale={locale} onChange={onChange} />
            <span>取消时间</span><DatePicker locale={locale} onChange={onChange} />
            <span>探讨开始时间</span><DatePicker locale={locale} onChange={onChange} />
            </>,
            
        </div>
    )
}
}

export default discussManage
