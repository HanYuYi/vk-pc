<template>

  <div class="guide  inner_page">
    <div class="wrapper clearfix">
      <div class="guide_nav fl">
        <Collapse v-model="currentValue" accordion @on-change="handleNavChange">
          <Panel name="1">
            {{$t("How_to_enter_the_VKGAME")}}
          </Panel>
          <Panel name="18-0" class="more">
            APP安装指引
            <div class="more_panel" slot="content">
              <Collapse accordion v-model="value18" @on-change="handleNavChange">
                <Panel name="18-1">
                  IOS安装指引
                </Panel>
                <Panel name="18-2">
                  Android安装指引
                </Panel>
              </Collapse>
            </div>
          </Panel>
          <Panel name="2">
            {{$t("How_to_sign_up")}}
          </Panel>
          <Panel name="3-0" class="more">
            {{$t("How_to_prepaid_phone")}}
            <div class="more_panel" slot="content">
              <Collapse accordion v-model="value3" @on-change="handleNavChange">
                <Panel name="3-1">
                  {{$t("Quick_payment")}}
                </Panel>
                <Panel name="3-2">
                  {{$t("QQ_WeChat_alipay_and_yards")}}
                </Panel>
                <Panel name="3-3">
                  {{$t("Direct_charge_of_bank_card")}}
                </Panel>
              </Collapse>
            </div>
          </Panel>
          <Panel name="4">
            {{$t("How_to_draw")}}
          </Panel>
          <Panel name="5">
            {{$t("How_to_transfer_game")}}
          </Panel>
          <Panel name="6-0"  class="more">
            {{$t("How_to_participate_in_betting")}}
            <div class="more_panel" slot="content">
              <Collapse accordion v-model="value6" @on-change="handleNavChange">
                <Panel name="6-1">
                  {{$t("tournament")}}
                </Panel>
                <Panel name="6-2">
                  {{$t("Sports_events")}}
                </Panel>
              </Collapse>
            </div>
          </Panel>
          <!-- <Panel name="7-0"  class="more">
            {{$t("About_AG_common_problems")}}
            <div class="more_panel" slot="content">
              <Collapse accordion v-model="value7" @on-change="handleNavChange">
                <Panel name="7-1">
                  {{$t("AG_mobiles")}}
                </Panel>
              </Collapse>
            </div>
          </Panel> -->
          <!-- <Panel name="8-0"  class="more">
            {{$t("Class_rules")}}
            <div class="more_panel" slot="content">
              <Collapse accordion v-model="value8" @on-change="handleNavChange">
                <Panel name="8-1">
                  {{$t("How_to_upgrade")}}
                </Panel>
                <Panel name="8-2">
                  {{$t("Rank_the_rights_and_interests")}}
                </Panel>
              </Collapse>
            </div>
          </Panel> -->
          <Panel name="9-0"  class="more">
            {{$t("About_the_V_c")}}
            <div class="more_panel" slot="content">
              <Collapse accordion v-model="value9" @on-change="handleNavChange">
                <Panel name="9-1">
                  {{$t("V_c_rules")}}
                </Panel>
                <Panel name="9-2">
                  {{$t("How_to_get_the_V")}}
                </Panel>
                <!-- <Panel name="9-3">
                  {{$t("Change_V_c")}}
                </Panel> -->
              </Collapse>
            </div>
          </Panel>
          <Panel name="10-0"  class="more">
            {{$t("Jewelry_market")}}
            <div class="more_panel" slot="content">
              <Collapse accordion v-model="value10" @on-change="handleNavChange">
                <Panel name="10-1">
                  {{$t("How_to_create_a_room")}}
                </Panel>
                <Panel name="10-2">
                  {{$t("How_to_participate_in")}}
                </Panel>
                <Panel name="10-3">
                  {{$t("How_to_certification")}}
                </Panel>
                <Panel name="10-4">
                  {{$t("Code_of_conduct")}}
                </Panel>
              </Collapse>
            </div>
          </Panel>
          <!--虚拟币-->
          <Panel name="16-0"  class="more">
            关于虚拟币
            <div class="more_panel" slot="content">
              <Collapse accordion v-model="value16" @on-change="handleNavChange">
                <Panel name="16-1">
                  什么是虚拟币
                </Panel>
                <Panel name="16-2">
                  如何绑定虚拟币
                </Panel>
                <Panel name="16-3">
                  虚拟币充值余额
                </Panel>
                <Panel name="16-4">
                  余额提现至虚拟币
                </Panel>
                <Panel name="16-5">
                  虚拟币交易平台
                </Panel>
              </Collapse>
            </div>
          </Panel>
          <!-- <Panel name="11">
            {{$t("Contest_rules")}}
          </Panel>-->
          <Panel name="12">
            {{$t("Forgot_password")}}
          </Panel>
          <Panel name="13">
            {{$t("To_promote_sharing")}}
          </Panel>
          <Panel name="14">
            {{$t("My_backpack")}}
          </Panel>
          <Panel name="15">
            {{$t("Common_problems")}}
          </Panel>
          <Panel name="17">防劫持教程</Panel>
        </Collapse>
      </div>
      <div class="guide_view fl">
        <router-view @guideHijackingBack="guideHijackingMethod"></router-view>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'guide',
  components: {},
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let _href = window.location.pathname.split('/')
      let url = '/guide/'
      if(_href.indexOf('guide') > 0 && _href[2] === ''||_href.length == 2){
        vm.$router.push({path: url})
        vm.currentValue = '1'
      }else if(_href.indexOf('guide') > 0 && _href[2] !== ''){
        url = url + _href[2].toString()
        vm.$router.push({path: url})
        if(_href[2].indexOf('-') > 0){
          vm.currentValue = _href[2].split('-')[0] + '-0'
          vm['value'+_href[2].split('-')[0]] = _href[2]
        }else{
          vm.currentValue = _href[2].toString()
        }
      }

    })
  },
  data() {
    return {
      currentValue: '1',
      value3: '3-1',
      value6: '6-1',
      //  value7: '7-1',
      value8: '8-1',
      value9: '9-1',
      value10: '10-1',
      value16: '16-1',
      value18: '18-1',
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal){
        if(val.path.indexOf("16")!=-1) {
          this.value16 = val.path.split("/")[2]
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    handleNavChange (e) {
      if (!e.length) return
      let url = '/guide/' + e[0];
      if(e[0] === '1'){
        url = '/guide/'
      }
      if(e[0]&&e[0].indexOf("-") > 0 && e[0].split("-")[1] === '0'){
        url = '/guide/' + e[0].split("-")[0] + '-1'
        this['value'+e[0].split('-')[0]] = e[0].split("-")[0] + '-1'
      }
      this.$router.push({path: url})
    },
    guideHijackingMethod() {
      this.currentValue = '17'
    }
  }
}
</script>
<style lang="less">
.guide {
  margin-top: 40px;
  padding-bottom: 60px;
  .wrapper {
    padding-top: 0;
    background-color: #262933;
    .guide_nav {
      width: 295px;
      background-color: #262933;
      box-sizing: border-box;
    }
    .guide_view {
      width: 944px;
      box-sizing: border-box;
      min-height: 1100px;
      margin-left: 1px;
      background: #262933 url("../../assets/user/user_shadow.png") repeat-y left top;
      .gamerule {
        padding: 40px 60px !important;
      }
    }
  }
}
@ivu-collapse:.ivu-collapse;
.ivu-collapse {
  &-item {
    color: #fff;
    font-size: 18px;
    &&-active {
      color: #07f1b7;
    }
    &-active {
      .ivu-collapse-header {
        i.ivu-icon-ios-arrow-forward {
          border-top: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid #07f1b7;
          border-left: 8px solid transparent;
        }
      }
    }
    @{ivu-collapse}-header {
      box-sizing: border-box;
      padding-left: 50px;
      cursor: pointer;
      position: relative;
      height: 60px;
      line-height: 60px;
      i.ivu-icon-ios-arrow-forward {
        display: none;
        position: absolute;
        background: none;
        right: 30px;
        top: 24px;
        width: 0;
        height: 0;
        border-top: 8px solid #7c839f;
        border-right: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid transparent;
      }
    }
    &.more {
      >.ivu-collapse-header {
        i {
          display: block;
        }
      }
    }
  }
}
.ivu-collapse-content-box {
  .ivu-collapse-item {
    .ivu-collapse-header {
      font-size: 14px;
      padding-left: 70px;
      background-color: #20232b;
    }
    &.ivu-collapse-item-active {
      .ivu-collapse-header {
        color: #fff;
        background: url("../../assets/icon_es.png") no-repeat;
        background-position: -769px -275px;
      }
    }
  }
}
.collapse-transition {
  transition: height .2s ease-in-out,padding-top .2s ease-in-out,padding-bottom .2s ease-in-out;
}
.guide_section {
  color: #7c839f;
  font-size: 14px;
  padding: 40px 60px;
  .section_s {
    margin-bottom: 20px;
    .section_title {
      color: #fff;
      font-size: 18px;
      margin-bottom: 10px;
    }
    p {
      margin: 6px 0;
    }
  }
  .section_s_c {
    .img_box {
      text-align: center;
      img {
        max-width: 100%;
        height: auto;
        padding-bottom: 5px;
      }
    }
  }
  .notice {
    color: red;
  }
  .section_notice {
    color: red;
    line-height: 20px;
    margin-top: 15px;
  }
  .table_box {
    padding: 10px 0;
    table {
      margin: 20px auto;
      border: 0px;
      color: #c3c3c3;
      td {
        border-right: 1px solid #17191f;
        color: #c3c3c3;
        font-size: 16px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        width: 350px;
      }
      tr {
        border: 1px solid #17191f;
        &.title td {
          color: #07f1b7;
          font-size: 18px;
        }
      }
      .num {
        color: #f4d364;
      }
    }
  }
}
.guide_section.levelequities {
  padding: 40px 10px;
  .table_box table td {
    font-size: 14px;
  }
}
</style>
