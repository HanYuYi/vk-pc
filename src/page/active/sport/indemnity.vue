<template>
  <div class="baopei active_page">
    <img class="bei_img" src="../../../assets/active/baopei/bei.png" alt="">
    <img class="box_img" src="../../../assets/active/baopei/box.png" alt="">
    <div class="active_page_wrapper">
      <!--申请包赔金-->
      <div class="title_box">
        <span class="arrow"></span>
        <span>活动时间</span>
        <span class="arrow arrow_r"></span>
      </div>
      <p class="act_con_p act_con_p_time">{{start_time}}起</p>
      <div class="apply_box">
        <div v-show="gameListArr.length" class="arr_box arr_box_l"><span  @click="change(1)" :class="{'disabled':transW <=10}"></span></div>
        <div v-show="gameListArr.length" class="arr_box arr_box_r"><span @click="change(2)" :class="{'disabled':transW >=listW-liW*2}"></span></div>
        <h5>共 <span>{{gameListArr.length}}</span> 场包赔赛事</h5>
        <div class="game_events_box">
          <ul :style="{width:listW +'px',transform:'translateX(-'+transW+'px)'}">
            <li v-for="(item,index) in gameListArr" :key="index">
              <div class="game_info">
                <span class="e_name ellips" :title="item.game_name">{{item.game_name}}</span>
                <div class="team">
                  <div class="team_box fl">
                    <div class="team_img">
                      <img :src="item.team_logo_1" alt="">
                    </div>
                    <span class="team_name ellips" :title="item.team_name_1">{{item.team_name_1}}</span>
                  </div>
                  <span class="e_time fl" v-show="item.game_status!= 1">
                    {{ item.game_status==2?'比赛中':'已结束' }}
                    </span>
                  <span class="e_time fl" v-show="item.game_status== 1">
                    北京时间<br>
                    {{formatDate(item.start_time*1000,'yyyy.MM.dd')}}<br>
                    {{formatDate(item.start_time*1000,'HH:mm')}}<br>
                    </span>
                  <div class="team_box fl">
                    <div class="team_img">
                      <img :src="item.team_logo_2" alt="">
                    </div>
                    <span class="team_name ellips" :title="item.team_name_2">{{item.team_name_2}}</span>
                  </div>
                </div>
              </div>
              <div @click="apply(item)" class="apply_btn" v-show="item.game_status!=1">申请包赔金</div>
              <p v-show="item.game_status==1&&item.showTime">请在<strong>{{formatCountTime(item.countTime)}}</strong>内完成活动存款要求<br>
                点击进入<router-link :to="{path:'/user/finance/'}">财务中心</router-link> </p>
              <p v-show="item.game_status==1&&!item.showTime">本比赛活动要求存款时间<br>
              {{formatDate(item.deposit_start_time*1000,'yyyy.MM.dd HH:mm')}}-{{formatDate(item.deposit_end_time*1000,'yyyy.MM.dd HH:mm')}}</p>
            </li>
          </ul>
          <p v-show="!gameListArr.length" class="no_game">暂无赛事</p>
        </div>
      </div>
      <!--活动内容-->
      <div class="title_box act_con">
        <span class="arrow"></span>
        <span>活动内容</span>
        <span class="arrow arrow_r"></span>
      </div>
      <p class="act_con_p">威客电竞VIP会员在活动存款时间内存款并参与指定体育赛事的盘口投注，若单笔注单结算为负盈利，<br>即可申请注单包赔，领取包赔金。</p>
      <table class="act_tab">
        <tr> <td v-for="i in 6" :key="i">{{conArr[i-1][0]}}</td> </tr>
        <tr>
          <td>{{conArr[0][1]}}</td>
          <td rowspan="13">{{conArr[1][1]}}</td>
          <td rowspan="13">{{conArr[2][1]}}</td>
          <td>{{conArr[3][1]}}</td>
          <td>{{conArr[4][1]}}</td>
          <td rowspan="13">{{conArr[5][1]}}</td>
        </tr>
       <tr v-for="i in 12" :key="i">
         <td>{{conArr[0][i+1]}}</td>
         <td>{{conArr[3][i+1]}}</td>
         <td>{{conArr[4][i+1]}}</td>
       </tr>
      </table>
      <!--活动规则-->
      <div class="title_box act_con">
        <span class="arrow"></span>
        <span>活动规则</span>
        <span class="arrow arrow_r"></span>
      </div>
      <div class="act_tab act_rule">
        <ul>
          <li class="li_1"><p >存款时间定义：每场赛事开赛前24小时内的累计存款，每次存款时间内的存款只可申请一次保险注单活动。
          例：A场保单赛事时间为2月19日04:00，有效存款时间为2月18日04:00-2月19日04:00，在此期间会员累计存款≥500；若会员参与本场赛事投注，单笔投注额≥500即可参加A场保单赛事。</p></li><br>
          <li class="li_2"><p>参与包赔优惠的会员需要在体育赛事（威客体育、FB体育、BTI体育、平博Sports、皇冠体育）<strong>投注独赢，让球，大小，单双四个盘口，允许投注上半场或全场及滚球（不包括特殊盘口）</strong>；盘口赔率要求：投注指定赛事的赔率不得低于欧盘1.75、亚洲盘及马来盘0.75。</p></li><br>

          <li class="li_3"><p>申请包赔金的注单需为全输，若会员所投注的注单结算为输一半则视为无效注单，不可申请。</p></li><br>
          <li class="li_4"><p>符合条件的用户需在注单结算后的24小时内联系在线客服申请包赔金，逾期则视为自动放弃。</p></li><br>
          <li class="li_5"><p>包赔金将在审核通过后的3日内派发至用户指定的体育钱包（威客体育、FB体育、BTI体育、平博Sports、皇冠体育五选一）中，包赔金需在所选游戏中完成对应的流水要求，流水未完成前不可再次申请本活动；当用户对应体育钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。</p></li><br>
          <li class="li_6"><p>包赔单活动每场赛事仅限200个包赔名额，先到先得。此活动不与平台体育首存、体育救援金活动共享。若用户参与了体育首存，需先完成体育首存活动流水才可参加本活动；同样体育救援金与体育包赔活动不共享，活动同时进行时，只可选择一个参加。</p></li><br>
          <li class="li_7"><p>赛事取消或改期或其他原因导致赛事不能正常进行，则对应当期的保险投注优惠取消；若保单赛事因官方原因改变赛事时间，则有效存款时间从原开赛时间前24小时开始计算。</p></li><br>
          <li class="li_8"><p>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利，本活动最终解释权归VKGAME所有。</p></li>
        </ul>
      </div>
      <div class="btn back_active_nav">
        <router-link to="/active" class="botton normal">{{$t("Return_to_activity_page")}}</router-link>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import {formatDate,formatCountTime} from '../../../utils/util'
export default {
  name: 'baopei',
  components: {},
  data() {
     return {
       conArr:[
        ["会员要求","VIP0","VIP1","VIP2","VIP3","VIP4","VIP5","VIP6","VIP7","VIP8","VIP9","VIP10","VIP11","VIP12"],
        ["存款金额","≥500"],
        ["单笔投注金额","≥500"],
        ["包赔返利","10%","10%","15%","15%","15%","18%","18%","18%","20%","20%","20%","25%","50%"],
        ["包赔金额最高", "58", "68","88","128","168","188","258","288","388","528","688","888","1888"],
        ["流水要求","3倍体育"]
       ],
       listW:'',
       transW:0,
       liW:345,
       initInfo:{},
       start_time:'',
       gameListArr:[],
       cuountInter:null
     }
  },
  mounted () {
    this.getSportIndemnityInit()
    this.getIndemnityGameList()
  },
  methods: {
    apply(item){
      if(this.initInfo.status==0) {
        if(item.deposit_status ==0) {
          this.$message({
            message: '存款未达到要求！',
            type: 'warning'
          })
        }else {
          this.openKfWindow()
        }
      }else {
        this.$message({
          message: this.initInfo.status_tip,
          type: 'warning'
        })
      }
    },
    formatDate (num, formate) {
      return formatDate (num, formate)
    },
    formatCountTime(time) {
     return  formatCountTime(time)
    },
    getSportIndemnityInit() {
      this.$http(this.ApiSetting.active.getSportIndemnityInit)
      .then(res => {
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
          let stime = new Date(res.data.active_start_time*1000)
          this.start_time = stime.getFullYear() + '年' + (stime.getMonth() + 1) + '月' + stime.getDate() + '日'
        }
      })
    },
    getIndemnityGameList() {
      this.$http(this.ApiSetting.active.getIndemnityGameList)
      .then(res => {
        if(res.status == 1 && res.data) {
          this.gameListArr = res.data;
          this.listW = this.gameListArr.length*this.liW;
          let have24h = false
          this.gameListArr.forEach(item=>{
            let cuntdown = parseInt(Math.abs(item.deposit_end_time*1000 - new Date().getTime())/1000);
            item.countTime = cuntdown;
            item.showTime = false;
            if(cuntdown<=24*60*60) {
              have24h = true
              item.showTime = true
            }
          })
          if(have24h) {
            this.cuountInter = setInterval(() => {
              this.gameListArr.forEach(e => {
                e.countTime--
                if(e.countTime<1) {
                  e.showTime = false
                  e.game_status = 2
                }
              })
              this.$forceUpdate()
            }, 1000);
          }
        }
      })
    },
    change(type) {
      if(type==1) {
        this.transW -= this.liW*2;
      }else if(type == 2) {
        this.transW += this.liW*2;
      }
      if( this.transW<0) {
        this.transW =0;
      }
      if( this.transW>this.listW-this.liW*2) {
        this.transW =this.listW-this.liW*2
      }

    }
  }
}
</script>
<style lang="less" scoped>
.baopei{
  background-image: linear-gradient(to right, #131d38 , #121423,#131d38 );
  position: relative;
  *,*+* {box-sizing: border-box;}
  &.active_page {
    padding-top: 0;
  }
  .bei_img {
    width: 443px;
    height: 432px;
    position: absolute;
    left: 0;
    top: 1590px;
  }
  .box_img {
    width: 437px;
    height: 431px;
    position: absolute;
    right: 0%;
    bottom: -30px;
  }
  .active_page_wrapper {
    padding-top: 514px;
    background: url("../../../assets/active/baopei/banner.png") no-repeat center top;
  }
  .title_box {
    background:url("../../../assets/active/baopei/line.png") no-repeat center top;
    height: 100px;
    text-align: center;
    padding-top: 80px;
    &.act_con {
      margin-top: 140px;
    }
    span:nth-child(2) {
      margin: 0 30px;
      font-size: 30px;
      color: #ffffff;
    }
    .arrow {
      width: 31px;
      height: 28px;
      display: inline-block;
      background: url("../../../assets/active/baopei/arr-l.png") no-repeat;
      background-size: 100% 100%;
      &.arrow_r {
        transform:rotateY(180deg);
      }
    }
  }
  .apply_box {
    width: 910px;
    height: 418px;
    background: url("../../../assets/active/baopei/sel_bor.png") no-repeat;
    background-size: 100% 100%;
    margin: 50px auto 0;
    padding-top: 30px;
    position: relative;
    .arr_box {
      position: absolute;
      top: -23px;
      width: 198px;
      height: 464px;
      background: url("../../../assets/active/baopei/left.png") no-repeat;
      background-size:100% 100%;
      line-height: 500px;
      padding-left: 30px;
      pointer-events: none;
      span {
        pointer-events: all;
        width: 28px;
        height: 44px;
        display: inline-block;
        background:url("../../../assets/active/baopei/btn-left-normal.png") no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        &:hover {
          background:url("../../../assets/active/baopei/btn-left-hover.png") no-repeat;
        }
        &.disabled {
          opacity: 0.2;
          cursor: default;
          &:hover {
            background:url("../../../assets/active/baopei/btn-left-normal.png") no-repeat;
          }
        }
      }
      &.arr_box_l {
        left: 10px;
      }
      &.arr_box_r {
        right: 10px;
        transform: rotateY(180deg);
      }

    }
    h5 {
      font-size: 24px;
      color: #ffffff;
      text-align: center;
      font-weight: normal;
      letter-spacing: 1px;
      span {color: #ffe038;}
    }
    .game_events_box {
      width: 711px;
      margin: 50px auto 0;
      overflow: hidden;
      .no_game {
        text-align: center;
        font-size: 25px;
        line-height: 200px;
      }
      ul {
        transition: all 0.3s ease 0s;
        li {
          width: 324px;
          margin-left:21px;
          float: left;
           color: #d0d0d0;
           .game_info {
             width: 100%;
             height: 225px;
             background: url("../../../assets/active/baopei/bor.png") center top no-repeat;
             background-size: 100% 100%;
           }
          .e_name {
            margin-left: 20px;
            font-size: 14px;
            display: inline-block;
            max-width: 110px;
            margin-top: 12px;
          }
          .team {
            height: 130px;
            margin-top: 30px;
            overflow: hidden;
            padding-left: 23px;
            .team_box {
               width: 85px;
               top:0;
               text-align: center;
              .team_img {
                width: 85px;
                position: relative;
                height: 85px;
                img {
                  max-width: 85px;
                  max-height: 85px;
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%,-50%);
                }
              }
              .team_name {
                margin-top: 15px;
                font-size: 18px;
                display: inline-block;
                max-width: 85px;
              }
            }
            .e_time {
              display: block;
              transform: translateY(-50%;);
              font-size: 18px;
              width: 100px;
              margin: 50px 5px 0;
              text-align: center;
            }
          }
          .apply_btn {
            width: 154px;
            height: 45px;
            background: url("../../../assets/active/baopei/btn-apply-normal.png") no-repeat;
            background-size: 100% 100%;
            font-size: 17px;
            color: #ffffff;
            text-align: center;
            line-height: 45px;
            margin: 15px auto 0;
            cursor: pointer;
            transition: background 0.2s;
            &:hover {
              background: url("../../../assets/active/baopei/btn-apply-hover.png") no-repeat;
            }
          }
          p {
            font-size: 14px;
            text-align: center;
            margin-top: 15px;
            strong,a {
              color: #ffe038;
              &:last-child {
                text-decoration:underline
              }
            }
          }
        }
      }
    }
  }
  .act_con_p {
    width: 910px;
    font-size: 20px;
    color: #d0d0d0;
    text-align: left;
    margin: 70px auto 0;
  }
  .act_con_p_time {
    text-align: center;
  }
  .act_tab {
    width: 910px;
    margin:40px auto;
    height: 841px;
    background:url("../../../assets/active/baopei/form.png") no-repeat;
    background-size: 100% 100%;
    box-shadow: -14px -14px 20px 0 rgba(0, 0, 0, 0.3);
    font-size: 20px;
    color: #d0d0d0;
    outline:1px solid #ffe038;
    tr td {
      text-align: center;
      border:1px solid #0f93aa;
    }
  }
  .act_rule {
    width: 910px;
    margin-top: 80px;
    height: 930px;
    background:url("../../../assets/active/baopei/rule.png") no-repeat;
    background-size: 100% 100%;
    padding:60px 50px 0;
    color: #d0d0d0;
    font-size: 20px;
    line-height: 1.2;
    ul {
      li {
        display: flex;
        &::before {
          content: "";
          width: 26px;
          height: 18px;
          display: inline-block;
          margin-right: 7px;
          margin-top: 4px;
        }
        p {
          width: 850px;
          strong {
            font-weight: normal;
            color: #ffe038;
          }
        }
        .backgroundcard(@num){
          &.li_@{num}:before{
            background:url("../../../assets/active/baopei/@{num}.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .loop (@i) when (@i < 9){
          .backgroundcard(@i);
          .loop(@i+1)
        }
        .loop(1);
      }
    }
  }
}
</style>
