<template>
  <div class="mg_active active_page">
    <div class="to_play_mg active_page_top_btn">
      <router-link to="/mggame" class="mg_btn active_page_btn"></router-link>
    </div>
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
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
                {{$t("All_participating_VKGAME_MG_electronic")}}
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                <p>{{$t("About_1_The_return_water")}}</p>
                <p>{{$t("A_kumite_arbitrage_and")}}</p>
                <p>{{$t("If_the_bets_blackjack")}}</p>
                <p>4. {{$t("Every_player_each_mobile")}}</p>
                <p>5. {{$t("VKGAME_official_final_interpretation")}}</p>
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
  name: 'mgactive',
  components: {},
  data() {
    return {}
  },
  methods: {}
}
</script>
<style scoped>
.mg_active{
  background: url("../../../assets/active/mg/top-img.jpg") no-repeat center top;
}
.to_play_mg{
  text-align: center;
}
.to_play_mg .mg_btn{
  display: inline-block;
  width: 262px;
  height: 102px;
  background: url("../../../assets/active/mg/btn-normal.png") no-repeat center;
}
.to_play_mg .mg_btn:hover{
  background: url("../../../assets/active/mg/btn-hover.png") no-repeat center;
}
.active_home .active_page.mg_active .active_page_wrapper .wrapper{
  margin-top: 60px;
}
</style>
