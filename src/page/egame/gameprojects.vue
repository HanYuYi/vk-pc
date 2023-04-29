<template>
  <div class="game_projects game_page">
    <div class="page_wrapper">
      <div class="title">{{$t("The_game_record")}}</div>
      <!--筛选 查询-->
      <section class="search_header clearfix">
        <!-- <radio-group  v-model="currentMoneyType" size="large" class="fl">
          <radio :label="item.id" v-for="(item) in monyTypeList" :key="item.id">{{item.name}}</radio>
        </radio-group> -->
        <date-picker class="start_time fl"
                    :clearable="false"
                      type="date"
                      format="yyyy-MM-dd"
                      :value="initTime"
                      @on-change="setTime(1,$event)"></date-picker>
        <span class="fl to">{{$t("to")}}</span>
        <date-picker class="end_time fl"
                      type="date"
                      :clearable="false"
                      format="yyyy-MM-dd"
                      @on-change="setTime(2,$event)"></date-picker>
        <div class="btn fl">
          <a href="javascript:;" class="d_btn normal" @click="handleSearchProjects">{{$t("The_query")}}</a>
        </div>
      </section>
      <section class="record_list">
        <div class="list_table">
          <table   cellpadding="0" cellspacing="0">
            <thead>
            <th width="12%" class="textl">{{$t("Quizzes_note_number")}}</th>
            <th width="11%" class="textl">{{$t("Quiz_time")}}</th>
            <th width="6%">{{$t("Quizzes_type")}}</th>
            <th width="10%">{{$t("against")}}</th>
            <th width="14%">{{$t("Quizzes_for_details")}}</th>
            <th width="8%">{{$t("Just_type")}}</th>
            <th width="5%">{{$t("currency")}}</th>
            <th width="10%">{{$t("Quizzes_amount")}}</th>
            <th width="5%">{{$t("Quizzes_odds")}}</th>
            <th width="5%">{{$t("The_settlement_price")}}</th>
            <th width="8%">{{$t("The_settlement_amount")}}</th>
            <th  >{{$t("In_team_contest")}}</th>
            </thead>
            <tr class="loader" v-show="listLoad">
              <td colspan="12"> <span></span></td>
            </tr>
            <tbody v-show="!listLoad">

              <tr v-for="(item) in projectsList" :key="item.id">
                <td class="textl" :title="item.order_id">{{item.order_id}}</td>
                <td class="textl">{{item.create_time}}</td>
                <td>{{item.game_name}}</td>
                <td class="textl"  v-if="!item.is_champion" :title="item.team_name_1+' VS ' +item.team_name_2">
                  <span class="elltd1 ellips">{{item.team_name_1}}<i class="vs">VS</i>{{item.team_name_2}}</span>
                </td>
                <td v-else>{{$t('Champion_contest')}}</td>
                <td  :title="item.desc">
                  <span class="ellips elltd2">{{item.desc}}</span>
                </td>
                <td >{{item.category_id === 1?$t("Choi_ChiPan"):(item.category_id === 2?$t("Solid_compensate"):$t("Roll_the_ball"))}}</td>
                <td>{{item.money_type_show}}</td>
                <td class="color_07f1b7">{{item.amount}}</td>
                <td>{{item.category_id === 1?(item.user_points?'--':item.odds):item.odds}}</td>
                <td>{{item.user_points?item.user_points : '--'}}</td>
                <td class="result_status"
                :class="[{'win': item.prize_status === 1 && item.bonus > 0,
                'lose': item.prize_status === 2},item.status]">
                  <i class="add" v-if="item.prize_status === 1 && item.bonus > 0">+</i>
                  <i class="minus" v-if="item.prize_status === 2">-</i>{{item.result}}
                </td>
                <td class="operation btn">
                  <span v-if="item.can_change === 1" class="can_change_team">
                    <div class="change_select_list" v-show="item.showChangeTeamComfire" :class="{'score_play':item.option_list.length>2}">
                      <RadioGroup v-model="item.currentOPtion" type="button" size="large">
                          <Radio :label="option.id" v-for="option in item.option_list" :disabled="option.id==item.winner" :key="option.id">{{option.desc}}</Radio>
                      </RadioGroup>
                      <div class="change_btns">
                        <a href="javascript:;"
                        class="el-button el-button--default el-button--small cancel"
                        @click="cancleChangeTeam(item)">{{$t("cancel")}}</a>
                        <a href="javascript:;"
                        class="el-button el-button--default el-button--small el-button--primary"
                        @click="confirmChangeTeam(item)">{{$t("determine")}}</a>
                      </div>
                    </div>
                    <a href="javascript:;"
                    class="el-button el-button--default el-button--small el-button--primary"
                    @click="handleChangeTeam(item)">{{$t("In_the_team")}}</a>
                  </span>
                  <a href="javascript:;" class="d_btn disabled"  v-else-if="item.can_change === 2">{{$t("Has_been_in_team")}}</a>
                  <span v-else-if="item.category_id === 2">--</span>
                  <span v-else-if="item.category_id === 3">--</span>
                  <a href="javascript:;" class="d_btn disabled" v-else>{{$t("Has_rotary_header")}}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="page_select clearfix">
          <Page :total="page.total"
          :page-size="page.pagesize"
          :current.sync="page.currentpage"
          @on-change="handlePageChange($event)"
          class="fl"
          v-if="page.total>page.pagesize"></Page>
          <div class="total_list fr">{{$t("A_total_of")}}<i>{{page.total}}</i>{{$t("records")}}</div>
        </div>
      </section>
    </div>
  </div>
</template>
<script type="text/javascript">
import {  formatDate } from '../../utils/util'
export default {
    components: {},
    created () {
      this.loadProjects ()
    },
    data() {
        return {
          monyTypeList: [
            {
              id: 0,
              name: this.$t("all")
            },
            {
              id: 1,
              name: 'RMB'
            },
            {
              id: 2,
              name: this.$t("The_coin")
            }
          ],
          initTime: formatDate(new Date().getTime() - 7*24*60*60*1000, 'yyyy/MM/dd') ,
          startTime: '',
          endTime: '',
          currentMoneyType: 0,
          projectsList: [],
          listLoad: false,
          changeTeamInfo: {},
          page: {
            total: 0,
            pagesize: 10,
            currentpage: 1
          }
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
        this.loadProjects ()
      },
      handleSearchProjects () {
        this.page.currentpage = 1
        this.loadProjects ()
      },
      loadProjects () {
        let data = {
          start_time: this.startTime || this.initTime,
          end_time: this.endTime,
          money_type: this.currentMoneyType,
          page: this.page.currentpage
        }
        this.listLoad = true
        this.projectsList = []
        this.$http(this.ApiSetting.newEgame.getBetRecordsList, data)
          .then((res) => {
            if(res.status === 1){
              this.page.total = res.data.count
              res.data.list.forEach((v, i) => {
                v.showChangeTeamComfire = false
                v.desc = v.desc.replace(/&nbsp;/g, ' ')
                if(v.receive_status===1) {
                  v.result = this.$t("tobecomfired")
                  v.status = 'tobecomfired'
                }else if (v.receive_status===2){
                  v.result = this.$t("refused")
                  v.status = 'refuse'
                }else {
                  if(v.is_cancel === 1){
                    v.result = this.$t("Has_been_cancelled")
                    v.status = 'cancel'
                  }else if(v.is_getprize === 0){
                    v.result = this.$t("No_settlement")
                    v.status = 'confirm'
                  }else if(v.prize_status === 1 && v.bonus > 0){
                    v.result =  v.win_lose
                    v.status = 'clearing'
                  }else if(v.prize_status === 2){
                    v.result =  v.amount
                    v.status = 'clearing'
                  }
                }
                v.option_list.forEach((x, y) => {
                  if(x.id != v.winner){
                    v.currentOPtion = x.id
                  }
                })
              })
              this.projectsList = res.data.list
            }
            this.listLoad = false
          }, (err) => {
            this.listLoad = false
          })
      },
      handleChangeTeam (x) {
        this.projectsList.forEach((v, i) => {
          v.showChangeTeamComfire = false
        })
        x.showChangeTeamComfire = true
        /*let data = {
          id: x.projectid
        }
        this.$http(this.ApiSetting.egame.checkChangeTeam, data)
          .then((res) => {
             if(res.status === 1){
               if(res.data.can_change){
                 x.showChangeTeamComfire = true
                 this.projectsList.sort()
               }else{
                 this.$message({
                   message: res.message,
                   type: 'warning'
                 })
               }
             }
          })*/
      },
      confirmChangeTeam (x) {
        let data = {
          id: x.project_id,
          option: x.currentOPtion
        }
        this.$http(this.ApiSetting.newEgame.changeTeam, data)
          .then((res) => {
            x.showChangeTeamComfire = false
            if(res.status === 1){
              x.can_change = 2
              this.$message({
                message: res.message,
                type: 'success'
              })
              setTimeout((v, i) => {
                this.loadProjects ()
              })
            }
        }, (err) => {
            x.showChangeTeamComfire = false
          })
      },
      cancleChangeTeam (x) {
        x.showChangeTeamComfire = false
      }
    }
}
</script>
 <style lang="less" scoped>
 .no_data {
   text-align: center;
   color: #484d5e;
   margin-top: 200px;
 }
 .game_projects {
   width: 1240px;
   .search_header {
     padding: 20px;
    line-height: 34px;
     .ivu-radio-wrapper {
       margin-right: 36px;
     }
   }
   .record_list {
     .list_table {
        height: 374px;
     }
     table{
      width: 100%;
      margin: 0 10px;
     }
     tbody {
       position: relative;
     }
     th,td {
       height: 34px;
     }
     th {
      color: #484d5e;
     }
     td {
       text-align: center;
     }
     .textl {
       text-align: left;
     }
     .elltd1 {
       max-width: 110px;
       display: inline-block;
     }
     .elltd2 {
       max-width: 160px;
       display: inline-block;
     }
     .vs {
       padding: 0 5px;
       width: 16px;
       vertical-align: top;
     }
      .result_status{
        &.comfire,&.cancel,&.tobecomfired {
          color: #7c839f;
        }
        &.clearing {
          color: #fff;
        }
        &.refuse {
          color: #e31212;
        }
        i {
          display: none;
        }
        &.win {
          color: #07f1b7;
          .add {
            display: inline-block;
          }
        }
        &.lose {
          color: #307765;
          .minus {
            display: inline-block;
          }
        }
      }
      .el-button {
        width: 44px;
        height: 20px;
        line-height: 20px;
        &.cancel {
          margin-right: 8px;
          line-height: 18px;
          &:hover {
            line-height: 20px;
          }

        }
      }
      .operation {
        &.btn {
          .d_btn {
            width: 44px;
            height: 18px;
            font-size: 12px;
            line-height: 18px;
            box-shadow: unset;
          }
        }
        .can_change_team {
          position: relative;
        }
        .change_select_list {
          position: absolute;
          border: 1px solid #6ee6eb;
          max-width: 250px;
          padding: 10px 5px;
          right: 0;
          top: 36px;
          line-height: normal;
          background-color: #17191f;
          z-index: 2;
          &:before,&:after {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            top: -13px;
            right: 15px;
            border:6px solid transparent;
            border-bottom-color:   #6ee6eb;
          }
          &:after {
            top: -12px;
            border-bottom-color: #17191f;
          }
          .ivu-radio-group {
            max-height: 100px;
            overflow-y: auto;
            overflow-x: hidden;
            width: 240px;
            text-align: left;
            white-space: normal;
          }
          .ivu-radio-group-button {
            .ivu-radio-wrapper {
              margin: 5px;
              width: 110px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              font-size: 14px;
              background-color: #262933;
              box-sizing: border-box;
              padding: 0 5px;
              border: none;
              border-radius: 4px;
              color: #7c839f;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &:before,&:after {
                display: none;
              }
              &.ivu-radio-wrapper-checked {
                background: #07f1b7;
                color: #17191f;
                z-index: 1;
                box-shadow: none;
              }
              &.ivu-radio-wrapper-disabled {
                color: #4a4e5f;
                border: 1px dashed #4a4e5f;
                line-height: 28px;
                background: none;
              }
            }
          }
          &.score_play {
            .ivu-radio-group-button {
              .ivu-radio-wrapper {
                width: 50px;
              }
            }
          }
          .change_btns {
            text-align: center;
            margin-top: 15px;
          }
        }
      }
   }
 }
 </style>
