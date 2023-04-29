<template>
  <div class="bind_steam">
    <div class="change_steam">
      <div class="steam_tips">
        <i class="mark"></i>{{$t("Replacement_has_been_binding_Steam")}}
      </div>
      <div class="change_content clearfix">
        <div class="binded_steam accout_box">
          <div class="accout_title">{{$t("Has_the_binding_Steam_account")}}</div>
          <div class="steam_account">{{oldSteam}}</div>
        </div>
        <div class="spliter fl">
          <span></span>
        </div>
        <div class="new_steam accout_box">
          <div class="accout_title">{{$t("Replace_with")}}</div>
          <div class="steam_account">{{newSteam}}</div>
        </div>
      </div>
      <div class="trade_pwd_box">
        <span>{{$t("Trade_password")}}</span><input type="password" class="ivu-input" v-model.trim="tradePwd" :placeholder="$t('The_replacement_need_your_trading')">
      </div>
      <div class="btn">
        <a href="javascript:;" class="d_btn normal" @click="changeSteam">{{$t("Confirm_to_replace")}}</a><router-link to="/" class="d_btn cancel">{{$t("cancel")}}</router-link>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { getCookie } from '../../utils/util'
export default {
  name: 'bindsteam',
  components: {},
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('showLoginBtn', 1)
    })
  },
  data() {
    return {
      oldSteam: '',
      newSteam: '',
      tradePwd: ''
    }
  },
  created () {
    this.getCookieMsg ()
  },
  methods: {
    getCookieMsg () {
      if(getCookie('new_name')){
        this.newSteam = getCookie('new_name')
      }
      if(getCookie('old_name')){
        this.oldSteam = getCookie('old_name')
      }
    },
    changeSteam () {
      let data = {
        password: this.tradePwd,
        update: 1
      }
      if(this.tradePwd.length == 0){
        this.$message({
          message: this.$t("Please_enter_trading_password"),
          type: 'warning'
        })
        return false
      }
      this.$http(this.ApiSetting.index.changeSteam, data)
        .then((res) => {
          if(res.status === 1){
            this.$message({
              message: res.message,
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({path: '/'})
            }, 300)
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
.bind_steam {
  padding-top: 30px;
}
.steam_tips {
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  margin: 30px 0;
  text-align: center;
  .mark {
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: #07f1b7;
    vertical-align: middle;
    margin-right: 5px;
  }
}
.change_steam {
  .change_content {
    .spliter {
      width: 80px;
      text-align: center;
      span {
        display: inline-block;
        width: 32px;
        height: 13px;
        margin-top: 30px;
        background: url("../../assets/steam_spliter.png") no-repeat center;
      }
    }
    .accout_box {
      float: left;
      text-align: center;
      color: #fff;
      width: 200px;
      .steam_account {
        font-size: 16px;
        margin-top: 8px;
      }
      &.binded_steam {
        .steam_account {
          color: #07f1b7;
          height: 28px;
          line-height: 28px;
        }
      }
    }
  }
  .trade_pwd_box {
    padding: 50px 0;
    font-size: 16px;
    text-align: center;
    .ivu-input {
      width: 240px;
      margin-left: 10px;
      border-color: #7c839f;
    }
  }
  .btn {
    text-align: center;
    width: 100%;
  }
}

</style>
