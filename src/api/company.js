import request from '../utils/request'

/*
  根据 Id 查询公司信息
 */
export function getCompanyByIdApi(companyId) {
  return request({
    url: '/company/base/' + companyId,
    method: 'get',
  })
}

/*
  公司提交注册信息
 */
export function addCompanyApi(companyReq) {
  return request({
    url: '/ca/enroll',
    method: 'post',
    data: companyReq
  })
}

/*
  更改公司信息
 */
export function updateCompanyApi(companyReq) {
  return request({
    url: '/company/base',
    method: 'put',
    data: companyReq
  })
}



/*
 更改密码
 */
export function fixCAPwdApi(caAccountReq) {
  return request({
    url: 'company/base/pwd',
    method: 'put',
    data: caAccountReq
  })
}
