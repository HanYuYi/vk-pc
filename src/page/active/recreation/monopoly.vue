<template>
<div class="monopoly">
  <div class="wrapper">
    <div class="step_content">
      <div class="step_box" v-for="(item, index) in rollPrizeList " :key="index" :class="['box-' + index, {'start': index===0, 'has_lottery': hasLottery&&index===0, 'active': currentIndex===index, 'selected': currentLastIndex===index}]" :title="item.desc?item.desc:''" @click="showLotteryBox(index)">
        <div class="hand_ani"></div>
        <div class="userhead_wrapper">
          <div class="img_box">
            <img :src="userInfo.head_image" alt="" v-if="userInfo.head_image">
          </div>
        </div>
        <div class="box_content" :class="{'ontic_prize': item.game_id===0}" v-if="index!==0">
          <div class="box_prize_img"><img :src="item.icon_url" class="box_img" alt="" ></div>
          <div class="prize_text">{{item.desc}}</div>
        </div>
      </div>
      <!--<div class="step_box box-1">
        <img src="../../../assets/active/monopoly/1.png" class="box_img" alt="">
      </div>
      <div class="step_box box-2 active">
      </div>
      <div class="step_box box-3 selected">
      </div>-->
      <div class="play_center">
        <div class="dice_box">
          <img :src="diceUrl" alt="">
        </div>
        <div class="play_btn">
          <div class="mask" v-if="clickFlag||moveFlag"></div>
          <span @click="handlePlay" v-if="rollBtnShow"></span>
        </div>
        <div class="play_text">
          <p>{{$t("The_current_number_of_remaining")}}<span class="num">{{rollTimes}}</span></p>
          <div class="play_tips" v-if="leftMoney>0">{{$t("You_just_prepaid_phone_again")}}<span class="num">{{leftMoney}}</span>{{$t("Yuan_can_get_a_chance")}}</div>
        </div>
      </div>
    </div>
    <div class="active_section">
      <div class="records_content clearfix">
        <div class="my_records content_box">
          <div class="title"><span></span></div>
          <div class="content_table">
            <div class="t_header">
              <span class="t1 t">{{$t("time")}}</span><span class="t2 t">{{$t("The_prize")}}</span>
            </div>
            <div class="t_body">
              <div class="t_row no_data" v-if="noRecords">{{$t("No_record")}}</div>
              <div class="t_row" v-for="(item, index) in rollRecordsList">
                <span class="t1 t">{{item.use_time*1000 | formatdate('yyyy/MM/dd HH:mm:ss') }}</span><span class="t2 t">{{item.desc}}</span><span class="t3 t"><img :src="item.icon_url"
                                                                                                              alt=""></span>
              </div>
            </div>
          </div>
        </div>
        <div class="get_chance content_box">
          <div class="title"><span></span></div>
          <div class="content_table">
            <div class="t_header">
              <span class="t1 t">{{$t("The_first_charge_amount")}}</span><span class="t2 t">{{$t("Get_chance")}}</span><span class="t3 t">{{$t("The_cumulative_get_chance")}}</span>
            </div>
            <div class="t_body">
              <div class="t_row" v-for="(item, index) in depositGetChanceList" :key="index">
                <span class="t1 t">{{item[0]}}</span><span class="t2 t">{{item[1]}}</span><span class="t3 t">{{item[2]}}</span>
              </div>
             <!-- <div class="t_row">
                <span class="t1 t">500</span><span class="t2 t">1</span><span class="t3 t">2</span>
              </div>
              <div class="t_row">
                <span class="t1 t">1000</span><span class="t2 t">1</span><span class="t3 t">3</span>
              </div>
              <div class="t_row">
                <span class="t1 t">2000</span><span class="t2 t">1</span><span class="t3 t">4</span>
              </div>
              <div class="t_row">
                <span class="t1 t">3000</span><span class="t2 t">1</span><span class="t3 t">5</span>
              </div>
              <div class="t_row">
                <span class="t1 t">5000</span><span class="t2 t">1</span><span class="t3 t">6</span>
              </div>
              <div class="t_row">
                <span class="t1 t">7000</span><span class="t2 t">1</span><span class="t3 t">7</span>
              </div>
              <div class="t_row">
                <span class="t1 t">10000</span><span class="t2 t">1</span><span class="t3 t">8</span>
              </div>-->
            </div>
          </div>
        </div>
      </div>
      <div class="active_rule content_box">
        <div class="title"><span></span></div>
        <div class="box_content">
          <div class="content_section">
            <div class="content_section_title">
              {{$t("Activity_time")}}<span v-if="activeStartTime!==''">{{activeStartTime*1000 | formatdate('yyyy.MM.dd') }}</span>
            </div>
          </div>
          <div class="content_section">
            <div class="content_section_title">
              {{$t("Get_the_conditions")}}
            </div>
            <div class="content_section_text">
              <p>{{$t("The_corresponding_first_filling")}}</p>
              <p>{{$t("Click_throwing_dice_according")}}</p>
            </div>
          </div>
          <div class="content_section">
            <div class="content_section_title">
              {{$t("The_rules")}}
            </div>
            <div class="content_section_text">
              <p>{{$t("Players_daily_prepaid_phone")}}</p>
              <p>{{$t("Validity_period")}}</p>
              <p>{{$t("Draw_the_prizes_for")}}</p>
              <p>{{$t("Each_player_mobile_phone")}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn back_active_nav">
      <router-link to="/active" class="botton normal">{{$t("Return_to_activity_page")}}</router-link>
    </div>
  </div>
  <el-dialog
    :visible.sync="prizeWinDialog.visible"
    :custom-class="prizeWinDialog.class"
    :close-on-click-modal="maskClose">
    <div class="dialog_wrapper">
      <div class="prize_img_wrapper">
        <img :src="prizeWinDialog.prizeImgUrl" alt="">
      </div>
      <div class="win_tips">
        {{$t("Congratulations_to_you_to_get")}} {{prizeWinDialog.prizeName}}
      </div>
      <p class="exchange_code"><span v-if="prizeWinDialog.changeCode!==''">{{$t("Conversion_code")}}：{{prizeWinDialog.changeCode}}</span></p>
      <div class="dialog_btn">
        <span @click="handlePrizeWinHide"></span>
      </div>
    </div>
  </el-dialog>
  <el-dialog
    :visible.sync="lotteryDialog.visible"
    :custom-class="lotteryDialog.class"
    :modal="maskClose"
    :close-on-click-modal="maskClose">
    <div class="lottery_box">
      <div class="lottery_lp">
        <img src="../../../assets/active/monopoly/lottery_lp.png" alt="">
        <div class="lottery_play" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}">
          <img src="../../../assets/active/monopoly/lottery_play_zz.png" alt="">
          <div class="lottery_play_btn" @click="rotate_handle()"></div>
        </div>
      </div>
      <div class="lottery_close_btn" @click="lotteryDialog.visible = false">
      </div>
    </div>
  </el-dialog>
</div>
</template>
<script type="text/javascript">
import { formatDate } from '../../../utils/util'
export default {
  name: 'monopoly',
  components: {},
  filters: {
    formatdate (num, formate) {
      return formatDate (num, formate)
    }
  },
  computed: {
      isLogin () {
        return this.$store.state.isLogin
      },
      userInfo () {
        return this.$store.state.userInfo
      }
    },
  data() {
     return {
       activeStartTime: '',
       rollBtnShow: false,
       maskClose: false,
       noRecords: false,
       hasLottery: false,
       can_turntable: false,
       userInfoLoadFlag: false,
       depositGetChanceList:[],
       rollPrizeList: [],
       lotteryPrizeList: [],
       rollRecordsList: [],
       rollTimes: '-',
       leftMoney: 0,
       currentIndex: 0,
       currentLastIndex: 0,
       lastIndex: 0,
       steps: 0,
       totalStep: 0,
       diceUrl: require("../../../assets/active/monopoly/dice_1.png"),
       clickFlag: false,
       moveFlag: false,
       prizeWinDialog: {
         visible: false,
         class: 'monopoly_prize_win_dialog',
         prizeImgUrl: '',
         prizeName: '',
         changeCode: ''
       },
       lotteryDialog: {
         visible: false,
         class: 'monopoly_lottery_dialog'
       },
       start_rotating_degree: 0, //初始旋转角度
       rotate_angle: 0, //将要旋转的角度
       start_rotating_degree_pointer: 0, //指针初始旋转角度
       rotate_angle_pointer: 0, //指针将要旋转的度数
       rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
       rotate_transition_pointer: "transform 6s ease-in-out", //初始化指针过度属性控制
       lottery_flag: true, //是否可以点击抽奖
       lottery_index: 0
     }
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(window.loadUserInfoTimer)
    next()
  },
  created () {
  },
  mounted () {
    this.loadMonopolyBaseInfo()
    window.loadUserInfoTimer = setTimeout(() => {
      this.loadMonopolyUserInfo()
      this.loadPlayRecords ()
    }, 800)
  },
  activated () {
    this.loadMonopolyBaseInfo()
    if(this.isLogin){
      this.loadMonopolyUserInfo()
      this.loadPlayRecords ()
      clearTimeout(window.loadUserInfoTimer)
    }
  },
  methods: {
    loadMonopolyBaseInfo () {
      this.$http(this.ApiSetting.active.monopoly.getMonopolyInfo)
        .then((res) => {
          if(res.status === 1){
            this.depositGetChanceList = res.data.get_list
            this.rollPrizeList = res.data.monopoly_prizes
            this.lotteryPrizeList = res.data.monopoly_turntable_prizes
            this.activeStartTime = res.data.start_time?res.data.start_time:''
            if(res.data.is_over === false){
              this.rollBtnShow =  true
            }else if(res.data.is_over === true){
              this.rollBtnShow =  false
            }
          }
        }, (err) => {

        })
    },
    loadMonopolyUserInfo () {
      this.hasLottery = false
      this.can_turntable = false
      this.userInfoLoadFlag = false
      if(this.isLogin){
        this.$http(this.ApiSetting.active.monopoly.getUserMonopolyInfo)
          .then((res) => {
            if(res.status === 1){
              this.rollTimes = res.data.left_count
              this.leftMoney = res.data.continue_money
              this.hasLottery = res.data.can_turntable
              if(res.data.current_step > 0){
                this.currentIndex = res.data.current_step
              }else if(res.data.current_step === -1){
                this.currentIndex = 0
              }
              this.currentLastIndex = this.currentIndex
              this.lastIndex = this.currentIndex
              this.userInfoLoadFlag = true
            }
          }, (err) => {

          })
      }
    },
    loadPlayRecords () {
      if(this.isLogin){
        this.$http(this.ApiSetting.active.monopoly.getUserMonopolyRecords)
          .then((res) => {
              if(res.status === 1){
                if(res.data.join_list && res.data.join_list.length > 0){
                  this.rollRecordsList = res.data.join_list
                  this.noRecords = false
                }else{
                  this.noRecords = true
                }
              }else{
                this.noRecords = true
              }
        })
      }
    },
    handlePlay () {
      if(!this.isLogin){
        this.$message({
          message: this.$t("Please_login_first"),
          type: 'warning'
        })
        return false
      }
      if(this.rollTimes === 0){
        this.$message({
          message: this.$t("Please_get_your_number_is"),
          type: 'warning'
        })
        return false
      }
      if(!this.userInfoLoadFlag){
        this.$message({
          message: this.$t("Data_loading_please_click_on"),
          type: 'warning'
        })
        return false
      }
      if(this.clickFlag || this.moveFlag){
        return false
      }
      this.clickFlag = true
      this.steps = 0
      this.diceUrl = require("../../../assets/active/monopoly/dice_ani.gif")
      this.prizeWinDialog.changeCode = ''
      clearTimeout(window.rollTimer)
      clearTimeout(window.movetimer)
      this.$http(this.ApiSetting.active.monopoly.monopolyRoll)
        .then((res) => {
            if(res.status === 1){
              this.rollTimes --
              this.totalStep = res.data.step
              this.steps = res.data.step
              this.prizeWinDialog.prizeImgUrl = res.data.icon_url
              this.prizeWinDialog.prizeName = res.data.desc
              if(res.data.secret){
                this.prizeWinDialog.changeCode = res.data.secret
              }
              if(res.data.can_turntable){
                this.can_turntable = true
              }
              this.diceUrl = require("../../../assets/active/monopoly/dice_slow.gif")
              clearTimeout(window.rollTimer)
              window.rollTimer = setTimeout(() => {
                this.diceUrl = require("../../../assets/active/monopoly/dice_"+ this.steps +".png")
                this.clickFlag = false
                clearTimeout(window.movetimer)
                this.rollMove ()
              }, 1100)
            } else {
              this.diceUrl = require("../../../assets/active/monopoly/dice_1.png")
              this.clickFlag = false
            }

          }, (err) => {
              this.diceUrl = require("../../../assets/active/monopoly/dice_1.png")
              this.clickFlag = false
          })

    },
    rollMove () {
      if(this.steps > 0){
        this.moveFlag = true
        this.currentLastIndex = 0
        if(this.currentIndex + 1  >= this.rollPrizeList.length){
          this.currentIndex = this.currentIndex  - this.rollPrizeList.length + 1
          if(this.currentIndex === 0){
            if(this.can_turntable){
              this.hasLottery = true
            }
          }
        }else{
          this.currentIndex ++
        }
        this.steps --
        if(this.steps == 0){
          this.currentLastIndex = this.totalStep + this.lastIndex
          this.lastIndex = this.totalStep + this.lastIndex
          if(this.lastIndex + 1 >= this.rollPrizeList.length){
            this.currentLastIndex = this.lastIndex - this.rollPrizeList.length
          }
          if(this.currentLastIndex !== 0){
            setTimeout(() => {
              this.prizeWinDialog.visible = true
              this.loadPlayRecords ()
            }, 400)
          }
          this.moveFlag = false
          return false
        }
        clearTimeout(window.movetimer)
        window.movetimer = setTimeout(() => {
          this.rollMove ()
        }, 600)
      }
    },
    showLotteryBox (x) {
      if(this.hasLottery && x===0){
        this.lotteryDialog.visible = true
        this.start_rotating_degree_pointer = 0
        this.rotate_angle_pointer = 0
      }
    },
    rotate_handle() {
      if (!this.lottery_flag) return;
      var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
      var during_time = 6.5; // 默认为1s
      var rand_circle = Math.round(Math.random() * 10) + 6; //随机一个转圈数。至少6次以上
      this.lottery_flag = false; // 旋转结束前，不允许再次触发
      if (type == 0) {
        // 转动盘子
      /*  var rotate_angle =
          this.start_rotating_degree +
          rand_circle * 360 +
          result_angle[result_index] -
          this.start_rotating_degree % 360; // 这里为计算旋转的角度，考虑第一次旋转后的结果
        this.start_rotating_degree = rotate_angle;
        this.rotate_angle = "rotate(" + rotate_angle + "deg)";*/
        // // //转动指针,默认只旋转转盘，用户体验较好
        this.$http(this.ApiSetting.active.monopoly.monopolyTurn)
          .then((res) => {
            if(res.status === 1){
              let _this = this
              this.lotteryPrizeList.forEach((v, i) =>{
                if(v.id === res.data.id){
                  _this.lottery_index = i
                  let a = _this.runzp ()
                  let lastAngle = _this.start_rotating_degree_pointer + 360*rand_circle + a.angle
                  _this.rotate_angle_pointer = "rotate("+ lastAngle + "deg)"
                  _this.start_rotating_degree_pointer = lastAngle
                }
              })
              this.prizeWinDialog.prizeName = res.data.desc
              this.prizeWinDialog.prizeImgUrl = res.data.icon_url
              // 旋转结束后，允许再次触发
              setTimeout(() => {
                this.lottery_flag = true
                this.prizeWinDialog.visible = true
              }, during_time * 1000)
            }
          }, (err) => {

          })
      }
    },
    runzp () {
      var myreturn = new Object
      var lpAngle = []
      var n = 360 / this.lotteryPrizeList.length
      var angle0 = []
      for (var i = 0; i < this.lotteryPrizeList.length; i++) {
        angle0 = [n * i, n * (i + 1)]
        lpAngle.push(angle0)
      }

      var angle = this.randomnum(lpAngle[this.lottery_index][0], lpAngle[this.lottery_index][1]);
      myreturn.angle = angle
      return myreturn
    },
    randomnum (smin, smax) {
      var Range = smax - smin - 1
      var Rand = Math.random()
      return (smin + Math.round(Rand * Range) + 1)
    },
    handlePrizeWinHide () {
      this.prizeWinDialog.visible = false
      if(this.lotteryDialog.visible){
        this.lotteryDialog.visible = false
        this.hasLottery = false
      }
    }
  }
}
</script>
<style scoped>
.monopoly{
  background: url("../../../assets/active/monopoly/bg.jpg") no-repeat top center;
  padding-bottom: 60px;
}
.monopoly .wrapper{
  padding-top: 390px;
}
.monopoly .wrapper .step_content{
  width: 1052px;
  margin: 0 auto;
  position: relative;
  height: 1220px;
}
.monopoly .wrapper .step_box{
  width: 80px;
  height: 86px;
  line-height: 80px;
  position: absolute;
  background: url("../../../assets/active/monopoly/icons.png") no-repeat;
  background-position: -30px -628px;
  text-align: center;
}
.monopoly .wrapper .step_box .prize_text{
  display: none;
  text-align: center;
  line-height: normal;
  color: #311847;
  font-size: 12px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 2px;
}
.monopoly .wrapper .step_box .ontic_prize .prize_text{
  display: block;
}
.monopoly .wrapper .step_box  .box_prize_img{
  height: 52px;
  line-height: 52px;
  margin-top: 15px;
  text-align: center;
}
.monopoly .wrapper .step_box .ontic_prize .box_prize_img{
  height: 46px;
  line-height: 46px;
  margin-top: 10px;
}
.monopoly .wrapper .step_box .userhead_wrapper{
  display: none;
  position: absolute;
  top: -60px;
  left: 5px;
  width: 70px;
  height: 82px;
  background: url("../../../assets/active/monopoly/icons.png") no-repeat;
  background-position: -28px -419px;
}
.monopoly .wrapper .step_box .userhead_wrapper .img_box{
  position: absolute;
  left: 5px;
  top: 5px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  overflow: hidden;
  text-align: center;
  line-height: normal;
}
.monopoly .wrapper .step_box .userhead_wrapper .img_box img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  vertical-align: middle;
}
.monopoly .wrapper .step_box .box_img{
  height: 100%;
  max-width: 92%;
}
.monopoly .wrapper .step_box.active{
  background-position: -30px -722px;
}
.monopoly .wrapper .step_box.active .userhead_wrapper{
  display: block;
}
.monopoly .wrapper .step_box.selected{
   background-position: -30px -817px;
 }
.monopoly .wrapper .step_box.start{
  background-position: -30px -533px;
}
.monopoly .wrapper .start.has_lottery{
  background-position: -128px -533px;
  cursor: pointer;
}
.monopoly .wrapper .step_box .hand_ani{
  display: none;
}
.monopoly .wrapper .start.has_lottery .hand_ani{
  display: block;
  position: absolute;
  right: -16px;
  bottom: -28px;
  width: 70px;
  height: 70px;
  background: url("../../../assets/active/monopoly/icons.png") no-repeat;
  background-position: -218px -558px;
  z-index: 3;
  animation: handmove  0.8s linear infinite ;
}

.monopoly .wrapper .step_box.box-0{
  top: 0;
  left: 0;
}
.monopoly .wrapper .step_box.box-1{
  top: 0;
  left: 81px;
}
.monopoly .wrapper .step_box.box-2{
  top: 0;
  left: 162px;
}
.monopoly .wrapper .step_box.box-3{
  top: 0;
  left: 243px;
}
.monopoly .wrapper .step_box.box-4{
  top: 0;
  left: 324px;
}
.monopoly .wrapper .step_box.box-5{
  top: 0;
  left: 405px;
}
.monopoly .wrapper .step_box.box-6{
  top: 0;
  left: 486px;
}
.monopoly .wrapper .step_box.box-7{
  top: 0;
  left: 567px;
}
.monopoly .wrapper .step_box.box-8{
  top: 0;
  left: 648px;
}
.monopoly .wrapper .step_box.box-9{
  top: 0;
  left: 729px;
}
.monopoly .wrapper .step_box.box-10{
  top: 0;
  left: 810px;
}
.monopoly .wrapper .step_box.box-11{
  top: 0;
  left: 891px;
}
.monopoly .wrapper .step_box.box-12{
  top: 0;
  left: 972px;
}
.monopoly .wrapper .step_box.box-13{
  top: 83px;
  left: 972px;
}
.monopoly .wrapper .step_box.box-14{
  top: 166px;
  left: 972px;
}
.monopoly .wrapper .step_box.box-15{
  top: 249px;
  left: 972px;
}
.monopoly .wrapper .step_box.box-16{
  top: 332px;
  left: 972px;
}
.monopoly .wrapper .step_box.box-17{
  top: 415px;
  left: 972px;
}
.monopoly .wrapper .step_box.box-18{
  top: 498px;
  left: 972px;
}
.monopoly .wrapper .step_box.box-19{
  top: 581px;
  left: 972px;
}
.monopoly .wrapper .step_box.box-20{
  top: 664px;
  left: 972px;
}
.monopoly .wrapper .step_box.box-21{
   top: 747px;
   left: 972px;
}
.monopoly .wrapper .step_box.box-22{
  top: 830px;
  left: 972px;
}
.monopoly .wrapper .step_box.box-23{
  top: 913px;
  left: 972px;
}
.monopoly .wrapper .step_box.box-24{
  top: 996px;
  left: 972px;
}

.monopoly .wrapper .step_box.box-25{
  top: 1079px;
  left: 972px;
}
.monopoly .wrapper .step_box.box-26{
  top: 1079px;
  left: 891px;
}

.monopoly .wrapper .step_box.box-27{
  top: 1079px;
  left: 810px;
}
.monopoly .wrapper .step_box.box-28{
  top: 1079px;
  left: 729px;
}
.monopoly .wrapper .step_box.box-29{
  top: 1079px;
  left: 648px;
}
.monopoly .wrapper .step_box.box-30{
  top: 1079px;
  left: 567px;
}
.monopoly .wrapper .step_box.box-31{
  top: 1079px;
  left: 486px;
}
.monopoly .wrapper .step_box.box-32{
  top: 1079px;
  left: 405px;
}
.monopoly .wrapper .step_box.box-33{
  top: 1079px;
  left: 324px;
}
.monopoly .wrapper .step_box.box-34{
  top: 1079px;
  left: 243px;
}
.monopoly .wrapper .step_box.box-35{
  top: 1079px;
  left: 162px;
}
.monopoly .wrapper .step_box.box-36{
  top: 1079px;
  left: 81px;
}
.monopoly .wrapper .step_box.box-37{
  top: 1079px;
  left: 0;
  z-index: 4;
}
.monopoly .wrapper .step_box.box-38{
  top: 996px;
  left: 0;
  z-index: 3;
}
.monopoly .wrapper .step_box.box-39{
  top: 913px;
  left: 0;
  z-index: 2;
}
.monopoly .wrapper .step_box.box-40{
  top: 830px;
  left: 0;
}
.monopoly .wrapper .step_box.box-41{
  top: 830px;
  left: 81px;
}

.monopoly .wrapper .step_box.box-42{
  top: 830px;
  left: 162px;
}
.monopoly .wrapper .step_box.box-43{
  top: 830px;
  left: 243px;
}
.monopoly .wrapper .step_box.box-44{
  top: 830px;
  left: 324px;
}
.monopoly .wrapper .step_box.box-45{
  top: 830px;
  left: 405px;
}
.monopoly .wrapper .step_box.box-46{
  top: 830px;
  left: 486px;
}
.monopoly .wrapper .step_box.box-47{
  top: 830px;
  left: 567px;
}
.monopoly .wrapper .step_box.box-48{
  top: 830px;
  left: 648px;
}
.monopoly .wrapper .step_box.box-49{
  top: 830px;
  left: 729px;
}
.monopoly .wrapper .step_box.box-50{
  top: 830px;
  left: 810px;
  z-index: 9;
}
.monopoly .wrapper .step_box.box-51{
  top: 747px;
  left: 810px;
  z-index: 8;
}
.monopoly .wrapper .step_box.box-52{
  top: 664px;
  left: 810px;
  z-index: 7;
}
.monopoly .wrapper .step_box.box-53{
  top: 581px;
  left: 810px;
  z-index: 6;
}
.monopoly .wrapper .step_box.box-54{
  top: 498px;
  left: 810px;
  z-index: 5;
}
.monopoly .wrapper .step_box.box-55{
  top: 415px;
  left: 810px;
  z-index: 4;
}
.monopoly .wrapper .step_box.box-56{
  top: 332px;
  left: 810px;
  z-index: 3;
}
.monopoly .wrapper .step_box.box-57{
  top: 249px;
  left: 810px;
  z-index: 2;
}
.monopoly .wrapper .step_box.box-58{
  top: 166px;
  left: 810px;
}
.monopoly .wrapper .step_box.box-59{
  top: 166px;
  left: 729px;
}
.monopoly .wrapper .step_box.box-60{
  top: 166px;
  left: 648px;
}
.monopoly .wrapper .step_box.box-61{
  top: 166px;
  left: 567px;
}
.monopoly .wrapper .step_box.box-62{
  top: 166px;
  left: 486px;
}
.monopoly .wrapper .step_box.box-63{
  top: 166px;
  left: 405px;
}
.monopoly .wrapper .step_box.box-64{
  top: 166px;
  left: 324px;
}
.monopoly .wrapper .step_box.box-65{
  top: 166px;
  left: 243px;
}
.monopoly .wrapper .step_box.box-66{
  top: 166px;
  left: 162px;
}
.monopoly .wrapper .step_box.box-67{
  top: 249px;
  left: 162px;
}
.monopoly .wrapper .step_box.box-68{
  top: 332px;
  left: 162px;
}
.monopoly .wrapper .step_box.box-69{
  top: 415px;
  left: 162px;
}
.monopoly .wrapper .step_box.box-70{
  top: 498px;
  left: 162px;
}
.monopoly .wrapper .step_box.box-71{
  top: 581px;
  left: 162px;
}
.monopoly .wrapper .step_box.box-72{
  top: 664px;
  left: 162px;
}
.monopoly .wrapper .step_box.box-73{
  top: 664px;
  left: 81px;
}
.monopoly .wrapper .step_box.box-74{
  top: 664px;
  left: 0;
  z-index: 9;
}
.monopoly .wrapper .step_box.box-75{
  top: 581px;
  left: 0;
  z-index: 8;
}
.monopoly .wrapper .step_box.box-76{
  top: 498px;
  left: 0;
  z-index: 7;
}
.monopoly .wrapper .step_box.box-77{
  top: 415px;
  left: 0;
  z-index: 6;
}
.monopoly .wrapper .step_box.box-78{
  top: 332px;
  left: 0;
  z-index: 5;
}
.monopoly .wrapper .step_box.box-79{
  top: 249px;
  left: 0;
  z-index: 4;
}
.monopoly .wrapper .step_box.box-80{
  top: 166px;
  left: 0;
  z-index: 3;
}
.monopoly .wrapper .step_box.box-81{
  top: 83px;
  left: 0;
  z-index: 2;
}
.monopoly  .play_center {
  margin: 0 auto;
  padding-top: 310px;
  width: 430px;
  height: 430px;
  text-align: center;
  color: #fff;
  font-size: 18px;
}
.monopoly  .play_center .dice_box{
  width: 260px;
  height: 260px;
  margin: 0 auto;
  text-align: center;
}
.monopoly  .play_center .dice_box img{
  vertical-align: middle;
}
.monopoly  .play_center .play_btn{
  margin-top: 20px;
  position: relative;
}
.monopoly  .play_center .play_btn .mask{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.monopoly  .play_center .play_btn span{
  display: inline-block;
  cursor: pointer;
  width: 206px;
  height: 70px;
  background: url("../../../assets/active/monopoly/icons.png") no-repeat;
  background-position: -16px -212px;
  border-radius: 30px;
  transition: transform  0.3s;
}
.monopoly  .play_center .play_btn span:active{
  transform: scale(0.8);
}
.monopoly  .play_center .play_btn span:hover{
  background-position: -16px -304px;
}
.monopoly  .play_center .num{
  color: #ffe400;
}
.monopoly  .play_center p{
  line-height: 26px;
  margin: 8px 0;
}
.monopoly  .play_center .play_tips{
  font-size: 14px;
}
.monopoly .active_section{
  color: #a396f6;
}
.monopoly .active_section .content_box .title{
  margin-bottom: 20px;
}
.monopoly .active_section .content_box .title span{
  display: inline-block;
  height: 34px;
  width: 246px;
  background: url("../../../assets/active/monopoly/icons.png") no-repeat;
}
.monopoly .active_section .my_records .title span{
  background-position: -32px -940px;
}
.monopoly .active_section .active_rule .title span{
  background-position: -32px -989px;
}
.monopoly .active_section .get_chance .title span{
  background-position: -32px -1034px;
}
.active_section .records_content .content_box{
  float: left;
  width: 610px;
}
.active_section .records_content .content_box .content_table{
  box-sizing: border-box;
  border: 1px solid #292055;
}
.active_section .records_content .get_chance{
  margin-left: 18px;
}
.content_box .content_table .t_header{
  background-color: #191341;
  color: #5c5298;
  height: 54px;
  line-height: 54px;
}
.content_box .content_table .t_row{
  height: 50px;
  line-height: 50px;
}
.content_box .content_table .t_row.no_data{
  text-align: center;
   font-size: 18px;
}
.content_box .content_table .t_body .t_row:nth-child(odd){
  background-color: #292055;
}
.content_box .content_table .t{
  display: inline-block;
  padding: 0 25px;
  box-sizing: border-box;
  font-size: 16px;
  line-height: normal;
}
.monopoly .active_section .my_records .t1{
  width: 250px;
}
.monopoly .active_section .my_records .t2{
  width: 228px;
}
.monopoly .active_section .my_records .t3{
  width: 130px;
  text-align: right;
}
.monopoly .active_section .my_records .t3 img{
  max-height: 42px;
}

.monopoly .active_section .get_chance .t1{
  width: 220px;
}
.monopoly .active_section .get_chance .t2{
  width: 138px;
  text-align: center;
}
.monopoly .active_section .get_chance .t_body .t2,.monopoly .active_section .get_chance .t_body .t3{
  color: #ffdc04;
}
.monopoly .active_section .get_chance .t3{
  width: 250px;
  text-align: right;
}
.monopoly  .active_rule{
  margin-top: 40px;
}
.monopoly  .active_rule .content_section{
  margin-bottom: 20px;
}
.monopoly  .active_rule .content_section .content_section_title{
  font-weight: bold;
  font-size: 22px;
}
.monopoly  .active_rule .content_section p{
  margin-top: 8px;
  font-size: 14px;
  line-height: 20px;
}
</style>
<style>
  .monopoly .back_active_nav{
    text-align: center;
    margin-top: 60px;
  }
  .monopoly .back_active_nav .botton{
    height: 44px;
    line-height: 44px;
    width: 338px;
    font-size: 18px;
  }
  .monopoly_prize_win_dialog.el-dialog{
    border: none;
    width: 967px;
    box-sizing: border-box;
    padding: 80px 50px 20px;
    background: url("../../../assets/active/monopoly/prize_win_bg.png") no-repeat center top;
    top: 40px;
    text-align: center;
  }
  .monopoly_prize_win_dialog.el-dialog .el-dialog__header,.monopoly_lottery_dialog.el-dialog .el-dialog__header{
    display: none;
  }
  .monopoly_prize_win_dialog.el-dialog .prize_img_wrapper{
    height: 170px;
    text-align: center;
    line-height: 170px;
  }
  .monopoly_prize_win_dialog.el-dialog .prize_img_wrapper img{
    max-height: 100%;
    vertical-align: middle;
  }
  .monopoly_prize_win_dialog.el-dialog .win_tips{
    font-size: 34px;
    margin-top: 40px;
    height: 60px;
    line-height: 60px;
    color: #fff;
  }
  .monopoly_prize_win_dialog.el-dialog .exchange_code{
    font-size: 18px;
    color: #fff;
    padding: 5px 0;
  }
  .monopoly_prize_win_dialog.el-dialog .dialog_btn{
    margin-top: 40px;
  }
  .monopoly_prize_win_dialog.el-dialog .dialog_btn span{
    display: inline-block;
    background: url("../../../assets/active/monopoly/icons.png") no-repeat center top;
    cursor: pointer;
    width: 206px;
    height: 70px;
    background-position: -16px -22px;
  }
  .monopoly_prize_win_dialog.el-dialog .dialog_btn span:active{

  }
  .monopoly_prize_win_dialog.el-dialog .dialog_btn span:hover{
    background-position: -16px -114px;
  }

  .monopoly_lottery_dialog.el-dialog{
    border: none;
    width: 570px;
    background: none;
    box-shadow: none;
  }
  .monopoly_lottery_dialog.el-dialog .lottery_box{
    margin: 0 auto;
    position: relative;
    text-align: center;
  }
  .monopoly_lottery_dialog.el-dialog .lottery_box .lottery_lp{
    width: 504px;
    height: 504px;
  }
  .monopoly_lottery_dialog.el-dialog .lottery_box .lottery_lp img{
    vertical-align: middle;
  }
  .monopoly_lottery_dialog.el-dialog .lottery_box .lottery_play{
    width: 140px;
    height: 140px;
    position: absolute;
    top: 180px;
    left: 182px;
    transform-origin: center center;
  }
  .monopoly_lottery_dialog.el-dialog .lottery_box .lottery_play img{
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .monopoly_lottery_dialog.el-dialog .lottery_box .lottery_play .lottery_play_btn{
    cursor: pointer;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .monopoly_lottery_dialog.el-dialog .lottery_box  .lottery_close_btn{
    cursor: pointer;
    position: absolute;
    right: 40px;
    top: 20px;
    width: 58px;
    height: 58px;
    background: url("../../../assets/active/monopoly/close.png") no-repeat center;
  }
  @keyframes handmove {
    from {
      transform: translate3d(-2px, -10px, -2px);
    }
    to{
      transform: translate3d(0, 5px, 0);
    }
  }
</style>
