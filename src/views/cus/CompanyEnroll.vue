<template>
  <el-container style="text-align: left">
    <el-header style="background-color: #033f58; text-align: center; height: 80px;">
      <div style="float: left; margin-top: 13px; margin-left: 150px">
        <img src="../../assets/images/logo2.png" alt="1" class="header-logo" />
      </div>
      <div style="float: left; margin-left: 20px; margin-top: 7px">
        <h1 style="text-align: center;line-height: 60px;margin:0; color: #ffffff">六六顺人事管理系统</h1>
      </div>
      <div style="float: right; margin-right: 50px; margin-top: 7px">
        <div style="float: left; margin-top: -18px">
          <a  class="my_a" style="margin-top: 20px; color: #ffffff" @click="pageTo('/')"><h3>首页</h3></a>
        </div>
        <div style="float: left; margin-left: 30px">
          <el-dropdown>
            <span class="el-dropdown-link" style=" color: #ffffff">
              关于我们
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
              <el-dropdown-item><a href="#my-footer" class="dr-a" style="color: #033f58">联系我们</a></el-dropdown-item>
              <el-dropdown-item><a class="dr-a" style=" color: #033f58" @click="pageTo('/feedback')"> 在线反馈</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-main style="text-align: left; ">
      <el-card class="box-card">

        <el-form :model="companyInfo" :rules="rules" ref="companyInfo" label-width="100px" class="demo-ruleForm" >
          <el-divider content-position="left" ><p style="font-size: 20px"><i class="el-icon-office-building"></i>公司基本信息</p></el-divider>
          <el-row type="flex" justify="space-around">
            <el-col :span="8">
              <el-form-item label="公司名称" prop="companyName">
                <el-input v-model="companyInfo.companyName" class="my-el-input"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="地址">
                <el-cascader
                        placeholder="请选择公司所在区域"
                        v-model="regionVal"
                        :options="regionOptions"
                        @change="handleChange"></el-cascader>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="companyInfo.address" type="textarea" style="font-size: 10px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-around">
            <el-col :span="12">
              <el-form-item label="联系电话" prop="contactTel">
                <el-input v-model="companyInfo.contactTel" class="my-el-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系邮箱" prop="contactEmail">
                <el-input v-model="companyInfo.contactEmail" class="my-el-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-around">
            <el-col :span="12">
              <el-form-item label="公司Logo" prop="logoImage">
                <lls-upload :limit="1" :get-file-urls-call-func="getLogoImageCallFunc" :oss-model="0" :init-file-list="getUrlListByStr(companyInfo.logoImage)"
                            :key="1">
                </lls-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="营业执照" prop="licenseImage">
                <lls-upload :limit="1" :get-file-urls-call-func="getLicenseImageCallFunc" :oss-model="1" :init-file-list="getUrlListByStr(companyInfo.licenseImage)"
                            :key="1">
                </lls-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <div style="margin-top: 70px"></div>

          <el-divider content-position="left" ><p style="font-size: 20px"><i class="el-icon-s-custom"></i>公司法人信息</p></el-divider>

          <el-row type="flex" justify="space-around">
            <el-col :span="12">
              <el-form-item label="法人姓名" prop="juridicalPersonName">
                <el-input v-model="companyInfo.juridicalPersonName" class="my-el-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="juridicalPersonGender">
                <el-radio-group v-model="companyInfo.juridicalPersonGender" >
                  <el-radio :label="0">女</el-radio>
                  <el-radio :label="1">男</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-around">
            <el-col :span="12">
              <el-form-item label="联系电话" prop="juridicalPersonTel">
                <el-input v-model="companyInfo.juridicalPersonTel" class="my-el-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系邮箱" prop="juridicalPersonEmail">
                <el-input v-model="companyInfo.juridicalPersonEmail" class="my-el-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="身份证" prop="juridicalPersonIdCard">
            <lls-upload :limit="2" :get-file-urls-call-func="getJuridicalPersonIdCardCallFunc" :oss-model="2" :init-file-list="getUrlListByStr(companyInfo.juridicalPersonIdCard)"
                        :key="1">
            </lls-upload>
          </el-form-item>

          <div style="margin-top: 80px"></div>

          <el-divider content-position="left" ><p style="font-size: 20px"><i class="el-icon-s-custom"></i>公司法定代表信息</p></el-divider>

          <el-row type="flex" justify="space-around">
            <el-col :span="12">
              <el-form-item label="代表姓名" prop="representativeName">
                <el-input v-model="companyInfo.representativeName" class="my-el-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="representativeGender">
                <el-radio-group v-model="companyInfo.representativeGender" >
                  <el-radio :label="0">女</el-radio>
                  <el-radio :label="1">男</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-around">
            <el-col :span="12">
              <el-form-item label="联系电话" prop="representativeTel">
                <el-input v-model="companyInfo.representativeTel" class="my-el-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系邮箱" prop="representativeEmail">
                <el-input v-model="companyInfo.representativeEmail" class="my-el-input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="身份证" prop="representativeIdCard">
            <lls-upload :limit="2" :get-file-urls-call-func="getRepresentativeIdCardCallFunc" :oss-model="2" :init-file-list="getUrlListByStr(companyInfo.representativeIdCard)"
                        :key="1">
            </lls-upload>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button @click="exitEdit" type="danger">返回 </el-button>
            <el-button type="primary" @click="onSubmit">注册</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>

    <el-footer class="footer" style="background-color: #033f58; height: 100px; margin-top: 0; text-align: center;" >
      <div style="float: top; width: 100%; height: 100px; margin-top: 20px">
        <lls-footer></lls-footer>
      </div>
    </el-footer>




  </el-container>
</template>

<script>

import llsUpload from "@/components/upload/upload"
import LlsFooter from "../../components/container/LlsFooter";
import {getRegion} from "../../api/common"

import { addCompanyApi, updateCompanyApi} from "../../api/company";
import {region} from "../../utils/common";

export default {
  /*
   */
  name: "CompanyEnroll",

  computed: {
    getCompanyId(){
      return this.$store.getters["user/getCompanyId"]
    },


  },

  components: {llsUpload, LlsFooter},

  created() {
    this.getRegionOpt()
    this.initCompanyInfo()
  },

  data(){
    return {
      regionVal: [],
      regionOptions: [],

      companyInfo: {
        companyName: 0,
        provinceId: 0,
        cityId: 0,
        districtId: 0,
        address: "",
        contactTel: "",
        contactEmail: "",
        logoImage: "",
        licenseImage: "",

        juridicalPersonName: "",
        juridicalPersonGender: "",
        juridicalPersonIdCard: "",
        juridicalPersonTel: "",
        juridicalPersonEmail: "",

        representativeName: "",
        representativeGender: "",
        representativeIdCard: "",
        representativeTel: "",
        representativeEmail: ""
      },


      rules: {
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入公司详细地址', trigger: 'blur' }
        ],
        contactTel: [
          { required: true, message: '请输入公司联系电话', trigger: 'blur' }
        ],
        contactEmail: [
          { required: true, message: '请输入公司联系邮箱', trigger: 'blur' }
        ],
        logoImage: [
          {required: true, message: '请上传公司Logo', trigger: 'blur' }
        ],
        licenseImage: [
          { trigger: 'blur' , message: "请上传公司营业执照", required:true}
        ],

        juridicalPersonName: [
          { trigger: 'blur' , message: "请填写公司法人姓名", required:true}
        ],
        juridicalPersonGender: [
          { trigger: 'blur' , message: "请填写公司法人性别", required:true}
        ],
        juridicalPersonIdCard: [
          { trigger: 'blur' , message: "请填写公司法人身份证件", required:true}
        ],
        juridicalPersonTel: [
          { trigger: 'blur' , message: "请填写公司法人联系电话", required:true}
        ],
        juridicalPersonEmail: [
          { trigger: 'blur' , message: "请填写公司法人联系邮箱", required:true}
        ],

        representativeName: [
          { trigger: 'blur' , message: "请填写公司法定代表姓名", required:true}
        ],
        representativeGender: [
          { trigger: 'blur' , message: "请填写公司法定代表性别", required:true}
        ],
        representativeIdCard: [
          { trigger: 'blur' , message: "请填写公司法定代表身份证件", required:true}
        ],
        representativeTel: [
          { trigger: 'blur' , message: "请填写公司法定代表联系电话", required:true}
        ],
        representativeEmail: [
          { trigger: 'blur' , message: "请填写公司法定代表联系邮箱", required:true}
        ],


      }
    }
  },
  methods: {
    pageTo(path){
      this.$router.push(path)
    },

    exitEdit() {
      this.$router.replace("/")
    },

    getJuridicalPersonIdCardCallFunc(fileUrls) {
      this.companyInfo.juridicalPersonIdCard = fileUrls.trim()
    },

    getRepresentativeIdCardCallFunc(fileUrls) {
      this.companyInfo.representativeIdCard = fileUrls.trim()
    },

    getUrlListByStr(str) {
      if (typeof str === "undefined" || str === null || str.trim() === "")
        return []
      return str.split(" ").map(url => {
        return {url: url}
      })
    },

    getLicenseImageCallFunc(fileUrls) {
      this.companyInfo.licenseImage = fileUrls.trim()
    },

    getLogoImageCallFunc(fileUrls) {
      this.companyInfo.logoImage = fileUrls.trim()
    },

    handleChange(value) {
      this.regionVal = value
    },


    getRegionOpt() {
      this.regionOptions = region
    },

    onSubmit() {
      const _this = this
      this.companyInfo.provinceId = this.regionVal[0]
      this.companyInfo.cityId = this.regionVal[1]
      this.companyInfo.districtId = this.regionVal[2]
      this.$refs.companyInfo.validate((valid) => {
        if (valid) {
          addCompanyApi(this.companyInfo).then(() => {
            _this.$message({
              message: '注册成功，请等待后台审核...',
              type: 'success'
            });
            _this.exitEdit()
          })
        } else {
          return false;
        }
      });
    },



    initCompanyInfo() {
      this.companyInfo = {
        companyName: "",
        provinceId: 0,
        cityId: 0,
        districtId: 0,
        address: "",
        contactTel: "",
        contactEmail: "",
        logoImage: "",
        licenseImage: "",

        juridicalPersonName: "",
        juridicalPersonGender: "",
        juridicalPersonIdCard: "",
        juridicalPersonTel: "",
        juridicalPersonEmail: "",

        representativeName: "",
        representativeGender: "",
        representativeIdCard: "",
        representativeTel: "",
        representativeEmail: ""
      }
    }
  }
}
</script>



<style scoped>
/*@import "../../styles/cus.css";*/
.my-el-input{
  width: 250px;
}

.box-card {
  width: 80%;
  margin: auto;
  height: auto;
  border-radius: 30px;
}


.header-logo {
  width: 50px;
  height: 50px;
}



.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}


.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}





a {
  text-decoration: none;
}

a:focus {
  /* firefox */
  outline: none;
}

img {
  border: none;
}


/* 社会化图标 */

.social {
  font-size: 60px;
  line-height: 60px;
  margin-bottom: 25px;
}

.social>a {
  color: #fff;
}

.footer>.count {
  cursor: pointer;
  display: inline;
}

.footer>.count>img {
  vertical-align: text-top;
  opacity: 0.6;
}

.footer>.count:hover>img {
  opacity: 1;
}


/* 备案信息 */

.web-record {
  margin-top: 20px;
  color: #777575;
}

.web-record>a {
  transition: all 0.25s ease;
  -webkit-transition: all 0.25s ease;
  color: #777575;
  font-size: 14px;
  white-space: nowrap;
}

.web-record>a:hover {
  text-decoration: underline;
}

.web-record>a>img {
  opacity: 0.4;
  vertical-align: text-top;
}

.web-record>a:hover>img {
  opacity: 0.8;
}

.social>a {
  display: inline-block;
  position: relative;
}

.social>a[href]:after,
.social>a[href]:before {
  -webkit-transition: all .18s ease-out .18s;
  transition: all .18s ease-out .18s;
  opacity: 0;
  display: none;
  left: 50%;
  bottom: 100%;
  -webkit-transform: translate3d(-50%, 10px, 0);
  transform: translate3d(-50%, 10px, 0);
  position: absolute;
}


/* 下面的三角 */

.social>a[href]:after {
  border-top: 8px solid #222;
  border-top: 8px solid hsla(0, 0%, 0%, .85);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  content: "";
  height: 0;
  width: 0;
  margin-bottom: 8px;
}


/* 气泡主体 */

.social>a[href]:before {
  background: #222;
  background: hsla(0, 0%, 0%, .85);
  color: #f6f6f6;
  content: attr(mkpop);
  font-size: 14px;
  height: 32px;
  margin-bottom: 15px;
  line-height: 32px;
  padding: 0 15px;
  text-shadow: 0 1px 1px hsla(0, 0%, 0%, 1);
  white-space: nowrap;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
}


/* 鼠标滑过时显示出来 */

.social>a[href]:hover:after,
.social>a[href]:hover:before {
  display: block;
  opacity: 1;
}



.my_a {
  color: #FFF;
}
.my_a:before {
  color: #FFF;
}
.my_a:after {
  color: #FFF;
}

.dr-a {
  color: #332b2b;
}
.dr-a:before {
  color: #332b2b;
}
.dr-a:after {
  color: #332b2b;
}

.el-dropdown-link {
  cursor: pointer;
  color: #FFF;
  font-weight: bold;
  font-size: 19px;
}

</style>
