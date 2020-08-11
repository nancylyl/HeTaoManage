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
    })
      .then((res) => {
          console.log(res);
        const data = res.data;
         console.log(data.data);

        if (data.success) {
          this.setState({
            detail: data.data,
            loaded: true
          })
        }

      })
  }
  getImges = (() => {
    const images = this.state.detail.images;

    return images.map((item, index) => <img src={item.ImageUrl} key={index} style={{ width: '200px', height: '200px' }} />
    )

  })
  render() {
    const { loaded, detail } = this.state
    const { CreateTime, Content, images } = detail
    return (
      loaded && <div className={styles.logDetail}>
        <Card type="inner" title={<h1 className={styles.title}>病情日志信息</h1>}  >

          <Row>
            <Col span={24} >
              <div className={styles.contentDate}>纪录时间:{CreateTime}</div>
            </Col>
          </Row>
          <Row>
            <Col span={24} className={styles.contenttitle}> 纪录内容
            <div className={styles.logContent}>
                {Content}
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
