<template>
  <div class="richpay_home_floor" style="margin-top: 60px" :style="{marginBottom: !collapse ? '83px' : '0'}">
    <dl class="main collapse_panel">
      <dt class="richpay_head" @click="collapse = !collapse" :class="{coll: collapse}">
        钱包常见问题<i class="fold_icon" :class="{open: !collapse}"></i>
      </dt>

      <transition name="slide-fade">
        <dd class="richpay_content" v-show="!collapse">
          <div class="doubt-panel">

            <ol>
              <li>
                <dl>
                  <dt>如何转入资金？</dt>
                  <dd>只要您登录威客任何一个域名或是使用威客手机APP登录后，将您主账户上可提款额度转入至“威客V富通钱包”即可。</dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>如何转出资金？</dt>
                  <dd>要您登录威客任何一个域名或是使用威客手机APP登录后，将“威客V富通钱包”里的钱转出至主账户。</dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>多久才能有收益？</dt>
                  <dd>资金转入“威客V富通钱包”满足每1小时派发一次利息，您可随时提出利息收益到主钱包，无需流水即可提款。</dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>存入时间有限制吗？</dt>
                  <dd>无任何限制，24小时随时存入。</dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>利息收益和资金转出是否有流水要求？</dt>
                  <dd>利息和资金转出到主钱包后提款无任何流水要求。这里建议资金转入V富通钱包后至少保证1个小时的派息期，不足1个小时没有利息哦。</dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dd>因不可抗力或其他原因发生变动，威客电竞有权进行任何调整，以保证提供给会员更优质的收益环境。</dd>
                </dl>
              </li>
            </ol>

          </div>
        </dd>
      </transition>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'doubt',
  data () {
    return {
      collapse: true
    }
  }
}
</script>

<style lang="less" scoped>
.doubt-panel {
  ol {
    width: calc(100% - (247px * 2));
    margin: 26px auto 0;
    li {
      list-style: disc;
      font-size: 14px;
      line-height: 24px;
      margin-top: 13px;
      color: #fff;
      dl {
        dt {
          font-weight: bold;
        }
      }
      &:last-child {
        font-weight: bold;
        dl {
          dd {
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
