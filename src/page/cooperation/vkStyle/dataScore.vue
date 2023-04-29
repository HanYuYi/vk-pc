<template>
  <div class="data-score">
    <div class="score-center" :class="{'load-finish': pageIndex === 5}">
      <ul class="left">
        <li v-for="(item, index) in dataScoreList"
            :key="index"
            :style="{
              width: `${item.width}rem`,
              backgroundImage: `url(${item.img})`,
              transform: `translateX(${pageIndex === 5 ? `${item.left}rem` : '-300px'})`,
              transitionDelay: `${pageIndex === 5 ? index  * 0.2 : 0}s`}">

        </li>
      </ul>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dataScore',
  props: ["pageIndex"],
  data() {
    return {
      dataScoreList: [
        { width:  2.553, img: require("../../../assets/vkStyle/data_score_1.png"), left: 0},
        { width:  2.126, img: require("../../../assets/vkStyle/data_score_2.png"), left: 0.484},
        { width:  2.095, img: require("../../../assets/vkStyle/data_score_3.png"), left: 1.116},
        { width:  2.237, img: require("../../../assets/vkStyle/data_score_4.png"), left: 1.57},
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.data-score {
  width: 100%;
  height: 100%;
  background: url("../../../assets/vkStyle/data_score_bg.jpg") no-repeat;
  background-position: center center;
  overflow: hidden;
  .score-center {
    width: 7.366rem;
    margin: calc(246px + 0.182rem) auto 0;
    white-space: nowrap;
    .left {
      display: inline-block;
      width: 3.767rem;
      margin-left: 0.222rem;
      li {
        height: 0.373rem;
        background-size: 100% 100%;
        margin-top: 0.191rem;
        opacity: 0;

        &:first-child {
          margin-top: 0.315rem;
        }
      }
    }
    .right {
      display: inline-block;
      width: 4.443rem;
      height: 2.535rem;
      margin-left: -0.289rem;
      background: url("../../../assets/vkStyle/data-score_show.png") no-repeat;
      background-position: 20px top;
      background-size: 100% 100%;
      vertical-align: top;
      opacity: 0;
      transform: translateX(300px);
    }
    &.load-finish {
      .left {
        li {
          opacity: 1;
          transform: translate(0px);
          transition-property: opacity, transform;
          transition-duration: 0.3s, 0.3s;
        }
      }
      .right {
        opacity: 1;
        transform: translate(0px);
        transition-property: opacity, transform;
        transition-duration: 0.3s, 0.3s;
        transition-delay: 1.2s;
      }
    }
  }
}
</style>
