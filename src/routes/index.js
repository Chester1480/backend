
/**
 * 測試網站是否正常用
 * @param {*} fastify 
 * @param {*} options 
 */
module.exports = async function (fastify, options) {
    fastify.get('/', async (request, reply) => {
        reply.send('OK');
    })
}