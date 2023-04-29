<template xmlns="http://www.w3.org/1999/html">
  <div class="index_aside">
    <!--军需官任务中心-->
    <div class="aside_box aside_jxg">
      <el-popover placement="left"
          trigger="hover"
          popper-class="whitecolor jxg-popover">
        <div class="qr_aside_wrapper_r">
          <br><p> 每日军需任务 </p><br>
        </div>
        <router-link slot="reference" to="/active/quartermaster" >
          <span class="icon">
            <!-- <svg width="35px" height="20px">
              <polyline class="tick" fill="none" stroke="#07f1b7" stroke-width="3" points="9,8 14,13 24,4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>-->
          </span>
          <p class="desc">军需任务</p>
        </router-link>
      </el-popover>
    </div>
    <!--在线客服-->
    <div class="aside_box aside_kf">
        <el-popover placement="left"
        trigger="hover"
        popper-class="whitecolor big_style right_kf_popover"
        @show="toOpenKfWindow">
        <div class="qr_aside_wrapper_r right_kf">
          <h3>客户服务中心</h3>
          <p>7*24h专业客服，为您服务</p>
          <template v-if="!onlyKfUrlLoading && $store.state.kfUrlByList.length">
            <ul v-if="$store.state.kfUrlByList.length > 1" class="aside_kf_box">
              <li v-for="(item, index) in $store.state.kfUrlByList"
                  :class="[index === 0 ? 'button_primary_2022' : 'button_plain_2022']"
                  :key="index"
                  @click="openKfWindow(false, index, true)">
                {{ item.name }}
              </li>
            </ul>
            <ul v-else class="aside_kf_box">
              <li class="button_primary_2022"
                  style="width: 100%"
                  @click="openKfWindow(false, 0, true)">
                {{ $store.state.kfUrlByList[0].name }}
              </li>
            </ul>
          </template>
          <div class="loader full_screen" v-else><span></span></div>
        </div>
        <a href="javascript:;" slot="reference">
          <span class="icon"></span>
          <p class="desc">在线客服</p>
        </a>
        </el-popover>
    </div>


    <!--任务中心-->
    <!-- <div class="aside_box aside_task" v-if="isLogin">
        <el-popover placement="left"
        trigger="hover"
        popper-class="whitecolor big_style">
        :content="$t('The_task_center')">
          <div class="qr_aside_wrapper_r">
            <p><br>&nbsp;&nbsp;{{$t('The_task_center')}}&nbsp;&nbsp;<br><br></p>
          </div>
          <router-link slot="reference" to="/user/task/">
            <span class="icon">
              <i class="task_count"
              :class="{'disable': taskCount.finish === 0}"
              v-if="taskCount.count>0">{{taskCount.count}}
              </i>
            </span>
          </router-link>
        </el-popover>
    </div>-->


    <!-- 防劫持教程-->
    <div class="aside_box hijacking">
      <el-popover placement="left"
                  trigger="hover"
                  popper-class="whitecolor jxg-popover">
        <div class="qr_aside_wrapper_r">
          <br><p> 防劫持教程 </p><br>
        </div>
        <router-link slot="reference" to="/guide/17" >
          <span class="icon"></span>
          <p class="desc">防劫持教程</p>
        </router-link>
      </el-popover>
    </div>

    <!--app下载二维码-->
    <!-- <div class="aside_box aside_mobile">
        <el-popover placement="left"  trigger="hover"
        popper-class="whitecolor big_style aside_mobile_popover">
          <div class="qr_aside_wrapper_r">
            <div class="qr_img_box">
              <img :src="userInfo.is_super?'/pc_static/defaultimg/qr_img_vip.png':'/pc_static/defaultimg/qr_img.png'" alt="">
              <img :src="'/pc_static/defaultimg/qr_img_vip.png'" alt="">
            </div>
            <p class="qr_img_txt">VKGAME APP<br/>{{$t('Scan_code_to_download')}}</p>
          </div>
        <router-link slot="reference" to="/appshow">
          <span class="icon"></span>
          <p class="desc">APP下载</p>
        </router-link>
        </el-popover>
    </div>-->
    <!--线路测速-->
    <div class="aside_box aside_speed_test">
      <el-popover placement="left-start"  trigger="hover"
        popper-class="whitecolor big_style aside_hover_speed">
        <div class="popover_content">
          <speed-test :visible="speedTestPopVisible"></speed-test>
        </div>
        <div class="box_inner" slot="reference"
          @mouseenter="speedTestPopVisible = true"
          @mouseleave="speedTestPopVisible = false">
          <span class="icon_speed_test icon"></span>
          <p class="desc">域名测速</p>
        </div>
      </el-popover>
    </div>
    <!--合营模式-->
    <div class="aside_box aside_proxy_apply">
      <el-popover placement="left"
       trigger="hover"
       popper-class="whitecolor big_style proxy_apply">
        <div class="qr_aside_wrapper_r">
          <router-link slot="reference" to="/jointly" class="button_primary_2022">加盟vk 稳获返佣</router-link>
        </div>
        <a slot="reference" href="/jointly">
          <span class="icon"></span>
          <p class="desc">返佣53%</p>
        </a>
      </el-popover>
    </div>
    <BackTop>
      <div class="to_top">
        <span class="icon"></span>
        <p class="desc">TOP</p>
      </div>
    </BackTop>
  </div>
</template>

<script>
import SpeedTest from "./speedtest";
import {mapActions, mapMutations, mapState} from 'vuex'
export default {
  name: "rightaside",
  components: {
    SpeedTest
  },
  data() {
    return {
      speedTestPopVisible: false,
      onlyKfUrlLoading: false
    };
  },
  computed: {
    ...mapState(["isLogin", "taskCount"])
  },
  methods: {
    ...mapActions(["getOnlyKfUrl"]),
    toOpenKfWindow() {
      this.onlyKfUrlLoading = true
      this.getOnlyKfUrl().finally(() => {
        this.onlyKfUrlLoading = false
      })
    }
  }
};
</script>

<style lang="less">
@keyframes jump{
  0%{transform:translate(0)}
  10%{transform:translateY(5px) scaleX(1.2) scaleY(.8)}
  30%{transform:translateY(-13px) scaleX(1) scaleY(1) rotateZ(5deg)}
  50%{transform:translateY(0) scale(1) rotateZ(0)}
  55%{transform:translateY(0) scaleX(1.1) scaleY(.9) rotateZ(0)}
  70%{transform:translateY(-4px) scaleX(1) scaleY(1) rotateZ(-2deg)}
  80%{transform:translateY(0) scaleX(1) scaleY(1) rotateZ(0)}
  85%{transform:translateY(0) scaleX(1.05) scaleY(.95) rotateZ(0)}
  100%{transform:translateY(0) scaleX(1) scaleY(1)}
}

.index_aside {
  position: fixed;
  z-index: 99;
  right: 0;
  bottom: 20%;
  width: 72px;
  border-radius: 10px;
  overflow: hidden;
  padding: 13px 0;
  background-color: #313746;
  .to_top{
    border-top: 0.1px solid transparent;
    width: 100%;
    height: 60px;
    cursor: pointer;
    transition: background 0.2s;
    .icon {
      display: block;
      margin: 9px auto 0;
      width: 20px;
      height: 21px;
      background: url("../assets/home/aside_to_top.png");
    }
    &:hover{
      .icon {
        background: url("../assets/home/aside_to_top_hover.png");
        animation: jump ease 1.5s 1;
      }
      .desc {
        color: #07f1b7;
      }
    }
    .desc {
      margin-top: 9px;
      font-size: 13px;
      font-weight: 600;
      line-height: 13px;
      text-align: center;
      color: #7c88a5;
    }
  }
  .aside_box {
    &:hover {
      .desc {
        color: #07f1b7;
      }
    }
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    &.aside_jxg {
      .icon {
        width: 18px;
        height: 22px;
        background: url("../assets/home/aside_jxg.png");

        // SVG动画 old
        .tick {
          stroke-dasharray: 21;
          stroke-dashoffset: 0;
          animation: tick-animate 1.3s;
          animation-iteration-count: infinite;
        }
        @keyframes tick-animate {
          0% {
            stroke-dashoffset: 22;
          }
          80% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      }
      &:hover {
        .icon {
          background: url("../assets/home/aside_jxg_hover.png");
        }
      }
    }
    &.aside_kf {
      .icon {
        width: 18px;
        height: 19px;
        background: url("../assets/home/aside_kf.png");
      }
      &:hover {
        .icon {
          background: url("../assets/home/aside_kf_hover.png");
        }
      }
    }

    &.aside_task {
      .icon {
        width: 100%;
        height: 66px;
        position: relative;
        background-position: -680px -307px;
      }
      .task_count {
        position: absolute;
        width: 26px;
        height: 26px;
        top: 4px;
        right: 2px;
        border-radius: 50%;
        color: #fff;
        line-height: 26px;
        text-align: center;
        background-color: #e34d12;
        box-sizing: border-box;
        font-size: 14px;
        &.disable {
          line-height: 24px;
          border: 1px solid #e34d12;
          background-color: #262933;
        }
      }
    }
    &.aside_proxy_apply {
      border-bottom: 0;
    }
    &.aside_speed_test {
      .icon {
        width: 19px;
        height: 19px;
        background: url("../assets/home/aside_speed.png");
      }
      &:hover {
        .icon {
          background: url("../assets/home/aside_speed_hover.png");
        }
      }
      .aside_hover_speed {
        &.el-popover {
          padding: 0;
        }
      }
    }
    &.aside_proxy_apply {
      .icon {
        width: 22px;
        height: 18px;
        background: url("../assets/home/aside_proxy.png");
      }
      &:hover {
        .icon {
          background: url("../assets/home/aside_proxy_hover.png");
        }
      }
    }
  }
}
.qr_aside_wrapper_r {
  color: #fff;
  text-align: center;
  overflow: hidden;
  .qr_img_box {
    width: 120px;
    height: 118px;
    margin: 91px auto 0 42px;
    background-color: #ffffff;
    img {
      margin-top: 5px;
      width: 108px;
    }
  }
  .qr_img_txt {
    width: 120px;
    margin: 3px auto 0 42px;
  }
}
.whitecolor {
  color: #fff;
}
.jxg-popover {
  border-radius: 10px;
  background-color: #313746;
  margin-right: 14px!important;
  border: 0;
  padding: 0 12px;
  &[x-placement^=left] {
    .popper__arrow {
      border-left-color: transparent;
    }
  }
  .popper__arrow {
    right: -14px!important;
    border-width: 14px;
    &::after {
      right: 6px!important;
      bottom: -9px!important;
      border-width: 8px;
      border-left-color: #313746!important;
    }
  }
}
/*与新手引导共用*/
.aside_box {
  height: 60px;
  line-height: 33px;
  text-align: center;
  border-top: 0.1px solid transparent;
  .icon {
    margin: 9px auto 7px;
    display: block;
  }
  .desc {
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    color: #7c88a6;
    width: 100%;
    line-height: 13px;
  }
  &.hijacking {
    .icon {
      width: 18px;
      height: 24px;
      background: url("../assets/home/aside_hijacking.png");
    }
    &:hover {
      .icon {
        background: url("../assets/home/aside_hijacking_hover.png");
      }
    }
  }
  &.aside_mobile {
    .icon {
      width: 18px;
      height: 24px;
      background: url("../assets/home/aside_mobile.png");
    }
    &:hover {
      .icon {
        background: url("../assets/home/aside_mobile_hover.png");
      }
    }
  }
  &:hover {
    .icon {
      animation: jump ease 1.5s 1;
    }
  }
}
.proxy_apply {
  margin-top: 0!important;
  padding: 0;
  width: 252px;
  height: 284px;
  background: url("../assets/home/proxy_apply.png");
  .button_primary_2022 {
    display: block;
    margin: 200px auto 0;
    width: 180px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    font-weight: 600;
    box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.35), inset 0 2px 0 0 rgba(201, 253, 238, 0.47);
  }
}

.big_style {
  margin-right: 0!important;
  border: 0;
  padding: 0;
  margin-top: 30px;
  box-shadow: none;
  &[x-placement^=left] {
    .popper__arrow {
      border-left-color: transparent;
    }
  }
  .popper__arrow {
    right: -14px!important;
    border-width: 14px;
    &::after {
      right: 6px!important;
      bottom: -9px!important;
      border-width: 8px;
      border-left-color: #313746!important;
    }
  }
}
.right_kf_popover {
  width: 233px;
  height: 160px;
  background: url("../assets/home/line_popover_bg.png") no-repeat;
  .right_kf {
    width: calc(100% - (31.5px * 2));
    margin: 0 auto;
    text-align: left;
    h3 {
      font-size: 16px;
      line-height: 16px;
      color: #ffffff;
      margin-top: 41px;
    }
    p {
      margin-top: 7px;
      font-size: 14px;
      line-height: 14px;
      color: #acbae2;
    }
    .aside_kf_box {
      margin-top: 9px;
      display: flex;
      justify-content: space-between;
      li {
        width: 80px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        cursor: pointer;
        border-radius: 15px;
        &.button_plain_2022 {
          border-width: 1px;
          line-height: 27px;
        }
      }
    }
    .loader {
      margin-top: 5px;
    }
  }
}
.aside_mobile_popover {
  width: 187px;
  height: 282px;
  background: url("../assets/home/aside_mobile_popover.png") no-repeat;
}
.aside_hover_speed {
  margin-top: -160px;
  width: 252px;
  height: 359px;
  background: url("../assets/home/aside_hover_speed.png");
  .popover_content {
    width: 228px;
    margin: 14px auto 0;
  }
}
</style>
