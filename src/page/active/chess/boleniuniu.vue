<template>
  <div class="boleniuniu active_page">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="active_section_box">
            <div class="active_title">
              {{$t("The_activity_time")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                {{initInfo.active_show_time}}
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Active_content")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
                活动期间，VIP会员进入【博乐棋牌】指定游戏「抢庄牛牛」「通比牛牛」投注，即可取得投注排行榜资格(限前200名)，活动截止后依照玩家累计有效投注额排行派发相应奖金。
                <table border="0" v-show="!load" align="center" cellspacing="0" width="100%">
                  <tbody>
                    <tr >
                      <td class="color_07f1b7">排行</td>
                      <td v-for="(item,index) in initInfo.active_setting" :key="index">{{item.rank}}</td>
                    </tr>
                    <tr >
                      <td class="color_07f1b7">奖金</td>
                      <td v-for="(item,index) in initInfo.active_setting" :key="index">{{item.bonus}}元</td>
                    </tr>
                  </tbody>
                </table>
                <div class="btn boleniuniu_btn">
                  <div class="d_btn normal"  @click="toBoleniuniu">
                    <div class="btn_loading_box " v-show="load"><span class="small_loading"></span></div>
                    立即游戏
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc"  >
              	1. 本活动不提供即时排名查询，活动奖金会于活动结束后由第三方客服发放至玩家博乐钱包中。<br>
                2. 若活动遇玩家有作弊行为则会取消其参赛资格。					<br>
                3. 此活动仅限有效投注额，若遇游戏故障则无效。	<br>
                4. 凡参与本活动者，即视为同意本活动办法及各项规范，主办单位保有活动最终解释权。
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn back_active_nav">
        <router-link to="/active" class="botton normal">{{$t("Return_to_activity_page")}}</router-link>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
export default {
  name: 'boleniuniu',
  components: {},
  data() {
     return {
       load:false,
       initInfo:{}
     }
  },
  mounted () {
    this.getInit()
  },
  computed: {
    ...mapState(["isLogin"]),
  },
  methods: {
    toBoleniuniu() {
      if(!this.isLogin) {
        this.$message({
          message: '请先登录',
          type: "warning"
        });
        return
      }
      window.open(this.initInfo.game_url)
    },
    getInit() {
      this.load = true
      this.$http(this.ApiSetting.active.getBlNiuniuInit)
      .then(res => {
        this.load = false
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
        }
      })
      .catch(res=>{
        this.load = false
      })
    },
  }
}
</script>
<style lang="less" scoped>
.boleniuniu{
  background: url("../../../assets/active/boleniuniu_banner.jpg") no-repeat center top;
  table {
    margin-top: 24px;
    font-size: 18px;
    border-top: #333548 1px solid;
    border-right: #333548 1px solid;
    color: #c3c3c3;
    text-align: center;
    td,th {
      line-height: 50px;
      border-left: #333548 1px solid;
      border-bottom: #333548 1px solid;
    }
  }
  .boleniuniu_btn {
    text-align: center;
    margin: 30px;
  }
}
</style>
