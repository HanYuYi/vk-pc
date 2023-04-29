<template>
  <div class="brand-introduction">

    <div class="center-main" :class="{'load-finish': pageIndex === 1}">

      <div class="img-box">
        <ul class="switch-group">
          <li v-for="(item, index) in brandList" :key="item.id">
            <img :src="item.img" alt="" class="content-img">
            <div v-if="index === 1" :style="{backgroundImage: `url(${item.titleImg})`}" class="title-img"></div>
          </li>
        </ul>

        <div class="prev-btn" @click="slideTo(0)"></div>
        <div class="next-btn" @click="slideTo(1)"></div>
      </div>

      <div class="desc-box">
        <h1>全球博彩行业领先者</h1>
        <p class="with-title"><small>VKGAME</small></p>
        <p class="desc">
          VKGAME集团成立于2016年5月，是一个集于全球热门的电竞体育赛事于一体的大型综合线上娱乐平台，内含体育博彩、电子竞技、真人娱乐场、老虎机、棋牌等娱乐游戏，为全球用户提供最安全最流畅的游戏体验。威客电竞秉持着”专业 安全 创新“的基本理念，全方位满足不同用户场景，服务当下热门的电竞体育游戏用户，致力于向全球用户提供满意的产品和服务。<br>截止2021年，威客电竞注册用户已达千万，覆盖全球众多国家和地区，现已逐渐成长为全球行业领先品牌。
        </p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'brandIntroduction',
  props: ["pageIndex"],
  data() {
    return {
      brandList: [
        {
          id: 0,
          img: require("../../../assets/vkStyle/brandIntroduction_1.jpg"),
          titleImg: require("../../../assets/vkStyle/brandIntroduction_title_1.png")
        },
        {
          id: 1,
          img: require("../../../assets/vkStyle/brandIntroduction_2.jpg"),
          titleImg: require("../../../assets/vkStyle/brandIntroduction_title_2.png")
        },
        {
          id: 2,
          img: require("../../../assets/vkStyle/brandIntroduction_3.jpg"),
          titleImg: require("../../../assets/vkStyle/brandIntroduction_title_3.png")
        },
        {
          id: 3,
          img: require("../../../assets/vkStyle/brandIntroduction_4.jpg"),
          titleImg: require("../../../assets/vkStyle/brandIntroduction_title_4.png")
        }
      ],
      clicking: false,
      inter: null,
      timer: null
    }
  },
  watch: {
    clicking(bool) {
      if (bool) {
        clearInterval(this.inter)
      } else {
        this.autoPlay()
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.autoPlay()
    })
  },
  methods: {
    slideTo(dir) {
      this.clicking = true

      const cloneList = [...this.brandList]
      if (dir) {
        cloneList.push(cloneList.shift())
      } else {
        cloneList.unshift(cloneList.pop())
      }
      this.brandList = cloneList

      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.clicking = false
        clearTimeout(this.timer)
      }, 500)
    },
    autoPlay() {
      const cloneList = [...this.brandList]
      this.inter = setInterval(() => {
        cloneList.push(cloneList.shift())
        this.brandList = cloneList
      }, 4000)
    }
  },
  destroyed () {
    clearInterval(this.inter)
  }
}
</script>

<style lang="less" scoped>
.brand-introduction {
  width: 100%;
  height: 100%;
  background: url("../../../assets/vkStyle/brand_introduction_bg.jpg") no-repeat;
  background-position: center center;
  .center-main {
    width: 7.046rem;
    margin: calc(244px + 0.088rem) auto 0;
    display: flex;
    justify-content: space-between;
    .img-box {
      width: 4.119rem;
      position: relative;
      margin-left: 52px;
      transform: scale(0.1,0.1);
      filter: brightness(0.10);
      .switch-group {
        li {
          position: absolute;
          cursor: pointer;
          transition: all 0.3s;
          &:nth-child(1) {
            width: 2.188rem;
            height: 1.254rem;
            transform: translate(0px,0.142rem);
            z-index: 1;
            filter: brightness(0.40);
          }
          &:nth-child(2) {
            width: 2.873rem;
            height: 1.645rem;
            transform: translate(0.444rem,0.587rem);
            z-index: 4;
          }
          &:nth-child(3) {
            width: 2.188rem;
            height: 1.254rem;
            transform: translate(1.574rem,1.423rem);
            z-index: 3;
            filter: brightness(0.40);
          }
          &:nth-child(4) {
            width: 1.752rem;
            height: 1.005rem;
            transform: translate(2.366rem,2.024rem);
            z-index: 2;
            filter: brightness(0.30);
          }
          .content-img {
            pointer-events: none;
            width: inherit;
            height: inherit;
          }
          .title-img {
            margin: 13px 0 0 -11px;
            width: 2.508rem;
            height: 0.275rem;
            background-size: 100% 100%;
            pointer-events: none;
          }
        }
      }
      &:before, &:after {
        position: absolute;
        z-index: 5;
        top: 0.587rem;
        content: "";
        width: 3px;
        height: 1.645rem;
        background: url("../../../assets/vkStyle/img_box_be.png") no-repeat;
        background-size: 100% 100%;
      }
      &:before {
        left: 0.388rem;
      }
      &:after {
        left: 3.358rem;
      }

      .prev-btn, .next-btn {
        position: absolute;
        width: 38px;
        height: 38px;
        background: url("../../../assets/vkStyle/icon.png") no-repeat;
        z-index: 5;
        transition: transform 0.3s;
        cursor: pointer;
      }
      .prev-btn {
        left: 0.256rem;
        top: 0.433rem;
        background-position: -30px -404px;
        &:hover {
          transform: translate(-5px, -5px);
        }
      }
      .next-btn {
        left: 3.32rem;
        top: 2.19rem;
        background-position: -90px -404px;
        &:hover {
          transform: translate(5px, 5px);
        }
      }
    }

    .desc-box {
      margin-top: 47px;
      width: 2.58rem;
      height: 1.641rem;
      background: rgba(255,255,255,0.1);
      border: solid 1px rgba(255,255,255,0.3);
      box-sizing: border-box;
      position: relative;
      padding: 0 24px 0 49px;
      text-align: left;
      overflow: hidden;
      transform: scale(0.1,0.1);
      filter: brightness(0.10);
      &:before {
        position: absolute;
        top: 0.111rem;
        left: 0.106rem;
        content: "";
        width: 0.066rem;
        height: 1.414rem;
        background: url("../../../assets/vkStyle/brand-introduction_icon.png") no-repeat;
        background-size: 100% 100%;
      }

      h1 {
        font-family: YouSheBiaoTiHei;
        font-size: 0.266rem;
        font-weight: normal;
        line-height: 0.195rem;
        color: #ffffff;
        margin-top: 0.111rem;
        white-space: nowrap;
      }
      .with-title {
        font-family: YouSheBiaoTiHei;
        font-size: 0.115rem;
        line-height: 0.062rem;
        color: #ffffff;
        letter-spacing: 0.65px;
        text-align: center;
        margin-top: 0.071rem;
        small {
          position: relative;
          &:before, &:after {
            position: absolute;
            content: "";
            top: 0.057rem;
            width: 0.169rem;
            height: 2px;
            background-color: #07f1b7;
          }
          &:before {
            left: -0.258rem;
          }
          &:after {
            right: -0.258rem;
          }
        }
      }
      .desc {
        margin-top: 0.053rem;
        font-size: 0.08rem;
        line-height: 0.115rem;
        letter-spacing: 0.45px;
        text-align: left;
        color: #ffffff;
      }
    }

    &.load-finish {
      .img-box {
        filter: brightness(1);
        transform: scale(1,1);
        transition: transform 0.8s, filter 0.8s;
      }
      .desc-box {
        transform: scale(1,1);
        filter: brightness(1);
        transition: transform 0.8s, filter 0.8s;
      }
    }
  }

}
</style>
