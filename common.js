/**
 * Created by gao on 22/12/2017.
 */
/** es5深度克隆写法 **/
exports.deepClone = (obj, newObj) => {
  var newObj = newObj || {};
  for (var i in obj) {
    if (typeof obj[i] == 'object') {
      newObj[i] = obj[i].constructor == Arrary ? [] : {};
      this.deepClone(obj[i], newObj[i]);
    } else {
      newObj[i] = obj[i];
    }
  }
  return newObj;
};

/** JSON深度克隆 **/
exports.JsonDeepClone = obj => {
  if (
    typeof obj == 'object' ||
    typeof obj == 'arrary' ||
    typeof obj == 'string' ||
    typeof obj == 'number'
  ) {
    let o = JSON.parse(JSON.stringify(obj));
    return o;
  } else {
    return `type: ${typeof obj}`;
  }
};

/** create 兼容处理 **/
exports.create = obj => {
  if (Object.create) {
    return Object.create(obj);
  } else {
    function Foo() {}
    Foo.prototype = obj;
    return new Foo();
  }
};

/** 关于数组随机排序 **/
/** eg: arrRound(arr,fn)**/
exports.arrRound = (arr, callback) => {
  if (arr.constructor !== Array) return;
  this.fn = (...a) => {
    return Math.random() > 0.5 ? 1 : -1;
  };
  let newArr = arr.sort(this.fn);
  callback(newArr);
};

/** 其它函数封装并引用 promise **/
/** eg:getUrl(url, data).then().catch();**/
exports.getUrl = (url, data) => {
  return Promise((resolve, reject) => {
    let XHR = new XMLHttpRequest();
    XHR.open(data.type || 'get', url);
    XHR.onreadystatechange = rs => {
      if (rs.readyState == 4) return;
      if (rs.readyState == 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    XHR.responseType = data.responseType || 'json';
    XHR.setRequestHeader('Accept', 'application/json');
    XHR.send();
  });
};

/** Object.is   es5
+0 === -0 //true 对比  Object.is(+0, -0) // false
NaN === NaN // false 对比  Object.is(NaN, NaN) // true
 **/
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    // 针对es5 +0 === -0
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    }
    /** 针对 NaN **/
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});

// 删除数组中的某一项
exports.remove = (arr, item) => {
  if (arr.length > 0) {
    let index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
};

// 检查对象中是否拥有某项属性
exports.hasOwn = (obj, key) => {
  let hasOwnProperty = Object.prototype.hasOwnProperty;
  return hasOwnProperty.call(obj, key);
};

// bind写法
Function.prototype.bind = function(obj) {
  var me = this,
    temp = function() {
      return me.apply(obj, arguments);
    };
  return temp;
};

// Object属性合并
exports.extend = function(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
};

// 不同的数组对象进行 merge
exports.toObject = function(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    this.extend(res, arr[i]);
  }
  return res;
};

//金钱格式化
exports.toFormatMoney = function(arg) {
  if (typeof arg != 'number') return;
  let arg1,
    arg2,
    newArr = [],
    counter = 0,
    result = '';

  if (/^\d+(\.\d+)$/.test(arg)) {
    arg = arg.toString();
    arg1 = arg.split('.')[0];
    arg2 = arg.split('.')[1];
  } else {
    arg1 = arg;
  }

  for (let i = arg1.length - 1; i >= 0; i--) {
    counter++;
    result = arg1.charAt(i) + result;
    if (!(counter % 3) && i != 0) {
      result = ',' + result;
    }
  }
  return result + '.' + arg2;
};

//金钱格式化
exports.format = function(num) {
  num = num + ''; //数字转字符串
  var str = ''; //字符串累加
  for (var i = num.length - 1, j = 1; i >= 0; i--, j++) {
    if (j % 3 == 0 && i != 0) {
      //每隔三位加逗号，过滤正好在第一个数字的情况
      str += num[i] + ','; //加千分位逗号
      continue;
    }
    str += num[i]; //倒着累加数字
  }
  return str
    .split('')
    .reverse()
    .join(''); //字符串=>数组=>反转=>字符串
};
