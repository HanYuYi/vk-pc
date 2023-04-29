<template>
  <!--充值红包-->
  <el-dialog
    :custom-class="'pure_dialog'"
    :visible.sync="showRechargeRed"
    :append-to-body="true" >
    <div class="recharge_red_packet">
      <div class="colse" @click="closeRechargeRed()"></div>
      <span class="des">{{$t("red_envelope_constantly")}}</span>
      <span class="money">{{indexAlertData.deposit_bonus}}{{$t("yuan")}}</span>
      <!-- <span class="notice">{{$t("top_up")}}{{indexAlertData.pay_money}}{{$t("yuan_available")}}</span> -->
      <div class="btn" @click="getRechargeRed()"></div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "recharge-redpacket-dialog",
  data() {
    return {};
  },
  computed: {
    ...mapState(["showRechargeRed","indexAlertData"])
  },
  mounted() {},
  methods: {
    closeRechargeRed() {
      this.$store.commit('setshowRechargeRed', false)
    },
    getRechargeRed() {
      if(this.indexAlertData.type == 8 && this.indexAlertData.code) {
        this.$http(this.ApiSetting.user.redeemCode, {
          coupon_num:this.indexAlertData.code,
          hideMsg: true
        }).then(res => {
          if(res.status === 1){
            this.closeRechargeRed()
            this.$message({
              message: this.$t("solaka_text4"),
              type: 'success'
            })
          }
        })
      }
    },
  }
};
</script>

<style scoped lang="less">
.recharge_red_packet {
  width: 489px;
  height: 596px;
  background: url("../assets/index/rechargeRedPacket/bg.png") no-repeat;
  text-align: center;
  position: relative;
  padding: 1px;
  margin: auto;
  .colse {
    position: absolute;
    width: 26px;
    height: 26px;
    right: 55px;
    top: 118px;
    background: url("../assets/index/rechargeRedPacket/close.png") no-repeat;
    cursor: pointer;
  }
  .des {
    margin-top: 335px;
  }
  span {
    color: #fba329;
    font-size: 24px;
    display: block;
  }
  .money {
    font-size: 44px;
    margin-top:30px;
  }
  .notice {
    margin-top:5px;
  }
  .btn {
    margin:45px auto 0;
    width: 216px;
    height: 71px;
    background: url("../assets/index/rechargeRedPacket/btn-normal.png") no-repeat;
    transition: background 0.2s;
    cursor: pointer;
    &:hover {
      background: url("../assets/index/rechargeRedPacket/btn-hover.png") no-repeat;
    }
  }

}
</style>
