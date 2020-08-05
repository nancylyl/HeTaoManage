import Axios from 'axios'
var baseURL = ''
export default function axios(config) {

  console.log(config.isDev);
  if (config.isDev != undefined && config.isDev == 1) {
    baseURL = "http://118.190.245.9:8080"
  }
  else {
    baseURL = "https://www.fastmock.site/mock/63908e19f8683a898abc0a03e1010b59"
  }
  const instance = Axios.create({
    /* 1创建axios实例 */
    baseURL: baseURL,
    timeout: 5000,
  })
  /* 2axios的拦截器 */
  //2.1请求拦截的作用
  instance.interceptors.request.use(
    (config) => {
      window.loading()

      console.log(baseURL)
      return config
    },
    (err) => {

      return Promise.reject(err)
    }
  )

  // //2.2响应拦截
  instance.interceptors.response.use(
    (res) => {
      window.loading(false)
      return res
    },
    (err) => {
      window.loading(false)
      console.log('22');
      console.log(err)
      window.location.href = "/index/error"
    }
  )

  return instance(config)
}

window.loading = function loading(loading = true) {
  let $loading = document.querySelector('#loading');
  if (!$loading && loading) {
    $loading = document.createElement('div');
    $loading.id = 'loading';
    $loading.innerHTML = '<div class="sk-three-bounce"><div class="sk-child sk-bounce1"></div><div class="sk-child sk-bounce2"></div><div class="sk-child sk-bounce3"></div></div>';
    document.body.appendChild($loading);
  }
  if (loading === false) {
    $loading && $loading.remove();
  }
}
