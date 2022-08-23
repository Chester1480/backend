const fluent = require('fluent-json-schema');
const linebot = require('../../service/srp/api/line/linebot');

module.exports = async function async(fastify, options) {
    const bodyJsonSchema = fluent.object()
        .prop('name', fluent.number())
        .prop('age', fluent.number());
    const schema = {
        body: bodyJsonSchema,
    }
    //#region  資料格式
    // [
    //     {
    //       type: 'message',
    //       replyToken: 'cff56dcabd584762850802e3eaf29ffe',
    //       source: { userId: 'U1b9aed4e36342720abf72e872213de88', type: 'user' },
    //       timestamp: 1616245126450,
    //       mode: 'active',
    //       message: { type: 'text', id: '13751286595746', text: 'test' }
    //     }
    //   ]
    //   [
    //     {
    //       type: 'message',
    //       replyToken: '73655a7a5b1340b2b98c6ffea267d7a1',
    //       source: {
    //         groupId: 'C63a74566bf634d03237d5e258dbafafa',
    //         userId: 'U1b9aed4e36342720abf72e872213de88',
    //         type: 'group'
    //       },
    //       timestamp: 1616245139347,
    //       mode: 'active',
    //       message: { type: 'text', id: '13751287713689', text: 'test' }
    //     }
    //   ]
    //#endregion
    fastify.post('/', { schema }, async (request, reply) => {
        console.log(request.body.events);
        // request.body.destination : Uea683105426f664e01512df6271e3d85
        await linebot.messageGateWay(request);
    })
};
