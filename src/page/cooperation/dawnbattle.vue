<template>
 <div class="dawnbattle">
   <div class="banner"></div>
   <section class="section_one" :class="{'aos-animate':animations.one}" aos="fade-up">
     <div class="title">赛事<br>简介</div>
     <img src="../../assets/cooperation/dawnbattle/Battleo_Dawn_Logo.png" alt="">
     <p>威客黎明之战为亚洲DOTA2职业队伍提供了友好切磋的机会，通过本次赛事让各大职业战队在新赛季进行尝试与磨合，为全球DOTA2爱好者们带来了一场视觉盛宴！该赛事邀请12支亚洲顶级队伍，赛事总奖金为50万元，最终由来自东南亚的Major队伍Team Adroit获得总冠军。</p>
   </section>
   <section class="section_two" :class="{'aos-animate':animations.two}" aos="fade-up">
     <div class="title">比赛<br>奖金</div>
     <img src="../../assets/cooperation/dawnbattle/totalbouns.png" alt="">
     <ul class="awards">
        <li>
          <span>1ST</span><span>冠军</span><span>￥275,000</span>
        </li>
        <li>
          <span>2ND</span><span>亚军</span><span>￥135,000</span>
        </li>
        <li>
          <span>3RD</span><span>季军</span><span>￥60,000</span>
        </li>
        <li>
          <span>4TH</span><span>殿军</span><span>￥30,000</span>
        </li>
     </ul>
   </section>
   <section class="section_three" :class="{'aos-animate':animations.three}" aos="fade-up">
     <div class="title">赛事<br>赛制</div>
     <div class="rule">
       <span class="txt">小组赛</span>
       <span>：8支战队分成两组进行GSL，前两名晋级淘汰赛，后两名直接淘汰。</span>
     </div>
     <div class="rule">
       <span class="txt">淘汰赛</span>
       <span>：小组赛晋级战队与直邀战队进行八强双败淘汰赛，除总决赛为BO5以外其余BO3。</span>
     </div>
   </section>
   <section class="section_four" :class="{'aos-animate':animations.four}" aos="fade-up">
     <div class="title">参赛<br>战队</div>
     <ul class="teams">
       <li v-for="item in teams" :key="item">
        <img class="team_logo" :src="require('../../assets/cooperation/dawnbattle/teamimg/'+item+'.png')" alt="">
         <img class="team_name" :src="require('../../assets/cooperation/dawnbattle/teamname/'+item+'.png')" alt="">
       </li>
     </ul>
   </section>

   <v-footer/>
 </div>
</template>

<script>
import footer from '../../components/footer'

export default {
  name: "dawnbattle",
  components: { 'v-footer': footer },
  data() {
    return {
      teams:["Keen-Gaming","CDEC-Gaming","EHOME","Newbee","VGP","Team-Adroit",
      "Team-Amplfy","T1","FTD-Guys","Team-Serenity","SAG","iG-Vitality"],
      animations:{
        one:false,
        two:false,
        three:false,
        four:false
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.animations.one = true
    }, 500);
    window.addEventListener('scroll', this.aninScroll,false)
  },
  destroyed () {
    window.removeEventListener('scroll', this.aninScroll)
  },
  methods: {
    aninScroll() {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      this.animations.two = scrollTop>=20?true:false;
      this.animations.three = scrollTop>=640?true:false;
      this.animations.four = scrollTop>1000?true:false;
    },
  }
};
</script>

<style scoped lang="less">
.dawnbattle {
  background: url("../../assets/cooperation/dawnbattle/bg.jpg") no-repeat;
  background-size: 100vw 100vh;
  background-attachment: fixed;
  padding-top: 1px;
  .banner {
    width: 691px;
    margin: 135px auto 0;
    height: 236px;
    background: url("../../assets/cooperation/dawnbattle/txt.png") no-repeat;
  }
  .title {
    width: 1220px;
    height: 109px;
    margin:60px auto 0;
    background:url("../../assets/cooperation/dawnbattle/titlebg.png") no-repeat;
    padding-top: 23px;
    text-align: center;
    font-size: 23px;
    font-weight: bold;
    color: #07f1b7;
  }
  .section_one {
    text-align: center;
    font-size: 18px;
    color:#fff;
    p {
      text-indent: 2em;
      width: 770px;
      margin: 0 auto;
      line-height: 1.6;
      text-align: justify;
    }
  }
  .section_two {
    text-align: center;
    .title {
      margin-top: 34px;
      margin-bottom: 30px;
    }
    .awards {
      width: 781px;
      margin: 26px auto 0;
      height: 349px;
      background:url("../../assets/cooperation/dawnbattle/bor.png") no-repeat;
      padding: 40px 0 ;
      box-sizing: border-box;
      li {
        width: 760px;
        margin: 0 auto;
        height: 66px;
        cursor: pointer;
        font-size: 28px;
        line-height: 66px;
        font-weight: bold;
        color: #e1e1e1;
        padding-left: 20px;
        box-sizing: border-box;
        &:hover {
          color: #07f1b9;
          background:url("../../assets/cooperation/dawnbattle/bouns_hover.png") no-repeat center center;
          background-size: 760px 56px;
        }
        span {
          display: inline-block;
          &:first-child {
            width: 64px;
            text-align: left;
          }
          &:nth-child(2) {
            width: 250px;
            text-align: center;
          }
          &:last-child {
            width: 150px;
            text-align: left;
          }
        }
      }
    }
  }
  .section_three {
    color:#fff;
    font-size: 18px;
    text-align: center;
    .title {
      margin-bottom: 10px;
    }
    .rule {
      width: 770px;
      margin: 0 auto;
      height: 30px;
      text-align: left;
      &:last-child {
        margin-top: 20px;
      }
    }
    .txt {
      width: 84px;
      display: inline-block;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 5px;
      font-size: 22px;
      font-weight: bold;
      color: #1e3259;
      vertical-align: middle;
      background-image: linear-gradient(to right, #07f1b7, #07e9f1);
      transform:translate(0,0,0);
      transition:all 0.3s;
      cursor: pointer;
      &:hover {
        background-image: linear-gradient(to right, #ff8e00, #ff6100);
      }
    }
  }
  .section_four {
    .title {
      margin: 50px auto 30px;
    }
    .teams {
      overflow: hidden;
      width: 1320px;
      margin:0 auto;
      li {
        float: left;
        width: 220px;
        height: 230px;
        text-align: center;
        box-sizing: border-box;
        background:url("../../assets/cooperation/dawnbattle/team-nor.png") no-repeat center top;
        background-size: 156px 156px;
        transition: background 0.3s;
        &:hover {
          background:url("../../assets/cooperation/dawnbattle/team-hov.png") no-repeat center top;
          background-size: 156px 156px;
        }
        .team_logo {
          width: 156px;
          margin: 0 auto;
          display: block;
          cursor: pointer;
          transition: transform 0.3s;
          &:hover {
            transform:scale(0.9)
          }
        }
        .team_logo:hover + .team_name {
          opacity: 1;
        }
        .team_name {
          display: inline-block;
          margin-top: 10px;
          opacity: 0;
          transition: opacity 0.2s;
        }
      }
    }
  }
}
</style>
