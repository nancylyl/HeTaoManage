import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import store from './store'
import { Provider } from 'mobx-react'
import './assets/style.scss'

// 日期选择框显示中文
import moment from 'moment'; 
import 'moment/locale/zh-cn'; 
moment.locale('zh-cn');

ReactDOM.render(
  <Provider  {...store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
