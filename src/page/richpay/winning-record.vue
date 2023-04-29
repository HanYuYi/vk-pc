<template>
  <el-dialog
    custom-class="public_richpay_dialog"
    :visible.sync="show"
    v-dir-center="show"
    title="中奖记录"
    @close="close">
    <div class="abs_panel winning-record">
      <p class="record-header"><span>抽中奖品</span><span>获得日期</span><span>状态</span></p>
      <p class="record-item" v-for="(item,i) in recordsPage.records" :key="i">
        <span>{{item.name}}</span>
        <span>{{item.time}}</span>
        <router-link v-if="item.status == 3" :to="{name: 'package', params: {from: 'richpay'}}">{{item.status_cn}}</router-link>
        <span v-else class="used">{{item.status_cn}}</span>
      </p>
      <p class="none-record" v-if="!recordsPage.records.length && !loading">暂无数据</p>
    </div>

    <p class="record-page-control" v-if="recordsPage.records.length">
      <span class="left" @click="recordPageChange(-1)"></span>
      {{recordsPage.currentPage}}/{{recordsPage.maxPage}}
      <span class="right" @click="recordPageChange(+1)"></span>
    </p>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'winning-record',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    visible (bool) {
      if (bool) {
        this.initAwardRecord()
      } else {
        this.recordsPage.currentPage = 1
        this.recordsPage.records = []
      }
      this.show = this.visible
    }
  },
  computed: {
    ...mapState(["richpayInitData", "isLogin"])
  },
  data() {
    return {
      show: this.visible,
      loading: false,
      recordsPage: {
        currentPage: 1,
        maxPage: 20,
        records: []
      }
    }
  },
  methods: {
    close () {
      this.show = false
      this.$emit('update:visible', false)
    },
    recordPageChange (num) {
      if (this.recordsPage.currentPage + num <= 0 || this.recordsPage.currentPage + num > this.recordsPage.maxPage) return
      this.recordsPage.currentPage += num
      this.initAwardRecord()
    },
    // 初始化中奖记录弹窗
    initAwardRecord () {
      if (!this.isLogin){
        this.$message({message: '请您先登录！',type: 'warning'})
        return
      }

      if (this.loading) return
      this.loading = true
      this.$http(this.ApiSetting.active.richPayGetPrizeList, {page: this.recordsPage.currentPage, page_size: 6})
        .then(res => {
          if (res.status === 1) {
            this.recordsPage.maxPage = Math.ceil(res.data.count/6)
            this.recordsPage.records = res.data.list
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  height: 477px;
  .winning-record {
    left: 55px;
    text-align: center;

    .record-header, .record-item {
      width: 520px;
      margin-top: 30px;
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(130,167,242, 0.3);

      span, a {
        width: 33%;
        height: 50px;
        display: inline-block;
        text-align: center;
        font-size: 22px;
        color: #ffffff;
        &.used {
          color: rgba(131, 249, 253, 0.3)
        }
      }
    }

    .record-header {
      line-height: 64px;
      span {
        height: 64px;
      }
    }

    .record-item {
      margin-top: 0;

      span, a {
        font-size: 18px;
        line-height: 50px;
        color: #a1a3df;
      }

      a {
        color: #83f9fd;
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .none-record {
      z-index: 1;
      font-size: 18px;
      color: #a1a3df;
      margin-top: 160px
    }
  }

  .record-page-control {
    width: 120px;
    height: 16px;
    margin-top: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 255px;
    bottom: 14px;
    font-size: 18px;
    color: #fff;
    z-index: 1;

    .left {
      display: inline-block;
      width: 16px;
      height: 25px;
      cursor: pointer;
      background: url('../../assets/richpay/btn-normal-l.png');

      &:hover {
        background: url('../../assets/richpay/btn-hover-l.png');
        background-size: 100% 100%;
      }

      background-size: 100% 100%;
    }

    .right {
      display: inline-block;
      width: 16px;
      height: 25px;
      cursor: pointer;
      background: url('../../assets/richpay/btn-normal-r.png');

      &:hover {
        background: url('../../assets/richpay/btn-hover_r.png');
        background-size: 100% 100%;
      }

      background-size: 100% 100%;
    }
  }

}

</style>
