const fluent = require('fluent-json-schema');
const { jwtverify , exportJwtsignfy } = require('../../service/srp/auth/auth');
const { mongo } = require("../../service/share/database/databasepackage");
const { encryptJs,nodemailerJs,momentJs } = require('../../service/share/lib/libpackage');

module.exports = async function (fastify, options) {
    const i18n = fastify.i18n;

    fastify.post('/genToken', async (request, reply) => {
        console.log(fastify);
        const {} = request.body;
        reply.send("sssss");
    })

    fastify.post('/registerCompany',{
        schema:{
            body: fluent.object().prop('companyName', fluent.string().minLength(6).maxLength(40).required())
                                .prop('password', fluent.string().minLength(6).maxLength(30).required())
                                .prop('confirmPassword', fluent.string().minLength(6).maxLength(30).required())
                                .prop('companyDescription', fluent.string().required())
                                .prop('mail', fluent.string().format(fluent.FORMATS.EMAIL).required()),
        }
    }, async (request, reply) => {
        const { companyName,mail,password ,confirmPassword,icon,companyDescription,link } = request.body;
        const ip  = request.ip;

        if(password !== confirmPassword){ //密碼不一致
            const response = {
                message:i18n.t('PasswordIsNotSame') ,
                status:false,
                data:{}
            }
            return reply.send(response);
        }

        const companyInfo = await mongo.findOne(collectionName, {mail});
        if(companyInfo){ //帳號已存在
            const response = {
                message:i18n.t('Account') +  i18n.t('Exist') ,
                status:false,
                data:{}
            }
            return reply.send(response);
        }
        const hashPassword = await encryptJs.bcryptHash(password);

        if(!icon){
            // icon = default pic
            icon = null;
        }

        const data = {
            icon,//創建時設定default
            companyPhoto:[],//公司環境照片
            companyPruductPhoto:[],//公司產品照片
            payOutTime:null,
            companyName,
            mail,
            password:hashPassword,
            companyDescription,
            status:1,
            isValid:false,
            ip,
            link,
            createTime:momentJs.getNowTime()
        }

        const isInsertsuccess = await mongo.insert(collectionName, [data]);

        const parameters = {
            data,
            expiredTime:momentJs.getNowTime()
        }
        const secretKey = "123";
        const hashData = await encryptJs.encryptAES(parameters,secretKey);
        const url = `http://localhost:3100/auth/verifyCode?code=${hashData}`;
        await sendMail(mail,'驗證帳號信件',url);

        let response ;
        if(isInsertsuccess){
            response = {
                message:i18n.t('Register') +  i18n.t('Success') ,
                status:false,
                data:{}
            }
        }else{
            response = {
                message:i18n.t('Register') +  i18n.t('Fail') ,
                status:false,
                data:{}
            }
        }

        return reply.send(response);
    })

    const sendMail = async(toEmail,subject,html) =>{
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
    }

    fastify.post('/loginCompany',{
        schema:{
            body: fluent.object().prop('account', fluent.string().minLength(6).maxLength(40).required())
                                 .prop('password', fluent.string().minLength(6).maxLength(30).required())
        }
    }, async (request, reply) => {
        const { account,password } = request.body;

        const companyInfo = await mongo.findOne(collectionName, {account});

        if(!companyInfo){ //帳號不存在
            const response = {
                message:i18n.t('Account') +  i18n.t('IsNotExist') ,
                status:false,
                data:{}
            }
            return reply.send(response);
        }

        const hashPassword = await encryptJs.bcryptHash(password);
        const isPass = encryptJs.bcrypCompareSync(hashPassword,companyInfo.password);

        if(!isPass){//密碼不正確
            response = {
                message:i18n.t('Login') +  i18n.t('Fail') + i18n.t('Password') +i18n.t('IsNotCorrect') ,
                status:false,
                data:{}
            }
            return reply.send(response);
        }

        const userData = {
            ...companyInfo
        }
        delete userData.password;  

        const jwt = await exportJwtsignfy(userData);

        response = {
            message:i18n.t('Login') +  i18n.t('Success') ,
            status:true,
            data:jwt
        }

        return reply.send(response);
    })

    fastify.post('/genVerifyCode',{
        schema: {
            query: fluent.object().prop('mail', fluent.string().format(fluent.FORMATS.EMAIL).required()),
        }
    }, async (request, reply) => {
        const { mail } = request.query;
    })

    fastify.post('/verifyCode',{
        schema:{
            query: fluent.object().prop('code', fluent.string().required()),
        }
    }, async (request, reply) => {
        const { code } = request.query;
        const decryptData = await encryptJs.decryptAES(code,secretKey);
        if(!decryptData) return reply.send({
            message: '驗證碼無效', //TODO 需要多國語系
            status:false,
            data:{}
        }); //驗證錯誤

        const { data , expiredTime } = decryptData;

        if(expiredTime){
            const nowTime = await momentJs.getNowTime();
            const totalMinutes = await momentJs.minutes(expiredTime,nowTime);
            if(totalMinutes>10){//驗證錯誤 超過十分 連結過期
                return reply.send({
                    message: '驗證碼無效', //TODO 需要多國語系
                    status:false,
                    data:{}
                }); 
            }
        }
        const userData = await encryptJs.decryptAES(data,secretKey);
        //更新狀態
        const isUpdate = await mongo.updateOne(collectionName ,{ mail:userData.mail } ,{isValid:true})
        if(isUpdate){
            return reply.redirect('http://localhost:3100/auth/loginCompany')
        }else{
            return reply.send({
                message: '驗證失敗', //TODO 需要多國語系
                status:false,
                data:{}
            }); 
        }
    })

}