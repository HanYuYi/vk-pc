<template>
  <el-dialog
    custom-class="csgo-in-paris-record"
    :visible="visible"
    v-dir-center="visible"
    title="抽奖记录"
    width="620px"
    :append-to-body="true"
    :lock-scroll="true"
    @close="close"
    :close-on-click-modal="false">

    <div class="dialog-main">

      <dl :class="{'no-data': !recordData || !recordData.length}">
        <dt>
          <div>奖品名称</div>
          <div>获取日期</div>
        </dt>
        <dd>
          <ul>
            <li v-for="(item, index) in recordData" :key="index">
              <div>{{ item.item_name }}</div>
              <div>{{ item.create_time }}</div>
            </li>
          </ul>
        </dd>
      </dl>
    </div>

  </el-dialog>

</template>

<script>
export default {
  name: "csgoInParisRecord",

  props: ["visible", "recordData"],

  methods: {
    close () {
      this.$emit("update:visible", false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .csgo-in-paris-record {
  box-shadow: none;
  height: 490px;
  background: url("../../../../assets/active/egame/csgoInParis/dialog_bg.png");

  .el-dialog__header {
    background: transparent;
    height: 88px;

    .el-dialog__title {
      display: inline-block;
      width: 100%;
      font-size: 28px;
      line-height: 88px;
      text-align: center;
      color: #fff;
    }

    .el-dialog__headerbtn {
      width: 60px;
      height: 56px;
      transition: background 0.3s;
      background: url("../../../../assets/active/egame/csgoInParis/dialog_close.png");

      &:hover {
        background: url("../../../../assets/active/egame/csgoInParis/dialog_close_hover.png");
      }

      i {
        display: none;
      }
    }
  }

  .el-dialog__body {
    padding: 0;

    .dialog-main {

      dl {
        width: 556px;
        height: 346px;
        margin: 24px auto 0;
        text-align: center;
        color: rgba(255, 255, 255, 0.8);
        background: url("../../../../assets/active/egame/csgoInParis/dialog_table_bg.png");

        dt {
          line-height: 48px;
          display: flex;
          font-size: 16px;
          justify-content: space-evenly;
          div {
            width: 40%;
          }
        }

        dd {
          ul {
            height: 296px;
            overflow: auto;
            &::-webkit-scrollbar {
              background-color: transparent;
              width: 10px;
              height: 4px;
            }
            &::-webkit-scrollbar-thumb {
              background-color: #506782;
            }

            li {
              font-size: 14px;
              line-height: 56px;
              display: flex;
              justify-content: space-evenly;
              border-bottom: solid 1px #1e2b39;
              &:last-child {
                border: 0;
              }

              div {
                width: 40%;
                color: #ffffff;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &:last-child {
                  color: rgba(255, 255, 255, 0.6);
                }
              }
            }
          }
        }

        &.no-data {
          position: relative;
          &::after {
            position: absolute;
            inset: 0;
            top: 50px;
            content: "暂无开箱记录，快去参与活动吧！";
            line-height: 390px;
            text-align: center;
            font-size: 16px;
            color: rgba(255, 255, 255, 0.6);
            width: 100%;
            height: 296px;
            background: url("../../../../assets/active/egame/csgoInParis/no_data_icon.png") no-repeat center 84px;
          }
        }
      }
    }
  }
}
</style>
