<template>
  <div class="active_page deposit-reward">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg"><div class="bg1"></div><div class="bg2"></div></div>

        <div class="active_page_content">
          <div class="active_section_box">
            <div class="active_title">活动时间</div>
            <div class="section_box_wrapper"><div class="active_time">{{initInfo.active_show_time}}</div></div>

            <div class="active_title">{{$t("Event_details")}}</div>
            <div class="section_box_wrapper">
              <div class="active_time">活动期间，符合条件的VIP会员可选择领取对应的彩金优惠，活动彩金最高可领取{{ initInfo.active_setting.length ? initInfo.active_setting[initInfo.active_setting.length - 1].reward : 0 }}元！</div>
            </div>

            <table border="1" cellspacing="0" width="100%">
              <tr>
                <th>累计存款金额</th><th>未提款前累计有效流水</th><th>赠送彩金</th><th>彩金流水要求</th>
              </tr>
              <tr v-for="(row, index) in initInfo.active_setting" :key="index">
                <td v-if="index % 3 === 0" :rowspan="3">{{ row.deposit }}</td>
                <td>{{ row.bet }}</td>
                <td :class="{'btn-td': hasReward}"><span>{{ row.reward }}</span><button v-if="row.isReward" :disabled="loading" @click="handleReceive(row)" class="rebate-btn">立即领取</button></td>
                <td v-if="index === 0" :rowspan="initInfo.active_setting.length">全站{{ initInfo.turnover_multiple }}倍有效流水</td>
              </tr>
            </table>

            <div class="section_box_wrapper"><div class="active_time table_desc">温馨提示：此活动累计存款、累计流水越多，可获得的返利彩金越高哦~</div></div>

            <div class="liushui_box">
              <span v-if="typeof initInfo.user_deposit === 'number'" class="liushui">
                您当前累计存款：{{ initInfo.user_deposit }}
              </span>
              <span v-if="typeof initInfo.user_turnover === 'number'" class="liushui">
                您当前累计有效流水：{{initInfo.user_turnover}}
              </span>
            </div>

            <div class="btn">
              <div class="d_btn normal" @click="loading ? null : updateActiveData()">
                <div class="btn_loading_box" v-show="loading"><span class="small_loading"></span></div>
                更新领取资格
              </div>
            </div>

          </div>

          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                1. 活动期间，VIP会员累计存款金额和全站累计流水达到要求即可领取对应的彩金；此活动奖金每领取一次，系统将按照会员领取彩金的时间重新开始计算存款金额以及有效流水。<br>
                2. 此活动仅计算自活动开始后，会员未进行提款前的累计存款和累计有效流水；若会员在此期间进行提款，系统将按照会员提款的时间重新开始计算存款金额以及有效流水。<br>
                3. 电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui></activeptliushui>。<br>
                4. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="btn back_active_nav">
        <router-link to="/active" class="botton normal">{{$t("Return_to_activity_page")}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'depositRewardNew',
  data () {
    return {
      loading: false,
      initInfo: {
        user_deposit: 0,
        user_turnover: 0,
        turnover_multiple: 0,
        active_setting: []
      }
    }
  },
  watch: {
    isLogin () {
      this.initActiveData()
    }
  },
  mounted () {
    this.initActiveData()
  },
  computed: {
    ...mapState(['isLogin']),
    hasReward () {
      return this.initInfo.active_setting.some(item => {
        return item.isReward === 1
      })
    }
  },
  methods: {
    // 初始化活动数据
    initActiveData () {
      this.loading = true
      const response = this.$http(this.ApiSetting.active.depositRewardNewInit)
      response.then(({ status, data }) => {
        if (status === 1 && data) {
          this.initInfo = data
        }
      })
      response.finally(() => { this.loading = false })
    },
    // 更新领取资格
    updateActiveData () {
      if (!this.initInfo.is_login) return this.$message({ message: '请您先登录', type: 'warning' })
      this.loading = true
      const response = this.$http(this.ApiSetting.active.updateDepositRewardData)
      response.then(({ status, data }) => {
        this.initInfo = {
          ...this.initInfo,
          ...((status === 1 && data) && ({
            active_setting: data.active_setting,
            user_deposit: data.user_deposit,
            user_turnover: data.user_turnover
          }))
        }
      })
      response.finally(() => { this.loading = false })
    },
    // 领取彩金
    handleReceive (row) {
      const result = this.$confirm('尊敬的会员您好，此活动彩金领取后将重新开始计算，您是否确定领取彩金？', '提示',
        {confirmButtonText: '确认', type: 'warning', center: true}
      )
      result.then(() => {
        this.loading = true
        const response = this.$http(this.ApiSetting.active.joindepositRewardNew, { reward: row.reward })
        response.then(({ status }) => {
          if (status === 1) {
            this.updateActiveData()
            this.$message({ message: '领取成功，请进入个人中心钱包查看！', type: 'success' })
          }
        })
        response.finally(() => { this.loading = false })
      }, () => {})
    }
  }
}
</script>

<style lang="less" scoped>
.deposit-reward {
  background: url("../../../assets/active/depositReward_banner.png") no-repeat center top;

  .active_section_box {
    table {
      border: none;
      margin: 20px 0 20px;

      td, th {
        border-color: #333548 ;
        text-align: center;
        height: 58px;
        color: #c3c3c3;
        font-size: 16px;
      }

      th {
        color: #07f1b7;
        font-weight: normal;
        width: 25%;
      }
      .btn-td {
        text-align: left;
        span {
          display: inline-block;
          width: 36%;
          text-align: right;
        }
        .rebate-btn {
          outline: 0;
          border: 0;
          cursor: pointer;
          background: linear-gradient(to right, #07e9f1, #07f1b7);
          width: 92px;
          height: 25px;
          font-size: 12px;
          color: #000;
          border-radius: 30px;
          margin-left: 20px;
          &:hover {
            color: #ffffff;
          }
        }
        //TODO
        [disabled] {
          cursor: auto;
          position: relative;
          &:before {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            content: "";
            width: 100%;
            height: 100%;
            border-radius: 30px;
            background: rgba(0, 0, 0, 0.3);
          }
          &:hover {
            color: #000;
          }
        }
      }
    }
    .table_desc {
      text-align: left!important;
    }
    .liushui_box {
      .liushui {
        display: block;
        text-align: center;
        &:first-child {
          margin-top: 20px;
        }
      }
    }
  }

  .btn {
    display:flex;
    justify-content: center;
    margin-top:20px
  }
}
</style>
