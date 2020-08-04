import React, { PureComponent } from 'react'
import { Modal, Form, Input, DatePicker, Row, Col, Select, Button, Tree } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import styles from './style.module.scss'
import Doctor from './components/Doctor';
const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const dataList = [];
const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(gData);

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};


class AddDiscuss extends PureComponent {
  formRef = React.createRef()
  constructor() {
    super();
    this.state = {
      startTime: '',
      endTime: '',
      visible: false,
      value: ['0-0-0'],
      modalTitle: '',
      multiple: false,
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
    }
  }
  // ==============================日期选择器限制条件设置===========================
  changeTime = (val, dateStrings, type) => {
    // console.log(val);
    if (type === 'startTime') {
      this.setState({ startTime: dateStrings });
    } else if (type === 'endTime') {
      this.setState({ endTime: dateStrings });
    }
  }
  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  // 报名开始时间
  disabledStartDate = (current) => {
    const { endTime } = this.state;
    if (endTime !== '') {
      // console.log( moment(endTime).subtract(1, 'hour'));
      // 核心逻辑: 开始日期不能晚于结束日期，且比当前时间大1小时
      return current >= moment(endTime).add(1, 'hours') || current < moment().startOf('day');
    }

  }
  // 报名结束时间
  disabledEndDate = (current) => {
    const { startTime } = this.state;
    if (startTime !== '') {
      // 核心逻辑: 结束日期不能小余开始日期后1小时，且不能早于开始日期
      // console.log(startTime);
      // console.log(moment(startTime));
      return current && current <= moment(startTime).startOf('day');
    }
  }
  // 探讨开始时间
  disabledDate = (current) => {
    const { endTime } = this.state;
    if (endTime !== '') {
      // console.log( moment(endTime).subtract(1, 'hour'));
      // 核心逻辑: 开始日期不能晚于结束日期，且比当前时间大1小时
      return current && current <= moment(endTime).startOf('day');
    }
  }
  // 报名开始时间
  disabledStartDateTime = (current) => {
    if (current) {
      let today = moment().date();
      if (today === current.date()) {
        let minute = Number(moment().minutes())
        let hour = Number(moment().hour());
        let finalHour: number, finalMinute: number;
        if (current.hour() === hour + 1) {
          finalMinute = minute + 1;
        } else if (current.hour() > hour + 1) {
          finalMinute = 0;
        }
        else {
          if (current.minute() >= 59) {
            finalHour = hour + 1;
            finalMinute = 0;
          } else {
            finalHour = hour + 1;
            finalMinute = minute + 1;
          }
        }
        return {
          disabledHours: () => this.range(0, finalHour),
          disabledMinutes: () => this.range(0, finalMinute)
        }
      }
    } else {
      return {
        disabledHours: () => this.range(0, 24),
        disabledMinutes: () => this.range(0, 60),
        disabledSeconds: () => this.range(0, 60),
      }
    }
  }
  // 报名结束时间
  disabledEndDateTime = (current) => {
    const { startTime } = this.state;
    if (current) {
      let today = startTime.substr(8, 2);
      if (today == current.date()) {
        let minute = Number((startTime.substr(14, 2)))
        let hour = Number((startTime.substr(11, 2)));
        let finalHour: number, finalMinute: number;
        if (current.hour() === hour + 1) {
          finalMinute = minute + 1;
        } else if (current.hour() > hour + 1) {
          finalMinute = 0;
        }
        else {
          if (current.minute() >= 59) {
            finalHour = hour + 1;
            finalMinute = 0;
          } else {
            finalHour = hour + 1;
            finalMinute = minute + 1;
          }
        }
        return {
          disabledHours: () => this.range(0, finalHour),
          disabledMinutes: () => this.range(0, finalMinute)
        }
      }
    } else {
      return {
        disabledHours: () => this.range(0, 24),
        disabledMinutes: () => this.range(0, 60),
        disabledSeconds: () => this.range(0, 60),
      }
    }
  }
  // 探讨开始时间
  disabledDateTime = (current) => {
    const { endTime } = this.state;
    if (current) {
      let today = endTime.substr(8, 2);
      if (today == current.date()) {
        let minute = Number((endTime.substr(14, 2)))
        let hour = Number((endTime.substr(11, 2)));
        let finalHour: number, finalMinute: number;
        if (current.hour() === hour + 1) {
          finalMinute = minute + 1;
        } else if (current.hour() > hour + 1) {
          finalMinute = 0;
        }
        else {
          if (current.minute() >= 59) {
            finalHour = hour + 1;
            finalMinute = 0;
          } else {
            finalHour = hour + 1;
            finalMinute = minute + 1;
          }
        }
        return {
          disabledHours: () => this.range(0, finalHour),
          disabledMinutes: () => this.range(0, finalMinute)
        }
      }
    } else {
      return {
        disabledHours: () => this.range(0, 24),
        disabledMinutes: () => this.range(0, 60),
        disabledSeconds: () => this.range(0, 60),
      }
    }
  }
  // ============================选择医生========================
  chooseDoc = (title, record) => {
    // console.log(record);
    // console.log(title);
    if (record == 1) {
      this.setState({
        visible: true,
        modalTitle: title,
        multiple: true
      });
    }
    else if (record == 0) {
      this.setState({
        visible: true,
        modalTitle: title,
        multiple: false
      });
    }
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
      searchValue: '',
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      searchValue: '',
    });
  };
  // onSelect = (keys, event) => {
  //   console.log(keys);
  //   console.log(event.node.title);
  // };

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  // 搜索
  onSearch = (e) => {
    const { value } = e.target;
    const expandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };
  // ============================提交新增探讨表单==============================
  onFinish = (Values) => {
    console.log(Values);
    this.props.submit(Values)
  }
  // 关闭弹框
  delSearch = () => {
    this.props.cancel()
    console.log(this.props.storeState);
  }
  onFill = () => {
    const { storeState } = this.props;

    if (storeState != undefined) {
      // console.log(storeState);
      this.formRef.current.setFieldsValue(storeState);
    }
    //获取医生信息

    // console.log(this.formRef.current.getFieldsValue());
  };
  componentDidMount() {
    // console.log('=================');
    this.onFill()
    // console.log(this.formRef.current);
  }
  handClickDoctor = (val => {
    console.log("得到医生信息");
    console.log(val);
  })
  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = data =>
      data.map(item => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
              <span>{item.title}</span>
            );
        if (item.children) {
          return { title, key: item.key, children: loop(item.children) };
        }

        return {
          title,
          key: item.key,
        };
      });
    // const { DirectoryTree } = Tree;
    const { Search } = Input;
    const { Option } = Select;
    const { TextArea } = Input;
    const { storeState } = this.props;
    const treeData = [
      {
        title: 'parent 0',
        key: '0-0',
        children: [
          { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
          { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
        ],
      },
      {
        title: 'parent 1',
        key: '0-1',
        children: [
          { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
          { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
        ],
      },
    ];

    return (
      <div>
        <Form
          name="basic"
          initialValues={storeState}
          ref={this.formRef}
          onFinish={this.onFinish}
        >
          <Row justify="start" gutter={[120, 25]}>
            <Col span={12}>
              <Form.Item
                label="探讨主题"
                name="discussName"
                rules={[{ required: true, message: '请输入!' }]}
              // initialValue={storeState.discussName}
              >
                <Input placeholder="请输入" maxLength="20" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="参会医生"
                name="inviteGuests"
                rules={[{ required: true, message: '请选择!' }]}
              >
                {/* <Input placeholder="请选择" onClick={this.chooseDoc.bind(this, "选择医生", 1)} readOnly /> */}
                {/* <TreeSelect {...tProps} /> */}
                {/* <Button className={styles.choose}>请选择</Button> */}
                <Doctor handClickDoctor={this.handClickDoctor} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="主持人"
                name="host"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input placeholder="请选择" onClick={this.chooseDoc.bind(this, "选择主持人", 0)} readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="探讨持续时间"
                name="continueTime"
                rules={[{ required: true, pattern: new RegExp(/(^[1-9][0-9]$)|(^100&)|(^[1-9]$)$/, "g"), message: '请输入1~99的数字!' }]}
              >
                <Input placeholder="请输入1~99" suffix="小时" />

              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="报名开始时间"
                name="enrollStart"
                rules={[{ required: true, message: '请选择!' }]}
              >
                <DatePicker format="YYYY-MM-DD HH:mm:ss" locale={locale} showTime disabledDate={this.disabledStartDate} disabledTime={this.disabledStartDateTime} onChange={(val, dateStrings) => this.changeTime(val, dateStrings, 'startTime')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="报名结束时间"
                name="enrollEnd"
                rules={[{ required: true, message: '请选择!' }]}
              >
                <DatePicker locale={locale} disabledDate={this.disabledEndDate} disabledTime={this.disabledEndDateTime} showTime onChange={(val, dateStrings) => this.changeTime(val, dateStrings, 'endTime')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="探讨开始时间"
                name="discussStart"
                rules={[{ required: true, message: '请选择!' }]}
              >
                <DatePicker locale={locale} disabledDate={this.disabledDate} disabledTime={this.disabledDateTime} showTime />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="费用类型"
                name="moneyType"
                rules={[{ required: true, message: '请选择!' }]}
              >
                <Select allowClear className={styles.select} suffix="小时" >
                  <Option value="">请选择</Option>
                  <Option value="0">收费</Option>
                  <Option value="1">免费</Option>
                  <Option value="2">奖励</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="探讨费用"
                name="AttendMoney"
                rules={[{ required: true, pattern: new RegExp(/^([1-9]\d{0,2}|0)$/, "g"), message: '请输入0~999的数字!' }]}
              >
                <Input placeholder="请输入" suffix="核桃币" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="会诊患者信息"
                name="patietInfo"
              // rules = {[{required:true, message: '请选择!'}]}
              >
                <Button className={styles.choose}>请选择</Button>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="探讨说明"
                name="explain"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <TextArea rows={4} maxLength="200" placeholder="请输入病历探讨说明" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button className={styles.submit} onClick={this.delSearch}>关闭</Button>
                <Button className={styles.submit} type="primary" htmlType="submit">确定</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {this.state.visible && <Modal
          title={this.state.modalTitle}
          okText="确认"
          cancelText="取消"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className={styles.smallBox}
        >
          <Row justify="start" gutter={[0, 25]}>
            <Col span={6}>
              <h3 style={{ textAlign: "right", lineHeight: '30px' }}>关键字&nbsp;&nbsp;</h3>
            </Col>
            <Col span={14}>
              <Search style={{ marginBottom: 8 }} placeholder="请输入" size="middle" onChange={this.onSearch} enterButton="搜索" />
              {/* <Search
                    placeholder="请输入"
                    enterButton="搜索"
                    size="middle"
                    onSearch={this.onSearch}
                  /> */}
            </Col>
          </Row>
          <Row justify="start" gutter={[0, 25]}>
            <Col span={12} offset={6}>
              <Tree
                multiple={this.state.multiple}
                onExpand={this.onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                treeData={loop(gData)}
                style={{ textAlign: "left" }}
              />
              {/* <DirectoryTree
                    multiple={this.state.multiple}
                    defaultExpandAll
                    onSelect={this.onSelect}
                    onExpand={this.onExpand}
                    treeData={treeData}
                    style={{ textAlign: "left"}}
                  /> */}
            </Col>
          </Row>
        </Modal>}
      </div>
    )
  }
}
export default AddDiscuss