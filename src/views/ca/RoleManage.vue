<template>
  <el-container>
    <el-header>

      <el-form :inline="true" :model="conditionSearchRoleReq" class="demo-form-inline">
        <el-form-item label="职位名">
          <el-input v-model="conditionSearchRoleReq.roleName" placeholder="模糊查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRoleInfoByPageAndCondition" :loading="loading">查询</el-button>
        </el-form-item>
        <el-button type="warning" @click="addRole">新增职位</el-button>
      </el-form>
    </el-header>
    <el-main>

      <el-table
              :data="tableData"
              stripe
              :span-method="objectSpanMethod"
              style="width: 100%">
        <el-table-column
                prop="departmentName"
                label="部门"
        >
        </el-table-column>
        <el-table-column
                prop="roleName"
                label="职位名"
        >
        </el-table-column>
        <el-table-column
                prop="rolePeopleCount"
                label="职位人数"
        >
        </el-table-column>
        <el-table-column
                prop="createTime"
                label="创建时间">
        </el-table-column>

        <el-table-column
                label="拥有权限">
          <template slot-scope="scope">
            <el-tag v-for="(per, index) in scope.row.permissions" :key="index">{{per.permissionName}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
                label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="delRole(scope.row)"  size="small">删除</el-button>
            <el-button type="primary" size="small" @click="editRole(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>


      <el-dialog title="职位信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form ref="roleInfo" :model="roleInfo" label-position="top">
          <el-form-item label="职位名称">
            <el-input v-model="roleInfo.roleName"></el-input>
          </el-form-item>

          <el-form-item label="所属部门">
            <el-select v-model="roleInfo.departmentName" placeholder="请选择所属部门">
              <el-option :value="dep.departmentName" v-for="dep in departmentList" :key="dep.departmentId"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="拥有权限">
            <el-checkbox-group v-model="permissionNames">
              <el-checkbox v-for="(per,index) in permissionListCheckBox" :label="per.permissionName" :disabled="per.disable" :key="index"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item>
<!--            <el-button type="primary" @click="onSubmit">立即创建</el-button>-->
<!--            <el-button @click="exitEdit">退出</el-button>-->
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitRole">{{dialogBtnName}}</el-button>
        </div>
      </el-dialog>

    </el-main>
    <el-footer style="text-align: center">
      <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="conditionSearchRoleReq.currentPage"
              :page-sizes="[5, 7, 9]"
              :page-size="conditionSearchRoleReq.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>

import {mapGetters} from 'vuex'

import {getRoleInfoByPageAndConditionApi, updateRoleApi, addRoleApi, delRoleApi} from '@/api/role'

import {getEmpPermissionS} from "../../api/permission";

import {getAllDepartmentApi} from "@/api/department";


export default {
  name: "RoleManage",

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
    this.initRoleForm();
    this.getRoleInfoByPageAndCondition()
  },

  data(){
    return {

      // select部门列表
      departmentList: [],
      // checkbox 权限列表
      permissionListCheckBox: [],
      // 选择的 permission name
      permissionNames: [],

      // 部门信息，部门名对 id 的映射
      departmentName2Id: {},
      // 权限信息，权限信息对 id 的映射
      permissionName2Id: {},

      dialogFormVisible: false,
      isAdd: true,
      // 合并行需要使用的中间数组
      spanArr: [],
      pos:0,

      loading: false,

      total: 0,
      tableData: [],

      roleInfo: {
        companyId: 0,
        departmentId: 0,
        roleId: 0,
        roleName: "",
        departmentName: "",
        rolePeopleCount: 0,
        permissions: [],
        createTime: ""
      },


      conditionSearchRoleReq: {
        currentPage: 1,
        pageSize: 5,
        roleName: "",
        companyId: this.getCompanyId
      },

    }
  },

  methods: {

    // 获取 部门的 select 数据
    getDepartmentSelect(){
      const _this = this;
      _this.departmentList = []
      _this.departmentName2Id = {}
      getAllDepartmentApi(_this.getCompanyId).then(res=>{
        console.log("111")
        for (let i = 0; i < res.data.data.length; ++i){
          _this.departmentList.push({
            "companyId": res.data.data[i].companyId,
            "departmentId": res.data.data[i].departmentId,
            "departmentName": res.data.data[i].departmentName
          })
          _this.departmentName2Id[res.data.data[i].departmentName] = res.data.data[i].departmentId
        }
      })
    },

    // 获取 权限的 checkbox 数据
    getPermissionCheckBox(){
      // const _this = this;
      this.permissionListCheckBox = []
      this.permissionName2Id = {}
      getEmpPermissionS().then(res => {
        for (let i = 0; i < res.data.data.length; ++i) {
          this.permissionListCheckBox.push({
            permissionId: res.data.data[i].permissionId,
            permissionName: res.data.data[i].permissionName,
            disable: res.data.data[i].defaultMust === 1,
          })
          if (res.data.data[i].defaultMust === 1)
            this.permissionNames.push(res.data.data[i].permissionName)
          this.permissionName2Id[res.data.data[i].permissionName] = res.data.data[i].permissionId
        }
        })
    },

    getSpanArr() {
      this.spanArr = []
      this.pos = 0
      for (let i = 0; i < this.tableData.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (this.tableData[i].departmentName === this.tableData[i - 1].departmentName) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },

    objectSpanMethod({rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },

    handleSizeChange(val) {
      this.conditionSearchRoleReq.pageSize = val
      this.getRoleInfoByPageAndCondition()
    },

    handleCurrentChange(val) {
      this.conditionSearchRoleReq.currentPage = val
      this.getRoleInfoByPageAndCondition()
    },

    // 删除角色
    delRole(row) {
      const _this = this;
      this.$confirm('是否确定删除此职位信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRoleApi(row.roleId).then(() => {
          _this.$message({
            type: 'success',
            message: '删除成功!'
          });
          _this.getRoleInfoByPageAndCondition()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 提交修改或新增
    submitRole(){
      this.dialogFormVisible = false
      const _this = this

      // 获取 部门 id
      const departmentId = this.departmentName2Id[this.roleInfo.departmentName]
      // 获取 权限 id
      const permissionIds = new Set(this.permissionNames.map((item)=>{
        return this.permissionName2Id[item]
      }))
      if (this.isAdd){
        addRoleApi({
          roleName: _this.roleInfo.roleName,
          companyId: _this.roleInfo.companyId,
          departmentId: departmentId,
          permissionIds: Array.from(permissionIds)
        }).then(()=>{
          _this.$message({
            message: '新增成功',
            type: 'success'
          });
          _this.getRoleInfoByPageAndCondition()
        })
      } else {
        updateRoleApi({
          roleId: _this.roleInfo.roleId,
          roleName: _this.roleInfo.roleName,
          companyId: _this.roleInfo.companyId,
          departmentId: departmentId,
          permissionIds: Array.from(permissionIds)
        }).then(()=>{
          _this.$message({
            message: "修改成功",
            type: "success"
          })
          _this.getRoleInfoByPageAndCondition()
        })
      }
    },

    // 编辑角色
    editRole(row){
      this.dialogFormVisible = true
      this.isAdd = false
      this.getPermissionCheckBox()
      this.getDepartmentSelect()
      this.roleInfo = row
      this.permissionNames = []
      for (let i = 0; i < this.roleInfo.permissions.length; ++i)
        this.permissionNames.push(this.roleInfo.permissions[i].permissionName)

    },

    // 新增角色
    addRole(){
      this.dialogFormVisible = true
      this.permissionNames = []
      // 获取权限的 checkbox
      this.getPermissionCheckBox()
      // 获取部门的 select
      this.getDepartmentSelect()
      // 初始化表单
      this.initRoleForm()
    },

    // 分页条件查询
    getRoleInfoByPageAndCondition() {
      const _this = this;
      _this.loading = true
      _this.conditionSearchRoleReq.companyId = _this.getCompanyId
      getRoleInfoByPageAndConditionApi(_this.conditionSearchRoleReq).then(res => {
        _this.total = res.data.data.total;
        _this.tableData = res.data.data.records;
        _this.tableData.sort((a, b) => {
          if (a.departmentId === b.departmentId)
            return a.roleId > b.roleId ? 1:-1;
          return a.departmentId > b.departmentId ? 1:-1;
        })
        _this.getSpanArr()
      })
      _this.loading = false
    },

    exitEditRole(){
      this.$confirm('是否确定退出编辑状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogFormVisible = false
        this.initRoleForm()
      })
    },

    initRoleForm(){
      this.isAdd = true
      this.roleInfo = {
        roleName: "",
        companyId: this.getCompanyId,
        departmentName: "",
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
}

.el-main {
  color: #333;
}

body > .el-container {
  padding: 0;
  margin: 0;
}
</style>
