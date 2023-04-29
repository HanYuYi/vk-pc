import axios from "axios";
import qs from "qs";
import { Message } from "element-ui";
import router from "../router/index";
import Store from "../store/index";


var hideMsg = "";
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

const baseURL = "/api";
// const baseURL = process.env.NODE_ENV=="production"?"http://47.244.146.96:8602/":"/api";
var axiosState = {};
var source = {};

function cancelQuest(url) {
  if (typeof source[url] === "function") {
    source[url]("Termination"); //取消请求
    delete source[url];
  }
}
let $http = (opts, data) => {

  // opts.repeat=true,允许重复
  var repeat = opts.repeat;
  hideMsg = data && data.hideMsg ? data.hideMsg : false;
  if (opts.hideMsg) {
    hideMsg = true;
  }
  var Public = null;

  if (data && data.hideMsg) {
    delete data.hideMsg;
  }
  let httpDefaultOpts = {
    //http默认配置
    method: opts.method ? opts.method : "post",
    url: baseURL + opts.url + (opts.timeSign ? '?t=' + new Date().getTime() : ''),
    timeout: opts.timeout ? opts.timeout : 30000,
    headers:
      opts.method == "get"
        ? {
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            COMPANY: "vkgame",
            'VKEGAME':' mjls1w3p'
          }
        : {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            COMPANY: "vkgame",
            'VKEGAME':' mjls1w3p'
          }
  };

  if (!!data) {
    httpDefaultOpts.params = Public ? Object.assign(Public, data) : data;
    if (opts.cancel) {
      cancelQuest(opts.url);
      httpDefaultOpts.cancelToken = new axios.CancelToken(function executor(c) {
        source[opts.url] = c;
      });
    }
    if (opts.method == "get") {
      httpDefaultOpts.data = p(JSON.stringify(data));
    } else {
      let temo = Object.assign(data, {
        auth_key: getm(decodeURIComponent(qs.stringify(otk(data))))
      })
      httpDefaultOpts.data = p(JSON.stringify(temo)
      );
    }
  } else {
    httpDefaultOpts.params = "";
    httpDefaultOpts.data = "";
  }
  if (opts.method == "get") {
    delete httpDefaultOpts.data;
  } else {
    delete httpDefaultOpts.params;
  }
  let promise = new Promise(function(resolve, reject) {
    if (
      typeof axiosState[opts.url] !== "undefined" &&
      axiosState[opts.url] &&
      repeat != true
    ) {
      return;
    } //防
    //公共参数
    axiosState[opts.url] = true;
    axios(httpDefaultOpts)
      .then(function(res) {
        axiosState[opts.url] = false;
        let ress = successState(res);
        resolve(ress);
      })
      .catch(function(error) {
        axiosState[opts.url] = false;
        let err = errorState(error, opts);
        reject(err);
      });
  });
  return promise;
};

function successState(response) {
  // 如果http状态码正常，则直接返回数据
  if (
    response &&
    (response.status === 200 ||
      response.status === 304 ||
      response.status === 400)
  ) {
    let res = JSON.parse(n(response.data));
    if (res.status !== 1) {
      if (!res.hide_error) {
        if (res.message) {
          Message({
            dangerouslyUseHTMLString:true,
            message: res.message,
            type: "warning",
            duration: 1000
          });
        }
      }
    }
    if (res.error_code === 103) {
      Store.commit("updateLoginStatus", false);
      Store.commit('updateLoadHostpot', false)
      if (res.jump_type === 4) {
        router.push({ path: "/login" });
      }
      //router.push({path: '/'})
    }
    //ip限制
    if(res.error_code === 106) {
      Store.commit('setKFUrl', res.cs_link)
      Store.commit('setStoreValue',{name:'ip',value:res.ip})
      router.push({ path:'/ipban' });
    }
    return res;
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
}

function errorState(res, opts) {
  //统一判断后端返回的错误码
  if (res.message != "Termination") {
    if (res) {
      if (res.status === 404) {
        let ress = n(res.data);
        Message({
          dangerouslyUseHTMLString:true,
          message: ress.statusText,
          type: "warning",
          duration: 1600
        });
        //跳转 404页面
        /*router.push({path:'/404'})*/
      } else {
        if (res.message.indexOf("timeout") == -1) {
          const mobileCheck = () => {
            let check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
          }
          if (!mobileCheck()) {
            Message({
              dangerouslyUseHTMLString:true,
              message: window.vm.$i18n.t("Server_connection_failure"),
              type: "warning",
              duration: 1600
            });
          }
        }
      }
    } else {
      Message({
        dangerouslyUseHTMLString:true,
        message: window.vm.$i18n.t("Network_connection_failure"),
        type: "warning",
        duration: 1600
      });
    }
  }
  return res;
}
export default $http;

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
/* export default {
  install: function(Vue, Option) {
    Object.defineProperty(Vue.prototype, "$http", { value: axios });
  }
};*/

/*
 字符串解密，为了接口加密解密的key，iv的值
 如果这两个值要修改，先用下面的加密函数加密后，修改原值
*/
// function strSmDencode(str)
// {
//   // var s = secret.value;
//   // s 是一个字符串， 类型： String
//   // 根据 s 来创建一个字符串对象
//   // str 的类型是: Object
//   // var str = new String(s);
//   // length 是获取字符串对象的长度，也就是说有多少个字符
//   // str.length
//   var r = "";
//   // string 类型的可以当做字符串对象来用
//   for (var i = 0; i < str.length; i++)
//   {
//     // 取出下标为 i 字符的编码
//     var code = str.charCodeAt(i);
//     // 将字符对应的编码，拼接到一个空字符串上
//     r += code;
//     // 每个符号后，添加 , 分割
//     r += ",";
//   }
//   // secret.value
//   // 设置输入框的内容为 r
//   return r;
// }

