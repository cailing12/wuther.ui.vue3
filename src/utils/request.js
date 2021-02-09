import axios from 'axios'
import Auth from './authToken'
//import store from '../store'
import router from '../router'
const CancelToken = axios.CancelToken
var getTokenLock = false
var requestList = []
const service = axios.create({
  baseURL: 'https://localhost:6088',
  timeout: 10000
})


service.interceptors.request.use(config => {
  let cancel
  config.cancelToken = new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c
  })
  if (config.url === 'api/blogs' && config.method == "post") {
    checkLoginStatus(cancel, function () {
      Auth.setLoginStatus()
      config.headers.Authorization = Auth.getToken()
    })
    // stopRepeatRquest(config.url, cancel)
  }
  console.log('config')
  console.log(config.headers)
  return config
})

function checkLoginStatus(cancel, callback) {
  // 判断token是否存在
  if (Auth.getToken()) {
    // 判断是否登录，如果存在token，但是登录状态为false，自动登录
    if (!Auth.getLoginStatus()) {
      if (!getTokenLock) {
        getTokenLock = true
        //store.dispatch('loginByToken', Auth.getToken())
        if (!Auth.getLoginStatus()) {
          checkLoginStatus(cancel, callback)
        }
        getTokenLock = false
        callback()
      }
    } else {
      callback()
    }
  } else {
    // 跳到登录页面
    router.push('/login')
  }
}

// function stopRepeatRquest(url, cancel) {
//   for (let i = 0; i < requestList.length; i++) {
//     if (requestList[i] === url) {
//       cancel()
//       return
//     }
//   }
//   requestList.push(url)
// }

service.interceptors.response.use(
  response => {
    for (let i = 0; i < requestList.length; i++) {
      if (requestList[i] === response.config.url) {
        // 注意，不能保证500ms必定执行，详情请了解JS的异步机制
        setTimeout(function () {
          requestList.splice(i, 1)
        }, 500)
        break
      }
    }
    return Promise.resolve(response)
  },
  error => {
    if (axios.isCancel(error)) {
      console.log('error')
      console.log(error)
      return Promise.reject('axios 拦截中断')
    } else if (error.response) {
      switch (error.response.status) {
        case 401: // cookies 验证失败
          router.push('login')
          break
        case 402: router.push('ErrorPage')
          break
        case 403: // 没有权限
          router.push('auth')
          break
      }
      setTimeout(function () {
        requestList = requestList.resolve(c => c !== error.response.config.url)
      }, 500)

      return Promise.reject(error.response)
    }
  }
)

export default service
