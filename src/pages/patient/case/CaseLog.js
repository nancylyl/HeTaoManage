import React, { PureComponent } from 'react'
import Axios from '../../../util/axios'
import Api from '../../../api/index'
import { message, Button, Table, Typography } from 'antd';
import styles from './style.module.scss'
import { Link } from 'react-router-dom';
const { Title } = Typography;

export default class CaseLog extends PureComponent {
  constructor() {
    super();
    this.state = {
      logList: [],
      loaded: false,
      // id:this.props.match.params.id > 0 ? 1: 0,
      id: 1,
      UId: 2
    }

  }
  getDiscussList() {
    let UId = this.state.UId;
    Axios({
      url: Api.addCase.getCaseLog,
      method: "get",
      params: { 
        pid: UId, 
        // limit: 8,
        // page: 1
      },
      isDev : 1
    })
      .then((res) => {
        console.log(res);
        console.log(res.data.data);
        if (res.status==200) {
          this.setState({
            logList: res.data.data,
            loaded: true,
          })
        } else {
          message.error(res.data.message);
        }
      })
  }
  componentDidMount() {
    this.getDiscussList();
  }
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
    const { logList, loaded, total, UId } = this.state;
    const columns = [
      {
        title: '纪录时间',
        dataIndex: 'logtime',
        align: 'center',
        key: 'logtime',
        // render: (text) =>new Date(parseInt(text)).toLocaleString().replace(/:\d{1,2}$/,' ')
        render: (text) => this.timestampToTime(text)
        // width: '300px'
      },
      {
        title: '是否有视频',
        dataIndex: 'Video',
        align: 'center',
        key: 'Video',
        render: (text) => '无'
      },
      {
        title: '是否有图片',
        dataIndex: 'logP',
        align: 'center',
        key: 'logP',
        render: (text) => text==null? '无':'是'
      },
      {
        title: '内容',
        dataIndex: 'logdetails',
        align: 'center',
        key: 'logdetails',

      },
      {
        title: '操作',
        key: 'operation',
        align: 'center',
        width: 150,
        render: (text, record) => <span className={styles.tableLink}>
          <Link to={`/index/patient/CaseLogDetail/` + record.id}>查看</Link>
        </span>,
      },
    ];

    return (

      <div>
        <div style={{ textAlign: "right", margin: "30px" }} >

        </div>
        {this.state.loaded && (
          <Table
            columns={columns}
            dataSource={logList}
            bordered
            pagination={{ pageSize: 10 }}
            size="middle"
            rowKey="Id"

          />
        )}

      </div>
    )
  }
}