<template>
  <div class="knockout">

    <dl>
      <dt class="knockout-title"></dt>

      <dd class="knockout-content">
        <transition name="fade-left">
          <div v-if="!loading" class="left tree">
          <!-- 1/8决赛-->
          <ul v-if="matchList.g8" class="final-8-1">
            <li v-for="(team, index) in listBisection(matchList.g8)[0]" :key="index">
              <div class="a">
                <small>{{ matchCode[index][0] }}</small>
                <h5 v-if="team.name_a !== '?'">{{ team.name_a }}</h5>
                <img v-if="team.name_a === '?'" src="../../../../../assets/active/worldCup2022/flag_unknown.png" alt="">
                <img v-else :src="team.flag_a" alt="">
              </div>
              <div class="b">
                <small>{{ matchCode[index][1] }}</small>
                <img v-if="team.name_b === '?'" src="../../../../../assets/active/worldCup2022/flag_unknown.png" alt="">
                <img v-else :src="team.flag_b" alt="">
                <h5 v-if="team.name_b !== '?'">{{ team.name_b }}</h5>
              </div>
              <div class="info">
                <p>1/8决赛</p>
                <p>{{ team.match_date | dateStrToFilter }} {{ team.match_time }}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="line">
                <polyline points="63,26.5 163,26.5 163,142 63,142"
                      style="fill:none;stroke:#fdcb8e;stroke-width:2;"/>
              </svg>
            </li>
          </ul>
          <!-- 1/4决赛-->
          <ul v-if="matchList.g4" class="final-4-1">
            <li v-for="(team, index) in listBisection(matchList.g4)[0]" :key="index">
              <div class="a">
                <h5 v-if="team.name_a !== '?'">{{ team.name_a }}</h5>
                <img v-if="team.name_a === '?'" src="../../../../../assets/active/worldCup2022/flag_unknown.png" alt="">
                <img v-else :src="team.flag_a" alt="">
              </div>
              <div class="b">
                <img v-if="team.name_b === '?'" src="../../../../../assets/active/worldCup2022/flag_unknown.png" alt="">
                <img v-else :src="team.flag_b" alt="">
                <h5 v-if="team.name_b !== '?'">{{ team.name_b }}</h5>
              </div>
              <div class="info">
                <p>1/4决赛</p>
                <p>{{ team.match_date }} {{ team.match_time }}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="line" height="306">
                <polyline points="0,26.5 140,26.5 140,281 0,281"
                          style="fill:none;stroke:#fdcb8e;stroke-width:2;"/>
              </svg>
            </li>
          </ul>
          <!-- 1/2决赛-->
          <ul v-if="matchList.g2" class="final-2-1">
            <li v-for="(team, index) in listBisection(matchList.g2)[0]" :key="index">
              <div class="a">
                <h5 v-if="team.name_a !== '?'">{{ team.name_a }}</h5>
                <img v-if="team.name_a === '?'" src="../../../../../assets/active/worldCup2022/flag_unknown.png" alt="">
                <img v-else :src="team.flag_a" alt="">
              </div>
              <div class="b">
                <img v-if="team.name_b === '?'" src="../../../../../assets/active/worldCup2022/flag_unknown.png" alt="">
                <img v-else :src="team.flag_b" alt="">
                <h5 v-if="team.name_b !== '?'">{{ team.name_b }}</h5>
              </div>
              <div class="info">
                <p>半决赛</p>
                <p>{{ team.match_date }} {{ team.match_time }}</p>
              </div>
              <template v-if="matchList.g1 && matchList.g1[0].name_a === '?'">
                <div class="c">
                  <img src="../../../../../assets/active/worldCup2022/flag_unknown.png" alt="">
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="line" height="559">
                  <polyline points="0,26.5 140,26.5 140,534 0,534"
                            style="fill:none;stroke:#fdcb8e;stroke-width:2;"/>
                </svg>
              </template>
              <template v-else>
                <div v-if="matchList.g1" class="c">
                  <img :src="matchList.g1[0].flag_a" alt="">
                  <h5>{{ matchList.g1[0].name_a }}</h5>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="line line1" height="559">
                  <polyline points="0,26.5 140,26.5 140,255"
                            style="fill:none;stroke:#fdcb8e;stroke-width:2;"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="line line2" height="559">
                  <polyline points="140,339.5 140,534 0,534"
                            style="fill:none;stroke:#fdcb8e;stroke-width:2;"/>
                </svg>
              </template>
            </li>
          </ul>
        </div>
        </transition>

        <div v-if="!loading && matchList.g1 && matchList.g3" class="center">
          <div class="trophy">
            <img src="../../../../../assets/active/worldCup2022/kpockout_trophy_flash.png" alt="" class="light">
            <img v-if="matchList.g0" :src="matchList.g0" alt="" class="champion">
          </div>
          <div class="finals">{{ matchList.g1[0].match_date }} {{ matchList.g1[0].match_time }}</div>
          <h2 class="finals-name">决赛</h2>
          <div class="three-or-four-finals">{{ matchList.g3[0].match_date }} {{ matchList.g3[0].match_time }}</div>
          <h2 class="three-or-four-finals-name">三四名决赛</h2>

          <div v-if="matchList.g3" class="three-or-four-finals-country">
            <div v-if="matchList.g00" class="three center-pos">
              <img :src="matchList.g00" alt="">
            </div>
            <template v-else>
              <div class="three">
                <img v-if="matchList.g3[0].name_a !== '?'" :src="matchList.g3[0].flag_a" alt="">
                <img v-else src="../../../../../assets/active/worldCup2022/flag_unknown.png" alt="">
                <small v-if="matchList.g3[0].name_a !== '?'">{{ matchList.g3[0].name_a }}</small>
              </div>
              <div class="four">
                <img v-if="matchList.g3[0].name_b !== '?'" :src="matchList.g3[0].flag_b" alt="">
                <img v-else src="../../../../../assets/active/worldCup2022/flag_unknown.png" alt="">
                <small v-if="matchList.g3[0].name_b !== '?'">{{matchList.g3[0].name_b}}</small>
              </div>
            </template>
          </div>

          <img src="../../../../../assets/active/worldCup2022/knockout_logo.png" alt="" class="logo">

        </div>
        <div v-else class="world-cup2022-loading"></div>

        <transition name="fade-right">
          <div v-if="!loading" class="right tree">
          <!-- 1/2决赛-->
          <ul v-if="matchList.g2" class="final-2-1">
            <li v-for="(team, index) in listBisection(matchList.g2)[1]" :key="index">
              <div class="a">
                <h5 v-if="team.name_a !== '?'">{{ team.name_a }}</h5>
                <img v-if="team.name_a === '?'" src="../../../../../assets/active/worldCup2022/flag_unknown.png" alt="">
                <img v-else :src="team.flag_a" alt="">
              </div>
              <div class="b">
                <img v-if="team.name_b === '?'" src="../../../../../assets/active/worldCup2022/flag_unknown.png" alt="">
                <img v-else :src="team.flag_b" alt="">
                <h5 v-if="team.name_b !== '?'">{{ team.name_b }}</h5>
              </div>
              <div class="info">
                <p>半决赛</p>
                <p>{{ team.match_date }} {{ team.match_time }}</p>
              </div>
              <template v-if="matchList.g1[0].name_b === '?'">
                <div class="c">
                  <img src="../../../../../assets/active/worldCup2022/flag_unknown.png" alt="">
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="line" height="559">
                  <polyline points="0,26.5 140,26.5 140,534 0,534"
                            style="fill:none;stroke:#fdcb8e;stroke-width:2;"/>
                </svg>
              </template>
              <template v-else>
                <div class="c">
                  <img :src="matchList.g1[0].flag_b" alt="">
                  <h5>{{ matchList.g1[0].name_b }}</h5>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="line line1" height="559">
                  <polyline points="0,26.5 140,26.5 140,255"
                            style="fill:none;stroke:#fdcb8e;stroke-width:2;"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="line line2" height="559">
                  <polyline points="140,339.5 140,534 0,534"
                            style="fill:none;stroke:#fdcb8e;stroke-width:2;"/>
                </svg>
              </template>
            </li>
          </ul>
          <!-- 1/4决赛-->
          <ul v-if="matchList.g4" class="final-4-1">
            <li v-for="(team, index) in listBisection(matchList.g4)[1]" :key="index">
              <div class="a">
                <h5 v-if="team.name_a !== '?'">{{ team.name_a }}</h5>
                <img v-if="team.name_a === '?'" src="../../../../../assets/active/worldCup2022/flag_unknown.png" alt="">
                <img v-else :src="team.flag_a" alt="">
              </div>
              <div class="b">
                <img v-if="team.name_b === '?'" src="../../../../../assets/active/worldCup2022/flag_unknown.png" alt="">
                <img v-else :src="team.flag_b" alt="">
                <h5 v-if="team.name_b !== '?'">{{ team.name_b }}</h5>
              </div>
              <div class="info">
                <p>1/4决赛</p>
                <p>{{ team.match_date }} {{ team.match_time }}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="line" height="306">
                <polyline points="0,26.5 140,26.5 140,281 0,281"
                          style="fill:none;stroke:#fdcb8e;stroke-width:2;"/>
              </svg>
            </li>
          </ul>
          <!-- 1/8决赛-->
          <ul v-if="matchList.g8" class="final-8-1">
            <li v-for="(team, index) in listBisection(matchList.g8)[1]" :key="index">
              <div class="a">
                <small>{{ matchCode[index + 4][0] }}</small>
                <h5 v-if="team.name_a !== '?'">{{ team.name_a }}</h5>
                <img v-if="team.name_a === '?'" src="../../../../../assets/active/worldCup2022/flag_unknown.png" alt="">
                <img v-else :src="team.flag_a" alt="">
              </div>
              <div class="b">
                <small>{{ matchCode[index + 4][1] }}</small>
                <img v-if="team.name_b === '?'" src="../../../../../assets/active/worldCup2022/flag_unknown.png" alt="">
                <img v-else :src="team.flag_b" alt="">
                <h5 v-if="team.name_b !== '?'">{{ team.name_b }}</h5>
              </div>
              <div class="info">
                <p>1/8决赛</p>
                <p>{{ team.match_date | dateStrToFilter }} {{ team.match_time }}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="line">
                <polyline points="63,26.5 163,26.5 163,142 63,142"
                          style="fill:none;stroke:#fdcb8e;stroke-width:2;"/>
              </svg>
            </li>
          </ul>
        </div>
        </transition>
      </dd>
    </dl>

  </div>
</template>

<script>

export default {
  name: 'knockout',
  data() {
    return {
      matchCode: [
        ["A1", "B2"],
        ["C1", "D2"],
        ["E1", "F2"],
        ["G1", "H2"],
        ["B1", "A2"],
        ["D1", "C2"],
        ["F1", "E2"],
        ["H1", "G2"],
      ],
      matchList: {},
      loading: false
    }
  },
  filters: {
    // 过滤mm月dd日为 => mm-dd
    dateStrToFilter (str) {
      const filterStr = str.replace(/月|日/g, "-").split("-")
      return `${filterStr[0]}-${filterStr[1]}`
    }
  },
  mounted () {
    this.getMatchData()
  },
  methods: {
    // 获取淘汰赛信息
    async getMatchData () {
      this.loading = true
      const res = await this.$http(this.ApiSetting.active.worldCup2022.worldCupSchedule, {
        type: 2
      })
      console.info("初始化2022世界杯赛事进程淘汰赛信息", res)

      if (res.status === 1 && res.data) {
        this.matchList = res.data.data
      }
      this.loading = false
    },

    // 等分数组
    listBisection(list) {
      if (!list.length) return []
      const cloneList = [...list]
      const middleIndex = Math.ceil(cloneList.length / 2)
      return [cloneList.splice(0, middleIndex), cloneList.splice(-middleIndex)]
    }
  }
}
</script>

<style lang="less" scoped>
.knockout {
  margin-top: -14px;

  .knockout-title {
    height: 111px;
    background: url("../../../../../assets/active/worldCup2022/knockout_title.png") no-repeat center top;
  }

  .knockout-content {
    min-height: 300px;
    display: flex;
    .tree {
      width: 506px;
      display: flex;
      ul {
        li {
          position: relative;
          margin-top: 87px;
          small {
            position: absolute;
            top: 20px;
            left: -32px;
            font-family: Roboto;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
          }
          h5 {
            left: -43.5px;
            width: 150px;
            position: absolute;
            font-size: 16px;
            text-align: center;
            color: #f9ce8a;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .a, .b {
            position: relative;
            img {
              width: 63px;
              height: 53px;
            }
          }
          .a {
            h5 {
              top: -26px;
            }
          }
          .b {
            margin-top: 61px;
            h5 {
              bottom: -26px;
            }
          }
          .info {
            width: 100px;
            height: 33px;
            display: flex;
            flex-wrap: wrap;
            align-content: space-between;
            position: absolute;
            top: 67px;
            left: 52px;
            font-family: vkFont;
            p {
              width: inherit;
              text-align: right;
              font-size: 16px;
              color: #fff8cc;
            }
          }
          .line {
            position: absolute;
            top: 0;
          }
          &:first-child {
            margin-top: 39px;
          }
        }
        &.final-8-1 {
          width: 163px;
        }
        &.final-4-1 {
          width: 140px;
          li {
            margin-top: 199px;
            .a, .b {
              z-index: 3;
              margin-left: 38px;
            }
            .b {
              margin-top: 200px;
            }
            .info {
              width: 135px;
              top: 120.5px;
              left: -6px;
            }
            .line {
              z-index: 2;
            }
            &:first-child {
              margin-top: 98px;
            }
          }
        }
        &.final-2-1 {
          width: 171px;
          margin-top: 170px;
          .a, .b {
            z-index: 3;
            margin-left: 38px;
          }
          .b {
            margin-top: 453px;
          }
          .c {
            position: absolute;
            z-index: 3;
            top: 253px;
            left: 108px;
            img {
              width: 63px;
              height: 53px;
            }
          }
          .info {
            width: 160px;
            top: 257px;
            left: -61px;
            p {
              font-size: 20px;
            }
          }
          .line {
            z-index: 2;
          }
        }
      }
      &.left {
        padding-left: 32px;
      }
      &.right {
        text-align: right;
        margin-left: -8px;
        ul {
          li {
            .a, .b {
              small {
                left: auto;
                right: -32px;
              }
              h5 {
                left: auto;
                right: -43.5px;
              }
            }
            .info {
              left: 10px;
              p {
                text-align: left;
              }
            }
            .line {
              right: 0;
              transform: rotateY(180deg);
            }
          }
          &.final-2-1 {
            li {
              .info {
                left: auto;
                right: -61px;
              }
            }
          }
          &.final-4-1 {
            li {
              .a, .b {
                margin-left: 0;
                text-align: center;
                h5 {
                  right: -5px;
                }
              }
              .a {
                h5 {
                  right: -5px;
                }
              }
            }
          }
          &.final-2-1 {
            li {
              .a, .b {
                text-align: center;
                h5 {
                  right: -5px;
                }
              }
              .c {
                left: 0;
              }
            }
          }
        }
      }
    }
    .center {
      text-align: center;
      margin-left: -34px;
      .trophy {
        display: block;
        height: 288px;
        background: url("../../../../../assets/active/worldCup2022/kpockout_trophy.png") no-repeat center bottom;
        border-top: 0.1px solid transparent;
        position: relative;
        .light {
          display: block;
          margin-top: 20px;
          mix-blend-mode: screen;
        }
        .champion {
          position: absolute;
          left: 85.5px;
          bottom: -6px;
          width: 63px;
          height: 53px;
        }
      }
      .finals {
        margin: 13px auto 0;
        padding: 21px 45px 0;
        width: 94px;
        height: 68px;
        background: url("../../../../../assets/active/worldCup2022/final_date_top.png") no-repeat;
        font-size: 22px;
        color: #f9ce8a;
        font-family: vkFont;
        line-height: 26px;
      }
      .finals-name {
        margin-top: 7px;
        font-size: 34px;
        font-weight: normal;
        color: #fff;
        font-family: vkFont;
      }
      .three-or-four-finals {
        margin: 57px auto 0;
        padding: 26px 40px 0;
        width: 88px;
        height: 74px;
        background: url("../../../../../assets/active/worldCup2022/final_date_bottom.png") no-repeat;
        font-size: 22px;
        color: #dc9494;
        font-family: vkFont;
        line-height: 26px;
      }
      .three-or-four-finals-name {
        margin-top: 15px;
        font-size: 26px;
        font-weight: normal;
        color: #dc9494;
        font-family: vkFont;
      }

      .three-or-four-finals-country {
        margin: 12px auto 0;
        width: 162px;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        font-weight: 600;
        color: #f9ce8a;
        .three, .four {
          img {
            width: 63px;
            height: 53px;
            display: block;
          }
          small {
            font-size: 16px;
            font-weight: bold;
          }
          &.center-pos {
            margin: 0 auto;
          }
        }
      }

      .logo {
        margin-top: 46px;
      }
    }

    .fade-left-enter-active, .fade-right-enter-active {
      transition: all .8s ease;
    }
    .fade-left-enter {
      transform: translateX(100px);
      opacity: 0;
    }
    .fade-right-enter {
      transform: translateX(-100px);
      opacity: 0;
    }
  }
}
</style>
