<template>
  <div class="course">
    <div class="content">
      <div class="no_data" v-show="nodata">
        <div class="no_databg"></div>
        <span>{{$t("No_betting_slots")}}</span>
      </div>
      <ul class="con_ul" v-show="recordsList.data">
        <li
         v-for="(item) in recordsList.data" :key="item.id"
         class="con_li"
         :class="{'con_li_sponsor':item.type == 1}"
         @click="toDetail(item)">
          <div
            v-show="item.type==0"
            class="con_status"
            :class="{'before': parseInt(item.status) ==0,'gameing':parseInt(item.status) ==1,'end':parseInt(item.status) ==2}">
          </div>
          <div class="con_img">
            <img :src="item.match_logo" alt="" />
            <div v-show="item.type==1" class="notice">{{$t('vk_exclusive_sponsorship')}}</div>
          </div>
          <div class="con_info">
            <ul v-if="item.type == 0">
              <li><span class="info_tit ellips" :title="item.match_name">{{item.match_name}}</span></li>
              <li><span v-show="item.start_time&&item.end_time">{{formatDate(item.start_time*1000, 'yyyy.MM.dd')}}{{$t('to')}}{{formatDate(item.end_time*1000, 'yyyy.MM.dd')}}</span> </li>
              <li><span class="ellips maxw" :title="item.match_location">{{$t('venue')}}：{{item.match_location}}</span></li>
              <li><span class="ellips maxw" :title="item.match_sponsor">{{$t('sponsor')}}：{{item.match_sponsor}}</span></li>
              <li class="large_w"><span>{{$t('Total_prize_money')}}：{{item.match_bonus}}</span></li>
              <li class="large_w large_h">
                <div class="info_result" v-for="(win,index) in item.winner_info_list" :key="index" v-show="win.id!=''">
                  <img :src="win.logo" alt="" onerror="this.src='/pc_static/defaultimg/pack_244.png';this.onerror=null">
                  <span class="info_txt">{{winPlace[index]}}</span>
                </div>
              </li>
            </ul>
            <ul v-if="item.type == 1">
              <li><span class="info_tit ellips" :title="item.match_name">{{item.match_name}}</span></li>
              <li  class="large_w"><span>{{item.match_desc}}</span></li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="page" v-if="recordsList.total>14">
        <Page
        :total="recordsList.total"
        :page-size="14"
        :current.sync="current_page"
        @on-change="getList($event)" >
        </Page>
      </div>
    </div>
  </div>
</template>

<script>
import {  formatDate} from '../../utils/util'
export default {
  name: "coursehome",
  data() {
    return {
      winPlace:[this.$t('the_first_place'),this.$t('the_second_place'),this.$t('the_third_place'),this.$t('the_last_place')],
      recordsList:{ },
      current_page:1,
      nodata:false,
    };
  },
  mounted() {
    this.getList()
  },
  activated () {
    this.getList()
  },
  methods: {
    formatDate(time,format) {
      return formatDate (time,format)
    },
    // 请求列表数据
    getList() {
      this.$http(this.ApiSetting.VkHistoryList,{
        page:this.current_page,
        limit:14,
      })
      .then((res) => {
        if(res.status === 1 && res.data.list){
          this.recordsList = res.data.list;
          if(!(this.recordsList.data && this.recordsList.data.length)) {
            this.nodata  = true;
          }
        }
        // this.listLoad = false
      }, (err) => {
        // this.listLoad = false
      })
    },
    handlePlayerPageChange() {},
    toDetail(item) {
      if(item.type == 1) {
        this.$router.push({path: `/sponsorteam/${item.id}` })
      }else if(item.type==0){
        this.$router.push({path: `/coursedetail/${item.id}`})
      }
    }
  }
};
</script>

<style scoped lang="less">
.course {
  padding: 600px 0 80px;
  position: relative;
  background-image:url("../../assets/course/bg.png"), url("../../assets/course/banner-pc.jpg") ;
  background-repeat: no-repeat,no-repeat;
  background-position:  center bottom ,center top;
  .content {
    width: 1240px;
    margin: auto;
    min-height: 1152px;
    .no_data {
      width:100%;
      height:800px;
      text-align: center;
      line-height: 50px;
      color: #484d5e;
      background-color: #17191f;
      position: relative;
      padding: 1px;
      .no_databg {
        background: url("../../assets/egame/newegame_icons.png") no-repeat;
        background-position: -50px -534px;
        width: 200px;
        height: 200px;
        margin: auto;
        margin-top: 174px
      }
    }
    .con_ul {
      width: 1240px;
      overflow: hidden;
      position: relative;
      .con_li {
        width: 610px;
        height: 160px;
        cursor: pointer;
        background-color: #262933;
        border-style: solid;
        border-width: 1px;
        // border-image-source: linear-gradient(-30deg, rgba(7, 241, 183,0.4) 0%, rgba(125, 131, 131,0.4) 100%);
        // border-image-slice: 1;
        border-color: rgba(7, 241, 183,0.4);
        box-sizing: border-box;
        padding: 15px;
        position: relative;
        margin-bottom: 20px;
        transition: border-color 0.3s;
        &:hover {
          // border-image-source: linear-gradient(-30deg, #07f1b7 0%, #07e9f1 100%);
          border-color: #07f1b7;
        }
        &:nth-child(2n) {
          float: right;
        }
        &:nth-child(2n+1) {
          float: left;
          margin-right: 20px;
        }
        &.con_li_sponsor {
          .info_tit {
            max-width: 300px !important;
          }
          .large_w {
            height: 100px !important;
            span {
              top: 50% !important;
              transform: translateY(-50%) !important;
            }
          }
        }
        .con_status {
          position: absolute;
          top:0;
          left: 0;
          width: 60px;
          height: 60px;
          z-index: 2;
          pointer-events: none;
          &.gameing{
            background: url("../../assets/course/gaming.png") no-repeat;
          }
          &.before{
            background: url("../../assets/course/before.png") no-repeat;
          }
          &.end{
            background: url("../../assets/course/end.png") no-repeat;
          }
        }
        .con_img {
          width: 240px;
          height: 130px;
          position: relative;
          margin-right: 15px;
          float: left;
          img {
            height: 130px;
            width: 240px;
          }
          .notice {
            position: absolute;
            right: 0;
            top: 0;
            width: 80px;
            height: 20px;
            background-image: linear-gradient(90deg, #f83d2c 0%, #fe5c57 100%),
              linear-gradient(#eb1e25, #eb1e25);
            background-blend-mode: normal, normal;
            border-radius: 10px 0px 10px 0px;
            font-size: 12px;
            color: #ffffff;
            text-align: center;
          }
        }
        .con_info {
          width: 322px;
          &:nth-child(2n) {
            float: right;
          }
          &:nth-child(2n+1) {
            float: left;
          }
          .maxw {
            max-width: 150px;
          }
          ul {
            li {
              width: 50%;
              float: left;
              height: 25px;
              position: relative;
              margin-bottom: 4px;
              >span {
                font-size: 14px;
                color: #7c839f;
                display: inline-block;
                position: absolute;
                bottom:0;
                left: 0;
              }
            }
            .large_w {
              width: 100%;
            }
            .large_h {
              height: 36px;
              margin-bottom: 0;
              margin-top: 7px;
            }
            .info_tit {
              font-size: 20px;
              color: #ffffff;
              max-width: 150px;
            }
            .info_result {
              float: left;
              margin-right: 16px;
              img {
                max-width: 36px;
                max-height: 36px;
                margin-right: 4px;
              }
              &:first-child {
                span {
                  color: #ffffff;
                }
              }
              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
    .page {
      width: 1240px;
      height: 72px;
      background-color: #262933;
      box-shadow: 0px 2px 50px 0px
        rgba(0, 0, 0, 0.2);
      padding-top: 1px;
      ul {
        text-align: center;
        margin-top: 5px;
      }
    }
  }
}
</style>
