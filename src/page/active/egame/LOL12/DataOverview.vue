<template>
  <div class="DataOverview-page">
    <template v-if="!ajaxLoading">
      <div class="d-flex flex-wrap">
        <div class="DO-wrapper d-flex" v-for="(item, i) in initData.info" :key="i">
          <div class="icon-wrapper d-flex align-center justify-center">
            <div class="icon" v-html="item.icon"></div>
          </div>
          <div class="right d-flex flex-column justify-center">
            <div class="label theme">{{ item.label }}</div>
            <div class="value bold" v-html="specDis(item.value)"></div>
          </div>
        </div>
      </div>
      <div class="bottom-dis d-flex" v-if="initData.chuchang.length || initData.ban.length">
        <div class="half">
          <div class="title-wrapper">
            <div class="title title-cccs">出场次数最多</div>
          </div>
          <div class="d-flex">
            <div class="cont theme label" v-for="(item,i) in initData.chuchang" :key="i">
              <img width="104" height="80" v-lazy="{
                src: item.hero,
                error: lazyMatchAvatar.error,
                loading: lazyMatchAvatar.loading
              }" alt="">
              <div class="name">{{ item.hero_name }}</div>
              <div class="num"><span class="value bold">{{item.number}}</span>次</div>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="half">
          <div class="title-wrapper">
            <div class="title title-bbcs">被BAN次数最多</div>
          </div>
          <div class="d-flex">
            <div class="cont theme label" v-for="(item,i) in initData.ban" :key="i">
              <img width="104" height="80" v-lazy="{
                src: item.hero,
                error: lazyMatchAvatar.error,
                loading: lazyMatchAvatar.loading
              }" alt="">
              <div class="name">{{ item.hero_name }}</div>
              <div class="num"><span class="value bold">{{item.number}}</span>次</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="!ajaxLoading && (!initData.info.length || !initData.chuchang.length || !initData.ban.length)">
      <div class="no-data-wrapper d-flex flex-column align-center">
        <img class="no-data-logo" width="134" height="136" src="~@/assets/active/lols12/new/no-data-logo.png" alt="">
        <div class="no-data-text">暂无数据!</div>
      </div>
    </template>
    <Loading v-if="ajaxLoading" class="list-loading" :color="'#bf9854'" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loading from '@/components/common/Loading.vue'
export default {
  name: 'DataOverview',
  components: {
    Loading
  },
  props: {
    gamecode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ajaxLoading: false,
      initData: {
        ban: [],
        chuchang: [],
        info: [],
      }
    }
  },
  watch: {
    gamecode(val) {
      console.log('数据概览中的gamecode变化了', val)
      if (val) {
        this.init()
      }
    }
  },
  computed: {
    ...mapState([
      "lazyMatchAvatar"
    ]),
  },
  methods: {
    init() {
      this.ajaxLoading = true
      this.$http(this.ApiSetting.active.lols12.DataOverview, {
        tournament_code: this.gamecode
      })
        .then(res => {
          this.ajaxLoading = false
          console.log('数据概览', this.gamecode, res)
          if (res.status == 1&&res.data) {
            this.initData = res.data
          }
        })
        .catch(err => {
          this.ajaxLoading = false
        })
    },
    specDis(str) {
      const strArr = str.split('/')
      if (strArr.length) {
        return strArr.length > 1 ? `<span class="big">${strArr[0].trim()}</span><span class="theme small">/${strArr[1].trim()}</span>` : `<span class="big">${strArr[0].trim()}</span>`
      }
      return ''
    }
  }
}
</script>

<style lang="less" scoped>
.label {
  font-size: 14px;
}

.value {
  font-size: 18px;
  color: #fff;

  /deep/.small {
    font-size: 14px;
  }
}

.DataOverview-page {
  margin-top: 40px;
  width: 100%;
  .list-loading {
    position: absolute;
  }
  .DO-wrapper {
    width: 25%;
    margin-bottom: 20px;
    .icon-wrapper {
      width: 52px;
      height: 52px;
      box-sizing: border-box;
      box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.8);
      border: solid 2px #fff;
      background-image: linear-gradient(to bottom, #5ea2e6, #1841b6);
      /deep/svg {
        width: 52px;
        height: 52px;
        path {
          stroke: #0a0a0c;
          fill: #0a0a0c;
        }
      }
    }
    .right {
      margin-left: 15px;
    }
  }
  .bottom-dis {
    position: absolute;
    bottom: 0;
    left: -20px;
    width: 1240px;
    height: 219px;
    box-sizing: border-box;
    box-shadow: 0px 2px 3px 0 rgba(0, 0, 0, 0.4);
    background-color: #0a0a0c;
    .half {
      padding: 0 20px 0 22px;
      box-sizing: border-box;
      width:50%;
      height: 100%;
      .title {
        &::after {
          content: none;
        }
      }
      .cont {
        margin-top: 22px;
        margin-right: 15px;
        .name {
          margin-top: 8px;
        }
      }
    }
    .line {
      width: 1px;
      height: 100%;
      background-color: #fff;
    }

  }
}
</style>