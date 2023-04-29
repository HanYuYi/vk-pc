<template>
  <div class="active_page anniversary">
    <!-- <div class="anniversary"></div> -->
    <div class="part_two">
      <img
        class="iphone"
        src="../../../assets/active/anniversary/iPhone.png"
        alt=""
      />
      <img class="wsad" src="../../../assets/active/anniversary/wsad.png" alt="" />
      <div class="title_1">
        {{$t("The_activity_time")}}：{{activityTime}}
      </div>
    </div>
    <div class="part_three">
      <div class="prize-tit">
        <span>{{$t("anniversary_text1")}}</span>
        <span>{{$t("anniversary_text2")}}</span>
      </div>
      <img src="../../../assets/active/anniversary/prize.png" alt="" />
      <router-link to="/active/callfriend">
        <div class="get_btn"></div>
      </router-link>
    </div>
    <div class="part_four">
      <img src="../../../assets/active/anniversary/title-2.png" alt="">
    </div>
    <div class="part_five">
      <img class="coin" src="../../../assets/active/anniversary/coin.png" alt="">
      <ul class="count">
        <li v-for="(time,index) in countDown" :key="index" :class="'time_'+time"></li>
      </ul>
      <div v-if="isApply"  class="has_apply_btn"></div>
      <div v-if="!isApply&&showApllyBtn" class="apply_btn" @click="apply()"></div>
      <div class="active_tips"><span>周年庆奖金需在电竞赛事完成一倍流水后才可提款</span></div>
      <div class="prize_list">
        <div class="winner_box">
          <div class="win_two" v-if="topList.length >=2">
            <img class="star" src="../../../assets/active/anniversary/star-2.png" alt="">
            <img class="avatar" :src="topList[1].head_image" alt="">
            <span class="ellips">{{topList[1].username}}</span>
            <span class="prize_name">￥{{Math.floor(topList[1].money)}}</span>
          </div>
          <div v-else></div>
          <div class="win_one" v-if="topList.length >=1">
             <img class="star" src="../../../assets/active/anniversary/star-3.png" alt="">
             <img class="avatar" :src="topList[0].head_image" alt="">
             <span class="ellips">{{topList[0].username}}</span>
             <span class="prize_name">￥{{Math.floor(topList[0].money)}}</span>
          </div>
          <div class="win_three" v-if="topList.length >=3">
            <img class="star" src="../../../assets/active/anniversary/star-1.png" alt="">
            <img class="avatar" :src="topList[2].head_image" alt="">
            <span class="ellips">{{topList[2].username}}</span>
            <span class="prize_name">￥{{Math.floor(topList[2].money)}}</span>
          </div>
          <div v-else></div>
        </div>
        <div class="list_box">
          <ul class="win_list">
            <li class="empty" v-for="item in emptyList" :key="item">
            </li>
          </ul>
          <transition-group name="list-complete"  class="win_list" tag="ul">
            <li v-for="(item,index) in otherList" :key="item.uuid" class="list-complete-item" :class="{'list-complete-item-ool':index%2 == 1}">
              <img :src="item.head_image" alt="">
              <span class="nickname ellips">{{item.username}}</span>
              <div class="got_right">
                <span class="prize_got ">￥{{Math.floor(item.money)}}</span>
              </div>
            </li>
          </transition-group>
        </div>
      </div>
      <div class="rule" v-html="$t('anniversary_rule')"></div>
    </div>
  </div>
</template>

<script>
import {formatDate,formatCountTime,formatNumberFloatPad} from "../../../utils/util"
export default {
  name: "anniversary",
  data() {
    return {
      showApllyBtn: true,
      emptyList:[],
      activityTime:"",
      countDown:[],
      countDownTimer:null,
      isApply:false,
      topList:[],
      current_page:1,
      per_page:28,
      otherList:[],
      timer1:null,
      timer2:null,
      timeOut:true,
      telArr:[]
    };
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer1)
    clearInterval(this.timer2)
    clearInterval(this.countDownTimer)
    document.querySelector(".active_home").style.overflowX = ""
    next()
  },
  mounted () {
    let w = document.body.offsetWidth
    if(parseFloat(w)>1900) {
      document.querySelector(".active_home").style.overflowX = "hidden"
    }
    for(let i=1;i<=14;i++) {
      this.emptyList.push(i)
    }
    this.getBaseInfo()
    this.getList(1)
    this.timer1 = setInterval(() => {
      this.timeOut = false
      this.getList()
      setTimeout(() => {
        if(!this.timeOut) {
          let ldata = JSON.parse(JSON.stringify(this.telArr))
          ldata.forEach(element => {
            element.uuid = this.uuid()
            this.otherList.push(element)
          });
        }
      }, 6000);
    }, 14000);

    let _date = formatDate(new Date(), 'yyyy/MM/dd')
    if(new Date().getTime()>new Date(_date).getTime() + 20*60*60*1000){
      this.showApllyBtn = false
    }else{
      this.showApllyBtn = true
    }
  },
  methods: {
    formatNumber(data) {
      return formatNumberFloatPad(data)
    },
    getBaseInfo() {
      this.$http(this.ApiSetting.active.anniversary.getBaseInfo)
      .then(res => {
        if(res.status == 1&& res.data) {
          if(res.data.is_sign) {
            this.isApply = true
          }
          if(res.data.active_info.start_time && res.data.active_info.end_time) {
            this.activityTime = formatDate(res.data.active_info.start_time*1000,"yyyy" + this.$t("year") +"MM" + this.$t("month")) + " " + formatDate(res.data.active_info.start_time*1000,"dd" + this.$t("date"))+ "-"+formatDate(res.data.active_info.end_time*1000,"dd" + this.$t("date"))
          }
          if(res.data.active_info.open_time) {
            let time = new Date(formatDate(new Date().getTime(),"yyyy/MM/dd") + " "+ res.data.active_info.open_time).getTime()
            let countTime = 0
            if(time > new Date().getTime()) {
              countTime = parseInt((time - new Date().getTime())/1000)
            }else {
              if(formatDate(new Date().getTime(),"HH") <24 ) {
                countTime = parseInt((time + 24*60*60*1000 - new Date().getTime())/1000)
              }
            }
            clearInterval(this.countDownTimer)
            this.countDownTimer =  setInterval(() => {
              countTime--
              this.countDown = formatCountTime(countTime).split("")
              this.countDown.splice(2,1,"10")
              this.countDown.splice(5,1,"10")
              if(countTime<0) {
                this.getList()
                countTime = 24*60*60
                clearInterval(this.countDownTimer)
                this.countDownTimer = setInterval(() => {
                  countTime--
                  this.countDown = formatCountTime(countTime).split("")
                  this.countDown.splice(2,1,"10")
                  this.countDown.splice(5,1,"10")
                }, 1000);
              }
            }, 1000);
          }
        }
      })
    },
    getList(bool) {
      this.$http(this.ApiSetting.active.anniversary.getList,{page:this.current_page,limit:this.per_page})
      .then(res => {
         this.timeOut = true
        if(res.status == 1 && res.data) {
          if(res.data.top) {
            res.data.top.length && (this.topList = res.data.top)
          }
          if(res.data.list) {
            this.telArr = JSON.parse(JSON.stringify(res.data.list.data))
            let ldata = JSON.parse(JSON.stringify(res.data.list.data));
            ldata.forEach(element => {
              element.uuid = this.uuid()
              this.otherList.push(element)
            });
            // this.otherList =this.otherList.concat(ldata)
            if((bool && this.otherList.length) || (this.otherList.length && res.data.list.data.length < 10)) {
              if(this.otherList.length < this.per_page) {
                let co =0
                if(bool) {
                  co = Math.ceil((this.per_page - this.otherList.length)/this.otherList.length)
                }else {
                  co = Math.ceil(10/res.data.list.data.length)
                }
                for(let i = 0;i<co;i++) {
                  let tob = JSON.parse(JSON.stringify(res.data.list.data))
                  tob.forEach(element => {
                    element.uuid = this.uuid()
                    this.otherList.push(element)
                  });
                }
              }
              if(bool) {
                this.timer2 = setInterval(() => {
                  this.otherList.splice(0,2)
                }, 3000);
              }

            }
            let listInfo = res.data.list
            if(Math.ceil(listInfo.total/this.per_page) > this.current_page) {
              this.current_page++
            }else {
              this.current_page = 1
            }
          }

        }
      })
    },
    apply() {
      if (this.isLogin) {
        this.$http(this.ApiSetting.active.anniversary.apply)
        .then(res => {
          if(res.status === 1) {
            this.$message({
              message: this.$t("apply_success"),
              type: 'success'
            })
            this.isApply = true
          }
        })
      } else {
        this.$message({
          message: this.$t("Please_login_first"),
          type: 'warning'
        })
      }
    },
    uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }
  }
};
</script>

<style scoped lang="less">
.list-complete-item {
  transition: all 1s;
}
.list-complete-item-ool {
  right: 0;

}
.list-complete-enter, .list-complete-leave-to{
  opacity: 0;
  transform: translateY(-50px);
}
.list-complete-leave-active {
  position: absolute;
  top:0;
}
*+* {
   box-sizing: border-box;
}

.anniversary {
  width: 100vw;
  min-width: 1908px;
  background: url("../../../assets/active/anniversary/banner-top.jpg") no-repeat
    center top;
  background-size: 100%;
  padding-bottom: 0;
}
.part_two {
  width: 100vw;
   min-width: 1920px;
  // width: 1920px;
  height: 243px;
  margin-top: 160px;
  background: url("../../../assets/active/anniversary/split.png");
  position: relative;
  box-shadow: 0px 16px 55px 0px rgba(0, 1, 56, 0.24);
  >img,>div {
    position: absolute;
  }
  .iphone {
    left: 115px;
    top: -134px;
  }
  .wsad {
    right: 67px;
    top: -134px;
  }
  .title_1 {
    width: 748px;
    height: 219px;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: url("../../../assets/active/anniversary/title-1.png") no-repeat;
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    padding: 12px 0 0 183px;
  }
}

.part_three {
  width: 100vw;
  min-width: 1920px;
  height: 704px;
  background: #258ae0;
  text-align: center;
  padding-top: 65px;
  img {
  }
  .prize-tit {
    color: #fff;
    font-size: 32px;
    font-weight: bold;
    letter-spacing: 0.8px;
    margin-bottom: 25px;
    span:first-child {
      margin-right: 100px;
    }
  }
  .get_btn {
    margin: 40px auto 0;
    width: 250px;
    height: 88px;
    cursor: pointer;
    transition: all 0.2s;
    background: url("../../../assets/active/anniversary/btn-get-normal.png")
      no-repeat;
    &:hover {
      background: url("../../../assets/active/anniversary/btn-get-hover.png")
        no-repeat;
    }
  }
}

.part_four {
  width: 100vw;
  min-width: 1920px;
  height: 243px;
  background: url("../../../assets/active/anniversary/split.png");
  box-shadow: 0px 16px 55px 0px rgba(0, 1, 56, 0.24);
  text-align: center;
  padding-top:30px;
  position:absolute;
  z-index: 2;

}
.part_five {
  width: 100%;
  background: url("../../../assets/active/anniversary/bg.jpg");
  position: relative;
  height: 2650px;
  margin-top:243px;
  >* {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .coin {
    top: -455px;
    pointer-events: none;
  }
  .count {
   width: 507px;
   height: 254px;
   background: url("../../../assets/active/anniversary/cuount-down.png") no-repeat;
   top: 383px;
   padding: 77px 0 0 78px;
   .time_bg {
     background: url("../../../assets/active/anniversary/numbers.png") no-repeat;
     width: 44px;
     height: 84px;
     float: left;
     margin-right: 9px;
   }
   @w_space:53px;
   @base:57px;
   .generate-columns(9);
   .generate-columns(@n, @i: 0) when (@i =< @n) {
     .time_@{i} {
       .time_bg;
       background-position-x:-(@w_space*@i + @base);
     }
     .generate-columns(@n, (@i + 1));
   }
   .time_10 {
     .time_bg;
     width:12px;
     background-position-x: -20px;
   }
  }
  .has_apply_btn {
    top:805px;
    width: 250px;
    height: 88px;
    background: url("../../../assets/active/anniversary/has-apply.png") no-repeat;
  }
  .apply_btn {
    top:637px;
    width: 250px;
    height: 88px;
    background: url("../../../assets/active/anniversary/btn-apply-normal.png") no-repeat;
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
      background: url("../../../assets/active/anniversary/btn-aplly-hover.png") no-repeat;
    }
  }
  .active_tips{
    position: absolute;
    top: 736px;
    text-align: center;
    width: 100%;
    line-height: 30px;
    font-size: 14px;
    color:#fff;
  }
  .prize_list {
    width: 1070px;
    height: 919px;;
    background: url("../../../assets/active/anniversary/prize-list.png") no-repeat;
    top:896px;
    .winner_box {
      width: 600px;
      height: 210px;
      margin:174px auto 0;
      text-align: center;
      >div {
        width: 200px;
        float: left;
        height: 100%;
        >* {
          margin:auto;
        }
        img {
          display: block;
        }
        span {
          letter-spacing: 0.5px;
          color: #ffffff;
          font-size: 18px;
          max-width: 150px;
          display: block;
          margin: 8px auto 10px;
        }
        .avatar {
          border-radius: 100%;
          border:2px solid #ffed0d;

        }
        .prize_name {
          color: #ffed0d;
          letter-spacing: 0.8px;
          font-size: 32px;
        }
      }
      .win_one {
        .avatar {
          width: 100px;
          height: 100px;
        }
      }
      .win_two,.win_three {
        .avatar {
          width: 70px;
          height: 70px;
        }
        .star {
          margin-top: 38px;
        }

      }
    }
    .list_box {
      width: 888px;
      height: 350px;
      margin: 45px auto 0;
      position: relative;
    }

    .win_list {
      position:absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      li {
        width: 400px;
        height: 50px;
        float: left;
        &:nth-child(2n+1) {
          margin-right: 88px;
        }
        img {
          width: 40px;
          height: 40px;
          border-radius: 100%;
          margin:0 20px 0 30px;
          vertical-align: super;
        }
        span {
          line-height: 50px;
          letter-spacing: 0.5px;
          color: #ffffff;
          font-size: 14px;
        }
        .nickname {
          display: inline-block;
          max-width: 140px;
          margin-right: 10px;
          font-size: 14px;
        }
        .got_right {
          float:right;
          width: 150px;
          .prize-got {
            float: left;
          }
        }
      }
      li.empty {
        background: rgba(0, 0, 0,0.1);
        &:nth-child(2),&:nth-child(3),&:nth-child(6),&:nth-child(7),&:nth-child(10),&:nth-child(11),&:nth-child(14){
          background: transparent;
        }
        &:nth-child(4n) {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        &:nth-child(4n+1) {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }

      }
    }
  }
  .rule {
    width: 1070px;
    height: 632px;;
    background: url("../../../assets/active/anniversary/rule.png") no-repeat;
    top:1808px;
    line-height: 34px;
    letter-spacing: 0.5px;
    color: #ffffff;
    font-size: 18px;
    padding: 200px 183px 0;
  }
}

</style>
