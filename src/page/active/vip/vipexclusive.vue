<template>
  <div class="vipsuper">
    <div class="time-d">
      <span>{{start_time}}<br>活动期间，VIP会员完成以下任务即可领取对应的任务奖励；每个奖励仅可领取一次。</span>
      <div class="border-d"></div>
    </div>

    <div class="award-d">
      <div class="award-item" v-for="(item, i) in awardList" :key="i" :class="item.status == 2 && 'got'">
        <p class="title-p b-center" :class="'title-p-' + (i + 1)"></p>
        <p class="tip b-center">{{item.name}}<br>
          <span class="got-it" v-if="item.status == 2">{{i == 0 ? '已转入您的主钱包': '已联系客服领取'}}</span>
          <span class="get-it" v-if="item.status == 1" @click="doCopy(item.code)">{{item.code}}<i>复制</i></span>
        </p>
        <img class="award-img b-center" :src="item.img"/>
        <p class="name-p b-center" v-html="item.tip"></p>
        <button class="state-1 b-center" v-if="item.status == 1" @click="openKfWindow()">联系客服</button>
        <div class="border-d"></div>
      </div>
    </div>

    <div class="rule-p">
      <ol>
        <li>活动期间，符合条件的VIP会员即可领取对应的任务奖励，每个任务奖励仅限领取一次。</li>
        <li>累计存款计算方式：会员每日00:00-24:00累计有效存款金额。</li>
        <li>单日电竞/体育有效投注注单要求：单笔投注额需≥100元。</li>
        <li>有效投注额、有效注单要求：电竞赔率＜1.5、亚洲盘赔率＜0.75、欧洲盘＜1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="'#fff" styleClass="fadfb5"></activeptliushui>。</li>
        <li>活动奖励将以兑换码的形式自动派发，会员需联系在线客服并提供您的收货地址进行兑换；若会员想申请实物奖品折现，请联系在线客服进行折现申请，折现金额将自动派发至会员主钱包中，实物奖品 折现金额无需流水。</li>
        <li>此优惠活动所获得奖励需在活动期间进行兑换/折现申请，若在活动结束前会员未联系在线客服进行兑换/折现申请，逾期则视为自动放弃</li>
        <li>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
      </ol>
      <div class="border-d"></div>
    </div>

    <router-link to="/active" class="back-btn">{{$t("Return_to_activity_page")}}</router-link>

  </div>
</template>
<script type="text/javascript">
export default {
  name: 'vipsuper',
  components: {},
  data () {
    return {
      awardList: [
        {tip: '单日累计首存≥', img: require('../../../assets/active/vipsuper/award/red.png'), name: '88元现金（全站3倍流水）', status: 0},
        {tip: '连续三日<br>每日累计首存≥',img: require('../../../assets/active/vipsuper/award/card.png'),name: '京东200元电子卡', status: 0},
        {tip: '连续五日<br>每日累计首存≥',img: require('../../../assets/active/vipsuper/award/bag.png'),name: 'nike运动斜挎包', status: 0},
        {tip: '连续十日<br>每日累计首存≥',img: require('../../../assets/active/vipsuper/award/watch.png'),name: '阿玛尼男士手表', status: 0},
        {tip: '单日累计<br>有效投注额≥',img: require('../../../assets/active/vipsuper/award/snack.png'),name: '豪华电竞观赛零食大礼包', status: 0},
        {tip: '连续三日<br>每日有效投注额≥',img: require('../../../assets/active/vipsuper/award/sk2.png'),name: 'SK-II-神仙水75ml', status: 0},
        {tip: '连续五日<br>每日有效投注额≥',img: require('../../../assets/active/vipsuper/award/pad.png'),name: 'ipad mini（64G）', status: 0},
        {tip: '单日电竞和体育<br>有效投注注单数量≥',img: require('../../../assets/active/vipsuper/award/zip.png'),name: 'Zippo打火机', status: 0},
        {tip: '单日电竞和体育<br>有效投注注单数量≥',img: require('../../../assets/active/vipsuper/award/charge.png'),name: '小米充电宝', status: 0},
        {tip: '单日全站<br>总盈利金额≥',img: require('../../../assets/active/vipsuper/award/car.png'),name: '联想平衡车', status: 0},
      ],
      visible: false,
      start_time: '',
      dialogType: 1
    }
  },
  mounted () {
    this.getInit()
  },
  methods: {
    getInit() {
      this.load = true
      this.$http(this.ApiSetting.active.getVipExclusiveInit)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
          this.start_time = res.data.active_show_time
          res.data.status.forEach((element, index) => {
            if(element.tip > 10000) {
              element.tip = element.tip/1000 + ',' + '000'
            }
            this.awardList[index].tip += element.tip
            this.awardList[index].name = element.name
            this.awardList[index].status = element.status
            this.awardList[index].code = element.code
          });
        }
      },err=>{
        this.load = false
      })
    },
    doCopy(text) {
      this.$copyText(text).then((e) => {
        this.$message({
          message: '兑换码复制成功，请即时联系客服兑换',
          type: 'success'
        })
      }, function (e) {
        this.$message({
          message: this.$t("Copy_the_failure"),
          type: 'warning'
        })
      })
    }
  }

}
</script>
<style lang="less" scoped>
.vipsuper{
  padding-top: 0px;
  height: 1932px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("../../../assets/active/vipsuper/web-bg.jpg") no-repeat center top;
  .border-d {
    pointer-events: none;
  }
  .time-d {
    margin-top: 650px;
    background: url('../../../assets/active/vipsuper/ui.png') no-repeat -28px -778px;
    width: 1216px;
    height: 53px;
    font-size: 18px;
    color: #fadfb5;
    text-align: center;
    position: relative;
    // box-shadow: -1px 2px 3px #000;
    span {
      position: relative;
      line-height: 30px;
      top: -15px;
    }
    .border-d {
      position: absolute;
      width: 1210px;
      height: 40px;
      top: 10px;
      left: 2px;
      box-shadow: -1px 2px 3px #000;
    }
  }

  .award-d {
    width: 1208px;
    height: 800px;
    margin-top: 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .award-item {
      background: url('../../../assets/active/vipsuper/ui.png') no-repeat -30px -82px;
      width: 216px;
      height: 292px;
      overflow: visible;
      position: relative;
      // box-shadow: -1px 2px 3px #000;
      &.got {
        background: url('../../../assets/active/vipsuper/ui.png') no-repeat -330px -82px;
      }
      .border-d {
        position: absolute;
        width: 210px;
        height: 280px;
        top: 8px;
        left: 2px;
        box-shadow: -1px 2px 3px #000;
      }
    }
    .b-center {
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .title-p {
      width: 105px;
      height: 30px;
      margin-top: -10px
    }
    .title-p-1 {
      background: url('../../../assets/active/vipsuper/ui.png') no-repeat -34px -440px;
    }
    .title-p-2 {
      background: url('../../../assets/active/vipsuper/ui.png') no-repeat -196px -440px;
    }
    .title-p-3 {
      background: url('../../../assets/active/vipsuper/ui.png') no-repeat -358px -439px;
    }
    .title-p-4 {
      background: url('../../../assets/active/vipsuper/ui.png') no-repeat -520px -439px;
    }
    .title-p-5 {
      background: url('../../../assets/active/vipsuper/ui.png') no-repeat -681px -440px;
    }
    .title-p-6 {
      background: url('../../../assets/active/vipsuper/ui.png') no-repeat -34px -517px;
    }
    .title-p-7 {
      background: url('../../../assets/active/vipsuper/ui.png') no-repeat -197px -517px;
    }
    .title-p-8 {
      background: url('../../../assets/active/vipsuper/ui.png') no-repeat -359px -517px;
    }
    .title-p-9 {
      background: url('../../../assets/active/vipsuper/ui.png') no-repeat -521px -517px;
    }
    .title-p-10 {
      background: url('../../../assets/active/vipsuper/ui.png') no-repeat -682px -517px;
    }

    .tip {
      height: 40px;
      width: 90%;
      margin-top: 10px;
      font-size: 12px;
      color: #fadfb5;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .got-it {
        color: #7a7a9c;
        text-align: center;
      }
      .get-it {
        color: #fadfb5;
        text-align: center;
        cursor: pointer;
        &:hover {
          color: #fff
        }
        i {
          margin-left: 5px;
          text-decoration: underline;
        }
      }
    }

    .award-img {
      width: 110px;
      height: 110px;
      margin-top: 15px
    }

    .name-p {
      width: 100%;
      margin-top: 35px;
      font-size: 12px;
      text-align: center;
      color: #fadfb5;
    }

    button {
      width: 150px;
	    height: 42px;
      margin-top: 5px;
      font-size: 18px;
      font-weight: bold;
      border: none;
      cursor: pointer;
      position: relative;
      z-index: 1;
    }

    .state-1 {
      background: url('../../../assets/active/vipsuper/ui.png') no-repeat -34px -665px;
      color: #573023;
      &:hover {
        background: url('../../../assets/active/vipsuper/ui.png') no-repeat -236px -665px;
        color: #fff;
      }
    }

    .state-2 {
      background: url('../../../assets/active/vipsuper/ui.png') no-repeat -444px -665px;
      color: rgba(226, 226, 226, 0.61)
    }
  }

  .rule-p {
    background: url('../../../assets/active/vipsuper/ui.png') no-repeat -30px -859px;
    width: 1216px;
    height: 217px;
    position: relative;
    //box-shadow: -1px 2px 3px #000;
    ol {
      width: 1100px;
      margin-top: 40px;
      margin-left: 65px;
      li {
        font-size: 14px;
        color: #fadfb5;
        line-height: 17px;
        list-style-type: decimal;
        span {
          color: #fff;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    .border-d {
      position: absolute;
      width: 1210px;
      height: 200px;
      top: 14px;
      left: 2px;
      box-shadow: -1px 2px 3px #000;
    }
  }

  .back-btn {
    background: url('../../../assets/active/vipsuper/ui.png') no-repeat -653px -657px;
    width: 257px;
    height: 55px;
    line-height: 55px;
    margin-top: 45px;
    font-size: 25px;
    cursor: pointer;
    color: #573023;
    font-weight: bold;
    border: none;
    text-align: center;
    &:hover {
      background: url('../../../assets/active/vipsuper/ui.png') no-repeat -970px -657px;
    }
  }

}

</style>
<style lang="less">
  // .fadfb5.el-popper {
  //   border-color: #fff;
  // }
  // .fadfb5.el-popper[x-placement^=bottom] .popper__arrow {
  //   border-bottom-color: #fff!important;
  // }
  // .fadfb5.el-popper[x-placement^=right] .popper__arrow {
  //   border-right-color: #fff!important;
  // }
  // .fadfb5.el-popper[x-placement^=left] .popper__arrow {
  //   border-left-color: #fff!important;
  // }
  // .fadfb5.el-popper[x-placement^=top] .popper__arrow {
  //   border-top-color: #fff!important;
  // }
</style>

