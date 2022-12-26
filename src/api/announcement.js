import request from '../utils/request'

/*
  发布公告
 */
export function saveAnnouncementApi(announcementEntity) {
  return request({
    url: '/emp/ann',
    method: 'post',
    data: announcementEntity
  })
}



/*
  分页查询公告
 */
export function searchAnnouncementApi(conditionSearchAnnoReq) {
  return request({
    url: '/emp/ann/info',
    method: 'post',
    data: conditionSearchAnnoReq
  })
}



/*
  id查询公告
 */
export function getAnnouncementByIdApi(announcementId) {
  return request({
    url: '/emp/ann/' + announcementId,
    method: 'get',
  })
}



/*
  删除公告
 */
export function deleteAnnouncementApi(announcementId) {
  return request({
    url: '/emp/ann/' + announcementId,
    method: 'delete',
  })
}

