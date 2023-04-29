<template>
  <div class="exchange">
    <div class="finance_center_wrapper">
      <div class="accout_main clearfix">
        <div class="accout_vb accout_box fl">
          <div class="accout_title"><span class="icon"></span><b>{{$t("Currency_convertibility_V")}}</b></div>
          <div class="money_num"><span class="num">{{exchangeInfo.can_change}}</span><i> ≈{{virtualMoneyCanExchange}}{{$t("yuan")}}</i></div>
        </div>
        <div class="accout_money accout_box fl">
          <div class="accout_title"><span class="icon"></span><b>{{$t("The_wallet")}}</b></div>
          <div class="money_num">￥<span class="num" v-show="!userNMMoneyLoad">{{userMoney[0]}}.<i>{{userMoney[1]}}</i></span><span class="money_loading big" v-show="userNMMoneyLoad"><i class="dot"></i><i class="dot"></i><i class="dot"></i></span></div>
        </div>
      </div>
      <div class="finance_form_box clearfix exchange_input_box">
        <div class="box_left">
          {{$t("Change_V_c")}}
        </div>
        <div class="box_right">
          <input type="text" v-model="virtualMoney" class="ivu-input" :placeholder="$t('Please_enter_the_multiple_of')">
          <p class="can_exchange">{{$t("Is_equal_to_the")}} {{inputVirtualMoneyCanExchange || 0}}{{$t("yuan")}}</p>
        </div>
      </div>
      <p class="exchange_tips" v-html="$t('V_currency_can_be')"></p>
      <div class="btn exchange_btn">
        <span class="btn_loading" v-if="exchangeBtnLoad"></span>
        <a href="javascript:;" class="d_btn normal" @click="handleExchange()" v-else>{{$t("exchange")}}</a>
      </div>
    </div>

  </div>
</template>
<script type="text/javascript">
import { formatNumberSplit } from '../../../utils/util'
import { mapGetters } from 'vuex'
export default {
  name: 'userexchange',
  components: {},
  watch: {
    'virtualMoney': function (val, oldval) {
      this.virtualMoney = val.toString().replace(/[^0-9]/g, '')
    /*  if(val.indexOf(".")>0){
        this.virtualMoney.toString().replace(/./g, '')
      }
      if(val.indexOf("-")>0){
        this.virtualMoney.toString().replace(/-/g, '')
      }*/
    }
  },
  created () {
    this.loadExchangeInfo ()
  },
  computed: {
    ...mapGetters(["userMoney","userNMMoneyLoad"]),
    virtualMoneyCanExchange () {
      return this.exchangeInfo.can_change ? Math.floor(this.exchangeInfo.can_change/this.exchangeInfo.virtual_change) : 0
    },
    inputVirtualMoneyCanExchange () {
      return Math.floor(this.virtualMoney/this.exchangeInfo.virtual_change)
    },

  },
  data() {
     return {
       exchangeBtnLoad: false,
       virtualMoney: '',
       exchangeInfo: {}
     }
  },
  methods: {
    loadExchangeInfo () {
      this.$http(this.ApiSetting.user.getExchangeInfo)
        .then((res) => {
          if(res.status === 1){
            this.exchangeInfo = res.data
          }
        })
    },
    handleExchange () {
      if(this.virtualMoney.length === 0){
        this.$message({
          message: this.$t("Please_enter_the_exchange_quantity"),
          type: 'warning'
        })
        return false
      }
      if(this.virtualMoney%100!==0){
        this.$message({
          message: this.$t('Please_enter_the_multiple_of'),
          type: 'warning'
        })
        return false
      }
      if(this.virtualMoney*1 < this.exchangeInfo.virtual_exchange_min){
        this.$message({
          message: this.$t("Change_the_number_may_not")+ this.exchangeInfo.virtual_exchange_min +this.$t("oh"),
          type: 'warning'
        })
        return false
      }
      if(this.virtualMoney*1 > this.exchangeInfo.can_change){
        this.$message({
          message: this.$t("You_may_lack_of_quota"),
          type: 'warning'
        })
        return false
      }
      this.exchangeBtnLoad = true
      let data = {
        exchange_num: this.virtualMoney*1
      }
      this.$http(this.ApiSetting.user.exchangeVMoney, data)
        .then((res) => {
          if(res.status === 1){
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.loadExchangeInfo ()
            this.loadMoney ()
            this.virtualMoney = ''
          }
          this.exchangeBtnLoad = false
        }, (err) => {
          this.exchangeBtnLoad = false
        })
    },
    loadMoney () {
      this.$store.dispatch('getUserMoeny', 'NM')
      this.$store.dispatch('getUserVirtualMoney')
    }
  }
}
</script>
<style scoped>
.exchange .accout_main{
  padding: 10px 0;
}
.exchange .accout_main .accout_box{
  width: 410px;
}
.exchange .box_right .can_exchange{
  color: #fff;
  line-height: 24px;
}
.exchange_input_box {
  margin-top: 40px;
}
.exchange_tips{
  padding-left: 110px;
  line-height: 22px;
}
.exchange_btn{
  padding-left: 110px;
  margin-top: 20px;
}
</style>
