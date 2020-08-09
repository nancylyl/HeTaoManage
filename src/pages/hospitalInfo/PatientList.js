import React, {Component} from 'react'
import {Space, Table} from "antd";
import {Link} from "react-router-dom";
import { Row, Col, Input, Select, DatePicker, Button, Pagination, Modal, Form, Radio, message, Cascader, } from 'antd';
import testingAxios from '../../util/testingAxios'
import Api from '../../api/index'


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
export default class PatientList extends Component {
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
    getPageContent=(page,limit)=> {
        console.log(page, limit);
        this.getpatientList(page, limit)
    }
        render()
        {
            const style = {background: '#0092ff', padding: '8px 0'};
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
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (text, record) => (
                        <Space size="middle">
                            <Link to={`/index/patient/CaseBox`}>查看</Link>
                            {/* <a onClick={this.editform.bind(text, record)}>编辑</a> */}
                            {/*<CollectionsPage2 onClick={this.editform.bind(text, record)}></CollectionsPage2>*/}
                            <a>更换医生</a>
                            {record.medical > 0 ? '病历' : <Link to={"/index/patient/Addcase/0"}>新增病历</Link>}
                        </Space>
                    ),
                },
            ]
            return (
                <div>
                    <Table columns={columns} dataSource={this.state.dataSource}
                           pagination={{pageSize: 6, total: this.state.num, onChange: this.getPageContent}} bordered
                           rowKey="P_ID"></Table>
                </div>
            )
        }
}
