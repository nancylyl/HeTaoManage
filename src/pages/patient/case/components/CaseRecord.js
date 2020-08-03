import React, { Component } from 'react'
import { Tabs } from 'antd'
import styles from '../style.module.scss'
import { RecordChart } from './RecordChart';
/* f发作次数 */
const { TabPane } = Tabs

/* 发作次数 */
export default class CaseRecord extends Component {
  state = {
    dayList: [],
    weekList: [],
    MonthList: [],
    loaded: false
  }
  render() {
    return (
      <div className="card-container">
        <Tabs type="card" className={styles.contentTabs}>
          <TabPane tab="日" key="1">
            <RecordChart flag={1} />
          </TabPane>
          <TabPane tab="周" key="2">
            <RecordChart flag={2} />
          </TabPane>
          <TabPane tab="月" key="3">
            <RecordChart flag={3} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
