<template>
 <div class="active_page christmas">
   <div id="snow" class="christmas_snow"></div>
  
    <div class="title"></div>
    <div class="prize_box">
      <div class="person1"></div>
      <div class="person2"></div>
      <div class="bg"></div>
      <div class="truecon">
        <div class="record_btn"><span @click="toHistory">抽奖记录</span></div>
        <div class="bottle"  :class="{'single':initInfo.coupon_num<10}">
          <span>{{initInfo.coupon_num}}</span>
        </div>
        <div class="label">
          <span>活动内容 : </span>
          <span>活动期间，VIP会员每日首充达到一定金额，即可获得圣诞券并参与圣诞限定开盲盒活动。</span>
        </div>
        <div class="label">
          <span>活动时间 : </span>
          <span>{{initInfo.active_show_time}}</span>
        </div>
        <div class="get_prize" :class="item.classname" 
        v-for="(item,index) in list" :key="index">
          <div class="ftitle">
            <div class="sweat"></div><br>
            <div class="arrow"></div>
          </div>
          <div class="goods">
            <div class="goods_tit"></div>
            <div class="good_item" 
           
            v-for="(good,index) in item.goods" :key="index">
              <div class="img_box">
                <img :src="good.imgurl" alt="">
              </div>
              <p>{{good.name}}</p>
            </div>
          </div>
          <ul>
            <li v-for="i in 3"  @click="open(item.type,item.neednum)" :key="i"
            class="prize_item"></li>
          </ul>
          <div class="btn">
            <span>{{item.neednum}}</span>
            <span>张券可开</span>
          </div>
         
        </div>
        <div class="lunbo">
          <div class="mask"></div>
          <div class="lunbo_box">
            <vue-seamless-scroll :data="gunData" :class-option="{direction: 2,step: 0.5,limitMoveNum:1}">
              <ul>
                <li  v-for="(item, index) in gunData" :key="index">
                  <img :src="item.imgurl" alt="">
                 <p>{{item.name}}</p>
                 <div class="dis" >{{item.label}}</div>
                </li>
              </ul>
            </vue-seamless-scroll>
          </div>
        </div>
      
      </div>
     
    </div>
    <div class="rule">
      <h5>活动规则</h5>
      <p>
        1.会员每日首充每满500元即可获得一张圣诞券，每位会员每日最高可获得20张，会员可以在活动页面自行选择三种类型盲盒进行开奖，畅享盲盒需消耗1张圣诞券，豪华盲盒需消耗3张圣诞券，限定盲盒需消耗5张圣诞券。<br>
        2.会员每日充值在未发起提款前都视为首充。<br>
        3.会员每日所获得的圣诞券仅限当日使用，隔日则无效。<br>
        4.此活动不与【点金胜手】活动共享，二者只可选其一参与。<br>
        5.活动奖品领取有效期为：自中奖之日起，15日内有效，若奖品为实物奖品，请联系在线客服提供中奖兑换码，提供您的详细收货地址，我们将于次日安排发货，快递单号将会发送站内信通知。除此之外您也可以联系在线客服选择折现，实物奖品折现后无需流水即可提款。<br>
        6.活动彩金需要完成全站1倍有效流水，电竞赔率＜1.45、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、走盘、注单取消、对冲等情况都不算有效流水，PT电子游戏中以下游戏不计算为有效流水：<activeptliushui :color="'#fcbc2d'"></activeptliushui>。<br>
        7.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能参与一次优惠，参与用户必须先绑定银行卡。对违规的用户，VKGAME保留无期限审核，和扣回红利及产生的利润权利。本活动最终解释权归VKGAME所有。													
      </p>
    </div>
    <router-link to="/active" class="back"></router-link>
    <div id="snowtwo" class="christmas_snow"></div>
    <el-dialog
    :visible.sync="openShow"
    custom-class="pure_dialog christmas_opening"
    :append-to-body="true"
    :close-on-click-modal="false"	
    :close-on-press-escape="false"
    :fullscreen="true">
      <p>正在打开...</p>
    </el-dialog>  
    <!--开奖弹窗-->
    <el-dialog
    :visible.sync="gotPrzeShow"
    custom-class="pure_dialog christmas_opened"
    :append-to-body="true"
    :close-on-click-modal="false"	
    :close-on-press-escape="false"
    :fullscreen="true">
     <div class="close" @click="gotPrzeShow=false"></div>
      <h5>恭喜你获得</h5>
      <p>{{gotPrize.item_name}}</p>
      <img :src="gotPrize.item_url" alt="">
      <div class="close_btn" @click="gotPrzeShow=false" v-show="gotPrize.item_type==2">朕知道了</div>
      <p class="code code2" v-show="gotPrize.item_type==2">奖励已经自动转入您的账户</p>
      <div v-show="gotPrize.item_type==1">
        <div class="close_btn" @click="toOpenKfWindow()">联系客服</div>
        <p class="code">请联系客服人员，通过兑换码领取奖品。</p>
        <p class="code">{{gotPrize.secret}}</p>
        <p class="copy" @click="doCopy(gotPrize.secret)">复制兑换码</p>
      </div>
      </el-dialog>  
      <!---中奖纪录-->
      <el-dialog
      :visible.sync="hisShow"
      custom-class="pure_dialog christmashis"
      :append-to-body="true"
      :close-on-click-modal="false"	
      :close-on-press-escape="false"
      :fullscreen="true">
        <div class="christmashis_box">
          <div class="close" @click="hisShow=false"></div>
          <h5>抽奖记录</h5>
          <div class="list">
            <ul class="list_ul">
              <li class="list_item">
                <span class="got_prizename">名称</span>
                <span class="sceat">兑换凭据</span>
                <span class="got_time">获奖日期</span>
                <span class="got_status">领取状态</span>
              </li>
              <p class="no_list" v-show="!recordList.length">暂无抽奖记录</p>
              <li class="list_item" v-for="(list,index) in recordList" :key="index">
                <span class="got_prizename">{{list.desc}}</span>
                <span class="sceat">
                  {{list.secret}} 
                  <b class="sceat_copy" 
                  @click="doCopy(list.secret)"
                  v-show="list.item_type==1">复制</b> 
                </span>
                <span class="got_time">{{list.time}}</span>
                <span class="got_status" :class="{'no_got':list.status==4}">{{list.status_cn}}</span>
              </li>
            </ul>
            <Page :total="page.total" v-show="page.total"  
              :page-size="page.pagesize" 
              :current.sync="page.currentpage" 
              @on-change="getRecordList($event)" 
               >
            </Page>
            <p class="des">如奖品为实物奖品，请<b @click="openKfWindow()">联系客服</b>人员，通过兑换码领取奖品，或查询兑奖记录。</p>
          </div>
        </div>
         
    </el-dialog>  
 </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "christmas",
  data() {
    return {
      page: {
        total: 50,
        pagesize: 10,
        currentpage: 1
      },
      hisShow:false,
      list:[
        {
          classname:"r1",
          neednum:1,
          type:"enjoy",
          goods:[
            {label:"畅享",name:"罗技G300鼠标",imgurl:require("../../../assets/active/christmas/3.png")},
            {label:"畅享",name:"8.8元现金",imgurl:require("../../../assets/active/christmas/2.png")},
            {label:"畅享",name:"228V币",imgurl:require("../../../assets/active/christmas/1.png")},
            {label:"畅享",name:"188V币",imgurl:require("../../../assets/active/christmas/1.png")},
            {label:"畅享",name:"128V币",imgurl:require("../../../assets/active/christmas/1.png")},
          ],
        },
        {
          classname:"r2",
          neednum:3,
          type:"luxury",
          goods:[
            {label:"豪华",name:"小米AI音箱",imgurl:require("../../../assets/active/christmas/7.png")},
            {label:"豪华",name:"K/DA迷你手办套装",imgurl:require("../../../assets/active/christmas/9.png")},
            {label:"豪华",name:"18.8元现金",imgurl:require("../../../assets/active/christmas/6.png")},
            {label:"豪华",name:"12.8元现金",imgurl:require("../../../assets/active/christmas/5.png")},
            {label:"豪华",name:"388V币",imgurl:require("../../../assets/active/christmas/4.png")},
          ],
        },
        {
          classname:"r3",
          neednum:5,
          type:"supreme",
          goods:[
            {label:"限定",name:"华为Mate40 Pro",imgurl:require("../../../assets/active/christmas/13.png")},
            {label:"限定",name:"黑爵键盘",imgurl:require("../../../assets/active/christmas/12.png")},
            {label:"限定",name:"范思哲男士香水",imgurl:require("../../../assets/active/christmas/11.png")},
            {label:"限定",name:"38.8元现金",imgurl:require("../../../assets/active/christmas/8.png")},
            {label:"限定",name:"688V币",imgurl:require("../../../assets/active/christmas/4.png")},
          ],
        },
      ],
      gunData:[],
      openShow:false,
      gotPrzeShow:false,
      gotPrize:{ },
      load:false,
      ajaxload:false,
      initInfo:{},
      copyAlready:false,
      recordList:[]
    };
  },
  computed: {
    ...mapState(["isLogin"]),
  },
  mounted() {
    this.getInit()
    this.list.forEach(item=>{
      this.gunData = this.gunData.concat(item.goods)
    })
    this.$nextTick(()=>{
      this.startsnow("snow",60)
      this.startsnow("snowtwo",10)
    })
  },
  methods: {
    toHistory() {
      if(!this.isLogin) {
        this.$message({
          message: '请先登录',
          type: 'warning'
        })
        return
      }
      this.hisShow = true
      this.page.currentpage = 1
      this.getRecordList()
    },
    //获取我的中奖纪录
    getRecordList () {
      // this.ajaxload1 = true
      this.$http(this.ApiSetting.active.getUserChristmas2020List,{
         page:this.page.currentpage,
         page_size:this.page.pagesize
      } )
      .then(res => {
        this.ajaxload1 = false
        if(res.status == 1 && res.data) {
          this.recordList = res.data.record_list.data
          this.page.total = res.data.record_list.total
        }
      })
      .catch(()=>{
        this.ajaxload1 = false
      })
    },
    //联系客服
    toOpenKfWindow () {
      if(this.copyAlready){
        this.openKfWindow()
        this.copyAlready = false
      }else {
        this.$message({
          message: '请先复制兑换码',
          type: "warning"
        });
      }
    },
    //复制兑换码
    doCopy (secret) {
      let _this = this
      this.copyAlready = true
      this.$copyText(secret).then(function (e) {
        _this.$message({
          message: '兑换码复制成功',
          type: 'success'
        })
      }, function (e) {
        _this.$message({
          message: _this.$t("Copy_the_failure"),
          type: 'warning'
        })
      })
    },
    getInit( ) {
      this.load = true
      this.$http(this.ApiSetting.active.getChristmas2020Init)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
        }
      })
      .catch(()=>{
        this.load = false
      })
    },
    //领奖
    open(type,neednum) {
      if(!this.isLogin) {
        this.$message({
          message: '请先登录',
          type: "warning"
        });
        return
      }
      //不可领取
      if(this.initInfo.status != 0) {
        this.$message({
          message: this.initInfo.status_tips,
          type: "warning"
        });
        return
      }
      if(this.initInfo.coupon_num<neednum) {
        this.$message({
          message: '您的圣诞券不足以开启此种盲盒，请累积足够券后再试',
          type: "warning"
        });
        return
      } 
      if(this.ajaxload ) {
        return
      }
       this.ajaxload = true
       this.openShow = true
       this.$http(this.ApiSetting.active.joinChristmas2020,{type:type})
       .then(res => {
         this.ajaxload = false
         if(res.status == 1 && res.data) {
           this.initInfo.coupon_num = res.data.times
           this.gotPrize = res.data
          //  this.getInit()
          //  this.gotPrzeShow = true
           setTimeout(() => {
             this.openShow = false
             setTimeout(() => {
                this.gotPrzeShow = true
             }, 200);
           }, 500);
         }
       })
       .catch(()=>{
         this.ajaxload = false
       })
      
    },
    startsnow(el,num) {
      var w = window.innerWidth -112, h = 3000,
          container = document.getElementById(el),
          sizes = ["Small", "Medium", "Large"],
          types = ["round", "star", "real", "sharp", "ring"],
          snowflakes = num;

      for (var i = 0; i < snowflakes; i++) {
          var snowflakeDiv = document.createElement('div');
          var sizeIndex = Math.ceil(Math.random() * 3) -1; //get random number between 0 and 2
          var size = sizes[sizeIndex]; //get random size
          var typeIndex = Math.ceil(Math.random() * 5) -1;
          var type = types[typeIndex];
          TweenMax.set(snowflakeDiv, {attr: {class: type + size}, x: R(0,w), y: R(-200,-150) });
          container.appendChild(snowflakeDiv);
          snowing(snowflakeDiv);
      }

      function snowing(element) {
         TweenMax.to(element, R(20,32), {y: h+100, ease: Linear.easeNone, repeat:-1, delay: -33});
         TweenMax.to(element, R(4,8), {x: '+=100', repeat: -1, yoyo: true, ease: Sine.easeInOut});
         TweenMax.to(element, R(2,8), {rotation: R(0,360), repeat: -1, yoyo: true, ease:Sine.easeInOut, delay: -5});
      };

      function R(min,max) {
        return min + Math.random() * (max-min)
      };
    }
  }
};
</script>

<style scoped lang="less">
.christmas {
  padding: 70px 0 40px;
  background-image:url("../../../assets/active/christmas/bg-top.png"),
   url("../../../assets/active/christmas/bg-bottom.png");
  background-repeat: no-repeat no-repeat;
  background-position: center top,center bottom;
  background-color: #134125;
  position: relative;
  * {
    box-sizing: border-box;
  }
  *+*{
    box-sizing: border-box;
  }
  .title {
    width: 711px;
    height: 323px;
    margin: 0 auto;
    background: url("../../../assets/active/christmas/title.png") no-repeat;  
  }
  .prize_box {
    width: 1240px;
    margin: 10px auto 0;
    height: 1884px;
    padding-top: 27px;
    position: relative;
  }
  .person1 {
    position: absolute;
    left: -185px;
    top: 540px;
    width: 258px;
    height: 287px;
    background: url("../../../assets/active/christmas/person2.png") no-repeat;  
    z-index: 0;
  }
  .person2 {
    position: absolute;
    top: 900px;
    right: -305px;
    width: 448px;
    height: 415px;
    background: url("../../../assets/active/christmas/person1.png") no-repeat;  
    z-index: 0;
  }
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: url("../../../assets/active/christmas/content.png") no-repeat;  
    z-index: 1;
  }
  .truecon {
    position: relative;
    z-index: 2;
  }
  .record_btn {
    position: absolute;
    top: -93px;
    right: -47px;
    width:228px;
    height: 207px;
    background: url("../../../assets/active/christmas/reocred.png") no-repeat;  
    text-align: center;
    padding-top: 50px;
    span{
      color: #0e301b;
      font-size: 25px;
      font-weight: bold;
      transition: color 0.2s;
      text-decoration: underline;
      display: inline-block;
      transform:rotateZ(10deg);
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
  .bottle {
    position: absolute;
    top: -109px;
    right: 95px;
    width: 300px;
    height: 294px;
    background: url("../../../assets/active/christmas/bottle.png") no-repeat;  
    color: #ee7729;
    font-size: 40px;
    font-weight: bold;
    padding: 110px 0 0 117px;
    &.single {
      padding-left: 132px;
    }
    span {
      display: inline-block;
      transform: rotateZ(11deg);
    }
  }
  .label {
    width: 900px;
    margin: 0 auto;
    font-size: 17px;
    color: #134125;
    line-height: 1.6;
    font-weight: bold;
    span {
      &:first-child {
        vertical-align: top;
      }
      &:last-child {
        width: 595px;
        display: inline-block;
      }
    }
  }
  .get_prize {
    width: 1000px;
    height: 395px;
    margin: 0 auto;
    position: relative;
    .ftitle {
      width: 210px;
      height: 354px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: -140px;
      left: -76px;
      cursor: pointer;
      text-align: center;
      padding-top: 280px;
      &:hover + .goods  {
        opacity: 1;
      }
      .sweat {
        display: inline-block;
        width: 20px;
        height: 11px;
        background: url("../../../assets/active/christmas/sweat.png") no-repeat; 
        opacity: 0;
        animation: sweatani 2s linear infinite;
      }
      @keyframes sweatani {
        0%,59% {
          opacity: 0;
        }
        60%,80% {
          opacity: 1;
        }
        81%,100% {
          opacity: 0;
        }
      }
      .arrow {
        margin-top: 5px;
        display: inline-block;
        width: 35px;
        height: 39px;
        background: url("../../../assets/active/christmas/arrow.png") no-repeat;  
        animation: arrowani 2s 1s linear infinite; 
      }
      @keyframes arrowani {
        0% {
          transform: translateY(-10px);
        }
        100% {
          transform: translateY(0);
        }
      }
    }
    ul {
      width: 864px;
      margin: 0 auto;
      height: 232px;
      .prize_item {
        width: 288px;
        height: 232px;
        float: left;
        background-repeat: no-repeat;
        background-position: center bottom;
        cursor: pointer;
        &:hover {
          transition: transform 0.3s;
          transform: translateY(-20px) scale(1.05);
        }
      }
    }
    &.r1 {
      margin-top: 138px;
      .ftitle {
        background-image: url("../../../assets/active/christmas/title1.png");  
      }
      .prize_item {
        background-image: url("../../../assets/active/christmas/r1-box.png");  
      }
    }
    &.r2 {
      .ftitle {
        left: 865px;
        background-image: url("../../../assets/active/christmas/title2.png");  
      }
      .prize_item {
        background-image: url("../../../assets/active/christmas/r2-box.png");  
      }
      .goods  {
        background: url("../../../assets/active/christmas/good-bg-r.png") no-repeat;  
      }
    }
    &.r3 {
      .ftitle {
        background-image: url("../../../assets/active/christmas/title3.png");  
      }
      .prize_item {
        background-image: url("../../../assets/active/christmas/r3-box.png");  
      }
    }
    .btn {
      width: 393px;
      margin: -20px auto 0;
      height: 135px;
      background: url("../../../assets/active/christmas/btn.png") no-repeat;  
      color: #134125;
      font-size: 25px;
      font-weight: bold;
      text-align: center;
      line-height: 102px;
      span:first-child {
        font-size: 36px;
      }
    }
    .goods {
      position: absolute;
      left: 90px;
      top: -30px;
      width: 825px;
      height: 210px;
      background: url("../../../assets/active/christmas/good-bg-l.png") no-repeat;  
      padding-left:50px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
      .goods_tit {
        margin:20px 0 10px;
        width: 136px;
        height: 22px;
        background: url("../../../assets/active/christmas/goods-title.png") no-repeat;  
      }
      .good_item {
        width: 140px;
        height: 140px;
        float: left;
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
        .img_box {
          width: 100%;
          height: 115px;
          line-height: 115px;
          text-align: center;
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
        p {
          font-weight: bold;
          line-height: normal;
          text-align: center;
          font-size: 16px;
          color: #fff6d8;
        }
      }
      
    }
  }
  .lunbo {
    width: 100%;
    height: 210px;
    position: relative;
    margin-top: 100px;
    .mask {
      position: absolute;
      z-index: 5;
      top: -37px;
      left: 0;
      width: 1240px;
      height: 418px;
      background:url("../../../assets/active/christmas/lunbo_bg.png") no-repeat;
      pointer-events: none;
    }
    .lunbo_box {
      width: 1200px;
      height: 250px;
      margin: 0 auto;
      overflow: hidden;
    }
    ul {
      display: flex;
    }
    li {
      width: 250px;
      height:210px ;
      background:url("../../../assets/active/christmas/border.png") no-repeat center top;
      position: relative;
      text-align: center;
      margin-top: 24px;
      padding-top: 1px;
      .dis {
        position: absolute;
        top: -28px;
        left: -4px;
        width: 116px;
        height: 63px;
        background:url("../../../assets/active/christmas/dis.png") no-repeat center center;
        text-align: center;
        box-sizing: border-box;
        padding: 18px 0 0 36px;
        color: #ffe5d0;
        font-weight:bold;
        font-size: 18px;
      }
      img {
        width: 210px;
        height: 210px;
      }
      p {
        margin-top: -30px;
        font-size: 16px;
        color: #134125;
      }
    }
  }
  .rule{
    margin: 20px auto;
    width: 1240px;
    height: 436px;
    background:url("../../../assets/active/christmas/rulebg.png") no-repeat ;
    color: #ffffff;
    line-height: 2.5;
    padding: 100px 25px 0;
    position: relative;
    z-index: 1;
    &::after {
      content: "";
      position: absolute;
      bottom: -21px;
      right: -25px;
      width: 65px;
      height: 126px;
      background:url("../../../assets/active/christmas/sugar.png") no-repeat ;
    }
    h5 {
      text-align: center;
      font-size: 24px;
    }
  }
  .back {
    display: block;
    width: 303px;
    margin: 40px auto 0;
    height: 105px;
    background:url("../../../assets/active/christmas/backn.png") no-repeat ;
    cursor: pointer;
    transition: background 0.3s;
    &:hover {
      background:url("../../../assets/active/christmas/backh.png") no-repeat ;
    }
  }
}

</style>

<style lang="less">
.christmas_opening {
  margin: 15vh auto 0;
  width: 750px;
  height: 675px;
  background:url("../../../assets/active/christmas/opening-bg.png") no-repeat ;
  text-align: center;
  padding-top: 250px;
  box-shadow:unset;
  p {
    font-size: 38px;
    font-weight: bold;
    color: #fff7c1;
  }
}
.christmas_opened {
  margin: 5vh auto 0;
  width: 750px;
  height: 675px;
  background:url("../../../assets/active/christmas/got-bg.png") no-repeat ;
  text-align: center;
  padding-top: 220px;
  box-shadow:unset;
  position: relative;
  h5 {
    font-size: 30px;
    text-align: center;
    color: #fff7c1;
  }
  p {
    height: 35px;
    line-height: 35px;
    font-size: 26px;
    color: #fff7c1;
  }
  img {
    width:210px;
    height: 210px;
  }
  .close {
    position: absolute;
    right: 170px;
    top: 40px;
    width: 32px;
    height: 32px;
    background:url("../../../assets/close-n.png") no-repeat;
    cursor: pointer;
    &:hover {
      background:url("../../../assets/close-h.png") no-repeat;
    }
  }
  .close_btn {
    margin: 96px auto 0;
    width:290px;
    height: 74px;
    font-size: 30px;
    font-weight: bold;
    color: #fff7c1;
    line-height: 74px;
    text-align: center;
    background:url("../../../assets/active/christmas/got-btn.png") no-repeat;
    cursor: pointer;
  }
  .code {
    font-size: 20px;
  }
  .code2 {
    margin-top: 10px;
  }
  .copy {
    font-size: 24px;
    font-weight: bold;
    color: #d4011c;
    text-decoration: underline;
    cursor: pointer;
  }
}
.christmashis {
  margin-top: 20px;
  width: 1240px;
  .christmashis_box {
    width: 100%;
    .close {
      position: absolute;
      top: 28px;
      right: 0;
      width:32px;
      height: 32px;
      background:url("../../../assets/active/close.png") no-repeat;
      cursor: pointer;
      &:hover {
        background:url("../../../assets/active/close-hover.png") no-repeat;
      }
    }
    h5 {
      text-align: center;
      font-size: 32px;
      color: #fff7c1;
      margin-bottom: 30px;
    }
    .list_ul {
      height: 591px;
    }
    .list {
      height: 740px;
      background:url("../../../assets/active/christmas/listbg.png") no-repeat;
      ul {
        overflow: hidden;
      }
      .no_list {
        color: #fff;
        text-align: center;
        line-height: 100px;
        font-size: 16px;
      }
      .list_item {
        width:100%;
        height: 50px;
        border-bottom:1px solid rgba(255, 247, 193,0.5);
        font-size: 20px;
        color: #ffffff;
        span {
          display: block;
          float: left;
          box-sizing: border-box;
          height: 100%;
          line-height: 50px;
          border-right:1px solid rgba(255, 247, 193,0.5);
          &:last-child {
            border:none;
          }
        }
        .got_prizename {
          padding-left: 35px;
          width:300px;
        }
        .sceat {
          padding-left: 40px;
          width:480px;
          .sceat_copy {
            text-decoration: underline;
            color:#fff7c1;
            cursor: pointer;
          }
        }
        .got_time {
          width:270px;
          text-align: center;
        }
        .got_status {
          width:190px;
          text-align: center;
          &.no_got {
            color:#fff7c1;
          }
        }
        &:first-child {
          height: 80px;
          text-align: center;
          font-size: 20px;
          color: #fff7c1;
          span {
            font-weight: bold;
            padding: 0;
            line-height: 80px;
          }
        }
      }
    }
    .des {
      margin-top: 20px;
      font-size: 20px;
      text-align: center;
      color: #ffffff;
      b {
        color: #fff7c1;
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .ivu-page {
      text-align: center;
    }
    .ivu-page-prev a i.ivu-icon-ios-arrow-back {
      background-position: -670px -88px;
    }
    .ivu-page-next a i.ivu-icon-ios-arrow-forward {
      background-position: -647px -88px;
    }
    .ivu-page-item-jump-next, .ivu-page-item-jump-prev, .ivu-page-next, .ivu-page-prev {
      border:0;
    }
    .ivu-page-item a {
      color: #fff;
    }
    .ivu-page-item:hover a {
      color: #fff7c1;
    }
    .ivu-page-item-active {
      color: #fff;
      border-color: #fff;
    }
    .ivu-page-item-active:hover a, .ivu-page-item-active a {
      color: #fff;
    }
  }
}
.christmas_snow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  .roundSmall,
  .roundMedium,
  .roundLarge {
      background: #fff;
      border-radius: 50%;
      position: absolute;
      width: 3px;
      height: 3px;
  }
  .roundMedium {
      width: 4px;
      height: 4px;
  }
  .roundLarge {
      width: 5px;
      height: 5px;
  }
  .starSmall,
  .starMedium,
  .starLarge {
      position: absolute;
      width: 10px;
      height: 10px;
      background: url("../../../assets/active/christmas/snow1.png");
      background-size: 100% 100%;
  }
  .starMedium {
      width: 15px;
      height: 15px;
  }
  .starLarge {
      width: 20px;
      height: 20px;
  }
  .realSmall,
  .realMedium,
  .realLarge {
      position: absolute;
      width: 25px;
      height: 25px;
      background: url("../../../assets/active/christmas/snow1.png");
    background-size: 100% 100%;
  }
  .realMedium {
      width: 30px;
      height: 30px;
  }
  .realLarge {
      width: 40px;
      height: 40px;
  }
  .sharpSmall,
  .sharpMedium,
  .sharpLarge {
      position: absolute;
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      background: url("../../../assets/active/christmas/snow2.png");
    background-size: 100% 100%;
  }
  .sharpMedium {
      width: 28px;
      height: 28px;
  }
  .sharpLarge {
      width: 35px;
      height: 35px;
  }
  .ringSmall,
  .ringMedium,
  .ringLarge {
      position: absolute;
      width: 15px;
      height: 15px;
      background-image: url("../../../assets/active/christmas/snow2.png");
    background-size: 100% 100%;
  }
  .ringMedium {
      width: 25px;
      height: 25px;
  }
  .ringLarge {
      width: 35px;
      height: 35px;
  }
}
#snowtwo {
  z-index: 5;
}

</style>
