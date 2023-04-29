<template>
  <div class="jointly">
    <div class="bg_ligth"></div>
    <div class="bg_boll"></div>
    <div class="bg_tit"></div>
    <div class="apply_btn headShake" @click="apply">立即申请代理</div>
    <div class="content"
      :class="{'aos-animate':animations.one}"
      aos="fade-up">
      <ul class="step " >
        <li>
          <div class="circle"></div>
          <p>更安全</p>
        </li>
        <li>
          <div class="circle"></div>
          <p>更专业</p>
        </li>
        <li>
          <div class="circle"></div>
          <p>更多样</p>
        </li>
        <li>
          <div class="circle"></div>
          <p>更效率</p>
        </li>
      </ul>
      <!--合营计划-->
      <section class="concat">
        <img class="proportion_title" src="../assets/newjointly/title0.png" alt="">
        <p class="concat-btn" @click="openKfWindow(true)">在线咨询</p>
        <p class="concat-time">代理专员工作时间：12:00—21:00</p>
        <ul class="concat-right">
          <li class="skype">
            <p>
              Skype账号：
              <a :href="contact_info.skype_link" target="_blank">{{contact_info.skype_user}}</a>
            </p>
            <span class="copy" @click="doCopy(contact_info.skype_user)">复制</span>
          </li>
          <li class="telegram">
            <p>
              Telegram账号：
              <a :href="contact_info.telegram_link" target="_blank">{{contact_info.telegram_user}}</a>
            </p>
            <span class="copy" @click="doCopy(contact_info.telegram_user)">复制</span>
          </li>
          <li class="letstalk">
            <p>
              Letstalk账号：
              <a href="javascript:void(0)" @click="doCopy(contact_info.letstalk_user)">{{contact_info.letstalk_user}}</a>
            </p>
            <span class="copy" @click="doCopy(contact_info.letstalk_user)">复制</span>
          </li>
          <li class="mosGram">
            <p>
              MosGram账号：
              <a href="javascript:void(0)" @click="doCopy(contact_info.mosgram_user)">{{contact_info.mosgram_user}}</a>
            </p>
            <span class="copy" @click="doCopy(contact_info.mosgram_user)">复制</span>
          </li>
        </ul>
      </section>
      <!--佣金占比-->
      <section class="proportion">
        <img class="proportion_title" src="../assets/newjointly/title1.png" alt="">
        <table border="0"    >
          <tr class="tr_th">
            <td>盈利</td>
            <td>活跃<br>玩家</td>
            <td>佣金比</td>
            <td>二次<br>充值会员</td>
            <td>奖励<br>佣金比</td>
            <td>奖励后<br>佣金比</td>
          </tr>
          <tr>
            <td><span>800,001以上</span></td>
            <td>≥30</td>
            <td>50%</td>
            <td>≥55</td>
            <td>3%</td>
            <td>53%</td>
          </tr>
          <tr>
            <td><span>500,001~800,000</span></td>
            <td>≥25</td>
            <td>45%</td>
            <td>≥40</td>
            <td>3%</td>
            <td>48%</td>
          </tr>
          <tr>
            <td><span>300,001~500,000</span></td>
            <td>≥15</td>
            <td>40%</td>
            <td>≥25</td>
            <td>3%</td>
            <td>43%</td>
          </tr>
          <tr>
            <td><span>80,001~300,000</span></td>
            <td>≥10</td>
            <td>35%</td>
            <td>≥15</td>
            <td>3%</td>
            <td>38%</td>
          </tr>
          <tr>
            <td><span>1～80,000</span></td>
            <td>≥5</td>
            <td>30%</td>
            <td>≥8</td>
            <td>3%</td>
            <td>33%</td>
          </tr>
        </table>
        <div class="proportion_im" >
          <b>完整数据后台</b>
          <p>随时查询佣金出入详情</p>
        </div>
      </section>
      <!--佣金计算 结算规则-->
      <section class="equation"  >
        <div class="fl" :class="{'slideInLeft':animations.three}">
          <img class="proportion_title" src="../assets/newjointly/title2.png" alt="">
          <p class="shli">以下为示例</p>
          <div class=" formula">
            <p class="gray_bg">
              <span>游戏总输赢</span>
              <span>10000</span>
            </p>
            <p class="block_bg">
              <span>- 平台费</span>
              <span>-1500</span>
            </p>
            <p class="no_bg">平台费=游戏总输赢x15%</p>
            <p class="block_bg">
              <span>- 红利</span>
              <span>-20</span>
            </p>
            <p class="no_bg">返水，红利，存提手续费后台可见明细</p>
            <p class="block_bg block_bg1">
              <span>=净利润</span>
              <span>8480</span>
            </p>
            <p class="block_bg block_bg2">
              <span>x佣金比例</span>
              <span>x33%</span>
            </p>
            <p class="gray_bg">
              <span>总佣金</span>
              <span>2798.4</span>
            </p>
          </div>
        </div>
         <div class="equation_r fr" :class="{'slideInRight':animations.three}">
          <img class="proportion_title" src="../assets/newjointly/title3.png" alt="">
          <div class="eqcon">
            <b>结算时间</b>：本站每月1日00:00开始计算，到月底24:00，每月结算一次。<br>
            <b>到账时间</b>：本站每月7号统一发放代理薪资。<br>
            <b>结算规则</b>：5个活跃玩家计算佣金。
          </div>
          <div class="eqcon eqcontw">
            <b>活跃玩家定义</b>
            <p>
              当月存款≥500，流水≥1000为一个活跃玩家。如在每期结算时利润出现
              负值，所负金额由本网先垫付给客户，负盈利将会累积入下期的结算中。
            </p>
          </div>
         </div>
      </section>
      <!--责任与条款-->
      <section class="duty " :class="{'aos-animate':animations.four}"
      aos="fade-up">
        <img class="proportion_title" src="../assets/newjointly/title4.png" alt="">
        <p class="rule">
          1. 代理有责任去推广自己的站点，开发市场及寻找优质客户。<br>
          2. 代理不能作出任何损害本站声誉的行为。<br>
          3. 代理在未经本站同意下，不能以本网的名义发布任何有关本网站的消息。<br>
          4. 代理若违反了任何一条合作条款，本网有权利立即终止合作关系，并取消其可获得的一切薪资。<br>
          5. 代理有责任监察其下线客户的一切活动，如发现代理的下线客户对本站做出违反本站用户条款的行为，本站有权冻结处理代理及代理下线客户账户，有权取消代理账户的佣金。<br>
          6. 代理相关条款最终解释权归VKGAME所有。
        </p>
      </section>
    </div>
    <!--申请弹窗-->
    <el-dialog
      :close-on-click-modal="false"
      :custom-class="'pure_dialog jointly_dialog'"
      :visible.sync="showDialog"
      :append-to-body="true"
      :top="'10vh'">
       <div class="jointly_dialog_box" :class="{step2: dialogStep === 2}">
         <div class="close" @click="showDialog=false"></div>
         <template v-if="dialogStep === 1">
           <h3>合作加盟申请</h3>
           <div class="form_wrapper">
               <div class="form_box clear">
                   <div class="left fl">
                       VKGAME账户
                   </div>
                   <div class="right fl">
                       <span class="main_color">{{baseInfo.username}}</span>
                   </div>
               </div>
               <div class="form_box clear">
                   <div class="left fl">
                       银行卡
                   </div>
                    <div class="right fl" v-if="baseInfo.hasBank">
                       已绑定
                   </div>
                    <div class="right fl" v-else>
                         <span class="link" @click="tolink('/user/infosetting/bank')">去绑定</span>
                        <span class="tips">（请先绑定银行卡再申请）</span>
                   </div>
                </div>
               <div class="form_box clear">
                   <div class="left fl">
                       手机号
                   </div>
                    <div class="right fl" v-if="baseInfo.hasTel">
                       已绑定
                   </div>
                   <div class="right fl" v-else>
                         <span class="link"  @click="tolink('/user/infosetting/safeset')">去绑定</span>
                        <span class="tips">（请先绑定手机号再申请）</span>
                   </div>
                </div>
               <div class="form_box clear">
                   <div class="left fl">
                       QQ号
                   </div>
                   <div class="right fl">
                       <input v-model="qqnum" type="number" class="ivu-input" placeholder="请输入您的QQ号">
                   </div>
               </div>
               <div class="form_box clear">
                   <div class="left fl">
                    Mosgram
                   </div>
                   <div class="right fl">
                     <input v-model="flygramNum" type="text" class="ivu-input" placeholder="请输入您的Mosgram账号">
                   </div>
               </div>
               <div class="form_box clear">
                   <div class="left fl">
                     Telegram
                   </div>
                   <div class="right fl">
                     <input v-model="telegramNum" type="text" class="ivu-input" placeholder="请输入您的Telegram账号">
                   </div>
               </div>
               <div class="form_box clear">
                   <div class="left fl">
                       推广方式
                   </div>
                   <div class="right fl">
                       <input v-model="content" placeholder="请输入内容" class="ivu-input" id="content"/>
                   </div>
               </div>
           </div>
           <div class="confirm_btn" @click="confirmApply">确定加入</div>
         </template>
         <template v-else-if="dialogStep === 2">
           <h3>申请成功 请耐心等待审核</h3>
           <p class="desc">代理合作详情请联系客服</p>
           <div class="confirm_btn" @click="openKfWindow(true);showDialog = false">联系客服</div>
         </template>
         <div class="concat">
           <p class="concat-time">客服工作时间：12:00-21:00</p>
           <ul class="concat-bottom">
            <li class="skype">
              <p>
                Skype账号：
                <a :href="contact_info.skype_link" target="_blank">{{contact_info.skype_user}}</a>
              </p>
              <span class="copy" @click="doCopy(contact_info.skype_user)">复制</span>
            </li>
            <li class="telegram">
              <p>
                Telegram账号：
                <a :href="contact_info.telegram_link" target="_blank">{{contact_info.telegram_user}}</a>
              </p>
              <span class="copy" @click="doCopy(contact_info.telegram_user)">复制</span>
            </li>
            <li class="letstalk">
              <p>
                Letstalk账号：
                <a href="javascript:void(0)" @click="doCopy(contact_info.letstalk_user)">{{contact_info.letstalk_user}}</a>
              </p>
              <span class="copy" @click="doCopy(contact_info.letstalk_user)">复制</span>
            </li>
            <li class="mosGram">
              <p>
                MosGram账号：
                <a href="javascript:void(0)" @click="doCopy(contact_info.mosgram_user)">{{contact_info.mosgram_user}}</a>
              </p>
              <span class="copy" @click="doCopy(contact_info.mosgram_user)">复制</span>
            </li>
           </ul>
         </div>
       </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'jointly',
  data () {
    return {
      showDialog: false,
      contact_info: {},
      qqnum: '',
      flygramNum: '',
      telegramNum: '',
      content: '',
      load: false,
      baseInfo: {},
      dialogStep: 1,
      animations: {
        one: false,
        two: false,
        three: false,
        four: false
      }
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  mounted () {
    setTimeout(() => {
      this.animations.one = true
    }, 500)
    this.getProxyInfoInit()
    window.addEventListener('scroll', this.aninScroll, false)
  },
  destroyed () {
    window.removeEventListener('scroll', this.aninScroll)
  },
  methods: {
    // 动画
    aninScroll () {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      this.animations.two = scrollTop >= 10
      this.animations.three = scrollTop >= 310
      this.animations.four = scrollTop >= 800
    },
    // 初始化
    getProxyInfoInit () {
      this.$http(this.ApiSetting.getProxyInfoInit).then(res => {
        console.info("初始化代理合营数据：", res)
        if (res.status == 1 && res.data) {
          this.baseInfo = res.data
          this.contact_info = res.data.contact_info
          if (res.data.proxy_cs_link) {
            this.$store.commit('setProxyKFUrl', res.data.proxy_cs_link)
          }
        }
      })
    },
    apply () {
      if (!this.isLogin) {
        this.$router.push({ path: '/login' })
      } else {
        if (this.baseInfo.isProxy) {
          this.$message({
            message: '恭喜您申请成功，我们会尽快与您联系',
            type: 'success'
          })
          return
        }
        if (this.baseInfo.isApplying) {
          this.dialogStep = 2
          this.showDialog = true
          return
        }
        this.showDialog = true
        this.qqnum = ''
        this.flygramNum = ''
        this.telegramNum = ''
        this.content = ''
      }
    },
    tolink (link) {
      this.showDialog = false
      this.$router.push({ path: link })
    },
    confirmApply () {
      if (!this.baseInfo.hasBank) {
        this.$message({
          message: '请先绑定银行卡',
          type: 'warning'
        })
        return false
      }
      if (!this.baseInfo.hasTel) {
        this.$message({
          message: '请先绑定手机号',
          type: 'warning'
        })
        return false
      }
      if ((this.qqnum == '' && this.flygramNum == '' && this.telegramNum == '') || this.content == '') {
        this.$message({
          message: '请填写完整信息',
          type: 'warning'
        })
        return false
      }
      if (this.load) {
        return
      }
      this.load = true
      this.$http(this.ApiSetting.ProxyApply, {
        qq: this.qqnum,
        flygram: this.flygramNum,
        telegram: this.telegramNum,
        content: this.content
      })
        .then(res => {
          this.load = false
          if (res.status == 1) {
            this.getProxyInfoInit()
            this.dialogStep = 2
          } else if (res.message) {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        })
        .catch(() => {
          this.load = false
        })
    },
		doCopy(text) {
      this.$copyText(text).then((e) => {
        this.$message({
          message: '复制账号成功！',
          type: 'success'
        })
      }, function (e) {
        this.$message({
          message: this.$t("Copy_the_failure"),
          type: 'warning'
        })
      })
		},
  }
}
</script>

<style scoped lang="less">
.jointly {
  width: 100%;
  overflow: hidden;
  background-image: linear-gradient(to top, #1a1b22 0%, #151565 90%);
  padding-top: 330px;
  padding-bottom: 50px;
  box-sizing: border-box;
  position: relative;
  .bg_ligth,
  .bg_boll,
  .bg_tit {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .bg_ligth {
    z-index: 0;
    width: 1917px;
    height: 1752px;
    top: 690px;
    background: url("../assets/newjointly/bg-bo.png") no-repeat;
    background-size: 100% 100%;
  }
  .bg_boll {
    z-index: 0;
    width: 1920px;
    height: 699px;
    top: 0;
    background: url("../assets/newjointly/bg-boll.png") no-repeat;
    background-size: 100% 100%;
  }
  .bg_tit {
    top: 120px;
    width: 708px;
    height: 181px;
    background: url("../assets/newjointly/bg_tit.png") no-repeat;
    background-size: 100% 100%;
    animation-delay: 0.2s;
  }

  .step {
    width: 1210px;
    margin: 25px auto 0;
    overflow: hidden;
    animation-delay: 0.5s;
    display: flex;
    justify-content: center;
    li {
      float: left;
      width: 186px;
      height: 240px;
      margin-right: 50px;
      background: url("../assets/newjointly/adv-bg.png") no-repeat center top;
      background-size: 100% 202px;
      cursor: pointer;
      transition: background 0.3s,color 0.3s;
      color: #fff;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      &:hover {
        background: url("../assets/newjointly/adv-bghover.png") no-repeat;
        background-size: 100% 202px;
        color: #07f1b7;
      }
      &:last-child {
        margin-right: 0;
      }
      .circle {
        width: 186px;
        height: 186px;
        margin-top: 8px;
        background-size: 70px 70px;
        background-position: center center;
        background-repeat: no-repeat;
      }
      &:nth-child(1) .circle{
        background-image:url("../assets/newjointly/adv1.png");
        transform:rotateY(0deg);
        transition:transform 0.5s;
        &:hover {
          transform:rotateY(180deg)
        }
      }
      &:nth-child(2) .circle{
        background-image:url("../assets/newjointly/adv2.png");
        transform:rotate(0deg);
        transition:transform 1s;
        &:hover {
          transform:rotate(180deg)
        }
      }
      &:nth-child(3) .circle{
        background-image:url("../assets/newjointly/adv3.png");
        background-size: 76px 76px;
        &:hover {
          animation: heartBeat 1.5s;
        }
      }
      &:nth-child(4) .circle{
        background-image:url("../assets/newjointly/adv4.png");
        &:hover {
          animation: shakeX 2s;
        }
      }
    }
  }

  .journal {
    animation: journal 1 2s ease-in;
    opacity: 1 !important;
    visibility: visible !important;
  }
  .apply_btn {
    position: relative;
    z-index: 1;
    width: 308px;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    border-radius: 30px;
    box-shadow: 0px 6px 3px 0 rgba(25, 26, 76, 0.54);
    background-image: linear-gradient(to right, #07e9f1, #07f1b7);
    animation-delay: 1s;
    text-align: center;
    transition: color 0.2s;
    color: #1c1370;
    font-size: 35px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }
  .content {
    width: 1250px;
    margin: 20px auto 0;
    .concat {
      margin-bottom: 75px;
      position: relative;
      .concat-btn {
        width: 240px;
        height: 40px;
        margin-top: 50px;
        margin-left: 25px;
        background: linear-gradient(to right, #07e9f1, #07f1b7);
        font-size: 25px;
        font-weight: bold;
        text-align: center;
        line-height: 40px;
        border-radius: 20px;
        color: #1c1370;
        cursor: pointer;
      }
      .concat-time {
        font-size: 16px;
        color: #fff;
        margin-top: 13px;
        margin-left: 25px;
      }
      .concat-right {
        width: 804px;
        height: 71px;
        padding: 15px 44px;
        position: absolute;
        right: 0px;
        bottom: -10px;
        background: #262933;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-content: space-between;
        flex-wrap: wrap;
        li {
          font-size: 16px;
          width: 46%;
          height: 28px;
          line-height: 28px;
          padding-left: 42px;
          box-sizing: border-box;
          display: flex;
          position: relative;
          align-items: center;
          background-position: left top;
          background-repeat: no-repeat;
          &.skype {
            background-image: url("../assets/newjointly/skype.png");
          }
          &.telegram {
            background-image: url("../assets/newjointly/telegram.png");
          }
          &.letstalk {
            background-image: url("../assets/newjointly/letstalk.png");
          }
          &.mosGram {
            background-image: url("../assets/newjointly/mosGram.png");
          }
          span {
            text-decoration: underline;
          }

          p {
            color: #fff;
            width: 290px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            a {
              cursor: pointer;
              text-decoration: underline !important;
            }
          }

          .copy {
            color: #07f0bc;
            text-decoration: underline;
            cursor: pointer;
            position: absolute;
            right: 0px
          }
        }
      }
    }
    .proportion {
      position: relative;
      .proportion_title {
        margin-bottom: 32px;
        margin-top: 10px;
      }
      table {
        text-align: center;
        border-spacing: 2px;
        border-collapse: separate;
        tr:nth-child(n+2):hover {
          td {
            color: #262933;
            background-color:transparent;
            border-radius: 0;
            border:0;
            &:nth-child(1):before {
              content: "";
              position: absolute;
              left: 0;
              top: 0;
              z-index: 0;
              width: 705px;
              height: 56px;
              background-image: linear-gradient(to right, #41ebc1, #4da1ff);
            }
          }
        }
        td {
          height: 56px;
          width: 90px;
          letter-spacing: 0px;
          background-color:#262933;
          box-sizing: border-box;
          border-radius: 5px;
          border-left: 1px solid transparent;
          border-bottom: 1px solid transparent;
          font-size: 16px;
          color: #e4e4e4;
          cursor: pointer;
          position: relative;
          span {
            position: relative;
            z-index: 1;
          }
          &:first-child {
            width: 220px;
          }
        }
        .tr_th td {
          background-color: #3f4456;
          color: #ffffff;
          height: 102px;
          width: 95px;
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          padding-left: 0px;
        }
      }
      .proportion_im{
        width: 492px;
        height: 430px;
        position: absolute;
        right: 0;
        bottom: 0;
        background:url("../assets/newjointly/data.png") no-repeat;
        background-size: 492px 407px;
        text-align: center;
        font-size: 20px;
        color: #efefee;
        overflow: hidden;
        padding-top: 370px;
        box-sizing: border-box;
        line-height: 1.6;
        p {
          margin-top: 6px;
          font-size: 16px;
        }
      }
    }
    .equation {
      position: relative;
      height: 470px;
      font-size: 22px;
      color: #7c839f;
      margin-top: 50px;
      .shli {
        margin-top: 6px;
        font-size: 20px;
        color:#fff;
      }
      .formula {
        letter-spacing: 2.2px;
        margin-top: 8px;
        width: 500px;
        p {
          height: 43px;
          display: flex;
          justify-content: center;
          border-radius: 5px;
          align-items: center;
          span {
            box-sizing: border-box;
            &:first-child {
              flex: 5;
              text-align: right;
              padding-right: 40px;
            }
            &:last-child {
              flex: 4;
              text-align: left;
              padding-left: 40px;
            }
          }
        }
        .gray_bg {
          background-color: #3f4456;
          font-size: 20px;
          color:#fff;
          font-weight: bold;
        }
        .block_bg {
          background-color: #262933;
          font-size: 18px;
          color:#fff;
          &.block_bg1 {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
          &.block_bg2 {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }
        }
        .no_bg {
          height: 38px;
          font-size: 16px;
          color: #a6a8ad;
        }
      }
      .equation_r {
        .proportion_title {
          margin-bottom: 40px;
        }
        .eqcon {
          width: 700px;
          height: 160px;
          box-sizing: border-box;
          padding: 20px 0 0 40px;
          border-radius: 5px;
          background-color: #262933;
          font-size: 16px;
          color: #d2d2d2;
          line-height: 40px;
          b {
            font-size: 18px;
          }
        }
        .eqcontw {
          padding: 20px 40px 0 0;
          text-align: center;
          margin-top: 15px;
          p  {
            padding-left: 40px;
            text-align: justify;
          }
        }
      }
    }
    .duty {
      .proportion_title {
        margin-bottom: 30px;
      }
      .rule {
        line-height: 2;
        font-size: 16px;
        color: #d2d2d2;
      }
    }
  }
}
@keyframes slideInLeft {
  from {
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

.slideInLeft {
  animation: slideInLeft 0.6s;
}
@keyframes slideInRight {
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
.slideInRight {
  animation: slideInRight 0.6s;
}
@keyframes heartBeat {
  0% {
    transform: scale(1);
  }

  14% {
    transform: scale(1.2);
  }

  28% {
    transform: scale(1);
  }

  42% {
    transform: scale(1.2);
  }

  70% {
    transform: scale(1);
  }
}
@keyframes shakeX {
  from,
  to {
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(-3px, 3px, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(3px, -3px, 0);
  }
}
@keyframes headShake {
  0% {
    transform: translateX(0);
  }

  6.5% {
    transform: translateX(-6px) rotateY(-9deg);
  }

  18.5% {
    transform: translateX(5px) rotateY(7deg);
  }

  31.5% {
    transform: translateX(-3px) rotateY(-5deg);
  }

  43.5% {
    transform: translateX(2px) rotateY(3deg);
  }

  50% {
    transform: translateX(0);
  }
}

.headShake {
  animation: headShake 0.8s ease-in-out;
}
</style>
<style lang="less">
.jointly_dialog {
  width: 940px !important;
  .jointly_dialog_box {
    width: 940px;
    height: 706px;
    box-sizing: border-box;
    padding-top: 30px;
    background: url("../assets/newjointly/new-dialog.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    &.step2 {
      h3 {
        margin-top: 110px
      }
      .concat {
        margin-top: 144px;
      }
    }

    h3 {
      margin-top: 12px;
      font-size: 30px;
      color: #ffffff;
      letter-spacing: 2.4px;
      text-align: center;
    }
    .close {
      width:32px;
      height: 31px;
      position: absolute;
      right: -40px;
      top: -40px;
      cursor: pointer;
      background: url("../assets/newjointly/close.png") no-repeat;
      background-size: 100% 100%;
      &:hover {
        background: url("../assets/newjointly/close_hover.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .desc {
      text-align: center;
      margin: 40px 0 48px;
      color: #7c839f;
      font-size: 22px;
    }
    .confirm_btn {
      margin: 35px auto 0;
      width: 361px;
      height: 46px;
      line-height: 46px;
      border-radius: 23px;
      background-image: linear-gradient(to right, #07e9f1, #07f1b7);
      font-size: 26px;
      color: #000000;
      text-align: center;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: #fff;
      }
    }
    .form_wrapper {
      margin-top: 20px;
    }
    .form_box {
      line-height: 24px;
      margin-bottom: 15px;
      font-size: 18px;
      overflow: hidden;
      box-sizing: border-box;
      padding-left: 210px;
    }
    .form_box .left {
      width: 140px;
      text-align: right;
      color: #fff;
      font-size: 22px;
      line-height: 34px;
    }
    .form_box .right {
      margin-left: 38px;
      color: #7c839f;
      font-size: 18px;
    }
    .tips {
      font-size: 16px;
      color: #505466;
    }
    a,
    .link {
      color: #07f1b7;
      text-decoration: underline;
      cursor: pointer;
    }
    .ivu-input {
      box-sizing: border-box;
      display: inline-block;
      width: 260px;
      height: 34px;
      line-height: 34px;
      padding: 0 10px;
      border: 1px solid #7c839f;
      border-radius: 18px;
      color: #fff;
      font-size: 16px;
      background-image: none;
      position: relative;
      cursor: text;
    }
    .concat {
      width: 771px;
      border-top: 1px solid rgba(255,255,255,.2);
      margin-left: 50%;
      transform: translateX(-50%);
      margin-top: 20px;
      .concat-time {
        font-size: 16px;
        color: #fff;
        margin-top: 20px;
        margin-bottom: 10px;
        text-align: center;
      }
      .concat-bottom {
        width: 100%;
        height: 109px;
        box-sizing: border-box;
        padding: 10px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        li {
          font-size: 16px;
          width: 45%;
          height: 28px;
          line-height: 28px;
          padding-left: 42px;
          box-sizing: border-box;
          display: flex;
          position: relative;
          align-items: center;
          background-position: left top;
          background-repeat: no-repeat;
          &.skype {
            background-image: url("../assets/newjointly/skype.png");
          }
          &.telegram {
            background-image: url("../assets/newjointly/telegram.png");
          }
          &.letstalk {
            background-image: url("../assets/newjointly/letstalk.png");
          }
          &.mosGram {
            background-image: url("../assets/newjointly/mosGram.png");
          }
          p {
            color: #fff;
            width: 270px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            a {
              color: #fff;
              cursor: pointer;
              text-decoration: underline!important;
            }
          }
          span {
            text-decoration: underline;
          }
          .copy {
            color: #07f0bc;
            text-decoration: underline;
            cursor: pointer;
            position: absolute;
            right: 0px
          }
        }
      }
    }
  }
}
</style>
