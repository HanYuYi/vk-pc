<template>
  <div class="trading_record vbdetail">
    <div class="finance_center_wrapper">
      <div class="finance_form_box clearfix trading_time_filter">
        <div class="box_left">
          {{$t("Trading_hours")}}
        </div>
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
          <div class="btn fl"><a href="javascript:;" class="d_btn normal" @click="handleSearchRecords">{{$t("The_query")}}</a></div>
        </div>
      </div>
    </div>
    <div class="deposit_record user_records">
      <div class="finance_center_wrapper">
        <div class="user_records_title">
          {{$t("vbdetail")}} <span>{{$t("A_total_of")}}{{page.total}}{{$t("article")}}</span>
        </div>
        <div class="records_list">
          <div class="t-table">
            <div class="t-header">
              <div class="t-row clearfix">
                <div class="t1">{{$t("Serial_number")}}</div>
                <div class="t2">{{$t("Creation_time")}}</div>
                <div class="t3 ">{{$t("incomings_outgoings")}}</div>
                <div class="t6">{{$t("vbbalance")}}</div>
                <div class="t5">{{$t("particulars")}}</div>
              </div>
            </div>
            <div class="t-body">
              <div class="btn" v-if="listLoad"><span class="btn_loading"></span></div>
              <div class="t-row clearfix" v-for="item in tradingRecordsList" :key="item.id">
                <div class="t1">{{item.order_no}}</div>
                <div class="t2">{{item.time*1000 | formatdate('yyyy/MM/dd HH:mm:ss')}}</div>
                <div class="t3"   :class="{'num':item.type!=2,'error':item.type==2 }">
                  <i class="minus">- </i>
                  {{item.type==2?formatNumberSplit(item.amount):"+"+formatNumberSplit(item.amount)}}
                </div>
                <div class="t6" >{{formatNumberSplit(item.balance)}}</div>
                <div class="t5" :title="item.description">{{item.description}}</div>
              </div>
            </div>
          </div>
          <Page :total="page.total" :page-size="page.pagesize" :current.sync="page.currentpage" @on-change="handlePageChange($event)" class="pagination" v-if="page.total>page.pagesize"></Page>
        </div>
      </div>

    </div>
  </div>
</template>
<script type="text/javascript">
import {  formatDate ,formatNumberSplit} from '../../../utils/util'
export default {
  name:'vbdetail',
  components: {},
  filters: {
    formatdate (num, formate) {
      return formatDate (num, formate)
    }
  },
  created () {
  },
  data() {
     return {
       listLoad: false,
       tradingTypeList: [ ],
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
    formatNumberSplit(num) {
      let str = formatNumberSplit(num)
      return  str.substring(0,str.length-3)
    },
    setTime (type, date) {
      if(type === 1){
        this.startTime = date
      }else{
        this.endTime = date
      }
    },
 
    handleSearchRecords () {
      this.page.currentpage = 1
      this.loadSearchRecords()
    },
    loadSearchRecords () {
      let data = {
        page: this.page.currentpage,
        start_time: this.startTime ? this.startTime : new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate(),
        end_time: this.endTime
      }
      this.tradingRecordsList = []
      this.listLoad = true
      this.$http(this.ApiSetting.user.getVcoinList, data)
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
<style scoped>
.trading_record  .finance_center .finance_form_box .box_left{
  width: 72px;
}
.trading_filter .filter_box{
 /* width: 300px;*/
  margin-right: 30px;
}
.trading_filter .filter_box .box_left,.trading_record .trading_time_filter .box_left {
  width: 76px;
}
.trading_filter .filter_box .box_right{
  /*min-width: 100px;*/
}
.trading_filter .filter_box .box_right label{
 /* display: block;*/
  margin-right: 40px;
}

.trading_time_filter .to{
  display: inline-block;
  height: 34px;
  line-height: 34px;
  width: 22px;
  text-align: center;
  color: #494e5f;
}
.trading_time_filter .box_right{
  padding-top: 5px;
}
.trading_time_filter .btn{
  line-height: normal;
  padding-left: 20px;
}
.deposit_record .finance_center_wrapper .records_list .t-body{
  min-height: 340px;
}
.deposit_record .finance_center_wrapper .records_list .t-body .t-row:nth-child(odd){
  background-color: #23262f;
}
.vbdetail .records_list .t-row .t1 {width: 190px;}
.vbdetail .records_list .t-row .t3 {width: 100px;text-align: right;}
.vbdetail .records_list .t-row .t5 {width: 250px;text-align: left;}
.vbdetail .records_list .t-row .t4 {text-align: center;}
.vbdetail .records_list .t-row .t6 {width: 110px;}
</style>
<style>
  .trading_filter .filter_box .box_right label .ivu-radio{
    margin-right: 10px;
  }
</style>
