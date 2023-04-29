<template>
  <div class="info_setting user_section">
    <h3 class="user_section_title">
      {{$t("Personal_Settings")}}
    </h3>
    <div class="user_section_content">
      <div class="info_setting_nav user_section_content_nav clearfix">
        <router-link class="nav_box" active-class="actived" :to="item.url" v-for="item in navDataList" :key="item.id" exact>{{item.title}}</router-link>
      </div>
      <div class="info_setting_content inner_content">
        <transition name="transitionRouter">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'infosetting',
  components: {},
  computed: {},
  data() {
    return {
     /* uploadHeader: {
        'Content-Type': 'multipart/form-data',
        'COMPANY': 'vkgame'
      },*/
      navDataList: [
        {
          title: this.$t("The_personal_data"),
          id: 1,
          url: '/user/infosetting/'
        },
        {
          title: this.$t("Security_Settings"),
          id: 2,
          url: '/user/infosetting/safeset'
        },
        {
          title: this.$t("Management_of_bank_card"),
          id: 3,
          url: '/user/infosetting/bank'
        },
        {
          title:  '虚拟币管理',
          id: 4,
          url: '/user/infosetting/virtualcurrency'
        },
      ]
    }
  },
  methods: {}
}
</script>
<style lang="less">
  .set_box {
    .ivu-date-picker {
      .ivu-input-wrapper {
        .ivu-input {
          border-color: #7c839f;
        }
      }
    }
  }
  .info_setting {
    .ivu-select-single {
      .ivu-select-selection {
        border: 1px solid #7c839f;
      }
      .ivu-select-selected-value {
        color: #07f1b7;
        font-size: 14px;
        height: 34px;
        line-height: 32px;
      }
      .ivu-select-placeholder {
        font-size: 14px;
        height: 34px;
        line-height: 32px;
      }
    }
    .ivu-select-single.area_code {
      .ivu-select-selection {
        border: none;
        border-right: 1px solid #7c839f;
        border-radius: 0;
        height: 24px;
        line-height: 24px;
      }
      .ivu-select-selected-value {
        height: 24px;
        line-height: 24px;
        width: 70px;
        color: #fff;
      }
      .ivu-select-arrow {
        border-top-color: #fff;
      }
    }
  }
  .security_info_set {
    .bind_phone_number {
      .telphone_input_box {
        position: relative;
      }
      .area_code {
        position: absolute;
        left: 0;
        top: 5px;
      }
    }
  }
  .bind_phone_number {
    .ivu-select-dropdown {
      width: 230px !important;
      left: 0 !important;
      background-color: #18191e;
      border-radius: 0;
      border: 1px solid #07f1b7;
      color: #7c839f;
      text-align: left;
    }
  }

  /*银行卡 虚拟币管理*/
  .infoset_bank {
    position: relative;
    .title {
      color: #fff;
      font-size: 14px;
      span.tooltip {
        display: inline-block;
        color: #7c839f;
        width: 18px;
        height: 18px;
        line-height: 16px;
        font-weight: bold;
        border: 1px solid #7c839f;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;
        box-sizing: border-box;
        margin-left: 5px;
      }
    }
    .lock_bank_card {
      margin: 10px 0 30px;
      text-align: right;
      .d_btn {
        width:140px;
        line-height:34px;
        height: 34px;
      }
      .lock_btn {
        display: inline-block;
        width:120px;
        border-radius: 16px;
        border: solid 1px #7c839f;
        color: #fff;
        text-align: center;
        font-size: 14px;
        line-height:34px;
        height: 34px;
        cursor: pointer;
        box-sizing: border-box;
        &:hover {
          border-color:#07f1b7;
          color: #07f1b7;
        }
        .btn_loading {
          margin: 0;
          vertical-align: sub;
        }
      }
    }

    .bind_card_tips {
      margin-top: 20px;
    }
  }
  .confirm_detault_dialog {
    margin-top: 30vh !important;
    p {
      margin: 10px auto 0;
      width: 588px;
      font-size: 14px;
      line-height: 1.7;
      color: #fff;
    }
    .btn {
      width:300px;
      margin: 30px auto 0;
    }
    .el-button {
      width:120px;
      margin-right: 60px;
    }
  }
  .smallw_dialog {
    width: 740px !important;
  }
  .add_bank_card_dialog {
    width: 740px !important;
    .input_wrapper {
      width: 350px;
      margin: 0 auto;
    }
    .dialog_tips {
      margin-bottom: 36px;
    }
    .yeco {
      color: #e34d12;
    }
    .input_box {
      margin-top:20px ;
      display: flex;
      flex-wrap: wrap;
      .title_text {
        font-size: 18px;
        width: 100px;
        color: #fff;
        text-align: right;
        margin-right: 20px;
      }
      .box_right {
        width: 230px;
      }
      .input_box_tip {
        padding-left: 120px;
        font-size: 12px;
        margin-top: 6px;
        color: #7c839f;
      }
      .ivu-select-selected-value {
        color: #07f1b7;
        font-size: 14px;
        height: 34px;
        line-height: 32px;
      }
      .ivu-select-single .ivu-select-selection .ivu-select-placeholder, 
      .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
        font-size: 14px;
      }
    }
    .littletip {
      color: rgba(124, 131, 159, 0.4);
      font-size: 12px;
      line-height: normal;
    }
    .btn {
      margin-top: 30px;
    }
    .confirm_step {
      .input_wrapper {
        width: 370px;
      }
      .btn {
        .el-button--primary.big {
          margin-right: 20px;
        }
      }
    }
  }
  .lock_bank_card_dialog {
    .qa_box_wrapper {
      width: 580px;
      margin: 0 auto;
      color: #fff;
      line-height: 22px;
      .qa_box {
        .qa_title {
          width: 30px;
          text-align: right;
          float: left;
          margin-right: 5px;
        }
        .box_right {
          width: 545px;
          float: left;
          text-align: justify;
        }
      }
    }
    .qa_box.question {
      color: #07f1b7;
    }
    .qa_box.answer {
      margin-bottom: 30px;
    }
  }
</style>
