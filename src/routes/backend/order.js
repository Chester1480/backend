const orderService = require('../../service/mongodb/order');

module.exports = async function (fastify, options) {

    const addJson = fluent.object()
        .prop('products', fluent.string().minLength(6).maxLength(30).required());
    
    const addschema = {
        body: addJson,
    }

    fastify.post('/addOrder', { addschema }, async (request, reply) => {

        // const { userId } = token;

        const { products } = request.body;
        
        const order = {
            _id,
            userId,//下單者
            products,
            isCancel:0,
            isPay:0,
            orderTime:Date.now(),
        }

        const result = await orderService.addOrder(order);
       
    })


    fastify.get('/getOrders', async (request, reply) => {
       
    })

    fastify.get('/getOrderById', async (request, reply) => {
       
    })

    
    fastify.post('/cancelOrderById', async (request, reply) => {
       
    })

}