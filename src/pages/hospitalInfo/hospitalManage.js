import React, {PureComponent, useState} from 'react';
import Axios from '../../util/axios'
import Api from '../../api/index'
import { Link } from 'react-router-dom'

import {Row, Col, Input, Select, DatePicker, Table, Button, Space, Modal, Form,} from 'antd';
import './hospitalManage.scss'
import {action} from "mobx";
import styles from "../discuss/style.module.scss";
import locale from "antd/lib/date-picker/locale/zh_CN";

const { Option } = Select;

//选择器框获取选中
function handleChange(value) {
  console.log(`selected ${value}`);
}
//日期选择框获取选中
function onChange(date, dateString) {
  console.log(date, dateString);
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'hosId',
    key:'hosId',
    align: 'center',
  },
  {
    title: '医院名称',
    dataIndex: 'hosName',
    align: 'center',
  },
  {
    title: '医院别名',
    dataIndex: 'aliasName',
    align: 'center',
  },
  {
    title: '医院地址',
    dataIndex: 'hosAddress',
    align: 'center',
  },
  {
    title: '医院等级',
    dataIndex: 'hosLevel',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'creatDate',
    align: 'center',
  },
  {
    title: '已有医生',
    dataIndex: 'haveDoc',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: '操作',
    align: 'center',
    render: () =>
        <Space size="middle">
          <Link to={'/index/hospitalInfo/checkHospital'}>查看</Link>
          <a>编辑</a>
        </Space>,
  },
];



//新增模态框
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
      <Modal
          visible={visible}
          title="新增医院"
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
            layout="horizontal"
            name="form_in_modal"
            initialValues={{
              modifier: 'public',
            }}
        >
          <Form.Item name="hosName" label="医院名称" rules={[
                {
                  required: true,
                  message: '内容不能为空',
                },
              ]}
          >
            <Input placeholder='请输入'/>
          </Form.Item>
          <Form.Item name="hosLevel" label="医院等级" rules={[
            {
              required: true,
              message: '内容不能为空',
            },
          ]}>
            <Input placeholder='请输入'/>
          </Form.Item>
          <Form.Item name="aliasName" label="医院别称" rules={[
            {
              required: true,
              message: '内容不能为空',
            },
          ]}>
            <Input placeholder='请输入'/>
          </Form.Item>
          <Form.Item name="hosNature" label="医院性质" rules={[
            {
              required: true,
              message: '内容不能为空',
            },
          ]}>
            <Input placeholder='请输入'/>
          </Form.Item>
          <Form.Item name="hosPhone" label="联系电话" rules={[
            {
              required: true,
              message: '内容不能为空',
            },
          ]}>
            <Input placeholder='请输入'/>
          </Form.Item>
          <Form.Item name="hosTel" label="服务热线" rules={[
            {
              required: true,
              message: '内容不能为空',
            },
          ]}>
            <Input placeholder='请输入'/>
          </Form.Item>
          <Form.Item name="linkman" label="医院联系人" rules={[
            {
              required: true,
              message: '内容不能为空',
            },
          ]}>
            <Input placeholder='请输入'/>
          </Form.Item>
          <Form.Item name="linkmanTel" label="联系人电话" rules={[
            {
              required: true,
              message: '内容不能为空',
            },
          ]}>
            <Input placeholder='请输入'/>
          </Form.Item>
          <Form.Item name="hosAddress" label="医院地址" rules={[
            {
              required: true,
              message: '内容不能为空',
            },
          ]}>
            <Input placeholder='请输入'/>
          </Form.Item>
        </Form>
      </Modal>
  );
};

//查看模态框
// const layout1 = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 16 },
// };
// const CollectionCreateForm1 = ({ visible, onCreate, onCancel }) => {
//   const [form] = Form.useForm();
//   return (
//       <Modal
//           visible={visible}
//           title="查看医院"
//           okText="确定"
//           cancelText="关闭"
//           onCancel={onCancel}
//           onOk={() => {
//             form
//                 .validateFields()
//                 .then(values => {
//                   form.resetFields();
//                   onCreate(values);
//                 })
//                 .catch(info => {
//                   console.log('Validate Failed:', info);
//                 });
//           }}
//       >
//         <Form
//             form={form}
//             {...layout1}
//             layout="horizontal"
//             name="form_in_modal"
//             initialValues={{
//               modifier: 'public',
//             }}
//         >
//           <Form.Item name="hosName" label="医院名称">
//             <Input defaultValue='北京癫痫医院' disabled={true}/>
//           </Form.Item>
//           <Form.Item name="hosLevel" label="医院等级">
//             <Input defaultValue='二级甲等' disabled={true}/>
//           </Form.Item>
//           <Form.Item name="aliasName" label="医院别称">
//             <Input defaultValue='北京癫痫' disabled={true}/>
//           </Form.Item>
//           <Form.Item name="hosNature" label="医院性质">
//             <Input defaultValue='北京癫痫医院' disabled={true}/>
//           </Form.Item>
//           <Form.Item name="hosPhone" label="联系电话">
//             <Input defaultValue='北京癫痫医院' disabled={true}/>
//           </Form.Item>
//           <Form.Item name="hosTel" label="服务热线">
//             <Input defaultValue='北京癫痫医院' disabled={true}/>
//           </Form.Item>
//           <Form.Item name="linkman" label="医院联系人">
//             <Input defaultValue='北京癫痫医院' disabled={true}/>
//           </Form.Item>
//           <Form.Item name="linkmanTel" label="联系人电话">
//             <Input defaultValue='北京癫痫医院' disabled={true}/>
//           </Form.Item>
//           <Form.Item name="hosAddress" label="医院地址">
//             <Input defaultValue='北京市海淀区万寿路23号院' disabled={true}/>
//           </Form.Item>
//         </Form>
//       </Modal>
//   );
// };

//新增组件
const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);
  const onCreate = values => {
    console.log('获取到的值: ', values);
    setVisible(false);
  };
  return (
      <div>
        <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
        >
          新增医院
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

//查看组件
// const CollectionsPage1 = () => {
//   const [visible, setVisible] = useState(false);
//   const onCreate = values => {
//     console.log('获取到的值: ', values);
//     setVisible(false);
//   };
//   return (
//       <div>
//         <Button
//             type="link"
//             onClick={() => {
//               setVisible(true);
//             }}
//         >
//           查看
//         </Button>
//         <CollectionCreateForm1
//             visible={visible}
//             onCreate={onCreate}
//             onCancel={() => {
//               setVisible(false);
//             }}
//         />
//       </div>
//   );
// };

class hospitalManage extends PureComponent {

  formRef = React.createRef()

  constructor(props) {
    super(props);
    this.state={
      hospitalList:[]
    }
  }

  gethospital = (values) => {
      Axios({
        url: Api.hospital.gethospital,
        data:values,
      })
    .then((res) => {
      console.log(res)
      this.setState({
        hospitalList : res.data.data.hospitalList
      })
    })
  }
  componentWillMount() {
    this.gethospital();
  }
  // 提交搜索信息
  onFinish = values => {
    this.gethospital(values);
    console.log(values);

  };
  // 重置搜索框
  delSearch = () => {
    console.log(this.formRef.current);
    this.formRef.current.resetFields();
  };
  render() {
    const {hospitalList}=this.state;
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
          <Row justify="start" gutter={[20, 20]} className = {styles.search}>
            <Col span={8}>
              <Form.Item
                  label="医院名称"
                  name="hosName"
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  label="医院等级"
                  name="hosLevel"
              >
                <Select defaultValue="全部" onChange={handleChange}>*/}
                  <Option value="全部">全部</Option>
                  <Option value="一级甲等">一级甲等</Option>
                  <Option value="二级甲等">二级甲等</Option>
                  <Option value="三级甲等">三级甲等</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  label="医院地址"
                  name="hosAddress"
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  label="医院别名"
                  name="aliasName"
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  label="创建时间"
                  name="creatDate"
              >
                <DatePicker onChange={onChange} placeholder="" locale={locale} style={{width:291}}/>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item >
                <Button onClick={this.delSearch}>重置</Button>
                <Button type="primary" htmlType="submit">搜索</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col span={5} align='left' className='title'>
            <span className='titleB'>医院列表</span>
            <span className='titleS'>（共<span>{hospitalList.length}</span>条记录）</span>
          </Col>
          <Col span={2} offset={17} className='marginT'>
            <CollectionsPage />
          </Col>
        </Row>
        <Table
            columns={columns}
            dataSource={this.state.hospitalList}
            bordered
            pagination={{ pageSize: 9}}
            rowKey="hosId"
        />
      </div>
    )
  }
}

export default hospitalManage
