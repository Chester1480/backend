const jwt = require('jsonwebtoken');
const config = require('config');
const secret = "theSSSSS";
const { encryptJs } = require('../../share/lib/libpackage');
const { response } = require('../../../model/shareModel');
const user = require('../../mongodb/user');

//#region  document
//https://www.npmjs.com/package/jsonwebtoken
//#endregion

exports.exportJwtsignfy = async function (userData) {
    const token = jwt.sign({ userData }, secret);
    return token;
}

const jwtsign = async function (userData) {
    const token = jwt.sign({ userData }, secret);
    return token;
}

exports.jwtverify = async function (token) {
    try {
        const userData = await jwt.verify(token, secret);
        return userData;
    } catch (error) { //格式不符合 會直接報錯
        return false;
    }
}

exports.AccountRegister = async function (userData) {

    const { account, name, password, email, phone, birthday, ip } = userData;
    
   
    //查詢帳號是否已存在
    const existAccount = await user.findOneByAccount(account);
    if (existAccount.account === account) {
        response.message = "register fail , account is exist";
        response.statusCode = "500";
        return  response;
    }
   
    //加密
    const hashPassword = await encryptJs.bcryptHash(password);

    user.model = {
        account,
        name,
        password:hashPassword,
        email,
        phone,
        language: 'us',
        birthday,
        lastLoginIp: '',
        registerTime: Date.now(),
        active: 1, // 1啟用 0禁用
        ip:ip,
    }

    const result = await user.insert([ user.model ]);
    if(result.insertedCount == 1){
        response.message = "註冊成功";
        response.statusCode = "200";
        //const token = await jwtsign(result);
        //response.result = token;
        return response;
    }else{
        response.message = "註冊失敗";
        response.statusCode = "500";
        // const token = await jwtsign(result);
        //response.result = token;
        return response;
    }
  
}

exports.AccountLogin = async function (userData) {
    const { account, password } = userData;
    const existAccount = await user.findOneByAccount(account);

    if (!existAccount) { //帳號不存在
        response.message = "account is not exist";
        response.statusCode = "500";
        return response;
    }
    
    const isMatch = await encryptJs.bcrypCompareSync(password, existAccount.password);
    if (!isMatch) { //密碼不正確
        response.message = "password is not currect";
        response.statusCode = "500";
        return response;
    }
    const token = await jwtsign(existAccount);
    response.message = "登入成功";
    response.statusCode = "200";
    response.result = token;

    return response;
}

exports.getVertifyCode = async function (userData) {

    const { phone } = userData;
    const exist = await mongo.findOne('user', { phone });
    if (!exist) { //帳號不存在
        response.message = "account is not exist";
        response.statusCode = httpEnum.status.ok;
        return response;
    }
    //發簡訊
}

exports.PhoneRegister = async function (userData) { 

    const { phone } = userData;
    //查詢帳號是否已存在
    const exist = await mongo.findOne('user', { phone });
    if (existAccount.phone === phone) {
        response.message = "register fail , phone register is exist";
        response.statusCode = "500";
        return  response;
    }

}

exports.Phonelogin = async function (phoneNumber) {

    const exist = await mongo.findOne('user', { phoneNumber });
    if (!exist) { //帳號不存在
        response.message = "account is not exist";
        response.statusCode = httpEnum.status.ok;
        return response;
    }
    //發簡訊

}

exports.ouath2Login = async function (token) {
    
}

// async function checkAccount(account) {
//     //查詢帳號是否已存在
//     return await user.findOne('user', { account });
// }

exports.forgotpassword = async function (data) {
    const { email , phone  } = data;
}

exports.kick = async function (userId) {
    
}

exports.logout = async function (token) {
    
}