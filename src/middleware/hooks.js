
const backend = require('../routes/backend');
const { jwtverify } = require('../service/srp/auth/auth');
const  middleware  = require('./middleware');

//#region 生命週期
// Incoming Request
//   │
//   └─▶ Routing
//         │
//         └─▶ Instance Logger
//              │
//    4**/5** ◀─┴─▶ onRequest Hook
//                   │
//         4**/5** ◀─┴─▶ preParsing Hook
//                         │
//               4**/5** ◀─┴─▶ Parsing
//                              │
//                    4**/5** ◀─┴─▶ preValidation Hook
//                                   │
//                             400 ◀─┴─▶ Validation
//                                         │
//                               4**/5** ◀─┴─▶ preHandler Hook
//                                               │
//                                     4**/5** ◀─┴─▶ User Handler
//                                                     │
//                                                     └─▶ Reply
//                                                           │
//                                                 4**/5** ◀─┴─▶ preSerialization Hook
//                                                                 │
//                                                                 └─▶ onSend Hook
//                                                                       │
//                                                             4**/5** ◀─┴─▶ Outgoing Response
//                                                                             │
//                                                                             └─▶ onResponse Hook
//#endregion
module.exports = async function (fastify, options) {
  // 像是event 的用法 每次request 都會經過這邊
  fastify.addHook('onRequest', async (request, reply) => {
    const { url, headers } = request;
    const { host } = headers;
    const requestUrl = url.split('/');
    // #region  常用解說
    // console.log(request.ip);
    // console.log(request.hostname);
    // console.log(request.protocol);
    // console.log(request.url);
    // console.log(url);
    // console.log(await osLocale());// zh-CN 可以得知 系統使用的語言
    // #endregion
    try {
      const i18n = fastify.i18n;
      await middleware(request, reply); // middleware 先處理 過濾IP , 分析資料 等工作
      const apiPrefix = requestUrl[1];
      const routeFunction = requestUrl[3];
      if(apiPrefix === "jobpost"){
        //登入 註冊 不需要token驗證
        if(routeFunction !=="registerCompany" || routeFunction !=="loginCompany"){
          // console.log(headers.authorization);
          const token = headers.authorization.split(' ')[1];
          //驗證碼空值
          if(!token) return reply.send({
            message:i18n.t('TokenIsEmpty') ,
            status:true,
            data:{}
          });
          const isValid = await jwtverify(token);
          //驗證錯誤
          if(!isValid)return reply.send({ 
            message:i18n.t('TokenIsNotValid') ,
            status:true,
            data:{}
          });
        }
      }
      // if(apiPrefix !== "assets"){
      //   const apiName = requestUrl[2];
        
      //   if(apiPrefix ==="backend"){
      //     const { path } = request.query;
      //     if(path){
      //       const token = request.headers.authentication;
      //       if(token){
      //         return;
      //       }
      //     }
      //   }
      //   //const isValid = await jwtverify(token);
      //   // console.log(isValid);
      //   // if (!isValid) {
      //   //   reply.sendFile("login.html", { text: "text" });
      //   //   return;
      //   // }
      //   //後台API
      //   // if(apiPrefix == "backend" || apiPrefix == "api"){
      //   //   //驗證token
      //   //   if(apiName !== "login"){
      //   //     //const token = ":";
      //   //     //const isValid = await request.jwtVerify(token);
      //   //     // if (!isValid) { //錯誤導回登入頁
      //   //     //    reply.redirect('http://localhost:3100/backend/login');
      //   //     //  }
      //   //   }
      //   //   if(apiName !== "Login"){
      //   //     //const token = ":";
      //   //     //const isValid = await request.jwtVerify(token);
      //   //     // if (!isValid) { //錯誤導回登入頁
      //   //     //    reply.redirect('http://localhost:3100/Login');
      //   //     //  }
      //   //   }
      //   // }
      // }
    } catch (error) {
      reply.send(error);
    }
  });
  
  // fastify.addHook('onSend', async (request, reply) => {
    
  // });
}

