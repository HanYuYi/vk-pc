<template>
  <div class="register_active active_page">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="register_active_prize">
            <div class="prize_box">
              <span class="prize_desc">{{$t("Welcome_to_VKGAME_competitive_family")}}{{active1.prizePrice}}{{$t("Yuan_gift_on")}}</span>
              <router-link to="/register" class="get_prize_btn get" v-if="!islogin">{{$t("Register_now_to_receive")}}</router-link>
              <span v-else>
                <a href="javascript:;" class="get_prize_btn got" v-if="active1.gotStatus === 2">{{$t("Have_to_receive")}}</a>
               <span class="btn" v-if="active1.load"><span class="btn_loading"></span></span>
              <!--@click="handleGetPrize(active1) -->
                <a  href="javascript:;" class="btn-span get"  v-if="active1.gotStatus === 1 && !active1.load">{{$t("Go_to_the_APP_to")}}</a>
              </span>
            </div>
            <div class="prize_box">
              <span class="prize_desc">{{$t("Complete_top_up_for_the_first")}}{{active2.prizePrice}}{{$t("Yuan_gift")}}</span>
              <router-link to="/register" class="get_prize_btn get" v-if="!islogin">{{$t("Register_now_to_receive")}}</router-link>
              <span v-else>
                <a href="javascript:;" class="get_prize_btn got" v-if="active2.gotStatus === 2">{{$t("Have_to_receive")}}</a>
                <span class="btn" v-if="active2.load"><span class="btn_loading"></span></span>
                <a href="javascript:;" class="get_prize_btn get" @click="handleGetPrize(active2)"  v-if="active2.gotStatus === 1 && !active2.load">{{$t("To_pick_up")}}</a>
                <router-link to="/user/finance" class="get_prize_btn get" v-if="active2.gotStatus === 0 && !active2.load">{{$t("Top_up_immediately_to_receive")}}</router-link>
              </span>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("The_activity_time")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                {{$t("August_17_2018")}}
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Active_content")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                {{$t("Registration_is_sent")}}{{active1.prizePrice}}{{$t("Yuan_reward_and_top_up_for")}}{{active2.prizePrice}}{{$t("Yuan_reward")}}
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                <p>{{$t("After_completion_of_registration")}}{{active1.prizePrice}}{{$t("Yuan_bonuses")}}</p>
                <p>{{$t("After_completion_of_the")}}{{active2.prizePrice}}{{$t("Yuan_bonuses")}}</p>
                <p>{{$t("Receive_registration_bonuses_needs")}}</p>
                <p>{{$t("The_activity_only_apply")}}</p>
                <p>{{$t("Each_effective_player_mobile")}}</p>
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
export default {
  name: 'registeractive',
  components: {},
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.loadPrizeStatus ()
    })
  },
  created () {

  },
  data() {
    return {
      active1:{
        id: '',
        prizePrice: '',
        gotStatus: '',
        load: false
      },
      active2:{
        id: '',
        prizePrice: '',
        gotStatus: '',
        load: false
      },
      islogin: false
    }
  },
  methods: {
    loadPrizeStatus () {
      this.$http(this.ApiSetting.active.register.getPrizeStatus)
        .then((res) => {
           if(res.status === 1){
             this.islogin = res.data.is_login
             this.active1.id = res.data.active_ids[0]
             this.active1.prizePrice = res.data.prize_arr[0]
             this.active1.gotStatus = res.data.get_arr[0]
             this.active2.id = res.data.active_ids[1]
             this.active2.prizePrice = res.data.prize_arr[1]
             this.active2.gotStatus = res.data.get_arr[1]
           }
        })
    },
    handleGetPrize (x) {
       let data = {
         active_id: x.id
       }
       x.load = true
        this.$http(this.ApiSetting.active.register.getPrize, data)
          .then((res) => {
            if(res.status === 1){
              x.gotStatus = 2
              this.$message({
                message: res.message,
                type: 'success'
              })
            }
            x.load = false
        }, (err) => {
            x.load = false
          })

    }
  }
}
</script>
<style scoped>
.register_active{
  background: url("../../../assets/active/registeractive/banner.jpg") no-repeat center top;
}
.register_active_prize{
  width: 580px;
  margin: 0 auto 30px;
}
.register_active_prize .prize_box{
  height: 80px;
  line-height: 80px;
  color: #fff;
  font-size: 18px;
}
.register_active_prize .prize_box .prize_desc{
  display: inline-block;
  width: 390px;
  vertical-align: middle;
}
.register_active_prize .prize_box .get_prize_btn{
  margin-left: 10px;
  display: inline-block;
  vertical-align: middle;
  width: 146px;
  height: 52px;
  border-radius: 30px;
  line-height: 52px;
  text-align: center;
  color: #000;
}
.register_active_prize .prize_box .get_prize_btn.got{
  background: #2f323e;
  color: #4e5265;
  cursor: default;
}
.register_active_prize .prize_box .get_prize_btn.get{
  background: url("../../../assets/active/newplayerwelfare/active_icon_bg.png") no-repeat;
  background-position: -1401px  -242px;
}
.register_active_prize .prize_box .get_prize_btn.get:hover{
  color: #fff;
  background-position: -1401px  -304px;
}
.register_active_prize .prize_box .btn{
  display: inline-block;
  width: 100px;
  text-align: center;
}
.btn-span {
width: 146px;
display: inline-block;
text-align: center;
margin-left: 10px;
color: #07f1b7;

}
.btn-span:hover {
color: #fff;
}
</style>
