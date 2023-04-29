<template>
  <div class="roll_room inner_page">
    <div class="wrapper">
      <div class="roll_room_info clearfix">
        <!--锁 表示房间加密-->
        <div class="lock_staus" v-if="roomInfo.need_pass"> </div>
        <!--微博分享-->
        <div class="share_box" v-if="!roomInfo.is_end">
          {{$t("Sharing")}}<a :href="roomInfo.share_url" class="weibo" target="_blank"></a>
        </div>
        <div class="room_master_info fl">
          <!--创建者的基本信息-->
          <div class="user_headimg" v-lazy-container="$store.state.lazyHead">
            <img :data-src="masterInfo.head_image" alt="">
          </div>
          <div class="user_level" :class="'lv'+masterInfo.user_lever"><span></span></div>
          <div class="user_name ellips">{{masterInfo.username}}</div>
          <div class="user_actor" v-lazy-container="$store.state.lazyPack244">
            <img :data-src="tag.img" alt="" v-for="tag in masterInfo.user_tags" :key="tag.id">
          </div>
          <!--房间号-->
          <div class="room_num clearfix">
            <div class="sub_title fl">{{$t("Your_room_number")}}</div>
            <div class="fr num">{{masterInfo.id}}</div>
          </div>
          <!--创建时间-->
          <div class="create_time clearfix">
            <div class="sub_title fl">{{$t("Creation_time")}}</div>
            <div class="fr time">{{masterInfo.create_time}}</div>
          </div>
        </div>
        <!--房间的信息-->
        <div class="room_info fl">
          <!--中奖人数-->
          <div class="awards_player_count clearfix">
            <div class="title">{{$t("The_winning_number_people")}}</div>
            <div class="info_right">{{masterInfo.total_win}}</div>
          </div>
          <!--开奖时间-->
          <div class="room_roll_time clearfix">
            <div class="title">{{$t("The_lottery_time")}}: </div>
            <div class="info_right">{{masterInfo.end_time*1000 | formatdate('yyyy/MM/dd HH:mm:ss')}}</div>
          </div>
          <!--房间描述-->
          <div class="room_desc clearfix">
            <div class="title">{{$t("Room_description")}}</div>
            <div class="info_right">{{masterInfo.desc}}</div>
          </div>
          <div class="roll_room_btn btn" v-if="!roomInfoLoad">
              <div class="botton roll_end" v-if="roomInfo.is_end">{{$t("Activity_has_ended")}}</div>
              <div class="botton normal join_room" @click="handleJoinRoomDialog"  v-else-if="!isLogin">{{$t("Participate_in_activities")}}</div>
              <div class="botton normal edit_room" @click="handleEditRoomDialog"  v-else-if="roomInfo.is_owner">{{$t("Editing_room")}}</div>
              <div class="botton disabled joined" v-else-if="roomInfo.has_applyed">{{$t("Has_been_involved_in")}}</div>
              <div class="botton normal join_room" @click="handleJoinRoomDialog"  v-else>
                <div class="btn_loading_box " v-if="joinBtnLoad"><span class="small_loading"></span></div>
                {{$t("Participate_in_activities")}}
              </div>
              <div class="cancel_roll " v-if="roomInfo.is_owner&&masterInfo.apply_total == 0&&isLogin"  @click="confirmCancel">{{$t("Cancel_the_activity")}}</div>
          </div>
          <div class="roll_room_level_limit" v-if="roomInfo.needTips">{{$t("To_participate_in_conditions")}}{{roomInfo.needTips}}</div>
        </div>
        <!--开奖倒计时-->
        <div class="roll_countdown fl"  v-if="showCountDown">
          <div class="countdown_title">
            <span>{{$t("The_lottery_countdown")}}</span>
            <!-- <span class="time">{{masterInfo.end_time*1000 | formatdate('yyyy/MM/dd HH:mm:ss')}}</span> -->
          </div>
          <div class="countdown_content clearfix">
            <div class="countdown_box day fl">
              <span v-show="roomCountDownDay[0]" class="countdown_num">{{roomCountDownDay[0]}}</span><span class="countdown_num">{{roomCountDownDay[1]}}</span>
              <div class="countdown_type">DAYS</div>
            </div>
            <div class="countdown_box fl">
                <span class="countdown_num">{{roomCountDownHours[0]}}</span><span class="countdown_num">{{roomCountDownHours[1]}}</span>
              <div class="countdown_type">HOURS</div>
            </div>
            <div class="countdown_splite fl">
              <span></span>
            </div>
            <div class="countdown_box fl">
                <span class="countdown_num">{{roomCountDownMins[0]}}</span><span class="countdown_num">{{roomCountDownMins[1]}}</span>
              <div class="countdown_type">MINUTES</div>
            </div>
            <div class="countdown_splite fl">
              <span></span>
            </div>
            <div class="countdown_box fl">
                <span class="countdown_num">{{roomCountDownSecs[0]}}</span><span class="countdown_num">{{roomCountDownSecs[1]}}</span>
              <div class="countdown_type">SECONDS</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mid_wrapper clearfix">
        <!--往期获奖-->
        <div class="main_left fl">
          <div class="awards_list past list">
            <div class="title">
              <span class="icon"></span><i>{{$t("Past_winners")}}</i>
            </div>
            <div class="list_wrapper">
              <div class="loader" v-show="historyListLoad"><span></span></div>
              <div class="no_player" v-if="!rollHistoryList.length&&!historyListLoad">{{$t("No_record")}}</div>
              <div class="awards_list_box clearfix" v-for="item in rollHistoryList" :key="item.id">
                <div class="box_left fl">
                  <div class="user_headimg" v-lazy-container="$store.state.lazyHead">
                    <img :data-src="item.head_image" alt="">
                    <div class="user_level" :class="'lv'+item.user_lever"><span></span></div>
                  </div>
                </div>
                <div class="box_mid fl">
                  <div class="user_name ellips" :title="item.username">{{item.username}}</div>
                  <div class="time_info">{{item.timeDesc}}</div>
                </div>
                <div class="box_right fr">
                  <div class="item_img" v-lazy-container="$store.state.lazyPack244">
                    <img :data-src="item.icon_url" alt="" >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main_right fr">
          <!--奖品池-->
          <div class="room_section prize_pool">
            <div class="section_title">
              <span class="title_text">{{$t("The_prize_pool")}}</span>
              <span class="section_info">({{$t("A_total_of")}} <i class="num">{{masterInfo.count?masterInfo.count:0}}</i> {{$t("piece")}}<span class="price_total">{{$t("The_value_of")}}  <i class="num">{{masterInfo.price?masterInfo.price:'0.00'}}</i> {{$t("yuan")}}</span> )</span>
            </div>
            <div class="section_wrapper">
              <div class="prize_pool_list">
                <div class="loader" v-show="roomInfoLoad"><span></span></div>
                <div class="list_wrapper clearfix">
                  <steam-item-detail :item="item"
                                     v-for="(item, index) in roomInfo.itemList" :key="index">
                    <div class="item_box_room">
                      <div class="item_box_top">
                        <h3 class="item_name" :title="item.market_name"
                            :style="{color: item.steam_item_id?'#'+item.name_color:'#7c839f'}">{{item.market_name}}</h3>
                        <div class="item_img" v-lazy-container="$store.state.lazyPack244">
                          <img :data-src="item.icon_url" alt="">
                        </div>
                      </div>
                      <div class="item_box_bottom">
                        <span class="item_price">￥ {{item.price}}</span>
                      </div>
                    </div>
                  </steam-item-detail>
                </div>
              </div>
              <Page :total="itemListPage.total" :page-size="itemListPage.pagesize"
                    :current.sync="itemListPage.currentpage"
                    @on-change="handleItemPageChange($event)"
                    v-if="itemListPage.total>itemListPage.pagesize"
                    class-name="cus_page"></Page>
            </div>
          </div>
          <!--参与名单-->
          <div class="room_section room_players">
            <div class="section_title">
              <span class="title_text">{{$t("Participate_in_the_list")}}</span>
              <span class="section_info">({{$t("A_total_of")}} <i class="num">{{playListPage.total}}</i> {{$t("people")}})</span>
            </div>

            <div class="section_wrapper" >
              <div class="no_player" v-if="!playListPage.total&&!playListLoad">{{$t("No_record")}}</div>
              <div class="loader" v-show="playListLoad"><span></span></div>
              <div class="room_players_list clearfix" v-if="playListPage.total&&!playListLoad">
                <div class="room_player_box player_list_box"
                     v-for="(item, index) in roomPlayerList" :key="index" >
                  <div class="user_headimg" v-lazy-container="$store.state.lazyHead">
                    <img :data-src="item.head_image" alt="">
                    <div class="user_level" :class="'lv'+item.user_lever"><span></span></div>
                  </div>
                  <div class="user_name ellips" :title="item.username">{{item.username}}</div>
                </div>
              </div>
              <Page :total="playListPage.total" :page-size="playListPage.pagesize"
                    :current.sync="playListPage.currentpage"
                    @on-change="loadRoomPlayerList($event)"
                    v-if="playListPage.total>playListPage.pagesize"
                    class-name="cus_page"></Page>
            </div>
          </div>
          <!--获奖名单-->
          <div class="room_section room_awards_player" v-if="roomInfo.is_end">
            <div class="section_title">
              <span class="title_text">{{$t("winners")}}</span>
              <span class="section_info">({{$t("A_total_of")}} <i class="num">{{awardsPlayerList.length}}</i> {{$t("people")}})</span>
            </div>
            <div class="section_wrapper">
              <div class="no_player" v-if="!awardsPlayerList.length&&!awardsPlayerListLoad">{{$t("No_record")}}</div>
              <div class="loader" v-show="awardsPlayerListLoad"><span></span></div>
              <div class="room_awards_player_list clearfix">
                <div class="awards_player_box player_list_box" v-for="item in awardsPlayerList" :key="item.index">
                  <div class="user_headimg" v-lazy-container="$store.state.lazyHead">
                    <img :data-src="item.head_image" alt="">
                    <div class="user_level" :class="'lv'+item.user_lever"><span></span></div>
                  </div>
                  <div class="user_name ellips" :title="item.username">{{item.username}}</div>
                  <div class="item_img_wrapper" v-lazy-container="$store.state.lazyPack244">
                    <img :data-src="item.icon_url" :alt="item.market_name" :title="item.market_name">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--参与活动  输入房间密码 验证码-->
    <el-dialog
      :visible.sync="roomPwdDialog.visible"
      :custom-class="roomPwdDialog.class">
        <div class="dialog_title" slot="title">{{$t("Participate_in_the_activity")}}</div>
        <div class="dialog_form_box">
          <div class="input_wrapper">
            <div class="input_box clearfix">
              <div class="title_text">{{$t("The_room_password")}}</div>
              <div class="box_right">
                <input type="password" :placeholder="$t('Please_enter_the_room_password')"
                v-model="roomPwdDialog.roomPwd" class="ivu-input">
              </div>
            </div>
            <div class="input_box clearfix room_pwd_verfiyCode">
              <div class="title_text">{{$t("Verification_code")}}：</div>
              <div class="box_right">
                <input type="text" :placeholder="$t('Please_enter_the_verification_code')"
                v-model="roomPwdDialog.verfiyCode" class="ivu-input fl">
                <a href="javascript:;" class="verfiy_code_img fr" @click="changeVerCodeImg">
                  <img :src="roomPwdDialog.veriImgUrl" alt="">
                </a>
              </div>
            </div>
          </div>
          <div class="btn">
            <span class="btn_loading dialog" v-if="joinDialogBtnLoad"></span>
            <a href="javascript:;" class="d_btn normal" @click="joinRollRoom" v-else>{{$t("Immediately_to_attend")}}</a>
          </div>
        </div>
    </el-dialog>
  <!--修改房间描述-->
    <el-dialog
      :visible.sync="editRoomDialog.visible"
      :custom-class="editRoomDialog.class">
      <div class="dialog_title" slot="title">{{$t("Editing_room")}}</div>
      <div class="dialog_form_box">
        <div class="input_wrapper">
          <div class="input_box clearfix">
            <div class="title_text">{{$t("Room_description")}}</div>
            <div class="box_right">
              <textarea v-model="editRoomDialog.desc" maxlength="200"></textarea>
            </div>
          </div>
          <!-- <div class="input_box clearfix">
            <div class="title_text">{{$t("The_winning_number")}}</div>
            <div class="box_right">
              <input type="text" placeholder="" v-model="editRoomDialog.awardsPlayerCount" class="ivu-input">
            </div>
          </div>-->
          <div class="input_box clearfix" v-if="editRoomDialog.showPwdInput">
            <div class="title_text">{{$t("The_room_password")}}</div>
            <div class="box_right">
              <input type="password" placeholder="" v-model="editRoomDialog.roomPwd" class="ivu-input">
            </div>
          </div>
        </div>
        <div class="btn">
          <span class="btn_loading dialog" v-if="editDialogBtnLoad"></span>
          <a href="javascript:;" class="d_btn normal" @click="subEditRoom" v-else>{{$t("Confirm_the_change")}}</a>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import {  formatDate, beforeAfterTime } from '../../utils/util'
import steamItemDetail from "@/components/steam-item-detail";
import { mapState} from "vuex";
export default {
  name: 'rollroom',
  components: {steamItemDetail},
  filters: {
    formatdate (num, formate) {
      return formatDate (num, formate)
    }
  },
  created () {
    /*this.loadRoomInfoData()*/
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.loadRoomInfoData()
      vm.awardsPlayerList = []
      clearInterval(vm.coutDownTimer)
    })
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.coutDownTimer)
    this.$destroy()
    next()
  },
  data () {
    return {
      masterInfo: {},
      roomInfo: {},
      itemTotalList: [],
      roomPwdDialog: {
        visible: false,
        class: 'room_pwd_dialog',
        roomPwd: '',
        verfiyCode: '',
        veriImgUrl: ''
      },
      editRoomDialog: {
        visible: false,
        class: 'edit_room_dialog',
        desc: '',
        roomPwd: '',
        showPwdInput: false
      },
      rollHistoryList: [],
      roomPlayerList: [],
      awardsPlayerList: [],
      itemListPage: {
        total: 0,
        pagesize: 12,
        currentpage: 1
      },
      playListPage: {
        total: 0,
        pagesize: 24,
        currentpage: 1
      },
      roomInfoLoad: false,
      playListLoad: false,
      awardsPlayerListLoad: false,
      historyListLoad: false,
      joinBtnLoad: false,
      joinDialogBtnLoad: false,
      editDialogBtnLoad: false,
      showCountDown: false,
      countDownTime: new Date().getTime(),
      roomCountDownDay: [0,0],
      roomCountDownHours: [0,0],
      roomCountDownMins: [0,0],
      roomCountDownSecs: [0,0],
      sys_second: '',
      coutDownTimer:null
    }
  },
  computed: {
    ...mapState(["isLogin","userInfo","verCodeUrl"]),
    getRoomId () {
      return parseInt(this.$route.params.id)
    }
  },
  methods: {
    //房间基本信息 和 奖品
    loadRoomInfoData () {
      this.itemTotalList = []
      this.roomInfo.itemList = []
      this.itemListPage.total = 0
      this.roomInfoLoad = true
      let data = {
        room_id: this.getRoomId
      }
      this.$http(this.ApiSetting.roll.getRoomInfo, data)
        .then((res) => {
          this.roomInfoLoad = false
          if(res.status === 1 ){
            if(res.data.info.is_del||res.data.info.is_hide){
              this.$router.push({path: '/roll'})
              return false
            }
            this.roomInfo = res.data
            this.showCountDown = !this.roomInfo.is_end
            if(this.showCountDown) {
              this.roomCountdownTime (res.data.info.end_time*1000)
            }
            this.masterInfo = res.data.info
            this.masterInfo.create_time = res.data.info.create_time.replace(/-/g, '/')
            this.masterInfo.user_lever = res.data.user_lever

            this.loadRoomPlayerList ()
            this.loadHistoryList ()
            if(res.data.is_end){
              this.loadRoomAwardsPlayerList()
            }
            //奖品分页数据
            let itemArr = res.data.items
            itemArr.forEach((v, i) => {
              v.itemDetailLoad = false
              v.itemDetailData = {}
            })
            this.itemListPage.total = itemArr.length
            let num = 0
            if((itemArr.length%this.itemListPage.pagesize)>0){
              num = 1
            }
            for(let i = 0; i < (parseInt(itemArr.length/this.itemListPage.pagesize) + num); i++){
              this.itemTotalList.push(itemArr.slice(i*this.itemListPage.pagesize, this.itemListPage.pagesize*(i+1)))
            }
            this.roomInfo.itemList = this.itemTotalList[0]
            //参与条件
            if(res.data.needJoin.length>0){
              this.roomInfo.needTips = res.data.needJoin.join(',')
            }
            //修改房间  是否需要密码
            this.editRoomDialog.showPwdInput = res.data.passAvalible ? true: false
          }
        }, (err) => {
          this.roomInfoLoad = false
        })
    },
    //获取参与名单
    loadRoomPlayerList () {
      this.playListLoad = true
      this.roomPlayerList = []
      let data = {
        room_id: this.getRoomId,
        limit: this.playListPage.pagesize,
        page: this.playListPage.currentpage
      }
      this.$http(this.ApiSetting.roll.getRoomPlayerList, data)
        .then((res) => {
         this.playListLoad = false
          if(res.status === 1 ){
            this.playListPage.total = res.data.count
            this.roomPlayerList = res.data.list
          }
         }, (err) => {
          this.playListLoad = false
        })
    },
    //获奖名单
    loadRoomAwardsPlayerList () {
      this.awardsPlayerListLoad = true
      this.awardsPlayerList = []
      this.$http(this.ApiSetting.roll.getRoomAwardsPlayerList, {
        room_id: this.masterInfo.id
      }).then((res) => {
          this.awardsPlayerListLoad = false
          if(res.status === 1 ){
            this.awardsPlayerList = res.data
          }
        }, (err) => {
          this.awardsPlayerListLoad = false
        })
    },
    //获取往期获奖
    loadHistoryList (){
      this.historyListLoad = true
      this.rollHistoryList = []
      this.$http(this.ApiSetting.roll.getHistoryList, {
        num: 10
      }).then((res) => {
          this.historyListLoad = false
          if(res.status === 1&&res.data&&res.data.length>0){
            this.rollHistoryList = res.data
            this.rollHistoryList.forEach(function (v,i) {
              v.timeDesc = beforeAfterTime(Math.floor((new Date().getTime() - v.win_time*1000)/1000),3)
            })
          }
        }, (err) => {
          this.historyListLoad = false
        })
    },
    //奖品分页
    handleItemPageChange (x) {
      this.roomInfo.itemList = []
      this.roomInfo.itemList = this.itemTotalList[x-1]
    },
    //撤销这个房间活动
    confirmCancel () {
      this.$confirm(this.$t("Sure_Cancel_the_activity"), this.$t("prompt"), {
        confirmButtonText: this.$t("determine"),
        cancelButtonText: this.$t("cancel"),
        type: 'warning',
        center: true
      }).then(() => {
        let data = {
          room_id: this.masterInfo.id
        }
        this.$http(this.ApiSetting.roll.cancelRoom, data)
          .then((res) => {
            if(res.status === 1 ){
              this.$message({
                type: 'success',
                message: res.message
              })
              this.$router.push({path: '/roll'})
            }
        })
      })
    },
    //参与活动之前
    handleJoinRoomDialog () {
      this.roomPwdDialog.roomPwd = ''
      this.roomPwdDialog.verfiyCode = ''
      if(this.isLogin){
        if(this.roomInfo.need_pass){//需要密码
          this.roomPwdDialog.visible = true
          this.changeVerCodeImg()
        }else{
          this.joinRollRoom()
        }
      }else {
        this.$message({
          message: this.$t("Please_login_first"),
          type: 'warning'
        })
      }

    },
    //参与活动
    joinRollRoom () {
      let data = {
        room_id: this.getRoomId,
        password: this.roomPwdDialog.roomPwd,
        verify: this.roomPwdDialog.verfiyCode
      }
      if(this.roomPwdDialog.visible){
        this.joinDialogBtnLoad = true
      }else{
        this.joinBtnLoad = true
      }
      this.$http(this.ApiSetting.roll.joinRoom, data)
        .then((res) => {
          if(this.roomPwdDialog.visible){
            this.joinDialogBtnLoad = false
          }else{
            this.joinBtnLoad = false
          }
          if(res.status === 1 ){
            this.roomPwdDialog.visible = false
            this.roomInfo.has_applyed = true
            this.$message({
              type: 'success',
              message: res.message
            })
            this.loadRoomPlayerList ()
          }
        }, (err) => {
          if(this.roomPwdDialog.visible){
            this.joinDialogBtnLoad = false
          }else{
            this.joinBtnLoad = false
          }
        })
    },
    //修改房间描述
    handleEditRoomDialog () {
      if(this.roomInfo.is_owner){
        this.editRoomDialog.visible = true
      }
      this.editRoomDialog.desc = this.masterInfo.desc
      this.editRoomDialog.roomPwd = ''
    },
    //提交房间描述修改
    subEditRoom () {
      let data = {
        room_id: this.masterInfo.id,
        desc: this.editRoomDialog.desc,
        password: this.editRoomDialog.roomPwd
      }
      this.editDialogBtnLoad = true
      this.$http(this.ApiSetting.roll.editRoom, data)
        .then((res) => {
        this.editDialogBtnLoad = false
          if(res.status === 1 ){
            this.masterInfo.desc = data.desc
            this.$message({
              type: 'success',
              message: res.message
            })
            setTimeout(() => {
              this.editRoomDialog.visible = false
            }, 300)
          }
        }, (err) => {
          this.editDialogBtnLoad = false
        })

    },
    //验证码改变
    changeVerCodeImg () {
      this.roomPwdDialog.veriImgUrl = this.verCodeUrl + '?' + new Date().getTime()
    },
    //开奖倒计时
    roomCountdownTime (countdownTime) {
      this.sys_second = parseInt((countdownTime - new Date().getTime())/1000)
      this.coutDownTimer = null
      if(this.sys_second <= 0){
        this.showCountDown = false
        return
      }
      let _this = this
      this.fixedTime()
      this.coutDownTimer = setInterval(_this.fixedTime, 1000)
    },
    fixedTime () {
      let _this = this
      if (_this.sys_second > 0) {
        _this.sys_second -= 1
        let day = Math.floor((_this.sys_second / 3600) / 24)
        let hour = Math.floor((_this.sys_second / 3600) % 24)
        let minute = Math.floor((_this.sys_second / 60) % 60)
        let second = Math.floor(_this.sys_second % 60)
        this.roomCountDownDay = [parseInt(day/10), day%10]
        this.roomCountDownHours = [parseInt(hour/10), hour%10]
        this.roomCountDownMins = [parseInt(minute/10), minute%10]
        this.roomCountDownSecs = [parseInt(second/10), second%10]
      }else {
        clearInterval(this.coutDownTimer)
        _this.roomInfo.is_end = true
        _this.showCountDown = false
        return false;
      }
    }
  }
}
</script>
<style lang="less" scoped>
.roll_room {
  .roll_room_info {
    position: relative;
    background: url("../../assets/roll/roll_icons.png") no-repeat;
    background-position: -20px -20px;
    height: 318px;
    .lock_staus {
      position: absolute;
      right: 30px;
      top: 30px;
      width: 28px;
      height: 28px;
      background: url("../../assets/roll/lock.png") no-repeat center;
    }
    .share_box {
      position: absolute;
      right: 30px;
      bottom: 30px;
      height: 28px;
      line-height: 28px;
      color: #494e5f;
      a {
        display: inline-block;
        height: 24px;
        width: 30px;
        vertical-align: top;
        &.weibo {
          background: url("../../assets/roll/weibo_icon.png") no-repeat center;
        }
      }
    }
    .room_master_info {
      width: 295px;
      height: 318px;
      box-sizing: border-box;
      padding: 20px;
      border-right: 1px solid #17191f;
      .user_headimg {
        height: 90px;
        width: 90px;
        margin: 5px auto;
        box-shadow: 0 0 0 5px #1c4d49;
      }
      .user_level {
        margin-top: 15px;
      }
      .user_name {
        font-size: 18px;
        line-height: 24px;
        height: 24px;
        color: #fff;
        margin-top: 16px;
        text-align: center;
      }
      .user_actor {
        margin-top: 10px;
        text-align: center;
        img[lazy=loading],
        img[lazy=error]{
          height: 26px;
          width: auto;
          margin-right: 2px;
        }
      }
      .sub_title {
        width: 80px;
      }
      .room_num,.create_time {
        line-height: 34px;
      }
      .room_num {
        margin-top: 5px;
        .num {
          text-align: right;
          color: #fff;
          font-size: 16px;
        }
      }
    }
    .room_info {
      padding: 30px 10px 30px 30px;
      box-sizing: border-box;
      width: 500px;
      font-size: 14px;
      & > div {
        line-height: 26px;
        margin-bottom: 0px;
      }
      .btn {
        margin-bottom: 0;
        margin-top: 5px;
      }
      div {
        .title {
          color: #494e5f;
          float: left;
          width: 70px;
        }
        .info_right {
          color: #fff;
          float: left;
          padding-left: 5px;
          max-width: 385px;
        }
      }
      .room_roll_time {
        .info_right {
          color: #07f1b7;
        }
      }
      .room_desc {
        .info_right {
          text-align: justify;
          margin-top: 5px;
          height: 154px;
          overflow: hidden;
          word-wrap: break-word;
          line-height: 18px;
        }
      }
      .roll_room_btn {
        height: 34px;
        .botton {
          width: 256px;
          &.join_room,&.edit_room {
            cursor: pointer;
            position: relative;
          }
          .btn_loading_box {
            border-radius: 0;
          }
        }
        .roll_end {
          background-color: #2f323e;
          color: #494e5f;
          cursor: default;
        }
        .cancel_roll {
          display: inline-block;
          vertical-align: middle;
          text-decoration: underline;
          color: #07f1b7;
          margin-left: 20px;
          cursor: pointer;
        }
      }
      .roll_room_level_limit {
        color: #7c839f;
        margin-bottom: 0;
        margin-top: 1px;
        line-height: 18px;
        display: flex;
        align-items: center;
        height: 36px;
      }
    }
    .roll_countdown {
      box-sizing: border-box;
      padding: 30px 30px 0 0;
      .countdown_title {
        font-size: 18px;
        line-height: 30px;
        height: 30px;
        color: #fff;
        span {
          display: inline-block;
          vertical-align: middle;
          line-height: normal;
        }
        .time {
          font-size: 14px;
          color: #7c839f;
          margin-left: 10px;
        }
      }
      .countdown_content {
        margin-top: 20px;
        .countdown_box {
          width: 84px;
          text-align: center;
          &.day {
            margin-right: 20px;
          }
          .countdown_num {
            display: inline-block;
            margin: 0 3px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            width: 36px;
            font-size: 40px;
            background: url("../../assets/roll/roll_icons.png") no-repeat;
            background-position: -1285px -20px;
            font-family: vkFont;
          }
          .countdown_type {
            margin-top: 8px;
          }
        }
        .countdown_splite {
          height: 50px;
          line-height: 50px;
          padding: 0 10px;
          span {
            display: inline-block;
            width: 8px;
            height: 20px;
            line-height: normal;
            vertical-align: middle;
            background: url("../../assets/roll/roll_icons.png") no-repeat;
            background-position: -1350px -35px;
          }
        }
      }
    }
  }
  .mid_wrapper {
    padding: 40px 0;
    .main_left {
      width: 295px;
    }
    .main_right {
      width: 928px;
    }
  }
  .no_player {
    text-align: center;
    font-size: 16px;
    line-height: 80px;
  }
  .room_section {
    margin-bottom: 40px;
    overflow-x: hidden;
    .section_wrapper {
      background-color: rgba(0,0,0,.4);
    }
    .section_title {
      height: 50px;
      line-height: 50px;
      background-color: #262933;
      padding-left: 30px;
      overflow: hidden;
      .title_text {
        font-size: 18px;
        color: #fff;
      }
      .section_info {
        display: inline-block;
        color: #494e5f;
        font-size: 12px;
        margin-left: 10px;
        vertical-align: baseline;
        .num {
          color: #fff;
        }
        .price_total {
          margin-left: 25px;
        }
      }
    }
    .player_list_box {
      .user_headimg {
        position: relative;
        margin: 0 auto;
      }
      .user_name {
        height: 20px;
        line-height: 20px;
        margin-top: 10px;
        color: #7c839f;
        font-size: 14px;
        text-align: center;
      }
    }
    &.prize_pool {
      .ivu-page {
        margin-left: 10px;
      }
      .prize_pool_list {
        min-height: 184px;
      }
      .item_box_room {
        float: left;
        width: 154px;
        height: 164px;
        overflow: hidden;
        margin: 5px 0;
        &:hover {
          background: url("../../assets/roll/roll_icons.png") no-repeat;
          background-position: -1402px -38px;
        }
        .item_box_top {
          height: 125px;
          padding: 5px 5px 15px;
          box-sizing: border-box;
          .item_name {
            height: 26px;
            line-height: 26px;
            text-align: center;
            color: #7c839f;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .item_img {
            height: 74px;
            width: 120px;
            margin: 5px auto 0;
            text-align: center;
            img {
              height: 100%;
              max-width: 100%;
            }
          }
        }
        .item_box_bottom {
          height: 34px;
          line-height: 34px;
          color: #fff;
          text-align: center;
          font-size: 14px;
          .item_level {
            margin-right: 20px;
          }
        }
      }
    }
    &.room_players {
      .section_wrapper {
        padding: 20px 10px;
      }
      .room_players_list {
        .room_player_box {
          float: left;
          padding: 10px;
          width: 113px;
          height: 100px;
          box-sizing: border-box;
        }
      }
    }
    &.room_awards_player {
      .no_player {
        line-height: 120px;
      }
      .room_awards_player_list {
        margin-right: -20px;
        overflow-x: hidden;
        background-color: rgba(0,0,0,0.4);
      }
      .awards_player_box {
        float: left;
        margin-right: 20px;
        margin-bottom: 20px;
        width: 136px;
        text-align: center;
        box-sizing: border-box;
        padding: 20px 5px;
        .item_img_wrapper {
          width: 110px;
          height: 74px;
          text-align: center;
          margin: 16px auto 0;
          img {
            height: 100%;
            max-width: 100%;
          }
        }
      }
    }
  }
  .awards_list {
    &.past {
      .title {
        height: 50px;
        line-height: 50px;
        background-color: #262933;
        color: #fff;
        font-size: 18px;
        box-sizing: border-box;
        padding-left: 12px;
        span {
          display: inline-block;
          margin-right: 10px;
          width: 40px;
          vertical-align: middle;
          height: 26px;
          background: url("../../assets/roll/past_awards_icon.png") no-repeat center;
        }
      }
      .list_wrapper {
        background-color: rgba(0,0,0,0.4);
      }
    }
  }
}
.room_pwd_dialog {
  .room_pwd_verfiyCode {
    .ivu-input {
      width: 220px;
    }
  }
  .verfiy_code_img {
    display: inline-block;
    width: 80px;
    height: 34px;
    box-sizing: border-box;
    border: 1px solid #464646;
    background-color: #fff;
    margin-left: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.edit_room_dialog {
  .dialog_form_box {
    padding-top: 30px;
  }
  .box_right {
    textarea {
      border: 1px solid #7e839d;
      background-color: transparent;
      border-radius: 14px;
      width: 100%;
      font-size: 14px;
      color: #fff;
      padding: 10px;
      box-sizing: border-box;
      resize: none;
      height: 136px;
    }
  }
}
.cus_page {
  margin: 6px 15px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
