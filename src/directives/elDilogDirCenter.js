import Vue from 'vue'

export default {
  componentUpdated: (el, binding) => {
    if (binding.value) {
      Vue.nextTick(() => {
        const parentHeight = el.offsetHeight
        const dialogEl = el.querySelector(".el-dialog")
        const dialogHeight = dialogEl.offsetHeight
        dialogEl.style.marginTop = 0
        dialogEl.style.top = (parentHeight - dialogHeight) / 2 + "px"
      })
    }
  }
}


