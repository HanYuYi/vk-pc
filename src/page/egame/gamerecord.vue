<template>
  <div class="game_record game_page">
    <div class="page_wrapper">
      <div class="title">{{$t("Transfer_record")}}</div>
      <div class="page_content">
        <div class="search_header clearfix">
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
            <a href="javascript:;" class="d_btn normal" @click="handleSearchRecords">{{$t("The_query")}}</a>
          </div>
        </div>
        <div class="record_list">
          <div class="t-table">
            <div class="t-header">
              <div class="t-row clearfix">
                <div class="t1">{{$t("The_order_no")}}</div>
                <div class="t2">{{$t("Trading_hours")}}</div>
                <div class="t3">{{$t("money")}}</div>
                <div class="t4">{{$t("Transaction_type")}}</div>
                <div class="t5">{{$t("Trade_balance")}}</div>
              </div>
            </div>
            <div class="t-body">
              <div class="loader" v-show="listLoad"><span></span></div>
              <div class="t-row clearfix" v-for="(item, index) in recordsList" :key="index">
                <div class="t1">{{item.order_id}}</div>
                <div class="t2">{{item.time*1000 | formatdate('yyyy/MM/dd HH:mm:ss')}}</div>
                <div class="t3 num">{{item.amount}}</div>
                <div class="t4">{{item.order_type}}</div>
                <div class="t5 num">{{item.availablebalance}}</div>
              </div>
            </div>
          </div>
          <div class="page_select clearfix">
            <Page :total="page.total" :page-size="page.pagesize" :current.sync="page.currentpage" @on-change="handlePageChange($event)" class="fl" v-if="page.total>page.pagesize"></Page>
            <div class="total_list fr">{{$t("A_total_of")}}<i>{{page.total}}</i>{{$t("records")}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import {  formatDate } from '../../utils/util'
export default {
    components: {},
    filters: {
      formatdate (num, formate) {
        return formatDate (num, formate)
      }
    },
    created () {
      this.loadRecords ()
    },
    data () {
      return {
        page: {
          total: 0,
          pagesize: 10,
          currentpage: 1
        },
        initTime: new Date(),
        startTime: '',
        endTime: '',
        recordsList: [],
        listLoad: false
      }
    },
    beforeCreate: function() {
      document.getElementsByTagName("body")[0].className="page";
    },
    beforeDestroy: function() {
      document.body.removeAttribute("class");
    },
    methods: {
      setTime (type, date) {
        if(type === 1){
          this.startTime = date
        }else{
          this.endTime = date
        }
      },
      handlePageChange (x) {
        this.page.currentpage = x
        this.loadRecords ()
      },
      handleSearchRecords () {
        this.page.currentpage = 1
        this.loadRecords ()
      },
      loadRecords () {
        let data = {
          start_time: this.startTime || formatDate(this.initTime, 'yyyy-MM-dd'),
          end_time: this.endTime,
          page: this.page.currentpage
        }
        this.listLoad = true
        this.recordsList = []
        this.$http(this.ApiSetting.egame.getGameRecords, data)
          .then((res) => {
            if(res.status === 1){
              this.page.total = res.data.total
              this.recordsList = res.data.list
            }
            this.listLoad = false
        }, (err) => {
            this.listLoad = false
          })
      }
    }
}
</script>
<style scoped>
.game_record{
  width: 868px;
}
.t-table .t-body .t-row{
  font-size: 14px;
  overflow: hidden;
}
.t-table .t-row .t1{
  width: 200px;
}
.t-table .t-row .t2{
  width: 180px;
}
.t-table .t-row .t3{
  width: 96px;
  text-align: right;
}
.t-table .t-row .t4{
  width: 200px;
  box-sizing: border-box;
  padding-left: 70px;
}
.t-table .t-row .t5{
  width: 110px;
  text-align: right;
}

</style>
