import request from '../utils/request'

/*
  分页条件查询本公司工资信息
 */
export function getWageInfoByPageAndConditionApi(conditionSearchWageReq) {
  return request({
    url: '/emp/wage/info',
    method: 'post',
    data: conditionSearchWageReq
  })
}

/*
  分页条件查询本公司工资信息
 */
export function getWageByUserIdApi(personWageReq) {
  return request({
    url: '/emp/wage/peresonwage',
    method: 'post',
    data: personWageReq
  })
}


/*
  根据 Id 查询工资
 */
export function getWageByIdApi(wageId) {
  return request({
    url: '/emp/wage/' + wageId,
    method: 'get'
  })
}

/*
  添加员工工资
 */
export function addWageApi(wageEntity) {
  return request({
    url: '/emp/wage',
    method: 'post',
    data: wageEntity
  })
}


/*
  更改员工工资
 */
export function updateWageApi(wageEntity) {
  return request({
    url: '/emp/wage',
    method: 'put',
    data: wageEntity
  })
}

/*
  删除工资
 */
export function delWageApi(wageId) {
  return request({
    url: '/emp/wage/' + wageId,
    method: 'delete'
  })
}

/*
 员工工资 excel 导出
 */
export function exportEmpData(conditionSearchWageExcelReq) {
  return request({
    url: 'emp/wage/info/export',
    method: 'post',
    responseType: 'blob',
    data: conditionSearchWageExcelReq
  })
}
