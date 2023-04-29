<template>
  <div class="task user_section">
    <h3 class="user_section_title">{{$t("The_task_center")}}</h3>
    <div class="user_section_content">
      <div class="task_nav user_section_content_nav clearfix">
        <div class="nav_box" :class="{'actived': item.id === currentNavId}" 
        v-for="item in navDataList" :key="item.id" 
        @click="taskTypeSelect(item.id)">{{item.title}}</div>
      </div>
      <div class="task_content inner_content">
        <!--任务列表-->
        <transition name="transitionRouter">
          <div class="task_list" v-show="currentNavId==1">
            <div class="btn" v-show="taskListLoad" style="text-align: center">
              <span class="btn_loading"></span>
            </div>
            <div  
              v-for="(item,index) in taskListArr" :key="index" >
                <table v-if="item.list.length" class="list-table">
                  <tr>
                    <th width="30%">{{item.title}}</th>
                    <th width="30%">{{$t("Quest_rewards")}}</th>
                    <th width="15%">{{$t("To_complete_the_degree")}}</th>
                    <th>{{$t("Task_status")}}</th>
                  </tr>
                  <tr v-for="item in item.list" :key="item.id">
                    <td class="ellips">{{item.title}}</td>
                    <td class="ellips">{{item.prizeDesc}}</td>
                    <td>{{item.do_times}}/{{item.need_times}}</td>
                    <td>
                      <span class="task_btn undone" 
                      v-show="item.status === 0" 
                      @click="handleToDoTask(item.jump_url)">{{$t("To_complete")}}</span>

                      <span class="task_btn get" 
                      v-show="item.status === 1" 
                      @click="handleGetTaskPrize(item)">{{$t("Get_the_rewards")}}</span>

                      <span class="task_btn got"
                      v-show="item.status === 2">{{$t("Have_to_receive")}}</span>
                    </td>
                  </tr>
                </table>
            </div>
          </div>
        </transition>
        <!--任务日志-->
        <transition name="transitionRouter">
          <div class="task_list task_log user_records" v-show="currentNavId==2">
            <div class="user_records_title">{{$t("Log_list")}}</div>
            <table class="list-table">
              <tr>
                <th width="30%">{{$t("time")}}</th>
                <th width="30%">{{$t("reward")}}</th>
                <th>{{$t("Task")}}</th>
              </tr>
              <tr v-for="item in taskLogList" :key="item.id">
                <td class="t1">{{item.finish_time*1000 | formatdate('yyyy/MM/dd HH:mm:ss')}}</td>
                <td class="t2">{{item.prizeDesc}}</td>
                <td class="t3">{{item.title}}</td>
              </tr>
            </table>
            <p class="log_tips">
              {{$t("In_recent_10_job_log")}}
              <a href="javascript:;" class="kf" @click="openKfWindow()">
                {{$t("Online_customer_service")}}
              </a>
            </p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { formatDate } from '../../utils/util'
export default {
  name: 'task',
  components: {},
  filters: {
    formatdate (num, formate) {
      return formatDate (num, formate)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.loadTaskList ()
      vm.$store.dispatch('loadTaskCount')
    })
  },
  data() {
    return {
      taskListLoad: false,
      currentNavId: 1,
      navDataList: [
        {
          title: this.$t("The_task_list"),
          id: 1
        },
        {
          title: this.$t("Job_log"),
          id: 2
        }
      ],
      taskLogList: [],
      taskListArr:[
        {title:this.$t("New_task"),list:[]},
        {title:this.$t("The_daily_task"),list:[]},
        {title:this.$t("Active_task"),list:[]},
      ]
    }
  },
  methods: {
    taskTypeSelect (x) {
      this.currentNavId = x
    },
    //加载任务列表
    loadTaskList () {
      this.taskListLoad = true
      this.$http(this.ApiSetting.user.getTaskList)
        .then((res) => {
          this.taskListLoad = false
           if(res.status === 1){
             if(res.data.typeArr.length > 0){
              for(let i = 0; i<res.data.typeArr.length; i++){
                if(res.data.typeArr[i]*1 === 1){
                  this.taskListArr[0].list = this.taskListFormat(res.data.allTask[res.data.typeArr[i]])
                }
                if(res.data.typeArr[i]*1 === 2){
                   this.taskListArr[1].list = this.taskListFormat(res.data.allTask[res.data.typeArr[i]])
                }
                if(res.data.typeArr[i]*1 === 3){
                  this.taskListArr[2].list = this.taskListFormat(res.data.allTask[res.data.typeArr[i]])
                }
              }
             }
              //领取日志
             if(res.data.finishTask.length>0){
               this.taskLogList = this.taskListFormat(res.data.finishTask)
             }
           }
        }, (err) => {
          this.taskListLoad = false
        })
    },
    taskListFormat (list) {
      list.forEach( (v,i) => {
        if(v.prize_experience !== 0 && v.prize_nb !== 0){
          v.prizeDesc = v.prize_experience +this.$t("experience")+ v.prize_nb + this.$t("The_coin")
        }else if(v.prize_experience !== 0){
          v.prizeDesc = v.prize_experience +this.$t("experience")
        }else if(v.prize_nb !== 0){
          v.prizeDesc = v.prize_nb + this.$t("The_coin")
        }
      })
      return list
    },
    //去做任务
    handleToDoTask (url) {
      this.$router.push({path: url})
    },
    //领取奖励
    handleGetTaskPrize (x) {
      let data = {
        task_id: x.task_id
      }
      this.$http(this.ApiSetting.user.getTaskPrize, data)
        .then((res) => {
          if(res.status === 1){
            this.$store.dispatch('getUserVirtualMoney')
            this.$message({
              message: res.message,
              type: 'success'
            })
            x.status = 2
            this.$store.dispatch('loadTaskCount')
          }
        })
    },
  }
}
</script>
<style lang="less" scoped>
.task_content {
  padding: 24px 60px;
	.task_list {
    .user_records_title {
      margin-bottom: 15px;
    }
    &.task_log table {
      margin-bottom: 0;
    }
    table {
      margin-bottom: 50px;
    }
    .task_btn {
      width: 70px;
      height: 18px;
      line-height: 18px;
      display: inline-block;
      box-sizing: border-box;
      color: #fff;
      border-radius: 30px;
      vertical-align: middle;
      text-align: center;
      cursor: pointer;
      font-size: 12px;
      background: url("../../assets/web-icons.png") no-repeat;
      &.undone {
        background-position: -1148px -153px;
        line-height: 16px;
        &:hover {
          color: #07f1b7;
        }
      }
      &.get {
        background-position: -1148px -69px;
        color: #000;
        &:hover {
          background-position: -1148px -97px;
          color: #fff;
        }
      }
      &.got {
        background: #2f323e;
        color: #4e5265;
        cursor: default;
      }
    }
	}
}
</style>