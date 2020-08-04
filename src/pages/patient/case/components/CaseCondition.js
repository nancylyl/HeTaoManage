import React, { Component } from 'react'
import { Tabs } from 'antd'
import styles from '../style.module.scss'
import { ConditionChart } from './ConditionChart';
/*症状纪录 */
const { TabPane } = Tabs

/* 症状纪录 */
export default class CaseCondition extends Component {
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
            <ConditionChart flag={1} />
          </TabPane>
          <TabPane tab="周" key="2">
            <ConditionChart flag={2} />
          </TabPane>
          <TabPane tab="月" key="3">
            <ConditionChart flag={3} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
