import request from '../utils/request'

/*
  分页条件查询本公司员工信息
 */
export function getPersonInfoByPageAndConditionApi(conditionSearchPersonReq) {
  return request({
    url: '/emp/ope/info',
    method: 'post',
    data: conditionSearchPersonReq
  })
}


/*
  根据 Id 查询员工细腻
 */
export function getPersonByIdApi(employeeId) {
  return request({
    url: '/emp/ope/' + employeeId,
    method: 'get'
  })
}

/*
  添加员工信息
 */
export function addPersonApi(employeeEntity) {
  return request({
    url: '/emp/ope',
    method: 'post',
    data: employeeEntity
  })
}


/*
  更改员工信息
 */
export function updatePersonApi(employeeEntity) {
  return request({
    url: '/emp/ope',
    method: 'put',
    data: employeeEntity
  })
}

/*
  删除员工
 */
export function delPersonApi(employeeId) {
  return request({
    url: '/emp/ope/' + employeeId,
    method: 'delete'
  })
}

/*
 员工信息 excel 导出
 */
export function exportEmpData(conditionSearchEmployeeExcelReq) {
  return request({
    url: 'emp/ope/info/export',
    method: 'post',
    responseType: 'blob',
    data: conditionSearchEmployeeExcelReq
  })
}


/*
 更改密码
 */
export function fixPwdApi(empAccountReq) {
  return request({
    url: 'emp/pwd',
    method: 'put',
    data: empAccountReq
  })
}
