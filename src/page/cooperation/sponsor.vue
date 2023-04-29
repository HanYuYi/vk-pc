<template>
 <div class="sponsor">
   <div class="banner"></div>
   <!--视频-->
    <section class="section_one "
    :class="{'aos-animate':animations.one}"
    aos="fade-up">
      <div class="decorate"></div>
      <img class="title"
      src="../../assets/cooperation/sponsor/title1.png" alt="">
      <div class="sponsor_video">
        <div class="sponsor_dplayer" id="sponsor_dplayer"></div>
      </div>
    </section>

    <!--战队介绍-->
    <section class="section_two" :class="{'aos-animate':animations.two}" aos="fade-up">
      <img class="title title2" src="../../assets/cooperation/sponsor/title2.png" alt="">
      <div class="section_two_content">
        <img class="fl" src="../../assets/cooperation/sponsor/TNClogo.png" alt="">
        <div class="line fl"></div>
        <p>TNC战队全名为TNC Pro Team，成立于2013年，在2015年东南亚赛区开始崭露头角，以黑马之姿多次冲进TI，在各大国际赛事舞台上掀起一股热潮并斩获多个联赛冠军。在经历了几年的磨砺和沉淀之后，TNC现已成为东南亚赛区的头名代表战队。</p>
        <el-carousel
        :autoplay="false"
        indicator-position="none"
        class="sponsor_carousel_box fl"
        ref="sponsorCarousel"
        height="216px"
        @change="carouselChange">
            <el-carousel-item v-for="(item,index) in honorDatas" :key="index"
             class="sponsor_carousel_item">
                <div class="sponsor_carousel_content">
                  <div class="img_box fl" >
                    <img :src="item.img" alt="">
                  </div>
                  <h2 class="fl">{{item.title}}</h2>
                  <img :src="item.resultimg" alt="">
                </div>
            </el-carousel-item>
        </el-carousel>
        <div class="time-pro">
          <ul>
            <li v-for="(item,index) in times" :key="index">
              <div class="pointer" :class="{'active':index==curIndex}"
              @click="setActive(index)">
                <div class="spon"></div>
                <span>{{item.title}}</span>
                <img :src="item.hovimg" alt="">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!--战队成员-->
    <section class="section_three" :class="{'aos-animate':animations.three}"  aos="fade-up">
      <img class="title" src="../../assets/cooperation/sponsor/title3.png" alt="">
      <ul>
        <li v-for="(item,index) in members" :key="index">
          <img :src="item.img" alt="">
          <p>{{item.name}}</p>
        </li>
      </ul>
    </section>
    <!--战队图集-->
    <!-- <section class="section_four" :class="{'aos-animate':animations.four}" aos="fade-up">
      <img class="title" src="../../assets/cooperation/sponsor/title4.png" alt="">
      <vue-seamless-scroll   :data="[1,2,3,4,5,6,7,8,9,10]"
      :class-option="{direction: 2,step:0.6}"
      class="member_scroll" >
        <ul>
          <li class="img_box" v-for="item in 10" :key="item" >
            <img :src="require('../../assets/cooperation/sponsor/album/'+item+'.png')" alt="">
          </li>
        </ul>

      </vue-seamless-scroll>
    </section> -->

   <v-footer/>
 </div>
</template>

<script>
import "dplayer/dist/DPlayer.min.css";
import DPlayer from "dplayer";
import footer from '../../components/footer'

export default {
  name: "sponsor",
  components: { 'v-footer': footer },
  data() {
    return {
      imgsr:'../../assets/cooperation/sponsor/competition/',
      honorDatas:[
        {title:'ESL One Thailand 2020	',resultimg:require("../../assets/cooperation/sponsor/competition/2020-final1.png"),
        img:require("../../assets/cooperation/sponsor/competition/ESL-One-logo.png")},
        {title:'ONE Esports SEA League',resultimg:require("../../assets/cooperation/sponsor/competition/2020-final2.png"),
        img:require("../../assets/cooperation/sponsor/competition/ONE-Esports-SEA-League.png")},
        {title:'MDL Chengdu Major	',resultimg:require("../../assets/cooperation/sponsor/competition/2019-final1.png"),
        img:require("../../assets/cooperation/sponsor/competition/MDL-Chengdu-Major.png")},
        {title:'ESL One Hamburg 2019	',resultimg:require("../../assets/cooperation/sponsor/competition/2019-final1.png"),
        img:require("../../assets/cooperation/sponsor/competition/ESL-One-Hamburg-2019.png")},
        {title:'EPICENTER Major	',resultimg:require("../../assets/cooperation/sponsor/competition/2019-final3.png"),
        img:require("../../assets/cooperation/sponsor/competition/EPICENTER-Major.png")},
        {title:'ESL One Mumbai 2019	',resultimg:require("../../assets/cooperation/sponsor/competition/2019-final3.png"),
        img:require("../../assets/cooperation/sponsor/competition/ESL-One-Mumbai-2019.png")},
        {title:'WESG 2018',resultimg:require("../../assets/cooperation/sponsor/competition/2019-final1.png"),
        img:require("../../assets/cooperation/sponsor/competition/WESG-2018.png")}
      ],
      times:[
        {title:"2020年9月",hovimg:require("../../assets/cooperation/sponsor/competition/2020-9.png")},
        {title:"2020年7月",hovimg:require("../../assets/cooperation/sponsor/competition/2020-7.png")},
        {title:"2019年11月",hovimg:require("../../assets/cooperation/sponsor/competition/2019-11.png")},
        {title:"2019年10月",hovimg:require("../../assets/cooperation/sponsor/competition/2019-10.png")},
        {title:"2019年6月",hovimg:require("../../assets/cooperation/sponsor/competition/2019-6.png")},
        {title:"2019年4月",hovimg:require("../../assets/cooperation/sponsor/competition/2019-4.png")},
        {title:"2019年3月",hovimg:require("../../assets/cooperation/sponsor/competition/2019-3.png")}
      ],
      members:[
        {name:"MAVIS",img:require("../../assets/cooperation/sponsor/MAVIS.png")},
        {name:"YOWE",img:require("../../assets/cooperation/sponsor/YOWE.png")},
        {name:"CARLO",img:require("../../assets/cooperation/sponsor/CARLO.png")},
        {name:"KRISH",img:require("../../assets/cooperation/sponsor/KRISH.png")},
        {name:"BOK",img:require("../../assets/cooperation/sponsor/BOK.png")},
      ],
      curIndex:0,
      animations:{
        one:false,
        two:false,
        three:false,
        four:false
      },
      sponsorvideo:null
    };
  },
  mounted() {
    setTimeout(() => {
      this.animations.one = true
    }, 500);
    window.addEventListener('scroll', this.aninScroll,false)
    this.sponsorvideo=new DPlayer({
      container: document.getElementById("sponsor_dplayer"),
      loop: true,
      autoplay: true,
      video: {
        url: "/static/video/tnc.mp4"
      }
    });
    this.sponsorvideo.play()
  },
  destroyed () {
    window.removeEventListener('scroll', this.aninScroll)
  },
  methods: {
    aninScroll() {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      this.animations.two = scrollTop>=430?true:false;
      this.animations.three = scrollTop>=950?true:false;
      this.animations.four = scrollTop>=1420?true:false;
    },
    carouselChange(index) {
      this.curIndex = index
    },
    //点击切换跑马灯
    setActive(index) {
      this.$refs.sponsorCarousel.setActiveItem(index)
    }
  }
};
</script>

<style scoped lang="less">
.sponsor {
  background: url("../../assets/cooperation/sponsor/bg.jpg") no-repeat;
  background-size: 100vw 100vh;
  background-attachment: fixed;
  padding-top: 1px;

  .banner {
    width: 1250px;
    margin: 105px auto 0;
    height: 525px;
    background: url("../../assets/cooperation/sponsor/banner-tnc.png") no-repeat;
  }
  .title{
    width: 407px;
    display: block;
    margin: 0 auto;
    &.title2 {
      margin-top: 40px;
    }
  }
  .section_one {
    width: 1240px;
    margin: 0 auto;
    position: relative;
    .decorate {
      position: absolute;
      left: -313px;
      top:0;
      width: 126px;
      height: 874px;
      background:url("../../assets/cooperation/sponsor/decorate.png") no-repeat;
    }
    .sponsor_video {
      width: 1240px;
      height: 600px;
      margin: -70px auto 0;
      background:url("../../assets/cooperation/sponsor/videobor.png") no-repeat;
      overflow: hidden;
      .sponsor_dplayer {
        width: 676px;
        height: 380px;
        padding:4px;
        margin: 130px auto 0;
        background-image: linear-gradient(to right, #f95d50, #ffd57e);
      }
    }
  }

  .section_two {
    width: 1240px;
    height: 490px;
    margin: 0 auto;
    position: relative;
    .title {
      margin-bottom: 17px;
    }
    .section_two_content {
      overflow: hidden;
      .line {
        width: 1px;
        height: 320px;
        margin: 0 36px;
        background-image: linear-gradient(to top,rgba(90, 146, 232,0.3), rgb(90, 146, 232),rgba(90, 146, 232,0.3));
      }
      p {
        margin-top: 34px;
        font-size: 18px;
        text-align: justify;
        color: #fff;
      }
      .sponsor_carousel_box {
        width: 600px;
        height: 216px;
        .sponsor_carousel_item {
          float: left;
          .sponsor_carousel_content {
            width: 600px;
            height: 216px;
            overflow: hidden;
            .img_box {
              width: 214px;
              height: 216px;
              margin-right: 33px;
              position: relative;
              img {
                position: absolute;
                max-width: 100%;
                max-height: 100%;
                top:50%;
                left: 50%;
                transform: translate(-50%,-50%);
              }
            }
            h2 {
              width: 290px;
              font-size: 24px;
              font-weight: normal;
              color: #ffffff;
              margin-top: 70px;
              margin-bottom: 13px;
            }

          }
        }
      }
      .time-pro {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 1240px;
        &:after,&:before {
          content: "";
          position: absolute;
          width: 187px;
          height: 1px;
          top:6px;
        }
        &:before {
          left: 0;
          background-image: linear-gradient(to right,
          rgba(90, 146, 232,0.1),
          rgb(90, 146, 232));
        }
        &:after {
          right: 0;
          background-image: linear-gradient(to right,
          rgb(90, 146, 232) ,
          rgba(90, 146, 232,0.1)) ;
        }
        ul {
          width: 868px;
          margin: 0 auto;
        }
        li {
          float: left;
          width: 124px;
          height: 50px;
          position: relative;
          text-align: center;
          color: #5a92e8;
          .pointer {
            position: absolute;
            width: 70px;
            height: 40px;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            cursor: pointer;
            &:hover,&.active  {
              .spon{
                background:url("../../assets/cooperation/sponsor/ponthov.png") no-repeat;
                &:before{
                  opacity: 1;
                }
              }
              img {
                opacity: 1;
               animation: imgani 0.3s;
              }
              span {
                opacity: 0;
              }
            }
          }
          &:after,&:before {
            content: "";
            position: absolute;
            width: 56px;
            height:1px;
            top:6px;
            background-color: #5e99f1;
          }
          &:before {
            left: 0;
          }
          &:after {
            right:0;
          }
          .spon {
            width: 12px;
            height: 12px;
            margin: 0 auto;
            transition: background 0.2s;
            background:url("../../assets/cooperation/sponsor/pontnor.png") no-repeat;
            position: relative;
            &:before {
              content: "";
              position: absolute;
              top:15px;
              left: 50%;
              transform: translateX(-50%);
              width: 2px;
              height: 6px;
              background-image: linear-gradient(to top, #f95d50, #ffd57e);
              opacity: 0;
              transition:opacity 0.15s;
            }
          }
          span {
            font-weight: bold;
            text-shadow: 0 2px 0 rgba(0,0,0,0.52);
          }
          img {
           filter: drop-shadow(0 2px 0 rgba(0,0,0,0.52));
            opacity: 0;
            margin-top: -14px;
          }
        }
      }
    }
  }
  .section_three {
    margin-top: 50px;
    margin-bottom: 40px;
    .title {
      margin-bottom: 30px;
    }
    ul {
      width: 1260px;
      margin: 0 auto;
      overflow: hidden;
    }
    li {
      float: left;
      width: 262px;
      height: 373px;
      background:url("../../assets/cooperation/sponsor/member-nor.png") no-repeat;
      transition:background 0.3s;
      margin-right: -10px;
      cursor: pointer;
      &:hover {
        background:url("../../assets/cooperation/sponsor/member-hov.png") no-repeat;
        p{
          color:#f66957;
        }
      }
      img {
        margin: 30px 0 0 30px;
      }
      p {
        font-size: 27px;
        color: #b9fafd;
        text-align: center;
        line-height: 64px;
        transition:color 0.3s;
      }
    }
  }
  .section_four{
    width: 1240px;
    overflow: hidden;
    margin:40px auto 0;
    .member_scroll {
      margin: 40px 0 110px;
      width: 1240px;
      height: 155px;
      overflow: hidden;
      cursor: pointer;
    }
    ul {
      display: flex;
    }
    .img_box {
      float: left;
      width: 285px;
      height: 155px;
      background:url("../../assets/cooperation/sponsor/imgbor.png") no-repeat center center;
      background-size: 269px 155px;
      text-align: center;
      overflow: hidden;
      img {
        margin-top: 8px;
      }
    }
  }
  @keyframes imgani {
    0% {
      opacity: 0;
      transform:translateY(-10px)
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

}
</style>
<style lang="less">
  .section_one   .dplayer-controller-mask {
    bottom: 4px !important;
    width: calc(100% - 8px) !important;
  }
</style>
