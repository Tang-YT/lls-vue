import request from '../utils/request'

/*
  获取 OSS 直传签名
  * model = 0: 存放公司 logo
 * model = 1: 存放公司营业执照
 * model = 2: 存放员工身份证
 * model = 3: 存放员工图片(大头照)
 */
export function getOSSPolicy(model) {
  return request({
    url: 'common/oss/policy/' + model,
    method: 'get',
  })
}


export function getRegion() {
  return request({
    url: 'common/region/option',
    method: 'get',
  })
}

