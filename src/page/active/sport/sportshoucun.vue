<template>
  <div class="ag_active active_page">
    <div class="active_page_wrapper">
      <div class="wrapper">
        <div class="top_bg">
          <div class="bg1"></div>
          <div class="bg2"></div>
        </div>
        <div class="active_page_content">
          <div class="active_section_box">
            <div class="active_title">
               活动时间
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                {{start_time}}起
              </div>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              活动内容
            </div>
            <div class="section_box_wrapper">
              <div class="active_time">
                活动期间新会员首次存款时可申请一次体育首存优惠，申请成功的用户可享受单笔存款最高50%的存款优惠。
              </div>
              <table align="center" width="100%">
                <tbody v-if="initInfo&&initInfo.active_id">
                  <tr align="center">
                    <th>存款游戏钱包</th>
                    <th>首存金额</th>
                    <th>红利百分比</th>
                    <th>红利上限</th>
                    <th>流水要求</th>
                    <th rowspan="4" class="btn">
                      <a href="javascript:;" class="d_btn to_apply disabled" v-if="initInfo&&initInfo.join_status === 1&&initInfo.is_login === 1">已参与</a>
                      <a href="javascript:;" class="d_btn to_apply disabled" v-else-if="initInfo&&initInfo.join_status === 2&&initInfo.is_login === 1">不可参与</a>
                      <a href="javascript:;" class="to_apply d_btn normal" @click="showApplyDialog" v-else>立即首存</a>
                    </th>
                  </tr>
                  <tr>
                    <td>威客体育</td>
                    <td>≥{{initInfo&&initInfo.active_detail[0].low_money}}</td>
                    <td class="yellow">{{initInfo&&initInfo.active_detail[0].percent}}</td>
                    <td>{{initInfo&&initInfo.active_detail[0].max_bonus}}</td>
                    <td rowspan="3">（本金+红利）x{{initInfo&&initInfo.active_bet_times}} 体育</td>
                  </tr>
                  <tr>
                    <td>平博体育</td>
                    <td>≥{{initInfo&&initInfo.active_detail[1].low_money}}</td>
                    <td class="yellow">{{initInfo&&initInfo.active_detail[1].percent}}</td>
                    <td>{{initInfo&&initInfo.active_detail[1].max_bonus}}</td>
                  </tr>
                  <tr>
                    <td>BTI体育</td>
                    <td>≥{{initInfo&&initInfo.active_detail[2].low_money}}</td>
                    <td class="yellow">{{initInfo&&initInfo.active_detail[2].percent}}</td>
                    <td>{{initInfo&&initInfo.active_detail[2].max_bonus}}</td>
                  </tr>
                </tbody>
                <tbody border="1"  align="center" cellspacing="0" width="100%" v-else class="loading">
                  <tr class="btn"><span class="btn_loading"></span></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="active_section_box">
            <div class="active_title">
              {{$t("Activity_rules")}}
            </div>
            <div class="section_box_wrapper">
              <div class="active_desc">
               <p>
                1.符合条件的会员可在点击本优惠活动页面上“立即首存”按钮后，选择“威客体育钱包”、“平博Sports钱包”、“BTI体育钱包”其中之一进行首存转账。对应的存款本金+活动奖金在转账成功后将自动添加至用户选择的体育游戏钱包中。<br>
                2.此活动首笔存款定义为：用户注册后的第一笔存款；若用户在申请前将首笔存款从主钱包转出，则不可申请首存优惠。<br>
                3.申请奖金后需在指定体育游戏中完成相对应的流水要求，当用户对应体育钱包余额＜最低投注额且无未结算注单时，系统将自动判定已完成活动规定的有效流水。<br>
                4.此活动不与其他首存活动共享，每个账户仅限申请一次；领取了此项优惠活动的新用户需先完成活动规定的流水后才可申请平台救援金活动。<br>
                5.有效投注额仅计算产生输赢结果的注单，香港盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算等注单不计算为有效投注。<br>
                6.每位有效玩家、每一手机号码、电子邮箱、相同银行卡、每一个IP地址、每一台电脑者只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利。VKGAME对本活动保有最终解释权。
               </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn back_active_nav">
        <router-link to="/active" class="botton normal">{{$t("Return_to_activity_page")}}</router-link>
      </div>
    </div>
    <el-dialog
      :visible.sync="showDialog"
      custom-class="sport_rescue_dialog_box"
      width="570px"
      :close-on-click-modal="false">
      <div class="dialog_wrapper sport_rescue_dialog">
        <div >
          <span class="qianbao_tit">首存至：</span>
          <div class="qianbao">
            <div
            v-for="item in qianbaoarr"
            @click="qianbaoSelect(item)"
            :key="item.id"
            :class="[item.classname,item.selected?'active':'']">{{item.name}}</div>
          </div>
        </div>
        <div class="money_box">
          <span class="qianbao_tit">首存金额</span>
          <div class="money">
            <input type="text"  v-model.trim="shoucunmoney" v-on:input="depositMoneyChange" class="ivu-input" :placeholder = 'initInfo.active_single_deposit+ "元起"'>
            <span class="s_m_t">可得红利<i>{{dialogHongli}}</i>元，提款流水<i>{{dialogLiushui}}</i>元</span>
          </div>
        </div>
        <div class="btn"><a href="javascript:;" class="to_apply d_btn normal" @click="conApplyDialog">确定</a></div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'sportshoucun',
  components: {},
  data() {
    return {
      shoucunmoney:'',
      showDialog: false,
      qianbaoarr:[
        {name:"威客体育钱包",selected:true,classname:"qianbao_sport",id:1,code:"SABACV"},
        {name:"平博体育钱包",selected:false,classname:"qianbao_pingbo",id:2,code:"PINNACLE"},
        {name:"BTI钱包",selected:false,classname:"qianbao_bti",id:3,code:"BTI"}
      ],
      selectedObj:{},
      initInfo:{},
      start_time:'',
      dialogHongli: 0,
      dialogLiushui: 0,
      ajaxLoad: false
    }
  },
  mounted () {
    this.getSportFirstTransferInit();
    this.selectedObj = this.qianbaoarr[0]
  },
  methods: {
    getSportFirstTransferInit() {
      this.$http(this.ApiSetting.active.getSportFirstTransferInit)
      .then(res => {
        if(res.status == 1 && res.data) {
          this.initInfo = res.data;
          let stime = new Date(res.data.active_start_time*1000)
          this.start_time = stime.getFullYear() + '年' + (stime.getMonth() + 1) + '月' + stime.getDate() + '日'
        }
      })
    },
    showApplyDialog () {
      if(this.initInfo.is_login == 0) {
        this.$message({
          message: '请您先登录',
          type: 'warning'
        })
        return
      }
      if(this.initInfo.active_status == 2) {
         this.$message({
           message: '活动未开始或已结束！',
           type: 'warning'
         })
       return
      }
      this.dialogHongli = 0
      this.dialogLiushui = 0
      this.shoucunmoney = ''
      this.selectedObj = this.qianbaoarr[0]
      if(this.initInfo.first_money){
        this.shoucunmoney = parseFloat(this.initInfo.first_money)
        this.depositMoneyChange()
      }
      this.qianbaoarr.forEach((v, i) => {
        v.selected = false
        if(i === 0){
          v.selected = true
        }
      })
      this.showDialog = true
    },
    qianbaoSelect(item) {
      if(item.code !== this.selectedObj.code){
        this.qianbaoarr.forEach(i => {
          i.selected = false
        })
        this.qianbaoarr[item.id-1].selected = true;
        this.selectedObj = this.qianbaoarr[item.id-1];
        this.shoucunmoney = ''
        this.dialogHongli = 0
        this.dialogLiushui = 0
        if(this.initInfo.first_money){
          this.shoucunmoney = parseFloat(this.initInfo.first_money)
          this.depositMoneyChange()
        }
      }

    },
    conApplyDialog() {
      if(!this.shoucunmoney) {
        this.$message({
          message: '请输入首存金额！',
          type: 'warning'
        })
        return
      }
      if(this.shoucunmoney < this.initInfo.active_single_deposit) {
        this.$message({
          message: '首存金额不能低于'+ this.initInfo.active_single_deposit ,
          type: 'warning'
        })
        return
      }
      if(this.ajaxLoad){
        return;
      }
      this.ajaxLoad = true
      this.$http(this.ApiSetting.user.transferSubmit,{
        from:"NM",
        to:this.selectedObj.code,
        money:this.shoucunmoney,
        active_id:this.initInfo.active_id
      })
      .then(res => {
        if(res.status == 1) {
           this.$message({
            message: '首存成功！',
            type: 'success'
           })
          this.initInfo.join_status = 1
          this.showDialog = false
        }
        this.ajaxLoad = false
      }, err => {
        this.ajaxLoad = false
      })
    },
    depositMoneyChange () {
      let str = this.shoucunmoney.toString()
      if(this.shoucunmoney !== ''){
        if (str==='.'){
          this.shoucunmoney = ''
          this.dialogHongli = 0
          this.dialogLiushui = 0
          return;
        }
        str = str.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
        str = str.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        str = str.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
        this.shoucunmoney = str
        if(this.initInfo.first_money&&(this.shoucunmoney*100>this.initInfo.first_money*100)){
          this.shoucunmoney = parseFloat(this.initInfo.first_money)
        }
        if(this.shoucunmoney<this.initInfo.active_single_deposit){
          this.dialogHongli = 0
          this.dialogLiushui = 0
          return
        }
      }
      let obj = {}
      obj = this.selectedObj.code === 'GM' ? this.initInfo.active_detail[0] : this.initInfo.active_detail[1]
      let shoucunmoney = this.shoucunmoney != '' ? this.shoucunmoney*1 : 0
      let _dialogHongli = shoucunmoney*(parseFloat(obj.percent)/100)
      if(_dialogHongli <= obj.max_bonus){
        this.dialogHongli = Math.floor(_dialogHongli)*1
        this.dialogLiushui = Math.floor((shoucunmoney + this.dialogHongli) * this.initInfo.active_bet_times)
      }else{
        this.dialogHongli = obj.max_bonus*1
        this.dialogLiushui = (Math.floor(this.dialogHongli/(parseFloat(obj.percent)/100)) + this.dialogHongli)*this.initInfo.active_bet_times
      }
      if(shoucunmoney == 0){
        this.dialogHongli = 0
        this.dialogLiushui = 0
      }
    }
  }
}
</script>
<style scoped>
.ag_active{
  background: url("../../../assets/active/sportshoucun-banner.jpg") no-repeat center top;
  position: relative;
}

.section_box_wrapper table{
  margin-top: 20px;
  border-spacing: 0;
  border-collapse: unset;
  border-top: #303344 1px solid;
  border-right: #303344 1px solid;
}
.section_box_wrapper table td, .section_box_wrapper table th{
  text-align: center;
  line-height: 50px;
  color: #c3c3c3;
  border-left: #303344 1px solid;
  border-bottom: #303344 1px solid;
}
.section_box_wrapper table th{
  color: #07f1b7;
}
.section_box_wrapper table td.yellow {
  color: #f4d364;
  font-weight: bold;
  font-size: 22px;
}
.btn .to_apply{
  width: 92px;
  height: 25px;
  line-height: 25px;
  font-size: 12px;
}
.sport_rescue_dialog {
  font-size: 18px;
  color: #ffffff;
  padding: 0 36px 20px;
}
.sport_rescue_dialog p {
  margin-bottom: 40px;
}
.sport_rescue_dialog .qianbao {
  width: 413px;
  font-size: 14px;
  display: inline-block;
}
.sport_rescue_dialog .qianbao div{
  width: 189px;
  height: 88px;
  float: left;
  line-height: 88px;
  padding-left: 8px;
  box-sizing: border-box;
  cursor: pointer;
  border:1px solid transparent;
  transition: border-color 0.2s;
  border-radius: 4px;
  margin: 0 16px 16px 0;
}
.sport_rescue_dialog .qianbao div.active {
  border:1px solid #07e9f1;
}
.qianbao_tit {
  display: inline-block;
  vertical-align: top;
  height: 34px;
  line-height: 34px;
}
.sport_rescue_dialog .money_box {
  margin-top: 30px;
}
.sport_rescue_dialog .s_m_t {
  display: block;
  margin-top: 18px;
  color: #7c839f;
}
.sport_rescue_dialog .s_m_t i {
  color: #07f1b7;
}
.sport_rescue_dialog .money {
  display: inline-block;
  margin-left: 5px;
}
.ivu-input {
  width: 135px;
}
.sport_rescue_dialog .qianbao_sport {
  background: url("../../../assets/icon_es.png") no-repeat;
  background-position: -953px  -612px;
}
.sport_rescue_dialog .qianbao_pingbo {
  background: url("../../../assets/icon_es.png") no-repeat;
  background-position: -1391px -926px;
}
.sport_rescue_dialog .qianbao_bti {
  background: url("../../../assets/icon_es.png") no-repeat;
  background-position: -294px -929px;
}
.sport_rescue_dialog .to_apply {
  margin-top:30px;
  width: 135px;
  height: 34px;
  line-height: 34px;
  font-size: 16px;
}
  table tbody.loading .btn{
    height: 150px;
  }
</style>
<style lang="less">
  .sport_rescue_dialog_box {
    border:none;
    background-color: #262933;
    .ivu-input {
      border-color: #07e9f1;
    }
  }
</style>
