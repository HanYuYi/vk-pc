<template>
  <div class="richpay_home_floor" style="margin-top: 60px">
    <dl class="main collapse_panel">
      <dt class="richpay_head" @click="collapse = !collapse" :class="{coll: collapse}">
        V富通钱包五大特点和优势<i class="fold_icon" :class="{open: !collapse}"></i>
      </dt>

      <transition name="slide-fade">
        <dd class="richpay_content" v-show="!collapse">
          <div class="advantage-panel">

            <div class="item-box"
                 v-for="(item, index) in advantageTexts"
                 :key="index">
              <div class="item" :style="{backgroundImage: `url(${item.bg})`}">
                <div class="normal">
                  <p>{{item.normal[0]}}</p>
                  <p v-html="item.normal[1]"></p>
                </div>
                <div class="hover">
                  <p v-for="(e,j) in item.hover" :key="j">• {{e}}</p>
                  <el-popover trigger="hover"
                              placement="bottom"
                              popper-class="richpay-rate"
                              width="200">
                    <div class="rich-popover">
                      <p>V富通VIP年利率</p>
                      <div class="level-box">
                        <li v-for="(item,i) in richpayInitData.vip_year_conf" :key="i">
                          <span>{{item.vip_name}}</span>
                          <span>{{item.vip_apr ? item.vip_apr + '%' : '-'}}</span>
                        </li>
                      </div>
                    </div>
                    <p class="show-vip" v-if="index === 2" style="cursor: pointer" slot="reference">查看VIP收益率表</p>
                  </el-popover>
                </div>
              </div>
            </div>

          </div>
        </dd>
      </transition>

    </dl>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'advantage',
  data () {
    return {
      collapse: true,
      advantageTexts: [
        {
          normal:['时时计息','每小时计算收益<br>最低一元起存'],
          hover:['提款时将主钱包中可提资金转入V富通钱包，最低1元即可转入。','每一笔转入资金无论金额大小，每小时派息一次，持续派发七日'],
          bg: require("../../assets/richpay/advantage_1.png")
        },
        {
          normal:['存取无忧','本金利息随时提<br>收益无流水要求'],
          hover:['您可24小时随时转出本金到主钱包，无任何流水要求。','您可24小时随时提利息收益到主钱包，提出收益无任何流水要求。'],
          bg: require("../../assets/richpay/advantage_2.png")
        },
        {
          normal:['超高利率','相比同类余额宝<br>高出15倍利率收益'],
          hover:['为VIP用户的您提供最高16%的年利率基准收益。','翻倍券加持下最高可获得32%的利率收益，高于余额宝利率15倍'],
          bg: require("../../assets/richpay/advantage_3.png")
        },
        {
          normal:['额外奖励','一周七天每天一次<br>现金翻倍券送不停'],
          hover:['当日单笔存入≥1000元，且该笔资金存满6小时即可免费获得1次抽奖机会；参与抽奖可获得利息翻倍劵或现金红包等奖励，会员每日最多可获取1次抽奖机会，抽奖时间不限；每位会员抽奖次数最多可累计7次。（VIP0用户暂无此额外奖励）'],
          bg: require("../../assets/richpay/advantage_4.png")
        },
        {
          normal:['资金安全','降低风控风险<br>安心游戏更畅爽'],
          hover:['将资金从主钱包转入本钱包能最大程度避免因银行账户流水过高和交易频繁引发的银行风控风险，让您的游戏资金更安全。'],
          bg: require("../../assets/richpay/advantage_5.png")
        }
      ]
    }
  },
  computed: {
    ...mapState(['richpayInitData'])
  }
}
</script>

<style lang="less" scoped>
.advantage-panel {
  width:calc(100% - (123px * 2));
  margin: 38px auto 0;
  display: flex;
  justify-content: space-between;

  .item-box {
    width: 190px;
    height: 430px;
    position: relative;
    .item {
      width: 100%;
      height: 100%;
      transform-origin: center;
      background-repeat: no-repeat;
      position: relative;
      transition: .3s linear;
      &:hover {
        transform: scale(1.1);
        .normal {
          opacity: 0;
          transition: .3s linear;
          transform: translate3d(-50% ,-100px ,0);
        }
        .hover {
          opacity: 1;
          transition: .3s linear;
          transform: translate3d(-50% ,0% ,0);
        }
      }
      .normal {
        width: 80%;
        position: absolute;
        bottom: 15%;
        text-align: center;
        margin-left: 50%;
        transform: translateX(-50%);
        transition: .3s linear;
        p:nth-child(1) {
          font-size: 20px;
          color: #484c5e;
          font-weight: bold;
        }
        p:nth-child(2) {
          font-size: 18px;
          color: #484c5e;
          margin-top: 5px;
        }
      }
      .hover {
        width: 85%;
        position: absolute;
        top: 60%;
        text-align: left;
        font-size: 12px;
        color: #484c5e;
        margin-left: 50%;
        transition: .3s linear;
        transform: translate3d(-50%, 100px, 0);
        opacity: 0;
        .show-vip {
          font-size: 12px;
          color: #628ce1;
          text-align: center;
          text-decoration: underline;
          margin-top: 22px;
        }
        //display: none;
      }
    }
  }
}
</style>
