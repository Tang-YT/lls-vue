import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/* 无需校验权限的路由 */
export const constantRoutes = [
  // 反馈
  {
    path: '/feedback',
    name: "BMD_feedback",
    component: () => import('../views/cus/Feedback'),
    hidden: true
  } ,
  // 公司注册
  {
    path: '/ce',
    name: "BMD_ce",
    component: () => import('../views/cus/CompanyEnroll'),
    hidden: true
  } ,
  // 首页
  {
    path: '/',
    name: "BMD_",
    component: () => import('@/views/cus/Home'),
    hidden: true
  } ,
  // 超级管理员登录
  {
    path: '/sa/login',
    name: "BMD_sa_login",
    component: () => import('../views/login/SALogin'),
    hidden: true
  } ,
  // 单位管理员与员工登录
  {
    path: '/login',
    name: "BMD_login",
    component: () => import('@/views/login/companyLogin'),
    hidden: true
  } ,
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/index',
    component: Layout,
    redirect: '/dashboard',
    name: 'BAD_Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      name: 'BAD_Dashboardc',
      component: () => import('@/views/dashboard/index')
    }]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()


//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to,from,next)=>{
  // 已登录 或者 要访问的无需登录
  if (store.getters["user/getToken"] || (to.name && to.name.startsWith("BMD_"))){
    next()
  }
  else{
    next("/login")
  }
})



// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  // const newRouter = createRouter()
  // console.log("rou = ", router)
  // console.log("newRouter = ", newRouter)
  // router.matcher = createRouter().matcher // reset router
  // console.log("rou =22 = ", router)
}

export default router
