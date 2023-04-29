<template>
  <dl class="roll-ornaments">
    <dt class="title">
      <small class="subtitle" v-if="rollData.roll_finished">
        {{ $t("Recently") }} <i>{{ rollData.count }}</i> {{ $t("A_ROLL_act_the_role") }}
      </small>
      <small class="subtitle" v-else>
       {{ $t("The_ongoing") }} <i>{{ rollData.count }}</i> {{ $t("A_ROLL_act_the_role") }}
      </small>

      <div class="more">
        <router-link to="/roll" class="link_primary_2022">查看更多</router-link>
      </div>

    </dt>

    <dd class="content">
      <ul>
        <!-- 中奖排行榜-->
        <li class="rank-list">
          <template v-if="!rankListLoading">
            <h5><i></i>中奖排行榜</h5>
            <template v-if="rankList.length">
              <div v-for="(item, index) in rankList" :key="index" class="rank-item">
                <img :src="rankIconList[index]" alt="" class="icon">
                <div class="avatar"><img :src="item.head_image" alt=""></div>
                <div class="data-details">
                  <p class="username">{{ item.username }}</p>
                  <p class="price">{{ item.total_price }}</p>
                </div>
              </div>
            </template>
            <div v-else class="home_no_player">{{ $t("No_record") }}</div>
          </template>
          <div v-else class="home_loading"></div>
        </li>

        <!-- roll房间-->
        <template v-if="!loading">
          <li v-for="(item, index) in rollData.list" :key="index" class="room-list">
            <router-link :to="`/roll/${item.id}`" class="banner">
              <img
                v-lazy="{
                src:item.items[0] && item.items[0].icon_url,
                error: $store.state.lazyPack2022.error,
                loading: $store.state.lazyPack2022.loading
              }"
                :alt="item.items[0] && item.items[0].market_name"
                :title="item.items[0] && item.items[0].market_name">

              <div class="master-details">
                <div class="avatar-box"><img :src="item.head_image" alt=""></div>
                <div class="data-details">
                  <p class="username">{{ item.username }}</p>
                  <p class="user_level_2022" :class="`lv${item.user_lever}`"></p>
                </div>
              </div>
            </router-link>

            <div class="details">
              <h5>{{ item.items[0].market_name }}</h5>
              <ul class="roll-info">
                <li>
                  <i></i>
                  <div class="info">
                    <p>价值</p>
                    <p>{{ item.price }}</p>
                  </div>
                </li>
                <li>
                  <i></i>
                  <div class="info">
                    <p>参与人数</p>
                    <p>{{ item.apply_total }}人</p>
                  </div>
                </li>
                <li>
                  <i></i>
                  <div class="info">
                    <p>倒计时</p>
                    <p>{{ countDownList[index] }}</p>
                  </div>
                </li>
              </ul>
            </div>

            <router-link v-if="item.is_end === 1" :to="`/roll/${item.id}`" class="to-room">{{ $t("Has_ended") }}</router-link>
            <router-link v-else :to="`/roll/${item.id}`" class="to-room run">立即参加</router-link>
          </li>
        </template>
        <div v-else class="home_loading room-list-loading"></div>
      </ul>

    </dd>
</dl>
</template>

<script>
export default {
  name: 'rollOrnaments',
  props: ["rollData", "loading"],
  data() {
    return {
      rankIconList: [
        require("../../assets/index/rank_icon_1.png"),
        require("../../assets/index/rank_icon_2.png"),
        require("../../assets/index/rank_icon_3.png"),
      ],
      rankList: [],
      rankListLoading: false,
      countDownList: [],
      timer: null
    }
  },
  watch: {
    rollData: {
      handler({ list }) {
        if (list && list.length) {
          this.roomCountDown()
        }
      },
      deep: true
    }
  },
  mounted () {
    this.loadRightList()
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    // 加载首页中奖排行榜数据
    async loadRightList () {
      this.rankListLoading = true
      try {
        const res = await this.$http(this.ApiSetting.roll.getRightList)

        console.info("首页中奖排行榜数据初始化：", res)
        if (res.status === 1 && res.data.rank) {
          this.rankList = res.data.rank
        }

        this.rankListLoading = false

      } catch (e) {
        this.rankListLoading = false
        throw e
      }
    },

    // roll房间倒计时
    roomCountDown() {
      const countDown = time => {
        const nowTime = new Date().getTime(),
          endTime = new Date(time * 1000).getTime(),
          dec = (endTime - nowTime) / 1000

        let day = parseInt(dec / 60 / 60 / 24)
        let hour = parseInt(dec / 60 / 60 % 24)
        let minute = parseInt(dec / 60 % 60)
        let allHour = day >= 1 ? day * 24 + hour : hour

        return `${allHour > 0 ? (allHour > 9 ? allHour : `0${allHour}`) : '00'}h ${minute > 0 ? (minute > 9 ? minute : `0${minute}`) : '00'}m`
      }

      this.rollData.list.forEach(item => {
        this.countDownList.push(countDown(item.end_time))
      })

      this.timer = setInterval(() => {
        this.countDownList = []
        this.rollData.list.forEach(item => {
          this.countDownList.push(countDown(item.end_time))
        })
      }, 1000 * 60)
    }
  }
}
</script>

<style lang="less" scoped>
.roll-ornaments {
  width: 1240px;
  margin: 44px auto 0;
  .title {
    width: inherit;
    background: url("../../assets/index/roll_title.png") center top no-repeat;
    text-align: center;
    overflow: hidden;
    .subtitle {
      display: block;
      margin-top: 84px;
      font-size: 14px;
      color: #acbae2;
      i {
        color: #07f1b7;
        font-family: Roboto;
      }
    }
    .more {
      margin-top: 19px;
      text-align: center;
      a {
        font-size: 14px;
        line-height: 14px;
        color: #07f1b7;
        position: relative;
        &:before, &:after {
          position: absolute;
          content: "";
          top: 7px;
          width: 7px;
          height: 4px;
          background-image: url("../../assets/home/head_li_icon_hover.png");
          pointer-events: none;
        }
        &:before {
          left: -18px;
          transform: rotate(-90deg);
        }
        &:after {
          right: -18px;
          transform: rotate(90deg);
        }
      }
    }
  }

  .content {
    &>ul {
      margin-top: 23px;
      display: flex;
      &>li {
        width: 300px;
        height: 296px;
        background-color: #202630;
        border-radius: 10px;
        margin-left: 12px;
      }
      .rank-list {
        margin-left: 0;
        h5 {
          margin: 20px 0 20px 15px;
          font-size: 16px;
          line-height: 16px;
          color: #07f1b7;
          i {
            display: inline-block;
            width: 22px;
            height: 25px;
            margin-right: 8px;
            vertical-align: middle;
            background: url("../../assets/index/rank_list_head_icon.png");
          }
        }
        .rank-item {
          width: 270px;
          height: 66px;
          margin: 0 0 10px 15px;
          border-radius: 10px;
          background-image: linear-gradient(to left, #3f465b, #313746);
          display: flex;
          align-items: center;
          .icon {
            width: 27px;
            margin-left: 20px;
          }
          .avatar {
            margin-left: 13px;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            overflow: hidden;
            background-color: #202630;
            img {
              width: inherit;
            }
          }
          .data-details {
            margin-left: 9px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-wrap: wrap;
            height: 32px;
            font-size: 14px;
            color: #ffffff;
            line-height: 14px;
            .username {
              width: inherit;
              white-space: nowrap;
            }
            .price {
              width: inherit;
              color: #acbae2;
              font-family: Roboto;
              line-height: 12px;
              white-space: nowrap;
            }
          }
        }
        .home_no_player {
          text-align: center;
          font-size: 16px;
          line-height: 196px;
        }
      }
      .room-list {
        overflow: hidden;
        .banner {
          display: block;
          width: inherit;
          height: 160px;
          overflow: hidden;
          position: relative;
          text-align: center;
          &:hover ~.run {
            &:before {
              transform: translateY(0px);
            }
          }
          &>img {
            height: inherit;
          }
          .master-details {
            width: calc(100% - 20px);
            height: 101px;
            position: absolute;
            top: 0;
            left: 0;
            padding: 12px 10px;
            background-image: linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0.5));
            display: flex;
            .avatar-box {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: #202630;
              overflow: hidden;
              img {
                width: inherit;
              }
            }
            .data-details {
              margin-left: 5px;
              height: 37px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .username {
                font-size: 15px;
                line-height: 15px;
                color: #ffffff;
              }
            }
          }
        }

        .details {
          h5 {
            padding: 0 13px;
            font-size: 16px;
            font-weight: normal;
            line-height: 41px;
            color: #ffffff;
          }
          .roll-info {
            display: flex;
            padding: 0 14px;
            box-sizing: border-box;
            border-top: 1px solid #2c394c;
            li {
              display: flex;
              i {
                display: inline-block;
                background: #07f1b7;
                margin: 18.5px 12px 0 0;
              }
              width: calc(100% / 3);
              &:nth-child(1n+1) {
                i {
                  width: 13px;
                  height: 16px;
                  background: url("../../assets/index/roll_cny_value.png");
                }
              }
              &:nth-child(2n+2) {
                i {
                  width: 14px;
                  height: 17px;
                  background: url("../../assets/index/roll_num_people.png");
                }
              }
              &:nth-child(3n+3) {
               i {
                 width: 18px;
                 height: 18px;
                 background: url("../../assets/index/roll_end_time.png");
               }
              }
              .info {
                height: 54px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                p {
                  &:first-child {
                    font-size: 12px;
                    line-height: 18px;
                    color: #acbae2;
                  }
                  &:last-child {
                    font-family: Roboto;
                    font-size: 13px;
                    line-height: 18px;
                    color: #ffffff;
                    white-space: nowrap;
                  }
                }
              }
            }
          }
        }

        .to-room {
          display: block;
          background-color: #313746;
          font-size: 14px;
          line-height: 40px;
          text-align: center;
          color: rgba(174, 188, 224, 0.5);
          &.run {
            color: #07f1b7;
            transition: color 0.3s;
            position: relative;
            &:before {
              position: absolute;
              content: "立即参加";
              inset: 0;
              transform: translateY(40px);
              width: 100%;
              height: 100%;
              color: #000;
              background-image: linear-gradient(to right, #07e9f1, #07f1b7);
              transition: transform 0.5s;
            }
            &:hover {
              &:before {
                transform: translateY(0px);
              }
            }
          }
        }
      }
      .room-list-loading {
        width: 924px;
        height: inherit;
        margin-left: 12px;
      }
    }
  }
}
</style>
