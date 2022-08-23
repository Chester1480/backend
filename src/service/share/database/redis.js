const redis = require("redis");
const ioredis = require("ioredis");
const commands = require('redis-commands');
const util = require('util');
const config = require('config');
const environment = config.environment + ":";

//#region 資料使用情境 
//一般資料 set 複雜度o(1) 但是占用記憶體比較多
//hase資料 hset 複雜度o(n) 但是占用記憶體較少

// const zlib = require('zlib');
//#region redis 五種數據結構 string，hash，list，set，zset
// key
// ├─ string
//     ├─ raw 小於44個字節的字符串(目前)，3.0以前的版本為39
//     ├─ int 8個字節的長整型
//     ├─ int 大於39個字節小於512MB的字符串

// ├─ hash
//     ├─ hashtable  當filed的個數大於512，或者value大於64字節時，內部編碼為hashtable
//     ├─ ziplist 當filed的個數少於512，且沒有value大於64字節時，內部編碼為ziplist

// ├─ list
//     ├─ linkedlist
//     ├─ ziplist

// ├─ set
//     ├─ hashtable
//     ├─ inset

// ├─ zset
//     ├─ skiplist
//     ├─ ziplist
//#endregion
// 第一种类型：String Key-Value
// 第二种类型：Hash：key-filed-value
// 第三种类型：List
// 　　List 有顺序可重复
// 　　lpush list 1  2  3  4 从左添加元素　
//     　rpush list 1 2 3 4    从右添加元素
//     　lrange list 0 -1 (从 0 到 - 1 元素查看：也就表示查看所有)
//     　lpop list （从左边取，删除）
//     　rpop list  (从右边取，删除)
// 第四种类型 ：Set
// 　　Set 无顺序，不能重复
// 第五种类型：SortedSet（zset）
// 　　有顺序，不能重复
// 　　适合做排行榜 排序需要一个分数属性

//process.env


//#document : https://www.npmjs.com/package/redis

// const { promisify } = require("util");
// const getAsync = promisify(client.get).bind(client);

//key xxx:SS:0001
// exports.config = {
//     key: null,
//     ttl: null,
//     data: null
// }
//#endregion

function connect(){
    const client = redis.createClient({
        host: config.get('redis').host,
        port: config.get('redis').port,
        password: config.get('redis').password
    });
    return client;
}

// key 分類設定 環境:關鍵字:id

/**
 * scan 不阻塞的方式 同一個前墜字底下所有的key  ex:dev:apiTest
 * @param {前墜} prefix 
 * @returns 
 */
exports.scan = async function (prefix) {
    const fullKey = environment + key + ":*"
    const scan = util.promisify(connect().scan).bind(client);
    const keys = await scan(0, 'MATCH', fullKey);
    if (keys[0].length === 0) {
        return null;
    }
    return keys[1];
}
/**
 * 
 * @param {包含前墜和關鍵字全部加起來的} key 
 * @param {設定過期的秒數} second 
 * @returns 
 */
exports.expire = async function (key, second) {
    return connect().expire(environment + key, second);
}

exports.exists = async function (key) {
    const isExist = await commands.exists(environment + key);
    return isExist;
}

/**
 * @param {包含前墜和關鍵字全部加起來的 key} key 
 * @returns  json 格式 字串
 */
exports.get = async function (key) {
    const get = util.promisify(connect().get);
    const result = await get(environment + key);
    return result;
}
/**
 * 
 * @param {包含前墜和關鍵字全部加起來的 key} key 
 * @param {查詢 hashdata內的 key } string 
 * @returns 回傳 hashdata 內的 value
 */
exports.hget = async function (key, string) {
    return new Promise((resolve, reject) => {
        connect().hget(environment + key, string, function (err, obj) {
            resolve(obj);
        });
    });
}
/**
 * 
 * @param {包含前墜和關鍵字全部加起來的 key} key 
 * @returns 回傳 hashdata 內 所有資料
 */
exports.hgetall = async function (key) {
    const hgetall = util.promisify(connect().hgetall).bind(connect());
    const result = await hgetall(environment + key);
    return result;
}
/**
 * 
 * @param {包含前墜和關鍵字全部加起來的 key} key 
 * @returns 取得 hashdata 裡面所有的key值
 */
exports.hkeys = async function (key) {
    return new Promise((resolve, reject) => {
        connect().hkeys(key, function (err, replies) {
            if (err) {
                return console.error("error response - " + err);
            }
            // console.log(replies.length + " replies:");
            // replies.forEach(function (reply, i) {
            //     console.log("    " + i + ": " + reply);
            // });
            resolve(replies);
        });
    });
}

/**
 * 儲存的資料是字串
 * @param {主key ex:12456} key 
 * @param {內容} string 
 * @param {過期時間 預設空的為永久} ttl 
*/
exports.set = async function (key, data, second) {
    const ut8String = new Buffer.from(JSON.stringify(data), 'utf8')
    const isSet = await client.set(environment + key, ut8String);
    if (second > 0) {
        await isSet.expire(environment + key, second);
    }
    return isSet;
}

/**
 * 儲存的資料是 hashdata , 如果 值有改變則會改變直接改變值
 * @param {redisKey} key 
 * @param {資料內的key} dataKey 
 * @param {要放的資料} data 
 * @param {設定過期時間 如果設定0或-1 則是永久} second 
 * @returns 0 || 1 : 0代表資料無異動 1為已新增或已修改
 */
exports.hset = async function (key, dataKey, data, second) {
    const setAsync = util.promisify(connect().hset).bind(connect());
    if (second > 0) {
        await setAsync.expire(key, second);
    }
    const result = await setAsync(environment + key, dataKey, JSON.stringify(data));
    return result;
}

exports.hmset = async function (key, data, second) {
    // 等同於 js 的 push
    const hmsetAsync = util.promisify(connect().hmset).bind(connect());
    const isSet = await hmsetAsync(environment + key, data);

    // hmset("hash key 3", {
    //     "012345": "abcdefghij", // NOTE: key and value will be coerced to strings
    //     "field5": "5"
    // });

    if (second > 0) {
        await isSet.expire(environment + key, second);
    }
    return isSet;
}

exports.incr = async function (key, data, ttl) {
    // client.hgetall
}
exports.decr = async function (key, data, ttl) {
    // client.hgetall
}

exports.smembers = async function (key) {
}


exports.subscriber = async function (channel, string) {
    return new Promise((resolve, reject) => {
        connect().on(string, function (channel, message) {

        });
    });

}

exports.publisher = async function (channel, message) {
    return new Promise((resolve, reject) => {
        connect().publish(key, function (err, replies) {
            if (err) {
                return console.error("error response - " + err);
            }
            resolve(replies);
        });
        connect().subscribe('notification');
    });
}









