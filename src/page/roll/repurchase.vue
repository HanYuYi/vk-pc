<template>
<!--饰品回购-->
  <div class="repurchase inner_page">
    <div class="wrapper">
      <h3 class="repurchase_title">{{$t("Act_the_role_ofing_is")}}</h3>
      <div class="repurchase_content">
        <div class="repurchase_nav clearfix">
          <div class="nav_box" v-for="item in repurchaseGameType" :class="[{'actived':item.id==gameCurrentType},item.class]" @click="gameTypeSelect(item.id)"><i class="icon"></i>{{item.name}}</div>
        </div>
        <div class="repurchase_list">
          <div class="loader" v-if="repurchaseListLoad"><span></span></div>
          <div class="list_wrapper clearfix">
            <div class="list_box">
              <div class="img_box">
                <img src="" alt="">
              </div>
              <div class="item_name ellips">
                {{$t("War_ghost_two_edged")}}
              </div>
              <div class="repurchase_info clearfix">
                <div class="left">
                  <div class="info_box">
                    <span class="info_title">{{$t("We_are_looking_for_the")}}</span><span class="num">50 {{$t("piece")}}</span>
                  </div>
                  <div class="info_box price">
                    <span class="info_title">{{$t("Repurchase_price")}}</span><span class="num">￥ 36.00</span>
                  </div>
                </div>
                <div class="right">
                  <span>{{$t("The_remaining")}}47{{$t("piece")}}</span>
                </div>
              </div>
              <div class="sale_btn">
                {{$t("sell")}}
              </div>
            </div>
          </div>
        </div>
        <Page :total="page.total" :page-size="page.pagesize" :current.sync="page.currentpage" @on-change="handlepPageChange($event)" v-if="page.total>page.pagesize"></Page>
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
  name: 'repurchase',
  components: {},
  filters: {
    formatdate (num, formate) {
      return formatDate (num, formate)
    }
  },
  data() {
      return {
        gameCurrentType: 1,
        repurchaseListLoad: false,
        recordLoad: false,
        recordList: [],
        repurchaseGameType: [
          {
            id: 1,
            class: 'all',
            name: this.$t("all")
          },
          {
            id: 2,
            class: 'dota2',
            name: 'DOTA2'
          },
          {
            id: 3,
            class: 'csgo',
            name: 'CSGO'
          }
        ],
        page: {
          total: 0,
          pagesize: 8,
          currentpage: 1
        }
      }
  },
  methods: {
    gameTypeSelect (x) {
      this.gameCurrentType = x
      this.loadRepurchaseList ()
    },
    loadRepurchaseList () {
      this.repurchaseListLoad = true
      let data = {

      }
    },
    loadRepurchaseRecordList () {
      this.recordLoad = true
      this.recordList = []
    }
  }
}
</script>
<style lang="less" scoped>
.repurchase {
  padding-bottom: 60px;
  .repurchase_list {
    margin-top: 20px;
    overflow-x: hidden;
    min-height: 378px;
    .list_wrapper {
      margin-right: -20px;
    }
    .list_box {
      float: left;
      width: 295px;
      height: 358px;
      background-color: #262933;
      box-sizing: border-box;
      margin: 0 20px 20px 0;
      padding-top: 20px;
      .img_box {
        padding: 0 20px;
        text-align: center;
        height: 162px;
        img {
          height: 100%;
          max-width: 100%;
        }
      }
      .item_name {
        color: #fff;
        text-align: center;
        margin-top: 10px;
        height: 26px;
        line-height: 26px;
        padding: 0 5px;
        font-size: 18px;
      }
      .repurchase_info {
        padding: 20px;
        .left {
          width: 150px;
          float: left;
          .info_box {
            height: 24px;
            line-height: 24px;
            span {
              display: inline-block;
            }
            .num {
              font-size: 14px;
            }
            .info_title {
              width: 50px;
              margin-right: 10px;
              color: #444859;
            }
            &.pirce {
              margin-top: 10px;
            }
            &.price {
              .num {
                color: #07f1b7;
              }
            }
          }
        }
        .right {
          float: left;
          width: 105px;
          text-align: right;
          line-height: 48px;
          font-size: 14px;
        }
      }
      .sale_btn {
        text-align: center;
        border-top: 1px solid #17191f;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: #07f1b7;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          background-color: #07f1b7;
          color: #000;
        }
      }
    }
  }
  .repurchase_records {
    margin-top: 80px;
  }
}
.repurchase_title {
  text-align: center;
  font-family: vkFont;
  color: #fff;
  font-size: 36px;
  font-weight: normal;
}
.repurchase_nav {
  height: 70px;
  line-height: 70px;
  background-color: #262933;
  .nav_box {
    float: left;
    width: 413px;
    opacity: 0.4;
    height: 100%;
    position: relative;
    color: #07f1b7;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    .icon {
      display: inline-block;
      vertical-align: middle;
      width: 26px;
      height: 26px;
      background: url("../../assets/icon_es.png") no-repeat;
      margin-right: 8px;
    }
    &.all {
      .icon {
        height: 24px;
        background-position: -35px -197px;
      }
    }
    &.dota2 {
      .icon {
        height: 22px;
        background-position: -200px -197px;
      }
    }
    &.csgo {
      .icon {
        height: 28px;
        background-position: -412px -193px;
      }
    }
    &.actived {
      opacity: 1;
      &:after {
        content: "";
        display: block;
        width: 100%;
        height: 4px;
        left: 0;
        bottom: 0;
        background: url("../../assets/list_select.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
  }
}

</style>