<template>
  <el-dialog
    :custom-class="'pure_dialog recharge'"
    :visible.sync="showRegisterRed"
    :append-to-body="true" >
    <div class="register_red_packet">
      <div class="colse" @click="closeRegisterRed()"></div>
      <span class="des">{{$t("vk_sports_welcomes_you")}}</span>
      <span class="money">{{indexAlertData.reg_bonus}}{{$t("yuan")}}</span>
      <span class="notice">{{$t("Cash_red_envelope_please_accept")}}</span>
      <div class="tri">
        <span>{{$t("top_up")}}{{indexAlertData.pay_money}}{{$t("Yuan_more_extra_surprise")}}</span>
      </div>
      <div class="btn" @click="getRegisterRed()"></div>
      <span class="duihuan">{{$t("Your_exchange_code_is")}}：{{indexAlertData.code}}</span>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "register-redpacket-dialog",
  data() {
    return {};
  },
  computed: {
    ...mapState(["showRegisterRed","indexAlertData"])
  },
  mounted() {},
  methods: {
    closeRegisterRed() {
      this.$store.commit('setshowRegisterRed', false)
    },
    getRegisterRed() {
      if(this.indexAlertData.type == 7 && this.indexAlertData.code) {
        this.closeRegisterRed()
        this.$router.push({path:"/user",query:{code:this.indexAlertData.code}})
      }
    },
  }
};
</script>

<style scoped lang="less">
/*注册红包*/
.register_red_packet {
  width: 355px;
  height: 415px;
  background: url("../assets/index/registerRedPacket/bg.png") no-repeat;
  text-align: center;
  position: relative;
  padding: 1px;
  margin: auto;
  .tri {
    background: #ffd74c;
    position: relative;
    height: 40px;
    max-width: 242px;
    margin: 20px auto 0;
    span {
      color: #de340d;
      line-height: 40px;
    }
    &::before,&::after {
      content: "";
      position: absolute;
      top: 0;
      width: 0;
      height: 0;
      border: 20px solid;
    }
    &::before {
      left: -40px;
      border-color: transparent #ffd74c transparent transparent;
    }
    &::after {
      right: -40px;
      border-color: transparent transparent transparent #ffd74c;
    }
  }
  .colse {
    position: absolute;
    width: 26px;
    height: 26px;
    right: -15px;
    top: -15px;
    background: url("../assets/index/registerRedPacket/close.png") no-repeat;
    cursor: pointer;
  }
  .des {
    margin-top: 78px;
  }
  span {
    color: #ffd648;
    font-size: 18px;
    display: block;
  }
  .money {
    font-size: 42px;
    margin-top:12px;
  }
  .notice {
    margin-top:5px;
  }
  .duihuan {
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }
  .btn {
    margin:14px auto 0;
    width: 91px;
    height: 93px;
    background: url("../assets/index/registerRedPacket/btn-normal.png") no-repeat;
    transition: background 0.2s;
    cursor: pointer;
    &:hover {
      background: url("../assets/index/registerRedPacket/btn-hover.png") no-repeat;
    }
  }

}
</style>
