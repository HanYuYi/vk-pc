<template>
  <div class="user_info">
    <div class="user_info_set">
      <div class="user_headimg_set clearfix">
        <div class="headimg_upload_box fl">
          <div class="upload_load" v-show="uploadLoad">
            <span class="loader"><span></span></span>
          </div>
          <div class="cropper_box" v-show="showCropper">
            <vueCropper
              ref="cropper"
              :img="cropperOption.img"
              :autoCrop="cropperOption.autoCrop"
              :autoCropWidth="cropperOption.autoCropWidth"
              :autoCropHeight="cropperOption.autoCropHeight"
              :fixed="cropperOption.fixed"
              :fixedBox="cropperOption.fixedBox"
              :centerBox="cropperOption.centerBox"
              :canMove="cropperOption.canMove"
              :original="cropperOption.original"
              :outputType="cropperOption.outputType"
              @realTime="realTime">

            </vueCropper>
          </div>
          <upload :action="uploadUrl"
                  :on-success="handleUploadSuccess"
                  :format="['jpg','bmp','png','jpeg']"
                  :on-error="handleUploadError"
                  :show-upload-list="!1"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :on-progress="handleUpLoadProgress"

                  accept="image/png, image/jpeg, image/bmp, image/jpg"
                  :max-size="imgUploadSizeLimit*1024*1024" v-show="uploadInputShow">
            <div class="upload_tips_box">
              <span>{{$t("Upload_the_picture")}}</span>
              <p>{{$t("Upload_picture_supports_JPG_jpeg")}}</p>
            </div>
          </upload>
          <!-- <input type="file" @change="tirggerFile($event)" id="headimg_upload" ref="upload"   accept="image/png, image/jpeg, image/bmp" v-else>-->
        </div>
        <div class="headimg_preview_box fl">
          <div class="preview_box_title">{{$t("Image_preview")}}</div>
          <div class="preview_box_content">
            <div class="preview_img">
              <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden'}">
                <div :style="previews.div">
                  <img :src="previews.url" :style="previews.img" alt="">
                </div>
              </div>
            </div>
            <div class="btn">
              <span class="btn_loading" v-if="saveHeadImgFlag"></span>
              <a href="javascript:;" class="d_btn normal" @click="handleHeadImgUpload" v-else>{{$t("Save_the_picture")}}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="user_info_other">
        <div class="set_box clearfix" v-if="userInfo.change_flag===1">
          <span class="left fl">{{$t("The_user_name")}}</span> <input type="text" v-model="userNewInfo.username" class="ivu-input fl">
          <span v-if="userInfo.register_type == 1 || userInfo.register_type == 2" class="sign">账号不修改无法投注且只能修改一次；</span>
        </div>
        <div class="set_box clearfix">
          <span class="left fl">{{$t("nickname")}}</span> <input type="text" v-model="userNewInfo.nickname"  class="ivu-input fl">
        </div>
        <div class="set_box clearfix">
          <span class="left fl">{{$t("birthday")}}</span>
          <div class="fl birth_day" v-if="userInfo.birth">{{userInfo.birth}}</div>
          <date-picker class="fl"
                       type="date"
                       :start-date="new Date(2000,0,1)"
                       :options="birthOption"
                       v-model = "userNewInfo.birthday"
                        v-else>
          </date-picker>
        </div>
        <div class="set_box clearfix">
          <span class="left fl">{{$t("Individuality_signature")}}</span>
          <div class="user_sign fl">
            <textarea v-model="userNewInfo.sign"></textarea>
            <div class="limit_countdown"><span>{{signInputLen}}</span>/{{signMaxLen}}</div>
          </div>
        </div>
        <div class="btn">
          <span class="btn_loading" v-if="saveUserInfoLoad"></span>
          <a href="javascript:;" class="d_btn normal" @click="handleSaveUserInfo" v-else>{{$t("save")}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import VueCropper from 'vue-cropper'
import { formatDate } from "../../../utils/util";
export default {
  name:'userinfo',
  components: {
    VueCropper
  },
  watch: {
    'userNewInfo.sign': function (val, oldval) {
      if(this.userNewInfo.sign){
        this.signInputLen = this.userNewInfo.sign.length
        if(this.signInputLen > this.signMaxLen){
          this.userNewInfo.sign = oldval
        }
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    uploadUrl () {
      return '/api'+this.ApiSetting.user.uploadImage.url
    }
  },
  mounted () {
    this.userNewInfo.username = this.userInfo.username
    this.userNewInfo.nickname = this.userInfo.nickname
    this.userNewInfo.sign = this.userInfo.specific_sign
    this.signInputLen = this.userNewInfo.sign?this.userNewInfo.sign.length:0
  },
  created () {
    setTimeout(() =>{
      this.userNewInfo.username = this.userInfo.username
      this.userNewInfo.nickname = this.userInfo.nickname
      this.userNewInfo.sign = this.userInfo.specific_sign
      this.signInputLen = this.userNewInfo.sign?this.userNewInfo.sign.length:0
    }, 600)
  },
  data() {
    return {
      saveUserInfoLoad: false,
      uploadInputShow: true,
      uploadLoad: false,
      imgUploadSizeLimit: 2,
      previews: {},
      cropperOption:{
        img:'',
        autoCrop: true,
        canMove: true,
        fixed: true,
        fixedBox: true,
        outputType: 'jpg',
        autoCropWidth: 160,
        autoCropHeight: 160,
        centerBox: false,
        original: false
      },
      showCropper: false,
      signMaxLen: 200,
      signInputLen: 0,
      userNewInfo: {
        birthday: '',
        username: '',
        nickname: '',
        sign: ''
      },
      birthFlag: false,
      birthOption: {
        disabledDate (date) {
          //最多可选择10年前的今天
          let tomd = new Date();
          let birthEndDate =new Date( (tomd.getFullYear()-10) +'/'+(tomd.getMonth()+1)+'/'+tomd.getDate()).getTime()
          return (date && date.valueOf() < new Date('1960/01/01').getTime() )||(date&& date.valueOf()> birthEndDate)
        }
      },
      saveHeadImgFlag:  false
    }
  },
  methods: {
    // setBirthDay (date) {
    //   if(date.split('-')[0]*1>2010){
    //     this.birthFlag = false
    //     this.userNewInfo.birthday = '2010-01-01'
    //     this.$message({
    //       message: this.$t("Choice_is_not_greater_than"),
    //       type: 'warning'
    //     })
    //   }else{
    //     this.birthFlag = true
    //     this.userNewInfo.birthday = date
    //   }
    // },
    handleSaveUserInfo () {
      let data = {
        nickname: this.userNewInfo.nickname,
        specific_sign: this.userNewInfo.sign
      }
      if(this.userInfo.change_flag === 1){
        data.username = this.userNewInfo.username
      }
      if(!this.userInfo.birth){
        // if(this.birthFlag){
          data.date = formatDate(new Date(this.userNewInfo.birthday).getTime(),'yyyy-MM-dd ')
        // }else{
        //   this.$message({
        //     message: this.$t("Choose_birthday_is_not_correct"),
        //     type: 'warning'
        //   })
        //   return false
        // }
      }
      this.saveUserInfoLoad = true
      this.$http(this.ApiSetting.user.upDateUserInfo, data)
        .then((res) => {
          if(res.status === 1){
            this.$message({
              message: res.message,
              type: 'success'
            })
            let newInfo = this.userInfo
            newInfo.nickname = data.nickname
            newInfo.specific_sign = data.specific_sign
            if(data.date){
              newInfo.birth = data.date
            }
            if(data.username){
              newInfo.username = data.username
            }
            this.$store.commit('updateUserInfo',newInfo)
          }
          this.saveUserInfoLoad = false
        }, (err) => {
          this.saveUserInfoLoad = false
        })
    },
    tirggerFile (evt) {
      let inputDOM = this.$refs.upload
      let newsrc=this.getObjectURL(inputDOM.files[0]);
      this.showCropper = true
      this.cropperOption.img = newsrc
      /* let fileObj = evt.target || window.event.srcElement
       let inputDOM = this.$refs.upload
       let filePath = inputDOM.value
       if(filePath){
         let fileType = filePath.substring(filePath.lastIndexOf(".")).toLowerCase()
         if(!fileType.match(/.jpg|.png|.bmp/i)) {
           this.$message({
             message: this.$t("You_upload_the_file_type"),
             type: 'warning',
             duration: 3000
           })
           inputDOM.value = ''
           return false;
         }
       }

       let imgSize = ''

       if(fileObj.files && fileObj.files[0]){
         imgSize = fileObj.files[0].size
       }else{
         fileObj.select();
         let url = document.selection.createRange().text;
         try {
           var fso = new ActiveXObject("Scripting.FileSystemObject");
         } catch (e) {
           this.$message({
             message: '如果你用的是ie8以下 请将安全级别调低！',
             type: 'warning',
             duration: 3000
           })
         }
         imgSize = fso.GetFile(url).size
       }
       if(imgSize>this.imgUploadSizeLimit*1024*1024){
         this.$message({
           message: this.$t("Upload_pictures_of_more_than")+ this.imgUploadSizeLimit +this.$t("M_please_choose_again"),
           type: 'warning',
           duration: 3000
         })
         inputDOM.value = ''
         return false;
       }
       let data = {
         file: fileObj.files[0]
       }
       this.axios.post('/api'+this.ApiSetting.user.uploadImage.url, data, {
         headers: {
           "Content-Type": "multipart/form-data"
         }
       })*/
      /*   this.$http(this.ApiSetting.user.uploadImage, data)
           .then((res) => {
              if(res.status === 1){
              }
           })*/

    },
    handleUploadSuccess (res, file) {
      this.showCropper = true
      this.uploadLoad = false
      this.cropperOption.img = res.data.image
    },
    handleUploadError (evt) {
      this.uploadLoad = false
      this.uploadInputShow = true
      this.showCropper = false
    },
    handleFormatError (file) {
      this.$message({
        message: this.$t("You_upload_the_file_type"),
        type: 'warning'
      })
    },
    handleMaxSize (file) {
      this.$message({
        message: this.$t("Upload_pictures_of_more_than")+ this.imgUploadSizeLimit +this.$t("M_please_choose_again"),
        type: 'warning'
      })
    },
    handleUpLoadProgress () {
      this.uploadLoad = true
      this.uploadInputShow = false
    },
    realTime(data) {
      this.previews = data
    },
    handleHeadImgUpload () {
      if(this.$refs.cropper.img === ''){
        this.$message({
          message: this.$t("Please_upload_the_picture"),
          type: 'warning'
        })
        return false
      }
      this.$refs.cropper.getCropData((data) => {
        // do something
        let newData = {
          image: data
        }
        this.saveHeadImgFlag = true
        this.$http(this.ApiSetting.user.uploadUserImg, newData)
          .then((res) => {
            if(res.status === 1){
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.userInfo.head_image = data
            }
            this.showCropper = false
            this.uploadInputShow = true
            this.saveHeadImgFlag = false
          }, (err) => {
            this.saveHeadImgFlag = false
          })
      })
    },
    getObjectURL (file) {
      var url = null ;
      // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
      if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
      } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
      } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
      }
      return url ;
    },
    imgLoad (msg) {}
  }
}
</script>
<style scoped>
  .user_headimg_set .headimg_upload_box .upload_load{
    height: 268px;
    line-height: 268px;
    text-align: center;
  }
  .user_headimg_set{
    padding: 30px 0 80px;
  }
  .user_headimg_set .headimg_upload_box{
    width: 270px;
    height: 270px;
    box-sizing: border-box;
    border: 1px solid #7c839f;
    background-color: #17191f;
    position: relative;
  }
  .user_headimg_set .headimg_upload_box label{
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 100%;
    left: 0;
    top: 0;
    cursor: pointer;
  }
  .user_headimg_set .headimg_upload_box  .cropper_box{
    width: 100%;
    height: 100%;
  }
  .user_headimg_set .headimg_upload_box .upload_tips_box{
    padding: 70px 20px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
  }
  .user_headimg_set .headimg_upload_box .upload_tips_box span{
    color: #fff;
    width: 90px;
    height: 32px;
    display: inline-block;
    text-align: center;
    line-height: 32px;
    border-radius: 30px;
    border: 1px solid #7c839f;
    margin-top: 10px;
  }
  .user_headimg_set .headimg_upload_box .upload_tips_box p{
    margin-top: 30px;
  }
  .user_headimg_set .headimg_preview_box{
    width: 200px;
    margin-left: 60px;
    text-align: center;
  }
  .user_headimg_set .headimg_preview_box .preview_box_title{
    color: #fff;
    font-size: 18px;
  }
  .user_headimg_set .headimg_preview_box .preview_img{
    width: 162px;
    height: 162px;
    margin: 24px auto;
    box-sizing: border-box;
    border: 1px solid #7c839f;
    background-color: #17191f;
    border-radius: 50%;
    overflow: hidden;
  }


  .user_info_other{
    position: relative;
    padding: 50px 60px;
    color: #fff;
  }
  .user_section_content .info_setting_content.inner_content{
    width: 811px;
    margin: 0 auto;
  }
  .user_info_other:after{
    content: '';
    position: absolute;
    height: 1px;
    left: -60px;
    width: 944px;
    background-color: #17191f;
    top: 0px;
  }
  .user_info_other .set_box{
    margin-bottom: 30px;
    line-height: 30px;
    position: relative;
  }
  .set_box .left{
    display: inline-block;
    width: 80px;
    text-align: right;
    font-size: 18px;
    margin-right: 20px;
    vertical-align: middle;
  }
  .set_box .sign {
    position: absolute;
    top: 41px;
    left: 102px;
    font-size: 14px;
    line-height: 14px;
    letter-spacing: 0.35px;
    color: #e34d12;
  }
  .user_info_other .set_box .birth_day{
    font-size: 18px;
  }
  .set_box .ivu-input{
    width: 230px;
    border-color: #7c839f;
  }
  .set_box .question_box{
    width: 230px;
  }
  .set_box  .ivu-date-picker{
    width: 230px;
  }
  .set_box .user_sign{
    width: 310px;
    position: relative;
  }
  .set_box .user_sign .limit_countdown{
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #4f5466;
  }
  .set_box textarea{
    border:1px solid #7c839f;
    border-radius: 14px;
    width: 100%;
    font-size: 14px;
    color: #fff;
    padding: 10px;
    box-sizing: border-box;
    resize: none;
    height: 136px;
    background-color: transparent;
  }
  .user_info_other .btn{
    margin-top: 50px;
    margin-left: 100px;
  }
</style>
