import React, { PureComponent, useState } from 'react'
import { Row, Col, Input, Select, DatePicker, Table, Button, Space, Pagination, Modal, Form, Radio, message, Cascader, } from 'antd';
import testingAxios from '../../util/testingAxios'

import { Link } from 'react-router-dom'


const { TextArea } = Input;

const { Option } = Select;
const options = new Array(80).fill('null').map((item, index) => <Option key={index + 1} value={index + 1}>{`${index + 1}`}</Option>)


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

class rechargeListManage extends PureComponent {
  
  state = {
  
    rechargeManage_Type: 2,
    rechargeManage_Time: "",
    visible: false,
    editvisible:false
  };

  //搜索功能所用方法


  // rechargInputValue = (event) => {
  //   this.setState({
  //     medical: event
  //   })
  // };
 
  // TimeInputValue = (event) => {
  //   this.setState({
  //     rechargeManage_Time: event._d
  //   })
  // };
  // handlePost = () => {
  //   console.log(this.state);

    //在此做提交操作，比如发dispatch等
  // };
  //-----------------------------------------------------

  //新增充值 模态框

  // addModal = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // };

  // handleOk = e => {
  //   console.log(e);
  //   this.setState({
  //     visible: false,
  //   });
  // };

  // handleCancel = e => {
  //   console.log(e);
  //   this.setState({
  //     visible: false,
  //   });
  // };
  //-------------------------编辑部分-----------------------

  // editform = (text) => {
  //   console.log(text.rechargeManage_Id)
    //获取当前点击 行 的id
    // this.setState({
    //   editvisible: true,
    // });
    // let id = text.id;
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
  // };
  // edithandleOk = values => {
  //   console.log(values);
  //   this.setState({
  //     editvisible: false,
  //   });
  // };
  // edithandleCancel = e => {
  //   console.log(e);
  //   this.setState({
  //     editvisible: false,
  //   });
  // };
  // formRef = React.createRef();

  // onGenderChange = value => {
  //   this.formRef.current.setFieldsValue({
  //     note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
  //   });
  // };

  // onFinish = values => {
  //   console.log(values);
  // };

  // onReset = () => {
  //   this.formRef.current.resetFields();
  // };

  constructor(props) {
    super(props);

    this.state = {

    }
  }
//----------------获取充值列表数据------------------
  getrecharegeList = (page, limit) => {
    testingAxios('https://www.fastmock.site/mock/63908e19f8683a898abc0a03e1010b59/api/rechargeManage')
      .then((res) => {
        console.log(res.data.data);
        this.setState({
          dataSource: res.data.data.rechargeManageInfo,
          num : res.data.count
        })
        
      })
  }
  componentDidMount() {
    this.getrecharegeList(0,6);
    
    //构造一些初始数据
  }
  getPageContent=(page,limit)=>{
    console.log(page, limit);
    this.getrecharegeList(page, limit)
}
  render() {
    const style = { background: '#0092ff', padding: '8px 0' };
    // ----------------------患者列表展示部分------------------------------
    const columns = [
      {
        title: '充值名称',
        dataIndex: 'rechargeManage_Type',
        key: 'rechargeManage_Type',
        align: 'center',
        render(text, record) {
          console.log(record.rechargeManage_Money)
          if(record.rechargeManage_Money==0){
            return "月卡"
          }else if(record.rechargeManage_Money==1){
            return "季卡"
          }else if(record.rechargeManage_Money==2){
            return "半年卡"
          }
          else if(record.rechargeManage_Money==3){
            return "年卡"
          }
          
        },
      },
      {
        title: '充值金额',
        dataIndex: 'rechargeManage_Money',
        key: 'rechargeManage_Money',
        align: 'center',
        render(text) {
          if(text==0){
            return "100"
          }else if(text==1){
            return "300"
          }else if(text==2){
            return "600"
          }
          else if(text==3){
            return "1200"
          }
          
        },
      },
      {
        title: '每日给予医生核桃币数',
        dataIndex: 'rechargeManage_Hetao',
        key: 'rechargeManage_Hetao',
        align: 'center',
        render(text,record) {
          if(record.rechargeManage_Money==0){
            return "2"
          }else if(record.rechargeManage_Money==1){
            return "3"
          }else if(record.rechargeManage_Money==2){
            return "3.5"
          }
          else if(record.rechargeManage_Money==3){
            return "4"
            
          }
          
        },
      },
      {
        title: '累计充值金额',
        dataIndex: 'rechargeManage_TotalMoney',
        key: 'rechargeManage_TotalMoney',
        align: 'center',
      
      },
      {
        title: '累计给予医生核桃币数',
        dataIndex: 'rechargeManage_TotalHetao',
        key: 'rechargeManage_TotalHetao',
        align: 'center',
       
      },
      {
        title: '会员有效期',
        dataIndex: 'VIP_time',
        key: 'VIP_time',
        align: 'center',
        render(text,record) {
          if(record.rechargeManage_Money==0){
            return "30天"
          }else if(record.rechargeManage_Money==1){
            return "90天"
          }else if(record.rechargeManage_Money==2){
            return "180天"
          }else if(record.rechargeManage_Money==3){
            return "365天"
          }
          
        },
      },
  
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: () =>
        <Space size="middle">
          <a>删除</a> 
        </Space>,
      },
    ]
    // ----------------------------------------新增充值-----------------------------------------
    const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
      const [form] = Form.useForm();
      return (
        <Modal
          visible={visible}
          title="充值列表"
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
        
        
            <Form.Item name="rechargeManage_Money" label="请输入充值金额" rules={[
              {
                required: true,
                message: '请输入充值金额',
              },
            ]} className="collection-create-form_last-form-item">
              <Input />
            </Form.Item>


            <Form.Item name="rechargeManage_Type" label="请选择充值卡类型" rules={[
              {
                required: true,
                message: '请选择充值卡类型',
              },
            ]} className="collection-create-form_last-form-item">
              <Radio.Group>
                <Radio value="0">月卡</Radio>
                <Radio value="1">季卡</Radio>
                <Radio value="2">半年卡</Radio>
                <Radio value="3">年卡</Radio>
                
              </Radio.Group>
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
            新增充值卡
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
 
    return (
      <div>
 {/* ---------------------------------搜索部分---------------------------------------------------- */}
{/*      
        <Row align='middle' className='marginT' style={{ marginBottom: 50 }}>
          <Col span={3} align="right">充值名称&nbsp;</Col>
          <Col span={5}>
            <Select placeholder="请输入"  style={{ width: 150 }} onChange={this.rechargInputValue}>
              <Option value="0">月卡</Option>
              <Option value="1">季卡</Option>
              <Option value="2">半年卡</Option>
              <Option value="3">年卡</Option>
            </Select>
          </Col>
          <Col span={3} align="right">筛选日期: &nbsp;</Col>
          <Col span={5}><DatePicker style={{ width: 150 }} onChange={this.TimeInputValue} placeholder="请选择" /></Col>
          <Col span={2} offset={3}>
            <Button >重置</Button>
          </Col>
          <Col span={2}>
            <Button type="primary" onClick={this.handlePost}>搜索</Button>
          </Col>
        </Row> */}
        <Row>
          <Col span={5} align='left' className='title'>
            <span className='titleB'>充值</span>
            <span className='titleS'>（共4种充值方式）</span>
          </Col>
          {/* ------------------------------------------------------------------- */}
          <Col span={2} align='right' offset={16} className='marginT'>
            <CollectionsPage />
          </Col>
        </Row>
        {/* ------------------------------------列表显示部分----------------------------------------------- */}
        <Table columns={columns} dataSource={this.state.dataSource} pagination={{ pageSize: 10,  total:this.state.num , onChange:this.getPageContent}} bordered rowKey="rechargeManage_Id"></Table>
      </div>
    )
  }
}

export default rechargeListManage
