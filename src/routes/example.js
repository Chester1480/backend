
const fluent = require('fluent-schema')
const os = require('../../service/share/os');
const mongo = require('../../service/share/mongo');
const jwtvertify = require('../../middleware/jwtvertify');

//#region Schema sample
// const bodyJsonSchema = {
//     type: 'object',
//     required: ['requiredKey'],
//     properties: {
//       someKey: { type: 'string' },
//       someOtherKey: { type: 'number' },
//       requiredKey: {
//         type: 'array',
//         maxItems: 3,
//         items: { type: 'integer' }
//       },
//       nullableKey: { type: ['number', 'null'] }, // or { type: 'number', nullable: true }
//       multipleTypesKey: { type: ['boolean', 'number'] },
//       multipleRestrictedTypesKey: {
//         oneOf: [
//           { type: 'string', maxLength: 5 },
//           { type: 'number', minimum: 10 }
//         ]
//       },
//       enumKey: {
//         type: 'string',
//         enum: ['John', 'Foo']
//       },
//       notTypeKey: {
//         not: { type: 'array' }
//       }
//     }
//   }

// const queryStringJsonSchema = {
//     type: 'object',
//     properties: {
//       name: { type: 'string' },
//       excitement: { type: 'integer' }
//     }
//   }

//   const paramsJsonSchema = {
//     type: 'object',
//     properties: {
//       par1: { type: 'string' },
//       par2: { type: 'number' }
//     }
//   }

//   const headersJsonSchema = {
//     type: 'object',
//     properties: {
//       'x-foo': { type: 'string' }
//     },
//     required: ['x-foo']
//   }
//#endregion

module.exports = async function (fastify, options) {
    const bodyJsonSchema = fluent.object()
        .prop('name', fluent.number())
        .prop('age', fluent.number());
    // .prop('requiredKey', fluent.array().maxItems(3).items(fluent.integer()).required())
    // .prop('nullableKey', fluent.mixed([S.TYPES.NUMBER, fluent.TYPES.NULL]))
    // .prop('multipleTypesKey', fluent.mixed([S.TYPES.BOOLEAN, fluent.TYPES.NUMBER]))
    // .prop('multipleRestrictedTypesKey', fluent.oneOf([fluent.string().maxLength(5), fluent.number().minimum(10)]))
    // .prop('enumKey', fluent.enum(Object.values(MY_KEYS)))
    // .prop('notTypeKey', fluent.not(fluent.array()))

    // const queryStringJsonSchema = S.object()
    //     .prop('name', S.string())
    //     .prop('excitement', S.integer())

    // const paramsJsonSchema = S.object()
    //     .prop('par1', S.string())
    //     .prop('par2', S.integer())

    // const headersJsonSchema = S.object()
    //     .prop('x-foo', S.string().required())
    const schema = {
        body: bodyJsonSchema,
        // querystring: queryStringJsonSchema, // (or) query: queryStringJsonSchema
        // params: paramsJsonSchema,
        // headers: headersJsonSchema
    }
    fastify.get('/', async (request, reply) => {

        // console.log(request.params);
        // const cpus = await os.getCpus();
        // const com = await linecommond.getLunchList();
        // await linebot.Notify('測試測試', '');
        // const result = await systemcache.setSystemConfig('');
        // const result = await mariadb.select('Broadcast', '');
        // const result = await redis.scan('system');
        // const result = await redis.hget('system:thetest');
        // const test = {
        //     A: 41,
        //     B: 442,
        // }
        // const data = [5, 'testest'];
        // const result = await redis.hmset('system:777', data, 0);

        const collection = 'TestCollection';
        const data = [{
            name: 'teste',
            detail: [{
                id: 1,
                value: 2
            }, {
                id: 2,
                value: 3
            }]

        }];
        const filter = {
            name: 'teste'
        };
        // const result = await mongo.insert(collection, data);
        const result = await mongo.find(collection, filter, '');
        // const result = 1;
        reply.send({ hello: result })
    })

    fastify.post('/', { schema }, async (request, reply) => {
        // console.log(request.body);
        // linebot.Notify('測試測試', '');


        const cpus = await os.getCpus();
        reply.send({ hello: cpus })
    })
}

