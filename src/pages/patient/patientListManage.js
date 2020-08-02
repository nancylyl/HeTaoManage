import React, { PureComponent } from 'react'
import { Table, Tag, Space } from 'antd';
import Axios from '../../util/axios'
import Api from '../../api/index'
import { Link } from 'react-router-dom'

class patientListManage extends PureComponent {


  constructor(props) {
    super(props);

    this.state = {

    }
  }

  getpatientList = () => {
    Axios({
      url: Api.patients.getpatientList,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          dataSource: res.data.data.patients
        })
        let num = res.data.data.patients.length
      })
  }
  componentDidMount() {


    this.getpatientList();
    //构造一些初始数据



  }

  render() {

    const columns = [
      {
        title: '患者姓名',
        dataIndex: 'P_Name',
        key: 'P_Name',
        align: 'center',
      },
      {
        title: '患者性别',
        dataIndex: 'Sex',
        key: 'Sex',
        align: 'center',
        render: text => text > 0 ? '男' : '女'
      },
      {
        title: '现居住地址',
        dataIndex: 'P_address',
        key: 'P_address',
        align: 'center',
      },
      {
        title: '上次就诊时间',
        dataIndex: 'clinicalTime',
        key: 'clinicalTime',
        align: 'center',
      },
      {
        title: '病历填写程度',
        dataIndex: 'medical',
        key: 'medical',
        align: 'center',
        render: text => text > 0 ? '已填写' : '未填写'
      },
      {
        title: '绑定的医生',
        dataIndex: 'bindDoctor',
        key: 'bindDoctor',
        align: 'center',
      },
      // {
      //   title: 'Tags',
      //   key: 'tags',
      //   dataIndex: 'tags',
      //   render: tags => (
      //     <>
      //       {tags.map(tag => {
      //         let color = tag.length > 5 ? 'geekblue' : 'green';
      //         if (tag === 'loser') {
      //           color = 'volcano';
      //         }
      //         return (
      //           <Tag color={color} key={tag}>
      //             {tag.toUpperCase()}
      //           </Tag>
      //         );
      //       })}
      //     </>
      //   ),
      // },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (text, record) => (

          <Space size="middle">
            <a>查看</a>
            <a>编辑</a>
            <a>更换医生</a>
            <Link to="/index/patient/Addcase/1">  {record.medical > 0 ? '病历' : <a>新增病历</a>}</Link>
          </Space>
        ),
      },
    ]
    return (
      <div style={{ textAlign: "left" }}>
        <h3>患者列表：<span style={{ fontSize: 9 }}>(共条记录)</span></h3>
        <Table columns={columns} dataSource={this.state.dataSource} pagination={{ pageSize: 10 }} bordered rowKey="P_ID"></Table>
      </div>
    )
  }
}

export default patientListManage
