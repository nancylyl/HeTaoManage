import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import loadable from '@loadable/component'

@inject('menu')
@observer
class PrivateRouter extends PureComponent {
  state = {
    routerList: [],
  }
  bindRouter(list) {
    let routerList = list.map((item) => {
      if (item.menuChilds.length > 0) {
        console.log('----大于1');

        return <Route key={item.menuId} path={item.menuUrl} render={() => {
          let ComponentName = loadable(() => import(`./${item.componentPath}`))
          return <ComponentName {...this.props}>
            {this.bindRouter(item.menuChilds)}
          </ComponentName>
        }
        }>
        </Route>

      } else {
        console.log('---小于-');
        console.log(item.componentPath);
        return (
          <Route
            path={item.menuUrl}
            key={item.menuId}
            component={loadable(() => import(`./${item.componentPath}`))}
          ></Route>
        )
      }
    })
    console.log(routerList);

    return routerList
  }

  render() {
    const { menu: menuRoot } = this.props
    const { menu } = menuRoot
    if (menu.loaded) {
      return <div>{this.bindRouter(menu.data)}</div>
    } else {
      return <div>暂无数据</div>
    }
  }
}

export default PrivateRouter
