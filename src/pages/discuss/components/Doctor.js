import React, { Component, PureComponent } from 'react'
import { TreeSelect, message } from 'antd';
import Axios from '../../../util/axios'
import Api from '../../../api/index'
import Item from 'antd/lib/list/Item';
const { TreeNode } = TreeSelect;
export default class Doctor extends PureComponent {
  state = {
    value: 'leaf1',
    loaded: false,
    docList: []
  }

  componentDidMount() {
    this.init();
  }
  init() {
    Axios({
      url: Api.discuss.getChooseDoc
    })
      .then((res) => {
        if (res.data.success) {
          this.setState({
            docList: res.data.data,
            loaded: true,
          })
        } else {
        }
      })
  }
  onChange = value => {
    // console.log(value);
    if (value[value.length - 1].length == 1) {
      value = value.pop();
      message.error("您不能请选择医院")
    }
    this.setState({ value })
    this.props.handClickDoctor(value);
  };
  bindDoctorTree(docList) {
    let menuArr = docList.map((item, index) => {
      return (
        <TreeNode value={item.value} key={item.value} title={item.title}>
          {item.children.length > 0 && this.getTreeNode(item.children)}
        </TreeNode>
      )
    })
    return menuArr
  }

  getTreeNode(list) {
    let chileArr = list.map((item, index) => {
      return item !== null
        ? <TreeNode value={item.value} title={item.title} key={item.value} />
        : null
    })
    return chileArr
  }
  render() {
    const { loaded, docList } = this.state
    return (
      <div>
        <TreeSelect
          showSearch
          style={{ width: '100%' }}
          // value={this.state.value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Please select"
          allowClear
          multiple
          treeDefaultExpandAll
          onChange={this.onChange}
        >
          {loaded && this.bindDoctorTree(docList)}

        </TreeSelect>
      </div>
    )
  }
}
