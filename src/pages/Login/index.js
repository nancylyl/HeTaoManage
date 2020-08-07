import React, { PureComponent } from 'react'
import { Layout, message } from 'antd'
import { Form, Input, Button, Checkbox } from 'antd'
import { inject, observer } from 'mobx-react'
import styles from './style.module.scss'
import ImageCode from "./ImageCode";
import img from '../../assets/images/23.png'
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
    Account: '17531903634',
    PassWord: '1111',
    url: ""
  }


  //获取图片路径
  getImage=()=>{

  }
  componentDidMount() {
    this.setState({
      url: img
    })
  }

  onReload = () => {
    this.setState({
      url: img
    })
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
      <div className={styles['login-box1']}>
        <Layout>
            <Header className={styles['login-box2']}>医疗管理系统</Header>
          <Content>
            {/*登录页的内容*/}
            <div className={styles['login-box']}>
              <div className={styles['login-box3']}>
                <div className={styles['login-box4']}>
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
                  <Checkbox>记住密码</Checkbox>
                </Form.Item>

                <Form.Item colon={false} label=" " {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    登录
                  </Button>
                </Form.Item>
              </Form>
                </div>
              </div>
            </div>
          </Content>
        </Layout>

        <ImageCode
            imageUrl={this.state.url}
            onReload={this.onReload}
            onMatch={() => {
              console.log("code is match")
            }}
        />

      </div>

    )
  }
}
export default Login
