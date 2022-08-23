const config = require('config');
// const token = config.get('spotify').token;
const TelegramBot = require('node-telegram-bot-api');
const token = config.get('telegram').bot1;
const bot = new TelegramBot(token, {polling: true});

bot.on('message', function (msg){
    const chatId = msg.chat.id;
    const { from , chat , text } = msg;
    if(from.is_bot == "false"){//排除機器人說的話

        const payload = {
            chatId:chat.id,
            userName:from.username,
            language:from.language_code,
            text
        }
        switch(chat.type){
            case "group": //從機器人加入的群組收到的
                    // await groupParse(payload);
                break;
            case "private": //從使用者對機器人發話收到的
                    // await privateParse(payload);
                break;
        }
    }
   
    // if(text =="笑死" ){
    //     bot.sendSticker(chatId,'CAACAgUAAxkBAAMOYmjXdQAB6CEEov1ebzOUmMAZg6iwAAKjBQACmA5ZVCwVH8Fl-QGeJAQ');
    // }
    // send a message to the chat acknowledging receipt of their message
    //bot.sendMessage(chatId, 'Received your message');
});

async function groupParse(payload){
    const { chatId,userName,language,text } =  payload;
    const parseResult = await stringParse(text , language);

}

async function privateParse(){
    const { chatId,userName,language,text } =  payload;

}

const startKey = ["$"];
const languageMap = new Map();
const cnCommads = ['查詢'];
const Commads = ['Inquire'];

languageMap.set("tw",cnCommads);
languageMap.set("us",Commads);

async function stringParse(text,language){
    text = text.trim();
    if(text.startsWith('$')){
        const keywords = languageMap.get(language); 
        const content = text.slice(1,text.length);
        if(keywords.includes(content)){ 

        }
    }
}

//直接對機器人發話
// bot.onText('test', function (msg) {
//     //console.log(msg);
// });


//收到Start訊息時會觸發這段程式
// bot.onText(/\/start/, function (msg) {
//     var chatId = msg.chat.id; //用戶的ID
//     var resp = 'Hi'; //括號裡面的為回應內容，可以隨意更改
//     bot.sendMessage(chatId, resp); //發送訊息的function
// });

// bot.onText(/\/echo (.+)/, (msg, match) => {
//     // 'msg' is the received Message from Telegram
//     // 'match' is the result of executing the regexp above on the text content
//     // of the message
  
//     const chatId = msg.chat.id;
//     const resp = match[1]; // the captured "whatever"
  
//     // send back the matched "whatever" to the chat
//     bot.sendMessage(chatId, resp);
// });

// api寫法
// var id = "你要發送對象的ID"
// var token = "你機器人的token"

// function sendtext(){
//   var payload = {
//       "method": "sendMessage",
//       'chat_id': id,
//       'text': 'test text'
//     }
//     start(payload);
// }

// function start(payload) {
//   var data = {
//       "method": "post",
//       "payload": payload
//   } 
//   var returned = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/", data);
  
//   var d = new Date();
//   var SpreadSheet = SpreadsheetApp.openById("你試算表的id");
//   var Sheet = SpreadSheet.getSheetByName("試算表的名稱");
//   var LastRow = Sheet.getLastRow();
//   Sheet.getRange(LastRow + 1, 1).setValue(d);
//   Sheet.getRange(LastRow + 1, 2).setValue(data);
// } 