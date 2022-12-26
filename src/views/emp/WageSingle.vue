<template>


  <el-card class="box-card">
    <el-button @click="exitEdit" icon="el-icon-refresh-left" type="text" round style="margin-bottom: 30px; margin-left: 30px">返回 </el-button>

    <el-form :model="wageInfo" :rules="rules" ref="wageInfo" label-width="100px" class="demo-ruleForm" >
      <el-row type="flex" justify="space-around">

        <el-col :span="12">
          <el-form-item label="姓名" prop="employeeName">
            <el-input v-model="wageInfo.employeeName" class="my-el-input"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="手机号" prop="employeeTel">
            <el-input v-model="wageInfo.employeeTel" class="my-el-input"></el-input>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row type="flex" justify="space-around">

        <el-col :span="12">
          <el-form-item label="部门" prop="departmentName">
            <el-select filterable style="width: 220px" v-model="wageInfo.departmentName" placeholder="请选择所属部门" @change="selectDepartment">
              <el-option :value="dep.departmentName" v-for="dep in departmentList" :key="dep.departmentId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="基本工资" prop="baseWage">
            <el-input v-model="wageInfo.baseWage" class="my-el-input" type="Number"></el-input>
          </el-form-item>

        </el-col>

      </el-row>




      <el-row type="flex" justify="space-around">
        <el-col :span="12">
          <el-form-item label="津贴" prop="allowance">
            <el-input v-model="wageInfo.allowance" class="my-el-input"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="罚款" prop="penalty">
            <el-input v-model="wageInfo.penalty" class="my-el-input"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="津贴说明" >
        <el-input v-model="wageInfo.allowanceReason" type="textarea"
                  :rows="3"></el-input>
      </el-form-item>

      <el-form-item label="罚款说明" >
        <el-input v-model="wageInfo.penaltyReason" type="textarea"
                  :rows="3"></el-input>
      </el-form-item>


      <el-row type="flex" justify="space-around">
        <el-col :span="12" >
          <el-form-item label="起始日期" prop="startTime">
            <el-date-picker
                    v-model="wageInfo.startTime"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束日期" prop="endTime">
            <el-date-picker
                    v-model="wageInfo.endTime"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider></el-divider>
      <el-form-item style="text-align: center">
        <el-button @click="exitEdit" type="danger">返回 </el-button>
        <el-button type="primary" @click="onSubmit">{{ isAdd ? "新增" : "修改" }}</el-button>
      </el-form-item>

    </el-form>
  </el-card>
</template>

<script>

import {mapGetters} from "vuex";
import {getAllDepartmentApi} from "@/api/department";
import {addWageApi, updateWageApi, getWageByIdApi} from "@/api/wage";
import {getRoleByDepartmentId} from "@/api/role";

export default {
  /*
  此页面作为个人信息的详情页面、编辑页面以及新增页面
   */
  name: "WageSingle",

  computed: {

    getCompanyId(){
      return this.$store.getters["user/getCompanyId"]
    },

    getToken(){
      return this.$store.getters["user/getToken"]
    },

    getUserId(){
      if (this.$store.getters["user/getIdentify"] === 'COMPANY_ADMIN')
        return 1
      return this.$store.getters["user/getUserId"]
    },

  },

  created() {
    this.uoa = this.$route.params.uoa;
    // 首先获取 select 框部门信息
    this.getDepartmentSelect()
    // 如果是编辑状态，首先根据 userId 获取详细信息
    if (!isNaN(this.uoa) && this.uoa > 0){
      this.disableEdit = true
      // console.log("uoa = ", this.uoa)
      getWageByIdApi(this.uoa).then(res => {
        this.wageInfo = res.data.data
      })
      this.isAdd = false
    }else {
      this.initEmpInfo()
      this.disableEdit = false
      this.isAdd = true
    }
  },

  data(){

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
      wageInfo: {
        wageId: 0,
        employeeName: "",
        employeeTel: "",
        departmentName: "",
        baseWage: "",
        allowance: "",
        allowanceReason: "",
        penalty: "",
        penaltyReason: "",
        startTime: "",
        endTime: "",
      },
      rules: {
        employeeName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '请确定职工所在部门', trigger: 'change' }
        ],
        employeeTel:[
          { required: true, message: '请输入职工手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
        ],
        baseWage: [
          {required: true, trigger: 'blur', message: '请输入职工基本工资'}
        ]}
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
      this.$router.replace("/empw/wm")
    },

    onSubmit() {
      const  _this = this
      this.$refs.wageInfo.validate((valid) => {
        if (valid) {
          if (this.isAdd){
            addWageApi(_this.wageObjectMapping()).then(()=>{
              _this.$message({
                message: '新增成功',
                type: 'success'
              });
              _this.exitEdit()
            })
          } else {
            updateWageApi(_this.wageObjectMapping()).then(()=>{
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


    wageObjectMapping(){
      let obj =  {
        companyId: this.getCompanyId,
        departmentId: this.departmentName2Id[this.wageInfo.departmentName],
        employeeName: this.wageInfo.employeeName,
        employeeTel: this.wageInfo.employeeTel,
        baseWage: this.wageInfo.baseWage,
        allowance: this.wageInfo.allowance,
        allowanceReason: this.wageInfo.allowanceReason,
        penalty: this.wageInfo.penalty,
        penaltyReason: this.wageInfo.penaltyReason,
        startTime: this.wageInfo.startTime,
        endTime: this.wageInfo.endTime,
        inputUserId: this.getUserId
      }
      if (!this.isAdd)
        obj['wageId'] = this.wageInfo.wageId
      // console.log("obj = ", obj)
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
  margin:  50px auto;
  width: 60%;
  height: auto;
  border-radius: 30px;
}
</style>
