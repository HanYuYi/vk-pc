<template>
  <div class="swiper-box">
    <swiper class="my-swiper" :options="mySwiperOptions">
      <swiper-slide v-for="(item, index) in matchList" :key="index" :class="{'over': item.status}">
        <h5 class="match-date">{{ item.date_time }}</h5>
        <div class="pk-main">
          <div class="flag-box"><img :src="item.l_team_logo" alt=""><span>{{ item.l_team_name }}</span></div>
          <em v-if="!item.status"></em>
          <em v-else class="match-date">已结束</em>
          <div class="flag-box"><img :src="item.r_team_logo" alt=""><span>{{ item.r_team_name }}</span></div>
        </div>
        <i v-if="item.is_hot" class="hot"></i>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'dotati10BannerMatch',
  components: { Swiper, SwiperSlide },
  data () {
    return {
      // banner配置
      mySwiperOptions: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 18,
        loopFillGroupWithBlank: true,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
      },
      matchList: []
    }
  },
  mounted () {
    this.getDotati10GroupData()
  },
  methods: {
    getDotati10GroupData () {
      this.$http(this.ApiSetting.active.dotati10MatchGroup)
        .then(response => {
          if (response.status === 1) {
            this.matchList = response.data
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
@icon: url("../../../assets/active/dotati10/icon.png");

.swiper-box {
  z-index: 1;
  width: 1240px;
  height: 181px;
  margin: 0 auto 21px;
  border-radius: 8px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.7);
  background-color: rgba(21, 21, 21, 0.7);
  position: relative;
  overflow: hidden;

  .my-swiper  {
    width: 1134px;
    height: 181px;

    /deep/ .swiper-wrapper {
      cursor: grab;
      &:active {
        cursor: grabbing;
      }
      .swiper-slide {
        width: 270px;
        height: 149px;
        border-radius: 8px;
        background: #2d2d2d;
        position: relative;
        margin-top: 16px;

        .match-date {
          display: block;
          text-align: center;
          font-size: 18px;
          color: #ffffce;
          font-weight: normal;
          line-height: 11px;
          margin-top: 10px;
        }

        .pk-main {
          display: flex;
          width: 230px;
          height: 110px;
          margin: 0 auto;
          align-items: center;
          justify-content: space-between;

          .flag-box {
            width: 70px;
            text-align: center;
            position: relative;

            img {
              width: 70px;
              height: 70px;
              border-radius: 50%;
            }

            span {
              width: 100px;
              position: absolute;
              left: -15px;
              bottom: -31px;
              white-space: nowrap;
              font-size: 16px;
              color: #fff;
              line-height: 28px;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          em {
            display: block;
            width: 36px;
            height: 27px;
            background: @icon;
            background-position: -160px -55px;
            margin: 0;
          }
          .match-date {
            width: auto;
            height: auto;
            font-size: 14px;
            font-weight: normal;
            color: #fff;
            padding: 5px 6px;
            border-radius: 6px;
            background: rgba(255, 255, 255, 0.4);
          }
        }

        .hot {
          display: inline-block;
          width: 21px;
          height: 23px;
          background: url("../../../assets/active/europeanCup2021/match_hot.png");
          position: absolute;
          right: 6px;
          top: -8px;
        }
      }

      .swiper-slide.over {
        background: #484848;
      }
    }
  }

  .swiper-button-prev, .swiper-button-next {
    width: 30px;
    height: 60px;
    top: 48%;
    background: @icon;
    &:after {
      content: "";
    }
  }

  .swiper-button-prev {
    background-position: -40px -120px;
    &:hover {
      background-position: -40px -40px;
    }
  }

  .swiper-button-next {
    background-position: -90px -120px;
    &:hover {
      background-position: -90px -40px;
    }
  }
}
</style>
