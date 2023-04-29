<template>
  <div class="usdt-deposit">


    <!-- 活动时间-->
    <h1 class="active-date">{{ initInfo.active_show_time }}</h1>

    <!-- 描述区-->
    <div class="desc-panel">
      <div class="desc">
        <p>USDT作为当前最为安全与高效的数字货币，您值得拥有<router-link to="/guide/16-3">查看充值教程</router-link></p>
      </div>
      <router-link to="/user/finance" class="deposit"><span>USDT充值</span></router-link>
    </div>

    <!-- X重礼切换头部-->
    <el-button-group class="active-tab">
      <el-button
        @click="activeIndex = 1"
        :class="{actived: activeIndex === 1}" :style="{position: typeof initInfo.countdown_time === 'number' ? 'relative' : 'static'}"
        type="primary" >
        一重限时好礼
        <i v-if="typeof initInfo.countdown_time === 'number'" class="count-down">{{ countDownTime }}</i>
      </el-button>
      <el-button
        @click="activeIndex = 2"
        :class="{actived: activeIndex === 2}"
        type="primary">
        二三重礼专享
      </el-button>
    </el-button-group>

    <!-- X重礼切换部分-->
    <div class="gift-show">
      <div class="triple-scroll" :style="{transform: `translateX(${activeIndex === 1 ? 0 : -1240}px)`}">
        <!-- 一重限时好礼活动-->
        <div class="triple-gift">
          <ul class="gift-box">
            <li v-for="(item, index) in activeData.slice(0, 3)" :key="index" class="gift-panel" :style="{position: typeof initInfo.countdown_time === 'number' && index === 0 ? 'relative' : 'static'}">
              <h2>{{ item.title }}</h2>
              <div class="rule-icon" :style="{'background-position': `${item.ruleIconPos}`}">
                <p class="rule-txt">{{ item.rule }}</p>
              </div>
              <ul class="desc">
                <li v-for="(row, i) in item.desc" :key="i">
                  {{ row }}
                </li>
              </ul>
              <div v-if="typeof initInfo.countdown_time === 'number' && item.flag === 'A'" class="count-down">
                友情提醒：请在 <i>{{ countDownTime }}</i> 内领取
              </div>
            </li>
          </ul>
          <ul class="get-gift">
            <li v-for="(item, index) in activeData.slice(0, 3)" :key="index">
              <template v-if="initInfo.is_login">
                <button v-if="item.is_reward === 0" @click="receiveMoney(item)" class="available" :class="{'loading-btn': receiveLoading}">
                  <span>领取彩金</span>
                  <i v-if="receiveLoading" class="loading-mask"></i>
                </button>
                <button v-if="item.is_reward === 1" class="received"><span>已领取</span></button>
                <button v-if="item.is_reward === 2" @click="receiveMoney(item)" :class="{'loading-btn': receiveLoading}">
                  <span>领取彩金</span>
                  <i v-if="receiveLoading" class="loading-mask"></i>
                </button>
              </template>
              <template v-else>
                <button @click="receiveMoney(item)" class="available"><span>领取彩金</span></button>
              </template>
            </li>
          </ul>
        </div>

        <!-- 二三重礼专享活动-->
        <div class="triple-gift double-gift">
          <ul class="gift-box">
            <li v-for="(item, index) in activeData.slice(3, 5)" :key="index" class="gift-panel">
              <h2>{{ item.title }}</h2>
              <div class="rule-icon" :style="{'background-position': `${item.ruleIconPos}`}">
                <p class="rule-txt">{{ item.rule }}</p>
                <h3 v-html="item.ruleIconText" :class="{exception: index > 0}" class="rule-icon-txt"></h3>
              </div>
              <ul class="desc">
                <li v-for="(row, i) in item.desc" :key="i">
                  {{ row }}
                </li>
              </ul>
            </li>
          </ul>
          <ul class="get-gift">
            <li v-for="(item, index) in activeData.slice(3, 5)" :key="index">
              <template v-if="initInfo.is_login">
                <button v-if="item.is_reward === 0" @click="receiveMoney(item)" class="available" :class="{'loading-btn': receiveLoading}">
                  <span>领取彩金</span>
                  <i v-if="receiveLoading" class="loading-mask"></i>
                </button>
                <button v-if="item.is_reward === 1" class="received"><span>已领取</span></button>
                <button v-if="item.is_reward === 2" @click="receiveMoney(item)" :class="{'loading-btn': receiveLoading}">
                  <span>领取彩金</span>
                  <i v-if="receiveLoading" class="loading-mask"></i>
                </button>
              </template>
              <template v-else>
                <button @click="receiveMoney(item)" class="available"><span>领取彩金</span></button>
              </template>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 活动规则-->
    <dl class="rules">
      <dt>活动规则</dt>
      <dd>
        <ul>
          <li>1 .本优惠自您注册之日起6个月内可报名参加，如超过6个月视为活动失效。</li>
          <li>2 .此活动首笔存款定义为：活动开始后，新注册用户未发起提款前的第一笔USDT存款。领取首存活动后，未发起提款前的USDT第二笔存款视为二存。领取二存活动后，未发起提款前的USDT第三笔存款视为三存。存款后7天内领取有效。注：注册后6个月内从未使用USDT存款的客户亦可报名参加新会员专属存送。</li>
          <li>3 .申请奖金后需在任意游戏中完成相对应的流水要求，当用户对应的钱包余额＜最低投注额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，若用户在申请前将本金从主钱包转出，则不可申请此次优惠。</li>
          <li>4 .此活动领取当天不与首存类优惠活动和再存类优惠活动共享，每个账户仅限申请一次；不可与老用户召回存款活动同一天参与；领取了此项优惠活动的新用户需先完成活动规定的流水后才可申请平台任何形式的救援金活动。</li>
          <li>5 .电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#fff"></activeptliushui>。</li>
          <li>6 .每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。</li>
        </ul>
      </dd>
    </dl>

    <!-- 底部返回按钮部分-->
    <div class="back">
      <router-link to="/active"><span>回到活动首页</span></router-link>
    </div>

    <!-- 领取dialog-->
    <usdtdepositDialog :visible.sync="visibleDialog" :giftData="dialogRow"></usdtdepositDialog>
  </div>
</template>

<script>
import usdtdepositDialog from './usdtdepositDialog'
import { mapState } from 'vuex'

export default {
  name: 'usdtdeposit',
  components: { usdtdepositDialog },
  data () {
    return {
      activeIndex: 1,
      visibleDialog: false,
      dialogRow: {},
      receiveLoading: false,
      countDownTime: '00:00',
      initInfo: {},
      timer: null,
      activeData: [
        {
          flag: 'A',
          title: '一重礼：第1步',
          rule: '全新注册会员首存送58%',
          ruleIconPos: '-458px -372px',
          desc: [
            '新会员注册后60分钟首存即可享受。',
            '存送彩金上限58元。',
            '提款流水=(存款+彩金)X3倍。'
          ],
        },
        {
          flag: 'C',
          title: '一重礼：第2步',
          rule: '全新注册会员续存送68%',
          ruleIconPos: '-835px -372px',
          desc: [
            '已领取一重第1步礼的会员存入第二笔。',
            '存送彩金上限288元。',
            '提款流水=(存款+彩金)X8倍。'
          ]
        },
        {
          flag: 'E',
          title: '一重礼：第3步',
          rule: '全新注册会员三存送40%',
          ruleIconPos: '-1213px -372px',
          desc: [
            '已领取一重礼第2步的会员存入第三笔。',
            '存送彩金无上限。',
            '提款流水=(存款+彩金)X25倍。'
          ]
        },
        {
          flag: 'B',
          title: '二重礼',
          rule: '六个月内新会员首存送50%',
          ruleIconPos: '-458px -704px',
          ruleIconText: '6个月内<br>送50%',
          desc: [
            '未领取一重礼的会员首存即可享受。',
            '注册六个月内未使用过虚拟币存款的会员。',
            '存送彩金上限188元。',
            '提款流水=(存款+彩金)X5倍。'
          ]
        },
        {
          flag: 'D',
          title: '三重礼',
          rule: '二重礼上再续存送30%',
          ruleIconPos: '-835px -704px',
          ruleIconText: '无上限<br>送30%',
          desc: [
            '已领取二重礼的会员存入第二笔。',
            '存送彩金无上限。',
            '提款流水=(存款+彩金)X25倍。'
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  watch: {
    isLogin () {
      this.initActiveData()
    }
  },
  mounted () {
    this.initActiveData()
  },
  methods: {
    // 初始化活动信息
    initActiveData () {
      this.$http(this.ApiSetting.active.usdtDepositInit)
        .then(response => {
          if (response.status === 1) {
            if (response.data.countdown_time) response.data.countdown_time = response.data.countdown_time * 1000
            if (response.data.countdown_time === 0) {
              response.data.countdown_time = null
            }
            // 过滤时间字符串空格
            if (response.data.active_show_time && response.data.active_show_time.length) {
              response.data.active_show_time = response.data.active_show_time.replace(/ /g,'')
            }
            // 合并list活动数据
            let i = 0
            while (i < this.activeData.length)
            {
              this.activeData[i] = Object.assign(
                this.activeData[i],
                response.data.active_setting.find(currentRow => currentRow.flag === this.activeData[i].flag)
              )
              i++
            }
            // 提取其它活动数据
            delete response.data.active_setting
            this.initInfo = response.data
            if (this.initInfo.countdown_time > 0) {
              this.handlerCountDown()
            }
          }
        })
    },
    // 倒计时执行器
    handlerCountDown () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        let timeStamp = this.initInfo.countdown_time
        this.initInfo.countdown_time -= 1000
        timeStamp = timeStamp / 1000
        const minute = Number.parseInt(timeStamp / 60)
        const second = timeStamp - (minute * 60)
        this.countDownTime = `${minute < 10 ? (minute < 1 ? '00' : `0${minute}`) : minute}` + ':' + `${second < 10 ? (second < 1 ? '00' : `0${second}`) : second}`
        if (timeStamp < 0) {
          clearInterval(this.timer)
        }
      }, 1000)
    },
    // 领取彩金
    receiveMoney (row) {
      if (this.initInfo.is_login && !this.receiveLoading) {
        this.receiveLoading = true
        this.$http(this.ApiSetting.active.getUsdtDeposit, { flag: row.flag })
          .then(response => {
            if (response.status === 1) {
              row.bonus = response.data.bonus
              row.need_money = response.data.need_money
              this.dialogRow = row
              this.visibleDialog = true
              this.initActiveData()
            }
          })
          .finally(() => { this.receiveLoading = false })
      } else {
        this.$message({ message: this.initInfo.status_tips, type: 'warning' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@icon: url("../../../assets/active/usdtdeposit/icon.png") no-repeat;

.usdt-deposit {
  background-image: url("../../../assets/active/usdtdeposit/banner.png"), linear-gradient(to right, #14243b, #203657, #203657, #203657, #14243b);
  background-position: center top, left top;
  background-repeat: no-repeat, no-repeat;
  overflow: hidden;

  .active-date {
    width: 100%;
    height: 38px;
    margin-top: 769px;
    text-align: center;
    font-weight: normal;
    color: #f8d5a1;
    font-size: 18px;
  }

  .desc-panel {
    width: 734px;
    margin: 0 auto 35px;
    position: relative;
    .desc {
      p {
        text-align: center;
        font-size: 18px;
        color: #fff;
        white-space: nowrap;
        a {
          color: #f8d5a1;
          text-decoration: underline;
        }
      }
    }
    .deposit {
      position: absolute;
      top: -16px;
      right: -75px;
      width: 144px;
      height: 56px;
      border-radius: 10px;
      text-align: center;
      line-height: 56px;
      font-size: 18px;
      background: @icon;
      background-position: -22px -117px;
      font-weight: bold;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), inset 0px -3px 2px 0 rgba(0, 0, 0, 0.58);
      &:hover {
        background-position: -22px -27px;
        span {
          color: #ffffff;
        }
      }
      span {
        background: linear-gradient(to bottom, #ffffff, #f8d5a1);
        -webkit-background-clip: text;
        color: transparent;
      }
    }
  }
  .active-tab {
    width: 552px;
    height: 72px;
    margin: 0 auto;
    background: @icon;
    background-position: -774px -16px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    border-radius: 100px;
    .el-button {
      width: 274px;
      height: inherit;
      line-height: 72px;
      border-radius: 0;
      font-size: 24px;
      color: #7e1911;
      background: none;
      &.actived {
        background: @icon;
        /deep/ span {
          background: linear-gradient(to bottom, #ffffff, #f8d5a1);
          -webkit-background-clip: text;
          color: transparent;
        }
      }
      &:first-child {
        &.actived {
          background-position: -774px -121px;
        }
      }
      &:last-child {
        &.actived {
          background-position: -1050px -225px;
        }
      }
      .count-down {
        position: absolute;
        top: 26px;
        right: 8px;
        text-align: center;
        display: inline-block;
        width: 48px;
        height: 20px;
        line-height: 20px;
        border-radius: 10px;
        box-shadow: inset 1px 1.7px 2px 0 rgba(61, 14, 4, 0.7);
        background-color: #fff;
        font-size: 14px;
        color: #8b0404;
      }
    }
  }

  .gift-show {
    width: 1240px;
    height: auto;
    overflow: hidden;
    margin: 0 auto;
    .triple-scroll {
      display: flex;
      width: calc(1240px * 2);
      transition: transform 0.3s;
      .triple-gift {
        width: 1240px;
        margin: 60px 0 0;
        overflow: hidden;
        .gift-box {
          display: flex;
          justify-content: space-between;
          .gift-panel {
            width: 393px;
            height: 480px;
            border-bottom-left-radius: 36px;
            border-bottom-right-radius: 36px;
            box-shadow: 0 9px 23px -20px rgb(0, 0, 0, 0.4);
            background: @icon;
            background-position: -29px -361px;
            h2 {
              font-weight: normal;
              font-size: 24px;
              line-height: 24px;
              text-align: center;
              color: #fff;
              margin-top: 11px;
              text-shadow: 0 2px 3px rgba(0, 0, 0, 0.39);
            }
            .rule-icon {
              margin: 17px auto 0;
              width: 341px;
              height: 289px;
              background: @icon;
              overflow: hidden;
              .rule-txt {
                margin-top: 236px;
                font-size: 24px;
                line-height: 24px;
                text-align: center;
                color: #8b0404;
              }
            }
            .desc {
              margin: 7px 0 0 39px;
              li {
                text-shadow: 0 2px 3px rgba(0, 0, 0, 0.39);
                font-size: 18px;
                line-height: 28px;
                color: #fff;
              }
            }
            .count-down {
              position: absolute;
              left: 0;
              bottom: -38px;
              width: 100%;
              font-size: 18px;
              line-height: 38px;
              text-align: center;
              color: #ffffff;
              i {
                color: #f8d5a1;
              }
            }
          }
        }
        .get-gift {
          width: 1240px;
          display: flex;
          justify-content: space-between;
          li {
            width: 393px;
            text-align: center;
            margin: 38px 0 57px;
            button {
              width: 144px;
              height: 56px;
              outline: 0;
              border: 0;
              border-radius: 28px;
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), inset 0px -3px 2px 0 rgba(0, 0, 0, 0.58);
              background: @icon;
              font-size: 18px;
              line-height: 56px;
              background-position: -215px -277px;
              cursor: pointer;
              span {
                color: #c3c3c3;
                font-weight: bold;
              }
              &.available {
                background-position: -208px -115px;
                span {
                  background: linear-gradient(to bottom, #ffffff, #f8d5a1);
                  -webkit-background-clip: text;
                  color: transparent;
                  font-weight: bold;
                }
                &:hover {
                  background-position: -208px -24px;
                  span {
                    font-weight: bold;
                    color: #fff;
                  }
                }
                &.loading-btn {
                  position: relative;
                  .loading-mask {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 28px;
                    background: rgba(0, 0, 0, 0.5) url("../../../assets/btn-loader.gif") no-repeat center;
                    background-size: 25px 25px;
                  }
                }
              }
              &.received {
                cursor: auto;
                text-shadow: 0 -2px 3px rgba(0, 0, 0, 0.39);
                background-position: -215px -196px;
                span {
                  color: #7e1911;
                  font-weight: bold;
                }
              }
            }
          }
        }
        &.double-gift {
          width: 1240px;
          margin: 72px 0 0;
          .gift-box {
            justify-content: center;
            .gift-panel {
              margin: 0 14.5px;
              .rule-icon {
                position: relative;
                .rule-icon-txt {
                  width: 100%;
                  top: 151px;
                  left: 0;
                  position: absolute;
                  text-align: center;
                  font-size: 20px;
                  line-height: 24px;
                  font-weight: normal;
                  color: #fff;
                  &.exception {
                    left: 10px;
                  }
                }
              }
            }
          }
          .get-gift {
            justify-content: center;
            li {
              margin: 28px 15.5px 55px;
            }
          }
        }
      }
    }
  }

  .rules {
    width: 1240px;
    height: 373px;
    border-radius: 20px;
    margin: 0 auto 0;
    background: url("../../../assets/active/usdtdeposit/rule_bg.png") no-repeat;
    background-size: 100% 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), inset 0px -3px 2px 0 rgba(0, 0, 0, 0.58);
    overflow: hidden;
    dt {
      font-size: 30px;
      line-height: 30px;
      margin-top: 33px;
      text-align: center;
      background: linear-gradient(to bottom, #ffffff, #f8d5a1);
      -webkit-background-clip: text;
      color: transparent;
    }
    dd {
      width: 1079px;
      margin: 25px auto 0;
      ul {
        li {
          line-height: 24px;
          font-size: 14px;
          color: #fff;
          text-shadow: 0 2px 3px rgba(0, 0, 0, 0.39);
        }
      }
    }
  }

  .back {
    margin: 56px 0 55px;
    text-align: center;
    a {
      display: inline-block;
      width: 336px;
      height: 56px;
      border-radius: 28px;
      background: @icon;
      background-position: -389px -117px;
      font-size: 18px;
      line-height: 56px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), inset 0px -3px 2px 0 rgba(0, 0, 0, 0.58);
      span {
        background: linear-gradient(to bottom, #ffffff, #f8d5a1);
        -webkit-background-clip: text;
        color: transparent;
        font-weight: bold;
      }
      &:hover {
        background-position: -389px -27px;
        span {
          color: #ffffff;
        }
      }
    }
  }
}
</style>
