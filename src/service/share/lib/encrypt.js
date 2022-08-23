
const bcrypt = require('bcryptjs');
const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");
const bcryptjs = require("crypto-js");
const md5 = require('md5');

//md5
exports.md5Hash = async function (source) {
    return md5(source);
}

//bcrypt
exports.bcryptHash = async function (source) {
    return bcrypt.hashSync(source, 10);
}
exports.bcrypCompareSync = async function (source, hashData) {
    return bcrypt.compareSync(source, hashData);
}

//AES
exports.encryptAES = async function (data,secretKey) {
    const ciphertext = await crypto.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return ciphertext;
};
exports.decryptAES = async function (hashData, secretKey) {
    const bytes  = crypto.AES.decrypt(hashData, secretKey);
    return await bytes.toString(crypto.enc.Utf8);
};