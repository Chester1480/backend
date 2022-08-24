const { mongo } = require("../../service/share/database/databasepackage");
const fluent = require('fluent-json-schema');

const collectioName ='Advertise';
module.exports = async function (fastify, options) {

    const i18n = fastify.i18n;

    const createSchema = {
        body: fluent.object()
                .prop('title', fluent.string().minLength(6).maxLength(40).required())
                .prop('url', fluent.string().minLength(6).maxLength(40).required())
                .prop('langType', fluent.string().minLength(6).maxLength(30).required())
                .prop('description', fluent.string().required())
                ,
    }

    fastify.post('/createAdvertise',{schema:createSchema}, async (request, reply) => {
        const { icon,title , url ,description , langType , payment } = request.body;
        const { } = payment;

        const data = {
            icon,
            title,
            url,
            description,
            langType,
            payment,
            hitCount:0,
            createTime: Date.now(),
        }

        const isInsertsuccess = await mongo.insert(collectioName, [data]);

    })
}