import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Card, Row, Col, Select, Typography, Modal, Tabs, Menu, Layout, Checkbox, message, Tag } from 'antd';
import styles from '../style.module.scss'
import Axios from '../../../../util/axios'
import Api from '../../../../api/index'
import _ from 'lodash';
const { Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { Content, Sider } = Layout;
const options = new Array(20).fill('null').map((item, index) => <Option key={index + 1} value={index + 1}>{`${index + 1}`}</Option>)

//#endregion
const col_1 = 3;
const col_2 = 5
const col_3 = 16
const defaultDiagnoseData = require('../data/diagnose.json');//诊断数据
const defaultEncephlogramData = require('../data/encephlogram.json');//脑电图异常数据
const defaultmedicine = require('../data/medicine.json');//药物
const defaultct = require('../data/ct.json');//核磁/ct
const defaultoperation = require('../data/operation.json');//手术选项
const defaultcdisease = require('../data/cdisease.json');//慢病史
// const defalutfamilyhistory = require('./data/cdisease.json');//请选择家族史
const defalutfamilyhistory = _.cloneDeep(require('../data/cdisease.json'));//请选择家族史
defalutfamilyhistory.title = '家族病史'
const defaultMedicineAllergy = _.cloneDeep(require('../data/medicine.json'));//过敏药物

export default class Addcase extends PureComponent {
  formRef = React.createRef()
  state = {
    shadowModalData: {},
    // type: this.props.match.params.id > 0 ? 'edit' : 'create',
    type: 'edit',
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
      historyOfChronicDisease: "", // 外伤史内容
      immunityTherapy: "",//免疫治疗
      numberOfEpisodesException: ""//发作频率

    }, //表单初始数据
    modalData: {
      diagnosis: _.cloneDeep(defaultDiagnoseData),// 诊断数据
      encephlogram: _.cloneDeep(defaultEncephlogramData), // 脑电图异常数据
      medicine: _.cloneDeep(defaultmedicine), // 药物
      ct: _.cloneDeep(defaultct), // 核磁/ct
      operation: _.cloneDeep(defaultoperation), // 手术选项
      cdisease: _.cloneDeep(defaultcdisease), // 慢性病
      familyhistory: _.cloneDeep(defalutfamilyhistory), // 家族史
      // numberOfEpisodes: _.cloneDeep(defaultDiagnoseData),// 发作频率
      drugAllergy: _.cloneDeep(defaultMedicineAllergy),// 过敏药物
    },
    currentModalDataCache: null, // 当前打开窗口数据缓存
    visibleModalName: null, // 当前显示哪个modal的key值，为false，不显示modal
    typeLoaded: false,//弹出信息加载
    initDataLoaded: false, // 展示编辑时，标识数据是否加载完成
  }


  componentDidMount() {
    const { type } = this.state;
    // const { match: { params: { id } } } = this.props;
    type === 'edit' && this.getCaseDetail(1)
  }

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

  // 获取所有选中元素值
  getModalCheckedData = (values, showError = true, needReturnData = false) => {
    const modalData = _.cloneDeep(this.state.modalData);
    let flag = true;
    const data = {}
    const {
      diagnosis,
      computer,
      NMR,
      surgery,
      ischronicDiseaseHistory,
      familyDisease,
      drugAllergy,
      medication
    } = values;

    const modalList = [
      [diagnosis, 1, modalData['diagnosis'], 'diagnosisContent', '请填写诊断内容'],
      [computer, 0, modalData['encephlogram'], 'encephlogramContent', '请填写脑电图异常内容'],
      [NMR, 1, modalData['ct'], 'ctContent', '请填写核磁/CT内容'],
      [medication, 1, modalData['medicine'], 'medicationContent', '请填写药物内容'],
      [surgery, 1, modalData['operation'], 'operationContent', '请填手术内容'],
      [ischronicDiseaseHistory, 1, modalData['cdisease'], 'cdiseaseContent', '请填写慢性病内容'],
      [familyDisease, 1, modalData['familyhistory'], 'familyhistoryContent', '请填写家族史内容'],
      [drugAllergy, 1, modalData['drugAllergy'], 'drugAllergyContent', '请填写过敏药物内容'],
    ]

    modalList.find(item => {
      const value = item[0];
      const compareValue = item[1];
      const modalData = item[2];
      const key = item[3];
      const errMsg = item[4];

      data[key] = this.getModalDataByKey(value, compareValue, modalData);

      if (data[key] === false) {
        showError && message.error(errMsg);
        flag = false;
        if (!needReturnData) {
          return true
        }
      }
      return false
    })

    if (needReturnData || flag) {
      return data
    }

    return false;
  }

  onFinish = (values) => {
    const extendData = this.getModalCheckedData(values)

    if (!extendData) {
      console.log('弹层没有数据')
      return
    }

    const { isHistoryOfTrauma } = values;
    let historyOfChronicDisease = null;

    if (isHistoryOfTrauma === 1) {
      // 有外伤史
      historyOfChronicDisease = this.formRef.current.getFieldValue('historyOfChronicDisease');
      if (!historyOfChronicDisease) {
        message.error('请填写外伤史内容')
        return
      }
    }

    const result = Object.assign(values, extendData, {
      historyOfChronicDisease
    });

    Axios({
      url: Api.addCase.addcase,
      method: 'POST',
      data: {
        caseList: result
      }
    })
      .then((res) => {
        //  console.log(res)
        message.info("添加成功！");

      })
      .finally(() => {
      })
  };

  // 将接口数据中的弹层数据merge到state中的modalData里去
  parseModalData = (data) => {

    // 这个时候的modalData未改变，直接从state中获取性能更高。
    const { modalData } = this.state;

    // 需要解析的数据列表
    const parseList = [
      {
        // 诊断内容
        modalDataKey: 'diagnosis',
        dataKey: 'diagnosisContent'
      },
      {
        // 脑电图异常内容
        modalDataKey: 'encephlogram',
        dataKey: 'encephlogramContent'
      },
      {
        // 药物
        modalDataKey: 'medicine',
        dataKey: 'medicationContent'
      },
      {
        // 核磁/ct
        modalDataKey: 'ct',
        dataKey: 'ctContent'
      },
      {
        // 手术选项
        modalDataKey: 'operation',
        dataKey: 'operationContent'
      },
      {
        // 慢性病
        modalDataKey: 'cdisease',
        dataKey: 'cdiseaseContent'
      },
      {
        // 家族史
        modalDataKey: 'familyhistory',
        dataKey: 'familyhistoryContent'
      },
      {
        // 过敏药物
        modalDataKey: 'drugAllergy',
        dataKey: 'drugAllergyContent'
      }
    ];

    parseList.forEach(item => {

      const modal = modalData[item.modalDataKey]; // modal默认数据
      const processDataTabs = data[item.dataKey]; // 接口中的tabs数据

      if (processDataTabs === null) {
        // 如果该字段没值，不merge
        return
      }

      modal.tabs.forEach(tab => {
        // 找到需要处理的tab
        const processTab = processDataTabs.find(processDataTab => {
          return processDataTab.value === tab.value
        });

        if (processTab && processTab.menus.length > 0) {
          // 找到需要处理的tab节点
          const processMenus = processTab.menus;
          tab.menus.forEach(menu => {
            const processMenu = processMenus.find(processMenu => processMenu.key === menu.key);
            this.recursionChilds(processMenu, menu);
          })
        }
      })
    });

    return modalData
  }


  /**
   * desc: 递归合并节点数据，currentChild 合并 到 initChild中。
   * @param {*} currentChild 接口获取的数据节点，
   * @param {*} initChild  初始化数据节点
   */
  recursionChilds = (currentChild, initChild) => {
    if (currentChild && currentChild.childs.length > 0) {
      // 找到需要处理的数据节点
      const processChilds = currentChild.childs;
      initChild.childs.forEach(child => {
        const processChild = processChilds.find(processChild => child.value === processChild.value);
        if (processChild) {
          // 找到需要处理的checkbox节点
          const processSubChilds = processChild.childs;
          if (!processSubChilds) {
            // 没有子节点
            child = Object.assign(child, processChild)
            return
          }
          // 有子节点时递归处理
          this.recursionChilds(processChild, child)
        }
      })
    }
  }

  getCaseDetail = ((id) => {
    // 获取case数据，根据id
    Axios({
      url: Api.addCase.getCaseDetail,
    })
      .then((res) => {
        const data = res.data.data.addcaseList;
        // 将接口中弹层数据merge到弹层中
        const modalData = this.parseModalData(data);

        console.log(data)

        this.setState({
          initFormData: data,
          initDataLoaded: true,
          modalData,
        }, () => {
          this.setState({
            shadowModalData: this.getModalCheckedData(data, false, true)
          })
        })
      })
      .finally(() => {
      })
  })

  // 获取弹层数据，根据key。 未填写的弹层返回null
  getModalDataByKey = (value, compareValue, modal) => {
    // 值绝对等于对比值的时候，做必填校验
    if (value === compareValue) {
      let tabs = modal.tabs;
      let checked = false;

      tabs = tabs.filter(tab => {
        tab.menus = tab.menus.filter(menu => {
          menu.childs = menu.childs.filter(child => {
            if (!child.childs && child.checked) {
              // 没有子节点，且被选中的节点，直接返回
              checked = true;
              return true
            }

            if (child.childs) {
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
            if (child.childs && child.childs.length > 0) {
              return child
            }
            return false
          })
          if (menu.childs && menu.childs.length > 0) {
            return true
          }
          return false
        })

        if (tab.menus && tab.menus.length > 0) {
          return true
        }

        return false;
      })

      return checked ? tabs : checked
    } else {
      return null
    }
  }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  onValuesChange = (changedValue, allChangedValue) => {
    const entries = Object.entries(changedValue)[0];
    const key = entries[0];
    const value = entries[1];
    const clearModalCheckedMap = {
      diagnosis: {
        value: 0,
        clearModalKey: 'diagnosis',
        defaultModalKey: 'defaultDiagnoseData',
      },
      computer: {
        value: 1,
        clearModalKey: 'encephlogram',
        defaultModalKey: 'defaultEncephlogramData',
      },
      medication: {
        value: 0,
        clearModalKey: 'medicine',
        defaultModalKey: 'defaultmedicine',
      },
      NMR: {
        value: 0,
        clearModalKey: 'ct',
        defaultModalKey: 'defaultct',
      },
      surgery: {
        value: 0,
        clearModalKey: 'operation',
        defaultModalKey: 'defaultoperation',
      },
      ischronicDiseaseHistory: {
        value: 0,
        clearModalKey: 'cdisease',
        defaultModalKey: 'defaultcdisease',
      },
      familyDisease: {
        value: 0,
        clearModalKey: 'familyhistory',
        defaultModalKey: 'defalutfamilyhistory',
      },
      drugAllergy: {
        value: 0,
        clearModalKey: 'drugAllergy',
        defaultModalKey: 'defaultMedicineAllergy',
      }
    }

    const clearModal = clearModalCheckedMap[key];

    if (clearModal && clearModal.value === value) {
      const { modalData } = this.getModalDataModal();
      modalData[clearModal.clearModalKey] = _.cloneDeep(eval(clearModal.defaultModalKey));
      this.setState({
        modalData,
      }, () => {
        this.setState({
          shadowModalData: this.getShadowModalDataNow()
        })
      })
    }

  }

  onChange = (key, value) => {
    // console.log(key, value, this.formRef.current.setFieldsValue)
    console.log(key, value)
    this.formRef.current.setFieldsValue({ [key]: value })
  }

  getShadowModalDataNow = () => {
    return this.getModalCheckedData(this.formRef.current.getFieldsValue([
      'diagnosis',
      'computer',
      'NMR',
      'surgery',
      'ischronicDiseaseHistory',
      'familyDisease',
      'drugAllergy',
      'medication'
    ]), false, true)
  }

  onSaveModal = () => {
    const shadowModalData = this.getShadowModalDataNow();
    this.setState({
      visibleModalName: false,
      shadowModalData // 每次保存时，将modalData做一次映射，选中的modal添加值，没选择的modal设置为null，与提交时的数据一值
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
  getModalDataModal = (needCloneDeep = true) => {
    let { visibleModalName, modalData } = this.state;

    if (needCloneDeep) {
      console.log('cloneDeep modalData')
      modalData = _.cloneDeep(modalData);
    }

    let modal = null;
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

  renderCheckedDetail = (tabs) => {
    return tabs && tabs.map(item => {
      return <div className={styles.selectedDetail} key={item.value}>
        <div className={styles.detailTabsTitle}>
          {item.title}
        </div>
        {
          item.menus.map(menu => {
            return <div key={menu.key} className={styles.detailMenuTitle}>
              <span className={styles.detailMenu}>{menu.value}:</span>
              {
                menu.childs.map(child => {
                  const subChilds = child.childs;
                  return <Tag key={child.value}>
                    <>
                      {child.label}
                      {
                        subChilds && ':'
                      }
                      {
                        subChilds && subChilds.map(subChild => <span key={subChild.value}>{subChild.label}</span>)
                      }
                    </>
                  </Tag>
                })
              }
            </div>
          })
        }
      </div>
    })
  }

  render() {
    const { initFormData, visibleModalName, type, initDataLoaded, shadowModalData } = this.state;
    const { modal, selectedTabs } = this.getModalDataModal(false);
    let tabs = [];
    if (modal && modal.tabs) {
      tabs = modal.tabs
    }
    const tabsLength = tabs.length;

    const {
      diagnosisContent,
      encephlogramContent,
      ctContent,
      medicationContent,
      operationContent,
      cdiseaseContent,
      familyhistoryContent,
      drugAllergyContent
    } = shadowModalData || {}

    return (type === 'create' || initDataLoaded) && <>

      <div className={styles.addcase, styles.caseDetail}>
        <Form
          name="basic"
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 15 }}
          initialValues={initFormData}
          onValuesChange={this.onValuesChange}
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          scrollToFirstError={true}
        >
          <Card type="inner" title={<h1 className={styles.title}>现病史</h1>}  >
            <Row gutter={16}>
              <Col span={col_1}>
              </Col>
              <Col span={col_2}>
                <Form.Item
                  label="诊断"
                >
                  {initFormData.diagnosis == 1 ? "是" : "否"}
                </Form.Item>


              </Col>
              <Col span={col_3}>
                <Form.Item
                  label="诊断内容"
                  help={
                    this.renderCheckedDetail(diagnosisContent)
                  }
                  dependencies={['diagnosis']}
                >
                  {
                    ({ getFieldValue, getFieldsValue }) => {
                      const diagnosis = getFieldValue('diagnosis')

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

                >
                  {initFormData.computer == 1 ? "正常" : "异常"}
                </Form.Item>
              </Col>
              <Col span={col_3}>
                <Form.Item
                  label="异常内容"
                  help={
                    this.renderCheckedDetail(encephlogramContent)
                  }
                  dependencies={['computer']}>
                  {
                    ({ getFieldValue }) => {
                      const diagnosis = getFieldValue('computer')

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
                >

                  {initFormData.NMR == 0 ? "正常" : "异常"}
                </Form.Item>
              </Col>
              {/* nMRException */}
              <Col span={col_3}>
                <Form.Item
                  label="异常内容"
                  help={
                    this.renderCheckedDetail(ctContent)
                  }
                  dependencies={['NMR']}  >
                  {
                    ({ getFieldValue }) => {
                      const diagnosis = getFieldValue("NMR")

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
                >
                  {initFormData.gene == 0 ? "阴性" : "阳性"}
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
                >

                  {initFormData.numberOfEpisodes}
                </Form.Item>
              </Col>
              <Col span={col_3}>
                {/* numberOfEpisodesException */}
                <Form.Item
                  label="发作频率"

                >

                  {/* <Select style={{ width: 120 }} >
                    <Option value={""}>请选择</Option>
                    <Option value={0}>日</Option>
                    <Option value={1}>周</Option>
                    <Option value={2}>月</Option>
                  </Select> */}

                  {initFormData.numberOfEpisodesException == 0 ? "日" : "周"}
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


                  colon={true}
                >
                  {initFormData.medication == 1 ? "是" : "否"}
                </Form.Item>
              </Col>
              {/* medicationContent */}
              <Col span={col_3}>
                <Form.Item
                  label="药物内容"
                  help={
                    this.renderCheckedDetail(medicationContent)
                  }
                  dependencies={['medication']}  >
                  {
                    ({ getFieldValue }) => {
                      const diagnosis = getFieldValue("medication")

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
                >
                  {initFormData.surgery == 1 ? "是" : "否"}
                </Form.Item>
              </Col>
              <Col span={col_3}>
                <Form.Item
                  label="手术内容"
                  help={
                    this.renderCheckedDetail(operationContent)
                  }
                  dependencies={['surgery']}  >
                  {
                    ({ getFieldValue }) => {
                      const diagnosis = getFieldValue("surgery")
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
                >

                  {initFormData.hormoneTherapy == 1 ? "是" : "否"}
                </Form.Item>
              </Col>
              <Col span={col_3}>
                <Form.Item
                  label="免疫治疗">

                  {initFormData.immunityTherapy == 1 ? "是" : "否"}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={col_1}>
              </Col>
              <Col span={col_2}>
                <Form.Item
                  label="生酮饮食"
                >
                  {initFormData.ketogenicDiet == 1 ? "是" : "否"}
                </Form.Item>
              </Col>
              <Col span={col_3}>
                <Form.Item
                  label="其他"
                >
                  {initFormData.other == 1 ? "是" : "否"}
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
                >
                  {initFormData.drugAllergy == 1 ? "是" : "否"}
                </Form.Item>
              </Col>
              {/* allergyDrugName */}
              <Col span={col_3}>
                <Form.Item
                  help={
                    this.renderCheckedDetail(drugAllergyContent)
                  }
                  label="过敏药物名称"
                  dependencies={['drugAllergy']}  >
                  {
                    ({ getFieldValue }) => {
                      const diagnosis = getFieldValue("drugAllergy")

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
                >
                  {initFormData.isHistoryOfTrauma == 1 ? "是" : "否"}
                </Form.Item>
              </Col>
              {/*  historyOfChronicDisease*/}
              <Col span={col_3}>
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
                      return <Input readOnly
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
                >

                  {initFormData.ischronicDiseaseHistory == 1 ? "是" : "否"}
                </Form.Item>
              </Col>
              {/* chronicDiseaseHistoryName */}
              <Col span={col_3}>
                <Form.Item
                  help={
                    this.renderCheckedDetail(cdiseaseContent)
                  }
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
                      >
                        {
                          cdiseaseContent ? '已选择' : '请选择'
                        }
                      </Button>
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

                >

                  {initFormData.birthInjury == 1 ? "是" : "否"}
                </Form.Item>
              </Col>
              <Col span={col_3}>
                <Form.Item
                  label="感染"
                >

                  {initFormData.infection == 1 ? "是" : "否"}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={col_1}>

              </Col>
              <Col span={col_2}>
                <Form.Item
                  label="出血"
                >
                  {initFormData.bleeding == 1 ? "是" : "否"}
                </Form.Item>
              </Col>
              <Col span={col_3}>
                <Form.Item
                  label="是否高热惊厥史"

                >
                  {initFormData.historyOfFebrileConvulsions == 1 ? "是" : "否"}
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
                >
                  {initFormData.familyDisease == 1 ? "是" : "否"}
                </Form.Item>
              </Col>
              {/* familyDiseaseName */}
              <Col span={col_3}>
                <Form.Item
                  help={
                    this.renderCheckedDetail(familyhistoryContent)
                  }
                  label="家族病名称"

                  dependencies={['familyDisease']} >
                  {
                    ({ getFieldValue }) => {
                      const diagnosis = getFieldValue("familyDisease")

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
                >
                  {initFormData.whetherToMarry == 1 ? "是" : "否"}
                </Form.Item>
              </Col>
              <Col span={col_3}>
                <Form.Item
                  label="是否生育"
                >
                  {initFormData.whetherToGiveBirth == 1 ? "是" : "否"}
                </Form.Item>
              </Col>
            </Row>


          </Card>
        </Form>
      </div>

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
      <Row>
        <Col span={24} style={{ textAlign: "center", marginTop: '20px' }}>
          <Link to='/index/patient/patientList'>
            <Button type="primary" >
              返回
                </Button>
          </Link>
        </Col>
      </Row>
    </>
  }
}
