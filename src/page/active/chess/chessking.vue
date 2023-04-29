<template>
  <div class="ag_active active_page chessking">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="active_section_box">
            <div class="active_title">
               活动时间
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                {{start_time}}起
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Event_details")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                参与威客雀王争霸赛，每个自然周在棋牌游戏累计流水排名前五十名的会员均可获得现金红包奖励。
              </div>
              <div class="load_box" v-show="load ">
                 <span class="small_loading"></span>
              </div>
              <table border="1"  align="center" cellspacing="0" width="100%" v-if="!load&&activeSetting.bet_times">
                <tr  >
                  <td>雀王排名</td>
                  <td v-for="(levelset,index) in activeSetting.list" :key="index">{{levelset.level_cn}}</td>
                  <td rowspan="3" class="btn" v-show="initInfo.status!=1">
                    <div class="to_apply d_btn normal" @click="showApplyDialog">
                      <div class="btn_loading_box " v-show="load "><span class="small_loading"></span></div>
                      立即申请
                    </div>
                  </td>
                  <td rowspan="3" class="btn" v-show="initInfo.is_login==1&&initInfo.status==1"><a href="javascript:;" class="to_apply d_btn disabled appplyed">已领取</a></td>
                </tr>
                <tr  >
                  <td>彩金</td>
                  <td v-for="(itemset,index) in activeSetting.list" :key="index">{{itemset.bonus}}元</td>
                </tr>
                  <tr>
                    <td>彩金流水</td>
                    <td colspan="6">棋牌游戏{{activeSetting.bet_times}}倍流水</td>
                  </tr>
              </table>
              <!--上周排名-->
              <div class="chessking_rank " v-if="!load">
                <h3 class="k_header">上周排名</h3>
                <div class="topthree">
                  <transition-group
                    name="list-complete"
                    class="top3ul"
                    tag="ul"
                    v-if="initInfo.lasttop && initInfo.lasttop.length"
                    :class="{'nomore':initInfo.lasttop.length<4}" >
                    <li v-for="(ltitem,index) in initInfo.lasttop"
                    :key="ltitem.uuid"
                    class="list-complete-item"
                    :class="{'list-complete-item-ool':index%2 == 1}">
                        <span class=" fl usernum" v-show="ltitem.rank!=51">{{ltitem.rank}}.</span>
                        <div class="fl user_headimg " v-show="ltitem.rank!=51">
                          <img :src="ltitem.head_image" alt="" onerror="this.src='/pc_static/defaultimg/headimg.png';this.onerror=null">
                          <div class="user_level" :class="['lv'+ltitem.level]"><span></span></div>
                        </div>
                        <span class="fl ellips user_name" v-show="ltitem.rank!=51" :title="ltitem.username">{{ltitem.username}}</span>
                    </li>
                  </transition-group>
                  <div v-else class="norank">排行统计中</div>
                </div>
                <div class="otherrank" v-if="initInfo.last_week&&initInfo.last_week.length">
                  <transition-group name="list-complete"  class="other_list" tag="ul">
                      <li v-for="(item,index) in initInfo.last_week"
                      :key="item.uuid"
                      class="list-complete-item"
                      :class="{'list-complete-item-ool':index%2 == 1}">
                        <span class=" fl usernum" v-show="item.rank!=51">{{item.rank}}.</span>
                        <div class="fl user_headimg " v-show="item.rank!=51">
                          <img :src="item.head_image"  onerror="this.src='/pc_static/defaultimg/headimg.png';this.onerror=null">
                          <div class="user_level" :class="['lv'+item.level]"><span></span></div>
                        </div>
                        <span v-show="item.rank!=51" class="fl ellips user_name" :title="item.username">{{item.username}}</span>
                      </li>
                  </transition-group>
                </div>
              </div>
              <!--本周排名-->
              <div class="chessking_rank " v-if="!load">
                <h3 class="k_header">本周排名</h3>
                <div class="topthree">
                  <transition-group
                  name="list-complete"
                  tag="ul" class="top3ul"
                  v-if="initInfo.currenttop && initInfo.currenttop.length"
                  :class="{'nomore':initInfo.currenttop.length<4}">
                    <li v-for="(ctitem,index) in initInfo.currenttop"
                    :key="ctitem.uuid"
                    class="list-complete-item"
                    :class="{'list-complete-item-ool':index%2 == 1}">
                      <span class=" fl usernum" v-show="ctitem.rank!=51">{{ctitem.rank}}.</span>
                      <div class="fl user_headimg " v-show="ctitem.rank!=51">
                        <img :src="ctitem.head_image" alt="" onerror="this.src='/pc_static/defaultimg/headimg.png';this.onerror=null">
                        <div class="user_level" :class="['lv'+ctitem.level]"><span></span></div>
                      </div>
                      <span class="fl ellips user_name" v-show="ctitem.rank!=51" :title="ctitem.username">{{ctitem.username}}</span>
                    </li>
                  </transition-group>
                  <div v-else class="norank">排行统计中</div>
                </div>
                <div class="otherrank" v-if="initInfo.current_week&&initInfo.current_week.length">
                  <transition-group name="list-complete"  class="other_list" tag="ul">
                      <li v-for="(item,index) in initInfo.current_week"
                      :key="item.uuid"
                      class="list-complete-item"
                      :class="{'list-complete-item-ool':index%2 == 1}">
                        <span class=" fl usernum" v-show="item.rank!=51">{{item.rank}}.</span>
                        <div class="fl user_headimg " v-show="item.rank!=51">
                          <img :src="item.head_image" alt="" onerror="this.src='/pc_static/defaultimg/headimg.png';this.onerror=null">
                          <div class="user_level" :class="['lv'+item.level]"><span></span></div>
                        </div>
                        <span v-show="item.rank!=51" class="fl ellips user_name" :title="item.username">{{item.username}}</span>
                      </li>
                  </transition-group>
                </div>
              </div>
              <!--我的排名-->
              <div class="chessking_rank userrank" v-if="!load">
                <h3 class="k_header">{{initInfo.is_monday?'上':'本'}}周我的排名</h3>
                <div class="topthree">
                  <ul class="top3ul nomore" v-if="initInfo.is_login">
                    <li  v-if="initInfo.self_data">
                      <span class=" fl usernum" v-if="initInfo.self_data.rank>=1&&initInfo.self_data.rank<=50">{{initInfo.self_data.rank}}.</span>
                      <div class="fl user_headimg ">
                        <img :src="initInfo.self_data.head_image" alt="" onerror="this.src='/pc_static/defaultimg/headimg.png';this.onerror=null">
                        <div class="user_level" :class="['lv'+initInfo.self_data.level]"><span></span></div>
                      </div>
                      <span class="fl ellips user_name" :title="initInfo.self_data.username">{{initInfo.self_data.username}}</span>
                    </li>
                    <li  v-else>
                      <div class="fl user_headimg ">
                        <img src="/pc_static/defaultimg/headimg.png" alt="">
                      </div>
                      <span class="fl user_name" title="">排行统计中</span>
                    </li>
                    <div class="user_ps">
                      <span v-if="!initInfo.is_monday&&initInfo.self_data.rank>50">
                        还差<strong>{{initInfo.self_data.bet}}</strong>流水，您可超越当前第50名，再接再厉哦
                      </span>
                      <span v-if="!initInfo.is_monday&&initInfo.self_data.rank<=50&&initInfo.self_data.rank>0">
                        还差<strong>{{initInfo.self_data.bet}}</strong>流水，您的排名即可超越上一级哦
                      </span>
                      <span v-if="!initInfo.is_monday&&initInfo.self_data.rank==0">
                         还未产生有效流水，您还未入榜
                      </span>
                      <span v-if="initInfo.is_monday&&(initInfo.self_data.rank>50||initInfo.self_data.rank==0)">上周未达到彩金领取条件，本周请继续努力哦</span>
                      <span v-if="initInfo.is_monday&&initInfo.self_data.rank<=50&&initInfo.self_data.rank>0">您可领取{{initInfo.self_data.bouns}}元彩金</span>
                    </div>
                  </ul>
                  <ul class="top3ul nologin" v-if="!initInfo.is_login">
                    <li>
                      <div class="user_headimg ">
                        <img src="/pc_static/defaultimg/headimg.png" alt="">
                      </div>
                      <router-link class="tologin" to="/login">请您先登录！</router-link>
                    </li>
                  </ul>

                </div>
                <div class="user_desc" >
                  <i class="dot">●</i>雀王争霸赛排名数据每日00:00:00左右更新<br>
                  <i class="dot">●</i>彩金领取时间为每周一00:10:00-23:59:59
                </div>
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
               <p>
                1. 棋牌游戏包括：乐游棋牌、开元棋牌、凯旋棋牌、博乐棋牌。<br>
                2. 参与雀王争霸排名前五十的会员需于每周一在活动页面领取彩金并选择彩金派发的钱包，逾期则视为自动放弃。<br>
                3. 彩金需在对应钱包游戏中完成活动规定的有效流水。当用户对应棋牌游戏钱包余额≤原钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，彩金流水未完成前不可再次领取。<br>
                4. 每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。<br>
                5. VKGAME对本活动保有最终解释权。
               </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn back_active_nav">
        <router-link to="/active" class="botton normal">{{$t("Return_to_activity_page")}}</router-link>
      </div>
    </div>
    <el-dialog
      :visible.sync="showDialog"
      custom-class="chesscard_rescue_dialog_box"
      width="570px"
      :close-on-click-modal="false">
      <div class="dialog_wrapper sport_rescue_dialog">
        <p class="">彩金：{{initInfo.bouns}}元</p>
        <div >
          <span class="qianbao_tit">返利至：</span>
          <div class="qianbao">
            <div
            v-for="item in qianbaoarr"
            @click="qianbaoSelect(item)"
            :key="item.id"
            :class="[item.code,item.selected?'active':'']">{{item.name}}</div>
          </div>
        </div>
        <div class="btn"><a href="javascript:;" class="to_apply d_btn normal" @click="conApplyDialog">确定</a></div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "chessking",
  components: {},
  data() {
    return {
      showDialog: false,
      qianbaoarr: [
        {name: "乐游钱包",selected: true,id: 1,code: "LY" },
        {name: "开元钱包",selected: false,id: 2,code: "KY" },
        {name: "凯旋钱包",selected: false,id: 3,code: "LC" },
        {name: "博乐钱包",selected: false,id: 4,code: "BL" }
      ],
      start_time: "",
      initInfo: {},
      selectedObj: {},
      ajaxLoad: false,
      activeSetting:{ },
      timer1:null,
      timer2:null,
      timer3:null,
      timer4:null,
      load:false
    };
  },
  mounted() {
    this.getSportRescueFundInit();
    this.selectedObj = this.qianbaoarr[0];
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer1)
    clearInterval(this.timer2)
    clearInterval(this.timer3)
    clearInterval(this.timer4)
    next()
  },
  methods: {
    guid() {
      function S4() {
          return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      }
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    },
    getSportRescueFundInit() {
      this.load = true
      this.$http(this.ApiSetting.active.getChessKingInit)
      .then(res => {
        this.load = false
        if (res.status == 1 && res.data) {
          //将前三名分开
          if( res.data.last_week &&  res.data.last_week.length) {
            let threeindex = 0
            res.data.last_week.forEach((item,index)=>{
              item.uuid = this.guid();
              if(item.rank<4) {
                threeindex = index
              }
            })
            res.data.lasttop =  res.data.last_week.splice(0,threeindex+1);
            if(res.data.last_week.length%2!=0) {
              res.data.last_week.push({'rank':51,uuid: this.guid()})
            }
            if(res.data.lasttop.length>4&&res.data.lasttop.length%2!=0) {
              res.data.lasttop.push({'rank':51,uuid: this.guid()})
            }
          }
          if( res.data.current_week &&  res.data.current_week.length) {
            let cthreeindex = 0
            res.data.current_week.forEach((item,index)=>{
              item.uuid = this.guid()
              if(item.rank<4) {
                cthreeindex = index
              }
            })
            res.data.currenttop =  res.data.current_week.splice(0,cthreeindex+1)
            if(res.data.current_week.length%2!=0) {
              res.data.current_week.push({'rank':51,uuid: this.guid()})
            }
            if(res.data.currenttop.length>4&&res.data.currenttop.length%2!=0) {
              res.data.currenttop.push({'rank':51,uuid: this.guid()})
            }
          }
          if(res.data.active_setting) {
           this.activeSetting = res.data.active_setting
          }
          let stime = new Date(res.data.active_start_time * 1000);
          this.start_time =stime.getFullYear() +"年" +(stime.getMonth() + 1) +"月" +stime.getDate() +"日";
          this.initInfo = res.data;
          //滚动定时器设置
          this.$nextTick(()=>{
            if(this.initInfo.last_week && this.initInfo.last_week.length>4) {
              this.timer1 = setTimeval(this.initInfo.last_week)
            }
            if(this.initInfo.lasttop && this.initInfo.lasttop.length>4) {
              this.timer2 = setTimeval(this.initInfo.lasttop)
            }
            if(this.initInfo.current_week && this.initInfo.current_week.length>4) {
              this.timer3 = setTimeval(this.initInfo.current_week)
            }
            if(this.initInfo.currenttop && this.initInfo.currenttop.length>4) {
              this.timer4 = setTimeval(this.initInfo.currenttop)
            }
          })
          let _this = this
          function setTimeval(arr) {
            return setInterval(() => {
             let tob = arr.splice(0,2);
             tob.forEach(item=>{
               item.uuid = _this.guid()
             })
            arr.push(tob[0],tob[1])
            }, 3000);
          }
        }
      })
      .catch(()=>{
        this.load = false
      });
    },
    showApplyDialog() {
      if (this.initInfo.status != 0 && this.initInfo.status != 1) {
        if(this.initInfo.status_tip) {
          this.$message({
            message: this.initInfo.status_tip,
            type: "warning"
          });
        }
        return;
      }
      if (this.initInfo.status == 0) {
        this.showDialog = true;
      }
    },
    conApplyDialog() {
      if (this.ajaxLoad) {
        return;
      }
      this.ajaxLoad = true;
      this.$http(this.ApiSetting.user.transferSubmit, {
        from: "NM",
        to: this.selectedObj.code,
        money: this.initInfo.bouns,
        active_id: this.initInfo.active_id
      }).then(
        res => {
          if (res.status == 1) {
            this.$message({
              message: "领取成功！",
              type: "success"
            });
            this.initInfo.status = 1;
            this.showDialog = false;
          }
          this.ajaxLoad = false;
        },
        err => {
          this.ajaxLoad = false;
        }
      );
    },
    qianbaoSelect(item) {
      this.qianbaoarr.forEach(i => {
        i.selected = false;
      });
      this.qianbaoarr[item.id - 1].selected = true;
      this.selectedObj = this.qianbaoarr[item.id - 1];
    }
  }
};
</script>
<style scoped lang="less">
.load_box {
  width: 100%;
  height: 30px;
  text-align: center;
}
.tologin {
  text-decoration: underline;
  color: #09e7b2;
}
.list-complete-item {
  transition: all 1s;
}
.list-complete-item-ool {
  right: 0;

}
 .list-complete-leave-to{
  opacity: 0;
  transform: translateY(-50px);
}
.list-complete-enter {
  opacity: 0;
}
.list-complete-leave-active {
  position: absolute;
  top:0;
}
.ag_active {
  background: url("../../../assets/active/chessking_banner.jpg") no-repeat center top;
  position: relative;
}
.active_page_content {
      padding: 30px 37px !important;
}
.section_box_wrapper {
  overflow: hidden;
}
.section_box_wrapper table {
  border: none;
  margin: 20px auto 25px;
}
.section_box_wrapper table td{
  border-color: #303344;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  color: #8692b6;
  width: 126px;
  &:first-child {
    color: #09e7b2;
    width: 186px;
  }

  &.btn {width: 216px;}
}
.section_box_wrapper table tr:nth-child(-n+2) td{
  &:nth-child(2),
  &:nth-child(4),
  &:nth-child(6) {
    background-color: #1c1e25;
  }
}
.btn .to_apply {
  width: 140px;
  height: 36px;
  line-height: 36px;
  font-size: 18px;
}
.appplyed {
  cursor: default;
}
.chessking_rank {
  width: 376px;
  margin-right:18px;
  float: left;
  &:last-child{margin-right:0;}
  &.userrank .top3ul.nologin {
      li {
        width: 100%;
        padding: 0;
      }
    }

  .k_header {
    height: 50px;
    background-color: #1c1e25;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    color: #09e7b2;
    font-weight: normal;
  }
  .topthree {
    height: 150px;
    background-color: rgba(47, 51, 63, 0.4);
  }
  .otherrank {
    height: 140px;
    overflow: hidden;
    position: relative;
    border-top: 1px solid #17191f;
    background-color:rgba(61, 65, 80,0.4);
  }
  .norank {
    text-align: center;
    line-height: 150px;
  }
  ul {
    overflow: hidden;
    position: relative;
    &.other_list {
      height: 140px;
    }
    &.top3ul {
      height: 150px;
      li{
        color:#fff;
      }
      &.nomore li{
        &:first-child {
          width: 100%;
          padding-left: 120px;
        }
        &:nth-child(2),&:nth-child(3) {
          height: 80px;
        }
      }
    }
  }
  li {
    height: 70px;
    line-height: 70px;
    width: 50%;
    text-align: center;
    float: left;
    box-sizing: border-box;
    padding-left: 10px;
    color: #8692b6;
  }
  .user_headimg {
    position: relative;
    display: inline-block;
    margin:10px 6px 0 8px;
    line-height: normal;
  }
  .usernum {
    font-size: 18px;
    color: #07f1b7;
    width: 30px;
  }
  .user_name {
    font-size: 14px;
    max-width: 70px;
  }
  .user_ps {
    height: 80px;
    box-sizing: border-box;
    padding: 22px 28px 0;
    font-size: 16px;
    color: #8692b6;
    strong {
      color:#fff;
      font-weight: normal;
    }
  }
  .user_desc {
    height: 140px;
    font-size: 16px;
    box-sizing: border-box;
    padding: 28px 20px;
    color: #8692b6;
    border-top: 1px solid #17191f;
    background-color:rgba(61, 65, 80,0.4);
    .dot {
      font-size: 12px;
      margin-right:6px;
      color: #07f1b7;
    }
  }
}
</style>
<style lang="less">
.chessking .chesscard_rescue_dialog_box {
  border: none;
  background-color: #262933;
  .sport_rescue_dialog {
    font-size: 18px;
    color: #ffffff;
    padding: 0 47px;
  }
  .sport_rescue_dialog p {
    margin-bottom: 40px;
  }
  .sport_rescue_dialog .qianbao {
    font-size: 14px;
    display: inline-block;
    width: 398px;
  }
  .sport_rescue_dialog .qianbao div {
    width: 189px;
    height: 88px;
    float: left;
    line-height: 88px;
    padding-left: 8px;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid transparent;
    transition: border-color 0.2s;
    background: url("../../../assets/icon_es.png") no-repeat;
    margin-bottom: 16px
  }
  .sport_rescue_dialog .qianbao div.active {
    border: 1px solid #07e9f1;
  }
  .sport_rescue_dialog .qianbao div:nth-child(odd) {
    margin-right: 16px;
  }
  .sport_rescue_dialog .qianbao div.LY {
    background-position: -953px -926px;
  }
  .sport_rescue_dialog .qianbao div.KY {
    background-position: -510px -817px;
  }
  .sport_rescue_dialog .qianbao div.LC {
    background-position: -734px -1035px;
  }
  .sport_rescue_dialog .qianbao div.LK {
    background-position: -1609px -926px;
  }
  .sport_rescue_dialog .qianbao div.BL {
    background-position: -1172px -1035px;
  }
  .qianbao_tit {
    display: inline-block;
    vertical-align: top;
  }
   .sport_rescue_dialog .btn {
     margin-top: 20px;
   }
  .sport_rescue_dialog .to_apply {
    width: 135px;
    height: 34px;
    line-height: 34px;
    font-size: 16px;
  }
}
</style>
