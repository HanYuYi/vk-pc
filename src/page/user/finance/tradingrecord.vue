<template>
  <div class="trading_record finance_center_wrapper">
    <!--筛选条件-->
    <section >
      <div class="trading_filter">
        <div class="finance_form_box fl">
          <div class="box_left">{{$t("Transaction_type")}}</div>
          <div class="box_right">
            <span class="btn_loading" v-if="typeListLoadFlag"></span>
            <Select v-model="currentTradingType" class="trading_record_select" v-else>
                <Option v-for="item in tradingTypeList" :value="item.id" :key="item.id">{{ item.title }}</Option>
            </Select>
          </div>
        </div>
        <div class="finance_form_box fl margin20">
          <div class="box_left">{{$t("Transaction_status")}}</div>
          <div class="box_right">
            <Select v-model="currentTradingStatus" class="trading_record_select">
                <Option v-for="item in tradingStatusList" :value="item.id" :key="item.id">{{ item.title }}</Option>
            </Select>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="finance_form_box clearfix trading_time_filter">
        <div class="box_left">{{$t("Trading_hours")}}</div>
        <div class="box_right clearfix">
          <date-picker class="start_time fl"
                       type="date"
                       format="yyyy-MM-dd"
                       :value="initTime"
                       @on-change="setTime(1,$event)"></date-picker>
          <span class="fl to">{{$t("to")}}</span>
          <date-picker class="end_time fl"
                       type="date"
                       format="yyyy-MM-dd"
                       @on-change="setTime(2,$event)"></date-picker>
          <div class="btn fl">
            <a href="javascript:;"
          class="d_btn normal"
          @click="handleSearchRecords">
          {{$t("The_query")}}</a>
          </div>
        </div>

      </div>
    </section>
    <!--列表-->
    <section class="deposit_record user_records ">
      <div class="user_records_title">
        {{$t("Transaction_records")}} <span>{{$t("A_total_of")}}{{page.total}}{{$t("article")}}</span>
      </div>
      <div class="records_list">
        <div class="t-table">
          <div class="t-header">
            <div class="t-row clearfix">
              <div class="t1">{{$t("Serial_number")}}</div>
              <div class="t2">{{$t("Creation_time")}}</div>
              <div class="t3">{{$t("Transaction_type")}}</div>
              <div class="t4">{{$t("money")}}</div>
              <div class="t5">{{$t("The_account_balance")}}</div>
              <div class="t6">{{$t("Postscript")}}</div>
              <div class="t7">{{$t("Transaction_status")}}</div>
            </div>
          </div>
          <div class="t-body">
            <div class="btn" v-if="listLoad"><span class="btn_loading"></span></div>
            <div class="t-row clearfix" v-for="item in tradingRecordsList" :key="item.id">
              <div class="t1" :title="item.order_no">{{item.order_no}}</div>
              <div class="t2">{{item.time*1000 | formatdate('yyyy/MM/dd HH:mm:ss')}}</div>
              <div class="t3" :title="item.description">{{item.description}}</div>
              <div class="t4" :class="{'num':item.operations===1,'error':item.operations!==1 }"><span :class="{'fail': item.status === 2}"><i class="minus">- </i>{{item.amount}}</span></div>
              <div class="t5">{{item.availablebalance}}</div>
              <div class="t6" :title="item.key">{{item.key?item.key:'-'}}</div>
              <div class="t7">
                <span v-if="item.status === 1" class="success">{{$t("A_successful_deal")}}</span>
                <span v-if="item.status === 0" class="info">{{$t("Trading_in")}}</span>
                <span v-if="item.status === 2" class="error">{{$t("Transaction_failure")}}</span>
              </div>
            </div>
          </div>
        </div>
        <Page :total="page.total" :page-size="page.pagesize" :current.sync="page.currentpage" @on-change="handlePageChange($event)" class="pagination" v-if="page.total>page.pagesize"></Page>
      </div>
    </section>

  </div>
</template>
<script type="text/javascript">
import {  formatDate } from '../../../utils/util'
export default {
  name:'tradingrecord',
  components: {},
  filters: {
    formatdate (num, formate) {
      return formatDate (num, formate)
    }
  },
  created () {
    this.loadTradingTypeList ()
  },
  data() {
     return {
       typeListLoadFlag: false,
       listLoad: false,
       tradingStatusList: [
         {
           id: 0,
           title:this.$t("all")
         },
         {
           id: 1,
           title:this.$t("unfinished")
         },
         {
           id: 2,
           title:this.$t("Has_been_completed")
         }
       ],
       tradingTypeList: [ ],
       currentTradingStatus: 0,
       currentTradingType: 0,
       initTime: new Date () ,
       startTime: '',
       endTime:'',
       tradingRecordsList: [],
       page: {
         total: 0,
         pagesize: 10,
         currentpage: 1
       }
     }
  },
  methods: {
    setTime (type, date) {
      if(type === 1){
        this.startTime = date
      }else{
        this.endTime = date
      }
    },
    loadTradingTypeList () {
      this.typeListLoadFlag = true
      this.$http(this.ApiSetting.user.getTradingTypeList)
        .then((res) => {
           if(res.status === 1){
             this.tradingTypeList = res.data
           }
           this.typeListLoadFlag = false
        }, (err) => {
          this.typeListLoadFlag = false
        })
    },
    handleSearchRecords () {
      this.page.currentpage = 1
      this.loadSearchRecords()
    },
    loadSearchRecords () {
      let data = {
        page: this.page.currentpage,
        order_type: this.currentTradingType,
        status: this.currentTradingStatus,
        start_time: this.startTime ? this.startTime : new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate(),
        end_time: this.endTime
      }
      this.tradingRecordsList = []
      this.listLoad = true
      this.$http(this.ApiSetting.user.getTradingRecordList, data)
        .then((res) => {
          if(res.status === 1){
            this.page.total = res.data.count
            this.tradingRecordsList = res.data.list
          }
          this.listLoad = false
        }, (err) => {
          this.listLoad = false
        })
    },
    handlePageChange (x) {
      this.page.currentpage = x
      this.loadSearchRecords ()
    }
  }
}
</script>
<style lang="less" scoped>
 .trading_record {
   .trading_filter {
     height: 40px;
   }
  .box_left {
    width:76px;
  }
  .box_right {
    min-width: 200px;
    padding-top: 5px;
  }
  .margin20 {
    margin-left: 20px;
  }

 .trading_time_filter {
   .to {
     display: inline-block;
     height: 34px;
     line-height: 34px;
     width: 22px;
     text-align: center;
     color: #494e5f;
   }
   .btn {
     line-height: normal;
     padding-left: 20px;
   }
 }

.records_list {
  .t-body {
    min-height: 340px;
    .t-row {
      &:nth-child(odd) {
        background-color: #23262f;
      }
    }
  }
}
}
</style>
 <style lang="less">
 .trading_record_select {
   width:230px;
   .ivu-select-selected-value {
     color: #fff;
     line-height: 32px !important;
     font-size: 14px !important;
   }
   .ivu-select-selection {
     border: 1px solid #7c839f;
   }
 }
 </style>
