<template>
  <el-container>
    <el-header style="min-height: 100px">
      <el-form :inline="true" :model="conditionSearchWageReq" class="demo-form-inline">

        <el-form-item label="姓名" prop="employeeName" clearable>
          <el-input v-model="conditionSearchWageReq.employeeName" ></el-input>
        </el-form-item>

        <el-form-item label="部门" prop="departmentNames">
          <el-select filterable multiple collapse-tags v-model="departmentNames" placeholder="所有部门">
            <el-option :value="dep.departmentName" v-for="dep in departmentList" :key="dep.departmentId"></el-option>
          </el-select>
        </el-form-item>

         <el-form-item label="起始日期" prop="startTime">
           <el-date-picker
                   v-model="conditionSearchWageReq.startTime"
                   align="right"
                   type="date"
                   placeholder="选择日期"
                   :picker-options="pickerOptions">
           </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="endTime">
           <el-date-picker
                   v-model="conditionSearchWageReq.endTime"
                   align="right"
                   type="date"
                   placeholder="选择日期"
                   :picker-options="pickerOptions">
           </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="getWageInfoByPageAndCondition">查询</el-button>
        </el-form-item>
        <el-button type="warning" @click="addWage">薪资录入</el-button>
        <el-button type="danger" icon="el-icon-download" @click="dialogFormVisible = true">薪资导出</el-button>
      </el-form>


    </el-header>

    <el-main>


      <el-dialog title="薪资信息导出" :visible.sync="dialogFormVisible">

        <el-form  :model="conditionSearchWageExcelReq" label-position="top" >

          <h1>条件过滤表单，默认导出所有信息</h1>

          <el-form-item label="姓名" prop="employeeName" clearable>
            <el-input style="width: 220px" v-model="conditionSearchWageExcelReq.employeeName" ></el-input>
          </el-form-item>

          <el-form-item label="部门" prop="departmentNamesExcel">
            <el-select filterable multiple collapse-tags v-model="departmentNamesExcel" placeholder="所有部门">
              <el-option :value="dep.departmentName" v-for="dep in departmentList" :key="dep.departmentId"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="起始日期" prop="startTime">
            <el-date-picker
                    v-model="conditionSearchWageExcelReq.startTime"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期" prop="endTime">
            <el-date-picker
                    v-model="conditionSearchWageExcelReq.endTime"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>


        </el-form>

        <div slot="footer" class="dialog-footer">

          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="getWageInfoExcel">确 定</el-button>
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
                prop="departmentName"
                label="部门">
        </el-table-column>

        <el-table-column
                prop="baseWage"
                label="基本工资">
        </el-table-column>

        <el-table-column
                prop="allowance"
                label="津贴">
        </el-table-column>

        <el-table-column
                prop="penalty"
                label="罚款">
        </el-table-column>

        <el-table-column
                label="总工资">
          <template slot-scope="scope">
            {{scope.row.baseWage + scope.row.allowance - scope.row.penalty}}
          </template>
        </el-table-column>



        <el-table-column
                prop="inputEmployeeName"
                label="录入人">
        </el-table-column>


        <el-table-column
                label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editWage(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>


    </el-main>
    <el-footer>
      <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="conditionSearchWageReq.currentPage"
              :page-sizes="[5, 7, 9]"
              :page-size="conditionSearchWageReq.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>


    </el-footer>
  </el-container>
</template>

<script>

import {mapGetters} from "vuex";

import {getWageInfoByPageAndConditionApi, exportEmpData} from "@/api/wage"
import {getAllDepartmentApi} from "@/api/department";

export default {
  name: "WageManage",

  mounted() {
    this.conditionSearchWageReq.companyId = this.getCompanyId
    this.conditionSearchWageExcelReq.companyId = this.getCompanyId
    this.getWageInfoByPageAndCondition()
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

      dialogFormVisible: false,
      // select部门列表
      departmentList: [],
      departmentName2Id: {},
      loading: false,
      departmentNames:[],
      departmentNamesExcel:[],


      conditionSearchWageExcelReq: {
        employeeName: "",
        // 部门名
        departmentIds: [],
        companyId: this.getCompanyId,
        startTime: "",
        endTime: "",
      },

      conditionSearchWageReq:{
        currentPage: 1,
        pageSize: 5,
        employeeName: "",
        // 部门名
        departmentIds: [],
        companyId: this.getCompanyId,
        startTime: "",
        endTime: "",
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
    editWage(row){
      this.$router.push("wm/" + row.wageId)
    },

    addWage(){
      this.$router.push("wm/add")
    },

    getWageInfoByPageAndCondition(){
      this.conditionSearchWageReq.departmentIds = []
      if (this.departmentNames !== null && this.departmentNames.length > 0) {
        for (let i = 0; i < this.departmentNames.length; ++i)
          this.conditionSearchWageReq.departmentIds.push(this.departmentName2Id[this.departmentNames[i]])
      }
      getWageInfoByPageAndConditionApi(this.conditionSearchWageReq).then(res =>{
        this.total = res.data.data.total
        this.tableData = res.data.data.records
        // console.log("wage reco = ", this.tableData)
      })
    },


    getWageInfoExcel(){
      this.conditionSearchWageExcelReq.departmentIds = []
      if (this.departmentNamesExcel !== null && this.departmentNamesExcel.length > 0) {
        for (let i = 0; i < this.departmentNamesExcel.length; ++i)
          this.conditionSearchWageExcelReq.departmentIds.push(this.departmentName2Id[this.departmentNamesExcel[i]])
      }
      // console.log("req = ", this.conditionSearchEmployeeExcelReq)
      // console.log("req1 = ", this.conditionSearchWageReq)
      exportEmpData(this.conditionSearchWageExcelReq).then(response =>{
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
      this.conditionSearchWageReq.pageSize = val
      this.getWageInfoByPageAndCondition()
    },
    handleCurrentChange(val) {
      this.conditionSearchWageReq.currentPage = val
      this.getWageInfoByPageAndCondition()
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
