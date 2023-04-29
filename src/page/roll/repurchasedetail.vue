<template>
  <div class="repurchase_detail inner_page">
    <div class="wrapper">
      <div class="repurchase_detail_info clearfix">
        <div class="item_img fl">
          <img src="../../assets/roll/default_item.png" alt="">
        </div>
        <div class="item_info fl">
          <div class="item_name ellips">
            {{$t("War_ghost_two_edged")}}
          </div>
          <div class="item_type">
            <span class="game_icon"><img src="https://static.ilustrepro.com/uploads/gamelogo/57d9c38f3ab23.png" alt=""></span><span class="type_name">{{$t("Treasure_the_magic_of_two")}}</span>
          </div>
          <div class="item_price">
            <span>{{$t("Reference_price")}}</span><span class="num">￥ 36.00</span>
          </div>
        </div>
        <div class="repurchase_count fl clearfix">
          <div class="repurchase_count_box fl">
            <div class="num">60</div>
            <div class="count_des">{{$t("The_quantity_of_repo")}}</div>
          </div>
          <div class="repurchase_count_box fl">
            <div class="num">10</div>
            <div class="count_des">{{$t("Has_been_completed")}}</div>
          </div>
        </div>
        <div class="sale_mark fl">
          <span></span>
        </div>
      </div>
      <div class="repurchase_section repurchase_item_package">
        <div class="section_title">
          <i class="title_mark"></i><span class="title_name">{{$t("My_backpack")}}</span>
        </div>
        <div class="section_content">
          <div class="section_table ">
            <div class="section_table_title">
              <div class="record_row clearfix">
                <div class="t1">{{$t("Available_items")}}</div>
                <div class="t2">{{$t("The_price")}}</div>
                <div class="t3">{{$t("operation")}}</div>
              </div>
            </div>
            <div class="package_item_list section_table_body">
              <div class="loader" v-if="packageLoad"><span></span></div>
              <div class="empty_package" v-if="!isLogin">
                <div class="empty_text btn">{{$t("You_are_not_logged_in_please")}} <router-link to="/login" class="el-button el-button--primary ">{{$t("The_login")}}</router-link></div>
              </div>
              <div class="empty_package" v-if="emptyPackageShow">
                <div class="empty_text btn">{{$t("Your_backpack_no_can_buy")}}<router-link to="/user/package" class="el-button el-button--primary big">{{$t("To_the_Steam")}}</router-link> {{$t("extract")}}</div>
              </div>
              <div class="record_row clearfix" v-if="repurchase_item_list.length>0">
                <div class="t1 clearfix">
                  <div class="item_img fl">
                    <img src="../../assets/roll/default_item.png" alt="">
                  </div>
                  <div class="item_info fl">
                    <span class="item_type_icon"></span><span class="item_name">{{$t("War_ghost_two_edged")}}</span>
                  </div>
                </div>
                <div class="t2">62.41</div>
                <div class="t3 btn">
                  <a href="javascript:;" class="el-button el-button--primary big" @click="confirmSell()">{{$t("Sell_it")}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="repurchase_section repurchase_records">
        <div class="section_title">
          <i class="title_mark"></i><span class="title_name">{{$t("Clinch_a_deal_the_record")}}</span>
        </div>
        <div class="section_content">
          <div class="section_table ">
            <div class="repurchase_records_title section_table_title">
              <div class="record_row clearfix">
                <div class="t1">{{$t("Decorations")}}</div>
                <div class="t2">{{$t("The_seller")}}</div>
                <div class="t3">{{$t("The_price")}}</div>
                <div class="t4">{{$t("Clinch_a_deal_the_time")}}</div>
              </div>
            </div>
            <div class="repurchase_records_list section_table_body">
              <div class="record_row clearfix">
                <div class="t1 t clearfix">
                  <div class="item_img fl">
                    <img src="../../assets/roll/default_item.png" alt="">
                  </div>
                  <div class="item_info fl">
                    <div class="item_name ellips">{{$t("War_ghost_two_edged")}}</div>
                    <div class="item_type"><span class="type_icon dota2"></span></div>
                  </div>
                </div>
                <div class="t2 t clearfix">
                  <div class="user_info fl">
                    <div class="user_headimg">
                      <img src=" " alt="">
                      <div class="user_level lv3"><span></span></div>
                    </div>
                  </div>
                  <div class="user_name ellips fl">username</div>
                </div>
                <div class="t3">￥36.00</div>
                <div class="t4">2018/08/13 14:10:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import {  formatDate } from '../../utils/util'
export default {
  name: 'repurchasedetail',
  components: {},
  filters: {
    formatdate (num, formate) {
      return formatDate (num, formate)
    }
  },
  data() {
    return {
      emptyPackageShow: false,
      packageLoad: false,
      recordLoad: false,
      repurchase_item_list: [],
      recordList: []
    }
  },
  computed: {
    getRepurchaseId () {
      return parseInt(this.$route.params.id)
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    confirmSell (x) {
      let msg = this.$t("confirm_sell")+'<span class="warning_color">'+this.$t("War_ghost_two_edged")+'</span> '+this.$t("What")
      this.$confirm(msg, this.$t("prompt"), {
        confirmButtonText: this.$t("determine"),
        cancelButtonText: this.$t("cancel"),
        type: 'warning',
        dangerouslyUseHTMLString: true,
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
      }).catch(() => {
        /*this.$message({
          type: 'info',
          message: '已取消删除'
        });*/
      })
    },
    loadRepurchaseRecordList () {
      this.recordLoad = true
      this.recordList = []
    }
  }
}
</script>
 <style lang="less" scoped>
  .repurchase_detail {
    padding-bottom: 60px;
  }
  .repurchase_detail_info {
    background-color: rgba(38, 41, 51, 0.6);
    height: 180px;
    box-sizing: border-box;
    padding: 30px;
    font-size: 14px;
    .item_img {
      width: 180px;
      img {
        height: 120px;
        max-width: 100%;
      }
    }
    .item_info {
      margin-left: 20px;
      width: 380px;
      padding-right: 10px;
      .item_name {
        font-size: 18px;
        color: #fff;
        height: 32px;
        line-height: 32px;
      }
      .item_type {
        height: 32px;
        line-height: 32px;
        .game_icon {
          display: inline-block;
          width: 26px;
          height: 100%;
          line-height: 30px;
          vertical-align: middle;
          text-align: center;
        }
        .type_name {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
        }
      }
      .item_price {
        margin-top: 24px;
        height: 32px;
        line-height: 32px;
        .num {
          margin-left: 12px;
          font-size: 18px;
          color: #07f1b7;
        }
      }
    }
    .repurchase_count {
      margin-top: 28px;
      height: 66px;
      border-left: 1px solid #494e5f;
      padding-left: 120px;
      .repurchase_count_box {
        width: 140px;
        text-align: center;
        .num {
          font-family: vkFont;
          font-size: 36px;
          color: #ffffff;
          height: 40px;
          line-height: 40px;
        }
        .count_des {
          height: 26px;
          line-height: 26px;
        }
      }
    }
    .sale_mark {
      width: 180px;
      text-align: right;
      span {
        display: inline-block;
        width: 122px;
        height: 122px;
        background: url("../../assets/web-icons.png") no-repeat;
        background-position: -580px -454px;
      }
    }
  }
  .repurchase_section {
    margin-top: 40px;
  }
  .repurchase_item_package {
    .section_table_body {
      .record_row {
        height: 80px;
        line-height: 80px;
        color: #fff;
        font-size: 14px;
      }
    }
    .record_row {
      .t1 {
        width: 530px;
        .item_img {
          width: 86px;
          text-align: center;
          img {
            max-width: 100%;
            height: 52px;
          }
        }
        .item_info {
          margin-left: 20px;
        }
      }
      .t2 {
        width: 120px;
        text-align: center;
      }
      .t3 {
        width: 510px;
        text-align: right;
      }
      .item_info {
        .item_type_icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
        .item_name {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
        }
      }
    }
  }
  .empty_package {
    .empty_text {
      color: #fff;
      font-size: 14px;
      line-height: 170px;
      text-align: center;
      background-color: #262933;
    }
  }

 </style>