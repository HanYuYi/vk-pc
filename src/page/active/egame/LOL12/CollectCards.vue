<template>
  <div class="CollectCards-page">
    <!-- 每日集卡 -->
    <div class="block block-mrjk">
      <div class="border"></div>
      <div class="display">
        <div class="title title-mrjk">每日集卡</div>
        <div class="desc">会员每日首充每满500元即可获得一次抽卡机会，无兑换上限，仅限当日使用，隔日则无效。</div>
        <div class="jk-tab-wrapper d-flex justify-center">
          <div @click="activeIndex = i" :class="{ 'team-nav-active': activeIndex == i }" v-for="(item, i) in teamsTabs"
            :key="i" class="team-nav d-flex justify-center align-center">
            <div class="team-name" :class="`team-name-${item.team_name}`"><span v-if="item.team_name">{{teamnameToText(item.team_name)}}</span></div>
          </div>
        </div>
        <div class="jk-cards-wrapper d-flex justify-center">
          <div :class="{
            'player-card-s': player.score >= 70 && player.score <= 79,
            'player-card-m': player.score >= 80 && player.score <= 89,
            'player-card-b': player.score >= 90
          }" class="player-card" v-for="(player, i) in cuPlayers" :key="i">
            <div class="player-desc-wrapper">
              <div class="player-score">{{ player.score }}</div>
              <div class="team-logo" v-lazy:background-image="{
                src: cuTeamLogo,
                error: lazyMatchAvatar.error,
                loading: lazyMatchAvatar.loading
              }"></div>
              <div class="team-name" :class="`team-name-${cuTeamname}`">{{ cuTeamname }}</div>
            </div>
            <div class="player-avatar" v-lazy:background-image="{
              src: player.image_thumb,
              error: lazyS12subAvatar.error,
              loading: lazyS12subAvatar.loading
            }"></div>
            <div class="player-name"><i v-if="player.score < 90" class="s12-card-icon"
                :class="`icon-${player.positionID}`"></i>{{ player.nickname }}
            </div>
          </div>
        </div>
        <div class="confirm-btn" @click="getPlayerCards">立即抽卡</div>
        <div class="desc">抽卡次数：<span class="white">{{ offlineText(drawCardNum) }} 次</span></div>
      </div>
    </div>
    <!-- 我的战队 -->
    <div class="block block-wdzd">
      <div class="border"></div>
      <div class="display">
        <div class="title title-wdzd">我的战队</div>
        <div class="desc title-desc">
          会员可添加背包的卡片至自己的战队内，无需限制相同战队，但需相对应的游戏位置方可添加，<br />
          会员有3次机会可以开启最终大奖，同时在四分之一赛程、半决赛、决赛分别赠送1次开启机会(共6次)。
        </div>
        <div @click="openMybagDio" class="my-bag-btn d-flex align-center justify-center">
          <div class="title title-mybag">我的背包</div>
        </div>
        <div class="myteam-cards-wrapper d-flex justify-center">
          <div @click="openMyteamDio(player)" :class="{
            'player-card-empty d-flex flex-column justify-center align-center': !player.player_name,
            'player-card': player.player_name,
            'player-card-s': player.player_score >= 70 && player.player_score <= 79,
            'player-card-m': player.player_score >= 80 && player.player_score <= 89,
            'player-card-b': player.player_score >= 90
          }" v-for="(player, i) in myTeamPlayer" :key="i + 'my'">
            <template v-if="!player.player_name">
              <div class="add-icon"></div>
              <div class="add-text">{{ player.position_cn }}卡片待添加</div>
            </template>
            <template v-else>
              <div class="player-desc-wrapper">
                <div class="player-score">{{ player.player_score }}</div>
                <div class="team-logo" v-lazy:background-image="{
                  src: player.team_logo,
                  error: lazyMatchAvatar.error,
                  loading: lazyMatchAvatar.loading
                }"></div>
                <div class="team-name" :class="`team-name-${player.team_name}`">{{ player.team_name }}</div>
              </div>
              <div class="player-avatar" v-lazy:background-image="{
                src: player.player_thumb,
                error: lazyS12subAvatar.error,
                loading: lazyS12subAvatar.loading
              }"></div>
              <div class="player-name">
                <i v-if="player.player_score < 90" class="s12-card-icon" :class="`icon-${player.position_id}`"></i>{{
                player.player_name
                }}
              </div>
              <div class="card-numbers" v-if="player.player_score >= 90">特殊卡+20%</div>
            </template>
          </div>
        </div>
        <div class="desc team-desc" style="line-height:1">
          当前评分：<span class="white">{{ offlineText(myTeamScore) }} 分</span>
          <i class="ask-icon" @click="isShowScoreDio = true"></i>
          当前合成次数：<span class="white">{{ offlineText(MixNum) }} 次</span>
        </div>
        <div :class="{'not-allow': isLogin&&MixNum === 0}" class="confirm-btn" @click="openGiftBox">合成宝箱</div>
        <div class="desc" style="line-height:1">点击合成会根据当前战队评分自动合成对应的宝箱</div>
      </div>
    </div>
    <!-- 精美宝箱 -->
    <div class="block block-jmbx">
      <div class="border"></div>
      <div class="display">
        <div class="title title-jmbx">
          精美宝箱
          <div class="right-wrapper">
            <div @click="openBoxRecordDio" class="ri-coner-btn tobet-btn">开箱记录</div>
          </div>
        </div>
        <div class="bx-wrapper d-flex justify-space-between">
          <div class="box-content" v-for="(item, i) in boxData" :key="i">
            <el-popover placement="bottom" width="454" popper-class="lols12-intro-el-popper lols12sub-box-pop"
              trigger="hover">
              <div class="lols12-box-pop-wrapper">
                <div class="title">开启后有几率获得以下奖品</div>
                <div class="d-flex justify-space-between">
                  <div class="gift-wrapper d-flex flex-column" v-for="(gift, j) in item.data" :key="j">
                    <div class="up d-flex justify-center align-center">
                      <img width="100" height="100" :src="gift.icon_url" alt="">
                    </div>
                    <div class="down">{{ gift.desc }}</div>
                  </div>
                </div>
              </div>
              <div slot="reference">
                <img width="223" height="200" :src="item.boximg" alt="">
                <div class="box-name">{{ item.name }}</div>
                <div class="desc bold">{{ item.desc }}</div>
              </div>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
    <!-- 活动规则 -->
    <div class="block block-jkgz">
      <div class="border"></div>
      <div class="display">
        <div class="title title-hdgz">活动规则</div>
        <div class="gz-content">
          <ol>
            <li>活动期间内，会员每日首充每满500元即可获得一次抽奖机会，无兑换上限，仅限当日使用，隔日则无效。
            </li>

            <li>每日未发起提款前的存款都视为首充。
            </li>

            <li>
              会员根据获得的卡片，添加到相对应的位置组成自己的战队，同时可以合成获得宝箱，战队评分越高合成获得的宝箱等级越高，特殊卡片不限制位置。会员有3次机会可以随时合成宝箱，同时在四分之一赛程、半决赛、决赛分别赠送1次合成机会（共6次）。
            </li>

            <li>用户获得重复的卡片，可以在活动页面中点击合成按钮，任意3张卡片，可以合成一张随机卡片。
            </li>

            <li>会员获得的现金奖品系统将自动派发至会员的主钱包中，彩金需完成全站3倍有效流水。
            </li>

            <li>若奖品为实物奖品，请联系在线客服提供中奖兑换码，提供您的详细收货地址，我们将于次日安排发货，快递单号将会发送站内信通知。除此之外您也可以联系在线客服选择折现，实物奖品折现后无需流水即可提款。</li>

            <li>有效流水要求：电竞赔率＜1.5、亚洲盘赔率≤0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>
                0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#d6b598"
                  styleClass="lols12-pop"></activeptliushui>。</li>

            <li>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</li>
          </ol>
        </div>
      </div>
    </div>
    <!-- 弹窗-评分详情 -->
    <el-dialog :lock-scroll="true" :append-to-body="true" width="508px" top="20vh" custom-class="lols12sub-Dialog"
      :visible.sync="isShowScoreDio">
      <div class="lols12sub-Dialog-wrapper lols12-short-wrapper pfxz-wrapper">
        <div class="display">
          <div class="title title-pfxz">战队评分计算规则</div>
          <div class="gz-content">
            <ol>
              <li>我的战队组成中，每拥有一张特殊卡片，总分加成20%，集齐5张，加成100%（例如：会员拥有1张特殊卡片，战队评分为840，加成20%，最终评分：840*120%=1008）</li>
              <li>我的战队组成中，若5张卡片属于同一个战队，总分加成10%（例如：会员拥有5张同一个战队卡片，战队评分为840，加成10%，最终评分：840*110%=924）</li>
            </ol>
          </div>
          <div class="confirm-btn" @click="isShowScoreDio = false">我知道了</div>
        </div>
      </div>
    </el-dialog>
    <!-- 弹窗-抽中/中奖 -->
    <el-dialog @close="closeGiftDioCB" :lock-scroll="true" :append-to-body="true" width="508px" top="20vh"
      custom-class="lols12sub-Dialog" :visible.sync="isShowHappyDio">
      <div v-show="!isShowBox" :class="{ 'animate__animated animate__zoomIn': !isShowBox }"
        class="lols12sub-Dialog-wrapper lols12-short-wrapper congratulation-wrapper">
        <div class="border"></div>
        <div class="display">
          <div class="table" :class="`table-${HappyDioClassName}`">
            <div class="table-head">
              <div class="table-title congratulation-title">恭喜您</div>
            </div>
            <div class="table-body">
              <template v-if="HappyDioClassName == 'card'">
                <div :class="{
                  'player-card-s': randomCard.player_score >= 70 && randomCard.player_score <= 79,
                  'player-card-m': randomCard.player_score >= 80 && randomCard.player_score <= 89,
                  'player-card-b': randomCard.player_score >= 90
                }" class="player-card" style="margin:auto">
                  <div class="player-desc-wrapper">
                    <div class="player-score">{{ randomCard.player_score }}</div>
                    <div class="team-logo" v-lazy:background-image="{
                      src: randomCard.team_logo,
                      error: lazyMatchAvatar.error,
                      loading: lazyMatchAvatar.loading
                    }"></div>
                    <div class="team-name" :class="`team-name-${randomCard.team_name}`">
                      {{ randomCard.team_name }}
                    </div>
                  </div>
                  <div class="player-avatar" v-lazy:background-image="{
                    src: randomCard.player_thumb,
                    error: lazyS12subAvatar.error,
                    loading: lazyS12subAvatar.loading
                  }"></div>
                  <div class="player-name"><i v-if="randomCard.player_score < 90" class="s12-card-icon"
                      :class="`icon-${randomCard.position_id}`"></i>{{
                      randomCard.player_name
                      }}
                  </div>
                </div>
                <div class="desc">恭喜您获得一张{{ randomCard.team_name }}战队{{ randomCard.player_name }}卡片</div>
              </template>
              <template v-if="HappyDioClassName == 'gift'">
                <div class="desc-top" v-if="myBoxGift.secret.length">恭喜您获得{{ myBoxGift.item_name }}</div>
                <img style="width:200px;height:200px;" :src="myBoxGift.icon_url" alt="">
                <div class="desc" v-if="!myBoxGift.secret.length">恭喜您获得{{ myBoxGift.item_name }}</div>
                <div class="desc" style="line-height: 1.71;" v-if="myBoxGift.secret.length">
                  兑换码：<span class="white">{{myBoxGift.secret}}</span>
                  <span @click="doCopy(myBoxGift.secret)" class="copy-btn white text-underline">复制</span><br />
                  您可在<span @click="$router.push('/user')"
                    class="white text-underline">个人中心</span>查看
                </div>
              </template>
              <div class="confirm-btn" @click="closeGiftDio">我知道了</div>
            </div>
          </div>
        </div>
      </div>
      <div class="box-ani animate__animated animate__zoomIn" v-show="isShowBox">
        <div class="light-box" :class="{'show': lightShow, 'animate': lightAnimate}"></div>
        <img class="box-gift-img" :src="giftBoxNext" alt="" />
      </div>
    </el-dialog>
    <!-- 弹窗--我的背包 -->
    <el-dialog @close="closeMybagDio" :lock-scroll="true" :append-to-body="true" width="1246px" top="6vh"
      custom-class="lols12sub-Dialog" :visible.sync="isShowMybagDio">
      <div class="lols12sub-Dialog-wrapper lols12-long-wrapper"
        :class="{ 'lols12-longex-wrapper': isExpand, 'lols12-longex-teamwrapper': mybagDioStatus == 'team' && isExpand }">
        <div class="border"></div>
        <div class="display">
          <div class="title title-mybag">我的背包</div>
          <Select v-model="activePosition" class="lols12-select-wrapper">
            <Option v-for="item in posiSelecArr" :value="item.position_id" :key="item.id">
              <i class="s12-card-icon" :class="`icon-${item.id}`"></i>{{ item.position_cn }}
            </Option>
          </Select>
          <div class="player-cards-dio-wrapper">
            <swiper v-if="!mybagLoading && realMybagCards.length" ref="mybagswiper" :options="playersSwiperOptions"
              class="player-cards-swiper">
              <swiper-slide @click.native="addCardMix(player, i)" v-for="(player, i) in realMybagCards"
                :key="i + 'mybag'">
                <div class="player-card mybag-card" :class="{
                  'player-card-s': player.player_score >= 70 && player.player_score <= 79,
                  'player-card-m': player.player_score >= 80 && player.player_score <= 89,
                  'player-card-b': player.player_score >= 90
                }">
                  <div class="player-desc-wrapper">
                    <div class="player-score">{{ player.player_score }}</div>
                    <div class="team-logo" v-lazy:background-image="{
                      src: player.team_logo,
                      error: lazyMatchAvatar.error,
                      loading: lazyMatchAvatar.loading
                    }"></div>
                    <div class="team-name" :class="`team-name-${player.team_name}`">{{ player.team_name }}</div>
                  </div>
                  <p class="add-text">点击添加卡片</p>
                  <div class="player-avatar" v-lazy:background-image="{
                    src: player.player_thumb,
                    error: lazyS12subAvatar.error,
                    loading: lazyS12subAvatar.loading
                  }"></div>
                  <div class="player-name">
                    <i class="s12-card-icon" v-if="player.player_score < 90" :class="`icon-${player.position_id}`"></i>{{
                    player.player_name
                    }}
                  </div>
                  <div class="card-numbers">数量:{{ player.card_num }}</div>
                </div>
              </swiper-slide>
            </swiper>
            <template v-if="!mybagLoading && (!realMybagCards.length)">
              <div class="no-data-wrapper d-flex flex-column align-center">
                <img class="no-data-logo" width="134" height="136" src="~@/assets/active/lols12/new/no-data-logo.png"
                  alt="">
                <div class="no-data-text">暂无卡牌!</div>
              </div>
            </template>
            <Loading v-if="mybagLoading" class="list-loading" :color="'#bf9854'" />
            <div v-if="!mybagLoading && realMybagCards.length" class="swiper-button-prev-player" slot="button-prev">
              <div class="swip-btn"></div>
            </div>
            <div v-if="!mybagLoading && realMybagCards.length" class="swiper-button-next-player" slot="button-next">
              <div class="swip-btn"></div>
            </div>
          </div>
          <template v-if="mybagDioStatus == 'mix'">
            <div class="desc" style="line-height:1.7;margin-top: 15px;">3张任意卡片可以合成随机卡片<br />可点击背包中的卡片至合成栏</div>
            <div v-show="isExpand" class="my-mix-wrapper">
              <div class="title title-mymix">我的合成</div>
              <div class="d-flex justify-space-between" style="width:100%">
                <div class="player-card" :class="{
                  'player-card-s': player.player_score >= 70 && player.player_score <= 79,
                  'player-card-m': player.player_score >= 80 && player.player_score <= 89,
                  'player-card-b': player.player_score >= 90
                }" v-for="(player, i) in myMix" :key="i + 'mix'">
                  <div class="player-desc-wrapper">
                    <div class="player-score">{{ player.player_score }}</div>
                    <div class="team-logo" v-lazy:background-image="{
                      src: player.team_logo,
                      error: lazyMatchAvatar.error,
                      loading: lazyMatchAvatar.loading
                    }"></div>
                    <div class="team-name" :class="`team-name-${player.team_name}`">{{ player.team_name }}</div>
                  </div>
                  <div class="player-avatar" v-lazy:background-image="{
                    src: player.player_thumb,
                    error: lazyS12subAvatar.error,
                    loading: lazyS12subAvatar.loading
                  }"></div>
                  <div class="player-name">
                    <i v-if="player.player_score < 90" class="s12-card-icon" :class="`icon-${player.position_id}`"></i>{{
                    player.player_name
                    }}
                  </div>
                  <div class="close-card" @click="removePlayer(player, i)"></div>
                </div>
                <div class="player-card-empty" v-for="j in (3 - myMix.length)" :key="j + 'em-card-dio'">
                  <span>暂无卡牌</span>
                </div>
              </div>
              <div @click="mixcard" class="confirm-btn" style="margin-top:20px">合成</div>
            </div>
            <div class="up-down" @click="isExpand = !isExpand">
              <div class="icon" :class="{ 'icon-rate': isExpand }"></div>
              <div class="text">{{ isExpand ? '收起' : '合成卡片' }}</div>
            </div>
          </template>
          <template v-if="mybagDioStatus == 'team'">
            <div class="desc" style="line-height:1.7;margin-top: 15px;">点击背包中的卡片到指定位置即可添加或更换队员至我的战队</div>
            <div class="my-mix-wrapper" style="margin-top: 35px;padding:22px 126px;">
              <div class="title title-myteam">我的战队</div>
              <div class="myteam-cards-wrapper d-flex justify-space-between">
                <div @click="onlyEmClick(player)" :class="{
                  'player-card-empty d-flex flex-column justify-center align-center': !player.player_name,
                  'player-card': player.player_name,
                  'player-card-s': player.player_score >= 70 && player.player_score <= 79,
                  'player-card-m': player.player_score >= 80 && player.player_score <= 89,
                  'player-card-b': player.player_score >= 90
                }" v-for="(player, i) in myTeamPlayer" :key="i + 'my'">
                  <template v-if="!player.player_name">
                    <div class="add-icon"></div>
                    <div style="font-size: 14px;font-weight: bold;margin-top: 8px;">{{ player.position_cn }}卡片待添加</div>
                  </template>
                  <div v-else>
                    <div class="player-desc-wrapper">
                      <div class="player-score">{{ player.player_score }}</div>
                      <div class="team-logo" v-lazy:background-image="{
                        src: player.team_logo,
                        error: lazyMatchAvatar.error,
                        loading: lazyMatchAvatar.loading
                      }"></div>
                      <div class="team-name" :class="`team-name-${player.team_name}`">{{ player.team_name }}</div>
                    </div>
                    <div class="player-avatar" v-lazy:background-image="{
                      src: player.player_thumb,
                      error: lazyS12subAvatar.error,
                      loading: lazyS12subAvatar.loading
                    }"></div>
                    <div class="player-name">
                      <i v-if="player.player_score < 90" class="s12-card-icon" :class="`icon-${player.position_id}`"></i>{{
                      player.player_name
                      }}
                    </div>
                    <div class="card-numbers" v-if="player.player_score >= 90">特殊卡+20%</div>
                    <div class="close-card" @click="removePlayer(player, i)"></div>
                  </div>
                </div>
              </div>
              <div @click="confirmTeam" style="margin-top:20px" class="confirm-btn">确定阵容</div>
            </div>
          </template>
        </div>
      </div>
    </el-dialog>
    <!-- 弹窗--开箱记录 -->
    <el-dialog :lock-scroll="true" :append-to-body="true" width="508px" top="20vh" custom-class="lols12sub-Dialog"
      :visible.sync="isShowBoxRecordDio">
      <div class="lols12sub-Dialog-wrapper lols12-short-wrapper congratulation-wrapper box-record-wrapper">
        <div class="border"></div>
        <div class="display">
          <div class="table">
            <div class="table-head">
              <div class="table-title openbox-title">开箱记录</div>
            </div>
            <div class="table-body">
              <div class="record-line record-title">
                <div class="text-left">奖品名称</div>
                <div>中奖时间</div>
                <div>兑换码</div>
              </div>
              <div class="record-content">
                <div class="record-line record-content" v-for="(item, i) in boxrecords" :key="i">
                  <div class="text-left">{{item.item_name}}</div>
                  <div>{{item.create_time}}</div>
                  <div v-if="item.code" class="text-right">{{item.code}}<span @click="doCopy(item.code)"
                      class="copy-btn white">复制</span></div>
                  <div v-else>--</div>
                </div>
              </div>
              <div class="confirm-btn" @click="isShowBoxRecordDio = false">我知道了</div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Loading from '@/components/common/Loading.vue'
import { mapState } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { animateCSS } from '@/utils/util.js'
const positionArr =
  [
    {
      id: 'sd',
      position_id: 3,
      position_cn: '上单'
    },
    {
      id: 'dy',
      position_id: 4,
      position_cn: '打野'
    },
    {
      id: 'zd',
      position_id: 2,
      position_cn: '中单'
    },
    {
      id: 'adc',
      position_id: 1,
      position_cn: 'ADC'
    },
    {
      id: 'fz',
      position_id: 5,
      position_cn: '辅助'
    }
  ]
export default {
  name: 'CollectCards',
  components: {
    Swiper,
    SwiperSlide,
    Loading
  },
  props: {
    teamsTabs: {
      type: Array,
      default: () => []
    },
    drawCardNum: {
      type: [Number],
      default: 0
    },
    boxData: {
      type: [Array],
      default: () => []
    },
  },
  data() {
    return {
      myTeamScore: 0, // 当前评分
      MixNum: 0, // 合成次数
      isDrawCardLoading: false,
      mixLoading: false,
      mybagLoading: false,
      boxLoading: false,
      isExpand: false, // 是否展开我的背包
      isShowBox: false,
      lightShow: false,
      lightAnimate: false,
      isShowBoxRecordDio: false, // 开箱记录弹窗
      isShowScoreDio: false, // 评分弹窗
      isShowHappyDio: false, // 抽卡和中奖弹窗
      HappyDioClassName: 'card', // 抽卡和中奖弹窗类名，card--抽卡，gift--中奖
      isShowMybagDio: false, // 我的背包弹窗
      mybagDioStatus: 'mix', // 我的背包弹窗状态，mix--合成弹窗，team-我的战队弹窗
      activeIndex: 0, // 当前战队
      activePosition: 0,
      boxrecords: [], // 我的开箱记录
      mybagIds: [], // 拿到背包战队备份一下不同位置的id，用于战队的自动切换
      myTeamPlayer: positionArr,
      playersSwiperOptions: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 40,
        allowTouchMove: false,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,
        navigation: { nextEl: '.swiper-button-next-player', prevEl: '.swiper-button-prev-player' },
      },
      mybag: [], // 我的背包
      myMix: [], // 我的合成
      randomCard: {
        id: '',
        player_name: '',
        player_score: 0,
        position_id: '',
        team_name: ''
      }, // 抽卡抽中的随机卡
      myBoxGift: {
        icon_url: '',
        secret: '',
        item_name: '',
        team_score: 700
      },
    }
  },
  created() {
    this.getMyTeam()
    this.getMybag()
    this.getBoxRecord()
  },
  computed: {
    ...mapState([
      "isLogin",
      "lazyS12subAvatar",
      "lazyMatchAvatar"
    ]),
    posiSelecArr() {
      const all = [{
        id: 'all',
        position_id: 0,
        position_cn: '全部'
      }]
      const spec = [{
        id: 'ts',
        position_id: 6,
        position_cn: '特殊'
      }]
      return all.concat(positionArr).concat(spec)
    },
    // 根据战队积分计算开什么宝箱
    giftBoxNext() {
      const scoreArr = [
        { min: 700, max: 799 },
        { min: 800, max: 999 },
        { min: 1000, max: 1399 },
        { min: 1400, max: 999999999 }
      ]
      const score = this.myBoxGift.team_score
      const index = scoreArr.findIndex(obj => score >= obj.min && score <= obj.max)
      if (index != -1) {
        return this.boxData[index].boximg
      } else {
        return ''
      }
    },
    cuPlayers() {
      return this.teamsTabs.length ? this.teamsTabs[this.activeIndex].players : []
    },
    // 当前战队logo
    cuTeamLogo() {
      return this.teamsTabs.length ? this.teamsTabs[this.activeIndex].team_image : ''
    },
    cuTeamname() {
      return this.teamsTabs.length ? this.teamsTabs[this.activeIndex].team_name : ''
    },
    // 我的背包实际展示的卡片
    realMybagCards() {
      if (this.activePosition == 0) {
        return this.mybag
      } else {
        return this.mybag.filter(card => card.position_id == this.activePosition)
      }
    }
  },
  watch: {
    cuPlayers(val, oldVal) {
      console.log('队员变化了', val, oldVal)
      if (val) {
        this.animateCSS('.jk-cards-wrapper', 'zoomIn')
      }
    },
    activePosition(val) {
      console.log('我的背包筛选', val)
      if (val != undefined) {
        this.mybagLoading = true
        const timer = setTimeout(() => {
          this.mybagLoading = false
          clearTimeout(timer)
        }, 300)
      }
    }
  },
  methods: {
    openBoxRecordDio() {
      if (!this.isLogin) {
        this.$message({ message: "请您先登录！", type: 'warning' })
        return
      }
      if (!this.boxrecords.length) {
        this.$message({ message: "暂无开箱记录！", type: 'warning' })
        return
      }
      this.isShowBoxRecordDio = true
    },
    getBoxRecord() {
      this.$http(this.ApiSetting.active.lols12.sub.boxRecord)
        .then(res => {
          console.log('开箱记录', res)
          if (res.status == 1 && res.data) {
            this.boxrecords = res.data.list
          }
        })
    },
    doCopy(text) {
      this.$copyText(text).then((e) => {
        this.$message({
          message: '复制账号成功！',
          type: 'success'
        })
      }, function (e) {
        this.$message({
          message: this.$t("Copy_the_failure"),
          type: 'warning'
        })
      })
    },
    onlyEmClick(player) {
      if (!player.player_name) {
        this.activePosition = player.position_id
      }
    },
    // 未登录状态，0转为--
    offlineText(num) {
      if (!this.isLogin) {
        return '- -'
      } else {
        return num
      }
    },
    // 从背包中移除一张卡片
    removeFromBag(player) {
      if (player.card_num > 1) {
        this.mybag = this.mybag.map(item => {
          if (item.player_id == player.player_id) {
            return { ...item, card_num: +item.card_num - 1 }
          } else {
            return item
          }
        })
      } else {
        this.mybag = this.mybag.filter(item => item.player_id != player.player_id)
      }
    },
    // 从战队向背包中添加一张卡片
    teamAddToBag(card) {
      const index = this.mybag.findIndex(item => item.player_id == card.player_id)
      if (index != -1) {
        this.mybag = this.mybag.map(item => {
          if (item.player_id == card.player_id) {
            return { ...item, card_num: item.card_num + 1 }
          } else {
            return item
          }
        })
      } else {
        this.mybag.push(card)
      }
    },
    addCardMix(player, i) {
      // 从背包添加卡片，准备合成
      if (this.mybagDioStatus == 'mix') {
        let mybagCardsNum = 0
        this.mybag.forEach(card => {
          mybagCardsNum += card.card_num
        })
        if (mybagCardsNum + this.myMix.length < 3) {
          this.$message({ message: "背包当前卡片数量不足，请先抽卡获取卡片！", type: 'warning' })
          return
        }
        this.isExpand = true
        if (this.myMix.length >= 3) {
          this.$message({ message: "您已经有三张卡片待合成，请先移除合成栏中您不希望使用的卡片！", type: 'warning' })
          return
        }
        this.removeFromBag(player)
        this.myMix.push(player)
        if (!this.realMybagCards.length) {
          this.activePosition = 0
        }
      }
      // 从背包添加到战队
      if (this.mybagDioStatus == 'team') {
        if (!this.mybag.length) {
          this.$message({ message: "背包当前卡片数量不足，请先抽卡获取卡片！", type: 'warning' })
          return
        }
        // 特殊卡片
        if (player.position_id == 6) {
          // 战队中已经有了该特殊卡片，同一张特殊卡片不能多次使用
          const sameSpecCard = this.myTeamPlayer.find(card => card.origin_position_id&&card.player_id == player.player_id)
          if (sameSpecCard) {
            this.$message({ message: `您已经在${this.positionToText(sameSpecCard.position_id)}位置使用了当前的特殊卡片，不能重复使用！`, type: 'warning' })
            return
          }
          const firstIndex = this.myTeamPlayer.findIndex(card => !card.player_name)
          console.log('战队中第一个空出位置的索引', firstIndex)
          if (firstIndex != -1) {
            this.removeFromBag(player)
            const teamFixPosition = this.myTeamPlayer[firstIndex].position_id
            this.myTeamPlayer = this.myTeamPlayer.map((item, itemIndex) => {
              if (itemIndex == firstIndex) {
                return { ...item, ...player, origin_position_id: player.position_id, position_id: item.position_id }
              } else {
                return item
              }
            })
          } else {
            // 战队已经满了，提示先移除卡片
            this.$message({ message: "特殊战队卡片可适用于任何位置，请先移除战队栏中您希望替换掉的卡片！", type: 'warning' })
            return
          }
        } else {
          // 非特殊卡片
          // 看战队里对应的站位是不是空的
          const isOccupy = this.myTeamPlayer.some(card => (card.player_name && card.position_id == player.position_id))
          const exsitSameCard = this.myTeamPlayer.find(card => card.player_id == player.player_id)
          console.log('添加到战队', player, isOccupy, exsitSameCard)

          if (isOccupy) {
            // 如果是相同的卡片给出提示
            if (exsitSameCard) {
              this.$message({ message: `您已经在${this.positionToText(exsitSameCard.position_id)}位置使用了该卡片，请您选择其他卡片！`, type: 'warning' })
              return
            } else {
              // 战队中非特殊卡片才能被替换，普通卡替换特殊卡需要给出提示
              const card = this.myTeamPlayer.find(card => card.position_id == player.position_id)
              if (card.origin_position_id == 6) {
                this.$message({ message: `您即将替换${this.positionToText(card.position_id)}位置的特殊卡片，请先移除该特殊卡片！`, type: 'warning' })
                return
              }
              this.teamAddToBag(card)
            }
          }
          // 战队里相应的站位没有队员，直接移除背包的这张卡片即可（或num - 1）
          this.removeFromBag(player)

          //执行替换
          this.myTeamPlayer = this.myTeamPlayer.map(item => {
            if (item.position_id == player.position_id) {
              return { ...item, ...player }
            } else {
              return item
            }
          })
        }
      }
    },
    positionToText(positionId) {
      switch (Number(positionId)) {
        case 3:
          return '上单'
        case 4:
          return '打野'
        case 2:
          return '中单'
        case 1:
          return 'ADC'
        case 5:
          return '辅助'
        default:
          break;
      }
    },
    teamnameToText(teamname) { 
      switch (teamname) {
        case 'All-Star':
          return '特殊战队'
        case 'JDG':
          return 'JDG战队'
        case 'T1':
          return 'T1战队'
        case 'G2':
          return 'G2战队'
        case 'GEN':
          return 'GEN战队'
        case 'TES':
          return 'TES战队'
        default:
          return ''
      }
    },
    // 从我的合成中移除卡片
    removePlayer(player, i) {
      if (this.mybagDioStatus == 'mix') {
        if (player.card_num > 1) {
          this.myMix = this.myMix.map(item => {
            if (item.player_id == player.player_id) {
              return { ...item, card_num: item.card_num - 1 }
            } else {
              return item
            }
          })
        }
        this.myMix.splice(i, 1)
      }
      if (this.mybagDioStatus == 'team') {
        this.myTeamPlayer = this.myTeamPlayer.map(item => {
          if (player.position_id == item.position_id) {
            const rawpo = positionArr.find(item => item.position_id == player.position_id)
            return { ...rawpo }
          } else {
            return item
          }
        })
      }
      // 选择器不是全部，自动切换到回退卡片的占位
      if (this.activePosition != 0) {
        if (player.team_name != 'All-Star') {
          this.activePosition = player.position_id
        } else {
          this.activePosition = 6
        }
      }
      const index = this.mybag.findIndex(item => item.player_id == player.player_id)
      console.log('索引', index, player)
      if (index == -1) {
        // 背包里面没有这张卡片, 特殊卡片把origin_position_id标记去掉
        let trueplayer = player
        if (player.team_name == 'All-Star') {
          trueplayer = { ...player, position_id: 6 }
          delete trueplayer.origin_position_id
        }
        console.log('trueplayer', trueplayer)
        this.mybag.unshift(trueplayer)
        console.log('移除时能不能拿到swiper', this.$refs.mybagswiper)
        if (this.$refs.mybagswiper) {
          if (this.$refs.mybagswiper.$swiper.activeIndex != 0) {
            this.$refs.mybagswiper.initSwiper()
          }
        }
      } else {
        this.mybag = this.mybag.map(item => {
          if (item.player_id == player.player_id) {
            return { ...item, card_num: item.card_num + 1 }
          } else {
            return item
          }
        })
      }
    },
    // 合成新卡片
    mixcard() {
      if (this.mixLoading) {
        return
      }
      if (this.myMix.length < 3) {
        this.$message({ message: "您当前待合成的卡片数量不足3张，请先点击背包中的卡片至合成栏", type: 'warning' })
        return
      }
      this.mixLoading = true
      let playerIds = []
      this.myMix.forEach(item => {
        playerIds.push(item.player_id)
      })
      console.log('合成卡片请求参数', this.myMix, playerIds.join())
      this.$http(this.ApiSetting.active.lols12.sub.mixcard, {
        player_ids: playerIds.join()
      }).then(res => {
        this.mixLoading = false
        console.log('合成卡片', res)
        if (res.status == 1 && res.data) {
          this.myMix = []
          this.HappyDioClassName = 'card'
          this.randomCard = res.data.mixCard
          this.isShowHappyDio = true
          this.getMybag()
        }
      }).catch(err => {
        this.mixLoading = false
      })
    },
    // 获取我的背包数据
    getMybag(positionId = 0) {
      if (this.mybagLoading) {
        return
      }
      console.log(positionId)
      this.mybagLoading = true
      this.$http(this.ApiSetting.active.lols12.sub.getMyBag, {
        position_id: positionId
      })
        .then(res => {
          this.mybagLoading = false
          console.log('我的背包里面几张卡啊', res, positionId)
          if (res.status == 1 && res.data) {
            this.mybag = res.data.list
            if (positionId == 0) {
              res.data.list.forEach(item => {
                if (!this.mybagIds.includes(item.position_id)) {
                  this.mybagIds.push(item.position_id)
                }
              })
            }
          }
        })
        .catch(err => {
          this.mybagLoading = false
        })
    },
    closeMybagDio() {
      console.log('关闭了我的弹窗')
      this.reset()
    },
    reset() {
      if (this.mybagDioStatus == 'team') {
        this.myTeamPlayer = positionArr
        this.getMyTeam()
      }
      this.getMybag()
      this.myMix = []
    },
    // 打开我的背包弹窗
    openMybagDio() {
      if (!this.isLogin) {
        this.$message({ message: "请您先登录！", type: 'warning' })
        return
      }
      if (!this.mybag.length) {
        this.$message({ message: "您的背包为空，请先抽卡获取卡片！", type: 'warning' })
        return
      }
      console.log('ref', this.$refs.mybagswiper)
      if (this.$refs.mybagswiper) {
        this.$refs.mybagswiper.initSwiper()
      }
      // 选择器默认选择全部
      this.activePosition = 0
      this.isExpand = false
      this.mybagDioStatus = 'mix'
      this.isShowMybagDio = true
    },
    // 打开我的战队弹窗
    openMyteamDio(player) {
      if (!this.isLogin) {
        this.$message({ message: "请您先登录！", type: 'warning' })
        return
      }
      // 看我的背包中对应站位有没有卡片，有就切换到该站位再弹窗；没有就切换到全部；背包空的提示不弹窗
      let totalCardsNum = 0
      this.mybag.forEach(card => totalCardsNum += card.card_num)
      if (totalCardsNum == 0) {
        this.$message({ message: "您的背包为空，请先抽卡获取卡片！", type: 'warning' })
        return
      }
      if (player.team_name == 'All-Star') {
        this.activePosition = 6
      } else {
        const posiCards = this.mybag.filter(card => card.position_id == player.position_id)
        if (posiCards.length) {
          this.activePosition = Number(player.position_id)
        } else {
          this.activePosition = 0
        }
      }
      this.isExpand = true
      this.mybagDioStatus = 'team'
      this.isShowMybagDio = true
    },
    // 确定阵容
    confirmTeam() {
      const validPlayers = this.myTeamPlayer.filter(item => item.player_name)
      const playerIdes = []
      validPlayers.forEach(player => playerIdes.push(player.player_id))
      this.$http(this.ApiSetting.active.lols12.sub.confirmTeam, {
        player_ids: playerIdes.join()
      }).then(res => {
        console.log('确定阵容', res, positionArr)
        if (res.status == 1) {
          this.$message({ message: res.message, type: 'success' })
          this.isShowMybagDio = false
          this.myTeamPlayer = positionArr
          this.getMyTeam()
          this.getMybag()
        }
      })
    },
    // 获取我的阵容
    getMyTeam() {
      this.$http(this.ApiSetting.active.lols12.sub.getMyteam)
        .then(res => {
          console.log('获取我的阵容', res)
          if (res.status == 1 && res.data) {
            this.myTeamScore = res.data.team_score
            this.MixNum = res.data.mix_times
            if (res.data.list.length) {
              this.myTeamPlayer = this.myTeamPlayer.map(item => {
                const player = res.data.list.find(player => player.position_id == item.position_id)
                if (player) {
                  return { ...item, ...player }
                } else {
                  return item
                }
              })
            }
          }
        })
    },
    closeGiftDioCB() {
      this.randomCard = {
        id: '',
        player_name: '',
        player_score: 0,
        position_id: '',
        team_name: ''
      }
      this.myBoxGift = {
        icon_url: '',
        item_name: '',
        team_score: 700,
        secret: ''
      }
      if (this.HappyDioClassName == 'gift') {
        this.getMyTeam()
      }
    },
    // 合成宝箱
    openGiftBox() {
      if (this.boxLoading || (this.isLogin && this.MixNum == 0)) {
        return
      }
      if (!this.isLogin) {
        this.$message({ message: "请您先登录！", type: 'warning' })
        return
      }
      this.boxLoading = true
      const validPlayers = this.myTeamPlayer.filter(item => item.player_name)
      const playerIdes = []
      validPlayers.forEach(player => playerIdes.push(player.player_id))
      this.$http(this.ApiSetting.active.lols12.sub.openGiftBox, {
        player_ids: playerIdes.join()
      }).then(res => {
        this.boxLoading = false
        console.log('合成宝箱', res)
        console.log('当前什么宝箱', this.giftBoxNext, this.myBoxGift.team_score)
        if (res.status == 1 && res.data) {
          this.myTeamPlayer = positionArr
          this.myBoxGift = res.data
          this.HappyDioClassName = 'gift'
          this.isShowHappyDio = true
          this.isShowBox = true
          this.getBoxRecord()
          const timer = setTimeout(() => {
            clearTimeout(timer)
            this.lightShow = true
            console.log('当前什么宝箱', this.giftBoxNext, this.myBoxGift.team_score)
            const timer1 = setTimeout(() => {
              clearTimeout(timer1)
              this.lightAnimate = true
              const timer2 = setTimeout(() => {
                clearTimeout(timer2)
                this.isShowBox = false
              }, 1600)
            }, 400)
          }, 500)
        }
      }).catch(err => {
        this.boxLoading = false
      })
    },
    animateCSS(element, animation) {
      animateCSS(element, animation).then(msg => {
        console.log('动画执行了', msg)
      })
    },
    // 关闭抽卡弹窗
    closeGiftDio() {
      this.isShowHappyDio = false
      this.lightShow = false
      this.lightAnimate = false
      this.isShowBox = false
    },
    // 抽卡
    getPlayerCards() {
      if (this.isDrawCardLoading) {
        return
      }
      if (!this.isLogin) {
        this.$message({ message: "请您先登录！", type: 'warning' })
        return
      }
      // if (this.drawCardNum == 0) {
      //   this.$message({ message: "请您先充值获取抽奖机会！", type: 'warning' })
      //   return
      // }
      this.isDrawCardLoading = true
      this.$http(this.ApiSetting.active.lols12.sub.drawCard)
        .then(res => {
          console.log('集卡抽卡', res)
          this.isDrawCardLoading = false
          if (res.status == 1 && res.data) {
            this.HappyDioClassName = 'card'
            this.randomCard = res.data.randomCard
            this.isShowHappyDio = true
            this.$emit('refresh-card-num', res.data.play_num)
            this.getMybag()
          }
        })
        .catch(err => {
          this.isDrawCardLoading = false
        })
    }
  }
}
</script>

<style lang="less">
.lols12-pop {
  background: #080f26;
  border: 1px solid #d6b598;
  box-shadow: 0 0 12px #d6b598;

  .ptgame_more_rule {
    tr {
      th {
        color: #d6b598;
      }

      &:nth-child(odd) {
        background: #080f26 !important;
      }
    }
  }

  &[x-placement^=bottom] {
    .popper__arrow {
      border-bottom-color: #d6b598;
    }
  }

  .popper__arrow {
    border-top-color: #d6b598 !important;
  }
}
</style>
<style lang="less" scoped>
.CollectCards-page {
  .jk-tab-wrapper {
    margin: auto;
    margin-bottom: 40px;

    .team-nav {
      cursor: pointer;
      margin-right: 20px;
      width: 136px;
      height: 40px;
      font-size: 24px;
      color: #d6b598;
      box-sizing: border-box;
      border: solid 1px #d6b598;

      &:last-child {
        margin-right: 0;
      }

      &.team-nav-active,
      &:hover {
        border: none;
        background-image: linear-gradient(to bottom, #5ea2e6, #1841b6);
        color: #fff;
        font-weight: bold;
      }
    }
  }

  .player-card {
    width: 150px;
    height: 234px;
    margin-right: 40px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    position: relative;

    &:last-child {
      margin-right: 0;
    }

    .close-card {
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 10px;
      width: 25px;
      height: 25px;
      background: url('~@/assets/active/lols12/sub/sprite.png');
      background-position: -415px -265px;
    }

    .card-numbers {
      position: absolute;
      bottom: 40px;
      right: 2px;
      width: 80px;
      height: 20px;
      line-height: 20px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      white-space: nowrap;
    }

    .player-desc-wrapper {
      margin-top: 23px;
      padding-left: 6px;
    }

    .team-name {
      font-size: 14px;
      font-weight: bold;
      color: #fff;
      margin-left: 4px;

      &.team-name-JDG,
      &.team-name-GEN,
      &.team-name-TES {
        margin-left: 6px;
      }

      &.team-name-T1 {
        margin-left: 12px;
      }

      &.team-name-G2 {
        margin-left: 10px;
      }
    }

    .team-logo {
      margin-top: 2px;
      margin-left: 4px;
      width: 32px;
      height: 32px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }

    .player-score {
      font-size: 36px;
      font-weight: bold;
      color: #fff;
      line-height: 1;
    }

    .player-avatar {
      width: 150px;
      height: 175px;
      background-repeat: no-repeat;
      background-position: right 2px;
      background-size: contain;
      position: absolute;
      bottom: 40px;
      right: 0;
    }

    .player-name {
      font-size: 14px;
      font-weight: bold;
      color: #fff;
      text-align: center;
      width: 100%;
      height: 20px;
      line-height: 20px;
      position: absolute;
      bottom: 20px;
    }

    &.player-card-s {
      background-image: url('~@/assets/active/lols12/sub/card-s.png');

      // .player-avatar {
      //   width: 148px;
      //   right: 2px;
      //   background-position: 20px 27px;
      // }

      .card-numbers {
        background-color: #6760c8;

        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: -20px;
          width: 0;
          height: 0;
          border: 20px solid transparent;
          border-bottom: 20px solid #6760c8;
          clip-path: polygon(0 40px, 20px 20px, 20px 40px);
        }
      }
    }

    &.player-card-m {
      background-image: url('~@/assets/active/lols12/sub/card-m.png');

      // .player-avatar {
      //   width: 148px;
      //   right: 2px;
      //   background-position: 20px 27px;
      // }

      .card-numbers {
        background-color: #d5992f;

        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: -20px;
          width: 0;
          height: 0;
          border: 20px solid transparent;
          border-bottom: 20px solid #d5992f;
          clip-path: polygon(0 40px, 20px 20px, 20px 40px);
        }
      }
    }

    &.player-card-b {
      background-image: url('~@/assets/active/lols12/sub/card-b.png');

      .card-numbers {
        background-color: #132176;
        font-size: 13px;

        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: -20px;
          width: 0;
          height: 0;
          border: 20px solid transparent;
          border-bottom: 20px solid #132176;
          display: block;
          clip-path: polygon(0 40px, 20px 20px, 20px 40px);
        }
      }
    }
  }

  .myteam-cards-wrapper {
    margin-top: 20px;
    margin-bottom: 20px;

    .player-card-empty {
      cursor: pointer;
      width: 150px;
      height: 234px;
      border: dashed 2px #fff;
      margin-right: 40px;
      border-radius: 16px;

      &:last-child {
        margin-right: 0;
      }

      .add-icon {
        width: 28px;
        height: 28px;
        background: url('~@/assets/active/lols12/sub/sprite.png');
        background-position: -537px -200px;
        transition: scale .3s;
        transform-origin: center;
      }

      .add-text {
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        margin-top: 8px;
        background-image: none !important;
      }

      &:hover {
        .add-icon {
          transform: scale(1.1);
        }
      }
    }
  }

  .bx-wrapper {
    user-select: none;
    margin: auto;
    width: 944px;
    height: 201px;
    text-align: center;

    .box-name {
      margin-top: 13px;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
    }
  }
}
</style>