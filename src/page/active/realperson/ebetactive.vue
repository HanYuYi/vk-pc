<template>
  <div class="ebet_active active_page">
    <div class="to_play_ebet active_page_top_btn">
      <router-link to="/sicbo" class="ebet_btn active_page_btn"></router-link>
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
                {{$t("January_25_2019")}}
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Active_content")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                {{$t("All_participating_VKGAME_eBET_bets")}}
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
                <p>2. {{$t("Every_player_each_mobile")}}</p>
                <p>{{$t("If_the_bets_roulette")}}</p>
                <p>4. {{$t("VKGAME_official_final_interpretation")}}</p>
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
  name: 'ebetactive',
  components: {},
  data() {
    return {}
  },
  methods: {}
}
</script>
<style scoped>
.ebet_active{
  background: url("../../../assets/active/ebet/top-img.jpg") no-repeat center top;
}
.to_play_ebet{
  text-align: center;
}
.active_page.ebet_active .active_page_top_btn{
  top: 544px;
}
.to_play_ebet .ebet_btn{
  display: inline-block;
  width: 225px;
  height: 91px;
  background: url("../../../assets/active/ebet/btn-normal.png") no-repeat center 5px;
}
.to_play_ebet .ebet_btn:hover{
  background: url("../../../assets/active/ebet/btn-hover.png") no-repeat center;
}
.active_home .active_page.ebet_active .active_page_wrapper .wrapper{
  margin-top: 120px;
}
</style>
