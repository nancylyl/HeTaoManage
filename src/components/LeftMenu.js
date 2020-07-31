import React, { Component } from 'react'
import { Menu } from 'antd'
import { PieChartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
const { SubMenu } = Menu
@inject('menu')
@observer
class LeftMenu extends Component {
  //使用递归
  renderMenu = (menuArr) => {
    return menuArr.map((item) => {
      if (item.menuChilds.length > 0) {
        return (
          <SubMenu key={item.menuId} title={item.menuName} icon={<PieChartOutlined />}>
            {this.renderMenu(item.menuChilds)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.menuId} title={item.menuName}>
            <Link to={item.menuUrl}>{item.menuName}</Link>
          </Menu.Item>
        )
      }
    })
  }

  componentDidMount() {
    /// console.log('componentDidMount')
    this.props.menu.getMenu().catch((err) => {
      console.log(err)
    })
  }

  render() {
    const { menu: userRoot } = this.props
    const { menu } = userRoot
    return (
      <>
        {menu.loading && <span>loading</span>}
        {menu.loaded && (
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {this.renderMenu(menu.data)}
          </Menu>
        )}
      </>
    )


  }
}
export default LeftMenu
