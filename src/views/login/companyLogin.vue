<template>
  <div id="container">

      <img class="bgone" src="../../assets/images/login/bg.jpg" />
      <img class="pic" src="../../assets/images/login/a.png" />

      <div class="table">
        <div class="wel">六六顺人事管理系统</div>
        <div class="wel1">LIU LIU SHUN REN SHI GUAN LI XI TONG</div>

        <div class="login-form-div">

          <el-card class="box-card" shadow="always" style="border-radius: 20px;">
            <div slot="header" class="clearfix my-card-text">
              <i class="el-icon-s-grid"></i>
              <span>&nbsp;登录表单</span>
            </div>
            <el-form
                    :model="loginForm" :rules="rules" ref="loginForm"
                    label-width="100px" class="demo-ruleForm login-form"
                    label-position="right" >

              <el-form-item label="登录身份" prop="identify">
                <el-radio-group v-model="loginForm.identify">
                  <el-radio border label="公司员工"></el-radio>
                  <el-radio border label="公司管理员"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item  label="账号" prop="account" >
                <div class="username-field">
                  <el-input v-model="loginForm.account" suffix-icon="el-icon-user"/>
                </div>
              </el-form-item>

              <el-form-item label="密码" prop="loginPassword">
                <div class="password-field">
                  <el-input type="password" v-model="loginForm.loginPassword" suffix-icon="el-icon-lock"/>
                </div>
              </el-form-item>

              <el-form-item style="text-align: center;">
                  <el-button type="primary" :loading="loading"  @click="handLogin" class="login-btn">
                    <span style="font-size: 25px">登录</span>
                  </el-button>
              </el-form-item>

            </el-form>
          </el-card>
        </div>
      </div>
  </div>

</template>

<script>

import {CALogin, empLogin} from '@/api/companyLogin'

import {generaMenu} from "../../utils/common";
import router from "../../router";

export default {
  name: "CompanyLoginView",

  data(){
    return {
      // 登录提交表单
      loginForm: {
        account: "",
        loginPassword: "",
        // 用户选择的登录身份
        identify: "",
      },

      loading: false,
      // 校验规则
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        loginPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        identify: [
          { required: true, message: '请确定登录身份', trigger: 'change' }
        ]
      }

    }
  },

  methods: {
    handLogin() {
      window.localStorage.clear()
      const _this = this;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          _this.loading = true
          if (_this.loginForm.identify === "公司管理员") {
            CALogin(_this.loginForm.account, _this.loginForm.loginPassword).then(res => {
              this.$store.dispatch("user/setCompanyId", res.data.data.companyId)
              this.$store.dispatch("user/setToken", res.data.data.token)
              this.$store.dispatch("user/setUserId", res.data.data.userId)
              this.$store.dispatch("user/setName", res.data.data.name)
              this.$store.dispatch("user/setOrganName", res.data.data.organName)
              this.$store.dispatch("user/setIdentify", res.data.data.identify)
              this.$store.dispatch("app/setMenuList", res.data.data.menuList)
              let addR = generaMenu([], res.data.data.menuList)
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
              this.$router.push("/index/dashboard")
            })
          } else if (_this.loginForm.identify === "公司员工"){
            empLogin(_this.loginForm.account, _this.loginForm.loginPassword).then(res => {
              this.$store.dispatch("user/setCompanyId", res.data.data.companyId)
              this.$store.dispatch("user/setToken", res.data.data.token)
              this.$store.dispatch("user/setName", res.data.data.name)
              this.$store.dispatch("user/setOrganName", res.data.data.organName)
              this.$store.dispatch("user/setUserId", res.data.data.userId)
              this.$store.dispatch("user/setIdentify", res.data.data.identify)
              this.$store.dispatch("app/setMenuList", res.data.data.menuList)
              let addR = generaMenu([], res.data.data.menuList)
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
              this.$router.push("/index/dashboard")
            })
          }
          _this.loading = false
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style>


.login-form {
  height: 320px;
  width: 400px;
  margin-left: -10px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  margin-top: -30px;
  margin-left: -30px;
  height: 400px;
  width: 480px;
}

.my-card-text{
  font-size: 22px;
  font-weight: bold;
  color: #1592ef;
  text-align: center;
}

.bgone{
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;right: 0;left: 0;bottom: 0;margin: auto;
}

.pic{
  width: 492px;
  height: auto;
  position: absolute;
  top:173px;right: 453px;left: 0;bottom: 0;margin: auto;
  z-index: 99999;
}

.table{
  background-color: #FFFFFF;
  width: 960px;
  height: 465px;
  position: absolute;
  top:20%;right: 0;left: 0;bottom: 0;margin: auto;
}

.login-btn{
  border: 0;
  position: absolute;
  left: 0;
  color: #fff;
  width: 300px;
  background-color: #1592ef;
  border-radius: 30px;
  text-shadow:2px 2px 1px rgba(0, 0, 0, 0.2);
  box-shadow:2px 2px 1px rgba(0, 0, 0, 0.2);
  height: 50px;
}

.wel{
  width: 960px;
  height: 35px;
  color: #fff;
  font-size: 30px;
  position: absolute;
  top: -7rem;
  text-align: center;
}

.wel1{
   width: 960px;
   height: 35px;
   color: #fff;
   font-size: 12.38px;
   position: absolute;
   top: -4rem;
   text-align: center;

 }

.login-form-div{
  position: absolute;
  top: 3.8rem;
  right:4rem;
  height: 300px;
  width: 400px;
}

</style>
