import { action, observable } from 'mobx'
import Axios from '../util/axios'
import Api from '../api/index'

const defaultData = {
  loaded: false,
  loading: false,
  error: null,
  data: null,
}

export default class userStore {
  @observable user = { ...defaultData } //用户
  @observable isLogin = false
  @observable token = ''

  @action
  login = () => {
    return new Promise((resolve, reject) => {
      this.user.loading = true
      Axios({
        url: Api.user.userLogin,
        data: { Account: '15328189934', PassWord: 1234 },
        method: 'post',
      })
        .then((res) => {
          if (res.data.success) {
            this.user.data = res.data.data
            this.user.loaded = true
            this.token = res.data.token
            resolve('登录成功')
          } else {
            reject('登录失败')
          }
        })
        .finally(() => {
          this.user.loading = false
        })
    })
  }
}
