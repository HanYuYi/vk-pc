<template>
<div>
  <el-dialog
  :custom-class="'pure_dialog instro_dialog'"
  :visible.sync="instroShow"
  :append-to-body="true"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  :fullscreen="true"
  id="instroDialog"
   >
   <!--start-->
    <section class="instro_start" v-show="stepShow.start">
      <img src="../assets/instro/1.png" alt="">
      <div class="instro_btn" @click="toNext('start','first')"></div>
    </section>
    <!--first-step-->
    <section class="instro_first_step" v-show="stepShow.first">
       <ul class="main_nav_instro" :style="firstStyle">
        <li :style="{width:liw}">{{$t("tournament")}}</li>
        <li :style="{width:liw}">{{$t("Sports_events")}}</li>
        <li :style="{width:liw}">{{$t("zhenren")}}</li>
        <li :style="{width:liw}">{{$t("qipai")}}</li>
        <li :style="{width:liw}">{{$t("elearcade")}}</li>
      </ul>
      <img src="../assets/instro/2.png" alt="">
      <div class="instro_btn nextbtn" @click="toNext('first','second')"></div>
    </section>
   <!--second-step-->
    <section class="instro_second_step" v-show="stepShow.second">
      <ul class="main_nav_instro youhui_instro" :style="secondStyle">
        <li :style="{width:liw}">{{$t("discounts")}}</li>
      </ul>
      <div :style="{marginLeft:parseInt(secondStyle.left)- 430+'px'}">
        <img src="../assets/instro/3.png" alt="">
        <div class="instro_btn nextbtn" @click="toNext('second','third')"></div>
      </div>
    </section>
    <!--third-step-->
   <section class="instro_third_step" v-show="stepShow.third">
     <!--app下载二维码-->
     <div class="aside_box aside_mobile" :style="{top:thirdStyle.top}">
<!--      <span  class="icon"></span>-->
      <div class="aside_mobile_poppver el-popper">
        <!-- <div class="outline"></div> -->
        <!-- <div class="outline_clip"></div> -->
        <div class="qr_aside_wrapper">
          <div class="qr_img_box">
            <img width="145" height="145" :src="'/pc_static/defaultimg/qr_img_vip.png'" alt="">
          </div>
          <p style="text-align: center;margin-top: 3px">VKGAME APP<br/>{{$t("Scan_code_to_download")}}</p>
        </div>
        </div>
     </div>
     <div class="conten_box" :style="{top:parseInt(thirdStyle.top)- 50+'px'}">
       <img  src="../assets/instro/4.png" alt="">
       <div class="instro_btn nextbtn" @click="toNext('third','fourth')"></div>
     </div>
   </section>
   <!--fourth-step -->
   <section class="instro_fourth_step" v-show="stepShow.fourth">
     <ul class="main_nav_instro userhome_instro" @click="toUser" :style="fourthStyle">
       <li :style="{width:liw}">{{$t("Personal_center")}}</li>
     </ul>
     <img :style="{marginLeft:parseInt(fourthStyle.left)- 160+'px',
     marginTop:parseInt(fourthStyle.top)+60+'px'}"
      src="../assets/instro/5.png" alt="">
   </section>
   <!--fifth-step -->
   <section class="instro_fifth_step" v-show="stepShow.fifth">
      <div :style="{top:parseInt(fifth1Style.top)- 5+'px',
      left:parseInt(fifth1Style.left)- 5+'px'}"
       class="fourthbtn small">
        <span  class="el-button el-button--primary small">充值</span>
      </div>
      <div  :style="{top:parseInt(fifth2Style.top)- 10+'px',
      left:parseInt(fifth2Style.left)- 10+'px'}"
      class="fourthbtn">
        <span  class="el-button el-button--primary ">充值</span>
      </div>
      <div :style="{marginLeft:parseInt(fifth1Style.left)+60+'px',
      marginTop:parseInt(fifth1Style.top)-208+'px'}">
        <img src="../assets/instro/6.png" alt="">
        <div class="instro_btn endbtn" @click="toNext('fifth')"></div>
      </div>
   </section>
  </el-dialog>
  <el-dialog
  :custom-class="'pure_dialog empty'"
  :visible.sync="stepShow.empty"
  :append-to-body="true"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  :fullscreen="true"
  :modal="false"
   ></el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import storage from '../utils/storage'

export default {
  name: 'instro',
  data () {
    return {
      instroShow: false,
      liw: '107px',
      firstStyle: {},
      secondStyle: {},
      thirdStyle: {},
      fourthStyle: {},
      fifth1Style: {},
      fifth2Style: {},
      stepShow: {
        start: false,
        first: false,
        second: false,
        third: false,
        fourth: false,
        fifth: false,
        empty: false
      },
      beginStep: false
    }
  },
  computed: {
    ...mapState(['isLogin', 'userInfo'])
  },
  watch: {
    'userInfo.first_login': function () {
      this.isShowFn()
    }
  },
  mounted () {
    this.isShowFn()
  },
  methods: {
    isShowFn () {
      const instroCacheFlag = JSON.parse(storage.get(`instro_displayed_displayed`))
      const isNeedInstro = Number(instroCacheFlag) !== this.userInfo.user_id
      if (this.isLogin && !this.beginStep && this.userInfo.first_login && isNeedInstro) {
        this.$nextTick(() => {
          this.getElePosition()
          storage.set(`instro_displayed_displayed`, this.userInfo.user_id)
        })
      }
    },
    // 获取元素位置
    getElePosition () {
      this.liw = this.getOffset(document.querySelector('.ivu-menu-submenu-title')).width
      this.firstStyle = this.getOffset(document.querySelector('.main_nav'), 'position')
      this.secondStyle = this.getOffset(document.querySelector('.youhui_forinstro'), 'position')
      this.thirdStyle = this.getOffset(document.querySelector('.index_aside .aside_mobile '), 'position')
      this.fourthStyle = this.getOffset(document.querySelector('.userhome_forinstro '), 'position')
      this.stepShow.empty = true
      setTimeout(() => {
        this.stepShow.empty = false
        this.beginStep = true
        this.instroShow = true
        this.$store.commit('setCurrentInstroShow', true)
        this.stepShow.start = true
      }, 500)
    },
    // 去下一步
    toNext (curstep, nextsetp) {
      this.stepShow[curstep] = false
      if (nextsetp) {
        this.stepShow[nextsetp] = true
      }
      if (curstep == 'fifth') {
        this.instroShow = false
        this.beginStep = false
        this.$store.commit('setCurrentInstroShow', false)
        this.$store.commit('updateLoadHostpot', true)
      }
    },
    toUser () {
      this.instroShow = false
      this.stepShow.empty = true
      setTimeout(() => {
        this.stepShow.empty = false
        this.instroShow = true
        this.fifth1Style = this.getOffset(document.querySelector('.finance_samll_forinstro '), 'position')
        this.fifth2Style = this.getOffset(document.querySelector('.finance_forinstro '), 'position')
        this.toNext('fourth', 'fifth')
      }, 1500)
      this.$router.push('/user')
    },
    getOffset (element, type) {
      if (!element) {
        return {}
      }
      var x = element.getBoundingClientRect()
      if (type == 'position') {
        return {
          top: x.top + 'px',
          left: x.left + 'px'
        }
      } else {
        return {
          top: x.top + 'px',
          width: x.width + 'px',
          height: x.height + 'px',
          left: x.left + 'px'
        }
      }
    }
  }
}
</script>

<style lang="less">
.instro_dialog {
  width: 100%;
  .instro_start {
    text-align: center;
    img {
      margin-top: 170px;
    }
  }
  .instro_first_step {
    text-align: center;
    img {
      margin-top: 100px;
    }
  }
  .instro_second_step {
    img {
      margin-top: 80px;
    }
    .instro_btn {
      margin: -74px 0 0 440px;
    }
  }
  .instro_third_step {
    text-align: right;
    .conten_box {
      position: absolute;
      right: 210px;
    }
    .instro_btn {
      margin: -90px 0 0 50px;
    }
    .aside_box {
      position: absolute;
      right:0;
      width: 66px;
      background-color: rgba(255, 255, 255, 0.1);
      border:0;
      box-shadow: -2px 0 0 #17191f;
      .aside_mobile_poppver {
        position: absolute;
        z-index: 1;
        top: 50%;
        transform: translateY(-50%);
        left: -167px;
        &::before,&::after {
          position: absolute;
          top: 94px;
          content: "";
          width: 0;
          height: 0;
        }
        &::before{
          right: -12px;
          z-index: 1;
          border:6px solid transparent;
          border-left-color:  #07f1b7;
        }
        &::after{
          top: 95px;
          right: -10px;
          z-index: 2;
          border:5px solid transparent;
          border-left-color: #17191f;
        }
      }
    }

  }
  .instro_fourth_step {
    .userhome_instro {
      background: url("../assets/instro/btn.png") no-repeat center;
      background-position: center 16px;
      background-size:100% 53px;
      cursor: pointer;
      animation: btnani 0.5s linear alternate infinite;
      li {
        padding: 0;
        min-width: 80px;
        color: #19191e;
        &:hover {
          color: #fff;
        }
        &:after {
          display: none;
        }
      }
    }
  }
  .instro_fifth_step {
    .fourthbtn {
      position: absolute;
      width: 100px;
      height: 53px;
      background: url("../assets/instro/debtn.png") no-repeat center center;
      background-size: 100% 100%;
      text-align: center;
      &.small {
        width: 64px;
        height:34px;
        background: url("../assets/instro/desmallbtn.png") no-repeat center center;
      }
    }
    .el-button {
      pointer-events: none;
      margin-top: 7px;
      &.small {
        margin-top: 6px;
      }
    }
    .instro_btn {
      margin: -60px 0 0 220px;
    }
  }
  .instro_btn {
    margin: 0 auto;
    width: 104px;
    height: 103px;
    background: url("../assets/instro/start_nor.png") no-repeat;
    cursor: pointer;
    animation: btnani 0.5s linear alternate infinite;
    &:hover {
      background: url("../assets/instro/start_hov.png") no-repeat;
    }
    &.nextbtn {
      background: url("../assets/instro/next_nor.png") no-repeat;
      &:hover {
        background: url("../assets/instro/next_hov.png") no-repeat;
      }
    }
    &.endbtn {
      background: url("../assets/instro/know_nor.png") no-repeat;
      &:hover {
        background: url("../assets/instro/know_hov.png") no-repeat;
      }
    }
  }
  @keyframes btnani{
      0%{transform:scale(0.9);}
      100%{transform:scale(1);}
  }
  .main_nav_instro {
    position: absolute;
    background: url("../assets/instro/onebg.png") no-repeat center center;
    background-size: 100% 46px;
    &.youhui_instro {
      background: url("../assets/instro/twobg.png") no-repeat center center;
      background-size: 100% 46px;
    }
    li {
      float: left;
      height: 80px;
      line-height: 80px;
      color: #fff;
      float: left;
      padding: 0 18px;
      text-align: center;
      &::after{
        content: "";
        display: inline-block;
        background: none;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-top: 5px solid #fff;
        border-right: 5px solid transparent;
        border-bottom: 5px solid transparent;
        vertical-align: middle;
        margin-left: 5px
      }
    }
  }
}
</style>
