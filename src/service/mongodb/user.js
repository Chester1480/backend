const { mongo } = require('../share/database/databasepackage');

const user = {
    _id: null,
    account:null,//email
    password:null,
    name:null,
    type:1,//"ADMIN":0, "VENDOR":1, "USER":2}
    status: 0,//0 1 -1
    phoneNumber:null,
    modifyTime: null,
    loginErrorCount:null,//登入錯誤次數
    loginErrorTime:null,
    lastLoginIp: null,
    lastLoginTime:null,
    registerIp:null,
    registerTime:null,
}

//取得所有使用者
exports.getUsers = async () => {
    return await mongo.findByStream("user");
}

exports.getUserById = async (userId) => {
    return await mongo.find("user", { _id:userId });
}

exports.addUser = async (userData) => {
    return await mongo.insert("user", [userData]);
}

exports.updateUser = async (userData) => {
    return await mongo.update("user", userData);
}
