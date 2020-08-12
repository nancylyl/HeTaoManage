import React, { PureComponent } from 'react'
import {  Form, Input, DatePicker, Row, Col,  Button, Table } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import styles from './dealInfo.module.scss'
import Axios from '../../util/axios'
import Api from '../../api/index'
const { RangePicker } = DatePicker;

class dealsInfoManage extends PureComponent {
  formRef = React.createRef()
  constructor() {
    super();
    this.state = {
      loaded: false,
      dealLists: [],
      num: '',
      value: ''
    }
  }

  into(page,limit,val) {
    let url,data;
    if (val=='') {
      url = Api.deals.getDeals;
      data={
        limit: limit,
        page: page,
      }
    }else{
      url = Api.deals.searchDeals;
      data={
        limit: limit,
        page: page,
        transactionName: val.transactionName,
        transactionSerial: val.transactionSerial,
      }
    }
    Axios({
      url: url,
      params: data,
      isDev: 1
    })
      .then((res) => {
        console.log(res)
        if (res.status== 200) {
          this.setState({
            dealLists: res.data.data,
            loaded: true,
            num: res.data.count
          })
        } else {
        }
      })
  }
  componentDidMount() {
    this.into(1,5,this.state.value);
  }
  range=(start, end)=> {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  disabledDate=(current)=> {
    return current && current >= moment().endOf('day');
  }
  disabledRangeTime=(current, type)=> {   
    let today = moment().date();
    let minute = Number(moment().minutes())
    let hour = Number(moment().hour());
    let second = Number(moment().second());
    let startTime;
      startTime = moment(current)
      if (today === moment(current).date()) {
        if (current.hour() === hour) {
          return {
            disabledHours: () => this.range(hour+1, 24),
            disabledMinutes: () => this.range(minute+1, 60),
            disabledSeconds: () => this.range(second+1, 60),  
          };
        } else if (current.hour() < hour) {
          return {
            disabledHours: () => this.range(hour+1, 24),
            disabledMinutes: () => this.range(60, 1),
            disabledSeconds: () => this.range(60, 1),
          };
        }
      }
      else{
        return {
          disabledHours: () => this.range(24, 1),
          disabledMinutes: () => this.range(60, 1),
          disabledSeconds: () => this.range(60, 1),
        };
      }       
  }
  getPageContent=(page,limit)=>{
    console.log(page, limit);
    this.into(1,5,this.state.value);
  }
  // 提交搜索信息
  onFinish = values => {    
    this.setState({
      value:values
    },()=>{
      this.into(1,5,this.state.value);
    })
  };
  // 重置搜索框
  delSearch = () => {
    this.formRef.current.resetFields();
    this.setState({
      value:''
    },()=>{
      this.into(1,5,this.state.value);
    })
  };
  // 时间戳转换为yyyy-mm-dd hh:mm:ss格式
  timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y+M+D+" "+h+m+s;
}
  render() {
    const { dealLists } = this.state;
    const columns = [
      {
        title: '交易用户',
        width: 120,
        dataIndex: 'transactionname',
        key: 'transactionname',
        fixed: 'left',
      },
      {
        title: '交易类型',
        width: 120,
        dataIndex: 'transactiontype',
        key: 'transactiontype',
        fixed: 'left',
      },
      {
        title: '核桃币',
        dataIndex: 'transactionmoney',
        key: 'transactionmoney',
        width: 100,
      },
      {
        title: '交易时间',
        dataIndex: 'transactiontime',
        key: 'transactiontime',
        width: 180,
        // render: (text) =>new Date(parseInt(text)).toLocaleString().replace(/:\d{1,2}$/,' ')
        render: (text) => this.timestampToTime(text)
      },
      {
        title: '交易流水号',
        dataIndex: 'transactionserial',
        key: 'transactionserial',
        width: 120,
      },
      {
        title: '交易状态',
        dataIndex: 'transactionstatus',
        key: 'transactionstatus',
        width: 120,
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
            <Col span={8}>
              <Form.Item
                label="用户姓名"
                name="transactionName"
                // rules={[{ required: true, message: '请输入姓名!' }]}
                >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="交易流水号"
                name="transactionSerial"
                // rules={[{ required: true, message: '请输入流水号!' }]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
{/*             
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
            </Col> */}
            <Col span={8}>
              <Form.Item className={styles.btn}>
                <Button onClick={this.delSearch} style={{marginRight: '30px'}}>重置</Button>
                <Button type="primary" htmlType="submit">搜索</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {/* 交易列表 */}
        <div className={styles.dealList}>
          <div className={styles.listTitle}>
            <h1>交易列表</h1>
            <span className={styles.allNum}>(共<span></span>条记录)</span>
            <Button type="primary">导出</Button>
          </div>
          {this.state.loaded && (
            <Row justify="start">
              <Col span={24} >
                <Table columns={columns} dataSource={dealLists} bordered size="middle" rowKey="id" 
                pagination={{ pageSize: 5, total:this.state.num , onChange:this.getPageContent}}/>
              </Col>
            </Row>
          )}
        </div>
      </div>
    )
  }
}

export default dealsInfoManage
