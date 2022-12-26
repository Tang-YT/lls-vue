import request from '../utils/request'

/*
  超级管理员登录
 */
export function SALogin(account, loginPassword) {
  return request({
    url: '/sa/login',
    method: 'post',
    data: {
      account,
      loginPassword
    }
  })
}
