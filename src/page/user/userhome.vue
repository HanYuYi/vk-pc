<template>
  <div class="user_center inner_page">
    <div class="wrapper clearfix">
      <div class="user_center_index fl">
        <div class="user_info_box">
          <div class="top">
            <div class="user_head">
               <el-popover trigger="hover" placement="top"  v-if="userInfo.user_lever!=12">
                 <span   v-html="userExpShow"></span>
                <i-circle
                  slot="reference"
                  :percent="userLvPercent"
                  :size="userHeadCircleSet.size"
                  :stroke-color="userHeadCircleSet.strokeColor"
                  :trail-color="userHeadCircleSet.trailColor">
                  <img :src="userInfo.head_image"
                  onerror="this.src='/pc_static/defaultimg/headimg.png';this.onerror=null"
                  class="head_img" alt="">
                </i-circle>
              </el-popover>
              <i-circle
              v-else
                slot="reference"
                :percent="userLvPercent"
                :size="userHeadCircleSet.size"
                :stroke-color="userHeadCircleSet.strokeColor"
                :trail-color="userHeadCircleSet.trailColor">
                <img :src="userInfo.head_image"
                onerror="this.src='/pc_static/defaultimg/headimg.png';this.onerror=null"
                class="head_img" alt="">
              </i-circle>
              <div class="user_level" :class="'lv'+userInfo.user_lever"><span></span></div>
              <div class="user_name nickname ellips">
                <router-link to="/user/infosetting/">
                {{userInfo.nickname?userInfo.nickname:userInfo.username}}
                </router-link>
              </div>
              <div class="user_name  trueusername ellips">
                {{userInfo.username}}
              </div>
            </div>
          </div>
          <div class="btn">
            <el-popover
                        placement="bottom"
                        trigger="manual"
                        width="500"
                        popper-class="sign_popover"
                        v-model="signPopVisible">
              <div class="sign_popover_wrapper">
                <div class="close_btn" @click="signPopVisible=false"></div>
                <div class="success_tips">
                  {{$t("Sign_in_to_success")}}
                </div>
                <div class="sign_in_prize_List clearfix">
                  <div class="sign_in_prize_box fl" v-for="(item, index) in siginInPrizeList" :key="index" :class="{'current':item.cls}">
                    <div class="prize_text">{{$t("The_first")}}{{item.day}}{{$t("day")}} {{item.vb}}{{$t("The_coin")}}</div>
                  </div>
                  <!--<div class="sign_in_prize_box fl current">
                    <div class="prize_text">{{$t("The_first")}}{{$t("The_second")}}{{$t("day")}} 50{{$t("The_coin")}}</div>
                  </div>
                  <div class="sign_in_prize_box fl">
                    <div class="prize_text">{{$t("The_first")}}{{$t("three")}}{{$t("day")}} 100{{$t("The_coin")}}</div>
                  </div>-->
                </div>
                <div class="sign_in_rule">
                  {{$t("check_in_for_the")}}
                </div>
              </div>
              <span class="btn_wrapper" slot="reference">
                <span class="sigin_loader" v-if="signLoad"></span>
                <a href="javascript:;" class="d_btn"  :class="{'disabled':userInfo.has_sign, 'normal':!userInfo.has_sign}" @click="handleUserSignIn()" v-else>{{userInfo.has_sign?$t('Already_signed_in'):$t("Sign_in")}}</a>
              </span>
            </el-popover>

          </div>
          <div class="money_info clearfix">
            <div class="money_accout accout fl">
              <div class="num ellips">
                <span v-show="!userNMMoneyLoad">{{userMoney[0]}}.<i class="smalltxt">{{userMoney[1]}}</i></span>
                <span class="money_loading" v-show="userNMMoneyLoad"><i class="dot"></i><i class="dot"></i><i class="dot"></i></span>
              </div>
              <div class="money_name">{{$t("The_balance_RMB")}}</div>
              <div class="money_op_link btn">
                <router-link to="/user/finance/withdraw" class="el-button el-button-small">{{$t("withdrawal")}}</router-link>
                <router-link to="/user/finance/" class="el-button el-button--primary small finance_samll_forinstro">{{$t("top_up")}}</router-link>
              </div>
            </div>
            <div class="spliter fl"></div>
            <div class="vb_accout accout fl">
              <div class="num">
                <span v-show="!userVirtualMoneyLoad">{{formatNumberSplit(userVirtualMoney)}}</span>
                <span class="money_loading" v-show="userVirtualMoneyLoad"><i class="dot"></i><i class="dot"></i><i class="dot"></i></span>
              </div>
              <div class="money_name">{{$t("The_coin")}}</div>
              <div class="money_op_link btn">
                <router-link to="/vbmarket" class="el-button el-button--primary small">{{$t("shopping_mall")}}</router-link>
                <!-- <router-link to="/user/finance/exchange" class="el-button el-button--primary small">{{$t("exchange")}}</router-link> -->
              </div>
            </div>
          </div>
        </div>
        <div class="center_nav">
          <router-link  to="/user/" active-class="active" class="nav_box" exact>{{$t("An_overview_of_the_account")}}</router-link>
          <router-link  to="/user/finance/" active-class="active" class="nav_box">{{$t("Financial_center")}}</router-link>
          <router-link  to="/user/seo/" active-class="active" class="nav_box">{{$t("To_promote_sharing")}}</router-link>
          <router-link  to="/user/message/" active-class="active" class="nav_box">{{$t("News_bulletin")}}</router-link>
          <router-link  to="/user/task/" active-class="active" class="nav_box">{{$t("The_task_center")}}
            <span class="icon">
              <i class="task_count"
                 :class="{'disable': taskCount.finish === 0}"
                 v-if="taskCount.count>0">{{ countNum(taskCount.count)}}
              </i>
            </span>
          </router-link>
          <router-link  to="/user/package/" active-class="active" class="nav_box">{{$t("My_backpack")}}
            <span class="icon">
              <i class="task_count" v-if="taskCount.package_count > 0">{{countNum(taskCount.package_count)}}
              </i>
            </span>
          </router-link>
          <router-link  to="/user/infosetting/" active-class="active" :class="{'active': $route.name ==='infosetting'}" class="nav_box">{{$t("Personal_Settings")}}</router-link>
        </div>
      </div>
      <div class="user_center_content fl">
        <transition name="transitionRouter">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import {formatNumberSplit } from '../../utils/util'
import { mapState, mapGetters } from 'vuex'
import storage from '../../utils/storage'

export default {
  name: 'userhome',
  components: {},
  computed: {
    ...mapGetters(['userMoney', 'userNMMoneyLoad']),
    ...mapState([
      'userInfo',
      'userVirtualMoney',
      'userVirtualMoneyLoad',
      'lazyHead',
      'hostpotVisible',
      'currentInstroShow',
      'taskCount',
      'bindMobileNumberTip'
    ]),
    ...mapState({
      userLvPercent: state => {
        return parseFloat(state.userInfo.level_percent * 100)
        // return  state.userInfo.user_points
        //   ? Math.round(
        //       (state.userInfo.user_points / state.userInfo.point_max) * 100
        //     )
        //   : 0
      },
      userExpShow: state => {
        let text = ''
        if (state.userInfo.sign_upgrade_deposit == 1 && state.userInfo.sign_upgrade_bet == 0) {
          text = '升级存款 已满足' + '<br>升级流水还需 ' + state.userInfo.upgrade_need_bet
        } else
        if (state.userInfo.sign_upgrade_deposit == 0 && state.userInfo.sign_upgrade_bet == 1) {
          text = '升级存款还需 ' + state.userInfo.upgrade_need_deposit + '<br>升级流水 已满足'
        } else
        if (state.userInfo.sign_upgrade_deposit == 0 && state.userInfo.sign_upgrade_bet == 0) {
          text = '升级存款还需 ' + state.userInfo.upgrade_need_deposit + '<br>升级流水还需 ' + state.userInfo.upgrade_need_bet
        } else if (state.userInfo.sign_upgrade_deposit == 1 && state.userInfo.sign_upgrade_bet == 1) {
          text = '升级存款 已满足' + '<br>升级流水 已满足'
        }
        return text
        //  return state.userInfo.user_points + "/" + state.userInfo.point_max
      }
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.loadMoney()
      // vm.$store.dispatch('getUserInfo', {hideMsg: true})
    })
  },
  watch: {
    currentInstroShow (bool) {
      clearTimeout(this.fastTipTimer)
      this.fastTipTimer = setTimeout(() => {
        if (
          !bool &&
          !this.userInfo.first_login &&
          !this.hostpotVisible &&
          !this.userInfo.tel &&
          (+this.userInfo.register_type === 1 || +this.userInfo.register_type === 0) &&
          !JSON.parse(storage.get(`to_user_page_count_${this.userInfo.user_id}`))
        ) {
          this.$store.commit('setBindMobileNumberTip', { pointOfTime: 1, visible: true })
          storage.set(`to_user_page_count_${this.userInfo.user_id}`, '1')
          clearTimeout(this.fastTipTimer)
        }
      }, 2000)
    },
    hostpotVisible (bool) {
      if (
        !bool &&
        !this.userInfo.first_login &&
        !this.currentInstroShow &&
        !this.userInfo.tel &&
        (+this.userInfo.register_type === 1 || +this.userInfo.register_type === 0) &&
        !JSON.parse(storage.get(`to_user_page_count_${this.userInfo.user_id}`))
      ) {
        this.$store.commit('setBindMobileNumberTip', { pointOfTime: 1, visible: true })
        storage.set(`to_user_page_count_${this.userInfo.user_id}`, '1')
      }
    }
  },
  data () {
    return {
      userHeadCircleSet: {
        size: 108,
        strokeColor: '#07f1b7',
        trailColor: '#20514d'
      },
      signPopVisible: false,
      minVb: 10,
      maxVb: 30,
      siginInPrizeList: {},
      signLoad: false,
      fastTipTimer: null
    }
  },
  mounted () {
    if (
      !this.hostpotVisible &&
      !this.currentInstroShow &&
      !this.userInfo.tel &&
      !this.userInfo.first_login &&
      (+this.userInfo.register_type === 1 || +this.userInfo.register_type === 0) &&
      !JSON.parse(storage.get(`to_user_page_count_${this.userInfo.user_id}`))
    ) {
      this.$store.commit('setBindMobileNumberTip', { pointOfTime: 1, visible: true })
      storage.set(`to_user_page_count_${this.userInfo.user_id}`, '1')
    }
  },
  methods: {
    countNum (number) {
      return Number(number) > 99 ? '99+' : number
    },
    formatNumberSplit (num) {
      let str = formatNumberSplit(num)
      return str.substring(0, str.length - 3)
    },
    loadMoney () {
      this.$store.dispatch('getUserMoeny', 'NM')
      this.$store.dispatch('getUserVirtualMoney')
    },
    handleUserSignIn () {
      if (this.userInfo.has_sign) {
        return false
      }
      this.signLoad = true
      this.$http(this.ApiSetting.user.signIn).then(
        res => {
          if (res.status === 1) {
            let day = res.data.day
            let vb = res.data.vb
            this.siginInPrizeList = {
              first: { day: day - 1, cls: false, vb: this.maxVb },
              secend: { day: day, cls: true, vb: this.maxVb },
              third: { day: day + 1, cls: false, vb: this.maxVb }
            }
            if (day === 1) {
              this.siginInPrizeList = {
                first: { day: day, cls: true, vb: vb },
                secend: { day: day + 1, cls: false, vb: vb * (day + 1) },
                third: { day: day + 2, cls: false, vb: this.maxVb }
              }
            } else if (day === 2) {
              this.siginInPrizeList.first.vb = this.minVb
              this.siginInPrizeList.secend.vb = this.minVb * day
            } else if (day === 3) {
              this.siginInPrizeList.first.vb = this.minVb * (day - 1)
            }
            this.signPopVisible = true
            this.userInfo.has_sign = true
            let newInfo = this.userInfo
            newInfo.has_sign = true
            this.$store.commit('updateUserInfo', newInfo)
            this.$store.dispatch('getUserVirtualMoney')
          }
          this.signLoad = false
        },
        err => {
          this.signLoad = false
        }
      )
    }
  }
}
</script>
<style lang="less" scoped>
  .user_center {
    padding-bottom: 60px;
    .wrapper {
      padding: 0;
      margin-top: 40px;
      background-color: #262933;
    }
  }
  .user_center_index {
    width: 295px;
    background-color: #262933;
    box-sizing: border-box;
    .user_info_box {
      text-align: center;
      .top {
        padding: 20px 20px 16px;
        .user_head {
          .head_img {
            border-radius: 50%;
            height: 96px;
            width: 96px;
          }
        }
        .user_level {
          margin-top: 8px;
        }
        .user_name {
          color: #fff;
          margin-top: 10px;
          width: 100%;
          &.nickname {
            font-size: 18px;
          }
          &.trueusername {
            font-size: 14px;
            color: #7c839f;
          }
        }
      }
      .btn {
        .btn_wrapper {
          display: inline-block;
          height: 32px;
          .sigin_loader {
            display: inline-block;
            width: 120px;
            height: 32px;
            vertical-align: top;
            background: url("../../assets/btn_loader.gif") no-repeat center;
          }
        }
      }
      .money_info {
        padding: 0 5px;
        margin-top: 30px;
        .spliter {
          height: 70px;
          width: 1px;
          background-color: #484d5e;
          margin: 0 5px;
        }
        .accout {
          width: 137px;
          text-align: center;
          .num {
            color: #fff;
            font-family: vkFont;
            font-size: 20px;
            height: 22px;
            line-height: 22px;
            .smalltxt {
              font-size: 12px;
            }
          }
          .money_name {
            height: 22px;
            line-height: 22px;
          }
          .money_op_link {
            line-height: 30px;
            height: 30px;
            margin-top: 5px;
            a {
              margin: 0 5px;
            }
          }
        }

      }
    }
    .center_nav {
      margin-top: 80px;
      .nav_box {
        height: 59px;
        line-height: 59px;
        box-sizing: border-box;
        padding-left: 50px;
        color: #fff;
        font-size: 18px;
        display: inline-block;
        width: 100%;
        position: relative;
        &.active {
          background: url("../../assets/icon_es.png") no-repeat;
          background-position: -769px -275px;
          &:after {
            content: "";
            position: absolute;
            display: block;
            right: -16px;
            top: 50%;
            border: 8px solid transparent;
            border-left-color:   #262933;
            z-index: 2;
            transform: translateY(-50%);
          }
          &:hover {
            color: #fff;
          }
        }
        &:hover {
          color: #07f1b7;
        }

        .icon {
          width: 100%;
          height: 66px;
          position: relative;
          background-position: -680px -307px;
        }
        .task_count {
          position: absolute;
          width: 26px;
          height: 26px;
          top: 0;
          right: -40px;
          border-radius: 50%;
          color: #fff;
          line-height: 26px;
          text-align: center;
          background-color: #e34d12;
          box-sizing: border-box;
          font-size: 14px;
          &.disable {
            line-height: 24px;
            border: 1px solid #e34d12;
            background-color: #262933;
          }
        }
      }
    }
  }
  .user_center_content {
    width: 944px;
    box-sizing: border-box;
    min-height: 1000px;
    margin-left: 1px;
    background: #262933 url("../../assets/user/user_shadow.png") repeat-y left top;
  }
</style>

<style lang="less">
.set_box_list {
  .box_icon {
    span {
      display: inline-block;
      width: 30px;
      height: 30px;
      vertical-align: middle;
      background: url("../../assets/icon_es.png") no-repeat;
    }
  }
  .login_pwd {
    .box_icon {
      span {
        background-position: -775px -150px;
      }
    }
  }
  .traders_pwd {
    .box_icon {
      span {
        background-position: -814px -150px;
      }
    }
  }
  .bind_phone {
    .box_icon {
      span {
        background-position: -853px -150px;
      }
    }
  }
  .bind_card {
    .box_icon {
      span {
        background-position: -893px -150px;
      }
    }
  }
  .pwd_protection {
    .box_icon {
      span {
        background-position: -932px -150px;
      }
    }
  }
  .bind_steam {
    .box_icon {
      span {
        background-position: -971px -150px;
      }
    }
  }
}
.user_center_content {
  .user_section {
    .user_section_title {
      font-family: vkFont;
      font-size: 36px;
      padding: 0 60px;
      height: 110px;
      line-height: 110px;
      color: #fff;
      font-weight: normal;
      position: relative;
    }
  }
}
.user_records_title {
  font-size: 18px;
  color: #fff;
  span {
    font-size: 12px;
    color: #484d5e;
    margin-left: 10px;
  }
}
.user_records {
  .records_list {
    padding-top: 15px;
    .t-body {
      font-size: 14px;
    }
    .t-table {
      .t-row {
        padding: 0;
      }
      .t1 {
        width: 250px;
        text-align: left;
      }
      .t2 {
        width: 250px;
        text-align: left;
      }
      .t3 {
        width: 324px;
        text-align: left;
      }
    }
  }
}
.user_section_content_nav {
  border-bottom: 1px solid #17191f;
  padding-left: 60px;
  .nav_box {
    min-width: 46px;
    text-align: center;
    height: 68px;
    line-height: 68px;
    position: relative;
    font-size: 18px;
    margin-right: 50px;
    cursor: pointer;
    float: left;
    transition: color 0.2s ease;
    &:hover {
      color: #07f1b7;
    }
    &.actived {
      color: #07f1b7;
      &:after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 100%;
        height: 4px;
        background: url("../../assets/list_select.png") no-repeat center;
        background-size: 100% 100%;
        animation: aw linear 0.3s;
      }
    }
  }
}
.user_section_content {
  .inner_content {
    padding: 20px 60px;
    .radio_nav {
      line-height: 60px;
      .ivu-radio-wrapper {
        margin-right: 40px;
      }
    }
  }
}

.confirm_step {
  .confirm_box {
    min-height: 40px;
    line-height: 40px;
    .left {
      display: inline-block;
      color: #7c839f;
      text-align: right;
      width: 80px;
      margin-right: 20px;
      vertical-align: top;
    }
    .right {
        display: inline-block;
      color: #fff;
      font-size: 18px;
    }
    &.confirm_box_multrows {
      .left {
        line-height: 26px;
      }
      .right {
        width: 260px;
        word-break: break-all;
        line-height: normal;
      }
    }
  }
  .btn {
    margin-top: 20px;
  }
}

.accout_main {
  .accout_box {
    .accout_title {
      line-height: 40px;
      .icon {
        display: inline-block;
        background: url("../../assets/icon_es.png") no-repeat;
        vertical-align: middle;
        margin-right: 12px;
      }
      b {
        font-family: vkFont;
        font-size: 30px;
        font-weight: normal;
        vertical-align: middle;
        color: #fff;
      }
    }
    .money_num {
      font-size: 32px;
      color: #7c839f;
      line-height: 50px;
      height: 50px;
      overflow: hidden;
      .num {
        color: #fff;
        font-family: vKFont;
        font-size: 36px;
        b {
          font-weight: normal;
        }
      }
      i {
        &.float {
          font-size: 24px;
        }
      }
    }
  }
  .accout_money {
    .accout_title {
      .icon {
        width: 44px;
        height: 32px;
        background-position: -1197px -220px;
      }
    }
  }
  .accout_vb {
    .accout_title {
      .icon {
        width: 42px;
        height: 42px;
        background-position: -1269px -215px;
      }
    }
  }
}
.sub_section {
  margin-top: 50px;
}
.sub_section_title {
  height: 40px;
  line-height: 40px;
  a {
    vertical-align: middle;
  }
  .title_name {
    color: #fff;
    font-family: vkFont;
    font-size: 30px;
    margin-left: 10px;
    vertical-align: middle;
  }
  .sub_title_mark {
    display: inline-block;
    background-color: #07f1b7;
    width: 6px;
    height: 22px;
    vertical-align: middle;
  }
  .title_tips {
    margin-left: 10px;
    line-height: 30px;
    vertical-align: bottom;
  }
}
.sub_section_content {
  margin-top: 5px;
}
.game_wallet {
  .game_wallet_list {
    margin-right: -20px;
    min-height: 110px;
    .wallet_box {
      margin: 10px 20px 10px 0;
      font-size: 14px;
      padding: 20px;
      box-shadow: 0 0 50px 1px rgba(0, 0, 0, 0.5);
      position: relative;
      cursor: default;
      .wallet_name {
        color: #fff;
        line-height: 22px;
        height: 22px;
      }
      .wallet_money {
        height: 26px;
        line-height: 26px;
        margin-top: 3px;
        .num {
          color: #fff;
          font-family: vkFont;
          font-size: 20px;
          margin-left: 5px;
          b {
            font-weight: normal;
          }
          i {
            &.float {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
.game_wallet_list {
  .wallet_box {
    .refresh_btn {
      display: none;
      position: absolute;
      cursor: pointer;
      top: 50%;
      margin-top: -10px;
      right: 20px;
      width: 22px;
      height: 20px;
      background: url("../../assets/icon_es.png") no-repeat;
      background-position: -888px -43px;
      &:hover {
        background-position: -888px -88px;
      }
    }
  }
}
.transfer {
  .game_wallet_list {
    .wallet_box {
      .refresh_btn {
        display: block;
      }
    }
  }
}
.sign_popover {
  padding: 0;
}
.sign_popover_wrapper {
  height: 280px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  .close_btn {
    width: 30px;
    height: 30px;
    position: absolute;
    z-index: 2;
    right: 10px;
    top: 10px;
    background: url("../../assets/icon_es.png") no-repeat;
    background-position: -834px -38px;
    cursor: pointer;
    &:hover {
      background-position: -834px -83px;
    }
  }
  .success_tips {
    font-family: vkFont;
    font-size: 30px;
    color: #07f1b7;
    height: 34px;
    line-height: 34px;
    text-align: center;
    position: absolute;
    width: 100%;
    top: 24px;
  }
  .sign_in_rule {
    height: 42px;
    line-height: 42px;
    background-color: #262933;
    text-align: center;
  }
}
.sign_in_prize_List {
  padding-top: 32px;
  height: 206px;
  .sign_in_prize_box {
    opacity: 0.2;
    height: 100%;
    width: 159px;
    background: url("../../assets/user/sigin_in_coin.png") no-repeat;
    background-size: 100% auto;
    background-position: center 16px;
    .prize_text {
      color: #fff;
      font-size: 14px;
      text-align: center;
      margin-top: 154px;
    }
    &.current {
      opacity: 1;
      width: 180px;
      background-position: center top;
      .prize_text {
        font-size: 18px;
        margin-top: 158px;
      }
    }
  }
}
/*----发送验证码----*/
.send_ver_code {
  position: relative;
  .sent_btn {
    right: 1px;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    display: inline-block;
    box-sizing: border-box;
    height: 30px;
    line-height: 30px;
    width: 80px;
    text-align: center;
    color: #000;
    border-radius: 30px;
    background: url("../../assets/d_btn.png") no-repeat center;
    background-size: 100% 100%;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      color: #fff;
      background: url("../../assets/d_btn_hover.png") no-repeat center;
    }
  }
  .sent_btn.disabled {
    color: #fff;
    background: none;
    cursor: default;
  }
  input {
    flex:auto;
    height: 34px;
    line-height: 35px;
    background-color: transparent;
    border: 0;
    outline: 0;
    border-radius: 18px;
    color: #fff;
  }
}
/*--c提现和银行卡管理的  银行卡列表--*/
.card_info {
  overflow: hidden;
  .card_list {
    margin-right: -20px;
  }
  .bank_card {
    height: 120px;
    width: 260px;
    border-radius: 3px;
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    overflow: hidden;
    box-shadow: 0px 2px 20px 0 rgba(0, 0, 0, 0.4);
    &:nth-child(3n) {
      margin-right: 0;
    }
    &.default{
      .setdefault {
        cursor: default;
      }
      &:hover .setdefault {
        opacity: 0;
      }
    }
    &:hover .setdefault{
      opacity: 1;
      transition: opacity 0.2s;
    }
    .detault_mask {
      position: absolute;
      z-index: 2;
      top: 0;
      right: 0;
      width: 46px;
      height: 20px;
      border-bottom-left-radius: 10px;
      background-color: rgba(80, 87, 108,0.8);
      color: #fff;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
    }
    .setdefault {
      position: absolute;
      z-index: 1;
      width:100%;
      height: 100%;
      top: 0;
      left: 0;
      background:rgba(0,0,0,0.8);
      text-align: center;
      line-height: 120px;
      color: #fff;
      cursor: pointer;
      opacity: 0;
    }
    .bank_card_info {
      height: 40px;
      line-height: 40px;
    }
    .bank_icon {
      width: 30px;
      height: 30px;
      background: #fff;
      border: 4px solid #fff;
      border-radius: 50%;
    }
    .bank_name {
      display: inline-block;
      margin-left: 10px;
      font-size: 18px;
      color: #fff;
      vertical-align: middle;
    }
    .bank_account {
      margin-top: 24px;
      color: #fff;
      font-size: 20px;
      line-height: 26px;
      height: 26px;
      font-weight: bold;
      font-family: vkFont;
      letter-spacing: 0.4px;
    }
    .vb_account {
      white-space: normal;
      word-break: break-all;
      color: #262933;
      margin-top: 16px;
      line-height: 1;
    }
    .svg_wrapper {
      position: absolute;
      top: 30px;
      left: 140px;
      z-index: 0;
      width: 110px;
      height: 110px;
      opacity: 0.22;
    }
  }
  .chosen_bank_card {
    height: 102px;
    width: 160px;
    border-radius: 3px;
    overflow: hidden;
  }
  .add_card {
    float: left;
    height: 120px;
    width: 260px;
    line-height: 120px;
    box-sizing: border-box;
    border-radius: 3px;
    border: 1px dashed #7c839f;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    span {
      vertical-align: middle;
      margin-left: 12px;
      color: #7c839f;
    }
  }
}

@keyframes aw {
  0% {
    width: 0%;
    left: 50%;
  }
  100% {
    width: 100%;
    left: 0;
  }
}
</style>
