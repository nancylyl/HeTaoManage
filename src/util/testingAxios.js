import Axios from 'axios'
export default function testingAxios (config) {
  const instance = Axios.create({
    /* 1创建axios实例 */
    // baseURL: 'https://www.fastmock.site/mock/63908e19f8683a898abc0a03e1010b59',
    // baseURL: "http://118.190.245.9:8080/htr",

    baseURL: "http://118.190.245.9:8080/htr",
    timeout: 5000,
  })
  /* 2axios的拦截器 */
  //2.1请求拦截的作用
  instance.interceptors.request.use(
    (config) => {
      //loading()
      return config
    },
    (err) => {
      return Promise.reject(err)
    }
  )

  // //2.2响应拦截
  instance.interceptors.response.use(
    (res) => {
      // loading(false)
      return res
    },
    (err) => {
      //   loading(false)
      console.log(err)
    }
  )
  // console.log(config);

  return instance(config)
}

// window.loading = function loading(loading = true) {
//   let $loading = document.querySelector('#loading')
//   if (!$loading && loading) {
//     $loading = document.createElement('div')
//     $loading.id = 'loading'
//     $loading.innerHTML =
//       '<div class="sk-three-bounce"><div class="sk-child sk-bounce1"></div><div class="sk-child sk-bounce2"></div><div class="sk-child sk-bounce3"></div></div>'
//     document.body.appendChild($loading)
//   }
//   if (loading === false) {
//     $loading && $loading.remove()
//   }
// }
