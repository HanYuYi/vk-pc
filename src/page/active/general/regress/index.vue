<template>
  <div class="regress-page" v-cloak>
    <div class="nav-wrapper d-flex justify-center align-center">
      <div :data-text="item.name" @click="activeType = item.type"
       :class="[`nav-tab-${item.key}`, { 'nav-tab-active': item.type === activeType }]" 
       class="nav-tab d-flex justify-center align-center"
       v-for="(item, i) in navMenu" :key="i + item.key">
        <span class="tab-name">{{item.name}}</span>
        <span class="light"><i></i></span>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="activeType === 1" key="login">
        <regress-template
        :btn-status="returnLoginStatus.status"
        :initloading="loading"
        :active-type="activeType"
        :table-title="loginTableTitle"
        :table-data="loginTable"
        :activeTime="initData.active_show_time"
        @getbonus="getbonus"
        >
          <span slot="desc">威客电竞回馈老会员，现老会员回归后可免费申请对应VIP等级彩金，机会不可错过，赶快领取啦~</span>
          <td slot="rowspan" rowspan="12">3倍全站有效流水</td>
          <div v-if="returnLoginStatus.status == 2 && isLogin" class="regress-desc text-center font-16">
            您不符合回归玩家领取条件
          </div>
          <ol slot="gz">
            <li>
              老会员判定标准：<br />
              -最近30天无存款，无投注，且周期前(30天前)历史累计存款≥2,000元或累计有效投注≥5,000元;<br />
              例如：用户申请时间为9月1日，则用户需在8月2日-8月31日期间无存款，无投注，并且在8月2日之前历史累计存款≥2,000元或累计有效投注≥5,000元。
            </li>
            <li>此活动礼金每位符合条件的用户，在每个活动周期内仅可领取一次；活动更新周期为：从用户回归时算起满6个月重置，VIP等级以会员领取时的等级进行计算。</li>
            <li>符合条件的每位老会员，需自行在本优惠活动页面里点击“立即申请”按钮，彩金成功领取后，系统将会自动派发且添加至用户的主钱包中；并需要完成此活动规定的3倍全站有效流水。</li>
            <li>电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui :style-class="'regress-ptbox'" :color="'#0ee9e5'"></activeptliushui>。
            </li>
            <li>
              每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。
            </li>
          </ol>
        </regress-template>
      </div>
      <div v-if="activeType === 2" key="first">
        <regress-template
        :btn-status="returnFirstStatus.status"
        :initloading="loading"
        :active-type="activeType"
        :table-title="firstTableTitle"
        :table-data="firstTable"
        :activeTime="initData.active_show_time"
        @getbonus="getbonus"
        >
          <span slot="desc">活动期间，回归老会员完成首存≥500元，可申请对应档位的彩金，最高可领1,888元。</span>
          <td slot="rowspan" rowspan="7">(本金+彩金)x5<br />全站有效流水</td>
          <ol slot="gz">
            <li>
              老会员判定标准：<br />
              -最近30天无存款，无投注，且周期前(30天前)历史累计存款≥2,000元或累计有效投注≥5,000元;<br />
              例如：用户申请时间为9月1日，则用户需在8月2日-8月31日期间无存款，无投注，并且在8月2日之前历史累计存款≥2,000元或累计有效投注≥5,000元。
            </li>
            <li>此活动礼金每位符合条件的用户，在每个活动周期内仅可领取一次；活动更新周期为：从用户回归时算起满6个月重置；每日未发起提款前的存款都视为首充。</li>
            <li>符合条件的老会员存款后可在本优惠活动页面上点击“立即领取” 按钮，系统将自动判定该会员自活动开始后的最近一笔有效存款，对应的彩金将自动添加至用户的主钱包中；会员在申请此优惠时，账户主钱包余额需 ≥ 最近的一笔存款金额。</li>
            <li>彩金需完成活动规定（存款本金+彩金）x5倍的全站有效流水，当会员钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。</li>
            <li>此活动领取当天不与平台的其他首存款类活动共享，每位会员每日仅可申请一次首存活动。</li>
            <li>电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui :style-class="'regress-ptbox'" :color="'#0ee9e5'"></activeptliushui></li>
            <li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
          </ol>
        </regress-template>
      </div>
      <div v-if="activeType === 3" key="second">
        <regress-template
        :btn-status="returnSecondStatus.status"
        :initloading="loading"
        :active-type="activeType"
        :table-title="againTableTitle"
        :table-data="secondTable"
        :activeTime="initData.active_show_time"
        @getbonus="getbonus"
        >
          <span slot="desc">活动期间，回归老会员完成再存≥500元，可申请对应档位的彩金，最高可领1888元。</span>
          <td slot="rowspan" rowspan="7">(本金+彩金)x12<br/>全站有效流水</td>
          <ol slot="gz">
            <li>
              老会员判定标准：<br />
              -最近30天无存款，无投注，且周期前(30天前)历史累计存款≥2,000元或累计有效投注≥5,000元;<br />
              例如：用户申请时间为9月1日，则用户需在8月2日-8月31日期间无存款，无投注，并且在8月2日之前历史累计存款≥2,000元或累计有效投注≥5,000元。
            </li>
            <li>此活动礼金每位符合条件的用户，在每个活动周期内仅可领取一次；活动更新周期为：从用户回归时算起满6个月重置。</li>
            <li>符合条件的老会员再存≥500元，可在本优惠活动页面上点击“立即领取” 按钮，彩金成功领取后，对应的彩金将自动添加至用户的主钱包中。</li>
            <li>彩金需完成活动规定（存款本金+彩金）x12倍的全站有效流水，当会员钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。</li>
            <li>此活动领取当天不与平台的其他再存款类活动共享，每位会员每日仅可申请一次再存活动。</li>
            <li>电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui :style-class="'regress-ptbox'" :color="'#0ee9e5'"></activeptliushui>。
            </li>
            <li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
          </ol>
        </regress-template>
      </div>
    </transition>
    <div class="regress-btn back-btn" @click="$router.push('/active')">回到活动首页</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RegressTemplate from './RegressTemplate.vue'
export default {
  name: 'regress',
  components: {
    RegressTemplate
  },
  computed: {
    ...mapState(['isLogin']),
    loading() {
      return this.btnLoading || this.initLoading
    }
  },
  data() {
    return {
      btnLoading: false,
      initLoading: false,
      initData: {},
      returnLoginStatus: {
        status: 0, // 状态： 0  可领   1 已领取 2 昨日未达到领取条件 *** 其他状态
        status_tips: ''
      },
      returnFirstStatus: {
        status: 0,
        status_tips: ''
      },
      returnSecondStatus: {
        status: 0,
        status_tips: ''
      },
      activeType: 1,
      navMenu: [
        { key: 'login', type: 1, name: '回归登录礼包' },
        { key: 'firstdepo', type: 2, name: '回归首存送' },
        { key: 'againdepo', type: 3, name: '回归再存加码' }
      ],
      loginTableTitle: [
        { label: '等级需求' },
        { label: '回归彩金(￥)' },
        { label: '流水要求' }
      ],
      firstTableTitle: [
        { label: '首存金额(￥)' },
        { label: '返利彩金(￥)' },
        { label: '流水要求' }
      ],
      againTableTitle: [
        { label: '再存金额(￥)' },
        { label: '返利彩金(￥)' },
        { label: '流水要求' }
      ],
      loginTable: [
        { first: 'Lv1', second: '8' },
        { first: 'Lv2', second: '18' },
        { first: 'Lv3', second: '38' },
        { first: 'Lv4', second: '58' },
        { first: 'Lv5', second: '88' },
        { first: 'Lv6', second: '188' },
        { first: 'Lv7', second: '388' },
        { first: 'Lv8', second: '588' },
        { first: 'Lv9', second: '888' },
        { first: 'Lv10', second: '1,088' },
        { first: 'Lv11', second: '1,288' },
        { first: 'Lv12', second: '1,688' },
      ],
      firstTable: [
        { first: '≥500', second: '38' },
        { first: '≥1,000', second: '58' },
        { first: '≥3,000', second: '88' },
        { first: '≥5,000', second: '188' },
        { first: '≥10,000', second: '388' },
        { first: '≥50,000', second: '888' },
        { first: '≥100,000', second: '1,888' }
      ],
      secondTable: [
        { first: '≥500', second: '38' },
        { first: '≥1,000', second: '58' },
        { first: '≥3,000', second: '88' },
        { first: '≥5,000', second: '188' },
        { first: '≥10,000', second: '388' },
        { first: '≥50,000', second: '888' },
        { first: '≥100,000', second: '1,888' }
      ],
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.initLoading) {
        return
      }
      this.initLoading = true
      this.$http(this.ApiSetting.active.regress.init)
        .then(res => {
          this.initLoading = false
          console.log('老会员回归初始化数据', res)
          if (res.status == 1 && res.data) {
            this.initData = res.data
            this.returnLoginStatus = res.data.regress_login
            this.returnFirstStatus = res.data.first_deposit
            this.returnSecondStatus = res.data.second_deposit
          }
        })
        .catch(err => {
          this.initLoading = false
        })
    },
    // 领取奖励
    getbonus(btnstatus) {
      if (this.btnLoading || btnstatus) {
        return
      }
      if (!this.isLogin) {
        return this.$message({ message: '请您先登录', type: 'warning' })
      }
      this.btnLoading = true
      this.$http(this.ApiSetting.active.regress.join, {
        type: this.activeType
      })
        .then(res => {
          console.log('领取了', res)
          this.btnLoading = false
          if (res.status == 1) {
            if (this.activeType == 1) {
              this.returnLoginStatus.status = 1
            }
            if (this.activeType == 2) {
              this.returnFirstStatus.status = 1
            }
            if (this.activeType == 3) {
              this.returnSecondStatus.status = 1
            }
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.init()
          }
        })
        .catch(err => {
          this.btnLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes light {
  0% {
    left: -180px;
  }

  25% {
    left: 460px;
  }

  100% {
    left: 460px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all .2s;
}

.fade-enter,
.fade-leave-to {
  transform: translateY(40px);
}
.regress-page {
  min-height: 100vh;
  background-image: url("~@/assets/active/regress/bg.png"), url('~@/assets/active/regress/banner.png'), linear-gradient(0deg, #00b0ba, #0094c1 53%, #0094c1);
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position: center 574px, center top, center top;
  padding-top: 555px;
  // padding-bottom: 56px;
  overflow: hidden;
  position: relative;
  color: #fff;
  .nav-tab {
    margin-bottom:40px;
    cursor: pointer;
    user-select: none;
    width: 356px;
    height: 108px;
    background: url('~@/assets/active/regress/nav-bg.png') no-repeat center;
    background-size: contain;
    line-height: 1;
    font-size: 29px;
    font-weight: bold;
    color: #eefaff;
    text-shadow: 0.3px 2px 6px #002935;
    margin-right: 6px;
    position: relative;
    overflow: hidden;
    &.nav-tab-login {
      .light {
        i {
          animation: light 3s 2s linear infinite;
        }
      }
    }
    &.nav-tab-firstdepo {
      .light {
        i {
          animation: light 3s 2.5s linear infinite;
        }
      }
    }
    &.nav-tab-againdepo {
      .light {
        i {
          animation: light 3s 3s linear infinite;
        }
      }
    }
    .light {
      cursor: pointer;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
  
      i {
        position: absolute;
        left: -200px;
        top: 0;
        width: 180px;
        height: 100%;
        transform: skewx(-25deg);
        background-image: linear-gradient(269deg, rgba(255, 219, 157, 0), rgba(255, 255, 255, 0.15), rgba(255, 219, 157, 0));
      }
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('~@/assets/active/regress/nav-active-bg.png') no-repeat;
      background-size: contain;
      background-position-x: -356px;
      transition: background .3s ease;
    }
    &::after {
      position: absolute;
      content: attr(data-text);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transform: translateY(35%);
      transition: 0.25s ease-out;
    }
    span {
      position: relative;
      &.tab-name {
        transition: 0.75s 0.1s cubic-bezier(0.19, 1, 0.22, 1);
      }
    }
    &:last-child {
      margin-right: 0;
    }
    &:hover,
    &.nav-tab-active {
      &::before {
        background-position: 100% 100%;
      }
      .tab-name {
        opacity: 0;
        transform: translateY(-25%);
        transition: 0.25s ease-out;
      }
      &::after {
        opacity: 1;
        transform: translateY(0);
        transition: 0.75s 0.1s cubic-bezier(0.19, 1, 0.22, 1);
      }
    }
  }
  /deep/.regress-btn {
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto 45px;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    text-shadow: 0px 2px 4px rgba(154, 154, 154, 0.65);
    font-weight: bold;
    &.btn-loading-wrapper {
      width: 242px;
      height: 65px;
    }
  
    &.join-btn {
      width: 242px;
      height: 65px;
      font-size: 25px;
      letter-spacing: 0.63px;
      background-image: url('~@/assets/active/regress/normal.png');
  
      &:hover {
        background-image: url('~@/assets/active/regress/hover.png');
        color: #d0f7ff;
      }
  
      &.btn-disable {
        cursor: not-allowed;
        background-image: url('~@/assets/active/regress/disabled.png');
        color: #eaeaea;
      }
    }
  
    &.back-btn {
      margin-top: 50px;
      font-size: 18px;
      width: 240px;
      letter-spacing: 1.35px;
      height: 50px;
      box-shadow: 0.3px 2px 6px 0 rgba(0, 41, 53, 0.54);
      background-image: linear-gradient(to top, #0095bc, #00e7e2);
  
      &:hover {
        background-image: linear-gradient(to bottom, #0095bc, #00e7e2);
        color: #d1fffe;
      }
    }
  }
  /deep/.regress-desc {
    font-size: 14px;
    line-height: 1;
    margin-top: 20px;
  }
}
</style>
<style lang="less">
.regress-ptbox {
  border-color: #0ee9e5;
  th {
    color: #0ee9e5 !important;
  }
}
</style>