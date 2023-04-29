<template>
  <el-dialog
    custom-class="msi2023Record"
    :visible="visible"
    v-dir-center="visible"
    width="620px"
    :modal-append-to-body	="false"
    :lock-scroll="true"
    @close="close"
    @open="getDrawRecords"
    :close-on-click-modal="false">
    <div class="dialog-main">
      <ul :class="{'globe_loading':loading}">
        <li>
          <div>获奖日期</div>
          <div>奖品名称</div>
        </li>
        <template v-if="recordData.total>0">
          <template v-for="(item,index) in recordData.list">
            <li :key="index" >
              <div>{{item.date}}</div>
              <div>{{item.item_name}}</div>
            </li>
          </template>
        </template>
        <template v-else>
          <li>暂无数据</li>
        </template>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <div class="custom-page">
        <button class="l-btn" @click="handlePageChange(1)" :class="{'disabled':page.currentpage<=1}"></button>
        <div class="text"><b>{{page.currentpage}}</b><span>/</span>{{totalPage}}</div>
        <button class="r-btn" @click="handlePageChange(2)" :class="{'disabled':totalPage<=page.currentpage}"></button>
      </div>
    </span>
  </el-dialog>
</template>

<script>
import { RulesValidator } from "../../../../../utils/Validators"
export default {
  name: "msi2023Record",
  props: ["visible","isLogin"],
  data(){
    return{
      loading:false,
      recordData:{
        list:[],
        total:0
      },
      page:{
        pagesize:5,
        currentpage:1
      },
      totalPage:0,
    }
  },
  computed:{
    list(){
      return [...this.recordData.list]
    }
  },
  methods: {
    async getDrawRecords(){
      const rulesValidator = new RulesValidator([
        { validator: this.loading, message: "数据加载中，请稍后..." },
        { validator: this.isLogin === 0, message: "请您先登录" }
      ])
      if (rulesValidator.status) {
        this.loading = true
        try {
          const res = await this.$http(this.ApiSetting.active.msi2023.drawRecords,{page:this.page.currentpage,page_size:this.page.pagesize})
          if (res.status === 1) {
            this.recordData = res.data;
            this.totalPage = Math.ceil(res.data.total/this.page.pagesize)
          }
          this.loading = false
        } catch (e) {
          this.loading = false
          throw e
        }
      }else{
        this.loading = false
      }
    },
    close () {
      this.$emit("update:visible", false)
    },
    handlePageChange(type){
      this.page.currentpage = type==1 ? this.page.currentpage-1 : this.page.currentpage+1;
      this.getDrawRecords()
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .msi2023Record {
  box-shadow: none;
  height: 486px;;
  background: url("../../../../../assets/active/egame/msi2023/dialog-bg.png");
  position: relative;
  .el-dialog__header {
    background: url("../../../../../assets/active/egame/msi2023/win-notice-head-bg.png") no-repeat center 19px;
    background-size: 200px 23px;
    height: 94px;

    .el-dialog__headerbtn {
      width: 44px;
      height: 38px;
      top: 19px;
      right: 19px;
      transition: background 0.3s;
      background: url("../../../../../assets/active/egame/msi2023/dialog-close.png") no-repeat;

      &:hover {
        // background: url("../../../../assets/active/egame/csgoInParis/dialog_close_hover.png");
      }
      i {
        display: none;
      }
    }
  }

  .el-dialog__body {
    padding: 0;
    .dialog-main {
      ul{
        width: 583px;
        height: 325px;
        margin: 0 auto;
        overflow: hidden;
        li{
          display: flex;
          text-align: center;
          height: 50px;
          line-height: 50px;
          justify-content: space-evenly;
          border:1px solid;
          border-top:0;
          border-color: rgba(0, 0, 0, 0.1);
          &:first-child{
            border: 0;
            background-image: url("../../../../../assets/active/egame/msi2023/win-info-th-bg.png");
            background-size: 100% 100%;
            background-repeat: no-repeat no-repeat;
            color: #fdf6ee;
          }
          div{
            width: 40%;
          }
        }
      }
      text-align: center;

    }
  }
  .el-dialog__footer{
    display: flex;
    justify-content: center;
    .custom-page{
      width: 216px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text{
        font-size: 14px;
        color: #101010;
        font-style: italic;
        span{
          font-size: 10px;
          margin:0 3px 0 5px ;
        }
        b{
          font-size: 18px;

        }
      }
      button{
        cursor: pointer;
        width: 12px;
        height: 24px;
        background-size: 100% 100%;
        background-repeat: no-repeat no-repeat;
        border: 0;
        background-color: transparent;
        &.disabled {
          pointer-events: none;
          cursor: not-allowed;
        }
      }
      .l-btn{
        background-image: url("../../../../../assets/active/egame/msi2023/custom-page-l-btn.png");
        &:hover{
          background-image: url("../../../../../assets/active/egame/msi2023/custom-page-hover-r-btn.png");
          transform: rotateY(180deg);
        }
      }
      .r-btn{
        background-image: url("../../../../../assets/active/egame/msi2023/custom-page-r-btn.png");
        &:hover{
          background-image: url("../../../../../assets/active/egame/msi2023/custom-page-hover-r-btn.png");

        }
      }
    }
  }
}
</style>
