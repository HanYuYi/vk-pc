<template>
  <div class="brand-history">
    <div class="history-step"  :class="{'load-finish': pageIndex === 2}">
      <ul>
        <li v-for="(item, index) in stepNodeList" :key="index" class="node">
          <div class="details">
            <h3>{{ item.dateTime }}</h3>
            <i></i>
            <span class="logo" :style="{width: `${item.logoWith}px`, backgroundPosition: item.logoPos}"></span>
            <p v-html="item.desc"></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'brandHistory',
  props: ["pageIndex"],
  data() {
    return {
      stepNodeList: [
        {dateTime: "2016年05月", logoWith: 70, logoPos: "-223px -182px", desc: "VKGAME集团成立"},
        {dateTime: "2016年12月", logoWith: 74, logoPos: "-372px -180px", desc: "威客电竞中文平台上线"},
        {dateTime: "2017年09月", logoWith: 77, logoPos: "-522px -195px", desc: "全球用户突破百万"},
        {dateTime: "2018年08月", logoWith: 68, logoPos: "-223px -255px", desc: "赞助北美OpTic战队<br>双方达成长期合作"},
        {dateTime: "2019年10月", logoWith: 67, logoPos: "-376px -262px", desc: "赞助东南亚Mineski战队<br>双方达成长期合作"},
        {dateTime: "2019年10月", logoWith: 80, logoPos: "-519px -257px", desc: "承办赛事:威客黎明之战<br>VKGAME BATTLE OF DAWN"},
        {dateTime: "2020年01月", logoWith: 64, logoPos: "-226px -361px", desc: "VKGAME启动<br>新冠疫情公益项目"},
        {dateTime: "2020年10月", logoWith: 64, logoPos: "-377px -355px", desc: "赞助东南亚TNC战队<br>双方达成长期合作"},
        {dateTime: "2021年04月", logoWith: 62, logoPos: "-528px -360px", desc: "VKGAME集团<br>收购U赢集团"}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.brand-history {
  width: 100%;
  height: 100%;
  background: url("../../../assets/vkStyle/brand_history_bg.jpg") no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  overflow: hidden;
  .history-step {
    margin-top: calc(244px + 0.357rem);
    width: 6.227rem;
    height: 2.252rem;
    ul {
      width: 5.676rem;
      margin: 0 auto;
      height: inherit;
      position: relative;
      opacity: 0;
      transform: translateX(-1400px);
      &:before {
        position: absolute;
        content: "";
        width: calc(100% - 0.466rem);
        height: 0.026rem;
        left: 0.266rem;
        top: calc((100% - 0.068rem) / 2);
        background-color: #ffffff;
      }
      .node {
        display: inline-block;
        margin-top: calc((2.157rem - 0.16rem) / 2);
        width: 0.213rem;
        height: 0.213rem;
        background: url("../../../assets/vkStyle/node_li.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 0.442rem;
        position: relative;
        &:last-child {
          margin-right: 0;
        }
        .details {
          opacity: 0;
          position: absolute;
          width: 0.542rem;
          left: -0.164rem;
          border-top: 0.1px solid transparent;
          h3 {
            box-sizing: border-box;
            border-left: 2px solid #ffffff;
            border-right: 2px solid #ffffff;
            font-size: 0.08rem;
            line-height: 0.16rem;
            text-align: center;
            color: #ffffff;
          }
          i {
            display: block;
            width: 10px;
            height: 28px;
            background: url("../../../assets/vkStyle/icon.png") no-repeat;
          }
          .logo {
            display: block;
            background: url("../../../assets/vkStyle/icon.png") no-repeat;
          }
          p {
            width: 1.11rem;
            margin-left: -0.284rem;
            font-size: 0.08rem;
            line-height: 0.097rem;
            text-align: center;
            color: #ffffff;
          }
        }
        &:nth-child(odd) {
          .details {
            top: 46px;
            transform: translateY(520px);
            i {
              margin: 10px auto 0;
              background-position: -415px -108px;
            }
            .logo {
              height: 64px;
              margin: 15px auto 0;
            }
            p {
              margin-top: 10px;
            }
          }
        }
        &:nth-child(even) {
          .details {
            display: flex;
            flex-direction: column-reverse;
            bottom: 46px;
            transform: translateY(-520px);
            i {
              margin: 0 auto 10px;
              background-position: -344px -108px;
            }
            .logo {
              height: 74px;
              margin: 0 auto 15px;
            }
            p {
              margin-bottom: 10px;
            }
          }
        }
      }
    }
    &.load-finish {
      ul {
        opacity: 1;
        transform: translateX(0px);
        transition: opacity 1s, transform 0.8s;
        .node {
          .details {
            opacity: 1;
            transition: opacity 2s, transform 0.8s;
            transition-delay: 0.9s;
          }
          &:nth-child(odd) {
            .details {
              transform: translateY(0px);
            }
          }
          &:nth-child(even) {
            .details {
              transform: translateY(0px);
            }
          }
        }
      }
    }
  }
}
</style>
