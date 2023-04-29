<template>
  <div class="fiveMajorLeagues2022">

    <div class="child-panel date-time">
      <h4 class="title">活动时间</h4>
      <p class="desc">{{ initInfo.active_start_time ? `${initInfo.active_start_time} - ${initInfo.active_end_time}` : '加载中...' }}</p>
    </div>

    <div class="child-panel content-panel">
      <h4 class="title">活动内容</h4>
      <p class="desc">活动期间内，会员投注【五大联赛】赛事周累计有效投注5000元及以上金额，即可获得返水加码，最高直升1.5‰。</p>

      <table border="0" align="center" cellspacing="0" width="100%">
        <tr>
          <td>【五大联赛】周累计有效投注</td>
          <td>返水直升（‰）</td>
        </tr>
        <tr>
          <td>≥ 5,000,000</td>
          <td>1.5</td>
        </tr>
        <tr>
          <td>≥ 1,000,000</td>
          <td>1.2</td>
        </tr>
        <tr>
          <td>≥ 500,000</td>
          <td>1.0</td>
        </tr>
        <tr>
          <td>≥ 50,000</td>
          <td>0.6</td>
        </tr>
        <tr>
          <td>≥ 5000</td>
          <td>0.3</td>
        </tr>
      </table>

      <!--0 可领 1已领取 3 已参与互斥活动 4 昨日未达到领取条件  其他-->
      <p class="ffft"
         v-if="initInfo.is_login && (initInfo.status === 0 || initInfo.status === 3 || initInfo.status === 4)">
        {{initInfo.status_tips}}
      </p>
      <div class="btn">
        <router-link to="/sports" :class="{disabled: loading}">
          立即投注
        </router-link>
      </div>
    </div>

    <div class="child-panel rule-panel">
      <h4 class="title">活动规则</h4>
      <ul>
        <li>1. 彩金无需申请，每个自然周内累计流水达到对应的额度即可获得返水加码彩金，派发时间为次周一 00:00-23:59。</li>
        <li>2. 体育游戏包括：威客体育、FB体育、BTI体育、平博Sports、皇冠体育、沙巴体育、IM体育，其余注单不列入计算。</li>
        <li>3. 「周」结算区间为北京时间每周一00:00至周日23:59。</li>
        <li>4. 会员需要在体育赛事投注独赢，让球，大小，单双四个盘口，允许投注上半场或全场及滚球（不包括特殊盘口）；盘口赔率要求：投注指定赛事的赔率不得低于欧盘1.75、亚洲盘及马来盘0.75。</li>
        <li>5. 五大联赛分为英超，意甲，德甲，法甲，西甲五种类型。投注其余赛事不被计算为有效投注。</li>
        <li>6. 活动彩金需完成全站1倍有效流水，即可提款。有效流水要求：电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水： <activeptliushui color="#99cccc"></activeptliushui>。</li>
        <li>7. 每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。</li>
      </ul>
    </div>

    <div class="back">
      <router-link to="/active" class="botton normal">{{$t("Return_to_activity_page")}}</router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'fiveMajorLeagues2022',
  data () {
    return {
      initInfo: {},
      loading: false
    }
  },
  mounted () {
    this.getInit()
  },
  methods: {
    async getInit () {
      this.loading = true
      const res = await this.$http(this.ApiSetting.active.getFiveMajorLeaguesInit)
      console.info('初始化五大连赛活动信息：', res)
      if (res.status === 1 && res.data) {
        this.initInfo = res.data
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.fiveMajorLeagues2022 {
  overflow: hidden;
  background: url("../../../assets/active/sports/fiveMajorLeagues2022/bg.jpg") no-repeat center top;

  // public
  .child-panel {
    width: 1240px;
    margin: 0 auto;
    border-radius: 20px;
    background-color: #336699;
    box-shadow: inset 0 2px 4px 0 rgba(255, 255, 255, 0.7);
    border-top: 0.1px solid transparent;

    .title {
      text-align: center;
      font-size: 30px;
      font-family: vkFont;
      font-weight: normal;
      line-height: 24px;
      color: #fff;
      height: 22px;
      margin-top: 60px;
      background: url("../../../assets/active/sports/fiveMajorLeagues2022/title_bg.png") no-repeat center center;
    }

    .desc {
      width: 767px;
      font-size: 14px;
      line-height: 14px;
      color: #99cccc;
      margin: 24px auto 0;
    }
  }

  .date-time {
    margin: 411px auto 0;
    height: 180px;
    .desc {
      text-align: center;
    }
  }

  .content-panel {
    margin: 40px auto 0;
    position: relative;

    .desc {
      text-align: center;
    }

    table {
      border: 0;
      width: 776px;
      margin: 23px auto 0;
      border-radius: 20px;
      background: #13477b;
      overflow: hidden;
      position: relative;
      &:before {
        position: absolute;
        inset: 0;
        content: "";
        box-sizing: border-box;
        border-radius: 20px;
        border: 1px solid #99cccf;
      }
      tr {
        td{
          width: 50%;
          box-sizing: border-box;
          text-align: center;
          line-height: 56px;
          font-size: 16px;
          color: #99cccc;
          border-bottom: 1px solid #99cccf;
          border-right: 1px solid #99cccf;
        }
      }
    }

    .ffft {
      position: absolute;
      bottom: 106px;
      width: 100%;
      color: #fff;
      text-align: center;
    }

    .btn {
      margin-top: 40px;
      padding-bottom: 60px;
      text-align: center;
      a {
        display: inline-block;
        width: 148px;
        height: 34px;
        box-sizing: border-box;
        font-size: 14px;
        line-height: 30px;
        font-weight: bold;
        border-radius: 17px;
        box-shadow: 0 4px 6px 0 rgba(0, 21, 76, 0.2), inset 0 -4px 8px 0 rgba(0, 0, 0, 0.3), inset 0 4px 8px 0 rgba(255, 255, 255, 0.4);
        border: solid 2px #fff5ea;
        background-image: linear-gradient(to bottom, #2c74bb, #264d74);
        transition: background-image 0.3s, box-shadow 0.3s;
        &:hover {
          box-shadow: 0 4px 6px 0 rgba(0, 21, 76, 0.2), inset 0 -4px 8px 0 rgba(0, 0, 0, 0.3), inset 0 4px 8px 0 rgba(255, 255, 255, 0.6);
          background-image: linear-gradient(to bottom, #5094da, #3973ae);
        }
        &.disabled {
          opacity: 0.5;
          pointer-events: none;
        }
      }
    }
  }

  .rule-panel {
    margin: 40px auto 0;
    ul {
      width: 776px;
      margin: 18px auto 0;
      padding-bottom: 55px;
      li {
        font-size: 14px;
        line-height: 1.71;
        letter-spacing: 0.35px;
        color: #99cccc;
      }
    }
  }

  .back {
    padding: 44px 0 48px;
    text-align: center;
    a {
      display: inline-block;
      width: 338px;
      height: 44px;
      box-sizing: border-box;
      font-size: 18px;
      font-weight: bold;
      line-height: 38px;
      letter-spacing: 0.45px;
      text-align: center;
      color: #fff;
      border-radius: 22px;
      box-shadow: 0 4px 6px 0 rgba(0, 21, 76, 0.2), inset 0 -4px 8px 0 rgba(0, 0, 0, 0.3), inset 0 4px 8px 0 rgba(255, 255, 255, 0.4);
      border: solid 2px #fff5ea;
      background-image: linear-gradient(to bottom, #2c74bb, #264d74), linear-gradient(to bottom, #07f1de, #07f1b7);
      transition: background 0.3s, box-shadow 0.3s;
      &:hover {
        box-shadow: 0 4px 6px 0 rgba(0, 21, 76, 0.2), inset 0 -4px 8px 0 rgba(0, 0, 0, 0.3), inset 0 4px 8px 0 rgba(255, 255, 255, 0.6);
        background-image: linear-gradient(to bottom, #5094da, #3973ae), linear-gradient(to bottom, #07f1de, #07f1b7);
      }
    }
  }
}
</style>
