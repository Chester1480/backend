const { mongo } = require("../../service/share/database/databasepackage");
const { encryptJs } = require('../../service/share/lib/libpackage');
const { faker } = require("@faker-js/faker");

module.exports = async function (fastify, options) {
    const i18n = fastify.i18n;

    fastify.post('/createCompany', async (request, reply) => {
        const { count } = request.body;
        const collectioName = 'Company';
        let datas = [];

        const hashPassword = await encryptJs.bcryptHash("123456");

        for (let index = 0; index < count; index++) {
            const account = faker.company.bsBuzz();
            if(datas.indexOf(account) === -1){
                const data = {
                    icon: faker.image.avatar(),
                    payOutTime:null,
                    companyName: faker.company.companyName()+' Inc. ',
                    account:faker.company.bsBuzz(),
                    password:hashPassword,
                    companyDescription:faker.company.catchPhraseDescriptor(),
                    status: 1, //0禁用 1啟用
                    mail:faker.internet.email(),
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
        const jobType = i18n.t('jobType').split(',');
        const jobLevel = i18n.t('jobLevel').split(',');
        let datas = [];
        for (let index = 0; index < count; index++) {
            const randomCompany = companysInfo[Math.floor(Math.random() * companysInfo.length)]
            const data = {
                isTop:0,
                companyName:randomCompany.companyName,
                mail:randomCompany.mail,
                link:randomCompany.link,
                jobType:jobType[Math.floor(Math.random() * jobType.length)],
                jobSkill:[],
                jobLevel:jobLevel[Math.floor(Math.random() * jobLevel.length)],
                jobLocation:'',
                isRemote:false,
                isPay:false,//保留欄位 預設
                phone:faker.phone.number() ,
                title:'test title',
                content:'test content',
                jobTitle:faker.name.jobTitle(),
                jobDescription:faker.name.jobArea(),
                salary:faker.commerce.price(1000, 2000),
                payoutTime:null,
                payoutAccount:faker.finance.account(),
                createTime:Date.now(),
                editTime:''
            }
            datas.push(data);
        }
        await mongo.insert(collectioName, datas);
        reply.send('success');
    })

    fastify.post('/createAdvertise', async (request, reply) => {
        const { title,cotent } = request.body;
        const collectioName = "Advertise";
        const data = {
            title,
            cotent,
            phone:faker.phone.number() ,
            mail:faker.internet.email(),
            payoutTime:null,
            payoutAccount:faker.finance.account(),
            createTime:Date.now(),
            editTime:''
        }
        await mongo.insert(collectioName, [data]);
        reply.send('success');
    })

    fastify.post('/createUserPost', async (request, reply) => {
        const { count } = request.body;
        const collectioName = "UserPost";
        let datas = [];
        const jobType = i18n.t('jobType').split(',');
        for (let index = 0; index < count; index++) {
            const data = {
                isTop: 0,
                payoutTime:null,
                payoutAccount:faker.finance.account(),
                name: faker.name.findName(),
                phone:faker.phone.phoneNumber(),
                mail:faker.internet.email(),
                link: '',
                jobSkill: [],
                jobType: jobType[Math.floor(Math.random() * jobType.length)],
                jobLocation: '',
                isRemote:0,
                description:'description myself',
                salary: faker.commerce.price(1000, 2000),
                ip:faker.internet.ipv4,
                createTime:Date.now(),
                editTime:null
            }
            datas.push(data);
        }
        await mongo.insert(collectioName, datas);
        reply.send('success');
    })

    fastify.post('/createBulletinBoard', async (request, reply) => {
        const collectioName = "BulletinBoard";
        let datas = [
            {
                url:'',
                title:'跑馬燈',
                content:'BulletinBoard BulletinBoard BulletinBoard BulletinBoard BulletinBoard BulletinBoard BulletinBoard',
                type:1, //0一般公告 1跑馬燈 2其他行事公告
                sort:0,//排序 + 時間 
                createTime:Date.now(),
            },
            {
                url:'',
                title:'跑馬燈2',
                content:'BulletinBoard2',
                type:1, 
                sort:1,
                createTime:Date.now(),
            },
            {
                url:'',
                title:'一般公告',
                content:'123456789123456789',
                type:0,
                sort:1,
                createTime:Date.now(),
            },
            {
                url:'',
                title:'一般公告2',
                content:'555555558888884444442222222111111',
                type:0,
                sort:1,
                createTime:Date.now(),
            },
            {
                url:'',
                title:'公告',
                content:'系統公告 於8/26維修中',
                type:2,
                sort:0,
                createTime:Date.now(),
            },
        ];
       
        await mongo.insert(collectioName, datas);
        reply.send('success');
    })

}