const { mongo } = require("../../service/share/database/databasepackage");
const { encryptJs } = require('../../service/share/lib/libpackage');
const { faker } = require("@faker-js/faker");

module.exports = async function (fastify, options) {

    fastify.post('/createAdmin', async (request, reply) => {
        const admin = await mongo.findOne('admin', { account: "testadmin" });
        if (!admin) {
            const password = "123456";
            const hashPassword = await encryptJs.bcryptHash(password);
            const data = {
                icon: faker.internet.avatar(),
                account: "testadmin",
                password: hashPassword,
                role: [],
                status: 0,
                createTime: Date.now()
            }
            await mongo.insert('admin', [data]);
        }
        reply.send('success');
    })

    /**
     * 創造帳號
     * count = 要創造的帳號數量
     */
    fastify.post('/createUser', async (request, reply) => {
        //#region 文件
        //https://www.npmjs.com/package/@faker-js/faker
        //#endregion
        const { count } = request.body;
        const password = "123456";
        const hashPassword = await encryptJs.bcryptHash(password);
        let datas = [];

        for (let index = 0; index < count; index++) {
            const name = faker.name.findName();
            const findName = faker.internet.userName(name);
            const email = faker.internet.email();
            const icon = faker.internet.avatar();
            const data = {
                icon,
                account: findName,//email
                password: hashPassword,
                email,
                name: findName,
                type: 1,//"ADMIN":0, "VENDOR":1, "USER":2}
                status: 0,//0 1 -1
                phoneNumber: faker.internet.phoneNumber,
                modifyTime: null,
                loginErrorCount: 0,//登入錯誤次數
                loginErrorTime: null,
                lastLoginIp: null,
                lastLoginTime: null,
                registerIp: faker.internet.ipv4,
                registerTime: Date.now(),
            }
            datas.push(data);
        }
       
        await mongo.insert('user', datas);
    
        reply.send('success');
    })

    /**
     * 創造商品
     * count = 要創造的商品數量
     */
    fastify.post('/createProduct', async (request, reply) => {
        const { count } = request.body;
        let products = [];
        for (let index = 0; index < count; index++) {

            const product = {
                icon: faker.image.cats(),
                name: faker.commerce.product(),
                discount: 0,// 10 = 10%
                price: faker.finance.amount(),
                type: 0,//0:stuff 
                updateTime: null,
                creatTime: Date.now(),
            }
            products.push(product);
        }
        await mongo.insert('product', products);
        reply.send('success');
    })

    /**
     * 創造群組
     */
    // fastify.post('/createGroup', async (request, reply) => {
    //     const { groupName } = request.body;
    //     const users = await mongo.find("user");
    //     const randomUser = users[Math.floor(Math.random() * users.length)]

    // })

    /**
     * 創造訂單
     * count = 要創造的訂單數量
     */
    fastify.post('/createOrder', async (request, reply) => {
        const { count } = request.body;
        let orders = [];
        const users = await mongo.find("user");
        
        const products = await mongo.find("product");
     
        for (let index = 0; index < count; index++) {
            const randomUser = users[Math.floor(Math.random() * users.length)]
            const { _id ,accout,name ,email,phone} = randomUser
            const userInfo = {
                _id,
                accout,
                name,
                email,
                phone
            }
            const productsRange = Math.floor(Math.random() * products.length);
            let productsArray = [];
            for (let index = 0; index < productsRange; index++) {
                const randomProduct = products[Math.floor(Math.random() * products.length)]
                productsArray.push(randomProduct);
            }
            let totalPrice = 0;
            productsArray.forEach(p => {
                totalPrice += Number(p.price);
            });

            const order = {
                userInfo,//下單者資料
                products: productsArray ,
                status: 0,// 0:未付款 1:已付款 -1:已取消
                isChange: 0,//是否修改過訂單
                totalPrice,
                orderTime: Date.now(),
            }
            orders.push(order);
        }
    
        await mongo.insert('order',orders);
        reply.send('success');
    })

}