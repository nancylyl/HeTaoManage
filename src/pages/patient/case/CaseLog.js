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
      UId: 0
    }

  }
  getDiscussList() {
    let UId = this.state.UId;
    Axios({
      url: Api.addCase.getCaseLog,
      method: "get",
      params: { UId: UId }
    })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          this.setState({
            logList: res.data.data.logList,
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

  render() {

    const { logList, loaded, total, UId } = this.state;
    const columns = [
      {
        title: '纪录时间',
        dataIndex: 'CreateTime',
        align: 'center',
        key: 'CreateTime',
        // width: '300px'
      },
      {
        title: '是否有视频',
        dataIndex: 'Video',
        align: 'center',
        key: 'Video',
      },
      {
        title: '是否有图片',
        dataIndex: 'Image',
        align: 'center',
        key: 'Image',

      },
      {
        title: '内容',
        dataIndex: 'Content',
        align: 'center',
        key: 'Content',

      },
      {
        title: '操作',
        key: 'operation',
        align: 'center',
        width: 150,
        render: (text, record) => <span className={styles.tableLink}>
          <Link to={`/index/patient/CaseDetail/` + record.Id}>查看</Link>
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