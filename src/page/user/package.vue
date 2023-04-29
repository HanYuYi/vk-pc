<template>
  <div class="package user_section">
    <h3 class="user_section_title clearfix">
      {{$t("My_backpack")}} <div class="btn fr" v-if="!userInfo.uuid"><a href="/steam" target="_blank" class="d_btn normal">{{$t("Binding_Steam")}}</a></div>
    </h3>
    <div class="user_section_content">
      <div class="package_nav user_section_content_nav clearfix">
        <div class="nav_box" :class="{'actived': item.id === currentNavId}" v-for="item in navDataList" :key="item.id" @click="packageTypeSelect(item.id)">
          {{item.title}}
          <i class="task_count"  v-if="deliInfoNum >0 && item.title === '派发信息'">{{
            countNum(deliInfoNum)}}
          </i>
        </div>
      </div>
      <div class="package_content inner_content">
        <!--我的背包-->
        <transition name="transitionRouter">
          <div class="my_bag" v-show="currentNavId===1">
            <div class="game_type_nav  radio_nav">
              <div class="btn fr" >
                <span class="btn_loading" v-if="toSteamBtnLoad"></span>
                <a v-if="!toSteamBtnLoad && userPackageList.length" href="javascript:;" class="el-button el-button--big" @click="discounting()" >{{$t("discounting")}}</a>
                <a v-if="currentGameType && !toSteamBtnLoad && userPackageList.length" href="javascript:;" class="el-button el-button--big" @click="handlePackageToSteam" >{{$t("To_retrieve")}}</a>
                <a v-if="!currentGameType && !toSteamBtnLoad && userPackageList.length" href="javascript:;" class="el-button el-button--big" @click="openRed()" >{{$t("open")}}</a>
                <a v-if="!currentGameType && !toSteamBtnLoad && userPackageList.length" href="javascript:;" class="el-button el-button--big" @click="sendToHome()" >快递到家</a></div>
                <!--<router-link to="/repurchase" class="fr to_link">{{$t("Act_the_role_ofing_is")}}</router-link>-->
                <radio-group v-model="currentGameType"  size="large" @on-change="gameTypeChange()">
                  <radio v-for="item in gameTypeList" :key="item.id" :label="item.id">{{item.name}}</radio>
                </radio-group>
            </div>
            <div class="mybag_items_wrapper">
              <div class="quote_list clearfix" v-show="userQuoteList.length>0">
                <div class="quote_list_box clearfix" v-for="(item, index) in userQuoteList" :key="index">
                  <div class="img_box">
                    <img :src="item.robot_img" alt="">
                  </div>
                  <div class="right">
                    <div class="quote_content clearfix">
                      <div class="quote_info fl">
                        <div class="quote_name ellips">{{item.account}}</div>
                        <div class="quote_code">{{$t("Security_code")}}：<span>{{item.safe_code}}</span></div>
                      </div>
                      <div class="btn fl">
                        <p v-if="!item.url">{{$t("Price_in_line")}}</p>
                        <a :href="item.url" class="d_btn normal" target="_blank" v-else>{{$t("To_deal_with")}}</a>
                      </div>
                    </div>
                    <p class="quote_tips" v-if="item.url">{{$t("Quotation_has_been_sent_successfully")}}</p>
                  </div>
                </div>
              </div>
              <div class="items_wrapper_content" :class="{'items_wrapper_content_other': currentGameType == 0}" ref="packageItemWrapper">
                <div class="no_items" v-if="myBagNoData">
                  {{$t("Your_backpack_is_empty")}}
                </div>
                <div class="item_content clearfix" ref="itemContent" v-else >
                  <steam-item-detail :item="item" v-for="(item,index) in userPackageList" :key="index">
                    <div class="item_box" :class="{'selected':item.selected}"
                      @click="handleItemSelect(item)" >
                      <img :src="item.icon_url" alt="">
                      <div class="item_name ellips" :title="item.market_name">{{item.market_name}}</div>
                      <div class="item_time d-flex align-center" v-if="item.expire_days">
                        <img width="16" height="16" src="~@/assets/user/time.png" alt="">
                        <div>{{ item.expire_days }}天</div>
                      </div>
                      <div class="select_icon"></div>
                    </div>
                  </steam-item-detail>
                  <div class="clear"></div>
                  <div class="btn" v-show="myBagItemsLoad"><span class="btn_loading"></span></div>
                </div>

              </div>
            </div>
          </div>
        </transition>
        <!--steam库存-->
        <transition name="transitionRouter">
          <div class="steam_storage" v-show="currentNavId===2">
            <div class="game_type_nav  radio_nav">
              <div class="btn fr">
                <span class="btn_loading" v-if="toPackageBtnLoad"></span>
                <a href="javascript:;" class="el-button el-button--big" @click="handleSteamToPackage" v-else>{{$t("Deposited_in_the_backpack")}}</a></div>
              <radio-group v-model="currentGameType"  size="large" @on-change="gameTypeChange()">
                <radio v-for="item in gameTypeList" :key="item.id" :label="item.id" v-if="item.id!==3">{{item.name}}</radio>
              </radio-group>
            </div>
            <div class="steam_storage_items_wrapper">
              <div class="quote_list clearfix" v-show="steamQuoteList.length>0">
                <div class="quote_list_box clearfix" v-for="(item, index) in steamQuoteList" :key="index">
                  <div class="img_box">
                    <img :src="item.robot_img" alt="">
                  </div>
                  <div class="right">
                    <div class="quote_content clearfix">
                      <div class="quote_info fl">
                        <div class="quote_name ellips">{{item.account}}</div>
                        <div class="quote_code">{{$t("Security_code")}}：<span>{{item.safe_code}}</span></div>
                      </div>
                      <div class="btn fl">
                        <p v-if="!item.url">{{$t("Price_in_line")}}</p>
                        <a :href="item.url" class="d_btn normal" target="_blank" v-else>{{$t("To_deal_with")}}</a>
                      </div>
                    </div>
                    <p class="quote_tips" v-if="item.url">{{$t("Quotation_has_been_sent_successfully")}}</p>
                  </div>
                </div>
              </div>
              <div class="items_wrapper_content">
                <div class="no_items" v-if="steamNoData">
                  {{$t("Your_backpack_is_empty")}}
                </div>
                <div class="item_content clearfix">
                  <steam-item-detail :item="item" v-for="(item,index) in steamPackageList" :key="index">
                    <div class="item_box" :class="{'selected':item.selected}"
                      @click="handleItemSelect(item)" >
                      <img :src="item.icon_url" alt="">
                      <div class="item_name ellips" :title="item.market_name"
                      :style="{color: '#'+item.name_color}">{{item.market_name}}</div>
                      <div class="item_price">{{item.price}}</div>
                      <div class="select_icon"></div>
                    </div>
                  </steam-item-detail>
                  <div class="clear"></div>
                  <div class="btn" v-show="steamPackageItemsLoad"><span class="btn_loading"></span></div>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <!-- steam交易链接 -->
        <transition name="transitionRouter">
          <div class="steam_trade_link" v-show="currentNavId===3">
            <p class="link_tips">{{$t("Please_fill_in_the_personal")}}<a :href="steanJumpUrl" target="_blank" class="to_link">{{$t("Check_the_Steam_trading_URL")}}</a></p>
            <div class="trade_link_box">
              <span class="left">{{$t("Steam_trading_URL")}}</span><input type="text" v-model="steamTradeUrl" class="ivu-input">
            </div>
            <div class="btn">
              <span class="btn_loading" v-if="setUrlLoad"></span>
              <a href="javascript:;" class="d_btn normal" @click="handleSetSteamTradeUrl" v-else>{{$t("Save_the_changes")}}</a>
            </div>
          </div>
        </transition>
        <!-- 库存日志 -->
        <transition name="transitionRouter">
          <div class="storage_log" v-show="currentNavId===4">
            <div class="user_records">
              <div class="user_records_title">
                {{$t("Inventory_log")}}<span>{{$t("In_recent_10_records")}}</span>
              </div>
              <div class="records_list">
                <div class="t-table">
                  <div class="t-header">
                    <div class="t-row">
                      <div class="t1">{{$t("time")}}</div>
                      <div class="t2">{{$t("items")}}</div>
                      <div class="t3">{{$t("Transaction_type")}}</div>
                    </div>
                  </div>
                  <div class="t-body">
                    <div class="btn" v-if="packageRecordLoad"><span class="btn_loading"></span></div>
                    <div class="t-row clearfix" v-for="(item, index) in userPackageRecordList" :key="index" v-else>
                      <div class="t1">{{item.time*1000 | formatdate('yyyy/MM/dd HH:mm:ss')}}</div>
                      <div class="t2">{{item.market_name}}</div>
                      <div class="t3">{{item.record_type_name}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <!-- 快递信息 -->
        <transition name="transitionRouter">
          <div class="delivery-wrapper" v-show="currentNavId===5" ref="deliveryWrapper">
            <div class="no_items" v-if="!deliveryInfo.length && !deliveLoading">
              暂无快递信息!
            </div>
            <div class="line-content" ref="deliItemContent" v-if="deliveryInfo.length && !deliveLoading">
              <div class="de-line d-flex" v-for="(item, i) in deliveryInfo" :key="i">
                <div class="money_img text-center" v-lazy-container="lazyPack244">
                  <img :data-src="item.icon_url" alt="">
                </div>
                <div class="center">
                  <div class="name">{{item.goods_name}}</div>
                  <div class="time">兑换时间：{{item.create_time}}</div>
                </div>
                <div class="right">
                  <div class="status">
                    <span style="color: #07f1b7" v-if="item.status == 0">
                      {{ item.is_lock == 1 ? '派发中' : '待派发' }}
                    </span>
                    <span style="color: #e34d12" v-if="item.status == 1">派发失败</span>
                    <span style="color: #07f1b7" v-if="item.status == 2">派发成功</span>
                  </div>
                  <div class="btn-detail">
                    <div @click="transferStatu(item)" class="el-button el-button--big">
                      <span v-if="(item.is_lock == 0 && item.status == 0)">
                        {{ item.is_virtual == 1 ? '修改账号' : '修改地址'}}
                      </span>
                      <span v-else>查看详情</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn" v-show="deliveLoading"><span class="btn_loading"></span></div>
          </div>
        </transition>
      </div>
    </div>
    <!--开背包里的红包-->
    <el-dialog
      :custom-class="'birth_prize_dialog '"
      :visible.sync="showRed"
      :append-to-body="true" >
      <div class="mybag">
        <div class="mybag_bg1"></div>
        <div class="mybag_bg2">
          <span>{{$t('Congratulations_to_you_to_get')}}</span><br>
          <strong>{{mybagOpen}}</strong> <span>{{$t('yuan')}}</span>
        </div>
        <div class="mybag_bg3"></div>
        <div class="mybag_btn" @click="showRed =false"></div>
      </div>
    </el-dialog>
    <!--背包里的实物折现-->
    <el-dialog
      :visible.sync="showDiscounting"
      width="742px"
      :custom-class="'discounting_dialog vbmarket_address_dialog'">
      <div class="dialog_title" slot="title">{{$t("discounting")}}</div>
      <div class="dialog_wrapper">
        <div class="redeem_tips">亲爱的威客会员：<br/>
          <!-- steam物品 -->
          <template v-if="selectedItem.game_id > 0">
            由于物品价格在市场中波动频繁，本站的折现服务主体是免费赠与用户奖品，价格将会低于市场估价结算。如果您不接受本站的折现价格，对应的奖品可选择取回三方背包。
          </template>
          <!-- 实物 -->
          <template v-if="selectedItem.game_id == 0 && selectedItem.is_virtual == 0">
            由于物品价格在市场中波动频繁，本站的折现服务主体是免费赠与用户奖品，价格将会低于市场估价结算。如果您不接受本站的折现价格，对应的奖品可选择快递到家。
          </template>
          <!-- 虚拟物品 -->
          <template v-if="selectedItem.game_id == 0 && selectedItem.is_virtual == 1">
            由于物品价格在市场中波动频繁，本站的折现服务主体是免费赠与用户奖品，价格将会低于市场估价结算。
          </template>
        </div>
        <div class="dialog_form_box">
          <img :src="selectedItem.icon_url" alt="">
          <div class="content_right">
            <h3>{{selectedItem.name}}</h3>
            <span>{{$t('market_value')}}：￥<em>{{selectedItem.money}}</em></span>
            <!-- 只有steam物品展示溢价 -->
            <span v-if="selectedItem.game_id > 0">{{selectedItem.discount}}%{{$t('premium')}}：￥<em>{{selectedItem.discount_money}}</em></span>
            <span>{{$t('This_site_is_discounted')}}：￥<em>{{selectedItem.tmoney}}</em></span>
          </div>
        </div>
        <span class="dismoney">{{$t('The_discount_amount')}}：￥</span><span class="dismoney_em">{{selectedItem.tmoney}}</span>
        <div class="btn">
          <a href="javascript:;" class="d_btn normal" @click="toDiscounting()">{{$t("Confirm_the_discount")}}</a>
        </div>
      </div>
    </el-dialog>
    <!-- 添加/编辑实物收货地址弹窗 -->
    <goods-address-dialog
     ref="addredio"
     :userAddress="userAddress"
     :status="addressStatus"
     :visualGoods="visualGoods"
     @updateGoods="loadUserPackage"
     @updateDeliInfo="getDeliveInfo"
     @confirmExpress="confirmExpress" />
    <!-- 确认之前的地址是否继续使用弹窗 -->
    <confirm-before-address-dialog
     ref="confidio"
     :userAddress="userAddress"
     @confirmExpress="confirmExpress"
     @edit-address-dio="edit" />
    <!-- 快递详情弹窗 -->
    <delivery-dialog ref="delidio" :goodsType="goodsType" :detail="deliDetail" :status="deliDioStatus" />
  </div>
</template>

<script type="text/javascript">
import GoodsAddressDialog from '@/components/goods-address/goods-address-dialog.vue'
import ConfirmBeforeAddressDialog from '@/components/goods-address/confirm-before-address-dialog.vue'
import DeliveryDialog from '@/components/goods-address/delivery-dialog.vue'
import { mapState, mapMutations } from 'vuex'
import { formatDate } from '../../utils/util'
import steamItemDetail from '@/components/steam-item-detail'
export default {
  name: 'package',
  components: {
    steamItemDetail,
    GoodsAddressDialog,
    ConfirmBeforeAddressDialog,
    DeliveryDialog
  },
  filters: {
    formatdate (num, formate) {
      return formatDate(num, formate)
    }
  },
  watch: {
    currentNavId (val, oldVal) {
      console.log('背包tab切换', val, oldVal)
      if (val === 5) {
        this.deliInfoNum = 0
      }
    }
  },
  computed: {
    ...mapState(['userInfo', 'lazyPack244', 'taskCount']),
    navDataList () {
      if (this.$store.state.userInfo.uuid) {
        return [
          {
            title: this.$t('My_backpack'),
            id: 1
          },
          {
            title: this.$t('The_team_of_inventory'),
            id: 2
          },
          {
            title: this.$t('Steam_deal_link'),
            id: 3
          },
          {
            title: this.$t('Inventory_log'),
            id: 4
          },
          {
            title: '派发信息',
            id: 5
          }
        ]
      } else {
        return [
          {
            title: this.$t('My_backpack'),
            id: 1
          },
          {
            title: this.$t('The_team_of_inventory'),
            id: 2
          },
          {
            title: this.$t('Inventory_log'),
            id: 4
          },
          {
            title: '派发信息',
            id: 5
          }
        ]
      }
    }
  },
  async created () {
    // 进页面后把我的背包未处理数量置为0
    this.updateTaskCount({
      ...this.taskCount,
      package_count: 0
    })
    const { gametype, id } = this.$route.query
    if (this.$route.params.from == 'richpay') {
      this.currentGameType = 0
    }
    if (gametype) {
      this.currentGameType = Number(gametype)
    }
    const finish = await this.loadUserPackage()
    if (finish && id && this.userPackageList.length) {
      const goods = this.userPackageList.find(goods => goods.id == id)
      if (goods) {
        this.handleItemSelect(goods)
      }
    }
  },
  data () {
    return {
      deliInfoNum: 0, // 派发信息未处理消息数量
      goodsType: 'entity', // entity 实物，virtual 虚拟物品
      deliveLoading: false,
      addressStatus: 'add', // add: 添加地址，edit: 编辑地址, account: 添加相关平台账号
      deliDioStatus: 'success', // 快递详情弹窗状态，success：成功，fail:失败
      deliveryInfo: [], // 快递信息
      deliDetail: {}, // 快递详情
      userAddress: {}, // 用户保存过的地址
      visualGoods: {}, // 虚拟物品
      selectedItem: {},
      showDiscounting: false,
      showRed: false,
      mybagOpen: 0,
      popOptions: {
        removeOnDestroy: true
      },
      currentNavId: 1,
      currentGameType: 0,
      gameTypeList: [
        {
          id: 0,
          name: '待处理'
        },
        {
          id: 570,
          name: 'DOTA2'
        },
        {
          id: 730,
          name: 'CSGO'
        }
      ],
      userPackagePage: 1,
      deliPage: 1,
      packageScrollFlag: false,
      deliveryScrollFlag: false,
      userPackageList: [],
      steamPackageList: [],
      userQuoteList: [],
      steamQuoteList: [],
      userPackageRecordList: [],
      itemDetailLoad: false,
      itemDetailData: {},
      myBagItemsLoad: false,
      myBagNoData: false,
      steamNoData: false,
      steamPackageItemsLoad: false,
      packageRecordLoad: false,
      toPackageBtnLoad: false,
      toSteamBtnLoad: false,
      setUrlLoad: false,
      steanJumpUrl: '',
      steamTradeUrl: ''
    }
  },
  mounted () {
    this.getDeliNum()
    if (this.$refs.packageItemWrapper) {
      this.$refs.packageItemWrapper.addEventListener('scroll', this.handlePackageScroll)
    }

    if (this.$refs.deliveryWrapper) {
      this.$refs.deliveryWrapper.addEventListener('scroll', this.handleDeliveryScroll)
    }
  },
  destroyed () {
    if (this.$refs.packageItemWrapper) {
      this.$refs.packageItemWrapper.removeEventListener('scroll', this.handlePackageScroll)
    }
    if (this.$refs.deliveryWrapper) {
      this.$refs.deliveryWrapper.removeEventListener('scroll', this.handleDeliveryScroll)
    }
  },
  methods: {
    ...mapMutations(['updateTaskCount']),
    countNum (number) {
      return Number(number) > 99 ? '99+' : number
    },
    // 查询派发信息未处理数量
    getDeliNum () {
      this.$http(this.ApiSetting.user.deliInfoCount)
        .then(res => {
          console.log('获取派发信息未处理数量', res)
          if (res.status === 1 && res.data) {
            this.deliInfoNum = res.data.count
          }
        })
    },
    // 编辑地址
    async edit (v) {
      this.addressStatus = 'edit'
      if (!Object.keys(this.userAddress).length) {
        const haveAddress = await this.checkAddress()
        if (haveAddress) {
          this.$refs.addredio.isShowDio = v
          return
        }
      }
      this.$refs.addredio.isShowDio = v
    },
    // 快递到家
    async sendToHome () {
      if (this.userPackageList.length == 0) {
        return
      }
      let selectArr = []
      this.userPackageList.forEach((v, i) => {
        if (v.selected) {
          selectArr.push(v)
        }
      })
      if (selectArr.length <= 0) {
        this.$message({
          message: this.$t('请先选择实物'),
          type: 'warning'
        })
        return false
      }
      if (!selectArr[0].can_delivery) {
        this.$message({
          message: '此物品不支持快递',
          type: 'warning'
        })
        return false
      }
      const haveAddress = await this.checkAddress()
      if (haveAddress) {
        // 以前填写过地址
        this.$refs.confidio.isShowDio = true
      } else {
      // 首次添加地址
        this.addressStatus = 'add'
        this.$refs.addredio.isShowDio = true
      }
    },
    async transferStatu (item) {
      if (item.is_virtual == 1) {
        this.goodsType = 'virtual'
      } else {
        this.goodsType = 'entity'
      }
      if (item.status == 0) {
        if (item.is_lock == 1) {
          // 派发中
          this.deliDetail = item
          this.deliDioStatus = 'sending'
          this.$refs.delidio.isShowDio = true
        } else {
          // 待派发
          // 修改账号
          if (item.is_virtual == 1) {
            this.userAddress = item
            this.addressStatus = 'modifyAccount'
            this.$refs.addredio.isShowDio = true
          } else {
            // 修改快递地址
            this.userAddress = item
            this.addressStatus = 'modify'
            this.$refs.addredio.isShowDio = true
          }
        }
      }
      // 派发失败
      if (item.status == 1) {
        this.deliDetail = item
        this.deliDioStatus = 'fail'
        this.$refs.delidio.isShowDio = true
      }
      // 派发成功
      if (item.status == 2) {
        this.deliDetail = item
        this.deliDioStatus = 'success'
        this.$refs.delidio.isShowDio = true
      }
    },
    // 折现
    discounting () {
      if (this.userPackageList.length == 0) {
        return
      }
      let selectArr = []
      this.userPackageList.forEach((v, i) => {
        if (v.selected) {
          selectArr.push(v)
        }
      })
      if (selectArr.length > 1) {
        this.$message({
          message: this.$t('choose_single_item_discount'),
          type: 'warning'
        })
        return
      }
      if (selectArr.length <= 0) {
        this.$message({
          message: this.$t('请先选择实物'),
          type: 'warning'
        })
        return false
      }
      if (selectArr[0].can_change == 1) {
        this.showDiscounting = true
        this.selectedItem = selectArr[0]
      } else {
        this.$message({
          message: this.$t('This_item_cannot_be_discounting'),
          type: 'warning'
        })
      }
    },
    // 确认折现
    toDiscounting () {
      let selectArr = []
      this.userPackageList.forEach((v, i) => {
        if (v.selected) {
          selectArr.push(v)
        }
      })
      if (selectArr.length) {
        this.$http(this.ApiSetting.user.itemExchange, {id: selectArr[0].id})
          .then(res => {
            if (res.status == 1) {
              this.showDiscounting = false
              this.$message({
                message: this.$t('discounting_success'),
                type: 'success'
              })
              this.$store.dispatch('getUserMoeny', 'NM')
              this.loadUserPackage()
            }
          })
      }
    },

    // 开背包里的红包
    openRed () {
      if (this.userPackageList.length == 0) {
        return
      }
      let selectArr = []
      this.userPackageList.forEach((v, i) => {
        if (v.selected) {
          selectArr.push(v)
        }
      })
      if (selectArr.length <= 0) {
        this.$message({
          message: this.$t('Please_select_the_item_first'),
          type: 'warning'
        })
        return false
      }
      if (!selectArr[0].can_open) {
        this.$message({
          message: this.$t('This_item_cannot_be_opened'),
          type: 'warning'
        })
        return false
      }
      // is_money: 3, 虚拟物品
      if (selectArr[0].is_money == 3) {
        this.visualGoods = selectArr[0]
        this.addressStatus = 'account'
        this.$refs.addredio.isShowDio = true
      } else {
        this.$http(this.ApiSetting.user.openPackage, { id: selectArr[0].id })
          .then(res => {
            if (res.status == 1) {
              if (selectArr[0].is_money == 2 || selectArr[0].is_money === 4) {
                this.$message({ message: res.message, type: 'success' })
              } else {
                this.showRed = true
              }
              this.mybagOpen = selectArr[0].money
              this.$store.dispatch('getUserMoeny', 'NM')
              this.loadUserPackage()
            }
          })
      }
    },
    packageTypeSelect (x) {
      this.currentNavId = x
      this.currentGameType = 570
      if (x === 2) {
        this.gameTypeList = [
          {
            id: 570,
            name: 'DOTA2'
          },
          {
            id: 730,
            name: 'CSGO'
          }
        ]
        this.loadUserSteamPackage()
      }
      if (x === 1) {
        this.currentGameType = 0
        this.gameTypeList = [
          {
            id: 0,
            name: '待处理'
          },
          {
            id: 570,
            name: 'DOTA2'
          },
          {
            id: 730,
            name: 'CSGO'
          }
        ]
        this.loadUserPackage()
      }
      if (x === 4) {
        this.loadUserPackageRecord()
      }
      if (x === 3) {
        this.loadUserSteamInfo()
      }
      if (x === 5) {
        this.getDeliveInfo()
      }
      if (x !== 2) {
        this.steamQuoteList = []
      }
      if (x !== 1) {
        this.userQuoteList = []
      }
    },
    gameTypeChange () {
      if (this.currentNavId === 1) {
        this.loadUserPackage()
      } else if (this.currentNavId === 2) {
        this.loadUserSteamPackage()
      }
    },
    // 获取快递信息
    getDeliveInfo () {
      if (this.deliveLoading) {
        return
      }
      this.deliveLoading = true
      this.deliveryScrollFlag = false
      this.deliPage = 1
      this.$http(this.ApiSetting.user.deliverInfo, {
        page: 1,
        limit: 20
      })
        .then(res => {
          this.deliveLoading = false
          console.log('查询快递信息', res)
          if (res.status == 1 && res.data.list) {
            this.deliveryInfo = res.data.list.data
          }
        })
        .catch(err => {
          this.deliveLoading = false
        })
    },
    // 查询是否存在收货地址
    checkAddress () {
      return new Promise((resolve, reject) => {
        this.$http(this.ApiSetting.user.checkAddress)
          .then(res => {
            console.log('是否存在快递地址', res)
            if (res.status == 1 && res.data.list) {
              this.userAddress = res.data.list
              resolve(true)
            } else {
              resolve(false)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 确认发快递
    confirmExpress (staObj) {
      const selectGoods = this.userPackageList.find(v => v.selected)
      if (!selectGoods) {
        this.$message({
          message: this.$t('Please_select_the_item_first'),
          type: 'warning'
        })
      }
      console.log('staObj', staObj)
      // status: add: 添加地址，edit: 编辑地址, account: 添加相关平台账号, reuse:继续使用上次地址
      const address_id = staObj.addressId ? staObj.addressId : this.userAddress.id
      const package_id = selectGoods.id
      this.$http(this.ApiSetting.user.confirmExpress, {
        address_id,
        package_id
      })
        .then(res => {
          if (res.status == 1) {
            let message = '保存地址成功，我们会尽快发货'
            if (staObj.status == 'reuse') {
              message = '我们会尽快发货'
            }
            this.$message({ message, type: 'success' })
            this.loadUserPackage()
          }
        })
    },
    loadUserPackage () {
      return new Promise((resolve, reject) => {
        this.userPackageList = []
        this.myBagNoData = false
        this.userPackagePage = 1
        this.packageScrollFlag = false
        let data = {
          game_id: this.currentGameType,
          page: 1,
          limit: 40
        }
        this.myBagItemsLoad = true
        this.$http(this.ApiSetting.user.getUserPackage, data)
          .then((res) => {
            if (res.status === 1) {
              if (res.data.list.length > 0) {
                let newArr = res.data.list
                newArr.forEach(function (v, i) {
                  v.selected = false
                  v.itemDetailLoad = false
                  v.itemDetailData = {}
                })
                this.userPackageList = newArr
              } else if (res.data.list.length === 0) {
                this.myBagNoData = true
              }
              resolve(true)
            } else {
              resolve(false)
            }
            this.myBagItemsLoad = false
          }, (err) => {
            resolve(false)
            this.myBagNoData = false
            this.myBagItemsLoad = false
            console.log(err)
          })
      })
    },
    handleItemSelect (x) {
      x.selected = !x.selected
      if (this.currentGameType === 0) {
        this.userPackageList.forEach(item => {
          if (item.id != x.id) {
            item.selected = false
          }
        })
      }
    },
    handleDeliveryScroll () {
      if (this.deliveryScrollFlag) {
        return
      }
      let scrollDom = this.$refs.deliveryWrapper
      let iHeight = scrollDom.offsetHeight
      let tempHeight = this.$refs.deliItemContent.offsetHeight
      console.log('高度', tempHeight, scrollDom.scrollTop + iHeight)
      let scrollTop = parseInt(scrollDom.scrollTop)

      if (tempHeight <= (scrollTop + iHeight)) {
        this.deliveryScrollFlag = true
        // 快递信息
        this.deliPage++
        this.$http(this.ApiSetting.user.deliverInfo, {
          page: this.deliPage,
          limit: 20
        })
          .then(res => {
            this.deliveLoading = false
            console.log('查询快递信息', res)
            if (res.status == 1 && res.data.list.data.length) {
              this.deliveryInfo = this.deliveryInfo.concat(res.data.list.data)
              this.deliveryScrollFlag = false
            }
          })
          .catch(err => {
            this.deliveLoading = false
          })
      }
    },
    handlePackageScroll () {
      if (this.packageScrollFlag) {
        return false
      }
      let scrollDom = this.$refs.packageItemWrapper
      let iHeight = scrollDom.offsetHeight
      let tempHeight = this.$refs.itemContent.offsetHeight
      console.log('高度', tempHeight, scrollDom.scrollTop + iHeight)
      let scrollTop = parseInt(scrollDom.scrollTop)

      if (tempHeight <= (scrollTop + iHeight)) {
        this.packageScrollFlag = true
        this.userPackagePage++
        let data = {
          game_id: this.currentGameType,
          page: this.userPackagePage
        }
        this.myBagItemsLoad = true
        this.$http(this.ApiSetting.user.getUserPackage, data)
          .then((res) => {
            console.log('查询背包信息', res)
            if (res.status === 1) {
              if (res.data.list.length > 0) {
                let newArr = res.data.list
                let _this = this
                newArr.forEach(function (v, i) {
                  v.selected = false
                  v.itemDetailData = {}
                  _this.userPackageList.push(v)
                })
                this.packageScrollFlag = false
              }
            }
            this.myBagItemsLoad = false
          }, (err) => {
            this.myBagNoData = false
            this.myBagItemsLoad = false
          })
      }
    },
    loadUserSteamPackage () {
      let data = {
        game_id: this.currentGameType
      }
      this.steamNoData = false
      this.steamPackageItemsLoad = true
      this.steamPackageList = []
      this.$http(this.ApiSetting.user.getSteamStock, data)
        .then((res) => {
          if (res.status === 1) {
            if (res.data.length > 0) {
              let newArr = res.data
              newArr.forEach(function (v, i) {
                v.selected = false
              })
              this.steamPackageList = newArr
            } else if (res.data.length === 0) {
              this.steamNoData = true
            }
          }
          this.steamPackageItemsLoad = false
        }, (err) => {
          this.steamPackageItemsLoad = false
          this.steamNoData = false
        })
    },
    handlePackageToSteam () {
      if (!this.userInfo.uuid) {
        this.$message({
          message: this.$t('You_are_not_bound_to'),
          type: 'warning'
        })
        return false
      }
      let selectArr = []
      let idArr = []
      this.userPackageList.forEach((v, i) => {
        if (v.selected) {
          selectArr.push(v)
        }
      })
      if (selectArr.length <= 0) {
        this.$message({
          message: this.$t('Please_select_at_least_one'),
          type: 'warning'
        })
        return false
      } else {
        selectArr.forEach((v, i) => {
          idArr.push(v.id)
        })
      }
      let data = {
        ids: idArr.join(',')
      }
      this.toSteamBtnLoad = true
      this.$http(this.ApiSetting.user.packageToSteam, data)
        .then((res) => {
          if (res.status === 1) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.userQuoteList = res.data
            this.userQuoteListInit(1, this.userQuoteList)
          }
          this.toSteamBtnLoad = false
        }, (err) => {
          this.toSteamBtnLoad = false
        })
    },
    handleSteamToPackage () {
      let selectArr = []
      let idArr = []
      this.steamPackageList.forEach((v, i) => {
        if (v.selected) {
          selectArr.push(v)
        }
      })
      if (selectArr.length <= 0) {
        this.$message({
          message: this.$t('Please_select_at_least_one'),
          type: 'warning'
        })
        return false
      } else {
        selectArr.forEach((v, i) => {
          idArr.push(v.assetid)
        })
      }
      let data = {
        ids: idArr.join(','),
        game_id: this.currentGameType
      }
      this.toPackageBtnLoad = true
      this.$http(this.ApiSetting.user.steamToPackage, data)
        .then((res) => {
          if (res.status === 1) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.steamQuoteList = res.data
            this.userQuoteListInit(2, this.steamQuoteList)
          }
          this.toPackageBtnLoad = false
        }, (err) => {
          this.toPackageBtnLoad = false
        })
    },
    loadSteamTradeStatus (type, x) {
      let data = {
        trade_id: x.tradeofferid
      }
      let _this = this
      this.$http(this.ApiSetting.user.checkSteamTradeStatus, data)
        .then((res) => {
          if (res.status === 1) {
            if (res.data.is_cancel == 1 || res.data.is_success == 1) {
              clearInterval(x.timer)
              if (type === 1) {
                this.userQuoteList.forEach(function (v, i) {
                  if (x.tradeofferid == v.tradeofferid) {
                    _this.userQuoteList.splice(i, 1)
                  }
                })
                if (res.data.is_success == 1) {
                  _this.loadUserPackage()
                }
              }
              if (type === 2) {
                _this.steamQuoteList = []
                if (res.data.is_success == 1) {
                  _this.loadUserSteamPackage()
                }
              }
            }
            if (res.data.is_wait == 1) {

            }
            if (res.data.is_confirm == 1) {
              x.url = res.data.url
              if (type === 1) {
                this.userQuoteList.sort()
              }
              if (type === 2) {
                this.steamQuoteList.sort()
              }
            }
          } else {
            /* clearInterval(x.timer) */
          }
        }, (err) => {
          clearInterval(x.timer)
        })
    },
    handleSetSteamTradeUrl () {
      if (!this.steamTradeUrl) {
        this.$message({
          message: this.$t('Please_enter_trading_links'),
          type: 'warning'
        })
        return false
      }
      let re = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
      if (re.test(this.steamTradeUrl) == false) {
        this.$message({
          message: this.$t('You_enter_the_URL_of'),
          type: 'warning'
        })
        return false
      }
      this.setUrlLoad = true
      let data = {
        url: this.steamTradeUrl
      }
      this.$http(this.ApiSetting.user.setSteamTradeUrl, data)
        .then((res) => {
          if (res.status === 1) {
            this.$message({
              message: res.message,
              type: 'success'
            })
          }
          this.setUrlLoad = false
        }, (err) => {
          this.setUrlLoad = false
        })
    },
    loadUserPackageRecord () {
      if (this.packageRecordLoad) {
        return false
      }
      this.packageRecordLoad = true
      this.userPackageRecordList = []
      this.$http(this.ApiSetting.user.getPackageRecord)
        .then((res) => {
          if (res.status === 1) {
            if (res.data.length > 0) {
              this.userPackageRecordList = res.data
            }
          }
          this.packageRecordLoad = false
        }, (err) => {
          this.packageRecordLoad = false
        })
    },
    userQuoteListInit (type, data) {
      let _this = this
      data.forEach((v, i) => {
        v.timer = setInterval(() => {
          _this.loadSteamTradeStatus(type, v)
        }, 5000)
      })
    },
    loadUserSteamInfo () {
      this.$http(this.ApiSetting.user.getUserSteamInfo)
        .then((res) => {
          if (res.status === 1) {
            this.steanJumpUrl = res.data.steam_url
            this.steamTradeUrl = res.data.trade_url
          }
        })
    },
    loadItemDetail (x) {
      if (x.itemDetailData.icon_url) {
        return false
      }
      let data = {
        item_id: x.steam_item_id,
        exchange: x.is_expire,
        game_id: this.currentGameType,
        package_id: x.id
      }
      x.itemDetailLoad = true
      this.$http(this.ApiSetting.user.getSteamItemDetail, data)
        .then((res) => {
          x.itemDetailLoad = false
          if (res.status === 1) {
            x.itemDetailData = res.data
          }
        }, (err) => {
          x.itemDetailLoad = false
        })
    },
    loadSteamItemDetail (x) {
      this.itemDetailData = {}
      this.itemDetailData = x
    },
    handleItemDetailHide (x) {
      x.itemDetailLoad = false
    }
  }
}
</script>
<style lang="less" scoped>
.task_count {
    position: absolute;
    width: 26px;
    height: 26px;
    top: 0;
    border-radius: 50%;
    color: #fff;
    line-height: 26px;
    text-align: center;
    background-color: #e34d12;
    box-sizing: border-box;
    font-size: 14px;
    &.disable {
      line-height: 24px;
      border: 1px solid #e34d12;
      background-color: #262933;
    }
  }
.package h3.user_section_title .btn a{
  font-family: "Microsoft YaHei","微软雅黑",Helvetica,Arial,sans-serif;
  font-size: 14px;
  vertical-align: middle;
}
.steam_trade_link{
  color: #fff;
}
.steam_trade_link .link_tips{
  line-height: 26px;
}
.steam_trade_link  .trade_link_box{
  padding: 20px 0;
  font-size: 18px;
}
.trade_link_box .left{
  display: inline-block;
  width: 150px;
}
.steam_trade_link  .trade_link_box .ivu-input{
  border-color: #7c839f;
  width: 500px;
}
.steam_trade_link .btn{
  margin-top: 10px;
  margin-left: 150px;
}
.mybag_items_wrapper{
  padding: 10px 0 20px;
}
.mybag_items_wrapper .items_wrapper_content{
  height: 460px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.mybag_items_wrapper .items_wrapper_content.items_wrapper_content_other {
  height: 590px;
}
.item_content .btn{
  text-align: center;
}
.mybag_items_wrapper .item_content .item_time {
  position: absolute;
  width: 100%;
  height: 24px;
  box-sizing: border-box;
  font-size: 12px;
  color: #fff;
  padding-left: 5px;
  background-image: linear-gradient(to right, #181819, rgba(24, 24, 25, 0.01));
  top: 0;
  left: 0;
}
.mybag_items_wrapper .item_content .item_time img {
  margin-right: 4px;
}
.package_content .quote_list{
  margin-right: -4px;
  padding-bottom: 20px;
}
.items_wrapper_content .no_items{
  text-align: center;
  font-size: 14px;
}
.quote_list .quote_list_box{
  width: 410px;
  height: 98px;
  box-sizing: border-box;
  border: 1px solid #07f1b7;
  background-color: #17191f;
  padding: 0 20px;
  float: left;
  margin-right: 4px;
  margin-bottom: 5px;
}
.quote_list .quote_list_box .img_box{
  float: left;
  height: 100%;
  line-height: 96px;
  text-align: center;
  width: 68px;
}
.quote_list .quote_list_box .img_box img{
  height: 68px;
  width: 68px;
  border-radius: 50%;
}
.quote_list .quote_list_box .right{
  margin-left: 20px;
  padding-top: 18px;
  color: #fff;
  font-size: 14px;
  float: left;
}
.quote_list .quote_list_box .right .quote_info{
  width: 136px;
}
.quote_list .quote_list_box .right .quote_info>div{
  line-height: 22px;
}
.quote_list .quote_list_box .right .quote_code{
  color: #07f1b7;
}
.quote_list .quote_list_box .right .quote_tips{
  font-size: 12px;
  color: #7c839f;
  margin-top: 5px;
}
</style>
<style lang="less">
@import "~@/page/login/form.less";
.mybag {
    position: relative;
    height: 330px;
    overflow: hidden;
    .mybag_bg1, .mybag_bg2, .mybag_bg3,.mybag_btn {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .mybag_bg1 {
      width: 256px;
      height: 106px;
      bottom: 80px;
      background: url("../../assets/user/mybag_bg1.png") no-repeat;
    }
    .mybag_bg2 {
      box-sizing: border-box;
      padding-top: 20px;
      width: 246px;
      height: 174px;
      background: url("../../assets/user/mybag_bg2.png") no-repeat;
      bottom: 50px;
      animation: redup 0.5s linear;
      text-align: center;
      span {
        font-size: 24px;
        letter-spacing: 2.4px;
        color: #e5152d;
      }
      strong {
        font-weight: normal;
        font-size: 36px;
        color: #e5152d;
        line-height: 1.2;
      }
    }
    .mybag_bg3 {
      width: 256px;
      height: 149px;
      bottom: 0px;
      background: url("../../assets/user/mybag_bg3.png") no-repeat;
    }
    .mybag_btn {
      width: 86px;
      height: 114px;
      bottom: 30px;
      cursor: pointer;
      background: url("../../assets/user/mybag_btn.png") no-repeat;
    }
  }
  @keyframes redup {
    0% {
      bottom:-100px;
    }
    100% {
      bottom: 80px;
    }
  }
  .discounting_dialog {
    text-align: center;
    .dialog_title {
      text-align: left;
    }
    .redeem_tips {
      text-align: left;
      padding: 0 20px;
      color: #7c839f;
    }
    .dialog_form_box {
      text-align: center;
      padding-top:40px;
      img {
        max-height: 100px;
        margin-right: 20px;
      }
      .content_right {
        display: inline-block;
        vertical-align: middle;
        max-width:500px;
        h3 {
          text-align: left;
          font-size: 18px;
          color: #07f1b8;
        }
        span {
          text-align: left;
          font-size: 12px;
          color: #7c839f;
          display: block;
        }
        em {
          font-size: 20px;
          color: #7c839f;
        }
      }
    }
    .dismoney {
      font-size: 12px;
      color: #7c839f;
    }
    .dismoney_em{
      font-size: 20px;
      color: #ffffff;
    }
    .btn {
      margin-top:20px;
    }
  }
  .my_bag {
    .btn {
      a {
        margin-left: 16px;
      }
    }
  }
  .delivery-wrapper {
    width: 100%;
    height: 654px;
    padding-right: 20px;
    overflow-x: hidden;
    overflow-y: scroll;
    .no_items {
      font-size: 14px;
      text-align: center;
      margin-top: 20px;
    }
    .btn {
      text-align: center;
    }
    .de-line {
      margin-top: 10px;
      margin-bottom: 30px;
      font-size: 14px;
      line-height: 1;
    }
    .money_img {
      width: 148px;
      height: 100px;
      img {
        height: 100%;
        max-width: 100%;
      }
    }
    .center {
      flex: 1;
      box-sizing: border-box;
      padding-left: 30px;
      .time {
        margin-top: 19px;
      }
    }
    .right {
      text-align: right;
      .btn-detail {
        margin-top: 20px;
      }
    }
  }
</style>
