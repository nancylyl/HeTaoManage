import React, {Component} from 'react'
import Axios from "../../util/axios";
import Api from "../../api";
import {Button, Input, Modal, Select, Table} from "antd";
import {Link} from "react-router-dom";
import styles from "../discuss/style.module.scss";

export default class CaseStudy extends Component {
    formRef = React.createRef()
    constructor() {
        super();
        this.state = {
            discussLists: [],
            loaded: false,
            visible: false,
            isshow: false,
            modalTitle: '',
            discussId: '',
            discussTitle: '',
            cancelText: '',
        }
    }
    getDiscussList(values) {
        Axios({
            url: Api.discuss.getDiscussList,
            data: values,
            method: 'post',
        })
            .then((res) => {
                // console.log(res)
                if (res.data.success) {
                    // this.setState.loaded = true
                    this.setState({
                        discussLists: res.data.data,
                        loaded: true,
                    })
                } else {
                }
            })
    }
    UNSAFE_componentWillMount() {
        this.getDiscussList();
    }
    // ====================新增探讨,编辑探讨弹框====================
    showModal = (title, record) => {
        // console.log( record);
        this.setState({
            modalTitle: title,
            discussId: record,
            visible: true,
        })
    };
    // 提交表单
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });

    };
    // 关闭弹框
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    // ====================================取消探讨弹框==================================
    cancleDiscuss = (record) => {
        console.log(record);
        this.setState({
            isshow: true,
            discussTitle: record.discussName,
            discussId: record.discussId,

        });
    };
    cancelText= (e) => {
        this.setState({
            cancelText: e.target.value,
        });
    }

    handleOk1 = e => {
        this.setState({
            isshow: false,
        });
        console.log(this.state.discussId);
        console.log(this.state.cancelText);
    };
    handleCancel1 = e => {
        this.setState({
            isshow: false,
        });
    };
    state = {

    }
    render() {
        const { discussLists } = this.state;
        const { Option } = Select;
        const { TextArea } = Input;
        // 表格
        const columns = [
            {
                title: '探讨名称',
                width: 150,
                dataIndex: 'discussName',
                key: 'name',
                fixed: 'left',
            },
            {
                title: '参加人数',
                width: 80,
                dataIndex: 'joinNumber',
                key: 'age',
                fixed: 'left',
            },
            {
                title: '探讨开始时间',
                dataIndex: 'discussStart',
                key: '1',
                width: 150,
            },
            {
                title: '参会金额',
                dataIndex: 'AttendMoney',
                key: '4',
                width: 80,
            },
            {
                title: '主持人',
                dataIndex: 'host',
                key: '5',
                width: 80,
            },
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                width: 150,
                render:(text, record) => record.discussState == '未开始'?
                    <span><Link to={{pathname:`/index/checkDiscuss`,state:record}}>查看</Link><a onClick={this.showModal.bind(this,'编辑病例探讨', record.discussId)}>编辑</a><a onClick={this.cancleDiscuss.bind(this, record)}>取消</a></span>
                    :<span><Link to={{pathname:`/index/checkDiscuss`,state:record}}>查看</Link>&nbsp;&nbsp;<span>编辑</span>&nbsp;&nbsp;<span>取消</span></span>
            },
        ];
        return (
            <div>
                <div className={styles.discussList}>
                    {this.state.loaded && (
                        <Table columns={columns} dataSource={this.state.discussLists} bordered size="middle" rowKey="discussId" scroll={{ x: 1650 }} />
                    )}
                </div>
                {/* ================取消病例探讨弹框======================*/}
                {this.state.isshow && <Modal
                    title='取消探讨'
                    visible={this.state.isshow}
                    onOk={this.handleOk1}
                    onCancel={this.handleCancel1}
                    className={styles.cancelBox}
                    okText="确认"
                    cancelText="取消"
                >
                    <div className={styles.content}>
                        <div>
                            探讨名称: {this.state.discussTitle}
                        </div>
                        <div className={styles.text}>
                            <span>取消理由：</span>
                            <TextArea rows={4} placeholder='请输入取消理由' onChange={this.cancelText}/>
                        </div>
                    </div>

                </Modal>}
            </div>
        )
    }
}
