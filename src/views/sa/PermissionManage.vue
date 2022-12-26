<template>
  <el-container>
    <el-header>
      <el-button type="primary" @click="dialogFormVisible = true">新增菜单</el-button>
    </el-header>
    <el-main>

      <el-table
              :data="tableData"
              style="width: 100%;margin-bottom: 20px;"
              row-key="permissionId"
              border
              :tree-props="{children: 'childrenPermissions'}">
<!--        <el-table-column-->
<!--                prop="permissionId"-->
<!--                label="编号"-->
<!--        >-->
<!--        </el-table-column>-->


        <el-table-column
                prop="permissionName"
                label="名称"
        >
        </el-table-column>

        <el-table-column
                prop="apply"
                label="适用角色"
        >
          <template slot-scope="scope">
            <el-tag
                    :type="scope.row.apply === 0 ? 'danger' : scope.row.apply === 1 ? 'primary' : scope.row.apply === 2 ? 'success' : 'warning'"
                    disable-transitions effect="dark">{{getApply(scope.row.apply)}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
                prop="icon"
                label="图标"
        >
          <template slot-scope="scope">
<!--            <i :class="scope.row.icon"></i>-->
            <item :icon="scope.row.icon" />
          </template>
        </el-table-column>

        <el-table-column
                prop="permissionType"
                label="类型"
        >
          <template slot-scope="scope">
            <el-tag
                    :type="scope.row.permissionType === 0 ? 'info' : scope.row.permissionType === 1 ? 'success' : 'warning'"
                    disable-transitions >{{getType(scope.row.permissionType)}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
                prop="url"
                label="菜单url">
        </el-table-column>

<!--        <el-table-column-->
<!--              prop="orderNum"-->
<!--              label="排序">-->
<!--      </el-table-column>-->

        <el-table-column
                prop="redirect"
                label="重定向">
        </el-table-column>

        <el-table-column
                prop="component"
                label="组件">
        </el-table-column>

        <el-table-column
                prop="defaultMust"
                label="必须分配">
          <template slot-scope="scope">
            <el-tag
                    v-show="scope.row.defaultMust === 1" type="success"
                    disable-transitions >是</el-tag>
          </template>
        </el-table-column>

        <el-table-column
                prop="hidden"
                label="是否隐藏">
          <template slot-scope="scope">
            <el-tag
                    v-show="scope.row.hidden === 1" type="danger"
                    disable-transitions >是</el-tag>
          </template>
        </el-table-column>

        <el-table-column
                label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="delPer(scope.row)"  size="small">删除</el-button>
            <el-button type="text" size="small" @click="editPer(scope.row)">编辑</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-dialog title="菜单信息" :visible.sync="dialogFormVisible" width="50%">
        <el-form :model="permissionInfo" label-width="80px" label-position="right">

          <el-form-item label="类型" >
            <el-radio-group v-model="permissionInfo.permissionType" >
              <el-radio :label="0">目录</el-radio>
              <el-radio :label="1">菜单</el-radio>
              <el-radio :label="2">按钮</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="适用角色" >
            <el-radio-group v-model="permissionInfo.apply" @change="getParentPermission">
              <el-radio :label="0" >超级管理员</el-radio>
              <el-radio :label="1" >公司管理员</el-radio>
              <el-radio :label="2" >公司职工</el-radio>
              <el-radio :label="3" >通用</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="父级菜单"  v-show="permissionInfo.permissionType !== 0">
            <el-select filterable  v-model="parentName" placeholder="父级菜单" >
              <el-option :value="par.permissionName" v-for="par in parentMenuList" :key="par.permissionId"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="必须分配" v-show="permissionInfo.apply === 2">
            <el-switch v-model="defaultMust"></el-switch>
          </el-form-item>

          <el-form-item label="是否隐藏" >
            <el-switch v-model="isHidden"></el-switch>
          </el-form-item>

          <el-form-item label="菜单名称" >
            <el-input v-model="permissionInfo.permissionName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="菜单路由" >
            <el-input v-model="permissionInfo.url" autocomplete="off"></el-input>
          </el-form-item>

        <el-form-item label="菜单图标" >
          <el-input v-model="permissionInfo.icon" autocomplete="off"></el-input>
        </el-form-item>

          <el-form-item label="重定向" >
            <el-input v-model="permissionInfo.redirect"  autocomplete="off" ></el-input>
          </el-form-item>

          <el-form-item label="组件" >
            <el-input v-model="permissionInfo.component"  autocomplete="off" ></el-input>
          </el-form-item>

          <el-form-item label="排序" >
            <el-input-number v-model="permissionInfo.orderNum"  :min="1" :max="100" ></el-input-number>
          </el-form-item>




        <el-form-item>
            <el-button plain @click="exitEdit" type="danger">取 消</el-button>
            <el-button type="primary" @click="submitPerInfo">{{ isAdd ? '新增' : '修改' }}</el-button>
        </el-form-item>
        </el-form>
      </el-dialog>


    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>

<script>

import {getPermissionS, delPermission, addPermission, updatePermission, getParentPermissionSApi} from '@/api/permission'

import Item from "../layout/components/Sidebar/Item"

export default {
  name: "PermissionManage",

  components: {Item},


  created() {
    this.getPermissionInfo()
    this.getParentPermission()
    this.initPermissionInfo()
  },

  data(){
    return {
      dialogFormVisible: false,

      defaultMust: false,

      isHidden: false,

      loading: false,

      total: 0,
      tableData: [],

      parentMenuList: [],

      parentName: "",
      parentName2Id: {},

      permissionInfo: {
        apply: null,
        childrenPermissions: [],
        icon: "",
        orderNum: 1,
        parentId: null,
        redirect: "",
        permissionName: "",
        permissionType: null,
        url: "",
        component: ""
      },

      isAdd: true

    }
  },

  methods: {

    getParentPermission(){
      this.parentMenuList = []
      this.parentName = ""
      if (this.permissionInfo.permissionType >= 1) {
        getParentPermissionSApi(this.permissionInfo.apply).then(res => {
          for (let i = 0; i < res.data.data.length; ++i) {
            this.parentMenuList.push({
              "permissionId": res.data.data[i].permissionId,
              "permissionName": res.data.data[i].permissionName
            })
            this.parentName2Id[res.data.data[i].permissionName] = res.data.data[i].permissionId
          }
          console.log("res = ", res.data.data )
          console.log("menuLi = ", this.parentMenuList)
        })
      }
    },

    submitPerInfo(){
      const _this = this;

      if (this.parentName !== "")
        this.permissionInfo.parentId = this.parentName2Id[this.parentName]
      if (_this.permissionInfo.apply !== 2)
        this.defaultMust = false
      if (this.isAdd){
        addPermission({
          apply: _this.permissionInfo.apply,
          parentId: _this.permissionInfo.parentId,
          icon: _this.permissionInfo.icon,
          orderNum: _this.permissionInfo.orderNum,
          permissionName: _this.permissionInfo.permissionName,
          permissionType: _this.permissionInfo.permissionType,
          url: _this.permissionInfo.url,
          component: _this.permissionInfo.component,
          redirect: _this.permissionInfo.redirect,
          defaultMust: _this.defaultMust ? 1 : 0,
          hidden: _this.isHidden ? 1 : 0
        }).then(()=>{
          _this.$message({
            message: '新增成功',
            type: 'success'
          });
          _this.initPermissionInfo()
          _this.getPermissionInfo()
          _this.dialogFormVisible = false
        })
      }else {
        updatePermission({
          parentId: _this.permissionInfo.parentId,
          component: _this.permissionInfo.component,
          redirect: _this.permissionInfo.redirect,
          permissionId: _this.permissionInfo.permissionId,
          apply: _this.permissionInfo.apply,
          icon: _this.permissionInfo.icon,
          orderNum: _this.permissionInfo.orderNum,
          permissionName: _this.permissionInfo.permissionName,
          permissionType: _this.permissionInfo.permissionType,
          url: _this.permissionInfo.url,
          defaultMust: _this.defaultMust ? 1 : 0,
          hidden: _this.isHidden ? 1 : 0
        }).then(()=>{
          _this.$message({
            message: '修改成功',
            type: 'success'
          });
          _this.initPermissionInfo()
          _this.getPermissionInfo()
          _this.dialogFormVisible = false
        })
      }

    },

    initPermissionInfo(){
      this.isAdd = true
      this.permissionInfo = {
        apply: null,
        childrenPermissions: [],
        icon: "",
        orderNum: 1,
        parentId: null,
        redirect: "",
        permissionName: "",
        permissionType: null,
        url: "",
        component: ""
      }
      this.parentName = ""
      this.defaultMust = false
    },

    getApply(apply){
      return apply === 0 ? '超级管理员' : apply === 1 ? '公司管理员' : apply === 2 ? '公司职工' : '通用'
    },

    getType(pType){
      return pType === 0 ? '目录' : pType === 1 ? '菜单' : '按钮'
    },

    delPer(row) {
      const _this = this;
      this.$confirm('是否确定删除此权限信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delPermission(row.permissionId).then(() => {
          _this.$message({
            type: 'success',
            message: '删除成功!'
          });
          _this.getPermissionInfo()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    getPermissionInfo() {
      const _this = this;
      getPermissionS().then(res => {
        console.log("res = ", res )
        _this.tableData = res.data.data;
      })
    },

    editPer(row){
      // console.log("row = ", row)
      this.permissionInfo = row
      this.dialogFormVisible = true
      this.isAdd = false
      this.defaultMust = this.permissionInfo.defaultMust === 1
      this.isHidden = this.permissionInfo.hidden === 1
    },

    exitEdit() {
      this.dialogFormVisible = false
      this.initPermissionInfo()
      this.isAdd = true
    }
  }

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
}

body > .el-container {
  padding: 0;
  margin: 0;
}
</style>
