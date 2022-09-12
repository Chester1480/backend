const { encryptJs,nodemailerJs,momentJs } = require('../../service/share/lib/libpackage');
const fluent = require('fluent-json-schema');

module.exports = async function (fastify, options) {
    const i18n = fastify.i18n;

    //範例
    fastify.post('/samepleApi',{
        schema: {
            //使用schema驗證範例
            //body:
            //params:
            //hearders:
            //query: fluent.object().prop('mail', fluent.string().format(fluent.FORMATS.EMAIL).required()),
        }
    }, async (request, reply) => {
        return reply.send('Success')
    })

    // email發送測試用
    fastify.post('/testEmail', async (request, reply) => {
      
        //const test = await momentJs.minutes('2022-08-31 11:10:20','2022-08-31 11:20:20');

        //console.log(test);
        // momentJs
        // const data = {
        //     userInfo:{
                
        //     },
        //     expirationTime:Date.now()
        // }

        // let hashData = await encryptJs.encryptAES('data',secretKey);
        // hashData ='1111222';
        // const decryptData = await encryptJs.decryptAES(hashData,secretKey);
        // if(decryptData){
        //     console.log('decryptData: ',decryptData);
        // }

        // // const toEmail = 'chester0148@gmail.com';
        // // const subject ='這是 node.js 發送的測試信件';
        // const url = `http://localhost:3100/company/verifyCode?code=${hashData}`;
        // const html ='<h2>測試</h2>';
        // await sendMail(toEmail,subject,html);

        const parameters = {
            options:{
                from: gmailConfig.Account,
                to: toEmail, 
                subject,
                html,
                // subject: '這是 node.js 發送的測試信件',
                // html: '<h2>Why and How</h2>'
            },
            service:'Gmail',
            auth:{
                // address:              'smtp.gmail.com',
                // port:                 587,
                // domain:               'gmail.com',
                // user_name:            'YOUR_USERNAME@gmail.com',
                // password:             'YOUR_PASSWORD',
                // authentication:       'plain'
                user: gmailConfig.Account,
                pass: gmailConfig.Password,
            }
        }
        await nodemailerJs.sendMail(parameters);
        return reply.send('Success')
    })
}