<template>
  <ul class="news-item">
    <li v-for="(item, index) in list" :key="index">
      <!-- 列表分三种类型：1：单图   0：无图    3：三张图-->
      <router-link v-if="item.type === 1" :to="`/news/${item.id}`" class="single-img">
        <div class="img-box">
          <img v-lazy="{
                 src: item.images ? item.images[0] : '',
                 error: $store.state.lazyPack2022.error,
                 loading: $store.state.lazyPack2022.loading
            }" alt="">
        </div>
        <div class="data-box">
          <h4 v-html="item.title"></h4>
          <h5 v-html="item.sample"></h5>
          <div v-if="item.is_recommend"><i class="tag" :style="{background: item.tag_color}">{{ item.tag }}</i></div>
          <div class="bottom-info">
            <div class="bottom-info-left">
              <a v-if="item.is_recommend" @click.prevent="handleToGame(item.redirect_link)" class="match-link link_primary_2022">
                <p>{{ item.team_a_name }}</p>
                <em> VS </em>
                <p>{{ item.team_b_name }}</p>
              </a>
              <i v-else class="tag" :style="{background: item.tag_color}">{{ item.tag }}</i>
            </div>
            <small class="new-info time">{{ dateTimeFormatByNews(item.timestamp) }}</small>
            <small v-if="!item.is_hide_read" class="new-info read"><i class="views"></i>{{ item.read_count }}</small>
          </div>
        </div>
      </router-link>

      <router-link v-if="item.type === 0" :to="`/news/${item.id}`" class="no-img">
        <h4 v-html="item.title"></h4>
        <h5 v-html="item.sample"></h5>
        <div class="bottom-info">
          <div class="info-left">
            <i class="tag" :style="{background: item.tag_color}">{{ item.tag }}</i>
            <a v-if="item.is_recommend" @click.prevent="handleToGame(item.redirect_link)" class="match-link link_primary_2022">
              <p>{{ item.team_a_name }}&nbsp;</p>
              <em>VS</em>
              <p>&nbsp;{{ item.team_b_name }}</p>
            </a>
          </div>
          <div class="info-right">
            <small class="new-info time">{{ dateTimeFormatByNews(item.timestamp) }}</small>
            <small v-if="!item.is_hide_read" class="new-info read" style="margin-left: 18px"><i class="views"></i>{{ item.read_count }}</small>
          </div>
        </div>
      </router-link>

      <router-link v-if="item.type === 3" :to="`/news/${item.id}`" class="three-img">
        <h4 v-html="item.title"></h4>
        <div class="img-line">
          <div v-for="(imgUri, imgKey) in item.images" :key="imgKey" class="img-box">
            <img v-lazy="{
                           src: imgUri,
                           error: $store.state.lazyPack2022.error,
                           loading: $store.state.lazyPack2022.loading
                      }" alt="">
          </div>
        </div>
        <div class="bottom-info">
          <div class="info-left">
            <i class="tag" :style="{background: item.tag_color}">{{ item.tag }}</i>
            <a v-if="item.is_recommend" @click.prevent="handleToGame(item.redirect_link)" class="match-link link_primary_2022">
              <p>{{ item.team_a_name }}&nbsp;</p>
              <em>VS</em>
              <p>&nbsp;{{ item.team_b_name }}</p>
            </a>
          </div>
          <div class="info-right">
            <small class="new-info time">{{ dateTimeFormatByNews(item.timestamp) }}</small>
            <small v-if="!item.is_hide_read" class="new-info read" style="margin-left: 18px"><i class="views"></i>{{ item.read_count }}</small>
          </div>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
import publicMixin from './publicMixin'

export default {
  name: 'newsItem',
  mixins: [ publicMixin ],
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    // 跳转赛事投注
    handleToGame (uri) {
      if (!this.isLogin) {
        this.$message({ message: '请您先登录', type: 'warning' })
        return
      }
      this.$router.push({ path: uri })
    }
  }
}
</script>

<style lang="less" scoped>
// 单行文本省略号
.single-line-txt-ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.news-item {
  li {
    background-color: #262933;
    border-bottom: 1px solid #181b21;
    transition: filter 0.3s;
    &:hover {
      filter: contrast(92%);
      h4 {
        text-decoration: underline;
      }
    }
    &:last-child {
      border: 0;
    }

    .img-box {
      width: 250px;
      height: 141px;
      overflow: hidden;
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }

      img {
        width: inherit;
      }
    }

    h4 {
      font-size: 18px;
      font-weight: normal;
      line-height: 18px;
      color: #ffffff;
      transition: text-decoration 0.3s;
      .single-line-txt-ellipsis;
    }

    .tag {
      display: inline-block;
      border-radius: 4px;
      font-size: 14px;
      line-height: 20px;
      padding: 0 10px;
      color: #262933;
    }

    .match-link {
      border-bottom: 1px solid #07f1b7;
      font-size: 14px;
      line-height: 14px;
      height: 14px;
      margin-top: 2px;
      &:hover {
        color: #ffffff;
        text-decoration: none;
        border-color: #ffffff;
      }

      p {
        line-height: 14px;
        max-width: 96px;
        .single-line-txt-ellipsis;
      }
    }

    .new-info {
      color: #7c839f;
      font-size: 14px;
      &.time {
        width: 160px;
        text-align: right;
      }
      &.read {
        width: 100px;
      }

      .views {
        display: inline-block;
        width: 19px;
        height: 12px;
        margin-right: 15px;
        background: url("../../assets/login/password_view.png");
        background-size: 100%;
      }

      &:last-child {
        text-align: right;
      }
    }
  }

  .single-img {
    display: flex;
    padding: 27px 30px 30px;

    .data-box {
      flex: 1;
      width: 520px;
      height: 141px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h4 {
      }

      h5 {
        font-size: 14px;
        font-weight: normal;
        line-height: 24px;
        color: #7c839f;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /* autoprefixer: ignore next */
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .bottom-info {
        display: flex;
        justify-content: space-between;
        .bottom-info-left {
          width: 223px;
          height: 14px;
          .match-link {
            height: inherit;
            * {
              display: inline-block;
              vertical-align: sub;
            }
          }
        }
      }
    }
  }

  .no-img {
    display: block;
    padding: 25px 30px 30px;

    h4 {
    }

    h5 {
      margin-top: 5px;
      font-size: 14px;
      font-weight: normal;
      line-height: 24px;
      color: #7c839f;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      /* autoprefixer: ignore next */
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .bottom-info {
      margin-top: 16px;
      display: flex;

      .info-left, .info-right {
        display: flex;
        width: 50%;
        height: 20px;
      }

      .info-left {
        .tag {
          margin-right: 20px;
        }

        .match-link {
          display: flex;
        }
      }

      .info-right {
        justify-content: right;
      }
    }
  }

  .three-img {
    display: block;
    padding: 25px 30px 30px;

    h4 {

    }

    .img-line {
      display: flex;
      margin-top: 19px;
    }

    .bottom-info {
      margin-top: 16px;
      display: flex;

      .info-left, .info-right {
        display: flex;
        width: 50%;
        height: 20px;
      }

      .info-left {
        .tag {
          margin-right: 20px;
        }

        .match-link {
          display: flex;
        }
      }

      .info-right {
        justify-content: right;
      }
    }
  }
}
</style>
