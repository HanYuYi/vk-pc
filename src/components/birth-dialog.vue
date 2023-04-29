<template>
 <div class="">
    <div class="birth_aside"
    v-if="showBirthAside&&isLogin"
    @click="birthPrizeDialog.visible = true"></div>
    <!--生日红包-->
    <el-dialog
      :visible.sync="birthPrizeDialog.visible"
      :custom-class="birthPrizeDialog.class"
      :append-to-body="true"
      :fullscreen="true"
      :close-on-click-modal="birthPrizeDialog.maskClose">
      <div class="birth_prize_box">
        <div class="box_content">
          <div class="light_box" :class="{'show': lightShow, 'animate': lightAnimate}"></div>
          <div class="box_main">
            <div class="box_main_content">
              <div class="text_box" :class="{'opened': lightShow}">
                <div class="before_open">
                  <h4>{{$t("Birthday_package")}}</h4>
                  <div class="birth_tips" v-html="$t('Dear_today_is_your_birthday')"></div>
                </div>
                <div class="after_open">
                  <h4 class="prize">{{birthPrizeDialog.prize.amount?birthPrizeDialog.prize.amount:'-'}}</h4>
                  <h5>{{$t("Congratulations_to_you")}}</h5>
                  <div class="prize_info">{{$t("To_obtain")}}{{birthPrizeDialog.prize.amount?birthPrizeDialog.prize.amount:'-'}}{{birthPrizeDialog.prize.money_type==1?$t('yuan'):'VB'}}{{$t("A_red_envelope")}}</div>
                  <div class="get_prize_tips">
                    {{$t("Hurry_up_to")}}<a href="javascript:;" class="to_jump_link" @click="jumpToUser">{{$t("Personal_center")}}</a>{{$t("My_account_to_view")}}
                  </div>
                </div>
              </div>
              <div class="open_box" v-if="!lightShow">
                <span class="open_btn" :class="{'loading': openLoad}"
                 @click="handleTakeBirthPresent"></span>
              </div>
            </div>
          </div>
          <div class="coins_box">
            <div class="coin"
            :class="['c' + n]" v-for="n in coinsNum"
            v-show="showCoins"></div>
          </div>
        </div>
        <div class="dialog_close_btn" @click="handleCloseBirthDialog">
        </div>
      </div>
    </el-dialog>
 </div>
</template>

<script>
import { getPosition } from '../utils/util'
import { mapState } from "vuex";
import Velocity from 'velocity-animate'
export default {
  name: "birth-dialog",
  data() {
    return {
      birthPrizeDialog: {
        visible: false,
        class: "birth_prize_dialog",
        maskClose: false,
        prize: {}
      },
      lightShow: false,
      lightAnimate: false,
      openLoad: false,
      coinsNum: 20,
      showCoins: false,
    };
  },
  computed: {
    ...mapState(["isLogin", "showBirthAside","indexAlertData"])
  },
  mounted() {},
  methods: {
    jumpToUser() {
      this.handleCloseBirthDialog()
      this.$router.push({path: '/user'})
    },
    handleCloseBirthDialog () {
      this.birthPrizeDialog.visible = false
      setTimeout(() => {
        this.lightShow = false
        this.lightAnimate = false
      }, 20)
    },
    handleTakeBirthPresent () {
      if(this.indexAlertData.type&&this.indexAlertData.type == 6 && this.indexAlertData.id){
        this.openLoad = true
        let data = {
          id: this.indexAlertData.id
        }
        this.$http(this.ApiSetting.index.takeBirthPresent, data)
          .then((res) => {
            this.openLoad = false
            if(res.status === 1){
              this.birthPrizeDialog.prize = res.data
              if(res.data.money_type == 1){
                this.$store.dispatch('getUserMoeny', 'NM')
              }else{
                this.$store.dispatch('getUserVirtualMoney')
              }
              this.lightShow = true
              setTimeout(() => {
                this.lightAnimate = true
              }, 400)

             this.$store.commit('setShowBirthAside', false)
              coinAnimation(this)
            }
          })
      }
      function coinAnimation(_this) {
        // 蹦出动画
        for(let i = 0; i < _this.coinsNum; i++){
          var time = GetRandomNum(5, 10);
         setTimeout(() => {
              _this.showCoins = true
              let _left = GetRandomNum(-100, 210), _top = GetRandomNum(-100, -60);
              let _x = ''
              if(_left < 0){
                _x = -GetRandomNum(3, 12)
              }else{
                _x = GetRandomNum(3, 12);
              };
              let _y = GetRandomNum(2, 4);
              let obj = document.querySelector('.coin.c' + (i+1))
              Velocity(obj, {left: _left + 'px', top: _top + 'px', opacity: '1'}, { duration: 300 , complete: function () {
                startMove(obj, _x, _y)
              }})
          }, time*100)
        }
      }
      function GetRandomNum(Min, Max){
        var Range = Max - Min;
        var Rand = Math.random();
        return(Min + Math.round(Rand * Range));
      }

      //掉落运动动画
      //x, y 弹跳摩擦力
      function startMove(obj, x, y) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
          y += 3
          var l = getPosition(obj).left + x;
          var t  = getPosition(obj).top + y;
          if(l >= document.documentElement.clientWidth - obj.offsetWidth){
            x *= -0.8;
            l = document.documentElement.clientWidth - obj.offsetWidth;
          }else if(l <= 0){
            x *= -0.8;
            l = 0;
          }
          if(t >= document.documentElement.clientHeight  - obj.offsetHeight){
            y *= -0.8;
            x *= 0.8;
            t = document.documentElement.clientHeight- obj.offsetHeight;
          }else if(t <= 0){
            y *= -1;
            x *= 0.8;
            t = 0;
          }
          if(Math.abs(x) < 1){
            x = 0;
          }
          if(Math.abs(y) < 1){
            y = 0;
          }
          if(x == 0 && y == 0 && t == document.documentElement.clientHeight  - obj.offsetHeight){
            clearInterval(obj.timer);
          }else {
            if(!obj.offsetParent){
              obj.style.left = l + "px";
              obj.style.top = t + "px";
            }else{
              obj.style.left = l - getPosition(obj.offsetParent).left + "px";
              obj.style.top = t - getPosition(obj.offsetParent).top + "px";
            }
          }
        }, 30)
      }
    },
  }
};
</script>

<style  lang="less">
.birth_prize_dialog {
  &.el-dialog {
    border: none;
    width: 380px;
    background: none;
    box-shadow: none;
    top: 50px;
    .el-dialog__header {
      display: none;
    }
    .birth_prize_box {
      height: 520px;
      position: relative;
      margin-top: calc(50vh - 330px);
      .box_content {
        width: 380px;
        height: 442px;
        margin: 20px auto 0;
        position: relative;
        .box_main {
          position: absolute;
          width: 100%;
          height: 100%;
          background: url("../assets/index/birth_prize_bg.png") no-repeat center;
          background-size: 100% 100%;
          z-index: 2;
        }
        .light_box {
          position: absolute;
          width: 500px;
          height: 500px;
          left: 50%;
          top: -95px;
          margin-left: -250px;
          background: url("../assets/index/bg_light.png") no-repeat center;
          background-size: 100% 100%;
          transform: scale3d(0.2, 0.2, 0.2);
          transition: all 0.4s;
          &.show {
            transform: scale3d(1, 1, 1);
          }
          &.animate {
            transition: none;
            animation: 10s light_rotate linear infinite;
          }
        }
        .box_main_content {
          width: 306px;
          margin: 0 auto;
          padding-top: 186px;
          position: relative;
          .open_box {
            position: absolute;
            width: 100%;
            height: 90px;
            top: 280px;
            background: url("../assets/index/open_bg.png") no-repeat  center;
            background-size: 100% auto;
            text-align: center;
            .open_btn {
              display: inline-block;
              width: 82px;
              height: 82px;
              background-image: url("../assets/index/btn-open-normal.png");
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 100% 100%;
              cursor: pointer;
              margin-top: 18px;
              &:hover {
                background-image: url("../assets/index/btn-open-hover.png");
              }
              &.loading {
                animation: 5s light_rotate linear infinite;
              }
            }
          }
        }
        .text_box {
          color: #fff;
          padding: 0 30px;
          text-align: center;
          font-size: 14px;
          h4 {
            font-size: 40px;
            margin-bottom: 10px;
          }
          .after_open {
            display: none;
            opacity: 0;
            h4 {
              font-size: 60px;
            }
            h5 {
              font-size: 30px;
              margin-bottom: 10px;
              font-weight: normal;
            }
          }
          .prize_info {
            font-size: 16px;
            margin-bottom: 10px;
          }
          &.opened {
            .before_open {
              display: none;
            }
            .after_open {
              display: block;
              animation: 0.6s fade_in ease-in forwards;
              animation-delay: 0.2s;
            }
          }
          .to_jump_link {
            color: #efc165;
            text-decoration: underline;
          }
        }
        .coins_box {
          position: absolute;
          z-index: 3;
          width: 200px;
          left: 50%;
          margin-left: -100px;
          height: 60px;
          top: 80px;
          .coin {
            position: absolute;
            width: 58px;
            height: 58px;
            left: 72px;
            top: 0;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: contain;
            background-image: url("../assets/index/icon-bg1.png");
            opacity: 0;
            &:nth-child(2n) {
              background-image: url("../assets/index/icon-bg2.png");
            }
            &:nth-child(3n) {
              background-image: url("../assets/index/icon-bg3.png");
            }
          }
        }
      }
      .dialog_close_btn {
        position: absolute;
        width: 42px;
        height: 42px;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        background: url("../assets/index/btn_close_bg.png") no-repeat center;
        background-size: 100% 100%;
        cursor: pointer;
        z-index: 3;
      }
    }
  }
}
/*.birth_prize_dialog.el-dialog .birth_prize_box .box_content .coins_box .coin:nth-child(2n+4){
  background-image: url("../assets/index/icon-bg4.png");
}*/


@keyframes light_rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes fade_in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/*生日礼包侧边栏*/
.birth_aside{
  position: fixed;
  z-index: 99;
  right: 0;
  bottom: 16%;
 //  bottom: calc(45% + 130px);
  width: 80px;
  height: 219px;
  background: url("../assets/index/birth_aside_bg.png") no-repeat center;
  background-size: 100% 100%;
  cursor: pointer
}

</style>
