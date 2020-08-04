import React, { PureComponent, useState } from 'react'
import { Row, Col, Input, Select, DatePicker, Table, Button, Space, Pagination, Modal, Form, Radio, message, Cascader, } from 'antd';
import testingAxios from '../../util/testingAxios'
import Api from '../../api/index'
import { Link } from 'react-router-dom'


const { TextArea } = Input;

const { Option } = Select;
const options = new Array(80).fill('null').map((item, index) => <Option key={index + 1} value={index + 1}>{`${index + 1}`}</Option>)

const adoptions = require('../../components/address.json');//诊断数据
function handleChange(value) {
  this.setState({
    sex: `${value}`
  })
  console.log(`selected ${value}`);
}

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class patientListManage extends PureComponent {
  
  state = {
    P_Name: "",//输入框输入值
    P_address: "",//输入框输入值
    medical: 2,//病历填写程度框 默认全部：2
    sex: 2,//性别多选框 默认全部：2
    clinicalTime: "",//上次就诊时间
    visible: false,
    editvisible:false
  };

  //搜索功能所用方法
  P_NameInputValue = (event) => {
    this.setState({
      P_Name: event.target.value,
    })
  };
  P_addressInputValue = (event) => {
    this.setState({
      P_address: event.target.value
    })
  };
  medicalInputValue = (event) => {
    this.setState({
      medical: event
    })
  };
  sexInputValue = (event) => {
    this.setState({
      sex: event
    })
  };
  clinicalTimeInputValue = (event) => {
    this.setState({
      clinicalTime: event._d
    })
  };
  handlePost = () => {
    console.log(this.state);

    //在此做提交操作，比如发dispatch等
  };
  //-----------------------------------------------------

  //新增患者 模态框

  addModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  //-------------------------编辑部分-----------------------

  editform = (text) => {
    console.log(text.P_ID)
    //获取当前点击 行 的id
    this.setState({
      editvisible: true,
    });
    let id = text.id;
    // axios.get(`接口地址/${id}/edit`)  //根据自己公司后端配置的接口地址来 ，获取页面初始化数据
    //     .then(res=>{
    //         console.log(res)
    //         this.setState({
    //             list:res.data.data.advertisement    // 请在构造函数中 定义 list:{}
    //         });
    //         this.props.form.setFieldsValue({     // 双向绑定form 表单的数据
    //             name:this.state.list.name,
    //             sort:this.state.list.sort,
    //             advertisement_node_id:this.state.list.advertisement_node_id,
    //             photo_id:this.state.list.photo_id,
    //             url:this.state.list.url,
    //         })
    //     })
  };
  edithandleOk = values => {
    console.log(values);
    this.setState({
      editvisible: false,
    });
  };
  edithandleCancel = e => {
    console.log(e);
    this.setState({
      editvisible: false,
    });
  };
  formRef = React.createRef();

  onGenderChange = value => {
    this.formRef.current.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };

  onFinish = values => {
    console.log(values);
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  constructor(props) {
    super(props);

    this.state = {

    }
  }
//----------------获取患者列表数据------------------
  getpatientList = (page, limit) => {
    testingAxios({
      url: Api.patients.getpatientList,
      params: { // 这里的参数设置为URL参数（根据URL携带参数）
        page:page,
        limit:limit
      }  
      })
      .then((res) => {
        console.log(res.data.data);
        this.setState({
          dataSource: res.data.data,
          num : res.data.count
        })
        
      })
  }
  componentDidMount() {
    this.getpatientList(0,6);
    
    //构造一些初始数据
  }
  getPageContent=(page,limit)=>{
    console.log(page, limit);
    this.getpatientList(page, limit)
}
  render() {
    const style = { background: '#0092ff', padding: '8px 0' };
    // ----------------------患者列表展示部分------------------------------
    const columns = [
      {
        title: '患者姓名',
        dataIndex: 'P_Name',
        key: 'P_Name',
        align: 'center',
      },
      {
        title: '患者性别',
        dataIndex: 'sex',
        key: 'sex',
        align: 'center',
        render: text => text > 0 ? '男' : '女'
      },
      {
        title: '现居住地址',
        dataIndex: 'P_address',
        key: 'P_address',
        align: 'center',
      },
      {
        title: '上次就诊时间',
        dataIndex: 'clinicalTime',
        key: 'clinicalTime',
        align: 'center',
      },
      {
        title: '病历填写程度',
        dataIndex: 'medical',
        key: 'medical',
        align: 'center',
        render: text => text > 0 ? '已填写' : '未填写'
      },
      {
        title: '绑定的医生',
        dataIndex: 'bindDoctor',
        key: 'bindDoctor',
        align: 'center',
      },
      // {
      //   title: 'Tags',
      //   key: 'tags',
      //   dataIndex: 'tags',
      //   render: tags => (
      //     <>
      //       {tags.map(tag => {
      //         let color = tag.length > 5 ? 'geekblue' : 'green';
      //         if (tag === 'loser') {
      //           color = 'volcano';
      //         }
      //         return (
      //           <Tag color={color} key={tag}>
      //             {tag.toUpperCase()}
      //           </Tag>
      //         );
      //       })}
      //     </>
      //   ),
      // },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (text, record) => (

          <Space size="middle">
            <Link to={`/index/patient/CaseBox`}>查看</Link>
            {/* <a onClick={this.editform.bind(text, record)}>编辑</a> */}
            <CollectionsPage2 onClick={this.editform.bind(text, record)}></CollectionsPage2>
            <a>更换医生</a>
            {record.medical > 0 ? '病历' : <Link to={"/index/patient/Addcase/0"}>新增病历</Link>}
          </Space>
        ),
      },
    ]
    // ----------------------------------------新增患者部分模态框组件-----------------------------------------
    const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
      const [form] = Form.useForm();
      return (
        <Modal
          visible={visible}
          title="新增患者"
          okText="确认"
          cancelText="取消"
          onCancel={onCancel}
          onOk={() => {
            form
              .validateFields()
              .then(values => {
                form.resetFields();
                onCreate(values);
              })
              .catch(info => {
                console.log('Validate Failed:', info);
              });
          }}
        >
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
              modifier: 'public',
            }}
          >
            <Form.Item
              name="tel"
              label="手机号"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/),
                  message: '请输入正确的手机号',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="P_Name"
              label="姓名"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/\S/),
                  message: '请填写姓名',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="sex" label="性别" rules={[
              {
                required: true,
                message: '请选择性别',
              },
            ]} className="collection-create-form_last-form-item">
              <Radio.Group>
                <Radio value="1">男</Radio>
                <Radio value="0">女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="birthday" label="出生日期" rules={[
              {
                required: true,
                message: '请选择出生日期',
              },
            ]}>
              <DatePicker placeholder="请选择出生日期" />
            </Form.Item>
            <Form.Item
              label="发病年龄"
              rules={[{ required: true, message: "必填" }]}
              name="onsetAge" >
              <Select style={{ width: 120 }} placeholder="请选择发病年龄">
                <Option value={""}>请选择</Option>
                {
                  options
                }
              </Select>
            </Form.Item>
            <Form.Item label="现居住地"
              rules={[{ required: true, message: "必填" }]}
              name="P_address" >
              <Cascader options={adoptions} placeholder="请选择居住地" />
            </Form.Item>
            <Form.Item name="description" label="备注">
              <TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
      );
    };
    const CollectionsPage = () => {
      const [visible, setVisible] = useState(false);

      const onCreate = values => {
        console.log('Received values of form: ', values);
        setVisible(false);
        message.success('操作成功');
      };

      return (
        <div>
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            新增患者
          </Button>
          <CollectionCreateForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </div>
      );
    };
    //---------------------------------------编辑模态框组件-----------------------------------------
    const CollectionCreateForm2 = ({ visible, onCreate, onCancel }) => {
      const [form] = Form.useForm();
      return (
        <Modal
          visible={visible}
          title="编辑患者"
          okText="更新"
          cancelText="取消"
          onCancel={onCancel}
          onOk={() => {
            form
              .validateFields()
              .then(values => {
                form.resetFields();
                onCreate(values);
              })
              .catch(info => {
                console.log('Validate Failed:', info);
              });
          }}
        >
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
              modifier: 'public',
            }}
          >
            <Form.Item
              name="tel"
              label="手机号"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/),
                  message: '请输入正确的手机号',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="P_Name"
              label="姓名"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/\S/),
                  message: '请填写姓名',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="sex" label="性别" rules={[
              {
                required: true,
                message: '请选择性别',
              },
            ]} className="collection-create-form_last-form-item">
              <Radio.Group>
                <Radio value="1">男</Radio>
                <Radio value="0">女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="birthday" label="出生日期" rules={[
              {
                required: true,
                message: '请选择出生日期',
              },
            ]}>
              <DatePicker placeholder="请选择出生日期" />
            </Form.Item>
            <Form.Item
              label="发病年龄"
              rules={[{ required: true, message: "必填" }]}
              name="onsetAge" >
              <Select style={{ width: 120 }} placeholder="请选择发病年龄">
                <Option value={""}>请选择</Option>
                {
                  options
                }
              </Select>
            </Form.Item>
            <Form.Item label="现居住地"
              rules={[{ required: true, message: "必填" }]}
              name="P_address" >
              <Cascader options={adoptions} placeholder="请选择居住地" />
            </Form.Item>
            <Form.Item name="description" label="备注">
              <TextArea rows={4} />
            </Form.Item>
          </Form>
        </Modal>
      );
    };
    const CollectionsPage2 = () => {
      const [visible, setVisible] = useState(false);

      const onCreate = values => {
        console.log('Received values of form: ', values);
        setVisible(false);
        message.success('操作成功');
      };

      return (
        <div>
          <a
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            编辑
          </a>
          <CollectionCreateForm2
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </div>
      );
    };
    return (
      <div>
        {/* ---------------------------------编辑部分模态框---------------------------------------------------- */}
        <Modal
              title="编辑患者"
              visible={this.state.editvisible}
              onOk={this.edithandleOk}
              onCancel={this.edithandleCancel}
            >
              <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                  <Form.Item
                  name="tel"
                  label="手机号"
                  rules={[
                    {
                      required: true,
                      pattern: new RegExp(/^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/),
                      message: '请输入正确的手机号',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="P_Name"
                  label="姓名"
                  rules={[
                    {
                      required: true,
                      pattern: new RegExp(/\S/),
                      message: '请填写姓名',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="sex" label="性别" rules={[
                  {
                    required: true,
                    message: '请选择性别',
                  },
                ]} className="collection-create-form_last-form-item">
                  <Radio.Group>
                    <Radio value="1">男</Radio>
                    <Radio value="0">女</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="birthday" label="出生日期" rules={[
                  {
                    required: true,
                    message: '请选择出生日期',
                  },
                ]}>
                  <DatePicker placeholder="请选择出生日期" />
                </Form.Item>
                <Form.Item
                  label="发病年龄"
                  rules={[{ required: true, message: "必填" }]}
                  name="onsetAge" >
                  <Select style={{ width: 120 }} placeholder="请选择发病年龄">
                    <Option value={""}>请选择</Option>
                    {
                      options
                    }
                  </Select>
                </Form.Item>
                <Form.Item label="现居住地"
                  rules={[{ required: true, message: "必填" }]}
                  name="P_address" >
                  <Cascader options={adoptions} placeholder="请选择居住地" />
                </Form.Item>
                <Form.Item name="description" label="备注">
                  <TextArea rows={4} />
                </Form.Item>
                
              </Form>
              <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button htmlType="button" onClick={this.onReset}>
                    Reset
                  </Button>
                </Form.Item>
            </Modal>
 {/* ---------------------------------搜索部分---------------------------------------------------- */}
        <Row align='middle' justify='start'>
          <Col span={3} align="right">患者姓名：</Col>
          <Col span={5} ><Input placeholder="请输入" style={{ width: 150 }} value={this.state.P_Name}
            onChange={this.P_NameInputValue}
          /></Col>
          <Col span={3} align="right">患者性别：</Col>
          <Col span={5}>
            <Select defaultValue="2" style={{ width: 150 }} onChange={this.sexInputValue}>
              <Option value="2">全部</Option>
              <Option value="1">男</Option>
              <Option value="0">女</Option>
            </Select>
          </Col>
          <Col span={3} align="right">现居住地：</Col>
          <Col span={5}><Input placeholder="请输入" style={{ width: 150 }} value={this.state.P_address}
            onChange={this.P_addressInputValue} /></Col>
        </Row>
        <Row align='middle' className='marginT' style={{ marginBottom: 50 }}>
          <Col span={3} align="right">病历填写程度：</Col>
          <Col span={5}>
            <Select defaultValue="全部" style={{ width: 150 }} onChange={this.medicalInputValue}>
              <Option value="2">全部</Option>
              <Option value="1">已填写</Option>
              <Option value="0">未填写</Option>
            </Select>
          </Col>
          <Col span={3} align="right">上次就诊时间：</Col>
          <Col span={5}><DatePicker style={{ width: 150 }} onChange={this.clinicalTimeInputValue} placeholder="请选择" /></Col>
          <Col span={2} offset={3}>
            <Button >重置</Button>
          </Col>
          <Col span={2}>
            <Button type="primary" onClick={this.handlePost}>搜索</Button>
          </Col>
        </Row>
        <Row>
          <Col span={5} align='left' className='title'>
            <span className='titleB'>患者列表</span>
            <span className='titleS'>（共90条记录）</span>
          </Col>
          {/* -------------------------------新增患者部分------------------------------------ */}
          <Col span={2} align='right' offset={16} className='marginT'>
            <CollectionsPage />
          </Col>
        </Row>
        {/* ------------------------------------列表显示部分----------------------------------------------- */}
        <Table columns={columns} dataSource={this.state.dataSource} pagination={{ pageSize: 6,  total:this.state.num , onChange:this.getPageContent}} bordered rowKey="P_ID"></Table>
      </div>
    )
  }
}

export default patientListManage
