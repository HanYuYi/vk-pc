 <template>
   <div class="doubleeleven active_page" id="doubleeleven">
     <div class="active_page_wrapper">
       <div class="wrapper">
         <div class="top_bg">
           <div class="bg1"></div>
           <div class="bg2"></div>
         </div>
         <div class="active_page_content">
           <div class="active_section_box">
             <ul class="brick">
               <li v-for="(item,index) in reward_info"  >
                 <div class="titimg"></div>
                 <h3>{{item.title}}红包</h3>
                 <span class="fitit">可瓜分</span><span class="money">￥{{formatNumberSplit(item.max_bonus_show).split(".")[0]}}元</span><br>
                 <span class="fitit">开奖时间：</span><span class="contxt">{{dateFormadd(item.bouns_start_time_setting*1000,true)}}开奖</span><br>
                 <span class="fitit" :style="{visibility:isLogin?'visible':'hidden'}">当前有效投注额：</span><span class="contxt" :style="{visibility:isLogin?'visible':'hidden'}">¥{{formatNumberSplit(item.already_money).split(".")[0]}}</span><br>
                 <div class="apply_btn"
                   @click="doubleHandel(item,index)"
                   :class="{
                    'hand':item.btn_status==1||item.btn_status==2||(!isLogin&&item.btn_status!=6),
                    'get':item.btn_status==4,
                   'apply_end':item.btn_status==6||item.btn_status==5,
                   'notice':item.btn_status==3}">{{item.btn_name}}</div>
               </li>
             </ul>
           </div>
           <div class="active_section_box">
             <div class="active_title">
               {{$t("The_activity_time")}}
             </div>
             <div class="section_box_wrapper">
               <div class="active_time">
                活动参与时间： {{timeobj.active_start_time}}至{{timeobj.active_end_time}}
               </div>
               <div class="active_time">
                红包领取时间： {{timeobj.get_reward_start_time}}-{{timeobj.get_reward_end_time}}
               </div>
             </div>
           </div>

           <div class="active_section_box">
             <div class="active_title">
               {{$t("Active_content")}}
             </div>
             <div class="section_box_wrapper">
               <div class="active_desc">
               1. 用户在活动期间满足最低有效投注金额要求，并在活动页面对应红包处点击报名。报名成功的用户即可在双11当天规定时间内点击瓜分现金红包，红包金额最低8元起。<br>
               2. 活动期间累计有效投注额越大，则所领取的红包金额越大。</div>
             </div>
           </div>

           <div class="active_section_box">
             <div class="active_title">
               {{$t("Activity_rules")}}
             </div>
             <div class="section_box_wrapper">
               <div class="active_desc margin20">
                1. 用户可同次参与多个红包的奖金瓜分，每种类型的红包最多可获得一个。<br>
                2. 领取红包后，完成红包奖金的1倍流水即可提款。<br>
                3. 电竞赔率＜1.30、香港盘赔率<0.75、欧洲盘<1.75、注单取消、对冲、未结算等注单不计算为有效投注。<br>
                4. 娱乐玩法：AG真人，eBET真人，PG游戏<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;棋牌玩法：乐游棋牌，幸运棋牌，凯旋棋牌，博乐棋牌  <br>
                  &nbsp;&nbsp;&nbsp;&nbsp;体育玩法：威客体育，平博电竞<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;电竞玩法：威客电竞，RG电竞<br>
                5. 每个玩家每台设备只能参与一次，包括但不限于同一个手机号码、电子邮箱、银行卡、IP地址等。参与本活动的用户必须先绑定银行卡，完善相关个人资料，对违规的用户，VKGAME将保留无期限审核、和扣回红利及产生的利润权利。本活动最终解释权归VKGAME所有。
               </div>
               <div class="active_desc clearfix margin20">
                 <div class="active_table fl">
                   <div class="t_title">游戏</div>
                   <div class="t_body">
                     <div class="t_row clearfix" v-for="(num,index) in reward_info" >
                         <b>{{num.title}}</b>
                     </div>
                   </div>
                 </div>
                 <div class="active_table fl">
                   <div class="t_title">累计有效投注额</div>
                   <div class="t_body">
                     <div class="t_row clearfix" v-for="num in reward_info">
                       <div class="t2">
                         <b>≥{{num.join_setting}}</b>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div class="active_table fl">
                   <div class="t_title">流水要求</div>
                   <div class="t_body">
                       <div class="t_row clearfix consth">
                         <p >全站{{multiple}}倍流水</p>
                       </div>
                   </div>
                 </div>
                 <div class="active_table fl">
                   <div class="t_title">红包领取时间</div>
                   <div class="t_body">
                       <div class="t_row clearfix" v-for="num in reward_info" >
                           <b>{{dateFormadd(num.bouns_start_time_setting*1000,false)}}-{{dateFormadd(num.bouns_end_time_setting*1000,false)}}</b>
                       </div>
                   </div>
                 </div>
               </div>

             </div>
           </div>
           <div class="clear"></div>
         </div>
       </div>
       <div class="btn back_active_nav">
         <router-link to="/active" class="botton normal">{{$t("Return_to_activity_page")}}</router-link>
       </div>
     </div>
   </div>
 </template>
 <script type="text/javascript">
import { formatNumberSplit } from '@/utils/util'
 export default {
   name: 'doubleeleven',
   components: {},
   data() {
      return {
        timeobj:{
          active_end_time: '',
          active_start_time: '',
          get_reward_end_time: '',
          get_reward_start_time: '',
        },
        reward_info:[],
        multiple:1,
        baseLoad:false,
        timer:null
      }
   },
   mounted () {
     this.getBase()
   },
   computed: {
     isLogin () {
       return this.$store.state.isLogin
     }
   },
   methods: {
     formatNumberSplit(money){
       return formatNumberSplit(money)
     },
     doubleHandel(item,type) {
       if(item.btn_status==6) {
         return
       }
       if(!this.isLogin) {
         this.$message({
           message: '请您先登录',
           type: 'warning'
         })
         return
       }
       if(item.btn_status==1) {
         this.$message({
           message: '投注金额未达到',
           type: 'warning'
         })
         return
       }
       if(this.baseLoad) {
         return
       }
       if(item.btn_status==2) {
         this.$http(this.ApiSetting.active.joinDouble11Day,{type:type})
         .then(res => {
           if(res.status == 1 && res.data) {
             if(res.status == 1) {
                this.$message({
                  message: '报名成功！',
                  type: 'success'
                })
                this.getBase()
             }
           }else {
             this.$message({
               message: res.message,
               type: 'warning'
             })
           }
         })
       }else if(item.btn_status==4){
         this.$http(this.ApiSetting.active.getDouble11DayRewards,{type:type})
         .then(res => {
           if(res.status == 1 && res.data) {
             if(res.status == 1) {
                this.$message({
                  message: '领取成功！',
                  type: 'success'
                })
                this.getBase()
             }
           }else {
             this.$message({
               message: res.message,
               type: 'warning'
             })
           }
         })
       }
     },
     getBase() {
       this.baseLoad = true
       this.$http(this.ApiSetting.active.getDouble11DayInit)
       .then(res => {
         this.baseLoad = false
         if(res.status == 1 && res.data) {
           this.multiple = res.data.bonus_limit
           this.timeobj ={
             active_end_time: this.dateFormatt(res.data.active_end_time*1000,1),
             active_start_time: this.dateFormatt(res.data.active_start_time*1000,1),
             get_reward_start_time: this.dateFormatt(res.data.get_reward_start_time*1000,2),
             get_reward_end_time: this.dateFormatt(res.data.get_reward_end_time*1000,3),
           }
           this.reward_info = res.data.reward_info;
           clearInterval(this.timer)
           this.timer = setInterval(() => {
            let curtime = (new Date()).getTime();
            for(let key in this.reward_info) {
              if(this.reward_info[key].btn_status ==3 && this.reward_info[key].bouns_start_time_setting*1000 <= curtime) {
                this.getBase()
              }
            }
           }, 10000);
         }
       }).catch(()=> {
         this.baseLoad = false
       })
     },
     dateFormatt(time,bool) {
       let stime = new Date(time);
       if(bool==1) {
        return stime.getFullYear() + '/' + this.dob(stime.getMonth() + 1) + '/' + this.dob(stime.getDate()) + ' ' + this.dob(stime.getHours()) + ':' + this.dob(stime.getMinutes())+ ':' + this.dob(stime.getSeconds())
       }else if(bool==2){
         return stime.getFullYear() + '/' + this.dob(stime.getMonth() + 1) + '/' + this.dob(stime.getDate()) + ' ' + this.dob(stime.getHours()) + ':' + this.dob(stime.getMinutes())+ ':' + this.dob(stime.getSeconds())
       }else if(bool==3) {
         return this.dob(stime.getHours()) + ':' + this.dob(stime.getMinutes())+ ':' + this.dob(stime.getSeconds())
       }
     },
     dateFormadd(time,bool) {
       let stime = new Date(time);
       if(bool) {
        return this.dob(stime.getMonth() + 1) + '月' + this.dob(stime.getDate()) + '日 ' + this.dob(stime.getHours()) + ':' + this.dob(stime.getMinutes())
       }else {
        return this.dob(stime.getMonth() + 1) + '/' + this.dob(stime.getDate()) + ' ' + this.dob(stime.getHours()) + ':' + this.dob(stime.getMinutes())
       }

     },
     dob(num) {
       if(num.toString().length==1) {
         return '0'+num
       }else {
         return num
       }
     },
   }
 }
 </script>

 <style lang="less" scoped >
 #doubleeleven {
   .active_time {
     text-align: start;
         padding-left: 200px;
   }
  .margin20 {
    margin-bottom: 20px;
  }
  .t2 {
    text-align: center;
    width: 100%;
  }
  .t_row  {
    position: relative;
    text-align: center;
  }
  .consth {
    line-height: 164px;
    height: 164px;
  }
 }
 .doubleeleven{
   background: url("../../../assets/active/doubleeleven/banner.jpg") no-repeat center top;
   .brick {
      margin-top: 30px;
      position: relative;
      overflow: hidden;
     li {
       width: 375px;
       margin-right: 26px;
       margin-bottom: 30px;
       height: 210px;
       float: left;
       background-color: #191a21;
       background:url("../../../assets/active/doubleeleven/bor.jpg") no-repeat;
       box-shadow: 0px 9px 21px 0px
         rgba(6, 7, 11, 0.75);
       border-radius: 10px;
       box-sizing: border-box;
       padding:1px 30px;
       position: relative;
       &:nth-child(2n) {
         margin-right: 0;
       }
       &:nth-child(1) {
         .titimg {
           background: url("../../../assets/active/doubleeleven/1.png") no-repeat;
         }
       }
       &:nth-child(2) {
         .titimg {
           background: url("../../../assets/active/doubleeleven/2.png") no-repeat;
         }
       }
       &:nth-child(3) {
         .titimg {
           background: url("../../../assets/active/doubleeleven/3.png") no-repeat;
         }
       }
       &:nth-child(4) {
         .titimg {
           background: url("../../../assets/active/doubleeleven/4.png") no-repeat;
         }
       }
       .titimg {
         position: absolute;
         top:0;
         right: 10px;
         width: 130px;
         height: 130px;
       }
       h3{
         font-size: 24px;
         color: #ffffff;
         line-height: 46px;
         margin-top:10px;
       }
       .fitit {
         color: #c3c3c3;
         font-size: 14px;
         line-height: 28px;
       }
       .money {
         font-size: 20px;
         color: #f4d364;
         line-height: 28px;
       }
      .contxt {
        font-size: 14px;
        color: #ffffff;
      }
      .apply_btn {
        width: 206px;
        height: 32px;
        margin: 20px auto 0;
        background-image: linear-gradient(90deg,   #07f1b7 0%,   #07e9f1 100%);
        border-radius: 16px;
       box-shadow: -1.1px 6.9px 13px 0px
       rgba(6, 7, 11, 0.46);
        font-size: 17px;
        line-height: 32px;
        text-align: center;
        color: #1a1c24;
        transition: all 0.3s;
        &.hand {
          cursor: pointer;
          &:hover {
            color: #8f3cfd;
            background-image: linear-gradient(90deg,   #07e9f1 0%,   #07f1b7 100%);
          }
        }
        &.get {
          background-image: linear-gradient(86deg,
          #eebc76 0%,
          #ffe0ac 100%);
          &:hover {
            color: #8f3cfd;
            background-image: linear-gradient(86deg,   #ffe0ac 0%,   #eebc76 100%);
          }
        }
        &.apply_end {
          background-image:none;
          background-color: #7c839f;
          color: #262933;
        }
        &.notice {
          background-image:none;
          background-color: #272932;
          color: #fff;
        }
      }
     }
   }
   .section_box_wrapperp {
     text-align: center;
   }
   .active_page_content {
     padding: 30px 232px !important;
   }
   .section_box_wrapper .active_table {
     &:nth-child(1) {
       width: 108px;
     }
     &:nth-child(2) {
       width: 260px;
     }
     &:nth-child(3) {
       width: 183px;
     }
     &:nth-child(4) {
       width: 220px;
     }
   }
   .active_section_box:nth-child(2) {
    margin-bottom: 21px !important;
   }
   .section_box_wrapper .active_table:first-child .t_row .t2 {
     width: 231px;
   }
   .section_box_wrapper .active_table:last-child .t_row .t2 {
     width: 202px;
   }
   .section_box_wrapper .active_table {
     margin-right: 0;
   }
   .section_box_wrapper .active_table .t_row.sign_prize {
     line-height: normal;
     text-align: center;
   }
   .section_box_wrapper .active_table .t_row.sign_prize p{
     position: relative;
     top: 50%;
     transform: translateY(-50%);
   }

 }
 </style>
