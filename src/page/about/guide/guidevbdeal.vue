<template>
 <div class="guide_section">
    <div class="section_s">
       <div class="section_title">虚拟币交易平台</div>
       <Tabs class="vb_tabs" v-model="activeName">
         <TabPane :label="item.label"  :name="item.name"
         v-for="(item,index ) in vbdatas" :key="index">

            <Tabs class="vb_itemtabs"  v-model="tabActvieName">
              <TabPane :label="ptem.label"   :name="ptem.name"
              v-for="(ptem,index) in item.tabs" :key="index">
                  <h3 class="pane_h3">{{ptem.title}}</h3>
                  <p>{{ptem.detail}}</p>
                  <div class="" v-for="(ytem,index) in ptem.carousels" :key="index">
                    <p class="pane_des" v-html="ytem.des"></p>
                    <img :src="ytem.img" alt="">
                  </div>
              </TabPane>
            </Tabs>

         </TabPane>
       </Tabs>

    </div>
    <div class="section_s" >
       <div class="section_title" >注意事项</div>
       <p>
         ·  操作时请尽快完成[购买USDT]与[平台USDT存款]步骤，以免长时间未完成操作导致二维码失效。<br>

         ·  请购买与存款页面所相对应的USDT类型，如在存款页面选择ERC20则购买时也选择ERC20，不同类型转账将导致失败。<br>

         ·  转出时需要支付少量手续费，请在买币前联系对应交易平台客服了解手续费数量。<br>

         ·  若三次取消交易当日将无法再进行买入。<br>

         ·  如遇交易平台无法打开时建议尝试更换浏览器或开启VPN进行操作。<br>

         ·  进行任意交易前请确认好信息。<br>

         ·  本使用说明为热门交易平台功能介绍，不负责担保任何交易结果，使用中若遇到操作、账户类的问题，请在交易平台[帮助中心]联系[在线客服]。<br>

         ·  若交易平台的内容有所变更，一切以交易平台官方信息为准。
       </p>
    </div>
 </div>
</template>

<script>
import { Tabs, TabPane } from 'element-ui'

export default {
  name: "",
  data() {
    return {
      linkTabname: '',
      tabActvieName:"register",
      activeName: 'okex',
      vbdatas:[
        /*{
          label:"火币",
          name:"huobi",
          tabs:[{
              label:"注册认证",
              name:"register",
              title:"注册与认证",
              detail:"完成所有步骤，您便能够使用虚拟币进行各种充值、提现交易。",
              carousels:[{
                  des:"步骤1/3:登入首页www.huobi.com/zh-cn，点击右上角[注册]。",
                  img:require("../../../assets/guide/vb/huobi/register&authentic/huobi-zhuce-1.png")
                },{
                  des:"注册-步骤2/3:选择「手机号」或者「邮箱」注册，填写完毕输入密码，点击注册。",
                  img:require("../../../assets/guide/vb/huobi/register&authentic/huobi-zhuce-2.png")
                },{
                  des:"注册-步骤3/3:完成后，显示提示弹窗[注册成功]！",
                  img:require("../../../assets/guide/vb/huobi/register&authentic/huobi-zhuce-3.png")
                },{
                  des:"认证-步骤1/3:点击右上角[头像]，进入[账户＆安全]或[身份认证]。",
                  img:require("../../../assets/guide/vb/huobi/register&authentic/huobi-renzheng-1.png")
                },{
                  des:"认证-步骤2/3:账户安全-绑定资金密码，谷歌/邮箱验证，防钓鱼验证，安全设备。",
                  img:require("../../../assets/guide/vb/huobi/register&authentic/huobi-renzheng-2.png")
                },{
                  des:"认证-步骤3/3:身份认证-上传您的身份证信息，进行面部识别，完成实名认证完成认证之后，即可开启购买USDT功能。",
                  img:require("../../../assets/guide/vb/huobi/register&authentic/huobi-renzheng-3.png")
                },
              ]
            },{
              label:"购买USDT",
              name:"buyusdt",
              title:"购买USDT",
              detail:"完成所有步骤，您便能够使用虚拟币在VK平台上充值了。",
              carousels:[{
                  des:"步骤1/6: 买币请先点击右下方帮助联系客服，确认提现手续费后，在左上方点击[买币]。",
                  img:require("../../../assets/guide/vb/huobi/buyUSDT/huobi-goumai-1.png")
                },{
                  des:"步骤2/6: 选择[自选交易]，[购买]，[USDT]，输入想购买数量，点击[购买USDT]。",
                  img:require("../../../assets/guide/vb/huobi/buyUSDT/huobi-goumai-2.png")
                },{
                  des:"步骤3/6: 输入购买USDT数量（存入USDT数量+手续费），确认金额，支付方式，点击[立即购买] 。",
                  img:require("../../../assets/guide/vb/huobi/buyUSDT/huobi-goumai-3.png")
                },{
                  des:"步骤4/6: 进入[购买USDT]页面，确认付款信息，完成转账后，点击[我已完成转账，下一步]。",
                  img:require("../../../assets/guide/vb/huobi/buyUSDT/huobi-goumai-4.png")
                },{
                  des:"步骤5/6: 弹出确认视窗，确认后点击[确认]，过程大约3-5分钟。",
                  img:require("../../../assets/guide/vb/huobi/buyUSDT/huobi-goumai-5.png")
                },{
                  des:"步骤6/6: 完成之后，订单页面显示[订单已完成]。",
                  img:require("../../../assets/guide/vb/huobi/buyUSDT/huobi-goumai-6.png")
                },
              ]
            },{
              label:"USDT充值到VK",
              name:"usdtdeposit",
              title:"USDT充值到VK",
              detail:"完成所有步骤，您便能够将虚拟币交易平台中的USDT，充值到VK平台中的人民币余额了。",
              carousels:[{
                  des:"步骤1/9: 点击右上角[资产]，点击进入[币币账户]页面。",
                  img:require("../../../assets/guide/vb/huobi/deposit/huobi-chongzhi-1.png")
                },{
                  des:"步骤2/9: 请先绑定您要转出USDT的地址，点击[提币地址管理]。",
                  img:require("../../../assets/guide/vb/huobi/deposit/huobi-chongzhi-2.png")
                },{
                  des:"步骤3/9: 选择[币种]，[链名称]，输入[提币地址]，点击添加。",
                  img:require("../../../assets/guide/vb/huobi/deposit/huobi-chongzhi-3.png")
                },{
                  des:"步骤4/9: 手机获取验整码，输入后点击[确定]。",
                  img:require("../../../assets/guide/vb/huobi/deposit/huobi-chongzhi-4.png")
                },{
                  des:"步骤5/9: 完成绑定提币地址。",
                  img:require("../../../assets/guide/vb/huobi/deposit/huobi-chongzhi-5.png")
                },{
                  des:"步骤6/9: 点击USDT币种最右边的操作[提币]，输入[提币地址]，[链名称]，[数量]，确认[手续费]，点击提币。",
                  img:require("../../../assets/guide/vb/huobi/deposit/huobi-chongzhi-6.png")
                },{
                  des:"步骤7/9: 收到短信，即是完成转出，大约5-10分钟。",
                  img:require("../../../assets/guide/vb/huobi/deposit/huobi-chongzhi-7.png")
                },{
                  des:"步骤8/9: 点击总资产折合右侧进入[财务记录]页面。",
                  img:require("../../../assets/guide/vb/huobi/deposit/huobi-chongzhi-8.png")
                },{
                  des:"步骤9/9: 选择[提币记录]，即可看到历史交易记录。",
                  img:require("../../../assets/guide/vb/huobi/deposit/huobi-chongzhi-9.png")
                },
              ]
            },{
              label:"获取充币地址",
              name:"biurl",
              title:"获取充币地址",
              detail:"获取到地址后，可将其作为收款账户，进行虚拟币入账相关操作。",
              carousels:[{
                des:"步骤1/2: 点击右上角[钱包]，点击进入[币币账户]页面。",
                img:require("../../../assets/guide/vb/huobi/getURL/huobi-tixian-1.png")
              },{
                des:"步骤2/2: 点击USDT，右边[充币]，选择链名称，获取充币地址。",
                img:require("../../../assets/guide/vb/huobi/getURL/huobi-tixian-2.png")
              },]
            },{
              label:"USDT兑换人民币",
              name:"usdtrmb",
              title:"USDT兑换人民币",
              detail:"完成以下步骤，您便能够将虚拟币提现为人民币了。",
              carousels:[{
                des:"步骤1/10: 请先绑定收款账户：点击右上角[头像]，进入[法币设置] 。",
                img:require("../../../assets/guide/vb/huobi/exchange/huobi-duihuan-1.png")
              },{
                des:"步骤2/10: 点击[+添加收款方式]，添加银行卡/支付宝/微信信息。",
                img:require("../../../assets/guide/vb/huobi/exchange/huobi-duihuan-2.png")
              },{
                des:"步骤3/10: 选择收款方式，银行卡/支付宝/微信。",
                img:require("../../../assets/guide/vb/huobi/exchange/huobi-duihuan-3.png")
              },{
                des:"步骤4/10: 添加收款方式，输入姓名，账户信息，点击[完成设置]，即可开始兑换人民币。",
                img:require("../../../assets/guide/vb/huobi/exchange/huobi-duihuan-4.png")
              },{
                des:"步骤5/10: 主页左上方点击[买币]，选择[自选交易]，[出售]，[USDT]，选择出售方式，点击[出售USDT]。",
                img:require("../../../assets/guide/vb/huobi/exchange/huobi-duihuan-5.png")
              },{
                des:"步骤6/10: 弹出确认视窗，输入要出售的USDT数量，确认后点击[下单]。",
                img:require("../../../assets/guide/vb/huobi/exchange/huobi-duihuan-6.png")
              },{
                des:"步骤7/10: 进入[出售USDT]页面，等候付款人操作。",
                img:require("../../../assets/guide/vb/huobi/exchange/huobi-duihuan-7.png")
              },{
                des:"步骤8/10: 当付款人向您打款，请到您的银行卡/支付宝/微信确认是否收到款项，如果收到，点击[确认收款并放行]。",
                img:require("../../../assets/guide/vb/huobi/exchange/huobi-duihuan-8.png")
              },{
                des:"步骤9/10: 弹出确认视窗，输入资金密码，确认后点击[确认放行]，兑换过程大约3-5分钟。",
                img:require("../../../assets/guide/vb/huobi/exchange/huobi-duihuan-9.png")
              },{
                des:"步骤10/10: 确认之后，订单状态变成已完成，恭喜您完成兑换人民币！",
                img:require("../../../assets/guide/vb/huobi/exchange/huobi-duihuan-10.png")
              },]
            }
          ]
        },*/
        /*{
          label:"币安",
          name:"anbi",
          tabs:[{
              label:"注册认证",
              name:"register",
              title:"注册与认证",
              detail:"完成所有步骤，您便能够使用虚拟币进行各种充值、提现交易。",
              carousels:[{
                  des:"注册-步骤1/3:登入首页https://www.binancezh.com/cn ，点击右上角[注册]。",
                  img:require("../../../assets/guide/vb/bian/register&authentic/bian-zhuce-1.png")
                },{
                  des:"注册-步骤2/3:选择「手机」或者「邮箱」，填写完毕输入密码，点击[注册]。",
                  img:require("../../../assets/guide/vb/bian/register&authentic/bian-zhuce-2.png")
                },{
                  des:"注册-步骤3/3:完成后，显示提示弹窗[欢迎来到币安]，即注册成功！",
                  img:require("../../../assets/guide/vb/bian/register&authentic/bian-zhuce-3.png")
                },{
                  des:"认证-步骤1/3:点击右上角[头像]，进入[账户安全]或[身份认证]。",
                  img:require("../../../assets/guide/vb/bian/register&authentic/bian-renzheng-1.png")
                },{
                  des:"认证-步骤2/3:账户安全-绑定资金密码，谷歌/邮箱验证，防钓鱼验证，安全设备。",
                  img:require("../../../assets/guide/vb/bian/register&authentic/bian-renzheng-2.png")
                },{
                  des:"认证-步骤3/3:身份认证-上传您的身份证信息，进行面部识别，完成实名认证完成认证之后，即可开启购买USDT功能。",
                  img:require("../../../assets/guide/vb/bian/register&authentic/bian-renzheng-3.png")
                },
              ]
            },{
              label:"购买USDT",
              name:"buyusdt",
              title:"购买USDT",
              detail:"完成所有步骤，您便能够使用虚拟币在VK平台上充值了。",
              carousels:[{
                  des:"步骤1/6: 买币请先点击右下方联系客服，确认提现手续费，完成后点击主页中间点击[立即买币] 。",
                  img:require("../../../assets/guide/vb/bian/buyUSDT/bian-goumai-1.png")
                },{
                  des:"步骤2/6: 选择-我要买，USDT，输入想购买金额，选择支付方式，点击[购买USDT] 。",
                  img:require("../../../assets/guide/vb/bian/buyUSDT/bian-goumai-2.png")
                },{
                  des:"步骤3/6: 输入购买USDT数量（存入USDT数量+手续费），确认金额，支付方式，点击[确认购买]。",
                  img:require("../../../assets/guide/vb/bian/buyUSDT/bian-goumai-3.png")
                },{
                  des:"步骤4/6: 进入[购买USDT]页面，确认付款信息，进入银行/支付宝/微信，完成转账后，点击[我已完成转账，下一步]。",
                  img:require("../../../assets/guide/vb/bian/buyUSDT/bian-goumai-4.png")
                },{
                  des:"步骤5/6: 弹出确认视窗，确认后点击[确认]，过程大约3-5分钟。",
                  img:require("../../../assets/guide/vb/bian/buyUSDT/bian-goumai-5.png")
                },{
                  des:"步骤6/6: 完成之后，点击[钱包]，[法币账户]，总估值右边的眼睛，即可看到USDT数量。",
                  img:require("../../../assets/guide/vb/bian/buyUSDT/bian-goumai-6.png")
                },
              ]
            },{
              label:"USDT充值到VK",
               name:"usdtdeposit",
              title:"USDT充值到VK",
              detail:"完成所有步骤，您便能够将虚拟币交易平台中的USDT，充值到VK平台中的人民币余额了。",
              carousels:[{
                  des:"步骤1/10: 点击右上角[钱包]，点击进入[现货账户]页面。",
                  img:require("../../../assets/guide/vb/bian/deposit/bian-chongzhi-1.png")
                },{
                  des:"步骤2/10: 点击右边[提现]。",
                  img:require("../../../assets/guide/vb/bian/deposit/bian-chongzhi-2.png")
                },{
                  des:"步骤3/10: 请先绑定您要转出USDT的地址，点击[地址管理]。",
                  img:require("../../../assets/guide/vb/bian/deposit/bian-chongzhi-3.png")
                },{
                  des:"步骤4/10: 点击[添加提现地址]。",
                  img:require("../../../assets/guide/vb/bian/deposit/bian-chongzhi-4.png")
                },{
                  des:"步骤5/10: 选择[币种]，[主网]，输入[地址]。",
                  img:require("../../../assets/guide/vb/bian/deposit/bian-chongzhi-5.png")
                },{
                  des:"步骤6/10: 点击方框，点击加入白名单，完成绑定启用。",
                  img:require("../../../assets/guide/vb/bian/deposit/bian-chongzhi-6.png")
                },{
                  des:"步骤7/10: 进入提现页面，选择[币种]，右边选择[USDT提币地址]，[转账网路]，[数量]，确认[手续费]，点击提交。",
                  img:require("../../../assets/guide/vb/bian/deposit/bian-chongzhi-7.png")
                },{
                  des:"步骤8/10: 收到验证邮件，点击确认，即可完成转出，大约5-10分钟。",
                  img:require("../../../assets/guide/vb/bian/deposit/bian-chongzhi-8.png")
                },{
                  des:"步骤9/10: 点击进入[现货账户]页面,点击右侧[钱包历史纪录]。",
                  img:require("../../../assets/guide/vb/bian/deposit/bian-chongzhi-9.png")
                },{
                  des:"兑充值步骤10/10: 选择[充值/提现]，[数字货币]，即可看到历史交易记录。",
                  img:require("../../../assets/guide/vb/bian/deposit/bian-chongzhi-10.png")
                },
              ]
            },{
              label:"获取充币地址",
              name:"biurl",
              title:"获取充币地址",
              detail:"获取到地址后，可将其作为收款账户，进行虚拟币入账相关操作。",
              carousels:[{
                des:"步骤1/3: 点击右上角[钱包]，点击进入[现货账户]页面。",
                img:require("../../../assets/guide/vb/bian/getURL/bian-tixian-1.png")
              },{
                des:"步骤2/3: 点击右边[充值]。",
                img:require("../../../assets/guide/vb/bian/getURL/bian-tixian-2.png")
              },{
                des:"步骤3/3: 进入充值页面，选择[数字货币]，币种[USDT]，选择[充值网路]，获取二维码地址与链接。",
                img:require("../../../assets/guide/vb/bian/getURL/bian-tixian-2.png")
              },]
            },{
              label:"USDT兑换人民币",
              name:"usdtrmb",
              title:"USDT兑换人民币",
              detail:"完成以下步骤，您便能够将虚拟币提现为人民币了。",
              carousels:[{
                des:"步骤1/9: 请先绑定收款账户：点击右上角[头像]，进入[账户安全]。",
                img:require("../../../assets/guide/vb/bian/exchange/bian-duihuan-1.png")
              },{
                des:"步骤2/9: 点击左侧[收款方式]，右侧[创建支付方式]。",
                img:require("../../../assets/guide/vb/bian/exchange/bian-duihuan-2.png")
              },{
                des:"步骤3/9: 添加支付方式，选择支付方式，输入姓名，支付账号信息，点击[确认] 。",
                img:require("../../../assets/guide/vb/bian/exchange/bian-duihuan-3.png")
              },{
                des:"步骤4/9: 选择右侧激活，完成添加支付方式。",
                img:require("../../../assets/guide/vb/bian/exchange/bian-duihuan-4.png")
              },{
                des:"步骤5/9: 点击左上角[买币]，进入快捷交易，选择[我要卖]，[USDT]，输入您需要出售的金额，并选择收款方式，点击下方[出售USDT]。",
                img:require("../../../assets/guide/vb/bian/exchange/bian-duihuan-5.png")
              },{
                des:"步骤6/9: 弹出确认视窗，输入要出售的USDT数量，确认后点击[立即出售]。",
                img:require("../../../assets/guide/vb/bian/exchange/bian-duihuan-6.png")
              },{
                des:"步骤7/9: 进入[出售USDT]页面，当付款人向您打款，请到银行卡/支付宝/微信确认是否收到款项，如果收到，点击[放行]。",
                img:require("../../../assets/guide/vb/bian/exchange/bian-duihuan-7.png")
              },{
                des:"步骤8/9: 弹出确认视窗，确认后点击[确认放行]，卖出USDT过程大约3-5分钟。",
                img:require("../../../assets/guide/vb/bian/exchange/bian-duihuan-8.png")
              },{
                des:"步骤9/9: 确认之后，订单状态变成已完成， 恭喜您完成兑换人民币。",
                img:require("../../../assets/guide/vb/bian/exchange/bian-duihuan-9.png")
              }]
            }
          ]
        },*/
        /*{
          label:"58coin",
          name:"58coin",
          tabs:[{
              label:"注册认证",
              name:"register",
              title:"注册与认证",
              detail:"完成所有步骤，您便能够使用虚拟币进行各种充值、提现交易。",
              carousels:[{
                  des:"注册-步骤1/3:登入首页https://www.58coin.me，点击右上角[注册]。",
                  img:require("../../../assets/guide/vb/58coin/register&authentic/58-zhuce-1.png")
                },{
                  des:"注册-步骤2/3:选择「手机注册」或者「邮箱注册」，填写完毕输入密码，点击[注册]。",
                  img:require("../../../assets/guide/vb/58coin/register&authentic/58-zhuce-2.png")
                },{
                  des:"注册-步骤3/3:确认风险提示，确认后即可注册成功！",
                  img:require("../../../assets/guide/vb/58coin/register&authentic/58-zhuce-3.png")
                },{
                  des:"认证-步骤1/3:点击右上角[头像]，进入[账户安全]或[身份认证]。",
                  img:require("../../../assets/guide/vb/58coin/register&authentic/58-renzheng-1.png")
                },{
                  des:"认证-步骤2/3:安全设置-绑定资金密码，谷歌/邮箱验证，防钓鱼验证，安全设备。",
                  img:require("../../../assets/guide/vb/58coin/register&authentic/58-renzheng-2.png")
                },{
                  des:"认证-步骤3/3:安全设置-绑定资金密码，谷歌/邮箱验证，防钓鱼验证，安全设备。",
                  img:require("../../../assets/guide/vb/58coin/register&authentic/58-renzheng-3.png")
                },
              ]
            },{
              label:"购买USDT",
              name:"buyusdt",
              title:"购买USDT",
              detail:"完成所有步骤，您便能够使用虚拟币在VK平台上充值了。",
              carousels:[{
                  des:"步骤1/6:买币请先点击右下方联系客服，确认提现手续费，完成后左上方点击[法币OTC交易]。",
                  img:require("../../../assets/guide/vb/58coin/buyUSDT/58-goumai-1.png")
                },{
                  des:"步骤2/6:进入OTC交易页面，选择[我要购买]，[USDT]，输入想购买数量，点击[购买USDT]。",
                  img:require("../../../assets/guide/vb/58coin/buyUSDT/58-goumai-2.png")
                },{
                  des:"步骤3/6:输入购买USDT数量（存入USDT数量+手续费），确认金额，支付方式，点击[确认购买]。",
                  img:require("../../../assets/guide/vb/58coin/buyUSDT/58-goumai-3.png")
                },{
                  des:"步骤4/6:进入[购买USDT]页面，确认付款信息，进入银行/支付宝/微信，完成转账后，点击[我已付款成功]。",
                  img:require("../../../assets/guide/vb/58coin/buyUSDT/58-goumai-4.png")
                },{
                  des:"步骤5/6:弹出确认视窗，确认后点击[确认已付款]，过程大约3-5分钟。",
                  img:require("../../../assets/guide/vb/58coin/buyUSDT/58-goumai-5.png")
                },{
                  des:"步骤6/6:完成之后，订单页面显示[已完成] 。",
                  img:require("../../../assets/guide/vb/58coin/buyUSDT/58-goumai-6.png")
                },
              ]
            },{
              label:"USDT充值到VK",
               name:"usdtdeposit",
              title:"USDT充值到VK",
              detail:"完成所有步骤，您便能够将虚拟币交易平台中的USDT，充值到VK平台中的人民币余额了。",
              carousels:[{
                  des:"步骤1/7:点击右上角[资产]，点击右上角[提现]，进入总资产折合页面。",
                  img:require("../../../assets/guide/vb/58coin/deposit/58-chongzhi-1.png")
                },{
                  des:"步骤2/7:在总资产折合页面，右侧点击[提现]。",
                  img:require("../../../assets/guide/vb/58coin/deposit/58-chongzhi-2.png")
                },{
                  des:"步骤3/7:进入提现页面，选择[币种] USDT。",
                  img:require("../../../assets/guide/vb/58coin/deposit/58-chongzhi-3.png")
                },{
                  des:"步骤4/7:选择[链名]，[USDT地址]，[备注]，点击[添加]。",
                  img:require("../../../assets/guide/vb/58coin/deposit/58-chongzhi-4.png")
                },{
                  des:"步骤5/7:输入[提现数量]，[资金密码]，[短信验证码]，确认[手续费]，点击[提现]。",
                  img:require("../../../assets/guide/vb/58coin/deposit/58-chongzhi-5.png")
                },{
                  des:"步骤6/7:收到确认邮件，点击确认。",
                  img:require("../../../assets/guide/vb/58coin/deposit/58-chongzhi-6.png")
                },{
                  des:"步骤7/7:完成之后弹出提币成功，大约5-10分钟。",
                  img:require("../../../assets/guide/vb/58coin/deposit/58-chongzhi-7.png")
                }
              ]
            },{
              label:"获取充币地址",
              name:"biurl",
              title:"获取充币地址",
              detail:"获取到地址后，可将其作为收款账户，进行虚拟币入账相关操作。",
              carousels:[{
                des:"步骤1/3: 点击右上角[资产]，点击进入[充值]页面。",
                img:require("../../../assets/guide/vb/58coin/getURL/58-tixian-1.png")
              },{
                des:"步骤2/3: 选择币种[USDT]。",
                img:require("../../../assets/guide/vb/58coin/getURL/58-tixian-2.png")
              },{
                des:"步骤3/3: 选择[链名]，获取充值地址与二维码。",
                img:require("../../../assets/guide/vb/58coin/getURL/58-tixian-2.png")
              },]
            },{
              label:"USDT兑换人民币",
              name:"usdtrmb",
              title:"USDT兑换人民币",
              detail:"完成以下步骤，您便能够将虚拟币提现为人民币了。",
              carousels:[{
                des:"步骤1/11: 请先绑定收款账户：点击右上角[头像]，进入[账户安全]。",
                img:require("../../../assets/guide/vb/58coin/exchange/58-duihuan-1.png")
              },{
                des:"步骤2/11: 收款方式右侧，点击[立即设置]收款方式。",
                img:require("../../../assets/guide/vb/58coin/exchange/58-duihuan-2.png")
              },{
                des:"步骤3/11: 设置您的收款方式，点击添加：银行卡/支付宝/微信。",
                img:require("../../../assets/guide/vb/58coin/exchange/58-duihuan-3.png")
              },{
                des:"步骤4/11: 输入姓名，账号信息，输入验证码，点击[提交]，完成添加支付方式。",
                img:require("../../../assets/guide/vb/58coin/exchange/58-duihuan-4.png")
              },{
                des:"步骤5/11: 左上方点击[法币OTC交易]。",
                img:require("../../../assets/guide/vb/58coin/exchange/58-duihuan-5.png")
              },{
                des:"步骤6/11: 进入OTC交易页面，选择[我要出售]，[USDT]，确认出售金额，点击[出售USDT]。",
                img:require("../../../assets/guide/vb/58coin/exchange/58-duihuan-6.png")
              },{
                des:"步骤7/11: 弹出确认视窗，输入要出售的USDT数量，确认后点击[确认出售]。",
                img:require("../../../assets/guide/vb/58coin/exchange/58-duihuan-7.png")
              },{
                des:"步骤8/11: 进入[待买家付款]页面，等候买家进行操作。",
                img:require("../../../assets/guide/vb/58coin/exchange/58-duihuan-8.png")
              },{
                des:"步骤9/11: 买家操作后，进入[待放行]页面，请到您的银行卡/支付宝/微信确认是否收到款项，如果收到，点击[确认放行USDT]。",
                img:require("../../../assets/guide/vb/58coin/exchange/58-duihuan-9.png")
              },{
                des:"步骤10/11: 弹出确认视窗，输入资金密码后点击[确认放行] ，兑换过程大约3-5分钟。",
                img:require("../../../assets/guide/vb/58coin/exchange/58-duihuan-9.png")
              },{
                des:"步骤11/11: 确认到账之后，订单状态变成已完成，恭喜您完成兑换人民币！",
                img:require("../../../assets/guide/vb/58coin/exchange/58-duihuan-9.png")
              }]
            }
          ]
        },*/
        {
          label:"欧易",
          name:"okex",
          tabs:[{
            label:"下载&注册",
            name:"register",
            title:"下载&注册",
            detail:"",
            carousels:[
              {
                des:"步骤1/4: 访问 https://www.okex.com。",
                img:require("../../../assets/guide/vb/okex/register/1.jpg")
              },
              {
                des:"步骤2/4: 选择【登录/注册】点击【立即注册】支持手机号注册和邮箱注册两种方式，按照要求填写信息，这里以手机注册为例，输入手机号码/登录密码。",
                img:require("../../../assets/guide/vb/okex/register/2.jpg")
              },
              {
                des:"步骤3/4: 完成手机短信验证后自动注册成功。",
                img:require("../../../assets/guide/vb/okex/register/3.jpg")
              },
              {
                des:"步骤4/4: 完成注册，欢迎来到数字货币的世界。",
                img:require("../../../assets/guide/vb/okex/register/4.jpg")
              }
            ]
          }, {
            label:"充值",
            name:"buyusdt",
            title:"充值",
            detail: "",
            carousels:[
              {
                des:"步骤1/4: 首先登录欧易账户，点击右上【资产管理】选择【提现】—选择币种【USDT】。",
                img:require("../../../assets/guide/vb/okex/buyusdt/1.jpg")
              },
              {
                des:"步骤2/4: 选择【链上提现】—选择提现网络，网络以【USDT-ERC20】为例点击【下一步】。<br>注意：提币地址和数量需要和收银台页面展示信息一致。",
                img:require("../../../assets/guide/vb/okex/buyusdt/2.jpg")
              },
              {
                des:"步骤3/4: 输入USDT地址和数量后点击下一步。",
                img:require("../../../assets/guide/vb/okex/buyusdt/3.jpg")
              },
              {
                des:"步骤4/4: 验证【资金密码】【邮箱验证码】【手机验证码/谷歌验证】。验证完成后点击【确认】成功发起提款申请后，等候1-3分钟即可成功到账。",
                // img:require("../../../assets/guide/vb/okex/buyusdt/1.jpg")
              }
            ]
          }, {
            label:"获取收款地址",
            name:"biurl",
            title:"获取收款地址",
            detail:"",
            carousels:[
              {
                des:"步骤1/3: 登录欧易网站，选择【资产管理】点击充值。",
                img:require("../../../assets/guide/vb/okex/biurl/1.jpg")
              },
              {
                des:"步骤2/3: 选择或搜索您想要绑定的虚拟币币种，再选择可用网络，点击下一步。",
                img:require("../../../assets/guide/vb/okex/biurl/2.jpg")
              },
              {
                des:"步骤3/3: 点击【复制地址】<br>注意：该地址为新链地址，对拥有多个链名称的币种，如果需要绑定旧链地址需要到Web端或者APP进行选择查看复制地址。",
                img:require("../../../assets/guide/vb/okex/biurl/3.jpg")
              }
            ]
          }]
        },
        {
          label: "Gate.io",
          name: "gate.io",
          tabs:[{
            label:"下载&注册",
            name:"register",
            title:"下载&注册",
            detail:"",
            carousels:[
              {
                des:"步骤1/5: 访问 https://www.gate.io，点击右上角“登录/注册”。",
                img:require("../../../assets/guide/vb/gate/register/1.jpg")
              },
              {
                des:"步骤2/5: 若您未登录过，点击“免费注册”。",
                img:require("../../../assets/guide/vb/gate/register/2.jpg")
              },
              {
                des:"步骤3/5: 例如选择邮箱注册，按照要求填写用户名/邮箱/登录密码，点击【下一步】。",
                img:require("../../../assets/guide/vb/gate/register/3.jpg")
              },
              {
                des:"步骤4/5: 设置资金密码，点击【立即注册】。",
                img:require("../../../assets/guide/vb/gate/register/4.jpg")
              },
              {
                des:"步骤5/5: 到邮箱中找到激活邮件，并点击邮件中激活链接，即可完成注册。",
                img:require("../../../assets/guide/vb/gate/register/5.jpg")
              }
            ]
          }, {
            label:"充值",
            name:"buyusdt",
            title:"充值",
            detail: "",
            carousels:[
              {
                des:"步骤1/3: 首先打开网站登录账号后点击右上角【钱包】选择【提现】。",
                img:require("../../../assets/guide/vb/gate/buyusdt/1.jpg")
              },
              {
                des:"步骤2/3: 选择【提现到钱包地址】—选择提现币种和链名称，链名称以【USDT-TRC20】为例输入／粘贴【提现地址】—【提现金额】。<br>注意：提币地址和数量需要和收银台页面展示信息一致。",
                img:require("../../../assets/guide/vb/gate/buyusdt/2.jpg")
              },
              {
                des:"步骤3/3: 二次确认转账信息正确并验证【资金密码】【手机验证码/谷歌验证】等，提交提现申请。",
                img:require("../../../assets/guide/vb/gate/buyusdt/3.jpg")
              }
            ]
          }, {
            label:"获取收款地址",
            name:"biurl",
            title:"获取收款地址",
            detail:"",
            carousels:[
              {
                des:"步骤1/2: 首先打开网站登录账号后点击右上角【钱包】选择【充值】。",
                img:require("../../../assets/guide/vb/gate/biurl/1.jpg")
              },
              {
                des:"步骤2/2: 选择或搜索您想要绑定的虚拟币币种然后选择链名称，下方生成对应地址和二维码，点击【复制】。<br>注意：该地址为新链地址，对拥有多个链名称的币种，如果需要绑定旧链地址需要到Web端或者APP进行选择查看复制地址。",
                img:require("../../../assets/guide/vb/gate/biurl/2.jpg")
              }
            ]
          }]
        }
      ]
    };
  },
  components: {
    Tabs,
    TabPane
  },
  mounted() {
    this.activeName =  this.$route.params.name || "okex"
    this.tabActvieName = this.$route.params.tabname || 'register'
    if (this.$route.params.tabname) this.linkTabname = this.$route.params.tabname
  },
  watch: {
    activeName() {
      if (!this.linkTabname) {
        this.tabActvieName = 'register'
      }
      this.linkTabname = ''
    }
  },
  methods: {}
};
</script>

<style  lang="less">
.vb_tabs {
  .el-tabs__header {
    margin-bottom:0;
    //background-color: #1a1e27;
    &:before {
      content:"";
      position:absolute;
      bottom:0;
      left:-60px;
      width:945px;
      height: 1px;
      background-color: #17191f;
    }
  }
  .el-tabs__nav {
    height:55px
  }
  .el-tabs__item {
    text-align:center;
    font-size:18px;
    min-width:112px
  }
  .el-tabs__active-bar {
    height: 4px;
    background-image: linear-gradient(to left, #07f1b7, #07e9f1);
  }

}
.vb_itemtabs {
  .el-tabs__nav-wrap {
    background-color: #17191f;
  }
  .el-tabs__nav {
    height:64px;
  }
  .el-tabs__item  {
    padding:0;
    color: #7c839f;
    width: 164px;
    height: 64px;
    line-height:64px;
    text-align:center;
    background-color: #1a1e27;
    transition:background 0.2s,color 0.2s;
  }
  .el-tabs__active-bar {
    display:none;
  }
  .el-tabs__item.is-active {
    color:#fff;
    background-color: #17191f;
  }
  .el-tabs__item:hover {
    cursor: pointer;
    background-color: #17191f;
  }
  .pane_h3 {
    font-size:18px;
    color:#fff;
    font-weight:normal;
    margin-top:18px;
  }
  .pane_des {
    margin:10px 0 !important;
  }
  img {
    max-width:100%;
  }
}

</style>
