import React, { PureComponent } from 'react'
import {  Form, Input, DatePicker, Row, Col,  Button, Table } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import styles from './dealInfo.module.scss'
const { RangePicker } = DatePicker;

class dealsInfoManage extends PureComponent {
  formRef = React.createRef()
  constructor() {
    super();
    this.state = {
      dealList: [
        {
          recordId: 1,
          userName: "张三",
          transactionType: "充值",
          transactionMoney: '20',
          transactionTime: '2020-06-12 12:00:00',
          TransactionSerial: '11825455',
          TransactionStatus: '交易成功'
        },
        {
          recordId: 2,
          userName: "张三",
          transactionType: "充值",
          transactionMoney: '20',
          transactionTime: '2020-06-12 12:00:00',
          TransactionSerial: '11825455',
          TransactionStatus: '交易成功'
        },
      ]
    }
  }

  range=(start, end)=> {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  disabledDate=(current)=> {
    // Can not select days before today and today
    return current && current >= moment().endOf('day');
  }
  disabledRangeTime=(current, type)=> {   
    let today = moment().date();
    let minute = Number(moment().minutes())
    let hour = Number(moment().hour());
    let second = Number(moment().second());
    let startTime;
    if (type === 'start') {
      startTime = moment(current)
      if (today === moment(current).date()) {
        return {
          disabledHours: () => this.range(hour+1, 24),
          disabledMinutes: () => this.range(minute+1, 60),
          disabledSeconds: () => this.range(second, 60),
        };
      }
    }
    else{
      return {
        disabledHours: () => this.range(hour+1, 24),
        disabledMinutes: () => this.range(minute+1, 60),
        disabledSeconds: () => this.range(second, 60),
      };
    }    
  }

  // 提交搜索信息
  onFinish = values => {
    console.log(values);
  };
  // 重置搜索框
  delSearch = () => {
    this.formRef.current.resetFields();
  };
  render() {
    const { dealList } = this.state;
    const columns = [
      {
        title: '交易用户',
        width: 120,
        dataIndex: 'userName',
        key: 'userName',
        fixed: 'left',
      },
      {
        title: '交易类型',
        width: 120,
        dataIndex: 'transactionType',
        key: 'transactionType',
        fixed: 'left',
      },
      {
        title: '核桃币',
        dataIndex: 'transactionMoney',
        key: 'transactionMoney',
        width: 100,
      },
      {
        title: '交易时间',
        dataIndex: 'transactionTime',
        key: 'transactionTime',
        width: 180,
      },
      {
        title: '交易流水号',
        dataIndex: 'TransactionSerial',
        key: 'TransactionSerial',
        width: 150,
      },
      {
        title: '交易状态',
        dataIndex: 'TransactionStatus',
        key: 'TransactionStatus',
        width: 100,
      }
    ];
    return (
      <div>
         {/* =====================搜索栏================= */}
         <Form
          name="basic"
          initialValues={{ remember: true }}
          ref={this.formRef}
          onFinish={this.onFinish}
          className={styles.search}
        >
          <Row justify="start" gutter={[10, 20]}>
            <Col span={5}>
              <Form.Item
                label="用户姓名"
                name="userName">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="交易流水号"
                name="TransactionSerial"
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            
            <Col span={9}>
              <Form.Item
                label="交易时间"
                name="transactionTime"
              >
                <RangePicker
                  disabledDate={this.disabledDate}
                  disabledTime={this.disabledRangeTime}
                  locale={locale}
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                  }}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item >
                <Button onClick={this.delSearch} style={{marginRight: '10px'}}>重置</Button>
                <Button type="primary" htmlType="submit">搜索</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {/* 交易列表 */}
        <div className={styles.dealList}>
          <div className={styles.listTitle}>
            <h1>交易列表</h1>
            <span className={styles.allNum}>(共<span>{dealList.length}</span>条记录)</span>
            <Button type="primary">导出</Button>
          </div>
          {/* {this.state.loaded && ( */}
            <Row justify="start">
              <Col span={18} offset={3}>
                <Table columns={columns} dataSource={dealList} bordered size="middle" rowKey="recordId" />
              </Col>
            </Row>
          {/* )} */}
        </div>
      </div>
    )
  }
}

export default dealsInfoManage
