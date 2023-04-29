<template>
  <div class="footer" :class="{'no-bg': !hasTopPanel}">

    <div v-if="hasTopPanel" class="footer-top">

      <ul class="friendly-group">
        <li v-for="(icon, index) in friendlyList" :key="index" class="double-img">
          <img :src="icon[0]" alt="" class="normal">
          <img :src="icon[1]" alt="" class="active">
        </li>
      </ul>

      <div class="our-link">

        <dl class="social">
          <dt>关注我们</dt>
          <dd>
            <a v-for="(item, index) in ourLinkList.socialList"
               :key="index"
               :href="item[0]"
               target="_blank"
               class="double-img">
              <img :src="item[1]" class="normal" alt="">
              <img :src="item[2]" class="active" alt="">
            </a>
          </dd>
        </dl>

        <dl class="sponsor">
          <dt>官方赞助</dt>
          <dd>
            <span v-for="(item, index) in ourLinkList.sponsorList" :key="index">
              <a v-if="item[0].includes('http')"
                           :href="item[0]"
                           class="double-img"
                           target="_blank">
                <img :src="item[1]" class="normal" alt="">
                <img :src="item[2]" class="active" alt="">
              </a>
              <router-link v-else :to="item[0]" class="double-img">
                <img :src="item[1]" class="normal" alt="">
                <img :src="item[2]" class="active" alt="">
              </router-link>
            </span>
          </dd>
        </dl>

        <dl class="authentication">
          <dt>资质认证</dt>
          <dd>
            <div v-for="(image, index) in ourLinkList.authenticationList"
                         :key="index"
                 class="double-img">
              <img :src="image[0]" class="normal" alt="">
              <img :src="image[1]" class="active" alt="">
            </div>
          </dd>
        </dl>

      </div>

      <ul class="site-link">
        <li v-for="(item, index) in siteLinkList" :key="index">
          <a v-if="item[1].includes('http')" :href="item[1]" target="_blank">{{ item[0] }}</a>
          <router-link v-else :to="item[1]">{{ item[0] }}</router-link>
        </li>
      </ul>
    </div>


    <div class="footer-copyright">
      Copyright©2017-2023 <a href="https://www.vkgame.one" target="_blank">vkgame.one</a> Sportsypl Co.Ltd.All rights reserved.
    </div>
  </div>
</template>

<script>
export default {
  name: 'footer-copy',
  props: {
    hasTopPanel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      friendlyList: [
        [require("../assets/footer/rayGaming.png"), require("../assets/footer/rayGaming_hover.png")],
        [require("../assets/footer/xiaoai.png"), require("../assets/footer/xiaoai_hover.png")],
        [require("../assets/footer/pinnacle.png"), require("../assets/footer/pinnacle_hover.png")],
        [require("../assets/footer/saba.png"), require("../assets/footer/saba_hover.png")],
        [require("../assets/footer/imSports.png"), require("../assets/footer/imSports_hover.png")],
        [require("../assets/footer/ag.png"), require("../assets/footer/ag_hover.png")],
        [require("../assets/footer/pgSoft.png"), require("../assets/footer/pgSoft_hover.png")],
        [require("../assets/footer/kyGame.png"), require("../assets/footer/kyGame_hover.png")]
      ],
      ourLinkList : {
        socialList: [
          ["https://twitter.com/Vkgameone", require("../assets/footer/twitter.png"), require("../assets/footer/twitter_hover.png")],
          ["https://weibo.com/p/1006066414004190/home?from=page_100606&mod=TAB&is_all=1#place", require("../assets/footer/wb.png"), require("../assets/footer/wb_hover.png")],
          ["https://www.facebook.com/vkgame.one", require("../assets/footer/fb.png"), require("../assets/footer/fb_hover.png")]
        ],
        sponsorList: [
          ["https://evilgeniuses.gg/partners", require("../assets/footer/ge.png"), require("../assets/footer/ge_hover.png")],
          ["/dawnbattle", require("../assets/footer/dawnbattle.png"), require("../assets/footer/dawnbattle_hover.png")]
        ],
        authenticationList: [
          [require("../assets/footer/pagcor.png"), require("../assets/footer/pagcor_hover.png")],
          [require("../assets/footer/pagcor_age.png"), require("../assets/footer/pagcor_age_hover.png")],
          [require("../assets/footer/mga.png"), require("../assets/footer/mga_hover.png")]
        ]
      },
      siteLinkList: [
        [this.$t("The_joint_venture_mode"), "/jointly"],
        [this.$t("Privacy_policy"), "/privacy"],
        [this.$t("Official_site_navigation"), "https://www.vkgame.one"],
        [this.$t("Newbie_guide"), "/guide"],
        [this.$t("Rational_game"), "/responsible"],
        ["APP下载", "/appshow"],
        [this.$t("The_terms_of_service"), "/serviceterms"],
        [this.$t("Contact_us"), "/contactus"]
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  background-color: #191e26;
  .footer-top {
    width: 1240px;
    margin: 0 auto 0;

    .double-img {
      .active {
        display: none;
      }
      &:hover {
        .normal {
          display: none;
        }
        .active {
          display: inline-block;
        }
      }
    }

    .friendly-group {
      padding: 32px 0 28px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #2b323d;
    }

    .our-link {
      margin-top: 28px;
      display: flex;
      justify-content: space-between;
      .social {
        display: flex;
        dt {
          font-size: 14px;
          font-weight: bold;
          line-height: 40px;
          color: #656e8c;
          margin-right: 13px;
        }
        dd {
          a {
            display: inline-block;
            width: 41px;
            height: 41px;
            margin-right: 12px;
          }
        }
      }

      .sponsor {
        display: flex;
        dt {
          font-size: 14px;
          font-weight: bold;
          line-height: 40px;
          color: #656e8c;
          margin-right: 15px;
        }
        dd {
          a {
            display: inline-block;
            &:first-child {
              width: 150px;
              height: 44px;
              margin-right: 25px;
            }
            &:last-child {
              width: 135px;
              height: 41px;
            }
          }
        }
      }
      .authentication {
        display: flex;
        dt {
          font-size: 14px;
          font-weight: bold;
          line-height: 40px;
          color: #656e8c;
          margin-right: 16px;
        }
        dd {
          &>div {
            display: inline-block;
            &:first-child {
              width: 153px;
              height: 41px;
              margin-right: 18px;
            }
            &:nth-child(2) {
              width: 40px;
              height: 41px;
              margin-right: 22px;
            }
            &:last-child {
              width: 211px;
              height: 42px;
            }
          }
        }
      }
    }

    .site-link {
      display: flex;
      width: 756px;
      margin: 33px auto 0;
      padding-bottom: 27px;
      justify-content: space-between;
      font-size: 14px;
      line-height: 14px;
      li {
        a {
          position: relative;
          color: #656e8c;
          &:after {
            position: absolute;
            top: 4px;
            right: -18px;
            content: "";
            width: 1px;
            height: 14px;
            background: #656e8c;
          }
          &:hover {
            color: #07f1b7;
          }
        }
        &:last-child {
          a {
            &:after {
              width: 0;
            }
          }
        }
      }
    }
  }
  .footer-copyright {
    line-height: 49px;
    background-color: #121418;
    font-size: 14px;
    text-align: center;
    color: #656e8c;
    a {
      color: #656e8c;
      &:hover {
        color: #07f1b7;
      }
    }
  }
  &.no-bg {
    background-color: transparent;
    min-height: 80px;
    .footer-copyright {
      line-height: 80px;
      border-top: 1px solid rgba(255,255,255,0.2);
      background-color: transparent;
      color: rgba(255,255,255,0.7);
      a {
        color: rgba(255,255,255,0.7);
        &:hover {
          color: #07f1b7;
        }
      }
    }
  }
}
</style>
