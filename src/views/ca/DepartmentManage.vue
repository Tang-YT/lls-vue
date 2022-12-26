<template>
  <el-container>
    <el-header>

      <el-form :inline="true" :model="conditionSearchDepartmentReq" class="demo-form-inline">
        <el-form-item label="部门名">
          <el-input v-model="conditionSearchDepartmentReq.departmentName" placeholder="模糊查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDepartmentInfoByPageAndCondition" :loading="loading">查询</el-button>
        </el-form-item>
        <el-button type="warning" @click="dialogFormVisible = true">新增部门</el-button>
      </el-form>

    </el-header>
    <el-main>

      <el-dialog title="部门信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="departmentForm">
          <el-form-item label="部门名" >
            <el-input v-model="departmentForm.departmentName" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="exitEditDepartment">取 消</el-button>
          <el-button type="primary" @click="exeDepartment">{{dialogBtnName}}</el-button>
        </div>
      </el-dialog>

      <el-table
              :data="tableData"
              stripe
              style="width: 100%">
        <el-table-column
                prop="departmentId"
                label="部门Id"
                >
        </el-table-column>
        <el-table-column
                prop="departmentName"
                label="部门名"
               >
        </el-table-column>
        <el-table-column
                prop="departmentPeopleCount"
                label="部门人数"
        >
        </el-table-column>
        <el-table-column
                prop="createTime"
                label="创建时间">
        </el-table-column>

        <el-table-column
                label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="delDepartment(scope.row)"  size="small">删除</el-button>
            <el-button type="primary" size="small" @click="editDepartment(scope.row)">编辑</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="conditionSearchDepartmentReq.currentPage"
              :page-sizes="[5, 7, 9]"
              :page-size="conditionSearchDepartmentReq.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>

import {mapGetters} from 'vuex'
import {getDepartmentInfoByPageAndConditionApi, updateDepartmentApi, addDepartmentApi, delDepartmentApi} from '@/api/department'

export default {
  name: "DepartmentManage",

  computed: {

    getCompanyId(){
      return this.$store.getters["user/getCompanyId"]
    },

    getToken(){
      return this.$store.getters["user/getToken"]
    },

    dialogBtnName(){
      return this.isAdd ? "新增" : "修改"
    }
  },

  mounted() {
    this.initDepartmentForm();
    this.getDepartmentInfoByPageAndCondition()
  },

  data(){
    return {
      loading: false,
      dialogFormVisible: false,
      total: 0,
      tableData: [],
      conditionSearchDepartmentReq: {
        currentPage: 1,
        pageSize: 5,
        departmentName: "",
        companyId: this.getCompanyId
      },
      isAdd: true,
      departmentForm:{
        departmentName: "",
        companyId: -1,
        departmentId: -1,
      },
    }
  },

  methods: {

    handleSizeChange(val) {
      this.conditionSearchDepartmentReq.pageSize = val
      this.getDepartmentInfoByPageAndCondition()
    },
    handleCurrentChange(val) {
      this.conditionSearchDepartmentReq.currentPage = val
      this.getDepartmentInfoByPageAndCondition()
    },

    // 根据Id删除部门
    delDepartment(row) {
      const _this = this;
      this.$confirm('是否确定删除此部门信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDepartmentApi(row.departmentId).then(() => {
          _this.$message({
            type: 'success',
            message: '删除成功!'
          });
          _this.getDepartmentInfoByPageAndCondition()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 编辑部门
    editDepartment(row){
      this.departmentForm.departmentName = row.departmentName
      this.departmentForm.departmentId = row.departmentId
      this.departmentForm.companyId = row.companyId
      this.isAdd = false
      this.dialogFormVisible = true
    },

    // 条件分页查询部门信息
    getDepartmentInfoByPageAndCondition() {
      const _this = this;
      _this.loading = true
      _this.conditionSearchDepartmentReq.companyId = _this.getCompanyId
      getDepartmentInfoByPageAndConditionApi(_this.conditionSearchDepartmentReq).then(res => {
        // console.log("res = ", res)
        _this.total = res.data.data.total;
        _this.tableData = res.data.data.records;
      })
      _this.loading = false
    },

    exitEditDepartment(){
      this.$confirm('是否确定退出编辑状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogFormVisible = false
        this.initDepartmentForm()
      })
    },

    exeDepartment(){
      const _this = this
      _this.dialogFormVisible = false
      if (_this.isAdd){
        addDepartmentApi(
                {
                  departmentName: _this.departmentForm.departmentName,
                  companyId: _this.departmentForm.companyId
                }
        ).then(()=> {
          _this.$message({
            message: '添加成功',
            type: 'success'
          })
        })
      } else {
        updateDepartmentApi(
                {
                  departmentName: _this.departmentForm.departmentName,
                  departmentId: _this.departmentForm.departmentId,
                  companyId: _this.departmentForm.companyId
                }
        ).then(()=> {
          _this.$message({
            message: '修改成功',
            type: 'success'
          })
        })
      }
      _this.initDepartmentForm()
      _this.getDepartmentInfoByPageAndCondition()
      this.reload()
    },

    initDepartmentForm(){
      this.departmentForm = {
        departmentName: "",
        companyId: this.getCompanyId,
        departmentId: -1,
      }
    }
  },


}
</script>

<style scoped>

.el-header, .el-footer {
  padding-top: 10px;
  color: #333;
  margin-left: 0;
  /*background-color: #cd5782;*/
}

.el-footer{
  text-align: center;
}

.el-main {
  color: #333;
  text-align: center;
}

body > .el-container {
  padding: 0;
  margin: 0;
}
</style>
