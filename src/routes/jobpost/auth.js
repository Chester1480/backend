module.exports = async function (fastify, options) {

    fastify.post('/genToken', async (request, reply) => {
        console.log(fastify);
        const {} = request.body;
        reply.send("sssss");
    })

}