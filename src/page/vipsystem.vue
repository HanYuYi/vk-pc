<template>
  <div class="vipsystem_box">
    <!--跑马灯-->
    <vue-seamless-scroll v-if="listsShow" :data="lists" :class-option="optionLeft" class="seamless-warp2">
        <ul class="item">
            <li v-for="(item,index) in lists" :key="index" >{{item}}</li>
        </ul>
    </vue-seamless-scroll>
    <div class="vipsystem">
      <!--等级卡片-->
      <div class="card_box">
        <carousel-3d
        :perspective="0"
        :space="280"
        :display="5"
        :startIndex="startIndex"
        inverseScaling="60"
        width="386"
        ref="carousel"
        height="500" border="0"
        :controlsVisible="true"
          class="vip_card" v-if="classRule.length"
          @after-slide-change="onSlideChange"
          >
          <slide  v-for="(item,index) in classRule" :key="index"
          :index="index"
          :class="['card_'+item.level_type]"
          class="item_card">
            <div class="light" v-show="rendered"></div>
            <div class="card_info">
              <p class="lv_cnname">{{item.level_name}}勋章</p>
              <img class="lv_img" :src="require('../assets/vipsystemnew/medal/'+index+'.png')" alt="">

              <img v-show="index>1&&rendered"
              class="shinning_img shinning_img1" src="../assets/active/mining/shining.png" alt="" >

              <img v-show="index>=11&&rendered"
              class="shinning_img shinning_img2" src="../assets/active/mining/shining.png" alt="" >

              <img v-show="index==12&&rendered"
              class="shinning_img shinning_img3" src="../assets/active/mining/shining.png" alt="" >

              <div class="info_mask" v-show="rendered"></div>
            </div>
            <div class="card_face">
              <!--小于用户等级-->
              <div class="before_lv other_lv" v-show="index<initInfo.level&&initInfo.is_login">
                <img src="../assets/vipsystemnew/before_lv.png" alt="">
                <p class="yellow">{{item.level}}会员</p>
              </div>
              <!--大于用户等级-->
              <div class="after_lv other_lv" v-show="index>initInfo.level||!initInfo.is_login">
                <img src="../assets/vipsystemnew/lock.png" alt="">
                <p class="yellow">{{item.level}}会员</p>
              </div>

              <p class="back_cur" v-show="index!=initInfo.level&&initInfo.is_login"
              @click="toCurLeval()">回到当前等级</p>

              <!--用户当前等级-->
              <div class="base" v-show="index==initInfo.level&&initInfo.is_login">
                <img class="headimg fl" :src="initInfo.head_image" alt="" onerror="this.src='/pc_static/defaultimg/headimg.png';this.onerror=null" >
                <div class="fl">
                  <p ><span class="nickname ellips yellow" :title="initInfo.nickname">{{initInfo.nickname}}</span>&nbsp;<span class="vertical_m">您好!</span></p>
                  <p>VIP{{initInfo.level}}会员第 <span class="yellow">{{initInfo.keep_day}}</span> 天</p>
                </div>
              </div>
              <div class="progress" v-show="index==initInfo.level&&initInfo.is_login">
                <div class="pro_line" v-show="initInfo.level>0">
                  <b>保级</b>&nbsp;(还剩<span class="yellow">{{initInfo.valid_day}}天</span>)
                  <el-popover
                    popper-class=" pro_poper"
                    placement="bottom-end"
                    trigger="hover" >
                    <p>
                      保级：<br>
                      存款 <span class="vip_yellow"> {{formatMoney(initInfo.relegation_deposit)}}</span>/{{formatMoney(initInfo.relegation_requrie_deposit)}} <br>
                      流水  <span class="vip_yellow"> {{formatMoney(initInfo.relegation_bet)}}</span>/{{formatMoney(initInfo.relegation_requrie_bet)}}
                    </p>
                    <p class="fr cuerp" slot="reference"><span class="text_de">已完成</span><span class="text_de yellow">{{initInfo.percent_relegation}}%</span></p>
                  </el-popover>
                </div>
                <div v-show="initInfo.level<12">
                  <b>升级</b>&nbsp;到<span class="yellow">VIP{{initInfo.level+1}}</span>
                  <el-popover
                    popper-class=" pro_poper"
                    placement="bottom-end"
                    trigger="hover" >
                    <p>
                      升级到VIP{{initInfo.level+1}}：<br>
                      存款 <span class="vip_yellow">{{formatMoney(initInfo.upgrade_deposit)}}</span> /{{formatMoney(initInfo.upgrade_requrie_deposit)}} <br>
                      流水 <span class="vip_yellow">{{formatMoney(initInfo.upgrade_bet)}}</span> /{{formatMoney(initInfo.upgrade_requrie_bet)}}
                    </p>
                    <p class="fr cuerp" slot="reference"><span class="text_de">已完成</span><span class="text_de yellow">{{initInfo.percent_upgrade }}%</span></p>
                  </el-popover>
                </div>
              </div>
            </div>
          </slide >
        </carousel-3d>
      </div>
      <!--升级保级细则66677990099-->
      <p class="rule_class">
        等级晋升后开启90天保级期，保级期内完成存款和流水要求则保级成功，未完成则降一级。
         <el-popover
         popper-class="class_rule_poper"
         placement="bottom-end"
         trigger="click"  width="1034">
           <!--升级保级表44-->
            <div class="class_rule">
              <table class="table_true" v-if="classRule.length">
                <tr class="white_c">
                  <td colspan="2" class="top_left_rad">会员等级</td>
                  <td v-for="j in 12" :key="j">
                    {{classRule[j].level}}
                    <div class="cur_clo" v-show="initInfo.level==(j)&&initInfo.is_login"></div>
                  </td>
                  </tr>
                <tr >
                  <td colspan="2" class="white_c ">会员勋章</td>
                  <td class="b_s" v-for="j in 12" :key="j">{{classRule[j].level_name}}</td>
                  </tr>
                <tr>
                  <td rowspan="2" class="white_c b_w">升级要求<br>（累计）</td>
                  <td class="white_c">存款</td>
                  <td v-for="j in 12" :key="j">{{classRule[j].upgrade_deposit}}</td>
                  </tr>
                <tr>
                  <td class="white_c">流水</td>
                  <td v-for="j in 12" :key="j">{{classRule[j].upgrade_bet}}</td>  </tr>
                <tr>
                  <td rowspan="2" class="white_c b_w">保级要求<br>（累计）</td>
                  <td class="white_c">存款</td>
                  <td v-for="j in 12" :key="j">{{classRule[j].relegation_deposit}}</td>
                </tr>
                <tr>
                  <td class="white_c">流水</td>
                  <td v-for="j in 12" :key="j">{{classRule[j].relegation_bet}}</td>  </tr>
              </table>
              <p class="class_rule_desc">注意：IM电竞游戏不计算在VIP升降级的有效流水中。</p>
            </div>
           <span slot="reference" class="text_de yellow">查看升保级明细</span>
         </el-popover>
      </p>
       <!--轮播和能获取的优惠-->
       <div class="siledr_discount_box">

        <div class="siledr">
          <div class="siledr_block">
              <el-carousel  trigger="click"   ref="cardcarousel" class="vip_swipe"  @change="chang" arrow="never">
                <el-carousel-item v-for="(item,index) in listSiledr" :key="index" class="vip_swipe_item">
                  <div class="siledr_img_box"><img :src="item.imgUrl" alt=""></div>
                </el-carousel-item>
              </el-carousel>
          </div>

        </div>

          <ul class="can_discount" >
            <li
            v-for="(receItme,index) in rewardList[currentIndex]"
            :key="index"

            :class="{
              'got':receItme.url_type==1&&receItme.status==2,
              'canshow':receItme.is_show,
              'btnshow':(initInfo.is_login&&receItme.url_type==2&&receItme.status==1) ||
              (initInfo.is_login&&receItme.url_type==1&&receItme.status==1) ||
              (initInfo.is_login&&receItme.url_type==1&&receItme.level==initInfo.level&&receItme.status==0) ||
              (initInfo.is_login&&receItme.url_type==1&&receItme.status==2)
            }"
            >

              <div class="detail "    :class="{'active_cak' :index==activeIndex  }"    @click="setActiveItem(index)">
                <div class="type_icon" :class="receItme.card_en"></div>
                <!--晋级礼金、游戏体验金-->
                <p  v-if="receItme.card_en=='upgrade'||receItme.card_en=='privilege'">{{receItme.max_bonus }}<span>元</span></p>
                <!--生日礼金-->
                <p  v-if="receItme.card_en=='birth'">{{receItme.max_bonus }}<span>{{receItme.bonus_type}}</span></p>
                <!--返水-->
                <p  v-if="receItme.card_en=='back' ">{{receItme.max_bonus }}</p>
                <!--月存优惠/月救援金-->
                <p  v-if="receItme.card_en=='deposit'||receItme.card_en=='rescue'">
                  <span v-show="receItme.status==0||receItme.status==3">最高</span>{{receItme.status==0||receItme.status==3? receItme.max_bonus: receItme.bonus}}<span>元</span>
                </p>
                   <!--月成就奖-->
                <p  v-if="receItme.card_en=='achienement'">最高{{receItme.max_bonus }}<span>元</span></p>

                <p>{{ receItme.card_name}}</p>
                <p  v-if="receItme.tips&&receItme.card_en=='kf_service'">{{ receItme.tips}}</p>
                <p  class="detail_txt" v-if="receItme.tips&&receItme.card_en!='kf_service'">{{ receItme.tips}}</p>
                <div class="mask"></div>
                <!--按钮-->
                <transition name="fade-in-linear">
                  <div class="get_btn"
                  v-show="initInfo.is_login&&receItme.url_type==2&&receItme.status==1"
                  @click="openKfWindoww(receItme.url)">联系客服</div>
                </transition>
                <!--0  不可领取   1  可领取    2已领取   3不显示-->
                <!--等于当前等级，0、1显示为“申请领取”, 小于或者大于当前等级 1显示为“申请领取” -->
                  <transition name="fade-in-linear">
                <div @click="apply(receItme,receItme.card_en)" class="get_btn"
                  v-show="(initInfo.is_login&&receItme.url_type==1&&receItme.status==1) ||
                  (initInfo.is_login&&receItme.url_type==1&&receItme.level==initInfo.level&&receItme.status==0)">
                    申请领取
                </div>
                </transition>
                <!--所有等级, 2显示为“已领取”-->
                  <transition name="fade-in-linear">
                <div class="get_btn"
                v-show="initInfo.is_login&&receItme.url_type==1&&receItme.status==2">已领取</div>
                </transition>
              </div>

            </li>

          </ul>
       </div>

       <!--规则-->
      <h2 class="rule_title">VIP特权优惠说明</h2>
      <div class="rule_table">
        <Tabs v-model="activeName" >
          <TabPane label="VIP专属优惠" name="first">
            <div class="table_box">
              <table class="table_con table_bg" v-if="vipExclu.length">
                <tr>
                  <td>等级</td>
                  <td v-for="j in 13" :key="j" class="first">
                    {{ vipExclu[j-1].level }}
                    <div class="cur_clo" v-show="initInfo.level==(j-1)&&initInfo.is_login"></div>
                  </td>
                </tr>
                <tr>
                  <td>会员勋章</td>
                  <td v-for="j in 13" :key="j" >
                    {{ vipExclu[j-1].vip_name }}
                  </td>
                </tr>
                <tr>
                  <td>单日提款额度</td>
                  <td v-for="j in 13" :key="j">{{ vipExclu[j-1].withdraw_limit }}</td>
                </tr>

                <tr>
                  <td>生日礼金</td>
                  <td v-for="j in 13" :key="j">{{ vipExclu[j-1].brithday_bonus }}</td>
                </tr>
                <tr>
                  <td>晋级礼金</td>
                  <td v-for="j in 13" :key="j">{{ vipExclu[j-1].upgrade_bonus }}</td>
                </tr>

                <tr>
                  <td>专属客服</td>
                  <td v-for="j in 13" :key="j">{{ vipExclu[j-1].cs_type }}</td>
                </tr>
                  <tr>
                  <td>极速提款</td>
                  <td v-for="j in 13" :key="j"> {{ vipExclu[j-1].is_fast_withdraw==1 ? "支持" :"-" }} </td>

                </tr>
                  <tr>
                  <td>特殊节日礼品</td>
                  <td v-for="j in 13" :key="j">{{ vipExclu[j-1].is_festival_gift==1 ?  "支持" :"-"   }}</td>
                </tr>
                  <tr>
                  <td>V币商城每日兑换次数</td>
                  <td v-for="j in 13" :key="j">{{ vipExclu[j-1].vmall_day_times==0 ? "无限" : vipExclu[j-1].vmall_day_times}}</td>
                </tr>
                  <tr>
                  <td>年度私人定制海岛游</td>
                  <td v-for="j in 13" :key="j">{{ vipExclu[j-1].island_tour=="" ?  "-" : vipExclu[j-1].island_tour }}</td>
                </tr>
                  <tr>
                  <td>威客公主空降伴游</td>
                  <td v-for="j in 13" :key="j">{{ vipExclu[j-1].is_vk_girl==1 ?  "支持" :"-" }}</td>
                </tr>
              </table>
            </div>
            <h3>专属优惠说明</h3>
            <p>
              	1.晋级礼金：VIP会员每次完成等级的晋升即可在活动页面自助领取晋级礼金，每个VIP等级的晋级礼金仅限领取一次，奖金需完成全站3倍有效流水。<br>
                2.生日礼金：生日礼金领取有效期为7天，从生日当日起，7日内可以领取。生日礼金需完成1倍全站有效流水，此礼金每年仅限领取1次。若VIP会员在注册的三个月内过生日，今年则不可领取生日礼金。<br>
                3.专属客服：VIP用户可享有对应的专属客服，当VIP用户联系在线客服时，系统将自动为会员匹配对应的专属客服。<br>
                4.极速提款：等级≥VIP8的会员，将享有优先出款的待遇。	<br>
                5.特殊节日礼品：每年特殊节假日，等级≥VIP8的会员将获得精美节日礼品一份，具体节日礼品派发，请以客服站内信通知为准。		<br>
                6.V币商城每日兑换次数：VIP会员可享有对应的V币商城每日兑换次数。<br>
                7.年度私人定制：等级≥VIP11的会员，即可联系在线客服进行申请东南亚三天两夜海岛游。此优惠每年仅限申请一次，无法折现。若VIP会员今年没有进行申请，则视为自动放弃。<br>
                8.威客公主空降伴游：等级达到VIP12的会员，即可联系在线客服进行申请空降嫩模一枚。此优惠每年仅限申请一次，无法折现。若VIP会员今年没有进行申请，则视为自动放弃。<br>
                9.以上所有VIP等级权益最终解释权归VKGAME所有。
            </p>
          </TabPane>
          <TabPane label="VIP日返水" name="second">
            <div class="table_box">
                <table class="table_con table_bg" v-if="vipBack.length">
                  <tr>
                    <td>等级</td>
                    <td v-for="j in 13" :key="j" class="second">
                      {{ vipBack[j-1].level}}
                      <div class="cur_clo" v-show="initInfo.level==(j-1)&&initInfo.is_login"></div>
                    </td>
                  </tr>
                  <tr>
                    <td>会员勋章</td>
                    <td v-for="j in 13" :key="j" >
                      {{ vipExclu[j-1].vip_name }}
                    </td>
                  </tr>
                  <tr>
                    <td>小艾电竞</td>
                    <td v-for="j in 13" :key="j">{{ vipBack[j-1].egame_back}}%</td>
                  </tr>
                  <!-- <tr>
                    <td>TF电竞</td>
                    <td v-for="j in 13" :key="j">{{ vipBack[j-1].tfgame_back}}%</td>
                  </tr> -->
                  <tr>
                    <td>IM电竞</td>
                    <td v-for="j in 13" :key="j">{{ vipBack[j-1].imgame_back}}%</td>
                  </tr>
                  <tr>
                    <td>RG电竞</td>
                    <td v-for="j in 13" :key="j">{{ vipBack[j-1].other_egame_back}}%</td>
                  </tr>
                  <tr>
                    <td>威客&FB体育</td>
                    <td v-for="j in 13" :key="j">{{ vipBack[j-1].sport_back}}%</td>
                  </tr>
                  <tr>
                    <td>皇冠体育</td>
                    <td v-for="j in 13" :key="j">{{ vipBack[j-1].crown_back}}%</td>
                  </tr>
                  <tr>
                    <td>BTI体育</td>
                    <td v-for="j in 13" :key="j">{{ vipBack[j-1].bti_back}}%</td>
                  </tr>
                  <tr>
                    <td>其他体育</td>
                    <td v-for="j in 13" :key="j">{{ vipBack[j-1].pb_sport_back}}%</td>
                  </tr>
                  <tr>
                    <td>真人</td>
                    <td v-for="j in 13" :key="j">{{ vipBack[j-1].live_game_back}}%</td>
                  </tr>
                  <tr>
                    <td>棋牌</td>
                    <td v-for="j in 13" :key="j">{{ vipBack[j-1].chess_back}}%</td>
                  </tr>
                  <tr>
                    <td>电子游戏</td>
                    <td v-for="j in 13" :key="j">{{ vipBack[j-1].slots_back}}%</td>
                  </tr>
                </table>
              </div>
              <h3>活动规则</h3>
              <p>
                1.小艾电竞包含自走棋。其它体育包括：平博体育、IM体育、沙巴体育。真人包括：AG真人、PM真人、WE真人、欧博真人、PT真人。棋牌包括：乐游棋牌、开元棋牌、凯旋棋牌、博乐棋牌。电子游戏包括：PT电子游戏、PG电子游戏。<br>
                2.电竞/体育返水每日18:00左右自动派发，其余游戏返水每日凌晨0:30左右自动派发、无需申请。返现奖金无最低派发额度，无上限，此奖金需完成活动规定的1倍全站有效流水。返水计算周期为：昨日0点至今日0点的返水报表。<br>
                3.电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。<br>
                4.所有轮盘类游戏、牛牛、骰宝、捕鱼王、空战世纪将不享受返水优惠；PT电子游戏中以下游戏不享受返水优惠：<activeptliushui color="#f7bc86"></activeptliushui>。<br>
                5.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利。<br>
                6.VKGAME对本活动保有最终解释权。
              </p>
            </TabPane>
          <TabPane label="VIP月存优惠" name="third">
            <div class="table_box">
              <table class="table_con table_bg" v-if="vipTransfer.length">
                <tr>
                  <td>等级</td>
                  <td v-for="j in 13" :key="j" class="third">
                    {{ vipTransfer[j-1].level}}
                    <div class="cur_clo" v-show="initInfo.level==(j-1)&&initInfo.is_login"></div>
                  </td>
                </tr>
                <tr>
                  <td>会员勋章</td>
                  <td v-for="j in 13" :key="j" >
                    {{ vipExclu[j-1].vip_name }}
                  </td>
                </tr>
                <tr>
                  <td>最高彩金</td>
                  <td v-for="j in 13" :key="j">{{vipTransfer[j-1].bonus?vipTransfer[j-1].bonus+'元':'-'}}</td>
                </tr>
                <tr>
                  <td>单笔要求</td>
                  <td>{{vipTransfer[0].deposit?'≥'+vipTransfer[0].deposit:'-'}}</td>
                  <td colspan="3">{{vipTransfer[1].deposit?'≥'+vipTransfer[1].deposit+'元':'-'}}</td>
                  <td colspan="5">{{vipTransfer[4].deposit?'≥'+vipTransfer[4].deposit+'元':'-'}}</td>
                  <td colspan="4">{{vipTransfer[9].deposit?'≥'+vipTransfer[9].deposit+'元':'-'}}</td>
                </tr>
                <tr>
                  <td>优惠比例</td>
                  <td>{{parseInt(vipTransfer[0].percent*100)?vipTransfer[4].percent+'%':'-'}}</td>
                  <td colspan="3">{{parseInt(vipTransfer[1].percent*100)?vipTransfer[1].percent+'%':'-'}}</td>
                  <td colspan="5">{{parseInt(vipTransfer[4].percent*100)?vipTransfer[4].percent+'%':'-'}}</td>
                  <td colspan="4">{{parseInt(vipTransfer[9].percent*100)?vipTransfer[9].percent+'%':'-'}}</td>

                </tr>
                <tr>
                  <td>流水要求</td>
                  <td>{{parseInt(vipTransfer[0].limit*100)?'(本金+彩金)*'+vipTransfer[0].limit:'-'}}</td>
                  <td colspan="3">{{parseInt(vipTransfer[1].limit*100)?'(本金+彩金)*'+vipTransfer[1].limit:'-'}}</td>
                  <td colspan="5">{{parseInt(vipTransfer[4].limit*100)?'(本金+彩金)*'+vipTransfer[4].limit:'-'}}</td>
                  <td colspan="4">{{parseInt(vipTransfer[9].limit*100)?'(本金+彩金)*'+vipTransfer[9].limit:'-'}}</td>
                </tr>

              </table>
            </div>
            <h3>活动规则</h3>
            <p>
              1.每个自然月内单笔存款符合条件的VIP会员可在VIP页面或优惠活动页面申请一次“VIP月存款优惠”，此优惠彩金需完成对应的有效流水。<br>
                例：VIP3会员单笔存款500，申请本月VIP月存款活动优惠，此时需完成（500+500X15%）x12=6900 的全站有效流水<br>
              2.会员存款后需在活动页面申请，若用户在申请此优惠前将存款从主钱包转出或发起提款，则不可申请月存优惠，会员申请成功后，奖金将会主动添加至用户的主钱包。<br>
              3.VIP会员单笔存款要求以及对应优惠彩金以会员申请后充值到账时间所对应的VIP等级为准。<br>
              4.VIP月存款优惠不与新用户首存优惠活动、全站每日存款活动共享，活动规定的彩金流水未完成前不可再次申请，此优惠活动当月未申请则视为自动放弃。<br>
              5.电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#f7bc86"></activeptliushui>。<br>
              6.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利。<br>
              7.VKGAME官方对本活动保有最终解释权。
            </p>
          </TabPane>
          <TabPane label="VIP月体验金" name="fourth">
            <div class="table_box">
                <table class="table_con table_bg" v-if="vipExper.length">
                  <tr>
                    <td>等级</td>
                    <td v-for="j in 13" :key="j" class="fourth">
                      {{ vipExper[j-1].level}}
                       <div class="cur_clo" v-show="initInfo.level==(j-1)&&initInfo.is_login"></div>
                    </td>
                  </tr>
                  <tr>
                    <td>会员勋章</td>
                    <td v-for="j in 13" :key="j" >
                      {{ vipExclu[j-1].vip_name }}
                    </td>
                  </tr>
                  <tr>
                    <td>体验金</td>
                    <td v-for="j in 13" :key="j">{{vipExper[j-1].bonus?vipExper[j-1].bonus+'元':'-'}}</td>
                  </tr>
                  <tr>
                    <td>流水要求</td>
                    <td colspan="13">全站3倍有效流水</td>
                  </tr>
                </table>
              </div>
              <h3>活动规则</h3>
              <p>
                1.当月累计存款≥500的VIP会员即可领取一次专属游戏体验金，此优惠需完成对应的3倍有效流水。<br>
                2.游戏体验金需在VIP页面或优惠活动页面自助领取，此活动当月未领取则视为自动放弃。<br>
                3.电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#f7bc86"></activeptliushui>。<br>
                4.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利。<br>
                5.VKGAME对本活动保有最终解释权。
              </p>
            </TabPane>
          <TabPane label="VIP月救援金" name="fifth">
            <div class="table_box">
              <table class="table_con table_bg" v-if="vipRescue.length">
                <tr>
                  <td>等级</td>
                  <td v-for="j in 13" :key="j" class="fifth">
                    {{ vipRescue[j-1].level}}
                     <div class="cur_clo" v-show="initInfo.level==(j-1)&&initInfo.is_login"></div>
                  </td>
                </tr>
                <tr>
                  <td>会员勋章</td>
                  <td v-for="j in 13" :key="j" >
                    {{ vipExclu[j-1].vip_name }}
                  </td>
                </tr>
                <tr>
                  <td>月总负盈利</td>
                  <td v-for="j in 13" :key="j">{{vipRescue[j-1].loss }}</td>
                </tr>
                <tr>
                  <td>救援金比例</td>
                  <td v-for="j in 13" :key="j">{{vipRescue[j-1].percent }}</td>
                </tr>
                <tr>
                  <td>救援金最高</td>
                  <td v-for="j in 13" :key="j">{{vipRescue[j-1].bonus}}</td>
                </tr>
                <tr>
                  <td>流水要求</td>
                  <td colspan="13">全站1倍有效流水</td>
                </tr>
              </table>
            </div>
            <h3>活动规则</h3>
            <p>
            1.月总负盈利计算周期为一个自然月，若当月负盈利≥200000即可在VIP页面或优惠活动页面申请领取此优惠。<br>
            2.当月救援金需于次月1-3号自助领取，月救援金需完成全站1倍有效流水，此活动逾期未领取则视为自动放弃。<br>
            3.电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#f7bc86"></activeptliushui>。<br>
            4.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利。<br>
            5.VKGAME对本活动保有最终解释权。
            </p>
          </TabPane>
             <TabPane label="VIP月成就奖" name="vipAchienement">
            <div class="table_box">
              <table class="table_con table_bg" v-if="vipAchienement.length">
                <tr>
                  <td>等级</td>
                  <td v-for="j in 13" :key="j" class="vipAchienement">
                    {{ vipAchienement[j-1].level}}
                     <div class="cur_clo" v-show="initInfo.level==(j-1)&&initInfo.is_login"></div>
                  </td>
                </tr>
                <tr>
                  <td>会员勋章</td>
                  <td v-for="j in 13" :key="j" >
                    {{ vipAchienement[j-1].level_name }}
                  </td>
                </tr>
                <tr>
                  <td>月总盈利</td>
                  <td v-for="j in 13" :key="j">{{vipAchienement[j-1].total_profit=="-" ? vipAchienement[j-1].total_profit : "≥"+vipAchienement[j-1].total_profit }}</td>
                </tr>
                <tr>
                  <td>成就奖</td>
                  <td v-for="j in 13" :key="j">{{vipAchienement[j-1].bonus }}</td>
                </tr>
                <!-- <tr>
                  <td>晋级礼金</td>
                  <td v-for="j in 13" :key="j">{{vipRescue[j-1].bonus}}</td>
                </tr> -->
                <tr>
                  <td>流水要求</td>
                  <td colspan="13">全站1倍有效流水</td>
                </tr>
              </table>
            </div>
            <h3>活动规则</h3>
            <p>
                1.月总盈利计算周期为一个自然月，若当月总盈利≥300000即可在VIP页面或优惠活动页面申请领取此优惠。	<br>
              2.当月成就奖需于次月1-3号自助领取，月成就奖需完成全站1倍有效流水，此活动逾期未领取则视为自动放弃。	<br>
              3.电竞赔率＜1.5、亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水；PT电子游戏中以下游戏不算有效流水：<activeptliushui color="#f7bc86" ></activeptliushui>。<br>
              4.每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核， 和扣回红利及所产生的利润权利。	<br>
              5.VKGAME对本活动保有最终解释权。

            </p>
          </TabPane>
        </Tabs>
         <div class="bor"></div>
       </div>
    </div>
    <!--弹窗-->
    <el-dialog
      :custom-class="'vip_dialog'"
      :visible.sync="dialogData.show"
      :append-to-body="true" >
      <div class="vip_dialog_box" :class="dialogData.classname">
        <div class="colse" @click="dialogData.show=false"></div>
        <h1 class="success_txt">恭喜成功领取</h1>
        <h1>{{dialogData.txt}}</h1>
        <h3 class="bouns">
          <span> {{dialogData.bouns}}</span>
          <span class="unit">{{dialogData.unit}}</span>
        </h3>
        <div class="vip_btn" @click="dialogData.show=false">我知道了</div>
      </div>
    </el-dialog>
    <!--月存优惠领取之前确认-->
    <el-dialog
      :custom-class="'vip_dialog'"
      :visible.sync="depostDialogData.show"
      :append-to-body="true" >
      <div class="vip_dialog_box deposit" >
        <div class="colse" @click="depostDialogData.show=false"></div>
        <h1 class="success_txt">您当前可领取</h1>
        <h1>月优惠存款</h1>
        <h3 class="bouns">
          <span> {{depostDialogData.bouns}}</span>
          <span class="unit">元</span>
        </h3>
        <!-- <div class="vip_btn cancel fl" @click="depostDialogData.show=false">取消</div> -->
        <div class="vip_btn" @click="depositApply()">立即领取</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Progress, Carousel, CarouselItem, Tabs, TabPane } from 'element-ui'
import { formatNumberSplit} from '../utils/util'
import { Carousel3d, Slide } from 'vue-carousel-3d'
export default {
  name: 'vipsystem',
  components: {
    Progress,
    Carousel,
    CarouselItem,
    Tabs,
    TabPane,
    Carousel3d,
    Slide
  },
  data () {
    return {
      depostDialogData: {
        show: false,
        bouns: 0,
        item: {}
      },
      dialogData: {
        show: false,
        txt: '',
        bouns: 0,
        classname: '',
        unit: '元'
      },
      classRule: [ ],
      vipExclu: [ ],
      vipBack: [ ],
      vipTransfer: [ ],
      vipExper: [ ],
      vipRescue: [ ],
      vipAchienement: [],
      activeName: 'first',
      lists: [],
      listsShow: false,
      classRuleShow: false,
      MyMar: null,
      initInfo: {reward_list: []},
      rewardList: [],
      rendered: false,
      startIndex: 0,
      currentIndex: 0,
      listSiledr: [
        { imgUrl: require('../assets/vipsystemnew/rfs.png') },
        { imgUrl: require('../assets/vipsystemnew/srlj.png') },
        { imgUrl: require('../assets/vipsystemnew/jslj.png') },
        { imgUrl: require('../assets/vipsystemnew/ycyh.png') },
        { imgUrl: require('../assets/vipsystemnew/ytyj.png') },
        { imgUrl: require('../assets/vipsystemnew/yjyj.png') },
        { imgUrl: require('../assets/vipsystemnew/zskf.png') },
        { imgUrl: require('../assets/vipsystemnew/cjj.png') }
      ],
      activeIndex: ''

    }
  },
  computed: {
    optionLeft () {
      return {
        direction: 2,
        limitMoveNum: 1
      }
    }
  },
  mounted () {
    this.getVipHallInit()
  },
  beforeDestroy () {
    clearInterval(this.MyMar)
  },
  methods: {

    chang (index) {
      this.activeIndex = index
    },
    setActiveItem (index) {
      this.activeIndex = index
      this.$refs.cardcarousel.setActiveItem(index)
    },
    // 卡片切换
    onSlideChange (index) {
      this.currentIndex = index
    },
    // 查看当前等级
    toCurLeval () {
      setTimeout(() => {
        this.$refs.carousel.goSlide(this.initInfo.level)
      }, 400)
    },
    formatMoney (num) {
      return formatNumberSplit(num).split('.')[0]
    },
    // 公告
    getRewardsMsg () {
      this.$http(this.ApiSetting.active.getRewardsMsg)
        .then(res => {
          if (res.status == 1 && res.data) {
            this.lists = res.data
            if (this.lists.length < 10) {
              let nl = 10 - this.lists.length
              for (let i = 0; i < nl; i++) {
                this.lists.push(res.data[i % this.lists.length])
              }
            }
            if (this.lists.length) {
              this.listsShow = true
            } else {
              this.listsShow = false
            }
          }
        })
    },
    openKfWindoww (url) {
      window.open(url, 'chatwindow', 'height=530,width=730')
    },
    // 领取月存优惠
    depositApply () {
      this.$http({url: this.depostDialogData.item.url})
        .then(res => {
          this.depostDialogData.show = false
          if (res.status == 1) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.rewardList[this.currentIndex].forEach(lltype => {
              if (lltype.card_en == 'deposit') {
                lltype.status = 2
              }
            })
            this.$forceUpdate()
          }
        })
    },
    // 领取
    apply (item) {
      let data = {}
      // 生日礼金
      if (item.card_en == 'birth') {
        data = {id: item.id}
      }
      // 晋级礼金
      if (item.card_en == 'upgrade') {
        data = {level: item.level}
      }
      // 0  不可领取   1  可领取 2已领取
      if (item.url_type == 1 && item.status == 1) {
        if (item.card_en == 'deposit') {
          this.depostDialogData = {
            show: true,
            bouns: item.bonus,
            item: item
          }
        } else {
          this.$http({url: item.url}, data)
            .then(res => {
              if (res.status == 1) {
                item.status = 2
                if (item.card_en != 'deposit') {
                  this.dialogData = {
                    show: true,
                    txt: item.card_name,
                    bouns: item.bonus,
                    classname: item.card_en,
                    unit: item.bonus_type ? item.bonus_type : '元'
                  }
                }
                this.$forceUpdate()
              }
            })
        }
      } else {
        if (item.card_en == 'birth') {
          this.$message({
            message: '未达到生日礼金领取资格!',
            type: 'warning'
          })
        } else {
          if (item.btn_tips) {
            this.$message({
              message: item.btn_tips,
              type: 'warning'
            })
          } else if (item.tips) {
            this.$message({
              message: item.tips,
              type: 'warning'
            })
          }
        }
      }
    },
    // 初始化数据
    getVipHallInit () {
      this.$http(this.ApiSetting.active.getVipHallInit)
        .then(res => {
          if (res.status == 1 && res.data) {
            this.initInfo = res.data
            this.getRewardsMsg()
            this.initInfo.percent = parseFloat(res.data.percent * 100)
            this.vipRescue = res.data.month_rescue_setting
            this.vipExper = res.data.privilege_setting
            this.vipTransfer = res.data.transfer_setting
            this.vipBack = res.data.back_setting
            this.classRule = res.data.level_setting
            this.vipExclu = res.data.base_setting
            this.vipAchienement = res.data.month_achievement_award
            this.initInfo.reward_list.forEach((item, index) => {
              let tema = []
              for (let key in item) {
                tema.push(item[key])
              }
              tema.sort((a, b) => {
                return a.sort - b.sort
              })
              this.rewardList.push(tema)
            })
            if (this.initInfo.is_login) {
              this.startIndex = this.initInfo.level
            } else {
              this.startIndex = 12
            }
            this.currentIndex = this.startIndex
            this.$nextTick(() => {
              this.rendered = true
            })
          }
        })
    }

  }
}
</script>
<style lang="less" scoped>
.vipsystem_box {
  background: url("../assets/vipsystemnew/bg.jpg") no-repeat center top;
  background-color: #101731;
  padding: 80px 0 30px;
  position: relative;
  * {
    box-sizing: border-box;
  }
  * + * {box-sizing: border-box;}
  .yellow {
    color:#f7bc86;
  }
  .text_de {
    text-decoration: underline;
  }
  .cuerp {
    cursor: pointer;
  }
  .vertical_m {
    vertical-align: middle;
  }
  .seamless-warp2 {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 80px;
      overflow: hidden;
      height: 26px;
      line-height: 26px;
      width: 1240px;
      background-color: #151a2e;;
      ul.item {
          width: 1700px;
          li {
            color: #929292;
            float: left;
            margin-right: 30px;
          }
      }
  }
  .cur_clo {
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    opacity: 0.15;
    background-image: linear-gradient(to top,#fff1dc, #edb582);
  }
  .card_box {
    margin-top: 250px;
    margin-top: 170px;

    width: 1240px;
    height: 500px;
  }
  .vip_card {
    width: 1240px;
    .item_card {
      top: 30px;
      overflow: visible;
      height: 480px !important;
      border: none;
      background: url("../assets/vipsystemnew/card-bg.png") no-repeat center bottom;
      cursor: pointer;
      &.current {
        transform: translateX(0) translateZ(0) rotateY(0deg) !important;
        .light  {
          opacity: 1;
        }
        .card_info  {
          .info_mask {
            opacity: 0;
          }
          .shinning_img {
            visibility: visible;
          }
        }
        .card_face {
          .back_cur {
            display: block;
          }
        }
      }
      .light {
        width:498px ;
        height: 628px;
        background: url("../assets/vipsystemnew/light.png") no-repeat ;
        position: absolute;
        top: 47%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 1;
        pointer-events: none;
        opacity: 0;
      }
      &.card_zero {
        .card_info {
          background-image: url("../assets/vipsystemnew/card/card0.png");
          .lv_cnname {
            color: #fff;
          }
        }
      }
      &.card_classic {
        .card_info {
          background-image: url("../assets/vipsystemnew/card/card1.png");
          .lv_cnname {
            color: #abe5f3;
          }
        }

      }
      &.card_gold {
        .card_info {
          background-image: url("../assets/vipsystemnew/card/card2-4.png");
          .lv_cnname {
            color: #ffeeac;
          }
          .shinning_img1{
            top: 123px;
            left: 48%;
          }
        }
      }
      &.card_platinum {
        .card_info {
          background-image: url("../assets/vipsystemnew/card/card5-7.png");
          .lv_cnname {
            color: #b6f6ff;
          }
          .shinning_img1{
            top: 130px;
            left: 44%;
          }
        }
      }
      &.card_diamond {
        .card_info {
          background-image: url("../assets/vipsystemnew/card/card7-10.png");
          .lv_cnname {
            color: #eadfff;
          }
          .shinning_img1{
            top: 136px;
            left: 42%;
          }
        }
      }
      &.card_honour {
        .card_info {
          background-image: url("../assets/vipsystemnew/card/card11.png");
          .lv_cnname {
            color:  #fff4b7;
          }
          .shinning_img1{
            top: 131px;
            left: 35%;
          }
          .shinning_img2{
            top: 202px;
            left: 50%;
          }
        }

      }
      &.card_premier {
        .card_info {
          background-image: url("../assets/vipsystemnew/card/card12.png");
          .lv_cnname {
            color:  #eddad0;
          }
          .lv_img {
            width: 313px;
            height: 280px;
          }
          .shinning_img1{
             top: 131px;
             left: 35%;
           }
          .shinning_img2{
             top: 209px;
             left: 50%;
           }
          .shinning_img3{
             top: 82px;
             left: 50%;
           }
        }
      }
      .card_info {
        position: absolute;
        top: -6px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        width: 280px;
        height: 433px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .lv_cnname {
          text-align: center;
          font-size: 20px;
          margin: 15px 0 10px;
          font-weight: bold;
        }
        .lv_img {
          position: absolute;
          top: 13px;
          left: 50%;
          transform: translateX(-50%);
          width: 336px;
          height: 300px;
        }
        .shinning_img {
          position: absolute;
          width: 70px;
          height: 70px;
          transform-origin: left;
          animation: randomShining 3s linear infinite;
          visibility: hidden;
        }
        .info_mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 15px;
          background: rgba(0,0,0,0.65);
          opacity: 1;
        }
      }
      .card_face {
        position: absolute;
        bottom: -10px;
        left: 0;
        z-index: 3;
        background: url("../assets/vipsystemnew/card-face.png") no-repeat ;
        width: 386px;
        height: 365px;
        padding: 160px 60px 0;
        color:#fff;
        font-size: 16px;
        line-height: 1.9;
        bottom: -10px;
        .base {
          height: 60px;
          .headimg {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border:2px solid #f6dcc0;
            margin-right: 10px;
          }
          .nickname {
            max-width: 150px;
            display: inline-block;
            vertical-align: middle;
          }
        }
        .progress {
          border-top: 1px dashed  #929292;
          padding-top: 10px;
          margin-top: 12px;
          .pro_line {
            margin-bottom: 5px;
          }
        }
        .other_lv {
          text-align: center;
          margin-top: 30px;
          img {
            width: 31px;
            height: 31px;
            margin-bottom: 5px;
          }
        }
        .after_lv{
          color: #929292;
        }
        .back_cur {
          position: absolute;
          text-decoration: underline;
          bottom: 70px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 14px;
          color: #929292;
          cursor: pointer;
          display: none;
        }
      }
    }
  }
  .rule_class {
    font-size: 16px;
    text-align: center;
    span {
      cursor: pointer;
    }
  }
 .siledr_discount_box{
   width: 100%;
   display: flex;
   margin:20px 0 40px;

   .siledr{//轮播
     width:503px ;
     height: 520px;
     border: solid 2px #edb582;
     border-radius: 20px;
     display: flex;
     justify-content: center;
     align-items: center;

      /deep/.el-carousel__button{
         width: 12px ;
           height: 12px ;
           background: #edb582 ;

           border-radius: 50%;
      }

     /deep/.el-carousel__indicators{
       bottom: 10px;
     }
     /deeep/.el-carousel__item.is-active.is-animating{
         height: 484px  !important;
     }

     .siledr_block{
       width: 468px;
       height: 484px;
       border-radius: 20px;

        .vip_swipe{
              border-radius: 20px;
                width: 468px;
                height: 484px;
                  border:2px dashed  #edb582;;

           /deep/.el-carousel__container{
             height: 480px;
           }
        .vip_swipe_item{
              border-radius: 20px;

            .siledr_img_box{

                 border-radius: 20px;
                    width: 468px;
                       height: 484px;

            img{
              display: block;
              width: 100%;
              height: 100%;
              border-radius: 20px;

            }
          }

        }
     }

     }

   }

  .can_discount {//能获取的优惠
     flex:1;
    // background: cornflowerblue;
    display:flex;
    flex-wrap: wrap;
    padding-left: 21px;
    // height: 240px;
    // margin:20px 0 40px;
    li {
       height: 240px;
      width: 165px;
      height: 152px;
      float: left;
      margin-right: 14px;
      // margin-right: 14px;

      position: relative;
      &:last-child {
        margin-right: 0;
      }
      &:hover .get_btn {
        color: #101731;
      }
      &.canshow {
        &.btnshow {
          .detail:hover {
             height: 240px;
          }
        }
        .detail:hover {
          box-shadow: 2px 2px 10px 0 #edb582,-1px -1px 10px 0 #edb582;
        }

        .mask {
          display: none;
        }
        .get_btn {
          display: block;
        }
      }
      &.got {
        &:hover .get_btn {
          color: #78482f;
        }
        .get_btn {
          &:hover {
            color: #78482f;
          }
          &:before{
            display: block;
          }
        }

      }
      .active_cak{
        box-shadow: 2px 2px 10px 0 #edb582, -1px -1px 10px 0 #edb582 ;
      }
      .detail {
        width:165px;
        height: 152px;
        text-align: center;
        border-radius: 5px;
        border: solid 2px #edb582;
        background-color: #101731;
        cursor: pointer;
        font-size: 16px;
        color: #f7bc86;
        line-height: 1.5;
        padding-top: 13px;
        position: relative;
        transition: box-shadow 0.3s, height 0.3s;
        .mask {
          position: absolute;
          z-index: 5;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          // width:170px;
          //  height: 152px;
          width: 166px;
            height:152px;
          border-radius: 4px;

          cursor: default;
          background: rgba(16,23,49,0.58);
        }
      }
      .detail_txt{
        color: #929292;
        font-size: 12px;
        line-height: normal;
        margin-top: 5px;
      }
      .get_btn{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top:172px;
        width: 121px;
        height: 40px;
        border-radius: 20px;
        box-shadow: -1px 2.8px 7px 0 rgba(0, 0, 0, 0.28);
        background-image: linear-gradient(to right, #f8dfc4,#dbb292);
        color: #78482f;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        display: none;
        cursor: pointer;
        &:hover {
          color: #101731;
        }
        &:before {
          content: "";
          position: absolute;
          width:100%;
          height: 100%;
          left: 0;
          top: 0;
          background: rgba(16,23,49,0.58);
          display: none;
        }
      }
      .type_icon {
        width:56px;
        height: 56px;
        margin: 0 auto;
        background-repeat: no-repeat;
        margin-bottom: 5px;
        &.upgrade {
          background-image: url("../assets/vipsystemnew/icon3.png");
        }
        &.birth {
          background-image: url("../assets/vipsystemnew/icon2.png");
        }
        &.deposit {
          background-image: url("../assets/vipsystemnew/icon4.png");
        }
        &.privilege {
          background-image: url("../assets/vipsystemnew/icon5.png");
        }
        &.back {
          background-image: url("../assets/vipsystemnew/icon1.png");
        }
        &.rescue {
          background-image: url("../assets/vipsystemnew/icon6.png");
        }
        &.kf_service {
          background-image: url("../assets/vipsystemnew/icon7.png");
        }
          &.achienement {
          background-image: url("../assets/vipsystemnew/icon8.png");
          background-size:100% 100% ;
        }
      }
    }
  }

 }

  .rule_title {
    width: 100%;
    height: 42px;
    background: url("../assets/vipsystemnew/title2.png") no-repeat;
    background-size: 1240px 42px;
    color: #f7bc86;
    font-size: 26px;
    text-align: center;
    line-height: 42px;
    margin-bottom: 40px;
  }
  .rule_table {
    position: relative;
    .bor {
      position: absolute;
      pointer-events: none;
      left: 0;
      top: 0;
      width:100%;
      height: 100%;
      border: 2px solid #f7bc86;
      border-radius: 10px;
      background-color: transparent;
    }
  }

  .el-tabs {
    .table_box {
      width:100%;
      border-radius: 10px;
      font-size: 15px;
      .table_con {
        border-collapse: separate;
        border-spacing: 0;
        border-top: solid 1px #4b5064;
        border-left: solid 1px #4b5064;
        border-radius: 10px;
        tr {
          td {
            height: 52px;
            width:86px;
            text-align: center;
            border-right: #4b5064 1px solid;
            border-bottom: #4b5064 1px solid;
            color: #606882;
            position: relative;
            &:first-child {
              width:172px;
              color: #fefefe;
            }
            .cur_clo{
               width: 80px;
            }
            &.first {
              .cur_clo {height:571px; }
            }
            &.second {
              // .cur_clo {height:623px;}
              .cur_clo {height:624px;}

            }
            &.third {
              .cur_clo {height:155px;}
            }
            &.fourth {
              .cur_clo {height:155px;}
            }
            &.fifth {
              .cur_clo {height:259px;}
            }
             &.vipAchienement {
              .cur_clo {height:207px;}
            }
          }
          &:first-child td {
            font-size: 18px;
            color: #fefefe;
          }
          &:first-child td:first-child {
            border-top-left-radius: 10px;
          }
          &:first-child td:last-child {
            border-top-right-radius: 10px;
          }
          &:last-child td:first-child {
            border-bottom-left-radius: 10px;
          }
          &:last-child td:last-child {
            border-bottom-right-radius: 10px;
          }
        }
      }
    }
    h3 {
      margin: 30px 0 10px;
      font-size: 20px;
      color: #ffffff;
      text-align: center;
      font-weight: normal;
    }
    p {
      font-size: 16px;
      color: #bbbbbb;
      line-height: 2.5;
    }
  }
  .vipsystem {
    width:1240px;
    margin:0 auto;
    z-index: 10;
    position: relative;
  }
  @keyframes randomShining{
    0%{
      opacity: 1;
      transform:   scale(.5) translateX(-50%);
    }
    20%{
      opacity: 0;
    }
    40%{
      opacity: 1;
      transform:  scale(0.8) translateX(-50%);
    }
    60%{
      opacity: 0;
    }
    80%{
      opacity: 1;
      transform:  scale(1) translateX(-50%);
    }
    100%{
      opacity: 0;
      transform:  scale(1) translateX(-50%);
    }
  }
}
</style>
<style lang="less">
.vipsystem {
  .el-progress-bar {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    margin-right: -55px;
    box-sizing: border-box;
    &__outer {
      height: 10px;
      border-radius: 100px;
      background-color: #000;
      overflow: hidden;
      position: relative;
      vertical-align: middle;
    }
    &__inner {
      position: absolute;
      left: 0;
      top:0;
      // top: 50%;
      // transform: translateY(-50%);
      height: 80% !important;
      background-color: #08f2bb;
      text-align: right;
      border-radius: 100px;
      line-height: 1;
      white-space: nowrap;
      transition: width 0.6s ease;
    }
  }
  .el-tabs {
    &__header {
      position: relative;
      margin: 0 0 15px;
      background-image: linear-gradient(-45deg,rgba(0,0,0,0.5) 25%,transparent 0,transparent 50%,rgba(0,0,0,0.5) 0,rgba(0,0,0,0.5) 75%,transparent 0);;
      background-size: 8px 8px;
    }
    &__nav-wrap {
      overflow: hidden;
      margin-bottom: -1px;
      position: relative;
    }
    &__nav-scroll {
      overflow: hidden;
    }
    &__nav {
      white-space: nowrap;
      position: relative;
      transition: transform 0.3s;
      float: left;
      z-index: 2;
    }
    &__active-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      // left: 60px !important;
      height: 2px;
      // width:128px !important;
      background-image: linear-gradient(to right, #ffe0ac, #eebc76);
      z-index: 1;
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      list-style: none;
    }
    &__item {
      // width:248px;
      width: 206.66px;
      padding: 0 20px;
      height: 70px;
      box-sizing: border-box;
      line-height: 80px;
      text-align: center;
      display: inline-block;
      list-style: none;
      font-size: 22px;
      color: #fefefe;
      position: relative;
      cursor: pointer;
      &.is-active {
        color: #f7bc86;
      }
    }
    &__content {
      padding: 0 20px 25px;
      margin-top: 30px;
    }
    &--bottom &__item.is-bottom:last-child,
    &--bottom &__item.is-top:last-child,
    &--top &__item.is-bottom:last-child,
    &--top &__item.is-top:last-child {
      padding-right: 0;
    }
  }
}
</style>
<style lang="less">
  .vip_yellow {
    color:#f7bc86;
  }
  .pro_poper {
    background-color:rgba(16,23,49,0.9) !important;
    line-height: 1.5;
    font-size: 16px;
    max-width: 276px;
    border-radius: 5px !important;
    &.el-popper{
      border: 1px solid #ffe0ac;
      border-radius: 10px;
      padding: 10px;
    }
    &.el-popper[x-placement^=bottom] .popper__arrow {
       border-bottom-color: #ffe0ac;
    }
    &.el-popper[x-placement^="top"] .popper__arrow {
       border-top-color: #ffe0ac;
    }
  }
  .class_rule_poper {
    background-color: #101731;
    color:#fff;
    &.el-popper{
      border: 1px solid #ffe0ac;
      border-radius: 10px;
      padding: 10px;
      left: 22vw !important;
    }
    &.el-popper[x-placement^=bottom] .popper__arrow {
          left: 850px !important;
       border-bottom-color: #ffe0ac;
    }
    &.el-popper[x-placement^="top"] .popper__arrow {
          left: 850px !important;
       border-top-color: #ffe0ac;
    }
    .class_rule {
      background-color: #101731;
      border-radius: 10px;
      .cur_clo {
        position: absolute;
        top: 0;
        left: 0;
        width:100% ;
        opacity: 0.15;
        background-image: linear-gradient(to top,#fff1dc, #edb582);
      }
      .class_rule_desc{
        font-size: 18px;
        margin-top: 10px;
        color: #929292;
      }
      table {
        color: #929292;
        text-align: center;
        border-collapse: separate;
        border-spacing: 0;
        border-top:  1px solid  rgba(253,220,166,0.25);
        border-left: 1px  solid rgba(253,220,166,0.25);
        border-radius: 10px;
        font-size: 14px;
        .white_c {
          color: #fff;
          font-size: 16px;
        }
        tr {
          td {
            width:200px;
            height: 40px;
            border-right: solid 1px   rgba(253,220,166,0.25);
            border-bottom:solid  1px   rgba(253,220,166,0.25);
            position: relative;
            &.b_w {
               width:200px
            }
            &.b_s {
              font-size: 16px;
            }
            .cur_clo{
              height: 245px;
            }
          }
          &:first-child td:first-child {
            border-top-left-radius: 10px;
          }
          &:first-child td:last-child {
            border-top-right-radius: 10px;
          }
          &:nth-child(5) td:first-child {
            border-bottom-left-radius: 10px;
          }
          &:last-child td:last-child {
            border-bottom-right-radius: 10px;
          }
        }
      }
    }
  }
  .vip_dialog {
    border: none;
    background-color: transparent;
    .el-dialog__header {
      display: none;
    }
    .vip_dialog_box {
      width:630px;
      margin: -40px auto 0;
      height: 665px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      font-size: 20px;
      color: #78482f;
      padding-top: 1px;
      text-align: center;
      .success_txt {
        margin-top: 200px;
      }
      .bouns {
        margin-top: 10px;
        font-size: 43px;
        color: #bd7539;
        span {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .unit {
        font-size: 28px;
        margin-left: -10px;
      }
      .colse {
        position: absolute;
        bottom: -20px;
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
      .vip_btn {
        margin: 100px auto 0;
        width: 301px;
        height: 70px;
        line-height: 70px;
        border-radius: 34.5px;
        box-shadow: -1px 2.8px 7px 0 rgba(0, 0, 0, 0.28);
        background-image: linear-gradient(to top, #dbb292, #f8dfc4);
        font-size: 24.5px;
        color: #78482f;
        font-weight: bold;
        cursor: pointer;
        &:hover {
          opacity: 0.9;
        }
      }
      // &.deposit {
      //   .vip_btn {
      //     width: 166px;
      //     &.cancel {
      //        color: #7a7c7d;
      //       margin: 100px 40px 0 130px ;
      //       background-image: linear-gradient(to top, #b5b8b9, #cad5e2);
      //     }
      //   }
      // }
    }
    .upgrade {
      background-image: url("../assets/vipsystemnew/upgrade.png");
    }
    .birth {
      background-image: url("../assets/vipsystemnew/birth.png");
    }
    .deposit {
      background-image: url("../assets/vipsystemnew/deposit.png");
    }
    .privilege {
      background-image: url("../assets/vipsystemnew/privilege.png");
    }
    .rescue {
      background-image: url("../assets/vipsystemnew/rescue.png");
    }
     .achienement {
      background-image: url("../assets/vipsystemnew/upgrade.png");
    }
  }
  .vip_card:hover .carousel-3d-controls{
    visibility: visible;
    opacity: 1;
  }
  .vip_card .carousel-3d-controls {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0.1,opacity 0.3s;
    .prev,.next {
      width: 35px !important;
      height: 62px !important;
      cursor: pointer;
      span {
        display: none;
      }
    }
    .prev {
      left: 0;
      background: url("../assets/vipsystemnew/arrow_l.png") no-repeat ;
      &:hover {
        background: url("../assets/vipsystemnew/arrow_l_h.png") no-repeat ;
      }
    }
    .next {
      right:0;
      background: url("../assets/vipsystemnew/arrow_r.png") no-repeat ;
      &:hover {
        background: url("../assets/vipsystemnew/arrow_r_h.png") no-repeat ;
      }
    }
  }
</style>
