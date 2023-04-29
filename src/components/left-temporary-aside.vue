<template>
  <div class="left-temporary-aside" :class="{'animate__animated BounceInLeft': isAnima}">
    <!-- S12等临时活动左边的入口图，只在对应的活动页面展示 -->
    <div class="temporary-left-wrapper" v-if="showTemporary">
      <div @click="$router.push(item.path)" class="s12-left-nav" :class="`${item.key}-left-nav`"
        v-for="(item, j) in displayNav" :key="j" v-if="!closeSession">
        <span class="s12-text">{{item.label}}</span>
        <i @click.stop="close(item.key)" class="close"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LeftTemporaryAside',
  data() {
    return {
      isAnima: true,
      closeSession: JSON.parse(sessionStorage.getItem("left_temporary_aside_close"))
    }
  },
  watch: {
    LeftTempoNav(val) {
      if (val.length) {
        this.isAnima = true
        const timer = setTimeout(() => {
          this.isAnima = false
        }, 1200)
      }
    },
    $route(val) {
      if (val.path && this.showTemporary) {
        this.isAnima = true
        const timer = setTimeout(() => {
          this.isAnima = false
        }, 1200)
      }
    }
  },
  computed: {
    ...mapState(["LeftTempoNav"]),
    route() {
      return this.$route.path
    },
    displayNav() {
      if (this.route == '/active/lols12') {
        return this.LeftTempoNav.filter(item => item.key == 's12-son' || item.key == 'dota-ti11')
      }
      if (this.route == '/active/lols12sub') {
        return this.LeftTempoNav.filter(item => item.key == 's12-main' || item.key == 'dota-ti11')
      }
      if (this.route == '/active/dotati11') {
        return this.LeftTempoNav.filter(item => item.key == 's12-main' || item.key == 's12-son')
      }
      if (this.route == '/active/worldcup2022') {
        return this.LeftTempoNav.filter(item => item.key == 'world-cup-son')
      }
      if (this.route == '/active/worldcup2022sub') {
        return this.LeftTempoNav.filter(item => item.key == 'world-cup-main')
      }
      return this.LeftTempoNav
    },
    // 哪些页面展示临时导航
    showTemporary() {
      const showLinkArr = [
        '/active/lols12',
        '/active/lols12sub',
        '/active/dotati11',
        '/active/worldcup2022',
        '/active/worldcup2022sub'
      ]
      return showLinkArr.includes(this.route)
    }
  },
  methods: {
    close() {
      sessionStorage.setItem("left_temporary_aside_close", JSON.stringify(true))
      this.closeSession = JSON.parse(sessionStorage.getItem("left_temporary_aside_close"))
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes BounceInLeft {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
      opacity: 0;
      transform: translate3d(-3000px, -50%, 0) scaleX(3);
    }

    60% {
      opacity: 1;
      transform: translate3d(25px, -50%, 0) scaleX(1);
    }

    75% {
      transform: translate3d(-10px, -50%, 0) scaleX(0.98);
    }

    90% {
      transform: translate3d(5px, -50%, 0) scaleX(0.995);
    }

    to {
      transform: translate3d(0, -50%, 0);
    }
  }
.left-temporary-aside {
  position: fixed;
  z-index: 99;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  &.BounceInLeft {
    animation-name: BounceInLeft;
  }

  .s12-left-nav {
    margin-left: 4px;
    cursor: pointer;
    width: 310px;
    height: 170px;
    background: url('~@/assets/left-active/temporary/s12/normal.png') no-repeat;
    background-position: center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;

    .s12-text {
      text-align: center;
      width: 175px;
      font-size: 18px;
      font-weight: bold;
      line-height: 1;
      color: #000;
      font-style: italic;
      letter-spacing: 0.6px;
      margin-bottom: 9px;
    }

    .close {
      position: absolute;
      z-index: 150;
      top: 0;
      right: 10px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: url("../assets/anniversary_aside_close_icon.png");
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.3s;

      &:hover {
        opacity: 1;
      }
    }

    &.dota-ti11-left-nav {
      background-image: url('~@/assets/left-active/temporary/ti11/normal.png');
      .s12-text {
        color: #f9dba6;
      }
    }

    &:hover {
      background-image: url('~@/assets/left-active/temporary/s12/hover.png');

      &.dota-ti11-left-nav {
        background-image: url('~@/assets/left-active/temporary/ti11/hover.png');
      }

      .s12-text {
        color: #fff;
        font-size: 22px;
      }
    }


    &.world-cup-main-left-nav, &.world-cup-son-left-nav {
      margin-left: 0;
      width: 222px;
      height: 213px;
      background-image: url('../assets/left-active/worldcup/to_main.png');
      background-size: 100%;
      background-position: center;
    }

    &.world-cup-son-left-nav {
      background-image: url('../assets/left-active/worldcup/to_sub.png');
    }
  }
}
</style>
