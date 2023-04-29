import Router from 'vue-router'
import Store from '../store/index'
import $http from '@/common/http'
import ApiSetting from '@/common/serviceModule'
import { MessageBox } from 'element-ui'
import { globalBg, globalGamePage } from './globalConfig'
import storage from '../utils/storage'
import { toPlayGame } from "../utils/playGame"

var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/page/index'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/page/index/index')
        },
        // {path: '/newegame', name: 'newegame', component: () => import('@/page/egame/newegame'), meta: { egame: true }},
        {
          path: '/xiaoaigame',
          name: 'xiaoaigame',
          component: () => import('@/page/triproject/xiaoaigame'),
          meta: { egame: true }
        },
        {
          path: '/sports',
          name: 'sports',
          component: () => import('@/page/triproject/sports'),
          meta: { sports: true, requireAuth: true }
        },
        {
          path: '/fbsports',
          name: 'fbsports',
          component: () => import('@/page/triproject/fbsports'),
          meta: { sports: true, requireAuth: true }
        },
        {
          path: '/btisports',
          name: 'btisports',
          component: () => import('@/page/triproject/btisports'),
          meta: { sports: true, requireAuth: true }
        },
        {
          path: '/pbsports',
          name: 'pbsports',
          component: () => import('@/page/triproject/pbsports'),
          meta: { sports: true }
        },
        {
          path: '/imsports',
          name: 'imsports',
          component: () => import('@/page/triproject/imsports'),
          meta: { sports: true }
        },
        {
          path: '/shabasports',
          name: 'shabasports',
          component: () => import('@/page/triproject/shabasports'),
          meta: { sports: true }
        },
        {
          path: '/crownsports',
          name: 'crownsports',
          component: () => import('@/page/triproject/crownsports'),
          meta: { sports: true, requireAuth: true }
        },
        {
          path: '/rggame',
          name: 'rggame',
          component: () => import('@/page/triproject/rggame'),
          meta: { egame: true }
        },
        {
          path: '/imgame',
          name: 'imgame',
          component: () => import('@/page/triproject/imgame'),
          meta: { egame: true }
        },
        {
          path: '/tfgame',
          name: 'tfgame',
          component: () => import('@/page/triproject/tfgame'),
          meta: { egame: true }
        },
        {
          path: '/roll',
          name: 'roll',
          component: () => import('@/page/roll/rollhome'),
          meta: { youhui: true }
        },
        {
          path: '/roll/createroom',
          name: 'createroom',
          component: () => import('@/page/roll/createroom')
        },
        {
          path: '/roll/:id',
          name: 'rollroom',
          component: () => import('@/page/roll/rollroom'),
          props: true
        },
        /* repurchase--饰品回购 */
        // {path: '/repurchase',name: 'repurchase',component: ()=>import('@/page/roll/repurchase')},
        // {path: '/repurchase/:id',name: 'repurchasedetail',component: ()=>import('@/page/roll/repurchasedetail'),  props: true},
        {
          path: '/ag',
          name: 'ag',
          component: () => import('@/page/triproject/ag'),
          meta: { zhenren: true }
        },
        {
          path: '/pt',
          name: 'pt',
          component: () => import('@/page/triproject/pt'),
          meta: { zhenren: true }
        },
        {
          path: '/oubo',
          name: 'oubo',
          meta: { zhenren: true, requireAuth: true },
          component: () => import('@/page/triproject/public-maintain'),
          beforeEnter: async (to, from, next) => {
            toPlayGame({ api: ApiSetting.index.getOuboUrl, next })
          }
        },
        {
          path: '/oblive',
          name: 'oblive',
          meta: { zhenren: true, requireAuth: true },
          component: () => import('@/page/triproject/public-maintain'),
          beforeEnter: (to, from, next) => {
            toPlayGame({ api: ApiSetting.index.getOBLiveUrl, next })
          }
        },
        {
          path: '/wegame',
          name: 'wegame',
          meta: { zhenren: true, requireAuth: true },
          component: () => import('@/page/triproject/public-maintain'),
          beforeEnter: (to, from, next) => {
            toPlayGame({ api: ApiSetting.index.getWeLiveUrl, next })
          }
        },
        {
          path: '/lygame',
          name: 'lygame',
          component: () => import('@/page/triproject/lygame'),
          meta: { qipai: true }
        },
        {
          path: '/bolegame',
          name: 'bolegame',
          component: () => import('@/page/triproject/bolegame'),
          meta: { qipai: true }
        },
        {
          path: '/dragongame',
          name: 'dragongame',
          component: () => import('@/page/triproject/dragongame'),
          meta: { qipai: true }
        },
        {
          path: '/kygame',
          name: 'kygame',
          component: () => import('@/page/triproject/kygame'),
          meta: { qipai: true }
        },
        {
          path: '/agfish',
          name: 'agfish',
          meta: { moreGameNav: true, requireAuth: true },
          component: () => import('@/page/triproject/public-maintain'),
          beforeEnter: async (to, from, next) => {
            toPlayGame({ api: ApiSetting.index.getAgFishUri, next })
          }
        },
        {
          path: '/ptgame',
          name: 'ptgame',
          component: () => import('@/page/triproject/ptgame'),
          meta: { moreGameNav: true }
        },
        {
          path: '/pggame',
          name: 'pggame',
          component: () => import('@/page/triproject/pggame'),
          meta: { moreGameNav: true }
        },
        {
          path: '/funfair',
          name: 'funfair',
          component: () => import('@/page/triproject/funfair'),
          meta: { moreGameNav: true }
        },
        // {
        //   path: '/asgame',
        //   name: 'asgame',
        //   component: () => import('@/page/triproject/as-game'),
        //   meta: { moreGameNav: true }
        // },
        {
          path: '/appshow',
          name: 'appshow',
          component: () => import('@/page/appshow')
        },
        {
          path: '/active',
          name: 'active',
          component: () => import('@/page/active/activehome'),
          children: [
            {
              meta: { youhui: true },
              path: '',
              name: 'activenav',
              component: () => import('@/page/active/activenav')
            },
            {
              meta: { youhui: true },
              path: '/active/regress',
              name: 'regress',
              component: () => import('@/page/active/general/regress/index')
            },
            {
              meta: { youhui: true },
              path: '/active/callfriend',
              name: 'callfriend',
              component: () => import('@/page/active/general/callfriend')
            },
            {
              meta: { youhui: true },
              path: '/active/singaporemajor',
              name: 'singaporemajor',
              component: () => import('@/page/active/general/singaporemajor')
            }, // 新加坡Major限时活动
            {
              meta: { youhui: true },
              path: '/active/vipachienement',
              name: 'vipachienement',
              component: () => import('@/page/active/vip/vipachienement')
            }, // VIP月成就奖
            {
              meta: { youhui: true },
              path: '/active/uwwelcome',
              name: 'uwwelcome',
              component: () => import('@/page/active/sport/uwwelcome')
            }, // u赢  电竞
            {
              meta: { youhui: true },
              path: '/active/blockgamereward',
              name: 'blockgamereward',
              component: () => import('@/page/active/general/blockgamereward')
            },

            {
              meta: { youhui: true },
              path: '/active/esportbet',
              name: 'esportbet',
              component: () => import('@/page/active/sport/esportbet')
            }, // MIS季中邀请赛专场

            // {meta: {youhui: true },path: '/active/sport',name: 'sportactive',component: ()=>import('@/page/active/sport/sportactive')},
            // {meta: {youhui: true },path: '/active/pbsport',name: 'pbsportactive',component: ()=>import('@/page/active/sport/pbsportactive')},
            // {meta: {youhui: true },path: '/active/agactive',name: 'agactive',component: ()=>import('@/page/active/realperson/agactive')},
            // {meta: {youhui: true },path: '/active/luckyactive',name: 'luckyactive',component: ()=>import('@/page/active/chess/luckyactive')},
            {
              meta: { youhui: true },
              path: '/active/newplayerwelfare',
              name: 'newplayerwelfare',
              component: () => import('@/page/active/general/newplayerwelfare')
            },
            {
              meta: { youhui: true },
              path: '/active/getvirmoney',
              name: 'getvirmoney',
              component: () => import('@/page/active/general/getvirmoney')
            },
            // {meta: {youhui: true },path: '/active/registeractive',name: 'registeractive',component: ()=>import('@/page/active/general/registeractive')},
            // {meta: {youhui: true },path: '/active/lygameactive',name: 'lyactive',component: ()=>import('@/page/active/chess/lygameactive')},
            // {meta: {youhui: true },path: '/active/monopoly',name: 'monopoly',component: ()=>import('@/page/active/recreation/monopoly')},
            // {meta: {youhui: true },path: '/active/mgactive',name: 'mgactive',component: ()=>import('@/page/active/elec/mgactive')},
            // {meta: {youhui: true },path: '/active/ebetactive',name: 'ebetactive',component: ()=>import('@/page/active/realperson/ebetactive')},
            // {meta: {youhui: true },path: '/active/treasurebox',name: 'treasurebox',component: ()=>import('@/page/active/recreation/treasurebox')},
            // {meta: {youhui: true },path: '/active/anniversary',name: 'anniversary',component: ()=>import('@/page/active/festival/anniversary')},
            // {meta: {youhui: true },path: '/active/anniversary2020',name: 'anniversary2020',component: ()=>import('@/page/active/festival/anniversary2020')},
            // {meta: {youhui: true },path: '/active/solaka',name: 'solaka',component: ()=>import('@/page/active/egame/solaka')},
            {
              meta: { youhui: true },
              path: '/active/goodluck',
              name: 'goodluck',
              component: () => import('@/page/active/general/goodluck')
            },
            {
              meta: { youhui: true },
              path: '/active/goodlucknew',
              name: 'goodlucknew',
              component: () => import('@/page/active/general/goodlucknew')
            },
            {
              meta: { youhui: true },
              path: '/active/mining',
              name: 'mining',
              component: () => import('@/page/active/recreation/mining')
            },
            {
              meta: { youhui: true },
              path: '/active/playground',
              name: 'playground',
              component: () => import('@/page/active/recreation/playground')
            },
            {
              meta: { youhui: true },
              path: '/active/midautumn2022',
              name: 'midautumn2022',
              component: () => import('@/page/active/festival/midautumn2022')
            },
            {
              meta: { youhui: true },
              path: '/active/dragonboatfestival2022',
              name: 'dragonboatfestival2022',
              component: () =>
                import('@/page/active/festival/dragonboatfestival2022')
            },
            // {meta: {youhui: true },path: '/active/nationalday',name: 'nationalday',component: ()=>import('@/page/active/festival/nationalday')},
            // {meta: {youhui: true },path: '/active/nationalday2020',name: 'nationalday2020',component: ()=>import('@/page/active/festival/nationalday2020')},
            // {meta: {youhui: true },path: '/active/doubleeleven',name: 'doubleeleven',component: ()=>import('@/page/active/festival/doubleeleven')},
            {
              meta: { youhui: true },
              path: '/active/doubleeleven2020',
              name: 'doubleeleven2020',
              component: () => import('@/page/active/festival/doubleeleven2020')
            },
            // {meta: {youhui: true },path: '/active/lanternfestival',name: 'lanternactive',component: ()=>import('@/page/active/festival/lanternactive')},
            // {meta: {youhui: true },path: '/active/newyear',name: 'newyear',component: ()=>import('@/page/active/festival/newyear')},
            // {meta: {youhui: true },path: '/active/ouboactive',name: 'ouboactive',component: ()=>import('@/page/active/realperson/ouboactive')},
            {
              meta: { youhui: true },
              path: '/active/egamerescueactive',
              name: 'egamerescueactive',
              component: () => import('@/page/active/egame/egamerescueactive')
            },
            {
              meta: { youhui: true },
              path: '/active/charitableactive',
              name: 'charitableactive',
              component: () => import('@/page/active/general/charitableactive')
            },
            {
              meta: { youhui: true },
              path: '/active/charitableactivetwo',
              name: 'charitableactivetwo',
              component: () =>
                import('@/page/active/general/charitableactivetwo')
            },
            {
              meta: { youhui: true },
              path: '/active/sportshoucun',
              name: 'sportshoucun',
              component: () => import('@/page/active/sport/sportshoucun')
            },
            {
              meta: { youhui: true },
              path: '/active/egameshoucun',
              name: 'egameshoucun',
              component: () => import('@/page/active/egame/egameshoucun')
            },
            // {meta: {youhui: true }, path: '/active/sportrescueactive', name: 'sportrescueactive', component: () => import('@/page/active/sport/sportrescueactive')},
            // {meta: {youhui: true },path: '/active/cdmajor',name: 'cdmajor',component: ()=>import('@/page/active/general/cdmajor')},
            {
              meta: { youhui: true },
              path: '/active/indemnity',
              name: 'indemnity',
              component: () => import('@/page/active/sport/indemnity')
            },
            {
              meta: { youhui: true },
              path: '/active/viptransfer',
              name: 'viptransfer',
              component: () => import('@/page/active/vip/viptransfer')
            },
            {
              meta: { youhui: true },
              path: '/active/vipback',
              name: 'vipback',
              component: () => import('@/page/active/vip/vipback')
            },
            {
              meta: { youhui: true },
              path: '/active/vipmonthrescue',
              name: 'vipmonthrescue',
              component: () => import('@/page/active/vip/vipmonthrescue')
            },
            {
              meta: { youhui: true },
              path: '/active/vipprivilege',
              name: 'vipprivilege',
              component: () => import('@/page/active/vip/vipprivilege')
            },
            {
              meta: { youhui: true },
              path: '/active/newuserprivilege',
              name: 'newuserprivilege',
              component: () => import('@/page/active/general/newuserprivilege')
            },
            {
              meta: { youhui: true },
              path: '/active/chessrescue',
              name: 'chessrescue',
              component: () => import('@/page/active/chess/chessrescue')
            },
            {
              meta: { youhui: true },
              path: '/active/realpersonrescue',
              name: 'realpersonrescue',
              component: () =>
                import('@/page/active/realperson/realpersonrescue')
            },
            {
              meta: { youhui: true },
              path: '/active/ptactive',
              name: 'ptactive',
              component: () => import('@/page/active/elec/ptactive')
            },
            {
              meta: { youhui: true },
              path: '/active/slotrescue',
              name: 'slotrescue',
              component: () => import('@/page/active/elec/slotrescue')
            },
            {
              meta: { youhui: true },
              path: '/active/chessking',
              name: 'chessking',
              component: () => import('@/page/active/chess/chessking')
            },
            {
              meta: { youhui: true },
              path: '/active/chessweekdeposit',
              name: 'chessweekdeposit',
              component: () => import('@/page/active/chess/chessweekdeposit')
            }, // 棋牌红利周周领
            {
              meta: { youhui: true },
              path: '/active/foreverwin',
              name: 'foreverwin',
              component: () => import('@/page/active/realperson/foreverwin')
            },
            {
              meta: { youhui: true },
              path: '/active/realweekdeposit',
              name: 'realweekdeposit',
              component: () =>
                import('@/page/active/realperson/realweekdeposit')
            }, // 真人存款高额返现
            {
              meta: { youhui: true },
              path: '/active/RealPersonFirstRecharge',
              name: 'RealPersonFirstRecharge',
              component: () =>
                import('@/page/active/realperson/RealPersonFirstRecharge')
            }, // 2022 真人首存
            {
              meta: { youhui: true },
              path: '/active/RealPersonSecondRecharge',
              name: 'RealPersonSecondRecharge',
              component: () =>
                import('@/page/active/realperson/RealPersonSecondRecharge')
            }, // 2022 真人复存
            {
              meta: { youhui: true },
              path: '/active/ChessCardsFirstRecharge',
              name: 'ChessCardsFirstRecharge',
              component: () =>
                import('@/page/active/chess/ChessCardsFirstRecharge')
            }, // 2022 棋牌首存
            {
              meta: { youhui: true },
              path: '/active/ChessCardsSecondRecharge',
              name: 'ChessCardsSecondRecharge',
              component: () =>
                import('@/page/active/chess/ChessCardsSecondRecharge')
            }, // 2022 棋牌复存
            {
              meta: { youhui: true },
              path: '/active/VideoGameFirstRecharge',
              name: 'VideoGameFirstRecharge',
              component: () =>
                import('@/page/active/elec/VideoGameFirstRecharge')
            }, // 2022 电玩首存
            {
              meta: { youhui: true },
              path: '/active/VideoGameSecondRecharge',
              name: 'VideoGameSecondRecharge',
              component: () =>
                import('@/page/active/elec/VideoGameSecondRecharge')
            }, // 2022 电玩复存

            // {meta: {youhui: true },path: '/active/loveday',name: 'loveday',component: ()=>import('@/page/active/festival/loveday')},
            // {meta: {youhui: true },path: '/active/childrensday',name: 'childrensday',component: ()=>import('@/page/active/festival/childrensday')},
            {
              meta: { youhui: true },
              path: '/active/dragonboatfestival',
              name: 'dragonboatfestival',
              component: () =>
                import('@/page/active/festival/dragonboatfestival')
            },
            {
              meta: { youhui: true },
              path: '/active/sportgas',
              name: 'sportgas',
              component: () => import('@/page/active/sport/sportgas')
            },
            {
              meta: { youhui: true },
              path: '/active/newuserexclusive',
              name: 'newuserexclusive',
              component: () => import('@/page/active/general/newuserexclusive')
            },
            {
              meta: { youhui: true },
              path: '/active/olduserrecall',
              name: 'olduserrecall',
              component: () => import('@/page/active/general/olduserrecall')
            },
            {
              meta: { youhui: true },
              path: '/active/vipdailydeposit',
              name: 'vipdailydeposit',
              component: () => import('@/page/active/vip/vipdailydeposit')
            },
            {
              meta: { youhui: true },
              path: '/active/realpersonweek',
              name: 'realpersonweek',
              component: () => import('@/page/active/realperson/realpersonweek')
            },
            {
              meta: { youhui: true },
              path: '/active/realPersonDailyReturn',
              name: 'realPersonDailyReturn',
              component: () =>
                import('@/page/active/realperson/realPersonDailyReturn')
            },
            {
              meta: { youhui: true },
              path: '/active/qixifestival',
              name: 'qixifestival',
              component: () => import('@/page/active/festival/qixifestival')
            },
            {
              meta: { youhui: true },
              path: '/active/lols10',
              name: 'lols10',
              component: () => import('@/page/active/egame/lols10')
            },
            {
              meta: { youhui: true },
              path: '/active/boleniuniu',
              name: 'boleniuniu',
              component: () => import('@/page/active/chess/boleniuniu')
            },
            {
              meta: { youhui: true },
              path: '/active/s10rescue',
              name: 's10rescue',
              component: () => import('@/page/active/egame/s10rescue')
            },
            {
              meta: { youhui: true },
              path: '/active/lols11',
              name: 'lols11',
              component: () => import('@/page/active/egame/s11active')
            },
            {
              meta: { youhui: true },
              path: '/active/dotati10',
              name: 'dotati10',
              component: () => import('@/page/active/egame/dotati10')
            },
            {
              meta: { youhui: true },
              path: '/active/dotati11',
              name: 'dotati11',
              component: () => import('@/page/active/egame/dotati11')
            },
            {
              meta: { youhui: true },
              path: '/active/data2major',
              name: 'data2major',
              component: () => import('@/page/active/egame/data2major')
            },
            {
              meta: { youhui: true },
              path: '/active/virtualcoindays',
              name: 'virtualcoindays',
              component: () => import('@/page/active/general/virtualcoindays')
            },
            {
              meta: { youhui: true },
              path: '/active/virtualcoinfirst',
              name: 'virtualcoinfirst',
              component: () => import('@/page/active/general/virtualcoinfirst')
            },
            {
              meta: { youhui: true },
              path: '/active/goodluckupgrade',
              name: 'goodLuckUpgrade',
              component: () => import('@/page/active/general/goodLuckUpgrade')
            },
            {
              meta: { youhui: true },
              path: '/active/depositrewardnew',
              name: 'depositRewardNew',
              component: () => import('@/page/active/general/depositRewardNew')
            },
            {
              meta: { youhui: true },
              path: '/active/usdtdeposit',
              name: 'usdtdeposit',
              component: () => import('@/page/active/general/usdtdeposit')
            },
            {
              meta: { youhui: true },
              path: '/active/quartermaster',
              name: 'quartermaster',
              component: () => import('@/page/active/general/quartermaster')
            },
            {
              meta: { youhui: true },
              path: '/active/sportseries',
              name: 'sportseries',
              component: () => import('@/page/active/sport/sportseries')
            },
            // {meta: {youhui: true },path: '/active/christmas',name: 'christmas',component: ()=>import('@/page/active/festival/christmas')},
            {
              meta: { youhui: true },
              path: '/active/vipriserank',
              name: 'vipriserank',
              component: () => import('@/page/active/vip/vipriserank')
            },
            {
              meta: { youhui: true },
              path: '/active/viptransferagain',
              name: 'viptransferagain',
              component: () => import('@/page/active/vip/viptransferagain')
            },
            {
              meta: { youhui: true },
              path: '/active/chineseyear',
              name: 'chineseyear',
              component: () => import('@/page/active/festival/chineseyear')
            },
            {
              meta: { youhui: true },
              path: '/active/csgorescue',
              name: 'csgorescue',
              component: () => import('@/page/active/egame/lpl2022.vue')
            },
            // LPL夏季救援金和下面德玛西亚2022用的一个接口，该页面暂时不要了
            // {
            //   meta: { youhui: true },
            //   path: '/active/csgorescue2022',
            //   name: 'csgorescue2022',
            //   component: () => import('@/page/active/egame/csgorescue2022.vue')
            // },
            {
              meta: { youhui: true },
              path: '/active/csgorescue2022',
              name: 'demacia2022',
              component: () => import('@/page/active/egame/demacia2022.vue')
            },
            {
              meta: { youhui: true },
              path: '/active/callfriends',
              name: 'callfriends',
              component: () => import('@/page/active/general/callfriends.vue')
            }, // 迎新唤友活动
            {
              meta: { youhui: true },
              path: '/active/esportsrelive',
              name: 'esportsrelive',
              component: () => import('@/page/active/sport/esportsrelive')
            }, // CSGO 复活赛
            {
              meta: { youhui: true },
              path: '/active/europeanCup2021',
              name: 'europeanCup2021',
              component: () => import('@/page/active/festival/europeanCup2021')
            },
            {
              meta: { youhui: true },
              path: '/active/rechargeVB',
              name: 'rechargeVB',
              component: () => import('@/page/active/festival/rechargeVB')
            },
            {
              meta: { youhui: true },
              path: '/active/every8BrandDay',
              name: 'every8BrandDay',
              component: () => import('@/page/active/sport/every8BrandDay')
            },
            {
              meta: { youhui: true },
              path: '/active/alwaysWon',
              name: 'alwaysWon',
              component: () => import('@/page/active/sport/alwaysWon')
            },
            {
              meta: { youhui: true },
              path: '/active/sportWeekDeposit',
              name: 'sportWeekDeposit',
              component: () => import('@/page/active/sport/sportWeekDeposit')
            },
            {
              meta: { youhui: true },
              path: '/active/sabaIndemnity',
              name: 'sabaIndemnity',
              component: () => import('@/page/active/sport/sabaIndemnity')
            },
            {
              meta: { youhui: true },
              path: '/active/vipexclusive',
              name: 'vipexclusive',
              component: () => import('@/page/active/vip/vipexclusive.vue')
            },
            {
              meta: { youhui: true },
              path: '/active/double11',
              name: 'double11',
              component: () =>
                import('@/page/active/festival/doubleeleven2021.vue')
            },
            {
              meta: { youhui: true },
              path: '/active/christmas2021',
              name: 'christmas2021',
              component: () =>
                import('@/page/active/festival/christmas2021.vue')
            },
            {
              meta: { youhui: true },
              path: '/active/christmasnewyear2022',
              name: 'christmas2022',
              component: () =>
                import('@/page/active/festival/christmas2022')
            },
            {
              meta: { youhui: true },
              path: '/active/newyear2022',
              name: 'newyear2022',
              component: () => import('@/page/active/festival/newyear2022.vue')
            },
            {
              meta: { youhui: true },
              path: '/active/newyear2023',
              name: 'newyear2023',
              component: () => import('@/page/active/festival/newYear2023')
            },
            {
              meta: { youhui: true },
              path: '/active/worldCupQualifier2022',
              name: 'worldCupQualifier2022',
              component: () =>
                import('@/page/active/festival/worldCupQualifier2022.vue')
            },
            {
              meta: { youhui: true },
              path: '/active/worldCup2022',
              name: 'worldCup2022',
              component: () => import('@/page/active/festival/worldCup2022')
            },
            {
              meta: { youhui: true },
              path: '/active/worldCup2022Sub',
              name: 'worldCup2022Sub',
              component: () => import('@/page/active/festival/worldCup2022Sub')
            },
            {
              meta: { youhui: true },
              path: '/active/shangyuan2022',
              name: 'shangyuan2022',
              component: () => import('@/page/active/festival/lantern2022.vue')
            },
            {
              meta: { youhui: true },
              path: '/active/nbaIndependent',
              name: 'nbaIndependent',
              component: () => import('@/page/active/festival/nbaIndependent')
            },
            {
              meta: { youhui: true },
              path: '/active/nba2022',
              name: 'nba2022',
              component: () => import('@/page/active/festival/nba2022')
            },
            {
              meta: { youhui: true },
              path: '/active/fiveMajorLeagues2022',
              name: 'fiveMajorLeagues2022',
              component: () =>
                import('@/page/active/sport/fiveMajorLeagues2022.vue')
            },
            {
              meta: { youhui: true },
              path: '/active/cnsupperfootball',
              name: 'cnsupperfootball',
              component: () =>
                import('@/page/active/sport/cnsupperfootball.vue')
            },
            {
              meta: { youhui: true },
              path: '/richpay',
              name: 'richpay',
              component: () => import('@/page/richpay/index.vue')
            },
            {
              meta: { youhui: true },
              path: '/active/pcl2022',
              name: 'pcl2022',
              component: () => import('@/page/active/egame/spring2022.vue')
            },
            {
              meta: { youhui: true },
              path: '/active/nationalday',
              name: 'nationalDay',
              component: () =>
                import('@/page/active/festival/nationalDay2022.vue')
            },
            {
              meta: { youhui: true },
              path: '/active/csgomajor',
              name: 'csgomajor',
              component: () => import('@/page/active/egame/csgoMajor.vue')
            },
            {
              meta: { youhui: true },
              path: '/active/msi2022',
              name: 'msi2022',
              component: () => import('@/page/active/egame/msi2022.vue')
            },
            {
              meta: { youhui: true },
              path: '/active/lols12',
              name: 'lols12',
              component: () => import('@/page/active/egame/LOL12/lols12.vue')
            }, // 英雄联盟2022全球总决赛
            {
              meta: { youhui: true },
              path: '/active/lols12sub',
              name: 'lols12sub',
              component: () => import('@/page/active/egame/LOL12/lols12sub.vue')
            }, // 英雄联盟2022全球总决赛子活动
            {
              meta: { youhui: true },
              path: '/active/dotaMojor',
              name: 'dotaMojor',
              component: () => import('@/page/active/egame/dotaMojor')
            },
            {
              meta: { youhui: true },
              path: '/active/csgoInParis',
              name: 'csgoInParis',
              component: () => import('@/page/active/egame/csgoInParis')
            },
            {
              meta: { youhui: true },
              path: '/active/msi2023',
              name: 'msi2023',
              component: () => import('@/page/active/egame/msi2023')
            }
          ]
        },
        {
          path: '/user',
          name: 'userhome',
          component: () => import('@/page/user/userhome'),
          meta: { user: true },
          children: [
            {
              path: '',
              name: 'useroverview',
              component: () => import('@/page/user/useroverview'),
              meta: { requireAuth: true }
            },
            {
              path: '/user/finance',
              name: 'finance',
              component: () => import('@/page/user/finance'),
              meta: { requireAuth: true },
              children: [
                {
                  path: '/user/finance/',
                  name: 'userdeposit',
                  component: () => import('@/page/user/finance/deposit'),
                  meta: { requireAuth: true }
                },
                {
                  path: '/user/finance/withdraw',
                  name: 'userwithdraw',
                  component: () => import('@/page/user/finance/withdraw'),
                  meta: { requireAuth: true }
                },
                {
                  path: '/user/finance/transfer',
                  name: 'usertransfer',
                  component: () => import('@/page/user/finance/transfer'),
                  meta: { requireAuth: true }
                },
                {
                  path: '/user/finance/exchange',
                  name: 'userexchange',
                  component: () => import('@/page/user/finance/exchange'),
                  meta: { requireAuth: true }
                },
                {
                  path: '/user/finance/tradingrecord',
                  name: 'usertradingrecord',
                  component: () => import('@/page/user/finance/tradingrecord'),
                  meta: { requireAuth: true }
                },
                {
                  path: '/user/finance/vbdetail',
                  name: 'vbdetail',
                  component: () => import('@/page/user/finance/vbdetail'),
                  meta: { requireAuth: true }
                }
              ]
            },
            {
              path: '/user/seo',
              name: 'seo',
              component: () => import('@/page/user/seo'),
              meta: { requireAuth: true }
            },
            {
              path: '/user/message',
              name: 'message',
              component: () => import('@/page/user/message'),
              meta: { requireAuth: true }
            },
            {
              path: '/user/task',
              name: 'task',
              component: () => import('@/page/user/task'),
              meta: { requireAuth: true }
            },
            {
              path: '/user/package',
              name: 'package',
              component: () => import('@/page/user/package'),
              meta: { requireAuth: true }
            },
            {
              path: '/user/infosetting',
              name: 'infosetting',
              component: () => import('@/page/user/infosetting/infosetting'),
              meta: { requireAuth: true },
              children: [
                {
                  path: '/user/infosetting/',
                  name: 'userinfo',
                  component: () => import('@/page/user/infosetting/userinfo'),
                  meta: { requireAuth: true }
                },
                {
                  path: '/user/infosetting/safeset',
                  name: 'safeset',
                  component: () => import('@/page/user/infosetting/safeset'),
                  meta: { requireAuth: true }
                },
                {
                  path: '/user/infosetting/bank',
                  name: 'bankset',
                  component: () => import('@/page/user/infosetting/bank'),
                  meta: { requireAuth: true }
                },
                {
                  path: '/user/infosetting/virtualcurrency',
                  name: 'bankset',
                  component: () =>
                    import('@/page/user/infosetting/virtualcurrency'),
                  meta: { requireAuth: true }
                }
              ]
            }
          ]
        },
        {
          path: '/serviceterms',
          name: 'serviceterms',
          component: () => import('@/page/about/serviceterms')
        },
        {
          path: '/contactus',
          name: 'contactus',
          component: () => import('@/page/about/contactus')
        },
        {
          path: '/privacy',
          name: 'privacy',
          component: () => import('@/page/about/privacy')
        },
        {
          path: '/responsible',
          name: 'responsible',
          component: () => import('@/page/about/responsible')
        },
        {
          path: '/questionnaire',
          name: 'questionnaire',
          component: () => import('@/page/about/questionnaire')
        },
        {
          path: '/guide',
          name: 'guide',
          component: () => import('@/page/about/guide'),
          children: [
            {
              path: '',
              name: 'guideopen',
              component: () => import('@/page/about/guide/guideopen')
            },
            {
              path: '/guide/2',
              name: 'guidereg',
              component: () => import('@/page/about/guide/guidereg')
            },
            {
              path: '/guide/3-1',
              name: 'guidekjzf',
              component: () => import('@/page/about/guide/guidekjzf')
            },
            {
              path: '/guide/3-2',
              name: 'guidesmzf',
              component: () => import('@/page/about/guide/guidesmzf')
            },
            {
              path: '/guide/3-3',
              name: 'guideyhkzc',
              component: () => import('@/page/about/guide/guideyhkzc')
            },
            {
              path: '/guide/4',
              name: 'guidewithdraw',
              component: () => import('@/page/about/guide/guidewithdraw')
            },
            {
              path: '/guide/5',
              name: 'guidetransfer',
              component: () => import('@/page/about/guide/guidetransfer')
            },
            {
              path: '/guide/6-1',
              name: 'guideegame',
              component: () => import('@/page/about/guide/guideegame')
            },
            {
              path: '/guide/6-2',
              name: 'guidesport',
              component: () => import('@/page/about/guide/guidesport')
            },
            // {path: '/guide/7-1',name: 'guideag',component: ()=>import('@/page/about/guide/guideag')},
            // {path: '/guide/8-1',name: 'guidelevelupdate',component: ()=>import('@/page/about/guide/guidelevelupdate')},
            // {path: '/guide/8-2',name: 'guidelevelequities',component: ()=>import('@/page/about/guide/guidelevelequities')},
            {
              path: '/guide/9-1',
              name: 'guidevbrule',
              component: () => import('@/page/about/guide/guidevbrule')
            },
            {
              path: '/guide/9-2',
              name: 'guidegetvb',
              component: () => import('@/page/about/guide/guidegetvb')
            },
            {
              path: '/guide/9-3',
              name: 'guideexchange',
              component: () => import('@/page/about/guide/guideexchange')
            },
            {
              path: '/guide/10-1',
              name: 'guidecreateroll',
              component: () => import('@/page/about/guide/guidecreateroll')
            },
            {
              path: '/guide/10-2',
              name: 'guidejoinroll',
              component: () => import('@/page/about/guide/guidejoinroll')
            },
            {
              path: '/guide/10-3',
              name: 'guideapplyactor',
              component: () => import('@/page/about/guide/guideapplyactor')
            },
            {
              path: '/guide/10-4',
              name: 'guiderollactionrule',
              component: () => import('@/page/about/guide/guiderollactionrule')
            },
            // {path: '/guide/11', name: 'guidegamerule', component: () => import('@/page/about/guide/guidegamerule')},
            {
              path: '/guide/12',
              name: 'guideforgetpwd',
              component: () => import('@/page/about/guide/guideforgetpwd')
            },
            {
              path: '/guide/13',
              name: 'guideseo',
              component: () => import('@/page/about/guide/guideseo')
            },
            {
              path: '/guide/14',
              name: 'guidepackage',
              component: () => import('@/page/about/guide/guidepackage')
            },
            {
              path: '/guide/15',
              name: 'guidequestion',
              component: () => import('@/page/about/guide/guidequestion')
            },
            {
              path: '/guide/16-1',
              name: 'guideisvb',
              component: () => import('@/page/about/guide/guideisvb')
            },
            {
              path: '/guide/16-2',
              name: 'vbbind',
              component: () => import('@/page/about/guide/vbbind')
            },
            {
              path: '/guide/16-3',
              name: 'guidevbdeposit',
              component: () => import('@/page/about/guide/guidevbdeposit')
            },
            {
              path: '/guide/16-4',
              name: 'vbout',
              component: () => import('@/page/about/guide/vbout')
            },
            {
              path: '/guide/16-5',
              name: 'guidevbdeal',
              component: () => import('@/page/about/guide/guidevbdeal')
            },
            {
              path: '/guide/17',
              name: 'guideHijacking',
              component: () => import('@/page/about/guide/guideHijacking')
            },
            {
              path: '/guide/18-1',
              name: 'installIosClient',
              component: () => import('@/page/about/guide/installIosClient')
            },
            {
              path: '/guide/18-2',
              name: 'installAndroidClient',
              component: () => import('@/page/about/guide/installAndroidClient')
            }
          ]
        },
        {
          path: '/404',
          name: 'page404',
          component: () => import('@/page/404')
        },
        {
          path: '/vipsystem',
          name: 'vipsystem',
          component: () => import('@/page/vipsystem'),
          meta: { clearInfo: true }
        },
        {
          path: '/vbmarket',
          name: 'vbmarket',
          component: () => import('@/page/vbmarket'),
          meta: { clearInfo: true, vbmarket: true, metaname: 'vbmarket' }
        },
        {
          path: '/jointly',
          name: 'jointly',
          component: () => import('@/page/jointly'),
          meta: { clearInfo: true }
        },
        {
          path: '/gamepage',
          name: 'gamepage',
          component: () => import('@/page/gamePage')
        },
        {
          path: '/virtualCoiCourse',
          name: 'virtualCoiCourse',
          component: () => import('@/page/virtualCoiCourse')
        },
        {
          path: '/dcWallet',
          name: 'dcWallet',
          component: () => import('@/page/dcWallet')
        },
        {
          path: '/news',
          name: 'news',
          component: () => import('@/page/news/index')
        },
        {
          path: '/news/:id',
          name: 'newsDetails',
          component: () => import('@/page/news/news'),
          props: true
        }
      ]
    },

    {
      path: '/login',
      component: () => import('@/page/login/loginhome'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/page/login/login'),
          meta: { requireAuth: true }
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/page/login/register'),
          meta: { requireAuth: true }
        },
        {
          path: '/forget',
          name: 'forget',
          component: () => import('@/page/login/forget')
        },
        {
          path: '/bindsteam',
          name: 'bindsteam',
          component: () => import('@/page/steam/bindsteam')
        }
      ]
    },
    {
      path: '/cooperhome',
      name: 'cooperhome',
      component: () => import('@/page/cooperation/cooperhome'),
      meta: { clearInfo: true },
      children: [
        {
          path: '',
          name: 'vkStyle',
          component: () => import('@/page/cooperation/vkStyle'),
          meta: { cooper: true }
        },
        {
          path: '/sponsor',
          name: 'sponsor',
          component: () => import('@/page/cooperation/sponsor'),
          meta: { cooper: true }
        },
        {
          path: '/dawnbattle',
          name: 'dawnbattle',
          component: () => import('@/page/cooperation/dawnbattle'),
          meta: { cooper: true }
        }
      ]
    },
    {
      path: '/gamerecord',
      name: 'gamerecord',
      component: () => import('@/page/egame/gamerecord')
    },
    {
      path: '/gameprojects',
      name: 'gameprojects',
      component: () => import('@/page/egame/gameprojects')
    },
    {
      path: '/gamerule',
      name: 'gamerule',
      component: () => import('@/page/egame/gamerule')
    },
    {
      path: '/getmsg',
      name: 'getmsg',
      component: () => import('@/page/steam/getmsg')
    },
    // 自走棋
    // {path: '/autochess',name: 'autochess',component: ()=>import('@/page/autochess/index'),meta: { requireAuth: true } },
    { path: '/ipban', name: 'ipban', component: () => import('@/page/ipban') }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      console.warn('浏览位置保存', savedPosition)
      return savedPosition
    } else {
      if (to.name !== 'newegame') {
        return { x: 0, y: 0 }
      }
    }
  }
})

// 获取用户信息
const getUserInfoFn = (to, next) => {
  $http(ApiSetting.index.getUserInfo)
    .then((res) => {
      if (res.status === 1) {
        if (res.data.isLogin === 1) {
          storage.set('loggedInFlag', true)
          Store.commit('updateLoginStatus', true)
          Store.commit('updateUserInfo', res.data)
          if (to.name === 'login' || to.name === 'register' || to.name === 'forget') {
            next({path: '/'})
          } else {
            next()
          }
        } else {
          storage.remove('loggedInFlag')
          Store.commit('updateLoginStatus', false)
          Store.commit('updateUserInfo', {})
          Store.commit('updateLoadHostpot', false)
          if (to.name === 'login' || to.name === 'register' || to.name === 'forget') {
            next()
          } else {
            next({
              path: '/login'
            })
          }
        }
      }
    })
}

router.beforeEach((to, from, next) => {
  if (storage.get('loggedInFlag')) {
    Store.isLogin ? next() : getUserInfoFn(to, next)
  } else {
    Store.isLogin ? getUserInfoFn(to, next) : next()
  }

  if (to.matched.length === 0) {
    from.name ? next({ name: from.name }) : next('/')
  } else if (to.meta.requireAuth) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    Store.isLogin ? next() : getUserInfoFn(to, next)
  } else {
    next() // 确保一定要调用 next()
  }
  // 拦截未修改过用户名的账号
  if (+Store.state.userInfo.change_flag === 1 && globalGamePage.includes(to.path)) {
    MessageBox.alert('请先前往个人中心修改用户名，方可进入游戏', {
      center: true
    }).then(() => {
      next({ path: from.path })
    })
  }
})
router.afterEach((to, from) => {
  // 统一添加背景图
  document.body.removeAttribute('style')
  if (globalBg.includes(to.name)) {
    // 为解决背景图片固定在ie下抖动问题，把背景图片写在body下
    document.body.style.backgroundImage = 'url(' + require('../assets/es-bg.jpg') + ')'
    document.body.style.backgroundAttachment = 'fixed'
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'cover'
  }
})

export default router
