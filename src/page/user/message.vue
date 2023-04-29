<template>
  <!--消息公告-->
  <div class="message user_section">
    <h3 class="user_section_title">{{$t("News_bulletin")}}</h3>
    <div class="user_section_content">
      <div class="message_nav user_section_content_nav clearfix">
        <div class="nav_box" :class="{'actived': item.id === currentNavId}"
        v-for="item in navDataList" :key="item.id"
        @click="messageTypeSelect(item.id)">{{item.title}}</div>
      </div>
      <div class="message_content inner_content">
        <!--站内信-->
        <transition name="transitionRouter">
          <div class="my_message" v-show="currentNavId == 1">
            <div class="message_status_nav radio_nav">
              <!--筛选全部 未读 已读-->
              <radio-group v-model="myMessageCurrentStatus"
              size="large" @on-change="msgStatusChange()">
                <radio v-for="item in myMessageStatusList"
                :key="item.id" :label="item.id">{{item.name}}</radio>
              </radio-group>
              <!--全部标为已读-->
              <div class="btn fr">
                <a href="javascript:;" class="el-button el-button--big"
                @click="setMessageRead">{{$t("All_marked_as_read")}}
                </a>
              </div>

            </div>
            <div class="user_records_title">
              {{$t("Station_list")}}<span>{{$t("A_total_of")}}{{msgPage.total}}{{$t("records")}}</span>
            </div>
            <table class="list-table">
              <tr>
                <th width="30%">{{$t("time")}}</th>
                <th width="20%">{{$t("category")}}</th>
                <th>{{$t("The_title")}}</th>
              </tr>
              <tr class="btn" v-if="messgeListLoad">
                <td colspan="3"><span  class="btn_loading"></span></td>
              </tr>
              <tr v-for="item in messageList" :key="item.id"
              :class="{'readed':item.is_read === 1}"
              @click="showMsgDetail(item)" v-else>
                <td >{{item.add_time*1000 | formatdate('yyyy/MM/dd HH:mm:ss')}}</td>
                <td >{{item.from}}</td>
                <td class="msg_title" v-html="item.title"></td>
              </tr>
            </table>
            <Page :total="msgPage.total" :page-size="msgPage.pagesize"
            :current.sync="msgPage.currentpage"
            @on-change="loadMessageList"
            class="pagination"
            v-if="msgPage.total>msgPage.pagesize">
            </Page>
          </div>
        </transition>
        <!--公告-->
        <transition name="transitionRouter">
          <div class="my_message notice" v-show="currentNavId == 2">
          <div class="user_records_title">
            {{$t("Announcement_of_the_list")}}<span>{{$t("A_total_of")}}{{noticePage.total}}{{$t("records")}}</span>
          </div>
          <table class="list-table">
            <tr>
              <th width="30%">{{$t("time")}}</th>
              <th>{{$t("The_title")}}</th>
            </tr>
            <tr class="btn" v-if="noticeListLoad">
              <td colspan="2"><span  class="btn_loading"></span></td>
            </tr>
            <tr v-for="item in noticeList" :key="item.id"
            class="readed"
            @click="showNoticeDetail(item)" v-else>
              <td>{{item.time*1000 | formatdate('yyyy/MM/dd HH:mm:ss')}}</td>
              <td class="msg_title" v-html="item.title"></td>
            </tr>
          </table>
          <Page :total="noticePage.total" :page-size="noticePage.pagesize"
          :current.sync="noticePage.currentpage"
          @on-change="loadNoticeList"
          class="pagination"
          v-if="noticePage.total>noticePage.pagesize">
          </Page>
          </div>
        </transition>
        <!--登录日志-->
        <transition name="transitionRouter">
          <div class="login_log" v-show="currentNavId == 3">
            <div class="user_records_title">{{$t("Log_list")}}</div>
            <table class="list-table">
              <tr>
                <th width="30%">{{$t("The_login_time")}}</th>
                <th width="30%">IP</th>
                <th>{{$t("Belonging_to")}}</th>
              </tr>
              <tr v-for="item in msgLoginList" :key="item.id">
                <td>{{item.time*1000 | formatdate('yyyy/MM/dd HH:mm:ss')}}</td>
                <td>{{item.real_ip}}</td>
                <td>{{item.area_info}}</td>
              </tr>
            </table>
            <p class="log_tips">
              {{$t("In_recent_10_login_logs")}}
              <a href="javascript:;" class="kf" @click="openKfWindow()">
                {{$t("Online_customer_service")}}
              </a>
            </p>
          </div>
        </transition>
      </div>
    </div>

    <message-dialog
      :visible.sync="msgDetailDialogVisible"
      :dailogTitle="dailogTitle"
      :type="currentNavId"
      :msgDetailInfo="msgDetailInfo" />
  </div>
</template>
<script type="text/javascript">
import { formatDate } from '../../utils/util'
import messageDialog from './messageDialog'
export default {
  name: 'message',
  components: { messageDialog },
  filters: {
    formatdate (num, formate) {
      return formatDate (num, formate)
    }
  },
  created () {
    if(this.currentNavId === 1){
      this.loadMessageList()
    }
    if(this.currentNavId === 2){
      this.loadNoticeList()
    }
  },
  computed: {
    dailogTitle () {
      if(this.currentNavId === 1){
        return this.$t("Stand_inside_letter")
      }
      if(this.currentNavId === 2){
        return this.$t("The_announcement")
      }
    }
  },
  data() {
    return {
      messgeListLoad: false,
      noticeListLoad: false,
      navDataList: [
        {
          title: this.$t("Stand_inside_letter"),
          id: 1
        },
        {
          title: this.$t("The_announcement"),
          id: 2
        },
        {
          title: this.$t("Log_on_to_log"),
          id: 3
        }
      ],
      currentNavId: +this.$route.params.id || 1,
      myMessageCurrentStatus: -1,
      myMessageStatusList: [
        {
          name: this.$t("all"),
          id: -1
        },
        {
          name: this.$t("unread"),
          id: 0
        },
        {
          name: this.$t("read"),
          id: 1
        }
      ],
      messageList: [],
      noticeList: [],
      msgPage: {
        total: 0,
        pagesize: 10,
        currentpage: 1
      },
      noticePage: {
        total: 0,
        pagesize: 10,
        currentpage: 1
      },
      msgDetailDialogVisible: false,
      msgDialogCloseModal: false,
      msgDetailInfo: {},
      msgLoginList: []
    }
  },
  methods: {
    //导航选择
    messageTypeSelect (x) {
      //1 站内信 2 公告 3 登录日志
      this.currentNavId = x
      this.msgPage.currentpage = 1
      this.noticePage.currentpage = 1
      if (x === 2) {
        this.loadNoticeList ()
      } else {
        this.loadMessageList()
      }
    },
    //站内信筛选
    msgStatusChange () {
      this.msgPage.currentpage = 1
      this.loadMessageList ()
    },
    //站内信 登录日志加载
    loadMessageList () {
      this.messageList = []
      let data = {
        page: this.msgPage.currentpage,
        status: this.myMessageCurrentStatus
      }
      this.messgeListLoad = true
      this.$http(this.ApiSetting.user.getMessageList, data)
        .then((res) => {
          if(res.status === 1){
            if(res.data.list.length > 0){
              this.messageList = res.data.list
            }
            if(res.data.loginList&&res.data.loginList.length>0){
              this.msgLoginList = res.data.loginList
            }
            this.msgPage.total = res.data.count
          }
          this.messgeListLoad = false
        }, (err) => {
          this.messgeListLoad = false
        })
    },
    //站内信详情
    showMsgDetail (x) {
      this.msgDetailInfo = {
        title: '',
        content: ''
      }
      let data = {
        id: x.id
      }
      this.$http(this.ApiSetting.user.getMessageDetail, data)
        .then((res) => {
          if(res.status === 1&&res.data){
            this.msgDetailDialogVisible = true
            x.is_read = 1
            this.msgDetailInfo = res.data
            this.msgDetailInfo.content = res.data.content
              .replace(/[\r\n]/g, "<br/>")

            if (res.data.app_ext) {
              const { copy, jump_pc } = res.data.app_ext
              if (copy) {
                this.msgDetailInfo.content = this.msgDetailInfo.content
                  .replace(/复制/g, '<span id="copybtn" class="theme-text copy-text">复制</span>')
              }
              if (jump_pc) {
                const text = jump_pc.text
                if (text) {
                  this.msgDetailInfo.content = this.msgDetailInfo.content
                    .replace(new RegExp(text, 'g'), `<span id="bagbtn" class="theme-text">${text}</span>`)
                }
              }
              this.$nextTick(() => {
                const copyDom = document.getElementById('copybtn')
                const bagDom = document.getElementById('bagbtn')
                console.log('找复制按钮', copyDom, bagDom)
                if (copyDom) {
                  copyDom.addEventListener('click', () => {
                    this.$copyText(copy).then(() => {
                      this.$message({ message: `快递单号${copy}复制成功`, type: 'success' })
                    }, () => {
                      this.$message({ message: '复制失败', type: 'warning' })
                    })
                  })
                }
                if (bagDom) {
                  if (jump_pc.url) {
                    bagDom.addEventListener('click', () => {
                      this.$router.push(`${jump_pc.url}`)
                    })
                  }
                }
              })
            }
          }
        })
    },
    //公告详情
    showNoticeDetail (x) {
      this.msgDetailInfo = x
      this.msgDetailDialogVisible = true
    },
    //站内信全部标为已读
    setMessageRead () {
      this.$http(this.ApiSetting.user.setMessageAllRead)
        .then((res) => {
          if(res.status === 1){
            if(this.messageList.length > 0){
              this.messageList.forEach(function (v,i) {
                v.is_read = 1
              })
            }
            this.$message({
              message: res.message,
              type: 'success'
            })
          }
        })
    },
    //加载公告列表
    loadNoticeList () {
      this.noticeList = []
      let data = {
        page: this.noticePage.currentpage
      }
      this.noticeListLoad = true
      this.$http(this.ApiSetting.user.getNoticeList, data)
        .then((res) => {
          if(res.status === 1){
            if(res.data.list.length > 0){
              this.noticeList = res.data.list
            }
            this.noticePage.total = res.data.count
          }
          this.noticeListLoad = false
        }, (err) => {
          this.noticeListLoad = false
        })
    },
  }
}
</script>
<style lang="less" scoped>
.message_content {
  .my_message {
    .list-table  {
      margin-top: 15px;
      tr {
        cursor: pointer;
        &:hover {
          .msg_title {
            color: #07f1b7;
          }
        }
        &.readed {
          &:hover .msg_title,.msg_title {
            color: #7c839f;
          }
        }
      }
      .msg_title {
        color: #fff;
      }
    }
  }
}
.pagination {
	margin-top: 20px;
}
.msg_detail_dialog {
	.dialog_wrapper {
		padding: 20px 60px;
	}
	.title {
		font-size: 16px;
		color: #fff;
		text-align: center;
	}
	.msg_content {
		color: #7c839f;
		padding: 30px 0;
		line-height: 22px;
		box-sizing: border-box;
		min-height: 180px;
		.msg_time {
			margin-top: 30px;
			text-align: right;
		}
	}
}
</style>
<style lang="less">
.msg_detail_dialog {
  width: 742px;
  border: 1px solid #07eae7;
  background-image: linear-gradient(to bottom, #17191f, #17191f), linear-gradient(to top, #07f1b7, #07e9f1);
  .dialog_title {
    font-size: 14px;
  }
	.msg_content {
		.date-user-btm {
			display: block;
			width: 100%;
			text-align: right;
		}
	}
}
.theme-text {
  color: #07f1ba;
  text-decoration: underline;
  cursor: pointer;

  &.copy-text {
    margin-left: 10px;
  }
}
</style>
