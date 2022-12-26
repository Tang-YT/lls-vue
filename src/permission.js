/* eslint-disable prefer-const */
import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasLogin = localStorage.getItem('hasLogin')
  if (hasLogin) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
    if (to.path === '/user/user') {
      let id = JSON.parse(localStorage.getItem('userInfo')).id
      console.log(id)
      if (id > 2) {
        next({ path: '/task' })
        window.alert('permission denied')
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})




//
// /**
//  * 请求登录验证，如果没有登录，不能访问页面，返回到登录页面
//  */
// import router from "./router";
//
// //路由判断登录，根据路由配置文件的参数
// router.beforeEach((to,from,next)=>{
//   //判断该路由是否需要登录权限
//   //record.meta.requireAuth是获取到该请求中携带的该参数
//   if (to.matched.some(record => record.meta.requireAuth)){
//     //获取到本地的token
//     const token = localStorage.getItem("token")
//     console.log("显示token----------：" + token)
//
//     //判断当前的token是否存在，也就是登录时的token
//     if (token){
//       //如果指向的是登录页面，不做任何操作
//       if (to.path === "/login"){
//
//       }else {
//         //如果不是登录页面，且token存在，就放行
//         next()
//       }
//     }else {
//       //    如果token不存在
//       //    前往登录
//       next({path:'/login'})
//     }
//
//   }else {
//     //如果不需要登录认证，就直接访问
//     next()
//   }
// })
//
