<template>
    <transition name="unfoldbox">
    <div class="unfold_box"  v-show="isShowCart">
      <div class="unfold_box_top clearfix">
        <div class="top_tab fll">
          <span class="my_bet" v-for="item in gameCartNavList" :key="item.id"
          :class="{'actived':currentGameCartNavId === item.id}"
          @click="gameCartTabChange(item)">{{item.name}}</span>
        </div>
        <div class="clear_all fll" v-show="betCartList.length" @click="handleClearBetCart">
          <span></span>
        </div>
        <div class="flod_btn fll" @click="flodBtnDeal() ">
          <span></span>
        </div>
      </div>
      <div class="list_content">
        <!--待下注列表-->
        <div class="my_bet_list list" v-if="currentGameCartNavId === 1">
          <div class="list_wrapper" :style="{height:myBetListH  + 'px'}" :class="{'scroll': betCartList.length>1}">
            <happy-scroll size="3" resize color="rgba(255,255,255,0.5)" hide-horizontal v-if="betCartList.length>0">
             <div class="bet_box_list_wrapper">
                <div class="bet_box"
                v-for="item in betCartList" :key="item.pointId"
                :class="['point_class'+item.id,{'early':item.category_id === 1,'live':item.category_id === 3,'indemnity':item.category_id === 2}]" >
                  <div class="bet_box_top">
                    <div class="bet_info">
                      <div :title="item.playName" class="bet_game_point ellips ">
                        {{item.playName}}
                      </div>
                      <div v-show="item.matchStatus !=='pasue'" class="bet_team_point ">
                        <span  :title="item.pointName" class="point_name ellips ">{{item.pointName}}</span>
                        <strong>@{{item.pointNum | formatNumberPad}} </strong>
                        <i class="down_up_anit" v-show="item.smallAnimt || item.bigAnimt" :class="{'down_points': item.smallAnimt, 'up_points': item.bigAnimt}"></i>
                      </div>
                      <div v-show="item.matchStatus ==='pasue'" class="bet_team_point  ">
                       <span class="point_name ellips">{{item.pointName}}</span> <span class="lockimg" ></span>
                      </div>
                    </div>
                    <div class="box_close_btn" @click="handleDelBetCartItem(item.pointId)">
                      <span></span>
                    </div>
                    <div class="game_bet_type_mark"></div>
                  </div>
                  <div class="bet_box_content">
                    <div class="bet_game_vs c">
                      <div v-if="!item.is_champion" class="game_vs fll">
                        <span  :title="item.team_name_1" class="team_name ">{{item.team_name_1}}</span>
                        <i class="vs">VS</i>
                        <span  :title="item.team_name_2" class="team_name ">{{item.team_name_2}}</span>
                      </div>
                      <div v-else class="game_vs fll ellips " :title="item.eventName" > {{item.eventName}}</div>
                      <div class="game_type flr" >
                        <img :src="item.gameTypeImg" alt="">
                      </div>
                    </div>
                    <div v-if="!item.is_champion" :title="item.eventName" class="bet_game_name ellips "> {{item.eventName}} </div>
                    <div class="money_type_box">
                      <radio-group v-model="item.moneyType"  size="large" @on-change="moneyTypeChange(item)">
                        <radio v-for="type in item.moneyTypeList" :key="type.value" :label="type.value">{{type.name}}</radio>
                      </radio-group>
                    </div>
                    <div class="input_box">
                      <input v-show="item.matchStatus !=='pasue'" type="text" class="bet_input" :placeholder="$t('Betting_amount')" v-model="item.moneyInput" v-on:input ="moneyInputChange(item)">
                      <input v-show="item.matchStatus ==='pasue'" type="text" disabled="disabled" class="bet_input" :placeholder="$t('Betting_amount')">
                      {{$t('To_win_the_forehead')}} <span>{{item.winMoneyNum}}</span>
                    </div>
                    <div class="money_balance">
                      {{$t("limit")}}<i>{{item.moneyType == 1?"￥" + item.money_min + "-" + item.money_max:item.virtual_min + "-" + item.virtual_max}}</i>
                    </div>

                    <div class="err_text_box" v-if="item.errText" >
                      <span :class="{'flash' : item.flashClass}">{{item.errText}} </span>
                    </div>
                  </div>
                </div>

             </div>
            </happy-scroll>
            <div class="empty_list" v-if="betCartList.length===0">
              {{$t("No_betting")}}
            </div>
          </div>
          <div class="bet_tips">
            <div class="early tips_box">
              <i class="dot">●</i>{{$t("The_current_odds_with_both")}}
            </div>
            <!-- <div class="live tips_box">
              <i class="dot">●</i>{{$t("Ball_settlement_real_time_odds_odds")}}
            </div> -->
          </div>
          <div class="fast_bet_section clearfix" v-if="betCartList.length>0">
            <div class="section_title fll">{{$t("The_unit_of_the_principal")}}</div>
            <div class="fast_bet_section_main fll">
              <div class="fast_bet_money_type">
                <radio-group v-model="fastBetData.currentFastBetMoneyType"  size="large" @on-change="fastBetMoneyTypeChange()">
                  <radio v-for="type in fastBetData.moneyTypeList" :key="type.value" :label="type.value">{{type.name}}</radio>
                </radio-group>
              </div>
              <div class="fast_bet_input_box">
                <span class="fast_bet_number">{{betCartListCountCanBet}}x</span><input type="text" :placeholder="$t('Betting_amount')" class="fast_bet_input" v-model="fastBetData.fastBetMoneyInput" v-on:input ="fastBetMoneyInputChange()">
              </div>
            </div>
          </div>
          <div class="list_total c">
            <div class="total_box fll">
              <div class="total_box_top">
                <!-- {{$t("A_total_of")}}<i class="num">{{betCartList.length}}</i> -->
                <!-- {{$t("Note_that_in_total")}} -->
                <i class="num"><span>￥{{cartMoneyTotal[0]}}</span><b v-show="cartMoneyTotal[1]!=0" class="spliter">;</b><span v-show="cartMoneyTotal[1]!=0">{{cartMoneyTotal[1]}}</span></i>
              </div>
              <div class="total_box_bottom">
                <!-- {{$t('To_win_the_forehead')}} -->
                <i class="num"><span>￥{{cartWinMoneyTotal[0]}}</span><b v-show="cartWinMoneyTotal[1]!=0" class="spliter">;</b><span v-show="cartWinMoneyTotal[1]!=0">{{cartWinMoneyTotal[1]}}</span></i>
              </div>
            </div>
            <div class="btn flr" v-if="doBetLoad"><span class="btn_loading"></span></div>
            <div id="bet_btn" class="flr" @click="doBet" :class="{'danger': betPointChange}" v-else>
               <b v-if="betPointChange">{{$t("Accept_the_new_price")}}</b><b v-else>{{$t("Immediately_the_betting")}}</b>
            </div>
          </div>
        </div>
        <!--已投注列表-->
        <div class="betted_list list" v-if="currentGameCartNavId === 2">
          <div class="list_wrapper" :class="{'scroll':bettedList.length>=2}" :style="{height:myBetListH+160+'px'}">
            <happy-scroll size="3" resize color="rgba(255,255,255,0.5)" hide-horizontal v-if="bettedList.length>0">
              <div class="betted_list_box_wrapper">
                <div class="bet_box" v-for="item in bettedList" :key="item.id"
                :class="['point_class'+item.id,{'early':item.category_id === 1,'live':item.category_id === 3,'indemnity':item.category_id === 2}]">
                  <div class="bet_box_top clearfix">
                    <div class="bet_info">
                      <div :title="item.desc" class="bet_game_point ellips ">
                        {{item.desc}}
                      </div>
                      <div class="bet_team_point ellips">
                          <i  :title="item.team_name" class="bet_team_name ">{{item.team_name}}</i>
                          <span class="bet_point_box" v-show="item.category_id ==1&&!item.user_points">@{{item.odds}}</span>
                      </div>
                    </div>
                    <div class="bet_status">
                      <span class="refuse" v-if="item.status === 'refuse'">{{$t("refused")}}</span>
                      <span class="tobecomfired" v-if="item.status === 'tobecomfired'">{{$t("tobecomfired")}}</span>
                      <span class="comfired" v-if="item.status === 'confirm'">{{$t("Have_been_confirmed")}}</span>
                      <span class="cancel" v-if="item.status === 'cancel'">{{$t("Has_been_cancelled")}}</span>
                      <span class="clearing" v-if="item.status === 'clearing'">{{$t("Has_been_settled")}}</span>
                    </div>
                    <div class="game_bet_type_mark"></div>
                  </div>
                  <div class="bet_box_content">
                    <div class="bet_game_vs clearfix">
                      <div v-if="!item.is_champion" class="game_vs fll">
                        <span :title="item.team_name_1" class="team_name">{{item.team_name_1}}</span>
                        <i class="vs">VS</i>
                        <span  :title="item.team_name_2" class="team_name">{{item.team_name_2}}</span>
                      </div>
                      <div v-else class="game_vs fll ellips " :title="item.event_name" > {{item.event_name}}</div>
                      <div class="game_type flr">
                        <img :src="item.game_type_logo" alt="">
                      </div>
                    </div>
                    <div v-if="!item.is_champion" :title="item.event_name" class="bet_game_name ellips">
                      {{item.event_name}}
                    </div>
                    <div class="bet_detail clearfix">
                      <div class="betted_money detail_box">
                        <div class="detail_box_content">
                          <i v-if="item.money_type===1">￥</i>{{parseInt(item.amount)}}
                        </div>
                        <div class="detail_box_title">
                          {{$t('Betting_amount')}}
                        </div>
                      </div>
                      <div class="betted_point detail_box">
                        <div class="detail_box_content">
                          @{{item.user_points?item.user_points : '--'}}
                        </div>
                        <div class="detail_box_title">
                          {{$t("The_odds")}}
                        </div>
                      </div>
                      <div class="betted_win_money detail_box">
                        <div class="detail_box_content">
                          <i v-if="item.money_type===1">￥</i><span v-if="item.is_getprize>0">{{item.result}}</span><span v-else>{{item.maybe_amount!==''?item.maybe_amount: '--'}}</span>
                        </div>
                        <div class="detail_box_title">
                          <span v-if="item.is_getprize>0">{{$t("profit")}}</span><span v-else>{{$t("KeYing_frontal")}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="bet_time">
                      {{item.create_time}}
                    </div>
                  </div>
                </div>

              </div>
            </happy-scroll>
            <div class="loader small" v-if="bettedListLoad"><span></span></div>
            <div class="empty_list" v-if="bettedListEmpty">
              {{$t("No_betting_record")}}
            </div>
          </div>
        </div>
      </div>
    </div>
    </transition>
</template>

<script>
import storage from '@/utils/storage'
import { HappyScroll } from 'vue-happy-scroll'
import { formatNumberFloatPad} from '../../utils/util'
import { mapState } from 'vuex'
export default {
  name: "gamecart",
  data() {
    return {
      second60:60000,
      second10:10000,
      gameBetCartRight:'',
      betPointChange: false,
      doBetLoad: false,
      myBetListH:0,
      betCartList:[],
      isShowCart: false,
      currentGameCartNavId: 1,
      gameCartNavList: [
        { id: 1, name:  this.$t("I_bet_the") },
        { id: 2, name: this.$t("Betting_list")}
      ],
      bettedListLoad:false,
      bettedListEmpty:false,
      bettedList:[],
      fastBetData: {
        moneyTypeList:[],
        currentFastBetMoneyType: '',
        fastBetMoneyInput: '',
        min_money_limit: '',
        max_money_limit: '',
        min_vb_limit: '',
        max_vb_limit: '',
        currentLimitMin: '',
        currentLimitMax: ''
      },
    };
  },
  components: {
    HappyScroll
  },
  filters: {
    formatNumberPad (num) {
      return formatNumberFloatPad(num)
    },
  },
  computed: {
    ...mapState(["isLogin"]),
    cartMoneyTotal () {
      let rmbMoney = 0,vbMoney = 0,pasue = false
      if(this.betCartList.length>0){
        this.betCartList.forEach((v, i) => {
          if(v.moneyType === 1){
            rmbMoney += v.moneyInput*100
          }else{
            vbMoney += v.moneyInput*100
          }
          if(v.matchStatus !== "pasue") {
            pasue = true
          }
        })
      }
      if(pasue) {
        return [rmbMoney/100, vbMoney/100]
      }else {//表示全都暂停了
        this.fastBetData.fastBetMoneyInput = ''
        return [0,0]
      }
    },
    cartWinMoneyTotal () {
      let rmbMoney = 0
      let vbMoney = 0
      if(this.betCartList.length>0){
        this.betCartList.forEach((v, i) => {
          if(v.moneyType === 1){
            rmbMoney += v.winMoneyNum*100
          }else{
            vbMoney += v.winMoneyNum*100
          }
        })
      }
      return [Math.round((rmbMoney/100)*100)/100, Math.round((vbMoney/100)*100)/100]
    },
    betCartListCountCanBet(){
      let count = this.betCartList.length
      for(let i = 0;i<this.betCartList.length;i++) {
        if(this.betCartList[i].matchStatus === "pasue") {
          count--
        }
      }
      return count
    }
  },
  mounted() {
    this.myBetListH = (document.body.clientHeight - 520)
    this.EventBus.$on('handleBetPointBoxClick',v=> {setTimeout(() => {
      this.handleBetPointBoxClick(v) 
    }, 200); })
    this.EventBus.$on('showGameCartList',()=> {setTimeout(() => {
      this.showGameCartList()
    }, 200);})
    setTimeout(() => {
      this.handleResize()
    }, 1000);
    this.loadStorageCartData(1)
  },
  beforeDestroy(){
    this.EventBus.$off('handleBetPointBoxClick')
    this.EventBus.$off('showGameCartList')
  },
  methods: {
    //单位本金币种类型切换
    fastBetMoneyTypeChange () {
      this.fastBetData.fastBetMoneyInput = ''
      this.betCartList.forEach((v, i) => {
        v.moneyType = this.fastBetData.currentFastBetMoneyType
        this.moneyTypeChange(v)
      })
    },
    //币种类型切换
    moneyTypeChange (x) {
      this.fastBetData.fastBetMoneyInput = ''
      x.moneyInput = ''
      x.moneyLimit = ''
      x.winMoneyNum = ''
      if(x.moneyType === 1){
        x.moneyLimit = "￥" + x.money_min + "-" + x.money_max
      }else{
        x.moneyLimit =  x.virtual_min + "-" + x.virtual_max
      }
      storage.set('vkbetCartList', this.betCartList)
    },
    handleResize() {
      this.gameBetCartRight = ( (document.body.offsetWidth - 1240)/2 + 988 )+ 'px';
    },
    //投注金额输入
    moneyInputChange (x) {
      this.fastBetData.fastBetMoneyInput = ''
      x.moneyInput = parseInt(x.moneyInput) == 0?'': x.matchStatus !=='pasue' ?x.moneyInput.toString().replace(/[^0-9]/g, ''):''
      if(x.moneyType == 1){
        x.moneyInput = Math.min(x.moneyInput,x.money_max)
        x.winMoneyNum =  x.moneyInput ? Math.round((x.moneyInput * x.pointNum - x.moneyInput)*100)/100 : ''
      }
      if(x.moneyType == 2){
        x.moneyInput = Math.min(x.moneyInput,x.virtual_max)
        x.winMoneyNum =  x.moneyInput ? Math.ceil(x.moneyInput * x.pointNum - x.moneyInput) : ''
      }
      storage.set('vkbetCartList', this.betCartList)
    },
    //选择盘口到购物车
    handleBetPointBoxClick (busdata) {
      //如果只有两个的时候是单选
     //  if(gameItem.team_points.length==2) {
     //    let leaveitem = gameItem.team_points.filter((item)=> {
     //      return item.id != point.id
     //    })
     //    if(leaveitem.length) {
     //       let tem = this.betCartList.filter((cart)=>{
     //           return cart.pointId == leaveitem[0].id
     //       })
     //       if(tem.length) {
     //           this.handleDelBetCartItem (leaveitem[0].id)
     //       }
     //    }
     //  }
      let cartData =
        {
          id:busdata.point.id,
          is_champion:busdata.gameItem.is_champion,
          pointId: busdata.point.id,
          matchStatus:busdata.gameItem.matchStatus,
          parentPointId: busdata.gameItem.id,
          pointName: busdata.point.desc,
          pointNum: busdata.point.point,
          eventName: busdata.gameItemData.event_name,
          moneyTypeList: busdata.gameItemData.moneyTypeList,
          playName: busdata.navTitle+busdata.gameItem.play_name,
          team_name_1: busdata.gameItem.team_name_1,
          team_name_2: busdata.gameItem.team_name_2,
          category_id: busdata.gameItem.category_id,
          money_max: busdata.point.money_max,
          money_min: busdata.point.money_min,
          virtual_max: busdata.point.virtual_max,
          virtual_min: busdata.point.virtual_min,
          gameTypeImg: busdata.gameItemData.game_logo,
          moneyInput: '',
          winMoneyNum: '',
          moneyType: busdata.gameItemData.moneyTypeList[0].value,
          errText: '',
          flashClass: false,
          moneyLimit:busdata.gameItemData.moneyTypeList[0].value == 1?"￥" + busdata.point.money_min + "-" + busdata.point.money_max:busdata.point.virtual_min + "-" + busdata.point.virtual_max
        }
        let tem = this.betCartList.find((item)=> {
           return item.pointId == busdata.point.id
        })
        if(!tem){
          if(this.betCartList.length<8){
              this.betCartList.unshift(cartData);
              this.saveCartDataToStorage()
              this.fastBetData.fastBetMoneyInput = ''
              if(!window.cartEarlyTimer || !window.cartLiveTimer) {
                this.startReloadCartPoint()
              }
          }else{
            this.$message({
              message: this.$t("Bets_on_the_shopping_cart"),
              type: 'warning'
            })
          }
        }else{
          this.handleDelBetCartItem (busdata.point.id)
        }
        this.showGameCartList ()
    },
    //投注
    doBet () {
      if(this.betPointChange){//接受新赔率
        this.betCartList.forEach(function (v, i) {
          v.pointChange = false
        })
        this.betPointChange = false
        storage.set('vkbetCartList', this.betCartList)
        return false
      }
      if(!this.isLogin){
        this.$message({
          message: this.$t("Please_login_first"),
          type: 'warning'
        })
        return false
      }
      if(this.betCartList.length>0){
        if(this.doBetLoad){
          return false
        }
        if(this.cartWinMoneyTotal[0]*1 + this.cartWinMoneyTotal[1]*1 === 0){
          this.$message({
            message: this.$t("Please_input_the_amount"),
            type: 'warning'
          })
          return false
        }
        let list = [],data = {is_bowls:0}
        this.betCartList.forEach((v, i) => {
          if (v.moneyInput>0){
            list.push({
              point_id: v.parentPointId,
              option: v.pointId,
              money: v.moneyInput,
              odd: v.pointNum,
              money_type: v.moneyType,
              handicapType:v.category_id,
              is_champion: v.is_champion
            })
            if(v.category_id === 3){
              data.is_bowls = 1
            }
          }
        })
         data.items = JSON.stringify(list)
        this.doBetLoad = true
        this.$http(this.ApiSetting.newEgame.play, data)
          .then((res) => {
            this.doBetLoad = false
            if(res.status === 1){
              let successCount = 0, errCount = 0,msg = '';
              let totalCount = this.betCartList.length
               if(res.data.info&&res.data.info.ids.length>0){
                 for(let i = 0; i < res.data.info.ids.length; i++){
                   this.handleDelBetCartItem (res.data.info.ids[i])
                 }
                //  this.reLoadMoney()
                 this.EventBus.$emit("reLoadMoney")
                 successCount = res.data.info.ids.length
               }
              errCount = totalCount - successCount
              if(errCount === 0){
                 msg = this.$t("Betting_success")
              }else{
                 msg = this.$t("Betting_success")+ successCount +this.$t("Pen_failure")+ errCount +this.$t("pen")
              }
              this.$message({
                message: msg,
                type: 'success'
              })
           }
            if(res.data && res.data.ext&&res.data.ext.length>0){
              res.data.ext.forEach((v, i) => {
                this.betCartList.forEach((x, y) => {
                  if(x.pointId === v.id){
                    x.errText = v.message
                    x.flashClass = true
                    setTimeout(() => {
                      x.flashClass = false
                    }, 4000)
                  }
                })
              })
            }
          }, (err) => {
            this.doBetLoad = false
          })
      }
    },
    //购物车单个投注删除
    handleDelBetCartItem (id) {
      this.EventBus.$emit('pointActivedChange',id)
      this.betCartList.forEach((v, i) => {
        if(v.pointId === id){
          this.betCartList.splice(i, 1)
        }
      })
      this.saveCartDataToStorage()
    },
    //取购物车本地数据
    loadStorageCartData (bool) {
      if(storage.get('vkbetCartList')){
        this.betCartList = storage.get('vkbetCartList') || []
        this.betCartList.forEach((v, i) => {
           bool && (v.pointChange = false);
           v.bigAnimt = false
           v.smallAnimt = false
           v.errText = ""
         })
      }
    },
    //保存购物车数据到本地
    saveCartDataToStorage () {
      this.fastBetData.fastBetMoneyInput = ''
      this.betPointChange = false
      if(this.betCartList.length > 0){
        let moneyTypeOne = 0
        for(let i=0;i<this.betCartList.length;i++){
          if(this.betCartList[i].moneyTypeList.length==1){
            moneyTypeOne ++
            this.fastBetData.moneyTypeList = this.betCartList[i].moneyTypeList
            this.fastBetData.currentFastBetMoneyType = this.betCartList[i].moneyTypeList[0].value
          }
          if(this.betCartList[i].pointChange){
            this.betPointChange = true
          }
          this.betCartList[i].pointChange = false
         }
        if(moneyTypeOne == 0){
          this.fastBetData.moneyTypeList = this.betCartList[0].moneyTypeList
          if(this.fastBetData.currentFastBetMoneyType === ''){
            this.fastBetData.currentFastBetMoneyType = this.fastBetData.moneyTypeList[0].value
          }
        }
        storage.set('vkbetCartList', this.betCartList)
      }else{
        clearInterval(window.cartEarlyTimer)
        clearInterval(window.cartLiveTimer)
        storage.remove('vkbetCartList')
      }
    },
    //清空购物车
    handleClearBetCart () {
      if(this.currentGameCartNavId === 1){
        this.$confirm(this.$t("Want_to_empty_the_cart"), this.$t("prompt"), {
          confirmButtonText: this.$t("determine"),
          cancelButtonText: this.$t("cancel"),
          type: 'warning',
          center: true
        }).then(() => {
          this.betCartList = []
          this.EventBus.$emit('pointActivedChange')
          clearInterval(window.cartEarlyTimer)
          clearInterval(window.cartLiveTimer)
          this.saveCartDataToStorage ()
        })
      }
    },
    //显示购物车
    showGameCartList () {
      this.currentGameCartNavId = 1
      this.loadStorageCartData ()
      this.startReloadCartPoint()
      this.saveCartDataToStorage()
      this.isShowCart = true
    },
    //隐藏购物车
    flodBtnDeal() {
      clearInterval(window.cartEarlyTimer)
      clearInterval(window.cartLiveTimer)
     this.isShowCart = false
     //等购物车 动画完成再显示按钮
     setTimeout(() => {
      this.EventBus.$emit('hideShowCart',this.betCartList.length)
     }, 400);
    },
    //购物车显示内容类型切换
    gameCartTabChange (x) {
      if(x.id === 2){//投注列表
        if(!this.isLogin){
          this.$message({
            message: this.$t("You_are_not_logged_in"),
            type: 'warning'
          })
          return false
        }
        clearInterval(window.cartEarlyTimer)
        clearInterval(window.cartLiveTimer)
        this.loadGameRecords ()
      }else {
        this.startReloadCartPoint()
      }
      this.currentGameCartNavId = x.id
    },
    //购物车赔率刷新定时器
    startReloadCartPoint () {
      clearInterval(window.cartEarlyTimer)
      clearInterval(window.cartLiveTimer)
      this.cartReloadPoints()
      this.cartReloadPoints(1)
      window.cartEarlyTimer =  setInterval(() => {
          this.cartReloadPoints()
      }, this.second60)
      window.cartLiveTimer = setInterval(() => {
          this.cartReloadPoints(1)
      }, this.second10)
    },
    cartReloadPoints (type) {
      if(this.betCartList.length === 0){
        return false
      }
      let live = type ? type*1 : 0
      let pointIds = []
      this.betCartList.forEach((v,i) => {
          if (live === 1 && (v.category_id === 2 || v.category_id === 3)) {
            pointIds.push(v.parentPointId)
          }
          if (live === 0 && v.category_id === 1) {
            pointIds.push(v.parentPointId)
          }
      })
      if (pointIds.length === 0) {
        return false
      }
      let data = {
        point_ids: pointIds.join(','),
        is_liveorfix: live
      }
      this.$http(this.ApiSetting.newEgame.reLoadPoint, data)
        .then((res) => {
          if (res.status === 1) {
            let newPointArr = res.data
            if(newPointArr.length<=0){
              return false
            }
            let isChange = false
            let pointChangeCount = 0
            for (let j = 0; j < newPointArr.length; j++) {
              this.betCartList.forEach( (v, i)=> {
                var _newPointArr = newPointArr[j]
                  for (let k = 0; k < _newPointArr.team_points.length; k++){
                      let team = _newPointArr.team_points[k]
                      if (team.id == v.pointId) {
                        let oldStatus = v.matchStatus
                        if(_newPointArr.danger_status == 1) {
                          v.matchStatus = "pasue"
                          v.moneyInput = ''
                          v.pointChange = false
                        }else {
                          v.matchStatus = "guessing"
                          if (team.point * 100 > v.pointNum * 100) {
                            v.bigAnimt = true
                            v.pointChange = true
                            setTimeout(function () {
                                v.bigAnimt = false
                            }, 5600)
                          }
                          if (team.point * 100 < v.pointNum * 100)  {
                            v.smallAnimt = true
                            v.pointChange = true
                            setTimeout(function () {
                                v.smallAnimt = false
                            }, 5600)
                          }
                        }
                        if(oldStatus !== v.matchStatus) {
                          isChange = true
                        }
                        v.money_max = team.money_max
                        v.money_min = team.money_min
                        v.virtual_max = team.virtual_max
                        v.virtual_min = team.virtual_min
                        v.pointNum = parseFloat(team.point)
                        if(v.moneyType === 1) {
                          v.winMoneyNum = v.moneyInput  ? Math.round((v.moneyInput * v.pointNum - v.moneyInput)*100)/100 : ''
                        }else {
                          v.winMoneyNum = v.moneyInput ? Math.ceil(v.moneyInput * v.pointNum - v.moneyInput) : ''
                        }
                      }
                  }
                  (j == newPointArr.length-1) && v.pointChange && pointChangeCount++

              })
            }
            this.fastBetMoneyInputChange(1)
            if(pointChangeCount) {
              this.betPointChange = true
            }else {
              this.betPointChange = false
            }
            if(isChange) {
              this.fastBetData.fastBetMoneyInput = ''
            }
            this.$forceUpdate()
            storage.set('vkbetCartList', this.betCartList)
          }
      })
    },
    //单位本金输入处理
    fastBetMoneyInputChange (bool) {
      this.getFastBetMoneyLimit ()
      this.fastBetData.fastBetMoneyInput = this.fastBetData.fastBetMoneyInput !=="" ?parseInt(this.fastBetData.fastBetMoneyInput.toString().replace(/[^0-9]/g, '')*1):""
      if(this.fastBetData.fastBetMoneyInput > this.fastBetData.currentLimitMax){
        this.fastBetData.fastBetMoneyInput = this.fastBetData.currentLimitMax
      }
      let haspasue = false

      if( !(!this.fastBetData.fastBetMoneyInput && bool)) {
      this.betCartList.forEach((v, i) => {
        v.moneyType = this.fastBetData.currentFastBetMoneyType
        v.moneyInput = v.matchStatus !== 'pasue' ? this.fastBetData.fastBetMoneyInput.toString().replace(/[^0-9]/g, '') : ''
        if(v.moneyType === 1){
          v.moneyLimit = "￥" + v.money_min + "-" + v.money_max
          v.winMoneyNum = v.moneyInput ? Math.round(((v.moneyInput * v.pointNum) - v.moneyInput)*100)/100 : ''
        }else{
          v.moneyLimit =  v.virtual_min + "-" + v.virtual_max
          v.winMoneyNum = v.moneyInput ? Math.ceil(v.moneyInput * v.pointNum - v.moneyInput) : ''
        }
        if(v.matchStatus !=='pasue') {
          haspasue = true
        }
      })
      }
      if(!haspasue && this.fastBetData.fastBetMoneyInput) {
        this.fastBetData.fastBetMoneyInput = 0
      }
      storage.set('vkbetCartList', this.betCartList)
    },
    //单位本金的最大、最小金额限制
    getFastBetMoneyLimit () {
      if(this.betCartList.length) {
        let vbMinArr = [],vbMaxArr = [],moneyMinArr = [], moneyMaxArr = []
        this.betCartList.forEach((v, i) => {
          vbMinArr.push(v.virtual_min)
          vbMaxArr.push(v.virtual_max)
          moneyMinArr.push(v.money_min)
          moneyMaxArr.push(v.money_max)
        })
        this.fastBetData.min_money_limit = moneyMinArr.sort(function (a, b) {return b-a})[0]
        this.fastBetData.max_money_limit = moneyMaxArr.sort(function (a, b) {return a-b})[0]
        this.fastBetData.min_vb_limit = vbMinArr.sort(function (a, b) {return b-a})[0]
        this.fastBetData.max_vb_limit = vbMaxArr.sort(function (a, b) {return a-b})[0]
        if(this.fastBetData.currentFastBetMoneyType === 1){
          this.fastBetData.currentLimitMin = this.fastBetData.min_money_limit
          this.fastBetData.currentLimitMax = this.fastBetData.max_money_limit
        }else{
          this.fastBetData.currentLimitMin = this.fastBetData.min_vb_limit
          this.fastBetData.currentLimitMax = this.fastBetData.max_vb_limit
        }
      }
    },
    //请求投注列表
    loadGameRecords () {
      let data = {
        page: 1
      }
      this.bettedList = []
      this.bettedListLoad = true
      this.bettedListEmpty = false
      this.$http(this.ApiSetting.newEgame.getBetRecordsList, data)
        .then((res) => {
          this.bettedListLoad = false
          if(res.status === 1){
            if(res.data.list.length>0){
              this.bettedList = res.data.list
              this.bettedList.forEach((v, i) => {
                v.desc = v.desc.replace(/&nbsp;/g, ' ')
                if(v.receive_status===1) {
                  v.status = 'tobecomfired'
                }else if (v.receive_status===2){
                  v.status = 'refuse'
                }else {
                  if(v.is_cancel === 1){
                    v.status = 'cancel'
                  }else if(v.is_getprize === 0){
                    v.status = 'confirm'
                  }else if(v.prize_status === 1 && v.bonus > 0){
                    v.status = 'clearing'
                    v.result =  v.win_lose
                  }else if(v.prize_status === 2){
                    v.status = 'clearing'
                    v.result =  v.win_money
                  }
                }
                
              })
            }else{
              this.bettedListEmpty = true
            }
          }
        }, (err) => {
          this.bettedListLoad = false
        })
    }
  },
};
</script>

<style scoped lang="less">
@newegame_icons:url("../../assets/egame/newegame_icons.png");
.money_input {
  background: none;
  width: 60px;
  height: 26px;
  line-height: 24px;
  border: 1px solid #7c839f;
  border-radius: 3px;
  padding: 0 10px;
  display: inline-block;
  color: #fff;
  vertical-align: middle;
  margin-right:10px;
}
  .unfold_box {
    position: absolute;
    right: 0;
    z-index: 3;
    margin-top: 10px;
    width: 252px;
    height: auto;
    overflow: hidden;
    box-shadow: 0 0 20px 4px rgba(0, 0, 0, 0.6);
    .unfold_box_top {
      height: 41px;
      line-height: 40px;
      box-sizing: border-box;
      border-bottom: 1px solid #484d5e;
      font-size: 14px;
      color: #7c839f;
      background-color: #262933;
      .top_tab {
        width: 170px;
        height: 100%;
        span {
          display: inline-block;
          width: 50%;
          text-align: center;
          height: 100%;
          position: relative;
          cursor: pointer;
          &.actived {
            color: #07f1b7;
            &:after {
              content: '';
              width: 100%;
              height: 2px;
              background-color: #07f1b7;
              position: absolute;
              left: 0;
              bottom: -1px;
              animation: aw linear 0.3s;
            }
          }
        }
      }
      .clear_all {
        width: 40px;
        height: 100%;
        border-left: 1px solid #484d5e;
        border-right: 1px solid #484d5e;
        text-align: center;
        cursor: pointer;
        span {
          display: inline-block;
          width: 18px;
          height: 20px;
          background: @newegame_icons no-repeat;
          background-position: -20px -253px;
          vertical-align: middle;
        }
        &:hover {
          span {
            background-position: -20px -303px;
          }
        }
      }
      .flod_btn {
        width: 40px;
        text-align: center;
        cursor: pointer;
        float: right;
        span {
          display: inline-block;
          width: 16px;
          height: 14px;
          background: @newegame_icons no-repeat;
          background-position: -68px -256px;
          vertical-align: middle;
        }
        &:hover {
          span {
            background-position: -68px -306px;
          }
        }
      }
    }
    .list_content {
      color: #7c839f;
      font-size: 14px;
      background-color: #262933;
      &.more {
        height: 705px;
      }
      .list_wrapper {
        width: 100%;
        white-space: nowrap;
        &.scroll {
          height: 400px;
        }
      }
      .empty_list {
        font-size: 18px;
        height: 100%;
        line-height: 160px;
        text-align: center;
        background-color: #17191f;
        border-bottom: 1px solid #484d5e;
        box-sizing: border-box;
      }
    }
    .bet_box {
      width:252px;
      border: 1px solid #262933;
      box-sizing: border-box;
      transition: border-color 0.3s;
      &:hover {
        border: 1px solid #07f1b7;
      }
      .bet_box_top {
        background-color: #17191f;
        box-sizing: border-box;
        height: 70px;
        padding: 10px  20px;
        position: relative;
        color: #fff;
        .bet_info {
          text-align: center;
          width: 80%;
          margin: 0 auto;
        }
        .bet_game_point {
          margin-top: 4px;
          height: 22px;
          line-height: 22px;
          text-align: center;
          width: fit-content;
          position: relative;
          left: 50%;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
          max-width: 150px;
        }
        .bet_team_point {
          font-size: 14px;
          height: 24px;
          line-height: 24px;
          .point_name {
            vertical-align: middle;
            display: inline-block;
            max-width: 100px;
          }
        
          .lockimg {
            display: inline-block;
            width: 24px;
            height: 24px;
            vertical-align: bottom;
            background: @newegame_icons no-repeat;
            background-position: -103px -185px;
          }
          strong {
            color:#07f1b7;
            font-weight: normal;
            vertical-align: middle;
            display: inline-block;
          }
          .bet_team_name {
            display: inline-block;
            max-width: 80px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            vertical-align: middle;
          }
          .bet_point_box {
            color: #07f1b7;
            vertical-align: middle;
          }
        }
        .box_close_btn {
          position: absolute;
          cursor: pointer;
          right: 10px;
          top: 20px;
          transform: translateY(-50%);
          width: 28px;
          height: 28px;
          background: @newegame_icons no-repeat;
          background-position: -150px -249px;
          vertical-align: middle;
          &:hover {
            background-position: -150px -299px;
          }
        }
      }
    }
    .betted_list {
      .bet_box {
        .bet_box_top {
          .bet_info {
            width: 64%;
          }
        }
      }
    }
  }
  .my_bet_list {
    .bet_tips {
      padding: 5px;
      background-color: #17191f;
      .tips_box {
        font-size: 12px;
        padding-left: 16px;
        position: relative;
        line-height: 18px;
        margin: 5px 0;
        transform: translateZ(0);
        .dot {
          display: inline-block;
          position: absolute;
          width: 16px;
          height: 16px;
          text-align: center;
          left: 0;
          top: 0;
        }
        &.early {
          color: #07f1b7;
        }
        &.live {
          color: #e34d12;
        }
      }
    }
    .fast_bet_section {
      height: 80px;
      box-sizing: border-box;
      padding: 7px 10px;
      font-size: 14px;
      color: #07f1b7;
      white-space: nowrap;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #353e5a;
      }
      .section_title {
        line-height: 66px;
      }
      .fast_bet_section_main {
        margin-left: 15px;
        font-size: 18px;
        .fast_bet_money_type.fast_bet_input_box {
          height: 30px;
          line-height: 30px;
        }
        .fast_bet_input_box {
          margin-top: 6px;
          .fast_bet_number {
            margin-right: 10px;
            display: inline-block;
            vertical-align: middle;
          }
          input {
            &.fast_bet_input {
              .money_input;
              box-sizing: border-box;
              width: 80px;
            }
          }
        }
      }
    }
    .list_total {
      box-sizing: border-box;
      padding-left: 10px;
      height: 60px;
      white-space: nowrap;
      .btn {
        height: 100%;
        line-height: 60px;
        width: 90px;
        text-align: center;
      }
      #bet_btn {
        cursor: pointer;
        height: 100%;
        line-height: 60px;
        width: 90px;
        text-align: center;
        background: linear-gradient(to right, #07e9f1 , #07f1b7);
        font-size: 16px;
        color: #262933;
        &.danger {
          background: #f42e18;
          color: #fff;
        }
      }
      .spliter {
        margin: 0 2px;
      }
      .total_box {
        padding: 8px 0;
        color: #7c839f;
        font-size: 12px;
        .num {
          color: #07f1b7;
          font-size: 14px;
          padding: 0 3px;
          display: inline-block;
          vertical-align: bottom;
        }
        & > div {
          white-space: nowrap;
          height: 22px;
          line-height: 22px;
        }
        .total_box_bottom {
          .num {
            color: #07e9f1;
          }
        }
      }
    }
  }
  .game_bet_type_mark {
    position: absolute;
    left: 0;
    top: 0;
    width: 42px;
    height: 42px;
    background: @newegame_icons no-repeat;
  }
  .bet_box {
    &.early {
      .bet_box_top {
        .game_bet_type_mark {
          background-position: -288px -114px;
        }
      }
    }
    &.live {
      .bet_box_top {
        .game_bet_type_mark {
          background-position: -362px -114px;
        }
      }
    }
    &.indemnity {
      .bet_box_top {
        .game_bet_type_mark {
          background-position: -438px -114px;
        }
      }
    }
    .bet_box_content {
      box-sizing: border-box;
      padding: 10px 20px;
      min-height: 137px;
      border-bottom: 1px solid #484d5e;
      color: #7c839f;
      .bet_game_name{
        height: 22px;
        line-height: 22px;
        overflow: hidden;
      }
      .bet_game_vs {
        height: 22px;
        line-height: 22px;
        overflow: hidden;
        .game_vs {
          max-width: 170px;
          .vs {
            margin: 0 5px;
            display: inline-block;
            vertical-align: middle;
          }
          .team_name {
            display: inline-block;
            max-width: 70px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            vertical-align: middle;
          }
        }
        .game_type {
          width: 26px;
          text-align: right;
          height: 100%;
          img {
            vertical-align: middle;
            max-width: 100%;
            max-height: 100%;
          }
        }
      }
      .money_type_box {
        margin-top: 10px;
        font-size: 18px;
        color: #fff;
      }
      .input_box {
        .bet_input {
          .money_input;
        }
        margin-top: 10px;
        .can_win{
          border:0;
        }
      }
      .money_balance {
        margin-top: 8px;
      }
      .err_text_box {
        margin-top: 5px;
        margin-left: -8px;
        span {
          font-size: 12px;
          color: #e34d12;
          display: inline-block;
          line-height: 20px;
          animation-duration: 4s;
          border: 1px solid transparent;
          border-radius: 10px;
          padding: 0 8px;
          max-width: 193px;
          white-space: normal;
          word-break: break-all;
          transform: translateZ(0)
        }
      }
      .bet_detail {
        padding: 10px 0;
        .detail_box {
          float: left;
          .detail_box_content {
            height: 26px;
            line-height: 26px;
            text-align: center;
            color: #c8cce5;
            font-size: 12px;
          }
          .detail_box_title {
            height: 22px;
            line-height: 22px;
            margin-top: 2px;
            text-align: center;
            font-size: 12px;
          }
        }
        .betted_money {
          width: 65px;
        }
        .betted_point {
          width: 70px;
          box-sizing: border-box;
          padding: 0 10px;
        }
        .betted_win_money {
          width: 75px;
        }
      }
      .bet_time {
        text-align: right;
        margin-top: 8px;
        font-size: 12px;
      }
    }
    .bet_box_top {
      .bet_status {
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        line-height: 70px;
        padding-right: 10px;
        span {
          display: inline-block;
          vertical-align: middle;
          width: 40px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          border-radius: 3px;
          font-size: 12px;
          &.comfired {
            color: #07e9f1;
            background-color: #144349;
          }
          &.cancel {
            color: #7c839f;
            background-color: #262933;
          }
          &.clearing {
            color: #07f1b7;
            background-color: #14443d;
          }
          &.refuse {
            color: #e31212;
            background-color: #441420;
          }
          &.tobecomfired {
            color: #b7c2eb;
            background-color:  #262933;
          }
        }
      }
    }
  }
  .flash {
    animation-name: flash;
  }
  @keyframes flash {
    0%,30%,60%,90%,100%{
      border-color: transparent
    }

    15%,45%,75%,99%{
      border-color: #e34d12
    }
  }
 .unfoldbox-enter-active {
   animation: unfoldani .5s;
 }
 .unfoldbox-leave-active {
   animation: unfoldanif .4s ;
 }
 @keyframes unfoldani {
   0% {
     opacity: 0;
     transform: translateY(100%);
   }
   100% {
     opacity: 1;
     transform: translateY(0%);
   }
 }
 @keyframes unfoldanif {
   0% {
     opacity: 1;
     transform: translateY(0%);
   }
   100% {
     opacity: 0;
     transform: translateY(100%);
   }
 }
</style>
<style lang="less">
  .unfold_box .list_content .list_wrapper .happy-scroll-container{
    height: 100% !important;
    width: 100% !important;
    overflow-x: hidden;
    border-bottom: 0 !important;
    scrollbar-width: none;
    -ms-overflow-style:none;
  }
  .unfold_box .list_content .list_wrapper .happy-scroll-container .happy-scroll-content{
    border-bottom: 0 !important;
  }
</style>