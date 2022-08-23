const config = require('config');
const axios = require('axios');

// line config
const lineENUM = require('../../../../model/enum/line.js');
const basicUrl = config.get('linebot').basicUrl;
const lineToken = config.get('lineToken');
// doc : https://developers.line.biz/zh-hant/docs/messaging-api/sending-messages/

const { mongo } = require('../../../share/database/databasepackage');

// 傳送訊息用的格式
let replyMessage = [
    //#region 範例
    // {
    //     type: lineENUM.MESSAGETYPES.TEXT,
    //     text: totalStr
    // },
    // {
    //     type: lineENUM.MESSAGETYPES.IMAGE,
    //     originalContentUrl: result[0].menu,
    //     previewImageUrl: result[0].imageUrl
    // }
    //#endregion
]
//#region notify
exports.Notify = async function (message, lineToken) {
    const url = config.get('linebot').notifyurl;
    await send(url, 'post', message, lineToken);
}


//#endregion

// 詢問 -> 尋找要傳送的訊息類型 
//#region 
// events:{[
//     {
//       type: 'message',
//       replyToken: 'fcd0704788b44700a064a8f8d9934211',
//       source: {
//         userId: 'U1b9aed4e36342720abf72e872213de88',
//         groupId: 'C63a74566bf634d03237d5e258dbafafa',
//         type: 'group'
//       },
//       timestamp: 1612033146871,
//       mode: 'active',
//       message: { type: 'text', id: '13473537694048', text: 'test' }
//     }
//   ]}

// message: {
//     type: 'text',
//     id: '13473573524863',
//     text: '(emoji)',
//     emojis: [ [Object] ]
//   }

// message: {
//     type: 'image',
//     id: '13473546782335',
//     contentProvider: { type: 'line' }
//   }

// message: {
//     type: 'sticker',
//     id: '13473574960351',
//     stickerId: '297984151',
//     packageId: '11198372',
//     stickerResourceType: 'ANIMATION',
//     keywords: [ 'Bothered', 'Tears' ]
//   }
//#endregion

// request type   response type 
exports.messageGateWay = async function (res) {
    // get keyword by setting

    // apiType
    // console.log(res.body.destination);
    // res.body.events.type
    // console.log(res.body.events[0]);
    // const { type, replyToken, source, timestamp, mode, message } = res.body.events[0];
    if (res.body.events) {
        for await (item of res.events) {
            const result = await mongo.findOne(item.message.text)
            if (result) {
                //result.responseType = image || text 
                //result.content = pic,gif || string 
                await call(item.message.type, item.message.text);
            }
        }
    }
    //#region  keep
    // const res = await send(url, 'post', message, token);

    //(key, sheetName, querystr)
    //message 字串解析 !lunch 好吃的餐廳
    // const lunchList = await googlesheet.query('1qrbEupn1rN76Q4YCBXUSdeL_RPcRS2nH1Ddge9CbJ_A', googlesheetENUM.SHEET.Lunch, '1=1');
    // const messageSplit = message.split(',');

    // for await (item of lunchList) {

    //     // {
    //     //     id: '0',
    //     //     sheetName: 'linebotcommand',
    //     //     sheetKey: '1723231538',
    //     //     sheetToken: '1qrbEupn1rN76Q4YCBXUSdeL_RPcRS2nH1Ddge9CbJ_A'
    //     //   },
    //     //   {
    //     //     id: '1',
    //     //     sheetName: 'gif',
    //     //     sheetKey: '1346755700',
    //     //     sheetToken: '1qrbEupn1rN76Q4YCBXUSdeL_RPcRS2nH1Ddge9CbJ_A'
    //     //   },
    //     //   {
    //     //     id: '2',
    //     //     sheetName: 'ExchangeRate',
    //     //     sheetKey: '0',
    //     //     sheetToken: '1CSmEQ7ULXrkkqvgQzV_cUdutrPZon50wdRKkdEQZHfk'
    //     //   },
    //     //   {
    //     //     id: '3',
    //     //     sheetName: 'Lunch',
    //     //     sheetKey: '389418951',
    //     //     sheetToken: '1CSmEQ7ULXrkkqvgQzV_cUdutrPZon50wdRKkdEQZHfk'
    //     //   },
    //     //   {
    //     //     id: '4',
    //     //     sheetName: 'SpotifyList',
    //     //     sheetKey: '1645958512',
    //     //     sheetToken: '1CSmEQ7ULXrkkqvgQzV_cUdutrPZon50wdRKkdEQZHfk'
    //     //   }

    // }


    // console.log(lunchList);

    // console.log(res.body.events);
    // for await (item of res.events) {
    //     switch (item) {
    //         case lineENUM.APITYPES.REPLY:
    //             await Message(rs.replyToken, rs.message.text);
    //             break;
    //         case lineENUM.APITYPES.MULTICAST:
    //             break;
    //     }
    // }
    //#endregion 
}

//package
const lineMessageStrategies = {
    'TEXT': (message) => {
        return;
    },
    'A': (message) => {
        return lineENUM.MESSAGETYPES.IMAGE;
    },
    'B': (message) => {
        return lineENUM.MESSAGETYPES.VIDEO;
    }
};

// usage
const call = async (messageType, message) => {
    return lineMessageStrategies[messageType](message);
};


exports.Message = async function () {
    const url = basicUrl + `reply`;
    const res = await send(url, 'post', message, lineToken);
}
exports.reply = async function () {
    const url = basicUrl + `reply`;
    const res = await send(url, 'post', message, lineToken);
}

exports.multicast = async function () {
    const url = basicUrl + `multicast`;
    const res = await send(url, 'post', message, lineToken);
}

async function send(url, method, message, token) {
    const res = await axios({
        url,
        method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
        },
        params: { message },
    }).then((response) => {
        // console.log(response);
    }).catch(function (error) {
        // console.log(error);
    });
}


