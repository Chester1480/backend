'use strict'
// knex文件網址: http://knexjs.org/

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '192.168.1.55',
        user: 'theonehasad',
        password: 'qazwsxedc',
        database: 'dothebase',
        port: 3306
    }
});

exports.select = async function (tableName, parameter) {

    if (parameter) {
        return await knex.select('*').from(tableName).where(parameter);
    } else {
        return await knex.select('*').from(tableName);
    }

}

exports.selectColumn = async function (column, tableName, parameter) {

    if (parameter) {
        return null;
    }
    return await knex.select(column).from(tableName).where(parameter);

}

exports.selectByQuery = async function (sql, parameter) {
    const result = await knex.raw(sql, parameter);
    return result;
}
exports.insert = async function (tableName, data) {
    const result = knex(tableName).insert(data);
    return result;
}
exports.update = async function (tableName, parameter, data) {
    const result = await knex(tableName).where(parameter).update(data);
    return result;
}
exports.delete = async function (tableName, parameter) {
    const result = knex(tableName).where(parameter).del();
    return result;
}



// const mariadb = require('mariadb');
// const pool = mariadb.createPool({ host: "HOST", user: "USER", password: "PASSWORD", port: 3308, database: "DATABASE", connectionLimit: 5 });
// let conn = await pool.getConnection();
// const result = await conn.query(sql);
// res.send(result);

// let conn = await pool.getConnection();
// const queryStream = conn.queryStream(sql);
// const ps = new stream.PassThrough();
// const transformStream = new stream.Transform({
//     objectMode: true,
//     transform: function transformer(chunk, encoding, callback) {
//         callback(null, JSON.stringify(chunk));
//     }
// });
// stream.pipeline(
//     queryStream,
//     transformStream,
//     ps,
//     (err) => {
//         if (err) {
//             console.log(err)
//             return res.sendStatus(400);
//         }
//     })
// ps.pipe(res);