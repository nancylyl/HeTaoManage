import { action, observable } from 'mobx'
import Axios from '../util/axios'
import Api from '../api/index'

const defaultData = {
  loaded: false,
  loading: false,
  error: null,
  data: null,
}

export default class menuStore {
  @observable menu = { ...defaultData } //用户

  @action
  getMenu = () => {
    return new Promise((resolve, reject) => {
      this.menu.loading = true
      Axios({
        url: Api.home.getMenu,
      })
        .then((res) => {
<<<<<<< HEAD
          console.log(res.data)
=======
          //   console.log(res.data)
>>>>>>> 2b2f19f603d6810c9d330d12ed3a685f7e30f87d
          if (res.data.success) {
            this.menu.data = res.data.data
            this.menu.loaded = true
            resolve('成功')
          } else {
            reject('失败')
          }
        })
        .finally(() => {
          this.menu.loading = false
        })
    })
  }
}
