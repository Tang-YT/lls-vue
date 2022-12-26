import request from '../utils/request'

/*
  分页条件查询本公司角色信息
 */
export function getRoleInfoByPageAndConditionApi(conditionSearchRoleReq) {
  return request({
    url: '/ca/role/info',
    method: 'post',
    data: conditionSearchRoleReq
  })
}

/*
  添加角色信息
 */
export function addRoleApi(roleEntity) {
  return request({
    url: '/ca/role',
    method: 'post',
    data: roleEntity
  })
}


/*
  更改角色信息
 */
export function updateRoleApi(roleEntity) {
  return request({
    url: '/ca/role',
    method: 'put',
    data: roleEntity
  })
}

/*
  删除角色
 */
export function delRoleApi(roleId) {
  return request({
    url: '/ca/role/' + roleId,
    method: 'delete'
  })
}

/*
  根据 角色Id 获取详情
 */
export function getRoleDetailById(roleId) {
  return request({
    url: '/ca/role/' + roleId,
    method: 'get'
  })
}



/*
  根据 部门Id 获取该部门的角色
 */
export function getRoleByDepartmentId(departmentId) {
  return request({
    url: '/emp/role/select/' + departmentId,
    method: 'get'
  })
}

