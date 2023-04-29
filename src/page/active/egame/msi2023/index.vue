<template>
  <div v-cloak class="msi2023">

    <!-- 开箱中奖弹幕-->
    <vue-baberrage
      :isShow="true"
      :barrageList="bulletScreen"
      :throttleGap="5000"
      :boxHeight="600"
      :messageHeight="48"
      :lanesCount="10"
      :loop="false"
      class="msi-baberrage"/>
      <dl class="date">
        <dt></dt>
        <dd>{{ activeData.active_show_time }}</dd>
      </dl>
    <div class="content">
      <!-- tab切换 -->
      <div class="tab">
        <button @click="handleChangeTab(true)" :class="[isDrawView ? 'active' :'','tab-left']"></button>
        <button @click="handleChangeTab(false)" :class="[!isDrawView ? 'active' :'','tab-right']"></button>
      </div>
      <!-- 抽奖 -->
      <template v-if="isDrawView">
        <!-- 领奖 -->
        <div class="active-title-bg"></div>
        <dl class="accept-award">
          <dt class="title">活动期间，会员当日首充≥100元且在电竞场馆 投注【MSI季中邀请赛】中累计有效投注额≥1,000 元，即可领取抽奖机会。
            <router-link to="/user/finance" class="txt_danger"><span>去充值 ></span></router-link>
          </dt>
          <dd>
            <div class="accept-award-box">
              <dl v-for="(item,i ) in activeData.ticket" :key="i">
                <dt class="accept-award-bg">
                  <img :src="handleChangeImage(item,i)" alt="">
                </dt>
                <dd>
                  <div :class="['progress-bar',item.status >0 ? 'active':'']">
                    <div class="progress"></div>
                    <div class="bg"></div>
                  </div>
                  <p class="bet-amount">{{item.bet}}</p>
                </dd>
              </dl>
            </div>
            <div class="accept-award-submit">
              <router-link :to="{name: 'home', params: {game: '2'}}" class="betting"></router-link>
              <button class="msi-primary-btn accept" @click="extraTicket(1)"></button>
            </div>
          </dd>
        </dl>
        <!-- 邀请 -->
        <dl class="invite">
          <dt class="invite-title"></dt>
          <dd class="content">
            <div class="award">
              <div class="invite-award-header">
                <vue-seamless-scroll
                    :data="activeData.roll_tips"
                    :class-option="classOption"
                    class="warp"
                  >
                    <ul class="item">
                      <li v-for="(item, index) in activeData.roll_tips" :key="index">
                        <span class="title" v-text="item"></span>
                      </li>
                    </ul>
                </vue-seamless-scroll>
              </div>
              <div class="game-award" :class="{'active':drawViewloading}">
                <button class="invite-award" @click="extraTicket(2)"></button>
                <div class="lotteryTicketIcon-box">
                  <img v-show="gifData.lotteryTicketIcon && raffleTicketType ==2" :src="gifData.lotteryTicketIcon" class="lottery-ticket">
                </div>
                <div class="invite-award-tip">
                  剩余抽奖机会<span class="txt_danger"><b>{{activeData.extra_ticket}}</b>次</span>
                </div>
              </div>
            </div>
            <div class="invite-text">
              <dl>
                <dt>
                  <div class="invite-text-title">分享好友</div>
                </dt>
                <dd>活动期间每邀请一位好友注册成功， 且完成下注即可领取1次额外抽奖券机会。</dd>
              </dl>
              <dl class="m-t-30">
                <dt><div class="invite-text-title">额外抽奖券</div></dt>
                <dd>最高可额外获得<span class="txt_danger">10</span>张抽奖券。</dd>
              </dl>
              <button @click="$router.push('/user/seo')" class="msi-primary-btn share"></button>
            </div>
          </dd>
        </dl>
        <dl class="cheers-raffle">
          <dt class="title"></dt>
          <dd>
            <div class="winning-tip">当前抽奖券：</div>
            <div class="cheers-raffle-top">
              <div class="winning-times-bg">
                <div class="winning-times">{{activeData.my_ticket }}</div>
                <img src="@/assets/active/egame/msi2023/refresh-icon.png" :class="{'refreshing':refreshLoading}" @click="refreshActiveData" ref="refreshIcon" alt="">
              </div>
              <b class="winning-record" @click="openRecordVisible()">中奖记录</b>
            </div>
            <vkLuckyDraw
              :prizesList="activeData.prize_goods"
              :resultIndex="vkResultIndex"
              :test="vkTest"
              @onStart="luckyDrawOnStart"
              @canShowResultPop="CanShowResultPopHandle"/>
          </dd>
        </dl>
      </template>
      <!-- 包赔 -->
      <template v-else>
        <div class="reparation">
          <dl class="competition">
            <dt class="competition-title">共{{gameListTotal}}场赛事</dt>
            <dd class="carousel-box">
              <el-carousel indicator-position="none" :autoplay="false" arrow="never" ref="carousel">
                <el-carousel-item v-for="(gameList,index) in gameLists" :key="index">
                  <div class="carousel-item-box">
                    <dl v-for="item in gameList" :key="item.id">
                      <dt class="competition-box">
                        <p>{{item.game_name}}</p>
                        <div class="competition-img-box">
                          <img :src="item.l_team_logo" alt="">
                          <div class="text-time">
                            <template v-if="item.game_status!= 1">
                              {{item.game_status==2 ? '比赛中':'已结束'}}
                            </template>
                            <template v-else>
                              {{item.date_time}}
                            </template>
                          </div>
                          <img :src="item.r_team_logo" alt="">
                        </div>
                        <div class="competition-name">
                          <span>{{item.l_team_name}}</span>
                          <span>{{item.r_team_name}}</span>
                        </div>
                      </dt>
                      <dd>
                        <template v-if="item.game_status == 3">
                          <div class="block-btn">
                            <button @click="apply(item)" class="apply-compensation-btn"></button>
                          </div>
                        </template>
                        <template v-else>
                          <div class="txt">
                            <template v-if="item.game_status==1 && item.showTime">
                              <div>请在<strong class="txt_danger">{{formatCountTime(item.countTime)}}</strong>内完成活动存款要求</div>
                              <div>点击进入<router-link :to="{path:'/user/finance/'}">财务中心</router-link></div>
                            </template>
                            <template v-else>
                              <div>本比赛活动要求存款时间</div>
                              <div>{{formatDate(item.deposit_start_time*1000,'MM.dd HH:mm')}}-{{formatDate(item.deposit_end_time*1000,'MM.dd HH:mm')}}</div>
                            </template>
                          </div>
                        </template>
                      </dd>
                    </dl>
                  </div>
                </el-carousel-item>
              </el-carousel>
              <button class="arrow-left carousel-btn" @click="$refs['carousel'].prev()"></button>
              <button class="arrow-right carousel-btn" @click="$refs['carousel'].next()"></button>
            </dd>
          </dl>
          <dl class="active-introduce">
            <dt class="title-bg"></dt>
            <dd class="introduce">
              <p class="title">
                活动期间，会员在活动存款时间内存款并参与指定电竞赛事【MSI季中邀请赛】的盘口投注，
                若单笔注单结算为负盈利，
                即可申请注单包赔，领取包赔金。
              </p>
              <table>
                <tr class="th-bg"><th>等级要求</th><th>存款金额(￥)</th><th>单笔注单金额(￥)</th><th>包赔返利</th><th>包赔金额(￥)</th><th>流水要求</th></tr>
                <tr class="hide-border"><td>VIP0-VIP1</td><td rowspan="7">≥500</td><td rowspan="7">≥500</td><td>3%</td><td>88</td><td rowspan="7">3倍电竞流水</td></tr>
                <tr><td>VIP2-VIP3</td><td>5%</td><td>188</td></tr>
                <tr><td>VIP4-VIP5</td><td>10%</td><td>288</td></tr>
                <tr><td>VIP6-VIP7</td><td>15%</td><td>388</td></tr>
                <tr><td>VIP8-VIP9</td><td>20%</td><td>588</td></tr>
                <tr><td>VIP10-VIP111</td><td>25%</td><td>888</td></tr>
                <tr><td>VIP12</td><td>50%</td><td>3888</td></tr>
              </table>
            </dd>
          </dl>
        </div>
      </template>
      <dl class="rules">
        <dt class="title"></dt>
        <dd>
          <ul>
            <li>每日未发起提款前的存款都视为首充；场馆要求：小艾电竞、RG电竞、TF电竞、IM电竞。</li>
            <li>会员每日首充≥100元并且投注MSI赛事，累计流水达到对应的额度，即可获得抽奖机会。每日获得的抽奖卷仅限当日使用，隔日则无效。</li>
            <li>分享加码：使用个人中心-推广/分享里的专属推广链接或邀请码，通过QQ、论坛、贴吧、微博等方式分享，成功邀请好友来注册，并且完成下注，即可随机获得1～10张抽奖卷。</li>
            <li>活动的现金奖品系统将自动派发至会员的主钱包中，彩金需完成全站3倍有效流水，活动流水未完成前不可再次申请本活动。奖品领取有效期为：自中奖之日起，15日内有效，若奖品为实物奖品，请您在背包中选择快递到家并填写您的详细收货地址，我们将于次日安排发货，快递单号将会发送站内信通知；除此之外您也可以在背包中自行折现，实物奖品折现后无需流水即可提款。</li>
            <li>有效流水要求：电竞赔率＜1.5、亚洲盘赔率≤0.75、欧洲盘＜1.75、美洲盘≤1.33、马来盘≤0.75且＞0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水；查看详情。</li>
            <li>邀请人与受邀请人必须为不同身份的真实玩家、每位有效玩家、每个手机号码、电子邮箱、IP地址（包括使用VPN）、每张银行卡、每台设备都会被判定为同一玩家</li>
            <li>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能参与一次优惠，参与用户必须先绑定银行卡，对违规的用户，VKGAME保留无期限审核，和扣回红利及产生的利润权利。本活动最终解释权归VKGAME所有。</li>
          </ul>
        </dd>
      </dl>
    </div>

    <router-link to="/active" class="msi-primary-btn back-home"></router-link>
     <!-- 中奖信息Dialog-->
    <msi2023Gift :visible.sync="drawVisible" :gif-data="gifData" />

    <!-- 中奖记录Dialog-->
    <msi2023Record :visible.sync="recordVisible" :is-login="activeData.is_login" />
  </div>
</template>

<script>
import msi2023Gift from "./components/msi2023Gift.vue"
import msi2023Record from "./components/msi2023Record.vue"
import vkLuckyDraw from "./components/vkLuckyDraw.vue"
import { RulesValidator } from "../../../../utils/Validators"
import { formatDate, formatCountTime } from '@/utils/util'
import Vue from "vue"
import { vueBaberrage, MESSAGE_TYPE } from "vue-baberrage"
Vue.use(vueBaberrage)
export default {
  name: "msi2023",
  components:{
    msi2023Gift,
    msi2023Record,
    vkLuckyDraw
  },
  data(){
    return {
      activeData:{
        bullet_screen:[],
        active_show_time:'',
        is_login:0,
        my_coupon:0,
        extra_ticket:0,//
        open_tips:'',
        gift_records:[],
        ticket:[],
        prize_goods:[],
        roll_tips:[]
      },
      // type 0//领取奖券通知类型
      gifData:{
        price: '',
        type: 0,
        ticket:10,
        lotteryTicketIcon:null,
        icon_url: '',
        item_name: ''
      },
      raffleTicketType:1,

      drawVisible:false,

      recordVisible:false,

      isDrawView:true,

      loading:false,

      drawViewloading:false,

      acceptLoading:false,

      drawloading:false,

      isApply:true,

      bulletScreen: [],

      classOption:{
        singleHeight: 35
      },
      treasureChestList: [
        require("../../../../assets/active/egame/msi2023/lottery-ticket1.png"),
        require("../../../../assets/active/egame/msi2023/lottery-ticket2.png"),
        require("../../../../assets/active/egame/msi2023/lottery-ticket3.png"),
        require("../../../../assets/active/egame/msi2023/lottery-ticket4.png"),
        require("../../../../assets/active/egame/msi2023/lottery-ticket5.png"),
        require("../../../../assets/active/egame/msi2023/lottery-ticket6.png"),
        require("../../../../assets/active/egame/msi2023/lottery-ticket7.png"),
        require("../../../../assets/active/egame/msi2023/lottery-ticket8.png"),
        require("../../../../assets/active/egame/msi2023/lottery-ticket9.png"),
        require("../../../../assets/active/egame/msi2023/lottery-ticket10.png"),
        require("../../../../assets/active/egame/msi2023/lottery-ticket11.png"),
        require("../../../../assets/active/egame/msi2023/lottery-ticket12.png"),
        require("../../../../assets/active/egame/msi2023/lottery-ticket13.png"),
        require("../../../../assets/active/egame/msi2023/lottery-ticket14.png"),
        require("../../../../assets/active/egame/msi2023/lottery-ticket15.png")
      ],
      vkResultIndex: -1,
      vkTest: 1,
      gameLists:[],
      gameListTotal:0,
      cuountInter:null,
      initTimes:true,
      refreshTimer:null,
      refreshLoading:false
    }

  },
  created(){
    this.initActiveData()
  },
  methods:{
    /**
     * 获取活动数据
     * @returns {Promise<void>}
     */
     async initActiveData () {
      this.loading = true
      try {
        const res = await this.$http(this.ApiSetting.active.msi2023.activeMsi2022Init)
        console.info("msi 2023活动初始化响应：", res)
        if (res.status === 1) {
          this.activeData = res.data
          if(this.initTimes) this.addBarrageData(res.data.bullet_screen);
          this.loading = false
        }
      } catch (e) {
        this.loading = false
        throw e
      }
    },
    /**
     * 领取抽奖机会 / 邀请好友抽奖
     * type 1 领取 2 邀好友
     * @returns {Promise<void>}
     */
    async extraTicket(from=1){
      setTimeout(()=>{
        this.gifData.lotteryTicketIcon = '';
      },2000)
      const rulesValidator = new RulesValidator([
        { validator: this.acceptLoading },
        { validator: this.loading, message: "数据加载中，请稍后..." },
        { validator: this.activeData.is_login === 0, message: "请您先登录" }
      ])

      if (rulesValidator.status) {
        this.acceptLoading = true
        try {
          const res = await this.$http(this.ApiSetting.active.msi2023.extraTicket,{from})
          if (res.status === 1) {
            this.initActiveData()
            this.acceptLoading = false
            this.gifData.type = 0
            this.gifData.ticket = res.data.ticket
            this.gifData.lotteryTicketIcon = this.treasureChestList[res.data.ticket-1]
            this.raffleTicketType = from
            if(from==2){
              setTimeout(()=>{
                this.drawVisible = true
                this.drawViewloading = false;
              },2000)

            }else{
              this.drawVisible = true
            }
          }
        } catch (e) {
          this.acceptLoading = false
          throw e
        }
      }else{
        this.acceptLoading = false
      }
    },
    async luckyDrawOnStart() {
      const rulesValidator = new RulesValidator([
        { validator: this.drawloading },
        { validator: this.loading, message: "数据加载中，请稍后..." },
        { validator: this.activeData.is_login === 0, message: "请您先登录" }
      ])

      if (rulesValidator.status) {
        this.drawloading = true
        try {
          const res = await this.$http(this.ApiSetting.active.msi2023.draw)
          if (res.status === 1) {
            this.vkResultIndex = this.activeData.prize_goods.findIndex(e=>e.id==res.data.id);
            this.initActiveData()
            this.gifData.type = res.data.type
            this.gifData.icon_url = res.data.icon_url
            this.gifData.price = res.data.price
            this.gifData.item_name = res.data.item_name
            this.drawloading = false
            console.log(vkResultIndex,res.data.id)
          }
        } catch (e) {
          this.drawloading = false
          throw e
        }
      }else{
        this.drawloading = false
      }

    },
    /**
     * push中奖弹幕
     * @param list
     */
    addBarrageData (list) {
      this.initTimes = false;
      let added = 0
      let bulletTimer
      clearInterval(bulletTimer)
      bulletTimer = setInterval(() => {
        this.bulletScreen = []
        if (list.length && added <= list.length) {
          const pushNum = Number.parseInt(Math.random() * 10)
          for (let i = 0; i < pushNum; i++) {
            if ((i + added) < list.length - 1) {
              this.bulletScreen.push({
                id: i + 1,
                avatar: list[i + added].head_image,
                msg: `恭喜${list[i + added].username}获得${list[i + added].goods_name}！`,
                time: Math.random() * 50 + 5,
                type: MESSAGE_TYPE.NORMAL,
                barrageStyle: "cus-style",
                extraWidth: 336
              })
            }
          }
          added += pushNum
          if (added >= list.length) {
            clearInterval(bulletTimer)
          }
        }
      }, 1000 * 10)
    },
    CanShowResultPopHandle() {
      this.drawVisible = true
      // alert('抽奖成功');
      // 适当时机清楚抽奖记录
      setTimeout(() => {
        this.vkResultIndex = -1;
      }, 3000)
    },
    refreshActiveData(){
      if (this.refreshTimer) return
      this.refreshLoading = true
      this.initActiveData()
      clearTimeout(this.refreshTimer)
      this.refreshTimer = null
      this.refreshTimer = setTimeout(() => {
        this.refreshLoading = false
        clearTimeout(this.refreshTimer)
        this.refreshTimer = null
      }, 600)
    },
    openRecordVisible(){
      const rulesValidator = new RulesValidator([
        { validator: this.drawloading },
        { validator: this.loading, message: "数据加载中，请稍后..." },
        { validator: this.activeData.is_login === 0, message: "请您先登录" }
      ])
      if(rulesValidator.status){
        this.recordVisible = true
      }
    },
    //status 0 不可领取 1 可领取 2 已领取
    handleChangeImage(item,index){
      let img = 'awarded-bg'
      if(item.status == 0){
        img = index < 5 ? 'one-times-disabled' : 'two-times-disabled'
      }else if(item.status == 1){
        img = index < 5 ? 'one-time' : 'two-time'
      }
      return require(`../../../../assets/active/egame/msi2023/${img}.png`)
    },
    handleChangeTab(isDrawView){
      if(this.isDrawView == isDrawView) return
      this.isDrawView = isDrawView
      this.isDrawView ? this.initActiveData() : this.getGame()
    },
    async getGame(){
      try {
        const res = await this.$http(this.ApiSetting.active.msi2023.getGame)
        console.log(res)
        if (res.status === 1) {
          this.gameListTotal = res.data.length
          let gameLists = res.data;
          let have24h = false
          gameLists.forEach(item=>{
            let cuntdown = parseInt(Math.abs(item.deposit_end_time*1000 - new Date().getTime())/1000);
            item.countTime = cuntdown;
            item.showTime = false;
            console.log(item.showTime)
            if(cuntdown<=24*60*60) {
              have24h = true
              item.showTime = true
            }
          })
          console.log(have24h)
          if(have24h) {
            this.cuountInter = setInterval(() => {
              gameLists.forEach(e => {
                e.countTime--
                if(e.countTime<1) {
                  e.showTime = false
                  e.game_status = 2
                }
              })
              this.$forceUpdate()
            }, 1000);
          }
          this.gameLists = this.conversion(gameLists,2);
        }
      } catch (e) {
        throw e
      }
    },
    formatDate(num, formate) {
      return formatDate(num, formate)
    },
    formatCountTime(time) {
      return formatCountTime(time)
    },
    conversion (baseArray,n){
        let len = baseArray.length
        let lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1)
        let res = []
        for (let i = 0; i < lineNum; i++) {
          let temp = baseArray.slice(i * n, i * n + n)
          res.push(temp)
        }
        return res
    }
  }
}
</script>

<style lang="less" scoped>
button{
  border: none;
  &:active{
    opacity: .7;
  }
}
.msi-primary-btn{
  width: 186px;
  height: 70px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  background-repeat: no-repeat, no-repeat;
  background-size: 100% 100%;
}

.msi2023{
  border-top: 0.1px solid transparent;
  background-repeat: no-repeat, no-repeat;
  background-position: center 79px, center 709px;
  background-image: url("../../../../assets/active/egame/msi2023/banner.png"),
  url("../../../../assets/active/egame/msi2023/bg.png");
  .csgo-paris-baberrage {
    position: absolute!important;
    z-index: 5;
    top: 5px;
    left: 0;
    right: 0;
    height: 270px !important;
    pointer-events: none;
    /deep/ .baberrage-lane {
      .cus-style {
        .normal {
          border: 1px solid #3099bf;
          background-image: linear-gradient(to right, #38b8a2, #3099bf);
          font-size: 14px;
          color: #ffffff;
          box-sizing: border-box;
          padding: 0 12px;
          .baberrage-avatar {
            width: 24px;
            height: 24px;
            margin-top: 8px;
            img {
              width: inherit;
              height: inherit;
            }
          }
          .baberrage-msg {
            line-height: 40px;
            padding-left: 12px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .date {
    width: 599px;
    margin: 659px auto auto;
      dt {
        background: url("../../../../assets/active/egame/msi2023/data.png") no-repeat center top;
        background-repeat: no-repeat, no-repeat;
        height: 62px;
      }
      dd {
        margin-top: 23px;
        font-size: 18px;
        text-align: center;
        color: #fdf6ee;
      }
  }
  .content{
    width: 1260px;
    margin: 39px auto auto;
    .tab{
      display: flex;
      justify-content: center;
      button{
        width: 364px;
        height: 85px;
        color: #fff;
        font-size: 22px;
        cursor: pointer;
        background-color: transparent;
        border: none;
        background-repeat: no-repeat, no-repeat;
      }
      .tab-left{
        background-image:  url("../../../../assets/active/egame/msi2023/tab-left.png");
        background-repeat: no-repeat, no-repeat;
        margin-right: 56px;
      }
      .tab-right{
        background-image:  url("../../../../assets/active/egame/msi2023/tab-right.png");
        background-repeat: no-repeat, no-repeat;
        }
      .active.tab-left{
          background-image: url("../../../../assets/active/egame/msi2023/tab-active-left.png");
          background-repeat: no-repeat, no-repeat;
      }
      .active.tab-right{
          background-image: url("../../../../assets/active/egame/msi2023/tab-active-right.png");
          background-repeat: no-repeat, no-repeat;
      }
    }

    .active-title-bg{
      width: 599px;
      height: 63px;
      margin: 60px auto auto;
      background-image: url("../../../../assets/active/egame/msi2023/active-introduce-title-bg.png");
      background-repeat: no-repeat, no-repeat;
      background-size: 100% 100%;
    }
    .accept-award{
      width: 1260px;
      height: 308px;
      margin: 24px auto auto;
      text-align: center;
      color: #fff;
      background-image: url("../../../../assets/active/egame/msi2023/accept-award-bg.png");
      background-repeat: no-repeat, no-repeat;
      background-size: 100% 100%;
      .title{
        padding-top:29px ;
      }
      .accept-award-box{
        display: flex;
        justify-content: space-between;
        margin: 0 52px;
        margin-top: 51px;
        dl{
          display: flex;
          flex-direction: column;
          position: relative;
        .accept-award-bg {
          width: 86px;
          height: 33px;
        }
        img{
        width: inherit;
        height: inherit;
        }
        .progress-bar {
          display: flex;
          align-items: center;
          position: absolute;
          left: -52px;
          right: 0;
          bottom: 36px;
          &.active{
            .bg{
              background-image: url("../../../../assets/active/egame/msi2023/progress-active-bg.png");
            }
            .progress{
              background-color: #e93324;
            }
          }
          .bg{
            width: 37px;
            height: 22px;
            background-image: url("../../../../assets/active/egame/msi2023/progress-bg.png");
            background-repeat: no-repeat, no-repeat;
            margin: 0 2px;
          }
          .progress{
            width: 78px;
            height: 2px;
            background-color: #6d6c6b;

          }
        }
          .bet-amount{
            width: 68px;
            margin-top: 49px;
            font-size: 14px;
          }
        }
      }
      .accept-award-submit{
        margin-top:25px ;
        display: flex;
        justify-content: center;
        .betting{
          width: 186px;
          height: 70px;
          cursor: pointer;
          background-size: 100% 100%;
          background-image: url("../../../../assets/active/egame/msi2023/bet-bg.png");
          background-repeat: no-repeat, no-repeat;
          margin-right: 54px;
          &:active{
            opacity: 0.7;
          }
        }
        .msi-primary-btn.accept{
          width: 186px;
          height: 70px;
          background-image: url("../../../../assets/active/egame/msi2023/accept-award-but.png");
          background-repeat: no-repeat, no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .invite{
      margin-top: 120px;
      .invite-title{
        width: 699px;
        height: 96px;
        margin: 0 auto;
        background-image: url("../../../../assets/active/egame/msi2023/invite-title-bg.png");
        background-repeat: no-repeat, no-repeat;
        background-size: 100% 100%;
      }
      .content{
        margin-top: 24px;
        width: 1260px;
        height: 453px;
        background-image: url("../../../../assets/active/egame/msi2023/invite-content-bg.png");
        background-repeat: no-repeat, no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .award{
          display: flex;
          align-items: center;
          flex-direction: column;
          .invite-award-header{
            width: 258px;
            height: 74px;
            font-size: 16px;
            color: #fff;
            text-align: center;
            line-height: 64px;
            background-image: url("../../../../assets/active/egame/msi2023/invalid-award--tip-bg.png");
            background-repeat: no-repeat, no-repeat;
            background-size: 100% 100%;
            .warp {
              height: 35px;
              width: inherit;
              margin-top: 13px;
              overflow: hidden;
              ul {
                list-style: none;
                padding: 0;
                margin: 0 auto;
                li,
                a {
                  text-align: center;
                  height: 35px;
                  line-height: 35px;
                }
              }
            }
          }
          .game-award{
            width: 448px;
            height: 371px;
            background-image: url("../../../../assets/active/egame/msi2023/invalid-award-bg.png");
            background-repeat: no-repeat, no-repeat;
            background-size: 100% 100%;
            position: relative;
            &.active{
              &::after{
                content: "";
                width: 334px;
                height: 143px;
                position: absolute;
                background-size: 100% 100%;
                left: 63px;
                top: 22px;
                background-image: url("../../../../assets/active/egame/msi2023/invalid-award-bg.gif");
              }
              .lottery-ticket{
                transform: translateY(50px) !important;
              }
            }
            .invite-award{
              background-color: transparent;
              border: none;
              background-repeat: no-repeat, no-repeat;
              position: absolute;
              width: 145px;
              height: 97px;
              right: 53px;
              bottom: 93px;
              background-image: url("../../../../assets/active/egame/msi2023/invite-award-bt-bg.png");
              background-repeat: no-repeat, no-repeat;
              background-size: 100% 100%;
              cursor: pointer;
            }
            .lotteryTicketIcon-box{
              position: absolute;
              bottom: 40px;
              left: 123px;
              width: 77px;
              height: 31px;
              overflow: hidden;
              .lottery-ticket{
                position: absolute;
                bottom: 50px;
                left: 0;
                width: 77px;
                height: 31px;
                width: inherit;
                height: inherit;
                transition: 1s ease-in;
              }
            }

            .invite-award-tip{
              position: absolute;
              right: 62px;
              bottom: 35px;
              font-size: 13px;
              b{
                font-size: 24px;
                margin-left: 12px;
              }
            }
          }
        }
        .invite-text{
          color: #fdf6ee;
          margin-left: 41px;
          dt{
            width: 120px;
            height: 20px;
            font-size: 20px;
            position: relative;
            font-weight: bold;
            background: linear-gradient(to right, #e93323, transparent);
            .invite-text-title{
              position: absolute;
              width: 100%;
              left: 0;
              top: -15px;
            }
          }
          dd{
            width: 252px;
            word-wrap: break-word;
            line-height: 24px;
            font-size: 14px;
          }
          .share{
            width: 146px;
            height: 44px;
            margin-top: 13px;
            background-image: url("../../../../assets/active/egame/msi2023/share-btn.png");
            background-repeat: no-repeat, no-repeat;
            background-size: contain;
          }
        }
      }
    }
    .cheers-raffle{
      margin-top: 125px;
      color: #fdf6ee;
      .title{
        width: 699px;
        height: 96px;
        margin: 0 auto;
        background-image: url("../../../../assets/active/egame/msi2023/cheers-raffle-title-bg.png");
        background-repeat: no-repeat, no-repeat;
        background-size: 100% 100%;
      }
      dd{
        height: 886px;
        background-image: url("../../../../assets/active/egame/msi2023/cheers-raffle-bg.png");
        background-repeat: no-repeat, no-repeat;
        background-size: 100% 100%;
      }
      .winning-tip{
        font-size: 24px;
        margin-left: 38px;
      }
      .cheers-raffle-top{
        display: flex;
        margin: 0 38px;
        justify-content: space-between;
        align-items: flex-end;
        .winning-times-bg{
          margin-top: 76px;
          width: 418px;
          height: 50px;
          background: linear-gradient(to right, #e93323, transparent);
          position: relative;
          .winning-times{
            position: absolute;
            font-weight: bold;
            font-size: 112px;
            width: 100%;
            left: 0;
            bottom: -18px;
          }
          img{
            position: absolute;
            cursor: pointer;
            width: 30px;
            height: 27px;
            left: 74px;
            top: 11px;
          }
          @keyframes rotate-animate {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          .refreshing{
            animation: rotate-animate .6s linear;
          }
        }
        .winning-record{
          font-size: 22px;
          text-decoration:underline;
          cursor: pointer;
        }
      }
    }
    .reparation{
      margin-top: 50px;
      .competition{
        height: 336px;
        background-image: url("../../../../assets/active/egame/msi2023/competition-bg.png");

        .carousel-box{
          display: flex;
          justify-content: center;
          color: #000000;
          font-size: 14px;
          position: relative;
            .el-carousel{
              width: 745px;
              margin-top: 30px;
              .el-carousel__arrow--left{
                left: -99px;
                width: 36px;
                height: 100px;
                border-radius: 0;
                background-color:#fdf6ee;
              }
              .carousel-item-box{
                display: flex;
                justify-content: space-between;
                .competition-box{
                  width: 324px;
                  height: 175px;
                  background-image: url("../../../../assets/active/egame/msi2023/competition-carousel-bg.png");
                  p{
                    font-family: MicrosoftYaHei-Bold;
                    text-align: center;
                    box-sizing: content-box;
                    padding-top: 13px;
                    font-size: 16px;
                    font-weight: bold;
                  }
                  .competition-img-box{
                    display: flex;
                    justify-content: space-between;
                    margin: 25px 40px 11px 40px;
                    margin-top: 25px;
                    img{
                      width: 44px;
                      height: 59px;
                    }
                    .text-time{
                      padding-top:16px;
                      width: 65px;
                      word-wrap: break-word;
                      text-align: center;
                    }
                  }
                  .competition-name{
                    display: flex;
                    justify-content: space-between;
                    text-align: center;
                    span{
                      width: 40%;
                    }
                  }
              }
              .block-btn{
                display: flex;
                justify-content: center;
                .apply-compensation-btn{
                  width: 172px;
                  height: 56px;
                  margin-top: 16px;
                  cursor: pointer;
                  background-color: transparent;
                  border: none;
                  background-repeat: no-repeat, no-repeat;
                  background-image: url("../../../../assets/active/egame/msi2023/apply-compensation-btn.png");
                }
              }

              .txt{
                width: 218px;
                height: 34px;
                margin: 12px auto auto;
                word-wrap: normal;
                text-align: center;
                line-height: 22px;
                color: #fff;
                font-size: 14px;
                a{
                  text-decoration: underline;
                  color: #e93323;
                }
              }
            }
          }
          .carousel-btn{
            position: absolute;
            width: 36px;
            height: 100px;
            transform: translateY(-50%-29px);
            cursor: pointer;
          }
          .arrow-left{
            left: 123px;
            top: 50%;
            background: #fdf6ee url("../../../../assets/active/egame/msi2023/arrow-left.png") no-repeat center center;

          }
          .arrow-right{
            right: 123px;
            top: 50%;
            background: #e93323 url("../../../../assets/active/egame/msi2023/arrow-right.png") no-repeat center center;
          }
        }
        .competition-title{
          width: 282px;
          height: 29px;
          color: #101010;
          font-size: 21px;
          margin: 0 auto;
          text-align: center;
          background-image: url("../../../../assets/active/egame/msi2023/competition-title-bg.png");
        }
      }
      .active-introduce{
        margin-top:120px;
        .title-bg{
          width: 599px;
          height: 63px;
          margin: 0 auto;
          background-image: url("../../../../assets/active/egame/msi2023/active-introduce-title-bg.png");
          background-repeat: no-repeat, no-repeat;
          background-size: 100% 100%;
        }
        .introduce{
          margin-top: 24px;
          padding: 35px 0 26px 0;
          height: 458px;
          background-image: url("../../../../assets/active/egame/msi2023/active-introduce-bg.png");
          background-repeat: no-repeat, no-repeat;
          background-size: 100% 100%;
          color: #fdf6ee;
          .title{
            width: 734px;
            text-align: center;
            margin: 0 auto;
            font-size: 14px;
            line-height: 24px;
          }
        }
        table{
          margin: 30px auto auto;
          .th-bg{
            background-image: url("../../../../assets/active/egame/msi2023/active-introduce-th.png");
            background-repeat: no-repeat, no-repeat;
            background-size: 100% 100%;
          }
          th,td{
            width: 150px;
            text-align: center;
            height: 50px;
          }
          td{
            height: 40px;
            border: 1px solid #ccc;
          }
          .hide-border td{
            border-top-width:0;
          }
        }
      }
    }

    .rules{
      width: inherit;
      margin-top: 111px;
      margin-bottom: 50px;
      dt{
        width: 599px;
        height: 62px;
        margin: 0 auto;
        background-image: url("../../../../assets/active/egame/msi2023/rules-title-bg.png");
        background-repeat: no-repeat, no-repeat;
        background-size: 100% 100%;
      }
      dd{
        width: 1058px;
        height: 350px;
        margin-top: 24px;
        background-image: url("../../../../assets/active/egame/msi2023/rules-bg.png");
        background-repeat: no-repeat, no-repeat;
        background-size: 100% 100%;
        padding: 35px 90px 25px 90px;
        ul{
          li{
            line-height: 24px;
            margin-top: 10px;
            font-size: 14px;
            color: #fdf6ee;
            position: relative;
            &::before{
              content: "";
              position: absolute;
              left: -25px;
              top: 0;
              width: 14px;
              height: 14px;
              background: url("../../../../assets/active/egame/msi2023/rules-index.png") no-repeat;
            }
          }
        }
      }
    }
  }
  .msi-baberrage {
    position: absolute!important;
    z-index: 5;
    top: 20px;
    left: 0;
    height: 690px !important;
    margin-top: 80px;
    pointer-events: none;
    /deep/ .baberrage-lane {
      .cus-style {
        .normal {
          border: 1px solid #3099bf;
          background-image: linear-gradient(to right, #38b8a2, #3099bf);
          font-size: 14px;
          color: #ffffff;
          box-sizing: border-box;
          padding: 0 12px;
          .baberrage-avatar {
            width: 24px;
            height: 24px;
            margin-top: 8px;
            img {
              width: inherit;
              height: inherit;
            }
          }
          .baberrage-msg {
            line-height: 40px;
            padding-left: 12px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .back-home{
    margin: auto;
    padding-bottom: 10px;
    width: 336px;
    height: 100px;
    display: block;
    background-image: url("../../../../assets/active/egame/msi2023/back-home-bg.png");
    background-repeat: no-repeat, no-repeat;
    background-size: 100% 50%;
    transition: background .3s;
    &:hover{
      background-image: url("../../../../assets/active/egame/msi2023/back-hone-hover-bg.png");
    }
  }
}

</style>
