<template>
  <div class="coursedetail">
    <div class="content">
      <section class="baseinfo" >
        <div class="con_status"  :class="{'before': parseInt(matchInfo.status) ==0,'gameing':parseInt(matchInfo.status) ==1,'end':parseInt(matchInfo.status) ==2}"></div>
        <div v-lazy-container="lazyPack244" >
          <img  class="banner" :data-src="matchInfo.match_logo" alt="" onerror="this.src='/pc_static/defaultimg/pack_244.png';this.onerror=null">
        </div>
        <div class="con_info">
          <ul>
            <li class="mid_w"><span class="info_tit ellips" :class="matchInfo.match_name"> {{matchInfo.match_name}}</span></li>
            <li class="small_w"><span >{{matchInfo.start_time*1000 | formatdate('yyyy.MM.dd')}} {{$t('to')}} {{matchInfo.end_time*1000 | formatdate('yyyy.MM.dd')}}</span> </li>
            <li class="small_w"><span class="ellips" :title="matchInfo.match_location">{{$t('venue')}}：{{matchInfo.match_location}} </span></li>
            <li class="small_w"><span class="ellips" :title="matchInfo.match_sponsor">{{$t('sponsor')}}: {{matchInfo.match_sponsor}}</span></li>
            <li class="small_w"><span>{{$t('Total_prize_money')}}: {{matchInfo.match_bonus}}</span></li>
            <li class="large_w large_h">
              <div class="info_result" v-for="(win,index) in matchInfo.winner_info_list" :key="index" v-show="win.id!=''"  >
                <img :src="win.logo" alt="" onerror="this.src='/pc_static/defaultimg/logo_88.png';this.onerror=null">
                <span class="info_txt">{{winPlace[index]}}</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <!--参赛战队-->
      <section class="team">
        <div class="no_team" v-if="matchInfo.matchTeamList && !matchInfo.matchTeamList.length">{{$t('Temporarily_no_data')}}</div>
         <h3 v-else>{{$t('competing_teams')}}</h3>
         <ul v-if="matchInfo.matchTeamList">
           <li v-for="teamItem in matchInfo.matchTeamList" :key="teamItem.id">
             <div class="team_img">
              <img :src="teamItem.team_logo" alt="" onerror="this.src='/pc_static/defaultimg/logo_88.png';this.onerror=null"><br>
             </div>
             <span class="ellips" :title="teamItem.team_name">{{teamItem.team_name}}</span>
           </li>
         </ul>
      </section>
      <!--赛况-->
      <section class="competition" v-if=" selectedG!='' || weedoutArr.length">
        <div class="tab">
          <ul>
            <li  @click="resultItemClick(1)" v-if="selectedG!=''" class="nav_item" :class="{'selected':resultindex  == 1}">{{$t('group_stage')}}</li>
            <li  @click="resultItemClick(2)" v-if="weedoutArr.length" class="nav_item" :class="{'selected':resultindex  == 2}">{{$t('knockout_match')}}</li>
          </ul>
        </div>
        <div class="little_team" v-if="resultindex==1&&selectedG!=''&&teamG.group.length>1">
          <ul>
            <li v-for="(lTeam,index) in teamG.group" :key="lTeam" :class="{'actived':selectedG == lTeam}" @click="selectedG=lTeam">{{capitalList[index]}}{{$t("group")}}</li>
          </ul>
        </div>
        <!--小组赛-->
        <div v-if="resultindex==1&& selectedG!=''" class="group" >
          <!--左侧战队-->
          <div class="l_box">
            <ul class="l_team">
              <li>
                  <div class="first_h ">{{$t('team')}}</div>
                  <div>{{$t('success')}}</div>
                  <div>{{$t('flat')}}</div>
                  <div>{{$t('lose')}}</div>
                  <div>{{$t('integral')}}</div>
              </li>
            </ul>
            <ul class="l_team content_ul" v-if="teamG.group.length && teamG[selectedG]" :class="{'overs':teamG[selectedG]&&teamG[selectedG].rank_list&&teamG[selectedG].rank_list.length>10}">
              <li v-for="left_item in teamG[selectedG].rank_list" :key="left_item.id">
                <div class="first_h">
                  <div class="logo_img">
                    <img :src="left_item.team_logo" alt="" onerror="this.src='/pc_static/defaultimg/logo_88.png';this.onerror=null">
                  </div>
                  <span class="ellips" :title="left_item.team_name">{{left_item.team_name}}</span>
                </div>
                <div>{{left_item.victory}}</div>
                <div>{{left_item.draw}}</div>
                <div>{{left_item.failure}}</div>
                <div>{{left_item.score}}</div>
              </li>
            </ul>
          </div>
          <!--右侧赛事-->
          <div class="r_box">
            <ul class="l_team r_team">
              <li>
                  <div class="first_h edg textc">{{$t('edg')}}</div>
                  <div class="score">{{$t('score')}}</div>
                  <div class="first_h edg textc">{{$t('edg')}}</div>
                  <div>{{$t('competition_system')}}</div>
                  <div class="first_h">{{$t('Competition_time')}}</div>
              </li>
            </ul>
            <ul class="l_team r_team content_ul" v-if="matchInfo.battle_info " :class="{'overs':teamG[selectedG]&&teamG[selectedG].match_list&&teamG[selectedG].match_list.length>10}">
              <div class="no_content_ul"
              v-if="!(teamG[selectedG].match_list&&teamG[selectedG].match_list.length)">
              {{$t('Temporarily_no_data')}}</div>
              <li v-for="(right_item,index) in teamG[selectedG].match_list" :key="index">
                <div class="first_h edg" >
                  <div class="logo_img">
                    <img :src="right_item.team1.logo" alt="" onerror="this.src='/pc_static/defaultimg/logo_88.png';this.onerror=null">
                  </div>
                  <span class="ellips" :title="right_item.team1.abbr">{{right_item.team1.abbr}}</span>
                </div>
                <div class="score">{{right_item.team1.score}}-{{right_item.team2.score}}</div>
                <div class="first_h edg">
                  <div class="logo_img">
                    <img :src="right_item.team2.logo" alt="" onerror="this.src='/pc_static/defaultimg/logo_88.png';this.onerror=null">
                  </div>
                  <span class="ellips" :title="right_item.team2.abbr">{{right_item.team2.abbr}}</span>
                </div>
                <div class="ellips rules" :title="right_item.rules">{{right_item.rules}}</div>
                <div class="first_h" v-show="right_item.match_timestamp" >{{right_item.match_timestamp*1000 | formatdate('yyyy.MM.dd HH:mm')}}</div>
              </li>
            </ul>

          </div>
        </div>
        <!--淘汰赛-->
        <div v-show="resultindex==2 && weedoutArr.length" class="weedout " :style="{height:weedoutH+'px'}">
          <div class="chunk_box" :style="{width:w+'px',height:h+'px',marginTop:weedoutH/2 - h/2 +'px'}">
            <div class="chunk"
             v-for="(item,index) in weedoutArr"
             :key="index"
             :style="{top:item.top+'px',left:item.left +'px',visibility:item.ishidden?'hidden':''}"
             >
              <div class="line1" :style="{width:item.line2h?item.line1w+'px':'111px'}"></div>
              <div class="line2" :style="{height:item.line2h +'px',top:item.line2top+'px'}"></div>
              <div class="line3" :style="{top:item.line3top+'px',width:item.line2h?(item.line3w?item.line3w + 'px':'17px'):'',right:item.line3r + 'px'}"></div>
              <div class="chunk_item team1" :class="{'win':item.team1.score>item.team2.score}">
                <img :src="item.team1.logo" alt="" onerror="this.src='/pc_static/defaultimg/logo_88.png';this.onerror=null">
                <span class="ellips" :title="item.team1.abbr">{{item.team1.abbr}}</span>
                <span class="score">{{item.team1.score}}</span>
                <span style="opacity:0">dsfds</span>
              </div>
              <div class="chunk_item team2" :class="{'win':item.team1.score<item.team2.score}">
                <img :src="item.team2.logo" alt="" onerror="this.src='/pc_static/defaultimg/logo_88.png';this.onerror=null">
                <span class="ellips" :title="item.team2.abbr">{{item.team2.abbr}}</span>
                <span class="score">{{item.team2.score}}</span>
                 <span style="opacity:0">dsfds</span>
              </div>
              <div class="chunk_item start_time" v-show="item.match_timestamp"><span>{{item.match_timestamp*1000 | formatdate('yyyy-MM-dd HH:mm')}}</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {  formatDate} from '../../utils/util'
import { mapState } from 'vuex'
export default {
  name: "coursedetail",
  data() {
    return {
      winPlace:[this.$t('the_first_place'),this.$t('the_second_place'),this.$t('the_third_place'),this.$t('the_last_place')],
      capitalList:["A","B","C","D","E","F","G","H","I","J","K"],
      w:0,
      h:0,
      bh:26,
      bw :143,
      weedoutH:0,
      weedoutArr:[],
      count:0,
      resultindex:1,
      matchInfo:{},
      selectedG:'',
      teamG:{group:[]}
    };
  },
  computed: {
    ...mapState(["lazyPack244"]),
  },
  mounted() {
    this.getInfo()
    // this.initHandel(JsJson)
  },
  filters:{
    formatdate (num, formate) {
      return formatDate (num, formate)
    },
  },
  methods: {
    //请求数据
    getInfo() {
      this.$http(this.ApiSetting.getMatchInfo,{
        id:this.$route.params.id,
      })
      .then((res) => {
        if(res.status === 1 && res.data.data){
          this.matchInfo = res.data.data;

          if(this.matchInfo.battle_info && this.matchInfo.battle_info.team && this.matchInfo.battle_info.team.group && this.matchInfo.battle_info.team.group.length) {
            this.selectedG = this.matchInfo.battle_info.team.group[0];
            this.teamG = this.matchInfo.battle_info.team;
          }
          this.initHandel(res.data.data.battle_info)
          if(this.weedoutArr.length) {
            this.resultindex = 2;
          }
        }
      }, (err) => {
      })
    },
    //淘汰赛、小组赛切换
    resultItemClick(type) {
      this.resultindex = type;
    },
    initHandel(JsJson) {
      if(JsJson.lose.list.length && JsJson.win.list.length) {
        this.h = ( JsJson.lose.list[0].length  + JsJson.win.list[0].length )*80;
        this.w = (Math.max(JsJson.lose.list.length,JsJson.win.list.length) + (JsJson.final.list.length?JsJson.final.list.length:0))*this.bw;
      }else if(JsJson.lose.list.length) {
        this.h = ( JsJson.lose.list[0].length)*80;
        this.w =  (JsJson.lose.list.length  + (JsJson.final.list.length?JsJson.final.list.length:0))*this.bw;
      }else if (JsJson.win.list.length) {
        this.h = ( JsJson.win.list[0].length)*80;
        this.w = ( JsJson.win.list.length + (JsJson.final.list.length?JsJson.final.list.length:0))*this.bw;
      }
      this.weedoutH = this.h>580?this.h:580;
      let winarr = [],losearr =[]
        //败者
        let ll = JsJson.lose.list || [];
        let wl = JsJson.win.list || [];

        if(ll.length < wl.length) {
          for(let tt=ll.length;tt<wl.length ;tt++) {
            ll.unshift([{
              ishidden:true,
              team1:{id:'wu'},
              team2:{id:'wu'}
            }])
          }
        }
        for(let i=0;i<ll.length;i++) {
          let t = ll[i]
          if(i==0) {//败者组第一轮
            for(let j=0;j<t.length;j++) {
              if(j==0) {
                t[j].top = JsJson.win.list[0].length*80;
              }else {
                t[j].top = t[j-1].top + 80;
              }
              t[j].left = 0;
              let nextt = ll[i+1];
              lineCom.call(this,nextt,t,j)
            }
          }else {//败者组其他轮
            for(let m=0;m<t.length;m++) {
              let nextt = ll[i+1],prevt = ll[i-1];
              t[m].left = prevt[0].left + this.bw;
              if(t.length <prevt.length) {
                t[m].top = prevt[m*2].top + prevt[m*2].line2h + this.bh/2;
              }else if(t.length ==prevt.length) {
                t[m].top = prevt[m].top;
              }
              lineCom.call(this,nextt,t,m)
            }
          }
          losearr = losearr.concat(t)
        }
        //胜者
        for(let wi=0;wi<wl.length;wi++) {
          let wt = wl[wi];
          let firstLose = wt[0].team1.score > wt[0].team2.score?wt[0].team2:wt[0].team1;
          let filterObj = losearr.filter(item => {
            return ((item.team1.id && firstLose.id&&item.team1.id == firstLose.id) || (item.team2.id&&firstLose.id&&item.team2.id == firstLose.id))
          })
          if(filterObj.length) {
            if(wi==0) {
              for(let n0=0;n0<wt.length;n0++){
                wt[n0].left = filterObj[0].left;
                if(n0==0) {
                  wt[n0].top = 0;
                }else {
                  wt[n0].top = wt[n0-1].top + 80;
                }
                lineCom.call(this,wl[wi+1],wt,n0)
              }
            }else {
              for(let n1=0;n1<wt.length;n1++){
                wt[n1].left = filterObj[0].left;
                let  prevwt = wl[wi-1];
                if(wt.length <prevwt.length) {
                  wt[n1].top = prevwt[n1*2].top + prevwt[n1*2].line2h + this.bh/2;
                }else if(wt.length ==prevwt.length) {
                  wt[n1].top = prevwt[n1].top;
                }
                lineCom.call(this,wl[wi+1],wt,n1);
                let qw = wl[wi][0].left - wl[wi-1][0].left - this.bw + 17;
                if(wl[wi-1][n1*2]) {
                  wl[wi-1][n1*2].line3w = qw;
                  wl[wi-1][n1*2].line3r = -15-qw;
                }
                if(wl[wi-1][n1*2 +1]) {
                  wl[wi-1][n1*2 +1].line3w = qw;
                  wl[wi-1][n1*2 +1].line3r = wl[wi-1][n1*2].line3r;
                }

              }
            }
          }else {
            if(wi ==0) {
              for(let n2 =0;n2<wt.length;n2++) {
                wt[n2].left = 0;
                if(n2==0) {
                  wt[n2].top = 0;
                }else {
                  wt[n2].top = wt[n2-1].top + 80;
                }
                lineCom.call(this,wl[wi+1],wt,n2)
              }
            }else {
              for(let n3=0;n3<wt.length;n3++){
                let  prevwt = wl[wi-1];
                wt[n3].left = prevwt[0].left + this.bw;
                if(wt.length <prevwt.length) {
                  wt[n3].top = prevwt[n3*2].top + prevwt[n3*2].line2h + this.bh/2;
                }else if(wt.length ==prevwt.length) {
                  wt[n3].top = prevwt[n3].top;
                }
                lineCom.call(this,wl[wi+1],wt,n3);
                let qw = wl[wi][0].left - wl[wi-1][0].left - this.bw + 17;
                if(wl[wi-1][n3*2]) {
                  wl[wi-1][n3*2].line3w = qw;
                  wl[wi-1][n3*2].line3r = -15-qw;
                }
                if(wl[wi-1][n3*2 +1]) {
                  wl[wi-1][n3*2 +1] && (wl[wi-1][n3*2 +1].line3w = qw);
                  wl[wi-1][n3*2 +1] && (wl[wi-1][n3*2 +1].line3r = wl[wi-1][n3*2].line3r);
                }
              }
            }
          }
          winarr = winarr.concat(wt)
        }
      //决赛
      let finl =JsJson.final.list &&JsJson.final.list.length ? JsJson.final.list[0] :[];
      if(finl.length) {
         if(winarr[winarr.length-1] && losearr[losearr.length-1]) {
          let h = (losearr[losearr.length-1].top - winarr[winarr.length-1].top - this.bh)/2
          winarr[winarr.length-1].line2h = h;
          winarr[winarr.length-1].line2top = this.bh;
          winarr[winarr.length-1].line3top = this.bh + h;
          winarr[winarr.length-1].line3w = 17 + Math.abs(winarr[winarr.length-1].left - losearr[losearr.length-1].left);
          winarr[winarr.length-1].line3r = -15 - winarr[winarr.length-1].line3w;


          losearr[losearr.length-1].line2h = h;
          losearr[losearr.length-1].line2top = this.bh - h;
          losearr[losearr.length-1].line3top = this.bh - h;
          losearr[losearr.length-1].line3w = 17 + Math.abs(losearr[losearr.length-1].left - losearr[losearr.length-1].left);
          losearr[losearr.length-1].line3r = -15 - losearr[losearr.length-1].line3w;

          finl[0].left = winarr[winarr.length-1].left + winarr[winarr.length-1].line3w+ this.bw -17 ;
          finl[0].top = winarr[winarr.length-1].top + h + this.bh/2;
          finl[0].line1w = 111;
          finl[0].line2h = 0;
          finl[0].line3w = 0;
        }
        this.weedoutArr = losearr.concat(winarr,finl[0])
      }else {
        if(winarr[winarr.length-1]) {
          winarr[winarr.length-1].line2h = 0;
          winarr[winarr.length-1].line1w = 111;
          winarr[winarr.length-1].line3w = 0;
        }
        if(losearr[losearr.length-1]) {
          losearr[losearr.length-1].line2h = 0;
          losearr[losearr.length-1].line1w = 111;
          losearr[losearr.length-1].line3w = 0;
        }
        this.weedoutArr = losearr.concat(winarr)
      }

      function lineCom(nextt,t,j) {
        if(nextt && nextt.length<t.length) {
          if(j%2!=0) {
            t[j].line2h = (t[j].top - t[j-1].top - this.bh)/2;
            t[j].line2top = this.bh - t[j].line2h;
            t[j].line3top = t[j].line2top;

            t[j-1].line2h = t[j].line2h;
            t[j-1].line2top = this.bh;
            t[j-1].line3top = t[j-1].line2top + t[j-1].line2h;
          }
        }else if(nextt && nextt.length==t.length) {
          t[j].line2h = this.bh/2;
          let curwin = {}
          if(t[j].team1.id && t[j].team2.id) {
            curwin = t[j].team1.score > t[j].team2.score ?t[j].team1:t[j].team2;
          }else{
            curwin = t[j].team1.id ? t[j].team1:t[j].team2;
          }
          if(curwin.id == nextt[j].team1.id) {
            t[j].line2top = this.bh*0.5;
            t[j].line3top = t[j].line2top;
          }else if (curwin.id == nextt[j].team2.id) {
            t[j].line2top = this.bh;
            t[j].line3top = t[j].line2top + t[j].line2h;
          }
        }
      }
    },
  }
};
</script>

<style scoped lang="less">
.coursedetail {
  padding: 130px 0 80px;
  position: relative;
  background: url("../../assets/course/bg.png") no-repeat;
  background-position: center bottom;
  .no_content_ul {
    text-align: center;
    margin-top: 50px;
  }
  .content {
    width: 1240px;
    margin: auto;
  }
  .baseinfo {
    width: 1240px;
    height: 160px;
    background-color: #262933;
    padding: 15px 20px;
    box-sizing: border-box;
    position: relative;
    .banner {
      width: 240px;
      height: 130px;
      margin-right: 40px;
      float: left;
      display: block;
      border:none;
    }
    .con_info {
      width: 842px;
      float: left;
      ul {
        li {
          width: 50%;
          float: left;
          height: 25px;
          position: relative;
          margin-bottom: 14px;
          span {
            font-size: 20px;
            color: #7c839f;
            display: inline-block;
            position: absolute;
            bottom:0;
            left: 0;
          }
        }
        .large_w {
          width: 100%;
        }
        .mid_w {
          width: 560px;
          span {
            max-width: 540px;
          }
        }
        .small_w {
          width: 280px;
          max-width: 280px;
        }
        .large_h {
          height: 50px;
          margin-bottom: 0;
        }
        .info_tit {
          font-size: 24px;
          color: #ffffff;
        }
        .info_result {
          float: left;
          margin-right: 110px;
          span {
            position: relative;
            line-height: 50px;
            vertical-align: middle;
          }
          img {
            max-height: 50px;
            max-width: 50px;
            margin-right: 15px;
          }
          &:first-child {
            span {
              color: #07e9f1;
            }
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .con_status {
      position: absolute;
      top:0;
      right:0;
      width: 60px;
      height: 60px;
      z-index: 2;
      pointer-events: none;
      transform: rotateZ(90deg);
      &.gameing{
        background: url("../../assets/course/gaming.png") no-repeat;
      }
      &.before{
        background: url("../../assets/course/before.png") no-repeat;
      }
      &.end{
        background: url("../../assets/course/end.png") no-repeat;
      }
    }
  }
  .team {
    width: 100%;
    min-height: 180px;
    margin:20px 0 60px;
    box-sizing: border-box;
    padding: 40px 30px 0 70px;
    background-color: #262933;
    .no_team {
      font-size: 24px;
      margin-bottom: 40px;
      text-align: center;
      line-height: 100px;
    }
    h3 {
      font-size: 24px;
      color: #ffffff;
      margin-bottom: 50px;
      text-align: center;
    }
    ul {
      position: relative;
      overflow: hidden;
      li {
        width: 150px;
        text-align: center;
        float: left;
        margin-right: 40px;
        margin-bottom: 50px;
        .team_img {
          height: 110px;
          width: 150px;
          position: relative;
        }
        img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          max-height: 110px;
          max-width: 120px;
          margin-bottom: 10px;
        }
        span {
          font-size: 16px;
          color: #7c839f;
          max-width: 150px;
          display: inline-block;
        }
      }
    }
  }
  .competition {
    width: 100%;
    .little_team {
      width: 1240px;
      height: 54px;
      background-color: #262933;
      margin-top:2px;
      ul {
        margin-left: 14px;
        height: 32px;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        li {
          float: left;
          height: 32px;
          width: 146px;
          font-size: 20px;
          color: #c3c3c3;
          box-sizing: border-box;
          line-height: 32px;
          text-align: center;
          border-radius: 20px;
          border:1px solid transparent;
          cursor: pointer;
          &.actived {
            border:1px solid #07f1b7;
            color: #07f1b7;
          }
        }
      }
    }
    .tab {
      width: 100%;
      height: 70px;
      background-color: #262933;
      ul {
        li {
          width: 170px;
          height: 100%;
          color: #c3c3c3;
          font-size: 20px;
          line-height:70px;
          float: left;
          text-align: center;
          cursor: pointer;
          transition: bakground 0.3s;
          &.selected {
            color: #07f1b7;
            background:url("../../assets/course/selected.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .group {
      width: 100%;
      margin-top:8px;
      height: 660px;
      .l_box {
        width: 456px;
        float: left;

      }
      .l_team {
        width: 456px;
        background-color: #262933;
        overflow: hidden;
        float: left;
        &.overs {
          overflow: auto;
        }
        &.content_ul {
          height: 600px;
        }
        li {
          height: 60px;
          border-bottom: 1px solid rgba(0, 0, 0,0.25);
          padding-left: 40px;
          box-sizing: border-box;
          >div  {
            height: 60px;
            font-size: 16px;
            color: #c3c3c3;
            display: inline-block;
            width: 50px;
            text-align: center;
            line-height: 60px;
            vertical-align: middle;
          }
          .rules {
            max-width: 50px;
          }
          .first_h {
            width: 180px;
            &:first-child {
              text-align: left;
            }
            .logo_img {
              width:50px;
              height: 60px;
              position: relative;
              margin-right: 20px;
              float: left;
              img {
                position: absolute;
                top:50%;
                left: 50%;
                transform:translate(-50%;-50%);
              }
            }
            span {
              font-size: 12px;
              color: #7c839f;
              display: inline-block;
              max-width: 100px;
            }
            img {
              width: 50px;
              max-height: 50px;
            }
          }
        }
      }
      .r_box {
        width: 776px;
        float: right;
        ul + ul {
          div {
            color: #7c839f;
          }
        }
      }
      .r_box,.l_box  {
        .l_team:first-child {
          overflow: hidden;
          li {
            // border-bottom: 1px solid #000;
            .textc {
              text-align: center;
            }
          }
        }
      }
      .r_team {
        width: 776px;
        float: right;
        .score {
          // font-size: 12px;
          width: 70px;
          margin-right: 20px;
        }
        li {
          .first_h {
            width: 200px;
            &.edg {
              text-align: left;
              width: 180px;

            }

          }
        }

      }
    }
    .weedout {
      margin-top: 8px;
      width: 100%;
      background-color: #262933;
      min-height: 580px;
      padding: 40px 0;
      position: relative;
      // overflow-x: scroll;
      overflow-y: hidden;
      .chunk_box {
        margin:auto;
        position: relative;
        // border:1px solid red;
      }
      .chunk {
        height: 80px;
        position: absolute;
        width: 111px;
        .line1 {
          position: absolute;
          height: 2px;
          background-color: #51545c;
          top:26px;
          left: 0;
          width: 128px;
        }
        .line2 {
          position: absolute;
          // height: 20px;
          width: 2px;
          background-color: #51545c;
          top:26px;
          right: -17px;
        }
        .line3 {
          position: absolute;
          height: 2px;
          // width: 17px;
          background-color: #51545c;
          top: 46px;
          right: -32px;
        }
        .chunk_item {
          width: 111px;
          height: 26px;
          text-align: center;
          img {
            max-height: 25px;
            max-width: 25px;
            margin:0 5px;
          }
          span {
            line-height: 26px;
            font-size: 12px;
            color: #7c839f;
            display: inline-block;
            vertical-align: middle;
          }
          &.win {
            span {
              color: #ffffff;
            }
          }
          &.start_time {
            span {
              line-height: 20px;
            }
          }
        }
        .team1 {
          margin-bottom: 2px;
        }
        .team1,.team2 {
          background-color: #17191f;
          text-align: left;
          span {
            max-width: 40px;
            &.score {
              float: right;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
