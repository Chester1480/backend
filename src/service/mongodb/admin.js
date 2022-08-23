const { mongo } = require('../share/database/databasepackage');

exports.getAdmins = async () => {
    return await mongo.findByStream("admin");
}

exports.getAdminsByAccount = async (account) => {
    return await mongo.findOne("admin", {account});
}

exports.getAdminById = async (adminId) => {
    return await mongo.findOne("admin",adminId);
}

exports.addAdminData = async (adminData) => {
    return await mongo.insert("admin",[adminData]);
}