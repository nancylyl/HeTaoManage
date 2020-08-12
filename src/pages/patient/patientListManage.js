import React, { PureComponent, useState } from 'react'
import { Row, Col, Input, Select, DatePicker, Table, Button, Space, Pagination, Modal, Form, Radio, message, Cascader, } from 'antd';
import testingAxios from '../../util/testingAxios'
import Axios from '../../util/axios'
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
  formRef = React.createRef()
  state = {
    P_Name: "",//输入框输入值
    P_address: "",//输入框输入值
    medical: "",//病历填写程度框 默认全部：2
    sex: '',//性别多选框 默认全部：2
    clinicalTime: "",//上次就诊时间
    visible: false,
    editvisible:false,
    bianji:{},
    bianjiID:"",
  };

  //搜索功能所用方法
  P_NameInputValue = (event) => {
    this.setState({
      p_Name: event.target.value,
    })
  };
  P_addressInputValue = (event) => {
    this.setState({
      p_address: event.target.value
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
    testingAxios({
      url: Api.patients.getpatientList, 
      method:'POST',
      data: { // 这里的参数设置为URL参数（根据URL携带参数）
        page:1,
        limit:6,
        P_Name:this.state.p_Name,
        sex:this.state.sex,
        P_address:this.state.p_address,
        medical:this.state.medical,
        clinicalTime:this.state.clinicalTime
      }  
      })
      .then((res) => {
        console.log(res);
        this.setState({
          dataSource: res.data.data,
          num : res.data.count
        })
        
      })
    //在此做提交操作，比如发dispatch等
  };
  // 重置搜索框
  delSearch = () => {
    this.formRef.current.resetFields();
    this.setState ({
      p_Name: "",//输入框输入值
      p_address: "",//输入框输入值
      medical: "",//病历填写程度框 默认全部：2
      sex: '',//性别多选框 默认全部：2
      clinicalTime: "",//上次就诊时间
    })
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
    console.log(text);
    testingAxios({
      url: Api.patients.getpatient, 
      params: { // 这里的参数设置为URL参数（根据URL携带参数）
        // P_ID:text.p_ID
      }  
      })
      .then((res) => {
        console.log(res);
        this.setState({
          editvisible: true,
          bianji:res.data.data
        });
      })
    //获取当前点击 行 的id
        // this.setState({
        //   bianji:res.data.data
        // })
   console.log(this.state.bianji);
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
    console.log(55555555555555555);
    this.formRef.current.resetFields();
  };

  constructor(props) {
    super(props);

    this.state = {

    }
  }
//----------------获取患者列表数据------------------
  getpatientList = (page, limit,P_Name,sex,P_address,medical,clinicalTime) => {
    let data={  
      page:page,
      limit:limit,
      P_Name:this.state.p_Name,
      sex:this.state.sex,
      P_address:this.state.p_address,
      medical:this.state.medical,
      clinicalTime:this.state.clinicalTime}
    testingAxios({
      url: Api.patients.getpatientList, 
      method:'POST',
      data:data
      })
      .then((res) => {
        console.log(res);
        this.setState({
          dataSource: res.data.data,
          num : res.data.count
        })
        
      })
  }
  componentDidMount() {
    this.getpatientList(1,6);
    
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
        dataIndex: 'p_Name',
        key: 'p_Name',
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
        dataIndex: 'p_address',
        key: 'p_address',
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
        dataIndex: 'p_ID',
        key: 'p_ID',
        align: 'center',
        render: (text, record) => (
          <Space size="middle">
            <Link to={`/index/patient/CaseBox`}>查看</Link>
            {/* <a onClick={this.editform.bind(text, record)}>编辑</a> */}
           <CollectionsPage2 ></CollectionsPage2>
            
            <a onClick={this.editform.bind(text, record)}>更换医生</a>
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
              name="p_Name"
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
              label="发病时间"
              rules={[{ required: true, message: "必填" }]}
              name="date">
              <DatePicker style={{ width: 150 }} placeholder="请选择" />
            </Form.Item>
            <Form.Item label="现居住地"
              rules={[{ required: true, message: "必填" }]}
              name="p_address" >
              <Cascader options={adoptions} placeholder="请选择居住地" />
            </Form.Item>
            {/* <Form.Item name="description" label="备注">
              <TextArea rows={4} />
            </Form.Item> */}
          </Form>
        </Modal>
      );
    };
    const CollectionsPage = () => {
      const [visible, setVisible] = useState(false);
      // ------------------------新增框点击确认后传参------------------------------------
      const onCreate = values => {
        console.log('Received values of form: ', values);
        testingAxios({
          url: Api.patients.addpatient,
          method:'POST',
          data: { // 这里的参数设置为URL参数（根据URL携带参数）
            tel:values.tel,
            P_Name:values.p_Name,
            sex:parseInt(values.sex),
            birthday:values.birthday._d,
            date:values.date._d,
            P_address:values.p_address,
          }  
          })
          .then((res) => {
            console.log(res); 
          })
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
              <Input defaultValue = "{this.state.bianji}" />
            </Form.Item>
            <Form.Item
              name="p_Name"
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
              label="发病时间"
              rules={[{ required: true, message: "必填" }]}
              name="date" >
               <DatePicker style={{ width: 150 }} placeholder="请选择" />
            </Form.Item>
            <Form.Item label="现居住地"
              rules={[{ required: true, message: "必填" }]}
              name="p_address" >
              <Cascader options={adoptions} placeholder="请选择居住地" />
            </Form.Item>
            {/* <Form.Item name="description" label="备注">
              <TextArea rows={4} />
            </Form.Item> */}
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
            onClick={() => {  
          
              setVisible(true);
            }}
          >
            编辑
          </a>
          <CollectionCreateForm2
            visible={visible}
            onCreate={() => {
              onCreate();
            }}
            onCancel={() => {
              console.log(this.props);
              setVisible(false);
            }}
          />
        </div>
      );
    };
    return (
      <div>
        {/* ---------------------------------编辑部分模态框---------------------------------------------------- */}
        
 {/* ---------------------------------搜索部分---------------------------------------------------- */}
        <Form
          name="patient"
          initialValues={{ remember: true }}
          ref={this.formRef}
        >           
        <Row align='middle' justify='start'>
          <Col span={7}>
            <Form.Item
                  label="患者姓名"
                  name="P_Name">
                  <Input placeholder="请输入" style={{ width: 178 }} value={this.state.P_Name}
              onChange={this.P_NameInputValue} />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
                  label="患者性别："
                  name="sex">
                  <Select defaultValue="" style={{ width: 170 }} onChange={this.sexInputValue}>
                    <Option value={-1}>全部</Option>
                    <Option value={1}>男</Option>
                    <Option value={0}>女</Option>
                  </Select>
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
                  label="现居住地："
                  name="p_address">
                  <Input placeholder="请输入" style={{ width: 175 }} value={this.state.P_address}
            onChange={this.P_addressInputValue} />
            </Form.Item>
          </Col>
        </Row>
        <Row align='middle' className='marginT' style={{ marginBottom: 50 }}>
        <Col span={7}>
            <Form.Item
                  label="病历填写程度："
                  name="medical">
                  <Select defaultValue="全部" style={{ width: 150 }} onChange={this.medicalInputValue}>
                    <Option value="">全部</Option>
                    <Option value={1}>已填写</Option>
                    <Option value={0}>未填写</Option>
                  </Select>
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
                  label="上次就诊时间："
                  name="clinicalTime">
                  <DatePicker style={{ width: 150 }} onChange={this.clinicalTimeInputValue} placeholder="请选择" />
            </Form.Item>
          </Col>
          <Col span={3} offset={1}>
            <Form.Item >
              <Button onClick={this.delSearch}>重置</Button>
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item >
              <Button type="primary" onClick={this.handlePost}>搜索</Button>
            </Form.Item>
          </Col>
        </Row>
        </Form>
        <Row>
          <Col span={5} align='left' className='title'>
            <span className='titleB'>患者列表</span>
                  <span className='titleS'>（共{this.state.num}条记录）</span>
          </Col>
          {/* -------------------------------新增患者部分------------------------------------ */}
          <Col span={2} align='right' offset={16} className='marginT'>
            <CollectionsPage />
          </Col>
        </Row>
        {/* ------------------------------------列表显示部分----------------------------------------------- */}
        <Table columns={columns} dataSource={this.state.dataSource} pagination={{ pageSize: 6,  total:this.state.num , onChange:this.getPageContent}} bordered rowKey="p_ID"></Table>
      </div>
    )
  }
}

export default patientListManage
