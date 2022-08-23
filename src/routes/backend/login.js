const { exportJwtsignfy , jwtverify } = require('../../service/srp/auth/auth');
const adminMongo = require('../../service/mongodb/admin');
const { encryptJs } = require('../../service//share/lib/libpackage');

module.exports = async function (fastify, options) {

    fastify.get('/', async (request, reply) => {
        reply.sendFile("login.html", { text: "text" });
    })
    
    fastify.get('/auth', async (request, reply) => {
        const token = request.headers.authentication;
        const userData = await jwtverify(token);
        if(userData){
            reply.send( { isValid:true } );
        }else{
            reply.send( { isValid:false } );
        }
    })

    fastify.post('/', async (request, reply) => {
        const { account, password } = request.body;
        const response = {
            statuscode : 200,
            data: "",
            token:{}
        }
        const result = await adminMongo.getAdminsByAccount(account);
       
        if (result) {
            const hashPassword = result.password;
            const isTrue = await encryptJs.bcrypCompareSync(password, hashPassword);
            if (isTrue) {
                const userData = {
                    id:result._id,
                    account,
                    password
                }
                const token = await exportJwtsignfy(userData);
                response.data = "";
                response.token = token;
                response.statuscode = 200;
            } else {
                response.data = "密碼錯誤";
                response.statuscode = 501;
            }
        } else {
            response.data = "帳號不存在";
            response.statuscode = 404;
        }

       
        reply.send({
            response
        });
    })

    fastify.post('/register', async (request, reply) => {
        console.log("teteteteteteteeetetetetet");
        const password = "12345678";
        const hashPassword = await encryptJs.bcryptHash(password);
        const admin = {
            account:"test",
            password:hashPassword,
            role:[],
            status: 0,
            createTime:Date.now()
        }
        await adminMongo.addAdminData(admin);

        const response = {
            statuscode : 200,
            data: "",
            token:{}
        }
        
        reply.send({
            response
        });
    })

}
