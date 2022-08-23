const { Sequelize } = require('sequelize');
const config = require('config');
const sequelize = new Sequelize(
    config.get('postgresql').database, 
    config.get('postgresql').user, 
    config.get('postgresql').password, 
    {
        host: config.get('postgresql').host,
        dialect: 'postgresql'
    }
);

const { Client } = require('pg')
const client = new Client(
  {
    user: config.get('postgresql').user,
    host: config.get('postgresql').host,
    database: config.get('postgresql').database,
    password: config.get('postgresql').password,
    port: config.get('postgresql').port,
  }
)

// Select * from public.customer
// Order By customerid
// LIMIT 5
// OFFSET 0;

async function define (tableName) {
    const table = sequelize.define(tableName);
    return table;
}

// exports.pageSetting = {
//     limit :null,
//     skip :null,
//     PAGE_SIZE :null,
//     page: null,
//     skip : (page - 1) * PAGE_SIZE
// };

exports.excute = async (sqlStr ,data) =>{

    const _client = await client.connect();

    if (typeof data === "function") {
        callback = data;
        data = "";
    }

    await client.query(exec_query, data, (err, res) => {
        if (err) return err;
        _client.release();
        callback(res);
    });
}


exports.findOne = async (tableName,parameters) =>{
    const table = await define(tableName);
    await sequelize.async().then(() => {
        table.findOne({
          where: parameters
        }).then(data => {
          console.log(data);
          return data;
        });
    });
}

exports.queryByPages = async (sqlStr,pageSetting) =>{
    // const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
    // const skip = parseInt(req.query.skip);
    // const PAGE_SIZE = 20;                       // Similar to 'limit'
    // const skip = (page - 1) * PAGE_SIZE;        // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
    const { page , size } = pageSetting;
    const result = await sequelize.query(sqlStr + ' LIMIT :page * :size, :size', {
        replacements: {
         page: page,
         size: size
        },
        type: 'SELECT'
    });
    return result;
}

exports.update = async (tableName , parameters , chageValue) =>{
    const table = await define(tableName);
    await sequelize.async().then(() => {
        table.findOne({
          where: parameters
        }).then(model => {
          // 在 () 裡面用 {} 大括號包住要更新的內容
          model.update(chageValue);
        }).then((data) => {
          console.log('update done!');
          return data;
        });
    });
}

exports.delete = async (tableName , parameters) =>{
    const table = await define(tableName);
    await sequelize.async().then(() => {
        table.findOne({
          where: parameters
        }).then(model => {
            model.destroy().then((data) => {
                console.log('destroy done!');
                return data;
            });
        });
    });
}

/**
 * 多筆寫入
 * @param { string } tableName 資料表名稱
 * @param { Array } data 陣列寫入的資料
 * @param { boolean } ignoreDuplicates 是否忽略重複
 * @returns 
 */
exports.bulkCreate = async (tableName,data ,ignoreDuplicates = true) => {
    const table = await define(tableName);
    const feeback = await table.bulkCreate(
        data,
        {
          ignoreDuplicates,
        }
    ).then(() => console.log("Users data have been saved"));
    return feeback;
}

/**
 * 需要匯出大量資料時使用(stream的原理為拉長執行時間 而不會記憶體崩潰)
 * @param {*} sqlstr 
 * @param {*} parameter 
 */
exports.exportData = async (sqlstr , parameter) => {
    const QueryStream = require('pg-query-stream');
    //https://www.npmjs.com/package/pg-query-stream
    pg.connect((err, client, done) => {
        if (err) throw err
        const query = new QueryStream(sqlstr,parameter)
        const stream = client.query(query)
        //release the client when the stream is finished
        stream.on('end', done)
        stream.pipe(JSONStream.stringify()).pipe(process.stdout)
    })
}



