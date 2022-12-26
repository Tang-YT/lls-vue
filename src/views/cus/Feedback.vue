<template>
  <div>

    <el-container >
      <el-header style="background-color: #033f58; text-align: center; height: 80px;">
        <div style="float: left; margin-top: 13px; margin-left: 150px">
          <img src="../../assets/images/logo2.png" alt="1" class="header-logo" />
        </div>
        <div style="float: left; margin-left: 20px; margin-top: 7px">
          <h1 style="text-align: center;line-height: 60px;margin:0; color: #ffffff">六六顺人事管理系统</h1>
        </div>
        <div style="float: right; margin-right: 50px; margin-top: 7px">
          <div style="float: left; ">
            <a  class="my_a" style="margin-top: 20px; color: #ffffff" @click="pageTo('/')"><h3>首页</h3></a>
          </div>
          <div style="float: left; margin-left: 30px">
            <el-dropdown>
            <span class="el-dropdown-link" style=" color: #ffffff">
              关于我们
            </span>
              <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
                <el-dropdown-item><a href="#my-footer" class="dr-a" style="color: #033f58">联系我们</a></el-dropdown-item>
                <el-dropdown-item><a @click="pageTo('/feedback')" target="_blank" class="dr-a" style=" color: #033f58">在线反馈</a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>

      <el-main style="background-color: #ffffff; padding: 0">
        <div>
          <div class="met-banner-ny vertical-align text-center" style="height:150px; width: 100%; background-color:#044a67;">
            <h1 class="vertical-align-middle">
              六六顺人事管理系统——在线反馈
            </h1>
          </div>
          <section class="met-feedback animsition" style="height: 500px">
            <div class="container">
              <div class="row">
                <div class="met-feedback-body">
                  <form action="/plus/diy.php" enctype="multipart/form-data" method="post">
                    <input type="hidden" name="action" value="post" />
                    <input type="hidden" name="diyid" value="1" />
                    <input type="hidden" name="do" value="2" />
                    <div class="form-group">
                      <div>
                        <input name='name' class='form-control' type='text' placeholder='姓名 '
                               autocomplete='off' data-fv-notempty="true" data-fv-message="不能为空" />
                      </div>
                    </div>
                    <div class="form-group">
                      <div>
                        <input name='email' class='form-control' type='text' placeholder='Email '
                               autocomplete='off' data-fv-notempty="true" data-fv-message="不能为空" />
                      </div>
                    </div>
                    <div class="form-group">
                      <div>
                        <input name='tel' class='form-control' type='text' placeholder='联系电话 '
                               autocomplete='off' />
                      </div>
                    </div>
                    <div class="form-group">
                      <div>
                                    <textarea name='ms' class='form-control' data-fv-notempty="true" data-fv-message="不能为空"
                                              placeholder='信息描述 ' rows='5'>
                                    </textarea>
                      </div>
                    </div>
                    <input type="hidden" name="dede_fields" value="name,text;zw,text;email,text;tel,text;mc,text;dz,text;ms,text"
                    />
                    <input type="hidden" name="dede_fieldshash" value="7ee5d2be00ad1fc8781c7ed0178d1e69"
                    />
                    <div class="form-group margin-bottom-0">
                      <button type="submit" class="btn btn-primary btn-lg btn-block btn-squared">
                        提交
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </el-main>

      <el-footer class="footer" style="background-color: #033f58; height: 580px; margin-top: 0">
        <div id="my-footer" style="background-color: #033f58; width: 100%; height: 550px; margin: 0; padding: 0">
          <div style="float: top;  height: 450px; background-color: #E4E7ED; border-radius: 20px; margin: 20px">
            <div style="float: left;  width: 15%;  margin-left: 100px">
              <img src="../../assets/images/home/pyy.jpg" alt="1" style="width: 259px; height: 390px; margin-top: 25px; border-radius: 50%"/>
            </div>
            <div style="float: left; width: 30%; height: 400px; margin-left: 0; color: #0a0a0a; margin-top: 10px">
              <div style="float: top; margin-top: 7px; margin-left: 30px">
                <h1 style="text-align: left; margin:0;">六六顺人事管理系统</h1>
              </div>
              <div style="float: top;width: 100%; height: 60px; text-align: left; margin-top: 10px">
                <p style="margin-left: 40px"><i class="el-icon-user">&nbsp;&nbsp;tangyitao</i></p>
              </div>
              <div style="float: top; width: 100%; height: 60px; text-align: left; margin-top: 10px">
                <p style="margin-left: 40px"><i class="el-icon-phone-outline">&nbsp;&nbsp;17347981266</i></p>
              </div>
              <div style="float: top;width: 100%; height: 60px; text-align: left; margin-top: 10px">
                <p style="margin-left: 40px"><i class="el-icon-message">&nbsp;&nbsp;T2731695853@outlook.com</i></p>
              </div>
              <div style="float: top;width: 100%; height: 60px;  text-align: left; margin-top: 10px">
                <p style="margin-left: 40px"><i class="el-icon-location-outline">&nbsp;&nbsp;重庆市巴南区重庆理工大学</i></p>
              </div>
              <div style="float: top;width: 100%; height: 60px;  text-align: left; margin-top: 10px">
                <p style="margin-left:40px"><i class="el-icon-s-promotion">&nbsp;&nbsp;tangyt.cn</i></p>
              </div>
            </div>

            <div style="float: left; width: 45%; height: 400px; margin-left: 0; text-align: left; line-height: 50px; margin-top: 20px">
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;多年来，始终秉承开拓创新的精神，终于研发了一套适用于各机关与事业单位的人事管理系统。系统技术新颖，响应快，界面干净美观，以其高品质的特点获得众多单位的一致好评。
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们是一个
                <strong>
                  高素质的技术团队
                </strong>
                ，凝聚了一批行业类年经、有活力的成员。
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;他们在各自的阵地上有着出色的表现以及丰富的实战经验，更具魅力的是他们的创造力和奉献精神。
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们愿意不仅要让客户满意，更要让客户感动，于客户一同成长！
              </p>
              <p>
                <span style="line-height: 1.42857;">
                  <strong>
                  &nbsp;经营理念
                  </strong>
                    ：精益求精 &nbsp;诚信为先 客户至上 优质服务！ &nbsp;
                </span>
              </p>
              <p>
                <span style="line-height: 1.42857;">
                  <strong>
                  &nbsp;发展目标
                  </strong>
                    ：打造中国第一品牌的人事管理系统
                </span>
              </p>
            </div>

          </div>

          <div style="float: top; width: 100%; height: 100px;">
            <hr>
            <lls-footer></lls-footer>
          </div>
        </div>
      </el-footer>
    </el-container>

  </div>
</template>

<script>

import LlsFooter from "../../components/container/LlsFooter";
export default {
  name: "Feedback",
  components: {LlsFooter},
  methods: {
    pageTo(path){
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
/*@import "../../styles/cus.css";*/

.vertical-align {
  font-size: 0
}
.vertical-align:before {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  content: ""
}
.vertical-align-bottom, .vertical-align-middle {
  display: inline-block;
  max-width: 100%;
  font-size: 14px
}
.vertical-align-middle {
  vertical-align: middle
}
.vertical-align-bottom {
  vertical-align: bottom
}

.met-feedback {
  padding: 30px 0;
  background: #f2f2f2
}
.met-feedback .container {
  max-width: 800px
}
@media(max-width:768px) {
  .met-feedback {
    padding: 10px
  }
}.form-group {
   margin-bottom: 20px
 }
.form-control {
  display: block;
  width: 100%;
  height: 36px;
  padding: 6px 15px;
  font-size: 14px;
  line-height: 1.57142857;
  color: #76838f;
  background-color: #fff;
  background-image: none;
  border: 1px solid #e4eaec;
  border-radius: 3px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s
}
.form-control:focus {
  border-color: #62a8ea;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(98,168,234,.6);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(98,168,234,.6)
}
.form-control.focus, .form-control:focus {
  border-color: #62a8ea;
  -webkit-box-shadow: none;
  box-shadow: none
}
.form-control::-moz-placeholder {
  color:#a3afb7;
  opacity:1
}
.form-control:-ms-input-placeholder {
  color:#a3afb7
}
.form-control::-webkit-input-placeholder {
  color:#a3afb7
}
.form-control::-ms-expand {
  background-color:transparent;
  border:0
}
.form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {
  background-color: #f3f7f9;
  opacity: 1
}
.form-control[disabled], fieldset[disabled] .form-control {
  cursor: not-allowed
}
textarea.form-control {
  height: auto
}
.btn {
  display: inline-block;
  padding: 6px 15px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.57142857;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 3px
}
.btn.active.focus, .btn.active:focus, .btn.focus, .btn:active.focus, .btn:active:focus, .btn:focus {
  outline: thin dotted;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px
}
.btn.focus, .btn:focus, .btn:hover {
  color: #76838f;
  text-decoration: none
}
.btn.active, .btn:active {
  background-image: none;
  outline: 0;
  -webkit-box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
  box-shadow: inset 0 3px 5px rgba(0,0,0,.125)
}
.btn.disabled, .btn[disabled], fieldset[disabled] .btn {
  cursor: not-allowed;
  filter: alpha(opacity=65);
  -webkit-box-shadow: none;
  box-shadow: none;
  opacity: .65
}
.btn-primary {
  color: #fff;
  background-color: #62a8ea;
  border-color: #62a8ea
}
.btn-primary.focus, .btn-primary:focus {
  color: #fff;
  background-color: #358fe4;
  border-color: #1869b4
}
.btn-primary:hover {
  color: #fff;
  background-color: #358fe4;
  border-color: #2c8ae3
}
.btn-primary.active, .btn-primary:active, .open>.dropdown-toggle.btn-primary {
  color: #fff;
  background-color: #358fe4;
  border-color: #2c8ae3
}
.btn-primary.active.focus, .btn-primary.active:focus, .btn-primary.active:hover, .btn-primary:active.focus, .btn-primary:active:focus, .btn-primary:active:hover, .open>.dropdown-toggle.btn-primary.focus, .open>.dropdown-toggle.btn-primary:focus, .open>.dropdown-toggle.btn-primary:hover {
  color: #fff;
  background-color: #1d7dd8;
  border-color: #1869b4
}
.btn-primary.active, .btn-primary:active, .open>.dropdown-toggle.btn-primary {
  background-image: none
}
.btn-primary.disabled.focus, .btn-primary.disabled:focus, .btn-primary.disabled:hover, .btn-primary[disabled].focus, .btn-primary[disabled]:focus, .btn-primary[disabled]:hover, fieldset[disabled] .btn-primary.focus, fieldset[disabled] .btn-primary:focus, fieldset[disabled] .btn-primary:hover {
  background-color: #62a8ea;
  border-color: #62a8ea
}
.btn-primary .badge {
  color: #62a8ea;
  background-color: #fff
}
.btn-block {
  display: block;
  width: 100%
}
.btn-block+.btn-block {
  margin-top: 5px
}
input[type=button].btn-block, input[type=reset].btn-block, input[type=submit].btn-block {
  width: 100%
}
input[type=search] {
  -webkit-appearance: none
}
.met-feedback .met-feedback-body {
  background: #fff;
  padding: 30px;
  box-shadow: 0 1px 1px rgba(0,0,0,0.05)
}
@media(max-width:768px) {
  .met-feedback .met-feedback-body {
    padding: 10px
  }
}
.met-banner-ny {
  background-color: #2574a9;
  height: 120px
}
@media(max-width:768px) {
  .met-banner-ny {
    height: 90px
  }
}
.met-banner-ny h1, .met-banner-ny h2 {
  color: #fff;
  font-size: 35px;
  font-weight: 300;
  padding: 10px 30px;
  margin: 0;
  text-shadow: none
}
.met-index-contact p {
  font-size: 1.75em;
  color: #fff;
  display: inline-block;
  margin: 10px 0;
  line-height: 30px;
  padding-right: 50px;
  position: relative;
  top: 5px
}
@media(max-width:767px) {
  .met-index-contact p {
    padding: 0 !important;
    top: 0;
    margin: 5px 0 !important
  }
  .met-index-contact a {
    margin: 5px 0 !important
  }
}
.met-index-contact a {
  font-family: 'Microsoft YaHei', Tahoma, Verdana, 'Simsun';
  font-weight: 500;
  text-transform: uppercase;
  color: #fff;
  display: inline-block;
  background: #044a67;
  position: relative;
  line-height: 40px;
  padding-left: 27px;
  border-radius: 3px;
  padding-right: 9px;
  margin: 10px 0;
  font-size: 14px;
  -webkit-transition: all .3s ease-in-out;
  -o-transition: all .3s ease-in-out;
  transition: all .3s ease-in-out
}
.met-index-contact a i {
  padding-left: 15px;
  font-size: 1.25em;
  padding-right: 7px;
  vertical-align: middle;
  border-left: 1px solid #fff;
  position: relative;
  margin-left: 20px;
  font-size: 14px;
  line-height: 28px
}
.met-index-contact a i:after {
  content: '';
  width: 1px;
  height: 100%;
  background: #ddd;
  position: absolute;
  left: -2px;
  top: 0
}
.met-index-contact a:hover, .met-index-contact a:focus, .met-index-contact a:active {
  background: #1e8bc3
}
.met-index-contact a:hover i, .met-index-contact a:focus i, .met-index-contact a:active i {
  border-color: transparent
}
.met-index-contact a:hover, .met-index-contact a:focus, .met-index-contact a:active, .met-index-contact a:hover i, .met-index-contact a:focus i, .met-index-contact a:active i {
  color: #fff
}
.met-index-contact a:hover i, .met-index-contact a:focus i, .met-index-contact a:active i {
  border-left: 1px solid #fff
}

.header-logo {
  width: 50px;
  height: 50px;
}

canvas {
  width: 100%;
}
/*height: 400px;*/
.fa-arrow-circle-right:before {
  content: "\f0a9"
}
.container-fluid {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto
}
.met-index-contact {
  background: #212832;
  padding-top: 28px;
  padding-bottom: 28px
}
.met-index-contact p {
  font-size: 1.75em;
  color: #fff;
  display: inline-block;
  margin: 10px 0;
  line-height: 30px;
  padding-right: 50px;
  position: relative;
  top: 5px
}
@media(max-width:767px) {
  .met-index-contact p {
    padding: 0 !important;
    top: 0;
    margin: 5px 0 !important
  }
  .met-index-contact a {
    margin: 5px 0 !important
  }
}
.met-index-contact a {
  font-family: 'Microsoft YaHei', Tahoma, Verdana, 'Simsun';
  font-weight: 500;
  text-transform: uppercase;
  color: #fff;
  display: inline-block;
  background: #044a67;
  position: relative;
  line-height: 40px;
  padding-left: 27px;
  border-radius: 3px;
  padding-right: 9px;
  margin: 10px 0;
  font-size: 14px;
  -webkit-transition: all .3s ease-in-out;
  -o-transition: all .3s ease-in-out;
  transition: all .3s ease-in-out
}
.met-index-contact a i {
  padding-left: 15px;
  font-size: 1.25em;
  padding-right: 7px;
  vertical-align: middle;
  border-left: 1px solid #fff;
  position: relative;
  margin-left: 20px;
  font-size: 14px;
  line-height: 28px
}
.met-index-contact a i:after {
  content: '';
  width: 1px;
  height: 100%;
  background: #ddd;
  position: absolute;
  left: -2px;
  top: 0
}
.met-index-contact a:hover, .met-index-contact a:focus, .met-index-contact a:active {
  background: #1e8bc3
}
.met-index-contact a:hover i, .met-index-contact a:focus i, .met-index-contact a:active i {
  border-color: transparent
}
.met-index-contact a:hover, .met-index-contact a:focus, .met-index-contact a:active, .met-index-contact a:hover i, .met-index-contact a:focus i, .met-index-contact a:active i {
  color: #fff
}
.met-index-contact a:hover i, .met-index-contact a:focus i, .met-index-contact a:active i {
  border-left: 1px solid #fff
}

.header-logo {
  width: 50px;
  height: 50px;
}

canvas {
  width: 100%;
  /*height: 400px;*/
}


.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}

.my-card-text {
  font-size: 22px;
  font-weight: bold;
  color: #a94442;
}

.my-about-div {
  float: left;
  width: 30%;
  line-height: 60px;
  margin-left: 5%;
  text-align: left;
  color: #ee2020
}

.about-div-title {
  font-family: Consolas, sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: #2d2d2d;
  font-style: italic;
}

.about-div-img {
  width: 100px;
  height: 75px;
  border: #a0cfff solid 2px;
  border-radius: 10px
}

.about-div-connect {
  color: #ab1f1f;
  font-style: normal;
  font-family: 'Times New Roman', serif;
  font-weight: bold;
}


* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-family: Microsoft Yahei, "微软雅黑", "Helvetica Neue", Helvetica, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif;
}

html,
body {
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none;
}

a:focus {
  /* firefox */
  outline: none;
}

img {
  border: none;
}

.hidden {
  display: none;
}


/* 页面主容器 */

.container {
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
;
}


/* 栅格系统 */

.mk-item-box {
  /*margin-right: 14%;*/
  text-align: center;
}

.mk-item-box:before,
.mk-item-box:after {
  content: " ";
  display: table;
}

.mk-item-box:after {
  clear: both;
}

.mk-item {
  width: 50%;
  float: left;
  padding-left: 15px;
  padding-right: 15px;
  position: relative;
  line-height: 30px;
}


/* 响应式优化 */

@media screen and (max-width: 1150px) {
  .container {
    width: 950px;
  }
}

@media screen and (max-width: 1000px) {
  .container {
    width: 750px;
  }
  .mk-item {
    width: 50%;
  }
}

@media screen and (max-width: 800px) {
  .container {
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
  }
  .welcome>p {
    font-size: 20px;
  }
}

@media screen and (max-width: 600px) {
  .container {
    padding-left: 15px;
    padding-right: 15px;
  }
  .mk-item {
    width: 100%;
  }
}


/* 分类大块 */

.section {
  margin-top: 30px;
  margin-bottom: 10px;
}


/* 子标题 */

.mk-sub-title {
  text-align: center;
  font-weight: normal;
  font-size: 26px;
  margin: 20px 0 13px 0;
}

.mk-sub-title>span {
  font-family: Segoe UI Light, Microsoft YaHei, Arial, Helvetica, sans-serif;
  margin-right: 10px;
}

.mk-title-describe {
  text-align: center;
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}


/* 彩色块，样式来自 alloyteam(http://www.alloyteam.com/) */

.mk-color-item {
  background-color: #70c3ff;
  padding: 5px 10px;
  text-align: left;
  border-radius: 20px;
  color: #ffffff;
  margin-bottom: 25px;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  height: 150px;
  width: 100%;
}

.mk-color-item:hover {
  transform: translateY(-6px);
  -webkit-transform: translateY(-6px);
  -moz-transform: translateY(-6px);
  box-shadow: 0 26px 40px -24px rgba(0, 36, 100, .5);
  -webkit-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, .5);
  -moz-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, .5)
}

.mk-color-item.color1 {
  background-color: #033f58 !important;
}

.mk-color-item>p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}

.mk-color-item>.item-logo {
  /*height: 1px;*/
  overflow: hidden;
  display: inline-block
}

.mk-color-item>.item-logo>img {
  height: 100%
}

.mk-color-item>.item-logo>.fa {
  font-size: 60px;
  line-height: 60px;
}

.mk-color-item>h3 {
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
  color: inherit;
}

.mk-color-item>.light {
  cursor: pointer;
  position: absolute;
  left: -100%;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: -webkit-linear-gradient(0deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, .5), hsla(0, 0%, 100%, 0));
  transform: skewx(-25deg);
  -o-transform: skewx(-25deg);
  -moz-transform: skewx(-25deg);
  -webkit-transform: skewx(-25deg);
}

.mk-color-item:hover>.light {
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
  left: 100%
}


/* 大标题 */

.mk-big-title {
  text-align: center;
}

.mk-big-title>h4 {
  font-size: 50px;
  display: inline-block;
  /*background: #eee url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAHklEQVQImWNkYGBgYGD4//8/A5wF5SBYyAr+//8PAPOCFO0Q2zq7AAAAAElFTkSuQmCC) repeat;  */
  /*text-shadow: 5px -5px black, 4px -4px white;  */
  /*font-weight: bold;  */
  /*-webkit-text-fill-color: transparent;  */
  /*-webkit-background-clip: text;*/
  position: relative;
  margin-bottom: 10px
}


/* 只有chrome才能享用的特效…… */

@media screen and (-webkit-min-device-pixel-ratio:0) {
  .mk-big-title>h4 {
    background: #eee url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAHklEQVQImWNkYGBgYGD4//8/A5wF5SBYyAr+//8PAPOCFO0Q2zq7AAAAAElFTkSuQmCC) repeat;
    text-shadow: 5px -5px black, 4px -4px white;
    font-weight: bold;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
}

.about-content>p {
  text-indent: 2em;
  line-height: 25px;
  margin-bottom: 10px;
  color: #2d2d2d;
}

.about-content>p>a {
  color: #44a1a7;
}

.about-content>p>a:hover {
  text-decoration: underline;
}


/* 社会化图标 */

.social {
  font-size: 60px;
  line-height: 60px;
  margin-bottom: 25px;
}

.social>a {
  color: #fff;
}

.footer>.count {
  cursor: pointer;
  display: inline;
}

.footer>.count>img {
  vertical-align: text-top;
  opacity: 0.6;
}

.footer>.count:hover>img {
  opacity: 1;
}


/* 备案信息 */

.web-record {
  margin-top: 20px;
  color: #777575;
}

.web-record>a {
  transition: all 0.25s ease;
  -webkit-transition: all 0.25s ease;
  color: #777575;
  font-size: 14px;
  white-space: nowrap;
}

.web-record>a:hover {
  text-decoration: underline;
}

.web-record>a>img {
  opacity: 0.4;
  vertical-align: text-top;
}

.web-record>a:hover>img {
  opacity: 0.8;
}

.social>a {
  display: inline-block;
  position: relative;
}

.social>a[href]:after,
.social>a[href]:before {
  -webkit-transition: all .18s ease-out .18s;
  transition: all .18s ease-out .18s;
  opacity: 0;
  display: none;
  left: 50%;
  bottom: 100%;
  -webkit-transform: translate3d(-50%, 10px, 0);
  transform: translate3d(-50%, 10px, 0);
  position: absolute;
}


/* 下面的三角 */

.social>a[href]:after {
  border-top: 8px solid #222;
  border-top: 8px solid hsla(0, 0%, 0%, .85);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  content: "";
  height: 0;
  width: 0;
  margin-bottom: 8px;
}


/* 气泡主体 */

.social>a[href]:before {
  background: #222;
  background: hsla(0, 0%, 0%, .85);
  color: #f6f6f6;
  content: attr(mkpop);
  font-size: 14px;
  height: 32px;
  margin-bottom: 15px;
  line-height: 32px;
  padding: 0 15px;
  text-shadow: 0 1px 1px hsla(0, 0%, 0%, 1);
  white-space: nowrap;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
}


/* 鼠标滑过时显示出来 */

.social>a[href]:hover:after,
.social>a[href]:hover:before {
  display: block;
  opacity: 1;
}


/* 返回顶部按钮。样式来自水墨寒博客 https://smohan.net/ */

.mk-uptop {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 20px;
  right: -60px;
  background-color: rgba(67, 69, 70, .75);
  z-index: 50;
  -webkit-transition: all .36s ease;
  transition: all .36s ease;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
}

.mk-uptop:before {
  content: "";
  width: 12px;
  height: 12px;
  border-top: 1px solid hsla(0, 0%, 100%, .75);
  border-right: 1px solid hsla(0, 0%, 100%, .75);
  position: absolute;
  top: 45%;
  left: 55%;
  -webkit-transform: rotate(-45deg) translate(-50%, -50%);
  transform: rotate(-45deg) translate(-50%, -50%);
}

.mk-uptop:hover {
  background-color: rgb(67, 69, 70);
  background-color: rgba(67, 69, 70, 1);
}

.mk-uptop.show {
  right: 12px;
  -webkit-transform: scale(1) rotate(-1turn) translate(0);
  transform: scale(1) rotate(-1turn) translate(0);
}


/* 上下移动动画效果 */

@-webkit-keyframes upDown {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate3d(0, 8px, 0);
    opacity: 0;
  }
}

@keyframes upDown {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 8px, 0);
    opacity: 0;
  }
}


/* 掉落的动画效果 */

@-webkit-keyframes dropIn {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100px, 0)
  }
  100% {
    opacity: 0.8;
    -webkit-transform: translate3d(0, 0, 0)
  }
}

@keyframes dropIn {
  0% {
    opacity: 0;
    transform: translate3d(0, -100px, 0)
  }
  100% {
    opacity: 0.8;
    transform: translate3d(0, 0, 0)
  }
}


/* 逐渐出现的动画效果 */

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
    -webkit-transform: scale(.8) translateY(20px)
  }
  to {
    opacity: 1;
    -webkit-transform: scale(1) translateY(0)
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(.8) translateY(20px)
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0)
  }
}


/*弹动效果*/

@-webkit-keyframes bounce {
  0% {
    -webkit-transform: scale(1)
  }
  10%,
  20% {
    -webkit-transform: scale(0.8) rotate(-2deg)
  }
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: scale(1.1) rotate(2deg)
  }
  40%,
  60%,
  80% {
    -webkit-transform: scale(1.1) rotate(-2deg)
  }
  100% {
    -webkit-transform: scale(1) rotate(0)
  }
}


/* 拉伸弹动效果 */

@keyframes rubberBand {
  0% {
    transform: scaleX(1)
  }
  30% {
    transform: scale3d(1.25, .75, 1)
  }
  40% {
    transform: scale3d(.75, 1.25, 1)
  }
  50% {
    transform: scale3d(1.15, .85, 1)
  }
  65% {
    transform: scale3d(.95, 1.05, 1)
  }
  75% {
    transform: scale3d(1.05, .95, 1)
  }
  to {
    transform: scaleX(1)
  }
}

.el-input.is-disabled .el-input__inner {
  background-color: #F5F7FA;
  border-color: #E4E7ED;
  color: #e42b4f;
  cursor: not-allowed;
  /*font-weight: bold;*/
  font-size: 20px;
}



.my_a {
  color: #FFF;
}
.my_a:before {
  color: #FFF;
}
.my_a:after {
  color: #FFF;
}

.dr-a {
  color: #332b2b;
}
.dr-a:before {
  color: #332b2b;
}
.dr-a:after {
  color: #332b2b;
}

.el-dropdown-link {
  cursor: pointer;
  color: #FFF;
  font-weight: bold;
  font-size: 19px;
}
.el-icon-arrow-down {
  font-size: 12px;
}


html,
body {
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none;
}

a:focus {
  /* firefox */
  outline: none;
}

</style>
