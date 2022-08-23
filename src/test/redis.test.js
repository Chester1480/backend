//supertest
//chai
process.env.NODE_ENV = 'dev';
const { expect } = require('chai');
let assert = require('assert')
// const api = supertest('http://localhost:3000/api'); // 定義測試的 API 路徑
const redis = require('../service/share/redis');

// before((done) => {
//     api.post('/user/login') // 登入測試
//         .set('Accept', 'application/json')
//         .send({
//             user_mail: 'andy@gmail.com',
//             user_password: 'password10'
//         })
//         .expect(200)
//         .end((err, res) => {
//             APItoken = res.body.token; // 登入成功取得 JWT
//             done();
//         });
// });
//set NODE_ENV=dev mocha redis.test.js 
//  mocha redis.test.js  set NODE_ENV=dev
describe('redis test', async () => {
    const key = 'mocha' + new Date();
    const testData = JSON.stringify({
        value: 'vvvvv',
    });
    const second = 0;
    it('set', async (done) => {
        const result = await redis.set(key, testData, second);
    });
    // it('update', async (done) => {

    // });
    // it('delete', async (done) => {

    // });

})