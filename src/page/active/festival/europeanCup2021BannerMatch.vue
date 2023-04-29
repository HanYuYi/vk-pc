<template>
  <div class="swiper-box">
    <swiper class="my-swiper" :options="mySwiperOptions">
      <swiper-slide v-for="(item, index) in matchList" :key="index" :class="{'over': item.status}">
        <h5 v-if="!item.status" class="match-date">{{ item.date_time }}</h5>
        <em v-else class="match-date">已结束</em>
        <div class="pk-main">
          <div class="flag-box"><img :src="item.l_team_logo" alt=""><span>{{ item.l_team_name }}</span></div>
          <em>VS</em>
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
    name: 'europeanCup2021BannerMatch',
    components: { Swiper, SwiperSlide },
    data() {
      return {
        mySwiperOptions: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 32,
          loopFillGroupWithBlank: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
        },
        matchList: []
      }
    },
    mounted() {
      this.getEuropeCupGroupData()
    },
    methods: {
      getEuropeCupGroupData() {
        this.$http(this.ApiSetting.active.europeanCup2021.getEuropeCupGroup)
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
  .swiper-box {
    width: 1240px;
    height: 150px;
    margin: 503px auto 27px;
    border-radius: 8px;
    box-shadow: 0 1px 4px 0 rgba(3, 8, 8, 0.65);
    background-color: rgba(2, 79,90, 0.5);
    position: relative;
    overflow: hidden;

    .my-swiper  {
      width: 1088px;
      height: 150px;

      .swiper-slide {
        width: 248px;
        height: 120px;
        border-radius: 8px;
        box-shadow: 0 1px 1px 0 rgba(0, 94, 106, 0.65);
        background: url("../../../assets/active/europeanCup2021/swiper_panel.png");
        position: relative;
        margin-top: 15px;

        em {
          font-style: italic;
        }

        .match-date {
          display: block;
          text-align: center;
          font-size: 14px;
          color: #00616f;
          font-weight: normal;
          line-height: 11px;
          margin-top: 6px;
        }

        .pk-main {
          display: flex;
          width: 197px;
          height: 76px;
          margin: 10px auto 0;

          .flag-box {
            width: 60px;
            text-align: center;

            img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
            }

            span {
              font-size: 14px;
              color: #016473;
              line-height: 28px;
            }
          }

          em {
            font-size: 24px;
            line-height: 60px;
            font-weight: bold;
            color: #016473;
            margin: 0 23px;
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
        background: url("../../../assets/active/europeanCup2021/swiper_panel_over.png");
      }
    }

    .swiper-button-prev, .swiper-button-next {
      width: 42px;
      height: 59px;
      &:after {
        content: "";
      }
    }

    .swiper-button-prev {
      background: url("../../../assets/active/europeanCup2021/swiper_prev.png");

      &:hover {
        background: url("../../../assets/active/europeanCup2021/swiper_prev_hover.png");
      }
    }

    .swiper-button-next {
      background: url("../../../assets/active/europeanCup2021/swiper_next.png");

      &:hover {
        background: url("../../../assets/active/europeanCup2021/swiper_next_hover.png");
      }
    }
  }
</style>
