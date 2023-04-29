<template>
  <dl class="recommended-games">
    <dt class="title">
      <small>汇聚精品游戏，带给您丰富的游戏体验</small>
    </dt>

    <dd class="content">
      <template v-if="!loading">
        <ul class="tabs" :style="{width: `${gameData.length * 186}px`}">
          <li v-for="(item, index) in gameData"
              :key="index"
              :class="{active: activeIndex === index}"
              @click="activeIndex = index">
            <img :src="item.type_icon" alt="">
            <img :src="item.type_icon_hover" alt="">
            {{ item.type_title }}
          </li>
        </ul>

        <div class="tab-panel">
          <div v-for="(item, index) in gameData"
               :key="index" class="tab-item">

            <transition name="fade-left">
              <div v-show="activeIndex === index" class="left">
                <h1>{{ item.type_title }}</h1>
                <h2>{{ item.type_title_en }}</h2>
                <p>{{ item.type_desc }}</p>
                <div v-if="item.type_game_logo" class="about-games">
                  <img :src="item.type_game_logo" alt="">
                </div>

                <div class="game-entry">
                  <router-link v-for="(game, i) in item.type_game_list" :key="i" :to="game.url" :style="{'animation-delay': `${i * 0.07}s`}">
                    <span class="d3-container">
                      <i><img :src="game.logo" alt=""></i>
                      <i><img :src="game.logo_hover" alt=""></i>
                    </span>
                    <small :title="game.title">{{ game.title }}</small>
                  </router-link>
                </div>
              </div>
            </transition>

            <transition name="fade-right">
              <div v-show="activeIndex === index" class="right">
                <img :src="item.type_game_img" alt="">
              </div>
            </transition>

          </div>
        </div>
      </template>
      <div v-else class="home_loading"></div>
    </dd>
  </dl>
</template>

<script>
export default {
  name: 'recommendedGames',
  props: ["selectedIndex", "gameData", "loading"],
  data() {
    return {
      activeIndex: 0
    }
  },
  watch: {
    selectedIndex(index) {
      if (index) {
        this.activeIndex = Number.parseInt(index) - 1
      }
    }
  }
}
</script>

<style lang="less" scoped>
.recommended-games {
  width: 1240px;
  margin: 37px auto 0;
  .title {
    width: inherit;
    background: url("../../assets/index/gane_title.png") center top no-repeat;
    text-align: center;
    overflow: hidden;
    small {
      display: block;
      margin-top: 84px;
      font-size: 14px;
      color: #acbae2;
    }
  }
  .content {
    margin: 37px auto 0;
    .tabs {
      margin: 0 auto;
      height: 64px;
      padding: 8px 8px;
      border-radius: 32px;
      border: solid 1px #4a5169;
      box-sizing: border-box;
      box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.23), inset 0 3px 7px 0 rgba(140, 152, 201, 0.17);
      background-image: linear-gradient(to top, #252934, #343a4a);
      display: flex;
      li {
        margin: 0 8px;
        width: 170px;
        height: 48px;
        font-weight: bold;
        font-size: 16px;
        line-height: 48px;
        letter-spacing: 0.4px;
        text-align: center;
        color: #acbae2;
        border-radius: 24px;
        cursor: pointer;
        position: relative;
        transition: background-color 0.3s;
        img {
          vertical-align: middle;
          margin-right: -9px;
          &:nth-child(1n+1) {
            display: inline-block;
          }
          &:nth-child(2n+2) {
            display: none;
          }
        }
        &:hover {
          box-shadow: inset 0 9px 6px 0 rgba(21, 25, 34, 0.55);
          background-color: #1e222d;
        }
        &.active {
          transition: all 0.3s;
          color: #1e1e1e;
          box-shadow: inset 0 2px 0 0 rgba(201, 253, 238, 0.47);
          background-image: linear-gradient(to right, #07e9f1, #07f1b7);
          animation: tab-animate 0.6s ease;
          img {
            &:nth-child(1n+1) {
              display: none;
            }
            &:nth-child(2n+2) {
              display: inline-block;
            }
          }
        }
        @keyframes tab-animate {
          from {
            transform: scale(0,0);
          }
          to {
            transform: scale(1,1);
          }
        }
      }
    }

    .tab-panel {
      width: 100%;
      height: 570px;
      overflow: hidden;
      margin: 0 auto;
      .tab-item {
        display: flex;
        justify-content: center;
        .left {
          width: 651px;
          margin-top: 101px;
          z-index: 1;
          h1 {
            font-size: 56px;
            line-height: 56px;
            color: #07f1b7;
          }
          h2 {
            margin-top: 22px;
            font-family: Roboto;
            font-size: 78px;
            line-height: 60px;
            color: #ccd3e4;
          }
          p {
            width: 555px;
            margin-top: 16px;
            font-size: 14px;
            line-height: 28px;
            letter-spacing: normal;
            text-align: left;
            color: #acbae2;
          }
          .about-games {
            margin-top: 11px;
            height: 55px;
            img {
              height: inherit;
            }
          }

          .game-entry {
            width: 1240px;
            display: flex;
            margin-top: 30px;
            a {
              display: block;
              position:relative;
              width: 90px;
              margin-right: 10px;
              text-align: center;
              opacity: 0;
              transform: translateX(200px);
              animation: game-in 0.8s ease;
              perspective: 700px;
              animation-fill-mode: forwards;

              @keyframes game-in {
                0% {
                  opacity: 0;
                  transform: translateX(200px);
                }
                100% {
                  opacity: 1;
                  transform: translateX(0px);
                }
              }

              .d3-container {
                display: block;
                transform-style: preserve-3d;
                transition: all 500ms;
                width: 86px;
                height: 65px;
                position: absolute;
                transform: rotateX(-90deg);

                i {
                  position: absolute;
                  display: block;
                  width: 86px;
                  height: 65px;
                  border-radius: 10px;
                  box-sizing: border-box;
                  text-align: center;
                  line-height: 65px;
                  backface-visibility: hidden;

                  &:first-child {
                    background-image: linear-gradient(to top, #252934, #343a4a);
                    box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.23), inset 0 3px 7px 0 rgba(140, 152, 201, 0.17);
                    border: solid 1px #4a5169;
                    transform: rotateX(90deg) translateZ(32.5px);
                  }
                  &:last-child {
                    box-shadow: inset 0 2px 0 0 rgba(201, 253, 238, 0.47);
                    background-image: linear-gradient(to bottom, #07e9f1, #07f1b7);
                  }
                }
              }

              small {
                display: block;
                margin-top: 78px;
                font-size: 16px;
                line-height: 16px;
                letter-spacing: 0.4px;
                color: #acbae2;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
              &:hover {
                .d3-container {
                  transform: rotateX(0deg);
                }
                small {
                  color: #07f1b7;
                  font-weight: bold;
                }
              }

              &:first-child {
                margin-left: 2px;
              }
            }
          }
        }
        .right {
          width: calc(1240px - 651px);
          height: 570px;
          display: flex;
          justify-content: end;
          align-items: center;
          pointer-events: none;
          img {
            max-height: 570px;
          }
        }
        .fade-left-enter-active {
          transition: all .6s ease;
        }
        .fade-left-enter {
          transform: translateX(50px);
          opacity: 0;
        }

        .fade-right-enter-active {
          transition: all 1s ease;
        }
        .fade-right-enter {
          transform: translateX(-200px);
          opacity: 0;
        }
      }
    }
    .home_loading {
      height: 600px;
    }
  }
}
</style>
