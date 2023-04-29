<template>
  <div class="real-person-daily-return active_page">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="active_section_box">
            <div class="active_title">{{$t("The_activity_time")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">{{ initInfo.active_show_time }}</div>
            </div>
          </div>

          <div class="active_section_box">
            <div class="active_title">
              {{$t("Active_content")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                活动期间，会员每日在真人场馆完成≥{{ initInfo.active_setting.info ? formatNumber(initInfo.active_setting.info[0].deposit) : 0 }}元有效投注，即可申请领取相应优惠彩金，最高可获得{{ initInfo.active_setting.info ? formatNumber(initInfo.active_setting.info[initInfo.active_setting.info.length - 1].bonus) : 0 }}元

                <table v-if="!loading">
                  <thead>
                  <th>有效投注(￥)</th>
                  <th>返利彩金(￥)</th>
                  <th>流水要求</th>
                  </thead>
                  <tr v-for="(item, index) in initInfo.active_setting.info" :key="index">
                    <td>≥{{ formatNumber(item.deposit) }}</td>
                    <td class="special">{{ formatNumber(item.bonus) }}</td>
                    <td v-if="index === 0" :rowspan="initInfo.active_setting.info.length">{{ initInfo.active_setting.limit }}倍真人</td>
                  </tr>
                </table>
                <table v-else style="border: 0">
                  <thead><div class="loader"><span></span></div></thead>
                </table>

                <p class="liushui" v-if="!loading && initInfo.is_login">
                  <template v-if="initInfo.status === 0 || initInfo.status === 1">
                    昨日累计有效流水{{ formatNumberByDecimal(initInfo.yesterday_bet) }}元，今日{{ initInfo.status === 0 ? '可' : '已' }}领 <span>{{ formatNumber(initInfo.today_bonus) }}</span> 元
                  </template>
                  <template v-else-if="[2,3,4].includes(initInfo.status)">
                    {{ initInfo.status_tips }}
                  </template>
                </p>

                <div class="btn">
                  <div v-if="[1,2,4].includes(initInfo.status)" class="d_btn disabled">
                    {{ initInfo.status === 1 ? '今日已领取' : '立即领取' }}
                  </div>
                  <div v-else @click="openWalletDialog" class="d_btn">
                    立即领取
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper active_rules">
              <ul>
                <li>真人每日返利金需在本活动页面手动领取，每日仅限领取一次。</li>
                <li>每日累计流水达到对应的额度即可领取彩金，领取时间为次日 00:30:00-23:59:59，指定时间内未领取视为自动放弃。</li>
                <li>用户在领取真人每日返利金时选择将其领取至对应的真人游戏钱包（AG真人、PM真人、欧博真人、PT真人），真人每日返利金需完成{{ this.initInfo.active_setting.limit }}倍真人有效流水，活动流水未完成前不可再次申请。</li>
                <li>有效流水仅计算产生输赢结果的注单；注单取消、对冲、未结算等不计算为有效流水。</li>
                <li>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <div class="btn back_active_nav">
        <router-link to="/active" class="botton normal">{{$t("Return_to_activity_page")}}</router-link>
      </div>
    </div>

    <!--钱包dialog-->
    <el-dialog
      :visible.sync="walletVisible"
      v-dir-center="walletVisible"
      custom-class="realPersonDailyReturn_dialog"
      width="570px"
      :close-on-click-modal="false">
      <div class="dialog_main">
        <p>可领彩金：<span>{{ formatNumber(initInfo.today_bonus) }}</span>元</p>
        <div>
          <span class="qianbao_tit">转入至：</span>
          <div class="qianbao">
            <div
              class="wallet_box"
              v-for="item in walletList"
              @click="selectedObj = item"
              :key="item.id"
              :class="[item.code, selectedObj.code === item.code ? 'active' : '']">{{item.name}}</div>
          </div>
        </div>
        <div class="btn">
          <div class="to_apply d_btn normal" :class="{loading_2022: receiveLoad}" @click="receiveReward">确定</div>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import { formatNumberSplit } from "@/utils/util"

export default {
  name: 'realPersonDailyReturn',
  data() {
    return {
      loading: false,
      initInfo: {
        active_setting: {}
      },

      receiveLoad: false,
      walletVisible: false,
      selectedObj: {},
      walletList: [
        {name: 'AG真人钱包', id: 1, code: 'AG'},
        {name: '欧博真人钱包', id: 2, code: 'ALLBET'},
        {name: 'PT真人钱包', id: 3, code: 'PT'},
        {name: 'PM真人钱包', id: 4, code: 'PM'}
      ]
    }
  },
  mounted () {
    console.info("status: 0未领取  1已领取  2流水不够  3彩金流水不够  4明天领取")
    this.getInit()
  },
  watch: {
    isLogin() {
      this.getInit()
    },
    walletVisible(bool) {
      if (bool) {
        this.selectedObj = this.walletList[0]
      }
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    formatNumberByDecimal(money){
      return formatNumberSplit(money)
    },
    formatNumber(money) {
      let str = formatNumberSplit(money)
      return str.substring(0, str.length - 3)
    },
    // 初始化活动
    async getInit() {

      this.loading = true
      try {
        const response = await this.$http(this.ApiSetting.active.initBackwaterForever)
        console.info("初始化真人每日返不停活动：", response)
        if (response.status === 1 && response.data) {
          this.initInfo = response.data
        }
      } catch (error) {
        console.info(error)
      } finally {
        this.loading = false
      }

    },

    // 开启彩金领取dialog
    openWalletDialog() {
      if (!this.isLogin) {
        this.$message({ message: '请您先登录', type: 'warning' })
        return
      }
      if (this.initInfo.status !== 0) {
        this.$message({ message: this.initInfo.status_tips, type: 'warning' })
        return
      }
      this.walletVisible = true
    },

    // 领取彩金
    async receiveReward () {
      if (this.receiveLoad) return
      this.receiveLoad = true
      const params = {
        from: 'NM',
        to: this.selectedObj.code,
        money: this.initInfo.today_bonus,
        active_id: this.initInfo.active_id
      }
      console.info("真人每日返不停活动领取彩金入参：", params)
      const response = await this.$http(this.ApiSetting.user.transferSubmit, params)
      console.info("真人每日返不停活动领取彩金响应：", response)

      if (response.status === 1) {
        this.walletVisible = false
        this.getInit()
        this.$message({ message: `${params.money}元彩金已转入您的${this.walletList.filter(item => item.code === params.to)[0].name}，${this.initInfo.active_setting.limit}倍流水即可提款`, type: 'success' })
      }
      this.receiveLoad = false
    }
  }
}
</script>

<style lang="less" scoped>
.real-person-daily-return {
  background: url("../../../assets/active/realPersonDailyReturn_banner.jpg") no-repeat center top;
  .liushui {
    color: #c3c3c3;
    margin-top: 30px;
    font-size: 16px;
    span {
      color: #f4d364;
    }
  }
  .btn {
    margin-top: 20px;
  }
  .d_btn {
    font-size: 14px;
    width: 118px;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    cursor: pointer;
    background: linear-gradient(to right, #07e9f1 , #07f1b7);
    border-radius: 20px;
    letter-spacing: 0.35px;
    color: #000;
    position: relative;
  }
  .d_btn:hover {
    background: linear-gradient(to right, #07f1b7 , #07e9f1);
  }
  .section_box_wrapper {
    table{
      width: 100%;
      font-size: 16px;
      margin-top: 30px;
      border-spacing: 0;
      border-collapse: unset;
      border-top: rgba(255,255,255,0.1) 1px solid;
      border-right:rgba(255,255,255,0.1) 1px solid;
      td, th {
        text-align: center;
        font-size: 14px;
        line-height: 40px;
        color: #c3c3c3;
        border-left: rgba(255,255,255,0.1) 1px solid;
        border-bottom: rgba(255,255,255,0.1) 1px solid;
      }
      th {
        color: #07f1b7;
        font-weight: normal;
        font-size: 18px;
        line-height: 50px;
        background-color: #17191f;
      }
      td {
        &.special {
          font-size: 22px;
          color: #f4d364;
          font-family: vKFont;
        }
      }
    }
  }

  //钱包弹窗
  /deep/ .realPersonDailyReturn_dialog {
    .el-dialog__body {
      padding: 0 0 60px;
    }

    .dialog_main {
      font-size: 18px;
      color: #ffffff;
      padding: 0 46px;

      p {
        margin: 22px 0 40px;
        span {
          color: #07f0bc;
        }
      }

      .qianbao {
        width: 397px;
        font-size: 14px;
        display: inline-block;

        .wallet_box {
          margin-right: 19px;

          &:nth-child(2n+2) {
            margin: 0;
          }
        }

        div.active {
          border: 1px solid #07e9f1;
        }
      }

      .btn {
        margin-top: 35px;
        padding-top: 0;

        .to_apply {
          margin: 0;
          width: 135px;
          height: 34px;
          line-height: 34px;
          font-size: 16px;
        }
      }
    }

    .qianbao_tit {
      display: inline-block;
      vertical-align: top;
    }
  }
}
</style>
