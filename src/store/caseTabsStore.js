import { action, observable } from 'mobx'
import { Tabs } from 'antd';


const defaultData = {
  activeIndex: "1"
}

export default class caseTabsStore {
  @observable caseTabs = { ...defaultData } //用户


  @action
  getActiveIndex = () => {
    this.caseTabs.activeIndex = this.activeIndex
    return this.caseTabs

  }
  setActiveIndex = (key) => {
    this.activeIndex = key
  }
}
