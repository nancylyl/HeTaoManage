import React, { PureComponent } from 'react'
import {Link} from "react-router-dom"
import { Modal, Form, Input, DatePicker, Row, Col, Select, Button, Table} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import styles from './style.module.scss'
import Axios from '../../util/axios'
import Api from '../../api/index'
import AddDiscuss from './AddDiscuss';



class discussManage extends PureComponent {
  constructor(){
    super();
    this.state={
      discussLists:[],
      loaded: false,
      visible: false,
      modalTitle: '',
      storeState:{
        // discussId: '',
        // discussName: '',
        // joinNumber: '',
        // discussStart: '',
        // enrollStart: '',
        // enrollEnd: '',
        // moneyType: '',
        // AttendMoney: '',
        // host: '',
        // inviteGuests: '',
        // discussState: '',
        // cancelStart: '',
        // discussEnd: '',
        // continueTime: '',
        // cancelReason: '',
        // patietInfo: '',
        // explain: '',
      },
    }
  } 
  getDiscussList(values){
    Axios({
      url: Api.discuss.getDiscussList,
      data: values,
      method: 'post',
    })
      .then((res) => {
        // console.log(res.data.data)
        if (res.data.success) {
          // this.setState.loaded = true
          this.setState({
            discussLists:res.data.data,
            loaded: true,
          })
        } else {   
        }
      })     
  }
  UNSAFE_componentWillMount(){
    this.getDiscussList();
  }
// 提交搜索信息
  onFinish = values => {
    this.getDiscussList(values);
    // const {form} = this.props;
    console.log(values);
    // this.props.form.resetFields();

  };
// 重置搜索框
  delSearch = () => {
    // console.log(this.from);
    // this.props.form.resetFields();
    // this.form.setFieldsValue()
    // console.log('Failed:', errorInfo);
  };
  // ====================新增探讨,编辑探讨弹框====================
  showModal = (title,  record) => {
    console.log( record);
    if( record !== 0){
      this.setState({
        modalTitle: title,
        storeState:  record,
        visible: true,
      })
    } else {
      // console.log(111111111);
      this.setState({
        modalTitle: title,
        visible: true,
      })
    }
  };
  // 提交表单
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
    
  };
  // 关闭弹框
  handleCancel = e => {
    this.setState({
      visible: false,
    });
    // console.log(this.state.storeState);
  };
  // 查看探讨
  checkDiscuss= () => {
    
  };
  // 取消探讨
  cancleDiscuss= ( record) => {
    console.log(record);

  };


  render() {
    // const { getFieldDecorator } = this.props.form;
    const { discussLists } = this.state;
    const { Option } = Select;
    // console.log(this.props.form);
    // 表格
    const columns = [
      {
        title: '探讨名称',
        width: 150,
        dataIndex: '探讨名称',
        key: 'name',
        fixed: 'left',
      },
      {
        title: '参加人数',
        width: 80,
        dataIndex: '参加人数',
        key: 'age',
        fixed: 'left',
      },
      {
        title: '探讨开始时间',
        dataIndex: '探讨开始时间',
        key: '1',
        width: 150,
      },
      {
        title: '报名开始时间',
        dataIndex: '报名开始时间',
        key: '2',
        width: 150,
      },
      {
        title: '报名结束时间',
        dataIndex: '报名结束时间',
        key: '3',
        width: 150,
      },
      {
        title: '参会金额',
        dataIndex: '参会金额',
        key: '4',
        width: 80,
      },
      {
        title: '主持人',
        dataIndex: '主持人',
        key: '5',
        width: 80,
      },
      {
        title: '邀请嘉宾',
        dataIndex: '邀请嘉宾',
        key: '6',
        width: 150,
      },
      {
        title: '探讨状态',
        dataIndex: '探讨状态',
        key: '7',
        width: 80,
      },
      { 
        title: '取消时间', 
        dataIndex: '取消时间', 
        width: 150,
        key: '8' 
      },
      {
        title: '结束时间',
        dataIndex: '结束时间',
        key: '9',
        width: 150,
      },
      {
        title: '取消理由',
        dataIndex: '取消理由',
        key: '10',
        width: 130,
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 150,
        render: (text, record) => <span><Link to={``}>查看</Link><a onClick={this.showModal.bind(this,'编辑病历探讨', record)}>编辑</a><a onClick={this.cancleDiscuss.bind(this, record)}>取消</a></span>,
      },
    ];   


    const data = [];
    for (let i = 0; i < discussLists.length; i++) {
      data.push({
        key: discussLists[i].discussId,
        探讨名称: discussLists[i].discussName,
        参加人数: discussLists[i].joinNumber,
        探讨开始时间: discussLists[i].discussStart,
        报名开始时间: discussLists[i].enrollStart,
        报名结束时间: discussLists[i].enrollEnd,
        费用类型: discussLists[i].moneyType,
        参会金额: discussLists[i].AttendMoney,
        主持人: discussLists[i].host,
        邀请嘉宾: discussLists[i].inviteGuests,
        探讨状态: discussLists[i].discussState,
        取消时间: discussLists[i].cancelStart,
        结束时间: discussLists[i].discussEnd,
        持续时间: discussLists[i].continueTime,
        取消理由: discussLists[i].cancelReason,
        会诊患者信息: discussLists[i].patietInfo,
        探讨说明: discussLists[i].explain,
      });
    }   
    return (
        <div>
          {/* 搜索栏 */}
          
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            className = {styles.search}
          >
            <Row justify="start" gutter={[20, 20]}>
              <Col span={6}>
                <Form.Item
                  label="探讨名称"
                  name="discussName"
                >
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="主持人"
                  name="host"
                >
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item 
                  label="探讨状态"
                  name="discussState"
                >
                  <Select defaultValue="请选择"  allowClear className = {styles.select} >
                    <Option value="-1">请选择</Option>
                    <Option value="0">未开始</Option>
                    <Option value="1">已取消</Option>
                    <Option value="2">开始中</Option>
                    <Option value="3">已结束</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="报名开始时间"
                  name="enrollStart"
                >
                  <DatePicker locale={locale} showTime />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="报名结束时间"
                  name="enrollEnd"
                >
                  <DatePicker locale={locale} showTime />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="取消时间"
                  name="cancelStart"
                >
                  <DatePicker locale={locale} showTime />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="结束时间"
                  name="discussEnd"
                >
                  <DatePicker locale={locale} showTime/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item >
                  <Button onClick={this.delSearch}>重置</Button>
                  <Button type="primary" htmlType="submit">搜索</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
  
          {/* 探讨列表 */}
          <div className = {styles.discussList}>
            <div className = {styles.listTitle}>
              <h1>探讨列表</h1> 
              <span className = {styles.allNum}>(共<span>{discussLists.length}</span>条记录)</span>
             
              <Button type="primary" onClick={this.showModal.bind(this,'新增病例探讨',0)}>新增探讨</Button>
            </div>
            {this.state.loaded && (
            <Table columns={columns} dataSource={data} bordered size="middle" scroll={{ x: 1650 }}/>
            )}
          </div>
          {/* ================新增病例探讨弹框======================*/}
          <Modal
              title={this.state.modalTitle}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              // okButtonProps={{ disabled: true }}
              // cancelButtonProps={{ disabled: true }}
              footer={null}
              className={styles.addBox}
            >
              <AddDiscuss cancel={this.handleCancel} submit={this.handleOk}></AddDiscuss>
          </Modal>    
          
        </div>
    )
}
}
// discussManage = Form.active({name:"basic"})(discussManage)
export default discussManage
