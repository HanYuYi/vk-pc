const serviceModule = {
  index: {
    menuGameList: {
      url: '/Index/getMenuGameList'
    },
    gameTopicList: {
      url: '/Index/getGameTopicList'
    },
    getAlertInfo: {
      url: '/User/alert'
    },
    takeBirthPresent: {
      url: '/User/takeBirthPresent'
    },
    getEbetUrl: {
      url: '/EbetGame/index'
    },
    getAgUrl: {
      url: '/Ag/index/'
    },
    getOuboUrl: {
      url: '/allbetGame/index/'
    },
    getOBLiveUrl: {
      url: '/obGame/index/'
    },
    getWeLiveUrl: {
      url: '/WeGame/index/'
    },
    getPtUrl: {
      url: '/ptGame/index'
    },
    getLyUrl: {
      url: '/LyGame/index/'
    },
    getLuckyChessUrl: {
      url: '/LuckGame/index/'
    },
    getBoleChessUrl: {
      url: '/BlGame/index/'
    },
    getKyGameUrl: {
      url: '/kyGame/index/'
    },
    getPGUrl: {
      url: '/Pg/index/',
      method: 'get'
    },
    getPGList: {
      url: '/Pg/getGameList/'
    },
    getAsGameList: {
      url: '/asGame/getGameList'
    },
    getDragonUrl: {
      url: '/LcGame/index/'
    },
    getMGGameList: {
      url: '/microGame/getGameList/'
    },
    getMGBouns: {
      url: '/microGame/getJackpot/'
    },
    getSportUrl: {
      url: '/SportGame/index/'
    },
    getFbSportUrl: {
      url: '/FbGame/index'
    },
    getBtiSportUrl: {
      url: '/BtiGame/index'
    },
    getPBSportUrl: {
      url: '/PinnacleGame/index'
    },
    getIMSportUrl: {
      url: '/ImsbGame/index'
    },
    getShabaSportUrl: {
      url: '/SabaGame/index'
    },
    getCrownSportUrl: {
      url: '/CrownGame/index'
    },
    getRgGameUrl: {
      url: '/RgGame/index'
    },
    getImGameUrl: {
      url: '/ImGame/index'
    },
    getuwinGameUrl: {
      url: '/uwinGame/index'
    },
    gettfGameGameUrl: {
      url: '/tfGame/index'
    },
    getKfUrl: {
      url: '/extra/getSomeLink/'
    },
    getCsLinks: {
      url: '/extra/getCsLinks/'
    },
    getTaskCount: {
      url: '/User/getTaskNum/',
      hideMsg: true
    },
    getUserInfo: {
      url: '/Index/getLoginInfo/',
      repeat: true
    },
    resetUnusalLogin: {
      url: '/index/resetUnusalLogin/'
    },
    // getCaptcha: {
    //   url: "/extra/geetest?saswdde=" + new Date().getTime(),
    //   method: "get"
    // },
    loginInit: {
      url: '/index/registerInfo/'
    },
    login: {
      url: '/index/dologin/'
    },
    loginOut: {
      url: '/Index/logout/'
    },
    register: {
      url: '/index/register/'
    },
    forgetPass: {
      url: '/Index/forgetPass/'
    },
    getCountryPrefix: {
      url: '/extra/getCountryPrefix/',
      method: 'get'
    },
    sendPhoneVerCode: {
      url: '/Index/checkMessage/'
    },
    getMoney: {
      url: '/Deposit/getMoney/',
      repeat: true,
      timeout: 60000
    },
    getVirtualMoney: {
      url: '/Deposit/getVirtualMoney/'
    },
    getUnReadMsgCount: {
      url: '/User/messageNum/',
      hideMsg: true
    },
    getIndexNotice: {
      url: '/Index/getTopNotice/'
    },
    changeSteam: {
      url: '/UserSteam/ReplaceSteam/'
    },
    home: {
      getHomeData: {
        url: '/Index/index/'
      },
      getHotGameList: {
        url: '/index/getHotGame/'
      },
      getLive: {
        url: '/index/getHotLive'
      }
    },
    getIndexGameTag: {
      url: '/Index/gameTag/'
    },
    homePagePop: {
      // 首页弹窗新加的接口，先请求这个展示王者归来和问卷调查，如果没数据，在请求老接口看是否弹今日热带你
      newRecommend: {
        url: '/index/getIndexAlert'
      },
      // 今日热点老接口
      wonderfulRecommendList: {
        url: '/Index/getWonderfulRecommendList'
      }
    },
    getFunfairGameList: {
      url: '/funfair/getGameList'
    },
    getAgFishUri: {
      url: '/AgFish/index'
    },
    getVkStyleList: {
      url: '/Index/getVkstyleList'
    }
  },
  newEgame: {
    getGameHeadTopList: {
      url: '/game/getGameTopDict/'
    },
    getGameHeadTopListCount: {
      url: '/game/getGameTopNum/',
      repeat: true,
      cancel: true
    },
    getGameTypeList: {
      url: '/game/getNewGameTypeDict/'
    },
    getGameDataList: {
      url: '/game/gameList/'
    },
    getAllPoints: {
      url: '/game/getNewAllPoints/'
    },
    getNewGameDataList: {
      url: '/game/newGameList/',
      cancel: true,
      repeat: true
    },
    getGameItemPointsList: {
      url: '/game/newPointsList/',
      cancel: true,
      repeat: true
    },
    play: {
      url: '/userGame/playMore/',
      timeout: 60000
    },
    reLoadPoint: {
      url: '/game/reloadpoints/',
      repeat: true
    },
    getBetRecordsList: {
      url: '/userGame/getNewUserHistory/'
    },
    addFavortie: {
      url: '/userGame/addfavorite/'
    },
    delFavorite: {
      url: '/userGame/delFavorite/'
    },
    getUserTopList: {
      url: '/game/getTopUser/'
    },
    getLeftGameData: {
      url: '/game/gameschedule/'
    },
    changeTeam: {
      url: '/userGame/changeproject'
    },
    getTeamHistory: {
      url: '/game/teamhistory/'
    },
    getGameTypeCount: {
      url: '/game/newGameTypeCount/',
      repeat: true,
      cancel: true
    },
    cancelAllFavorite: {
      url: '/userGame/delAllFavorite'
    },
    getVkgameRule: {
      url: '/game/getVkgameRule'
    },
    getGameMoney: {
      url: '/game/getGameMoney'
    }
  },
  roll: {
    getRollRoomList: {
      url: '/roll/getList/'
    },
    getRightList: {
      url: '/roll/getListRight/'
    },
    getHistoryList: {
      url: '/roll/getHistory/'
    },
    createCheck: {
      url: '/roll/createcheck/'
    },
    createRoom: {
      url: '/roll/createRoom/'
    },
    getCreateUserPackage: {
      url: '/roll/userPackage/'
    },
    applyRollTags: {
      url: '/roll/applyTags/'
    },
    getRoomInfo: {
      url: '/roll/view/'
    },
    joinRoom: {
      url: '/roll/applyRoom/'
    },
    editRoom: {
      url: '/roll/editRoom/'
    },
    cancelRoom: {
      url: '/roll/cancelRoom/'
    },
    getRoomPlayerList: {
      url: '/roll/getRoomApplyList/'
    },
    getRoomAwardsPlayerList: {
      url: '/roll/getRoomWinList/'
    },
    getTitleMenu: {
      url: '/roll/getTitleMenu'
    }
  },
  user: {
    // 查询用户收货地址
    checkAddress: {
      url: '/UserAddress/getAddress'
    },
    // 添加/修改收货地址
    addAddress: {
      url: '/UserAddress/saveAddress'
    },
    // 查询快递信息
    deliverInfo: {
      url: '/Vmall/delivery'
    },
    // 确认发快递
    confirmExpress: {
      url: '/Vmall/express'
    },
    // 修改快递地址
    modifyExpress: {
      url: '/Vmall/changeAddress'
    },
    // 打开虚拟物品
    openVirGoods: {
      url: '/Vmall/virtualItem'
    },
    // 修改平台帐号信息
    changeAccount: {
      url: '/Vmall/changeAccount'
    },
    // 查询派发信息未处理数量
    deliInfoCount: {
      url: '/Vmall/getDeliveryNum'
    },
    redeemCode: {
      url: '/Deposit/useCoupon/'
    },
    uploadImage: {
      url: '/UserOpen/upload/'
    },
    uploadUserImg: {
      url: '/User/uploadHead/'
    },
    signIn: {
      url: '/User/signInDay/'
    },
    upDateUserInfo: {
      url: '/User/updateBaseInfo/'
    },
    setLoginPwd: {
      url: '/User/resetPassword/'
    },
    setRegisterAfterInfo: {
      url: '/User/updateFastUserInfo'
    },
    setTradePwd: {
      url: '/User/resetSecurityPassword/'
    },
    getSafeQuestion: {
      url: '/User/safeQuestion/'
    },
    setSafeQuestion: {
      url: '/User/setSafeQuestion/'
    },
    verifySafeQuestion: {
      url: '/User/verifySafeQuestion/'
    },
    bindPhone: {
      url: '/User/bindPhone/'
    },
    unBindPhone: {
      url: '/User/verifyOldPhone/'
    },
    updatePhone: {
      url: '/User/updatePhone/'
    },
    getUserBankList: {
      url: '/UserBank/userbankList/'
    },
    getBankUserList: {
      url: '/UserBank/bankAndArea/'
    },
    addUserBankCard: {
      url: '/UserBank/addBank/'
    },
    checkUserBank: {
      url: '/UserBank/checkBank/'
    },
    lockBankCard: {
      url: '/UserBank/lockBank/'
    },
    setDefaultBank: {
      url: '/UserBank/setDefaultBank/'
    },
    getVirtualBankType: {
      url: '/UserVirtualBank/bank/'
    },
    addVirtualBank: {
      url: '/UserVirtualBank/addBank/'
    },
    getVirtualBankList: {
      url: '/UserVirtualBank/userbankList/'
    },
    virtuallockBank: {
      url: '/UserVirtualBank/lockBank/'
    },
    setDefaultVirtual: {
      url: '/UserVirtualBank/setDefaultBank/'
    },
    getTaskList: {
      url: '/User/task/'
    },
    getTaskPrize: {
      url: '/User/getTaskPrize/'
    },
    getMessageList: {
      url: '/User/message/'
    },
    getNoticeList: {
      url: '/Index/getNotice'
    },
    getMessageDetail: {
      url: '/User/messageDetail/'
    },
    setMessageAllRead: {
      url: '/User/setMessageRead/'
    },
    getUserSeoInfo: {
      url: '/User/seo/'
    },
    setSeoKey: {
      url: '/User/saveUserSeo/'
    },
    getSeoRecords: {
      url: '/User/seoPromotionList/'
    },
    getGameWalletList: {
      url: '/Deposit/exchangeList/'
    },
    getDepositList: {
      url: '/Deposit/getdeposittype/'
    },
    getDepositIndexRecords: {
      url: '/Deposit/depositList/'
    },
    exchangeVMoney: {
      url: '/Deposit/exchangeVirtualMoney/',
      timeout: 60000
    },
    getVcoinList: {
      url: '/User/vcoinList'
    },
    getTradingRecordList: {
      url: '/User/orderList/'
    },
    getTradingTypeList: {
      url: '/User/orderTypeList/'
    },
    getExchangeInfo: {
      url: '/Deposit/virtualCenter/'
    },
    applyDeposit: {
      url: '/Deposit/applyDeposit/',
      timeout: 60000
    },
    withdrawIndex: {
      url: '/Deposit/withdraw/'
    },
    withdrawCheck: {
      url: '/Deposit/withdrawCheck/'
    },
    withdrawSubmit: {
      url: '/Deposit/withdrawDo/',
      timeout: 60000
    },
    withdrawToRichPaySubmit: {
      url: '/Deposit/withdrawToRichPay'
    },
    transferSubmit: {
      url: '/Deposit/moneyExchange/'
    },
    getUserPackage: {
      url: '/UserSteam/getUserPackage/'
    },
    openPackage: {
      url: '/roll/openPackage'
    },
    itemExchange: {
      url: '/roll/itemExchange'
    },
    getSteamStock: {
      url: '/UserSteam/getSteamStock/',
      timeout: 60000
    },
    checkSteamTradeStatus: {
      url: '/UserSteam/getSteamTradeStatus/',
      repeat: true
    },
    packageToSteam: {
      url: '/UserSteam/packageToSteam/',
      timeout: 60000
    },
    steamToPackage: {
      url: '/UserSteam/steamToPackage/',
      timeout: 60000
    },
    getPackageRecord: {
      url: '/UserSteam/getPackageRecord/'
    },
    setSteamTradeUrl: {
      url: '/UserSteam/updateTradeUrl/'
    },
    getUserSteamInfo: {
      url: '/UserSteam/getUserSteamInfo/'
    },
    getSteamItemDetail: {
      url: '/Index/steamItemDetail/',
      repeat: true
    },
    // 一键转入
    setQuicklyTransfer: {
      url: '/deposit/setQuicklyTransfer',
      repeat: true
    },
    // 余额回收
    getBackAllMoney: {
      url: '/deposit/getBackAllMoney',
      repeat: true
    }
  },
  active: {
    getActiveList: {
      url: '/Active/index/'
    },
    getNewplayerWelfareList: {
      url: '/Active/welfare/'
    },
    // 老会员回归
    regress: {
      init: {
        url: '/Active/getRegressInit'
      },
      join: {
        url: '/Active/getRegress'
      }
    },
    blockgamereward: {
      url: '/Active/getBlockgameRewardInit'
    },
    register: {
      getPrizeStatus: {
        url: '/Active/registerAndDepositShow/'
      },
      getPrize: {
        url: '/Active/registerAndDepositSend/'
      }
    },
    monopoly: {
      getMonopolyInfo: {
        url: '/Active/monopolyShow/'
      },
      getUserMonopolyInfo: {
        url: '/Active/monopolyShowmy/'
      },
      getUserMonopolyRecords: {
        url: '/Active/monopolyShowmyrecord/'
      },
      monopolyRoll: {
        url: '/Active/monopolySend/'
      },
      monopolyTurn: {
        url: '/Active/monopolyTurntableSend/'
      }
    },
    // 2022 真人首存/复存
    RealPerson2022: {
      FirstRechargeInit: {
        url: '/Active/getRealPersonFirstRechargeInit'
      },
      SecondRechargeInit: {
        url: '/Active/getRealPersonSecondRechargeInit'
      }
    },
    // 2022 棋牌首存/复存
    Chess2022: {
      FirstRechargeInit: {
        url: '/Active/getChessCardsFirstRechargeInit'
      },
      SecondRechargeInit: {
        url: '/Active/getChessCardsSecondRechargeInit'
      }
    },
    // 2022 电玩首存/复存
    Elec2022: {
      FirstRechargeInit: {
        url: '/Active/getVideoGameFirstRechargeInit'
      },
      SecondRechargeInit: {
        url: '/Active/getVideoGameSecondRechargeInit'
      }
    },
    // 2022 英雄联盟全球总决赛
    lols12: {
      init: {
        url: '/Active/getS12Init'
      },
      getTeam: {
        url: '/Active/getGameClan'
      },
      getPlayer: {
        url: '/Active/getGamePlayer'
      },
      DataOverview: {
        url: '/Active/getGameData'
      },
      bestLineup: {
        url: '/Active/getGameLineUp'
      },
      beatCall: {
        url: '/Active/beatCall'
      },
      beatVote: {
        url: '/Active/beatVote'
      },
      myGuess: {
        url: '/Active/getMyQuiz'
      },
      getBonus: {
        url: '/Active/getS12Bonus'
      },
      bonusPool: {
        url: '/Active/getPrizePool'
      },
      exchangeVote: {
        url: '/Active/exchangeVote'
      },
      gameScore: {
        url: '/Active/getGameTimetable'
      },
      gameProcess: {
        url: '/Active/getGameBattleMatch'
      },
      sub: {
        // 集卡初始化
        getCardsinit: {
          url: '/Active/getS12SubInit'
        },
        // 集卡抽卡
        drawCard: {
          url: '/Active/getS12MyCard'
        },
        // 集卡合成
        mixcard: {
          url: '/Active/getS12MixCard'
        },
        // 获取我的背包
        getMyBag: {
          url: '/Active/getS12MyBag'
        },
        // 确定阵容
        confirmTeam: {
          url: '/Active/getS12setTeam'
        },
        // 获取我的战队
        getMyteam: {
          url: '/Active/getS12MyTeam'
        },
        // 合成宝箱
        openGiftBox: {
          url: '/Active/getS12MixBox'
        },
        // 包赔金初始化
        compenInit: {
          url: '/Active/getS12Indemnity'
        },
        // 获取包赔赛事
        getMatchList: {
          url: '/Active/getS12IndemnityGame'
        },
        // 复活金初始化
        liveGoldInit: {
          url: '/Active/getS12Revival'
        },
        getBonus: {
          url: '/Active/getS12SubBonus'
        },
        // 开箱记录
        boxRecord: {
          url: '/Active/getS12MyBox'
        }
      }
    },
    // dota2 阿灵顿
    data2major: {
      url: '/Active/getData2majorinit'
    },
    // 迎新唤友
    callFriends: {
      init: {
        url: '/Active/getCallFriendsInit'
      },
      records: {
        url: '/Active/getCallFriendsRecords'
      }
    },
    // 开箱抽奖
    treasurebox: {
      getTeasureBoxInitInfo: {
        url: '/Active/getTeasureBoxInitInfo/'
      },
      getTeasureBoxRewards: {
        url: '/Active/getTeasureBoxRewards/'
      },
      getTeasureBoxRecordList: {
        url: '/Active/getTeasureBoxRecordList/'
      },
      createTeasureBox: {
        url: '/Active/createTeasureBox/'
      },
      openTeasureBox: {
        url: '/Active/openTeasureBox/'
      }
    },
    // 周年活动
    anniversary: {
      getList: {
        url: '/Active/getAnniversaryList',
        method: 'get'
      },
      getBaseInfo: {
        url: '/Active/getAnniversaryActive',
        method: 'get'
      },
      apply: {
        url: '/Active/joinAnniversary',
        method: 'get'
      }
    },
    // 索拉卡返彩金
    solaka: {
      getBaseInfo: {
        url: '/Active/getEgamebackActive'
      },
      getHandsel: {
        url: '/Active/sendEgameBack'
      }
    },
    // 点金圣手
    mining: {
      getMiningInitInfo: {
        url: '/Active/getMiningInitInfo'
      },
      getMiningRewardsList: {
        url: '/Active/getMiningRewards'
      },
      getMiningRecordList: {
        url: '/Active/getMiningRecordList'
      },
      miningDo: {
        url: '/Active/miningDo'
      }
    },
    // 中秋节
    getMidFestivalInit: {
      url: '/Active/getMidautumn2022Init'
    },
    getNationDayInit: {
      url: '/Active/getNationDayInit'
    },
    // 双十一
    getDouble11DayInit: {
      url: '/Active/getDouble11DayInit'
    },
    joinDouble11Day: {
      url: '/Active/joinDouble11Day'
    },
    getDouble11DayRewards: {
      url: '/Active/getDouble11DayRewards'
    },
    // 新年活动
    getNewYearInit: {
      url: '/Active/getNewYearInit'
    },
    getHistoryRecord: {
      url: '/Active/getHistoryRecord'
    },
    joinNewYearActive: {
      url: '/Active/joinNewYearActive'
    },
    // 元宵节
    getLanternFestivalInit: {
      url: '/Active/getLanternFestivalInit'
    },
    joinLanternFestival: {
      url: '/Active/joinLanternFestival'
    },
    getLanternFestivalRewards: {
      url: '/Active/getLanternFestivalRewards'
    },
    // 成都major活动
    getChengduMajorInit: {
      url: '/Active/getChengduMajorInit'
    },
    receiveChengduMajorBonus: {
      url: '/Active/receiveChengduMajorBonus'
    },
    // 电竞首存
    getEgameFirstTransferInit: {
      url: '/Active/getEgameFirstTransferInit'
    },
    // 体育首存
    getSportFirstTransferInit: {
      url: '/Active/getSportFirstTransferInit'
    },
    // U赢会员
    getUwMemberJoinInit: {
      url: '/active/getUwMemberJoinInit'
    },
    // U赢会员 专属特权优惠
    joinUwMemberPrivilege: {
      url: '/active/joinUwMemberPrivilege'
    },

    // U赢会员 开门红
    joinUwMemberWelcome: {
      url: '/active/joinUwMemberWelcome'
    },

    // 体育救援金
    getSportRescueFundInit: {
      url: '/Active/getSportRescueFundInit'
    },
    // 电竞救援金
    getEgameRescueFundInit: {
      url: '/Active/getEgameRescueFundInit'
    },
    getSportIndemnityInit: {
      // 欧冠包赔
      url: '/Active/getSportIndemnityInit'
    },
    getIndemnityGameList: {
      url: '/Active/getIndemnityGameList'
    },
    // VIP月救援金
    getVipMonthRescueInit: {
      url: '/vip/getVipMonthRescueInit'
    },
    joinVipMonthRescueActive: {
      url: '/vip/joinVipMonthRescueActive'
    },
    // VIP存款优惠
    getVipTransferInit: {
      url: '/vip/getVipTransferInit'
    },

    // VIP月成就奖
    joinVipMonthAchienementAward: {
      url: '/vip/joinVipMonthAchienementAward'
    },

    // VIP月成就奖
    getVipMonthAchienementAwardInit: {
      url: '/vip/getVipMonthAchienementAwardInit'
    },

    getVipTransferBonus: {
      url: '/vip/getVipTransferBonus'
    },
    // VIP游戏体验金
    getVipPrivilegeInit: {
      url: '/vip/getVipPrivilegeInit'
    },
    joinVipPrivilegeActive: {
      url: '/vip/joinVipPrivilegeActive'
    },
    // vip返水
    vipGameBack: {
      url: '/vip/vipGameBack'
    },
    // vip主页面
    getVipHallInit: {
      url: '/vip/getVipHallInit'
    },
    getRewardsMsg: {
      url: '/vip/getRewardsMsg'
    },
    // 呼朋唤友
    getCallFriendInit: {
      url: '/active/getCallFriendInit'
    },
    // 28元电竞体验金
    getEgameRegSendInit: {
      url: '/active/getEgameRegSendInit'
    },
    // pt首存活动
    getPtActiveInit: {
      url: '/active/getPtslotFirstTransferInit'
    },
    // 电子救援金
    getSlotRescueFundInit: {
      url: '/active/getSlotRescueFundInit'
    },
    // 棋牌救援金
    getChessRescueFundInit: {
      url: '/active/getChessRescueFundInit'
    },
    // 棋牌红利周周领
    getChessWeekDepositInit: {
      url: '/active/getChessWeekDepositInit'
    },
    // 雀王活动
    getChessKingInit: {
      url: '/active/getChessKingInit'
    },
    // 真人连赢
    getForeverWinInit: {
      url: '/active/getForeverWinInit'
    },
    // 520
    getMay20Init: {
      url: '/active/getMay20Init'
    },
    joinMay20: {
      url: '/active/joinMay20'
    },
    // 六一活动
    getChildrensDayInit: {
      url: '/active/getChildrensDayInit'
    },
    joinChildrensDay: {
      url: '/active/joinChildrensDay'
    },
    getDragonBoatFestivalInit: {
      url: '/active/getDragonBoatFestivalInit'
    },
    getSportGasInit: {
      url: '/active/getSportGasInit'
    },
    getNewUserExclusiveInit: {
      url: '/active/getNewUserExclusiveInit'
    },
    joinNewUserExclusiveActive: {
      url: '/active/joinNewUserExclusiveActive'
    },
    getOldMembersReturnInit: {
      url: '/active/getOldMembersReturnInit'
    },
    // 每日存款
    getVipDailyDepositInit: {
      url: '/active/getVipDailyDepositInit'
    },
    // 老用户
    getOldUserRecallInit: {
      url: '/active/getOldUserRecallInit'
    },
    joinOldUserRecall: {
      url: '/active/joinOldUserRecall'
    },
    joinFriendRecall: {
      url: '/active/joinFriendRecall'
    },
    getGoodLuckInit: {
      url: '/active/getGoodLuckInit'
    },
    getRealpersonWeekBettingInit: {
      // 真人存款高额返现
      url: '/active/getRealpersonWeekBettingInit'
    },
    getRealWeekDepositInit: {
      url: '/active/getRealWeekDepositInit'
    },
    getQixiInit: {
      url: '/active/getQixiInit'
    },
    joinQixi: {
      url: '/active/joinQixi'
    },
    getAnniversaryInit: {
      url: '/active/getAnniversaryInit'
    },
    joinAnniversaryApply: {
      url: '/active/joinAnniversaryApply'
    },
    joinSignToMining: {
      url: '/active/joinSignToMining'
    },
    getAnniversaryPopup: {
      url: '/active/getAnniversaryPopup'
    },
    getDragonboatfestival2022Init: {
      url: '/active/getDragonBoatFestival2022Init'
    },
    getCnsupperfootballInit: {
      url: '/active/getCnsupperfootballInit'
    },
    getLolS10Init: {
      url: '/active/getLolS10Init'
    },
    joinLolS10Apply: {
      url: '/active/joinLolS10Apply'
    },
    getLols10RecordList: {
      url: '/active/getLols10RecordList'
    },
    sendLolS10Prize: {
      url: '/active/sendLolS10Prize'
    },
    getNationalDay2020Init: {
      url: '/active/getNationalDay2020Init'
    },
    joinNationalDay2020: {
      url: '/active/joinNationalDay2020'
    },
    getBlNiuniuInit: {
      url: '/active/getBlNiuniuInit'
    },
    getS10ResuceInit: {
      url: '/active/getS10ResuceInit'
    },
    getResuce2022Init: {
      url: '/active/getResuce2022Init'
    },
    getEsportsReliveBonusInit: {
      url: '/active/getEsportsReliveBonusInit'
    },
    getEsportBetInit: {
      // mis活动
      url: '/active/getEsportBetInit'
    },
    joinEsportsReliveBonus: {
      url: '/active/joinEsportsReliveBonus'
    },

    getDouble11Day2020Init: {
      url: '/active/getDouble11Day2020Init'
    },
    joinDouble11Day2020: {
      url: '/active/joinDouble11Day2020'
    },
    // 首页左侧悬浮，目前展示S12和世界杯
    leftActiveList: {
      url: '/active/getActiveCountDown '
    },
    getActivePopup: {
      url: '/active/getActivePopup'
    },
    getvirtualCoinDaysInit: {
      url: '/active/getvirtualCoinDaysInit'
    },
    getvirtualCoinFirstInit: {
      url: '/active/getvirtualCoinFirstInit'
    },
    getSportSeriesInit: {
      url: '/active/getSportSeriesInit'
    },
    getChristmas2020Init: {
      url: '/active/getChristmas2020Init'
    },
    joinChristmas2020: {
      url: '/active/joinChristmas2020'
    },
    getUserChristmas2020List: {
      url: '/active/getUserChristmas2020List'
    },
    getNewYear2021Init: {
      url: '/active/getNewYear2021Init'
    },
    getNewYear2021Popup: {
      url: '/active/getNewYear2021Popup'
    },
    joinNewYear2021: {
      url: '/active/joinNewYear2021'
    },
    getGoodLuckNewInit: {
      url: '/active/getGoodLuckNewInit'
    },
    goodLuckUpgradeInit: {
      url: '/active/getGoodLuckUpgradeInit'
    },
    getNewYearUpgradeBonusInit: {
      url: '/active/getNewYearUpgradeBonusInit'
    },

    getSingaporeMajorInit: {
      url: '/active/getSingaporeMajorInit'
    },

    joinNewYearUpgradeBonus: {
      url: '/active/joinNewYearUpgradeBonus'
    },
    getVipTransferAgainInit: {
      url: '/active/getVipTransferAgainInit'
    },
    joinVipTransferAgain: {
      url: '/active/joinVipTransferAgain'
    },
    getChineseYearInit: {
      url: '/active/getChineseYearInit'
    },
    joinChineseYear: {
      url: '/active/joinChineseYear'
    },
    depositRewardNewInit: {
      url: '/active/getDepositRewardNewInit'
    },
    updateDepositRewardData: {
      url: '/active/updateDepositRewardStatus'
    },
    joindepositRewardNew: {
      url: '/active/joinDepositRewardNew'
    },
    // 2021 欧洲杯
    europeanCup2021: {
      getEuropeCupGroup: {
        url: '/active/getEuropeCupGroup',
        method: 'get'
      },
      exEuropeCupMoeny: {
        url: '/active/exEuropeCupMoeny'
      },
      getEuropeCupInit: {
        url: '/active/getEuropeCupInit',
        method: 'get'
      },
      getEuropeLottey: {
        url: '/active/getEuropeCupLottey',
        method: 'get'
      },
      getEuropeCupCover: {
        url: '/active/getEuropeCupCover',
        method: 'get'
      },
      getEuropeCupWelfare: {
        url: '/active/getEuropeCupWelfare'
      },
      getEuropeCupBoost: {
        url: '/active/getEuropeCupBoost',
        method: 'get'
      },
      getEuropeCupWulongWelfare: {
        url: '/active/getEuropeCupWulongWelfare'
      }
    },
    getRechargeVB: {
      url: '/active/getRechargeVB'
    },
    every8BrandDay: {
      url: '/active/getEvery8BrandDay'
    },
    europeCupNostopWinInit: {
      url: '/active/getEuropeCupNostopWinInit'
    },
    getLolS11Group: {
      url: '/active/getS11Group'
    },
    lolS11RebateInit: {
      url: '/active/getS11RechargeRebateInit'
    },
    lolS11PlayChallangeInit: {
      url: '/active/s11PlayChallangeInit'
    },
    dotati10MatchGroup: {
      url: '/active/getTiTenGroup'
    },
    dotati10RebateInit: {
      url: '/active/getTiTenRechargeRebateInit'
    },
    dotati10DividePrizePoolInit: {
      url: '/active/getTiTenDividePrizePoolInit'
    },
    dotati10HistoryRecord: {
      url: '/active/getTiTenHistoryRecord'
    },
    dotati10NotLookHistoryRecord: {
      url: '/active/getNotLookHistoryRecord'
    },
    dotati10setLookHistoryRecord: {
      url: '/active/setLookHistoryRecord'
    },
    sportWeekDepositInit: {
      url: '/active/getSportWeekDepositInit'
    },
    shabaIndemnityActiveInit: {
      url: '/active/getNewSportIndemnityInit'
    },
    csgorescue: {
      url: '/active/csgorescue'
    },
    getVipExclusiveInit: {
      url: '/active/getVipExclusiveInit'
    },
    getDouble11Day2021Init: {
      url: '/active/getDouble11Day2021Init'
    },
    joinDouble11Day2021: {
      url: '/active/joinDouble11Day2021'
    },
    christmas2021Init: {
      url: '/active/getChristmas2021Init'
    },
    christmas2021GetDraw: {
      url: '/active/getDrawReward'
    },
    christmas2021HistoryRecords: {
      url: '/active/getHistoryRecords'
    },
    christmas2021CheckPrizes: {
      url: '/active/checkPrizes'
    },
    // 2022新年活动
    newYear2022: {
      getNewYear2022Init: {
        url: '/active/getNewYear2022Init'
      },
      joinNewYear2022: {
        url: '/active/joinNewYear2022'
      },
      getNewYear2022PrizeList: {
        url: '/active/getNewYear2022PrizeList'
      },
      joinTigerKing: {
        url: '/active/joinTigerKing'
      }
    },
    worldCupPreInit: {
      url: '/active/getWorldCupPreInit'
    },
    usdtDepositInit: {
      url: '/active/getUsdtDepositInit'
    },
    getUsdtDeposit: {
      url: '/Active/joinUsdtDeposit'
    },
    getUsdtDepositAlert: {
      url: '/Active/getUserUsdtAlert'
    },
    lanTern2022: {
      getShangYuan2022Init: {
        url: '/active/getShangYuan2022Init'
      },
      changeShangYuanPuzzle: {
        url: '/active/changeShangYuanPuzzle'
      },
      joinShangYuan2022: {
        url: '/active/joinShangYuan2022'
      },
      getShangYuanApplyGift: {
        url: '/active/getShangYuanApplyGift'
      }
    },
    getFiveMajorLeaguesInit: {
      url: '/active/getFiveMajorLeaguesInit'
    },
    // v富通活动
    richPayInit: {
      url: '/RichPay/getRichPayInit'
    },
    richPayTransferOutToMain: {
      url: '/RichPay/transferOutToMain'
    },
    richPayGetjoinPlus: {
      url: '/RichPay/joinPlus'
    },
    richPaylottery: {
      url: '/RichPay/lottery'
    },
    richPayOrderList: {
      url: '/RichPay/getOrderList'
    },
    richPayWithdrawInterest: {
      url: '/RichPay/withdrawInterest'
    },
    richPaySavePrize: {
      url: '/RichPay/savePrize'
    },
    richPayGetPrizeList: {
      url: '/RichPay/getPrizeList'
    },
    // 2022春季赛
    getActivePcl2022Init: {
      url: '/active/getActivePcl2022Init'
    },
    joinPcl2022DrawReward: {
      url: '/active/joinPcl2022DrawReward'
    },
    joinPcl2022BaoPei: {
      url: '/active/joinPcl2022BaoPei'
    },
    getPcl2022HistoryRecord: {
      url: '/active/getPcl2022HistoryRecord'
    },
    // csgo 2022
    getCsgoMajorInit: {
      url: '/active/getCsgoMajorInit'
    },
    joinCsgoMajorDraw: {
      url: '/active/joinCsgoMajorDraw'
    },
    nba2022: {
      getNbaIndependentInit: {
        url: '/active/getNbaIndependentInit'
      },
      getNbaInit: {
        url: '/active/getNba2022Init'
      },
      getNbaBetInit: {
        url: '/active/getNbaBetReturnInit'
      },
      getNbaWinInit: {
        url: '/active/getNbaProfitReturnInit'
      }
    },
    // msi 2022
    getActiveMsi2022Init: {
      url: '/active/getActiveMsi2022Init',
      timeSign: true
    },
    joinActiveMsi2022Draw: {
      url: '/active/joinActiveMsi2022Draw'
    },
    // 2022 10.1活动
    getMayDayInit: {
      url: '/active/getMayDayInit'
    },
    getMayDayPopup: {
      url: '/active/getMayDayPopup'
    },
    joinMayDay: {
      url: '/active/joinMayDay'
    },
    quartermasterData: {
      init: {
        url: '/active/getActiveQmgInit'
      },
      takeVB: {
        url: '/active/drawQmgDayTask?a=' + new Date().getTime()
      },
      takeSurprised: {
        url: '/active/drawQmgDayPrize?a=' + new Date().getTime()
      }
    },
    // ti11
    dotaTi11: {
      commonInit: {
        url: '/active/getTi11CommonInit'
      },
      initFirstDeposit: {
        url: '/active/getTiElevenRechargeAssitInit'
      },
      initWithThree: {
        url: '/active/getTiElevenBaopeiInit'
      },
      initRollPrizeData: {
        url: '/active/getTiElevenRollInit'
      }
    },
    worldCup2022: {
      worldCupInit: {
        url: '/active/getWorldCupInit'
      },
      worldCupJackpot: {
        url: '/active/getWorldCupJackpot'
      },
      worldCupSchedule: {
        url: '/active/getWorldCupSchedule'
      },
      worldCupScoreboard: {
        url: '/active/getWorldCupScoreboard'
      },
      worldCupPlayers: {
        url: '/active/getWorldCupPlayers'
      },
      worldCupCountries: {
        url: '/active/getWorldCupCountries'
      },
      exchangeVote: {
        url: '/active/worldCupExchange'
      },
      callAndVoteList: {
        url: '/active/worldCupVoteList'
      },
      rankingList: {
        url: '/active/worldCupVoteRank'
      },
      makeCall: {
        url: '/active/worldCupMakeCall'
      },
      vote: {
        url: '/active/worldCupVote'
      },
      myQuiz: {
        url: '/active/worldCupMyQuiz'
      },
      worldCupPrize: {
        url: '/active/getWorldCupPrize'
      }
    },
    worldCup2022Sub: {
      worldCupSubInit: {
        url: '/active/getWorldCupSubInit'
      },
      worldCupChosenApplyList: {
        url: '/active/getWorldCupChosenApplyList'
      },
      worldCupIndemnityInit: {
        url: '/active/getWorldCupIndemnityInit'
      },
      worldCupRevivalInit: {
        url: '/active/getWorldCupRevivalInit'
      },
      worldWorldCupChosen: {
        url: '/active/joinWorldCupChosen'
      }
    },
    initBackwaterForever: {
      url: '/active/getRealPersonDailyReturnInit'
    },
    christmas2022: {
      christmasInit: {
        url: '/active/getActiveChristmasNewYear2022Init'
      },
      christmasJoin: {
        url: '/active/joinActiveChristmasNewYear2022'
      },
      christmasJoinRecords: {
        url: '/active/getActiveChristmasNewYear2022WishRecords'
      }
    },
    newYear2023: {
      rabbitFarmInit: {
        url: '/active/getBunnyFarmInit'
      },
      getRabbitBonus: {
        url: '/active/getFeedBonus'
      },
      rabbitFarmInitRecord: {
        url: '/active/getFeedBonusList'
      },
      rankingListInit: {
        url: '/active/getRabbitYearRankingInit'
      },
      joinRankingBonus: {
        url: '/active/joinRabbitYearRanking'
      },
      redPacketInit: {
        url: '/active/getRabbitYearRainInit'
      },
      redPacketJoin: {
        url: '/active/joinRabbitYearRain'
      }
    },
    playgroundActive: {
      initRedPacketActive: {
        url: '/active/specialvenue'
      },
      initWaterActive: {
        url: '/active/specialwater'
      },
      joinRedPacketBonus: {
        url: '/active/joinSpecialVenue'
      },
      joinWaterBonus: {
        url: '/active/joinSpecialWater'
      }
    },
    dotaMojor: {
      activeInit: {
        url: '/active/getDotaMajor2023Init'
      },
      guessDotaMajor: {
        url: '/active/joinDotaMajor2023'
      },
      getApplyList: {
        url: '/active/getDotaMajor2023ApplyList'
      }
    },
    // msi2023 活动
    msi2023: {
      activeMsi2022Init: {
        url: '/active/getActiveMsi2022Init'
      },
      extraTicket: {
        url: '/active/joinExtraTicket'
      },
      draw: {
        url: '/active/joinActiveMsi2022Draw'
      },
      getGame:{
        url: '/active/getMsi2023Game'
      },
      drawRecords:{
        url: '/active/getActiveMsi2022DrawRecords'
      }
    },
  },
  // 威客历程
  VkHistoryList: {
    url: '/VkHistory/gameList'
  },
  getsponsorInfo: {
    url: '/VkHistory/getSponsorInfo'
  },
  getMatchInfo: {
    url: '/VkHistory/getMatchInfo'
  },
  // 自走棋
  autoChess: {
    getChessInitInfo: {
      method: 'get',
      url: '/activity/getChessInitInfo/'
    },
    getChessAllCards: {
      method: 'get',
      url: '/activity/getChessCards/'
    },
    refreshChessCards: {
      url: '/activity/refreshCards/'
    },
    buyChessCards: {
      url: '/activity/buyCards/'
    },
    sellChessCards: {
      url: '/activity/sellCards/'
    },
    buyChessPackage: {
      url: '/activity/buyPack/'
    },
    swapChessCards: {
      url: '/activity/swapCards/'
    },
    finishUserGuide: {
      method: 'get',
      url: '/activity/finishUserGuide/'
    },
    getLogList: {
      url: '/activity/getLogList '
    }
  },
  // vb商城
  getGoodsType: {
    url: '/vmall/getGoodsType'
  },
  getGoodsList: {
    url: '/vmall/getGoodsList'
  },
  convertGoods: {
    url: '/vmall/convertGoods'
  },
  myConvertList: {
    url: '/vmall/myConvertList'
  },
  getConvertTop: {
    url: '/vmall/getConvertTop'
  },
  // ptgame
  ptSlotgetGameList: {
    url: '/ptSlot/getGameList'
  },
  ptCollectGame: {
    url: '/ptSlot/collectGame'
  },
  pyGetJackpot: {
    url: '/ptSlot/getJackpot'
  },
  // 合营
  getProxyInfoInit: {
    url: '/ProxyApply/getInfoInit'
  },
  ProxyApply: {
    url: '/ProxyApply/apply1'
  },
  // 小艾电竞
  getIaGame: {
    url: '/IaGame/index'
  },
  getGuideGameRule: {
    url: '/game/getGuideGameRule'
  },
  // 调查问卷
  getSurveyInit: {
    url: '/active/getSurveyInit'
  },
  survey: {
    url: '/user/survey'
  },
  // 新版问卷调查
  questionnaire: {
    init: {
      url: '/active/getSurveyGammaInit'
    },
    submit: {
      url: '/active/surveyGammaJoin'
    }
  },
  // csgo major 活动
  csgoInParis: {
    csgoPairsMajorInit: {
      url: '/active/getCsgoPairsMajorInit'
    },
    sign: {
      url: '/active/signCsgoPairsMajor'
    },
    draw: {
      url: '/active/drawCsgoPairsMajor'
    }
  },
  getSpeedLink: {
    url: '/extra/getSpeedLink'
  },
  vkNews: {
    banner: {
      url: '/information/getBanner'
    },
    notice: {
      url: '/information/getNotice'
    },
    newsType: {
      url: '/information/getCategories'
    },
    newsList: {
      url: '/information/getList'
    },
    newsDetail: {
      url: '/information/getDetail'
    }
  }
}
const ApiSetting = { ...serviceModule }

export default ApiSetting
/* export default {
  install: function(Vue, Option) {
    Object.defineProperty(Vue.prototype, "ApiSetting", { value: serviceModule });
  }
}; */
