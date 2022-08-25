const { mongo } = require("../../service/share/database/databasepackage");
const { encryptJs } = require('../../service/share/lib/libpackage');
const fluent = require('fluent-json-schema');

const collectioName ='BulletinBoard';

module.exports = async function (fastify, options) {
    const i18n = fastify.i18n;

    fastify.get('/getBoard', async (request, reply) => {
        const { _id } = request.query;
        let bulletinBoard = {};
        if(id){
            BulletinBoard = await getCompanyPost({ _id });
        }else{
            BulletinBoard = await getCompanyPost({});
        }

        const response = {
            message:i18n.t('Inquire') +  i18n.t('Success'),
            status:1,
            data:BulletinBoard
        }
        return reply.send(response);
    });

    fastify.get('/getScroll', async (request, reply) => {

    });

}