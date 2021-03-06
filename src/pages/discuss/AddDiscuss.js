import React, { PureComponent } from 'react'
import { Modal, message, Form, Input, DatePicker, Row, Col, Select, Button, Tree, Table, Radio } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import styles from './style.module.scss'
import Axios from '../../util/axios'
import Api from '../../api/index'
// import Doctor from '../../components/Doctor';


const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const key = node.key;
      dataList.push({key, title: node.title});
      if (node.children) {
          generateList(node.children);
      }
  }
};


const getParentKey = (title, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.title === title)) {
        parentKey = node.key;
      } else if (getParentKey(title, node.children)) {
        parentKey = getParentKey(title, node.children);
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
      isshow: false,
      value: ['0-0-0'],
      modalTitle: '',
      multiple: false,
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      storeState: {},
      treeData : [],
    }
  }

  // 调接口获得医生数据
  init() {
    Axios({
      url: Api.discuss.getChooseDoc
    })
      .then((res) => {
        if (res.data.success) {
          this.setState({
            treeData: res.data.data,
          })
        } else {
        }
      })
  }
  // ==============================日期选择器限制条件设置===========================
  changeTime = (val, dateStrings, type) => {
    const { startTime,endTime } = this.state;
    console.log(dateStrings);
    if (type === 'startTime') {
      this.setState({ startTime: dateStrings, disabled1: false });
    } 
    else if (type === 'endTime') {
      if (startTime === '') {
        console.log(111111111);
        message.error("请先选择报名开始时间")
        this.formRef.current.setFieldsValue({enrollEnd: ''})
      }
      else{
        console.log(22222222222);
        this.setState({ endTime: dateStrings });
      }
    }
    else {
      if (endTime === '' || startTime === '') {
        message.error("请先选择报名时间")
        this.formRef.current.setFieldsValue({discussStart: ''})
      }
      else{
        console.log(22222222222);
      }
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
    return current && current <= moment().startOf('day');
  }
  // 报名结束时间
  disabledEndDate = (current) => {
    const { startTime } = this.state;
    return current && current <= moment(startTime).startOf('day');
  }
  // 探讨开始时间
  disabledDate = (current) => {
    const { endTime } = this.state;
    return current && current <= moment(endTime).startOf('day');   
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
      this.setState({
        visible: true,
        modalTitle: title,
        multiple: record == 1?true:false
      });
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
    this.state.multiple == true?this.formRef.current.setFieldsValue({inviteGuests: ''}):this.formRef.current.setFieldsValue({host: ''})
  };
  onSelect = (title,keys,event) => {
    console.log(keys);
    console.log(title);
    this.state.treeData.map(item=>{
      console.log(item.title);
      for (let index = 0; index < keys.length; index++) {
        console.log(keys[index]);
        if(item.title==keys[index]){
          keys.splice(index,1)
          message.error("您不能选择医院")
        }
      }
    })
    title=='选择主持人'?this.formRef.current.setFieldsValue({host:keys}):
    this.formRef.current.setFieldsValue({inviteGuests:keys})
  };
  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  // 搜索医生
  onSearch = (e) => {
    const { value } = e.target;
    console.log(dataList);
    const expandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.title, this.state.treeData);
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

  // handClickDoctor = (val => {
  //   console.log("得到医生信息");
  //   console.log(val);
  // })
  /* ===============================选择患者====================== */
  choosePat = () => {
    this.setState({
      isshow: true,
    });
  }
  handleOk1 = e => {
    console.log(e);
    this.setState({
      isshow: false,
    });
  };
  handleCancel1 = e => {
    console.log(e);
    this.setState({
      isshow: false,
    });
  };
  patietInfo= (e) => {
    console.log(e.target.value);
    this.formRef.current.setFieldsValue({
      patietInfo:e.target.value.name
    })
  }
  // ============================提交新增探讨表单==============================
  onFinish = (Values) => {
    console.log(Values);
    this.props.submit(Values)
  }
  // 关闭弹框
  delSearch = () => {
    this.props.cancel()
  }
  onFill = () => {
    const { discussId, discussLists } = this.props;
    if (discussId != '') {
      this.setState({
        storeState: discussLists.filter( item=>discussId==item.discussId)[0]
      },()=>{
        const { storeState } = this.state;
        this.formRef.current.setFieldsValue({
          discussId: storeState.discussId,
          discussName: storeState.discussName,
          joinNumber: storeState.joinNumber,
          discussStart: moment(storeState.discussStart),
          enrollStart: moment(storeState.enrollStart),
          enrollEnd:  moment(storeState.enrollEnd),
          moneyType: storeState.moneyType,
          AttendMoney: storeState.AttendMoney,
          host: storeState.host,
          inviteGuests: storeState.inviteGuests,
          discussState: storeState.discussState,
          cancelStart: storeState.cancelStart,
          discussEnd: storeState.discussEnd,
          continueTime: storeState.continueTime,
          cancelReason: storeState.cancelReason,
          patietInfo: storeState.patietInfo,
          explain: storeState.explain,
        });
        }) 
    }
  };
  componentDidMount() {
    // console.log('=================');
    this.onFill()
    this.init();
  }
  
  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    generateList( this.state.treeData);
    const loop = data =>
      data.map(item => {
        // console.log(item);
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
          return { title, key: item.title, children: loop(item.children) };
        }

        return {
          title,
          key: item.title,
        };
      });
    // const { DirectoryTree } = Tree;
    const { Search } = Input;
    const { Option } = Select;
    const { TextArea } = Input;
    const columns = [
      {
        dataIndex: 'img',
        render: text => <img src={require(`../../assets/images/3.png`)} alt="" style={{width:'30px'}}/>,
      },
      {
        dataIndex: 'name',
        render: text => <span>[{text}]</span>,
      },
      {
        dataIndex: 'age',
        render: text => <span>[{text}岁]</span>,
      },
      {
        dataIndex: 'type',
        render: text => <span>[{text}]</span>,
      },
      {
        key: 'operation',
        fixed: 'right',
        width: 15,
        render: (text) => <Radio value={text}> </Radio> ,
      },
    ];
    const data = [
      {
        key: '1',
        name: '张三',
        avatar: '',//头像
        age: 42,
        sex: '男',
        type: '癫痫',
      },
      {
        key: '2',
        name: '李四',
        avatar: '',//头像
        age: 30,
        sex: '男',
        type: '癫痫',
      },
      {
        key: '3',
        name: '林华',
        avatar: '',//头像
        age: 26,
        sex: '男',
        type: '癫痫',
      },
      {
        key: '4',
        name: '张敏',
        avatar: '',//头像
        age: 39,
        sex: '男',
        type: '癫痫',
      },,
      {
        key: '5',
        name: '林华',
        avatar: '',//头像
        age: 26,
        sex: '男',
        type: '癫痫',
      },
      {
        key: '6',
        name: '张敏',
        avatar: '',//头像
        age: 39,
        sex: '男',
        type: '癫痫',
      },
    ];
    return (
      <div>
        <Form
          name="basic"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          // initialValues={this.state.storeState}
          ref={this.formRef}
          onFinish={this.onFinish}
        >
          <Row justify="start" gutter={[50, 5]}>
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
                <Input placeholder="请选择" onClick={this.chooseDoc.bind(this, "选择医生", 1)} readOnly />
                {/* <Doctor handClickDoctor={this.handClickDoctor} /> */}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="主持人"
                name="host"
                rules={[{ required: true, message: '请输入!' }]}
              >
                <Input placeholder="请选择" onClick={this.chooseDoc.bind(this, "选择主持人", 0)} readOnly />
                {/* <Doctor handClickDoctor={this.handClickDoctor} /> */}
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
                <DatePicker locale={locale} showNow={false}
                  showTime={{hideDisabledOptions: true}}
                 disabledDate={this.disabledStartDate} disabledTime={this.disabledStartDateTime} onChange={(val, dateStrings) => this.changeTime(val, dateStrings, 'startTime')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="报名结束时间"
                name="enrollEnd"
                rules={[{ required: true, message: '请选择!' }]}
              >
                <DatePicker locale={locale} showNow={false}
                 showTime={{hideDisabledOptions: true}}
                 disabledDate={this.disabledEndDate} disabledTime={this.disabledEndDateTime} 
                 onChange={(val, dateStrings) => this.changeTime(val, dateStrings, 'endTime')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="探讨开始时间"
                name="discussStart"
                rules={[{ required: true, message: '请选择!' }]}
              >
                <DatePicker locale={locale} showNow={false}
                showTime={{hideDisabledOptions: true}}
                disabledDate={this.disabledDate} disabledTime={this.disabledDateTime} 
                onChange={(val, dateStrings) => this.changeTime(val, dateStrings, 'start')}/>
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
              rules = {[{required:true, message: '请选择!'}]}
              >
                <Input placeholder="请选择" onClick={this.choosePat} readOnly />
                {/* <Button className={styles.choose}>请选择</Button> */}
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item
                label="探讨说明"
                name="explain"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                rules={[{ required: true, message: '请输入!' }]}
              >
                <TextArea rows={4} maxLength="200" placeholder="请输入病历探讨说明" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button className={styles.submit} onClick={this.delSearch}>关闭</Button>
                <Button className={styles.submit} type="primary" htmlType="submit">确定</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {/* ======================================选择医生弹框=================================== */}
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
            </Col>
          </Row>
          <Row justify="start" gutter={[0, 25]}>
            <Col span={12} offset={6}>
              <Tree
                multiple={this.state.multiple}
                onExpand={this.onExpand}
                onSelect={this.onSelect.bind(this,this.state.modalTitle)}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                treeData={loop(this.state.treeData)}
                style={{ textAlign: "left" }}
              />
            </Col>
          </Row>
        </Modal>}
        {/* =================================选择患者弹框============================= */}
        {this.state.isshow && <Modal
          title='选择患者'
          okText="确认"
          cancelText="取消"
          visible={this.state.isshow}
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}
          className={styles.smallBox}
        >
          <Row justify="start" gutter={[0, 25]}>
            <Col span={6}>
              <h3 style={{ textAlign: "right", lineHeight: '30px' }}>关键字&nbsp;&nbsp;</h3>
            </Col>
            <Col span={14}>
              <Search style={{ marginBottom: 8 }} placeholder="请输入" size="middle" onChange={this.onSearch} enterButton="搜索" />
            </Col>
          </Row>
          <Row justify="start" gutter={[0, 25]}>
            <Col span={24} >
              <Radio.Group onChange={this.patietInfo}>
                <Table style={{height: '200px', overflowY:' scroll'}} showHeader={false} pagination={false} columns={columns} dataSource={data} size="small" />
              </Radio.Group>
            </Col>  
          </Row>
        </Modal>}
      </div>
    )
  }
}
export default AddDiscuss