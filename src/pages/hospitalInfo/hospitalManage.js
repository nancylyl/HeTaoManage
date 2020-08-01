import React, { PureComponent } from 'react';
import Axios from '../../util/axios'
import Api from '../../api/index'

import { Row, Col, Input, Select, DatePicker, Table, Button,Space,Pagination, } from 'antd';
import './hospitalManage.scss'
import {action} from "mobx";

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}
function onChange(date, dateString) {
  console.log(date, dateString);
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'hosId',
    key:'hosId',
    align: 'center',
  },
  {
    title: '医院名称',
    dataIndex: 'hosName',
    align: 'center',
  },
  {
    title: '医院别名',
    dataIndex: 'aliasName',
    align: 'center',
  },
  {
    title: '医院地址',
    dataIndex: 'hosAddress',
    align: 'center',
  },
  {
    title: '医院等级',
    dataIndex: 'hosLevel',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'creatDate',
    align: 'center',
  },
  {
    title: '已有医生',
    dataIndex: 'haveDoc',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: '操作',
    align: 'center',
    render: () =>
        <Space size="middle">
          <a>查看</a>
          <a>编辑</a>
        </Space>,
  },
];

{/*const data = [*/}
//   {
//     key: '1',
//     ID: '800702971',
//     医院名称: '北京癫痫医院',
//     医院别名: '北京癫痫',
{/*    医院地址: '北京市海淀区万寿路23号院',*/}
{/*    医院等级: '二级甲等',*/}
{/*    创建时间: '2017-11-12',*/}
{/*    已有医生: '11名',*/}
//     操作: '查看     编辑',
//   },
//   {
{/*    key: '1',*/}
//     ID: '800702971',
//     医院名称: '北京癫痫医院',
{/*    医院别名: '北京癫痫',*/}
{/*    医院地址: '北京市海淀区万寿路23号院',*/}
{/*    医院等级: '二级甲等',*/}
//     创建时间: '2017-11-12',
//     已有医生: '11名',
//     操作: '查看     编辑',
//   },{
//     key: '1',
//     ID: '800702971',
//     医院名称: '北京癫痫医院',
//     医院别名: '北京癫痫',
//     医院地址: '北京市海淀区万寿路23号院',
//     医院等级: '二级甲等',
//     创建时间: '2017-11-12',
//     已有医生: '11名',
//     操作: '查看     编辑',
//   },{
//     key: '1',
//     ID: '800702971',
//     医院名称: '北京癫痫医院',
//     医院别名: '北京癫痫',
//     医院地址: '北京市海淀区万寿路23号院',
//     医院等级: '二级甲等',
//     创建时间: '2017-11-12',
//     已有医生: '11名',
//     操作: '查看     编辑',
//   },{
//     key: '1',
//     ID: '800702971',
//     医院名称: '北京癫痫医院',
//     医院别名: '北京癫痫',
//     医院地址: '北京市海淀区万寿路23号院',
//     医院等级: '二级甲等',
//     创建时间: '2017-11-12',
//     已有医生: '11名',
//     操作: '查看     编辑',
//   },{
//     key: '1',
//     ID: '800702971',
//     医院名称: '北京癫痫医院',
//     医院别名: '北京癫痫',
//     医院地址: '北京市海淀区万寿路23号院',
//     医院等级: '二级甲等',
//     创建时间: '2017-11-12',
//     已有医生: '11名',
//     操作: '查看     编辑',
//   },{
//     key: '1',
//     ID: '800702971',
//     医院名称: '北京癫痫医院',
//     医院别名: '北京癫痫',
//     医院地址: '北京市海淀区万寿路23号院',
//     医院等级: '二级甲等',
//     创建时间: '2017-11-12',
//     已有医生: '11名',
//     操作: '查看     编辑',
//   },{
//     key: '1',
//     ID: '800702971',
//     医院名称: '北京癫痫医院',
//     医院别名: '北京癫痫',
//     医院地址: '北京市海淀区万寿路23号院',
//     医院等级: '二级甲等',
//     创建时间: '2017-11-12',
//     已有医生: '11名',
//     操作: '查看     编辑',
//   },{
//     key: '1',
//     ID: '800702971',
//     医院名称: '北京癫痫医院',
//     医院别名: '北京癫痫',
//     医院地址: '北京市海淀区万寿路23号院',
//     医院等级: '二级甲等',
//     创建时间: '2017-11-12',
//     已有医生: '11名',
//     操作: '查看     编辑',
//   },{
//     key: '1',
//     ID: '800702971',
//     医院名称: '北京癫痫医院',
//     医院别名: '北京癫痫',
//     医院地址: '北京市海淀区万寿路23号院',
//     医院等级: '二级甲等',
//     创建时间: '2017-11-12',
//     已有医生: '11名',
//     操作: '查看     编辑',
//   },{
//     key: '1',
//     ID: '800702971',
//     医院名称: '北京癫痫医院',
//     医院别名: '北京癫痫',
//     医院地址: '北京市海淀区万寿路23号院',
//     医院等级: '二级甲等',
//     创建时间: '2017-11-12',
//     已有医生: '11名',
//     操作: '查看     编辑',
//   },
// ];

class hospitalManage extends PureComponent {
  constructor(props) {
    super(props);
    this.state={

    }
  }

  gethospital = () => {
      Axios({
        url: Api.hospital.gethospital,
      })
    .then((res) => {
      console.log(res)
      this.setState({
        dataSource : res.data.data.hospitalList
      })
      console.log(res.data.data.hospitalList.length)
      var listNum=res.data.data.hospitalList.length
    })
  }
  componentWillMount() {
    this.gethospital();
  }

  render() {
    return (
      <div>
        <Row align='middle' justify='start'>
          <Col span={2} align='left'>医院名称</Col>
          <Col span={4} align='left'><Input placeholder="请输入" /></Col>
          <Col span={2}>医院等级</Col>
          <Col span={3}>
            <Select defaultValue="全部" style={{ width: 120 }} onChange={handleChange}>
              <Option value="全部">全部</Option>
              <Option value="一级甲等">一级甲等</Option>
              <Option value="二级甲等">二级甲等</Option>
              <Option value="三级甲等">三级甲等</Option>
            </Select>
          </Col>
          <Col span={2}>医院地址</Col>
          <Col span={2}><Input placeholder="请输入" /></Col>
          <Col span={2}>医院别名</Col>
          <Col span={2}><Input placeholder="请输入" /></Col>
          <Col span={2}>创建时间</Col>
          <Col span={3}><DatePicker onChange={onChange} placeholder="" /></Col>
        </Row>
        <Row align='center' className='marginT'>
          <Col span={2}>
            <Button>重置</Button>
          </Col>
          <Col span={2}>
            <Button type="primary">搜索</Button>
          </Col>
        </Row>
        <Row>
          <Col span={5} align='left' className='title'>
            <span className='titleB'>医院列表</span>
            <span className='titleS'>（共90条记录）</span>
          </Col>
          <Col span={2} offset={17} className='marginT'>
            <Button type="primary">新增医院</Button>
          </Col>
        </Row>
        <Table
            columns={columns}
            dataSource={this.state.dataSource}
            bordered
            pagination={{ pageSize: 9}}
            rowKey="hosId"
        />
      </div>
    )
  }
}

export default hospitalManage
