import React, { Component } from 'react'
import { Form, Input, DatePicker, Row, Col, Select, Button,TreeSelect } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import styles from './style.module.scss'



class  AddDiscuss extends Component {
  constructor(){
    super();
    this.state = {
      startTime: '',
      endTime: '',
      value: ['0-0-0'],
    }
  } 

  // ==============================日期选择器限制条件设置===========================
  changeTime =(val, dateStrings, type)=> {
    // console.log(val);
    if (type === 'startTime') {
      this.setState({startTime: dateStrings});
    } else if(type === 'endTime'){
      this.setState({endTime: dateStrings});
    }
  }
  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
   // 报名开始时间
  disabledStartDate=(current)=>{
    const { endTime } = this.state;
    if(endTime !== ''){
      // console.log( moment(endTime).subtract(1, 'hour'));
        // 核心逻辑: 开始日期不能晚于结束日期，且比当前时间大1小时
        return current >= moment(endTime).add(1, 'hours') || current < moment().startOf('day');
    }
   
  }
   // 报名结束时间
  disabledEndDate=(current)=>{
    const { startTime } = this.state;
    if ( startTime!== '') {
        // 核心逻辑: 结束日期不能小余开始日期后1小时，且不能早于开始日期
        // console.log(startTime);
        // console.log(moment(startTime));
      return current && current <= moment(startTime).startOf('day');
    }
  }
  // 探讨开始时间
  disabledDate=(current)=>{
    const { endTime } = this.state;
    if(endTime !== ''){
      // console.log( moment(endTime).subtract(1, 'hour'));
        // 核心逻辑: 开始日期不能晚于结束日期，且比当前时间大1小时
        return current && current <= moment(endTime).startOf('day');
    }
  }
  // 报名开始时间
  disabledStartDateTime = (current) => {
    if(current){
      let today = moment().date();
      if(today === current.date()){
        let minute = Number(moment().minutes())
        let hour = Number(moment().hour());
        let finalHour:number,finalMinute:number;
        if (current.hour() === hour + 1) {
          finalMinute = minute+1; 
        } else if (current.hour() > hour + 1) {
          finalMinute = 0; 
        }
        else {
          if (current.minute() >= 59) {
            finalHour = hour + 1;
            finalMinute = 0; 
          } else {
            finalHour = hour + 1;
            finalMinute = minute + 1;
          }
        }
        return {
          disabledHours: () => this.range(0, finalHour),
          disabledMinutes: () => this.range(0, finalMinute)
        }
      }
    }else{
      return {
        disabledHours: () => this.range(0, 24),
        disabledMinutes: () => this.range(0, 60),
        disabledSeconds: () => this.range(0, 60),
      }
    }
  }
  // 报名结束时间
  disabledEndDateTime = (current) => {
    const { startTime } = this.state;
    if(current){
      let today = startTime.substr(8,2);
      if(today == current.date()){
        let minute = Number((startTime.substr(14,2)))
        let hour = Number((startTime.substr(11,2)));
        let finalHour:number,finalMinute:number;
        if (current.hour() === hour + 1) {
          finalMinute = minute+1; 
        } else if (current.hour() > hour + 1) {
          finalMinute = 0; 
        }
        else {
          if (current.minute() >= 59) {
            finalHour = hour + 1;
            finalMinute = 0; 
          } else {
            finalHour = hour + 1;
            finalMinute = minute + 1;
          }
        }
        return {
          disabledHours: () => this.range(0, finalHour),
          disabledMinutes: () => this.range(0, finalMinute)
        }
      }
    }else{
      return {
        disabledHours: () => this.range(0, 24),
        disabledMinutes: () => this.range(0, 60),
        disabledSeconds: () => this.range(0, 60),
      }
    }
  }
  // 探讨开始时间
  disabledDateTime = (current) => {
    const { endTime } = this.state;
    if(current){
      let today = endTime.substr(8,2);
      if(today == current.date()){
        let minute = Number((endTime.substr(14,2)))
        let hour = Number((endTime.substr(11,2)));
        let finalHour:number,finalMinute:number;
        if (current.hour() === hour + 1) {
          finalMinute = minute+1; 
        } else if (current.hour() > hour + 1) {
          finalMinute = 0; 
        }
        else {
          if (current.minute() >= 59) {
            finalHour = hour + 1;
            finalMinute = 0; 
          } else {
            finalHour = hour + 1;
            finalMinute = minute + 1;
          }
        }
        return {
          disabledHours: () => this.range(0, finalHour),
          disabledMinutes: () => this.range(0, finalMinute)
        }
      }
    }else{
      return {
        disabledHours: () => this.range(0, 24),
        disabledMinutes: () => this.range(0, 60),
        disabledSeconds: () => this.range(0, 60),
      }
    }
  }
  // ============================选择医生========================
  onChange = value => {
    console.log('onChange ', value);
    this.setState({ value });
  };

  // ============================提交新增探讨表单==============================
  onFinish =(Values)=> {
    console.log(Values);
    this.props.submit(Values)
  }
  // 关闭弹框
  delSearch =()=> {
    this.props.cancel()
  }

  render() {
    const { Option } = Select;
    const { TextArea } = Input;
    const { SHOW_PARENT } = TreeSelect;
    const treeData = [
      {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
          {
            title: 'Child Node1',
            value: '0-0-0',
            key: '0-0-0',
          },
        ],
      },
      {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [
          {
            title: 'Child Node3',
            value: '0-1-0',
            key: '0-1-0',
          },
          {
            title: 'Child Node4',
            value: '0-1-1',
            key: '0-1-1',
          },
          {
            title: 'Child Node5',
            value: '0-1-2',
            key: '0-1-2',
          },
        ],
      },
    ];
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      placeholder: '请选择',
      style: {
        width: '100%',
      },
    };
      return (
          <div>
            {/* <h1>新增病例探讨</h1> */}
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
            >
              <Row justify="start" gutter={[120, 25]}>
                <Col span={12}>
                  <Form.Item
                    label="探讨主题"
                    name="discussName"
                    rules = {[{required:true, message: '请输入!'}]}
                  >
                    <Input placeholder="请输入" maxLength="20" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="参会医生"
                    name="inviteGuests"
                    // rules = {[{required:true, message: '请选择!'}]}
                  >
                    {/* <Input placeholder="请选择" onClick={this.chooseDoc} /> */}
                    <TreeSelect {...tProps} />
                    {/* <Button className={styles.choose}>请选择</Button> */}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="主持人"
                    name="host"
                    rules = {[{required:true, message: '请输入!'}]}
                  >
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="探讨持续时间"
                    name="continueTime"
                    rules = {[{required:true, pattern: new RegExp(/(^[1-9][0-9]$)|(^100&)|(^[1-9]$)$/, "g"),message: '请输入1~99的数字!' }]}
                  >
                    <Input  placeholder="请输入1~99" suffix="小时" />
                    
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="报名开始时间"
                    name="enrollStart"
                    rules = {[{required:true, message: '请选择!'}]}
                  >
                    <DatePicker format="YYYY-MM-DD HH:mm:ss" locale={locale} showTime disabledDate={this.disabledStartDate} disabledTime={this.disabledStartDateTime} onChange={(val,dateStrings)=>this.changeTime(val,dateStrings,'startTime') } />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="报名结束时间"
                    name="enrollEnd"
                    rules = {[{required:true, message: '请选择!'}]}
                  >
                    <DatePicker locale={locale} disabledDate={this.disabledEndDate} disabledTime={this.disabledEndDateTime} showTime onChange={(val,dateStrings)=>this.changeTime(val,dateStrings,'endTime') } />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item 
                    label="探讨开始时间"
                    name="discussStart"
                    rules = {[{required:true, message: '请选择!'}]}
                  >
                    <DatePicker locale={locale} disabledDate={this.disabledDate} disabledTime={this.disabledDateTime} showTime />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="费用类型"
                    name="moneyType"
                     rules = {[{required:true, message: '请选择!'}]}
                  >
                      <Select defaultValue="请选择"  allowClear className = {styles.select} suffix="小时" >
                      <Option value="-1">请选择</Option>
                      <Option value="0">收费</Option>
                      <Option value="1">免费</Option>
                      <Option value="2">奖励</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="探讨费用"
                    name="AttendMoney"
                    rules = {[{required:true, pattern: new RegExp(/^([1-9]\d{0,2}|0)$/, "g"),message: '请输入0~999的数字!' }]}
                  >
                    <Input placeholder="请输入" suffix="核桃币" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="会诊患者信息"
                    name="patietInfo"
                    // rules = {[{required:true, message: '请选择!'}]}
                  >
                    <Button className={styles.choose}>请选择</Button>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="探讨说明"
                    name="explain"
                    rules = {[{required:true, message: '请输入!'}]}
                  >
                    <TextArea rows={4} maxLength="200" placeholder="请输入病历探讨说明"/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button className = {styles.submit} onClick={this.delSearch}>关闭</Button>
                    <Button  className = {styles.submit} type="primary" htmlType="submit">确定</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>    
          </div>
      )
  }
}
export default AddDiscuss