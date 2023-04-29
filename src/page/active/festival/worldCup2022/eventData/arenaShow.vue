<template>
  <div class="arena-show">
    <div v-for="(item, index) in arenaList" :key="index" class="arena-item">
      <div class="img-box">
        <img :src="item.img" alt="">
      </div>
      <div class="txt-box">
        <h1>0{{ index + 1 }}</h1>
        <h2>{{ item.title }}</h2>
        <ul v-if="item.certainMatch" class="certain">
          <li v-for="(certainName, certainIndex) in item.certainMatch" :key="certainIndex">{{ certainName }}</li>
        </ul>
        <ul class="info">
          <li v-for="(infoItem, infoIndex) in item.info" :key="infoIndex" :class="`info-${infoIndex}`">
            <i></i>{{ arenaInfoList[infoIndex] }}{{ infoItem }}
          </li>
        </ul>
        <ul class="desc">
          <li v-for="(descItem, descIndex) in item.desc" :key="descIndex" v-html="descItem"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'arenaShow',
  data() {
    return {
      arenaInfoList: ["地点：","容量：","造价："],
      arenaList: [
        {
          title: "卢塞尔体育场",
          certainMatch: ["决赛", "揭幕战", "闭幕式"],
          info: ["卢赛尔新城", 80000, "5.7亿美元"],
          desc: [
            "历史：这座宏伟体育场所在的地区文明兴起很早，期间在阿拉伯和伊斯兰世界发现的碗、器皿和其他艺术品上的复杂装饰图案很多都在此起源。",
            "理念：该场馆借鉴了阿拉伯建筑，以伊斯兰椰枣碗和珐琅灯笼为灵感，呈现出极具中东风格的金色碗状器皿造型。",
            "未来：卡塔尔2022年世界杯足球赛结束后，卢赛尔体育场将变成一个社区空间，包括学校、商店、咖啡馆、体育设施和健康诊所。这个多功能社区中心将允许人们在一个屋顶下找到他们需要的一切——足球场的原始屋顶。"
          ],
          img: require("../../../../../assets/active/worldCup2022/arena_1.jpg")
        },
        {
          title: "阿尔贾努布体育场",
          certainMatch: ["1/8决赛"],
          info: ["沃克拉", 40000, "5.7亿美元"],
          desc: [
            "历史：作为卡塔尔最古老的连续有人居住的地区之一，阿尔贾努布长期以来一直是采珠和捕鱼的中心。",
            "理念：这些活动中使用的传统单桅帆船启发了阿尔贾努布体育场的设计。在开幕式上，一场令人惊叹的赛前表演向阿尔贾努布的传统和扎哈·哈迪德致敬，扎哈·哈迪德的公司设计了体育场大胆的未来主义造型。",
            "未来：在2022年卡塔尔世界杯之后，阿尔贾努布体育场体育场将成为卡塔尔南部体育和娱乐的新主场。它的容量将减少到20,000，以保证气氛。其余20,000个席位将捐赠给海外足球发展项目，再次展示了它的创新精神和与遥远土地联系的能力。"
          ],
          img: require("../../../../../assets/active/worldCup2022/arena_2.jpg")
        },
        {
          title: "艾哈迈德·本·阿里体育场",
          info: ["瑞扬", 40740],
          desc: [
            "历史：艾哈迈德·本·阿里体育场所在位置是以其对传统和当地文化的热爱以及非常受欢迎的足球队赖扬体育俱乐部而闻名。这里紧密联系的社区对球队有着坚定的承诺。",
            "理念：体育场的设计灵感来自沙丘和伊斯兰建筑，场馆外侧满是发光和变色的多媒体屏幕。这些屏幕上目前罩着一层金属膜，上面描绘着卡塔尔建筑中常见的图案和花纹。体育场区域的每个部分的设计都考虑到了可持续性。",
            "未来：2022年卡塔尔国际足联世界杯结束后，该体育场40,000个模块化座位中的近一半将被拆除，并用于国外的足球发展项目。"
          ],
          img: require("../../../../../assets/active/worldCup2022/arena_3.jpg")
        },
        {
          title: "哈里利法国际体育场",
          info: ["多哈", 68030],
          desc: [
            "历史：哈利法国际体育场于1976年建成，长期以来一直是该国体育传统的基石，也是其充满希望的未来的守门人。这座拥有40,000个座位的竞技场已经拥有辉煌的主办历史，此前曾举办过亚运会、阿拉伯海湾杯和亚足联亚洲杯等赛事。",
            "理念：该体育场位于2022年所有场馆的中心，将在本次比赛中发挥举足轻重的作用，采用巨大的弧形结构。为本届世界杯，体育场进行了翻新、重修、扩容，增加了1.2 万个座位。",
            "未来：在2022年卡塔尔国际足联世界杯结束后，该体育场将继续保留，继续作为阿拉伯的体育中心。"
          ],
          img: require("../../../../../assets/active/worldCup2022/arena_4.jpg")
        },
        {
          title: "阿尔图马马体育场",
          certainMatch: ["1/4决赛"],
          info: ["苏马迈", 40000],
          desc: [
            "历史：该体育场所在的位置靠近所有卡塔尔人的中心，是一个沉浸在当地文化中的体育场。",
            "理念：阿尔图马马体育场充满活力与想象力，为了与卡塔尔所有新的 FIFA 2022世界杯场馆保持一致，这个竞技场的设计理念是在庆祝阿拉伯文化和传统，就像比赛本身一样。",
            "未来：在2022年卡塔尔国际足联世界杯结束后，体育场的容量将减少以满足当地需求并为发展中国家提供优质的体育基础设施，将减少20000个场内座位，剩余的20,000个座位将用于足球和其他体育赛事。"
          ],
          img: require("../../../../../assets/active/worldCup2022/arena_5.jpg")
        },
        {
          title: "阿尔贝特体育场",
          certainMatch: ["1/4决赛"],
          info: ["豪尔", 60000],
          desc: [
            "历史：该体育场所在位置是卡塔尔和海湾地区游牧民族历史上生活过的地方。",
            "理念：致敬曾经的游牧民族，所以体育场被一个巨大的帐篷结构覆盖，该体育场将举办2022年FIFA世界杯的首场比赛和半决赛的比赛。",
            "未来：在2022年卡塔尔国际足联世界杯结束后，竞技场将以非凡的方式接触到全球更多的人。上层模块化设计座椅将在2022年FIFA世界杯之后拆除，并提供给需要体育基础设施的发展中国家，这是对卡塔尔慷慨精神的持久提醒。"
          ],
          img: require("../../../../../assets/active/worldCup2022/arena_6.jpg")
        },
        {
          title: "974球场",
          certainMatch: ["1/4决赛"],
          info: ["拉斯阿布阿布德", 40000],
          desc: [
            "历史：974体育场靠近海边，过去是卡塔尔最大的港口之一，代表了国家的全球贸易和航海业。",
            "理念：974是卡塔尔的国际拨号代码，也是建筑中使用的集装箱的确切数量。创新的40,00个座位的场地设计非凡，将成为FIFA世界杯历史上第一个完全可拆卸的比赛场地。这为可持续性设定了新标准。",
            "未来：场馆的临时性和巧妙的模块化设计意味着比传统体育场馆建筑所需的建筑材料更少，这有助于降低建筑成本。未来某些时候想要拆卸，将会非常方便。"
          ],
          img: require("../../../../../assets/active/worldCup2022/arena_7.jpg")
        },
        {
          title: "教育城体育场",
          certainMatch: ["1/8决赛", "1/4决赛"],
          info: ["瑞扬", 45350],
          desc: [
            "历史：教育城体育场周围一直是文化氛围最浓的地方，点缀着一流的大学，在这里进行前沿研究，学者们激励他们的学生达到最佳状态。",
            "理念：这整个地区是卡塔尔教育、科学和社区发展基金会的所在地，充满了发明和使2022年FIFA世界杯成为社会和人类发展催化剂的决心。<br>与所有FIFA 2022年卡塔尔世界杯体育场一样，先进的冷却技术可确保球员和球迷全年拥有舒适的温度，同时残疾球迷也能轻松进入。那些寻求更舒适的人可以在招待区和贵宾区享受比赛。",
            "未来：在2022年卡塔尔世界杯结束后，教育城体育场将保留25000个座椅，供大学的运动队使用。"
          ],
          img: require("../../../../../assets/active/worldCup2022/arena_8.jpg")
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.arena-show {
  padding: 36px 0 30px;
  .arena-item {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 55px;
    &:last-child {
      margin-bottom: 0;
    }
    &:nth-child(even) {
      flex-direction: row-reverse;
      .img-box {
        margin-right: 0;
        margin-left: 34px;
      }
    }
    .img-box {
      width: 482px;
      height: 594px;
      border-radius: 10px;
      overflow: hidden;
      margin-right: 34px;
    }
    .txt-box {
      flex: 1;
      align-items: flex-end;
      h1 {
        font-family: Roboto;
        font-size: 58px;
        font-weight: normal;
        color: #f34064;
      }
      h2 {
        margin-top: 3px;
        font-size: 28px;
        color: #fff;
      }
      .certain {
        display: flex;
        margin-top: 12px;
        li {
          width: 72px;
          height: 24px;
          margin-right: 10px;
          border-radius: 12px;
          border: solid 1px #f34064;
          box-sizing: border-box;
          font-size: 14px;
          text-align: center;
          line-height: 22px;
          color: #f34064;
        }
      }
      .info {
        display: flex;
        margin-top: 10px;
        li {
          padding: 0 13px;
          height: 24px;
          margin-right: 10px;
          border-radius: 12px;
          border: solid 1px #f3ba40;
          box-sizing: border-box;
          font-size: 14px;
          line-height: 22px;
          color: #f3ba40;
          i {
            display: inline-block;
            margin-right: 8px;
            vertical-align: middle;
          }
          &.info-0 {
            i {
              width: 11px;
              height: 16px;
              background: url("../../../../../assets/active/worldCup2022/arena_locale.png");
            }

          }
          &.info-1 {
            i {
              width: 15px;
              height: 14px;
              background: url("../../../../../assets/active/worldCup2022/arena_capacity.png");
            }
          }
          &.info-2 {
            i {
              width: 14px;
              height: 14px;
              background: url("../../../../../assets/active/worldCup2022/arena_cost.png");
            }
          }
        }
      }
      .desc {
        margin-top: 30px;
        li {
          padding-left: 31px;
          line-height: 30px;
          font-size: 16px;
          color: #fff;
          margin-bottom: 29px;
          position: relative;
          &:last-child {
            margin-bottom: 0;
            &:after {
              height: 0;
            }
          }
          &:before {
            position: absolute;
            left: 0;
            top: 8px;
            content: "";
            width: 10px;
            height: 10px;
            border: solid 2px #f34064;
            border-radius: 50%;
          }
          &:after {
            position: absolute;
            left: 6px;
            top: 22.5px;
            content: "";
            width: 2px;
            height: calc(100% + 14px);
            opacity: 0.2;
            background-color: #fff;
          }
        }
      }
    }
  }
}
</style>
