<template>
  <transition name="slide">
    <ul v-show="visible" class="global_country_select">
      <li v-for="(item, index) in areaCodeList"
          :key="index"
          @click="backValue(item)"
          :class="{active: prefix === item.code}">
        <p class="txt">
          <i class="icon" :class="item.code" />
          <span>{{ item.cn }}</span>
        </p>
        <span class="c-code">+{{ item.number }}</span>
      </li>
    </ul>
  </transition>

</template>

<script>
export default {
  name: 'global-country-select',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      prefix: '',
      areaCodeList: [],
      countryCodeList: [],
      selectedRow: {}
    }
  },
  mounted () {
    this.getAreaCode()
    this.blurHide()
  },
  methods: {
    // 获取手机号码前缀
    getAreaCode () {
      this.$http(this.ApiSetting.index.getCountryPrefix)
        .then((res) => {
          console.info("初始化手机前缀信息：", res)
          if (res.status === 1) {
            if (res.data.length > 0) {
              this.prefix = res.data[0].code
              this.$emit("change", res.data[0].number)
              this.areaCodeList = res.data
            }
          }
        })
    },
    blurHide () {
      document.addEventListener('click', event => {
        if (this.visible) {
          this.$emit('update:visible', false)
        }
      })
    },

    backValue(row) {
      this.prefix = row.code
      this.$emit("change", this.areaCodeList.find(item => this.prefix === item.code).number)
    }
  }
}
</script>

<style lang="less" scoped>
.slide-enter-active {
  transition: all .15s ease;
}
.slide-leave-active {
  transition: all .15s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.global_country_select {
  position: absolute;
  left: -2px;
  width: 338px;
  height: 184px;
  margin: 4px 0;
  overflow-y: auto;
  overflow-x: hidden;
  border: 0;
  border-radius: 6px;
  background-color: #545f75;
  padding: 3px 0;
  z-index: 1;
  li {
    width: 326px;
    margin-left: 4px;
    border-radius: 6px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    &:hover, &.active {
      color: #07f1b7;
      background-color: #222431;
    }
    .txt {
      .icon {
        margin: 0 10px 0;
        vertical-align: middle;
        display: inline-block;
        width: 16px;
        height: 11px;
        background: url(../assets/login/national_flags.png) no-repeat;
        &.ad {
          background-position: 0 0;
        }
        &.ae {
          background-position: 0 -11px;
        }
        &.af {
          background-position: 0 -22px;
        }
        &.ag {
          background-position: 0 -33px;
        }
        &.ai {
          background-position: 0 -44px;
        }
        &.al {
          background-position: 0 -55px;
        }
        &.am {
          background-position: 0 -66px;
        }
        &.an {
          background-position: 0 -77px;
        }
        &.ao {
          background-position: 0 -88px;
        }
        &.ar {
          background-position: 0 -99px;
        }
        &.as {
          background-position: 0 -110px;
        }
        &.at {
          background-position: 0 -121px;
        }
        &.au {
          background-position: 0 -132px;
        }
        &.aw {
          background-position: 0 -143px;
        }
        &.ax {
          background-position: 0 -154px;
        }
        &.az {
          background-position: 0 -165px;
        }
        &.ba {
          background-position: 0 -176px;
        }
        &.bb {
          background-position: 0 -187px;
        }
        &.bd {
          background-position: 0 -198px;
        }
        &.be {
          background-position: 0 -209px;
        }
        &.bf {
          background-position: 0 -220px;
        }
        &.bg {
          background-position: 0 -231px;
        }
        &.bh {
          background-position: 0 -242px;
        }
        &.bi {
          background-position: 0 -253px;
        }
        &.bj {
          background-position: 0 -264px;
        }
        &.bm {
          background-position: 0 -275px;
        }
        &.bn {
          background-position: 0 -286px;
        }
        &.bo {
          background-position: 0 -297px;
        }
        &.br {
          background-position: 0 -308px;
        }
        &.bs {
          background-position: 0 -319px;
        }
        &.bt {
          background-position: 0 -330px;
        }
        &.bv {
          background-position: 0 -341px;
        }
        &.bw {
          background-position: 0 -352px;
        }
        &.by {
          background-position: 0 -363px;
        }
        &.bz {
          background-position: 0 -374px;
        }
        &.ca {
          background-position: 0 -385px;
        }
        &.catalonia {
          background-position: 0 -396px;
        }
        &.cc {
          background-position: 0 -407px;
        }
        &.cd {
          background-position: 0 -418px;
        }
        &.cf {
          background-position: 0 -429px;
        }
        &.cg {
          background-position: 0 -440px;
        }
        &.ch {
          background-position: 0 -451px;
        }
        &.ci {
          background-position: 0 -462px;
        }
        &.ck {
          background-position: 0 -473px;
        }
        &.cl {
          background-position: 0 -484px;
        }
        &.cm {
          background-position: 0 -495px;
        }
        &.cn {
          background-position: 0 -506px;
        }
        &.co {
          background-position: 0 -517px;
        }
        &.cu {
          background-position: 0 -528px;
        }
        &.cr {
          background-position: 0 -539px;
        }
        &.cs {
          background-position: 0 -550px;
        }
        &.cv {
          background-position: 0 -561px;
        }
        &.cx {
          background-position: 0 -572px;
        }
        &.cy {
          background-position: -16px 0;
        }
        &.cz {
          background-position: -16px -11px;
        }
        &.de {
          background-position: -16px -22px;
        }
        &.dj {
          background-position: -16px -33px;
        }
        &.dk {
          background-position: -16px -44px;
        }
        &.dm {
          background-position: -16px -55px;
        }
        &.do {
          background-position: -16px -66px;
        }
        &.dz {
          background-position: -16px -77px;
        }
        &.ec {
          background-position: -16px -88px;
        }
        &.ee {
          background-position: -16px -99px;
        }
        &.eg {
          background-position: -16px -110px;
        }
        &.eh {
          background-position: -16px -121px;
        }
        &.england {
          background-position: -16px -132px;
        }
        &.er {
          background-position: -16px -143px;
        }
        &.es {
          background-position: -16px -154px;
        }
        &.et {
          background-position: -16px -165px;
        }
        &.eu {
          background-position: -16px -176px;
        }
        &.fam {
          background-position: -16px -187px;
        }
        &.fi {
          background-position: -16px -198px;
        }
        &.fj {
          background-position: -16px -209px;
        }
        &.fk {
          background-position: -16px -220px;
        }
        &.fm {
          background-position: -16px -231px;
        }
        &.fo {
          background-position: -16px -242px;
        }
        &.fr {
          background-position: -16px -253px;
          float: none;
          margin-right: 10px;
        }
        &.ga {
          background-position: -16px -264px;
        }
        &.gb {
          background-position: -16px -275px;
        }
        &.gd {
          background-position: -16px -286px;
        }
        &.ge {
          background-position: -16px -297px;
        }
        &.gf {
          background-position: -16px -308px;
        }
        &.gh {
          background-position: -16px -319px;
        }
        &.gi {
          background-position: -16px -330px;
        }
        &.gl {
          background-position: -16px -341px;
        }
        &.gm {
          background-position: -16px -352px;
        }
        &.gn {
          background-position: -16px -363px;
        }
        &.gp {
          background-position: -16px -374px;
        }
        &.gq {
          background-position: -16px -385px;
        }
        &.gr {
          background-position: -16px -396px;
        }
        &.gs {
          background-position: -16px -407px;
        }
        &.gt {
          background-position: -16px -418px;
        }
        &.gu {
          background-position: -16px -429px;
        }
        &.gw {
          background-position: -16px -440px;
        }
        &.gy {
          background-position: -16px -451px;
        }
        &.hk {
          background-position: -16px -462px;
        }
        &.hm {
          background-position: -16px -473px;
        }
        &.hn {
          background-position: -16px -484px;
        }
        &.hr {
          background-position: -16px -495px;
        }
        &.ht {
          background-position: -16px -506px;
        }
        &.hu {
          background-position: -16px -517px;
        }
        &.id {
          background-position: -16px -528px;
        }
        &.ie {
          background-position: -16px -539px;
        }
        &.il {
          background-position: -16px -550px;
        }
        &.in {
          background-position: -16px -561px;
        }
        &.io {
          background-position: -16px -572px;
        }
        &.iq {
          background-position: -32px 0;
        }
        &.ir {
          background-position: -32px -11px;
        }
        &.is {
          background-position: -32px -22px;
        }
        &.it {
          background-position: -32px -33px;
        }
        &.jm {
          background-position: -32px -44px;
        }
        &.jo {
          background-position: -32px -55px;
        }
        &.jp {
          background-position: -32px -66px;
        }
        &.ke {
          background-position: -32px -77px;
        }
        &.kg {
          background-position: -32px -88px;
        }
        &.kh {
          background-position: -32px -99px;
        }
        &.ki {
          background-position: -32px -110px;
        }
        &.km {
          background-position: -32px -121px;
        }
        &.kn {
          background-position: -32px -132px;
        }
        &.kp {
          background-position: -32px -143px;
        }
        &.kr {
          background-position: -32px -154px;
        }
        &.kw {
          background-position: -32px -165px;
        }
        &.ky {
          background-position: -32px -176px;
        }
        &.kz {
          background-position: -32px -187px;
        }
        &.la {
          background-position: -32px -198px;
        }
        &.lb {
          background-position: -32px -209px;
        }
        &.lc {
          background-position: -32px -220px;
        }
        &.li {
          background-position: -32px -231px;
        }
        &.lr {
          background-position: -32px -242px;
        }
        &.lk {
          background-position: -32px -253px;
        }
        &.ls {
          background-position: -32px -264px;
        }
        &.lt {
          background-position: -32px -275px;
        }
        &.lu {
          background-position: -32px -286px;
        }
        &.lv {
          background-position: -32px -297px;
        }
        &.ly {
          background-position: -32px -308px;
        }
        &.ma {
          background-position: -32px -319px;
        }
        &.mc {
          background-position: -32px -330px;
        }
        &.md {
          background-position: -32px -341px;
        }
        &.me {
          background-position: -32px -352px;
        }
        &.mg {
          background-position: -32px -363px;
        }
        &.mh {
          background-position: -32px -374px;
        }
        &.mk {
          background-position: -32px -385px;
        }
        &.ml {
          background-position: -32px -396px;
        }
        &.mm {
          background-position: -32px -407px;
        }
        &.mn {
          background-position: -32px -418px;
        }
        &.mo {
          background-position: -32px -429px;
        }
        &.mp {
          background-position: -32px -440px;
        }
        &.mq {
          background-position: -32px -451px;
        }
        &.mr {
          background-position: -32px -462px;
        }
        &.ms {
          background-position: -32px -473px;
        }
        &.mt {
          background-position: -32px -484px;
        }
        &.mu {
          background-position: -32px -495px;
        }
        &.mv {
          background-position: -32px -506px;
        }
        &.mw {
          background-position: -32px -517px;
        }
        &.mx {
          background-position: -32px -528px;
        }
        &.my {
          background-position: -32px -539px;
        }
        &.mz {
          background-position: -32px -550px;
        }
        &.na {
          background-position: -32px -561px;
        }
        &.nc {
          background-position: -32px -572px;
        }
        &.ne {
          background-position: -48px 0;
        }
        &.nf {
          background-position: -48px -11px;
        }
        &.ng {
          background-position: -48px -22px;
        }
        &.ni {
          background-position: -48px -33px;
        }
        &.nl {
          background-position: -48px -44px;
        }
        &.no {
          background-position: -48px -55px;
        }
        &.np {
          background-position: -48px -66px;
        }
        &.nr {
          background-position: -48px -77px;
        }
        &.nu {
          background-position: -48px -88px;
        }
        &.nz {
          background-position: -48px -99px;
        }
        &.om {
          background-position: -48px -110px;
        }
        &.pa {
          background-position: -48px -121px;
        }
        &.pe {
          background-position: -48px -132px;
        }
        &.pf {
          background-position: -48px -143px;
        }
        &.pg {
          background-position: -48px -154px;
        }
        &.ph {
          background-position: -48px -165px;
        }
        &.pk {
          background-position: -48px -176px;
        }
        &.pl {
          background-position: -48px -187px;
        }
        &.pm {
          background-position: -48px -198px;
        }
        &.pn {
          background-position: -48px -209px;
        }
        &.pr {
          background-position: -48px -220px;
        }
        &.ps {
          background-position: -48px -231px;
        }
        &.pt {
          background-position: -48px -242px;
        }
        &.pw {
          background-position: -48px -253px;
        }
        &.py {
          background-position: -48px -264px;
        }
        &.qa {
          background-position: -48px -275px;
        }
        &.re {
          background-position: -48px -286px;
        }
        &.ro {
          background-position: -48px -297px;
        }
        &.rs {
          background-position: -48px -308px;
        }
        &.ru {
          background-position: -48px -319px;
        }
        &.rw {
          background-position: -48px -330px;
        }
        &.sa {
          background-position: -48px -341px;
        }
        &.sb {
          background-position: -48px -352px;
        }
        &.sc {
          background-position: -48px -363px;
        }
        &.scotland {
          background-position: -48px -374px;
        }
        &.sd {
          background-position: -48px -385px;
        }
        &.se {
          background-position: -48px -396px;
        }
        &.sg {
          background-position: -48px -407px;
        }
        &.sh {
          background-position: -48px -418px;
        }
        &.si {
          background-position: -48px -429px;
        }
        &.sj {
          background-position: -48px -440px;
        }
        &.sk {
          background-position: -48px -451px;
        }
        &.sl {
          background-position: -48px -462px;
        }
        &.sm {
          background-position: -48px -473px;
        }
        &.sn {
          background-position: -48px -484px;
        }
        &.so {
          background-position: -48px -495px;
        }
        &.sr {
          background-position: -48px -506px;
        }
        &.st {
          background-position: -48px -517px;
        }
        &.sv {
          background-position: -48px -528px;
        }
        &.sy {
          background-position: -48px -539px;
        }
        &.sz {
          background-position: -48px -550px;
        }
        &.tc {
          background-position: -48px -561px;
        }
        &.td {
          background-position: -48px -572px;
        }
        &.tf {
          background-position: -64px 0;
        }
        &.tg {
          background-position: -64px -11px;
        }
        &.th {
          background-position: -64px -22px;
        }
        &.tj {
          background-position: -64px -33px;
        }
        &.tk {
          background-position: -64px -44px;
        }
        &.tl {
          background-position: -64px -55px;
        }
        &.tm {
          background-position: -64px -66px;
        }
        &.tn {
          background-position: -64px -77px;
        }
        &.to {
          background-position: -64px -88px;
        }
        &.tr {
          background-position: -64px -99px;
        }
        &.tt {
          background-position: -64px -110px;
        }
        &.tv {
          background-position: -64px -121px;
        }
        &.tw {
          background-position: -64px -132px;
        }
        &.tz {
          background-position: -64px -143px;
        }
        &.ua {
          background-position: -64px -154px;
        }
        &.ug {
          background-position: -64px -165px;
        }
        &.um {
          background-position: -64px -176px;
        }
        &.us {
          background-position: -64px -187px;
        }
        &.uy {
          background-position: -64px -198px;
        }
        &.uz {
          background-position: -64px -209px;
        }
        &.va {
          background-position: -64px -220px;
        }
        &.vc {
          background-position: -64px -231px;
        }
        &.ve {
          background-position: -64px -242px;
        }
        &.vg {
          background-position: -64px -253px;
        }
        &.vi {
          background-position: -64px -264px;
        }
        &.vn {
          background-position: -64px -275px;
        }
        &.vu {
          background-position: -64px -286px;
        }
        &.wales {
          background-position: -64px -297px;
        }
        &.wf {
          background-position: -64px -308px;
        }
        &.ws {
          background-position: -64px -319px;
        }
        &.ye {
          background-position: -64px -330px;
        }
        &.yt {
          background-position: -64px -341px;
        }
        &.za {
          background-position: -64px -352px;
        }
        &.zm {
          background-position: -64px -363px;
        }
        &.zw {
          background-position: -64px -374px;
        }
      }
      span {

      }
    }
    .c-code {
      margin-right: 12px;
    }
  }
}

</style>
