<template>
  <div class="notice">

    <div class="notice-warp">
      <div class="icon"></div>

      <div class="message-warp">
        <div id="father" @click.stop="openNoticeDio" class="message">

          <!-- 虚拟元素，用于计算滚动 ul 的总长-->
          <ul ref="messageRef" class="temp">
            <li v-for="(msg, index) in noticeList" :key="index" v-html="msg.show_cn"></li>
          </ul>

          <vue-seamless-scroll v-if="messageRefWidth > 0" :data="noticeList" :class-option="optionSingleHeightTime" class="seamless-warp">
            <ul :style="{width: `${messageRefWidth}px`}">
              <li :data-id="msg.id" :data-type="msg.category" v-for="(msg, index) in noticeList" :key="index" v-html="msg.show_cn"></li>
            </ul>
          </vue-seamless-scroll>
        </div>

        <router-link v-if="isLogin" :to="{ name:'message', params: { id: 2 } }" class="more link_primary_2022" >更多>></router-link>
        <div v-else class="more link_primary_2022" @click="toMessageView">更多>></div>
      </div>

    </div>

    <el-dialog v-backdrop="0.03" top="0" :close-on-press-escape="false" :close-on-click-modal="false" @close="closeNoticeDio" :append-to-body="true" custom-class="Index-Notice-Dio" :visible.sync="noticeModal" width="894">
      <template slot="title">
        <div class="nav-tabs d-flex">
          <div class="nav d-flex justify-center"
               @click="switchDio(item)"
               :class="[{'nav-active': item.key == activeTitleKey }]"
               v-for="(item, i) in noticeDioTitle" :key="i">
            <div class="nav-text" :class="`nav-${item.key}`"></div>
          </div>
        </div>
      </template>
      <div class="notice-win-wrapper d-flex justify-space-between" v-show="!alllistloading">
        <div class="left-wrapper" >
          <el-scrollbar style="height:100%">
            <div class="scoll-content-left">
              <div :class="{ 'left-title-active': currentIndex === index }"
                   @click="switchTitle(index)" class="left-title-wrapper"
                   v-for="(item, index) in noticeDioContent" :key="index">
                <div class="title">
                  <span class="title-text">{{ item.title }}</span>
                </div>
                <!-- 1 最新 2 重要 3 火热 -->
                <div v-if="item.label > 0" class="bage-wrapper" :class="`bage-wrapper-${item.label}`">{{ labelText(item.label) }}</div>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="right-wrapper" v-if="activeTitleKey == 'tongzhi'">
          <!-- model: 1 图文   2 全图 -->
          <transition mode="out-in" enter-active-class="animate__animated animate__zoomInUp"
                      leave-active-class="animate__animated animate__zoomOutRight">
            <div v-if="isAnima" key="tongzhi">
              <img v-if="rightContent.img" class="active-img" width="642" :height="rightContent.model === 1 ? 211 : 450" v-lazy="{
                src: rightContent.img,
                error: lazyPack2022.error,
                loading: lazyPack2022.loading
              }" alt="">
              <div v-if="rightContent.model === 1" class="notice-bottom-wrapper" :style="!rightContent.img&&'height:380px'">
                <el-scrollbar style="height:100%">
                  <div class="scoll-content">
                    <span v-html="rightContent.content_cn"></span>
                  </div>
                </el-scrollbar>
              </div>
              <div class="join-btn d-flex align-center justify-center" :class="{'full-picture': rightContent.model === 2}" @click="toActive">
                <span>立即参与</span>
                <img width="15" height="9" src="~@/assets/index/notice/arrow.png" alt="">
              </div>
            </div>
          </transition>
        </div>
        <div class="right-wrapper" v-if="activeTitleKey == 'gonggao'">
          <transition mode="out-in" enter-active-class="animate__animated animate__lightSpeedInLeft"
                      leave-active-class="animate__animated animate__lightSpeedOutRight">
            <div v-if="isAnima" key="gonggao">
              <div class="up-wrapper" v-if="rightContent">
                <div class="big-title">
                  {{ rightContent.title }}
                </div>
                <div class="time-data">
                  {{ rightContent.create_time }}
                </div>
              </div>
              <div class="bottom-wrapper" v-if="rightContent">
                <el-scrollbar style="height:100%">
                  <div class="scoll-content">
                    <span v-html="rightContent.content_cn"></span>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="noticedio-loading-wrapper d-flex align-center justify-center" v-if="alllistloading">
        <Loading class="list-loading" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Loading from '@/components/common/Loading.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'notice',
  components: {
    Loading
  },
  data() {
    return {
      page: 1,
      hidActive: false, // 是否隐藏活动通知
      TotalCount: 0,
      alllistloading: false,
      lazyloading: false,
      currentIndex: 0,// 默认消息索引
      activeTitleKey: 'tongzhi',
      isAnima: false,
      noticeList: [], // 用于跑马灯的热门置顶公告
      AllNotice: [], // 用于弹窗的所有公告，包含1 重要公告，2 活动通知
      messageRefWidth: 0,
      noticeModal: false,
      modalOpt: {
        maskClosable: false,
        closable: false,
        class: 'notice_modal vk_modal'
      }
    }
  },
  computed: {
    ...mapState(["isLogin", "lazyPack2022"]),
    optionSingleHeightTime () {
      return {
        direction: 2,
        limitMoveNum: 1
      }
    },
    noticeDioTitle() {
      const arr = [
        { key: 'tongzhi', title: '活动通知', type: 2 },
        { key: 'gonggao', title: '重要公告', type: 1 }
      ]
      if (this.hidActive) {
        return [
          { key: 'gonggao', title: '重要公告' }
        ]
      }
      return arr
    },
    noticeDioContent() {
      return this.activeTitleKey == 'tongzhi' ? this.AllNotice.filter(item => item.category == 2) : this.AllNotice.filter(item => item.category == 1)
    },
    rightContent() {
      return this.noticeDioContent.length ? this.noticeDioContent[this.currentIndex] : {}
    },
    activeUrl() {
      return this.rightContent.active_url
    },
    activeKey() {
      return this.activeTitleKey == 'gonggao' ? 1 : 2
    },
  },
  mounted () {
    this.getHotNotice()
  },
  // beforeDestroy() {
  //   if (document.querySelector('.el-scrollbar__wrap')) {
  //     document.querySelector('.el-scrollbar__wrap').removeEventListener('scroll', this.scrollChangeDeb, true)
  //   }
  // },
  methods: {
    toActive() {
      if (this.activeUrl) {
        this.$router.push(this.activeUrl)
      }
    },
    // 切换消息类型
    async switchDio(item) {
      if (item.key == this.activeTitleKey) {
        return
      }
      this.activeTitleKey = item.key
      this.currentIndex = 0
      this.page = 1
      this.AllNotice = []
      this.TotalCount = 0
      await this.getAllNotice(-1, item.type)
      document.querySelector('.el-scrollbar__wrap').scrollTop = 0
    },
    switchTitle(index) {
      if (index == this.currentIndex) {
        return
      }
      this.isAnima = false
      this.currentIndex = index
      const timer = setTimeout(() => {
        this.isAnima = true
        clearTimeout(timer)
      }, 200)
    },
    // 转化label
    labelText(label) {
      switch (label) {
        case 1:
          return '最新'
        case 2:
          return '重要'
        case 3:
          return '火热'
        default:
          return
      }
    },
    // 打开弹窗
    async openNoticeDio(e) {
      const { id, type } = e.target.dataset
      if (type) {
        Number(type) == 1 ? this.activeTitleKey = 'gonggao' : this.activeTitleKey = 'tongzhi'
        this.noticeModal = true
        await this.getAllNotice(id, Number(type))
        if (this.AllNotice.length) {
          // 仅用于懒加载，弃用，现在接口一次性返回所有的数据
          // console.log('监听滚动事件', document.querySelector('.el-scrollbar__wrap'))
          // if (document.querySelector('.el-scrollbar__wrap')) {
          //   document.querySelector('.el-scrollbar__wrap').addEventListener('scroll', this.scrollChangeDeb, true)
          // }
          const timer = setTimeout(() => {
            this.isAnima = true
            clearTimeout(timer)
          }, 300)
        }
      }
    },
    // 关闭弹窗的回调，noticeModal是组件自动置为false的
    closeNoticeDio() {
      this.currentIndex = 0
      this.isAnima = false
      this.activeTitleKey = 'tongzhi'
      this.TotalCount = 0
      this.page = 1
      this.AllNotice = []
    },
    // 热门公告，用于首页跑马灯
    async getHotNotice () {
      try {
        const res = await this.$http(this.ApiSetting.index.getIndexNotice)
        console.info("首页热门公告初始化：", res.data)
        if (res.status === 1) {
          this.noticeList = res.data
          // 判断是否有活动通知，没有的话，点击弹窗标题只能展示重要公告
          const pmdActive = res.data.filter(item => item.category == 2)
          this.hidActive = !pmdActive.length
          this.setUlWidth()
        }
      } catch (e) {
        throw e
      }
    },
    scrollChangeDeb(e) {
      // 计算滚动部分的高度
      const contentHeight = document.querySelector('.scoll-content-left').getBoundingClientRect().height
      // 超过的距离，即可滚动的高度
      const scrollMaxHeight = contentHeight - 450
      if (e.target.scrollTop >= scrollMaxHeight && this.AllNotice.length < this.TotalCount) {
        this.getAllNoticeLazy(-1, this.activeKey, 'lazyload')
      }
    },
    // 所有公告，用于公告弹窗
    async getAllNotice(id = -1, type = 1) {
      if (this.alllistloading) {
        return
      }
      this.alllistloading = true
      try {
        const res = await this.$http(this.ApiSetting.index.getIndexNotice, {
          category: Number(type)
        })
        this.alllistloading = false
        if (res.status === 1 && res.data.length) {
          this.AllNotice = res.data
          // 活动通知为空，弹窗只展示重要公告
          if (Number(type) == 2) {
            if (!res.data.length) {
              this.hidActive = true
              return
            }
          }
          if (id != -1) {
            const index = res.data
                .findIndex(item => item.id == id)
            if (index != -1) {
              this.currentIndex = index
            }
          }
        }
      } catch (error) {
        this.alllistloading = false
      }
    },
    // 所有公告，懒加载方案，弃用
    async getAllNoticeLazy(id = -1, type = 1, flag = '') {
      if (this.alllistloading || this.lazyloading) {
        return
      }
      // 1 重要公告 2 活动通知 , page：页码，每页十条
      if (flag != 'lazyload') {
        this.alllistloading = true
      } else {
        this.lazyloading = true
        if (this.TotalCount >= 10 && this.noticeDioContent.length < this.TotalCount) {
          this.page++
        } else {
          return
        }
      }
      try {
        const res = await this.$http(this.ApiSetting.index.getIndexNotice, {
          category: Number(type),
          page: this.page,
          limit: 30
        })
        this.alllistloading = false
        this.lazyloading = false
        if (res.status === 1 && res.data.list) {
          this.AllNotice.push(...res.data.list)
          this.TotalCount = res.data.count
          // 活动通知为空，弹窗只展示重要公告
          if (Number(type) == 2) {
            if (res.data.count < 1) {
              this.hidActive = true
              return
            }
          }
          if (id != -1) {
            const index = res.data.list
                .findIndex(item => item.id == id)
            if (index != -1) {
              this.currentIndex = index
            }
          }
        }
      } catch (error) {
        this.alllistloading = false
        this.lazyloading = false
      }
    },
    toMessageView() {
      this.$message({ message: "请您先登录", type: "warning" })
    },

    // 根据字符长度获取最大li长度，以设置ul总长度：ul长度 = 最大li长度 * li数量
    setUlWidth() {
      this.$nextTick(() => {
        const nodes = this.$refs.messageRef.childNodes
        let w = 0
        for (let i = nodes.length - 1;i >= 0;i--) {
          w += nodes[i].offsetWidth
          w += 205
        }
        this.messageRefWidth = w < 1058 ? 1058 : w
        this.$refs.messageRef.remove()

        this.$nextTick(() => {
          this.$emit("load-count")
        })

      })
    }
  }
}
</script>

<style lang="less" scoped>
.notice {
  margin: -24px auto 0;
  width: 1240px;
  height: 52px;
  position: relative;
  z-index: 2;
  display: flex;

  .notice-warp {
    display: flex;
    .icon {
      position: relative;
      width: 129px;
      &:before {
        position: absolute;
        top: -20px;
        left: 0;
        content: "";
        width: inherit;
        height: 73px;
        background: url("../../assets/index/notice_icon.png");
      }
    }

    .message-warp {
      display: flex;
      width: 1129px;
      margin-left: -13px;
      background: url("../../assets/index/notice_message_bg.png");
      .message {
        cursor: pointer;
        width: 1058px;
        height: 52px;
        .temp {
          li {
            margin-right: 200px;
            display: inline-block;
            font-size: 14px;
            line-height: 46px;
            color: #acbae2;
          }
        }

        .seamless-warp {
          overflow: hidden;
          width: inherit;
          height: inherit;
          user-select: none;
          clip-path: polygon(28px 0, 100% 0, 100% 52px, 2px 52px);
          ul {
            li {
              margin-right: 200px;
              display: inline-block;
              font-size: 14px;
              line-height: 46px;
              color: #acbae2;
            }
          }
        }
      }

      .more {
        text-align: center;
        width: 75px;
        line-height: 46px;
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang="less">
@keyframes arrowanim {
  0%, 100%, 54% {
    transform: translateX(0);
  }
  18%, 36% {
    transform: translateX(4px);
  }
  27% {
    transform: translateX(1px);
  }
}
.el-scrollbar__thumb {
  background-color: #07f1b7;
}
.el-scrollbar__bar.is-vertical {
  width: 4px;
  right: 10px;
}
.Index-Notice-Dio {
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  margin: 0;
  width: 894px;
  border-radius: 10px;
  box-shadow: 0px 3px 21px 0 rgba(0, 0, 0, 0.35);
  background-color: #323745;
  --animate-duration: 0.3s;
  .el-dialog__header {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    background: url('~@/assets/index/notice/title-bg.png') no-repeat center;
    background-size: 100% 100%;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      height: 2px;
      background-image: linear-gradient(90deg, transparent 0%, #07f1b7 50%, transparent 100%);
    }
    .el-dialog__headerbtn {
      .el-dialog__close {
        background-image: url('~@/assets/index/notice/close.png');
        background-position: 100% 100%;
        width: 21px;
        height: 21px;
        position: relative;
        top: 3.5px;
        right: 6.5px;
        transition: transform .3s linear;
        &:hover {
          transform: rotate(-90deg);
        }
      }
    }
  }
  .nav-tabs {
    margin-left: 231px;
    .nav {
      cursor: pointer;
      width: 145px;
      height: 58px;
      background-position-y: 58px;
      transition: background .15s linear;
      &:hover,
      &.nav-active {
        background: url('~@/assets/index/notice/bg.png') no-repeat center;
        background-size: 100% 100%;
      }
      .nav-text {
        margin-top: 15.5px;
        width: 93px;
        height: 31px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        &.nav-tongzhi {
          background-image: url('~@/assets/index/notice/tongzhi.png');
        }

        &.nav-gonggao {
          background-image: url('~@/assets/index/notice/gonggao.png');
        }
      }
    }
  }
  .el-dialog__body {
    padding: 0;
    color: #acbae2;
    line-height: 1.71;
  }
  .notice-win-wrapper {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      height: 450px;
      width: 1px;
      background-color: #4e5466;
      left: 251px;
      top: 0;
    }
    .left-wrapper {
      height: 450px;
      width: 261px;
      box-sizing: border-box;
      z-index: 1;
      user-select: none;
      .left-title-wrapper {
        width: 100%;
        height: 50px;
        box-sizing: border-box;
        position: relative;
        padding-left: 28px;
        line-height: 50px;
        position: relative;
        cursor: pointer;
        background-position-x: -257px;
        .title {
          width: 223px;
          position: relative;
          .title-text {
            width: 198px;
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        &::after {
          content: '';
          position: absolute;
          width: 251px;
          height: 1px;
          bottom: 0;
          left: 0;
          background: url('~@/assets/index/notice/short-border.png') no-repeat center;
          background-size: 100% 100%;
        }
        &:last-child {
          &::after {
            content: none;
          }
        }
        &:hover {
          &::before {
            content: '';
            position: absolute;
            left: 0;
            width: 251px;
            height: 100%;
            background-image: linear-gradient(to right, #323745, #222632);
          }
          color: #07f1b7;
        }
        &.left-title-active {
          color: #fff;
          font-weight: bold;
          background: url('~@/assets/index/notice/active.png') no-repeat;
          background-size: 100% 100%;
          background-position: 0 0;
          transition: background .3s linear;
          .title {
            border-right: none;
          }
          &::after {
            z-index: -1;
          }
          &:hover {
            &::before {
              content: none;
            }
          }
        }

      }
      .bage-wrapper {
        position: absolute;
        left: 6px;
        top: 0;
        width: 38px;
        height: 16px;
        box-sizing: border-box;
        text-align: center;
        line-height: 14px;
        border-radius: 4px;
        font-weight: 600;
        font-size: 12px;
        border: solid 1px transparent;
        &.bage-wrapper-1 {
          border-color: #07f1b7;
          color: #07f1b7;
        }
        &.bage-wrapper-2 {
          border-color: #ed3956;
          color: #ed3956;
        }
        &.bage-wrapper-3 {
          border-color: #ff7429;
          color: #ff7429;
        }
      }
    }
    .right-wrapper {
      width: 636px;
      box-sizing: border-box;
      height: 450px;
      .active-img {
        position: relative;
        left: -6px;
      }
      .up-wrapper {
        position: relative;
        text-align: center;
        box-sizing: border-box;
        padding: 25px 26px 20px;
        height: 90px;
        .big-title {
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          white-space: nowrap;
          width: 584px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          width: 584px;
          left: 50%;
          transform: translateX(-50%);
          height: 1px;
          display: block;
          background: url('~@/assets/index/notice/long-border.png') no-repeat center;
          background-size: 100% 100%;
        }
      }
      .bottom-wrapper {
        height: 332px;
        box-sizing: border-box;
        padding: 16px 10px 14px 26px;
      }
      .notice-bottom-wrapper {
        height: 173px;
        box-sizing: border-box;
        padding: 15px 10px 15px 26px;
      }
      .join-btn {
        margin: auto;
        cursor: pointer;
        user-select: none;
        // position: absolute;
        // bottom: 24px;
        // right: 229px;
        width: 184px;
        height: 46px;
        background: url('~@/assets/index/notice/btn.png') no-repeat center;
        background-size: 100% 100%;
        font-size: 14px;
        font-weight: 600;
        color: #0ae5af;
        transition: filter .5s;
        filter: brightness(1);
        &:hover {
          filter: brightness(1.15);
          img {
            animation-name: arrowanim;
          }
        }
        img {
          margin-left: 11px;
          animation: 1.5s linear infinite;
        }
        &.full-picture {
          position: relative;
          bottom: 70px;
        }
      }
    }
  }
  .noticedio-loading-wrapper {
    height: 450px;

  }
  .scoll-content-left {
    padding-right: 0;
  }
  .scoll-content {
    padding-right: 22px;
  }
}
</style>
