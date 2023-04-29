<template>
  <div class="seo user_section">
    <h3 class="user_section_title">{{$t("To_promote_sharing")}}</h3>
    <div class="user_section_content">
      <div class="seo_desc">
        <span v-html="seoInfo.seo_top_tips"></span> <router-link to="/active/callfriends" class="kf">{{$t("Event_details")}}</router-link>
      </div>
      <div class="seo_content">
        <div class="seo_box link_box clearfix">
          <div class="box_left fl">{{$t("To_promote_links")}}</div>
          <div class="box_right fl">
            <div class="seo_link">
              <span>{{seoInfo.seoBaseUrl}}</span><i v-show="!showKeyInput">{{seoKey}}</i>
              <input type="text" class="ivu-input" v-model="seoKey" v-show="showKeyInput">
            </div>
            <div class="btn">
              <a href="javascript:;" class="d_btn normal"
              v-if="showKeyInput" @click="saveSeoKey">{{$t("save")}}</a>

              <a href="javascript:;" class="el-button normal"
              v-else @click="editSeoKey">{{$t("Modify_the")}}</a>

              <a href="javascript:;" class="el-button el-button--primary"
              id="copy_link" @click="doCopy">{{$t("copy")}}</a>
            </div>
          </div>
        </div>
        <div class="seo_box invite_box clearfix">
          <div class="box_left fl">{{$t("Invite_code")}}</div>
          <div class="box_right fl">
            <div class="invite_code">{{oldSeoKey}}</div>
            <p>{{$t("Using_promotion_invite_code_different")}}</p>
          </div>
        </div>
        <div class="seo_box seo_qrcode clearfix">
          <div class="box_left fl">{{$t("Promote_the_qr_code")}}</div>
          <div class="box_right fl">
            <div class="seo_code_img">
              <img :src="seoInfo.showQrcode" alt="">
            </div>
            <div class="seo_count clearfix">
              <div class="count_box reg fl">
                <div class="count_title">{{$t("Accumulative_total_registered")}}</div>
                <div class="count_num">
                  <span class="num">{{seoInfo.registerCount}}</span>
                  {{$t("people")}}
                </div>
              </div>
              <div class="count_box despoit fl">
                <div class="count_title">{{$t("The_accumulated_top_up")}}</div>
                <div class="count_num">
                  <span class="num">{{seoInfo.depositCount}}</span>
                  {{$t("people")}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="seo_records user_records">
        <div class="user_records_title">
          {{$t("Promotion_of_record")}}<span>{{$t("In_recent_10_records")}}</span>
        </div>
        <div class="records_list">
          <div class="t-table">
            <div class="t-header">
              <div class="t-row clearfix">
                <div class="t1">{{$t("Serial_number")}}</div>
                <div class="t2">{{$t("time")}}</div>
                <div class="t3">{{$t("money")}}</div>
                <div class="t4">{{$t("Source_of_user")}}</div>
              </div>
            </div>
            <div class="t-body">
              <div class="btn" v-if="listLoad"><span class="btn_loading"></span></div>
              <div class="t-row clearfix" v-for="item in seoRecordsList" :key="item.order_id" v-else>
                <div class="t1">{{item.order_no}}</div>
                <div class="t2">{{item.time*1000 || formatdate('yyyy/MM/dd HH:mm:ss')}}</div>
                <div class="t3 num">{{item.amount}}</div>
                <div class="t4 num">{{item.username}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { formatDate, toThousands } from '../../utils/util'
export default {
  name: 'seo',
  components: {
  },
  filters: {
    formatdate (num, formate) {
      return formatDate (num, formate)
    }
  },
  created () {
    this.loadUserSeoInfo ()
    this.loadSeoRecordsList ()
  },
  data() {
    return {
      listLoad: false,
      seoInfo: {
        seo_top_tips: '',
        showqrcode: '',
        registerCount: 0,
        depositCount: 0
      },
      seoKey: '',
      oldSeoKey: '',
      seoRecordsList: [],
      showKeyInput: false
    }
  },
  methods: {
    loadUserSeoInfo () {
      this.$http(this.ApiSetting.user.getUserSeoInfo)
        .then((res) => {
          console.log('res', res)
          if(res.status === 1){
            this.seoInfo = res.data
            const MONEY = res.data.seo_top_tips.replace(/[^\d]/g,'')
            let moneyStr = `<span style="font-size:18px;color:#08edb4">${ toThousands(MONEY) }</span>`
            const StartPos = res.data.seo_top_tips.indexOf('计')
            const EndPos = res.data.seo_top_tips.indexOf('元')
            this.seoInfo.seo_top_tips = res.data.seo_top_tips.slice(0, StartPos + 1) + moneyStr + res.data.seo_top_tips.slice(EndPos)
            this.seoInfo.seoBaseUrl = res.data.seoUrl.split('?')[0]+'?'
            this.seoKey = res.data.seo_key
            this.oldSeoKey = res.data.seo_key
          }
        })
    },
    editSeoKey () {
      this.showKeyInput = true
    },
    saveSeoKey () {
      let data = {
        seo_key: this.seoKey
      }
      this.$http(this.ApiSetting.user.setSeoKey, data)
        .then((res) => {
          if(res.status === 1){
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.oldSeoKey = this.seoKey
            this.showKeyInput = false
            this.loadUserSeoInfo ()
          }
      })
    },
    doCopy () {
      let url = this.seoInfo.seoBaseUrl + this.oldSeoKey
      let _this = this
      this.$copyText(url).then(function (e) {
        _this.$message({
          message: _this.$t("Copy_success"),
          type: 'success'
        })
      }, function (e) {
        _this.$message({
          message: _this.$t("Copy_the_failure"),
          type: 'warning'
        })
      })
    },
    loadSeoRecordsList () {
      this.listLoad = true
      this.$http(this.ApiSetting.user.getSeoRecords)
        .then((res) => {
          if(res.status === 1){
            if(res.data.length > 0){
              this.seoRecordsList = res.data
            }
          }
          this.listLoad = false
        }, (err) => {
          this.listLoad = false
        })
    }
  }
}
</script>
<style lang="less" scoped>
.seo_desc {
	padding: 0 60px;
	font-size: 14px;
	color: #fff;
	line-height: 24px;
	a {
		color: #07f1b7;
		text-decoration: underline;
	}
}
.seo_content {
	margin-top: 30px;
	font-size: 18px;
	padding-bottom: 50px;
}
.seo_box {
	margin-bottom: 20px;
	line-height: 34px;
	.box_left {
		width: 136px;
		text-align: right;
		color: #fff;
	}
	.box_right {
		margin-left: 20px;
	}
	.seo_link {
		color: #07f1b7;
		height: 36px;
		.ivu-input {
			width: 96px;
			border-color: #7c839f;
		}
	}
	.invite_code {
		color: #07f1b7;
	}
}
.link_box {
	.btn {
		margin-top: 8px;
		.d_btn {
			width: 66px;
		}
	}
}
#copy_link {
	margin-left: 20px;
}
.invite_box {
	p {
		font-size: 12px;
		color: #484d5e;
		line-height: 20px;
		margin-top: 5px;
		height: 20px;
	}
}
.seo_code_img {
	width: 180px;
	height: 180px;
	text-align: center;
	margin-bottom: 40px;
	img {
		width: 100%;
		height: 100%;
	}
}
.seo_count {
	.count_box {
		width: 120px;
		height: 88px;
		border-radius: 3px;
		box-sizing: border-box;
		padding: 20px;
		font-size: 14px;
		margin-right: 20px;
		box-shadow: 0 0 50px 1px rgba(0,0,0,0.4);
		background: url("../../assets/icon_es.png") no-repeat;
		.count_title {
			color: #fff;
			height: 22px;
			line-height: 22px;
		}
		.count_num {
			margin-top: 10px;
		}
		.num {
			font-size: 20px;
			color: #fff;
			font-family: vkFont;
			margin-right: 10px;
		}
	}
	.count_box.reg {
		background-position: -884px -730px;
	}
	.count_box.despoit {
		background-position: -1034px -730px;
	}
}
.seo_records {
	border-top: 1px solid #17191f;
	padding: 40px 60px;
}
.list-table {
  font-size: 12px;
}
.seo_records.user_records {
	.records_list {
		.t-table {
			.t1 {
				text-align: left;
				width: 240px;
			}
			.t2 {
				width: 180px;
			}
			.t3 {
				width: 144px;
				text-align: right;
			}
			.t4 {
				width: 260px;
				padding-left: 90px;
			}
		}
	}
}
</style>
