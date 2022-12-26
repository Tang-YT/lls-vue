/*
  封装 axios
 */

import axios from "axios";
import router from "../router";
import {Message, MessageBox} from "element-ui"
import store from "../store"

// 请求根路径
const apiURL = "http://localhost:8082"

// 创建一个 axios 实例
const request = axios.create({
  timeout: 50000,
  baseURL: apiURL
})

// request拦截器
request.interceptors.request.use(config => {
    // 让每个请求都携带上 token
    config.headers['token'] = store.getters["user/getToken"]

    return config
  }, error => {
    console.log("request.interceptors error: ", error)
    return Promise.reject(error)
  }
)

// response 拦截器
request.interceptors.response.use(
  response => {
    // console.log("response ->" + response)
    let res = response.data
    // console.log("request 拦截 response = ", response )
    // console.log("request 拦截 response.headers = ", response.headers['lls-code'] )
    // 只有后端返回状态码为 200 才正常
    if (res.code === 200 || response.headers['lls-code'] ) {
      return response
    } else {
      Message({
        message: res.message ? res.message : "网络跑飞了ne...",
        type: 'error',
        duration: 5 * 1000
      })

      /*
        LOGIN_AUTH(210, "未登录"),
        TOKEN_NOT_EXISTS(221, "令牌不存在"),
        TOKEN_EXPIRE(222, "当前令牌已过期"),
        TOKEN_VOID(223, "伪造令牌无效"),
      */
      if(res.code === 210 || res.code === 221 || res.code === 222 || res.code === 223){
        MessageBox.confirm(
          '当前登录状态无效，您可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          router.replace("/login").then(r => {
            window.localStorage.clear()
          })
        })
      }
      return Promise.reject(response.data.message ? response.data.message : "error...")
    }
  },
  error => {
    console.log("request error: ", error)
    if (error.response.data) {
      error.massage = error.response.data.msg
    }
    if (error.response.status === 401) {
      router.push("/login")
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default request
