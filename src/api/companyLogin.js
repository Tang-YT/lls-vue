import request from '../utils/request'

/*
  公司管理员登录
 */
export function CALogin(account, loginPassword) {
  return request({
    url: '/ca/login',
    method: 'post',
    data: {
      account,
      loginPassword
    }
  })
}

/*
  公司员工登录
 */
export function empLogin(account, loginPassword) {
  return request({
    url: '/emp/login',
    method: 'post',
    data: {
      account,
      loginPassword
    }
  })
}

/*
  退出登录
 */
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
