<template>
  <div class="csgo-major">
    <h3>活动时间</h3>
    <p class="notice">{{activeData.start_time}}-{{activeData.end_time}}</p>
    <h3>活动内容</h3>
    <p class="notice">活动期间，每日首充≥100元且在【2022 CSGO Major】中累计有效流水≥888元的会员，即可进行签到领取彩金并获得一次开宝箱的机会！</p>
    <div class="fire-group1">
      <img v-for = "item in fireGroup" :key = "item.id" :src="item.img" :style="{left: item.left + 'px', top: item.top + 'px', transform: 'rotate(' + item.rotate + 'deg)', opacity: item.opacity}"/>
    </div>
    <img class="fire8-right" src="../../../assets/active/csgomajor/fire/fire8.png"/>
    <img class="fire9-right" src="../../../assets/active/csgomajor/fire/fire9.png"/>
    <img class="fire9-right2" src="../../../assets/active/csgomajor/fire/fire9.png"/>
    <img class="fire9-left" src="../../../assets/active/csgomajor/fire/fire9.png"/>
    <img class="fire9-left2" src="../../../assets/active/csgomajor/fire/fire9.png"/>
    <div class="content">
      <div class="csgo-title">
        <p>福利一 <span>签到领彩金</span></p>
        <p>今日累计有效流水: <span>{{formateNum(activeData.sign_current_water)}}</span> 元</p>
      </div>
      <div class="sign-box">
        <div class="sign-item" v-for="(item, i) in signArr" :key="i" :class="'item' + item.signStatus">
          <p>{{item.time}}</p>
          <p>+8元</p>
          <p>{{item.tip}}</p>
        </div>
      </div>
      <p class="notice notice2">{{signTip}}</p>
      <button class="sign-btn" @click="handleSignBtn" :disabled = "activeData.sign_status == -1">{{activeData.sign_status != -1 ? '立即签到' : activeData.is_rest ? '今日无赛事' : '今日已签到'}}</button>
      <div class="csgo-title csgo-title2">
        <p>福利二 <span>开箱有惊喜</span></p>
      </div>
      <div class="welfare-2">
        <div class="open-box">
          <div class="award-box">
            <p class="award-title">开箱可得奖品</p>
            <button class="award-btn" @click="handleRecordBtn">抽奖记录</button>
            <div class="award-list">
              <div class="award-inner">
                  <div class="award-item" v-for="(item,i) in awardImgs.concat(awardImgs)" :key="i">
                    <img :src="item.img"/>
                    <p>{{item.name}}</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box-key">
          <div class="box"></div>
          <button class="sign-btn" @click="handleOpenBtn" :disabled = "activeData.open_status == -1">{{activeData.open_status != -1 ? '免费抽奖' : activeData.is_rest ? '今日无赛事' : '今日已抽奖'}}</button>
        </div>
      </div>
      <h3>活动规则</h3>
      <div class="rule-box">
        <ol type="1">
          <li>电竞游戏场馆仅限：小艾电竞、IM电竞，有效流水将累计计算以上所有电竞游戏。</li>
          <li>会员每日未发起提款前的有效存款都将视为首充。</li>
          <li>符合条件的会员需在当日00:00:00-23:59:59进行签到，逾期则视为自动放弃。会员获得的抽奖机会仅限当天使用，不可累积。</li>
          <li>奖品领取有效期为：自中奖之日起，15日内有效，若奖品为实物奖品，请联系在线客服提供中奖兑换码，提供您的详细收货地址，我们将于次日安排发货，快递单号将会发送站内信通知；除此之外您也可以联系在线客服选择折现，实物奖品折现后无需流水即可提款。</li>
          <li>申请获得的奖金将自动派发至会员所选择的的电竞游戏钱包中，活动奖金需在电竞游戏中完成1倍流水即可转出；当会员对应电竞游戏钱包余额≤原电竞钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，活动流水未完成前不可再次申请本活动。用户申请优惠前提款，则不可申请本次活动。</li>
          <li>有效流水要求：电竞赔率＜1.5，走盘、注单取消、对冲、未结算、串关、实时兑现等不计算为有效流水。</li>
          <li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
        </ol>
      </div>
      <router-link to="/active" class="back-button">{{$t("Return_to_activity_page")}}</router-link>
    </div>

    <el-dialog
      :visible.sync="dialogVisible1"
      custom-class="csgo-dialog csgo-dialog-1"
      width="660"
      :close-on-click-modal="false">
      <p class="csgo-dialog-title">领取签到彩金<i @click="dialogVisible1 = false"></i></p>
      <div class="dialog_wrapper">
        <p class="notice">恭喜您，今日签到获得 <span>8</span> 元彩金，选择转入</p>
        <div class="button-box">
          <div class="button" v-for="(item,i) in walletList" :key="i" :class="walletFlag == i && 'active'" @click="walletFlag = i">{{item.name}}</div>
        </div>
        <div class="button-box-2">
          <div class="button-cancle" @click="dialogVisible1 = false">暂不领取</div>
          <div class="button-confirm" @click="handleApplyBtn">立即领取</div>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogVisible2"
      custom-class="csgo-dialog csgo-dialog-2"
      width="660"
      :close-on-click-modal="false">
      <p class="csgo-dialog-title">中奖信息<i @click="dialogVisible2 = false"></i></p>
      <div class="dialog_wrapper">
        <div class="dialog-notice">
          <p>{{awardData.message}}</p>
          <p v-if="awardData.secret">{{awardData.secret}} <span @click="doCopy(awardData.secret)">复制</span></p>
        </div>
        <div class="img-box">
          <img :src="awardData.icon_url"/>
          <p class="img-name">{{awardData.item_name}}</p>
        </div>
        <div class="button-box-2">
          <div class="button-confirm" @click="dialogVisible2 = false">我知道了</div>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogVisible3"
      custom-class="csgo-dialog csgo-dialog-3"
      width="660"
      :close-on-click-modal="false">
      <p class="csgo-dialog-title">抽奖记录<i @click="dialogVisible3 = false"></i></p>
      <div class="dialog_wrapper">
        <p class="none-title" v-if="!activeData.open_history.length && !loading">暂无开箱记录，快去参与活动吧~</p>
        <p class="dialog-title" v-if="activeData.open_history.length"><span>奖品名称</span><span>领取日期</span></p>
        <div class="item-box" v-if="activeData.open_history.length">
          <p class="list-item" v-for="(item,i) in activeData.open_history" :key="i"><span>{{item.item_name}}</span><span>{{item.create_time.split(" ")[0]}}</span></p>
        </div>
        <div class="none-data" v-if="!activeData.open_history.length  && !loading"></div>
        <!-- <p class="page-control"><span>上一页</span> 1/6 <span>下一页</span></p> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'csgomajor',
  data () {
    return {
      awardImgs: [
        {img: require("../../../assets/active/csgomajor/awards/1.png"), name: "888V币"},
        {img: require("../../../assets/active/csgomajor/awards/2.png"), name: "AWP渐变之色"},
        {img: require("../../../assets/active/csgomajor/awards/3.png"), name: "iPhone13 Pro "},
        {img: require("../../../assets/active/csgomajor/awards/4.png"), name: "狼蛛机械键盘"},
        {img: require("../../../assets/active/csgomajor/awards/5.png"), name: "雷蛇鼠标"},
        {img: require("../../../assets/active/csgomajor/awards/6.png"), name: "零食礼包"}
      ],
      walletFlag: 0,
      walletList: [
        {name: "小艾电竞钱包", selected: true, id: 1, code: "EG"},
        // {name: "RG电竞钱包", selected: true, id: 2, code: "RG"},
        {name: "IM电竞钱包", selected: false, id: 4, code: "IM"}
      ],
      fireGroup: [
        {img: require("../../../assets/active/csgomajor/fire/fire1.png"), top: 10, left: 10, rotate: 0, id: Math.random(), opacity: 1},
        {img: require("../../../assets/active/csgomajor/fire/fire2.png"), top: 100, left: 800, rotate: 0, id: Math.random(), opacity: 1},
        {img: require("../../../assets/active/csgomajor/fire/fire3.png"), top: 300, left: 600, rotate: 0, id: Math.random(), opacity: 1},
        {img: require("../../../assets/active/csgomajor/fire/fire4.png"), top: 180, left: 50, rotate: 0, id: Math.random(), opacity: 1},
        {img: require("../../../assets/active/csgomajor/fire/fire5.png"), top: 350, left: 250, rotate: 0, id: Math.random(), opacity: 1},
        {img: require("../../../assets/active/csgomajor/fire/fire6.png"), top: 280, left: 200, rotate: 0, id: Math.random(), opacity: 1},
        {img: require("../../../assets/active/csgomajor/fire/fire7.png"), top: 200, left: 500, rotate: 0, id: Math.random(), opacity: 1}
      ],
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      signArr: [],
      activeData: {
        open_history: [
        ]
      },
      signTip: "",
      loading: false,
      todayIndex: 0,
      awardData: {}
    }
  },
  mounted () {
    setInterval(this.fireMove1,10)
    this.initData()
  },
	watch: {
		isLogin(ne) {
			this.initData()
		}
	},
	computed: mapState(['isLogin']),
  methods: {
    initData () {
      this.loading = true
      this.$http(this.ApiSetting.active.getCsgoMajorInit)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.signArr = []
          this.activeData = res.data
          console.log(this.activeData)
          let todayDate = res.data.today
          let keys = Object.keys(res.data.sign_detail).sort()
          console.log(keys)
          keys.forEach((item,index) => {
            let obj = {}
            if (Number(item) > Number(todayDate)) {
              obj.signStatus = 1
              obj.tip = ""
            } else if (Number(item) == Number(todayDate)) {
              obj.signStatus = 4
              obj.tip = res.data.sign_detail[item] ? '已签到' : '未签到'
              this.signTip = res.data.sign_detail[item] ? '恭喜签到成功，记得去免费抽奖哦' : res.data.sign_tips
              this.todayIndex = index
            } else {
              obj.signStatus = res.data.sign_detail[item] ? 2 : 3
              obj.tip = res.data.sign_detail[item] ? '已签到' : '未签到'
            }

            let t1 = item.split(".")
            let t2 = t1[0]
            let t3 = t1[1][0] == 0 ? t1[1].substr(-1) : t1[1].substr(-2)
            obj.time = t2 + '月' + t3 + '日'
            this.signArr.push(obj)
          })
          console.log(this.signArr)
        }
      })
      .finally(() => {
        this.loading = false
      })
    },

    handleSignBtn () {
      if (!this.activeData.sign_status) {
        return this.$message({message: this.activeData.sign_tips, type: 'warning'})
      }
      this.dialogVisible1 = true
    },

    handleApplyBtn () {
      if (this.loading) return
      this.loading = true
      this.$http(this.ApiSetting.user.transferSubmit,{
        from: "NM",
        to: this.walletList[this.walletFlag].code,
        money: 8,
        active_id: this.activeData.id
      })
      .then(res => {
        if(res.status == 1) {
          this.$message({message: '转账成功！',type: 'success'})
          this.signTip = '恭喜签到成功，记得去免费抽奖哦'
          this.activeData.sign_status = -1
          this.signArr[this.todayIndex].tip = '已签到'
          this.activeData.open_status = 1
          this.dialogVisible1 = false
        }
      })
      .finally(() => {
        this.loading = false
      })
    },

    handleOpenBtn () {
      if (this.loading) return
      if (!this.activeData.open_status) {
        return this.$message({message: this.activeData.open_tips, type: 'warning'})
      }

      this.loading = true
      this.$http(this.ApiSetting.active.joinCsgoMajorDraw)
      .then(res => {
        if(res.status == 1) {
          this.activeData.open_status = -1
          this.awardData = res.data
          this.dialogVisible2 = true
        }
      })
      .finally(() => {
        this.loading = false
      })
    },

    handleRecordBtn () {
      if (!this.isLogin) {
        return this.$message({message: "请您先登录！", type: 'warning'})
      } else {
        this.dialogVisible3 = true
        this.initData()
      }
    },

    formateNum (num) {
      num = num ? num : 0.00
      return parseFloat(num).toLocaleString()
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
		},

    fireMove1 () {
      this.fireGroup.forEach((item,i) => {
        let disX = Math.floor(3 * Math.random())
        let disY = Math.floor(2 * Math.random())
        item.top -= disY
        item.left -= disX
        item.rotate += 1
        item.opacity -= 0.001
        if (item.top < 0 || item.left < 0) {
          this.fireGroup.splice(i, 1)
          let top = 200 + Math.floor(Math.random() * 300)
          let resetData = {top: top, left: 800, rotate: 0, opacity: 1, id: Math.random()}
          let newImg = {...item, ...resetData}
          this.fireGroup.push(newImg)
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
  .csgo-major {
    width: 100%;
    height: 2531px;
    box-sizing: border-box;
    padding-top: 560px;
    background: url("../../../assets/active/csgomajor/bg.jpg") no-repeat center top;
    position: relative;
    overflow: hidden;
    .fire-group1 {
      position: absolute;
      width: 800px;
      height: 400px;
      left: 50%;
      transform: translateX(160px);
      top: 300px;
      img {
        position: absolute;
        transform-origin: center;
      }
    }
    @keyframes fire8-right {
      0% {transform: rotate(0deg)}
      100% {transform: rotate(360deg);}
    }
    @keyframes fire9-right {
      0% {transform: translateX(360px) rotate(0deg);top: -300px;opacity: 1;}
      100% {transform: translateX(-1000px) rotate(40deg);top: -400px;opacity: 0;}
    }
    @keyframes fire9-left {
      0% {transform: translateX(-160px) rotate(0deg);top: -400px;opacity: 1;}
      100% {transform: translateX(1200px) rotate(-40deg);top: -600px;opacity: 0;}
    }
    .fire8-right {
      position: absolute;
      left: 50%;
      transform: translateX(160px);
      top: 0px;
      // transform-origin: right center;
      animation: fire8-right 20s linear 0s infinite;
    }
    .fire9-right {
      position: absolute;
      left: 50%;
      transform: translateX(360px);
      top: -300px;
      animation: fire9-right 8s linear 0s infinite;
    }
    .fire9-right2 {
      position: absolute;
      left: 50%;
      transform: translateX(360px);
      top: -300px;
      animation: fire9-right 8s linear 4s infinite;
    }

    .fire9-left {
      position: absolute;
      right: 50%;
      transform: translateX(-160px);
      top: -600px;
      animation: fire9-left 8s linear 0s infinite;
    }
    .fire9-left2 {
      position: absolute;
      right: 50%;
      transform: translateX(-160px);
      top: -600px;
      animation: fire9-left 8s linear 4s infinite;
    }
    h3 {
      font-size: 28px;
      color: #f5efc3;
      text-align: center;
    }
    .notice {
      font-size: 15px;
      text-align: center;
      color: #fff;
      margin-top: 15px;
      margin-bottom: 50px
    }
    .csgo-title {
      background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -31px -43px;
      width: 636px;
      height: 101px;
      overflow: hidden;
      margin-top: -15px;
      p:nth-child(1) {
        font-size: 24px;
        color: #f5efc3;
        font-weight: bold;
        margin-left: 107px;
        margin-top: 15px;
        span {
          font-size: 30px;
        }
      }
      p:nth-child(2) {
        font-size: 16px;
        color: #fff;
        margin-left: 107px;
        margin-top: 10px;
        span {
          font-size: 20px;
          color: #f5efc3;
          font-weight: bold;
        }
      }
    }
    .csgo-title2 {
      margin-top: 40px
    }
    .content {
      width: 1232px;
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .sign-box {
      width: 100%;
      height: 180px;
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      .sign-item {
        width: 90px;
        height: 180px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -1089px -47px;
        p:nth-child(1) {
          margin-top: 34px
        }
        p:nth-child(2) {
          margin-top: 47px
        }
        p:nth-child(3) {
          margin-top: 24px
        }
      }
      .item2 {
        color: #ffe9a4;
        background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -781px -47px;
        p:nth-child(1) {
          color: #fff
        }
      }
      .item3 {
        color: #007769;
        background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -884px -47px;
      }
      .item4 {
        color: #ffe9a4;
        background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -986px -47px;
      }
    }

    .notice2 {
      margin-top: 30px;
      margin-bottom: 20px;
    }
    .sign-btn {
      background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -226px -173px;
      width: 164px;
      height: 44px;
      font-size: 14px;
      color: #0d6d4e;
      font-weight: bold;
      border: none;
      text-align: center;
      margin-left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
    }
    .sign-btn:hover {
      background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -419px -173px;
    }
    .sign-btn:disabled {
      background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -35px -173px;
      color: #4b4b4b
    }

    .welfare-2 {
      position: relative;
      margin-bottom: 43px;
    }
    .open-box {
      width: 817px;
      height: 345px;
      overflow: hidden;
      position: relative;
      margin-top: 30px;
      background: url('../../../assets/active/csgomajor/award.png') no-repeat;
    }
    .award-list {
      width: 790px;
      height: 185px;
      margin-left: 14px;
      margin-top: 65px;
      overflow: hidden;
    }

    .award-title {
      font-size: 20px;
      font-weight: bold;
      color: #006b2d;
      text-align: center;
      margin-top: 27px;
    }

    @keyframes swipermove {
      0% {transform: translateX(0);}
      100% {transform: translateX(-50%);}
    }

    .award-inner {
      width: 2848px;
      height: 100%;
      display: flex;
      justify-content: space-around;
      animation: swipermove 20s linear infinite;
    }

    .award-item {
      background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -365px -278px;
      width: 218px;
      height: 196px;
      p {
        font-size: 14px;
        margin-top: 3px;
        color: #fff;
        text-align: center;
      }
    }

    .award-btn {
      position: absolute;
      background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -205px -442px;
      width: 111px;
      height: 31px;
      top: 20px;
      right: 23px;
      border: none;
      font-size: 14px;
      color: #fef895;
      cursor: pointer;
    }

    .box-key {
      width: 287px;
      height: 300px;
      position: absolute;
      top: 0px;
      right: 50px;
      .box {
       	background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -39px -239px;
        width: 287px;
        height: 182px;
        margin-top: 50px;
        margin-bottom: 50px
      }
    }
    .rule-box {
      width: 1232px;
      height: 528px;
      box-sizing: border-box;
      padding: 60px 220px;
      font-size: 14px;
      color: #fff;
      margin-top: 20px;
      background: url('../../../assets/active/csgomajor/rule.png') no-repeat;
      ol {
        li {
          list-style: decimal;
          margin-bottom: 12px;
          line-height: 2;
        }
      }
    }
    .back-button {
      display: block;
      width: 248px;
      height: 70px;
      margin-top: 50px;
      font-size: 24px;
      color: #fff;
      text-align: center;
      line-height: 70px;
      margin-left: 50%;
      transform: translateX(-50%);
      background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -660px -295px;
    }
    .back-button:hover {
      background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -660px -401px;
    }
  }
</style>
<style lang="less">
  .csgo-dialog {
    width: 660px;
    background: transparent;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0px;
      background: transparent;
    }
    .csgo-dialog-title {
      font-size: 32px;
      font-weight: bold;
      color: #006b2d;
      margin-bottom: 20px;
      text-align: center;
      position: relative;
      i {
        position: absolute;
        display: block;
        width: 22px;
        height: 22px;
        right: 0px;
        top: 10px;
        cursor: pointer;
	      background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -1031px -441px;
      }
      i:hover {
        background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -983px -441px;
      }
    }
    .dialog_wrapper {
      width: 660px;
      height: 402px;
      overflow: hidden;
      background: url("../../../assets/active/csgomajor/dialog.jpg") no-repeat center top;
    }
    .button-cancle {
      width: 162px;
      height: 42px;
      font-size: 14px;
      text-align: center;
      line-height: 42px;
      color: #fff;
      cursor: pointer;
      background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -967px -366px;
    }
    .button-confirm {
      width: 162px;
      height: 42px;
      font-size: 14px;
      text-align: center;
      line-height: 42px;
      color: #0d6d4e;
      font-weight: bold;
      cursor: pointer;
      background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -226px -173px;
      &:hover {
        background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -419px -173px;
      }
    }
  }
  .csgo-dialog-1 {
    .notice {
      width: 100%;
      margin-top: 25px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      span {
        font-size: 20px;
        color: #fef895;
        font-weight: bold;
      }
    }
    .button-box {
      width: 100%;
      height: 120px;
      box-sizing: border-box;
      padding: 40px 78px;
      display: flex;
      justify-content: space-between;

      flex-wrap: wrap;
      .button {
        width: 214px;
        height: 43px;
        box-sizing: border-box;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 43px;
        border: 2px solid #006b2d;
        margin-bottom: 38px
      }
      .button.active,.button:hover{
        cursor: pointer;
        border: none;
        background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -965px -292px;
      }
    }
    .button-box-2 {
      width: 100%;
      box-sizing: border-box;
      padding: 0px 100px;
      display: flex;
      justify-content: space-between;
      position: absolute;
      bottom: 34px
    }
  }
  .csgo-dialog-2 {
    .dialog-notice {
      height: 55px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      color: #fff;
      text-align: center;
      margin-top: 10px;
      p:nth-child(2) {
        color: #fef895;
        span {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    .img-box {
      width: 214px;
      height: 195px;
      margin-left: 50%;
      transform: translateX(-50%);
      margin-top: 30px;
      background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -365px -278px;
      img {
        width: 214px
      }
    }

    .img-name {
      font-size: 14px;
      color: #fff;
      text-align: center;
      line-height: 33px;
    }
    .button-box-2 {
      width: 100%;
      box-sizing: border-box;
      padding: 0px 100px;
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 34px
    }
  }

  .csgo-dialog-3 {
    .dialog-title {
      width: 70%;
      margin-left: 15%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      color: #fff;
      margin-top: 30px;
      margin-bottom: 40px
    }
    .item-box {
      width: 100%;
      //margin-left: 15%;
      height: 280px;
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .list-item {
      width: 70%;
      height: 38px;
      line-height: 38px;
      margin-left: 15%;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #5d816c;
      border-bottom: 1px solid #04381a;
    }
    .none-data {
     	background: url('../../../assets/active/csgomajor/sprite.png') no-repeat -1169px -350px;
      width: 101px;
      height: 124px;
      margin-left: 50%;
      margin-top: 100px;
      transform: translateX(-50%);
    }
    .none-title {
      font-size: 14px;
      color: #fff;
      text-align: center;
      margin-top: 34px
    }
    .page-control {
      position: absolute;
      width: 60%;
      left: 20%;
      bottom: 30px;
      display: flex;
      justify-content: space-around;
      color: #5d816c;
      span {
        cursor: pointer;
        color: #5d816c;
        &:hover {
          color: #7baa8f;
        }
      }
    }
  }
</style>
