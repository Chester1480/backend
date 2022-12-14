const { mongo } = require("../../service/share/database/databasepackage");
const { encryptJs,nodemailerJs,momentJs } = require('../../service/share/lib/libpackage');
const fluent = require('fluent-json-schema');
const { jwtverify , exportJwtsignfy } = require('../../service/srp/auth/auth');

const config = require('config');
const secretKey = config.get('jwt').secret;
const gmailConfig = config.get('Gmail')

const collectionName ='Company';


module.exports = async function (fastify, options) {
    const i18n = fastify.i18n;

    fastify.post('/settingCompanyIcon',{
        schema:{
            // body: fluent.object().prop('companyName', fluent.string().minLength(6).maxLength(40).required())
                                // .prop('account', fluent.string().minLength(6).maxLength(40).required())
                                // .prop('password', fluent.string().minLength(6).maxLength(30).required())
                                // .prop('confirmPassword', fluent.string().minLength(6).maxLength(30).required())
                                // .prop('companyDescription', fluent.string().required())
                                // .prop('mail', fluent.string().format(fluent.FORMATS.EMAIL).required()),
        }
    }, async (request, reply) => {
        const data = await request.file();
        const fields = Object.keys(data.fields);
        // console.log(fields)
        // console.log(fields)
        // fields.forEach(field => {
        //     //field.fieldname
        //     //field.filename
        //     //field.mimetype mimetype: 'image/webp',
        //     // if(field.mimetype.split('/')[0] === 'image'){ //[1] jpeg
        //     //     console.log(data.fields[field].file)
        //     // }
        // });
        //const {icon1,icon2} = data.fields;
        //console.log(data.fields);
        
        return reply.send('11');
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

    fastify.post('/createCompany',{
        schema:{
            body: fluent.object()
                    .prop('companyName', fluent.string().minLength(6).maxLength(40).required())
                    .prop('account', fluent.string().minLength(6).maxLength(40).required())
                    .prop('password', fluent.string().minLength(6).maxLength(30).required())
                    .prop('companyDescription', fluent.string().required())
                    .prop('mail', fluent.string().format(fluent.FORMATS.EMAIL).required()),
        }
    }, async (request, reply) => {
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

        //??????
        const hashPassword = await encryptJs.bcryptHash(password);

        const data = {
            icon,
            companyName,
            account,
            password:hashPassword,
            companyDescription,
            status: 1, //0?????? 1??????
            mail,
            ip,
            link,
            createTime:Date.now(),
        }
        
        const isInsertsuccess = await mongo.insert(collectionName, [data]);
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
        const isInsertsuccess = await mongo.updateOne(collectionName, data);
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
        const companyInfo = await mongo.findOne(collectionName,parameters);
        return companyInfo;
    }
   
}