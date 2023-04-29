import Vue from 'vue'

export default {
  bind: (el, binding) => {
    Vue.nextTick(() => {
      el.style.backdropFilter = binding.value ? `blur(${binding.value}rem)` : 'blur(0.15rem)'
    })
  }
}
