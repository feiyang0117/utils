/**
 * Created by gao on 22/12/2017.
 */
/** es5深度克隆写法 **/
exports.deepClone = (obj, newObj) => {
    var newObj = newObj || {};
    for(var i in obj){
        if(typeof obj[i] == 'object'){
            newObj[i] = obj[i].constructor == Arrary ? [] : {}
            this.deepClone(obj[i], newObj[i]);
        } else {
            newObj[i] = obj[i]
        }
    }
    return newObj;
};

/** JSON深度克隆 **/
exports.JsonDeepClone= (obj) => {
    if(typeof obj == 'object' || typeof obj == 'arrary' || typeof obj == 'string' || typeof obj == 'number'){
        let o = JSON.parse(JSON.stringify(obj));
        return o;
    } else {
        return `type: ${typeof obj}`;
    }
};

/** 关于数组随机排序 **/
exports.arrRandom = (arr, callback) => {
    if(arr.constructor !== Array) return;
    this.fn = (...a) => {
        return Math.random() > 0.5 ? -1 : 1;
    };
    let newArr  = arr.sort(this.fn);
    callback(newArr);
};
