<template>
  <el-container>
    <el-header>
      <el-form :inline="true" :model="conditionSearchPersonReq" class="demo-form-inline">

        <el-form-item label="姓名" prop="employeeName"  >
          <el-input v-model="conditionSearchPersonReq.employeeName" clearable></el-input>
        </el-form-item>

        <el-form-item label="部门" prop="departmentNames">
          <el-select filterable multiple collapse-tags v-model="departmentNames" placeholder="所有部门">
            <el-option :value="dep.departmentName" v-for="dep in departmentList" :key="dep.departmentId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="getPersonInfoByPageAndCondition">查询</el-button>
        </el-form-item>
        <el-button type="warning" @click="addPerson">录入员工</el-button>

        <el-button type="danger" icon="el-icon-download" @click="dialogFormVisible = true">信息导出</el-button>
      </el-form>
    </el-header>

    <el-main>


      <el-dialog title="员工信息导出" :visible.sync="dialogFormVisible">

        <el-form  :model="conditionSearchEmployeeExcelReq" label-position="top" >

          <el-form-item label="姓名" prop="employeeName" clearable>
            <el-input style="width: 220px" v-model="conditionSearchEmployeeExcelReq.employeeName" ></el-input>
          </el-form-item>

          <el-form-item label="部门" prop="departmentNamesExcel">
            <el-select filterable multiple collapse-tags v-model="departmentNamesExcel" placeholder="所有部门">
              <el-option :value="dep.departmentName" v-for="dep in departmentList" :key="dep.departmentId"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="导出字段" >
              <el-checkbox-group v-model="conditionSearchEmployeeExcelReq.fields">
                <el-checkbox :label="f.eng" v-for="(f, index) in fieldsCHNName" :key="index" :disabled="f.dis">{{f.name}}</el-checkbox>
              </el-checkbox-group>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">

          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="getPersonInfoExcel">确 定</el-button>
        </div>
      </el-dialog>


      <el-table
              :data="tableData"
              border
              style="width: 100%">

        <el-table-column
                prop="employeeName"
                label="姓名">
        </el-table-column>

        <el-table-column
                label="照片">
          <template slot-scope="scope">
            <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.employeeImage"
            ></el-image>
          </template>
        </el-table-column>

        <el-table-column
                prop="departmentName"
                label="部门">
        </el-table-column>

        <el-table-column
          label="职称">
          <template slot-scope="scope">
            <el-tag effect="dark">{{scope.row.roleName}}</el-tag>
          </template>

        </el-table-column>

<!--        <el-table-column-->
<!--                prop="employeeEthnic"-->
<!--                width="80"-->
<!--                label="民族">-->
<!--        </el-table-column>-->

<!--        <el-table-column-->
<!--                prop="employeeEmail"-->
<!--                width="200"-->
<!--                label="邮箱">-->
<!--        </el-table-column>-->

<!--        <el-table-column-->
<!--                prop="employeeDegree"-->
<!--                width="80"-->
<!--                label="学历">-->
<!--        </el-table-column>-->

        <el-table-column
                prop="employeeTel"
                label="电话">
        </el-table-column>

<!--        <el-table-column-->
<!--                width="130"-->
<!--                label="入职日期">-->
<!--          <template slot-scope="scope">-->
<!--            {{new Date(parseInt(scope.row.joinDate)).toLocaleDateString().replace(/\//g, "-")}}-->
<!--          </template>-->
<!--        </el-table-column>-->

        <el-table-column
                label="性别">
          <template slot-scope="scope">
           <el-tag :type="scope.row.employeeGender === 1 ? 'success' : 'danger'" effect="dark">{{sexConvert(scope.row.employeeGender)}}</el-tag>
          </template>
        </el-table-column>


        <el-table-column
                label="婚烟状况">
          <template slot-scope="scope">
            <el-tag :type="scope.row.employeeMarital === 1 ? 'success' : 'danger'" >{{maritalConvert(scope.row.employeeMarital)}}</el-tag>
          </template>
        </el-table-column>

<!--        <el-table-column-->
<!--                width="130"-->
<!--                label="出生日期">-->
<!--          <template slot-scope="scope">-->
<!--            {{new Date(parseInt(scope.row.birthDate)).toLocaleDateString().replace(/\//g, "-")}}-->
<!--          </template>-->
<!--        </el-table-column>-->

        <el-table-column
                label="操作"
                >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editPerson(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>


    </el-main>
    <el-footer>
      <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="conditionSearchPersonReq.currentPage"
              :page-sizes="[5, 7, 9]"
              :page-size="conditionSearchPersonReq.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>


import {getPersonInfoByPageAndConditionApi, exportEmpData} from "../../api/person";
import {getAllDepartmentApi} from "../../api/department";

export default {
  name: "PersonManage",

  mounted() {
    this.conditionSearchPersonReq.companyId = this.getCompanyId
    this.conditionSearchEmployeeExcelReq.companyId = this.getCompanyId
    this.getPersonInfoByPageAndCondition()
    // 获取 部门的 select 数据
    this.getDepartmentSelect()
  },

  computed: {
    getCompanyId(){
      return this.$store.getters["user/getCompanyId"]
    },

    getToken(){
      return this.$store.getters["user/getToken"]
    },

  },

  data(){
    return {
      dialogFormVisible: false,
      // select部门列表
      departmentList: [],
      departmentName2Id: {},
      loading: false,
      departmentNames:[],
      departmentNamesExcel:[],

      fieldsCHNName: [
        {name: "姓名", dis: true, eng: "employeeName"},
        {name: "部门", dis: true, eng: "departmentName"},
        {name: "职位", dis: true, eng: "roleName"},
        {name: "性别", dis: true, eng: "employeeGender"},
        {name: "照片", dis: true, eng: "employeeImage"},
        {name: "手机号", dis: true, eng:  "employeeTel"},
        {name: "邮箱", dis: false, eng: "employeeEmail"},
        {name: "学历", dis: false, eng: "employeeDegree"},
        {name: "民族", dis: false, eng: "employeeEthnic"},
        {name: "婚烟状况", dis: false, eng: "employeeMarital"},
        {name: "入职日期", dis: false, eng: "joinDate"},
        {name: "出生日期", dis: false, eng: "birthDate"},
      ],

      conditionSearchEmployeeExcelReq: {
        employeeName: "",
        // 部门名
        departmentIds: [],
        companyId: this.getCompanyId,
        fields: ["userId", "employeeName","departmentName","roleName", "employeeGender", "employeeImage", "employeeTel"],
      },

      conditionSearchPersonReq:{
        currentPage: 1,
        pageSize: 5,
        employeeName: "",
        // 部门名
        departmentIds: [],
        companyId: this.getCompanyId
      },
      tableData: [],
      total: 0
    }
  },

  methods: {

    // 获取 部门的 select 数据
    getDepartmentSelect() {
      const _this = this;
      _this.departmentList = []
      _this.departmentName2Id = {}
      getAllDepartmentApi(_this.getCompanyId).then(res => {
        console.log("res = ", res.data)
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

    editPerson(row){
      this.$router.push("pm/" + row.userId)
    },

    addPerson(){
      this.$router.push("pm/add")
    },

    getPersonInfoByPageAndCondition(){
      this.conditionSearchPersonReq.departmentIds = []
      if (this.departmentNames !== null && this.departmentNames.length > 0) {
        for (let i = 0; i < this.departmentNames.length; ++i)
          this.conditionSearchPersonReq.departmentIds.push(this.departmentName2Id[this.departmentNames[i]])
      }
      getPersonInfoByPageAndConditionApi(this.conditionSearchPersonReq).then(res =>{
        this.total = res.data.data.total
        this.tableData = res.data.data.records
      })
    },


    getPersonInfoExcel(){
      this.conditionSearchEmployeeExcelReq.departmentIds = []
      if (this.departmentNamesExcel !== null && this.departmentNamesExcel.length > 0) {
        for (let i = 0; i < this.departmentNamesExcel.length; ++i)
          this.conditionSearchEmployeeExcelReq.departmentIds.push(this.departmentName2Id[this.departmentNamesExcel[i]])
      }
      // console.log("req = ", this.conditionSearchEmployeeExcelReq)
      // console.log("req1 = ", this.conditionSearchPersonReq)
      exportEmpData(this.conditionSearchEmployeeExcelReq).then(response =>{
        const filename = response.headers['content-disposition'].split(';')[1].split('=')[1]
        const blob = new Blob([response.data])
        const link = document.createElement('a')
        link.download = filename
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(link.href)
        document.body.removeChild(link)
        this.$message({
          message: '导出成功',
          type: 'success'
        });
      })
      this.dialogFormVisible = false
    },

    handleSizeChange(val) {
      this.conditionSearchPersonReq.pageSize = val
      this.getPersonInfoByPageAndCondition()
    },
    handleCurrentChange(val) {
      this.conditionSearchPersonReq.currentPage = val
      this.getPersonInfoByPageAndCondition()
    },
    sexConvert(val){
      return val === 1 ? '男' : '女'
    },

    maritalConvert(val){
      return val === 1 ? '已婚' : '未婚'
    }
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  color: #333;
  padding-top: 10px;
}

.el-footer {
  text-align: center;
}

.el-main {
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
