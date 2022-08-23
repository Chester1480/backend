const mongoose = require('mongoose');
const config = require('config');

// const con = await mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
// // ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ•̫͡•ʕ•̫͡•ʔ•̫͡•ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ


const connect = async () => {
    const conn = mongoose.createConnection(config.get('mongo').constring + config.get('mongo').dbName);
}

exports.buildSchema = async function (paramets) {
    const Schema = mongoose.Schema;
    return new Schema(paramets);
}

exports.create = async function (collecttionName,parameters) { 
    const MyModel = mongoose.model('ModelName', schema);
    const m = new MyModel;
}

exports.find = async function (collecttionName, parameters) { 
    const MyModel = mongoose.model(collecttionName);
    const instance = await MyModel.find(parameters);
    return instance;
}

exports.findOne = async function (collecttionName,parameters) { 
    const MyModel = mongoose.model(collecttionName);
    const instance = await MyModel.findOne(parameters);
    return instance;
}


// exports.select = async function (tableName, parameter) {
//     let schema = new mongoose.Schema({
//     });
//     const Kitten = mongoose.model('Kitten', kittySchema);
//     const silence = new Kitten({ name: 'Silence' });

//     if (parameter) {
//         return await knex.select('*').from(tableName).where(parameter);
//     } else {
//         return await knex.select('*').from(tableName);
//     }

// }