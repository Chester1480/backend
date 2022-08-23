const { jwtverify } = require('../service/srp/auth/auth');
const iswhiteListEnable = false;
const config = require('config');
const environment = config.get('environment');

module.exports = async (request, reply) => {
  if (environment != 'prod') {
    //自動登入
  }
  //raw - 來自 Node 核心的傳入 HTTP 請求
  //log - 傳入請求的記錄器實例
  //context- Fastify 內部對象。您不應直接使用或修改它。訪問一個特殊鍵很有用
  const { ip, query, body, params, headers, raw, hostname, method, url, routerMethod, routerPath, context } = request;
  await analyze(request);

  if (await isBlockList(ip)) { //黑名單 檢查
    // 轉址
  }

  if (iswhiteListEnable) {
    const whiteListArray = [ config.get('whitelist') ]; 
    const whiteList = new Set([ whiteListArray ]);
    if (whiteList.has(ip)) { //白名單 檢查
    }
  }

};

//--------------------------------------------------------------------------------------------------------------------------

/*
 * 分析來源用
 * @param {*} request
 */
async function analyze (request) {
  //分析來源用
}

/*
 * 檢查是否為黑名單
 * @param {*} ip
 */
async function isBlockList (ip) {

}

async function jwtvertify (token) {
  if (token) {
  // request.config.url /api/Test
    return await jwtverify(token);
  } else {
  // 丟出錯誤 token不存在  reply.send(err)
  }
}

//--------------------------------------------------------------------------------------------------------------------------