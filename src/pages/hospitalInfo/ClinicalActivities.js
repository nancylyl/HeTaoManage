import React, {Component, useState} from 'react'
import {Calendar, Alert, Button, Modal, Form, Row, Col, Input, message, DatePicker} from 'antd';
import moment from 'moment';
import  './doctorManage.scss'
import locale from "antd/lib/date-picker/locale/zh_CN";


//新增模态框
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            // width='640px'
            title="新增诊疗活动"
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
                <Row justify="start" gutter={[20,5]}>
                    <Col span={24}>
                        <Form.Item name="date" label="诊疗时间" rules={[
                            {
                                required: true,
                                message: '内容不能为空',
                            },
                        ]}
                        >
                            <DatePicker locale={locale} style={{width:472}}/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="address" label="诊疗地点" rules={[
                            {
                                required: true,
                                message: '内容不能为空',
                            },
                        ]}>
                            <Input placeholder='请输入'/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="patients" label="诊疗人数" rules={[
                            {
                                required: true,
                                message: '内容不能为空',
                            },
                        ]}>
                            <Input placeholder='请输入'/>
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
                新增诊疗活动
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

export default class ClinicalActivities extends Component {
    state = {
        value: moment(),
        selectedValue: moment(),
    }
    onSelect = value => {
        this.setState({
            value,
            selectedValue: value,
        });
    };
    onPanelChange = (value,mode) => {
        this.setState({ value,mode });
    };

    render() {
        const { value, selectedValue } = this.state;
        return (
            <div>
                <Row>
                    <Col span={4} offset={20}><CollectionsPage/></Col>
                </Row>
                <div className='site-calendar-demo-card'>
                    <Alert
                        message={`${selectedValue && selectedValue.format('YYYY-MM')}`}
                        style={{backgroundColor:"white"}}
                    />
                    <Calendar
                        value={value}
                        onSelect={this.onSelect}
                        onPanelChange={this.onPanelChange}
                        fullscreen={false}
                        locale={locale}
                    />
                </div>
                <div>
                    <Alert
                        message={`${selectedValue && selectedValue.format('YYYY-MM-DD')}`+ ' 患者数量 3人'}
                        style={{backgroundColor:"white",border:0}}/>
                    <Alert
                        message={'诊疗地点：北京市东城区和平街门诊'}
                        style={{backgroundColor:"white",border:0}}/>
                    <div className='touXiang'>
                        <img className='float' src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596626908680&di=39109e18dc7d5fbf836baa44d001115a&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F57203778a0df439b000c23f583d219c2db235defab31-OXXff8_fw658" alt=""/>
                        <p className='float'>唐马儒</p>
                        <p className='float'>报名时间：2018-1-1 14:00:00</p>
                        <p className='float'>报到时间：2018-1-13 16:23:51</p>
                    </div>
                    <div className='touXiang'>
                        <img className='float' src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596626908680&di=39109e18dc7d5fbf836baa44d001115a&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F57203778a0df439b000c23f583d219c2db235defab31-OXXff8_fw658" alt=""/>
                        <p className='float'>唐马儒</p>
                        <p className='float'>报名时间：2018-1-1 14:00:00</p>
                        <p className='float'>报到时间：2018-1-13 16:23:51</p>
                    </div>
                    <div className='touXiang'>
                        <img className='float' src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596626908680&di=39109e18dc7d5fbf836baa44d001115a&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F57203778a0df439b000c23f583d219c2db235defab31-OXXff8_fw658" alt=""/>
                        <p className='float'>唐马儒</p>
                        <p className='float'>报名时间：2018-1-1 14:00:00</p>
                        <p className='float'>报到时间：2018-1-13 16:23:51</p>
                    </div>
                </div>
            </div>
        )
    }
}
