const fluent = require('fluent-json-schema');
const mongo = require('../../service/share/database/mongo');
const { jwtverify } = require('../../service/srp/auth/auth');
const collectioName = 'admin';

module.exports = async function (fastify, options) { 
    // const getSchema = {
    //     query: fluent.object().prop('id', fluent.string().minLength(30).maxLength(40).required()),
    // }
    fastify.get('/getAdminInfoById', async (request, reply) => {
        const token = request.headers.authentication;
        const adminInfo = await jwtverify(token);
        const result = await mongo.findOne(collectioName, { _id: adminInfo.userData.id });
        return result;
    })
}
    