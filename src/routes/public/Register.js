const S = require('fluent-json-schema')
const { AccountRegister , PhoneRegister , getVertifyCode} = require('../../service/srp/auth/auth');
// const { dayJs , 'ncryptJs } = require('../../service/share/lib/libpackage');

module.exports = async function (fastify, options) {

    const accountSchema = S.object()
        .prop('account', S.string().minLength(6).maxLength(30).required())
        .prop('password', S.string().minLength(6).maxLength(30).required())
        .prop('name', S.string().minLength(3).maxLength(30).required())
        .prop('email', S.string().format(S.FORMATS.EMAIL).required());
    const accountBodyJsonSchema = {
        body: accountSchema
    }

    fastify.post('/Account', {schema:accountBodyJsonSchema}, async (request, reply) => {
        const ip = request.ip;
        request.body.ip = ip;
        const response = await AccountRegister(request.body);
        reply.send(response);
    })

    const phoneSchema = S.object()
        .prop('phone', S.string().minLength(6).maxLength(10).required());
    
    fastify.post('/Phone', { schema: {body:phoneSchema} }, async (request, reply) => {
        const ip = request.ip;
        request.body.ip = request.ip;
        const response = await PhoneRegister(request.body);
        reply.send(response);
    })
    
    const codeSchema = S.object()
        .prop('code', S.string().minLength(6).maxLength(10).required());
    
    fastify.post('/getVertifyCode', { schema: {body:codeSchema} }, async (request, reply) => {
        const ip = request.ip;
        request.body.ip = request.ip;
        const response = await getVertifyCode(request.body);
        reply.send(response);
    })

   

    // fastify.post('/Email', { schema }, async (request, reply) => {
    //     const ip = request.ip;
    //     request.body.ip = request.ip;

    //     const response = await register(request.body);
    //     reply.send(response);

    // })

    // fastify.post('/Ouath2', { schema }, async (request, reply) => {
    //     const ip = request.ip;
    //     request.body.ip = request.ip;

    //     const response = await register(request.body);
    //     reply.send(response);

    // })
}

// module.exports.EmailRegister = async function (fastify, options) {
//     const bodyJsonSchema = fluent.object()
//         .prop('userEmail', fluent.string().format(fluent.FORMATS.EMAIL).required())

//     const schema = {
//         body: bodyJsonSchema,
//     }

//     fastify.post('/', { schema }, async (request, reply) => {
//         const ip = request.ip;
//         request.body.ip = request.ip;

//         const response = await register(request.body);
//         reply.send(response);

//     })
// }

// module.exports.PhoneRegister = async function (fastify, options) {
//     const bodyJsonSchema = fluent.object()
//         .prop('phoneNUmber', fluent.string().format(fluent.FORMATS.EMAIL).required())

//     const schema = {
//         body: bodyJsonSchema,
//     }

//     fastify.post('/', { schema }, async (request, reply) => {
//         const ip = request.ip;
//         request.body.ip = request.ip;

//         const response = await register(request.body);
//         reply.send(response);

//     })
// }

// module.exports.GmailOuath2Register = async function (fastify, options) {
//     const bodyJsonSchema = fluent.object()
//         .prop('phoneNUmber', fluent.string().format(fluent.FORMATS.EMAIL).required())

//     const schema = {
//         body: bodyJsonSchema,
//     }

//     fastify.post('/', { schema }, async (request, reply) => {
//         const ip = request.ip;
//         request.body.ip = request.ip;

//         const response = await register(request.body);
//         reply.send(response);

//     })
// }

// module.exports.FacebookOuath2Register = async function (fastify, options) {
//     const bodyJsonSchema = fluent.object()
//         .prop('phoneNUmber', fluent.string().format(fluent.FORMATS.EMAIL).required())

//     const schema = {
//         body: bodyJsonSchema,
//     }

//     fastify.post('/', { schema }, async (request, reply) => {
//         const ip = request.ip;
//         request.body.ip = request.ip;

//         const response = await register(request.body);
//         reply.send(response);

//     })
// }

