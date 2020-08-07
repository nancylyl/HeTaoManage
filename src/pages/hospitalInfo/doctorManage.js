import React, {PureComponent, useState} from 'react'
import {Button, Col, DatePicker, Form, Input, Modal, Row, Select, Space, Table,message,Upload} from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import styles from "../discuss/style.module.scss";
import locale from "antd/lib/date-picker/locale/zh_CN";
import Axios from '../../util/axios'
import Api from '../../api/index'
import {Link} from "react-router-dom";

const { Option } = Select;
const { TextArea } = Input;

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key:'id',
    align: 'center',
  },
  {
    title: '医生姓名',
    dataIndex: 'Name',
    align: 'center',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
  },
  {
    title: '所属医院',
    dataIndex: 'hospital',
    align: 'center',
  },
  {
    title: '拥有患者',
    dataIndex: 'pnumber',
    align: 'center',
  },
  {
    title: '手机号',
    dataIndex: 'phonenumber',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createdate',
    align: 'center',
  },
  {
    title: '账号状态',
    dataIndex: 'status',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: '操作',
    align: 'center',
    render: (text,record) =>
        <Space size="middle">
          <Link to={{pathname:'/index/hospitalInfo/checkDoctor',state:record}}>查看</Link>
          <CollectionsPage1/>
          <a>停用</a>
        </Space>,
  },
];

//图片上传组件
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
class Avatar extends React.Component {
  state = {
    loading: false,
  };
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl,
            loading: false,
          }),
      );
    }
  };
  render() {
    const uploadButton = (
        <div>
          {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
          {/*<div className="ant-upload-text"></div>*/}
        </div>
    );
    const { imageUrl } = this.state;
    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
    );
  }
}

//新增模态框
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
      <Modal
          visible={visible}
          width='640px'
          title="新增医生"
          okText="确定"
          cancelText="关闭"
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
            {...layout}
            // layout="horizontal"
            name="form_in_modal"
            initialValues={{
              modifier: 'public',
            }}
        >
          <Row justify="start" gutter={[20,5]}>
            <Col span={24}>
              <Form.Item>
                <h3>基本信息</h3>
              </Form.Item>
            </Col>
            <Col span={13}>
              <Form.Item label="头像上传" name='avatar' rules={[{required: true,message: '请上传头像'}]}>
                <Avatar></Avatar>
                <p>上传图片大小请尽可能小于100k，图片尺寸（150x150px）支持图片格式 .jpg  .png  .gif</p>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Name" label="姓名" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}
              >
                <Input placeholder='请输入'/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="sex" label="姓别" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}>
                <Select defaultValue="请选择"  allowClear className = {styles.select} >
                  <Option value="0">男</Option>
                  <Option value="1">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phonenumber" label="手机号" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}>
                <Input placeholder='请输入'/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="hospital" label="所属医院" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}>
                <Select defaultValue="请选择"  allowClear className = {styles.select} >
                  <Option value="0">北京癫痫医院</Option>
                  <Option value="1">上海癫痫医院</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="profession" label="职称" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}>
                <Select defaultValue="请选择"  allowClear className = {styles.select} >
                  <Option value="0">主治医生</Option>
                  <Option value="1">实习医生</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="subject" label="科室" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}>
                <Select defaultValue="请选择"  allowClear className = {styles.select} >
                  <Option value="0">癫痫脑外科</Option>
                  <Option value="1">癫痫脑内科</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="experience" label="从医经验" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}>
                <Input placeholder='请输入'/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="play" label="账号角色" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}>
                <Select defaultValue="请选择"  allowClear className = {styles.select} >
                  <Option value="0">管理员</Option>
                  <Option value="1">普通用户</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="type" label="医生类型" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}>
                <Select defaultValue="请选择"  allowClear className = {styles.select} >
                  <Option value="0">普通医生</Option>
                  <Option value="1">特权医生</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <h3>审核信息</h3>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="资格证" rules={[{required: true,message: '请上传资格证'}]} name='certificate'>
                <Avatar></Avatar>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <h3>介绍信息</h3>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="基本信息" name="message" rules={[{required: true,message: '内容不能为空'}]}>
                <TextArea rows={4} placeholder='请输入医院任职情况，如姓名、性别、职称、现任职、曾任职等（200字以内）'/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
  );
};
//新增组件
const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);
  const onCreate = values => {
    console.log('获取到的值: ', values);
    setVisible(false);
    message.success('新增成功！');
  };
  return (
      <div>
        <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
        >
          新增医生
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

//编辑模态框
const layout1 = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const CollectionCreateForm1 = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
      <Modal
          visible={visible}
          width='640px'
          title="编辑医生"
          okText="确定"
          cancelText="关闭"
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
            {...layout1}
            // layout="horizontal"
            name="form_in_modal"
            initialValues={{
              modifier: 'public',
            }}
        >
          <Row justify="start" gutter={[20,5]}>
            <Col span={24}>
              <Form.Item>
                <h3>基本信息</h3>
              </Form.Item>
            </Col>
            <Col span={13}>
              <Form.Item label="头像上传" name='avatar' rules={[{required: true,message: '请上传头像'}]}>
                <Avatar></Avatar>
                <p>上传图片大小请尽可能小于100k，图片尺寸（150x150px）支持图片格式 .jpg  .png  .gif</p>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Name" label="姓名" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}
              >
                <Input placeholder='请输入'/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="sex" label="姓别" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}>
                <Select defaultValue="请选择"  allowClear className = {styles.select} >
                  <Option value="0">男</Option>
                  <Option value="1">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phonenumber" label="手机号" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}>
                <Input placeholder='请输入'/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="hospital" label="所属医院" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}>
                <Select defaultValue="请选择"  allowClear className = {styles.select} >
                  <Option value="0">北京癫痫医院</Option>
                  <Option value="1">上海癫痫医院</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="profession" label="职称" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}>
                <Select defaultValue="请选择"  allowClear className = {styles.select} >
                  <Option value="0">主治医生</Option>
                  <Option value="1">实习医生</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="subject" label="科室" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}>
                <Select defaultValue="请选择"  allowClear className = {styles.select} >
                  <Option value="0">癫痫脑外科</Option>
                  <Option value="1">癫痫脑内科</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="experience" label="从医经验" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}>
                <Input placeholder='请输入'/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="play" label="账号角色" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}>
                <Select defaultValue="请选择"  allowClear className = {styles.select} >
                  <Option value="0">管理员</Option>
                  <Option value="1">普通用户</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="type" label="医生类型" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}>
                <Select defaultValue="请选择"  allowClear className = {styles.select} >
                  <Option value="0">普通医生</Option>
                  <Option value="1">特权医生</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <h3>审核信息</h3>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="资格证" rules={[{required: true,message: '请上传资格证'}]} name='certificate'>
                <Avatar></Avatar>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <h3>介绍信息</h3>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="基本信息" name="message" rules={[{required: true,message: '内容不能为空'}]}>
                <TextArea rows={4} placeholder='请输入医院任职情况，如姓名、性别、职称、现任职、曾任职等（200字以内）'/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
  );
};
//编辑组件
const CollectionsPage1 = () => {
  const [visible, setVisible] = useState(false);
  const onCreate = values => {
    console.log('获取到的值: ', values);
    setVisible(false);
    message.success('新增成功！');
  };
  return (
      <div>
        <Button
            type="link"
            onClick={() => {
              setVisible(true);
            }}
        >
          编辑
        </Button>
        <CollectionCreateForm1
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
        />
      </div>
  );
};

class doctorManage extends PureComponent {

  formRef = React.createRef()

  constructor(props) {
    super(props);
    this.state={
      doctorList:[]
    }
  }
  getDoctor = (values) => {
    Axios({
      url: Api.doctor.getDoctor,
      data:values,
    })
        .then((res) => {
          console.log(res)
          this.setState({
            doctorList:res.data.data.doctorList
          })
        })
  }
  // 提交搜索信息
  onFinish = values => {
    this.getDoctor(values);
    console.log(values);

  };
  // 重置搜索框
  delSearch = () => {
    console.log(this.formRef.current);
    this.formRef.current.resetFields();
  };

  componentWillMount() {
    this.getDoctor();
  }
  render() {
    const { doctorList } = this.state;
    // console.log({ doctorList })
    return (
      <div>
        {/* 搜索栏 */}
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            className = {styles.search}
            ref={this.formRef}
        >
          <Row justify="start" gutter={[20, 20]}>
            <Col span={8}>
              <Form.Item
                  label="医生名称"
                  name="Name"
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  label="所属医院"
                  name="hospital"
              >
                <Select defaultValue="请选择"  allowClear className = {styles.select} >
                  <Option value="-1">请选择</Option>
                  <Option value="北京癫痫医院">北京癫痫医院</Option>
                  <Option value="上海癫痫医院">上海癫痫医院</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  label="医生性别"
                  name="sex"
              >
                <Select defaultValue="全部"  allowClear className = {styles.select} >
                  <Option value="-1">全部</Option>
                  <Option value="0">男</Option>
                  <Option value="1">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  label="账号状态"
                  name="status"
              >
                <Select defaultValue="请选择"  allowClear className = {styles.select} >
                  <Option value="-1">请选择</Option>
                  <Option value="0">已开通</Option>
                  <Option value="1">未开通</Option>
                  <Option value="2">停用</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item
                  label="创建时间"
                  name="createdate"
              >
                <DatePicker locale={locale} />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="~" name="createdate" style={{textAlign:"left"}} colon ={false}>
                <DatePicker locale={locale} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item >
                <Button onClick={this.delSearch}>重置</Button>
                <Button type="primary" htmlType="submit">搜索</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col span={5} align='left' className='title'>
            <span className='titleB'>医生列表</span>
            <span className='titleS'>（共<span>{doctorList.length}</span>条记录）</span>
          </Col>
          <Col span={2} offset={17} className='marginT'>
            <CollectionsPage />
          </Col>
        </Row>
        <Table
            columns={columns}
            dataSource={this.state.doctorList}
            bordered
            pagination={{ pageSize: 9}}
            rowKey="id"
        />
      </div>
    )
  }
}

export default doctorManage
