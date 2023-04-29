<template>
  <div class="get_vir_money active_page">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="active_section_box">
            <div class="active_title">
              {{$t("What_is_V")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                {{$t("V_c_representing_characters_VB")}}
              </div>
            </div>
          </div>
          <div class="active_section_box get_vb">
            <div class="active_title">
              {{$t("How_to_obtain_V_coin")}}
              <div class="active_sub_title">
                {{$t("The_following_reward_for_automatic")}}
              </div>
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc clearfix">
                <div class="active_table fl">
                  <div class="t_title">{{$t("One_time_get")}}</div>
                  <div class="t_body">
                    <div class="t_row clearfix">
                      <div class="t1">
                        {{$t("methods")}}1：{{$t("Method_1_registered_gift_bag")}}
                      </div>
                      <div class="t2">
                        +<b>100</b>{{$t("The_coin")}}
                      </div>
                    </div>
                    <div class="t_row clearfix">
                      <div class="t1">
                         {{$t("methods")}}2：{{$t("Method_2_set_the_nickname")}}
                      </div>
                      <div class="t2">
                        +<b>30</b>{{$t("The_coin")}}
                      </div>
                    </div>

                    <div class="t_row clearfix">
                      <div class="t1">
                         {{$t("methods")}}3：{{$t("Method_4_setting_the_bartender")}}
                      </div>
                      <div class="t2">
                        +<b>50</b>{{$t("The_coin")}}
                      </div>
                    </div>
                    <div class="t_row clearfix">
                      <div class="t1">
                         {{$t("methods")}}4：{{$t("Method_5_Set_up_the_trading_password")}}
                      </div>
                      <div class="t2">
                        +<b>50</b>{{$t("The_coin")}}
                      </div>
                    </div>
                    <div class="t_row clearfix">
                      <div class="t1">
                         {{$t("methods")}}5：{{$t("Methods_6_binding_bank_CARDS")}}
                      </div>
                      <div class="t2">
                        +<b>100</b>{{$t("The_coin")}}
                      </div>
                    </div>
                    <div class="t_row clearfix">
                      <div class="t1">
                         {{$t("methods")}}6：{{$t("Methods_7_binding_mobile_phone")}}
                      </div>
                      <div class="t2">
                        +<b>100</b>{{$t("The_coin")}}
                      </div>
                    </div>
                    <div class="t_row clearfix">
                      <div class="t1">
                         {{$t("methods")}}7：{{$t("Methods_Create_ROLL_room")}}
                      </div>
                      <div class="t2">
                        +<b>200</b>{{$t("The_coin")}}
                      </div>
                    </div>
                    <div class="t_row clearfix">
                      <div class="t1">
                         {{$t("methods")}}8：{{$t("Methods_Users_promote_the_first_recharge")}}
                      </div>
                      <div class="t2">
                        +<b>200</b>{{$t("The_coin")}}
                      </div>
                    </div>
                    <!-- <div class="t_row clearfix">
                      <div class="t1">
                         {{$t("methods")}}9：{{$t("Methods_Users_submit_questionnaires")}}
                      </div>
                      <div class="t2">
                        +<b>666</b>{{$t("The_coin")}}
                      </div>
                    </div> -->
                  </div>
                </div>
                <div class="active_table fl">
                  <div class="t_title">{{$t("Unlimited_number_of_times")}}</div>
                  <div class="t_body">
                    <div class="t_row clearfix">
                      <div class="t1">
                        {{$t("Method_1_daily_for_the")}}
                      </div>
                      <div class="t2">
                        +<b>10</b>{{$t("The_coin")}}
                      </div>
                    </div>
                    <div class="t_row clearfix">
                      <div class="t1">
                        方法2：流水获取
                      </div>
                      <div class="t2">
                        <span class="table_desc">30流水</span>+<b>1</b>{{$t("The_coin")}}
                      </div>
                    </div>
                    <!-- <div class="t_row clearfix">
                      <div class="t1">
                        方法3：小艾彩池电竞投注10次
                      </div>
                      <div class="t2">
                        +<b>100</b>{{$t("The_coin")}}
                      </div>
                    </div>-->

                    <div class="t_row clearfix">
                      <div class="t1">
                         {{$t("methods")}}3：{{$t("Methods_Users_submit_questionnaires")}}
                      </div>
                      <div class="t2">
                        +<b>1888</b>{{$t("The_coin")}}
                      </div>
                    </div>
                    <!-- <div class="t_row clearfix">
                      <div class="t1">
                        {{$t("Method_2_top_up_at_a")}}
                      </div>
                      <div class="t2">
                        <span class="table_desc">{{$t("Top_up_amount")}}</span> x<b>0.1</b>
                      </div>
                    </div> -->
                    <div class="t_row clearfix sign_prize">
                      <div class="t1">
                        {{$t("Method_3_continuous_sign_in")}}
                      </div>
                      <div class="t2">
                        <div class="t_row_row">
                          <span class="table_desc">{{$t("On_the_first_day_in")}}</span> +<b>10</b>{{$t("The_coin")}}
                        </div>
                        <div class="t_row_row">
                          <span class="table_desc">{{$t("Check_in_for_a_second")}}</span> +<b>20</b>{{$t("The_coin")}}
                        </div>
                        <div class="t_row_row third">
                          <span class="table_desc">{{$t("And_after_check_in_every")}}</span><span class="num">+<b>30</b>{{$t("The_coin")}}</span>
                        </div>
                      </div>
                    </div>

                    <div class="t_row clearfix">
                      <div class="t1">
                        {{$t("methods")}}5：{{$t("get_vb_deposit_500")}}
                      </div>
                      <div class="t2">
                        +<b>100</b>{{$t("The_coin")}}
                      </div>
                    </div>

                    <div class="t_row clearfix">
                      <div class="t1">
                        {{$t("methods")}}6：{{$t("get_vb_deposit_1000")}}
                      </div>
                      <div class="t2">
                        +<b>20</b>{{$t("The_coin")}}
                      </div>
                    </div>

                    <div class="t_row clearfix">
                      <div class="t1">
                        {{$t("methods")}}7：{{$t("get_vb_deposit_10000")}}
                      </div>
                      <div class="t2">
                        +<b>50</b>{{$t("The_coin")}}
                      </div>
                    </div>

                    <div class="t_row clearfix" style="height: 50px;line-height: 22px;padding-top: 3px">
                      <div class="t1" style="width: 245px;white-space: normal;overflow: visible;text-align: left;">
                        {{$t("methods")}}8：{{$t("get_vb_between_two_game_500")}}
                      </div>
                      <div class="t2" style="line-height: 50px">
                        +<b>50</b>{{$t("The_coin")}}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="btn">
            <div class="to_apply d_btn normal"
            @click="$router.push('/user/task')">做任务 领V币</div>
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
  name: 'getvirmoney',
  components: {},
  data() {
      return {}
  },
  methods: {}
}
</script>
<style lang="less" scope>
.get_vir_money {
  background: url("../../../assets/active/getvirmoney-banner.jpg") no-repeat center top;
  .btn {
    text-align: center;
  }
  .active_page_wrapper {
    .active_page_content {
      padding: 30px 190px !important;
    }
  }
  .section_box_wrapper {
    text-align: center;
    .active_table {
      width: 420px;
      .t_row {
        .t1 {
          width: auto;
          float: left;
        }
        .t2 {
          width: auto;
          float: right;
        }
      }
      .sign_prize {
        height: 163px;
        .t1 {
          height: 100%;
          line-height: 204px;
        }
        .t2 {
          padding-top: 10px;
        }
      }
    }
  }
  .active_table {
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
