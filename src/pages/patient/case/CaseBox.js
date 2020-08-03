import React, { Component } from 'react'
import { Card, Row, Col, Modal, Tabs, Button } from 'antd';
import { Link } from 'react-router-dom'
import styles from './style.module.scss'
import Axios from '../../../util/axios'
import Api from '../../../api/index'
import CaseDetail from './components/CaseDetail'
import MedicalRecord from './MedicalRecord'
import CaseRecord from './components/CaseRecord'/* 发作次数 */
import CaseCondition from './components/CaseCondition'/* 症状纪录 */
import CaseLog from './CaseLog'/* 发作日志 */
const { TabPane } = Tabs;

export default class index extends Component {
  state = {
    userInfo: {
      userName: '张山',
      sex: '女',
      age: 30,
      address: '北京市海定区',
      birthday: "1978-01-12",
      phone: '15802957281',
      associatedDay: '459天'

    }
  }
  render() {
    const { userName, sex, age, address, birthday, phone, associatedDay } = this.state.userInfo
    return (
      <div className={styles.addcase}>
        <Card type="inner" title={<h1 className={styles.title}>患者信息</h1>}  >
          <Row gutter={16} className={styles.baseInfoRow}>
            <Col span={6}>
              <div className={styles.showdiv}>姓名：{userName}</div>
            </Col>
            <Col span={6}>
              <div className={styles.showdiv} >性别：{sex}</div>
            </Col>
            <Col span={6}>
              <div className={styles.showdiv}>患病年龄：{age}岁</div>
            </Col>
            <Col span={6}>
              <div className={styles.showdiv}>现居住地:{address}</div>
            </Col>
          </Row>
          <Row gutter={16} className={styles.baseInfoRow}>
            <Col span={6}>
              <div className={styles.showdiv}>出生年月:{birthday}</div>
            </Col>
            <Col span={6}>
              <div className={styles.showdiv}>手机号{phone}</div>
            </Col>
            <Col span={6}>
              <div className={styles.showdiv}>管理天数:{associatedDay}</div>
            </Col>
          </Row>
        </Card>
        <Tabs type="card" size="large" className={styles.titleTabs}>
          <TabPane tab="基本病历" key="1" >
            <CaseDetail />
          </TabPane>
          <TabPane tab="就诊记录" key="2">
            <MedicalRecord />
          </TabPane>
          <TabPane tab="发作次数纪录" key="3">
            <CaseRecord />
          </TabPane>
          <TabPane tab="症状纪录" key="4">
            <CaseCondition />
          </TabPane>
          <TabPane tab="症状日志" key="4">
            <CaseLog />
          </TabPane>
        </Tabs>


        <Row>
          <Col span={24} style={{ textAlign: "center", marginTop: '20px' }}>
            <Link to='/index/patient/patientList'>
              <Button type="primary" >
                返回
                </Button>
            </Link>
          </Col>
        </Row>
      </div>
    )
  }
}
