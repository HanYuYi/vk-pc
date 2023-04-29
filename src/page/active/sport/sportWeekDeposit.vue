<template>
  <div class="sportWeekDeposit active_page">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="active_section_box">
            <div class="active_title">活动时间</div>
            <div class="section_box_wrapper">
              <div class="active_time">{{ initInfo.active_show_time }}</div>
            </div>
          </div>

          <div class="active_section_box">
            <div class="active_title">活动内容</div>
            <div class="section_box_wrapper">
              <div class="active_time">
                活动期间，满足条件的VIP会员在每个自然周内可领取一次体育单笔存送优惠，彩金最高可获得{{ initInfo.list && initInfo.list.length ? initInfo.list[initInfo.list.length - 1][1] :  0 }}元！
              </div>
              <table border="0" cellspacing="0" width="100%">
                <thead>
                  <tr><th>首存金额</th><th>存款红利</th><th>流水要求</th></tr>
                </thead>
                <tbody v-if="!load">
                  <tr v-for="(arr, index) in initInfo.list" :key="index">
                    <td v-for="(amount, i) in arr" :key="i">{{ amount }}</td>
                    <td v-if="index === 0" :rowspan="initInfo.list.length">（本金+红利）x12</td>
                  </tr>
                  <tr>
                    <td>游戏场馆要求</td>
                    <td colspan="2">威客体育、FB体育、BTI体育、平博体育、皇冠体育、沙巴体育、IM体育</td>
                  </tr>
                </tbody>
                <tbody v-else class="loading">
                  <tr class="btn"><td colspan="3"><span class="btn_loading"></span></td></tr>
                </tbody>
              </table>
              <div class="liushui_box">
                <span class="liushui" v-if="!load && initInfo.is_login && (initInfo.claim_status === 1 || initInfo.claim_status === 3) && initInfo.bonus > 0">
                <span v-if="initInfo.claim_status === 1">当前可领取：{{ initInfo.bonus }}元彩金</span>
                <span v-if="initInfo.claim_status === 3">已领取：{{ initInfo.bonus }}元彩金</span>
                </span>
              </div>
              <div class="btn" v-show="!load">
                <div class="d_btn normal" v-if="initInfo.is_login === 0 || (initInfo.is_login === 1 && initInfo.claim_status !== 3)" @click="openWallet">立即领取</div>
                <div class="d_btn disabled" v-if="initInfo.is_login === 1 && initInfo.claim_status === 3">已领取</div>
              </div>
            </div>
          </div>

          <div class="active_section_box">
            <div class="active_title">{{$t("Activity_rules")}}</div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                <p>
                  1. 每个自然周内符合条件的VIP会员，可在优惠活动页面领取“体育周存款优惠”，对应的存款本金+活动彩金在领取成功后将自动添加至会员选择的体育游戏钱包中。每日未发起提款前的存款都视为首充。<br>
                  2. 若会员在申请此优惠前将存款从主钱包转出或发起提款，则不可申请此优惠。<br>
                  3. 会员申请成功后需在所选择的体育游戏中完成相对应的流水要求。例：若会员当天首存500，申请体育周存款活动优惠，此时需完成（500+58）x12=6696的体育游戏有效流水。<br>
                  4. 此优惠活动每周仅限领取一次，领取当天不与平台首存类优惠活动、周存类优惠活动、VIP月存款活动、体育100%包赔活动共享，活动流水未完成前不可再次申请，当周未申请则视为自动放弃。<br/>
                  5. 流水赔率要求：亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。<br>
                  6. 每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。<br>
                  7. VKGAME对本活动保有最终解释权。
                </p>
              </div>
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
      custom-class="sportWeekDeposit_dialog"
      width="700px"
      :close-on-click-modal="false">
      <div class="dialog_main">
        <p>可领彩金：{{ initInfo.bonus }}元</p>
        <div>
          <span class="qianbao_tit">领取至：</span>
          <div class="qianbao">
            <div
              class="wallet_box"
              v-for="item in qianbaoarr"
              @click="selectedObj = item"
              :key="item.id"
              :class="[item.code, selectedObj.code === item.code ? 'active' : '']">{{item.name}}</div>
          </div>
        </div>
        <div class="btn"><a href="javascript:;" class="to_apply d_btn normal" :disabled="receiveLoad" @click="receiveReward">确定</a></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'sportWeekDeposit',
  data () {
    return {
      initInfo: {}, // 1：可领取，2：不能领取，3：已领取
      load: false,
      receiveLoad: false,
      walletVisible: false,
      selectedObj: {},
      qianbaoarr: [
        {name: '威客体育钱包', id: 1, code: 'SABACV'},
        {name: 'FB体育钱包', id: 2, code: 'FB'},
        {name: 'BTI体育钱包', id: 3, code: 'BTI'},
        {name: '平博体育钱包', id: 4, code: 'PINNACLE'},
        {name: '皇冠体育钱包', id: 5, code: 'CROWN'},
        {name: '沙巴体育钱包', id: 6, code: 'SABA'},
        {name: 'IM体育钱包', id: 7, code: 'IMSB'}
      ]
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  watch: {
    isLogin () {
      this.initActiveData()
    },
    walletVisible (bool) {
      bool && (this.selectedObj = this.qianbaoarr[0])
    }
  },
  mounted () {
    this.initActiveData()
  },
  methods: {
    // 初始化活动
    initActiveData () {
      this.load = true
      const xhr = this.$http(this.ApiSetting.active.sportWeekDepositInit)
      xhr.then(({ status, data }) => {
        if (status === 1) {
          this.initInfo = data
        }
      })
      xhr.finally(() => {
        this.load = false
      })
    },
    // 打开钱包
    openWallet () {
      if (!this.initInfo.is_login) return this.$message({ message: '请您先登录', type: 'warning' })
      if (this.initInfo.claim_status === 1) {
        this.walletVisible = true
      } else {
        this.$message({ message: this.initInfo.status_tips, type: 'warning' })
      }
    },
    // 领取彩金
    receiveReward () {
      this.receiveLoad = true
      const xhr = this.$http(this.ApiSetting.user.transferSubmit, {
        from: 'NM',
        to: this.selectedObj.code,
        money: this.initInfo.bonus,
        active_id: this.initInfo.active_id
      })
      xhr.then(({ status }) => {
        if (status === 1) {
          this.walletVisible = false
          this.$message({ message: '领取成功，请进入个人中心钱包查看！', type: 'success' })
          this.initActiveData()
        }
      })
      xhr.finally(() => {
        this.receiveLoad = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.sportWeekDeposit {
  background: url("~@/assets/active/sports/sportWeekDeposit/banner.jpg") no-repeat center top;
  position: relative;

  .section_box_wrapper {
    table {
      margin-top: 20px;
      border-spacing: 0;
      border-collapse: unset;
      border-top: #333548 1px solid;
      border-right: #333548 1px solid;
      text-align: center;
    }

    td, th {
      height: 57px;
      color: #c3c3c3;
      border-left: #333548 1px solid;
      border-bottom: #333548 1px solid;
    }

    th {
      color: #09e1b0;
      font-weight: normal;
    }

    .btn {
      margin-top: 20px;
      text-align: center;
    }

    .liushui_box {
      text-align: center;
      font-size: 14px;
      color: #ffffff;
      margin-top: 18px;
    }
  }

  //钱包弹窗
  /deep/ .sportWeekDeposit_dialog {
    .el-dialog__body {
      padding: 0 0 70px;
    }

    .dialog_main {
      font-size: 18px;
      color: #ffffff;
      padding: 0 46px;

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
        margin-top: 20px;
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
