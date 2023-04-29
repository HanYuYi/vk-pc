<template>
  <div class="transfer">
    <div class="finance_center_wrapper">
      <div class="accout_main">
        <div class="accout_money accout_box">
          <div class="accout_title"><span class="icon"></span><b>{{$t("The_wallet")}}</b></div>
          <div class="money_num">￥<span class="num" v-show="!userNMMoneyLoad"><b>{{userMoney[0]}}.<i class="float">{{userMoney[1]}}</i></b></span><span class="money_loading big" v-show="userNMMoneyLoad"><i class="dot"></i><i class="dot"></i><i class="dot"></i></span></div>
        </div>
      </div>
      <div class="game_wallet sub_section">
        <div class="sub_section_title">
          <i class="sub_title_mark"></i><span class="title_name">{{$t("The_game_wallet")}}</span>
        </div>
        <div class="sub_section_content">
          <div class="game_wallet_list clearfix">
            <div class="wallet_box" v-for="(item, index) in gameWalletList" :key="item.code" :class="item.code">
            <!-- <div class="wallet_box" v-for="(item, index) in gameWalletList" :key="item.code" :class="{'ag':item.code === 'AG','sport':item.code === 'GM','lygame':item.code === 'LY','mggame':item.code === 'MG','eBet':item.code === 'EBET','pbsport':item.code === 'PINNACLE','lucky':item.code === 'LK','dragon':item.code === 'LC'}"> -->
              <div class="wallet_name">{{item.name}}</div>
              <div class="wallet_money"><span v-if="item.getMoneyFail">{{item.errMsg}}</span><span v-else>￥<span class="num"><b v-show="!item.loading">{{item.money[0]}}.<i class="float">{{item.money[1]}}</i></b><span class="money_loading" v-show="item.loading"><i class="dot"></i><i class="dot"></i><i class="dot"></i></span></span></span></div>
              <div class="refresh_btn" @click="handleRefreshMoney(item)"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="transfer_content clearfix">
        <div class="transfer_box fl left clearfix">
          <div class="transfer_box_title fl">{{$t("Transfer_accounts")}}</div>
          <radio-group size="large" v-model="rollOutCurrentWallet" @on-change="rollOutWalletChange($event)" class="fl radio_box">
            <radio v-for="item in rollOutWalletList" :label="item.code" :key="item.code" :disabled="item.disabled">{{item.name}}</radio>
          </radio-group>
        </div>
        <div class="transfer_box fl right clearfix">
          <div class="transfer_box_title fl">{{$t("Into_account")}}</div>
          <radio-group size="large" v-model="rollInCurrentWallet" @on-change="rollInWalletChange($event)" class="fl radio_box">
            <radio v-for="item in rollInWalletList" :label="item.code" :key="item.code" :disabled="item.disabled">{{item.name}}</radio>
          </radio-group>
        </div>
        <div class="transfer_btn"><span @click="changeInOut"></span></div>
      </div>
      <div class="finance_form_box clearfix">
        <div class="box_left">
          {{$t("Transfer_amount")}}
        </div>
        <div class="box_right">
          <input type="tel" @keyup="inputChange($event)"  class="ivu-input" v-model.trim="transferMoney">
          <div class="first_deposit_box" v-if="show && itemActiveObj.first_transfer_is_show==1">
            <router-link :to="itemActiveObj.first_transfer_href" ><i>{{itemActiveObj.first_transfer_tips}}</i>⇒</router-link>
          </div>
        </div>
      </div>
      <div class="btn confirm">
        <span class="btn_loading" v-if="confirmBtnLoadFlag"></span>
        <a href="javascript:;" class="d_btn normal" @click="submitTransfer" v-else>{{$t("confirm")}}</a>
      </div>
    </div>

  </div>
</template>
<script type="text/javascript">
import { copyArr,numOnlyDT } from "../../../utils/util";
import { mapGetters, mapState } from "vuex";
export default {
  name: "usertransfer",
  components: {},
  created() {
    this.loadGameWalletList();
  },
  computed: {
    ...mapGetters(["userMoney", "userNMMoneyLoad"]),
    ...mapState(["userVirtualMoney"])
  },
  data() {
    return {
      confirmBtnLoadFlag: false,
      gameWalletList: [],
      rollInWalletList: [],
      rollOutWalletList: [],
      rollInCurrentWallet: "",
      rollOutCurrentWallet: "",
      transferMoney: "",
      itemActiveObj:{},
      show:true
      // showTransferActiveTips: {}
    };
  },
  methods: {
    inputChange(e) {
      this.transferMoney = numOnlyDT(e.target.value )
    },
    loadGameWalletList() {
      this.$http(this.ApiSetting.user.getGameWalletList).then(res => {
        if (res.status === 1) {

          if (res.data.length > 0) {
            this.rollInWalletList = [];
            this.rollOutWalletList = [];
            this.rollOutWalletList = copyArr(res.data);
            this.rollInWalletList = copyArr(res.data);
            res.data.forEach((v, i) => {
              v.loading = true;
              v.money = [];
            });
            this.gameWalletList = res.data;
            this.gameWalletList.shift();
            this.rollOutCurrentWallet = this.rollOutWalletList[0].code;
            this.rollInCurrentWallet = this.rollInWalletList[1].code;
              this.rollInWalletChange(this.rollInWalletList[1].code)

            if (this.rollOutCurrentWallet === "NM") {
              this.rollInWalletList.forEach((v, i) => {
                if (v.code === "NM") {
                  v.disabled = true;
                } else {
                  v.disabled = false;
                }
              });
            } else {
              this.rollInWalletList.forEach((v, i) => {
                if (v.code === "NM") {
                  v.disabled = false;
                } else {
                  v.disabled = true;
                }
              });
            }
          }
          setTimeout(() => {
            this.loadGameWalletMoney();
          }, 100);
        }
      });
    },
    loadGameWalletMoney() {
      this.gameWalletList.forEach((v, i) => {
        let data = {
          gameCode: v.code
        };
        this.$http(this.ApiSetting.index.getMoney, data).then(
          res => {
            if (res.status === 1) {
              v.money = res.data.amount.split(".");
            } else {
              v.getMoneyFail = true;
              v.errMsg = res.message;
            }
            v.loading = false;
            // this.gameWalletList.sort()
          },
          err => {
            v.getMoneyFail = true;
            v.loading = false;
            // this.gameWalletList.sort()
          }
        );
      });
    },
    handleRefreshMoney(x) {
      x.loading = true;
      x.getMoneyFail = false;
      this.gameWalletList.sort();
      let data = {
        gameCode: x.code
      };
      this.$http(this.ApiSetting.index.getMoney, data).then(
        res => {
          if (res.status === 1) {
            x.money = res.data.amount.split(".");
          } else {
            x.getMoneyFail = true;
          }
          x.loading = false;
          // this.gameWalletList.sort()
        },
        err => {
          x.getMoneyFail = true;
          x.loading = false;
          // this.gameWalletList.sort()
        }
      );
    },
    rollOutWalletChange(evt) {
    
      this.rollOutWalletList.forEach((v, i) => {
        v.disabled = false;
      });
      if (this.rollOutCurrentWallet === "NM") {
        this.rollInWalletList.forEach((v, i) => {
          if (v.code === "NM") {
            v.disabled = true;
            if (this.rollInCurrentWallet === "NM") {
              this.rollInCurrentWallet = this.rollInWalletList[1].code;
            }
          } else {
            v.disabled = false;
          }
        });
      } else {
        this.rollInWalletList.forEach((v, i) => {
          if (v.code === "NM") {
            v.disabled = false;
            this.rollInCurrentWallet = "NM";
          } else {
            v.disabled = true;
          }
        });
      }

      if(evt==this.rollOutWalletList[0].code){
        this.show=true
        this.activeItem(this.rollInCurrentWallet)
      }else{
        this.show=false
      }



    },
    rollInWalletChange(evt) {

      this.rollInWalletList.forEach((v, i) => {
        v.disabled = false;
      });
      if (this.rollInCurrentWallet === "NM") {
        this.rollOutWalletList.forEach((v, i) => {
          if (v.code === "NM") {
            v.disabled = true;
            if (this.rollOutCurrentWallet === "NM") {
              this.rollOutCurrentWallet = this.rollOutWalletList[1].code;
            }
          } else {
            v.disabled = false;
          }
        });
      } else {
        this.rollOutWalletList.forEach((v, i) => {
          if (v.code === "NM") {
            v.disabled = false;
            this.rollOutCurrentWallet = "NM";
          } else {
            v.disabled = true;
          }
        });
      }

      this.activeItem(evt)
    },

    activeItem(evt) {
      var list = this.rollInWalletList
      this.itemActiveObj = list.find((item) => item.code == evt)
      if (this.itemActiveObj) {
        this.show = true
      }
    },

    changeInOut() {

      let newArrIn = copyArr(this.rollOutWalletList);
      let newArrOut = copyArr(this.rollInWalletList);
      let newCurrentWalletOut = this.rollInCurrentWallet;
      let newCurrentWalletIn = this.rollOutCurrentWallet;
      this.rollOutWalletList = newArrOut;
      this.rollInWalletList = newArrIn;

      this.rollInCurrentWallet = newCurrentWalletIn;
      this.rollOutCurrentWallet = newCurrentWalletOut;

      this.show=false
      this.activeItem(this.rollInCurrentWallet)
      if(this.rollOutCurrentWallet==this.rollOutWalletList[0].code){
        this.show=true
        this.activeItem(this.rollInCurrentWallet)
      }else{
        this.show=false
      }


    },
    submitTransfer() {
      if (this.transferMoney.length === 0) {
        this.$message({
          message: this.$t("Please_enter_the_amount"),
          type: "warning"
        });
        return false;
      } else if (this.transferMoney == 0) {
        this.$message({
          message: this.$t("Please_input_the_correct_amount"),
          type: "warning"
        });
        return false;
      }
      let data = {
        from: this.rollOutCurrentWallet,
        to: this.rollInCurrentWallet,
        money: this.transferMoney * 1
      };
      let isContinue = true;
      let _this = this;
      if (!data.money) {
        this.$message({
          message: this.$t("Please_input_the_correct_amount"),
          type: "warning"
        });
        return;
      }
      this.gameWalletList.forEach((v, i) => {
        if (v.code === data.from) {
          if (v.code == "NM") {
            _this.userMoney[0].replace(",", "");
            if (data.money > parseFloat(_this.userMoney.join("."))) {
              isContinue = false;
              _this.$message({
                message: this.$t("The_amount_you_enter_more"),
                type: "warning"
              });
            }
          } else if (data.money > parseFloat(v.money.join("."))) {
            isContinue = false;
            _this.$message({
              message: this.$t("The_amount_you_enter_more"),
              type: "warning"
            });
          }
        }
      });
      if (!isContinue) return;
      this.confirmBtnLoadFlag = true;
      this.$http(this.ApiSetting.user.transferSubmit, data).then(
        res => {
          if (res.status === 1) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.transferMoney = "";
            let needRefreshCode = "";
            if (this.rollOutCurrentWallet === "NM") {
              needRefreshCode = this.rollInCurrentWallet;
            } else {
              needRefreshCode = this.rollOutCurrentWallet;
            }
            this.gameWalletList.forEach((v, i) => {
              if (v.code === needRefreshCode) this.handleRefreshMoney(v);
            });
            this.$store.dispatch("getUserMoeny", "NM");
          }
          this.confirmBtnLoadFlag = false;
        },
        err => {
          this.confirmBtnLoadFlag = false;
        }
      );
    }
  }
};
</script>
<style scoped>

.first_deposit_box {
  color: #fff;
  font-size: 12px;
  height:26px;
}
.first_deposit_box a {
  color: #fff;
  height: 26px;
  line-height: 26px;
  font-size: 14px;
}
.first_deposit_box a i {
  font-size: 12px;
  text-decoration: underline;
}
.first_deposit_box a:hover {
  color: #07f1b7;
}
.transfer_content {
  margin: 10px 0 30px;
}
.transfer .confirm.btn {
  padding-left: 110px;
  margin-top: 40px;
}
.transfer_content {
  position: relative;
}
.transfer_content .transfer_box {
  display: flex;
  align-items: center;
  width: 272px;
  background-color: #323644;
  border-radius: 4px;
  margin-right: 6px;
  box-sizing: border-box;
  padding: 20px;
  font-size: 14px;
  background: url("../../../assets/user/transfer_box_bg.png") no-repeat center;
  background-size: 100% 100%;
}
.transfer_content .transfer_box .transfer_box_title {
  width: 100px;
  color: #fff;
  font-size: 18px;
}
.transfer_content .transfer_box.right .transfer_box_title {
  text-align: right;
}
.transfer_content .transfer_box .radio_box {
  width: 120px;
  box-sizing: border-box;
  padding-left: 10px;
  line-height: normal;
}
.transfer_content .transfer_box.right .radio_box {
  padding-left: 20px;
}
.transfer_content .transfer_box .radio_box .ivu-radio-wrapper {
  line-height: 30px;
}
.transfer_content .transfer_btn {
  position: absolute;
  width: 42px;
  height: 42px;
  line-height: 42px;
  background-color: #1e2027;
  border-radius: 3px;
  text-align: center;
  left: 254px;
  top: 50%;
  transform: translateY(-50%);
}
.transfer_content .transfer_btn span {
  display: inline-block;
  vertical-align: middle;
  margin-top: -4px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: url("../../../assets/user/change_btn.png") no-repeat center;
}
.transfer_content .transfer_btn span:hover {
  background: url("../../../assets/user/change_btn_hover.png") no-repeat center;
}
</style>
