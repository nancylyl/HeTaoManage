import React, {Component, useState} from 'react'
import Axios from "../../util/axios";
import Api from "../../api";
import {Link} from "react-router-dom";
import {Button, Col, Form, Input, message, Modal, Row, Table} from "antd";
import styles from "../discuss/style.module.scss";
import './doctorManage.scss'
const { TextArea } = Input;

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
            title="消核桃币"
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
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Row justify="start" gutter={[20, 20]} className = {styles.search}>
                    <Col span={24}>
                        <Form.Item
                            name="num"
                            label="数量"
                            rules={[
                                {
                                    required: true,
                                    message: '内容不能为空',
                                },
                            ]}
                        >
                            <Input placeholder='请输入核桃币数'/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="备注" name="message" rules={[{required: true,message: '内容不能为空'}]}>
                            <TextArea rows={4} placeholder='请输入'/>
                        </Form.Item>
                    </Col>
                </Row>
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
                消核桃币
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

export default class TradingInformation extends Component {
    constructor() {
        super();
        this.state = {
            transactionLists: [],
        }
    }
    getTransaction(values) {
        Axios({
            url: Api.transaction.getTransaction,
        })
            .then((res) => {
                // console.log(res)
                if (res.data.success) {
                    this.setState({
                        transactionLists: res.data.data,
                        loaded: true,
                    })
                } else {
                }
            })
    }
    UNSAFE_componentWillMount() {
        this.getTransaction();
    }
    render() {

        const columns = [
            {
                title: '交易时间',
                dataIndex: 'transactionTime',
                align: 'center',
                key:'recordId',
            },
            {
                title: '交易类型',
                dataIndex: 'transactionType',
                align: 'center',
            },
            {
                title: '核桃币',
                dataIndex: 'transactionMoney',
                align: 'center',
            },
            {
                title: '交易目标',
                dataIndex: 'transactionGoal',
                align: 'center',
            },
        ]
        return (
            <div>
                <Row>
                    <Col span={18} align='right'>
                        <h3 className='tradeTitle'>待消核桃币 2000</h3>
                    </Col>
                    <Col align='right' span={21}>
                        <CollectionsPage />
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={this.state.transactionLists}
                    bordered
                    pagination={{ pageSize: 6}}
                    rowKey="recordId"
                    style={{ marginTop: 30 ,width:900,marginLeft:100}}
                />
            </div>
        )
    }
}
