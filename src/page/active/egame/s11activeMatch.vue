<template>
  <div v-if="matchList.length" class="swiper-box">
    <swiper class="my-swiper" :options="mySwiperOptions">
      <swiper-slide v-for="(item, index) in matchList" :key="index">
        <h5 class="match-date"><i class="icon-date"></i>{{ item.date_time }}</h5>
        <div class="pk-main">
          <div class="flag-box"><div class="img-box"><img :src="item.l_team_logo" :alt="item.l_team_name"></div><span>{{ item.l_team_name }}</span></div>
          <em class="and"></em>
          <div class="flag-box"><div class="img-box"><img :src="item.r_team_logo" :alt="item.r_team_name"></div><span>{{ item.r_team_name }}</span></div>
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
  name: 's11activeMatch',
  components: { Swiper, SwiperSlide },
  data () {
    return {
      mySwiperOptions: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 18,
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      matchList: []
    }
  },
  mounted () {
    this.gets11ActiveMatchData()
  },
  methods: {
    gets11ActiveMatchData () {
      this.$http(this.ApiSetting.active.getLolS11Group)
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
@icon: url("../../../assets/active/s11active/icon.png") no-repeat;

.swiper-box {
  width: 1300px;
  height: 210px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  .my-swiper  {
    width: 1134px;
    height: inherit;
    /deep/ .swiper-wrapper {
      cursor: grab;

      &:active {
        cursor: grabbing;
      }

      .swiper-slide {
        width: 270px;
        height: 156px;
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
        background: #f1f1f3;
        position: relative;
        margin-top: 12px;

        .match-date {
          display: block;
          text-align: center;
          height: 32px;
          font-size: 18px;
          color: #fff;
          font-weight: normal;
          line-height: 32px;
          background-color: #374ef8;

          .icon-date {
            display: inline-block;
            width: 21px;
            height: 21px;
            background: @icon;
            background-position: -100px -25px;
            vertical-align: sub;
            margin-right: 5px;
          }
        }

        .pk-main {
          display: flex;
          width: 230px;
          margin: 15px auto 0;
          justify-content: space-between;

          .flag-box {
            width: 70px;
            text-align: center;
            .img-box {
              width: 70px;
              height: 70px;
              overflow: hidden;
              img {
                width: 70px;
              }
            }

            span {
              display: block;
              width: 100px;
              margin-left: -15px;
              font-size: 16px;
              color: #313131;
              line-height: 38px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }

          .and {
            display: inline-block;
            width: 28px;
            height: 32px;
            background: @icon;
            background-position: -135px -18px;
            margin-top: 20px;
          }
        }

        .hot {
          display: inline-block;
          width: 23px;
          height: 23px;
          background: @icon;
          background-position: -1482px -47px;
          position: absolute;
          right: 26px;
          top: 5px;
        }
      }
    }
  }

  .swiper-button-prev, .swiper-button-next {
    top: 10.5%;
    width: 44px;
    height: 180px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
    background-color: #f1f1f3;
    &:after {
      position: absolute;
      content: "";
      display: block;
      width: 30px;
      height: 50px;
      left: 7px;
      top: 65px;
      background: @icon;
    }
    &:hover{
      background-color: #374ef8;
    }
  }

  .swiper-button-prev {
    left: 24px;
    &:after {
      background-position: -6px -10px;
    }

    &:hover {
      &:after {
        background-position: -6px -70px;
      }
    }
  }

  .swiper-button-next {
    right: 24px;
    &:after {
      background-position: -50px -10px;
    }

    &:hover {
      &:after {
        background-position: -50px -70px;
      }
    }
  }
}
</style>
