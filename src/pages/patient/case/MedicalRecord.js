import React, { PureComponent } from 'react'
import Axios from '../../../util/axios'
import Api from '../../../api/index'
import { message, Button, Table, Typography } from 'antd';
import styles from './style.module.scss'
import { Link } from 'react-router-dom';
const { Title } = Typography;

export default class MedicalRecord extends PureComponent {
  constructor() {
    super();
    this.state = {
      mList: [],
      loaded: false,
      // id:this.props.match.params.id > 0 ? 1: 0,
      id: 1,
      UId: 0
    }

  }
  getDiscussList(values) {
    let id = this.state.id;
    Axios({
      url: Api.addCase.getMedicalRecord,
      method: "POST",
      UId: 1,
      data: { id: id }
    })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          this.setState({
            mList: res.data.data.MedicalRecord,
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

    const { mList, loaded, total, UId } = this.state;
    console.log(mList);
    const columns = [
      {
        title: '就诊次数',
        dataIndex: 'Count',
        align: 'center',
        key: 'Count',
        width: '120px'
      },
      {
        title: '就诊时间',
        dataIndex: 'CreateTime',
        align: 'center',
        key: 'CreateTime',
      },
      {
        title: '就诊医院',
        dataIndex: 'Hospital',
        align: 'center',
        key: 'Hospital',

      },
      {
        title: '就诊医生',
        dataIndex: 'Recorder',
        align: 'center',
        key: 'Doctor',

      },
      {
        title: '记录人',
        dataIndex: 'Recorder',
        align: 'center',
        key: 'Recorder',

      },
      {
        title: '操作',
        key: 'operation',
        align: 'center',
        width: 150,
        render: (text, record) => <span className={styles.tableLink}>
          <Link to={`/index/patient/CaseDetail/` + record.Id}>查看</Link>
          <Link to={`/index/patient/AddCase/` + record.Id}>编辑</Link>
        </span>,
      },
    ];

    return (

      <div>
        <div style={{ textAlign: "right", margin: "30px" }} >

          <Link to={`/index/patient/AddCase/` + UId}>
            <Button type="primary" >
              新增就诊记录
          </Button>
          </Link>
        </div>
        {this.state.loaded && (
          <Table
            columns={columns}
            dataSource={mList}
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