const NodeCache = require("node-cache");
const nodeCache = new NodeCache();

// https://www.npmjs.com/package/node-cache

exports.set = function (key,data,ttl = 0 ) {
    var success = nodeCache.set(key, data, ttl);
    return success;
}

exports.get = async function (key) {
    var value = nodeCache.get(key);
    if (value == undefined)return null;
    return value;
}

exports.changettl = async function (key,ttl) {
    var success = nodeCache.ttl(key, ttl);
}

exports.getKeys = async function () {
    return nodeCache.keys();
}

exports.has = async function (key) {
    return nodeCache.has(key);
}

exports.mset = async function (data) {
    // [
    //     {key: "myKey", val: obj, ttl: 10000},
    //     {key: "myKey2", val: obj2},
    // ]
    return myCache.mset(data)
}

exports.mget = async function (keys) {
    //keys =['A','B']
    return myCache.mget(keys);
}

exports.del = async function (keys) {
    return myCache.del(keys);
}