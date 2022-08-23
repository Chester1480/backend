//conllection
//建立新的 ObjectId | newObjectId = ObjectId()
//提供一個 12 位元組的 ID： myObjectId = ObjectId("5349b4ddd2781d08c09890f4")

//文件的建立時間戳記
//ObjectId("5349b4ddd2781d08c09890f4").getTimestamp()
//這將傳回此文件的 ISO 日期格式的建立時間
//ISODate("2019-09-12T30:39:17Z")

const USERTYPSEnum = Object.freeze({"ADMIN":0, "VENDOR":1, "USER":2})

exports.user = {
    _id: null,
    account:null,//email
    password:null,
    name:null,
    type:USERTYPSEnum.VENDOR,
    status: 0,//0 1 -1
    phoneNumber:null,
    modifyTime: null,
    loginErrorCount:null,//登入錯誤次數
    loginErrorTime:null,
    lastLoginIp:null,
    registerIp:null,
    registerTime:null,
}

const LOGINTYPSEnum = Object.freeze({"LINE":0, "GOOGLE":2})
exports.ouath2 = {
    _id:null,
    type:LOGINTYPSEnum.LINE,
    data:{

    }
}

//系統設定
exports.sytemconfig = {
    _id:null,
    name:null,
    description:null,
    parameters:{},
    modifyTime:null,
}

//版面 Tab 頁籤 | List 項目
const MENUTYPE = Object.freeze({"TAB":0, "LIST":1})
exports.menu = {
    _id:null,
    name:null,
    type:MENUTYPE.TAB,
    icon:null,
    modifyTime:null,
    sort:0
}

//廣告
exports.ads = {
    _id:null,
    name:null,
    type:null,
    icon:null,
    modifyTime:null,
}