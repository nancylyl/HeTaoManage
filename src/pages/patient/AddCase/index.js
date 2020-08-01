import React, { PureComponent } from 'react'
import { Form, Input, Button, Card, Row, Col, Select, Typography, Divider, Modal, Tabs, Menu, Layout, Checkbox } from 'antd';
import Axios from '../../../util/axios'
import Api from '../../../api/index'
import styles from './style.module.scss'
const { Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const CheckboxGroup = Checkbox.Group;
const options = new Array(20).fill('null').map((item, index) => <Option key={index + 1} value={index + 1}>{`${index + 1}`}</Option>)
//#region /* 弹出框内容 */
let optionJzx = []
let optionQmx = [
  { label: '全面性1', value: 1 },
  { label: '全面性2(听，味，嗅等)', value: 2 },
  { label: '全面性3(幻觉或错局)', value: 3 },
  { label: '全面性33334', value: 4 },
  { label: '全面性33335', value: 5 },
  { label: '全面性3336', value: 6 },
]
let optionFzbwd = []
let optionSfwdxfz = []
let optionContet = []
//综合症状
const optionXseq = []

//#endregion
const col_1 = 3;
const col_2 = 8
const col_3 = 13

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

    zdVisible: true,//诊断
    jzxVisible: true,
    qmxVisible: false,
    typeLoaded: false,//弹出信息加载
    diagnosticTypeList: [],//弹出层的数据

  }

  componentDidMount() {
    Axios({
      url: Api.addCase.getDiagnosticType,
    })
      .then((res) => {
        if (res.data.success)
          this.setState({ diagnosticTypeList: res.data.data })
        this.setState({ typeLoaded: true })

      })
      .finally(() => {
        this.typeLoaded = false
      })
  }
  //弹出层菜单
  renderTypeMenu(type) {
    if (this.state.typeLoaded) {
      let menueAll = this.state.diagnosticTypeList[type].childs;
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
  onClickTypeMenu = ((item, key, keyPath, selectedKeys, domEvent) => {
    // console.log(item, key, keyPath, selectedKeys, domEvent);

    if (this.state.typeLoaded) {
      // console.log(this.state.diagnosticTypeList.childs);
      let index = item.key - 1;
      let childList = this.state.diagnosticTypeList[0].childs[index];
      console.log(childList.childs);
      this.optionContet = childList.childs;
      console.log(this.optionContet);


    }
  })
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

  onFinish = (values,) => {
    console.log('Received values of form: ', values);
  };

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

  //#region   /* 诊断 */
  handleZdOk = () => {
    console.log('ok');
    this.setState({
      zdVisible: false
    });

  }
  handleZdCancel = e => {
    this.setState({
      zdVisible: false
    });
  };
  handleZdShow = e => {

    this.setState({
      zdVisible: true
    });
  };
  //#endregion

  render() {
    const { initFormData, zdVisible, qmxVisible } = this.state;
    // const { zdVisible } = selectVisible

    console.log(initFormData)

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
                        return <Button disabled={diagnosis !== 1} style={{ width: 120 }} onClick={this.handleZdShow}>请选择</Button>
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
                    name="computer" >
                    <Select style={{ width: 120 }} >
                      <Option value={""}>请选择</Option>
                      <Option value={0}>正常</Option>
                      <Option value={1}>异常</Option>
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
                        return <Button disabled={diagnosis !== 1} style={{ width: 120 }}>请选择</Button>
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
                        return <Button disabled={diagnosis !== 1} style={{ width: 120 }}>请选择</Button>
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
                        return <Button disabled={diagnosis === ""} style={{ width: 120 }}>请选择</Button>
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
                        return <Button disabled={diagnosis !== 1} style={{ width: 120 }}>请选择</Button>
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
                        return <Button disabled={diagnosis !== 1} style={{ width: 120 }}>请选择</Button>
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
                        return <Button disabled={diagnosis !== 1} style={{ width: 120 }}>请选择</Button>
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
                        return <input
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
                        return <Button disabled={diagnosis !== 1} style={{ width: 120 }}>请选择</Button>
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
                        return <Button disabled={diagnosis !== 1} style={{ width: 120 }}>请选择</Button>
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


          <Modal
            title="诊断"
            visible={zdVisible}
            okText="确认"
            width={540}
            cancelText="取消"
            onOk={this.handleZdOk}
            onCancel={this.handleZdCancel}
          >
            <Tabs defaultActiveKey="1" >
              <TabPane tab="发作类型" key="1" >
                <Layout>
                  <Sider width={200} className="site-layout-background">

                    <Menu
                      mode="inline"
                      defaultSelectedKeys={['1']}
                      onClick={this.onClickTypeMenu}
                      defaultOpenKeys={['sub1']}
                      style={{ height: '100%', borderRight: 0 }}>

                      {
                        this.state.typeLoaded && this.renderTypeMenu(0)
                      }
                    </Menu>
                  </Sider>
                  <Layout style={{ padding: '0', lineHeight: "30px" }}>
                    <Content
                      className="site-layout-background">
                      <Card name="jzx"  >
                        <Checkbox.Group
                          options={this.optionContet}
                          // onChange={() => {
                          //   this.onChangeMessage(this, 'dd');
                          // }}
                          onChange={this.onChangeMessage}
                        />
                      </Card>
                      <Card name="qmx" visible={qmxVisible.toString()}>
                        <Checkbox.Group
                          options={optionQmx}
                          styles={{ width: "100%" }}
                          onChange={this.onChange}
                        />
                      </Card>
                    </Content>
                  </Layout>
                </Layout>
              </TabPane>
              <TabPane tab="综合症" key="2">
                <Layout>
                  <Sider width={200} className="site-layout-background">
                    <Menu
                      mode="inline"
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={['sub1']}
                      style={{ height: '100%', borderRight: 0 }}>
                      {
                        this.state.typeLoaded && this.renderTypeMenu(1)
                      }
                    </Menu>
                  </Sider>
                  <Layout style={{ padding: '0', lineHeight: "30px" }}>
                    <Content
                      className="site-layout-background">
                      <Card name="jzx"  >
                        <Checkbox.Group
                          options={optionContet}
                          onChange={this.onChangeMessage}
                        />

                      </Card>

                    </Content>
                  </Layout>
                </Layout>
              </TabPane>

            </Tabs>
          </Modal>


        </div>


      </>
    )
  }
}
