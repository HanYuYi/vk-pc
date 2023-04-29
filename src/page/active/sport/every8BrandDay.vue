<template>
  <div class="every8BrandDay active_page">
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
            <div class="active_title">
              活动内容
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                每月的{{brandDayDateList.map((item, index) => `${item}号${index + 1 < brandDayDateList.length ? '、' : ''}`).join('')}}，会员在皇冠体育进行存款，即可获得38%的返利彩金。
              </div>
              <table align="center" width="100%">
                <tbody v-if="!load">
                  <tr align="center">
                    <th>存款游戏钱包</th>
                    <th>最低存款金额</th>
                    <th>红利返还百分比</th>
                    <th>红利上限</th>
                    <th>流水要求</th>
                  </tr>
                  <tr>
                    <td>皇冠体育</td>
                    <td>≥100</td>
                    <td>38%</td>
                    <td>388</td>
                    <td>（本金+彩金）x 8</td>
                  </tr>
                </tbody>
                <tbody v-else border="1" align="center" cellspacing="0" width="100%" class="loading">
                  <tr class="btn"><span class="btn_loading"></span></tr>
                </tbody>
              </table>

              <div class="liushui_box" v-if="!load && initInfo.is_login === 1 && (initInfo.claim_status === 1 || initInfo.claim_status === 3) && initInfo.bonus > 0">
                <span v-if="initInfo.claim_status === 1">当前可领取：{{ initInfo.bonus }}元彩金</span>
                <span v-if="initInfo.claim_status === 3">已领取：{{ initInfo.bonus }}元彩金</span>
              </div>
              <div class="btn" v-show="!load">
                <div class="d_btn normal" v-if="initInfo.is_login === 0 || (initInfo.is_login === 1 && initInfo.claim_status === 1)" :disabled="receiveLoad" @click="receiveReward">立即领取</div>
                <div class="d_btn normal disabled" v-if="initInfo.is_login === 1 && initInfo.claim_status === 2">立即领取</div>
                <div class="d_btn disabled" v-if="initInfo.is_login === 1 && initInfo.claim_status === 3" >已领取</div>
              </div>
            </div>
          </div>

          <div class="active_section_box">
            <div class="active_title">{{$t("Activity_rules")}}</div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                <p>
                  1. 每次参与活动前，用户在距离“会员日”开始的最近一周内，必须要有三天的活跃记录：每日充值≥200元、每日游戏记录≥500元。<br>
                  2. 符合参与条件的用户，在皇冠体育“会员日”当天的第一笔存款后可在本优惠页面，点击”立即领取“按钮，第一笔存款本金+活动奖金在领取成功后将自动添加至会员的皇冠体育钱包中。<br>
                  3. 此优惠第一笔存款定义为：会员在活动当天未提款前的第一笔存款；若会员在申请前将存款从主钱包转出，则不可申请此优惠。<br>
                  4. 会员领取成功后需在皇冠体育中完成相对应的有效流水要求。例：会员存款100，需完成（100+38）x8=1104的有效流水。<br>
                  5. 此优惠活动领取当天不与新用户首存优惠活动、电子首存优惠活动、电竞首存优惠活动、VIP月存优惠活动、真人周存款优惠活动、棋牌周存款优惠活动、S11充值返利活动、TI10充值返利活动共享；活动流水未完成前不可再次申请。此优惠活动当天未申请则视为自动放弃。<br>
                  6. 流水要求：亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。<br>
                  7. 每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。
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
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'every8BrandDay',
  data () {
    return {
      brandDayDateList: [8, 18, 28],
      initInfo: {},
      load: false,
      receiveLoad: false
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
    initActiveData () {
      this.load = true
      this.$http(this.ApiSetting.active.every8BrandDay)
        .then(response => {
          if (response.status === 1 && response.data) {
            this.initInfo = response.data
          }
          this.load = false
        })
        .catch(() => {
          this.load = false
        })
    },
    receiveReward () {
      if (!this.initInfo.is_login) return this.$message({ message: '请先登录', type: 'warning' })
      this.receiveLoad = true
      this.$http(this.ApiSetting.user.transferSubmit, {
        from: 'NM',
        to: 'CROWN',
        money: this.initInfo.bonus || 1,
        active_id: this.initInfo.active_id
      })
        .then(response => {
          if (response.status === 1) {
            this.$message({ message: '领取成功，请进入个人中心钱包查看！', type: 'success' })
            this.initActiveData()
            this.receiveLoad = false
          }
        })
        .catch(() => {
          this.receiveLoad = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
  .every8BrandDay {
    background: url("../../../assets/active/every8BrandDay-banner.png") no-repeat center top;
    position: relative;

    .section_box_wrapper {
      table {
        margin-top: 20px;
        border-spacing: 0;
        border-collapse: unset;
        border-top: #303344 1px solid;
        border-right: #303344 1px solid;
      }

      td, th {
        text-align: center;
        line-height: 50px;
        color: #c3c3c3;
        border-left: #303344 1px solid;
        border-bottom: #303344 1px solid;
      }

      th {
        color: #07f1b7;
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
  }
</style>
