const { mongo } = require("../../service/share/database/databasepackage");
const { encryptJs } = require('../../service/share/lib/libpackage');
const fluent = require('fluent-json-schema');

const { jwtverify , exportJwtsignfy } = require('../../service/srp/auth/auth');

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
        const { companyName , account ,password ,confirmPassword,mail,icon,companyDescription,link} = request.body;
        const ip  = request.ip;

        if(password !== confirmPassword){ //密碼不一致
            const response = {
                message:i18n.t('PasswordIsNotSame') ,
                status:false,
                data:{}
            }
            return reply.send(response);
        }

        const companyInfo = await mongo.findOne(collectioName, {account});
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
            account,
            password:hashPassword,
            companyDescription,
            status:1,
            mail,
            ip,
            link,
            createTime:Date.now()
        }

        const isInsertsuccess = await mongo.insert(collectioName, [data]);

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