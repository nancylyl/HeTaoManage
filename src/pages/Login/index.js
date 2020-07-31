import React, { PureComponent } from 'react'
import { Layout, message } from 'antd'
import { Form, Input, Button, Checkbox } from 'antd'
import { inject, observer } from 'mobx-react'
import styles from './style.module.scss'
// import { withRouter } from 'react-router-dom'
const { Header, Footer, Content } = Layout

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 0, span: 16 },
}
// @withRouter
@inject('user')
@observer
class Login extends PureComponent {
  state = {
    Account: '15328189934',
    PassWord: '1234',
  }

  onFinish = (values) => {
    console.log('Success:', values)
    console.log(this.state)
    this.props.user
      .login()
      .then((data) => {
        console.log(data)
        this.props.history.push('./index')
      })
      .catch((err) => {
        message.error(err)
      })
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  render() {
    const { Account, PassWord } = this.state
    console.log(this.props)
    return (
      <div>
        <Layout>
          <Header>班级管理系统</Header>
          <Content>
            {/*登录页的内容*/}
            <div className={styles['login-box']}>
              <Form
                {...layout}
                name="basic"
                initialValues={{ Account, PassWord }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  label="姓名"
                  name="Account"
                  rules={[{ required: true, message: '请输入用户名!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="密码"
                  name="PassWord"
                  rules={[{ required: true, message: '请输入密码!' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  {...tailLayout}
                  name="remember"
                  valuePropName="checked"
                  label=" "
                  colon={false}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item colon={false} label=" " {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>
          <Footer>备案号：nana</Footer>
        </Layout>
      </div>
    )
  }
}

export default Login
