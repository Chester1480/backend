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
            bulletinBoard = await getCompanyPost({ _id });
        }else{
            bulletinBoard = await getCompanyPost({});
        }
        const normals = [];
        const scrolls = [];
        const others = [];
        for(let item of BulletinBoard){
            switch(item.type){
                //0一般公告 1跑馬燈 2其他行事公告
                case 0:
                        normals.push(item);
                    break;
                case 1:
                        scrolls.push(item);
                    break;
                case 2:
                        others.push(item);
                    break;
            }
        }
        const data = {
            normals,
            scrolls,
            others,
        }

        const response = {
            message:i18n.t('Inquire') +  i18n.t('Success'),
            status:1,
            data
        }
        return reply.send(response);
    });

    const getBoardByTypeSchema = {
        body: fluent.object()
                .prop('type', fluent.number().minimum(0).maximum(2).required())
                ,
    }
    
    fastify.get('/getBoardByType',{schema:getBoardByTypeSchema}, async (request, reply) => {
        const { _id , type } = request.query;
        let scrolls;
        if(id){
            scrolls = await getCompanyPost({ _id , type});
        }else{
            scrolls = await getCompanyPost({type});
        }
        const response = {
            message:i18n.t('Inquire') +  i18n.t('Success'),
            status:1,
            data:scrolls
        }
        return reply.send(response);
    });

}