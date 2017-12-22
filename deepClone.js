/**
 * Created by gao on 22/12/2017.
 */
/** es5深度克隆写法 **/
exports.deepClone =  function (obj, newObj) {
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
exports.JsonDeepClone= function (obj) {
    if(typeof obj == 'object' || typeof obj == 'arrary' || typeof obj == 'string' || typeof obj == 'number'){
        let o = JSON.parse(JSON.stringify(obj));
        return o;
    } else {
        return `type: ${typeof obj}`;
    }
};
