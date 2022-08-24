const { mongo } = require("../../service/share/database/databasepackage");
const fluent = require('fluent-json-schema');

const collectioName ='UserPost';

module.exports = async function (fastify, options) {

    const createSchema = {
        body: fluent.object()
                .prop('companyName', fluent.string().minLength(6).maxLength(40).required())
                .prop('account', fluent.string().minLength(6).maxLength(40).required())
                .prop('password', fluent.string().minLength(6).maxLength(30).required())
                .prop('companyDescription', fluent.string().required())
                .prop('mail', fluent.format(fluent.FORMATS.EMAIL).required())
                ,
    }

    fastify.post('/createUserPost',{schema:createSchema}, async (request, reply) => {
        const { companyName,mail,link,jobType,jobSkill,jobLevel,jobLocation,isRemote ,phone,postTitle,jobDescription,salary} = request.body;

        const data = {
            isTop:0,//是否至頂
            companyName,
            mail,
            link,
            jobType,//[]
            jobSkill,//[]
            jobLocation,
            isRemote,
            payOutTime:null,//保留欄位 預設
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
                message:'Post成功',
                status:1,
                code:"1006"
            }
        }else{
            response = {
                message:'Post失敗',
                status:0,
                code:"1007" //TODO 之後須做個i18n 對應 code 語系
            }
        }
        reply.send(response);
    })

    const updateSchema = {
        body: fluent.object().prop('_id', fluent.string().required()),
    }

    fastify.post('/updateUserPost',{schema:updateSchema}, async (request, reply) => {
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
            message:'',
            status:isInsertsuccess,
            code:''
        }
        return reply.send(response);
    })
    
    const getSchema = {
        query: fluent.object().prop('_id', fluent.string().required()),
    }

    fastify.post('/getUserPost',{ schema:getSchema }, async (request, reply) => {
        const { _id } = request.query;
        const companyInfo = await getCompanyPost({ _id });
        const response = {
            message:'查詢成功',
            status:1,
            code:'1004',
            data:companyInfo
        }
        return reply.send(response);
    })

    fastify.post('/getUserPostById',{ schema:getSchema }, async (request, reply) => {
        const { _id } = request.query;
        const userPost = await getCompanyPost({ _id });
        const response = {
            message:'查詢成功',
            status:1,
            code:'1004',
            data:userPost
        }
        return reply.send(response);
        })

        const getCompanyPost = async ( parameters ) =>{
        const companyInfo = await mongo.findOne(collectioName,parameters);
        return companyInfo;
    }
}