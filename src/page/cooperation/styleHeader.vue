<template>
  <header class="style-header">
    <div class="wrapper">
      <router-link to="/" class="vk-style-logo"/>

      <div class="menu">
        <router-link v-for="(item, index) in menuList"
                     :key="index"
                     :to="item.width ? item.link : (isLogin ? item.otherLink : item.link)"
                     :class="{button_primary_2022: !item.width, divergence_2022: !item.width}"
                     tag="a"
                     :target="item.width ? '_self' : '_blank'">
          <span v-if="item.width" :style="{width: `${item.width}px`, backgroundPosition: `${item.pos}`}"></span>
          {{ item.txt }}
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'styleHeader',
  data() {
    return {
      menuList: [
        { width: 64, pos: '-262px 3px', link: '/cooperhome', txt: '威客风采' },
        { width: 47, pos: '-349px 3px', link: '/sponsor', txt: 'TNC威客独家赞助' },
        { width: 69, pos: '-420px 3px', link: '/dawnbattle', txt: '威客黎明之战' },
        { link: '/register', otherLink: '/', txt: '加入威客电竞' }
      ]
    }
  },
  computed: {
    ...mapState(["isLogin"])
  }
}
</script>

<style lang="less" scoped>
.style-header {
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.3), #17191e);
  box-sizing: border-box;
  border-bottom: 1px solid rgba(125,131,157,0.3);
  .wrapper {
    display: flex;
    justify-content: space-between;
    .vk-style-logo {
      display: block;
      width: 232px;
      height: 80px;
      background: url("../../assets/web-icons.png") no-repeat;
      background-position: -18px 22px;
    }
    .menu {
      display: flex;
      a {
        display: block;
        height: 80px;
        font-size: 14px;
        line-height: 80px;
        color: #fff;
        margin-left: 35px;
        span {
          margin-right: 8px;
          display: inline-block;
          height: inherit;
          vertical-align: middle;
          background: url("../../assets/vkStyle/icon.png") no-repeat;
        }
        &.button_primary_2022 {
          display: inline-block;
          color: #000000;
          width: 126px;
          height: 34px;
          line-height: 34px;
          margin-top: 23px;
        }
      }
    }
  }
}
</style>
