<template>
  <div class="createroom inner_page">
    <div class="wrapper">
      <!--房间基本设置-->
      <div class="room_info_set">
        <div class="title">{{$t("Create_a_ROLL_room")}}</div>
        <!--活动时间-->
        <div class="form_box clearfix">
          <div class="form_title fl">{{$t("Activity_time")}}</div>
          <div class="box_right fl clearfix">
            <date-picker class="start_time fl"
              type="datetime"
              format="yyyy/MM/dd HH:mm"
              :options="startOption"
              :value.sync="createRollRoomData.startTime"
              @on-change="setTime(1,$event)">
            </date-picker>
            <span class="fl to">{{$t("to")}}</span>
            <date-picker class="end_time fl" clearable type="datetime"
              format="yyyy/MM/dd HH:mm"
              :options="endOption"
              @on-change="setTime(2,$event)">
            </date-picker>
          </div>
        </div>
        <!--活动描述-->
        <div class="form_box clearfix">
          <div class="form_title fl">{{$t("Activity_description")}}</div>
          <div class="box_right fl">
            <textarea :placeholder="$t('Fill_out_an_attractive_activities')"
            maxlength="200" v-model="createRollRoomData.desc"></textarea>
          </div>
        </div>
        <!--中奖人数-->
        <div class="form_box clearfix">
          <div class="form_title fl">{{$t("The_winning_number_people")}}</div>
          <div class="box_right fl">
            <input type="number" class="ivu-input" v-model="createRollRoomData.win" autocomplete="off">
          </div>
        </div>
        <!--等级限制-->
        <div class="form_box clearfix" v-if="showLeverSet">
          <div class="form_title fl">{{$t("Level_restrictions")}}</div>
          <div class="box_right fl">
            <Select v-model="createRollRoomData.leverLimit" class="ivu-select">
              <Option v-for="id in vipLevel" :value="id" :key="id">{{ id }}</Option>
            </Select>
            <span class="to" style="vertical-align: top;">{{$t("to")}}</span>
            <Select v-model="createRollRoomData.maxLever" class="ivu-select">
              <Option v-for="id in vipLevel" :value="id" :key="id">{{ id }}</Option>
            </Select>
            <i v-if="typeof createRollRoomData.leverLimit === 'number' || typeof createRollRoomData.maxLever === 'number'"
               class="icon-clean"
               @click="removeLimit"></i>
          </div>
        </div>
        <!--房间密码-->
        <div class="form_box clearfix" v-if="showPwdSet">
          <div class="form_title fl">{{$t("The_room_password")}}</div>
          <div class="box_right fl">
            <input type="password" :placeholder="$t('Please_enter_the_password')" autocomplete="off"
            class="ivu-input" v-model="createRollRoomData.password">
          </div>
        </div>
      </div>
      <!--添加饰品-->
      <div class="roll_item_add">
        <div class="title">{{$t("Add_accessories")}}</div>
        <div class="set_content clearfix">
          <!--奖池-->
          <div class="prize_pool fl">
            <div class="pool_title">
              <span class="title_text">{{$t("jackpot")}}</span>
              <span class="section_info">{{$t("total")}} <i class="num">{{rollItemPoolList.length}}</i> {{$t("piece")}}<span class="total_price">{{$t("Total_value")}}<i class="num">￥{{poolItemPrices}}</i></span> )</span>
            </div>
            <div class="items_pool">
              <div class="item_content clearfix">
                <steam-item-detail :item="item" v-for="(item,index) in rollItemPoolList" :key="index">
                  <div class="item_box" :class="{'selected':item.selected}"
                    @click="handleItemSelect(item)" >
                    <img :src="item.icon_url" alt="">
                    <div class="item_name ellips" :title="item.market_name">{{item.market_name}}</div>
                    <div class="item_price">{{item.price}}</div>
                    <div class="select_icon"></div>
                  </div>
                </steam-item-detail>
              </div>
            </div>
          </div>
          <!--方向按钮-->
          <div class="add_op fl">
            <div class="to_my_items" @click="handleToPackage">
              <span></span>
            </div>
            <div class="to_roll_pool" @click="handleToPool">
              <span></span>
            </div>
          </div>
          <!--我的饰品-->
          <div class="my_items fl">
            <div class="pool_title">
              <span class="title_text">{{$t("I_act_the_role_of")}}</span>
              <div class="search_item search_input">
                <input type="text" class="ivu-input" :placeholder="$t('Search_adorn_article_name')" v-model.trim="rollItem.currentName" @keyup.enter="searchItem">
                <div class="search_icon" @click="searchItem"></div>
              </div>
            </div>
            <div class="my_items_content">
              <div class="type_nav clearfix">
                <div class="type_box" :class="{'actived':rollItem.currentGameType==item.id}"
                  v-for="item in rollItemTypeList" :key="item.id" @click="selectGameType(item.id)">
                  {{item.type}}
                </div>
              </div>
              <div class="items_wrapper">
                <div class="filter_nav clearfix">
                  <div class="filter_box all_select">
                    <checkbox v-model="selectAll" @on-change="handleSelectAll()">{{$t("all")}}</checkbox>
                  </div>
                  <div class="filter_box by_time" :class="{'actived':item.type===rollItem.sortType}"
                    v-for="item in filterType" :key="item.type" @click="changeFilter(item)">
                    {{item.name}}<i class="triangle" :class="{'top':rollItem.descType===1,'bottom':rollItem.descType===0}"></i>
                  </div>
                </div>
                <div class="items_wrapper_content">
                  <div class="item_content clearfix">
                    <div class="loader" v-show="userPackageLoad"><span></span></div>
                    <div  v-for="(item,index) in rollUserPackageList" :key="index">
                      <steam-item-detail :item="item" >
                        <div class="item_box" :class="{'selected':item.selected}"
                          @click="handleItemSelect(item)" >
                          <img :src="item.icon_url" alt="">
                          <div class="item_name ellips" :title="item.market_name">{{item.market_name}}</div>
                          <div class="item_price">{{item.price}}</div>
                          <div class="select_icon"></div>
                        </div>
                      </steam-item-detail>
                    </div>
                  </div>
                  <div class="btn no_roll_item" v-if="noRollItem">
                    {{$t("Your_backpack_no_accessories_please")}}<router-link to="/user/package/" class="el-button el-button--primary">{{$t("My_backpack")}}</router-link>{{$t("Add")}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn">
        <a href="javascript:;" class="botton normal big" @click="createRollRoom()">{{$t("Create_a_room")}}</a>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import {  formatDate } from '../../utils/util'
import steamItemDetail from "@/components/steam-item-detail";
export default {
  components: {steamItemDetail},
  created () {
    this.checkUserCreate ()
    this.loadRoomUserPackage ()
  },
  computed: {
    //奖池总价值
    poolItemPrices () {
      let total = 0
      if(this.rollItemPoolList.length>0){
        this.rollItemPoolList.forEach(function (v,i) {
          total += parseInt(v.price*100)
        })
        return  (total/100).toFixed(2)
      }else{
        return 0
      }
    },
    //活动时间 结束时间 禁止选择设置
    endOption () {
      let _this = this;
      return {
        disabledDate (date) {
          if(_this.maxDays > 0 ){
            return date && date.valueOf() > _this.createRollRoomData.startTime.valueOf() + _this.maxDays*86400000
          }
        }
      }
    },
    //活动时间 开始时间 禁止选择设置
    startOption () {
      let _this = this;
      return {
        disabledDate (date) {
          if(_this.startMaxDay > 0 ){
            return date && date.valueOf() > Date.now() + _this.startMaxDay*86400000
          }
        }
      }
    }
  },
  data () {
    return {
      startMaxDay: 0,
      userPackageLoad: false,
      showLeverSet: false,
      showPwdSet: false,
      maxDays: 0,
      endTimeLimit: '',
      createRollRoomData: {
        startTime: new Date(),
        endTime: '',
        win: '',
        desc: '',
        password: '',
        leverLimit: '',
        maxLever: ''
      },
      rollItem: {
        currentGameType: 570,
        currentName: '',
        sortType: 'time',
        descType: 0
      },
      filterType: [
        {
          type: 'time',
          name: this.$t("According_to_the_time")
        },
        {
          type: 'price',
          name: this.$t("According_to_the_price")
        }
      ],
      rollItemTypeList: [
        {
          id: 570,
          type: 'DOTA2'
        },
        {
          id: 730,
          type: 'CSGO'
        },
        {
          id: 0,
          type: this.$t("other")
        }
      ],
      rollItemPoolList: [],
      rollUserPackageList: [],
      selectAll: false,
      noRollItem: false,
      vipLevel: []
    }
  },
  methods: {
    /**
     * 清除选中的等级限制
     */
    removeLimit() {
      this.createRollRoomData.leverLimit = ''
      this.createRollRoomData.maxLever = ''
    },
    //用户创建房间的限制
    checkUserCreate () {
      this.$http(this.ApiSetting.roll.createCheck)
        .then((res) => {
          if(res.status === 1){
            if(res.data.lever === 1){
              this.showLeverSet = true
            }
            if(res.data.haspass === 1){
              this.showPwdSet = true
            }
            this.maxDays = res.data.max_day*1
            this.startMaxDay = res.data.start_max*1
            this.vipLevel = res.data.vip_level
          }
        })
    },
    //获取用户背包
    loadRoomUserPackage () {
      let data = {
        game_id: this.rollItem.currentGameType,
        name: this.rollItem.currentName,
        sort: this.rollItem.sortType,
        desc: this.rollItem.descType
      }
      this.userPackageLoad = true
      this.noRollItem = false
      this.rollUserPackageList = []
      let _this = this
      this.$http(this.ApiSetting.roll.getCreateUserPackage, data)
        .then((res) => {
        this.userPackageLoad = false
          if(res.status === 1){
            if(res.data.length>0){
              let newArr = res.data
              for(let i = 0;i<_this.rollItemPoolList.length;i++){
                newArr.forEach(function (x, y) {
                  if(x.id === _this.rollItemPoolList[i].id){
                    newArr.splice(y, 1)
                  }
                })
              }
              newArr.forEach(function (v,i) {
                v.selected = false
                //v.show = true
                v.itemDetailLoad = false
              })
              this.rollUserPackageList = newArr
              this.rollUserPackageList.forEach(function (v,i) {
                _this.$set(v, 'itemDetailData', {})
              })
            }else  if(res.data.length === 0){
              this.noRollItem = true
              this.rollUserPackageList = []
            }
          }
        }, (err) => {
          this.userPackageLoad = false
        })
    },
    //选择北京类型
    selectGameType (x) {
      this.rollItem.currentGameType = x
      this.rollItem.currentName = ''
      this.rollItem.sortType = 'time'
      this.rollItem.descType = 0
      this.loadRoomUserPackage()
    },
    //搜索饰品
    searchItem () {
      if(this.rollItem.currentName.length>0){
        this.loadRoomUserPackage ()
      }
    },
    //设置活动时间
    setTime (type,date) {
      if(type===1){
        this.createRollRoomData.startTime = date
      }
      if(type===2){
        this.createRollRoomData.endTime = date
      }
    },
    //排序  时间升降 或者 价格升降
    changeFilter (x) {
      if(this.rollItem.sortType === x.type){
        if(this.rollItem.descType===1){
          this.rollItem.descType = 0
        }else{
          this.rollItem.descType = 1
        }
      }else{
        this.rollItem.sortType = x.type
        this.rollItem.descType = 0
      }
      this.loadRoomUserPackage()
    },
    //勾选全部
    handleSelectAll () {
      this.rollUserPackageList.forEach((v,i) => {
        if(this.selectAll){
          v.selected = true
        }else{
          v.selected = false
        }
      })
    },
    //选择单个
    handleItemSelect (x) {
      x.selected = !x.selected
      let len = this.rollUserPackageList.length
      let selectArr = []
      this.rollUserPackageList.forEach((v,i) => {
        if(v.selected){
          selectArr.push(v)
        }
      })
      if(selectArr.length === len&&len!==0){
        this.selectAll = true
      }else{
        this.selectAll = false
      }
    },
    //从奖池到背包
    handleToPackage () {
      let selectArr = []
      let poolNewArr = []
      this.rollItemPoolList.forEach((v,i) => {
        if(v.selected){
          v.selected = false
          selectArr.push(v)
        }else{
          poolNewArr.push(v)
        }
      })
      this.rollUserPackageList = this.rollUserPackageList.concat(selectArr)
      this.rollItemPoolList = poolNewArr
    },
    //从背包到奖池
    handleToPool () {
      this.selectAll = false
      let selectArr = []
      let packageNewArr = []
      this.rollUserPackageList.forEach((v,i) => {
        if(v.selected){
          v.selected = false
          selectArr.push(v)
        }else{
          packageNewArr.push(v)
        }
      })
      this.rollItemPoolList = this.rollItemPoolList.concat(selectArr)
      this.rollUserPackageList = packageNewArr
    },
    //创建房间按钮
    createRollRoom () {
      if(this.createRollRoomData.win <= 0){
        this.$message({
          message: this.$t("Please_enter_the_correct_number"),
          type: 'warning'
        })
        return false
      }
      if (this.showLeverSet) {
        if (typeof this.createRollRoomData.leverLimit !== 'number' && typeof this.createRollRoomData.maxLever !== 'number') {
          this.$message({
            message: "请设置等级限制",
            type: 'warning'
          })
          return false
        }
        if (
          (typeof this.createRollRoomData.leverLimit === 'number' && typeof this.createRollRoomData.maxLever === 'number') &&
          (this.createRollRoomData.leverLimit > this.createRollRoomData.maxLever)
        ) {
          this.$message({
            message: "等级配置有误，请再次尝试",
            type: 'warning'
          })
          return false
        }
      }
      let poolItemIds = []
      this.rollItemPoolList.forEach(function (v,i) {
        poolItemIds.push(v.id)
      })
      let data = {
        ids: poolItemIds.join(','),
        start: this.createRollRoomData.startTime,
        end: this.createRollRoomData.endTime,
        win: this.createRollRoomData.win,
        desc: this.createRollRoomData.desc,
        password: this.createRollRoomData.password
      }
      if (this.showLeverSet) {
        if (typeof this.createRollRoomData.leverLimit === "number") data.min_lever = this.createRollRoomData.leverLimit
        if (typeof this.createRollRoomData.maxLever === "number") data.max_lever = this.createRollRoomData.maxLever
      }
      this.$http(this.ApiSetting.roll.createRoom, data)
        .then((res) => {
          if(res.status === 1){
            this.$message({
              message: res.message,
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({path: '/roll'})
            }, 300)
          }
        })
    },
  }
}
</script>

<style lang="less" scoped>
.createroom {
  padding-bottom: 60px;
  .title {
    font-size: 36px;
    font-family: vkFont;
    text-align: center;
    line-height: 50px;
    height: 50px;
    color: #fff;
    margin-bottom: 40px;
  }
  .room_info_set {
    padding: 0 200px;
    .form_title {
      width: 140px;
      text-align: right;
      font-size: 18px;
      color: #fff;
      height: 34px;
      line-height: 34px;
    }
    .form_box {
      margin-bottom: 24px;
    }
    .box_right {
      margin-left: 10px;
      width: 682px;
    }
    .to {
      display: inline-block;
      height: 34px;
      line-height: 34px;
      width: 22px;
      text-align: center;
      color: #494e5f;
    }
    .start_time,.end_time,.ivu-input {
      width: 330px;
      line-height: normal;
    }
    .ivu-select {
      display: inline-block;
      width: 151px;
      line-height: normal;
      /deep/ .ivu-select-selection {
        border: 1px solid #343944;
        background-color: #262933;
      }
      /deep/ .ivu-select-dropdown {
        height: 220px;
      }
    }
    .icon-clean {
      display: inline-block;
      margin-left: 5px;
      width: 20px;
      height: 20px;
      background: url("../../assets/icon_es.png") no-repeat;
      background-position: -937px -45px;
      cursor: pointer;
      opacity: 0.5;
      vertical-align: super;
      &:hover {
        opacity: 1;
      }
    }
    textarea {
      border: 1px solid #343944;
      background-color: #262933;
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
  .btn {
    margin-top: 100px;
    text-align: center;
    a {
      &.botton {
        width: 338px;
      }
    }
  }
  .item_box {
    width: 134px;
    height: 90px;
  }
  .roll_item_add {
    margin-top: 60px;
    .pool_title {
      height: 34px;
      line-height: 34px;
      .title_text {
        color: #fff;
        font-size: 16px;
      }
      .section_info {
        color: #7c839f;
        margin-left: 8px;
        .total_price {
          margin-left: 10px;
        }
        .num {
          color: #07f1b7;
        }
      }
    }
    .prize_pool {
      width: 350px;
      .items_pool {
        border: 1px solid #282b35;
        background-color: #21242d;
        margin-top: 20px;
        height: 486px;
        box-sizing: border-box;
        overflow: auto;
        &::-webkit-scrollbar {
          background-color: transparent;
          width: 6px;
        }
        .item_content {
          padding: 10px;
          box-sizing: border-box;
          width: 330px;
          margin: 0 auto;
        }
      }
    }
    .add_op {
      padding: 0 20px;
      padding-top: 254px;
      & > div {
        width: 36px;
        height: 36px;
        cursor: pointer;
        margin: 10px 0;
        box-sizing: border-box;
        border: 1px solid #6f7174;
        background-color: #35373b;
        text-align: center;
        line-height: 34px;
        span {
          display: inline-block;
          vertical-align: middle;
          width: 14px;
          height: 14px;
          background: url("../../assets/icon_es.png") no-repeat;
        }
      }
      .to_my_items {
        span {
          background-position: -701px -45px;
        }
        &:hover {
          span {
            background-position: -701px -88px;
          }
        }
      }
      .to_roll_pool {
        span {
          background-position: -725px -45px;
        }
        &:hover {
          span {
            background-position: -725px -88px;
          }
        }
      }
    }

    .my_items {
      width: 814px;
      .pool_title {
        position: relative;
        .search_item {
          width: 228px;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      .my_items_content {
        margin-top: 20px;
        .type_nav {
          background-color: #262933;
          .type_box {
            float: left;
            width: 170px;
            height: 70px;
            line-height: 70px;
            text-align: center;
            font-size: 18px;
            cursor: pointer;
            &.actived {
              background: url(../../assets/icon_es.png) no-repeat;
              background-position: -569px -275px;
              color: #07f1b7;
            }
          }
        }
        .items_wrapper {
          margin-top: 1px;
          .filter_nav {
            background-color: #262933;
            padding: 15px 0;
          }
          .filter_box {
            float: left;
            width: 70px;
            text-align: center;
            margin: 0 15px;
            font-size: 14px;
            line-height: 30px;
            height: 30px;
            cursor: pointer;
            &.actived {
              color: #fff;
            }
            .triangle {
              display: inline-block;
              width: 12px;
              height: 4px;
              vertical-align: middle;
              position: relative;
              margin-left: 10px;
              &:after,&:before {
                content: '';
                position: absolute;
                left: 0;
                border:6px solid transparent;
              }
              &:after {
                border-top-color:#7c839f;
                top: 4px;

              }
              &:before {
                border-bottom-color: #7c839f;
                bottom: 4px;
              }
            }
            &.actived {
              .triangle {
                &.top {
                  &:before {
                    border-bottom: 6px solid #07f1b7;
                  }
                }
                &.bottom {
                  &:after {
                    border-top: 6px solid #07f1b7;
                  }
                }
              }
            }
          }
        }
        .items_wrapper_content {
          border: 1px solid #282b35;
          background-color: #21242d;
          box-sizing: border-box;
          height: 356px;
          padding: 10px;
          overflow: auto;
          .item_content {
            margin: 0 auto;
            width: 770px;
          }
          .no_roll_item {
            font-size: 14px;
            .el-button--primary {
              width: 72px;
              margin: 0 5px;
            }
          }
        }
      }
    }
  }
  .items_pool::-webkit-scrollbar-thumb:window-inactive ,
  .items_wrapper_content::-webkit-scrollbar-thumb:window-inactive {
    background-color: rgba(124, 131, 159, 0.5);
  }
}
</style>
