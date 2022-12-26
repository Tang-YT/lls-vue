import request from '../utils/request'

/*
  分页条件查询本公司部门信息
 */
export function getDepartmentInfoByPageAndConditionApi(conditionSearchDepartmentReq) {
  return request({
    url: '/ca/department/info',
    method: 'post',
    data: conditionSearchDepartmentReq
  })
}

/*
  添加部门信息
 */
export function addDepartmentApi(departmentEntity) {
  return request({
    url: '/ca/department',
    method: 'post',
    data: departmentEntity
  })
}


/*
  更改部门信息
 */
export function updateDepartmentApi(departmentEntity) {
  return request({
    url: '/ca/department',
    method: 'put',
    data: departmentEntity
  })
}

/*
  删除部门
 */
export function delDepartmentApi(departmentId) {
  return request({
    url: '/ca/department/' + departmentId,
    method: 'delete'
  })
}


/*
  获取本公司所有部门，用于角色分配
 */
export function getAllDepartmentApi(companyId) {
  return request({
    url: '/emp/department/' + companyId,
    method: 'get'
  })
}
