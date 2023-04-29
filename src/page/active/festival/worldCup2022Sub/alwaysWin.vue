<template>
  <div class="always-win">

    <dl class="table-com">
      <dt class="table-com-title">
        <h3></h3>
        <p class="desc">活动期间，会员参与世界杯专享连赢追红，在2022世界杯逐鹿卡塔尔结束后，完成8场连赢总有效投注≥5888元，即可领<br>取对应档次的彩金，最高可领8888元。</p>
      </dt>
      <dd class="table-com-content">
        <table>
          <thead>
            <tr>
              <th v-for="(title, index) in tableData.title" :key="index">{{ title }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableData.content[1].length" :key="index">
              <td v-if="index === 0" :rowspan="tableData.content[1].length">{{ tableData.content[0] }}</td>
              <td>{{ tableData.content[1][index] }}</td>
              <td>{{ tableData.content[2][index] }}</td>
              <td v-if="index === 0" :rowspan="tableData.content[1].length">{{ tableData.content[3] }}</td>
            </tr>
          </tbody>
        </table>
      </dd>
    </dl>

    <button @click="openKfWindow()" class="world-cup2022-btn1">
      <span class="world-cup2022-sub-gradient-color">联系客服申请</span>
    </button>

    <!-- 规则-->
    <dl class="rules">
      <dt></dt>
      <dd>
        <ul>
          <li><i>1</i><p>本活动开始期间结算时的注单将计算至世界杯结束视为有效申请条件。</p></li>
          <li><i>2</i><p>威客体育游戏包括：威客体育、FB体育、BTI体育、平博体育、皇冠体育、沙巴体育、IM体育其中单个场馆内投注世界杯赛事产生连赢的会员，若投注其他场馆赛事交叉连赢，则无法申请此优惠活动。</p></li>
          <li><i>3</i><p>参与此优惠的会员需要投注世界杯赛事；连续产生结算为赢的注单即可计算为连赢，若中途出现注单为输，则连赢中断。同场赛事同一玩法多个注单仅计算下注金额最高的注单。</p></li>
          <li><i>4</i><p>此优惠活动连赢计算串关玩法，若在期间投注串关玩法，注单为全赢，即可计算为连赢1局。此优惠活动领取当天不与体育连赢活动共享，活动同时进行时，只可选择一个参加。</p></li>
          <li><i>5</i><p>满足条件的会员需在世界杯结束后的3天内联系在线客服申请活动彩金，逾期则视为自动放弃。申请获得的彩金将自动派发至会员所选择的的体育游戏钱包中，活动彩金需在体育场馆中完成1倍流水即可转出；当会员对应体育游戏钱包余额≤原体育钱包余额且无未结算注单时，系统将自动判定已完成活动规定的有效流水，活动流水未完成前不可再次申请本活动。</p></li>
          <li><i>6</i><p>盘口赔率要求:亚洲盘赔率<0.75、欧洲盘<1.75、美洲盘≤-133、马来盘≤0.75且>0、走盘、注单取消、对冲、未结算、串关、平半盘、实时兑现等不计算为有效流水。</p></li>
          <li><i>7</i><p>每位有效玩家、每个手机号码、电子邮箱、IP地址、每张银行卡、每台设备只能享受一次优惠，如发现有违规者我们将保留无限期审核扣回红利及所产生的利润权利；VKGAME对本活动保有最终解释权。</p></li>
        </ul>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'alwaysWin',
  data() {
    return {
      tableData: {
        title: ["游戏场馆", "连赢8局有效投注总额(￥)", "赠送彩金金额(￥)", "流水要求"],
        content: [
          "所有体育场馆",
          ["≥5,888", "≥16,888", "≥68,888", "≥88,888", "≥388,888", "≥588,888"],
          [188, 388, "1,288", "1,888", "3,888", "8,888"],
          "体育1倍流水"
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.always-win {
  .table-com {
    .table-com-content {
      width: 619px;
      margin: 27px auto 0;
      table {
        width: 603px;
      }
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
