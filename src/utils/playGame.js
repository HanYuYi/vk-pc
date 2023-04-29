import store from "../store"
import { MessageBox, Message } from "element-ui"
import $http from "../common/http"

/**
 * 获取游戏url信息后再进入游戏
 * @param gameServerRow {Object}
 * @param windowOptions {Object}
 * @return {Promise<void>}
 * @private
 */
const _getGameUrl = async (gameServerRow, windowOptions) => {
  try {
    const { api, next } = gameServerRow
    const { status, data, is_maintain, message, info } = await $http(api)
    if (status === 1) {
      joinTheGame(data.url, windowOptions)
    } else if (is_maintain === 1) {
      // 维护
      store.commit("setPublicMaintainCompData", { message, info })
      next()
    }
  } catch (error) {
    throw error
  }
}

/**
 * 进入游戏验证器
 * @param url {string}
 * @return {boolean}
 * @private
 */
const _gameValidator = (url) => {
  // 拦截未修改过用户名的账号
  if (+store.state.userInfo.change_flag === 1) {
    MessageBox.alert("请先前往个人中心修改用户名，方可进入游戏", { center: true })
    return false
  }
  if (typeof url !== "string" || !url.length) {
    Message({ message: "请稍后再试", type: "warning" })
    return false
  }
  return true
}

/**
 * 进入游戏
 * @param url {string}
 * @param windowOptions {Object}
 */
const joinTheGame = (url, windowOptions = {}) => {
  if (!_gameValidator(url)) {
    return
  }

  let name = ""
  if (windowOptions && windowOptions.name) {
    name = windowOptions.name
    delete windowOptions.name
  }

  // 自定义 open 窗口参数
  let openProp = ""
  Object.keys(windowOptions).forEach((key, index) => {
    openProp += `${key}=${windowOptions[key]}`
    if (index < Object.keys(windowOptions).length - 1) {
      openProp += ','
    }
  })
  console.info("游戏连接：", url)

  url && window.open(url, name, openProp)
}

/**
 * 全局进入游戏统一方法
 * @param url {string | Object}
 * string 进入的游戏的url
 * Object 获取游戏url的接口  { api: "XXX", to: 路由to  next: 路由next }
 *
 * @param windowOptions {Object | undefined}
 */
const toPlayGame = (url, windowOptions) => {

  // 传入游戏url时
  if (typeof url === "string") {
    if (!store.state.isLogin) {
      Message({ message: "请您先登录", type: "warning" })
      return
    }
    joinTheGame(url, windowOptions)
  }
  // 传入游戏接口时
  if (Object.prototype.toString.call(url) === "[object Object]") {
    _getGameUrl(url, windowOptions)
  }
}

export { toPlayGame }
