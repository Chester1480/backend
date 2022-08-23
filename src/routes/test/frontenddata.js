const { mongo } = require("../../service/share/database/databasepackage");
const { faker } = require("@faker-js/faker");

module.exports = async function (fastify, options) {

    fastify.post('/createCompany', async (request, reply) => {
        const { count } = request.body;
        const collectioName = 'Company';
        let datas = [];

        const hashPassword = await encryptJs.bcryptHash("123456");

        for (let index = 0; index < count; index++) {
            const account = faker.company.bsBuzz();
            if(datas.indexOf(account) === -1){
                const data = {
                    icon:faker.image.avatar(),
                    companyName: faker.company.companyName()+' Inc. ',
                    account:faker.company.bsBuzz(),
                    password:hashPassword,
                    companyDescription:faker.company.catchPhraseDescriptor(),
                    status: 1, //0禁用 1啟用
                    mail:faker.email("google.com"),
                    ip:faker.internet.ipv4,
                    link:'',
                    createTime:Date.now(),
                }
                datas.push(data);
            }
        }
        await mongo.insert(collectioName, datas);
        reply.send('success');
    })

    fastify.post('/createCompanyPost', async (request, reply) => {
        const { count } = request.body;
        const collectioName = 'CompanyPost';
        const companysInfo = await mongo.find("Company");
        let datas = [];
        for (let index = 0; index < count; index++) {
            const randomCompany = companysInfo[Math.floor(Math.random() * companysInfo.length)]
            const data = {
                isTop:0,
                companyName:randomCompany.companyName,
                mail:randomCompany.mail,
                link:randomCompany.link,
                jobType:[],
                jobSkill:[],
                jobLevel:[],
                jobLocation:[],
                isRemote:false,
                isPay:false,//保留欄位 預設
                phone:faker.phone.phoneNumber() ,
                jobTitle:faker.name.jobTitle(),
                jobDescription:faker.name.jobArea(),
                salary:faker.commerce.price(1000, 2000),
                createTime:Date.now(),
                editTime:''
            }
            datas.push(data);
        }
        await mongo.insert(collectioName, datas);
        reply.send('success');
    })

    fastify.post('/createJobDetail', async (request, reply) => {
        const collectioName = 'JobDetail';
        const data = {
            jobType:['Freelance','Full-Time','Internship','Part_time'],
            jobSkills:[],
            jobType:['Director','Head','Intern','Manager','Mid-Level','Junior'],
            createTime:Date.now(),
            editTime:''
        }
        datas.push(data);
        await mongo.insert(collectioName, [data]);
        reply.send('success');
    })

    fastify.post('/createAdvertise', async (request, reply) => {
        const collectioName = "advertise";
        const data = {
            jobType:['Freelance','Full-Time','Internship','Part_time'],
            jobSkills:[],
            jobType:['Director','Head','Intern','Manager','Mid-Level','Junior'],
            createTime:Date.now(),
            editTime:''
        }
        datas.push(data);
        await mongo.insert(collectioName, [data]);
        reply.send('success');
    })

    fastify.post('/createUserPost', async (request, reply) => {
        const { count } = request.body;
        const collectioName = "UserPost";
        let datas = [];
        for (let index = 0; index < count; index++) {
            const randomCompany = companysInfo[Math.floor(Math.random() * companysInfo.length)]
            const data = {
                isTop:0,
                companyName:randomCompany.companyName,
                mail:randomCompany.mail,
                link:randomCompany.link,
                phone:faker.phone.phoneNumber(),
                jobTitle:faker.name.jobTitle(),
                salary:faker.commerce.price(1000, 2000),
                createTime:Date.now(),
                editTime:''
            }
            datas.push(data);
        }
        await mongo.insert(collectioName, datas);
        reply.send('success');
    })

}