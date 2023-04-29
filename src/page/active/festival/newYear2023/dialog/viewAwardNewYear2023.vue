<template>
  <el-dialog
      custom-class="view-award-new-year2023"
      :visible="visible"
      top="8vh"
      width="916px"
      :show-close="false"
      :append-to-body="true"
      :lock-scroll="true"
      @close="close"
      title=""
      :close-on-click-modal="false">

    <div class="my-award">
      <ul class="tabs">
        <li v-for="(arr, index) in tabsList"
            :key="index"
            @click="tabActiveIndex = index"
            :class="{active: tabActiveIndex === index}"></li>
      </ul>

      <ul class="award-list">
        <li v-for="(item, index) in dataList" :key="index">
          <div class="award-box">
            <img :src="item.goods_pic" alt="">
          </div>
          <p>
            <Tooltip class="tooltip_2022" :content="item.goods_name" placement="bottom">
             {{ item.goods_name }}
            </Tooltip>
          </p>
        </li>
      </ul>
    </div>

    <i @click="close" class="close"></i>

  </el-dialog>
</template>

<script>
export default {
  name: 'viewAwardNewYear2023',
  props: ["visible", "list"],
  data() {
    return {
      tabsList: [[1, 2, 8], [1, 3, 4, 5, 6, 7]],
      tabActiveIndex: 0,
    }
  },
  computed: {
    dataList() {
      if (!this.list || !this.list.length) return []
      return this.list.filter(item => this.tabsList[this.tabActiveIndex].includes(item.goods_level))
    }
  },
  methods: {

    close() {
      this.$emit("update:visible", false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .view-award-new-year2023 {
  background-image: url("../../../../../assets/active/newYear2023/dialog_big.png");
  background-repeat: no-repeat;
  background-color: transparent;
  box-shadow: none;
  margin: 0 auto;
  height: 758px;
  .el-dialog__header {
    height: 0;
  }
  .el-dialog__body {
    padding: 0;
    height: inherit;
    position: relative;

    .my-award {
      overflow: hidden;
      width: 724px;
      margin: 0 auto;
      .tabs {
        margin-top: 220px;
        display: flex;
        li {
          margin: 0 16px;
          width: 318px;
          height: 78px;
          transition: background-image 0.1s;
          cursor: pointer;
          &:first-child {
            background: url("../../../../../assets/active/newYear2023/view_award_tab1.png") no-repeat center center;
          }
          &:last-child {
            background: url("../../../../../assets/active/newYear2023/view_award_tab2.png") no-repeat center center;
          }
          &.active {
            &:first-child {
              background: url("../../../../../assets/active/newYear2023/view_award_tab1_active.png") no-repeat center center;
            }
            &:last-child {
              background: url("../../../../../assets/active/newYear2023/view_award_tab2_active.png") no-repeat center center;
            }
          }
        }
      }

      .award-list {
        height: 368px;
        margin-top: 28px;
        overflow-x: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar-thumb {
          background-color: #d33711;
        }
        li {
          display: inline-block;
          width: 120px;
          margin-right: 25px;
          margin-bottom: 22px;
          &:nth-child(5n + 5) {
            margin-right: 0;
          }
          .award-box {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            box-shadow: inset 0 0 100px 0 rgba(0, 0, 0, 0.4);
            border: solid 4px #901212;
            background: #a31818;
            overflow: hidden;
            text-align: center;
            line-height: 120px;
            position: relative;
            &:before {
              position: absolute;
              content: "";
              width: 100%;
              height: 100%;
              left: 0;
              top: 0;
              background: url("../../../../../assets/active/newYear2023/pack_border.png") no-repeat center center;
              background-size: 100% 100%;
            }
            img {
              max-width: 96px;
              max-height: 92px;
            }
          }
          p {
            margin-top: 15px;
            font-size: 14px;
            text-align: center;
            color: #fefab9;
            .ivu-tooltip-rel {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
      }
    }

    .close {
      position: absolute;
      display: block;
      width: 62px;
      height: 63px;
      bottom: -87px;
      left: 427px;
      background: url("../../../../../assets/active/newYear2023/close_icon.png") no-repeat;
      cursor: pointer;
      transition:  background 0.1s;
      &:hover {
        background: url("../../../../../assets/active/newYear2023/close_icon_hover.png") no-repeat;
      }
    }
  }
}
</style>
