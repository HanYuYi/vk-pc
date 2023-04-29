<template>
  <div class="ag_wrapper" :class="{'inner_page': showMaintainPage}">
    <div class="wrapper" v-if="showMaintainPage">
      <MaintainPage :time="maintainTime" :content="maintainText"></MaintainPage>
    </div>
    <div class="ag_wrapper_main" v-if="showMain">
      <div class="banner">
        <div class="join_btn">
          <a href="javascript:;" @click="handleJumpLink"></a>
        </div>
        <p class="ag_tips">{{$t("All_the_roulette_game_niuniu")}}</p>
      </div>
      <div class="feature_list">
        <div class="lists">
          <div v-for="(item,index) in featureList" :key="index" :class="item.className" @mouseover.stop="showHover(index)"></div>
        </div>
        <div class="hover_list l1" :class="{'show':currentIndex==1}" @mouseout="hideHover()" @mouseover.stop="handleHover($event)">
          <div class="list_wrapper">
            <div class="title"></div>
            <div class="splitter"><span></span></div>
            <div class="list_text">
              <p>{{$t("Contains_flagship_hall_being_the")}}</p>
              <div class="ag_game_type clearfix">
                <div class="game_type_box g1">
                  <i class="icon"></i><span>{{$t("Classic_baccarat")}}</span>
                </div>
                <div class="game_type_box g2">
                  <i class="icon"></i><span>{{$t("Coldness_baccarat")}}</span>
                </div>
                <div class="game_type_box g3">
                  <i class="icon"></i><span>{{$t("Insurance_baccarat")}}</span>
                </div>
                <div class="game_type_box g4">
                  <i class="icon"></i><span>{{$t("The_tiger")}}</span>
                </div>
                <div class="game_type_box g5">
                  <i class="icon"></i><span>{{$t("roulette")}}</span>
                </div>
                <div class="game_type_box g6">
                  <i class="icon"></i><span>{{$t("Dice_the_treasure")}}</span>
                </div>
                <div class="game_type_box g7">
                  <i class="icon"></i><span>{{$t("Niuniu")}}</span>
                </div>
                <div class="game_type_box g8">
                  <i class="icon"></i><span>{{$t("More_than_one")}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hover_list l2" :class="{'show':currentIndex==2}" @mouseout.stop="hideHover()" @mouseover.stop="handleHover($event)">
          <div class="list_wrapper">
            <div class="title"></div>
            <div class="splitter"><span></span></div>
            <div class="list_text">
              <p>{{$t("VIP_can_control_the_rhythm")}}</p>
              <div class="ag_game_type clearfix">
                <div class="game_type_box g1">
                  <i class="icon"></i><span>{{$t("Classic_baccarat")}}</span>
                </div>
                <div class="game_type_box g9">
                  <i class="icon"></i><span>{{$t("Mi_interactive_baccarat")}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hover_list l3" :class="{'show':currentIndex==3}" @mouseout="hideHover()"  @mouseover.stop="handleHover($event)">
          <div class="list_wrapper">
            <div class="title"></div>
            <div class="splitter"><span></span></div>
            <div class="list_text">
              <p>{{$t("AG_real_video_game_built")}}</p>
            </div>
          </div>
        </div>
        <div class="hover_list l4" :class="{'show':currentIndex==4}" @mouseout="hideHover()"  @mouseover.stop="handleHover($event)">
          <div class="list_wrapper">
            <div class="title"></div>
            <div class="splitter"><span></span></div>
            <div class="list_text">
              <p>{{$t("Support_iOS_Android_and_Web")}}</p>
              <div class="platform_list clearfix">
                <div class="list_box ios">
                  <i class="icon"></i><span>iOS</span>
                </div>
                <div class="list_box android">
                  <i class="icon"></i><span>Android</span>
                </div>
                <div class="list_box web">
                  <i class="icon"></i><span>Web</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import MaintainPage from '@/components/maintainpage'
import { toPlayGame } from '../../utils/playGame'

export default {
  name: 'ag',
  components: {
    MaintainPage
  },
  created () {
   /* this.loadAgUrl ()*/
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.loadAgUrl ()
    })
  },
  data () {
    return {
      maintainTime: '',
      maintainText: '',
      showMaintainPage: false,
      showMain: true,
      featureList: [
        {
          className:'f1'
        },
        {
          className:'f2'
        },
        {
          className:'f3'
        },
        {
          className:'f4'
        }
      ],
      currentIndex: '',
      hoverTimer: null,
      agUrl: ''
    }
  },
  methods: {
    loadAgUrl () {
      this.showMain = true
      this.showMaintainPage = false
      this.agUrl = ''
      this.$http(this.ApiSetting.index.getAgUrl)
        .then((res) => {
          if(res.status === 1){
            this.agUrl = res.data.url
          }else {
            if(res.is_maintain === 1){
              this.showMain = false
              this.showMaintainPage = true
              this.maintainTime = res.message
              this.maintainText = res.info
            }
          }
        })
    },
    showHover (x) {
      clearTimeout(this.hoverTimer);
      this.currentIndex = x + 1;
    },
    hideHover () {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = setTimeout(() =>{
        this.currentIndex = ''
      },200)
    },
    handleHover () {
      clearTimeout(this.hoverTimer);
    },
    handleJumpLink () {
      toPlayGame(this.agUrl)
    }
  }
}
</script>
<style scoped>
  .ag_wrapper .banner{
    background: url("../../assets/ag/banner.jpg") no-repeat top center;
    height: 856px;
    position: relative;
  }
  .ag_wrapper .banner .ag_tips {
    text-align: center;
    position: absolute;
    width: 100%;
    bottom: 16px;
    color: #fff;
    font-size: 14px;
  }
  .ag_wrapper .banner .join_btn{
    width: 346px;
    height: 144px;
    line-height: 140px;
    text-align: center;
    bottom: 10px;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    background:url("../../assets/ag/join_btn.png") no-repeat center;
  }
  .ag_wrapper .banner .join_btn:hover{
    background:url("../../assets/ag/btn_hover.png") no-repeat center;
  }
  .ag_wrapper .banner .join_btn a{
    display: inline-block;
    vertical-align: middle;
    width: 272px;
    height: 70px;
  }
  .ag_wrapper .feature_list{
    position: relative;
    height: 220px;
    box-sizing: border-box;
    border: 1px solid #1aae8c;
  }
  .ag_wrapper .feature_list .lists{
    width: 100%;
    height: 100%;
  }
  .ag_wrapper .feature_list .lists>div{
    float: left;
    width: 25%;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid #1aae8c;
  }
  .ag_wrapper .feature_list .lists .f1{
    background: url("../../assets/ag/1.png") no-repeat -1px center;
  }
  .ag_wrapper .feature_list .lists .f2{
    background: url("../../assets/ag/2.png") no-repeat -1px center;
  }
  .ag_wrapper .feature_list .lists .f3{
    background: url("../../assets/ag/3.png") no-repeat -1px center;
  }
  .ag_wrapper .feature_list .lists .f4{
    background: url("../../assets/ag/4.png") no-repeat -1px center;
  }
  .feature_list  .hover_list{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: none;
    justify-content: center;
    align-items: center;
    background-color:rgba(0,0,0,0.9) ;
    color: #fff;
  }
  .feature_list  .hover_list.show{
    display: flex;
  }
  .feature_list  .hover_list .list_wrapper{
    width: 1010px;
    height: 100px;
    font-size: 14px;
  }
  .feature_list  .hover_list .list_wrapper p{
    font-size: 18px;
    line-height: 28px;
  }
  .feature_list  .hover_list.l3 .list_wrapper p{
    padding-top: 10px;
  }
  .feature_list  .hover_list.l4 .list_wrapper p{
    padding-top: 6px;
  }
  .feature_list  .hover_list .list_wrapper>div{
    float: left;
    height: 100%;
  }
  .feature_list  .hover_list .list_wrapper .title{
    width: 134px;
  }
  .feature_list  .hover_list.l1 .list_wrapper .title{
    background: url("../../assets/ag/top_text.png") no-repeat center;
  }
  .feature_list  .hover_list.l2 .list_wrapper .title{
    background: url("../../assets/ag/vip_text.png") no-repeat center;
  }
  .feature_list  .hover_list.l3 .list_wrapper .title{
    background: url("../../assets/ag/anchor_text.png") no-repeat center;
  }
  .feature_list  .hover_list.l4 .list_wrapper .title{
    background: url("../../assets/ag/play_text.png") no-repeat center;
  }
  .feature_list  .hover_list .list_wrapper .splitter{
    width: 122px;
    text-align: center;
    height: 100px;
    line-height: 100px;
  }
  .feature_list  .hover_list .list_wrapper .list_text{
    width: 754px;
  }
  .feature_list  .hover_list .list_wrapper .splitter span{
    display: inline-block;
    width: 6px;
    height: 80px;
    vertical-align: middle;
    background:url("../../assets/ag/icon.png") no-repeat;
    background-position: -225px 0;
  }
  .feature_list  .hover_list .list_wrapper .ag_game_type{
    width: 580px;
  }
  .feature_list  .hover_list .list_wrapper .ag_game_type{
    margin-top: 18px;
  }
  .feature_list  .hover_list .list_wrapper .game_type_box{
    width:142px ;
    height: 32px;
    line-height: 32px;
    float: left;
    display: flex;
    align-items: center;
  }
  .feature_list  .hover_list .list_wrapper .game_type_box i{
    display: inline-block;
    width: 23px;
    margin-right: 10px;
    height: 23px;
    background: url("../../assets/ag/icon.png") no-repeat;
  }
  .feature_list  .hover_list .list_wrapper .game_type_box.g9 i{
    background-position: -145px 0 ;
  }
  .feature_list  .hover_list .list_wrapper .game_type_box.g1 i{
    background-position: -145px -37px ;
  }
  .feature_list  .hover_list .list_wrapper .game_type_box.g2 i{
    background-position: -145px -75px ;
  }
  .feature_list  .hover_list .list_wrapper .game_type_box.g3 i{
    background-position: -145px -212px ;
  }
  .feature_list  .hover_list .list_wrapper .game_type_box.g4 i{
    background-position: -145px -112px ;
  }
  .feature_list  .hover_list .list_wrapper .game_type_box.g5 i{
    background-position: -145px -145px ;
  }
  .feature_list  .hover_list .list_wrapper .game_type_box.g6 i{
    background-position: -144px -177px ;
  }
  .feature_list  .hover_list .list_wrapper .game_type_box.g7 i{
    background-position: -145px -247px ;
  }
  .feature_list  .hover_list .list_wrapper .game_type_box.g8 i{
    background-position: -144px -278px ;
  }
  .feature_list  .hover_list.l4 .platform_list{
    margin-top: 38px;
  }
  .feature_list  .hover_list.l4 .platform_list .list_box{
    float: left;
    margin-right: 40px;
    display: flex;
    align-items: center;
  }
  .feature_list  .hover_list.l4 .platform_list .list_box i.icon{
    display: inline-block;
    height: 24px;
    width: 24px;
    margin-right: 8px;
    background: url("../../assets/ag/icon.png") no-repeat;
  }
  .feature_list  .hover_list.l4 .platform_list .list_box.ios i{
    background-position: -72px 0;
  }
  .feature_list  .hover_list.l4 .platform_list .list_box.android i{
    background-position: -73px -38px;
  }
  .feature_list  .hover_list.l4 .platform_list .list_box.web i{
    background-position: -73px -76px;
  }

</style>
