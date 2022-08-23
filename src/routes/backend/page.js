module.exports = async function (fastify, options) {
    fastify.get('/', async (request, reply) => {
        const { path } = request.query;
        reply.sendFile(`/${path}.html` ,{ path});      
    })
}