<template>
  <div class="validator_box">
    <!-- 文字验证码-->
    <el-input v-if="verType === 0"
              clearable placeholder="请输入验证码"
              v-model="txtVerifcode"
              @input="backResult"
              class="txt-ver"
              maxlength="10">
      <i slot="prepend" class="txt-ver-icon"/>
      <div slot="append" class="ver-btn" @click="changeVerCodeImg">
        <img v-if="veriImgUrl.length" :src="veriImgUrl" alt="">
      </div>
    </el-input>

    <!-- 极验-->
    <div v-if="verType === 1" id="captcha"></div>
  </div>
</template>

<script>
// import 'geetest/demo/gt'

export default {
  name: 'validator',
  computed: {
    verType() {
      return this.$store.state.loginModelData.verfiy
    },
    verCodeUrl () {
      return this.$store.state.verCodeUrl
    }
  },
  data() {
    return {
      txtVerifcode: '',
      veriImgUrl: '',
      captchaObj: null
    }
  },
  mounted(){
    if (this.verType === 0) {
      this.changeVerCodeImg()
    }
    if (this.verType === 1) {
      this.initCaptcha()
    }
  },
  methods: {
    // 重置
    reset(clearTxtVer) {
      console.log('调用了reset', this.verType, clearTxtVer, this.captchaObj)
      if (this.verType === 0) {
        if (clearTxtVer) this.txtVerifcode = ''
        this.changeVerCodeImg()
      }
      if (this.verType === 1) {
        if (this.captchaObj) {
          this.captchaObj.reset();
        }
      }
    },
    changeVerCodeImg () {
      this.veriImgUrl = ''
      let timer
      timer = setTimeout(() => {
        this.veriImgUrl = this.verCodeUrl
        clearTimeout(timer)
      })
    },
    /**
     * 初始化极验
     * @param data
     */
    initCaptcha() {
      initBotion({
        captchaId: '497663cd0b063076d5ff7109980e9504',
        product: 'float',
        nativeButton: {
          width: '100%',
          heigth: '100%'
        },
        nextWidth: '80%',
        hideBar: ['close']
      },(captcha) => {
        // captchaObj.verify()
        console.log('captcha', captcha)
        this.captchaObj = captcha
        captcha.appendTo("#captcha");// 调⽤appendTo将验证码插⼊到⻚⾯中
        //  DOM 生成完毕
        captcha.onReady(() => {
          console.log('极验4.0DOM生成完毕')
        })
        // 验证成功的回调
        captcha.onSuccess(() => {
          // 验证结果
          console.log('极验4.0回调成功', captcha)
          const result = captcha.getValidate()
          console.log('验证结果', result)
          this.backResult(result)
        })
      })
    },
    /**
     * 销毁
     */
    destroyCaptcha() {
      if (this.verType === 0) {
        this.changeVerCodeImg()
      }
      if (this.verType === 1) {
        if (this.captchaObj) {
          this.captchaObj.destroy();
        }
      }
    },
    /**
     * 返回验证结果
     * @param result
     */
    backResult(result) {
      let backArr = []
      if (this.verType === 0) {
        backArr[0] = this.txtVerifcode
      }
      if (this.verType === 1) {
        backArr[1] = result || false
      }
      this.$emit("getResult", backArr)
    }
  },
  beforeDestroy() {
    if (this.captchaObj) {
      this.captchaObj.destroy()
    }
  }
}
</script>

<style lang="less" scoped>
.validator_box {
  // 文字验证码
  .txt-ver {
    /deep/ .el-input-group__prepend {
      .txt-ver-icon {
        margin-top: 3px;
        display: inline-block;
        width: 19px;
        height: 23px;
        background: url("../assets/login/txt_ver_icon.png") no-repeat top center;
      }
    }
    /deep/ .el-input__suffix {
      padding-right: 5px;
    }
    /deep/ .el-input-group__append {
      padding: 0 15px 0 0;
      .ver-btn {
        border: 0;
        outline: 0;
        width: 80px;
        height: 28px;
        line-height: 28px;
        border-radius: 6px;
        background-color: #A8C2EF;
        font-size: 14px;
        color: #a0aabe;
        cursor: pointer;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          vertical-align: revert;
        }
      }
    }
    /deep/ .el-input__inner {
      padding: 0;
    }
  }

  // 极验
  /deep/ .botion_captcha {
    &.botion_wait {
      .botion_holder {
        .botion_content {
          background-image: none !important;
          border-color: #07f1b7;
        }
      }
    }
    &.botion_lock_success {
      .botion_content {
          background: #18404A;
          border-color: #07f1b7;
         .botion_tip {
           color: #07f1b7;
         }
      }
    }
    &.botion_freeze_wait {
      .botion_holder {
         .botion_content {
            background: transparent;
            border: 2px solid #07f1b7;
         }
      }
    }
    .botion_holder {
      color: #b8c2d7;
      background-image: none;
      height: 48px;
    }
    .botion_btn_click:hover~.botion_content {
      background-image: none;
    }
    .botion_mask {
      background-color: transparent;
      border-radius: 6px;
    }
    .botion_content {
      background-image: none !important;
      background: #2b2d3e;
      border-radius: 6px;
      border: 2px solid #545f75;
      .botion_gradient_bar {
        display: none;
      }
    }
  }
  /deep/ .geetest_holder {
    &.geetest_wind {
      height: 48px;
      .geetest_btn {
        .geetest_radar_btn {
          background-image: none;
          background-color: #2b2d3e;
          border-radius: 6px;
          border: 2px solid #545f75;
          .geetest_radar {
            margin: 7px 6px;
          }
          .geetest_radar_tip {
            font-size: 14px;
            color: #b8c2d7;
            height: 44px;
            line-height: 44px;
          }
          .geetest_logo {
            display: none;
          }
        }
        .geetest_ghost_success {
          .geetest_success_btn {
            border-radius: 6px;
            background: #18404A;
            border: 2px solid #07f1b7;
            .geetest_success_box {
              top: 10px;
              .geetest_success_show {
                background-color: #18404A;
              }
            }
            .geetest_success_radar_tip {
              top: 1px;
              color: #07f1b7;
            }
          }
        }
      }
    }
  }
}
</style>
