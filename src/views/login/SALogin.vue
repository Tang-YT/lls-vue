<template>
  <div class="login-container">

    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container" style="text-align: center">
        <img src="../../assets/images/logo2.png" alt="1" class="header-logo" style=""/>
        <h3 class="title" style="margin-top: 40px">六六顺后台管理</h3>

      </div>
      <br>
      <el-form-item prop="account">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          id="account"
          ref="username"
          v-model="loginForm.account"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="loginPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          id="psw"
          :key="passwordType"
          ref="password"
          v-model="loginForm.loginPassword"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-button
        id="login_btn"
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
    <div class="info" style="bottom: 40px;">Beta: 1.0</div>
    <div class="info">Technical Support: tangyitao</div>
  </div>
</template>

<script>

import {SALogin} from '../../api/saLogin'
import store from "../../store";
import router from "../../router";
import Layout from "../layout/Layout";
import {generaMenu} from "../../utils/common";


export default {
  name: "SALogin",
  data() {
    return {
      loginForm: {
        account: "admin",
        loginPassword: "admin"
      },
      loginRules: {
        account: [
          { required: true, trigger: "blur", message: "请输入账号" }
        ],
        loginPassword: [
          { required: true, trigger: "blur", message: "请输入密码" }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },

  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },

    handleLogin() {
      window.localStorage.clear()
      let _this = this;
      this.loading = true;
      //数据格式验证
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          SALogin(_this.loginForm.account, _this.loginForm.loginPassword).then(res => {
            console.log("res = ", res.data.data )

            this.$store.dispatch("user/setToken", res.data.data.token)
            this.$store.dispatch("user/setUserId", res.data.data.userId)
            this.$store.dispatch("user/setIdentify", res.data.data.identify)
            this.$store.dispatch("app/setMenuList", res.data.data.menuList)
            this.$store.dispatch("user/setName", res.data.data.name)
            this.$store.dispatch("user/setOrganName", res.data.data.organName)
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
        } else {
          return false
        }
      });
      return 0
    }
  }
};
</script>

<style lang="scss">

.info {
  position: fixed;
  bottom: 20px;
  width: 100%;
  text-align: center;
  color: gainsboro;
}
$bg: #033f58;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #033f58;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
