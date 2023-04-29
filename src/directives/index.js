// import activeptliushui  from "./activeptliushui";
import elDilogDirCenter from "./elDilogDirCenter"
import dialogBackdrop from "./dialogBackdrop"

export default (Vue) => {
  // Vue.directive('activePtliushui',activeptliushui)
  Vue.directive('dir-center',elDilogDirCenter)
  Vue.directive('backdrop',dialogBackdrop)
}
