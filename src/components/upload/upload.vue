<template>
  <div>

    <el-upload
            :action="uploadAction"
            :data="policyData"
            list-type="picture-card"
            :before-upload="beforeUpload"
            :on-success="handleUploadSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :on-exceed="onExceed"
            :multiple="false"
            :limit="limit">
      <i class="el-icon-plus"></i>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>

</template>

<script>

import {getOSSPolicy} from "@/api/common"
import {getUUID} from "@/utils/common";

export default {

  name: "llsUpload",


  created() {
    this.fileList = this.initFileList.filter(item=> item.url.trim() !== "")
    for (let i = 0; i < this.fileList.length; ++i)
      this.urlList.push(this.fileList.url)
  },

  props: {
    // 上传限制数量
    limit: {
      type: Number,
      default: 1
    },
    // 获取 fileList 的回调函数
    getFileUrlsCallFunc:{
      type: Function,
      required: true
    },
    /*
     上传至 oss 的模式
      请求 url 为：common/oss/policy/{model}
           * model = 0: 存放公司 logo
           * model = 1: 存放公司营业执照
           * model = 2: 存放员工身份证
           * model = 3: 存放员工图片(大头照)
     */
    ossModel: {
      type: Number,
      required: true
    },
    // 初始化的文件列表
    initFileList: {
      type: Array
    }
  },

  data(){
    return {
      uploadAction: "http://tang-yt-bucket.oss-cn-chengdu.aliyuncs.com",
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      // 已上传的图片 url 列表
      urlList: [],
      policyData: {
        policy: '',
        Signature: '',
        key: '',
        OSSAccessKeyId: '',
        dir: '',
        host: '',
        success_action_status: 200
      },
    }
  },

  methods: {

    // 将 urlList 传给父组件
    sendFileUrls(){
      this.getFileUrlsCallFunc(this.urlList.join(" ").trim())
    },

    // 超出文件上传个数的钩子函数
    onExceed(){
      this.$message({
        message: '文件上传数量已达上限',
        type: 'error'
      });
    },

    // 移除图片的钩子函数
    handleRemove(file, fileList) {
      this.fileList = fileList
    },

    // 查看图片的钩子函数
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 文件上传前的钩子函数，首先获取签名
    beforeUpload(file){
      const _this = this
      return new Promise((resolve, reject) => {
        getOSSPolicy(_this.ossModel).then(res => {
          _this.policyData.policy = res.data.data.policy
          _this.policyData.Signature = res.data.data.signature
          _this.policyData.OSSAccessKeyId = res.data.data.accessId
          _this.policyData.key = res.data.data.dir + '/'+ getUUID() + '.' + file.name.split(".").pop()
          // 文件 url
          _this.urlList.push(_this.uploadAction + "/" +  _this.policyData.key)
          resolve(true)
        }).catch(() => {
          reject(false)
        })
      })
    },

    handleUploadSuccess(res, file, fileList) {
      this.fileList = fileList
      // console.log("this.fileList = ", this.fileList)
      this.sendFileUrls()
    }

  }
}
</script>

<style scoped>

</style>
