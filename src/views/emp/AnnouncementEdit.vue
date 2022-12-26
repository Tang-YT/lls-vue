<template>
  <el-container>
    <el-header>
      <div style="height:60px; width: 100%; background-color: #033f58; margin: auto">
        <el-input
                placeholder="公告标题"
                style="margin-top: 10px; margin-left: 1%; width: 98%"
                v-model="announcementEntity.title">
        </el-input>
      </div>

    </el-header>

    <el-main style="text-align: center">
      <mavon-editor v-model="announcementEntity.content" style="height: 550px; width: 100%; margin: auto"></mavon-editor>
    </el-main>
    <el-footer style="text-align: center">

      <div style="height:100px; width: 100%; background-color: #fbfbfb; margin: auto">
        <el-button type="primary" @click="saveAnno" style="margin-top: 30px;">发布公告</el-button>
      </div>

    </el-footer>
  </el-container>


</template>

<script>

import {saveAnnouncementApi} from "../../api/announcement";

export default {
  /*
  此页面作为个人信息的详情页面、编辑页面以及新增页面
   */
  name: "AnnouncementEdit",

  computed: {
    getCompanyId(){
      return this.$store.getters["user/getCompanyId"]
    },

    getUserId(){
      return this.$store.getters["user/getUserId"]
    },

  },

  data(){

    return {
      content: "",
      ht: "",

      announcementEntity: {
        companyId: this.getCompanyId,
        title: "",
        content: "",
        userId: this.getUserId,
        announcementStatus: 2
      }

    }
  },
  methods: {

    saveAnno(){
      if (this.verifyInp()){
        this.announcementEntity.companyId = this.getCompanyId
        this.announcementEntity.userId = this.userId
        console.log("cId = ", this.getCompanyId)
        console.log("userId = ", this.userId)
        saveAnnouncementApi(this.announcementEntity).then(()=>{
          this.$message({
            message: "发布成功",
            type: "success"
          })
          this.$router.push("/empa/am")
        })
      }
    },

    verifyInp(){
      if (this.announcementEntity.content.trim() === ""){
        this.$message({
          message: "请填写公告内容",
          type: "error"
        })
        return false
      }
      if (this.announcementEntity.title.trim() === ""){
        this.$message({
          message: "请填写公告标题",
          type: "error"
        })
        return false
      }
      return true
    },

    getHtml(){

      /**
       * 将markdown的文本转为正常文本
       * */
              //拿到markdown渲染资源对象
      var markDownIT = require("markdown-it")
      var md = new markDownIT()   //获取到markdown-it的对象
      this.ht = md.render(this.content)    //将markdown文本渲染成html文本
    }
  }
}
</script>



<style scoped>

.my-el-input{
  width: 220px;
}

.box-card {
  width: 60%;
  margin: auto;
  height: auto;
}
</style>
