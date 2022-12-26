import request from '../utils/request'

const base_prefix = '/sa/permission'

/*
  获取所有权限
 */
export function getPermissionS() {
  return request({
    url: base_prefix,
    method: 'get',
  })
}

/*
  添加权限
 */
export function addPermission(permission) {
  return request({
    url: base_prefix,
    method: 'post',
    data: permission
  })
}

/*
  获取父权限
 */
export function getParentPermissionSApi(apply) {
  return request({
    url: base_prefix + "/parent/" + apply,
    method: 'get',
  })
}


/*
  更改权限
 */
export function updatePermission(permission) {
  return request({
    url: base_prefix,
    method: 'put',
    data: permission
  })
}

/*
  删除权限
 */
export function delPermission(permissionId) {
  return request({
    url: base_prefix + '/' + permissionId,
    method: 'delete'
  })
}


/*
  获取公司员工可操控的权限，用于公司管理员为其分配
 */
export function getEmpPermissionS() {
  return request({
    url: '/ca/permission/checkbox',
    method: 'get',
  })
}
