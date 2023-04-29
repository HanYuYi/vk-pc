<template>
  <div>
    <!-- 活动时间 -->
    <div class="regress-title-wrapper text-center title-time">
      <span>活动时间</span>
    </div>
    <div class="regress-table-wrapper text-center">
      {{ activeTime }}
    </div>
    <!-- 活动内容 -->
    <div class="regress-title-wrapper text-center">
      <span>活动内容</span>
    </div>
    <div class="regress-desc text-center">
      <slot name="desc"></slot>
    </div>
    <div class="regress-table-wrapper text-center" style="padding:0">
      <table width="100%">
        <thead>
          <tr>
            <th v-for="(item, i) in tableTitle" :key="i">{{item.label}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in tableData" :key="i">
            <td>{{item.first}}</td>
            <td class="theme-color">{{item.second}}</td>
            <slot v-if="i == 0" name="rowspan"></slot>
          </tr>
        </tbody>
      </table>
    </div>
    <slot></slot>
    <div class="regress-btn btn-loading-wrapper" v-if="initloading">
      <Loading />
    </div>
    <div v-else @click="$emit('getbonus', disbtn)" class="regress-btn join-btn" :class="{ 'btn-disable': disbtn  }">
      {{ btnText }}
    </div>
    <!-- 活动规则 -->
    <div class="regress-title-wrapper text-center">
      <span>活动规则</span>
    </div>
    <div class="regress-table-wrapper gz-content">
      <slot name="gz"></slot>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/common/Loading'
import { mapState } from 'vuex'
export default {
  name: 'RegressTemplate',
  props: {
    initloading: Boolean,
    btnStatus: Number,
    activeType: Number,
    activeTime: String,
    tableTitle: Array,
    tableData: Array
  },
  components: {
    Loading
  },
  computed: {
    ...mapState(['isLogin']),
    btnText() {
      if (this.btnStatus == 1) {
        return '已领取'
      } else {
        return '立即领取'
      }
    },
    disbtn() {
      if (this.isLogin) {
        // 1 已领取 2 未满足条件
        if (this.activeType == 1) {
          return this.btnStatus == 1 || this.btnStatus == 2
        }
        if (this.activeType == 2) {
          return this.btnStatus == 1
        }
        if (this.activeType == 3) {
          return this.btnStatus == 1
        }
      }
      return false
    }
  }
}
</script>

<style lang="less" scoped>
.theme-color {
  color: #0ee9e5;
}

.font-16 {
  font-size: 16px !important;
}
.regress-title-wrapper {
  margin-top: 45px;
  letter-spacing: 1.73px;
  font-size: 23px;
  font-weight: bold;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.65);

  &.title-time {
    margin-top: 0;
  }

  span {
    line-height: 30px;
    width: fit-content;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: -4px;
      left: -57px;
      background: url('~@/assets/active/regress/title-bg.png') no-repeat center;
      background-size: 100% 100%;
      width: 40px;
      height: 40px;
    }

    &::after {
      content: '';
      position: absolute;
      top: -4px;
      right: -57px;
      background: url('~@/assets/active/regress/title-bg.png') no-repeat center;
      background-size: 100% 100%;
      width: 40px;
      height: 40px;
    }
  }
}

.regress-table-wrapper {
  width: 1080px;
  margin: 20px auto 0;
  box-sizing: border-box;
  padding: 26px 148px;
  font-size: 14px;
  border-radius: 10px;
  border: solid 2px #0ee9e5;
  background-color: #004E6D;
  overflow: hidden;

  &.gz-content {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  table {

    th,
    td {
      width: 33.3333%;
    }

    th {
      height: 49px;
      line-height: 49px;
      box-sizing: border-box;
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 1.2px;
      border-left: solid 1px #018294;
      border-bottom: solid 1px #018294;

      &:first-of-type {
        border-left: none;
      }
    }

    td {
      box-sizing: border-box;
      height: 39px;
      line-height: 39px;
      border-left: solid 1px #018294;
      border-bottom: solid 1px #018294;

      &:first-of-type {
        border-left: none;
      }
    }

    tbody {
      tr {
        &:first-of-type {
          td {
            &:last-of-type {
              border-bottom: none;
            }
          }
        }

        &:last-of-type {

          td {
            border-bottom: none;
          }
        }
      }
    }
  }
}
ol {
  padding-left: 12px;
  list-style: decimal;
}

li {
  list-style: decimal;
  margin-bottom: 15px;
  position: relative;
  line-height: 1.71;

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>