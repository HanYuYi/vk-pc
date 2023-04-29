<template>
  <div class="header">
    <!--导航-->
    <div class="nav">
      <div class="wrapper clearfix">
        <!--logo-->
        <router-link class="logo fl" to="/"><span></span></router-link>
        <!--登录、注册按钮-->
        <div class="login_reg fr"  v-show="!isLogin">
          <router-link to="/login" class="login_btn button_plain_2022" tag="a" target="_blank">{{$t("The_login")}}</router-link>
          <router-link to="/register" class="reg_btn button_primary_2022 divergence_2022" tag="a" target="_blank">{{$t("registered")}}</router-link>
        </div>
        <!--已登录 头像下拉-->
        <div class="logined fr" v-show="isLogin">
          <div class="user_info" :class="{'active':showUserHeadMore }">
            <Dropdown placement="bottom-end" @on-visible-change="handleLoadMoney($event)"
            @on-click="hanldeMenuClick($event)">
            <router-link to="/user" class="user_headimg">
              <Badge :count="msgCount" class="msg_count" v-lazy-container="lazyHead">
                <img :data-src="userInfo.head_image" alt="">
              </Badge >
            </router-link>
            <DropdownMenu slot="list" class="user_info_dropdownmenu">
              <li class="info_box">
                <div class="top">
                  <span class="user_name ellips" :title="userInfo.nickname ? userInfo.nickname : userInfo.username">{{userInfo.nickname ? userInfo.nickname : userInfo.username}}</span>
                  <span class="user_level" :class="'lv' + userInfo.user_lever"><span></span></span>
                </div>
                <div class="money">
                  <span class="num ellips">
                    <b v-show="!userNMMoneyLoad">{{userMoney[0]}}.<i class="float">{{userMoney[1]}}</i></b>
                    <span class="money_loading" v-show="userNMMoneyLoad"><i class="dot"></i><i class="dot"></i><i class="dot"></i></span>
                  </span>
                  <div class="sub_title">{{$t("The_balance_RMB")}}</div>
                </div>
                <div class="vb">
                  <span class="num"><b v-show="!userVirtualMoneyLoad">{{userVirtualMoney}}</b><span class="money_loading" v-show="userVirtualMoneyLoad"><i class="dot"></i><i class="dot"></i><i class="dot"></i></span></span><br/>
                  <div class="sub_title">{{$t("The_coin")}}</div>
                </div>
              </li>
              <DropdownItem v-for="(dropitem,index) in userInfoDropItem" :key="index"
              :class="dropitem.class" :name="dropitem.name" v-show="dropitem.isShow">
                <i class="icon"></i><span>{{dropitem.title}}</span>
                <Badge v-if="dropitem.name=='message'&&msgCount" :count="msgCount" show-zero class="msg_count"></Badge>
              </DropdownItem>
            </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <!--导航条目-->
        <div class="main_nav fr">
          <Menu mode="horizontal"
          active-name=""
          class="clearfix">

            <Submenu
              v-for="(navlistitem,index) in navlist" :key="index"
              :class="{'ivu-menu-item-active-self':$route.meta[navlistitem.metename] || (gamePageKey.key === navlistitem.metename) ? true : false}"
              :name="navlistitem.metename">
              <template slot="title">
                <div @click="changeGamepage(navlistitem.metename)" class="root_link">
                  {{navlistitem.title}}
                </div>
              </template>
              <MenuGroup class="nav_slide_list">
                  <div class="wrapper">
                    <menu-item :name="item.money_code" v-for="item in navlistitem.game_list" :key="item.money_code">
                      <router-link :to="item.url" active-class="active" class="slide_nav_list_box fl">
                        <div class="img_box">
                          <img :src="item.img" :alt="item.title" class="normal">
                          <img :src="item.img_hover" :alt="item.title" class="hover">
                        </div>
                        <div class="game_name">{{item.title}}</div>
                        <div class="game_desc">{{item.title_sub}}</div>
                        <i v-if="hotGameList.includes(item.money_code)" class="hot_tag"></i>
                        <i v-if="newGameList.includes(item.money_code)" class="new_tag"></i>
                      </router-link>
                    </menu-item>
                  </div>
              </MenuGroup>
            </Submenu>


            <!--优惠活动-->
            <menu-item name="youhui" class="youhui_forinstro" style="margin: 0 28px 0 0">
              <router-link to="/active" active-class="active">优惠活动</router-link>
            </menu-item>
            <!--合作加盟-->
            <menu-item name="jointly" class="jointly_forinstro" :class="{'ivu-menu-item-active-self':$route.meta.jointly ? true : false}" style="margin-right: 35px">
              <router-link to="/jointly" active-class="active">合作加盟</router-link>
            </menu-item>
            <!--资讯-->
            <menu-item name="news" class="menu_item_news">
              <router-link to="/news" active-class="active" @mouseenter.native="particleIndex = 0" @mouseleave.native="particleIndex = -1">
                <span class="news_icon particle_2022" :class="{animate: particleIndex === 0}"></span>资讯
              </router-link>
            </menu-item>
            <!--V币商城-->
            <menu-item name="vbmarket" class="menu_item_vbmarket">
              <router-link to="/vbmarket" active-class="active" @mouseenter.native="particleIndex = 1" @mouseleave.native="particleIndex = -1">
                <span class="vbmarket_icon particle_2022" :class="{animate: particleIndex === 1}"></span>商城
              </router-link>
            </menu-item>
            <!--APP下载-->
            <menu-item name="APPdown" class="menu_item_APPdown">
              <el-popover placement="bottom" trigger="hover"
                popper-class="whitecolor">
                <div class="qr_aside_wrapper">
                  <div class="qr_img_box">
                    <!-- <img :src="userInfo.is_super?'/pc_static/defaultimg/qr_img_vip.png':'/pc_static/defaultimg/qr_img.png'" alt=""> -->
                    <img width="145" height="145" :src="'/pc_static/defaultimg/qr_img_vip.png'" alt="">
                  </div>
                  <p style="text-align: center">VKGAME APP<br/>{{$t("Scan_code_to_download")}}</p>
                </div>
                <router-link slot="reference" to="/appshow" active-class="active" @mouseenter.native="particleIndex = 2" @mouseleave.native="particleIndex = -1">
                  <span class="APPdown_icon particle_2022" :class="{animate: particleIndex === 2}"></span>APP
                </router-link>
              </el-popover>
            </menu-item>
            <!--赞助-->
            <menu-item name="cooperhome" class="menu_item_dawnbattle">
              <el-popover placement="bottom" trigger="hover"
                popper-class="whitecolor">
                <p class="dawnbattle_tnc">TNC战队独家赞助商</p>
                <router-link slot="reference" to="/cooperhome" active-class="active" @mouseenter.native="particleIndex = 3" @mouseleave.native="particleIndex = -1" tag="a" target="_blank">
                  <span class="dawnbattle_icon particle_2022" :class="{animate: particleIndex === 3}"></span>赞助
                </router-link>
              </el-popover>
            </menu-item>
            <!--vip大厅-->
            <menu-item name="vipsystem" class="menu_item_vipsystem">
              <router-link to="/vipsystem" active-class="active" @mouseenter.native="particleIndex = 4" @mouseleave.native="particleIndex = -1">
                <span class="vip_icon particle_2022" :class="{animate: particleIndex === 4}"></span>VIP
              </router-link>
            </menu-item>
            <!--个人中心-->
            <menu-item name="userhome" v-if="isLogin" class="userhome_forinstro">
              <router-link to="/user" active-class="active">{{$t("Personal_center")}}</router-link>
            </menu-item>
          </Menu>
        </div>
      </div>
    </div>

    <!--右侧悬浮-->
    <right-aside></right-aside>
    <!-- S12/世界杯左下侧浮窗含倒计时功能 -->
    <left-aside></left-aside>
    <!-- S12/世界杯等活动临时导航浮窗，仅用于跳转 -->
    <left-temporary-aside></left-temporary-aside>
    <!--生日浮标和弹窗-->
    <birth-dialog> </birth-dialog>
    <!--充值红包-->
    <recharge-redpacket-dialog></recharge-redpacket-dialog>
    <!--注册红包-->
    <register-redpacket-dialog></register-redpacket-dialog>
    <!---弱密码修改、异常登录验证-->
    <weakpw-unusuallogin-dialog></weakpw-unusuallogin-dialog>
    <!--升级、降级提示-->
    <level-dialog></level-dialog>
    <!--活动提示浮标-->
    <anniversary-aside></anniversary-aside>
    <!--新手引导-->
    <instro-dialog></instro-dialog>
    <!-- usdt三重礼活动浮标-->
    <!-- <UsdtdepositAside></UsdtdepositAside>-->

    <!-- 极速注册成功 welcome-->
    <FastRegisterWelcome />

    <!-- 修改极速注册账号-->
    <ChangeAccountInfo />

    <!-- 极速注册 绑定手机号-->
    <BindMobileNumber />

    <!-- 极速注册 提示绑定手机号-->
    <BindMobileNumberTip @loginOut="loginOut"/>
  </div>
</template>
<script type="text/javascript">

import { mapGetters, mapState, mapMutations } from 'vuex'
import RightAside from './rightaside'
import LeftAside from './leftaside'
import LeftTemporaryAside from './left-temporary-aside'
import BirthDialog from './birth-dialog'
import LevelDialog from './level-dialog'
import RechargeRedpacketDialog from './recharge-redpacket-dialog'
import RegisterRedpacketDialog from './register-redpacket-dialog'
import WeakpwUnusualloginDialog from './weakpw-unusuallogin-dialog'
import AnniversaryAside from './anniversary-aside'
import InstroDialog from './instro-dialog'
// import UsdtdepositAside from '@/page/active/general/usdtdepositAside'
import FastRegisterWelcome from '../page/login/fastRegisterWelcome'
import ChangeAccountInfo from '../page/login/changeAccountInfo'
import BindMobileNumber from '../page/login/bindMobileNumber'
import BindMobileNumberTip from '../page/login/bindMobileNumberTip'
import storage from '../utils/storage'

export default {
  name: 'header',
  components: {
    LeftAside,
    LeftTemporaryAside,
    RightAside,
    BirthDialog,
    LevelDialog,
    RechargeRedpacketDialog,
    RegisterRedpacketDialog,
    WeakpwUnusualloginDialog,
    AnniversaryAside,
    InstroDialog,
    FastRegisterWelcome,
    ChangeAccountInfo,
    BindMobileNumber,
    BindMobileNumberTip
  },
  data () {
    return {
      particleIndex: -1,
      moneyLoading: false,
      vbLoading: false,
      msgCount: 0,
      showUserHeadMore: false,
      navlist: [],
      userInfoDropItem: [{// 充值
        name: 'deposit',
        class: 'deposit',
        title: this.$t('top_up'),
        isShow: true,
        url: '/user/finance/',
        isRouter: true
      }, {// 提款
        name: 'withdraw',
        class: 'withdraw',
        title: this.$t('withdrawals'),
        isShow: true,
        url: '/user/finance/withdraw/',
        isRouter: true
      }, {// 转账
        name: 'exchange',
        class: 'exchange',
        title: this.$t('Game_account_transfer'),
        isShow: true,
        url: '/user/finance/transfer/',
        isRouter: true
      }, {// 站内消息
        name: 'message',
        class: 'message',
        title: this.$t('Messages_within_the_station'),
        isShow: true,
        url: '/user/message/',
        isRouter: true
      }, {// 合营后台
        name: 'proxy',
        class: 'proxy_manage',
        title: this.$t('The_joint_venture_background'),
        isShow: false,
        url: '/Proxy',
        isRouter: false
      }, {// 合营后台管理级别
        name: 'proxyManage',
        class: 'proxy_manage',
        title: this.$t('The_joint_venture_background'),
        isShow: false,
        url: '/ProxyAdmin',
        isRouter: false
      }, {// 电销系统
        name: 'telemarketing',
        class: 'telemarketing',
        title: this.$t('Electricity_pin_system'),
        isShow: false,
        url: '/SaleReport',
        isRouter: false
      }, {// 退出登录
        name: 'loginout',
        class: 'login_out',
        title: this.$t('exit'),
        isShow: true
      }
      ],
      intro: {}
    }
  },
  computed: {
    ...mapGetters(['userMoney', 'userNMMoneyLoad']),
    ...mapState(['lazyHead', 'isLogin', 'userInfo', 'userVirtualMoney', 'userVirtualMoneyLoad', 'hotGameList',
      'newGameList', 'gamePageKey', 'fastRegisterWelcomeVisible', 'changeAccountInfoVisible', 'bindMobileNumberVisible'])
  },
  watch: {
    userInfo (val) {
      this.userInfoDropItem.forEach(item => {
        if (item.name == 'proxy') {
          item.isShow = (val.user_type === 2 && val.is_agent == 1)
        }
        if (item.name == 'proxyManage') {
          item.isShow = (val.user_type === 2 && val.is_agent == 0)
        }
        if (item.name == 'telemarketing') {
          item.isShow = (val.channel_admin === 1)
        }
      })
    }
  },
  created () {
    window.msgCountTimer = setInterval(() => {
      this.loadUnReadMsgCount()
    }, 60 * 1000 * 3)
    // 任务中心可做任务数量
    window.loadCount = setTimeout(() => {
      this.$store.dispatch('loadTaskCount')
    }, 3000)
  },
  mounted () {
    this.getMenuData()
    this.getHotGameData()
    this.loadUnReadMsgCount()
    this.$store.dispatch('loadTaskCount')
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(window.msgCountTimer)
    clearTimeout(window.loadCount)
    next()
  },
  destroyed () {
    clearInterval(window.msgCountTimer)
  },
  methods: {
    ...mapMutations(['updateGameList', 'updateGamePageKey']),
    // 请求头部游戏导航数据
    async getMenuData() {
      try {
        const response = await this.$http(this.ApiSetting.index.menuGameList)
        console.info("头部游戏导航数据初始化：", response)
        this.navlist = response.data
      } catch (e) {
        throw e
      }
    },

    changeGamepage (key) {
      if (this.$route.path !== '/gamepage') {
        this.$router.push({ path: '/gamepage' })
      }
      this.updateGamePageKey({ key, scroll: true })
    },
    async getHotGameData () {
      try {
        const { status, data: { hot_game: hotGame, new_game: newGame } } = await this.$http(this.ApiSetting.index.getIndexGameTag)
        if (status === 1) {
          this.updateGameList({ hotGameList: hotGame, newGameList: newGame })
        }
      } catch (e) {
        throw e
      }
    },
    // 加载余额 和vb
    handleLoadMoney (e) {
      if (e) {
        this.showUserHeadMore = true
        this.$store.dispatch('getUserMoeny', 'NM')
        this.$store.dispatch('getUserVirtualMoney')
      } else {
        this.showUserHeadMore = false
      }
    },
    // 导航条目跳转
    hanldeMenuClick (name) {
      if (name === 'loginout') {
        if (!this.userInfo.tel && (+this.userInfo.register_type === 1 || +this.userInfo.register_type === 0)) {
          this.$store.commit("setBindMobileNumberTip", { pointOfTime: 0, visible: true })
        } else {
          this.loginOut()
        }
        return
      }
      this.userInfoDropItem.forEach(item => {
        if (item.name == name) {
          if (item.isRouter) {
            this.$router.push({path: item.url})
          } else {
            window.open(item.url, '_blank')
          }
        }
      })
    },
    // 退出登录
    loginOut () {
      storage.set(`to_user_page_count_${this.userInfo.user_id}`, '0')
      this.$http(this.ApiSetting.index.loginOut)
        .then((res) => {
          if (res.status === 1) {
            storage.remove('loggedInFlag')
            this.$store.commit('updateLoginStatus', false)
            this.$store.commit('setStoreValue', {name: 'userInfo', value: {}})
            if (this.$router.history.current.meta.requireAuth || this.$router.history.current.meta.clearInfo) {
              this.$router.push({path: '/login'})
            }
            this.$store.commit('updateLoadHostpot', false)
          }
        })
    },
    // 站内消息未读数
    loadUnReadMsgCount () {
      if (this.isLogin) {
        this.$http(this.ApiSetting.index.getUnReadMsgCount)
          .then((res) => {
            if (res.status === 1) {
              this.msgCount = parseInt(res.data.count)
            }
          })
      }
    }
  }
}
</script>
<style lang="less">
.egame_header .header{
  position: static;
}
.header{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 19 !important;
  width: 100%;
  .nav {
    height: 80px;
    line-height: 80px;
    position: relative;
    z-index: 999 !important;
    background: rgba(19, 20, 25, 0.96);
    .logo {
        width: 232px;
        display: inline-block;
        height: 80px;
        span {
          display: inline-block;
          width: 247px;
          height: 57px;
          margin-top: 11px;
          background: url(../assets/web-icons.png) no-repeat;
          background-position: -18px 10px;
        }
    }
    .login_reg {
      a {
        display: inline-block;
        width: 68px;
        height: 34px;
        border-width: 1px;
        &.login_btn {
          margin-right: 10px;
          line-height: 32px;
        }
        &.reg_btn {
          line-height: 34px;
        }
      }
    }
    .logined {
      min-width: 46px;
       .user_info {
         width: 46px;
          margin-right: 20px;
         position: relative;
         &:after {
           content: '';
           display: block;
           width: 0;
           height: 0;
           position: absolute;
           right: -20px;
           top: 50%;
           border:5px solid transparent;
           border-top-color:#fff;
           transition: transform 0.3s;
         }
         &.active:after {
           transform: rotate(180deg);
         }
         .user_headimg {
           display: inline-block;
           width: 40px;
           height: 40px;
           vertical-align: middle;
           border-radius: 50%;
           border: 3px solid #07f1b7;
           line-height: normal;
           text-align: center;
           position: relative;
           .msg_count {
             .ivu-badge-count {
               top: -6px;
             }
             img {
               width: 100%;
               max-height: 40px;
               border-radius: 50%;
             }
           }
         }
         .ivu-select-dropdown {
           border-radius: 0;
           border: 1px solid #07f1b7;
           background-color: #17191f;
           width: 160px;
           padding: 0;
           &:before,&:after {
             content: '';
             position: absolute;
           }
           &:before {
             top: -18px;
             right: 9px;
             border: 9px solid transparent;
             border-bottom-color: #07f1b7;
           }
           &:after {
             top: -16px;
             right: 10px;
             border: 8px solid transparent;
             border-bottom-color: #17191f;
           }
           .user_info_dropdownmenu {
             li {
               color: #fff;
               padding: 0 12px;
               line-height: normal;
             }
             .info_box {
               padding: 10px 12px;
               border-bottom: 1px solid #3f4352;
               span {
                 display: inline-block;
               }
               .top {
                 line-height: 16px;
                 height: 16px;
                 display: flex;
                 align-items: center;
                 .user_name {
                   font-size: 14px;
                   width: 90px;
                 }
                 .user_level {
                   margin-left: 5px;
                   width: 36px;
                 }
               }
               .money,.vb {
                 margin-top: 15px;
               }
               .num {
                 font-size: 18px;
                 line-height: 14px;
                 height: 18px;
                 b {
                   font-weight: normal;
                 }
                 i.float {
                   font-size: 12px;
                 }
               }
               .sub_title {
                 color: #7c839f;
                 font-size: 12px;
               }
             }
             .ivu-dropdown-item {
               line-height: 36px;
               height: 36px;
               font-size: 14px;
               .icon {
                 display: inline-block;
                 vertical-align: middle;
                 width: 22px;
                 height: 20px;
                 background: url("../assets/ag/icon.png") no-repeat;
                 margin-right: 10px;
               }
               &.deposit .icon {
                 background-position: 0px -5px;
               }
               &.withdraw .icon {
                 background-position: -4px -42px;
               }
               &.exchange .icon {
                 background-position: -2px -79px;
               }
               &.message {
                 .icon {
                   background-position: -2px -114px;
                 }
                 .msg_count {
                   margin-left: 10px;
                   vertical-align: middle;
                 }
               }
               &.proxy_manage .icon {
                 background-position: -2px -150px;
               }
               &.telemarketing .icon {
                 background-position: -2px -224px;
               }

               &.login_out {
                 border-top: 1px solid #3f4352;
                 .icon {
                   background-position: -3px -188px;
                 }
               }
             }
           }
         }
       }
    }
    .main_nav {
      margin-right: 42px;
      ul {
        &.ivu-menu {
          display: flex;
          align-items: center;
          height: 80px;
        }
      }
      & > ul {
        & > li {
          float: left;
          height: 80px;
          line-height: 80px;
          font-size: 15px;
          margin-right: 24px;
          transition: all .2s ease-in-out;
          &.userhome_forinstro {
            margin: 0 0 0 24px;
          }
        }
      }
      li {
        a {
          font-size: 15px;
          font-weight: bold;
          display: inline-block;
          &:hover,&.active {
            color: #07f1b7;
          }
        }
      }
      .youhui_forinstro, .jointly_forinstro {
        a {
          color: #efefef;
        }
      }
      .menu_item_news {
        width: 29px;
        padding: 0;
        text-align: center;
        margin-right: 27px;
        a {
          line-height: 14px;
          font-size: 14px;
          font-weight: normal;
          height: 80px;
          color: #efefef;
          .news_icon {
            width: 20px;
            height: 24px;
            background: url("../assets/home/news_icon.png");
            display: inline-block;
            margin: 20px auto 6px;
          }
        }
      }
      .menu_item_vbmarket {
        width: 29px;
        padding: 0;
        text-align: center;
        margin-right: 27px;
        a {
          line-height: 14px;
          font-size: 14px;
          font-weight: normal;
          height: 80px;
          color: #efefef;
          .vbmarket_icon {
            width: 23px;
            height: 24px;
            background: url("../assets/home/vbmarket_icon.png");
            display: inline-block;
            margin: 19px auto 6px;
          }
        }
      }
      .menu_item_APPdown {
        width: 29px;
        padding: 0;
        text-align: center;
        margin-right: 27px;
        a {
          line-height: 14px;
          font-size: 14px;
          font-weight: normal;
          color: #efefef;
          .APPdown_icon {
            width: 18px;
            height: 24px;
            background: url("../assets/home/appdown_icon.png");
            display: inline-block;
            margin: 19px auto 8px;
          }
        }
      }
      .menu_item_dawnbattle {
        width: 29px;
        padding: 0;
        text-align: center;
        margin-right: 27px;
        a {
          line-height: 14px;
          font-size: 14px;
          font-weight: normal;
          color: #efefef;
          .dawnbattle_icon {
            width: 24px;
            height: 24px;
            background: url("../assets/home/dawnbattle_icon.png");
            display: inline-block;
            margin: 19px auto 6px;
          }
        }
      }
      .menu_item_vipsystem {
        width: 29px;
        padding: 0;
        text-align: center;
        margin-right: 0;
        a {
          line-height: 14px;
          font-size: 14px;
          font-weight: normal;
          color: #efefef;
          padding: 0;
          .vip_icon {
            width: 23px;
            height: 24px;
            background: url("../assets/home/vipsystem_icon.png");
            display: inline-block;
            margin: 19px auto 7px;
          }
        }
      }
      .ivu-select-dropdown {
        border: 0;
        padding: 0;
        margin: 0;
        width: 100vw;
        min-width: 1240px !important;
        background-color: transparent !important;
        left: 0 !important;
        overflow: hidden;
      }
      .ivu-menu-drop-list {
        height: 240px;
      }
    }
  }
}
.user_info_dropdownmenu .ivu-dropdown-item-focus,.user_info_dropdownmenu .ivu-dropdown-item:hover {
  background: #3f4352;
}
.ivu-menu-submenu-title{
  font-weight: bold;
  position: relative;
  .root_link {
    padding-right: 16px;
    display: inline-block;
    cursor: pointer;
  }
}
.main_nav .ivu-menu-submenu-title .ivu-icon-ios-arrow-down.ivu-menu-submenu-title-icon{
  background: none;
  width: 7px;
  height: 4px;
  background-image: url("../assets/home/head_li_icon.png");
  transition: transform 0.3s, border-color 0.3s;
  position: absolute;
  top: 37.5px;
  right: 0;
  pointer-events: none;
}

.ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item{
  height: 240px;
  border-bottom: 0;
  float: left;
  white-space: nowrap;
  list-style: none;
  cursor: pointer;
  line-height: normal;
  text-align: center;
  width: 198px;
  transition: background .2s ease-in-out;
}
.ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item:first-child {
  margin-left: -30px;
}
.ivu-menu-horizontal .ivu-menu-submenu{
  color: #efefef;
}
.main_nav .ivu-menu-horizontal .ivu-menu-submenu .ivu-menu-item-group .ivu-menu-item a{
  display: inline-block;
  width: 100%;
  height: 100%;
}
.ivu-menu-horizontal .ivu-menu-submenu:hover .ivu-menu-submenu-title .ivu-icon-ios-arrow-down.ivu-menu-submenu-title-icon{
  transform: rotate(180deg);
  background-image: url("../assets/home/head_li_icon_hover.png");
}
.ivu-menu-horizontal .ivu-menu-item-active-self, .ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-horizontal .ivu-menu-submenu:hover{
  color: #07f1b7;
  .root_link {
    color: #07f1b7;
  }
}
.ivu-menu-horizontal .ivu-menu-item-active-self .ivu-menu-submenu-title .ivu-icon-ios-arrow-down.ivu-menu-submenu-title-icon{
  background-image: url("../assets/home/head_li_icon_hover.png");
}
.notice_modal .notice_detail_content{
  max-height: 280px;
  overflow: auto;
}
/*导航下拉*/
.nav_slide_list {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  transition: top 0.3s;
  background: rgba(19, 20, 25, 0.96);
  z-index: 3;
  .co_box {
    display: flex;
    justify-content: flex-end;
    img {
      width: 170px;
      border: 0;
    }
    .co_btn {
      display: inline-block;
      color: #fff;
      span {
        font-family: vkFont;
        font-size: 26px;
        display: block;
        margin-top: 32px;
      }
      a {
        margin-top: -22px;
        width: 96px;
        height: 28px;
        display: block;
        line-height: 28px;
        text-align: center;
        background: rgba(10, 172, 132, 0.3);
        border: solid 1px rgba(7, 241, 183,0.3);
        border-radius: 13px;
        &:hover {
          opacity: 0.8;
          color: #fff !important;
        }
      }
    }
  }
  .wrapper {
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: center;
  }
  .slide_nav_list_box {
    width: 112px;
    position: relative;
    z-index: 2;
    &.active,&:hover{
      .img_box {
        .normal {
          display: none;
        }
        .hover {
          display: block;
        }
      }
      .game_name {
        color: #07f1b7;
      }
      .game_desc {
        color: #07f1b7;
      }
    }
    .img_box {
      position: relative;
      z-index: 2;
      img {
        width: 100%;
        vertical-align: top;
      }
      .hover {
        display: none;
      }
    }
    .game_name {
      font-size: 18px;
      font-weight: bold;
      height: 20px;
      line-height: 20px;
      text-align: center;
      color: #fff;
    }
    .game_desc {
      margin-top: 5px;
      color: #a9b3d9;
      font-weight: normal;
    }
    .hot_tag {
      display: inline-block;
      position: absolute;
      top: 15px;
      right: 8px;
      width: 37px;
      height: 18px;
      background: url("../assets/game_hot_tag.png");
      z-index: 2;
    }
    .new_tag {
      display: inline-block;
      position: absolute;
      top: 15px;
      right: 8px;
      width: 36px;
      height: 18px;
      background: url("../assets/game_new_tag.png");
      z-index: 2;
    }
  }
}

/*导航下拉*/
.transition-drop-appear,
.transition-drop-enter-active,
.transition-drop-leave-active  {
    animation-duration: .3s;
    animation-fill-mode: both;
    animation-play-state: paused;
}
.slide-up-appear,
.slide-up-enter-active,
.slide-up-leave-active {
  animation-duration: .46s;
  animation-fill-mode: both;
  animation-play-state: paused;
}
.slide-up-leave-active {
  animation-duration: .14s;
}

.transition-drop-appear,
.transition-drop-enter-active  {
    animation-name: ivuSlideUpIn;
    animation-play-state: running;
}

.slide-up-appear,
.slide-up-enter-active {
  animation-name: menuSlideUpIn;
  animation-play-state: running;
}

.transition-drop-leave-active {
    animation-name: ivuSlideUpOut;
    animation-play-state: running;
}

.slide-up-leave-active {
  animation-name: menuSlideUpOut;
  animation-play-state: running;
}

.slide-up-appear,
.slide-up-enter-active,
.transition-drop-appear,
.transition-drop-enter-active {
    opacity: 0;
    animation-timing-function: ease-in-out;
}
.slide-up-appear,
.slide-up-enter-active {
  animation-timing-function: ease-out;
}

.transition-drop-leave-active {
    animation-timing-function: ease-in-out;
}
.slide-up-leave-active {
  animation-timing-function: ease-in;
}
@keyframes ivuSlideUpOut {
    0% {
        opacity: 1;
        transform-origin: 0 0;
        transform: scaleY(1)
    }
    100% {
        opacity: 0;
        transform-origin: 0 0;
        transform: scaleY(.8)
    }
}
@keyframes ivuSlideUpIn {
    0% {
        opacity: 0;
        transform-origin: 0 0;
        transform: scaleY(.8)
    }
    100% {
        opacity: 1;
        transform-origin: 0 0;
        transform: scaleY(1)
    }
}

@keyframes menuSlideUpOut {
  0% {
    height: 240px;
  }
  100% {
    height: 0;
  }
}
@keyframes menuSlideUpIn {
  0% {
    opacity: 0;
    height: 0;
  }
  100% {
    opacity: 1;
    height: 240px;
  }
}
</style>
