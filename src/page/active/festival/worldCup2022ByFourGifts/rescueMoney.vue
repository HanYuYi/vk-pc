<template>
  <div class="rescue-money">

    <dl class="table-com">
      <dt class="table-com-title">
        <h3></h3>
        <p class="desc">活动期间，在体育场馆游戏(2022世界杯 逐鹿卡塔尔)中累计产生负盈利≥10,000元且VIP等级≥1的会员，即<br>可在世界杯结束后领取专属救援金。</p>
      </dt>
      <dd class="table-com-content">
        <table>
          <thead>
            <tr>
              <th v-for="(title, index) in tableData.title" :key="index" :width="index === 1 ? 177 : (679 - 177) / 4">{{ title }}</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableData.content[1].length" :key="index">
              <td>VIP{{ index }}</td>
              <td>{{ tableData.content[1][index] }}</td>
              <td>{{ tableData.content[2][index] }}</td>
              <td>{{ tableData.content[3][index] }}</td>
              <td v-if="index === 0" :rowspan="tableData.content[1].length">{{ tableData.content[4] }}</td>
            </tr>
          </tbody>
        </table>
      </dd>
    </dl>

    <p class="bonus-tips">累计负盈利 <span>2,000.32</span> 元，可领 <span>3,333.32</span>元</p>

    <button class="world-cup2022-btn1">
      <span class="world-cup2022-four-gifts-gradient-color">立即领取</span>
    </button>

    <!-- 规则-->
    <dl class="rules">
      <dt></dt>
      <dd>
        <ul>
          <li><i>1</i><p>威客体育游戏包括：威客体育、FB体育、BTI体育、平博体育、皇冠体育、沙巴体育、IM体育。本活动开始期间结算时的盈亏将累计计算至世界杯结束。<br>
            例：会员VIP1投注指定赛事结算后，威客体育竞盈利5000，平博体育负盈利15000，则该会员当日累积结算为负盈利10000，世界杯结束后可领取30元的救援彩金。</p></li>
          <li><i>2</i><p>每日未发起提款前的存款都视为首充。满足条件的会员需在世界杯结束后的3天内在活动页面自行点击领取救援金，逾期则视为自动放弃。</p></li>
          <li><i>3</i><p>申请获得的彩金将自动派发至会员所选择的的体育游戏钱包中，活动彩金需在体育场馆中完成1倍流水即可转出；当会员对应体育游戏钱包余额≤原体育钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，活动流水未完成前不可再次申请本活动。</p></li>
          <li><i>4</i><p>此优惠活动领取当天不与威客体育包赔活动、世界杯包赔活动、体育100%包赔活动、VIP月救援金活动共享，活动同时进行时，只可选择一个参加。</p></li>
          <li><i>5</i><p>亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。</p></li>
          <li><i>6</i><p>每位有效玩家、手机号码、电子邮箱、银行卡、IP地址、每台设备只能使用一个账号享受优惠。对违规的用户，VKGAME保留无限期审核，和扣回红利及所产生的利润权利，本活动最终解释权归VKGAME所有。</p></li>
        </ul>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'rescueMoney',
  data() {
    return {
      tableData: {
        title: ["会员等级要求", "世界杯期间负盈利(￥)", "救援金比例", "救援金上限(￥)", "流水要求"],
        content: [
          "",
          ["-", "≥10,000", "≥50,000", "≥70,000", "≥100,000", "≥200,000", "≥200,000", "≥200,000", "≥200,000", "≥200,000", "≥200,000", "≥200,000", "≥200,000"],
          ["-", "0.30%", "0.30%", "0.30%", "0.30%", "0.30%", "0.40%", "0.50%", "0.60%", "0.80%", "1.00%", "1.20%", "1.50%"],
          ["-", 188, 388, 588, 688, 888, "1,688", "2,888", "8,888", "18,888", "38,888", "58,888", "88,888"],
          "全站1倍流水"
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.rescue-money {
  .table-com {
    .table-com-content {
      width: 695px;
      margin: 27px auto 0;
      table {
        width: 679px;
      }
    }
  }

  .bonus-tips {
    margin-top: 26px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    span {
      color: #fff7a6;
      font-family: Roboto;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .world-cup2022-btn1 {
    margin: 22px auto 0;
  }

  .rules {
    margin-top: 20px;
    margin-bottom: 19px;
  }
}
</style>
