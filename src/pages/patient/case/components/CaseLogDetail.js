import React, { PureComponent } from 'react'
import styles from '../style.module.scss'
import Axios from '../../../../util/axios'
import Api from '../../../../api/index'
import { Link } from 'react-router-dom'
import { Card, Button, Row, Col } from 'antd';
export default class CaseLogDetail extends PureComponent {
  state = {
    id: '',//
    loaded: false,
    detail: []
  }
  componentDidMount() {
    this.setState({
      id:this.props.match.params.id
    },()=>{
      this.init()
    })
  }

  init() {
    Axios({
      url: Api.addCase.getCaseLogDetail,
      params: { 
        gid: this.state.id, 
      },
      isDev : 1
    })
      .then((res) => {
          console.log(res);
        const data = res.data;
        if (res.status==200) {
          this.setState({
            detail: data.data[0],
            loaded: true
          })
        }

      })
  }
  getImges = (() => {
    const images = this.state.detail.logP;
    return images.map((item, index) => <img src={item.pictureaddress} key={index} style={{ width: '200px', height: '200px' }} />
    )

  })
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
    const { loaded, detail } = this.state
    const { logtime, logdetails, logP } = detail
    return (
      loaded && <div className={styles.logDetail}>
        <Card type="inner" title={<h1 className={styles.title}>病情日志信息</h1>}  >

          <Row>
            <Col span={24} >
              <div className={styles.contentDate}>纪录时间:{this.timestampToTime(logtime)}</div>
            </Col>
          </Row>
          <Row>
            <Col span={24} className={styles.contenttitle}> 纪录内容
            <div className={styles.logContent}>
                {logdetails}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24} className={styles.contenttitle}> 所传照片
            <div>
                {this.getImges()}
              </div>

            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "center", marginTop: '20px' }}>
              <Link to='/index/patient/CaseBox'>
                <Button type="primary" >
                  返回
                </Button>
              </Link>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}
