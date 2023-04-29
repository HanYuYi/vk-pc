// import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../utils/storage'
import $http from '@/common/http'
import ApiSetting from '@/common/serviceModule'
import { formatNumberSplit } from '@/utils/util'
import { Message } from 'element-ui'
// Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    guideFlag: false, // 自走棋目前没用
    kfUrl: '', // 普通客服url
    kfUrlByList: [], // 普通客服url List，第一条为主线路,
    kf_proxy_Url: 'https://direct.lc.chat/12747459/3', // 代理客服url
    wapUrl: '', // wap地址
    verCodeUrl: '', // pc 地址
    loginModelData: {
      // 登录注册模块初始化公用信息
      verfiy: -1, // -1: 无   0: 文字验证码    1: 极验
      fast_register: 1, // 急速注册  0: 关闭    1: 开启
      register_finish_tips: '' // 离开注册弹窗内容
    },
    taskCount: {}, // 个人中心任务数量
    indexAlertData: {}, // VIP等级数据
    showBirthAside: false, // 生日红包弹窗
    showRegisterRed: false, // 注册成功奖励红包弹窗
    showRechargeRed: false, // 充值红包弹窗
    loginBtnFlag: true, // 是否显示登录按钮
    userInfo: {}, // 个人信息
    isLogin: 0, // 是否登录
    userMoney: {
      // 用户 各平台的余额
      EG: '0.00',
      GM: '0.00',
      AG: '0.00',
      NM: '0.00',
      LY: '0.00',
      MG: '0.00',
      EBET: '0.00',
      PINNACLE: '0.00',
      LK: '0.00',
      LC: '0.00',
      PG: '0.00',
      BL: '0.00',
      FY: '0.00',
      RG: '0.00',
      IM: '0.00'
    },
    userVirtualMoneyLoad: false, // 是否显示虚拟币余额
    userMoneyLoad: {
      // 是否显示个平台的余额
      EG: false,
      GM: false,
      AG: false,
      NM: false,
      LY: false,
      MG: false,
      EBET: false,
      PINNACLE: false,
      LK: false,
      LC: false,
      PG: false,
      BL: false,
      FY: false,
      IM: false
    },
    userVirtualMoney: '-',
    LeftTempoNav: localStorage.setLeftTempoNav
      ? JSON.parse(localStorage.setLeftTempoNav)
      : [], // 左侧临时活动导航
    lazyMatchAvatar: {
      selector: 'img',
      error: '../../pc_static/defaultimg/match_img.png',
      loading: '../../pc_static/defaultimg/match_img.png'
    }, // 默认图片 加载失败显示的图片
    lazyPack244: {
      selector: 'img',
      error: '../../pc_static/defaultimg/pack_244.png',
      loading: '../../pc_static/defaultimg/pack_244.png'
    }, // 默认图片 加载失败显示的图片
    lazyPack1240: {
      selector: 'img',
      error: '../../pc_static/defaultimg/pack_1240.png',
      loading: '../../pc_static/defaultimg/pack_1240.png'
    }, // 默认图片 加载失败显示的图片
    lazyHead: {
      selector: 'img',
      error: '../../pc_static/defaultimg/headimg.png',
      loading: '../../pc_static/defaultimg/headimg.png'
    }, // 默认图片 加载失败显示的图片
    lazyS12Avatar: {
      selector: 'img',
      error: '../../pc_static/defaultimg/avatar-s12.png',
      loading: '../../pc_static/defaultimg/avatar-s12.png'
    },
    lazyS12subAvatar: {
      selector: 'img',
      error: '../../pc_static/defaultimg/avatar-s12sub.png',
      loading: '../../pc_static/defaultimg/avatar-s12sub.png'
    },
    lazyLogo: {
      selector: 'img',
      error: '../../pc_static/defaultimg/logo_88.png',
      loading: '../../pc_static/defaultimg/logo_88.png'
    }, // 默认图片 加载失败显示的图片
    lazyPack2022: {
      selector: 'img',
      error: '../../pc_static/defaultimg/pack_2022.png',
      loading: '../../pc_static/defaultimg/pack_2022.png'
    }, // 默认图片 加载失败显示的图片
    unusual: {
      showValidation: false, // 弱密码修改
      loginvalP: false,
      showVlogin: false, // 异常登录验证
      loginvalL: false
    },
    levelInfo: {
      isShow: false // 升级弹窗的显示隐藏   levelInfo.type 11是降级 10是保级  9是升级 12是vip系统才上线的所有会员提示
    },
    ip: '',
    loadHostpot: false,
    hostpotVisible: false,
    hotGameList: [],
    newGameList: [],
    gamePageKey: sessionStorage.getItem('gamePageKey')
      ? JSON.parse(sessionStorage.getItem('gamePageKey'))
      : { key: '', scroll: false },
    richpayInitData: {
      // V富通钱包-初始化
      wallet_info: {
        coupon_type: 0,
        interest_balance: 0.0,
        lottery_chance: 0,
        seven_day_ideal_income: 0.0,
        total_balance: 0.0,
        total_income: 0.0,
        year_show: 0
      },
      is_use_richpay: 1,
      vip_year_conf: [],
      time_to_time_records: [],
      user_records: [],
      last_bonus: 0
    },
    richpayInitDataLoading: false,
    fastRegisterWelcomeVisible: false, // 极速注册成功 welcome dialog 控制
    changeAccountInfoVisible: false, // 修改极速注册账号 dialog 控制
    bindMobileNumberVisible: false, // 极速注册绑定手机号 dialog 控制
    bindMobileNumberTip: {
      // 极速注册提示绑定手机号 dialog 控制
      pointOfTime: -1, // 极速注册绑定手机号提示的时间点 1: 刚登录后进入个人中心时    0: 退出登录时
      visible: false
    },
    currentInstroShow: false, // 当下新手教程是否在显示中
    publicMaintainCompData: {} // public-maintain 组件数据
  },
  getters: {
    isLogin: state => state.isLogin,
    userMoney: state => formatNumberSplit(state.userMoney.NM).split('.'),
    userNMMoneyLoad: state => state.userMoneyLoad.NM
  },
  mutations: {
    updateGuideStatus (state, flag) {
      state.guideFlag = flag
    },
    setStoreValue (state, obj) {
      if (state.hasOwnProperty(obj.name)) {
        state[obj.name] = obj.value
      }
    },
    setLeftTempoNav (state, payload) {
      state.LeftTempoNav = payload
    },
    showLoginBtn (state, flag) {
      state.loginBtnFlag = flag
    },
    setShowBirthAside (state, flag) {
      state.showBirthAside = flag
    },
    setshowRegisterRed (state, flag) {
      state.showRegisterRed = flag
    },
    setshowRechargeRed (state, flag) {
      state.showRechargeRed = flag
    },
    setIndexAlertData (state, val) {
      state.indexAlertData = val
    },
    setProxyKFUrl (state, url) {
      state.kf_proxy_Url = url
    },
    setKFUrl (state, url) {
      state.kfUrl = url
    },
    setKFUrlByList (state, url) {
      state.kfUrlByList = url
    },
    setWapUrl (state, url) {
      state.wapUrl = url
    },
    setVerCodeUrl (state, url) {
      state.verCodeUrl = url
    },
    setLoginModelData (state, data) {
      state.loginModelData = data
    },
    updateUserMoney (state, data) {
      state.userMoney[data.type] = data.data
      state.userMoneyLoad[data.type] = false
    },
    updateUserVirtualMoney (state, data) {
      state.userVirtualMoney = data
      state.userVirtualMoneyLoad = false
    },
    showUserMoneyLoading (state, type, flag) {
      state.userMoneyLoad[type] = flag
    },
    showVirtualMoneyLoading (state, flag) {
      state.userVirtualMoneyLoad = flag
    },
    updateUserInfo (state, newUserInfo) {
      state.userInfo = { ...state.userInfo, ...newUserInfo }
      if (!state.userInfo.tel && newUserInfo.mobile) {
        state.userInfo.tel = newUserInfo.mobile
      }
      if (!state.userInfo.head_image) {
        // state.userInfo.head_image = '../assets/default_headimg.png'
      }
      state.unusual = {
        showValidation:
          newUserInfo.is_password_weak || storage.get('is_password_weak'), // 弱密码修改
        loginvalP: newUserInfo.is_password_weak,
        showVlogin: newUserInfo.is_unusal || storage.get('is_unusal'), // 异常登录验证
        loginvalL: newUserInfo.is_unusal
      }
      if (newUserInfo.is_password_weak || storage.get('is_password_weak')) {
        storage.set('is_password_weak', true)
      }
      if (newUserInfo.is_unusal || storage.get('is_unusal')) {
        storage.set('is_unusal', true)
      }
    },
    updateTaskCount (state, count) {
      state.taskCount = count
    },
    updateLoginStatus (state, flag) {
      state.isLogin = flag
      if (!flag) {
        storage.remove('is_password_weak')
        storage.remove('is_unusal')
        state.unusual = {
          showValidation: false, // 弱密码修改
          loginvalP: false,
          showVlogin: false, // 异常登录验证
          loginvalL: false
        }
      }
      /* if(flag){
        storage.set('isLogin',1)
      }else{
        storage.remove('isLogin')
      } */
    },
    updateLoadHostpot (state, flag) {
      state.loadHostpot = flag
    },
    updateHostpotVisible (state, bool) {
      state.hostpotVisible = bool
    },
    updateGameList (state, row) {
      state.hotGameList = row.hotGameList
      state.newGameList = row.newGameList
    },
    updateGamePageKey (state, pyload) {
      state.gamePageKey = pyload
      sessionStorage.setItem('gamePageKey', JSON.stringify(pyload))
    },
    updateRichpayInitData (state, pyload) {
      state.richpayInitData = pyload
    },
    updateRichpayInitDataLoading (state, bool) {
      state.richpayInitDataLoading = bool
    },
    setFastRegisterWelcomeVisible (state, bool) {
      state.fastRegisterWelcomeVisible = bool
    },
    setChangeAccountInfoVisible (state, bool) {
      state.changeAccountInfoVisible = bool
    },
    setBindMobileNumberVisible (state, bool) {
      state.bindMobileNumberVisible = bool
    },
    setBindMobileNumberTip (state, data) {
      state.bindMobileNumberTip = data
    },
    setCurrentInstroShow (state, bool) {
      state.currentInstroShow = bool
    },
    setPublicMaintainCompData (state, data) {
      state.publicMaintainCompData = data
    }
  },
  actions: {
    getKfUrl ({ commit, state }) {
      return new Promise((resolve, reject) => {
        $http(ApiSetting.index.getKfUrl).then(res => {
          if (res.status === 1) {
            commit('setKFUrl', res.data.cs_link) // 新窗口的地址 客服地址
            commit('setWapUrl', res.data.wap_api_link) // wap地址
            commit('setVerCodeUrl', res.data.captcha_link) // pc地址
            commit('setProxyKFUrl', res.data.proxy_cs_link) // 代理客服地址
          }
        })
      })
    },
    getOnlyKfUrl ({ commit }) {
      return new Promise((resolve, reject) => {
        $http(ApiSetting.index.getCsLinks)
          .then(res => {
            if (res.status === 1 && res.data && res.data.length) {
              console.info('客服链接即时请求新接口：', res)
              commit('setKFUrlByList', res.data)
              resolve(res.data)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getUserInfo ({ dispatch, commit, state }, data) {
      return new Promise((resolve, reject) => {
        $http(ApiSetting.index.getUserInfo, data).then(res => {
          if (res.status === 1) {
            if (res.data.isLogin === 1) {
              storage.set('loggedInFlag', true)
              commit('updateUserInfo', res.data)
              commit('updateLoginStatus', 1)
              dispatch('getIndexAlert')
            } else {
              storage.remove('loggedInFlag')
              commit('updateLoginStatus', 0)
              commit('updateUserInfo', {})
              commit('updateLoadHostpot', false)
            }
          }
        })
      })
    },
    getIndexAlert ({ commit, state }) {
      return new Promise((resolve, reject) => {
        $http(ApiSetting.index.getAlertInfo).then(res => {
          if (res.status === 1) {
            if (res.data.type) {
              commit('setIndexAlertData', res.data)
              if (res.data.type === 6) {
                commit('setShowBirthAside', true)
              } else {
                commit('setShowBirthAside', false)
              }
              if (res.data.type === 7) {
                commit('setshowRegisterRed', true)
              } else {
                commit('setshowRegisterRed', false)
              }
              if (res.data.type === 8) {
                commit('setshowRechargeRed', true)
              } else {
                commit('setshowRechargeRed', false)
              }
              if (
                res.data.type === 9 ||
                res.data.type === 12 ||
                res.data.type === 11 ||
                res.data.type === 10
              ) {
                commit('setStoreValue', {
                  name: 'levelInfo',
                  value: { ...res.data, ...{ isShow: true } }
                })
              } else {
                commit('setStoreValue', {
                  name: 'levelInfo',
                  value: { isShow: false }
                })
              }
            } else {
              commit('setShowBirthAside', false)
              commit('setshowRegisterRed', false)
              commit('setshowRechargeRed', false)
              commit('setStoreValue', {
                name: 'levelInfo',
                value: { isShow: false }
              })
            }
          } else {
            if (res.error_code == 16042) {
              commit('setShowBirthAside', false)
            }
          }
          // commit('setStoreValue', { name:"levelInfo",
          // value:{isShow:true,type:10,level:1,vip_name:'铂金三星',
          //   title:'升级提醒',message:"dskahdouf9u借到卡老师教奥IE入额吴荣额外六"}  })
          resolve()
        })
      })
    },
    getUserMoeny ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('showUserMoneyLoading', data, true)
        var _data = {
          gameCode: data
        }
        $http(ApiSetting.index.getMoney, _data).then(
          res => {
            commit('showUserMoneyLoading', data, false)
            if (res.status === 1) {
              let newData = {
                type: _data.gameCode,
                data: res.data.amount
              }
              commit('updateUserMoney', newData)
            }
          },
          err => {
            commit('showUserMoneyLoading', data, false)
          }
        )
      })
    },
    getUserVirtualMoney ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('showVirtualMoneyLoading', true)
        $http(ApiSetting.index.getVirtualMoney).then(
          res => {
            if (res.status === 1) {
              commit('updateUserVirtualMoney', res.data.amount)
              commit('updateUserInfo', {
                vmall_day_times: res.data.vmall_day_times
              })
            }
            commit('showVirtualMoneyLoading', false)
          },
          err => {
            commit('showVirtualMoneyLoading', false)
          }
        )
      })
    },
    loadTaskCount ({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.isLogin) {
          $http(ApiSetting.index.getTaskCount).then(res => {
            if (res.status === 1) {
              commit('updateTaskCount', res.data)
            }
          })
        }
      })
    },
    // 初始化V富通钱包数据
    getRichpayData ({ commit }) {
      commit('updateRichpayInitDataLoading', true)
      return new Promise((resolve, reject) => {
        $http(ApiSetting.active.richPayInit)
          .then(({ status, data }) => {
            if (status === 1 && data) {
              commit('updateRichpayInitData', data)
            } else {
              commit('updateRichpayInitData', {})
            }
            resolve(data)
          })
          .catch(err => {
            commit('updateRichpayInitData', {})
            reject(err)
          })
          .finally(() => {
            commit('updateRichpayInitDataLoading', false)
          })
      })
    }
  }
})
export default store
