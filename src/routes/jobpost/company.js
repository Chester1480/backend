const { mongo } = require("../../service/share/database/databasepackage");
const { encryptJs,nodemailerJs } = require('../../service/share/lib/libpackage');
const fluent = require('fluent-json-schema');
const { jwtverify , exportJwtsignfy } = require('../../service/srp/auth/auth');

const config = require('config');
const secretKey = config.get('jwt').secret;
const gmailConfig = config.get('Gmail')

const collectioName ='Company';

module.exports = async function (fastify, options) {
    const i18n = fastify.i18n;

    const registerSchema = {
        body: fluent.object().prop('companyName', fluent.string().minLength(6).maxLength(40).required())
                             .prop('account', fluent.string().minLength(6).maxLength(40).required())
                             .prop('password', fluent.string().minLength(6).maxLength(30).required())
                             .prop('confirmPassword', fluent.string().minLength(6).maxLength(30).required())
                             .prop('companyDescription', fluent.string().required())
                             .prop('mail', fluent.string().format(fluent.FORMATS.EMAIL).required()),
    }

    fastify.post('/registerCompany',{schema:registerSchema}, async (request, reply) => {
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

        const companyInfo = await mongo.findOne(collectioName, {mail});
        if(companyInfo){ //帳號已存在
            const response = {
                message:i18n.t('Account') +  i18n.t('Exist') ,
                status:false,
                data:{}
            }
            return reply.send(response);
        }
        const hashPassword = await encryptJs.bcryptHash(password);

        const data = {
            icon,//設定default
            payOutTime:null,
            companyName,
            mail,
            password:hashPassword,
            companyDescription,
            status:1,
            isValid:false,
            ip,
            link,
            createTime:Date.now()
        }

        const isInsertsuccess = await mongo.insert(collectioName, [data]);

        const parameters = {
            data,
            expiredTime:Date.now()
        }
        const hashData = await encryptJs.encryptAES(parameters,secretKey);
        const url = `http://localhost:3100/company/verifyCode?code=${hashData}`;
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

    // const genVerifyCodeUrl = async(userInfo)=> {
    //     const data = {
    //         userInfo,
    //         expiredTime:Date.now()
    //     }
    //     const hashData = await encryptJs.encryptAES(data,secretKey);
    //     const url = `http://localhost:3100/company/verifyCode?code=${hashData}`;
    //     return url;
    // }

    // email發送測試用
    fastify.post('/sendMail', async (request, reply) => {
      
        const data = {
            userInfo:{
                
            },
            expirationTime:Date.now()
        }

        const hashData = await encryptJs.encryptAES('data',secretKey);
        const reciverData = await encryptJs.decryptAES(hashData,secretKey);
        // const toEmail = 'chester0148@gmail.com';
        // const subject ='這是 node.js 發送的測試信件';
        const url = `http://localhost:3100/company/verifyCode?code=${hashData}`;
        console.log(url);
        // const html ='<h2>測試</h2>';
        // await sendMail(toEmail,subject,html);
        return reply.send('Success')
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

    const verifyCodeSchema = {
        query: fluent.object().prop('code', fluent.string().required()),
    }

    fastify.post('/verifyCode',{schema:verifyCodeSchema}, async (request, reply) => {
        const { code } = request.query;
    })

    const loginSchema = {
        body: fluent.object().prop('account', fluent.string().minLength(6).maxLength(40).required())
                             .prop('password', fluent.string().minLength(6).maxLength(30).required())
    }

    fastify.post('/loginCompany',{schema:loginSchema}, async (request, reply) => {
        const { account,password } = request.body;

        const companyInfo = await mongo.findOne(collectioName, {account});

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

    const createSchema = {
        body: fluent.object()
                .prop('companyName', fluent.string().minLength(6).maxLength(40).required())
                .prop('account', fluent.string().minLength(6).maxLength(40).required())
                .prop('password', fluent.string().minLength(6).maxLength(30).required())
                .prop('companyDescription', fluent.string().required())
                .prop('mail', fluent.string().format(fluent.FORMATS.EMAIL).required()),
    }

    fastify.post('/createCompany',{schema:createSchema}, async (request, reply) => {
        const { icon,companyName,account,password,companyDescription,mail,link } = request.body;
        const ip = request.ip;
        const companyInfo = await getCompany({account});

        if(companyInfo){
            const response = {
                message:i18n.t('Account') +  i18n.t('Exist') ,
                status:false,
                data:{}
            }
            return reply.send(response);
        }

        //加密
        const hashPassword = await encryptJs.bcryptHash(password);

        const data = {
            icon,
            companyName,
            account,
            password:hashPassword,
            companyDescription,
            status: 1, //0禁用 1啟用
            mail,
            ip,
            link,
            createTime:Date.now(),
        }
        
        const isInsertsuccess = await mongo.insert(collectioName, [data]);
        let response;
        const register = i18n.t('Register');
        if(isInsertsuccess){
            response = {
                message:register +  i18n.t('Success') ,
                status:true,
                data:{}
            }
        }else{
            response = {
                message:register +  i18n.t('Fail') ,
                status:false,
                data:{}
            }
        }
        return reply.send(response);
    })

    const updateSchema = {
        body: fluent.object().prop('_id', fluent.string().required()),
    }

    fastify.post('/updateCompany',{schema:updateSchema}, async (request, reply) => {
        const { _id,icon,companyName,companyDescription,mail,link } = request.body;

        const companyInfo = await getCompany({_id});
        if(!companyInfo){
            const response = {
                message:i18n.t('Account') +  i18n.t('IsNotExist') ,
                status:false,
                data:{}
            }
            return reply.send(response);
        }

        const data = {
            _id,
            icon,
            companyName,
            companyDescription,
            mail,
            link,
            createTime:Date.now(),
        }
        const isInsertsuccess = await mongo.update(collectioName, data);
        let response;
        const editText = i18n.t('Edit');
        if(isInsertsuccess){
            response = {
                message: editText+  i18n.t('Success') ,
                status:isInsertsuccess,
                data:{}
            }
        }else{
            response = {
                message: editText +  i18n.t('Fail') ,
                status:isInsertsuccess,
                data:{}
            }
        }
       
        return reply.send(response);
    })
    
    const getSchema = {
        query: fluent.object().prop('_id', fluent.string().required()),
    }

    fastify.post('/getCompany',{ schema:getSchema }, async (request, reply) => {
        const { _id } = request.query;
        const companyInfo = await getCompany({ _id });
        const response = {
            message:i18n.t('Inquire') +  i18n.t('Success') ,
            status:false,
            data:companyInfo
        }
        return reply.send(response);
    })

    const getCompany = async ( parameters ) =>{
        const companyInfo = await mongo.findOne(collectioName,parameters);
        return companyInfo;
    }
   
}