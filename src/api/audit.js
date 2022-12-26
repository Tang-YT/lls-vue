import request from '../utils/request'

/*
  分页条件查询本公司部门信息
 */
export function getCompanyInfoByPageAndConditionApi(conditionSearchCompanyReq) {
  return request({
    url: '/sa/ope/info',
    method: 'post',
    data: conditionSearchCompanyReq
  })
}


export function auditCompanyApi(auditCompanyReq) {
  return request({
    url: '/sa/ope/audit',
    method: 'put',
    data: auditCompanyReq
  })
}

