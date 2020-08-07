import React, { PureComponent } from 'react'
import { Card, Row, Col, Modal, Tabs, Button, Table } from 'antd';
import { Link } from 'react-router-dom'
import styles from '../patient/case/style.module.scss'
import './doctorManage.scss'
import Axios from '../../util/axios'
import Api from '../../api/index'
import PatientList from './PatientList'
import CaseStudy from './CaseStudy'
import PatientEducation from './PatientEducation'
import ClinicalActivities from './ClinicalActivities'
import TradingInformation from './TradingInformation'
import { inject, observer } from 'mobx-react'

const { TabPane } = Tabs;

@inject('caseTabs')
@observer

class checkDoctor extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            doctorInfo: [],
        }
    }

    state = {
        chanageCard(actionKey) {
            console.log(actionKey)
        }
    }
    componentWillMount() {
        console.log(this.props.location.state)
        this.setState ({
            doctorInfo: this.props.location.state,
        })
    }

    render() {
        const {doctorInfo} = this.state

        const { caseTabs: userRoot } = this.props

        const { getActiveIndex, setActiveIndex } = userRoot

        console.log(getActiveIndex());

        return (
            <div className={styles.addcase}>
                <Card type="inner" title={<h1 className={styles.title}>医生信息</h1>}  >
                    <Row gutter={16} className={styles.baseInfoRow}>
                        <Col span={6}>
                            <div className={styles.showdiv}>医生姓名：{doctorInfo.Name}</div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.showdiv} >性别：{doctorInfo.sex}</div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.showdiv}>从业经验：{doctorInfo.experience}</div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.showdiv}>所属医院:{doctorInfo.hospital}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} className={styles.baseInfoRow}>
                        <Col span={6}>
                            <div className={styles.showdiv}>职称: {doctorInfo.profession}</div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.showdiv}>科室: {doctorInfo.subject}</div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.showdiv}>手机号: {doctorInfo.phonenumber}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} className={styles.baseInfoRow}>
                        <Col span={6}>
                            <div className={styles.showdiv}>资格证:
                                <img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596602737144&di=6f819c7d71e784f736041dfb2a61c963&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20181205%2Fb811fbf0f17546bd9bc1cfb29a0fb5ef.jpeg' alt="" id='showImg'/>
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Tabs type="card" size="large"
                      className={styles.titleTabs}
                      defaultActiveKey={getActiveIndex().activeIndex}
                      onTabClick={(key) => {
                          setActiveIndex(key)
                      }}
                >
                    <TabPane tab="患者列表" key="1" >
                        <PatientList/>
                    </TabPane>
                    <TabPane tab="病例探讨" key="2">
                        <CaseStudy/>
                    </TabPane>
                    <TabPane tab="患者教育" key="3" >
                        <PatientEducation/>
                    </TabPane>
                    <TabPane tab="诊疗活动" key="4">
                        <ClinicalActivities/>
                    </TabPane>
                    <TabPane tab="交易信息" key="5">
                        <TradingInformation/>
                    </TabPane>
                </Tabs>
                <Row>
                    <Col span={24} style={{ textAlign: "center", marginTop: '20px' }}>
                        <Link to='/index/hospitalInfo/doctor'>
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

export default checkDoctor
