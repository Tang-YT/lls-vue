<template>


  <el-card class="box-card">
    <el-button @click="exitEdit" icon="el-icon-refresh-left" type="text" round style="margin-bottom: 30px; margin-left: 30px">返回 </el-button>

    <el-form :model="employeeInfo" :rules="rules" ref="employeeInfo" label-width="100px" class="demo-ruleForm" >
      <el-row type="flex" justify="space-around">
        <el-col :span="12">
          <el-form-item label="姓名" prop="employeeName">
            <el-input v-model="employeeInfo.employeeName" class="my-el-input"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="employeeGender">
            <el-radio-group v-model="employeeInfo.employeeGender" >
              <el-radio :label="0">女</el-radio>
              <el-radio :label="1">男</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="已婚">
        <el-switch v-model="marital"></el-switch>
      </el-form-item>

      <el-row type="flex" justify="space-around">
        <el-col :span="12" >
          <el-form-item label="部门" prop="departmentName">
            <el-select filterable  v-model="employeeInfo.departmentName" placeholder="请选择所属部门" @change="selectDepartment">
              <el-option :value="dep.departmentName" v-for="dep in departmentList" :key="dep.departmentId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职位" prop="roleName">
            <el-select filterable  v-model="employeeInfo.roleName" placeholder="请选择职位">
              <el-option :value="ro.roleName" v-for="ro in roleList" :key="ro.roleId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around">
        <el-col :span="12" >
          <el-form-item label="电话" prop="employeeTel">
            <el-input v-model="employeeInfo.employeeTel" class="my-el-input"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="employeeEmail">
            <el-input v-model="employeeInfo.employeeEmail" class="my-el-input"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around">
        <el-col :span="12" >
          <el-form-item label="学历" prop="employeeDegree">
            <el-select v-model="employeeInfo.employeeDegree" placeholder="请选择学历">
              <el-option :value="de" v-for="(de,index) in ['小学', '初中', '高中', '大学', '研究生']" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="民族" prop="employeeEthnic">
            <el-select filterable  v-model="employeeInfo.employeeEthnic" placeholder="请选择民族">
              <el-option :value="de" v-for="(de,index) in getEmployeeEthnic" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around">
        <el-col :span="12" >
          <el-form-item label="入职日期" prop="joinDate">
            <el-date-picker
                    v-model="employeeInfo.joinDate"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birthDate">
            <el-date-picker
                    v-model="employeeInfo.birthDate"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>

        </el-col>
      </el-row>

      <el-form-item label="职工照片" prop="employeeImage">
        <lls-upload :limit="1" :get-file-urls-call-func="getEmployeeImageCallFunc" :oss-model="3" :init-file-list="getUrlListByStr(employeeInfo.employeeImage)"
                    :key="isAdd ? 1 : new Date().getTime()">
        </lls-upload>
      </el-form-item>

      <el-form-item label="身份证" prop="employeeIdCard">
        <lls-upload :limit="2" :get-file-urls-call-func="getEmployeeIDCardCallFunc" :oss-model="2" :init-file-list="getUrlListByStr(employeeInfo.employeeIdCard)"
                    :key="isAdd ? 1 : new Date().getTime()">
        </lls-upload>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item style="text-align: center">
        <el-button @click="exitEdit" type="danger">返回 </el-button>
        <el-button type="primary" @click="onSubmit">{{ isAdd ? "新增" : "修改" }}</el-button>
      </el-form-item>

    </el-form>
  </el-card>
</template>

<script>

import {getPersonByIdApi} from "../../api/person";
import {mapGetters} from "vuex";
import {getAllDepartmentApi} from "../../api/department";

import {addPersonApi, updatePersonApi} from "../../api/person";
import {getRoleByDepartmentId} from "../../api/role";
import {employeeEthnic} from "../../utils/common"

import llsUpload from "../../components/upload/upload"

export default {
  /*
  此页面作为个人信息的详情页面、编辑页面以及新增页面
   */
  name: "PersonSingle",

  computed: {

    getCompanyId(){
      return this.$store.getters["user/getCompanyId"]
    },

    getToken(){
      return this.$store.getters["user/getToken"]
    },


    getEmployeeEthnic(){
      return employeeEthnic
    },

  },

  components: {llsUpload},

  created() {
    this.uoa = this.$route.params.uoa;
    // 首先获取 select 框部门信息
    this.getDepartmentSelect()
    // 如果是编辑状态，首先根据 userId 获取详细信息
    if (!isNaN(this.uoa) && this.uoa > 0){
      this.disableEdit = true
      // console.log("uoa = ", this.uoa)
      getPersonByIdApi(this.uoa).then(res => {
        this.employeeInfo = res.data.data
        // console.log("empInfo = ", this.employeeInfo)
        this.marital = this.employeeInfo.employeeMarital === 1
        // 根据目前的部门获取 角色 select 框
        setTimeout(()=>{
          this.getRoleByDepartment(this.departmentName2Id[this.employeeInfo.departmentName])
        }, 2000)
      })
      this.isAdd = false
    }else {
      this.initEmpInfo()
      this.disableEdit = false
      this.isAdd = true
    }
  },

  data(){
    const checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('请输入职工邮箱'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    };

    const checkIdCard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请上传员工身份证图片'))
      }
      if (value.split(" ").length !== 2){
        return callback(new Error('请上传员工身份证正反两张照片pain'))
      }
      callback()
    };

    return {
      isAdd: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      marital: false,
      uoa: "",
      // 是否可编辑状态
      disableEdit: true,
      // select部门列表
      departmentList: [],
      // 部门信息，部门名对 id 的映射
      departmentName2Id: {},
      // select职位列表
      roleList: [],
      // 角色信息，角色名对 id 的映射
      roleName2Id: {},
      employeeInfo: {
        employeeId: 0,
        employeeName: "",
        departmentName: "",
        roleName: "",
        employeeGender: "",
        employeeImage: "",
        employeeIdCard: "",
        employeeTel: "",
        employeeEmail: "",
        employeeDegree: "",
        employeeEthnic: "",
        employeeMarital: 0,
        joinDate: "",
        birthDate: ""
      },
      rules: {
        employeeName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        employeeGender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        departmentName: [
          { required: true, message: '请确定职工所在部门', trigger: 'change' }
        ],
        roleName: [
          { required: true, message: '请确定职工职称', trigger: 'change' }
        ],
        employeeTel:[
          { required: true, message: '请输入职工手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
        ],
        employeeEmail: [
          {required: true, trigger: 'blur', validator: checkEmail}
        ],
        employeeDegree: [
          { required: true, message: '请选择职工学历', trigger: 'change' }
        ],
        employeeEthnic: [
          { required: true, message: '请选择职工民族', trigger: 'change' }
        ],
        joinDate: [
          { type: 'date', required: true, message: '请确定员工入职日期', trigger: 'change' }
        ],
        birthDate: [
          { type: 'date', required: true, message: '请确定员工出生日期', trigger: 'change' }
        ],
        employeeImage: [
          {required: true, message: '请上传员工照片', trigger: 'blur' }
        ],
        employeeIdCard: [
          { trigger: 'blur' , validator: checkIdCard, required:true}
        ],
      }
    }
  },
  methods: {

    getUrlListByStr(str){
      if (typeof str === "undefined" || str.trim() === "")
        return []
      return str.split(" ").map(url => {
        return {url: url}
      })
    },

    getEmployeeImageCallFunc(fileUrls){
      this.employeeInfo.employeeImage = fileUrls.trim()
    },


    getEmployeeIDCardCallFunc(fileUrls){
      this.employeeInfo.employeeIdCard = fileUrls.trim()
      // console.log("emp = ", this.employeeInfo)
    },


    selectDepartment(val) {
      this.getRoleByDepartment(this.departmentName2Id[val])
      this.employeeInfo.roleName = ""
    },

    // 获取 部门的 select 数据
    getDepartmentSelect() {
      const _this = this;
      _this.departmentList = []
      _this.departmentName2Id = {}
      getAllDepartmentApi(_this.getCompanyId).then(res => {
        for (let i = 0; i < res.data.data.length; ++i) {
          _this.departmentList.push({
            "companyId": res.data.data[i].companyId,
            "departmentId": res.data.data[i].departmentId,
            "departmentName": res.data.data[i].departmentName
          })
          _this.departmentName2Id[res.data.data[i].departmentName] = res.data.data[i].departmentId
        }
      })
      return ""
    },

    getRoleByDepartment(departmentId) {
      const _this = this
      _this.roleList = []
      _this.roleName2Id = {}
      getRoleByDepartmentId(departmentId).then(res => {
        for (let i = 0; i < res.data.data.length; ++i) {
          _this.roleList.push({
            "companyId": res.data.data[i].companyId,
            "roleId": res.data.data[i].roleId,
            "roleName": res.data.data[i].roleName
          })
          _this.roleName2Id[res.data.data[i].roleName] = res.data.data[i].roleId
        }
      })
    },

    exitEdit() {
      this.$router.replace("/emp/pm")
    },

    onSubmit() {
      const  _this = this
      this.$refs.employeeInfo.validate((valid) => {
        if (valid) {
          if (this.isAdd){
            addPersonApi(_this.employeeObjectMapping()).then(()=>{
              _this.$message({
                message: '新增成功',
                type: 'success'
              });
              _this.exitEdit()
            })
          } else {
            updatePersonApi(_this.employeeObjectMapping()).then(()=>{
              _this.$message({
                message: "修改成功",
                type: "success"
              })
              _this.exitEdit()
            })
          }
        } else {
          return false;
        }
      });
    },


    employeeObjectMapping(){
      let obj =  {
        companyId: this.getCompanyId,
        departmentId: this.departmentName2Id[this.employeeInfo.departmentName],
        roleId: this.roleName2Id[this.employeeInfo.roleName],
        employeeName: this.employeeInfo.employeeName,
        employeeGender: this.employeeInfo.employeeGender,
        employeeImage: this.employeeInfo.employeeImage,
        employeeIdCard: this.employeeInfo.employeeIdCard,
        employeeTel: this.employeeInfo.employeeTel,
        employeeEmail: this.employeeInfo.employeeEmail,
        employeeEthnic: this.employeeInfo.employeeEthnic,
        employeeDegree: this.employeeInfo.employeeDegree,
        employeeMarital: this.marital ? 1 : 0,
        joinDate: this.employeeInfo.joinDate,
        birthDate: this.employeeInfo.birthDate
      }
      if (!this.isAdd)
        obj['userId'] = this.employeeInfo.userId
      console.log("obj = ", obj)
      return obj
    },

    initEmpInfo() {
      this.employeeInfo = {
        employeeName: "",
        departmentName: "",
        roleName: "",
        employeeGender: "",
        employeeImage: "",
        employeeIdCard: "",
        employeeTel: "",
        employeeEmail: "",
        employeeDegree: "",
        employeeEthnic: "",
        employeeMarital: 0,
        joinDate: "",
        birthDate: ""
      }
    }
  }
}
</script>



<style scoped>

.my-el-input{
  width: 220px;
}

.box-card {
  width: 60%;
  height: auto;
  /*border-radius: 30px;*/
  margin:  20px auto;
}
</style>
