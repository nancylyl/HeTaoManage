import React, { PureComponent, useState } from 'react'
import { Row, Col, Input, Select, DatePicker, Table, Button, Space, Pagination, Modal, Form, Radio, message, Cascader, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import testingAxios from '../../util/testingAxios'


const { TextArea } = Input;

const { Option } = Select;
const options = new Array(80).fill('null').map((item, index) => <Option key={index + 1} value={index + 1}>{`${index + 1}`}</Option>)

////////////////////////
const props1 = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange ({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    // {
    //   uid: '1',
    //   name: 'xxx.png',
    //   status: 'done',
    //   response: 'Server Error 500', // custom error message to show
    //   url: 'http://www.baidu.com/xxx.png',
    // },
    // {
    //   uid: '2',
    //   name: 'yyy.png',
    //   status: 'done',
    //   url: 'http://www.baidu.com/yyy.png',
    // },
    // {
    //   uid: '3',
    //   name: 'zzz.png',
    //   status: 'error',
    //   response: 'Server Error 500', // custom error message to show
    //   url: 'http://www.baidu.com/zzz.png',
    // },
  ],
};
///////////////////////////

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 12,
  },
};

class bannerListManage extends PureComponent {

  state = {


    sex: 2,//性别多选框 默认全部：2
    clinicalTime: "",//上次就诊时间
    visible: false,
    editvisible: false
  };

  //搜索功能所用方法


  activeInputValue = (event) => {
    this.setState({
      active: event
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


  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  constructor(props) {
    super(props);

    this.state = {

    }
  }
  //----------------获取banner列表数据------------------
  getbannerList = (page, limit) => {
    testingAxios('https://www.fastmock.site/mock/63908e19f8683a898abc0a03e1010b59/api/bannerManage')
      .then((res) => {
        console.log(res.data.data);
        this.setState({
          dataSource: res.data.data.bannerInfo,
          num: res.data.count
        })

      })
  }
  componentDidMount () {
    this.getbannerList(0, 6);

    //构造一些初始数据
  }
  getPageContent = (page, limit) => {
    console.log(page, limit);
    this.getbannerList(page, limit)
  }
  render () {
    const style = { background: '#0092ff', padding: '8px 0' };
    // ----------------------banner列表展示部分------------------------------
    const columns = [
      {
        title: 'bannner图',
        dataIndex: 'banner_Url',
        key: 'banner_Url',
        align: 'center',
      },
      {
        title: '内容类型',
        dataIndex: 'active',
        key: 'active',
        align: 'center',
        render (text) {
          if (text == 0) {
            return "患教活动"
          } else if (text == 1) {
            return "病历探讨"
          } else if (text == 2) {
            return "h5活动"
          }

        },
      },
      {
        title: '位置',
        dataIndex: 'banner_Loacl',
        key: 'banner_Loacl',
        align: 'center',
      },
      {
        title: '展示端',
        dataIndex: 'exhibition_End',
        key: 'exhibition_End',
        align: 'center',
        render (text) {
          if (text == 0) {
            return "医生端"
          } else if (text == 1) {
            return "患者端"
          } else if (text == 2) {
            return "医生，患者端"
          }

        },
      },
      {
        title: '创建时间',
        dataIndex: 'Creation_Time',
        key: 'Creation_Time',
        align: 'center',

      },
      {
        title: '状态',
        dataIndex: 'banner_State',
        key: 'banner_State',
        align: 'center',
        render (text) {
          if (text == 0) {
            return "已发布"
          } else if (text == 1) {
            return "未发布"
          } else if (text == 2) {
            return "下架"
          }

        },
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: () =>
          <Space size="middle">
            <a>查看</a>zzz
          <a>编辑</a>
          </Space>,
      },
    ]
    // ----------------------------------------新增轮播-----------------------------------------
    const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
      const [form] = Form.useForm();
      return (
        <Modal
          visible={visible}
          title="新增轮播图"
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


            <Form.Item name="active" label="活动类型" rules={[
              {
                required: true,
                message: '请选择活动类型',
              },
            ]} className="collection-create-form_last-form-item">
              <Radio.Group>
                <Radio value="0">患教活动</Radio>
                <Radio value="1">病历探讨</Radio>
                <Radio value="2">h5活动</Radio>

              </Radio.Group>
            </Form.Item>
            <Form.Item name="banner_State" label="状态" rules={[
              {
                required: true,
                message: '请选择发布还是下架',
              },
            ]} className="collection-create-form_last-form-item">
              <Radio.Group>
                <Radio value="0">发布</Radio>
                <Radio value="2">下架</Radio>

              </Radio.Group>
            </Form.Item>
            <Form.Item name="exhibition_End" label="展示端口" rules={[
              {
                required: true,
                message: '请选择展示端口',
              },
            ]} className="collection-create-form_last-form-item">
              <Radio.Group>
                <Radio value="0">医生端</Radio>
                <Radio value="1">患者端</Radio>
                <Radio value="2">医生，患者端</Radio>

              </Radio.Group>
            </Form.Item>
            <Form.Item name="banner_Loacl" label="轮播位置" rules={[
              {
                required: true,
                message: '请选择展示位置',
              },
            ]} className="collection-create-form_last-form-item">
              <Radio.Group>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
                <Radio value="4">4</Radio>
                <Radio value="5">5</Radio>

              </Radio.Group>
            </Form.Item>
            {/* //////文件上传////// */}
            <Upload {...props1}>
              <Button>
                <UploadOutlined /> 请选择你要上传的图片
            </Button>
            </Upload>
            {/* //////文件上传////// */}


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
            新增轮播图
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

        <Row align='middle' className='marginT' style={{ marginBottom: 50 }}>
          <Col span={3} align="right">活动类型：&nbsp;</Col>
          <Col span={5}>
            <Select style={{ width: 150 }} onChange={this.activeInputValue}>
              <Option value="0">患教活动</Option>
              <Option value="1">病历探讨</Option>
              <Option value="2">h5活动</Option>
            </Select>
          </Col>
          <Col span={3} align="right">创建时间: &nbsp;</Col>
          <Col span={5}><DatePicker style={{ width: 150 }} onChange={this.clinicalTimeInputValue} placeholder="请选择" /></Col>
          <Col span={2} offset={3}>
            <Button onClick={this.handlePost} >重置</Button>
          </Col>
          <Col span={2}>
            <Button type="primary" onClick={this.handlePost}>搜索</Button>
          </Col>
        </Row>
        <Row>
          <Col span={5} align='left' className='title'>
            <span className='titleB'>轮播图列表</span>
            <span className='titleS'>（共30条记录）</span>
          </Col>
          {/* ------------------------------------------------------------------- */}
          <Col span={2} align='right' offset={16} className='marginT'>
            <CollectionsPage />
          </Col>
        </Row>
        {/* ------------------------------------列表显示部分----------------------------------------------- */}
        <Table columns={columns} dataSource={this.state.dataSource} pagination={{ pageSize: 10, total: this.state.num, onChange: this.getPageContent }} bordered rowKey="P_ID"></Table>
      </div>
    )
  }
}

export default bannerListManage
