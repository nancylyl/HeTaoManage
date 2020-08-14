import React, { PureComponent, useState } from 'react'
import { Row, Col, Input, Select, DatePicker, Table, Button, Space, Pagination, Modal, Form, Radio, message, Cascader,Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import testingAxios from '../../util/testingAxios'
import Api from '../../api/index'
import Axios from '../../util/axios'



const { TextArea } = Input;

const { Option } = Select;
const options = new Array(80).fill('null').map((item, index) => <Option key={index + 1} value={index + 1}>{`${index + 1}`}</Option>)
function handleChange(value) {
  this.setState({
    sex: `${value}`
  })
  console.log(`selected ${value}`);
}
////////////////////////
const props1 = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
  
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
  formRef = React.createRef();

  state = {
    imgurl:"",
    location:"",
    contexttype:"",
    exhibition:"",
    status:"",
    createdtime:"",
    visible: false,
    editvisible:false
  };

  //搜索功能所用方法


  contexttypeInputValue = (event) => {
    this.setState({
      contexttype: event
    })
  };

  createdtimeInputValue = (event) => {
    // console.log("1111")
    // console.log(event)
    if(event._d==null){
     this.setState({
       createdtime:""
     })
    }else{
      this.setState({
        createdtime:event._d
      })
    }
     
  };
  
  handleSearch=()=>{
    console.log("11")
    console.log(this.state);
   Axios({

      url:Api.banner.getBannerList,
      isDev:1,
      params:{
        limit:6,
        page:1,
        contexttype:this.state.contexttype,
        createdtime:this.state.createdtime,
      }
    }).then((res)=>{
      
      console.log("****")
      console.log(res)
      this.setState({
        dataSource:res.data.data,
        num :res.data.count      })
    })
  }
  //-----------------------------------------------------
  handlereset = () => {
    // console.log("222")
    // console.log(this.formRef)
    // this.formRef.current.resetFields();
    // console.log(this.state);
    // this.setState({
    //   contexttype:"",
    //   createdtime:""

    // })
    Axios({

      url:Api.banner.getBannerList,
      isDev:1,
      params:{
        limit:6,
        page:1,
        contexttype:"",
        createdtime:"",
      }
    }).then((res)=>{
      
      console.log("****")
      console.log(res)
      this.setState({
        dataSource:res.data.data,
        num :res.data.count      })
    })


    //在此做提交操作，比如发dispatch等
  };
  //

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

  };


 

  onReset = () => {
    this.formRef.current.resetFields();
  };

 
// ----------------获取banner列表数据------------------
  // getbannerList = (page, limit) => {
  //   testingAxios("https://www.fastmock.site/mock/63908e19f8683a898abc0a03e1010b59/api/bannerManage")
  //     .then((res) => {
  //       console.log(res.data.data);
  //       this.setState({
  //         dataSource: res.data.data.bannerInfo,
  //         num : res.data.count
  //       })
        
  //     })
  // }

  getbannerList(page,limit,imgurl,location,contexttype,exhibition,status,createdtime){
    let data={
      page:page,
      limit:limit,
      imgurl:this.state.imgurl,
      location:this.state.location,
      contexttype:this.state.contexttype,
      exhibition:this.state.exhibition,
      status:this.state.status,
      createdtime:this.state.createdtime,
    }
    Axios({
      url:Api.banner.getBanner,
      isDev:1,
      params:{
        limit:6,
        page:1,
      },
    }).then((res)=>{
      // console.log("1111")
      // console.log(res)
      // console.log(res.data)
      // console.log(res.data.data)
      this.setState({
          dataSource: res.data.data,
          // num : res.data.count
      })
    })
  }
  componentDidMount() {
    this.getbannerList(1,6);
    
    //构造一些初始数据
  }
  getPageContent=(page,limit)=>{
    console.log(page, limit);
    this.getbannerList(page, limit)
}

// bannerdown = (e)=>{
//   console.log(e)
// }
// bannerup =(e)=>{
//   console.log(e)
// }
bannerdown=()=>{

  console.log("333");
}



  render() {
    const style = { background: '#0092ff', padding: '8px 0' };
    // ----------------------banner列表展示部分------------------------------

    const columns = [
      {
        title: 'bannner图',
        dataIndex: 'imgurl',
        key: 'imgurl',
        align: 'center',
      },
      {
        title: '内容类型',
        dataIndex: 'contexttype',
        key: 'contexttype',
        align: 'center',
      },
      {
        title: '位置',
        dataIndex: 'location',
        key: 'location',
        align: 'center',
      },
      {
        title: '展示端',
        dataIndex: 'exhibition',
        key: 'exhibition',
        align: 'center',
      },
      {
        title: '创建时间',
        dataIndex: 'createdtime',
        key: 'createdtime',
        align: 'center',
       
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render(text,record) {
          
          if(record.location==1){
            return "已发布"
          }else if(record.location==2){
            return "已发布"
          }else if(record.location==3){
            return "已发布"
          }else if(record.location==4){
            return "已发布"
          }else if(record.location==5){ 
            return "已发布"
          }else if(record.location==="无"){
            return "未发布"
          }
        },
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',

        render(text,record) {
          if(record.location==1){
            return <Space size="middle"> <CollectionsPage2></CollectionsPage2><a>下架</a> </Space>
       
            
          }else if(record.location==5){
           return <Space size="middle"> <CollectionsPage2></CollectionsPage2><a>下架</a> </Space>
           
          }else if(1<record.location&&record.location<5){
            return <Space size="middle"> <CollectionsPage2></CollectionsPage2><a>下架</a> </Space>
         
          }else{
            return <Space size="middle"> <CollectionsPage2></CollectionsPage2><a>上架</a> </Space>
          }
          
        },
      
      },
    ]
    // ----------------------------------------新增轮播模态框-----------------------------------------
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
        
        
            <Form.Item name="contexttype" label="活动类型" rules={[
              {
                required: true,
                message: '请选择活动类型',
              },
            ]} className="collection-create-form_last-form-item">
              <Radio.Group>
                <Radio value="患教活动">患教活动</Radio>
                <Radio value="病历探讨">病历探讨</Radio>
                <Radio value="h5活动">h5活动</Radio>
                
              </Radio.Group>
            </Form.Item>
            <Form.Item name="status" label="状态" rules={[
              {
                required: true,
                message: '请选择发布还是下架',
              },
            ]} className="collection-create-form_last-form-item">
              <Radio.Group>
                <Radio value="发布">发布</Radio>
                <Radio value="下架">下架</Radio>
                
              </Radio.Group>
            </Form.Item>
            <Form.Item name="exhibition" label="展示端口" rules={[
              {
                required: true,
                message: '请选择展示端口',
              },
            ]} className="collection-create-form_last-form-item">
              <Radio.Group>
                <Radio value="医生端">医生端</Radio>
                <Radio value="患者端">患者端</Radio>
                <Radio value="医生，患者端">医生，患者端</Radio>
                
              </Radio.Group>
            </Form.Item>
            <Form.Item name="location" label="轮播位置" rules={[
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
        testingAxios({
          url: Api.banner.addBanner,
          method:'POST',
          data: { // 这里的参数设置为URL参数（根据URL携带参数）
            contexttype:values.contexttype,
            status:values.status,
            exhibition:values.exhibition,
            location:values.location,
          } 
        }).then((res)=>{
         console.log(res)
         
        })
        
        setVisible(false);
        message.success('操作成功');
        this.getbannerList(1,6)
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

    const CollectionCreateForm2 = ({ visible, onCreate, onCancel }) => {
      const [form] = Form.useForm();
      return (
        <Modal
          visible={visible}
          title="编辑"
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
        
        
            <Form.Item name="contexttype" label="活动类型" rules={[
              {
                required: true,
                message: '请选择活动类型',
              },
            ]} className="collection-create-form_last-form-item">
              <Radio.Group>
                <Radio value="患教活动">患教活动</Radio>
                <Radio value="病历探讨">病历探讨</Radio>
                <Radio value="h5活动">h5活动</Radio>
                
              </Radio.Group>
            </Form.Item>
            <Form.Item name="status" label="状态" rules={[
              {
                required: true,
                message: '请选择发布还是下架',
              },
            ]} className="collection-create-form_last-form-item">
              <Radio.Group>
                <Radio value="发布">发布</Radio>
                <Radio value="下架">下架</Radio>
                
              </Radio.Group>
            </Form.Item>
            <Form.Item name="exhibition" label="展示端口" rules={[
              {
                required: true,
                message: '请选择展示端口',
              },
            ]} className="collection-create-form_last-form-item">
              <Radio.Group>
                <Radio value="医生端">医生端</Radio>
                <Radio value="患者端">患者端</Radio>
                <Radio value="医生，患者端">医生，患者端</Radio>
                
              </Radio.Group>
            </Form.Item>
            <Form.Item name="location" label="轮播位置" rules={[
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
    const CollectionsPage2 = () => {
      const [visible, setVisible] = useState(false);

      const onCreate = values => {
        console.log('Received values of form: ', values);
        testingAxios({
          url: Api.banner.addBanner,
          method:'POST',
          data: { // 这里的参数设置为URL参数（根据URL携带参数）
            contexttype:values.contexttype,
            status:values.status,
            exhibition:values.exhibition,
            location:values.location,
          } 
        }).then((res)=>{
         console.log(res)
         
        })
        
        setVisible(false);
        message.success('操作成功');
        this.getbannerList(1,6)
      };

      return (
        <div>
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            编辑
          </Button>
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
 {/* ---------------------------------搜索部分---------------------------------------------------- */}
     
        <Row align='middle' className='marginT' style={{ marginBottom: 50 }}>
          <Col span={3} align="right">活动类型：&nbsp;</Col>
          <Col span={5}>
            <Select  style={{ width: 150 }} onChange={this.contexttypeInputValue}>
              <Option value="患教活动">患教活动</Option>
              <Option value="病历探讨">病历探讨</Option>
              <Option value="h5活动">h5活动</Option>
            </Select>
          </Col>
          <Col span={3} align="right">创建时间: &nbsp;</Col>
          <Col span={5}><DatePicker style={{ width: 150 }} onChange={this.createdtimeInputValue} placeholder="请选择" /></Col>
          <Col span={2} offset={3}>
            <Button onClick={this.handlereset} >重置</Button>
          </Col>
          <Col span={2}>
            <Button type="primary" onClick={this.handleSearch}>搜索</Button>
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
        <Table columns={columns} dataSource={this.state.dataSource} pagination={{ pageSize: 10,  total:this.state.num , onChange:this.getPageContent}} bordered rowKey="id"></Table>
      </div>
    )
  }
}

export default bannerListManage
