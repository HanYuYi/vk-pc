<template>
  <div class="speed_test_pop">
    <div class="title_box">
      <h3>域名测速</h3>
      <span class="notes">Speed Detection</span>
    </div>

    <ul class="test_list">
      <li class="list_item"
      v-for="(item, index) in sortedTestSitesList"
      :key="item.id"
      @click="jumpto(item.url)">
        <div class="progress_box">
          <span class="line_name">{{item.name + (index + 1)}}<small v-if="index === 0">推荐</small></span>

          <div class="line_time" :class="[getSpeedStatus(item.result)]">
            <template v-if="item.loaded">
              <i class="progress"/>

              <span class="delay_text"
                    :class="{loaded: item.loaded}">
              {{ item.result > 600 ? '600ms' : item.result + 'ms' }}
              </span>
            </template>
            <span v-else class="loading">测速中...</span>
          </div>
        </div>
      </li>
    </ul>

    <div class="link_group">
      <a class="test_link" :href="links.speed_main" target="_blank">官方测速站</a>
      <a class="test_link" :href="links.speed_bak" target="_blank">备用测速站</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      maxTestTimes: 2,
      sitesCache: {},
      testSitesList: [
        {
          url: "https://www.vkgame.info",
          imgUrl: "",
          name: "官方线路",
          id: "1",
          times: 0,
          delay: "",
          time: 0,
          speed: "slow",
          result: 0,
          loaded: false
        },
        {
          url: "https://www.vkgame.cc",
          imgUrl: "",
          id: "2",
          name: "官方线路",
          times: 0,
          delay: "",
          time: 0,
          speed: "slow",
          result: 0,
          loaded: false
        },
        {
          url: "https://www.vkgame.biz",
          imgUrl: "",
          id: "3",
          name: "官方线路",
          times: 0,
          delay: "",
          time: 0,
          speed: "slow",
          result: 0,
          loaded: false
        },
        {
          url: "https://www.vkgame188.com",
          imgUrl: "",
          id: "4",
          name: "官方线路",
          times: 0,
          delay: "",
          time: 0,
          speed: "slow",
          result: 0,
          loaded: false
        }
      ],
      testFlag: false,
      load:false,
      links:{}
    };
  },
  props: {
    visible: Boolean
  },
  watch: {
    visible(nv) {
      if (nv && !this.testFlag) {
        this.startTest();
        this.testFlag = true;
      }
    }
  },
  mounted() {
    this.getInit()
  },
  computed: {
    sortedTestSitesList() {
      const data = [].concat(this.testSitesList).sort((a, b) => {
        return +a.result - +b.result;
      });
      return data;
    }
  },
  methods: {
    getInit() {
      this.load = true
      this.$http(this.ApiSetting.getSpeedLink)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
           this.testSitesList[0].url = res.data.link_1
           this.testSitesList[1].url = res.data.link_2
           this.testSitesList[2].url = res.data.link_3
           this.testSitesList[3].url = res.data.link_4
           this.links = res.data
        }
      })
      .catch(res=>{
        this.load = false
      })
    },
    jumpto(url) {
      window.open(url, "_blank");
    },
    getSpeedPercentage(result) {
      if (!result) {
        return 0;
      }
      if (+result > 600) {
        return 10;
      }
      if (+result < 300) {
        return (
          (66 + parseInt(parseInt(((300 - result) / 300) * 100) / 3)) * 0.8
        );
      }
      return (33 + parseInt(parseInt(((600 - result) / 300) * 100) / 3)) * 0.8;
    },
    getSpeedStatus(delay) {
      if (!delay) {
        return "slow";
      }
      if (+delay > 600) {
        return "slow";
      }
      if (+delay > 300) {
        return "mid";
      }
      return "fast";
    },
    startTest() {
      this.testSitesList.forEach(item => {
        this.mockRequest(item);
        item.times = 1;
      });
    },
    mockRequest(item) {
      const img = new Image();
      item.time = new Date().getTime();
      img.src = item.url + "/testimg.jpg?t=" + Math.random();
      img.onerror = () => {
        this.autoTest(item.id);
      };
      this.$forceUpdate();
    },
    autoTest(id) {
      const item = this.testSitesList.find(item => item.id == id);
      let times = item.times;
      let _delay = item.delay;
      let ping = new Date().getTime() - item.time;
      if (_delay) {
        ping = _delay + "," + ping;
      }
      item.delay = ping;
      item.imgUrl = "";
      if (times <= this.maxTestTimes) {
        this.mockRequest(item);
        item.times++;
      } else {
        let resultPing = 0;
        let delayArr = item.delay.split(",");
        delayArr.forEach(item => {
          resultPing += parseFloat(item);
        });
        resultPing = Math.round(resultPing / delayArr.length); // 取平均值
        if (resultPing > 600) {
          resultPing = 601;
        }
        item.result = resultPing;
        item.loaded = true;
        this.$forceUpdate();
      }
    }
  }
};
</script>
<style lang="less">
.speed_test_pop {
  color: #7c839f;
  .title_box {
    padding: 16px 14px 0;
    h3 {
      font-size: 16px;
      line-height: 16px;
      font-weight: normal;
      color: #ffffff;
    }
    .notes {
      display: block;
      font-weight: normal;
      font-size: 14px;
      line-height: 14px;
      color: #acbae2;
      margin-top: 9px;
    }
  }
  .test_list {
    margin-top: 18px;
    li {
      cursor: pointer;
      box-sizing: border-box;
      padding: 0 13px;
      height: 50px;
      line-height: 50px;
      color: #ffffff;
      position: relative;
      &:after {
        position: absolute;
        content: "";
        width: 100%;
        height: 1px;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(to right, #555f77, #313746);
      }
      &:first-child, &:hover {
        background-image: linear-gradient(to right, rgba(7,240,186,0.2), rgba(49,55,70,0.2));
        &:after {
          display: none;
        }
      }
      &:first-child {
        &:after {
          display: none;
        }
      }
      .progress_box {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        .line_name {
          small {
            margin-left: 6px;
            display: inline-block;
            width: 39px;
            height: 20px;
            font-size: 13px;
            line-height: 20px;
            text-align: center;
            color: #07f1b7;
            border-radius: 4px;
            border: solid 1px #07f1b7;
          }
        }
        .line_time {
          width: 65px;
          display: flex;
          justify-content: space-between;
          .progress {
            display: inline-block;
            width: 14px;
            height: 10px;
            margin-right: 2px;
            margin-top: 20px;
          }
          &.slow {
            .delay_text {
              color: #f9315b;
            }
            .progress {
              background-image: url("../assets/home/speed_test_slow.png");
            }
          }
          &.mid {
            .delay_text {
              color: #ef9600;
            }
            .progress {
              background-image: url("../assets/home/speed_test_mid.png");
            }
          }
          &.fast {
            .delay_text {
              color: #07f1b7;
            }
            .progress {
              background-image: url("../assets/home/speed_test_fast.png");
            }
          }
        }
        .loading {
          font-size: 14px;
          color: #acbae2;
        }
        .delay_text {
          font-family: Roboto;
          font-size: 14px;
        }
      }
    }
  }

  .link_group {
    display: flex;
    .test_link {
      display: block;
      width: 50%;
      text-align: center;
      line-height: 50px;
      font-size: 14px;
      color: #acbae2;
      &:hover {
        color: #07f1b7;
      }
    }
  }
}
</style>
