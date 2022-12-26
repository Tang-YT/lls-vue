<template>
  <el-container>
    <el-header>
      <el-form :inline="true" :model="conditionSearchAnnoReq" class="demo-form-inline">

        <el-form-item label="关键词" clearable>
          <el-input v-model="conditionSearchAnnoReq.key" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="getAnnoInfoByPageAndCondition">查询</el-button>
        </el-form-item>
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

import {searchAnnouncementApi} from "../../api/announcement";

export default {
  name: "AnnouncementList",

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
      this.$router.push("/canno/am/" + row.announcementId)
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
