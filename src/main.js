import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css


//导入mavon-editor，用户Markdown编辑器
import mavonEditor from 'mavon-editor'
//解决Markdown编辑器的图标不出现问题
import "mavon-editor/dist/css/index.css"
Vue.use(mavonEditor)

import App from './App'
import store from './store'
import router from './router'
import request from '@/utils/request'

import '@/icons'
import Layout from "./views/layout/Layout"; // icon
// import '@/permission' // permission control

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.prototype.req = request

Vue.config.productionTip = false

import {generaMenu} from "./utils/common";

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),

  beforeCreate() {
    const len = router.options.routes.length
    // 已登录 或者 要访问的无需登录
      if (len === 7){
        let addR = generaMenu([], store.getters["app/getMenuList"])
        // console.log("addR2 = ", addR)
        let notFound =   {
          path: '*',
          redirect: '/404',
          hidden: true
        }
        for (let i = 0; i < addR.length; ++i){
          router.addRoute(addR[i])
          router.options.routes.push(addR[i])
        }
        router.addRoute(notFound)
      }
  }

})
