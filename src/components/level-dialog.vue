<template>
  <el-dialog
    :custom-class="'pure_dialog levelwarn'"
    :visible.sync="levelInfo.isShow"
    :append-to-body="true"
    :lock-scroll="true"
    >
    <!--levelInfo.type 11是降级 10是保级  9是升级 12是vip系统才上线的所有会员提示   升级的弹窗样式-->
    <div class="levelwarn_wapper" 
     :class="{'dispirited':levelInfo.type==11,'grading':levelInfo.type==10,
     'happy_classic':(levelInfo.type==9||levelInfo.type==12)&&levelInfo.level==1,
     'happy_gold':(levelInfo.type==9||levelInfo.type==12)&&(levelInfo.level>=2&&levelInfo.level<=4),
     'happy_platinum':(levelInfo.type==9||levelInfo.type==12)&&(levelInfo.level>=5&&levelInfo.level<=7),
     'happy_diamond':(levelInfo.type==9||levelInfo.type==12)&&(levelInfo.level>=8&&levelInfo.level<=10),
     'happy_honour':(levelInfo.type==9||levelInfo.type==12)&&levelInfo.level==11,
     'happy_premier':(levelInfo.type==9||levelInfo.type==12)&&levelInfo.level==12,
     'happy':levelInfo.type==9||levelInfo.type==12}">
      <div class="level_close" @click="levelWarnClose()"></div>
      <!-- <h3 v-show="levelInfo.type==9||levelInfo.type==12" v-html="levelInfo.title"></h3> -->
      <!-- <p v-show="levelInfo.type==9||levelInfo.type==12">您已获得{{levelInfo.vip_name}}勋章，将享受如下特权：</p> -->

      <h3 v-html="levelInfo.title">{{levelInfo.title}}</h3>
      <p  v-html="levelInfo.message" v-show="levelInfo.type!=10"></p>

      <!-- <h3 v-show="levelInfo.type==10">
        恭喜您<br>
        VIP{{levelInfo.level}}会员保级成功
      </h3> -->

       <div @click="levelWarnClose()">
       <router-link to="vipsystem" class="level_btn" v-show="levelInfo.type"> 
         {{levelInfo.type==11?'查看VIP升级规则':(levelInfo.type==9?'解锁'+levelInfo.vip_name+'勋章':'查看我的特权')}}
        </router-link>
       </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "level-dialog",
  data() {
    return {};
  },
  computed: {
    ...mapState(["levelInfo"])
  },
  mounted() {},
  methods: {
    //等级信息提示关闭
    levelWarnClose(){
      this.$store.commit('setStoreValue', {name:'levelInfo',value:false});
      this.$store.dispatch('getIndexAlert');
    },
  }
};
</script>

<style scoped lang="less">
/*等级提醒*/
.levelwarn {
  .levelwarn_wapper {
    padding: 1px;
    text-align: center;
    width: 630px;
    margin: -50px auto 0;
    height: 655px;
    position: relative;
    .level_close {
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translateX(-50%);
      width: 32px; 
      height: 32px;
      background: url("../assets/vipsystemnew/close.png") no-repeat;
      cursor: pointer;
      &:hover  {
        background: url("../assets/vipsystemnew/close_h.png") no-repeat;
      }
    }
    .level_btn {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 100px;
      width: 301px;
      height: 70px;
      border-radius: 34.5px;
      background-image: linear-gradient(to right, #dbb292, #f8dfc4);
       box-shadow: -1px 2.8px 7px 0 rgba(0, 0, 0, 0.28);
      background-color: #dbb292;
      font-size: 24.5px;
      font-weight: bold;
      color: #78482f;
      line-height: 70px;
      text-align: center;
      &:hover {
        opacity: 0.9;
      }
    }
    h3 {
      font-size: 40px;
      letter-spacing: 5px;
    }
    p { 
      font-size: 18.5px;
      text-align: left;
    }
    /*升级*/
    &.happy {
      background-size: 630px 655px;
      &.happy_classic {
        background:url("../assets/vipsystemnew/popup/1.png") center top no-repeat;
        h3 {
          margin-top: 165px;
        }
      } 
      &.happy_gold {
        background:url("../assets/vipsystemnew/popup/2-4.png") center top no-repeat;
      }
      &.happy_platinum,&.happy_diamond,&.happy_honour,&.happy_premier {
        background:url("../assets/vipsystemnew/popup/5-12.png") center top no-repeat;
      }
      h3 {
        text-align: left;
        margin-top: 60px;
        margin-left: 150px;
        font-size: 37.5px;
        color: #78482f;
      }
      p {
        width: 500px;
        color: #875940;
        margin : 6px 0 0 150px;
      }
    } 
    /*降级*/
    &.dispirited {
      margin-top: -130px;
      background:url("../assets/vipsystemnew/popup/box_dispirited.png") center top no-repeat;
      h3 {
       margin-top: 220px;
       color: #f2eded;
      }
      p {
        margin-top: 20px;
        padding: 0 140px;
        color: #f2eded;
      }
    }
    /*保级*/
    &.grading {
      background:url("../assets/vipsystemnew/popup/grading.png") center top no-repeat; 
      h3 {
        margin-top: 220px;
        color:#7a492f;
      }
    }
  }
}

</style>
