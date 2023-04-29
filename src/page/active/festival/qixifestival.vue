<template>
  <div class="qixifestival active_page">
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
                活动期间满足条件的会员，每日可领取一次电竞体育首存优惠，彩金最高可获得5200元
              </div>
              <table border="1" align="center" cellspacing="0" width="100%">
                <thead>
                <tr align="center">
                  <th width="30%">当天累计首充</th>
                  <th width="30%">红包金额</th>
                  <th>彩金流水要求</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in tableList" :key="index">
                  <td>{{item[0]}}</td>
                  <td @click="availableLit.includes(item[1]) ? toSelectWallet(item[1]) : null" :class="{'get_bouns': availableLit.includes(item[1])}">{{item[1]}}<i></i></td>
                  <td v-if="index === 0" :rowspan="tableList.length">（本金+彩金）<br>3倍电竞/体育有效流水</td>
                </tr>
                <tr>
                  <td class="green_color">电竞场馆要求</td>
                  <td :colspan="2">小艾电竞、小艾彩池电竞、RG电竞、IM电竞</td>
                </tr>
                <tr>
                  <td class="green_color">体育场馆要求</td>
                  <td :colspan="2">威客体育、平博体育、BTI体育</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="active_section_box"><p class="error_tip">{{ initInfo.status_tip }}</p></div>

          <div class="active_section_box">
            <div class="active_title">活动规则</div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                <p>
                  1. 符合条件的会员，可在优惠活动页面点击“立即领取”按钮，对应的活动彩金+本金，在领取成功后将自动添加至会员所选择的游戏钱包中。会员每日未发起提款前的存款都视为首充。<br>
                  2. 若会员在申请此优惠前将存款从主钱包转出或发起提款，则不可申请此优惠活动。<br>
                  3. 会员领取成功后需在游戏钱包中完成有效流水，当会员的游戏钱包余额＜最低投注额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。例：会员当天首存520，申请此活动优惠，需完成（520+58）x3=1734元的有效流水。<br>
                  4. 有效流水规定：有效投注额仅计算产生输赢结果的注单，电竞赔率＜1.45、注单取消、对冲、未结算、自走棋游戏等注单不计算为有效投注。体育赛事投注独赢，让球，大小，单双四个盘口，允许投注上半场或全场及滚球（不包括特殊盘口）；盘口赔率要求：不得低于欧盘1.75、亚洲盘及马来盘0.75。<br>
                  5. 此优惠活动每日仅限领取一次，领取当天不与新用户首存优惠活动、电子首存优惠活动、电竞首存优惠活动、BTI体育会员日优惠活动、VIP月存优惠活动、真人周存款优惠活动、棋牌周存款优惠活动共享，活动流水未完成前不可再次申请，当天未申请则视为自动放弃。<br>
                  6. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。
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

    <!--dialog-->
    <el-dialog
      :visible.sync="showDialog"
      custom-class="qixifestival_dialog_box"
      width="700px"
      :close-on-click-modal="false">
      <div class="sport_rescue_dialog">
        <p>可领彩金：{{currentBouns}}元</p>
        <div>
          <span class="qianbao_tit">领取至：</span>
          <div class="qianbao">
            <div
              class="wallet_box"
              v-for="item in qianbaoarr"
              @click="selectedObj = item"
              :key="item.id"
              :class="[item.code, selectedObj.id === item.id ? 'active' : '']">{{item.name}}</div>
          </div>
        </div>
        <div class="btn"><a href="javascript:;" class="to_apply d_btn normal" @click="receiveReward">确定</a></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'qixifestival',
  data () {
    return {
      tableList: [
        [520, 58],
        [5200, 288],
        [13140, 520],
        [52000, 888],
        [131400, 1888],
        [520000, 2888],
        [1314000, 5200]
      ],
      initInfo: {},
      load: false,
      availableLit: [],
      currentBouns: null,
      showDialog: false,
      qianbaoarr: [],
      selectedObj: {}
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
    // 初始化活动
    initActiveData () {
      this.load = true
      const xhr = this.$http(this.ApiSetting.active.getQixiInit)
      xhr.then(({ status, data = {} }) => {
        if (status === 1 && data) {
          this.initInfo = data
          this.availableLit = data.bonus
          this.walletListFilter(data.wallet_name)
        }
      })
      xhr.finally(() => {
        this.load = false
      })
    },
    // 打开选择钱包弹窗
    toSelectWallet (bouns) {
      if (this.load) return
      this.currentBouns = bouns
      this.showDialog = true
    },
    // 领取礼金
    receiveReward () {
      this.load = true
      const xhr = this.$http(this.ApiSetting.user.transferSubmit, {
        from: 'NM',
        to: this.selectedObj.code,
        money: this.currentBouns,
        active_id: this.initInfo.active_id
      })
      xhr.then(({ status }) => {
        if (status === 1) {
          this.showDialog = false
          this.$message({ message: '领取成功，请进入个人中心钱包查看！', type: 'success' })
          this.initActiveData()
        }
      })
      xhr.finally(() => {
        this.load = false
      })
    },
    // 钱包数据过滤
    walletListFilter (list = {}) {
      let walletList = []
      let walletIndex = 0
      for (const walletKey in list) {
        walletIndex++
        walletList.push({
          id: walletIndex,
          name: list[walletKey],
          code: walletKey
        })
      }
      this.qianbaoarr = walletList
      if (walletList.length) this.selectedObj = walletList[0]
    }
  }
}
</script>

<style lang="less" scoped>
.qixifestival {
  background: url("../../../assets/active/qixifestival/banner.png") no-repeat center top;
  position: relative;

  .section_box_wrapper {
    table {
      border: none;
      margin-top: 20px;
      font-size: 16px;
      td,th {
        border-color: #303344;
        text-align: center;
        line-height: 50px;
        color: #fff;
        font-weight: normal;
        &.green_color {
          color: #07f1b7;
        }
        &.get_bouns {
          cursor: pointer;
          i {
            position: absolute;
            display: inline-block;
            top: 16px;
            margin-left: 5px;
            width: 55px;
            height: 18px;
            background: url("../../../assets/active/qixifestival/receive_bouns.png");
          }
        }
      }
      th {
        color: #07f1b7;
      }
      td {
        position: relative;
      }
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
  .qixifestival_dialog_box {
    border: none;
    background-color: #262933;

    .el-dialog__body {
      padding: 0 0 70px;
    }

    .sport_rescue_dialog {
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
