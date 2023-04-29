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
        <ul class="lit_img">
          <li class="img_one">
            <div class="mask">
              <span class="m_t">Sic Bo</span>
              <img src="../../assets/pt/scibo_m.png" alt="">
              <span>骰宝</span>
            </div>
          </li>
          <li class="img_two">
            <div class="mask">
              <span class="m_t">Baccarat</span>
              <img src="../../assets/pt/baijia_m.png" alt="">
              <span>百家乐</span>
            </div>
          </li>
          <li class="img_three">
            <div class="mask">
              <span class="m_t">Black Jack</span>
              <img src="../../assets/pt/21_m.png" alt="">
              <span>二十一点</span>
            </div>
          </li>
          <li class="img_four">
            <div class="mask">
              <span class="m_t">Roulette</span>
              <img src="../../assets/pt/lunpan_m.png" alt="">
              <span>轮盘</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import MaintainPage from '@/components/maintainpage'
import { toPlayGame } from '../../utils/playGame'

export default {
  name: 'pt',
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
      ptUrl: ''
    }
  },
  methods: {
    loadAgUrl () {
      this.showMain = true
      this.showMaintainPage = false
      this.ptUrl = ''
      this.$http(this.ApiSetting.index.getPtUrl)
        .then((res) => {
          if(res.status === 1){
            this.ptUrl = res.data.url
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
    handleJumpLink () {
      toPlayGame(this.ptUrl)
    }
  }
}
</script>
<style scoped>
  .ag_wrapper .banner{
    background: url("../../assets/pt/banner.jpg") no-repeat top center;
    height: 820px;
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
    width: 364px;
    height: 130px;
    line-height: 130px;
    text-align: center;
    bottom: 290px;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    background:url("../../assets/pt/join_btn.png") no-repeat center;
    background-size: 100% 100%;
  }
  .ag_wrapper .banner .join_btn:hover{
    background:url("../../assets/pt/btn_hover.png") no-repeat center;
    background-size: 100% 100%;
  }
  .ag_wrapper .banner .join_btn a{
    display: inline-block;
    vertical-align: middle;
    width: 272px;
    height: 70px;
  }
  .lit_img {
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 1665px;
  }
  .lit_img li {
    float: left;
    width: 390px;
    height: 254px;
    margin-right: 35px;
    position: relative;
  }
  .lit_img li:last-child {
    margin-right: 0;
  }
  .lit_img li:hover .mask{
    opacity: 1;
  }
  .lit_img li.img_one {background:url("../../assets/pt/scibo.png") no-repeat;}
  .lit_img li.img_two {background:url("../../assets/pt/baijia.png") no-repeat;}
  .lit_img li.img_three {background:url("../../assets/pt/21.png") no-repeat;}
  .lit_img li.img_four {background:url("../../assets/pt/lunpan.png") no-repeat;margin-right: 0;}
  .lit_img li .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.8);
    border: solid 1px #07f1b7;
    color: #fff9f9;
    font-size: 30px;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .lit_img li .mask span {
    display: block;
  }
  .lit_img li .mask .m_t {
    font-size: 22px;
    margin-top: 50px;
  }
  .lit_img li .mask img{
    width: 112px;
    height: 76px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
</style>
