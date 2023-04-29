<template>
  <div class="cnsupperfootball active_page">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg"><div class="bg1"></div><div class="bg2"></div></div>
        <div class="active_page_content middle">

          <div class="active_section_box">
            <div class="active_title">{{$t("The_activity_time")}}</div>
            <div class="section_box_wrapper">
              <div class="active_time">{{initInfo.active_show_time}}</div>
            </div>
          </div>

          <div class="active_section_box">
            <div class="active_title">{{$t("Active_content")}}</div>
            <div class="section_box_wrapper">

              <div class="active_time left">
                活动期间，会员每日在体育场馆下注 “中国足球超级联赛”盘口，当日累计的有效投注流水≥{{ minBet }}，即可获得相应彩金，最高可领取{{maxBouns}}元！
              </div>

              <table v-if="!loading && rowKey.length">
                <thead>
                  <tr>
                    <th>每日有效总流水</th>
                    <th v-for="(item, index) in initInfo.active_setting" :key="index">
                      {{ item.level_cn }}
                    </th>
                    <th>彩金流水限制</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(num, index) in rowKey" :key="index">
                    <td>{{ formatNumber(num) }}+</td>
                    <td>{{ initInfo.active_setting[0].bouns[num] }}元</td>
                    <td>{{ initInfo.active_setting[1].bouns[num] }}元</td>
                    <td>{{ initInfo.active_setting[2].bouns[num] }}元</td>
                    <td v-if="index === 0" :rowspan="rowKey.length">体育{{ initInfo.bet_times }}倍有效流水</td>
                  </tr>
                </tbody>
              </table>

              <table v-else style="border: 0">
                <thead><div class="loader"><span></span></div></thead>
              </table>

              <div class="btn" v-show="!loading">
                <div class="d_btn" v-if="initInfo.is_login === 0" @click="openWallet">立即领取</div>
                <template v-else>
                  <div class="d_btn" v-if="initInfo.status === 0" @click="openWallet">立即领取</div>
                  <div class="d_btn disabled" v-else-if="initInfo.status === 1">已领取</div>
                  <div class="d_btn" v-else @click="openWallet">立即领取</div>
                </template>
              </div>

            </div>
          </div>

          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper active_rules">
              <ul>
                <li>彩金需在本活动页面手动领取，会员每日流水累计达到对应的额度即可领取彩金，领取时间为次日的00:00:00-23:59:59，指定时间内未领取视为自动放弃。</li>
                <li>此活动彩金将根据每日领取彩金的当天，会员的VIP等级为计算标准。体育游戏场馆包括：威客体育、FB体育、BTI体育、平博体育、皇冠体育、沙巴体育、IM体育。</li>
                <li>用户在领取彩金时选择将其领取至对应的体育游戏钱包，彩金需完成活动规定的3倍体育流水，活动流水未完成前不可再次申请。</li>
                <li>有效流水仅计算产生输赢结果的注单，亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。</li>
                <li>此优惠活动领取当天不与威客体育加油站活动共享。</li>
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

    <el-dialog
      :visible.sync="showDialog"
      v-dir-center="showDialog"
      custom-class="cnsupperfootball_dialog"
      width="688px"
      :close-on-click-modal="false">
      <div class="dialog_main">
        <p>可领彩金：{{initInfo.bouns}}元</p>
        <div >
          <span class="qianbao_tit">领取至：</span>
          <div class="qianbao">
            <div
              class="wallet_box"
              v-for="(item, index) in walletList"
              @click="selectedWallet = item.code"
              :key="index"
              :class="[item.code, item.code === selectedWallet ? 'active' : '']">{{item.name}}</div>
          </div>
        </div>
        <div class="btn"><a href="javascript:;" class="to_apply d_btn normal" :disabled="ajaxLoading" @click="conApplyDialog">确定</a></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatNumberSplit } from '../../../utils/util'
import { mapState } from 'vuex'

export default {
  name: 'cnsupperfootball',
  data () {
    return {
      initInfo: {
        active_conf: {
          active_setting: [],
        }
      },
      selectedWallet: '',
      walletList: [
        {name: '威客体育钱包', id: 1, code: 'SABACV'},
        {name: 'FB体育钱包', id: 2, code: 'FB'},
        {name: 'BTI体育钱包', id: 3, code: 'BTI'},
        {name: '平博体育钱包', id: 4, code: 'PINNACLE'},
        {name: '皇冠体育钱包', id: 5, code: 'CROWN'},
        {name: '沙巴体育钱包', id: 6, code: 'SABA'},
        {name: 'IM体育钱包', id: 7, code: 'IMSB'}
      ],
      showDialog: false,
      loading: false,
      ajaxLoading: false
    }
  },
  computed: {
    ...mapState(['isLogin']),
    rowKey() {
      const list = this.initInfo.active_setting
      return list && list.length ? Object.keys(list[0].bouns) : []
    },
    minBet() {
      const list = this.initInfo.active_setting
      return list && list.length ? Math.min.apply(null, Object.keys(list[0].bouns)) : ''
    },
    maxBouns() {
      const list = this.initInfo.active_setting
      return list && list.length ? list[list.length - 1].bouns[Math.max.apply(null, Object.keys(list[list.length - 1].bouns))] : ''
    }
  },
  watch: {
    isLogin () {
      this.getInit()
    }
  },
  mounted () {
    this.getInit()
  },
  methods: {
    formatNumber(num) {
      let str = formatNumberSplit(num)
      return str.substring(0, str.length - 3)
    },
    // 初始化活动
    getInit () {
      this.loading = true
      this.$http(this.ApiSetting.active.getCnsupperfootballInit)
        .then(res => {
          console.info("初始化中超活动数据：", res)
          if (res.status === 1 && res.data) {
            this.initInfo = res.data
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 开启领弹窗
    openWallet() {
      if (!this.initInfo.is_login) {
        this.$message({ message: this.initInfo.status_tip, type: 'warning' })
        return
      }

      if (this.initInfo.status !== 0) {
        this.$message({ message: this.initInfo.status_tip, type: 'warning' })
        return
      }

      this.selectedWallet = this.walletList[0].code
      this.showDialog = true
    },
    // 领取彩金
    conApplyDialog() {
      this.ajaxLoading = true
      const params = {
        from: "NM",
        to: this.selectedWallet,
        money: this.initInfo.bouns,
        active_id: this.initInfo.active_id
      }
      console.info("中超活动领取彩金入参：", params)

      this.$http(this.ApiSetting.user.transferSubmit, params)
        .then(res => {
          console.info("中超活动领取彩金结果：", res)
          if (res.status === 1) {
            this.$message({ message: "领取成功，请进入个人中心钱包查看！", type: "success" });
            this.showDialog = false
            this.getInit();
          }
        })
        .finally(() => { this.ajaxLoading = false })
    }
  }
}
</script>

<style lang="less" scoped>
.cnsupperfootball {
  background: url("../../../assets/active/sport/cnsupperfootball_banner.jpg") no-repeat center top;

  .section_box_wrapper table{
    width: 100%;
    margin-top: 28px;
    border-spacing: 0;
    border-collapse: unset;
    border-top: #333548 1px solid;
    border-right: #333548 1px solid;
    td, th {
      text-align: center;
      font-size: 14px;
      line-height: 40px;
      color: #c3c3c3;
      border-left: #333548 1px solid;
      border-bottom: #333548 1px solid;
    }
    th {
      color: #07f1b7;
      font-weight: normal;
      font-size: 18px;
      line-height: 50px;
      background-color: #17191f;
    }
  }
  .btn {
    text-align: center;
    margin-top: 50px;
    .d_btn {
      height: 40px;
      line-height: 40px;
      background: linear-gradient(to right, #07e9f1, #07f1b7);
      cursor: pointer;
    }
  }

  //钱包弹窗
  /deep/ .cnsupperfootball_dialog {
    .el-dialog__body {
      padding: 0 0 70px;
    }

    .dialog_main {
      font-size: 18px;
      color: #ffffff;
      padding: 0 40px;

      p {
        margin-bottom: 40px;
      }

      .qianbao {
        font-size: 14px;
        margin-top: 20px;
        display: inline-block;

        .wallet_box {
          margin-right: 19px;

          &:nth-child(3n+3) {
            margin: 0;
          }
        }

        div.active {
          border: 1px solid #07e9f1;
        }
      }

      .btn {
        margin-top: 25px;
        padding-top: 0;

        .to_apply {
          margin: 0;
          width: 136px;
          height: 34px;
          line-height: 34px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
