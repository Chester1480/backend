const { jwtverify } = require('../../service/srp/auth/auth');

module.exports = async function (fastify, options) {
    fastify.get('/', async (request, reply) => {
        reply.sendFile("/templates/index.html" ,{ text: "text" });
    })

    fastify.get('/auth', async (request, reply) => {
        const token = request.headers.authentication;
        const userData = await jwtverify(token);
        if(userData){
            reply.send( { isValid:true } );
        }else{
            reply.send( { isValid:false } );
        }
    })

}