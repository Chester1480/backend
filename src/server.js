const config = require('config');
const osLocale = require('os-locale'); //可以查看user 系統語系
const cluster = require('cluster');
const cpuInfo = require('os').cpus();

// 排程
// const nodeSchedule = require('./service/schedule/nodeschedule/nodeschedule.js');
// const middleware = require('../src/middleware/middleware.js');

// discord
// require('./service/srp/api/discord/discord');//載入discordbot
// telegram
// require('./service/srp/api/telegram/telegram');

//#region fastify init
// Require the framework and instantiate it
const fastify = require('fastify')({
  // logger: true
  // frameworkErrors: function (error, req, res) {
  //   if (error instanceof FST_ERR_BAD_URL) {
  //     res.code(400);
  //     return res.send('Provided url is not valid');
  //   } else {
  //     res.send(err);
  //   }
  // }
});
//#endregion
const fastifyPlugin = require('fastify-plugin')

//#region  redis
// redis https://github.com/fastify/fastify-redis
// fastify.register(require('fastify-redis'), { host: '127.0.0.1' })
//#endregion

//#region 語系
fastify.register(require('fastify-polyglot'), {
  defaultLocale: 'tw',
  locales: {
    tw: require('./language/zh-tw'),
    en: require('./language/en.json')
  }
})
//#endregion
//console.log(fastify.i18n.t('Hello!'))

//#region middleware

//#region 流量控制
fastify.register(require('fastify-rate-limit'), {
  max: 1000,
  timeWindow: 5000,
  cache: 10000,
  // allowList: ['127.0.0.1'],
  // redis: new Redis({ host: '127.0.0.1' }),
  keyGenerator: function (req) { /* ... */ },
  errorResponseBuilder: function (req, context) { /* ... */ },
  addHeaders: { // default show all the response headers when rate limit is reached
    'x-ratelimit-limit': true,
    'x-ratelimit-remaining': true,
    'x-ratelimit-reset': true,
    'retry-after': true
  }
});
//#endregion

//#region swagger 文件 doc: https://github.com/fastify/fastify-swagger
fastify.register(require('./middleware/swagger'));
//#endregion

//#region middleware
require('./middleware/hooks')(fastify);
//#endregion

//wesocket 處理 webdocket 細節
fastify.register(require('./middleware/websocket'));

// 攔截錯誤
fastify.setErrorHandler(async (error, request, reply) => {
  // request.headers.host: 'localhost:3000',
  if (error) {
    //console.log(error) //debug才開啟這行
    return error;
  }
});
//#endregion

//#region 路由設定

const path = require('path');
//view
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, '../public/views/'),
})
// const AutoLoad = require('@fastify/autoload')

// fastify.register(AutoLoad, {
//   dir: path.join(__dirname, 'routes'),
//   options: Object.assign({})
// })

//測試網站 是否活著用
fastify.register(require('./routes/index'), { prefix: '/check' });

//public
fastify.register(require('./routes/public/Login'), { prefix: '/Login' });
fastify.register(require('./routes/public/Register'), { prefix: '/Register' });

fastify.register(require('./routes/backend/index'), { prefix: '/' });
fastify.register(require('./routes/backend/index'), { prefix: '/backend/index' });
fastify.register(require('./routes/backend/index'), { prefix: '/backend/index/auth' });
fastify.register(require('./routes/backend/login'), { prefix: '/backend/login' });
fastify.register(require('./routes/backend/login'), { prefix: '/backend/login/auth' });

fastify.register(require('./routes/backend/admin'), { prefix: '/backend/admin' });
//user
fastify.register(require('./routes/backend/user'), { prefix: '/backend/user/' });
// fastify.register(require('./routes/backend/login'), { prefix: '/backend/login/register' });
// fastify.register(require('./routes/backend/page'), { prefix: '/backend/page' });

//前台用API
fastify.register(require('./routes/api/Spotify'), { prefix: '/api/Spotify' });
fastify.register(require('./routes/api/LineBot'), { prefix: '/api/LineBot' });

fastify.register(require('./routes/jobpost/company'), { prefix: '/jobpost/company/' });


const environment = config.get('environment');
if (environment != 'prod') { //產生測試環境用資料
  fastify.register(require('./routes/test/data'), { prefix: '/test/data' });
  fastify.register(require('./routes/test/frontenddata'), { prefix: '/test/frontenddata' });
}

fastify.after((error) => error ? console.log(error) : 'success');
fastify.ready((error) => error ? console.log(error) : 'ALL success');
//#endregion

//#region 啟動
const start = async () => {
    try {
      await fastify.listen(3100);
    // fastify.log.info(`server listening on ${fastify.server.address().port}`)
    // await nodeSchedule.allJObInit('first'); // 排程載入
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
//#endregion
