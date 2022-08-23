const _productService = require('../../service/mongodb/product');

module.exports = async function (fastify, options) {

    const add = fluent.object()
        .prop('icon', fluent.string().minLength(6).maxLength(30).required())
        .prop('name', fluent.string().minLength(6).maxLength(30).required())
        .prop('discount', fluent.string().minLength(6).maxLength(30).required())
        .prop('price', fluent.string().minLength(6).maxLength(30).required())
        .prop('type', fluent.string().minLength(6).maxLength(30).required())
        .prop('name', fluent.string().minLength(6).maxLength(30).required())
    
    const addschema = {
        body: add,
    }

    fastify.post('/addProduct', { addschema }, async (request, reply) => {
        //const { userId } = token;
        const product = {
            icon,
            name,
            discount:0,// 10 = 10%
            price,
            type,
            updateTime:null,
            creatTime: Date.now(),
            creatUser: {
                userId,
                userName
            },
        }

        const result = await _productService.addProduct(product);
        let message = "";
        let code = 0;
        if (request) {
            
        }else{

        }

        const response = {
            message,
            code
        }
        return response;
    })

    fastify.get('/getProduct', async (request, reply) => {
        const result = await _productService.getProducts();
        reply.send(result);
    })

    fastify.post('/updateProduct', async (request, reply) => {
        const payload = request.body;
        const result = await _productService.updateProducts(payload);
        reply.send(result);
    })
}