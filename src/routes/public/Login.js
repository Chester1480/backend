const fluent = require('fluent-json-schema');
const { AccountLogin } = require('../../service/srp/auth/auth');
const { language, textSetting } = require('../../model/enum/lang');

module.exports = async function (fastify, options) {
    const bodyJsonSchema = fluent.object()
        .prop('account', fluent.string().minLength(6).maxLength(30).required())
        .prop('password', fluent.string().minLength(6).maxLength(30).required());

    const schema = {
        body: bodyJsonSchema,
    }
    
    fastify.post('/AccountLogin', { schema }, async (request, reply) => {
        const response = await AccountLogin(request.body);
        reply.send(response);
    })

}