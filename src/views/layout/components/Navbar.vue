<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb style="width: 400px; float: left"/>
    <div style="height: 50px; width: 320px;  float: right; line-height: 1px; margin-right: 100px">
      <div style="float: right; margin-right: 10px; margin-top: 8px">
        <el-tag type="info" >
          {{getName}}
        </el-tag>
      </div>
      <div style="float: right; margin-right: 20px; margin-top: 8px">
        <el-tag effect="dark">
          {{getOrganName}}
        </el-tag>
      </div>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img src="../../../assets/images/tx.png" class="user-avatar" alt="">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退出登录</span>
        </el-dropdown-item>

        <el-dropdown-item divided v-if="getIdentify !== 'SUPER_ADMIN'">
          <span style="display:block;" @click="dialogFormVisible = true">密码修改</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog title="密码更改" :visible.sync="dialogFormVisible">
      <el-form :model="pwdForm" :rules="rules" ref="pwdForm" >
        <el-form-item label="请输入密码" prop="pwd1">
          <el-input v-model="pwdForm.pwd1" show-password></el-input>
        </el-form-item>
        <el-form-item label="请再次输入密码" prop="pwd2">
          <el-input v-model="pwdForm.pwd2" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="fixPwd">确 定</el-button>
      </div>
    </el-dialog>

  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {addPersonApi, fixPwdApi, updatePersonApi} from "../../../api/person";
import {fixCAPwdApi} from "../../../api/company";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),

    getIdentify(){
      // console.log("iden = ", this.$store.getters["user/getIdentify"])
      return this.$store.getters["user/getIdentify"]
    },

    getUserId(){
      // console.log("iden = ", this.$store.getters["user/getIdentify"])
      return this.$store.getters["user/getUserId"]
    },

    getName(){
      return this.$store.getters["user/getName"]
    },

    getOrganName(){
      return this.$store.getters["user/getOrganName"]
    },

    getCompanyId(){
      return this.$store.getters["user/getCompanyId"]
    }
  },

  data(){
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
        // password 是表单上绑定的字段
      } else if (value !== this.pwdForm.pwd1) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    };

    return {
      dialogFormVisible: false,
      pwdForm: {
        pwd1: "",
        pwd2: ""
      },

      rules: {
        pwd1: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
        ],
        pwd2: [
          {required: true, validator: validatePass2, trigger: 'change'}
        ]
      }
    }
  },

  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/ToggleSideBar')
    },
    logout() {
      window.localStorage.clear()
      location.reload();
    },

    fixPwd(){
      this.$refs.pwdForm.validate((valid) => {
        if (valid) {
          if (this.getIdentify === 'COMPANY_ADMIN'){
            fixCAPwdApi({
              "companyId": this.getCompanyId,
              "loginPassword": this.pwdForm.pwd1
            }).then(() => {
              this.$message({
                message: '密码更改成功，请重新登录',
                type: 'success'
              });
              setTimeout(()=>{
                this.logout()
              }, 1000)
            })
          }else if (this.getIdentify === 'EMPLOYEE'){
            fixPwdApi({
              "userId": this.getUserId,
              "loginPassword": this.pwdForm.pwd1
            }).then(() => {
              this.$message({
                message: '密码更改成功，请重新登录',
                type: 'success'
              });
              setTimeout(()=>{
                this.logout()
              }, 1000)
            })
          }
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

