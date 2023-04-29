 <template>
   <div class="call_friend active_page">
     <div class="active_page_wrapper">
       <div class="wrapper">
         <div class="top_bg">
           <div class="bg1"></div>
           <div class="bg2"></div>
         </div>
         <div class="active_page_content">

           <div class="active_section_box">
             <div class="active_title">
               {{$t("The_activity_time")}}
             </div>
             <div class="section_box_wrapper">
               <div class="active_time">
                 {{startTime}}至{{endTime}}
               </div>
             </div>
           </div>

           <div class="active_section_box">
             <div class="active_title"> 活动范围  </div>
             <div class="section_box_wrapper">
               <div class="active_time">
                   电竞赛事 (威客电竞、RG电竞) 和体育赛事 (威客体育、平博体育)
               </div>
             </div>
           </div>

           <div class="active_section_box">
             <div class="active_title">
               {{$t("Active_content")}}
             </div>
             <div class="section_box_wrapper">
               <div class="active_desc active_desc1">
                  <div>第①步：充值200元、500元、2000元、5000元、10000元，充的越多奖金越高噢。 <router-link to="/user/finance/" class="btn fr">立即充值</router-link> </div>
                  <div>第②步：<em>每日充值后在未转入任一游戏钱包前都视为首充，若在领取奖金前转入其他钱包则不可参与本活动。</em></div>
                  <div>
                    第③步：领取下面现金奖金红包，红包五选一，每日仅限一次哦。
                   <ul class="red_package">
                     <li
                     v-for="(item,index) in redArr" :key="index"
                     :class="{'lock':item.btn_status ==3||item.btn_status ==4||item.btn_status ==5,'get':item.btn_status==1,'got':item.btn_status==2,'trans':item.trans,'hand':!isLogin}"
                     @click="getRed(item)">
                        <span class="bonus">{{item.bonus}}</span>
                        <span class="low_recharge">首充{{item.low_recharge}}元</span>
                     </li>
                   </ul>
                  </div>
                  <div>第④步：将对应的存款金额转至您的电竞/体育钱包，现金奖金会同时到账。  <router-link to="/user/finance/transfer" class="btn fr">立即转账</router-link></div>
                  <div class="teshu">第⑤步：在电竞/体育赛事完成（本金+奖金）*3倍的有效投注额即可转出。<br>例：充值500元，领取28的奖金并将存款转入威客电竞，需要完成威客电竞赛事（500+28）*3=1584元流水后即可提现奖金。</div>

               </div>
             </div>
           </div>

           <div class="active_section_box">
             <div class="active_title">
               {{$t("Activity_rules")}}
             </div>
             <div class="section_box_wrapper">
               <div class="active_desc active_desc2">
                 1.有效投注额仅计算在电竞/体育赛事产生输赢结果的注单，电竞赔率＜1.30、香港盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算等注单不计算为有效投注。<br>
                 2.若用户在领取奖金后，未将本金转入电竞/体育钱包，转入其他钱包进行游戏，则视为本次奖金领取无效且失去当日参与资格，已领取的奖金在规定流水未完成前不可再次申请本活动。<br>
                 3.<em>该充值优惠活动不与“点金胜手”和其他多倍流水活动共享，只可选其一参与。</em><br>
                 4.每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。<br>
                 5.VKGAME对本活动保有最终解释权。
               </div>
             </div>
           </div>
         </div>
       </div>
       <div class="btn back_active_nav">
         <router-link to="/active" class="botton normal">{{$t("Return_to_activity_page")}}</router-link>
       </div>
     </div>
   </div>
 </template>
 <script type="text/javascript">
 import { formatDate } from '@/utils/util'
 export default {
   name: 'cdmajor',
   components: {},
   data() {
      return {
        redArr: {},
        startTime:0,
        endTime:0,
        isLogin:false
      }
   },
   mounted () {
     this.getChengduMajorInit()
   },
   methods: {
      getChengduMajorInit() {
            this.$http(this.ApiSetting.active.getChengduMajorInit)
            .then(res => {
              if(res.status == 1 && res.data) {
                this.isLogin = res.data.is_login;
                this.startTime = formatDate(res.data.active_start_time*1000,'yyyy/MM/dd HH:mm:ss')
                this.endTime = formatDate(res.data.active_end_time*1000,'yyyy/MM/dd HH:mm:ss')
                this.redArr = res.data.bonus_setting;
              }else {
                this.$message({
                  message: res.message,
                  type: 'warning'
                })
              }
            })
      },
      getRed(item) {
        if(this.isLogin) {
          if(item.btn_status==4) {
            this.$message({
              message: '活动未开始',
              type: 'warning'
            })
            return;
          }
          if(item.btn_status==5) {
            this.$message({
              message: '活动已结束',
              type: 'warning'
            })
            return;
          }
          if(this.getRedLoad) {
            return
          }
          this.getRedLoad = true
          // item.trans = true;
          this.$http(this.ApiSetting.active.receiveChengduMajorBonus,{reward:item.bonus})
          .then(res => {
            this.getRedLoad = false
            if(res.status == 1 && res.data) {
              // setInterval(() => {
              //   item.trans = false
              // }, 300);
              this.$message({
                message: '领取成功！',
                type: 'success'
              })
              this.getChengduMajorInit()
            }else {
              this.$message({
                message: res.message,
                type: 'warning'
              })
            }
          }).catch(()=>{
            this.getRedLoad = false
          })
        }else {
          this.$message({
            message: '请您先登录',
            type: 'warning'
          })
        }
      }
   }
 }
 </script>
 <style lang="less" scoped>
 .call_friend{
   background: url("../../../assets/active/cdmajor/banner.jpg") no-repeat center top;
   .active_desc {
     &.active_desc2 {
       line-height: 30px;
     }
     &.active_desc1 {
       >div{
        line-height: 40px;
       }
       .teshu {
         line-height: 1.2;
       }
       .red_package {
         li {
           width: 118px;
           height: 187px;
          margin-bottom: 20px;
           margin-right: 62px;
           float: left;
           color: #ffffff;
           text-align: center;
           padding-top:1px;
           &:last-child {
             margin-right: 0;
           }
           &.hand {
             cursor: pointer;
             color:#9f9f6c;
           }
           &.lock {
             background: url("../../../assets/active/cdmajor/lock.png") no-repeat;
             background-position: center bottom;
             color:#9f9f6c;
           }
           &.get {
             background: url("../../../assets/active/cdmajor/get.png") no-repeat;
             background-position: center bottom;
             cursor: pointer;
           }
           &.got {
             background: url("../../../assets/active/cdmajor/got.png") no-repeat;
             background-position: center bottom;
           }
           &.trans {
             animation: shake-chunk 4s ease-in-out infinite
           }
           .bonus {
            margin-top: 100px;
             font-size: 40px;
             display: block;
                 font-weight: bold;
           }
           .low_recharge {
             font-size: 15px;
           }
         }
       }
     }
     em {
       color:#07f1b7;
     }
     .btn {
       width: 160px;
       height: 30px;
       background-image: linear-gradient(90deg,
         #07f1b7 0%,
         #07e9f1 100%);
       box-shadow: 1px -3px 10px 0px
         rgba(9, 23, 69, 0.31);
       border-radius: 15px;
       text-align: center;
       line-height: 30px;
       color: #262933;
       cursor: pointer;
       display: inline-block;
       transition: color 0.3s;
       &:hover {
         background-image: linear-gradient(90deg,
         #07e9f1 0%,
         #07f1b7 100%);
         color:#fff;
       }
     }
   }
   @keyframes shake-chunk {
       2% {
           transform: translate(5px, 2px) rotate(-12deg)
       }

       4% {
           transform: translate(-6px, 3px) rotate(1deg)
       }

       6% {
           transform: translate(3px, 6px) rotate(14deg)
       }

       8% {
           transform: translate(1px, 8px) rotate(1deg)
       }

       10% {
           transform: translate(-5px, 10px) rotate(0deg)
       }

       12% {
           transform: translate(-11px, 2px) rotate(7deg)
       }

       14% {
           transform: translate(4px, 15px) rotate(11deg)
       }

       16% {
           transform: translate(4px, -8px) rotate(15deg)
       }

       18% {
           transform: translate(-5px, 10px) rotate(1deg)
       }

       20% {
           transform: translate(-1px, 3px) rotate(15deg)
       }

       22% {
           transform: translate(-8px, 5px) rotate(-6deg)
       }

       24% {
           transform: translate(-1px, -9px) rotate(8deg)
       }

       26% {
           transform: translate(9px, 11px) rotate(-13deg)
       }

       28% {
           transform: translate(-7px, 4px) rotate(9deg)
       }

       30% {
           transform: translate(8px, 14px) rotate(9deg)
       }

       32% {
           transform: translate(-4px, 11px) rotate(-11deg)
       }

       34% {
           transform: translate(14px, 11px) rotate(-8deg)
       }

       36% {
           transform: translate(-13px, -8px) rotate(13deg)
       }

       38% {
           transform: translate(-12px, 1px) rotate(-13deg)
       }

       0%,40%,100% {
           transform: translate(0, 0) rotate(0)
       }
   }

 }
 </style>
