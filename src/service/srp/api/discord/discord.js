const config = require('config');
// const mongo = require('../../share/database/mongo');
const { mongo , redis }  = require('../../../share/database/databasepackage')
const { Client, MessageEmbed } = require('discord.js');
const client = new Client({
    partials: ['MESSAGE']
});
const { utilsJs } = require('../../../share/lib/libpackage');
const stock = require('../../crawler/stock');

const prefix = '$';
const crudArray = [prefix + 'add', prefix + 'update', prefix + 'delete'];
const crudChArray = [prefix + '新增', prefix + '修改', prefix + '刪除'];
//固定指令
const fixedCommansSet = new Set([
    prefix + '股價',
    prefix + '指令',
    prefix + '新增內容',
    prefix + '增加內容',
    prefix + '吃啥',
    prefix + '新增',
    prefix + 'gif',
    // prefix + '修改',
    // prefix + '刪除',
    // prefix + 'help'
]);
const emoji = [':003:', ':004:', ':emote:'];
//const fruits = list.split(/[,;]/)

client.login(config.get('discord').TOKEN);
client.on("ready", async function () {
    console.log('discord bot login');
});
client.on("message", async function (message) {
    // const discordInterval = config.get('environment') + ':discordCache';
    // const channelID = message.channelID;
    if (message.author.bot) return;
    //#region 格式
    //client.user.username botname
    //message.channel.type //text
    //message.channel.id //'606494776275107843',
    //message.channel.name  //'大廳',
    //message.channel.parentID //'608977289941876756',


    //message.channel.guild:.Guild.id
    //message.channel.guild:.Guild.name
    //message.channel.guild:.Guild.name
    //message.channel.guild:.Guild.region //伺服器的地點
    //message.channel.guild:.Guild.systemChannelID
    //message.channel.guild:.Guild.ownerID

    //message.author.User.id
    //message.author.Userusername
    //message.createdTimestamp:
    //#endregion
    try {
        // message.channelID
        // 取得key的時間 if null 就是新的
        // 重新設定或是 直接設定
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.split(' ');
        //固定指令
        if (fixedCommansSet.has(args[0])) {
            // 吃啥
            if (args[0] === prefix + '吃啥') {
                const result = await selectEats();
                if (result) {
                    message.channel.send('吃' + result);
                } else {
                    message.channel.send('oops 有地方出錯了');
                }
                return;
            }
            // 解說功能
            if (args[0] === prefix + 'help') {
                let description = '指令呼叫 例如:$吃啥 $股價 中間不能有空格';
                const helpEmbed = new MessageEmbed()
                    .setTitle('說明').setColor(0xfffdd0).setDescription(description);
                // description += '\r '
                await message.channel.send(helpEmbed);
                return;
            }
            // 查詢股價
            if (args[0] === prefix + '股價') {
                if (!args[1]) {
                    await message.channel.send('代號是空的');
                    return;
                }
                const stockPrice = await queryStockById(args[1]);
                await message.channel.send(stockPrice);
                return;
            }
            //gif
            if (args[0] === prefix + 'gif') {
                return;
            }
            if (!message.guild) {
                if (args[0] === prefix + '指令') {
                    message.channel.send('可用指令列表:$股價 $吃啥');
                    return;
                }
                if (args[0] === prefix + '新增內容' || args[0] === prefix + '增加內容') {
                    message.channel.send('目前個人使用 無法新增內容');
                    return;
                }
                if (crudArray.includes(args[0]) || crudChArray.includes(args[0])) {
                    message.channel.send('目前個人使用 無法新增指令');
                    return;
                }
            }
            // 查詢現在有什麼指令
            if (args[0] === prefix + '指令') {
                const fixedCommands = '固定指令列表: ' + Array.from(fixedCommansSet);
                const result = await selectAllCommands();
                if (result) {
                    const allcommands = '自定義指令列表: ' + result;
                    message.channel.send(fixedCommands + "\r" + allcommands);
                } else {
                    message.channel.send(fixedCommands + '\r 目前沒有自定義指令列表');
                }
                return;
            }
            if (args[0] === prefix + '新增內容' || args[0] === prefix + '增加內容') {
                if (!args[1]) {
                    await message.channel.send('指令是空的');
                    return;
                }
                const exist = await mongo.findOne('command', { botType: 3, commandString: args[1].toLowerCase(), guildId: message.guild.id, active: 1 });
                if (!exist) {
                    await message.channel.send('指令不存在 是要新增什麼內容辣 哥');
                    return;
                }
                let correctCotent = '';
                correctCotent = args[2];
                if (args.length > 3) {
                    let stringCombine = JSON.parse(JSON.stringify(args));
                    stringCombine.shift();
                    stringCombine.shift();
                    correctCotent = stringCombine.join('');
                }
                if (correctCotent.length > 280) {
                    await message.channel.send('內容太長了,當論文期刊在寫喔 ' + emoji[0]);
                    return;
                }
                if (!correctCotent) {
                    await message.channel.send('內容是空的');
                    return;
                }
                const result = await addContent(message, args[1], correctCotent)
                await message.channel.send(result);
                return;
            }
            // 走這邊代表是 新修刪的指令
            if (crudArray.includes(args[0]) || crudChArray.includes(args[0])) {
                //args[0] 指令
                //args[1] 要輸入的指令
                //args[2] 內容
                const userCommand = args[0];
                const commandKey = args[1];
                const commandContent = args[2];
                let correctCotent = '';
                correctCotent = commandContent;

                if (args.length > 3) {
                    let stringCombine = JSON.parse(JSON.stringify(args));
                    stringCombine.shift();
                    stringCombine.shift();
                    correctCotent = stringCombine.join('');
                }
                if (!commandKey) {
                    await message.channel.send('指令是空的');
                    return;
                }
                //#region 刪除沒有 args[2]
                // if (userCommand === crudArray[2] || userCommand === crudChArray[2]) {
                //     let result = await mongo.findOne('command', { botType: 3, commandString: commandKey.toLowerCase(), guildId: message.guild.id, active: 1 });
                //     if (!result) {
                //         await message.channel.send('這個指令還未被使用');
                //         return;
                //     }
                //     await deleteCommand(commandKey.toLowerCase());
                //     await message.channel.send('刪除成功');
                //     await deleteTotalCommandKeys(commandKey.toLowerCase());
                //     return;
                // };
                //#endregion 
                if (!correctCotent) {
                    await message.channel.send('內容是空的');
                    return;
                }
                if (commandKey.length > 25) {
                    await message.channel.send('指令太長了,比台主的OO還長 我說的是手臂 ==');
                    return;
                }
                if (commandContent.length > 280) {
                    await message.channel.send('內容太長了,當論文期刊在寫喔 ' + emoji[0]);
                    return;
                }
                //新增 自訂義指令
                if (userCommand === crudArray[0] || userCommand === crudChArray[0]) {
                    let result = await mongo.findOne('command', { botType: 3, commandString: commandKey.toLowerCase(), guildId: message.guild.id, active: 1 });
                    if (fixedCommansSet.has(prefix + commandKey)) {
                        await message.channel.send('指令是固定指令 想想別的名稱吧');
                        return;
                    }
                    if (result) {
                        await message.channel.send('指令已被使用了 想想別的名稱吧');
                        return;
                    }

                    await addCommand(message, commandKey.toLowerCase(), correctCotent);
                    await message.channel.send('新增成功 ' + emoji[2]);
                    await addTotalCommandKeys(message, commandKey.toLowerCase());
                    return;
                };
                //修改 自訂義指令
                if (userCommand === crudArray[1] || userCommand === crudChArray[1]) {
                    // let result = await mongo.findOne('command', { botType: 3, commandString: commandKey.toLowerCase(), guildId: message.guild.id, active: 1 });
                    // if (!result) {
                    //     await message.channel.send('這個指令還未被使用');
                    //     return;
                    // }
                    // await updateCommand(result, commandContent);
                    // await message.channel.send('修改成功');
                    // return;
                    await message.channel.send('修啥 修肝辣');
                    return;
                };

            }
        } else {//使用者自訂義指令
            if (args[0] === prefix) {
                const tipMessage = ['$什麼 你沒給指令', '笑死 中間有空白484', 'ㄏ', '叫我幹嘛', '你沒給指令 我不能做事 ㄏ']
                const item = tipMessage[Math.floor(Math.random() * tipMessage.length)];
                await message.channel.send(item);
                return;
            }
            //查詢 資料庫 指令對應回傳的內容
            if (args[0].startsWith(prefix)) {
                if (!message.guild) {
                    await message.channel.send('自訂指令目前只讓群組使用 可使用【 $指令 】查詢 目前可用指令');
                    return;
                }
                const command = await mongo.findOne('command', { botType: 3, guildId: message.guild.id, commandString: args[0].substring(1).toLowerCase(), active: 1 });
                if (!command) {
                    await message.channel.send('指令不存在');
                    return;
                }
                if (command.content.length > 1) {
                    const result = command.content[Math.floor(Math.random() * command.content.length)];
                    await message.channel.send(result);
                } else {
                    await message.channel.send(command.content);
                }
                return;
            }
        }
    } catch (err) {
        await message.channel.send('突然感覺到頭一股暈眩~不好意思讓我休息一回');
        return;
    }
});
client.login(config.get('discord').TOKEN);

// 新增指令內容 
const addCommand = async (message, key, text) => {
    const { author, createdTimestamp, guild } = message;
    const textArray = text.split(' ');
    if (textArray.length > 1) {

    }
    const commad = {
        botType: 3,
        responType: 1,
        guildId: guild.id,
        userId: author.id,
        guild: { id: guild.id, name: guild.name },
        user: { id: author.id, name: author.username },
        commandString: key,
        content: [text],
        createdTimestamp,
        active: 1
    }
    result = await mongo.insert('command', [commad]);
    return result;
}
//修改指令內容
const updateCommand = async (command, text) => {
    const query = { commandString: command.commandString };
    const set = { $set: { content: [text] } };
    const result = await mongo.update('command', query, set);
    return result;
}
// 新增指令表陣列內的指令
const addTotalCommandKeys = async (message, key) => {
    let result = await mongo.findOne('guildCommmad', { commandString: '指令' });
    if (!result) {
        const totalCommandKeys = {
            botType: 3,
            responType: 1,
            guildId: message.guild.id,
            commandString: '指令',
            content: [key],
            createdTimestamp: Date.now(),
            active: 1
        }
        await mongo.insert('guildCommmad', [totalCommandKeys]);
        return;
    } else {
        result.content.push(key.toLowerCase());
        const query = { commandString: '指令' };
        const set = { $set: { content: result.content } };
        await mongo.update('guildCommmad', query, set);
        return;
    }
}
// 刪除指令
const deleteCommand = async (key) => {
    const result = await mongo.deleteOne('command', { commandString: key });
    return result;
}
// 刪除指令表陣列內的指令
const deleteTotalCommandKeys = async (key) => {
    let result = await mongo.findOne('command', { commandString: '指令' });
    let tmpSet = new Set([...result.content]);
    tmpSet.delete(key);
    result.content = Array.from(tmpSet);
    const query = { commandString: '指令' };
    const set = { $set: { content: result.content } };
    await mongo.update('command', query, set);
    return;
}
// 查詢指令表 顯示目前已存在的指令
const selectAllCommands = async () => {
    const result = await mongo.findOne('guildCommmad', { commandString: '指令' });
    if (result) {
        return result.content;
    } else {
        return null;
    }
}
// 查詢吃啥表
const selectEats = async () => {
    const result = await mongo.findOne('command', { commandString: '吃啥' });
    if (result) {
        const random = result.content[Math.floor(Math.random() * result.content.length)];
        return random;
    } else {
        const defaultEats = {
            botType: 3,
            responType: 1,
            guildId: 1,
            commandString: '吃啥',
            content: ['拉麵'],
            createdTimestamp: Date.now(),
            active: 1
        }
        const eat = await mongo.insert('command', [defaultEats]);
        return eat.content;
    }
}

const checkCommand = async (userId) => {
    let bool = false;
    const result = await mongo.findOne('command', { userId: userId });
    if (result) {
        bool = true;
    }
    return bool;
}
//查詢股價
const queryStockById = async (stockId) => {
    // const params = {
    //     period1: 0,
    //     period2: 1549258857,
    //     interval: '1d',
    //     events: history,
    //     '': 'hP2rOschxO0',
    // };
    const params = {};
    try {
        const result = await stock.yahooStock(stockId, params);
        const { meta, indicators } = result.data.chart.result[0];
        // meta.timestamp 時間 
        // resut.chart.result[0].meta.regularMarketPrice; //市價
        // resut.chart.result[0].meta.indicators
        let stockString = '股票代號: ' + meta.symbol + " ";
        stockString += '開盤價: ' + await utilsJs.ceil(indicators.quote[0].open[0], 2) + " ";
        stockString += '最高價: ' + await utilsJs.ceil(await utilsJs.max(indicators.quote[0].high), 2) + " ";
        stockString += '最低價: ' + await utilsJs.ceil(await utilsJs.min(indicators.quote[0].low), 2) + " ";
        stockString += '市價: ' + await utilsJs.ceil(meta.regularMarketPrice, 2);
        return stockString;
    } catch (err) {
        // console.log(err);
        // const result = await stock.marketwatch(stockId, params);
        // console.log(result);
        return '股票代號不存在';
    }
}
// 指令裡面加新內容 
const addContent = async (message, commandKey, content) => {
    let result = await mongo.findOne('command', { guildId: message.guild.id, commandString: commandKey.toLowerCase() });
    const contentSet = new Set(result.content);
    if (contentSet.has(content)) {
        return '內容重複了 ' + emoji[0];
    }
    if (result) {
        result.content.push(content);
        const query = { commandString: commandKey };
        const set = { $set: { content: result.content } };
        await mongo.update('command', query, set);
        return '新增成功 ' + emoji[2];
    } else {
        return '指令不存在';
    }
}
// 指令裡面加新內容 
const getGif = async () => {

}

// 查詢目前正在使用的bot的 channel
// async function selectChannel(guild) {
//     const result = await mongo.findOne('discordChannel', {});
// }
// // 查詢目前正在使用的bot的 channel
// async function insertChannel(guild) {
//     const result = await mongo.insert('discordChannel', {});
// }