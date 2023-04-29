<template>
 <div class="questionnaire">
    <div class="content-wrapper">
      <div class="md-wrapper first-screen" :style="isFinished&&'paddingTop: 62px'" v-if="((step === 0) && !load)">
        <div class="label-img" v-if="isFirst"></div>
        <!-- 本月已完成问卷 -->
        <template v-if="isFinished">
          <div class="finished-block text-center">
            <div>
              恭喜您完成本月的调查问卷，下月问卷将于<span class="theme-text">次月1号</span>重新开启
            </div>
            <div class="big-text">此次问卷共获得<span class="theme-text">{{ vCoinS }}</span>V币</div>
            <div class="qr-wrapper d-flex align-center justify-center">
              <img width="147" height="147" class="qr-img" v-if="qrcodeImg" :src="qrcodeImg" alt="">
            </div>
            <div class="btn next-btn" @click="$router.push('/user/seo')">分享邀请二维码</div>
            <div class="input-wrapper d-flex align-center justify-space-between">
              <div class="link">{{link}}</div>
              <div class="copy-btn" @click="doCopy(link)">复制</div>
            </div>
          </div>
        </template>
        <!-- 开始答题 -->
        <template v-else>
          <div class="center-block d-flex align-center justify-center text-center">
            <div class="desc-intro" v-html="introtext"></div>
          </div>
          <div @click="startAns" class="start-btn"></div>
        </template>
      </div>
      <div class="answer-wrapper" v-if="((step > 0) && !load)">
        <div class="label-img" v-if="isFirst"></div>
        <div class="header-wrapper d-flex align-center justify-center">
          <div class="text">已答题</div>
          <div class="progress-wrapper">
           <div class="step-width" :style="{ width: `${stepWidthProgress}px`}">
            {{ answeredNumNow }}/{{ totalQusNum }}
             </div>
            </div>
            <div class="theme-text">+{{ answeredListVB }}V币</div>
        </div>
        <div class="core-wrapper" v-if="singleQues.question">
          <div class="ask-line">
            {{ quesTitle }}
            <span>({{selectText}})</span>
            <span class="theme-text">{{ currVBCoin }}V币</span>
          </div>
          <div v-if="(singleQues.type === 3)" class="answer-block">
            <el-form :model="lastForm" ref="ruleForm"
              class="ruleForm lastForm">
              <el-form-item style="margin: 0">
                <el-input class="user-advice" :placeholder="singleQues.example" maxlength="100" v-model.trim="lastForm.advice"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div v-else class="answer-block d-flex flex-wrap justify-space-between">
            <label :class="{
            'block-selected': (singleQues.type === 1 && item.key === answerPicked) ||
                (singleQues.type === 2 && answerSelected.includes(item.key))
            }"
             :for="item.value"
             class="block d-flex align-center justify-space-between"
             v-for="(item, index) in singleQues.answer" :key="index">
              <el-form  v-if="item.value.includes('其他')  && (answerSelected.includes(item.key) || answerPicked === item.key)"
               :model="ruleForm" ref="ruleForm" class="ruleForm">
                <el-form-item style="margin: 0">
                  <el-input class="user-advice" :placeholder="item.example" maxlength="14" v-model.trim="ruleForm.advice"></el-input>
                </el-form-item>
              </el-form>
              <span v-else>{{ (index + 1) }}.{{ item.value }}</span>
              <input v-if="(singleQues.type === 1)" style="display:none" type="radio" v-model="answerPicked" :value="item.key"
                :id="item.value" />
              <input v-if="(singleQues.type === 2)" style="display:none" type="checkbox" v-model="answerSelected" :value="item.key"
                :id="item.value" />
              <div class="radio-wrapper">
                <div v-if="(singleQues.type === 1)" class="normal" :class="{ 'selected': item.key === answerPicked }"></div>
                <div v-if="(singleQues.type === 2)" class="mup-normal" :class="{ 'mup-selected': answerSelected.includes(item.key) }"></div>
              </div>
            </label>
          </div>
          <div class="btn-group d-flex align-center justify-center">
            <div class="btn prev-btn" v-if="(step != 1)" @click="prevQues">上一题</div>
            <div class="btn next-btn" v-if="(step != 9)" @click="nextQues">下一题</div>
            <div class="btn next-btn" v-if="(step === 9)" @click="submit">提交</div>
          </div>
        </div>
      </div>
      <Loading v-if="load" class="list-loading" />
    </div>
    <el-dialog :close-on-click-modal="false" :show-close="false" v-dir-center="continueDio" append-to-body center custom-class="ques-confirmdio" :visible.sync="continueDio" width="606px">
      <div class="ques-close" @click="(continueDio = false)"></div>
      <div class="ques-wrapper">
        <div class="title">温馨提示</div>
        <div class="desc">亲爱的会员，目前还有<span style="color:#ff4981">{{( totalQusNum - answeredNumNow ) }}个</span>问题尚未完成，价值<span style="color:#fff476">{{ VBTotal - answeredListVB }}</span>V币，确认现在提交吗？</div>
        <div class="btn-group d-flex align-center justify-center">
          <div class="btn prev-btn" @click="ansAgain">继续完成</div>
          <div class="btn next-btn" @click="finishAns">直接提交</div>
        </div>
        <div class="info">注：每个自然月内仅限参与一次，次月自动更新</div>
      </div>
    </el-dialog>
 </div>
</template>

<script>
import Loading from '@/components/common/Loading.vue'
import { mapState } from 'vuex'
export default {
  name: 'questionnaire',
  components: {
    Loading
  },
  data () {
    return {
      submiting: false,
      continueDio: false,
      isSumitNow: false, // 是否直接提交
      vCoinS: 0, // 提交问卷或初始化时获得的V币总数
      isValid: 1, // 1 有效问卷 0 无效问卷 10秒内答完所有问题就是无效问卷
      link: '',
      qrcodeImg: '',
      load: false,
      submitLoading: false,
      isFinished: false, // 本月是否结束答题
      answerPicked: null, // 单选
      answerSelected: [], // 多选
      isFirst: true,
      introtext: '让我们<br/>聆听您的心声<br/>威客有奖问卷调查，您的意见和建议对我们非常重要',
      step: 0,
      quesObj: {},
      answeredArr: [], // 用户回答过的所有问题，用于向接口提交
      firstYes: false, // 首次问卷第二题选择的是（是否在其他平台游戏过，默认没有）
      ruleForm: {
        advice: '' // 用户输入的其他建议
      },
      lastForm: {
        advice: '' // 最后一题输入框
      },
      StartTimeStamp: null, // 答题开始时间戳
      EndTimeStamp: null // 结束答题时间戳
    }
  },
  created () {
    this.getInit()
  },
  watch: {
    // 单选切换时，清空其他输入框
    answerPicked (val, oldVal) {
      this.ruleForm.advice = ''
    }
  },
  computed: {
    ...mapState(['isLogin']),
    // 提交时问卷类型，1首次问卷小白（第二题选否） 2首次问卷非小白（第二题选是） 3非首次问卷
    submitType () {
      if (this.isFirst) {
        if (this.firstYes) {
          return 2
        } else {
          return 1
        }
      } else {
        return 3
      }
    },
    VBTotal () {
      let value = 0
      if (this.question.length) {
        this.question.forEach(item => {
          value = value + item.vCoin
        })
      }
      return value
    },
    // 已经回答题目列表
    answeredHistoryList () {
      let hisList = this.answeredArr.filter(item => !item.empty)
      const hasCurrent = hisList.find(item => item.no === this.singleQues.no)
      if (this.isAnsweredNow && !hasCurrent) {
        hisList.push(this.singleQues)
      }
      return hisList
    },
    // 当前已经答题数量
    answeredNumNow () {
      return this.answeredHistoryList.length
    },
    // 已答题目可获得的V币数量
    answeredListVB () {
      let value = 0
      if (this.answeredHistoryList.length) {
        this.answeredHistoryList.forEach(item => {
          value = value + item.vCoin
        })
      }
      return value
    },
    // 答题进度条
    stepWidthProgress () {
      const step = this.answeredNumNow
      return Math.ceil(step * 463 / this.totalQusNum)
    },
    // 当前一共几题
    totalQusNum () {
      return this.question.length
    },
    // 当前题目分类
    question () {
      if (this.quesObj.data && this.quesObj.data.length) {
        if (this.isFirst) {
          return this.firstYes ? this.quesObj.data[0] : this.quesObj.data[1]
        } else {
          return this.quesObj.data[0]
        }
      }
      return []
    },
    // 当前是否答题
    isAnsweredNow () {
      // 如果当前题目是单选
      if (this.singleQues && this.singleQues.type === 1 && this.answerPicked) {
        const other = this.singleQues.answer.find(item => item.value.includes('其他'))
        if (other && other.key === this.answerPicked) {
          return Boolean(this.ruleForm.advice)
        }
        return true
      }
      // 如果当前题目是多选
      if (this.singleQues && this.singleQues.type === 2 && this.answerSelected.length) {
        return true
      }
      // 如果当前题目是填空
      if (this.singleQues && this.singleQues.type === 3 && this.lastForm.advice.length) {
        return true
      }
      return false
    },
    // 当前在第几题
    singleQues () {
      return this.question.length && this.step ? this.question[this.step - 1] : {}
    },
    // 当前题目标题
    quesTitle () {
      return this.singleQues.no + '、' + this.singleQues.question
    },
    // 当前题目是单选还是多选
    selectText () {
      let deText = '单选'
      if (this.singleQues && this.singleQues.type === 2) {
        deText = '多选'
      }
      if (this.singleQues && this.singleQues.type === 3) {
        deText = '填空题'
      }
      return deText
    },
    // 当前题目价值多少VB
    currVBCoin () {
      let value = 0
      if (this.singleQues && this.singleQues.vCoin) {
        value = this.singleQues.vCoin
      }
      return value
    }
  },
  methods: {
    doCopy (text) {
      if (!text) {
        this.$message({
          message: '当前复制内容为空',
          type: 'warning'
        })
      }
      this.$copyText(text).then((e) => {
        this.$message({
          message: '复制成功！',
          type: 'success'
        })
      }, function (e) {
        this.$message({
          message: this.$t('Copy_the_failure'),
          type: 'warning'
        })
      })
    },
    // 开始答题
    startAns () {
      if (this.isLogin) {
        this.step++
        this.StartTimeStamp = Date.now()
      } else {
        return this.$message({
          message: '请您先登录!',
          type: 'warning'
        })
      }
    },
    // 提交问卷
    submit () {
      this.submiting = true
      if (this.submitLoading) {
        return
      }
      const ques = this.nextQues()
      console.log('ques', ques)
      this.submiting = false
      if (ques === false) {
        return
      }
      this.EndTimeStamp = Date.now()
      if (this.EndTimeStamp && this.StartTimeStamp) {
        const diff = this.EndTimeStamp - this.StartTimeStamp
        if (diff <= 10 * 1000) {
          this.isValid = 0
        } else {
          this.isValid = 1
        }
      }
      // 如果已经回答了全部题目，直接提交即可
      if (this.totalQusNum === this.answeredNumNow) {
        this.isSumitNow = true
      }
      // 开始提交
      const params = {
        is_valid: this.isValid,
        type: this.submitType,
        question_1: this.transAnswer(this.answeredArr[0]),
        question_1_other: this.answeredArr[0].advice,
        question_2: this.transAnswer(this.answeredArr[1]),
        question_2_other: this.answeredArr[1].advice,
        question_3: this.transAnswer(this.answeredArr[2]),
        question_3_other: this.answeredArr[2].advice,
        question_4: this.transAnswer(this.answeredArr[3]),
        question_4_other: this.answeredArr[3].advice,
        question_5: this.transAnswer(this.answeredArr[4]),
        question_5_other: this.answeredArr[4].advice,
        question_6: this.transAnswer(this.answeredArr[5]),
        question_6_other: this.answeredArr[5].advice,
        question_7: this.transAnswer(this.answeredArr[6]),
        question_7_other: this.answeredArr[6].advice,
        question_8: this.transAnswer(this.answeredArr[7]),
        question_8_other: this.answeredArr[7].advice,
        question_9: this.transAnswer(this.answeredArr[8]),
        question_9_other: this.answeredArr[8].advice
      }
      if (this.continueDio) {
        return
      }
      console.log('提交参数', params)
      this.submitLoading = true
      this.$http(this.ApiSetting.questionnaire.submit, params)
        .then(res => {
          this.submitLoading = false
          console.log('提交完成', res)
          if (res.status === 1) {
            const { shareQrCode, shareUrl, vCoinS } = res.data
            if (shareQrCode) {
              this.qrcodeImg = shareQrCode
            }
            if (shareUrl) {
              this.link = shareUrl
            }
            if (vCoinS) {
              this.vCoinS = vCoinS
            }
            this.reset()
            return this.$message({
              message: '提交成功，感谢您的参与！',
              type: 'success'
            })
          }
        })
        .catch(err => {
          Promise.reject(err)
          this.submitLoading = false
        })
    },
    // 继续答题
    ansAgain () {
      this.continueDio = false
      this.isSumitNow = false
      // 第一个没回答题目的索引
      const index = this.answeredArr.findIndex(item => item.empty)
      if (index !== -1) {
        this.step = this.answeredArr[index].no
      }
    },
    // 直接提交
    finishAns () {
      this.isSumitNow = true
      this.continueDio = false
      this.submit()
    },
    reset () {
      this.StartTimeStamp = null
      this.EndTimeStamp = null
      this.step = 0
      this.isSumitNow = false
      this.continueDio = false
      this.answerPicked = null
      this.answerSelected = []
      this.answeredArr = []
      this.ruleForm.advice = ''
      this.lastForm.advice = ''
      this.getInit()
    },
    // 把答案数组转为字符串
    transAnswer (item) {
      if (!this.isSumitNow && item.empty) {
        this.continueDio = true
        return
      }
      if (item.type === 1) {
        return item.answered ? item.answered.toString() : ''
      }
      if (item.type === 2) {
        return item.answered.length ? item.answered.sort().join() : ''
      }
      if (item.type === 3) {
        return item.answered ? item.answered.toString() : ''
      }
    },
    getInit () {
      this.load = true
      this.$http(this.ApiSetting.questionnaire.init)
        .then(res => {
          this.load = false
          if (res.status === 1 && res.data) {
            console.log('新版问卷调查', res.data)
            this.quesObj = res.data
            this.isFirst = res.data.is_first
            this.isFinished = res.data.is_finish_this_month
            if (res.data.share_qr_code) {
              this.qrcodeImg = res.data.share_qr_code
            }
            if (res.data.share_url) {
              this.link = res.data.share_url
            }
            if (res.data.v_coin) {
              this.vCoinS = res.data.v_coin
            }
          }
        })
        .catch(() => {
          this.load = false
        })
    },
    // 点击了上一题
    prevQues () {
      if (this.step <= 1) {
        return
      }
      this.step--
      const item = this.answeredArr.find(item => item.no === this.singleQues.no)
      if (item && item.type === 1) {
        // 上一题是单选
        this.answerPicked = item.answered
      }
      if (item && item.type === 2) {
        // 上一题是多选
        this.answerSelected = item.answered
      }
      if (item && item.type === 3) {
        this.lastForm.advice = item.advice
      }
      const timer = setTimeout(() => {
        if (item && item.advice.length) {
          this.ruleForm.advice = item.advice
        }
        clearTimeout(timer)
      }, 100)
    },
    // 点击了下一题
    nextQues () {
      // if (
      //   (this.singleQues.type === 1 && !this.answerPicked) ||
      //   (this.singleQues.type === 2 && !this.answerSelected.length)
      // ) {
      //   this.$message({
      //     message: '请您先填写完答案后，再点击下一题',
      //     type: 'warning'
      //   })
      //   return false
      // }
      // 第2个题目必须填写，其他题目可填
      if (this.isFirst && this.singleQues.no === 2 && !this.answerPicked) {
        this.$message({
          message: '请先完成第二题',
          type: 'warning'
        })
        return false
      }
      // 以前最后一题是填空题，现在是随机出现的，每次下一题都校验一下
      // if (!this.lastForm.advice) {
      //   return this.$message({
      //     message: '内容不能为空',
      //     type: 'warning'
      //   })
      // }
      if (this.lastForm.advice && this.lastForm.advice.length < 15) {
        this.$message({
          message: '字数不能少于15个字',
          type: 'warning'
        })
        return false
      }

      // 检查其他选中状态，是否为空
      const other = this.singleQues.answer.find(item => item.value.includes('其他'))
      if (other) {
        // 如果多选时选择了其他，却没有输入文字，或 单选时选择了其他，却没有输入文字
        if (this.answerSelected.includes(other.key) || this.answerPicked === other.key) {
          const value = this.ruleForm.advice
          if (!value) {
            this.$message({
              message: '请填写内容或取消勾选“其他”',
              type: 'warning'
            })
            return false
          }
          if (value.length < 2) {
            this.$message({
              message: '内容不能小于2个字',
              type: 'warning'
            })
            return false
          }
          if (value.length > 14) {
            this.$message({
              message: '内容不能大于14个字',
              type: 'warning'
            })
            return false
          }
        }
      }
      const item = this.answeredArr.find(item => item.no === this.singleQues.no)
      // 之前已经回答过题目的，更新以前的记录
      if (!item) {
        this.answeredArr.push({
          no: this.singleQues.no,
          answered: this.singleQues.type === 1 ? this.answerPicked : this.singleQues.type === 2 ? this.answerSelected : this.lastForm.advice,
          type: this.singleQues.type,
          vCoin: this.singleQues.vCoin,
          advice: this.ruleForm.advice,
          empty: (this.singleQues.type === 1 && this.answerPicked === null) || (this.singleQues.type === 2 && !this.answerSelected.length) || (this.singleQues.type === 3 && !this.lastForm.advice.length)
        })
      } else {
        // 之前题目存在，但是首次问卷第二题切换后，会更换题目，后面的题目全部清空重新回答
        if (this.isFirst && item.no === 2 && item.answered !== this.answerPicked) {
          this.answeredArr = this.answeredArr.slice(0, 1)
          this.answeredArr.push({
            no: this.singleQues.no,
            answered: this.singleQues.type === 1 ? this.answerPicked : this.singleQues.type === 2 ? this.answerSelected : this.lastForm.advice,
            type: this.singleQues.type,
            vCoin: this.singleQues.vCoin,
            advice: this.ruleForm.advice,
            empty: (this.singleQues.type === 1 && this.answerPicked === null) || (this.singleQues.type === 2 && !this.answerSelected.length) || (this.singleQues.type === 3 && !this.lastForm.advice.length)
          })
        } else {
          this.answeredArr = this.answeredArr.map(item => {
            if (item.no === this.singleQues.no) {
              return {
                ...item,
                answered: this.singleQues.type === 1 ? this.answerPicked : this.singleQues.type === 2 ? this.answerSelected : this.lastForm.advice,
                advice: this.ruleForm.advice,
                empty: (this.singleQues.type === 1 && this.answerPicked === null) || (this.singleQues.type === 2 && !this.answerSelected.length) || (this.singleQues.type === 3 && !this.lastForm.advice.length)
              }
            } else {
              return item
            }
          })
        }
      }
      // 当前是第二题，进入下一题前，设置firstYes的值，根据是否展示不同的题目
      if (this.singleQues.no === 2) {
        if (this.answerPicked === 1) {
          this.firstYes = true
        } else {
          this.firstYes = false
        }
      }
      // 点击提交时，不做一下处理
      if (!this.submiting) {
        this.step++
        this.answerPicked = null
        this.answerSelected = []
        this.ruleForm.advice = ''
        // 翻页后看看之前有没有记录
        const haveRecord = this.answeredArr.find(item => item.no === this.singleQues.no)
        if (haveRecord) {
          if (this.singleQues.type === 1) {
            this.answerPicked = haveRecord.answered
          }
          if (this.singleQues.type === 2) {
            this.answerSelected = haveRecord.answered
          }
          if (haveRecord.advice.length) {
            this.ruleForm.advice = haveRecord.advice
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.questionnaire {
  margin: auto;
  background: url('~@/assets/question/bg.webp') no-repeat center top;
  background-size: auto;
  background-color: #010235;
  font-size: 16px;
  min-height: 1052px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  position: relative;
  padding-top: 467px;
  .list-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .theme-text {
    color: #fff476;
    line-height: 1;
    width: 84px;
  }
  .content-wrapper {
    max-width: 1240px;
    margin: auto;
    margin-bottom: 102px;
    box-sizing: border-box;
    position: relative;
    min-height: 504px;
    .label-img {
      width: 133px;
      height: 120px;
      background: url('~@/assets/question/label.png') no-repeat center;
      background-size: contain;
      position: absolute;
      top: -4px;
      left: -6px;
    }
    .finished-block {
      .input-wrapper {
        margin: 33px auto 0;
        width: 461px;
        height: 42px;
        background: url('~@/assets/question/input.png') no-repeat center;
        background-size: 100% 100%;
        box-sizing: border-box;
        padding: 0 6px 2px 16px;
        .link {
          flex: 1;
          text-align: left;
          font-size: 14px;
        }
      }
      .big-text {
        margin-top: 15px;
        font-size: 18px;
        font-weight: 600;
      }
      .qr-wrapper {
        margin: 30px auto 22px;
        width: 164px;
        height: 164px;
        background: url('~@/assets/question/qr-wrapper.png') no-repeat center;
        background-size: 100% 100%;
      }
    }
    .md-wrapper {
      width: 1005px;
      height: 504px;
      margin: auto;
      box-sizing: border-box;
      padding-top: 81px;
      background: url('~@/assets/question/wrap.png') no-repeat center;
      background-size: contain;
      position: relative;
      color: #fff;
      .center-block {
        margin: 0 auto 18px;
        width: 501px;
        height: 253px;
        background: url('~@/assets/question/block.png') no-repeat center;
        background-size: contain;
        position: relative;
        line-height: 1.88;
      }
      .start-btn {
        margin: auto;
        width: 246px;
        height: 68px;
        background: url('~@/assets/question/start-btn.png') no-repeat center;
        background-size: cover;
        cursor: pointer;
        transition: transform .3s ease-out;
        &:hover {
          transform: scale(1.05);
        }
      }
    }
    .answer-wrapper {
      width: 1005px;
      height: 644px;
      margin: auto;
      box-sizing: border-box;
      background: url('~@/assets/question/big-wrap.webp') no-repeat center;
      background-size: contain;
      position: relative;
      padding-top: 65px;
      color: #fff;

      .header-wrapper {
        margin: auto;
        width: 723px;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          bottom: -38px;
          width: 100%;
          height: 1px;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
        }
        .text {
          font-size: 14px;
        }
      }
      .progress-wrapper {
        overflow: hidden;
        width: 463px;
        height: 18px;
        box-sizing: border-box;
        border-radius: 9px;
        border: solid 1px #2d3b69;
        background-color: #010235;
        margin-left: 13px;
        margin-right: 10px;
        padding: 1px;
        .step-width {
          height: 100%;
          border-radius: 7px;
          box-shadow: inset 0px 1px 0 0 #72fff0;
          background-image: linear-gradient(to top, #07e9f1, #07f1b7);
          font-size: 12px;
          color: #000;
          text-align: center;
          line-height: 14px;
          transition: width .3s ease-out;
        }
      }
      .core-wrapper {
        margin: 71px auto 0;
        width: 620px;
        .ask-line {
          white-space: nowrap;
          .theme-text {
            margin-left: 6px;
          }
        }
        .ruleForm {
          height: 50px;
          width: 226px;
          /deep/.el-form-item__content {
            font-size: 16px;
            .el-form-item__error {
              top: 110%;
            }
          }
          &.lastForm {
            width: 597px;
            .user-advice {
              /deep/.el-input__inner {
                padding: 0 15px;
                background: url('~@/assets/question/last-input.png') no-repeat center;
                background-size: 100% 100%;
                &:focus {
                  background-image: url('~@/assets/question/last-input-focus.png');
                }
              }
            }
          }
        }
        .user-advice {
          height: 50px;
          caret-color: #07e9ef;
          font-size: 16px;
          input {
            &::placeholder {
                color: rgba(255, 255, 255, 0.3);
                font-size: 16px;
            }
          }
          /deep/.el-input__inner {
            height: 50px;
            line-height: 50px;
            padding: 0;
            background-color: transparent;
            border: none;
            color: #00f5ff;
            &::placeholder {
              color: rgba(255, 255, 255, 0.3);
              font-size: 16px;
            }
          }
        }
        .answer-block {
          margin-top: 26px;
          .block {
            cursor: pointer;
            user-select: none;
            width: 292px;
            height: 50px;
            box-sizing: border-box;
            padding: 0 15px;
            margin-bottom: 10px;
            background: url('~@/assets/question/ans.png') no-repeat center;
            background-size: contain;
            &.block-selected {
              background-image: url('~@/assets/question/ans-active.png');
              color: #00f5ff;
            }
          }
          .radio-wrapper {
            .normal {
              width: 24px;
              height: 24px;
              box-sizing: border-box;
              border: solid 1px #4c5d95;
              background-color: #010235;
              border-radius: 50%;
              &::after {
                content: '';
                transition: transform .2s ease-out;
                transform: scale(0);
              }
            }
            .selected {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              box-sizing: border-box;
              border: solid 1px #07e9ef;
              position: relative;
              &::after {
                content: '';
                position: absolute;
                top: 4px;
                left: 4px;
                width: 14px;
                height: 14px;
                background-color: #07e9ef;
                border-radius: 50%;
                transform: scale(1);
              }
            }
            .mup-normal {
              width: 22px;
              height: 22px;
              box-sizing: border-box;
              border: solid 1px #4c5d95;
              background-color: #010235;
              position: relative;
              &::after {
                content: '';
                transition: transform .2s ease-out;
                transform: scale(0);
              }
              &.mup-selected {
                border-style: solid;
                border-width: 1px;
                border-image-source: linear-gradient(to top, #07e9ef, #07f1ba);
                border-image-slice: 1;
                &::after {
                  content: '';
                  position: absolute;
                  bottom: 2px;
                  left: 2px;
                  width: 24px;
                  height: 21px;
                  background: url('~@/assets/question/gou.png') no-repeat center;
                  background-size: 100% 100%;
                  transform: scale(1);
                }
              }
            }
          }
        }
      }
    }
    .btn-group {
      position: absolute;
      bottom: 65px;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
    }
    .copy-btn {
      cursor: pointer;
      width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #000;
      font-size: 14px;
      border: solid 1px #4efeff;
      background-image: linear-gradient(to left, #07e9f1, #07f1b7);
      &:hover {
        background-image: linear-gradient(to right, #07e9f1, #07f1b7);
      }
    }

    .btn {
      margin: auto;
      user-select: none;
      text-align: center;
      line-height: 50px;
      width: 160px;
      height: 50px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
      cursor: pointer;

      &.prev-btn {
        background-image: url('~@/assets/question/prev-btn.png');
        margin-right: 16px;

        &:hover {
          background-image: url('~@/assets/question/prev-btn-hover.png');
        }
      }

      &.next-btn {
        color: #000;
        font-weight: 600;
        background-image: url('~@/assets/question/next-btn.png');

        &:hover {
          background-image: url('~@/assets/question/next-btn-hover.png');
        }
      }
    }
  }
}
</style>
<style lang="less">
.ques-confirmdio {
  height: 354px;
  background: url('~@/assets/question/dio-bg.png') no-repeat center;
  background-size: 100% 100%;
  .ques-close {
    position: absolute;
    cursor: pointer;
    top: -20px;
    right: -20px;
    width: 20px;
    height: 19px;
    background: url('~@/assets/question/close-icon.png') no-repeat center;
    background-size: 100% 100%;
    transition: transform .3s ease-out;
    &:hover {
      transform: rotate(-90deg);
    }
  }
  .el-dialog__header {
    height: 0;
  }
  .el-dialog__body {
    padding-top: 51px;
  }
  .ques-wrapper {
    font-size: 16px;
    color: #fff;
    .title {
      line-height: 18px;
      position: relative;
      &::after {
        content: '';
        width: 355px;
        height: 14px;
        position: absolute;
        top: 58%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        background: url('~@/assets/question/line.png') no-repeat center;
        background-size: 100% 100%;
      }
    }
    .desc {
      margin: 40px auto 50px;
      width: 300px;
      line-height: 1.63;
    }
    .btn-group {
    .btn {
        user-select: none;
        text-align: center;
        line-height: 50px;
        padding: 0;
        width: 160px;
        height: 50px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        cursor: pointer;
        &.prev-btn {
          background-image: url('~@/assets/question/prev-btn.png');
          margin-right: 16px;
          &:hover {
            background-image: url('~@/assets/question/prev-btn-hover.png');
          }
        }
        &.next-btn {
          color: #000;
          font-weight: 600;
          background-image: url('~@/assets/question/next-btn.png');
          &:hover {
            background-image: url('~@/assets/question/next-btn-hover.png');
          }
        }
      }
    }
    .info {
      user-select: none;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
      line-height: 1;
      margin-top: 35px;
    }
  }
}
</style>
