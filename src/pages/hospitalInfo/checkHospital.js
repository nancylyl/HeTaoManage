import React, { PureComponent,useState  } from 'react'
import {Row, Col, Button, Table, Space, Modal, Form, Input, message} from 'antd';
import { Link } from 'react-router-dom'
import './hospitalManage.scss'
import Axios from '../../util/axios'
import Api from '../../api/index'

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };

    const validateMessages = {
        required: '${label}不能为空',
        types: {
            number: '${label}必须为数字',
        },
    };
    return (
        <Modal
            visible={visible}
            title="新增科室"
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
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="superior"
                    label="上级"
                    rules={[
                        {
                            required: true,
                            message: '内容不能为空',
                        },
                    ]}
                >
                    <Input placeholder='请输入'/>
                </Form.Item>
                <Form.Item name="department" label="科室名称" rules={[
                    {
                        required: true,
                        message: '内容不能为空',
                    },
                ]}>
                    <Input placeholder='请输入'/>
                </Form.Item>
                <Form.Item name="depHead" label="负责人" rules={[
                    {
                        required: true,
                        message: '内容不能为空',
                    },
                ]}>
                    <Input placeholder='请输入'/>
                </Form.Item>
                <Form.Item name="depTel" label="联系方式" rules={[
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
const CollectionCreateForm1 = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };

    const validateMessages = {
        required: '${label}不能为空',
        types: {
            number: '${label}必须为数字',
        },
    };
    return (
        <Modal
            visible={visible}
            title="编辑科室"
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
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="superior"
                    label="上级"
                    rules={[
                        {
                            required: true,
                            message: '内容不能为空',
                        },
                    ]}
                >
                    <Input placeholder='请输入'/>
                </Form.Item>
                <Form.Item name="department" label="科室名称" rules={[
                    {
                        required: true,
                        message: '内容不能为空',
                    },
                ]}>
                    <Input placeholder='请输入'/>
                </Form.Item>
                <Form.Item name="depHead" label="负责人" rules={[
                    {
                        required: true,
                        message: '内容不能为空',
                    },
                ]}>
                    <Input placeholder='请输入'/>
                </Form.Item>
                <Form.Item name="depTel" label="联系方式" rules={[
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
                新增部门科室
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


const columns = [
    {
        title: '部门科室',
        dataIndex: 'department',
        align: 'center',
    },
    {
        title: '人数',
        dataIndex: 'depNo',
        align: 'center',
    },
    {
        title: '上级',
        dataIndex: 'superior',
        align: 'center',
    },
    {
        title: '负责人',
        dataIndex: 'depHead',
        align: 'center',
    },
    {
        title: '联系方式',
        dataIndex: 'depTel',
        align: 'center',
    },
    {
        title: '创建时间',
        dataIndex: 'depCreatdate',
        align: 'center',
    },
    {
        title: '操作',
        dataIndex: '操作',
        align: 'center',
        render: () =>
            <Space size="middle">
                <CollectionsPage1/>
            </Space>,
    },
];

class checkHospital extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            hospitalInfo: [],
        }
    }
    getdepartment = () => {
        Axios({
            url: Api.department.getdepartment,
        })
            .then((res) => {
                console.log(res)
                this.setState({
                    dataSource : res.data.data
                })
            })
    }
    componentWillMount() {
        this.getdepartment();
        console.log(this.props.location.state)
        this.setState ({
            hospitalInfo: this.props.location.state,
        })
    }

    render() {
        const {hospitalInfo} = this.state
        return (
            <div>
                <h1 className='center'>基本信息</h1>
                <div className='checkTitle'>
                    <Row justify='center' gutter={[20, 20]}>
                        <Col span={6} offset={2}>医院名称：{hospitalInfo.hosName}</Col>
                        <Col span={6}>医院等级：{hospitalInfo.hosLevel}</Col>
                    </Row>
                    <Row justify='center' gutter={[20, 20]}>
                        <Col span={6} offset={2}>医院别称：{hospitalInfo.aliasName}</Col>
                        <Col span={6}>医院性质：{hospitalInfo.hosNature}</Col>
                    </Row>
                    <Row justify='center' gutter={[20, 20]}>
                        <Col span={6} offset={2}>联系电话：{hospitalInfo.hosPhone}</Col>
                        <Col span={6}>服务热线：{hospitalInfo.hosTel}</Col>
                    </Row>
                    <Row justify='center' gutter={[20, 20]}>
                        <Col span={6} offset={2}>医院联系人：{hospitalInfo.linkman}</Col>
                        <Col span={6}>联系人电话：{hospitalInfo.linkmanTel}</Col>
                    </Row>
                </div>
                <hr/>
                <Row>
                    <Col span={13} align='right'>
                        <span className='center'>科室信息</span>
                    </Col>
                    <Col align='right' span={11}>
                        <CollectionsPage />
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={this.state.dataSource}
                    bordered
                    pagination={{ pageSize: 9}}
                    rowKey="depID"
                    style={{ marginTop: 30 ,width:900,marginLeft:100}}
                />
                <Row>
                    <Col span={13} align='right'>
                        <Link to={'/index/hospitalInfo/hospital'}>
                            <Button type='default' size='large'>返回</Button>
                        </Link>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default checkHospital
