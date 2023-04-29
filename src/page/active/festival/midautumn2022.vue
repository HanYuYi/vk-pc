<template>
  <div class="midautumn2022 active_page">
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
                活动期间，所有VIP会员在平台累计总流水≥{{ initInfo.active_conf.min_bet }}，即可参与中秋节专属ROLL房间抽奖。

                <table v-if="!loading">
                  <thead>
                  <th>ROLL房间奖品</th>
                  <th>等级需求</th>
                  <th>流水要求</th>
                  <th>奖品数量</th>
                  <th>ROLL房间号</th>
                  <th>开奖时间</th>
                  <th>参与抽奖</th>
                  </thead>
                  <tr v-for="(item, index) in initInfo.active_conf.roll_conf" :key="index">
                    <td>{{ item.title }}</td>
                    <td>{{ item.vip }}</td>
                    <td>{{ item.bet }}</td>
                    <td>{{ item.prize_num }}</td>
                    <td>{{ item.roll_no }}</td>
                    <td>{{ item.prize_time }}</td>
                    <td class="btn">
                      <div v-if="initInfo.status === 2 || item.status === 0" class="d_btn disabled">
                        进入房间
                      </div>
                      <div v-else class="d_btn" @click="enterRoll(item.roll_no)">
                        进入房间
                      </div>
                    </td>
                  </tr>
                </table>
                <table v-else style="border: 0">
                  <thead><div class="loader"><span></span></div></thead>
                </table>

                <p class="liushui" v-show="!loading && initInfo.is_login && initInfo.status !== 2">
                  当前总流水：{{ initInfo.bet_amount }}元
                </p>

                 <div class="prize-box">
                  <img src="../../../assets/active/midautumn2022_a.png" alt="">
                  <img src="../../../assets/active/midautumn2022_b.png" alt="">
                </div>
                <div v-if="initInfo.active_conf.roll_conf && initInfo.active_conf.roll_conf.length" class="prize-txt">
                  <p>{{ initInfo.active_conf.roll_conf[1].title }}</p>
                  <p>{{ initInfo.active_conf.roll_conf[0].title }}</p>
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
                <li>此活动奖品不可折现，中奖的用户需在ROLL房开奖后的48小时之内联系在线客服，并提供个人的详情收货地址，逾期奖品则自动销毁。</li>
                <li>有效流水要求：电竞赔率＜1.5、亚洲盘赔率≤0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui></activeptliushui>。</li>
              </ul>
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

<script type="text/javascript">

import { mapState } from 'vuex'

export default {
  name: "midautumn2022",
  data() {
     return {
       loading: false,
       initInfo: {
         active_conf: {
           min_bet: 0,
           roll_conf: []
         }
       }
     }
  },
  mounted () {
    this.getInit()
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    // 初始化活动
    async getInit() {
      this.loading = true
      try {
        const response = await this.$http(this.ApiSetting.active.getMidFestivalInit)
        if (response.status === 1 && response.data) {
          this.initInfo = response.data
        }
      } catch (error) {
        console.info(error)
      } finally {
        this.loading = false
      }

    },
    // 进入房间
    enterRoll (rollNum) {
      this.$router.push('/roll/' + rollNum)
    }
  }
}
</script>

<style lang="less" scoped>
.midautumn2022{
  background: url("../../../assets/active/midautumn2022.jpg") no-repeat center top;
  .liushui {
    color: #c3c3c3;
    margin-top:20px;
    font-size: 16px;
  }
  .section_box_wrapper {
    table{
      width: 100%;
      font-size: 16px;
      margin-top: 30px;
      border-spacing: 0;
      border-collapse: unset;
      border-top: #333548 1px solid;
      border-right: #333548 1px solid;
      td, th {
        text-align: center;
        font-size: 14px;
        line-height: 42px;
        color: #c3c3c3;
        border-left: #333548 1px solid;
        border-bottom: #333548 1px solid;
      }
      th {
        color: #07f1b7;
        font-weight: normal;
        font-size: 16px;
        line-height: 48px;
      }
      .d_btn {
        font-size: 14px;
        width: 118px;
        line-height: 34px;
        display: inline-block;
        cursor: pointer;
        background: linear-gradient(to right, #07e9f1 , #07f1b7);
        border-radius: 17px;
        letter-spacing: 0.35px;
        color: #000;
        position: relative;
      }
      .d_btn:hover {
        background: linear-gradient(to right, #07f1b7 , #07e9f1);
      }
    }
    .prize-box {
      display: flex;
      justify-content: space-evenly;
      margin-top: 17px;
    }
    .prize-txt {
      width: 90%;
      margin: 11px auto 0;
      display: flex;
      justify-content: space-around;
      p {
        font-size: 14px;
        line-height: 14px;
        color: #fff;
      }
    }
  }
}
</style>
