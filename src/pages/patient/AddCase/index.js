import React, { PureComponent } from 'react'
import { Form, Input, Button, Card, Row, Col, Select, Typography, Modal, Tabs, Menu, Layout, Checkbox, Result, message } from 'antd';
import Axios from '../../../util/axios'
import Api from '../../../api/index'
import styles from './style.module.scss'
import _ from 'lodash';
const { Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { Content, Sider } = Layout;
const options = new Array(20).fill('null').map((item, index) => <Option key={index + 1} value={index + 1}>{`${index + 1}`}</Option>)


//#endregion
const col_1 = 3;
const col_2 = 8
const col_3 = 13

const defaultDiagnoseData = require('./data/diagnose.json');
const defaultEncephlogramData = require('./data/encephlogram.json');
const defaultmedicine = require('./data/medicine.json');
const defaultct = require('./data/ct.json');
const defaultoperation = require('./data/operation.json');//手术选项
const defaultcdisease = require('./data/cdisease.json');//慢病史
const defalutfamilyhistory = require('./data/cdisease.json');//请选择家族史

export default class Addcase extends PureComponent {
  formRef = React.createRef()
  state = {
    initFormData: {
      diagnosis: "",//诊断
      computer: "",//电脑图
      NMR: "",//ct
      gene: "",//基因
      numberOfEpisodes: "",//发作品频率
      medication: "",//药物治疗
      surgery: "",//是否手术
      hormoneTherapy: "",//甲强==激素治疗
      ketogenicDiet: "",//生酮饮食
      other: "",//其他
      drugAllergy: "",//是否有过敏历史
      isHistoryOfTrauma: "",//是否有外伤史
      ischronicDiseaseHistory: "",//慢性病
      birthInjury: "",//产伤
      infection: "",//感染
      bleeding: "",//是否高热惊厥史：
      historyOfFebrileConvulsions: "",//出血
      familyDisease: "",//是否有家族病
      whetherToMarry: "",//是否结婚
      whetherToGiveBirth: "",//是否生育
      historyOfChronicDisease: "",
      immunityTherapy: "",//免疫治疗
      jzxItems: [],//局灶性
      qmxItems: [],//全面性
      fzlxbwdItems: [],//发作类型不稳定
      sfwdxfzItem: [],//是否为癫痫发作

    }, //表单初始数据
    modalData: {
      diagnosis: _.cloneDeep(defaultDiagnoseData),// 诊断数据
      encephlogram: _.cloneDeep(defaultEncephlogramData), // 脑电图异常数据
      medicine: _.cloneDeep(defaultmedicine), // 药物
      ct: _.cloneDeep(defaultct), // 核磁/ct
      operation: _.cloneDeep(defaultoperation), // 手术选项
      cdisease: _.cloneDeep(defaultcdisease), // 慢性病
      familyhistory: _.cloneDeep(defalutfamilyhistory), // 家族史
      numberOfEpisodes: _.cloneDeep(defaultDiagnoseData),// 发作频率
      drugAllergy: _.cloneDeep(defaultmedicine),// 过敏药物
    },
    currentModalDataCache: null, // 当前打开窗口数据缓存
    visibleModalName: null, // 当前显示哪个modal的key值，为false，不显示modal
    typeLoaded: false,//弹出信息加载

  }

  // componentDidMount() {
  //   Axios({
  //     url: Api.addCase.getDiagnosticType,
  //   })
  //   .then((res) => {
  //     if (res.data.success)
  //     this.setState({ diagnosticTypeList: res.data.data })
  //     this.setState({ typeLoaded: true })

  //   })
  //   .finally(() => {
  //     this.typeLoaded = false
  //   })
  // }

  //弹出层菜单
  renderTypeMenu(childs) {
    let menuArr = childs.map((item) => {
      return (
        <Menu.Item key={item.key} type={item.type} title={item.value}>
          {item.value}
        </Menu.Item>
      )
    })
    return menuArr
  }

  onChangeTabs = (key) => {

    let { visibleModalName } = this.state;
    let modalData = _.cloneDeep(this.state.modalData);
    let modal = modalData[visibleModalName];
    modal.tabs.forEach((tab, i) => {
      if (tab.value + '' === key) {
        tab.selected = true;
      } else {
        tab.selected = false;
      }
    });
    modalData[visibleModalName] = modal;
    this.setState({
      modalData
    })
  }

  onClickTypeMenu = (item) => {
    const { modalData, selectedTabs } = this.getModalDataModal();
    selectedTabs.menus.forEach((menu, i) => {
      if (menu.key + '' === item.key) {
        menu.checked = true;
      } else {
        menu.checked = false;
      }
    })
    this.setState({
      modalData
    })
  }

  renderTypeContent(type, key) {
    if (this.state.typeLoaded) {
      let menueAll = this.state.diagnosticTypeList[0].childs;
      let menuArr = menueAll.map((item) => {
        return (
          <Menu.Item key={item.key} type={item.type} title={item.value}>
            {item.value}
          </Menu.Item>
        )
      })
      return menuArr
    }
  }

  onFinish = (values) => {
    console.log('Received values of form: ', values);
    const modalData = _.cloneDeep(this.state.modalData);
    const { 
      diagnosis,
      computer,
    } = values;

    // 诊断内容
    const diagnosisContent = this.getModalDataByKey(diagnosis, 1, modalData['diagnosis']);
    if (diagnosisContent===false) {
      message.error('请填写诊断内容');
      return 
    }

    // 脑电图异常内容
    const encephlogramContent = this.getModalDataByKey(computer, 0, modalData['encephlogram']);
    if (encephlogramContent === false) {
      message.error('请填写脑电图异常内容');
      return
    }
    const extendData = { diagnosisContent, encephlogramContent };

    const result = Object.assign(values, extendData) 
    Axios({
      url: Api.addCase.addcase,
      method: 'POST',
      data: {
        caseList: result
      }
    })
    .then((res) => {
      console.log(res)

    })
    .finally(() => {
    })
  };

  // 对弹层数据做必填校验
  getModalDataByKey = (value,compareValue,modal) => {
    // 值绝对等于对比值的时候，做必填校验
    if (value === compareValue) {
      let tabs = modal.tabs;
      let checked = false;
      
      tabs = tabs.filter(tab => {
        tab.menus = tab.menus.filter(menu => {
          menu.childs = menu.childs.filter(child => {
            if(!child.childs && child.checked) {
              // 没有子节点，且被选中的节点，直接返回
              checked = true;
              return true
            }

            if(child.childs ) {
              // 有子节点，过滤选中的子节点
              child.childs = child.childs.filter(subChild => {
                if (!child.subChild && subChild.checked) {
                  checked = true;
                  return true
                }
                return false
              })
            }
            
            // 过滤后的子节点有值，返回该节点。或者返回false
            if (child.childs && child.childs.length>0) {
              return child
            }

            return false
          })
          if(menu.childs && menu.childs.length > 0) {
            return true
          }
          return false
        })

        if (tab.menus && tab.menus.length >0 ) {
          return true
        }

        return false;
      })

      return checked ? tabs : checked
    }else{
      return null
    }
  }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  onValuesChange = (changedValue, allChangedValue) => {
    console.log(allChangedValue)
  }

  onChange = (key, value) => {
    // console.log(key, value, this.formRef.current.setFieldsValue)
    console.log(key, value)
    this.formRef.current.setFieldsValue({ [key]: value })
  }

  onChangeMessage = (value) => {
    this.formRef.current.setFieldsValue({ jzxItems: value })
  }

  onSaveModal = () => {
    this.setState({
      visibleModalName: false
    })
  }

  // 取消弹层，还原数据，从缓存中取读。
  onCancelModal = () => {
    const { currentModalDataCache, visibleModalName } = this.state;
    let { modalData } = this.getModalDataModal();
    // console.log(currentModalDataCache)
    modalData[visibleModalName] = currentModalDataCache;
    this.setState({
      visibleModalName: false,
      modalData
    })
  }

  // 打开弹层时，缓存当前状态下的弹层数据，用于取消操作时，还原数据到打开状态时。
  onShowModal = (visibleModalName) => {
    this.setState({
      visibleModalName,
      currentModalDataCache: this.state.modalData[visibleModalName]
    })
  }

  // 选择第一层checkbox
  onCheckboxChange = (value, index) => {
    const { selectedTabs, modalData } = this.getModalDataModal();
    const menus = selectedTabs.menus;
    const checkedMenu = menus.find(item => item.checked) || menus[0];
    checkedMenu.childs[index].checked = value;
    this.setState({
      modalData
    })
  }

  // 选择第二层checkbox,如有更多层建议做成通用递归方法。
  onSubCheckboxChange = (value, CheckboxIndex, subChildIndex) => {
    const { selectedTabs, modalData } = this.getModalDataModal();
    const menus = selectedTabs.menus;
    const checkedMenu = menus.find(item => item.checked) || menus[0];
    checkedMenu.childs[CheckboxIndex].childs[subChildIndex].checked = value;
    this.setState({
      modalData
    })
  }

  // 获取当前弹窗的数据模型
  getModalDataModal = () => {
    const { visibleModalName } = this.state;
    const modalData = _.cloneDeep(this.state.modalData);

    let modal = _.cloneDeep(defaultDiagnoseData);
    let selectedTabs = null;
    let selectedTabsIndex = null;

    // 关闭弹层时，由于visibleModalName修改为了false,modal与选中tabs数据都应该为null
    if (visibleModalName) {
      modal = modalData[visibleModalName];
      selectedTabs = modal.tabs.find((tab, index) => {
        const flag = tab.selected;
        if (flag) {
          selectedTabsIndex = index;
        }
        return flag
      });
    }

    return {
      modal,
      modalData,
      selectedTabs,
      selectedTabsIndex
    }
  }

  render() {
    const { initFormData, visibleModalName } = this.state;
    const { modal, selectedTabs } = this.getModalDataModal();
    let  tabs = [];
    if (modal && modal.tabs) {
      tabs = modal.tabs
    }

    const tabsLength = tabs.length;

    return (
      <>

        <div className={styles.addcase}>
          <Card type="inner" title={<h1 className={styles.title}>患者信息</h1>}  >
            <Row gutter={16}>
              <Col span={6}>
                <div className={styles.showdiv}>姓名：张三</div>
              </Col>
              <Col span={6}>
                <div className={styles.showdiv} >性别：女</div>
              </Col>
              <Col span={6}>
                <div className={styles.showdiv}>患病年龄：30岁</div>
              </Col>
              <Col span={6}>
                <div className={styles.showdiv}>现居住地:北京市海定区</div>
              </Col>
            </Row>
          </Card>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={initFormData}
            onValuesChange={this.onValuesChange}
            ref={this.formRef}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Card type="inner" title={<h1 className={styles.title}>现病史</h1>}  >
              <Row gutter={16}>
                <Col span={col_1}>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="诊断"
                    rules={[{ required: true, message: "必填" }]}
                    name="diagnosis" >
                    <Select style={{ width: 120 }}>
                      <Option value={""}>请选择</Option>
                      <Option value={0}>否</Option>
                      <Option value={1}>是</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="诊断内容"
                    dependencies={['diagnosis']}
                  >
                    {
                      ({ getFieldValue, getFieldsValue }) => {
                        const diagnosis = getFieldValue('diagnosis')
                        return <Button
                          disabled={diagnosis !== 1}
                          style={{ width: 120 }}
                          onClick={() => {
                            this.onShowModal('diagnosis')
                          }}
                        >请选择</Button>
                      }
                    }
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={col_1}>
                  <Title level={4} >辅助检查</Title>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="电脑图"
                    rules={[{ required: true, message: "必填" }]}
                    name="computer" >
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={1}>正常</Option>
                      <Option value={0}>异常</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="异常内容"
                    dependencies={['computer']}>
                    {
                      ({ getFieldValue }) => {
                        const diagnosis = getFieldValue('computer')
                        return <Button disabled={diagnosis !== 0}
                          style={{ width: 120 }}

                          onClick={() => {
                            this.onShowModal('encephlogram')
                          }}
                        >请选择</Button>
                      }
                    }
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={col_1}>

                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="核磁/CT"
                    name="NMR" >
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={0}>正常</Option>
                      <Option value={1}>异常</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {/* nMRException */}
                <Col span={col_2}>
                  <Form.Item
                    label="异常内容"
                    dependencies={['NMR']}  >
                    {
                      ({ getFieldValue }) => {
                        const diagnosis = getFieldValue("NMR")
                        return <Button
                          disabled={diagnosis !== 1}
                          style={{ width: 120 }}
                          onClick={() => {
                            this.onShowModal('ct')
                          }}
                        >请选择</Button>
                      }
                    }
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={col_1}>

                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="基因"
                    name="gene" >
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={0}>阴性</Option>
                      <Option value={1}>阳性</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={col_1}>
                  <Title level={4}>发作频次</Title>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="发作次数"
                    name="numberOfEpisodes" >
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      {
                        options
                      }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={col_2}>
                  {/* numberOfEpisodesException */}
                  <Form.Item
                    label="发作频率"
                    dependencies={['numberOfEpisodes']}  >
                    {
                      ({ getFieldValue }) => {
                        const diagnosis = getFieldValue("numberOfEpisodes")
                        return <Button
                          disabled={diagnosis === ""}
                          style={{ width: 120 }}
                          onClick={() => {
                            this.onShowModal('numberOfEpisodes')
                          }}
                        >请选择</Button>
                      }
                    }
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={col_1}>
                  <Title level={4}>药物治疗</Title>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="是否药物治疗"
                    name="medication"
                    colon={true}
                  >
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={1}>是</Option>
                      <Option value={0}>否</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {/* medicationContent */}
                <Col span={col_2}>
                  <Form.Item
                    label="药物内容"
                    dependencies={['medication']}  >
                    {
                      ({ getFieldValue }) => {
                        const diagnosis = getFieldValue("medication")
                        return <Button
                          disabled={diagnosis !== 1}
                          style={{ width: 120 }}
                          onClick={() => {
                            this.onShowModal('medicine')
                          }}
                        >请选择</Button>
                      }
                    }
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={col_1}>
                  <Title level={4}>特殊治疗</Title>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="是否手术"
                    name="surgery" >
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={1}>是</Option>
                      <Option value={0}>否</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="手术内容"
                    dependencies={['surgery']}  >
                    {
                      ({ getFieldValue }) => {
                        const diagnosis = getFieldValue("surgery")
                        return <Button
                          disabled={diagnosis !== 1}
                          style={{ width: 120 }}
                          onClick={() => {
                            this.onShowModal('operation')
                          }}

                        >请选择</Button>
                      }
                    }
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={col_1}>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="甲强==激素治疗"
                    name="hormoneTherapy">
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={1}>是</Option>
                      <Option value={0}>否</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="免疫治疗"
                    name="immunityTherapy">
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={1}>是</Option>
                      <Option value={0}>否</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={col_1}>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="生酮饮食"
                    name="ketogenicDiet">
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={1}>是</Option>
                      <Option value={0}>否</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="其他"
                    name="other">
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={1}>是</Option>
                      <Option value={0}>否</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

            </Card>
            <Card type="inner" title={<h1 className={styles.title}>既往史</h1>}  >

              <Row gutter={16}>
                <Col span={col_1}>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="是否有药物过敏"
                    name="drugAllergy" >
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={1}>是</Option>
                      <Option value={0}>否</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {/* allergyDrugName */}
                <Col span={col_2}>
                  <Form.Item
                    label="过敏药物名称"
                    dependencies={['drugAllergy']}  >
                    {
                      ({ getFieldValue }) => {
                        const diagnosis = getFieldValue("drugAllergy")
                        return <Button
                          disabled={diagnosis !== 1}
                          style={{ width: 120 }}
                          onClick={() => {
                            this.onShowModal('drugAllergy')
                          }}
                        >请选择</Button>
                      }
                    }
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={col_1}>
                  <Title level={4}></Title>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="是否有外伤史"
                    name="isHistoryOfTrauma" >
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={1}>是</Option>
                      <Option value={0}>否</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {/*  historyOfChronicDisease*/}
                <Col span={col_2}>
                  <Form.Item
                    label="外伤史内容"
                    valuePropName="historyOfChronicDisease"
                    // dependencies={['isHistoryOfTrauma', 'historyOfChronicDisease']}
                    shouldUpdate
                  >
                    {
                      ({ getFieldValue, setFieldsValue }) => {
                        const diagnosis = getFieldValue("isHistoryOfTrauma")
                        const historyOfChronicDisease = getFieldValue('historyOfChronicDisease')
                        return <Input
                          disabled={diagnosis !== 1}
                          value={historyOfChronicDisease}
                          style={{ width: 120 }}
                          onChange={(e) => { this.onChange('historyOfChronicDisease', e.target.value) }}
                        />
                      }
                    }

                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={col_1}>

                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="慢病史"
                    name="ischronicDiseaseHistory" >
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={1}>是</Option>
                      <Option value={0}>否</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {/* chronicDiseaseHistoryName */}
                <Col span={col_2}>
                  <Form.Item
                    label="慢病史名称："
                    dependencies={['ischronicDiseaseHistory']} >
                    {
                      ({ getFieldValue }) => {
                        const diagnosis = getFieldValue("ischronicDiseaseHistory")
                        return <Button
                          disabled={diagnosis !== 1}
                          style={{ width: 120 }}
                          onClick={() => {
                            this.onShowModal('cdisease')
                          }}
                        >请选择</Button>
                      }
                    }

                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={col_1}>

                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="产伤"
                    name="birthInjury" >
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={1}>是</Option>
                      <Option value={0}>否</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="感染"
                    name="infection" >
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={1}>是</Option>
                      <Option value={0}>否</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={col_1}>

                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="出血"
                    name="bleeding" >
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={1}>是</Option>
                      <Option value={0}>否</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="是否高热惊厥史"
                    name="historyOfFebrileConvulsions" >
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={1}>是</Option>
                      <Option value={0}>否</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card type="inner" title={<h1 className={styles.title}>家族史</h1>}  >

              <Row gutter={16}>
                <Col span={col_1}>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="是否有家族病"
                    name="familyDisease" >
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={1}>是</Option>
                      <Option value={0}>否</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {/* familyDiseaseName */}
                <Col span={col_2}>
                  <Form.Item
                    label="家族病名称"
                    dependencies={['familyDisease']} >
                    {
                      ({ getFieldValue }) => {
                        const diagnosis = getFieldValue("familyDisease")
                        return <Button
                          disabled={diagnosis !== 1}
                          style={{ width: 120 }}
                          onClick={() => {
                            this.onShowModal('familyhistory')
                          }}
                        >请选择</Button>
                      }
                    }

                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={col_1}>
                  <Title level={4}></Title>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="是否结婚"
                    name="whetherToMarry" >
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={1}>是</Option>
                      <Option value={0}>否</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={col_2}>
                  <Form.Item
                    label="是否生育"
                    name="whetherToGiveBirth" >
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={1}>是</Option>
                      <Option value={0}>否</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12} style={{ textAlign: "right" }}>
                  <Button type="primary" htmlType="submit">
                    返回
                    </Button>
                </Col>
                <Col span={1} > </Col>
                <Col span={11} >
                  <Button type="primary" htmlType="submit">
                    保存
                    </Button>
                </Col>
              </Row>

            </Card>
          </Form>
        </div>
        <div>

          {
            visibleModalName && <Modal
              visible
              title={modal.title}
              okText="确认"
              width={620}
              cancelText="取消"
              onOk={this.onSaveModal}
              onCancel={() => {
                this.onCancelModal()
              }}
            >

              <Tabs className={`${tabsLength > 1 ? '' : styles['no-tabs']}`} onChange={this.onChangeTabs} activeKey={selectedTabs.value + ''} >
                {
                  tabs.map(tab => {
                    const menus = tab.menus;
                    const checkedMenu = menus.find(item => item.checked) || menus[0];

                    return <TabPane tab={tab.title} key={tab.value} >
                      <Layout>
                        {
                          menus.length > 1 && <Sider width={200} className="site-layout-background">
                            <Menu
                              mode="inline"
                              selectedKeys={[checkedMenu.key + '']}
                              onClick={this.onClickTypeMenu}
                              style={{ height: '100%', borderRight: 0 }}>
                              {
                                this.renderTypeMenu(menus)
                              }
                            </Menu>
                          </Sider>
                        }
                        <Layout style={{ padding: '0', lineHeight: "30px", backgroundColor: "#FFF" }}>
                          <Content
                            className="site-layout-background">
                            <Card className={styles.card} name="list"  >
                              {
                                checkedMenu.childs.map((child, CheckboxIndex) => {
                                  const subChilds = child.childs
                                  if (subChilds && subChilds.length > 0) {
                                    return <div key={CheckboxIndex} className={`${styles['checkbox-item']} ${styles['has-subitem']}`}>
                                      <span className={styles.label}>
                                        {child.label}
                                      </span>

                                      {
                                        subChilds.map((subChild, subChildIndex) => <Checkbox
                                          checked={subChild.checked}
                                          key={subChild.value}
                                          onChange={(e) => {
                                            this.onSubCheckboxChange(e.target.checked, CheckboxIndex, subChildIndex)
                                          }}
                                        >
                                          {subChild.label}
                                        </Checkbox>)
                                      }

                                    </div>
                                  }

                                  return <div key={CheckboxIndex} className={`${styles['checkbox-item']} ${styles['level-1']}`}>
                                    <Checkbox
                                      checked={child.checked}
                                      onChange={(e) => {
                                        this.onCheckboxChange(e.target.checked, CheckboxIndex)
                                      }}
                                    >
                                      {child.label}
                                    </Checkbox>
                                  </div>
                                })
                              }
                            </Card>
                          </Content>
                        </Layout>
                      </Layout>
                    </TabPane>
                  })
                }
              </Tabs>
            </Modal>
          }

        </div>


      </>
    )
  }
}
