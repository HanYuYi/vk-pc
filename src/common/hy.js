/**
 * 抽离参数的所有方法
 * 对crypto加密的key再次不可逆加密，手动在https://www.sojson.com/javascriptobfuscator.html站加密
 * 依赖static下的routerHelp.js，routerHelp.js是crypto-js，为了隐藏使用的是这个加密方法，修改名字，并且混淆代码
 * 加密后的文件为pc_static下的hy.js
 */

/*
 字符串解密，为了接口加密解密的key，iv的值
 如果这两个值要修改，先用下面的加密函数加密后，修改原值
*/
function sd(str)
{
  // 获取文本框中的字符串
  // 例如： 96,97,98
  // 思路：
  // 1. 按照 , 分割字符串
  // 2. 将每个 分割的子字符串 转换成 数字，再转换成 字符
  //   96 97 98
  // 3. 将还原的字符，拼接在一起，再设置到 input 中去
  var arr = str.split(",");
  // 用于拼接结果的
  var r = "";
  for (var i = 0; i < arr.length; i++)
  {
    // 获取加密后的 字符串的编码，是一个数字
    var code = parseInt(arr[i]);
    r += String.fromCharCode(code);
  }
  // 将拼接后的结果，
  return r;
}

var E_K_S = sd("102,56,57,99,49,99,49,57,54,102,101,98,57,55,51,100,99,48,48,55,50,97,50,53,97,49,49,54,57,49,98,53");
var I_V_E_K_S = sd("57,109,100,53,48,56,110,116,105,55,112,116,56,98,121,105");
var arr =  [
  sd('101,110,99,114,121,112,116'),
  sd('101,110,99'),
  sd('85,116,102,56'),
  sd('65,69,83'),
  sd('112,97,114,115,101'),
  sd('105,118'),
  sd('109,111,100,101'),
  sd('112,97,100,100,105,110,103'),
  sd('100,101,99,114,121,112,116'),//8
  sd('67,66,67'),//9
  sd('112,97,100'),//10
  sd('90,101,114,111,80,97,100,100,105,110,103'),//11
  sd('77,68,53'),//12
  sd('107,101,121'),//13
  sd('122,105,53,54,110,116,121,105,98,113,108,119,99,51,48,112,48,112,50,110,50,107,56,120,98,119,120,56,102,100,122,49,'),//14 "zi56ntyibqlwc30p0p2n2k8xbwx8fdz1"
]
// 加密
const p = str => {
  let key = routerHelp[arr[1]][arr[2]][arr[4]](E_K_S); // 秘钥
  let iv = routerHelp[arr[1]][arr[2]][arr[4]](I_V_E_K_S); //向量iv
  let encrypted = routerHelp[arr[3]][arr[0]](str, arr[14], {
    [arr[13]]:key,
    [arr[5]]: iv,
    [arr[6]]: routerHelp[arr[6]][arr[9]],
    [arr[7]]: routerHelp[arr[10]][arr[11]]
  });
  let resultDecipher = encrypted.toString();
  // 返回解密结果viewGameDetail
  return resultDecipher;
};

// 解密
const n = str => {
  // 先将 Base64 还原一下, 因为加密的时候做了一些字符的替换
  // const restoreBase64 = encrypted.replace(//-/g,'+').replace(/_/g,'/');
  // 这里 mode, padding, iv 一定要跟加密的时候完全一样
  let key = routerHelp[arr[1]][arr[2]][arr[4]](E_K_S); // 秘钥
  let iv = routerHelp[arr[1]][arr[2]][arr[4]](I_V_E_K_S); //向量iv
  // 返回的是一个解密后的对象
  let decipher = routerHelp[arr[3]][arr[8]](str, arr[14], {
    [arr[13]]:key,
    [arr[5]]: iv,
    [arr[6]]: routerHelp[arr[6]][arr[9]],
    [arr[7]]: routerHelp[arr[10]][arr[11]]
  });
  return decipher.toString(routerHelp[arr[1]][arr[2]]);
};

const getm = str => {
  return routerHelp[arr[12]](str).toString();
};

const otk = obj => {
  var newkey = Object.keys(obj).sort();
  var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) {
    //遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]];
    //向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj; //返回排好序的新对象
};
