const { mongo } = require("../../service/share/database/databasepackage");
const fluent = require('fluent-json-schema');

const collectioName ='CompanyPost';

module.exports = async function (fastify, options) {
    const i18n = fastify.i18n;
    
    const createSchema = {
        body: fluent.object()
                .prop('companyName', fluent.string().minLength(6).maxLength(40).required())
                .prop('account', fluent.string().minLength(6).maxLength(40).required())
                .prop('password', fluent.string().minLength(6).maxLength(30).required())
                .prop('companyDescription', fluent.string().required())
                .prop('mail', fluent.format(fluent.FORMATS.EMAIL).required())
                ,
    }

    fastify.post('/createCompanyPost',{schema:createSchema}, async (request, reply) => {
        const { companyName,mail,link,jobType,jobSkill,jobLevel,jobLocation,isRemote ,phone,postTitle,jobDescription,salary} = request.body;

        const data = {
            isTop:0,//是否至頂
            companyName,
            mail,
            link,
            jobType,//[]
            jobSkill,//[]
            jobLevel,//[]
            jobLocation,
            isRemote,
            isPay:false,//保留欄位 預設
            phone ,
            postTitle,
            postContent,
            jobTitle,
            jobDescription,
            salary,
            createTime:Date.now(),
            editTime:''
        }
        
        const isInsertsuccess = await mongo.insert(collectioName, [data]);
        let response;

        if(isInsertsuccess){
            response = {
                message:i18n.t('Add') +  i18n.t('Success'),
                status:1,
                data:{}
            }
        }else{
            response = {
                message:i18n.t('Add') +  i18n.t('Fail'),
                status:0,
                data:{}
            }
        }
        reply.send(response);
    })

    const updateSchema = {
        body: fluent.object().prop('_id', fluent.string().required()),
    }

    fastify.post('/updateCompanyPost',{schema:updateSchema}, async (request, reply) => {
        const { _id,icon,companyName,companyDescription,mail,link } = request.body;


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
        const response = {
            message:i18n.t('Edit') +  i18n.t('Success'),
            status:isInsertsuccess,
            data:{}
        }
        return reply.send(response);
    })
    
    const getSchema = {
        query: fluent.object().prop('_id', fluent.string().required()),
    }

    fastify.post('/getCompanyPost',{ schema:getSchema }, async (request, reply) => {
        const { _id } = request.query;
        const companyInfo = await getCompanyPost({ _id });
        const response = {
            message:i18n.t('Inquire') +  i18n.t('Success'),
            status:1,
            data:companyInfo
        }
        return reply.send(response);
    })

    fastify.post('/getCompanyPostById',{ schema:getSchema }, async (request, reply) => {
        const { _id } = request.query;
        const companyInfo = await getCompanyPost({ _id });
        const response = {
            message:i18n.t('Inquire') +  i18n.t('Success'),
            status:1,
            data:companyInfo
        }
        return reply.send(response);
        })

        const getCompanyPost = async ( parameters ) =>{
        const companyInfo = await mongo.findOne(collectioName,parameters);
        return companyInfo;
    }
}