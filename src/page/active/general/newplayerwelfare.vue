<template>
  <div class="newplayer_welfare active_page">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="welfare_list">
          <div class="list_box clearfix" v-for="(item, index) in welfareList" :key="index" :class="['b'+(index+1)]">
            <div class="icon_box">
            </div>
            <div class="money_num">
              X<b>{{item.vb}}</b>{{$t("The_coin")}}
            </div>
            <div class="list_box_text">
              <h4>{{item.title}}</h4>
              <p v-html="item.desc">
              </p>
            </div>
            <div class="get_prize_status">
              <span class="got_prize" v-if="item.has_get">
              </span>
              <router-link :to="item.url" class="to_get_btn" v-else>{{item.button}}</router-link>
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
export default {
  name: 'newplayerwelfare',
  components: {},
  created () {
    this.loadWelfareList ()
  },
  data () {
     return {
       welfareList: []
     }
  },
  methods: {
    loadWelfareList () {
      this.$http(this.ApiSetting.active.getNewplayerWelfareList)
        .then((res) => {
          if(res.status === 1){
            this.welfareList = res.data
          }
        })
    }
  }
}
</script>
<style scoped>
.newplayer_welfare{
  background: url("../../../assets/active/newplayerwelfare/banner.jpg") no-repeat center top;
}
.active_home .active_page.newplayer_welfare .active_page_wrapper .wrapper{
  background: none;
}
.welfare_list .list_box{
  height: 160px;
  line-height: 160px;
  margin-bottom: 20px;
  overflow: hidden;
  font-size: 18px;
  color: #c3c3c3;
  padding: 0 110px 0 60px;
  box-sizing: border-box;
  background: url("../../../assets/active/newplayerwelfare/active_icon_bg.png") no-repeat;
}
.welfare_list .list_box.b1{
  background-position: -37px -17px;
}
.welfare_list .list_box.b2{
  background-position: -37px -197px;
}
.welfare_list .list_box.b3{
  background-position: -37px -377px;
}
.welfare_list .list_box.b4{
  background-position: -37px -557px;
}
.welfare_list .list_box.b5{
  background-position: -37px -737px;
}
.welfare_list .list_box.b6{
  background-position: -37px -917px;
}
.welfare_list .list_box.b7{
  background-position: -37px -1097px;
}
.welfare_list .list_box>div{
  float: left;
  height: 100%;
}
.welfare_list .list_box .icon_box{
  width: 150px;
  background: url("../../../assets/active/newplayerwelfare/active_icon_bg.png") no-repeat;
  background-position: -1642px  0;
}
.welfare_list .list_box .money_num{
  width: 170px;
  font-family: vkFont;
  color: #f4d364;
  font-size: 24px;
}
.welfare_list .list_box .money_num b{
  font-size: 36px;
  font-weight: normal;
  margin-left: 10px;
}
.welfare_list .list_box .list_box_text{
  width: 550px;
  padding-left: 10px;
  box-sizing: border-box;
  padding-top: 32px;
  line-height: normal;
}
.welfare_list .list_box .list_box_text h4{
  font-weight: normal;
  font-size: 30px;
  height: 40px;
  line-height: 40px;
  color: #fff;
}
.welfare_list .list_box .list_box_text p{
  margin-top: 10px;
  line-height: 24px;
}
.welfare_list .list_box .get_prize_status{
  width: 200px;
  text-align: right;
}
.welfare_list .list_box .get_prize_status .got_prize{
  display: inline-block;
  width: 123px;
  height: 123px;
  vertical-align: middle;
  background: url("../../../assets/active/newplayerwelfare/active_icon_bg.png") no-repeat;
  background-position: -1411px  -17px;
}
.welfare_list .list_box .get_prize_status .to_get_btn{
  display: inline-block;
  width: 146px;
  height: 52px;
  border-radius: 30px;
  line-height: 52px;
  text-align: center;
  color: #000;
  background: url("../../../assets/active/newplayerwelfare/active_icon_bg.png") no-repeat;
  background-position: -1401px  -242px;
}
.welfare_list .list_box .get_prize_status .to_get_btn:hover{
  color: #fff;
  background-position: -1401px  -304px;
}
</style>
