<template>
  <div class="about-vir-active">
    <ul>
      <li v-for="(item, index) in activeList" :key="index">

        <h3 class="title"><span>{{item.title}}</span></h3>

        <img :src="item.img" alt="">

        <p class="desc">{{item.desc}}</p>

        <router-link :to="item.url" class="to-active">立即参加</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'aboutVirActive',
  data() {
    return {
      activeList: [
        {
          title: 'USDT三重好礼',
          url: '/active/usdtdeposit',
          img: require("../../assets/virtualCoiCourse/usdtdeposit.jpg"),
          desc: '全新注册会员首存送58%，全新注册会员续存送68%，全新注册会员三存送40%'
        },
        {
          title: '虚拟币存送再升级',
          url: '/active/goodluckupgrade',
          img: require("../../assets/virtualCoiCourse/goodluckupgrade.jpg"),
          desc: '在规定时间内首充并使用虚拟币进行存款，笔笔都送好运金，最高588元'
        },
        {
          title: 'V富通2.0',
          url: '/richpay',
          img: require("../../assets/virtualCoiCourse/richpay.jpg"),
          desc: '年利率加码翻倍最高32%  存取快  收益稳  转账红包天天领'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.about-vir-active {
  ul {
    li {
      width: 1262px;
      height: 720px;
      margin: 43px auto 0;
      background-image: url("../../assets/virtualCoiCourse/course_bg_big.png");
      overflow: hidden;

      .title {
        font-size: 28px;
        font-weight: bold;
        line-height: 87px;
        text-align: center;
        color: #fff;
        span {
          margin: 0 auto;
          position: relative;
          &:before, &:after {
            position: absolute;
            top: 7px;
            content: "";
            width: 36px;
            height: 26px;
            background-image: url("../../assets/virtualCoiCourse/icon.png");
          }
          &:before {
            left: -46px;
            background-position: -2px -160px;
          }
          &:after {
            right: -46px;
            background-position: -40px -160px;
          }
        }
      }

      img {
        display: block;
        margin: 0 auto;
      }

      .desc {
        font-size: 24px;
        height: 24px;
        margin-top: 28px;
        line-height: 24px;
        text-align: center;
        color: #fff;
      }

      .to-active {
        display: block;
        margin: 12px auto 0;
        width: 326px;
        height: 94px;
        background-image: url("../../assets/virtualCoiCourse/selector_btn_bg.png");
        font-size: 28px;
        line-height: 82px;
        font-weight: bold;
        text-align: center;
        color: #fff;
        &:hover {
          color: #001fd3;
          background-image: url("../../assets/virtualCoiCourse/selector_btn_bg_active.png");
        }
      }
    }
  }
}
</style>
