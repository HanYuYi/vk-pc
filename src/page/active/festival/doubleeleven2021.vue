<template>
  <div class="vipsuper">

    <div class="d-box1 d-box">
      <div class="d-title">充值返利天天领</div>
      <p class="p-time">{{result.active_show_time}}</p>
      <p class="p-tip">活动期间，会员当天首充金额≥500元即可领取一次对应的活动彩金，最高可领1111元！</p>
      <table>
        <tr><td>首充金额</td><td>彩金返还百分比</td><td>彩金上限</td><td>流水要求</td></tr>
        <tr><td>≥500</td><td>11%</td><td>1111</td><td>（本金+彩金）x8</td></tr>
      </table>
      <p class="p-notice">{{result.status_tips}}</p>
      <button class="b-button" @click="confirmState()" :disabled="result.status!=0">立即领取</button>

      <p class="p-rule">活动规则</p>

      <ol>
        <li>符合条件的会员，可在优惠活动页面点击“立即领取”按钮，对应的活动彩金在领取成功后将自动添加至会员的主钱包中。会员每日未发起提款前的存款都视为首充。</li>
        <li>若会员在申请此优惠前将存款从主钱包转出或发起提款，则不可申请此优惠活动。</li>
        <li>会员领取成功后需完成8倍有效流水要求。例：会员当天首存500，申请此活动优惠，需完成（500+55)x8=4440元的有效流水。</li>
        <li>此优惠活动每日仅限领取一次，领取当天不与新用户首存优惠活动、电子首存优惠活动、电竞首存优惠活动、体育周存款优惠活动、皇冠体育会员日优惠活动、体育100%包赔活动、VIP月存优惠活动、真人周存款优惠活动、棋牌周存款优惠活动共享，活动流水未完成前不可再次申请，当天未申请则视为自动放弃。</li>
        <li>有效流水要求：电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘＜1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#a3a3fd" styleClass="a3a3fd"></activeptliushui>。</li>
        <li>此优惠活动所获得奖励需在活动期间进行兑换/折现申请，若在活动结束前会员未联系在线客服进行兑换/折现申请，逾期则视为自动放弃</li>
        <li>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
      </ol>

    </div>

    <div class="d-box2 d-box">
      <div class="d-title">V币商城五折起</div>
      <p class="p-time">{{result.active_show_time}}</p>
      <p class="p-tip">活动期间V币商城全场商品限时打折扣，每日精选商品最低5折起！</p>
      <router-link to="/vbmarket" class="b-button">进入V币商城</router-link>
      <div class="d-scroll">
        <div class="d-item-box">
          <div class="d-item" v-for="(item, index) in awardList.concat(awardList)" :key="index">
            <p class="p-discount">{{item.discount}}</p>
            <img class="item-img x-center" :src="item.img"/>
            <p class="p-name">{{item.name}}</p>
            <p class="p-desc">{{item.tip}}</p>
            <router-link to="/vbmarket" class="b-button-small x-center">立即兑换</router-link>
            <p class="p-dele">{{item.price}} V币</p>
          </div>
        </div>
      </div>
    </div>


    <router-link to="/active" class="back-btn">{{$t("Return_to_activity_page")}}</router-link>

  </div>
</template>
<script type="text/javascript">
export default {
  name: 'double11',
  components: {},
  data () {
    return {
      awardList: [
        {tip: '600000V币 等级≥VIP7', img: require('../../../assets/active/doubleeleven2021/awards/1.png'), name: 'iPhone 13 Pro', status: 0,price: "1200000",discount: "-50%"},
        {tip: '665910V币 等级≥VIP6',img: require('../../../assets/active/doubleeleven2021/awards/2.png'),name: '联想拯救者Y7000', status: 0,price: "1109850",discount: "-40%"},
        {tip: '127620V币 等级≥VIP5',img: require('../../../assets/active/doubleeleven2021/awards/3.png'),name: '新日迷你折叠电动车', status: 0,price: "212700",discount: "-40%"},
        {tip: '99540V币 等级≥VIP5',img: require('../../../assets/active/doubleeleven2021/awards/4.png'),name: '傲风 电竞椅', status: 0,price: "142200",discount: "-30%"},
        {tip: '92295V币 等级≥VIP4',img: require('../../../assets/active/doubleeleven2021/awards/5.png'),name: '拍立得mini11相机', status: 0,price: "131850",discount: "-30%"},
        {tip: '83880V币 等级≥VIP4',img: require('../../../assets/active/doubleeleven2021/awards/6.png'),name: '罗技（G）G910机械键盘', status: 0,price: "104850",discount: "-20%"},
        {tip: '60000V币 等级≥VIP3',img: require('../../../assets/active/doubleeleven2021/awards/7.png'),name: '京东购物卡', status: 0,price: "75000",discount: "-20%"},
        {tip: '60615V币 等级≥VIP3',img: require('../../../assets/active/doubleeleven2021/awards/8.png'),name: '雷蛇 Razer 巴塞利斯蛇V2 鼠标', status: 0,price: "67350",discount: "-10%"},
        {tip: '36180V币 等级≥VIP1',img: require('../../../assets/active/doubleeleven2021/awards/9.png'),name: '蓝牙眼部按摩神器', status: 0,price: "40200",discount: "-10%"},
        {tip: '26865V币 等级≥VIP1',img: require('../../../assets/active/doubleeleven2021/awards/10.png'),name: '空气炸锅', status: 0,price: "29850",discount: "-10%"},
      ],
      result: {}
    }
  },
  mounted () {
    this.getInit()
    //this.confirmState()
  },
  methods: {
    getInit () {
      this.load = true
      this.$http(this.ApiSetting.active.getDouble11Day2021Init)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.result = res.data
        }
      },err=>{
        this.load = false
      })
    },

    confirmState () {
      this.$confirm(`<p>您当前可领${this.result.bonus}元彩金</p><p>需要完成${this.result.bet_amount}元流水</p>确认现在领取？`, this.$t("prompt"), {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        type: 'warning',
        center: true
      }).then(() => {
        this.getReward()
      })
    },

    getReward () {
      this.load = true
      this.$http(this.ApiSetting.active.joinDouble11Day2021)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.$message({
            message: '领取成功',
            type: 'success'
          })
          this.result.status = 1
          this.result.status_tips = '领取成功'
          //this.getInit()
        }
      },err=>{
        this.load = false
      })
    }
  }

}
</script>
<style lang="less" scoped>
.vipsuper{
  font-family: MicrosoftYaHei;
  padding-top: 0px;
  height: 2206px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #fff;
  background: url("../../../assets/active/doubleeleven2021/bg.jpg") no-repeat center top;
  .border-d {
    pointer-events: none;
  }
  .x-center {
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .b-button {
    width: 250px;
    height: 70px;
    text-align: center;
    line-height: 62px;
    box-sizing: border-box;
    padding-bottom: 5px;
    background: url('../../../assets/active/doubleeleven2021/ui.png') no-repeat -55px -172px;
    border: none;
    font-size: 29px;
    font-weight: bold;
    color: #fff;
    &:disabled {
      pointer-events: none;
      opacity: .6;
    }
    &:hover {
      cursor: pointer;
      background: url('../../../assets/active/doubleeleven2021/ui.png') no-repeat -55px -259px;
    }
  }

  .b-button-small {
    display: inline-block;
    width: 130px;
    height: 42px;
    text-align: center;
    line-height: 36px;
    margin-top: 5px;
    box-sizing: border-box;
    padding-bottom: 6px;
    background: url('../../../assets/active/doubleeleven2021/ui.png') no-repeat -761px -71px;
    border: none;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    &:hover {
      cursor: pointer;
      background: url('../../../assets/active/doubleeleven2021/ui.png') no-repeat -761px -132px;
    }
  }

  .d-box1 {
    margin-top: 620px;
    width: 1240px;
    height: 709px;
  }
  .d-box2 {
    margin-top: 90px;
    width: 1240px;
    height: 628px;
    .b-button {
      margin-top: 30px
    }
    .d-scroll {
      width: 1200px;
      height: 320px;
      margin-top: 30px;
      overflow: hidden;
    }
    .d-item-box {
      height: 100%;
      width: auto;
      white-space: nowrap;
      display:inline-block;
      animation: d-item-animation 23s linear infinite;
      animation-play-state: running;
      &:hover {
        animation-play-state: paused;
      }
    }
    @keyframes d-item-animation {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-2650px);
      }
    }
    .d-item {
      background: url('../../../assets/active/doubleeleven2021/ui.png') no-repeat -466px -38px;
      width: 240px;
      height: 311px;
      display: inline-block;
      margin-right: 25px;
      border-radius: 20px;
      box-shadow: 0px 8px 6px rgba(23, 0, 55, 0.3);
      .p-discount {
        font-size: 20px;
        font-weight: bold;
        margin-top: 5px;
      }
      .item-img {
        max-width: 160px;
        max-height: 160px;
        margin-top: 20px;
      }
      .p-name {
        margin-top: 10px;
        font-size: 14px;
        color: #6514eb;
      }
      .p-desc {
        color: #ff3c06;
      }
      .p-dele {
        color: #6514eb;
        text-decoration: line-through;
      }
      p {
        width: 100%;
        text-align: center;
      }
    }

  }

  .d-title {
    width: 303px;
    height: 88px;
    position: relative;
    top: -45px;
    color: #fff;
    background: url('../../../assets/active/doubleeleven2021/ui.png') no-repeat -62px -56px;
    font-size: 33px;
    font-weight: bold;
    letter-spacing: 1.65px;
    line-height: 88px;
    text-shadow: 0px 3px 2px #501aab;
    border-radius: 44px;
    box-shadow: 0px 2px 12px 0 rgba(23, 0, 55, 0.49);
    text-align: center;
  }

  .d-box {
    border-radius: 10px;
    box-shadow: 0px 2px 12px 0 rgba(23, 0, 55, 0.49);
    border: solid 8px #a3a3fd;
    background-color: #6514eb;
    display: flex;
    flex-direction: column;
    align-items: center;

    .p-time {
      margin-bottom: 20px;
      margin-top: -20px;
    }

    table {
      width: 744px;
      height: 100px;
      margin-top: 28px;
      tr:nth-child(1) {
        font-size: 16px;
      }
      td {
        border: 1px solid  #a3a3fd;
        text-align: center;
      }
    }

    .p-notice {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .p-rule {
      margin-top: 30px;
      font-size: 16px;
      font-weight: bold;
    }
  }


  ol {
    width: 80%;
    margin-top: 13px;
    li {
      font-size: 14px;
      line-height: 20px;
      list-style-type: decimal;
      span {
        color: #fff;
        text-decoration: underline;
        cursor: pointer;
      }
    }

  }

  .back-btn {
    background: url('../../../assets/active/doubleeleven2021/ui.png') no-repeat -55px -172px;
    width: 250px;
    height: 70px;
    text-align: center;
    line-height: 62px;
    margin-top: 45px;
    margin-bottom: 45px;
    font-size: 29px;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
    border: none;
    &:hover {
      background: url('../../../assets/active/doubleeleven2021/ui.png') no-repeat -55px -259px;
      width: 250px;
      height: 70px;
    }
  }

}

</style>
<style lang="less">
  .a3a3fd.el-popper {
    border-color: #a3a3fd;
    th {
      color: #a3a3fd!important;;
    }
  }
  .a3a3fd.el-popper[x-placement^=bottom] .popper__arrow {
    border-bottom-color: #a3a3fd!important;
  }
  .a3a3fd.el-popper[x-placement^=right] .popper__arrow {
    border-right-color: #a3a3fd!important;
  }
  .a3a3fd.el-popper[x-placement^=left] .popper__arrow {
    border-left-color: #a3a3fd!important;
  }
  .a3a3fd.el-popper[x-placement^=top] .popper__arrow {
    border-top-color: #a3a3fd!important;
  }
</style>


