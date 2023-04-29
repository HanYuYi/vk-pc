<template>
  <el-dialog :close-on-click-modal="false" :custom-class="'vbmarket_address_dialog'" :visible.sync="isShowDio"
    :append-to-body="true">
    <div class="dialog_title" slot="title">
      <template v-if="status == 'account'">
        添加详情信息
      </template>
      <template v-else-if="status == 'modifyAccount'">
        修改详情信息
      </template>
      <template v-else>
        {{ status === 'add' ? '添加' : status === 'modify' ? '修改' : '编辑'}}收货地址
      </template>
    </div>
    <div v-if="isShowDio" class="dialog_wrapper">
      <el-form @keyup.enter.native="submitForm('accountForm')" ref="accountForm" v-if="status == 'account' || status == 'modifyAccount'" class="goods-address-form account-address-form" label-width="140px" :rules="accountRules" :model="accountForm">
        <!-- 相关平台账号 -->
        <el-form-item :label="status == 'account' ? '填写账号信息' : '修改账号信息'" prop="account" :error="formError.account">
          <el-input placeholder="请输入充值账号或手机号信息" clearable resize="none" :rows="4" type="textarea" v-model="accountForm.account"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;margin-top:60px">
          <el-button class="confirm-address-btn" type="primary" @click="submitForm('accountForm')">
            <span v-if="btnLoading" class="small_loading"></span>
            <span v-else>确认提交</span>
          </el-button>
        </el-form-item>
      </el-form>

      <el-form @keyup.enter.native="submitForm('addressForm')" v-else class="goods-address-form" label-width="110px" :rules="addressRules" :model="addressForm"
        ref="addressForm">
        <!-- 用户名-->
        <el-form-item class="el-item-username" label="收货人姓名" prop="username" :error="formError.username">
          <el-input v-model="addressForm.username" clearable placeholder="请填写真实姓名" maxlength="18">
          </el-input>
          <div class="user-tip">*为了提高发货速度，请填写真实姓名</div>
        </el-form-item>
        <!-- 手机号码 -->
        <el-form-item class="input-phone" label="手机号码" prop="phone" :error="formError.phone">
          <el-input type="number" v-model="addressForm.phone" clearable :placeholder="$t('Please_enter_the_phone_number')"
            maxlength="11">
            <div slot="prepend" class="input_prepend_select">
              +{{phoneForm.prefix}}
            </div>
          </el-input>
        </el-form-item>
        <!-- 所在地区 -->
        <el-form-item label="所在地区" prop="region" :error="formError.region">
            <el-cascader popper-class="region-cascader" v-model="addressForm.region" clearable :options="areaList" @change="handleChange">
            </el-cascader>
        </el-form-item>
        <!-- 详细地址 -->
        <el-form-item label="详细地址" prop="addDetail" :error="formError.addDetail">
          <el-input clearable resize="none" :rows="4" maxlength="50" show-word-limit type="textarea" v-model="addressForm.addDetail"></el-input>
          <div class="word-limit">{{addressForm.addDetail.length}}/50</div>
        </el-form-item>
        <el-form-item style="text-align: center;margin-top:60px">
          <el-button class="confirm-address-btn" type="primary" @click="submitForm('addressForm')">
            <span v-if="btnLoading" class="small_loading"></span>
            <span v-else>保存</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { areaList } from '@/utils/city.js'
import { commonMixins } from '@/page/login/commonMixins.js'

export default {
  name: 'GoodsAddressDio',
  props: {
    status: {
      type: String,
      default: 'add'
    }, // 弹窗状态，add: 添加地址，edit: 编辑地址, modify: 修改快递地址，account: 添加相关平台账号
    userAddress: Object,
    visualGoods: Object
  },
  watch: {
    isShowDio (val) {
      if (val) {
        if (this.status == 'modifyAccount' && Object.keys(this.userAddress).length > 0) {
          this.accountForm.account = this.userAddress.secret
        }
        if ((this.status == 'edit' || this.status == 'modify') && Object.keys(this.userAddress).length > 0) {
          this.addressForm.region = []
          this.addressForm.username = this.userAddress.receive
          this.addressForm.phone = this.userAddress.phone
          this.addressForm.region.push(this.userAddress.province_id)
          this.addressForm.region.push(this.userAddress.city_id)
          this.addressForm.addDetail = this.userAddress.address
        }
      }
    }
  },
  mixins: [commonMixins],
  data () {
    var checkRegion = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('请选择所在地区'))
      }
      callback()
    }
    var checkAddDetail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请填写您的收货详细地址'))
      }
      callback()
    }
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请填写您的相关平台账号'))
      }
      callback()
    }
    return {
      isShowDio: false,
      btnLoading: false,
      showCountryPopup: false,
      phoneForm: {
        prefix: '86',
        phone_verify: ''
      },
      addressForm: {
        username: '',
        phone: '',
        region: [],
        addDetail: ''
      },
      addressRules: {
        username: [{ validator: this.checkUsernameChinese, trigger: 'change' }],
        phone: [{ validator: this.checkPhone, trigger: 'change' }],
        region: [{ type: 'array', validator: checkRegion, trigger: 'change' }],
        addDetail: [{ validator: checkAddDetail, trigger: 'change' }]
      },
      accountForm: {
        account: ''
      },
      accountRules: {
        account: [{ validator: checkAccount, trigger: 'change' }]
      },
      formError: {
        username: '',
        phone: '',
        region: '',
        addDetail: '',
        account: ''
      },
      areaList: []
    }
  },
  created () {
    if (this.areaList.length === 0) {
      this.loadAreaList()
    }
  },
  methods: {
    loadAreaList () {
      this.$http(this.ApiSetting.user.getBankUserList)
        .then((res) => {
          if (res.status === 1) {
            let proviceDict = new Array()
            let cityDict = {}
            res.data.areaInfos.forEach(function (v, i, array) {
              v.value = v.id
              v.label = v.name
              if (v.parent_id == 0) {
                proviceDict.push(v)
              } else {
                if (typeof cityDict[v.parent_id] === 'undefined') {
                  cityDict[v.parent_id] = new Array()
                }
                cityDict[v.parent_id].push(v)
              }
            })
            proviceDict.forEach(function (v, i) {
              v.children = cityDict[v.id]
            })
            this.areaList = proviceDict
          }
        })
    },
    // 前端的省市区数据，暂时不用
    formatArea () {
      console.log('areaList', areaList)
      const province = areaList.province_list
      const city = areaList.city_list
      const cityCodeArr = Object.keys(city)
      const county = areaList.county_list
      const countyCodeArr = Object.keys(county)
      this.areaList = Object.keys(province).map(procode => {
        let cityChild = cityCodeArr
          .filter(citycode => citycode.slice(0, 2) === procode.slice(0, 2))
          .map(citycode => {
            let countyChild = countyCodeArr
              .filter(coucode => citycode.slice(0, 4) === coucode.slice(0, 4))
              .map(coucode => {
                return { value: coucode, label: county[coucode] }
              })
            return { value: citycode, label: city[citycode], children: countyChild }
          })
        return { value: procode, label: province[procode], children: cityChild }
      })
    },
    handleChange (value) {
      console.log(value)
    },
    resetForm (formName) {
      if (formName == 'accountForm') {
        this.accountForm.account = ''
      }
      if (formName == 'addressForm') {
        this.addressForm.username = ''
        this.addressForm.phone = ''
        this.addressForm.region = []
        this.addressForm.addDetail = ''
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        console.log('提交', valid)
        if (valid) {
          this.btnLoading = true
          if (formName == 'accountForm') {
            if (this.status == 'account') {
              console.log('提交平台账号', formName, valid)
              this.$http(this.ApiSetting.user.openVirGoods, {
                package_id: this.visualGoods.id,
                record_id: this.visualGoods.record_id,
                account: this.accountForm.account
              }).then(res => {
                this.btnLoading = false
                this.isShowDio = false
                if (res.status == 1) {
                  this.$message({
                    message: '我们将尽快充值至您的账号上',
                    type: 'success'
                  })
                  this.$emit('updateGoods')
                }
              }).catch(err => {
                this.btnLoading = false
                console.log(err)
              })
            }
            if (this.status == 'modifyAccount') {
              console.log('修改账号', formName, valid)
              this.$http(this.ApiSetting.user.changeAccount, {
                delivery_id: this.userAddress.id,
                account: this.accountForm.account
              }).then(res => {
                this.btnLoading = false
                this.isShowDio = false
                if (res.status == 1) {
                  this.$message({
                    message: '修改信息成功，我们将尽快发货',
                    type: 'success'
                  })
                  this.$emit('updateDeliInfo')
                }
              }).catch(err => {
                this.btnLoading = false
                console.log(err)
              })
            }
          }
          if (formName == 'addressForm') {
            if (this.status == 'modify') {
              this.$http(this.ApiSetting.user.modifyExpress, {
                delivery_id: this.userAddress.id,
                receive: this.addressForm.username,
                phone: this.addressForm.phone,
                province: this.addressForm.region[0],
                city: this.addressForm.region[1],
                address: this.addressForm.addDetail
              }).then(res => {
                console.log('修改快递地址', res)
                this.btnLoading = false
                this.isShowDio = false
                if (res.status == 1) {
                  this.$message({
                    message: '修改地址成功，我们会尽快发货',
                    type: 'success'
                  })
                }
                this.$emit('updateDeliInfo')
              })
                .catch(err => {
                  this.btnLoading = false
                })
            } else {
              const params = {
                address_id: this.status == 'edit' ? this.userAddress.id : null,
                receive: this.addressForm.username,
                phone: this.addressForm.phone,
                province: this.addressForm.region[0],
                city: this.addressForm.region[1],
                address: this.addressForm.addDetail
              }
              for (var props in params) {
                if (!params[props]) {
                  delete params[props]
                }
              }
              this.$http(this.ApiSetting.user.addAddress, params)
                .then(res => {
                  console.log('成功添加地址', res)
                  this.btnLoading = false
                  this.isShowDio = false
                  if (res.status == 1) {
                    this.$emit('confirmExpress', {
                      status: this.status,
                      addressId: res.data.address_id
                    })
                  }
                })
                .catch(err => {
                  this.btnLoading = false
                })
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
@import "~@/page/login/form.less";
@import "./address.less";
.vbmarket_address_dialog {
  .word-limit {
    position: absolute;
    right: 10px;
    bottom: 0;
    color: #7c839f;
  }
}
</style>
