<template>
  <el-container>
    <el-header>
      <el-form :inline="true" :model="conditionSearchAnnoReq" class="demo-form-inline">

        <el-form-item label="关键词" >
          <el-input v-model="conditionSearchAnnoReq.key" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="getAnnoInfoByPageAndCondition">查询</el-button>
        </el-form-item>

        <el-button type="warning" @click="toAddAnno">新增公告</el-button>
      </el-form>
    </el-header>

    <el-main>
      <el-table
              :data="tableData"
              border
              style="width: 100%">

        <el-table-column
                prop="companyName"
                label="公司">
        </el-table-column>


        <el-table-column
                prop="title"
                label="标题">
        </el-table-column>

        <el-table-column
          label="内容">
          <template slot-scope="scope">
            {{scope.row.content.substring(0, 20)}}...
          </template>

        </el-table-column>

        <el-table-column
                width="130"
                label="发布日期">
          <template slot-scope="scope">
            {{new Date(parseInt(scope.row.createTime)).toLocaleDateString().replace(/\//g, "-")}}
          </template>
        </el-table-column>


        <el-table-column
                label="操作"
                >
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="deleAnno(scope.row)">删除</el-button>
            <el-button type="primary" size="small" @click="showAnno(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>


    </el-main>
    <el-footer>
      <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="conditionSearchAnnoReq.currentPage"
              :page-sizes="[5, 7, 9]"
              :page-size="conditionSearchAnnoReq.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>

import {searchAnnouncementApi, deleteAnnouncementApi} from "../../api/announcement";

export default {
  name: "AnnouncementManage",

  mounted() {
    this.conditionSearchAnnoReq.companyId = this.getCompanyId
    this.conditionSearchAnnoReq.companyId = this.getCompanyId
    this.getAnnoInfoByPageAndCondition()
  },

  computed: {

    getCompanyId(){
      return this.$store.getters["user/getCompanyId"]
    }
  },

  data(){
    return {
      loading:false,
      conditionSearchAnnoReq:{
        currentPage: 1,
        pageSize: 5,
        companyId: this.getCompanyId,
        key: ""
      },
      tableData: [],
      total: 0
    }
  },

  methods: {

    getAnnoInfoByPageAndCondition(){
      console.log("annoReq = ", this.conditionSearchAnnoReq)
      searchAnnouncementApi(this.conditionSearchAnnoReq).then(res =>{
        console.log("res = ", res)
        this.total = res.data.data.total
        this.tableData = res.data.data.records
      })
    },

    handleSizeChange(val) {
      this.conditionSearchAnnoReq.pageSize = val
      this.getAnnoInfoByPageAndCondition()
    },
    handleCurrentChange(val) {
      this.conditionSearchAnnoReq.currentPage = val
      this.getAnnoInfoByPageAndCondition()
    },

    showAnno(row){
      this.$router.push("/empa/am/" + row.announcementId)
    },

    toAddAnno(){
      this.$router.push("/empa/am/add")
    },

    deleAnno(row){
      const _this = this;
      this.$confirm('是否确定删除此公告?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAnnouncementApi(row.announcementId).then(() => {
          _this.$message({
            type: 'success',
            message: '删除成功!'
          });
          _this.getAnnoInfoByPageAndCondition()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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
