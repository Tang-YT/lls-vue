<template>
  <el-container>

    <el-header>

    </el-header>
    <el-main>

      <el-table
              :data="tableData"
              border
              style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div style="background-color: #a8c2db; width: 100%; height: 300px; padding: 20px; border-radius: 30px">
              <el-descriptions class="margin-top" title="个人薪资报告" :column="3"  border>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    姓名
                  </template>
                  {{scope.row.employeeName}}
                </el-descriptions-item>

                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    手机号
                  </template>
                  {{scope.row.employeeTel}}
                </el-descriptions-item>

                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-tickets"></i>
                    部门
                  </template>
                  <el-tag size="small">{{scope.row.departmentName}}</el-tag>
                </el-descriptions-item>

                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-office-building"></i>
                    基本工资
                  </template>
                  <el-tag size="small">{{scope.row.baseWage}}</el-tag>
                </el-descriptions-item>

                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    津贴
                  </template>
                  <el-tag size="small" type="success">{{scope.row.allowance}}</el-tag>
                </el-descriptions-item>

                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    罚款
                  </template>
                  <el-tag size="small" type="danger">{{scope.row.penalty}}</el-tag>
                </el-descriptions-item>

                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    总工资
                  </template>
                  <el-tag size="small" type="warning"> {{scope.row.baseWage + scope.row.allowance - scope.row.penalty}}</el-tag>
                </el-descriptions-item>


                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    津贴说明
                  </template>
                  {{scope.row.allowanceReason}}
                </el-descriptions-item>

                <el-descriptions-item >
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    罚款说明
                  </template>
                  {{scope.row.penaltyReason}}
                </el-descriptions-item>

                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    起始日期
                  </template>
                  {{new Date(parseInt(scope.row.startTime)).toLocaleDateString().replace(/\//g, "-")}}
                </el-descriptions-item>

                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    结束日期
                  </template>
                  {{new Date(parseInt(scope.row.endTime)).toLocaleDateString().replace(/\//g, "-")}}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </template>
        </el-table-column>

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

      </el-table>
    </el-main>
    <el-footer style="text-align: center">
      <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="wageReq.currentPage"
              :page-sizes="[5, 7, 9]"
              :page-size="wageReq.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>

import { getWageByUserIdApi} from "@/api/wage";

export default {
  /*
  此页面作为个人信息的详情页面、编辑页面以及新增页面
   */
  name: "PersonWage",

  computed: {

    getCompanyId(){
      return this.$store.getters["user/getCompanyId"]
    },

    getUserId(){
      return this.$store.getters["user/getUserId"]
    },
  },

  created() {

    this.getWageByUserId()
  },

  data(){

    return {
      total: 0,
      tableData: [],
      wageReq: {
        currentPage: 1,
        pageSize: 5,
        userId: this.getUserId
      }

    }
  },
  methods: {


    getWageByUserId(){
      this.wageReq.userId = this.getUserId
      console.log("wageReq = ", this.wageReq)
      getWageByUserIdApi(this.wageReq).then(res =>{
        this.total = res.data.data.total
        this.tableData = res.data.data.records
        console.log("wage reco = ", this.tableData)
      })
    },

    handleSizeChange(val) {
      this.wageReq.pageSize = val
      this.getWageByUserId()
    },
    handleCurrentChange(val) {
      this.wageReq.currentPage = val
      this.getWageByUserId()
    },



    exitEdit() {
      this.$router.replace("/empw/wm")
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
