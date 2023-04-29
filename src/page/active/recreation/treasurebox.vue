<template>
  <div class="treasurebox">
    <!--升级和信息部分-->
    <div class="info">
        <div class="level violet">
          <div class="curh"></div>
          <div class="flower"></div>
          <div v-if="basicinfo.is_login" class="leitem">
            <div class="highl1"></div>
            <div class="lv">
              <span>Lv</span>
              <span>{{basicinfo.current_level}}</span>
            </div>
            <div class="highl2"></div>
            <span class="debris">{{basicinfo.pieces_num}}</span>
          </div>
          <div v-else class="leitem">
            <div class="highr5"></div>
            <div class="btn"><router-link to="/login" class="login_btn">{{$t("The_login")}}</router-link></div>
          </div>
        </div>
        <ul class="upgrade" >
          <li @click="toUpgrade(1)" class="le1"></li>
          <li @click="toUpgrade(5)" class="le5"></li>
          <li @click="toUpgrade(10)" class="le10"></li>
        </ul>
        <div class="highest violet">
           <div class="flower"></div>
           <div class="highl3"></div>
           <div class="avatar"><img :src="basicinfo.max_level_user_avatar" alt=""></div>
           <span :title="basicinfo.max_level_user_name" class="ellips name">{{basicinfo.max_level_user_name || '--'}}</span>
           <div class="lv" v-show="basicinfo.max_level">
            <span>Lv</span>
            <span>{{basicinfo.max_level}}</span>
          </div>
        </div>
    </div>
    <!--奖品轴-->
    <div class="prize" v-if="basicinfo.is_login">
      <span @mousedown="prevDown" @mouseup="prevUp" class="arrow arrowl"></span>
      <span @mousedown="nextDown" @mouseup="nextUp" class="arrow arrowr"></span>
      <div class="ulbox">
        <!-- <ul ref="tranul" :style="{width: totalwidth+ 'px'}"> -->
        <ul ref="tranul" :class="{'trans':istrans}" :style="{width: totalwidth+ 'px',right:'-' + transnum + 'px'}">
        <!-- <ul :style="{width: totalwidth+ 'px',transform: 'translateX(-' + transnum + 'px)'}"> -->
          <el-popover
          v-for="item in historyList" :key="item.id"
          width="996"
          trigger="hover"
          :disabled="Boolean(item.is_used) || Boolean(item.is_expired)"
          v-model="item.visible"
          placement="top">
            <div class="hovershow">
              <ul v-if="item.box_type == 1" >
                <li v-for="gift in giftList1" :key="gift.id">
                  <img :src="gift.icon_url" alt="">
                  <span class="desc ellips" :title="gift.desc">{{gift.desc}}</span>
                </li>
              </ul>
              <ul v-if="item.box_type == 5">
                <li v-for="gift in giftList5" :key="gift.id">
                  <img :src="gift.icon_url" alt="">
                  <span class="desc ellips" :title="gift.desc">{{gift.desc}}</span>
                </li>
              </ul>
              <ul v-if="item.box_type == 10">
                <li v-for="gift in giftList10" :key="gift.id" >
                  <img :src="gift.icon_url" alt="">
                  <span class="desc ellips" :title="gift.desc">{{gift.desc}}</span>
                </li>
              </ul>
              <div class="unlockbox">
                <div @click="unlockBox(item)" class="btn"><span>{{$t("Unlock_the_treasure_chest")}}</span></div>
                <span class="locktit">{{$t("Give_a_random_gift")}}</span>
              </div>
            </div>
            <li slot="reference" :title="item.title">
              <div v-if="!item.is_used" class="pcursor" :class="item.boximgclass"></div>
              <img v-else :src="item.icon_url">
              <div v-show="item.is_expired && !item.is_used" class="pastduemask"></div>
              <span v-show="item.is_used" class="levelnum ellips" :title="item.title">{{item.title}}</span>
              <span class="levelnum levelnumbo">{{item.level}}</span>
              <div v-show="item.level == basicinfo.current_level" class="curlevel">
                <span>{{$t("Current_level")}}</span><br />
                <span>Lv&nbsp;{{basicinfo.current_level}}</span>
              </div>
            </li>
          </el-popover>

          <!--预测的包箱-->
           <el-popover
          v-for="(futurebox,index) in lastbox" :key="index"
          width="996"
          trigger="hover"
          placement="top">
            <div class="hovershow">
              <ul v-if="futurebox.box_type == 1" >
                <li v-for="gift in giftList1" :key="gift.id">
                  <img :src="gift.icon_url" alt="">
                  <span class="desc ellips" :title="gift.desc">{{gift.desc}}</span>
                </li>
              </ul>
              <ul v-if="futurebox.box_type == 5">
                <li v-for="gift in giftList5" :key="gift.id">
                  <img :src="gift.icon_url" alt="">
                  <span class="desc ellips" :title="gift.desc">{{gift.desc}}</span>
                </li>
              </ul>
              <ul v-if="futurebox.box_type == 10">
                <li v-for="gift in giftList10" :key="gift.id" >
                  <img :src="gift.icon_url" alt="">
                  <span class="desc ellips" :title="gift.desc">{{gift.desc}}</span>
                </li>
              </ul>
              <div class="unlockbox unlockboxpred">
                <span class="locktit">{{$t("Give_a_random_gift")}}</span>
              </div>
            </div>
            <li slot="reference">
              <div :class="futurebox.className"></div>
              <div class="questionmark"></div>
              <span class="levelnum levelnumbo">{{futurebox.index}}</span>
            </li>
          </el-popover>

        </ul>
      </div>
      <transition name="fade">
        <div @click="tocur" v-show="isgocur" class="gocur"><span>{{$t("Go_current_level")}}</span></div>
      </transition>
    </div>
    <!--开箱弹窗-->
    <transition name="dialog-fade">
      <div v-on:click.self="isOpenPopup=false" v-show="isOpenPopup" class="popup">
        <div v-on:click.self="isOpenPopup=false" class="openbgani">
          <img src="../../../assets/active/treasurebox/1.png" alt="">
          <img src="../../../assets/active/treasurebox/2.png" alt="">
          <img src="../../../assets/active/treasurebox/3.png" alt="">
          <img src="../../../assets/active/treasurebox/4.png" alt="">
          <img src="../../../assets/active/treasurebox/5.png" alt="">
          <img src="../../../assets/active/treasurebox/5.png" alt="">
          <img src="../../../assets/active/treasurebox/5.png" alt="">
          <img src="../../../assets/active/treasurebox/5.png" alt="">
          <img src="../../../assets/active/treasurebox/5.png" alt="">
          <img src="../../../assets/active/treasurebox/5.png" alt="">
        </div>
        <div v-on:click.self="isOpenPopup=false" class="snowflakebox">
          <div v-for="snow in snowflakeList" :style="{left:snow.left,animationDelay:snow.delay}" :class="snow.classN" :key="snow.classname">
            <div :class="snow.imurl"></div>
          </div>
        </div>
        <div class="popupbg">
          <h2 v-show="!ptext" class="highl4"></h2>
          <h2 v-show="ptext" class="highr4"></h2>
          <div v-show="!ptext" class="winggler">
            <transition-group name="flip-list" tag="ul">
              <li v-for="item in tgiftlist" v-bind:key="item.id">
                <img :src="item.icon_url" alt="">
              </li>
            </transition-group>
          </div>
          <div v-show="ptext" class="openboxcon" >
            <div class="openbox1">
              <img :src="opensuccess.icon_url" alt="">
            </div>
            <div class="openbox2">
              <div>
                <span class="obtain">{{$t("To_obtain")}}</span><br /><br />
                <span class="opendesc ellips" :title="opensuccess.desc">{{opensuccess.desc}}</span>
              </div>
            </div>
          </div>
          <span class="code" v-show="ptext&&opensuccess.code">{{$t("Conversion_code")}}: {{opensuccess.code}}</span>
          <div @click="getGift" v-show="ptext" class="btn"><span>{{ptext}}</span></div>
        </div>
      </div>
    </transition>
    <!--升级弹窗-->
    <transition name="dialog-fade">
      <div v-on:click.self="isUpgradePopup=false" v-show="isUpgradePopup" class="popup">
        <div class="popupbg" >
          <h2 class="highl5"></h2>
          <span class="upgrade-success">{{$t("Successfully_promoted_to")}}</span>
          <span class="upgrade-le">Lv&nbsp;
            <countup :end-val="basicinfo.current_level" :duration="2" :decimals="0" :start="true"></countup>
          </span>
          <div @click="closeUpgrade" class="btn"><span>{{$t("determine")}}</span></div>
        </div>
      </div>
    </transition>
    <!--活动规则-->
    <div class="rules">
      <div class="ruleflowerl"></div>
      <div class="ruleflowerr"></div>
      <div class="rowtext">
        <div class="highr1"></div>
        <span>{{basicinfo.active_start_time}}&nbsp;{{$t("to")}}&nbsp;{{basicinfo.active_end_time}}</span>
      </div>
      <div class="rowtext">
        <div class="highr2"></div>
          <p v-html="$t('Treasurebox_rule1')"></p>
      </div>
      <div class="rowtext">
        <div class="highr3"></div>
        <p v-html="$t('Treasurebox_rule2')"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { Countup } from 'vux'
import {formatDate} from "../../../utils/util"
export default {
  name:'',
  data() {
    return {
      snowflakeClass:['snowflake0','snowflake1','snowflake2','snowflake3','snowflake4','snowflake5','snowflake6','snowflake7','snowflake8','snowflake9','snowflake10','snowflake11','snowflake12','snowflake13','snowflake14'],
      snowflakeList:[],
      istrans:true,
      replaceData:[],
      page:1,
      perPage:20,
      isgocur:false,
      opensuccess:{},
      totalwidth:0,
      maxWidth:0,
      transnum:0,
      total:0,
      isUpgradePopup:false,
      createTeasureBox:{},
      isOpenPopup:false,
      ptext:"",
      basicinfo:{
        current_level:0,
        max_level_user_avatar:require('../../assets/default_headimg.png')
      },
      giftList:[],
      giftList1:[],
      giftList5:[],
      giftList10:[],
      tgiftlist:[],
      historyList:[],
      timetrl:null,
      boxsList:[{
        box_type:1,
        className:'level1'
      },{
        box_type:5,
        className:'level5'
      },{
        box_type:10,
        className:'level10'
      }],
      lastbox:[],
      isPrevCanClick:true,
      isNextCanClick:true,
      pressTimer: null,
    }
  },
  components: {
    Countup
  },
  mounted () {
    this.getInitInfo();
    this.generateSnowflakes();
    document.body.style.minWidth = "1920px";
  },
  beforeRouteLeave (to, from, next) {
    document.body.style.minWidth = "1240px";
    clearInterval(this.pressTimer)
    this.pressTimer = null
    next()
  },
  watch: {
    historyList() {
      this.totalwidth = (this.historyList.length+10)*113;
    },
    transnum() {
      if(this.transnum > 10*113) {
        this.isgocur = true
      }else {
        this.isgocur= false
      }
    },
    isOpenPopup(val) {
      if(!val) {
        document.body.classList.remove("el-popup-parent--hidden");
        this.opensuccess = {};
        if(this.replaceData.length) {
          this.$set(this.historyList,this.replaceData[0],this.replaceData[1])
        }
      }
    }
  },
  methods: {
    //上按钮鼠标按下
    prevDown() {
      let th = this;
      if(!this.istrans || !this.maxWidth) {
        return
      }
      this.isPrevCanClick = false
      if(this.transnum < this.maxWidth) {
        if(this.isPrevCanClick) {
          return
        }
        this.transnum += 113
        if(th.historyList.length >=th.perPage && th.maxWidth-th.transnum <= 339) {
          this.isPrevCanClick = true
          this.getTeasureBoxRecordList(false,()=>{
             //this.transnum += 113
          })
        }
      }else {
        this.isPrevCanClick = true
        this.getTeasureBoxRecordList(false,()=>{
          this.transnum += 113
        })
      }
      clearInterval(this.pressTimer)
      this.pressTimer = setInterval(() => {
        if(this.transnum < this.maxWidth) {
          if(this.isPrevCanClick) {
            return
          }
          this.transnum += 113
          if(th.historyList.length >=th.perPage && th.maxWidth-th.transnum <= 339) {
              this.isPrevCanClick = true
              this.getTeasureBoxRecordList(false,()=>{
                 //this.transnum += 113
              })
          }
        }else {
          this.getTeasureBoxRecordList(false,()=>{
            this.transnum += 113
          })
        }
      }, 200)
    },
    //上按钮鼠标起来
    prevUp() {
      clearInterval(this.pressTimer)
      this.pressTimer = null
    },
    //下按钮鼠标按下
    nextDown() {
      if(!this.istrans) {
        return
      }
      this.isNextCanClick = false;
      clearInterval(this.pressTimer)
      if(this.transnum) {
        this.transnum -= 113
        this.pressTimer = setInterval(() => {
            this.transnum -= 113
        }, 200);
      }

    },
    //下按钮鼠标起来
    nextUp() {
      this.isNextCanClick = true;
      clearInterval(this.pressTimer)
      this.pressTimer = null
    },
    //关闭升级弹窗
    closeUpgrade() {
      this.isUpgradePopup=false;
      document.body.classList.remove("el-popup-parent--hidden");
    },
    //点击领取
    getGift() {
      this.isOpenPopup = false;
    },
    //前往当前等级
    tocur() {
      this.transnum = 0;
    },
    //开宝箱
    unlockBox(openitem) {
      this.$http(this.ApiSetting.active.treasurebox.openTeasureBox,{id:openitem.id})
      .then(res => {
        if(res.status == 1) {
          let t = this.giftList.filter(item => item.id == res.data.prize_id);
          if(t.length) {
            this.opensuccess = {};
            this.opensuccess = t[0];
            let ttdata = {
              is_used:1,
              title:t[0].desc,
              desc:t[0].desc,
              icon_url:t[0].icon_url
            }
            let tem = {}
            this.replaceData = [];
            let temhis = JSON.parse(JSON.stringify(this.historyList))
            for(let i = 0,ilen= this.historyList.length;i<ilen;i++) {
              if(this.historyList[i].id == openitem.id) {
                tem = temhis[i]
                tem.visible = false
                this.$set(this.historyList,i,tem)
                this.replaceData.push(i)
              }
            }
            this.replaceData.push(Object.assign({},tem,ttdata))
            this.unlockBoxDeal(openitem)
          }
          this.opensuccess.code = res.data.code;
        }else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    //开宝箱成功图片切换处理
    unlockBoxDeal(openitem){
      this.isOpenPopup = true;
      document.body.classList.add("el-popup-parent--hidden");
      this.ptext = "";
      this.tgiftlist = JSON.parse(JSON.stringify(openitem.box_type==1?this.giftList1:(openitem==5?this.giftList5:this.giftList10)))
      let countdown = 15;
      this.timetrl && clearInterval(this.timetrl)
      this.timetrl =  setInterval(() => {
        let t = this.tgiftlist.shift();
        this.tgiftlist.push(t);
        countdown--
        if(countdown<=0) {
          clearInterval(this.timetrl)
          this.timetrl = null
          this.ptext = this.$t("Get")
        }
      }, 150);
    },
    //升级
    toUpgrade(type) {
      if(this.basicinfo.is_login) {
        if(type > this.basicinfo.pieces_num) {
          this.$message({
            message: this.$t("Lack_of_debris"),
            type: 'warning'
          })
          return
        }
        this.$http(this.ApiSetting.active.treasurebox.createTeasureBox,{type:type})
        .then(res => {
          if(res.status == 1) {
            Object.assign(this.basicinfo, res.data,{
              active_start_time:res.data.active_start_time?formatDate(res.data.active_start_time*1000,'yyyy年MM月dd日'):'--',
              active_end_time:res.data.active_end_time?formatDate(res.data.active_end_time*1000,'yyyy年MM月dd日'):'--'
            });
            this.page =1;
            this.getTeasureBoxRecordList(true);
            this.isUpgradePopup = true;
            document.body.classList.add("el-popup-parent--hidden");
          }
        })
      }else {
        this.$message({
          message: this.$t("Please_login_first"),
          type: 'warning'
        })
      }
    },
    //初始等级信息
    getInitInfo(){
      this.$http(this.ApiSetting.active.treasurebox.getTeasureBoxInitInfo,{})
      .then(res => {
        if(res.status == 1) {
          this.basicinfo = res.data;
          this.basicinfo = Object.assign(res.data,{
            active_start_time:res.data.active_start_time?formatDate(res.data.active_start_time*1000,'yyyy年MM月dd日'):'--',
            active_end_time:res.data.active_end_time?formatDate(res.data.active_end_time*1000,'yyyy年MM月dd日'):'--'
          })
          if(this.basicinfo.is_login) {
            this.page =1
            this.getTeasureBoxRewards();
            this.getTeasureBoxRecordList();
          }
        }
      })
    },
    //奖品列表
    getTeasureBoxRewards() {
      this.$http(this.ApiSetting.active.treasurebox.getTeasureBoxRewards,{})
      .then(res => {
        if(res.status == 1) {
         this.giftList = res.data;
         this.giftList1= res.data.filter(item=>item.level === 1);
         this.giftList5= res.data.filter(item=>item.level === 5);
         this.giftList10= res.data.filter(item=>item.level === 10);
        }
      })
    },
    //历史列表
    getTeasureBoxRecordList(bool, callback) {
      if(this.total && this.page >Math.ceil(this.total/this.perPage)) {
        return;
      }
      setTimeout(() => {
        this.istrans = false
        this.$http(this.ApiSetting.active.treasurebox.getTeasureBoxRecordList,{page_size:this.perPage,page:this.page})
          .then(res => {
            if(res.status == 1) {
              if(bool) {
                this.historyList = []
                this.transnum =0;
              }
              let tdata = res.data.data;
              this.total = res.data.total;
              for (let i = 0; i < tdata.length; i++) {
                tdata[i].boximgclass = this.boxsList[parseInt(tdata[i].box_type/5)].className;
                tdata[i].title = tdata[i].desc ? tdata[i].desc:(tdata[i].is_expired ? '已过期':tdata[i].desc);
                tdata[i].visible = false;
                // this.historyList.push(tdata[i])
                this.historyList.unshift(tdata[i])
              }
              // this.historyList = this.historyList.concat(tdata).sort((a,b) => {
              //   return a.level - b.level
              // })
              let to = 0
              this.lastbox = []
              if(this.total < 5) {
                //预测宝箱总共有10 + 5-this.total 个
                to = 15 - this.total
              }else{
                //预测宝箱总共有10个
                to = 10
                this.maxWidth = (this.historyList.length - 5)*113;
              }
              for (let u = 1;u<=to;u++) {
                let _index = this.total + u
                let ti = 0
                if(_index%10 ==0) {
                  ti = 2
                }else if (_index%5 ==0) {
                  ti = 1
                }else {
                  ti = 0
                }
                this.lastbox.push(Object.assign({},this.boxsList[ti],{ index:this.total + u}))
              }
              setTimeout(() => {
                this.istrans = true;
                this.isPrevCanClick = false;
                callback && callback()
              }, 500);
              this.page++
            }
          })
      }, 500)
    },
    //动画
    getAbsoluteRandom (cache, base){
        var random = parseInt(Math.random() * base);
        if(cache[random]){
            return this.getAbsoluteRandom(cache, base);
        }else{
            cache[random] = 1;
            return random;
        }
    },
    generateSnowflakes (){
        for(var i = 0; i < 15;i++){
            var random = Math.random();
            this.snowflakeList.push({
              classN:this.snowflakeClass[i],
              left:this.getAbsoluteRandom({}, 100) + "%",
              delay:parseInt(Math.random() * 3000) + "ms," + parseInt(random*3) + "s",
              imurl:"spark"+ (Math.floor(Math.random()*2)+1)
            })
        }
    }
  }
}
</script>
<style lang="less" scoped>
  .openboxcode {
    margin-top:0;
  }
  .spark1 {
    width:22px;
    height: 22px;
    background:url("../../../assets/active/treasurebox/spark-1.png")
  }
  .spark2 {
    width: 19px;
    height: 19px;
    background:url("../../../assets/active/treasurebox/spark-2.png")
  }
  .sbg {
    background: url("../../../assets/active/treasurebox/txt.png");
  }
  .ts {
    transform: rotateY(180deg);
  }
  .trans {
    transition: all 0.4s linear;
  }
  .highl {
    width: 225px;
    height: 30px;
    .sbg;
    background-position-x: -817px;
  }
  .highr {
    width: 120px;
    height: 28px;
    .sbg;
    background-position-x: -1493px;
  }
  .btn {
    width: 142px;
    height: 60px;
    cursor: pointer;
    background: url("../../../assets/active/treasurebox/btn-btn-normal.png");
    text-align: center;
    transition: all 0.2s;
    &:hover {
      background: url("../../../assets/active/treasurebox/btn-btn-hover.png");
    }
    span,a {
      font-size: 20px;
      color: #361000;
      line-height: 59px;
    }
  }
  .level0 {
    width: 105px;
    height: 89px;
        margin: 35px auto;
  }
  .level1 {
    .level0;
    background: url("../../../assets/active/treasurebox/level1.png") no-repeat;
  }
  .level5 {
    .level0;
    background: url("../../../assets/active/treasurebox/level5.png") no-repeat;
  }
  .level10 {
    width: 105px;
    height: 93px;
    margin: 33px auto;
    background: url("../../../assets/active/treasurebox/level10.png") no-repeat;
  }
  .highl4 {
    .highl;
    background-position-y: -770px;
    margin: 52px auto 0;
    display: inline-table;
  }
  .highl5 {
    .highl;
    background-position-y: -816px;
    margin: 52px auto 0;
  }
  .highr4 {
    width: 200px;
    height: 28px;
    display: inline-table;
    .sbg;
    background-position: -1453px -561px;
    margin: 52px auto 0;
  }
  .hovershow {
    background: url("../../../assets/active/treasurebox/hoverbg.png") no-repeat;
    width: 996px;
    height: 396px;
    position: absolute;
    top:-364px;
    ul {
      width: 900px;
      height: 160px;
      margin: 50px auto 0;
      li {
        float: left;
        width: 150px;
        height: 100%;


        position: relative;
        text-align: center;
        img {
          max-width: 150px;
          max-height: 160px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
        .desc {
          max-width: 150px;
          font-size: 20px;
          color: #e9e9e9;
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }

    .unlockbox {
      position: absolute;
      bottom: 50px;
      left: calc(50% - 71px);
      text-align: center;
      &.unlockboxpred {
        bottom: 87px;
      }
      .locktit {
        font-size: 14px;
        color: #c194ff;
      }
    }
  }
  .treasurebox {
    background: url("../../../assets/active/treasurebox/bg.jpg") no-repeat center top;
    background-size: cover;
    padding: 120px 0 90px;
    .pcursor {
      cursor: pointer;
    }
    .popup {
      position: fixed;
      z-index: 1000;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.7);
      top:0;
      left: 0;
      .winggler {
        margin: 15px auto 0;
        ul {
          width: 150px;
          height: 160px;
          overflow: hidden;
          margin: auto;
          li {
            width: 150px;
            height: 160px;
            position: relative;
            img {
              max-width: 150px;
              max-height: 160px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
            }
          }
        }
      }
      .popupbg {
        position: absolute;
        text-align: center;
        z-index: 2;
        left: calc(50% - 270px);
        top: calc(57% - 270px);
        width: 540px;
        height: 376px;
        background: url("../../../assets/active/treasurebox/popup.png") no-repeat;
        margin:auto;


        .code {
          margin: -28px auto 0;
          font-size: 14px;
          color: #e9e9e9;
        }
        .openboxcode {
          margin-top: 0;
        }
        .btn {
          position: absolute;
          bottom: 45px;
          left: calc(50% - 71px);
        }
        .upgrade-success {
          font-size: 20px;
          color: #feefeb;
          margin: 55px auto 0;
          display: block;
        }
        .upgrade-le {
          font-size: 40px;
          color: #fef7ed;
          margin: 14px auto 0;
          display: block;
        }
        .openboxcon {
          padding: 2px;
          margin: 20px auto 0;
          position: relative;


          height: 120px;
          .openbox1 {
            width: 266px;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
          .openbox2{
            width: 266px;
            position: absolute;
            right: 0;
            >div {
              float: left;
              margin-top: 34px;
            }
          }
          img {
            margin-right:10px;
            max-width: 150px;
            max-height: 120px;
            float: right;
          }
          .obtain {
            font-size: 14px;
            color: #e9e9e9;
          }
          .opendesc {
            font-size: 20px;
            color: #e9e9e9;
            max-width: 260px;
            display: inline-block;
          }
        }
        .openboxcode_h {
          height: 130px;
        }
      }
    }
    .info {
      margin: 0 auto ;
      width: 1240px;
      height: 430px;
      &>*{
        float: left;
      }
      .flower {
        width: 472px;
        height: 435PX;
        position: absolute;
        bottom: -136px;
        pointer-events: none;
      }
      .lv {
        margin: 16px auto 0;
        span {
          color: #fef7ed;
          font-size: 30px;
          &:last-child {
            font-size: 32px;
          }
        }
      }
      .upgrade {
        margin:0 20px;

        li {
          width: 484px;
          height: 130px;
          margin-bottom: 20px;
          cursor: pointer;
          transition: all 0.2s;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .le1 {
          background: url("../../../assets/active/treasurebox/btn-1-normal.png");
          &:hover {
            background: url("../../../assets/active/treasurebox/btn-1-hover.png");
          }
        }
        .le5 {
          background: url("../../../assets/active/treasurebox/btn-5-normal.png");
          &:hover {
            background: url("../../../assets/active/treasurebox/btn-5-hover.png");
          }
        }
        .le10 {
          background: url("../../../assets/active/treasurebox/btn-10-normal.png");
          &:hover {
            background: url("../../../assets/active/treasurebox/btn-10-hover.png");
          }
        }

      }
      .violet {
        width: 358px;
        height: 430px;
        position: relative;
        text-align: center;

        background: url("../../../assets/active/treasurebox/curbg.png")
      }
      .level {
        .curh {
          width: 250px;
          height: 204px;
          position: absolute;
          left: calc(~"50% - 125px");
          top:47px;
          background: url("../../../assets/active/treasurebox/curh.png")
        }
        .leitem {
          position: absolute;
          width: 100%;
          height: 100%;
          top:0;
          left: 0;

          align-items:center;
          .btn {
            margin: 130px auto 0;
            a {
              width: 100%;
              height: 100%;
              display: inline-block;
              text-align: center;
            }
          }
        }
        .flower {
          left: -139px;
          background: url("../../../assets/active/treasurebox/buy_flowers_left.png");
        }
        .debris {
          margin: 17px auto 0;
          font-size: 32px;
          color: #fef7ed;
          display: block;
        }
        .highl1 {
          .highl;
          margin: 100px auto 0;
          background-position-y:-634px;
        }
        .highr5 {
          .highr;
          margin: 121px auto 0;
          background-position-y:-819px;
        }
        .highl2 {
          .highl;
          margin: 90px auto 0;
          background-position-y:-678px;
        }

      }
      .highest  {
        .flower {
          right: -140px;
          background: url("../../../assets/active/treasurebox/buy_flowers_right.png")
        }
        .highl3 {
          .highl;
          margin: 46px auto 0;
          background-position-y: -725px;
        }
        .avatar {
            width: 171px;
            height: 170px;
            line-height: 167px;
            margin: 10px auto 0px;
            background: url("../../../assets/active/treasurebox/avatar.png");

          img {
            width: 138px;
            height: 138px;
            border-radius: 50%;
          }
        }
        .name {
          margin: -2px auto 0;
          font-size: 32px;
          color: #fef7ed;
          max-width: 200px;
          display: inline-block;
        }
      }
    }
    .prize {
      height: 245px;
      margin: 58px auto 0;
      position: relative;
      width: 1920px;
      .gocur {
        .sbg;
        width: 124px;
        height: 42px;
        margin: auto;
        cursor: pointer;
        text-align: center;
        background: url("../../../assets/active/treasurebox/btn-gocur-normal.png") no-repeat;
        &:hover {
          background: url("../../../assets/active/treasurebox/btn-gocur-hover.png") no-repeat;
        }
        span {
          font-size: 14px;
          color: #feefeb;
          line-height: 42px;
        }
      }
      .ulbox {
        width: 1695px;
        overflow: hidden;
        height: 200px;
        position: relative;
        margin: auto;
      }
      ul {
        min-width: 1695px;
        height: 160px;
        position: absolute;


        li {
          width: 113px;
          height: 160px;
          float: left;
          position: relative;


          background: url("../../../assets/active/treasurebox/position-normal.png") no-repeat;
          background-position: center;
          &:hover {
            background: url("../../../assets/active/treasurebox/position-hover.png") no-repeat;
            background-position: center;
          }
          img {
            max-width: 113px;
            max-height: 160px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
          }
          .levelnum {
            position:absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;
            color: #c194ff;
            max-width: 100px;
          }
          .levelnumbo {
            font-size: 14px;
            bottom: -27px;
          }
          .mark {
            width: 113px;
            height: 160px;
            position: absolute;
            left: 0;
            top: 0;
          }
          .questionmark{
            .mark;
            background: url("../../../assets/active/treasurebox/question.png");
            background-position: 50%;
          }
          .pastduemask {
            .mark;
            background: url("../../../assets/active/treasurebox/pastdue.png");
            background-position: 60%;
          }
          .curlevel {
            position: absolute;
            bottom: -40px;
            background: url("../../../assets/active/treasurebox/curlevel.png");
            width: 122px;
            height: 75px;
            text-align: center;
            span {
              font-size: 14px;
              color: #e9e9e9;
              &:first-child {
                margin: 20px auto 0;
                display: inline-block;
              }
            }
          }
        }
      }
      .arrow {
        width: 30px;
        height: 44px;
        position: absolute;
        z-index: 1;
        top:68px;
        cursor: pointer;
      }
      .arrowl {
        left: 37px;
        background: url("../../../assets/active/treasurebox/btn-normal-1.png");
        &:hover {
          background: url("../../../assets/active/treasurebox/btn-hover-1.png")
        }
      }
      .arrowr {
        right: 37px;
        background: url("../../../assets/active/treasurebox/btn-normal-2.png");
        &:hover {
          background: url("../../../assets/active/treasurebox/btn-hover-2.png")
        }
      }

    }
    .rules {
      width: 1240px;
      height: 580px;
      padding-top: 10px;
      box-sizing: border-box;
      position: relative;
      margin: 50px auto 0px;
      background: url("../../../assets/active/treasurebox/rule.png") no-repeat;
      background-size: 1240px 580px;
      .rowtext {
        width: 753px;
        margin:30px auto;
        >div {
          margin-right: 15px;
          float: left;

        }
        span {
          font-size: 20px;
          color: #fef7ed;
        }

        p{
          display: table;
          font-size: 14px;
          color: #fef7ed;
          line-height: 22px;
          letter-spacing: 0.7px;
        }
      }
      .highr1 {
        .highr;
         background-position-y:-424px;
      }
      .highr2 {
        .highr;
         background-position-y:-469px;
      }
      .highr3 {
        .highr;
         background-position-y:-514px;
      }
      .ruleflowerl {
        background: url("../../../assets/active/treasurebox/ruleflowerl.png");
        width: 475px;
        height: 515px;
        position: absolute;
        left: -68px;
        bottom: -53px;
      }
      .ruleflowerr {
        background: url("../../../assets/active/treasurebox/ruleflowerr.png");
        position: absolute;
        right: 3px;
        top: 0;
        width: 278px;
	      height: 464px;
      }
    }
  }
  //开箱特效
.openbgani {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  img {
      max-width: 100vw;
      max-height: 100vh;
      position: absolute;
      top:50%;
      left: 50%;
      transform-origin: 0% 0%;
      transform: translate(-50%,-50%);
    &:nth-child(1) { animation: roatateLight1 3s linear  infinite}
    &:nth-child(2) { animation: roatateLight2 3s linear infinite}
    &:nth-child(3) { animation: roatateLight3 3s linear  infinite}
    &:nth-child(4) { animation: roatateLight4 3s linear infinite}
    &:nth-child(5) { animation: roatateLight5 3s linear  infinite}
    &:nth-child(6) { animation: roatateLight6 3s linear infinite}
    &:nth-child(7) { animation: roatateLight7 3s linear infinite}
    &:nth-child(8) { animation: roatateLight8 3s linear infinite}
    &:nth-child(9) { animation: roatateLight9 3s linear infinite}
    &:nth-child(10) { animation: roatateLight10 3s linear infinite}
  }
}
@keyframes roatateLight1{
    0%{ opacity: 0.4;transform:scale(1)  rotate(0deg) translate(-50%,-50%); }
    25%{ opacity: 0.2;transform: scale(0.8) rotate(5deg) translate(-50%,-50%); }
    50%{ opacity: 0.4;transform: scale(1) rotate(0deg) translate(-50%,-50%); }
    75%{opacity: 0.2;transform: scale(0.8) rotate(5deg) translate(-50%,-50%);}
    100%{opacity: 0.4;transform: scale(1) rotate(0deg) translate(-50%,-50%);}
}
@keyframes roatateLight2{
    0%{ opacity: 0.3;transform:scale(0.8)  rotate(0deg) translate(-50%,-50%); }
    25%{ opacity: 0.5;transform: scale(1.2) rotate(5deg) translate(-50%,-50%); }
    50%{ opacity: 0.3;transform: scale(0.8) rotate(10deg) translate(-50%,-50%); }
    75%{opacity: 0.5;transform: scale(1.2) rotate(5deg) translate(-50%,-50%);}
    100%{opacity: 0.3;transform: scale(0.8) rotate(0deg) translate(-50%,-50%);}
}
@keyframes roatateLight3{
    0%{ opacity: 0.3;transform:scale(0.8)  rotate(-20deg) translate(-50%,-50%); }
    25%{ opacity: 0.3;transform: scale(1.2) rotate(-5deg) translate(-50%,-50%); }
    50%{ opacity: 0.3;transform: scale(0.8) rotate(10deg) translate(-50%,-50%); }
    75%{opacity: 0.3;transform: scale(1.2) rotate(-5deg) translate(-50%,-50%);}
    100%{opacity: 0.3;transform: scale(0.8) rotate(-20deg) translate(-50%,-50%);}
}
@keyframes roatateLight4{
    0%{ opacity: 0.2;transform:scale(0.8)  rotate(10deg) translate(-50%,-50%); }
    25%{ opacity: 0.2;transform: scale(1.2) rotate(10deg) translate(-50%,-50%); }
    50%{ opacity: 0.2;transform: scale(0.8) rotate(10deg) translate(-50%,-50%); }
    75%{opacity: 0.2;transform: scale(1.2) rotate(10deg) translate(-50%,-50%);}
    100%{opacity: 0.2;transform: scale(0.8) rotate(10deg) translate(-50%,-50%);}
}
@keyframes roatateLight5{
    0%{ opacity: 0.1;transform:scale(0.8)  rotate(-10deg) translate(-50%,-50%); }
    25%{ opacity: 0.1;transform: scale(1) rotate(0deg) translate(-50%,-50%); }
    50%{ opacity: 0.1;transform: scale(0.8) rotate(-30deg) translate(-50%,-50%); }
    75%{opacity: 0.1;transform: scale(1) rotate(-105deg) translate(-50%,-50%);}
    100%{opacity: 0.1;transform: scale(0.8) rotate(-30deg) translate(-50%,-50%);}
}
@keyframes roatateLight6{
    0%{ opacity: 0.1;transform:scale(1)  rotate(12deg) translate(-50%,-50%); }
    25%{ opacity: 0.1;transform: scale(0.8) rotate(3deg) translate(-50%,-50%); }
    50%{ opacity: 0.1;transform: scale(1) rotate(-12deg) translate(-50%,-50%); }
    75%{opacity: 0.1;transform: scale(0.8) rotate(132deg) translate(-50%,-50%);}
    100%{opacity: 0.1;transform: scale(1) rotate(68deg) translate(-50%,-50%);}
}
@keyframes roatateLight7{
    0%{ opacity: 0.1;transform:scale(0.8)  rotate(30deg) translate(-50%,-50%); }
    25%{ opacity: 0.1;transform: scale(1) rotate(-50deg) translate(-50%,-50%); }
    50%{ opacity: 0.1;transform: scale(0.8) rotate(-81deg) translate(-50%,-50%); }
    75%{opacity: 0.1;transform: scale(1) rotate(-0deg) translate(-50%,-50%);}
    100%{opacity: 0.1;transform: scale(0.8) rotate(90deg) translate(-50%,-50%);}
}
@keyframes roatateLight8{
    0%{ opacity: 0.1;transform:scale(1)  rotate(70deg) translate(-50%,-50%); }
    25%{ opacity: 0.1;transform: scale(0.8) rotate(-50deg) translate(-50%,-50%); }
    50%{ opacity: 0.1;transform: scale(1) rotate(-142deg) translate(-50%,-50%); }
    75%{opacity: 0.1;transform: scale(0.8) rotate(-50deg) translate(-50%,-50%);}
    100%{opacity: 0.1;transform: scale(1) rotate(80deg) translate(-50%,-50%);}
}
@keyframes roatateLight9{
    0%{ opacity: 0.1;transform:scale(0.8)  rotate(90deg) translate(-50%,-50%); }
    25%{ opacity: 0.1;transform: scale(1) rotate(40deg) translate(-50%,-50%); }
    50%{ opacity: 0.1;transform: scale(0.8) rotate(10deg) translate(-50%,-50%); }
    75%{opacity: 0.1;transform: scale(1) rotate(20deg) translate(-50%,-50%);}
    100%{opacity: 0.1;transform: scale(0.8) rotate(30deg) translate(-50%,-50%);}
}
@keyframes roatateLight10{
    0%{ opacity: 0.2;transform:scale(1)  rotate(-30deg) translate(-50%,-50%); }
    25%{ opacity: 0.2;transform: scale(0.8) rotate(-50deg) translate(-50%,-50%); }
    50%{ opacity: 0.2;transform: scale(1) rotate(10deg) translate(-50%,-50%); }
    75%{opacity: 0.2;transform: scale(0.8) rotate(0deg) translate(-50%,-50%);}
    100%{opacity: 0.2;transform: scale(1) rotate(26deg) translate(-50%,-50%);}
}
.snowflakebox {
      width: 800px;
    height: 700px;
    position: fixed;
    z-index: 1;
    overflow: hidden;
    left: calc(50% - 400px);
    top: calc(50% - 350px);
}
.snowflake{
    position: absolute;
    bottom:-10%;
    z-index:9999;
    bottom: -30px;
    color: #ffe685;
    -webkit-user-select:none;-moz-user-select:none;
    -ms-user-select:none;user-select:none;cursor:default;
    -webkit-animation-name:snowflakes-fall,snowflakes-shake;
    -webkit-animation-duration:3s,3s;
    -webkit-animation-timing-function:linear,ease-in-out;
    -webkit-animation-iteration-count:infinite,infinite;
    -webkit-animation-play-state:running,running;
    animation-name:snowflakes-fall,snowflakes-shake;animation-duration:3s,3s;animation-timing-function:linear,ease-in-out;animation-iteration-count:infinite,infinite;animation-play-state:running,running}
.snowflake0 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake0}
.snowflake1 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake1}
.snowflake2 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake2}
.snowflake3 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake3}
.snowflake4 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake4}
.snowflake5 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake5}
.snowflake6 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake6}
.snowflake7 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake7}
.snowflake8 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake8}
.snowflake9 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake9}
.snowflake10 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake10}
.snowflake11 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake11}
.snowflake12 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake12}
.snowflake13 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake13}
.snowflake14 {.snowflake;animation-name:snowflakes-fall,snowflakes-shake14}
@-webkit-keyframes snowflakes-fall{
    0%{bottom:-10%}100%{bottom:100%}}
@keyframes snowflakes-fall{
    0%{bottom:-10%}100%{bottom:100%}
}
 @keyframes snowflakes-shake0{0%, 100% { transform: translateX(0); } 50% { transform: translateX(19px);}}
 @keyframes snowflakes-shake1{0%, 100% { transform: translateX(0); } 50% { transform: translateX(171px);}}
 @keyframes snowflakes-shake2{0%, 100% { transform: translateX(0); } 50% { transform: translateX(113px);}}
 @keyframes snowflakes-shake3{0%, 100% { transform: translateX(0); } 50% { transform: translateX(156px);}}
 @keyframes snowflakes-shake4{0%, 100% { transform: translateX(0); } 50% { transform: translateX(184px);}}
 @keyframes snowflakes-shake5{0%, 100% { transform: translateX(0); } 50% { transform: translateX(198px);}}
 @keyframes snowflakes-shake6{0%, 100% { transform: translateX(0); } 50% { transform: translateX(67px);}}
 @keyframes snowflakes-shake7{0%, 100% { transform: translateX(0); } 50% { transform: translateX(121px);}}
 @keyframes snowflakes-shake8{0%, 100% { transform: translateX(0); } 50% { transform: translateX(131px);}}
 @keyframes snowflakes-shake9{0%, 100% { transform: translateX(0); } 50% { transform: translateX(46px);}}
 @keyframes snowflakes-shake10{0%, 100% { transform: translateX(0); } 50% { transform: translateX(39px);}}
 @keyframes snowflakes-shake11{0%, 100% { transform: translateX(0); } 50% { transform: translateX(136px);}}
 @keyframes snowflakes-shake12{0%, 100% { transform: translateX(0); } 50% { transform: translateX(165px);}}
 @keyframes snowflakes-shake13{0%, 100% { transform: translateX(0); } 50% { transform: translateX(159px);}}
 @keyframes snowflakes-shake14{0%, 100% { transform: translateX(0); } 50% { transform: translateX(106px);}}
</style>
