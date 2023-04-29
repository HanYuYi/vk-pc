<template>
  <div class="vbmarket wrapper ">
    <section class="fl confl">
      <!--用戶基本信息-->
      <div class="userinfo">
        <div class="user_headimg" v-lazy-container="lazyHead" v-if="isLogin"><img :data-src="userInfo.head_image" alt=""></div>
        <div class="user_headimg" v-if="!isLogin"><img src="/pc_static/defaultimg/headimg.png" alt=""></div>
        <div class="user_level" :class="['lv'+userInfo.user_lever]"><span></span></div>
        <span class="user_name ellips" :title="userInfo.nickname">{{userInfo.nickname}}</span>
        <span class="user_vbmoney" v-if="isLogin">我的V币余额&nbsp;<em>{{formatNumberSplit(userVirtualMoney)}}</em></span>
        <span class="user_vbmoney" v-if="!isLogin">未登录</span>
        <span class="user_vbmoney"
          v-if="userInfo.vmall_day_times>=0">今日还有&nbsp;<em>{{userInfo.vmall_day_times}}</em>&nbsp;次兑换机会</span>
        <el-popover placement="bottom" trigger="hover" popper-class="vbmarket_join_rule roll_rule_pop">
          <div class="join_rule">
            <ol>
              <li>威客VIP会员可在V币商城进行现金投注额兑换和实物礼品兑换，V币所兑换的现金将自动添加至会员的主钱包中，兑换现金需完成全站一倍有效流水。</li>
              <li>V币商城兑换实物或虚拟奖品，可在个人中心-我的背包 中自行操作折现或快递到家。首次快递到家，则需要先完成填写个人收货地址信息，工作人员将在信息提交后的一周内派发兑换物。</li>
              <li>快递到家提交成功后，可在快递信息图标点击查看订单详情，如有订单信息错误，该订单还在待派发状态，则可重新修改地址信息，若该订单状态已派发，则无法修改。</li>
              <li>V币兑换所有的实物礼品寄送地区仅限中国大陆地区，VKGAME不处理跨国邮寄礼品之事宜。</li>
              <li>V币兑换的礼品以VKGAME平台上的资料为准，如遇不可抗力因素，V币保留更换其它等值奖项的权利。</li>
              <li>对于存在作弊、不良交易、不良注册、发送垃圾消息、欺诈等不良行为的账号及其相关联的账号，以及已被冻结的账号及其相关联的账号，VKGAME有权对其做扣除V币处理。此活动最终解释权归VKGAME所有。</li>
            </ol>
          </div>
          <span class="rule" slot="reference">兑换规则&gt;</span>
        </el-popover>
      </div>
      <!--兑换记录-->
      <div class="got_history" v-if="isLogin&&hispage.total">
        <div class="title">我的兑换记录</div>
        <div class="list">
          <div class="loader" v-show="historyListLoad"><span></span></div>
          <ul>
            <li v-for="(item,index) in convertHis" :key="index">
              <span class="ellips" :title="item.goods_name">{{item.goods_name}}</span>
              <span class="fr">{{item.show_time}}</span>
            </li>
          </ul>
          <Page class-name="his_page" :total="hispage.total" :hispage-size="hispage.pagesize"
            :current.sync="hispage.currentpage" @on-change="myConvertList($event)"
            v-if="hispage.total >hispage.pagesize">
          </Page>
        </div>
      </div>
      <!--兑换榜单-->
      <div class="got_list" v-if="rankList.length">
        <div class="title">VIP兑换榜</div>
        <div class="list_wrapper awards_list">
          <div class="loader" v-show="rankListLoad"><span></span></div>
          <div class="no_player" v-if="!rankList.length">{{$t("No_record")}}</div>
          <transition-group name="vbmarket_notice_list">
            <div class="awards_list_box clearfix" v-for="item in rankList" :key="item.uuid">
              <div class="box_left fl">
                <div class="user_headimg" v-lazy-container="lazyHead">
                  <img :data-src="item.head_image" alt="" />
                  <div class="user_level" :class="'lv'+item.user_lever"><span></span></div>
                </div>
              </div>
              <div class="box_mid fl">
                <div class="user_name ellips" :title="item.username">{{item.username}}</div>
                <div class="time_info">{{item.timeDesc}}</div>
              </div>
              <div class="box_right fr">
                <div class="item_img" v-lazy-container="lazyPack244">
                  <img :data-src="item.goods_pic" alt="" />
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </section>
    <section class="fr confr">
      <!--分类-->
      <ul class="classify">
        <li v-for="(type, i) in prizeTypes" :key="type.type_id + i" @click="changePrizeType(type)"
          :class="{'selected':type.type_id==curTypeId}">
          {{type.type_name}}</li>
      </ul>
      <!--奖品-->
      <div class="prize_list_box">
        <div class="loader" v-show="prize_loadding">
          <span></span>
        </div>
        <div class="no_data"
          v-if="!prize_loadding&&prizeTypes[curPrizeTypesIndex]&&prizeTypes[curPrizeTypesIndex].prizeList&&!prizeTypes[curPrizeTypesIndex].prizeList.length">
          <img src="../assets/no-data.png" alt=""><span>{{$t("Temporarily_no_data")}}</span>
        </div>
        <ul class="prize_list"
          v-if="prizeTypes[curPrizeTypesIndex]&&prizeTypes[curPrizeTypesIndex].prizeList&&prizeTypes[curPrizeTypesIndex].prizeList.length">
          <li v-for="(prize,index) in prizeTypes[curPrizeTypesIndex].prizeList"
            v-show="index>=(page.currentpage-1)*page.pagesize && (index+1)<=page.currentpage*page.pagesize"
            :key="prize.goods_id" :class="{'disabled':isLogin&&(userVirtualMoney<prize.convert_price||userInfo.user_lever<prize.need_level||userInfo.vmall_day_times==0),
            'prize_lock':userInfo.user_lever<prize.need_level,
            'li_discount':prize.can_discount }">
            <div class="prize_img" v-lazy-container="lazyPack244"><img :data-src="prize.goods_pic" alt=""></div>
            <p class="prize_name ellips" :title="prize.goods_name">{{prize.goods_name}}</p>
            <p class="prize_level">等级≥VIP{{prize.need_level}}</p>
            <div class="btn" @click="conversion(prize)">
              <span class="d_btn"
                :class="{'disabled': vbExBtnDisable(prize)}">
                {{ vbBtnText(prize.convert_price) }} </span>
            </div>
            <p v-if="prize.can_discount" class="old_prize">{{formatNumberSplit(prize.old_price)}} V币</p>
            <div v-if="prize.can_discount && prize.new_discount_percent" class="discount">
              <!-- <span class="dis_num">{{( prize.discount_percent==0 ? "免费" : "-"+(100-prize.discount_percent)+"%"
              )}}</span> -->
             {{ prize.new_discount_percent }}
            </div>
            <div class="countdown" v-if="prize.show_last_text">
              {{ prize.convert_price == 0 ? '限时领取' : '限时兑换' }} {{ prize.show_last_text }}
            </div>
            <div class="lock">
              <img src="../assets/lock.png" alt="">
              <p>当前级别不够</p>
            </div>
          </li>
        </ul>
      </div>
      <Page class="fr" :total="page.total" :page-size="page.pagesize" :current.sync="page.currentpage"
        @on-change="handlePageChange($event)" v-if="page.total>page.pagesize">
      </Page>
    </section>
    <!--兑换现金成功弹窗-->
    <el-dialog :close-on-click-modal="false" :custom-class="'vbmarket_money_dialog'" :visible.sync="showCashDialog"
      :append-to-body="true">
      <div class="dialog_title" slot="title">兑换成功</div>
      <div class="dialog_wrapper">
        <div class="money_img" v-lazy-container="lazyPack244">
          <img :data-src="conversionGoodInfo.goods_pic" alt="">
        </div>
        <p class="money_desc ellips" :title="conversionGoodInfo.goods_name">{{conversionGoodInfo.goods_name}}</p>
        <p class="money_link" v-if="isSpeclGood(conversionGoodInfo)">您可在 <router-link :to="conversionGoodInfo.jump_url">{{conversionGoodInfo.jump_tips}}
          </router-link> 查看</p>
        <p class="money_link" v-else>您可在 <router-link to="/user">个人中心</router-link> 查看</p>
      </div>
    </el-dialog>
    <!--兑换实物礼品成功弹窗-->
    <!-- <el-dialog :close-on-click-modal="false" :custom-class="'vbmarket_money_dialog vbmarket_entity_dialog'"
      :visible.sync="showEntityDialog" :append-to-body="true"> -->
    <el-dialog :close-on-click-modal="false" :custom-class="'vbmarket_money_dialog'"
      :visible.sync="showEntityDialog" :append-to-body="true">
      <div class="dialog_title" slot="title">兑换成功</div>
      <div class="dialog_wrapper">
        <div class="money_img" v-lazy-container="lazyPack244">
          <img :data-src="conversionGoodInfo.goods_pic" alt="">
        </div>
        <p class="money_desc ellips" :title="conversionGoodInfo.goods_name">{{conversionGoodInfo.goods_name}}</p>
        <p class="money_link">您可在 <router-link :to="`/user/package?gametype=0&id=${conversionGoodInfo.package_id}`">背包</router-link> 中查看</p>
        <!-- <p class="font-18">兑换码：<span class="code">{{conversionGoodInfo.secret}}</span><span class="style-link copy-btn" @click="doCopy">复制</span></p>
        <p class="font-18">奖品已发放至 <span class="style-link" @click="$router.push('/user/package/?gametype=0')">您的背包</span> 中，请注意查收。</p>
        <div class="bottom-btn-group d-flex align-center justify-center">
          <div class="btn-normal forcash-btn">我要折现</div>
          <div class="btn-normal forgoods-bt" @click.stop="sendToHome">快递到家</div>
        </div> -->
        <!-- <div class="">
          <p class="money_link">请查看站内信或复制下方物品兑换码，并联系<br>客服领取。</p>
          <p class="code">{{conversionGoodInfo.secret}}</p>
          <div class="btns">
            <div class="fl" @click="doCopy">复制兑换码</div>
            <div class="fr" @click="toOpenKfWindow()">联系客服</div>
          </div>
        </div> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {beforeAfterTime, formatNumberSplit } from '../utils/util'
import { mapState } from 'vuex'
export default {
  name: 'vbmarket',
  data () {
    return {
      showEntityDialog: false,
      showCashDialog: false,
      rankList: [],
      historyListLoad: false,
      rankListLoad: false,
      page: {
        total: 10,
        pagesize: 16,
        currentpage: 1
      },
      hispage: {
        total: 0,
        pagesize: 9,
        currentpage: 1
      },
      noticeterval: null,
      prizeTypes: [],
      curTypeId: 0,
      curPrizeTypesIndex: 0,
      prize_loadding: false,
      conversionGoodInfo: {},
      convertHis: [],
      copyAlready: false
    }
  },
  computed: {
    ...mapState(['isLogin', 'userInfo', 'lazyPack244', 'userVirtualMoney', 'lazyHead'])
  },
  mounted () {
    this.getConvertTop()
    this.getGoodsType()
    this.myConvertList()
  },
  methods: {
    vbBtnText (price) {
      if (price == 0) {
        return '立即领取'
      } else {
        return this.formatNumberSplit(price) + 'V币兑换'
      }
    },
    // 计算VB兑换按钮是否置灰
    vbExBtnDisable (prize) {
      if (this.isLogin) {
        if (this.userVirtualMoney < prize.convert_price) {
          return true
        }
        if (this.userInfo.user_lever < prize.need_level) {
          return true
        }
        // 不是S12选票/世界杯选票等特殊商品，页面左边的兑换次数为0时，所有普通商品兑换按钮置灰
        if (!prize.spec_goods && this.userInfo.vmall_day_times == 0) {
          return true
        }
        // 是S12/世界杯等特殊商品，看单个商品的兑换次数是否是0
        if (prize.spec_goods && prize.spec_times == 0) {
          return true
        }
        return false
      }
      return false
    },
    // 判断是不是特殊商品，是的话，name和url使用接口返回的
    isSpeclGood (item) {
      return item.jump_url && item.jump_tips
    },
    formatNumberSplit (num) {
      let str = formatNumberSplit(num)
      return str.substring(0, str.length - 3)
    },
    // 联系客服
    toOpenKfWindow () {
      if (this.copyAlready) {
        this.openKfWindow()
        this.copyAlready = false
        this.showEntityDialog = false
      } else {
        this.$message({
          message: '请先点击"复制兑换码"',
          type: 'warning'
        })
      }
    },
    // 兑换
    conversion (prize) {
      if (!this.isLogin) {
        this.$message({
          message: this.$t('Please_login_first'),
          type: 'warning'
        })
        return
      }
      // 按钮置灰直接返回
      if (this.vbExBtnDisable(prize)) {
        return
      }
      // 次数不够，-1是无限次
      if ((!prize.spec_goods && this.userInfo.vmall_day_times == 0) ||
        (prize.spec_goods && prize.spec_times == 0)) {
        this.$message({
          message: '本日兑换次数已用完，请明日再来。',
          type: 'warning'
        })
        return
      }
      // 刷新商品接口看下当前商品是否过期
      const goodObj = prize
      this.$http(this.ApiSetting.getGoodsList).then(res => {
        if (res.status === 1 && res.data && res.data.list && res.data.list.length) {
          const item = res.data.list.find(item => item.goods_id === goodObj.goods_id)
          if (!item) {
            this.$message({
              message: '该商品已下架，看看其他商品吧',
              type: 'warning'
            })
            this.getGoodsList(true)
          } else {
            this.$confirm('<p>使用&nbsp;<em>' + prize.convert_price + '</em>&nbsp;V币<br>兑换<br><em>' + prize.goods_name + '</em><p>', this.$t('prompt'), {
              confirmButtonText: this.$t('determine'),
              cancelButtonText: this.$t('cancel'),
              type: 'warning',
              center: true,
              dangerouslyUseHTMLString: true,
              customClass: 'vbmarket_confirm',
              closeOnClickModal: false
            }).then(() => {
              this.$http(this.ApiSetting.convertGoods, { goods_id: prize.goods_id })
                .then(res => {
                  if (res.data) {
                    this.$store.commit('updateUserInfo', { user_lever: res.data.level })
                  }
                  if (res.status == 1 && res.data) {
                    this.conversionGoodInfo = res.data
                    this.getGoodsList(true)
                    this.$store.dispatch('getUserVirtualMoney')
                    if (res.data.is_cash == 1) {
                      this.showCashDialog = true
                    } else {
                      this.showEntityDialog = true
                      this.copyAlready = false
                    }
                    this.myConvertList()
                  }
                })
            })
          }
        }
      })
    },
    // 获取兑换记录
    myConvertList (bool) {
      // this.historyListLoad = true
      this.$http(this.ApiSetting.myConvertList, {page: this.hispage.currentpage, limit: this.hispage.pagesize})
        .then(res => {
          this.historyListLoad = false
          if (res.status == 1 && res.data) {
            this.convertHis = res.data.list
            this.hispage.total = res.data.count
          }
        }, (err) => {
          this.historyListLoad = false
        })
    },
    // 获取奖品列表
    getGoodsList (isReset = false) {
      this.prize_loadding = true
      this.$http(this.ApiSetting.getGoodsList)
        .then(res => {
          this.prize_loadding = false
          if (res.status == 1 && res.data) {

            // 解决兑换时数据重复
            if (isReset) {
              for (let i = 0; i < this.prizeTypes.length; i++) {
                this.prizeTypes[i].prizeList = []
              }
            }

            res.data.list.forEach(item => {
              if (item.can_discount == 1) {
                this.prizeTypes[this.prizeTypes.length - 1].prizeList.push(item)
              }

              this.prizeTypes.forEach((type, index) => {
                if (type.type_id == item.type_id) {
                  type.prizeList.push(item)
                }
                if (this.curTypeId == type.type_id) {
                  this.curPrizeTypesIndex = index
                }
              })
            })
            this.prizeTypes[0].prizeList = res.data.list
            this.page.total = this.prizeTypes[this.curPrizeTypesIndex].prizeList.length
          }
        }, (err) => {
          this.prize_loadding = false
        })
    },
    // 获取分类
    getGoodsType () {
      this.$http(this.ApiSetting.getGoodsType)
        .then(res => {
          if (res.status == 1 && res.data) {
            this.prizeTypes = res.data.types
            if (this.$route.params.curTypeId) { // 从周年庆跳转过来的折扣
              this.curTypeId = this.$route.params.curTypeId
            } else {
              this.curTypeId = this.prizeTypes[0].type_id
            }
            this.prizeTypes.forEach(item => {
              item.prizeList = []
            })
            this.getGoodsList()
            if (res.data.is_login) {
              this.$store.dispatch('getUserVirtualMoney')
            }
          }
        })
    },
    // 分类切换
    changePrizeType (item) {
      this.curTypeId = item.type_id
      this.prizeTypes.forEach((item, index) => {
        if (item.type_id == this.curTypeId) {
          this.curPrizeTypesIndex = index
        }
      })
      this.page.total = this.prizeTypes[this.curPrizeTypesIndex].prizeList.length
      this.page.currentpage = 1
    },
    // 复制兑换码
    doCopy () {
      let _this = this
      this.copyAlready = true
      this.$copyText(this.conversionGoodInfo.secret).then(function (e) {
        _this.$message({
          message: '兑换码复制成功!',
          type: 'success'
        })
      }, function (e) {
        _this.$message({
          message: _this.$t('Copy_the_failure'),
          type: 'warning'
        })
      })
    },
    // 页码跳转
    handlePageChange (x) {
      this.page.currentpage = x
      // this.loadRollRoomList ()
    },
    // 请求兑换榜单
    getConvertTop () {
      this.rankListLoad = true
      this.rankList = []
      this.$http(this.ApiSetting.getConvertTop)
        .then((res) => {
          this.rankListLoad = false
          if (res.status === 1) {
            if (res.data && res.data.length > 0) {
              this.rankList = res.data
              this.rankList.forEach(v => {
                v.uuid = this.guid()
                v.timeDesc = beforeAfterTime(Math.floor((new Date().getTime() - v.show_time * 1000) / 1000), 3)
              })
              clearInterval(this.noticeterval)
              if (this.rankList.length > 4) {
                this.noticeterval = setInterval(() => {
                  let tob = this.rankList.shift()
                  tob.uuid = this.guid()
                  this.rankList.push(tob)
                }, 3000)
              }
            }
          }
        }, (err) => {
          this.rankListLoad = false
        })
    },
    guid () {
      function S4 () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
      return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
    }
  }
}
</script>

<style scoped lang="less">
.adapt_img {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.vbmarket {
  padding: 100px 0 20px;
  overflow: hidden;
  * {
    box-sizing: border-box;
  }
  * +* {
    box-sizing: border-box;
  }

  .confl {
    margin-right: 20px;
    width: 295px;
    min-height: 810px;
    >div {
      width: 100%;
    }
    .userinfo {
      text-align: center;
      height: 300px;
      background: #21242d url("../assets/roll/user_bg.png") no-repeat bottom center;
      padding-top: 1px;
      .user_headimg {
        box-shadow: 0 0 0 5px #1c4d49;
        width: 108px;
        height: 108px;
        margin: 25px auto 0;
      }
      .user_level {
        margin-top:-7px;
      }
      .user_name {
        display: block;
        padding:0 10px;
        font-size: 18px;
        color: #fff;
        margin: 20px auto 12px;
      }
      .user_vbmoney {
        display: block;
        font-size: 14px;
        color: #ffffff;
        line-height: 2;
        em {
          color: #07f1b7;
        }
      }
      .rule {
        display: inline-block;
        margin-top: 15px;
        font-size: 12px;
        color: #07f1b7;
        opacity: 0.4;
        cursor: pointer;
        transition: opacity 0.2s;
        &:hover {
          opacity: 1;
        }
      }
    }
    .title {
      text-align: center;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      color: #ffffff;
      background-color: #262933;
    }
    .got_history {
      margin-top: 20px;
      .list {
        height: 400px;
        background:rgba(0, 0, 0, 0.4);
        ul {
          width: 100%;
          height: 352px;
          padding:10px 20px 0;
          li {
            width: 100%;
            height: 38px;
            line-height: 36px;
            color: #7c839f;
            font-size: 14px;
            span {
              display: inline-block;
              max-width: 170px;
            }
          }
        }
      }
      .his_page {
        text-align: center;

      }
    }
    .got_list {
      margin-top: 20px;
      .list_wrapper {
        background-color: rgba(0,0,0,0.4);
        position: relative;
        overflow: hidden;
        height: 372px;
      }
    }
  }
  .confr {
    width: 925px;
    .classify {
      width: 100%;
      height: 60px;
      background-color: #262933;
      display: flex;
      li {
        flex:1;
        float: left;
        // width: 170px;
        height: 100%;
        font-size: 18px;
        line-height: 60px;
        text-align: center;
        cursor: pointer;
        transition: background 0.2s;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          color: #07f1b7;
        }
        &.selected {
          color: #07f1b7;
          background: url("../assets/nav_select_bg.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .prize_list_box {
      .no_data{
        text-align: center;
        color: #fff;
        font-size: 16px;
        margin-top: 50px;
        img {
          margin-right: 20px;
        }
      }
    }
    .prize_list {
      overflow: hidden;
      li {
        float: left;
        width: 220px;
        height: 250px;
        margin: 20px 15px 0 0 ;
        background-color: #262933;
        position: relative;
        box-shadow: 0px 2px 50px 0px   rgba(0, 0, 0, 0.2);
        border:1px solid transparent;
        transition: border 0.2s;
        text-align: center;
        &:nth-child(4n) {
          margin-right: 0;
        }
        &:hover {
          border-color:#07f1de;
        }
        &.disabled:hover { border-color:transparent;}
        &.prize_lock:hover .lock{
          opacity: 1;
        }
        .discount {
          position: absolute;
          top: 0;
          right: -8px;
          width: 90px;
          height: 27px;
          line-height: 22px;
          color: #fff;
          font-weight: bold;
          box-sizing: border-box;
          padding-left: 6px;
          font-size: 18px;
          background:url("../assets/vbmarket/discount-label.png") no-repeat;
        }
        .countdown {
          position: absolute;
          top: 0;
          left: 0;
          box-sizing: border-box;
          background: url("../assets/vbmarket/cd-label.png") no-repeat;
          background-size: 100% 100%;
          width: 150px;
          height: 20px;
          font-size: 14px;
          color: #fff;
          text-align: left;
          padding-left: 10px;
        }
        .lock {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: rgba(38, 41, 51,0.95);
          padding-top: 64px;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
          p {
            margin-top: 18px;
            font-size: 14px;
            color: #7c839f;
          }
        }
        .prize_img {
          width: 100%;
          height: 125px;
          position: relative;
          margin-top: 10px;
          img {
             .adapt_img;
          }
        }
        .prize_name {
          font-size: 14px;
          color: #07f1b7;
          margin-top: 5px;
        }
        .prize_level {
          color: #7c839f;
          font-size: 14px;
          margin-top: 4px;
        }
        .btn {
          margin: 5px auto 0;
          width: 160px;
          height: 30px;
          cursor: pointer;
          .d_btn {
            width: 100%;
            font-size: 16px;
            background-image: linear-gradient(90deg,
            #07e9f1 0%,
            #07f1b7 100%);
            &:hover {
              color: #fff;
              background-image: linear-gradient(90deg,
              #07f1b7 0%,
              #07e9f1 100%);
            }
            &.disabled {
              background-image:none;
              &:hover {color:#53586b ;}
            }
          }
        }
        .old_prize {
          font-size: 14px;
          color: #07f1b7;
          margin-top: 7px;
          text-decoration: line-through;
        }
        &.li_discount {
          &.disabled .old_prize {
            color: #53586b;
          }
        }
      }
    }
  }

}
.vbmarket_money_dialog {
  .dialog_wrapper {
    text-align: center;
    overflow: hidden;
  }
  .money_img {
    width: 160px;
    height: 115px;
    position: relative;
    margin: 0 auto 10px;
    img {.adapt_img;}
  }
  .money_desc {
    font-size: 14px;
    color: #ffffff;
    margin-bottom: 12px;
  }
  .money_link {
    font-size: 14px;
    color: #7c839f;
    a {
      text-decoration: underline;
    }
  }
}
.vbmarket_entity_dialog {
  .font-18 {
    font-size: 18px;
    color: #7c839f;
    line-height: 1.6;
  }
  .money_img {
    width: 244px;
    height: 162px;
    margin-bottom: 14px;
  }
  .money_link {
    text-align: left;
    line-height: 1.8;
  }
  .code {
    color: #fff;
  }
  .copy-btn {
    margin-left: 10px;
  }
  .style-link {
    color: #07f1b7;
    text-decoration: underline;
    cursor: pointer;
  }
  .bottom-btn-group {
    margin-top: 24px;
    .btn-normal {
      position: relative;
      cursor: pointer;
      border-radius: 16px;
      width: 100px;
      height: 30px;
      border: 1px solid #7c839f;
      line-height: 32px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      &:hover {
        color: #07f1b7;

      }
      &.forgoods-bt {
        margin-left: 58px;
        border: 1px solid transparent;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        background-image: linear-gradient(to right, #17191f, #17191f), linear-gradient(to right, #07f1b7, #07e9f1);
      }
    }
  }
}
</style>
<style lang="less">
.his_page .ivu-page-item {
  display: none;
}
.vbmarket_money_dialog {
  width: 360px;
  border: 1px solid #07eae7;
  background-image: linear-gradient(to bottom, #17191f, #17191f), linear-gradient(to top, #07f1b7, #07e9f1);
  .dialog_title {
    font-size: 14px;
  }
}
.vbmarket_entity_dialog {
  width: 742px;
}
.vbmarket_entity_dialog .el-dialog__body {
 padding: 53px 20px;
}
.vbmarket_confirm p {font-size: 14px;}
.vbmarket_confirm em {color: #07f1b7}
 .vbmarket_notice_list-leave-to{
   transform: translateY(-30px);
}
 .vbmarket_notice_list-enter{
   transform: translateY(30px);
}
.vbmarket_notice_list-leave-active {
	position:absolute;
}
.vbmarket_notice_list-move {
  transition: transform 1s;
}
.vbmarket_confirm .el-message-box__header {
  padding-top: 5px;
}
.vbmarket_confirm.el-message-box--center .el-message-box__title {
  display: none;
}
.vbmarket_join_rule.roll_rule_pop  {
  width: 400px;
  .join_rule {
    width: 100%;
    box-sizing: border-box;
    padding: 0 12px;
    text-align: left;
    font-size: 14px;
    line-height: 1.71;

    ol {
      padding-left: 12px;
      list-style: decimal;
    }

    li {
      list-style: decimal;
    }
  }
}
</style>
