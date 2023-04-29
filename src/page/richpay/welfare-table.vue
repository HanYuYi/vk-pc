<template>
  <div class="richpay_home_floor">
    <dl class="main">
      <dt class="richpay_head">V富通转账红包</dt>
      <dd class="richpay_content">
        <div class="table-panel">
          <h2>活动期间，将余额从V富通转出≥100元到主钱包时，即可获得V富通转账红包，单日赠送上限<span class="richpay_home_highlight">588</span>元。<a class="richpay_home_highlight" @click="$emit('visibleRule')">查看完整活动规则</a></h2>
          <table cellspacing="0">
            <tr>
              <th>充值时间</th>
              <th>充值渠道</th>
              <th>转账加码</th>
              <th>单日赠送</th>
              <th>存放时间</th>
              <th>
                <div class="packing">额外加码
                  <el-popover trigger="hover"
                              placement="bottom"
                              popper-class="richpay-page-add-chips"
                              width="320">
                    <div class="rich-popover">
                      <h2>存放额外加码</h2>
                      <ul>
                        <li><span>例：</span>V富通余额6000，满足存放时间6小时金额3000，全额转出时</li>
                        <li><span>转账加码</span>=6000*V富通转账加码比例</li>
                        <li><span>额外加码</span>=3000*（0.1‰~0.5‰）</li>
                        <li><span>流水要求</span>=6000+转账加码+额外加码</li>
                      </ul>
                    </div>
                    <i slot="reference"><i class="rule-txt">?</i></i>
                  </el-popover>
                </div>
              </th>
            </tr>
            <tr>
              <td>07:01-23:00</td>
              <td rowspan="2">虚拟币充值</td>
              <td>2.00%+0.5‰</td>
              <td rowspan="2">上限588元<br><br>（转账金额+红利）<br><br>1倍全站流水</td>
              <td rowspan="2">6小时+</td>
              <td rowspan="2">随机加码 0.1 ~ 0.5‰</td>
            </tr>
            <tr>
              <td>23:01-次日07:00</td>
              <td>2.50%+0.5‰</td>
            </tr>
          </table>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'welfare-table'
}
</script>

<style lang="less" scoped>
.table-panel {
  border-top: 1px solid transparent;
  &>h2 {
    line-height: 83px;
    font-size: 14px;
    text-align: center;
    font-weight: normal;
    color: #fff;
    a {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  &>table {
    width: 996px;
    margin: 0 auto;
    color: #ffffff;
    border-top: 1px solid rgba(131, 249, 253, 0.5);
    border-left: 1px solid rgba(131, 249, 253, 0.5);
    border-bottom: 0;

    tr {
      th {
        height: 60px;
        font-size: 18px;
        font-weight: normal;
        border-bottom: 1px solid rgba(131,249,253, 0.5);
        border-right: 1px solid rgba(131,249,253, 0.5);
        &:last-child {
          .packing {
            .rule-txt {
              display: inline-block;
              width: 18px;
              height: 18px;
              line-height: 18px;
              text-align: center;
              color: #a1a3df;
              border: 1px solid #a1a3df;
              border-radius: 50%;
              margin-left: 5px;
              cursor: pointer;
              &:hover {
                color: #83f9fd;
                border: 1px solid #83f9fd;
              }
            }
          }
        }
      }
      td {
        height: 80px;
        width: calc(100% / 6);
        font-size: 14px;
        text-align: center;
        border-bottom: 1px solid rgba(131,249,253, 0.5);
        border-right: 1px solid rgba(131,249,253, 0.5);
      }
    }
  }
}

</style>

<style lang="less">
.richpay-page-add-chips {
  height: 225px;
  border: 1px solid #83f9fd;
  background: #232656;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.4);
  padding: 0;
  .rich-popover {
    width: calc(100% - 24px);
    margin: 20px auto 0;
    color: #fff;
    h2 {
      font-size: 18px;
      text-align: center;
      font-weight: normal;
    }
    ul {
      margin-top: 20px;
      li {
        font-size: 14px;
        line-height: 26px;
        margin-left: 28px;
        &:first-child {
          margin-left: 0;
        }
        span {
          color: #83f9fd;
        }
      }
    }
  }
  .popper__arrow {
    border-top-color: #83f9fd!important;
    border-bottom-color: #83f9fd!important;
    &:after {
      border-top-color: #232656!important;
      border-bottom-color: #232656!important;
    }
  }
}
</style>
