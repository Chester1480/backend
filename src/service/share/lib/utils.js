const _ = require('lodash');
const fp = require('lodash/fp');

const array = require('lodash/array');
const object = require('lodash/fp/object');

const { v4 } = require('uuid');


// docnument : https://lodash.com/docs/ 有中文

exports.getUuidv4 = async () => {
    return v4();
};


/**
 * 深複製物件
 * @param { 要複製的物件 }} data 
 */
exports.cloneDeep = async function (obj) {
    return _.cloneDeep(obj);
}

//#region 檢查
//#endregion
/**
 * 比對物件內是否有key ture or false
 * @param {比對的物件 } obj 
 * @param {比對的值} diffValue 
 */
exports.has = async function (obj, diffValue) {
    return _.has(obj, diffValue);
}

/**
 * 比對物件是否相同 (深比較) true or false
 * @param {比對的資料} data 
 * @param {要比對的資料} diffData 
 */
exports.isEqual = async function (data, diffData) {
    return _.isEqual(data, diffData);
}


/**
 * 檢查是否陣列 ture or false
 * @param {要檢查的物件} obj 
 */
exports.isArray = async function (obj) {
    return _.isArray(obj);
}

/**
 * 檢查是否為空 ture or false
 * @param {要檢查的值} value 
 */
exports.isEmpty = async function (value) {
    // _.isEmpty(null);
    // // => true

    // _.isEmpty(true);
    // // => true

    // _.isEmpty(1);
    // // => true
    return _.isEmpty(value);
}

/**
 * 檢查是否為日期格式 ture or false
 * @param {要檢查的值} value 
 */
exports.isDate = async function (value) {
    return _.isDate(value);
}

/**
 * 檢查是否為數字 ture or false
 * @param {要檢查的值} value 
 */
exports.isNumber = async function (value) {
    return _.isNumber(value);
}


//#region 
//#endregion
//相加 
exports.add = async function (number1, number2) {
    return _.add(number1, number2);
}

//相減 number1 - number2
exports.subtract = async function (number1, number2) {
    return _.subtract(number1, number2);
}

//相除 number1 / number2
exports.divide = async function (number1, number2) {
    return _.divide(number1, number2);
}

//相乘 number1 * number2
exports.multiply = async function (number1, number2) {
    return _.multiply(number1, number2);
}

/**
 * //取小數點位數 
 * @param {數字} number 
 * @param {位數} precision 
 */
exports.ceil = async function (number, precision) {
    return _.ceil(number, precision);
}

/**
 * //取小數點位數 四捨五入
 * @param {數字} number 
 * @param {位數} precision 
 */
exports.round = async function (number, precision) {
    return _.round(number, precision);
}

/**
 * 取出陣列內最大的值
 * @param {陣列} array 
 */
exports.max = async function (array) {
    if (array.length === 0) {
        return undefined;
    }
    return _.max(array);
}
/**
 * 取出陣列內最小的值
 * @param {陣列} array 
 */
exports.min = async function (array) {
    if (array.length === 0) {
        return undefined;
    }
    return _.min(array);
}

/**
 * 計算陣列內的平均值
 * @param {要平均的陣列} array 
 */
exports.mean = async function (array) {
    if (array.length === 0) {
        return 0;
    }
    return _.mean(array);
}

/**
 * 計算陣列內的合值
 * @param {陣列} array 
 */
exports.sum = async function (array) {
    if (array.length === 0) {
        return 0;
    }
    return _.sum(array);
}

//限制值的大小區間 max~min
exports.clamp = async function (max, min, number) {
    return _.clamp(max, min, number);
}

//產生隨機的數字 max~min
exports.random = async function (max, min) {
    return _.random(max, min);
}

// 
// exports = async function (data, key) {
//     var youngest = _
//         .chain(users)
//         .sortBy('age')
//         .map(function (o) {
//             return o.user + ' is ' + o.age;
//         })
//         .head()
//         .value();
// }

//將英文字串轉大寫
exports.capitalize = async function (string) {
    return _.capitalize(string);
}
//將英文字串轉小寫
exports.lowerCase = async function (string) {
    return _.lowerCase(string);
}
//將英文字串轉大寫
exports.upperCase = async function (string) {
    return _.upperCase(string);
}

//轉成int
exports.parseInt = async function (string) {
    return _.parseInt(string);
}
//去除前後空白
exports.trim = async function (string) {
    return _.trim(string);
}






