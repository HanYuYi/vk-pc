export default {
 bind:function (el,bindings) {
   if(bindings.value) {
    el.style.backgroundColor=bindings.value
   }
 }
}