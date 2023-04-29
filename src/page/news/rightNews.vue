<template>
  <div v-if="list.length" class="right-news-fixed">
    <dl v-for="(arr, index) in list" :key="index">
      <dt>{{ newsType[index] ? newsType[index].name : '' }}</dt>
      <dd>
        <router-link v-for="(item, arrIndex) in arr"
                     :key="arrIndex"
                     :to="`/news/${item.id}`"
                     :class="arrIndex === 0 && item.type === 1 ? 'first' : 'other'"
                     :style="arrIndex === 0 && item.type === 1 ? `backgroundImage: url(${item.images[0]})` : ''"
                     v-lazy:background-image="arrIndex === 0 && item.type === 1 ? {
                         src: item.images[0],
                         error: $store.state.lazyPack2022.error,
                         loading: $store.state.lazyPack2022.loading
                     } : {}">
          <h5 v-if="arrIndex === 0 && item.type === 1"><p v-html="item.title"></p></h5>
          <p v-else v-html="item.title"></p>
        </router-link>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'rightNews',
  props: {
    newsType: {
      type: Array,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>

.right-news-fixed {
  dl {
    background-color: #262933;
    margin-top: 20px;
    dt {
      padding: 0 30px;
      font-size: 18px;
      font-weight: bold;
      line-height: 78px;
      color: #ffffff;
    }
    dd {
      .first {
        display: block;
        height: 229px;
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-position: center top;
        overflow: hidden;
        position: relative;
        transition: background-size 1s;
        &:before {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 2;
          content: "";
          width: 200%;
          height: 300%;
          background: hsla(0,0%,100%,.1);
          border-radius: 100%;
          transform: translate(-50%, -50%) scale(0, 0);
          opacity: 0;
        }
        &:hover {
          background-size: 103% auto;
          &:before {
            animation: circle 0.8s;
          }
          @keyframes circle {
            0% {
              opacity: 1;
            }
            40% {
              opacity: 1;
            }
            100% {
              transform: translate(-50%, -50%) scale(1, 1);
              opacity: 0;
            }
          }
        }
        h5 {
          overflow: hidden;
          margin-top: 229px - 66;
          background-image: linear-gradient(rgba(52, 58, 74, 0.64), #181b21 70%);
          p {
            margin: 9px 30px 4px;
            height: 53px;
            font-size: 18px;
            font-weight: normal;
            line-height: 25px;
            color: #ffffff;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /* autoprefixer: ignore next */
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      }
      .other {
        display: block;
        padding: 15px 30px;
        border-bottom: 1px solid #181b21;
        &:hover {
          p {
            color: #ffffff;
          }
        }
        p {
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /* autoprefixer: ignore next */
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: 14px;
          line-height: 24px;
          color: #7c839f;
          transition: all 0.3s;
        }
        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
