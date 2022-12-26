<template>


  <el-card class="box-card">

    <div slot="header" class="clearfix " style="text-align: center; line-height: 10px; margin-top: 20px">
      <span class="my-card-text">{{annoInfo.title}}</span>
        <p style="float: right; margin-top: 11px">{{new Date(parseInt(annoInfo.createTime)).toLocaleDateString().replace(/\//g, "-")}}</p>
        <el-tag style="float: right; margin-right: 30px">{{annoInfo.companyName}}</el-tag>
    </div>

    <div class="markdown-body" style="margin-top: 30px" v-html="ht"></div>

  </el-card>
</template>

<script>

import {getAnnouncementByIdApi} from "../../api/announcement";

export default {
  /*
  此页面作为个人信息的详情页面、编辑页面以及新增页面
   */
  name: "AnnouncementSingle",
  created() {
    this.uoa = this.$route.params.uoa;
    // 如果是编辑状态，首先根据 userId 获取详细信息
    if (!isNaN(this.uoa) && this.uoa > 0){
      getAnnouncementByIdApi(this.uoa).then(res => {
        this.annoInfo = res.data.data
        console.log("anInfo = ", this.annoInfo)
        this.getHtml()
      })
    }
  },


  data(){

    return {
      annoInfo: {},
      ht: ""
    }
  },
  methods: {

    getHtml(){
      /**
       * 将markdown的文本转为正常文本
       * */
              //拿到markdown渲染资源对象
      var markDownIT = require("markdown-it")
      var md = new markDownIT()   //获取到markdown-it的对象
      this.ht = md.render(this.annoInfo.content)    //将markdown文本渲染成html文本
    },

    exitEdit() {
      this.$router.replace("/empa/am")
    },
  }
}
</script>



<style scoped>

.my-el-input{
  width: 220px;
}

.box-card {
  /*border-radius: 30px;*/
  width: 99%;
  margin: 10px auto;
  height: auto;
}

.my-card-text{
  font-size: 22px;
  font-weight: bold;
  color: #a94442;
}
</style>
