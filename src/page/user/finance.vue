<template>
  <div class="finance_center user_section">
    <h3 class="user_section_title">
      {{$t("Financial_center")}}
    </h3>
    <div class="user_section_content">
      <div class="finance_nav user_section_content_nav clearfix">
        <router-link class="nav_box" v-for="item in navDataList" 
        :to="item.url" active-class="actived" 
        :key="item.id" exact>{{item.title}}</router-link>
      </div>
      <div class="finance_content">
        <transition name="transitionRouter">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'finance',
  components: {},
  data() {
    return {
      navDataList: [
        {
          id: 1,
          title: this.$t("top_up"),
          url: '/user/finance/'
        },
        {
          id: 2,
          title: this.$t("withdrawal"),
          url: '/user/finance/withdraw'
        },
        {
          id: 3,
          title: this.$t("transfer"),
          url: '/user/finance/transfer'
        },
        // {
        //   id: 4,
        //   title: this.$t("exchange"),
        //   url: '/user/finance/exchange'
        // },
        {
          id: 5,
          title: this.$t("Transaction_records"),
          url: '/user/finance/tradingrecord'
        },
        {
          id: 6,
          title: this.$t("vbdetail"),
          url: '/user/finance/vbdetail'
        },
      ]
    }
  },
  methods: {}
}
</script>
<style>

.finance_center .finance_center_wrapper{
  padding: 20px 0 20px 60px;
}
.finance_center .finance_form_box{
  line-height: 40px;
  margin-bottom: 20px;
}
.finance_center .finance_form_box .box_left{
  color: #fff;
  font-size: 18px;
  width: 90px;
  text-align: right;
  float: left;
}
.finance_center .finance_form_box .box_right{
  min-width: 460px;
  margin-left: 20px;
  float: left;
}
.finance_center .finance_form_box .box_right .ivu-input{
  border-color: #7c839f;
  width: 230px;
}
.finance_center .finance_form_box .box_tips{
  font-size: 12px;
  /*color: #494e5f;*/
  margin-top: 5px;
  line-height: normal;
}
.finance_center .finance_form_box .box_right.bank  .ivu-radio-group{
  color: #fff;
}
.finance_center .finance_form_box .box_right.bank .ivu-radio-wrapper-checked{
  color: #fff;
}
.finance_center .finance_form_box .box_right .box_link{
  line-height: normal;
}
.finance_center .finance_form_box .box_right .box_link.l-h-30{
  line-height: 30px;
}
.deposit_record  .records_list .t-row .t1{
  width: 155px;
}
.deposit_record  .records_list .t-row .t2{
  width: 155px;
}
.deposit_record  .records_list .t-row .t3{
  width: 169px;
}
.deposit_record  .records_list .t-row .t4{
  width: 85px;
  text-align: right;
}
.deposit_record  .records_list .t-row .t5{
  width: 90px;
  text-align: center;
}
.deposit_record  .records_list .t-row .t6{
  width: 95px;
  text-align: center;
}
.deposit_record  .records_list .t-row .t7{
  width: 75px;
}
.deposit_record  .records_list .t-row .success{
  color:#07f1b7;
}
.deposit_record  .records_list .t-row .error{
  color:#e34d12;
}
.deposit_record  .records_list .t-row .minus{
  display: none;
}
.deposit_record  .records_list .t-row .error .minus{
  display: inline-block;
}
.deposit_record  .records_list .t-row .info{
  color:#07e9f1 ;
}

.deposit_record  .records_list .t-row .fail{
  text-decoration:line-through
}

</style>
