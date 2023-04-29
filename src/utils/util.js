import dateUtil from "./dateutil";
/*
      * base64解码
      * @param {Object} str
      */
let base64DecodeChars = new Array(
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  62,
  -1,
  -1,
  -1,
  63,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  -1,
  -1,
  -1,
  -1,
  -1
);
export const base64decode = function(str) {
  var c1, c2, c3, c4;
  var i, len, out;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    /* c1 */
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c1 == -1);
    if (c1 == -1) break;
    /* c2 */
    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c2 == -1);
    if (c2 == -1) break;
    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
    /* c3 */
    do {
      c3 = str.charCodeAt(i++) & 0xff;
      if (c3 == 61) return htmlDecodeByRegExp(out);
      c3 = base64DecodeChars[c3];
    } while (i < len && c3 == -1);
    if (c3 == -1) break;
    out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));
    /* c4 */
    do {
      c4 = str.charCodeAt(i++) & 0xff;
      if (c4 == 61) return htmlDecodeByRegExp(out);
      c4 = base64DecodeChars[c4];
    } while (i < len && c4 == -1);
    if (c4 == -1) break;
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
  }
  return htmlDecodeByRegExp(out);
};
function htmlDecodeByRegExp(str) {
  var temp = "";
  if (str.length == 0) return "";
  temp = str.replace(/&amp;/g, "&");
  temp = temp.replace(/&lt;/g, "<");
  temp = temp.replace(/&gt;/g, ">");
  temp = temp.replace(/&nbsp;/g, " ");
  temp = temp.replace(/&#39;/g, "'");
  temp = temp.replace(/&quot;/g, '"');
  return temp;
}
export const toDate = function(date) {
  let _date = new Date(date);
  // IE patch start (#1422)
  if (isNaN(_date.getTime()) && typeof date === "string") {
    _date = date.split("-").map(Number);
    _date[1] += 1;
    _date = new Date(..._date);
  }
  // IE patch end
  if (isNaN(_date.getTime())) return null;
  return _date;
};
export const formatWeek = function(date) {
  if (date) {
    date = toDate(date);
    let arr = [
      window.vm.$i18n.t("week_days"),
      window.vm.$i18n.t("one"),
      window.vm.$i18n.t("two"),
      window.vm.$i18n.t("three"),
      window.vm.$i18n.t("four"),
      window.vm.$i18n.t("five"),
      window.vm.$i18n.t("six")
    ];
    return arr[date.getDay() * 1];
  } else {
    return "";
  }

  // return  pad((date.getMonth()+1), 2) + '-' + pad((date.getDate()), 2) + '  ' + arr[date.getDay()*1];
};

export const formatDate = function(date, format) {
  date = toDate(date);
  if (!date) return "";
  return dateUtil.format(date, format || "yyyy-MM-dd");
};

export const formatCountTimeByDay = function(x, type) {
  var days, hour, minute, second
  days = Math.floor(x / (24 * 60 * 60));
  hour = Math.floor((x - days * 24 * 60 * 60) / 3600);
  minute = Math.floor((x - days * 24 * 60 * 60 - hour * 60 * 60) / 60);
  second = Math.floor(x - days * 24 * 60 * 60 - hour * 60 * 60 - minute * 60);
  if (x >= 86400) {
    return days + "天" + hour + "小时"
  } else {
    return pad(hour) + ":" + pad(minute) + ":" + pad(second);
  }
};

export const formatCountTime = function(x, type) {
  var hour = Math.floor((x / 3600)),
    minute = Math.floor((x - hour * 60 * 60) / 60),
    second = Math.floor(x - hour * 60 * 60 - minute * 60);
  if(type == 2 && hour == 0){
    return  pad(minute) + ":" + pad(second);
  }else{
    return pad(hour) + ":" + pad(minute) + ":" + pad(second);
  }
};

export const formatNumberFloatPad = function(number, len) {
  len = len || 2;
  if (checkRate(number * 1)) {
    return parseFloat(number).toFixed(len);
  }
};

export const formatNumberSplit = function(number) {
  let newStr = "";
  let count = 0;
  let str = String(number);
  if (str.indexOf(".") == -1) {
    for (let i = str.length - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + "," + newStr;
      } else {
        newStr = str.charAt(i) + newStr;
      }
      count++;
    }
    str = newStr + ".00"; // 自动补小数点后两位
  } else {
    for (let i = str.indexOf(".") - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + "," + newStr;
      } else {
        newStr = str.charAt(i) + newStr; // 逐个字符相接起来
      }
      count++;
    }
    str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
  }
  return str;
};

export const getViewPort = function() {
  if (document.compatMode == "BackCompat") {
    //浏览器嗅探，混杂模式
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    };
  } else {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  }
};
export const getDocumentPort = function() {
  if (document.compatMode == "BackCompat") {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    };
  } else {
    return {
      width: Math.max(
        document.documentElement.scrollWidth,
        document.documentElement.clientWidth
      ),
      height: Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.clientHeight
      )
    };
  }
};

export const beforeAfterTime = function(time, type) {
  //type 1 分钟，2 分钟后，3分钟前
  var tempCountDownTime = "",
    html = "";
  if (String(time).indexOf(":") < 0) {
    tempCountDownTime = time * 1;
    html = beforeAfterTime(formatCountTime(tempCountDownTime), type);
  } else {
    time = time.split(":");
    if (time.length > 2) {
      var h = time[0] * 1,
        m = time[1] * 1;
    } else if (time.length == 2) {
      var h = 0,
        m = time[0] * 1,
        s = time[1] * 1;
    }

    if (h == 0) {
      if (type == 3) {
        html = m + window.vm.$i18n.t("Minutes_ago");
      }
      if (type == 2) {
        html = m + window.vm.$i18n.t("Minutes_later");
      }
      if (type == 1) {
        html = m + window.vm.$i18n.t("minutes");
      }
    } else {
      if (Math.floor(h / 24) > 1) {
        html =
          (h / 24).toFixed(0) +
          (type == 2
            ? window.vm.$i18n.t("Days_later")
            : window.vm.$i18n.t("day"));
        if (type == 3) {
          html = (h / 24).toFixed(0) + window.vm.$i18n.t("Days_ago");
        }
        if (type == 2) {
          html = (h / 24).toFixed(0) + window.vm.$i18n.t("Days_later");
        }
        if (type == 1) {
          html = (h / 24).toFixed(0) + window.vm.$i18n.t("day");
        }
      } else {
        html =
          h +
          (type == 2
            ? window.vm.$i18n.t("Hours_later")
            : window.vm.$i18n.t("hours"));
        if (type == 3) {
          html = h + window.vm.$i18n.t("Hours_before");
        }
        if (type == 2) {
          html = h + window.vm.$i18n.t("Hours_later");
        }
        if (type == 1) {
          html = h + window.vm.$i18n.t("hours");
        }
      }
    }
  }
  return html;
};

export const copyArr = function(arr) {
  return arr.map(e => {
    if (typeof e === "object") {
      return Object.assign({}, e);
    } else {
      return e;
    }
  });
};

export const setCookie = function(key, value, t) {
  var oDate = new Date();
  oDate.setDate(oDate.getDate() + t);
  document.cookie =
    key + "=" + encodeURIComponent(value) + ";expires=" + oDate.toUTCString();
};
export const getCookie = function(key) {
  var str = document.cookie.replace(/;\s*/g, ";");
  var cookieArr = str.split(";");
  var cookieObj = {};
  for (var i = 0; i < cookieArr.length; i++) {
    var item = cookieArr[i];
    var k = item.split("=")[0];
    var v = item.split("=")[1];
    cookieObj[k] = v;
  }
  if (cookieObj[key]) {
    return decodeURIComponent(cookieObj[key]);
  } else {
    return false;
  }
};
export const removeCookie = function(key) {
  document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

export const getPosition = function(elm) {
  var actualLeft = elm.offsetLeft,
    actualTop = elm.offsetTop,
    current = elm.offsetParent; // 取得元素的offsetParent
  // 一直循环直到根元素
  while (current !== null) {
    actualLeft += current.offsetLeft;
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  // 返回包含left、top坐标的对象
  return {
    left: actualLeft,
    top: actualTop
  };
};

export const mobileCheck = function() {
  let check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
function pad(val, len) {
  val = String(val);
  len = len || 2;
  while (val.length < len) {
    val = "0" + val;
  }
  return val;
}
function checkRate(input) {
  var re = /^[0-9]+.?[0-9]*/; //判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
  if (!re.test(input)) {
    return false;
  } else {
    return true;
  }
}

export const getElementOffset = function(ele) {
  let result = {
    top: 0,
    left: 0
  };
  /*
  * nodeType 属性返回以数字值返回指定节点的节点类型。
  * 如果节点是元素节点，则 nodeType 属性将返回 1。
  * 如果节点是属性节点，则 nodeType 属性将返回 2。
  * 如果节点 node.nodeType 类型不是 Element(1)，则跳出；
  * 如果相关节点的 position 属性为 static，则不计入计算，进入下一个节点（其父节点）的递归。
  * 如果相关属性的 display 属性为 none，则应该直接返回 0 作为结果。
  */
  const getOffset = (node, init) => {
    if (node.nodeType !== 1) {
      return;
    }

    position = window.getComputedStyle(node)["position"];

    if (typeof init === "undefined" && position === "static") {
      getOffset(node.parentNode);
      return;
    }

    result.top = node.offsetTop + result.top - node.scrollTop;
    result.left = node.offsetLeft + result.left - node.scrollLeft;

    if (position === "fixed") {
      return;
    }

    getOffset(node.parentNode);
  };

  // 当前 DOM 节点的 display === 'none' 时, 直接返回 {top: 0, left: 0}
  if (window.getComputedStyle(ele)["display"] === "none") {
    return result;
  }

  let position;

  getOffset(ele, true);

  return result;
};
/**
 * [只能输入数字和两位小数]
 * 举例：<input type="text" onkeyup="num(this)" size="10"/>
 * @param obj
 * @returns
 * @data 20019-01-08
 */
export const numOnlyDT = function(value) {
  value = value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
  value = value.replace(/^\./g, ""); //验证第一个字符是数字
  value = value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
  value = value
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".");
  value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
  return value;
};

/**
 * 获取鼠标的位置
 * @param event
 * @returns {{x: (*|number), y: (*|number)}}
 */
export const getMousePos = event => {
  const e = event || window.event;
  const scrollX =
    document.documentElement.scrollLeft || document.body.scrollLeft;
  const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  const x = e.pageX || e.clientX + scrollX;
  const y = e.pageY || e.clientY + scrollY;
  return { x: x, y: y };
};

/**
 * 格式化11位数手机号
 * @param number
 * @return {string}
 */
export const filterChinaPhoneNumber = (newValue, oldValue) => {
  let telephone = newValue;
  if (newValue > oldValue) {
    if (newValue.length === 4 || newValue.length === 9) {
      let pre = newValue.substring(0, newValue.length - 1);
      let last = newValue.substr(newValue.length - 1, 1);
      telephone = pre + " " + last;
    } else {
      telephone = newValue;
    }
  } else {
    if (newValue.length === 9 || newValue.length === 4) {
      telephone = telephone.trim();
    } else {
      telephone = newValue;
    }
  }
  return telephone;
};
/**
 * 小数点分开前后两部分，用于对后半部分样式特殊处理
 * @param number
 * 143.34 => [143, 34]
 * 34 => [34, '00']
 */
export const handleDemical = (number = 0, length = 2) => {
  let res = [];
  const numArr = number.toString().split(".");
  const BeforeNum = numArr[0] ? numArr[0] : "0";
  res.push(BeforeNum);
  const AfterNum = numArr[1] ? numArr[1].slice(0, length) : "00";
  res.push(AfterNum);
  return res;
};
/**
 * 格式化数字，千分位加逗号，自动保留两位小数
 * @param number
 * @return {string}
 */
export const toThousands = (number = 0, length = 2) => {
  let result = "";
  const numArr = number.toString().split(".");
  if (numArr[0]) {
    let num = numArr[0];
    if (num.includes(",")) {
      result = num;
    } else {
      while (num.length > 3) {
        result = "," + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
      }
      if (num) {
        result = num + result;
      }
    }
  }
  if (numArr[1]) {
    result = result + "." + numArr[1].slice(0, length);
  }
  return result;
};

// 防抖
export const debounce = function(fn, delay) {
  var delay = delay || 200;
  var timer = null;
  return function() {
    var that = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      timer = null;
      fn.apply(that, args);
    }, delay);
  };
};

// 节流
export const throttle = function(fn, interval) {
  var last;
  var timer = null;
  var interval = interval || 200;
  return function() {
    var that = this;
    var args = arguments;
    var now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(that, args);
      }, interval);
    } else {
      last = now
      fn.apply(that, args)
    }
  }
}
// https://animate.style/
export const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  })
export const deepClone =(obj) =>{
  const isObject = args => (typeof args === 'object' || typeof args === 'function') && typeof args !== null
  if (!isObject) throw new Error('Not Reference Types')
  let newObj = Array.isArray(obj) ? [...obj] : { ...obj }
  Reflect.ownKeys(newObj).map(key => {
      newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })
  return newObj
}
