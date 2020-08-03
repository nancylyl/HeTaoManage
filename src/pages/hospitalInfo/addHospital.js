import React, { PureComponent } from 'react'
import { Form, Input, Button } from 'antd';
import './hospitalManage.scss'

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

class addHospital extends PureComponent {
    render() {
        const onFinish = values => {
            console.log(values);
        };

        return (
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <h1 className='center'>基本信息</h1>
                <Form.Item name={['user', '医院名称']} label="医院名称" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', '医院等级']} label="医院等级" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', '医院别称']} label="医院别称" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', '医院性质']} label="医院性质" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', '联系电话']} label="联系电话" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', '服务热线']} label="服务热线" rules={[{ required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', '医院联系人']} label="医院联系人" rules={[{ required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', '联系人电话']} label="联系人电话" rules={[{ required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', '医院地址']} label="医院地址" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                    <Button>
                        返回
                    </Button>
                    <Button type="primary" htmlType="submit" className='marginL'>
                        保存
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default addHospital
