import React, { Component } from 'react'
import { Form, Input, DatePicker, Row, Col, Select, Button } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import styles from './style.module.scss'



export default class AddDiscuss extends Component {
    render() {
      const { Option } = Select;
        return (
            <div className={styles.addBox}>
              <h1>新增病例探讨</h1>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                className = {styles.search}
              >
                <Row justify="start" gutter={[100, 25]} className = {styles.search}>
                  <Col span={12}>
                    <Form.Item
                      label="探讨主题"
                      name="discussName"
                    >
                      <Input placeholder="请输入" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="参会医生"
                      name="inviteGuests"
                    >
                      <Input placeholder="请输入" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="主持人"
                      name="host"
                    >
                      <Input placeholder="请输入" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="探讨持续时间"
                      name=""
                    >
                      <Select defaultValue="请选择"  allowClear className = {styles.select} >
                        <Option value="-1">请选择</Option>
                        <Option value="0">30</Option>
                        <Option value="1">60</Option>
                        <Option value="2">90</Option>
                        <Option value="3">120</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item 
                      label="探讨开始时间"
                      name="discussStart"
                    >
                      <DatePicker locale={locale} showTime />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="报名开始时间"
                      name="enrollStart"
                    >
                      <DatePicker locale={locale} showTime />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="报名结束时间"
                      name="enrollEnd"
                    >
                      <DatePicker locale={locale} showTime />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="费用类型"
                      name=""
                    >
                      <Input placeholder="请输入" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="探讨费用"
                      name="AttendMoney"
                    >
                      <Input placeholder="请输入" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="会诊患者信息"
                      name=""
                    >
                      <Input placeholder="请输入" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="探讨说明"
                      name=""
                    >
                      <Input placeholder="请输入" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item >
                      <Button onClick={this.delSearch}>关闭</Button>
                      <Button type="primary" htmlType="submit">确定</Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
        )
    }
}
