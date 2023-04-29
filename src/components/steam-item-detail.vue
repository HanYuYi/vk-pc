<template>
<div>
  <el-popover
    placement="right"
    trigger="hover"
    popper-class="item_detail_info "
    @show="loadItemDetail(item)"
    v-if="item.steam_item_id">
    <div class="loader" v-if="item.itemDetailLoad"><span></span></div>
    <div class="item_detail_wrapper" v-else>
      <div class="item_img_wrapper">
        <img :src="item.itemDetailData.icon_url" alt="" onerror="this.src='/pc_static/defaultimg/pack_244.png';this.onerror=null">
      </div>
      <h4 class="item_name" :style="{color: '#'+item.itemDetailData.name_color}">
        {{item.itemDetailData.market_name}}
      </h4>
      <div class="market_price detail_box" v-if="parseFloat(item.itemDetailData.money)!=0&&item.is_expire === 1 ">
        <span class="left">{{$t("Market_value")}}</span><span class="right">￥ {{item.itemDetailData.money}}</span><br/>
        <span class="left">{{$t("Discount_price")}}</span><span class="right">￥ {{item.itemDetailData.fmoney}}</span>
      </div>
      <div class="market_price detail_box" v-else-if="item.itemDetailData.price&&parseFloat(item.itemDetailData.price)!=0">
        <span class="left">{{$t("Market_value")}}</span><span class="right">￥ {{item.itemDetailData.price}}</span>
      </div>
      <div class="item_type detail_box" v-if="item.itemDetailData.game_name">
        <span class="left">
          <img :src="item.itemDetailData.game_icon" alt="" onerror="this.src='/pc_static/defaultimg/logo_88.png';this.onerror=null">
        </span>
        <span class="right">
          <i>{{item.itemDetailData.game_name}}</i><br/>
          <i>{{item.itemDetailData.type}}</i>
        </span>
      </div>
      <template v-if="typeof(item.itemDetailData.desc) == 'object'">
        <div class="detail_box" v-for="(desc, index) in item.itemDetailData.desc" :key="index" :style="{color: '#'+desc.color}">
          <div v-if="desc.type === 'html'" v-html="desc.value"></div>
          <div v-else>{{desc.value}}</div>
        </div>
      </template>
    </div>
    <slot  slot="reference"></slot>
  </el-popover>
  <slot  v-else></slot>
</div>
</template>

<script>
export default {
  name: "steam-item-detail",
  data() {
    return {};
  },
  props: ["item"],
  mounted() {},
  methods: {
    loadItemDetail (x) {
      if(x.itemDetailData.icon_url){
        return false
      }
      let data = {
        item_id: x.steam_item_id,
        exchange: 0 ,
        game_id: x.game_id,
        package_id : 0
      }
      x.itemDetailLoad = true
      this.$http(this.ApiSetting.user.getSteamItemDetail, data)
        .then((res) => {
          x.itemDetailLoad = false
          if(res.status === 1 && res.data){
            x.itemDetailData = res.data
          }
          this.$forceUpdate()
        }, (err) => {
          x.itemDetailLoad = false
        })
    }
  }
};
</script>

<style lang="less">
.item_detail_info {
  width: 326px;
  padding: 20px !important;
  color: #494e5f;
  .item_img_wrapper {
    height: 162px;
    width: 100%;
    img {
      max-width: 100%;
      height: 100%;
    }
  }
  .item_name {
    font-size: 18px;
    line-height: 30px;
    color: #fff;
    margin-top: 10px;
    font-weight: normal;
  }
  .detail_box {
    padding: 1px 0;
    &.market_price {
      margin-top: 10px;
    }
    span {
      &.left {
        display: inline-block;
        box-sizing: border-box;
      }
    }
    .right {
      display: inline-block;
    }
    &.item_type {
      margin: 10px 0;
      .left {
        padding-right: 4px;
        img[lazy=loading],
        img[lazy=error] {
          width: 32px;
          height: 32px;
        }
      }
      .right {
        line-height: normal;
        vertical-align: middle;
      }
    }
  }
}
</style>
