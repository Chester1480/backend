const fluent = require('fluent-json-schema');
const mongo = require('../../service/share/database/mongo');
const collectioName = 'user';

module.exports = async function (fastify, options) {
    
    const getUsersSchema = {
        query: fluent.object()
        .prop('pageIndex', fluent.number().required())
        .prop('pageSize', fluent.number().required())
    }

    fastify.get('/getUsers',{ schema:getUsersSchema } , async (request, reply) => {
        const { pageIndex, pageSize } = request.query;
        const parameter = {
           
        }
        const page = {
            pageIndex, pageSize
        }
        const sortObject = {
            
        }
        const result = await mongo.finByPagination(collectioName, parameter,page,sortObject);
        return result;
    })

    const getUserByIdSchema = {
        query:  fluent.object().prop('id', fluent.string().required()),
    }

    fastify.get('/getUserById',{ schema:getUserByIdSchema }, async (request, reply) => {
        const { id } = request.body
        const result = await mongo.findOne(collectioName, { _id:id } );
        return result;
    })

}