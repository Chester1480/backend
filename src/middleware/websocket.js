
const { WebSocketServer } = require('ws');
const { jwtverify } = require('../service/srp/auth/auth');
const { encryptJs , faststringifyJs } = require('../service/share/lib/libpackage')

clientsMap = new Map();
//clients = [];
module.exports = async function () {

  const wss = new WebSocketServer({ port: 3200 });

  wss.on('connection', async function connection(ws,req) {
    
    //const userInfo = await jwtverify(req.url.split('?')[1]);//url傳遞方式 
    const userInfo = await jwtverify(ws._protocol);//protocol 傳遞方式
    if(userInfo === false){//驗證不過則關閉連線
      const data = {
        type:"close",
        message:""
      }
      ws.send(JSON.stringify(data));
      ws.close();
      return;
    }
    const { userData } = userInfo;
    const md5Key = await encryptJs.md5Hash(userData.id+Date.now());
    ws.id = userData.id;
    ws.md5Key = md5Key;
    //clients.push(ws);

    //判斷id是否已存在(多開)
    if(clientsMap.has(userData.id)){
      const wsArray = clientsMap.get(userData.id);
      wsArray.push(ws);
      clientsMap.set(userData.id, wsArray);
    }else{
      clientsMap.set(userData.id,[ws]);
    }
   
    ws.on('message', async function message(data) {
        const isJSON = await faststringifyJs.isJSON(data.toString());
        if(isJSON){
          const parseObject = JSON.parse(data.toString());
          const { type , message } = parseObject;
          //await messageParse(type , message);
        }
    });

    ws.on('close', async function message(data) {
      const wsArray = clientsMap.get(ws.id);
      if(wsArray.length > 1){
        clientsMap.delete(ws.id);
      }else{
        const newArray = [];
        wsArray.forEach(item=>{
          if(item.md5Key != ws.md5Key){
            newArray.push(item);
          }
        })
        clientsMap.set(ws.id,newArray);
      }
    });

  });
};

//解析字串
async function messageParse (type,message) {
  switch(type){
    case 0:
        //message
      break;
  }
}

async function sendAll (message) {
  const data = {
    "type":"broadcast",
    message
  }
  clientsMap.forEach((values,keys)=>{ 
    clientsMap.get(keys).send(faststringifyJs.stringify(data));
  }) 
}

async function sendTo(targetId,message) {
  const data = {
    "type":"whisper",
    message
  }
  clientsMap.get(targetId).send(data);
}