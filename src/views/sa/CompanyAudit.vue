<template>
  <el-container>
    <el-header>

      <el-form :inline="true" :model="conditionSearchCompanyReq" class="demo-form-inline">
        <el-form-item label="公司名">
          <el-input clearable v-model="conditionSearchCompanyReq.companyName" placeholder="模糊查询"></el-input>
        </el-form-item>

        <el-form-item label="公司状态">
          <el-select filterable clearable   v-model="conditionSearchCompanyReq.companyStatus" placeholder="请选择公司状态">
            <el-option :value="0" label="待审核"></el-option>
            <el-option :value="1" label="拒绝"></el-option>
            <el-option :value="2" label="活动"></el-option>
            <el-option :value="3" label="封禁"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="btnSearch" :loading="loading">查询</el-button>
        </el-form-item>
      </el-form>

    </el-header>
    <el-main>

      <el-dialog title="附加信息" :visible.sync="dialogFormVisible">
        <el-form :model="messageForm" ref="messageForm" :rules="rules">
          <el-form-item label="操作原因" >
            <el-input v-model="messageForm.message" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="auditCompany(companyId, behavior, 2)">确 定</el-button>
        </div>
      </el-dialog>

      <el-table
              :data="tableData"
              stripe
              style="width: 100%">

        <el-table-column type="expand">
          <template slot-scope="scope">
            <div style="background-color: #a8c2db; width: 100%; height: 600px; padding: 20px; border-radius: 30px">
              <el-descriptions class="margin-top" title="公司基本信息" :column="3" size="medium" border style="width: 1000px; margin: auto">
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-office-building"></i>
                    公司名称
                  </template>
                  {{scope.row.companyName}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-view"></i>
                    公司状态
                  </template>
                  <el-tag :type="statusConvert(scope.row.companyStatus, 1)" >{{statusConvert(scope.row.companyStatus, 2)}}</el-tag>
                </el-descriptions-item>

                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-place"></i>
                    所在地区
                  </template>
                  {{scope.row.province + " / " + scope.row.city + " / " + scope.row.district}}
                </el-descriptions-item>

                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-phone-outline"></i>
                    联系电话
                  </template>
                  {{scope.row.contactTel}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-s-comment"></i>
                    联系邮箱
                  </template>
                  {{scope.row.contactEmail}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-map-location"></i>
                    详细地址
                  </template>
                  {{scope.row.address}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-s-flag"></i>
                    LOGO
                  </template>
                  <el-image
                          style="width: 100px; height: 100px"
                          :src="scope.row.logoImage"
                  ></el-image>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-s-check"></i>
                    营业执照
                  </template>
                  <el-image
                          style="width: 100px; height: 100px"
                          :src="scope.row.licenseImage"
                  ></el-image>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-date"></i>
                    注册时间
                  </template>
                  {{new Date(parseInt(scope.row.createTime)).toLocaleDateString().replace(/\//g, "-")}}
                </el-descriptions-item>
              </el-descriptions>
              <br>
              <el-descriptions class="margin-top" title="公司法人信息" :column="2" size="medium" border style="width: 1000px; margin: auto">
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user-solid"></i>
                    法人姓名
                  </template>
                  {{scope.row.juridicalPersonName}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-male"></i>
                    法人性别
                  </template>
                  <el-tag :type="scope.row.juridicalPersonGender === 1 ? 'success' : 'danger'" effect="dark">
                    {{scope.row.juridicalPersonGender === 1 ? '男' : '女'}}
                  </el-tag>
                </el-descriptions-item>

                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-place"></i>
                    联系电话
                  </template>
                  {{scope.row.juridicalPersonTel}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-s-comment"></i>
                    联系邮箱
                  </template>
                  {{scope.row.juridicalPersonEmail}}
                </el-descriptions-item>
              </el-descriptions>
              <br>
              <el-descriptions class="margin-top" title="公司法定代表信息" :column="2" size="medium" border style="width: 1000px; margin: auto">
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user-solid"></i>
                    代表姓名
                  </template>
                  {{scope.row.representativeName}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-male"></i>
                    代表性别
                  </template>
                  <el-tag :type="scope.row.representativeGender === 1 ? 'success' : 'danger'" effect="dark">
                    {{scope.row.representativeGender === 1 ? '男' : '女'}}
                  </el-tag>
                </el-descriptions-item>

                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-place"></i>
                    联系电话
                  </template>
                  {{scope.row.representativeTel}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-s-comment"></i>
                    联系邮箱
                  </template>
                  {{scope.row.representativeEmail}}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </template>
        </el-table-column>

        <el-table-column
                prop="companyName"
                label="公司名称"
        >
        </el-table-column>

        <el-table-column
                label="LOGO">
          <template slot-scope="scope">
            <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.logoImage"
            ></el-image>
          </template>
        </el-table-column>

        <el-table-column
                label="公司状态">
          <template slot-scope="scope">
            <el-tag :type="statusConvert(scope.row.companyStatus, 1)" >{{statusConvert(scope.row.companyStatus, 2)}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
                prop="address"
                label="地址"
        >
        </el-table-column>


        <el-table-column
                prop="contactEmail"
                label="联系邮箱">
        </el-table-column>

        <el-table-column
                label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="auditCompany(scope.row.companyId, 1, 1)"  size="small" v-show="scope.row.companyStatus === 0">拒绝注册</el-button>
            <el-button type="success" @click="auditCompany(scope.row.companyId, 2, 1)"  size="small" v-show="scope.row.companyStatus <= 1 ">同意注册</el-button>
            <el-button type="info" @click="auditCompany(scope.row.companyId, 3, 1)"  size="small" v-show="scope.row.companyStatus === 2">封禁</el-button>
            <el-button type="warning" @click="auditCompany(scope.row.companyId, 4, 1)"  size="small" v-show="scope.row.companyStatus === 3">解封</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="conditionSearchCompanyReq.currentPage"
              :page-sizes="[5, 7, 9]"
              :page-size="conditionSearchCompanyReq.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>

import {mapGetters} from 'vuex'

import {getCompanyInfoByPageAndConditionApi, auditCompanyApi} from '../../api/audit'

export default {
  name: "CompanyAudit",

  computed: {
    ...mapGetters(['getToken', 'getCompanyId']),
  },

  mounted() {
    this.getCompanyInfoByPageAndCondition()
  },

  data(){
    return {

      companyId: 0,
      behavior: 0,

      messageForm: {
        message: ""
      },

      rules: {
        message: [
          {required: true, message: "请填写附加信息", trigger: 'blur'}
        ]
      },
      dialogFormVisible: false,

      loading: false,
      total: 0,
      tableData: [],
      conditionSearchCompanyReq: {
        currentPage: 1,
        pageSize: 5,
        companyName: "",
        companyStatus: 0
      }
    }
  },

  methods: {


    auditCompany(companyId, behavior, flag){
      if (flag === 1){
        if (behavior === 1 || behavior === 3){
          this.dialogFormVisible = true
          this.companyId = companyId
          this.behavior = behavior
        } else {
          this.auditCompanyReq(companyId, behavior)
        }
      }else {
        this.$refs.messageForm.validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            this.auditCompanyReq(companyId, behavior)
          } else {
            return false;
          }
        })
      }
    },

    auditCompanyReq(companyId, behavior){
      const _this = this
      auditCompanyApi({
        "companyId": companyId,
        "behavior": behavior,
        "message": this.messageForm.message
      }).then(() => {
        _this.$message({
          message: '操作成功',
          type: 'success'
        });
        _this.messageForm.message = ""
        _this.getCompanyInfoByPageAndCondition()
      })
    },


    statusConvert(val, model){
      if (model === 1)
        return val === 0 ? 'warning' : val === 1 ? 'danger' : val === 2 ? 'success' : 'info'
      if (model === 2)
        return val === 0 ? '待审核' : val === 1 ? '拒绝' : val === 2 ? '活动' : '封禁'
    },

    handleSizeChange(val) {
      this.conditionSearchCompanyReq.pageSize = val
      this.getCompanyInfoByPageAndCondition()
    },
    handleCurrentChange(val) {
      this.conditionSearchCompanyReq.currentPage = val
      this.getCompanyInfoByPageAndCondition()
    },

    btnSearch(){
      this.conditionSearchCompanyReq.currentPage = 1
      this.getCompanyInfoByPageAndCondition()
    },

    // 条件分页查询部门信息
    getCompanyInfoByPageAndCondition() {
      const _this = this;
      _this.loading = true
      getCompanyInfoByPageAndConditionApi(_this.conditionSearchCompanyReq).then(res => {
        console.log("res = ", res)
        _this.total = res.data.data.total;
        _this.tableData = res.data.data.records;
      })
      _this.loading = false
    },
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
  text-align: center;
}

body > .el-container {
  padding: 0;
  margin: 0;
}
</style>
