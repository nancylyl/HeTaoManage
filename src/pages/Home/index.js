import React, { Component } from 'react'
import { Layout, Breadcrumb,DatePicker } from 'antd'
import LeftMenu from '../../components/LeftMenu'
const { Header, Content, Sider, Footer } = Layout

export default class Index extends Component {
  state = {
    collapsed: false,
    logo: 'logo',

  }
   onChange(date, dateString) {
    console.log(date, dateString);
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed })
    if (collapsed) {
      this.setState({ logo: 'logo1' })
    } else {
      this.setState({ logo: 'logo' })
    }
  }
  
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className={this.state.logo}>
            <img src={require('../../assets/images/logo.png')}></img>
          </div>
          <LeftMenu />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div className='showUser'>
            您好！Admin
              
            </div>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 600 }}
            >

              {this.props.children}

            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2020 Created by 1组 核桃仁
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
