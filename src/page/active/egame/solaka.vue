<template>
  <div class="solaka active_page">
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
                {{start_time}}{{$t("rise")}}
              </div>
            </div>
          </div>

          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc" v-html="$t('solaka_rule')">
               <!-- <p>{{$t("Each_through_your_link_to")}}</p>
                <p>{{$t("Activity_bonuses_to_bind_the")}}</p>
                <p>{{$t("Invite_people_and_to_be")}}<span class="warning_color">{{$t("Level_2_or_higher")}}</span>{{$t("Each_mobile_phone_number")}}</p>
                <p>{{$t("All_use_means_of_cheating")}}</p>
                <p>5.{{$t("VKGAME_official_final_interpretation")}}</p> -->
              </div>

            </div>
          </div>

          <div class="get_box">
            <span v-show="isShowReceive" class="notenough">{{$t('Have_to_receive')}}</span>
            <span v-show="isShowNotenough" class="notenough">{{$t("solaka_text3")}}</span>
            <span v-show="isShowYuan">{{$t("solaka_text2")}}<em>{{yuan}}</em>{{$t("yuan")}}</span>
            <div v-show="isShowBtn" class="get_btn" :class="{'no_yuan':!isShowYuan}" @click="getHeadsel()"></div>
          </div>
          <div class="clear"></div>
          <div class="active_section_box">
            <div class="section_box_wrapper">
               <div class="active_desc clearfix">
                 <div class="active_table fl">
                   <div class="t_title">{{$t("solaka_text1")}}</div>
                   <div class="t_body">
                     <div class="t_row clearfix" v-for="(num,index) in setArr" :key="index">
                       <div class="t2">
                         <b>{{formatNumberSplit(index)}}</b>
                       </div>
                     </div>

                   </div>
                 </div>
                 <div class="active_table fl">
                   <div class="t_title">{{$t("Mosaic_gold")}}</div>
                   <div class="t_body">
                     <div class="t_row clearfix" v-for="num in setArr" :key="num">
                       <div class="t2">
                         <b>{{formatNumberSplit(num)}}</b>
                       </div>
                     </div>

                   </div>
                 </div>
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
import { formatNumberSplit } from '@/utils/util'
export default {
  name: 'solaka',
  components: {},
  data() {
     return {
       isShowReceive:false,
       isShowNotenough:false,
       isShowBtn:false,
       isShowYuan:false,
       start_time:"",
       yuan:0,
       setArr:{},
     }
  },
  mounted () {
    this.getBase()
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    formatNumberSplit(value) {
      let tvalue = formatNumberSplit(value)
      return tvalue.substring(0,tvalue.length-3)
    },
    getBase() {
      this.$http(this.ApiSetting.active.solaka.getBaseInfo)
      .then(res => {
        if(res.status == 1 && res.data) {
          this.setArr = res.data.setting
          let stime = new Date(res.data.start_time)
          this.start_time = stime.getFullYear() + this.$t("year") + (stime.getMonth() + 1) + this.$t("month") + stime.getDate() + this.$t("date")
          if(res.data.is_login) {
            if(res.data.is_send) {
              this.isShowReceive = true
              return
            }
            this.yuan = res.data.back
             if(res.data.back>0) {
             this.isShowBtn = true
             this.isShowYuan = true
             this.isShowNotenough = false
            }else {
             this.isShowBtn = false
             this.isShowYuan = false
             this.isShowNotenough = true
            }
          }else {
            this.isShowBtn = true
          }
        }
      })
    },
    getHeadsel() {
      if(this.isLogin){
         this.$http(this.ApiSetting.active.solaka.getHandsel)
         .then(res => {
           if(res.status == 1 && res.data) {
             this.isShowNotenough = false
             this.isShowBtn = false
             this.isShowYuan = false
             this.isShowReceive = true
              this.$message({
                message: this.$t("solaka_text4"),
                type: 'success'
              })
           }
         })
      }else{
        this.$message({
          message: this.$t("Please_login_first"),
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style lang="less" scoped >
.solaka{
  background: url("../../../assets/active/solaka/banner.jpg") no-repeat center top;
  .get_box {
    margin-bottom: 20px;
    height: 48px;
    span {
      box-sizing: border-box;
      font-size: 18px;
      color: #f4d364;
      font-weight: bold;
      float: left;
      width: 50%;
      text-align: right;
      display: block;
      padding-right: 25px;
      &.notenough {
        margin: auto;
        float: unset;
        width: auto;
        text-align: center;
        padding: 0;
      }
      em {
        font-size: 24px;
      }
    }
    .get_btn {
      float: left;
      background: url("../../../assets/active/solaka/btn-normal.png") no-repeat;
      transition: background 0.2s;
      width: 160px;
      height: 48px;
      cursor: pointer;
      &:hover {
        background: url("../../../assets/active/solaka/btn-hover.png") no-repeat;
      }
      &.no_yuan {
        margin: auto;
        float:unset;
      }
    }
  }
  .active_page_content {
    padding: 30px 232px !important;
  }
  .section_box_wrapper .active_table {
    width: 388px;
  }
  .active_section_box:nth-child(2) {
   margin-bottom: 21px !important;
  }
  .section_box_wrapper .active_table:first-child .t_row .t2 {
    width: 231px;
  }
  .section_box_wrapper .active_table:last-child .t_row .t2 {
    width: 202px;
  }
  .section_box_wrapper .active_table {
    margin-right: 0;
  }

}
</style>
