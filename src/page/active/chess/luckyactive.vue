<template>
  <div class="lucky_active active_page">
    <div class="to_play_ag active_page_top_btn">
      <router-link to="/luckygame" class="ag_btn active_page_btn"></router-link>
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
                {{$t("August_13_2018")}}
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Active_content")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                {{$t("All_participating_VKGAME_AG_bets")}}
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
                <p>3. {{$t("VKGAME_official_final_interpretation")}}</p>
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
  name: 'luckyactive',
  components: {},
  data () {
    return {}
  },
  methods: {}
}
</script>
<style scoped>
.lucky_active{
  background: url("../../../assets/active/lucky/banner.jpg") no-repeat center top;
  padding-top:580px;
}
.to_play_ag{
  text-align: center;
}
.to_play_ag .ag_btn{
  display: inline-block;
  width: 340px;
  height: 140px;
  background: url("../../../assets/luckyChess/sprite.png") no-repeat center;
  background-position: -135px -174px;
}
.to_play_ag .ag_btn:hover{
  background-position: -133px -22px;
}
</style>
