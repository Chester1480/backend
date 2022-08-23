// const fastifyPlugin = require('fastify-plugin')

const mongoClient = require('mongodb').MongoClient;
const config = require('config');
const { v4 } = require('uuid');
const url = config.get('mongo').constring;
const dbName = config.get('mongo').dbName;

// documbet url :  https://www.w3schools.com/nodejs/nodejs_mongodb_join.asp

/**
 * 檢查 collection是否存在 不存在則建立
 * @param {*} collectionName 
 * @returns 
 */
exports.checkCollection = async function (collectionName) {


    const client = await mongoClient.connect(url, { useNewUrlParser: true }).catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    try {
        const db = client.db(dbName);
        db.listCollections({name: collName}).next(function(err, collinfo) {
            if (collinfo) {
                return true;
            }else{
                const result = db.createCollection(collectionName);
                return true;
            }
        });
    } catch (err) {

        console.log(err);
    } finally {

        client.close();
    }
}

// Sort ASC = 1 
// Sort Descending   = -1
// Limit the Result .limit(5)

exports.findOne = async function (collectionName, parameter) {

    const client = await mongoClient.connect(url, { useNewUrlParser: true }).catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    try {
        const db = client.db(dbName);
        let collection = db.collection(collectionName);
        // let query = { name: 'Volkswagen' }
        let query = parameter;
        let res = await collection.findOne(query);
        return res;
    } catch (err) {

        console.log(err);
    } finally {

        client.close();
    }


}

exports.findByStream = async function (collectionName, parameter, sortObject) {

    const client = await mongoClient.connect(url, { useNewUrlParser: true }).catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    try {

        const db = client.db(dbName);

        let collection = db.collection(collectionName);
        // let query = { name: 'Volkswagen' }
        let query = parameter;

        let stream = await collection.find(query).sort(sortObject).stream();

        stream.on("end", function(data) {
            const currentDoc = data;
            return currentDoc;
        });
        
        stream.on("error", function(error) {
            console.error("STREAM ERROR::", error.stack);
        });

        stream.on("end", function() {
            client.close(); 
        });
          
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

exports.find = async function (collectionName, parameter, sortObject) {

    const client = await mongoClient.connect(url, { useNewUrlParser: true }).catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    try {

        const db = client.db(dbName);

        let collection = db.collection(collectionName);
        // let query = { name: 'Volkswagen' }
        let query = parameter;

        let res = await collection.find(query).sort(sortObject).toArray();
        return res;
    } catch (err) {

        console.log(err);
    } finally {

        client.close();
    }


}

exports.finByPagination = async (collectionName, parameter,page,sortObject) => {
    const client = await mongoClient.connect(url, { useNewUrlParser: true }).catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    const { 
        pageIndex,
        pageSize,
    } = page;

    const offset = pageSize * (pageIndex - 1)

    try { 
        const db = client.db(dbName);
        let collection = db.collection(collectionName);
        let query = parameter;
        let totalCount = await collection
            .find(query).count();
        let data = await collection
            .find(query)
            .sort(sortObject)
            .skip(offset)
            .limit(pageSize)
            .toArray();
        
        return {
            page: {
                pageIndex,
                pageSize,
                totalCount
            },
            data
        };

    } catch (err) {
        console.log(err)
    }
}

exports.insert = async function (collectionName, data) {

    data.forEach(function (part, index, theArray) {
        theArray[index]._id = v4();
    });

    const client = await mongoClient.connect(url, { useNewUrlParser: true }).catch(err => { console.log(err); });

    if (!client) {
        return;
    }
    try {
        const db = client.db(dbName);
        let collection = db.collection(collectionName);
        let res = await collection.insertMany(data);
        return res;
    } catch (err) {

        console.log(err);
    } finally {
        client.close();
    }

}

exports.update = async function (collectionName, query, updateData) {

    const client = await mongoClient.connect(url, { useNewUrlParser: true }).catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    try {
        const db = client.db(dbName);
        let collection = db.collection(collectionName);
        let res = await collection.updateOne(query, updateData, { upsert: true });
        return res;
    } catch (err) {

        console.log(err);
    } finally {
        client.close();
    }

}

exports.deleteOne = async function (collectionName, data) {
    const client = await mongoClient.connect(url, { useNewUrlParser: true }).catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    try {
        const db = client.db(dbName);
        let collection = db.collection(collectionName);
        let res = await collection.deleteOne(data);
        return res;
    } catch (err) {

        console.log(err);
    } finally {
        client.close();
    }

}
exports.deleteMany = async function (collectionName, data) {
    const client = await mongoClient.connect(url, { useNewUrlParser: true }).catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    try {
        const db = client.db(dbName);
        let collection = db.collection(collectionName);
        let res = await collection.deleteMany(data);
        return res;
    } catch (err) {

        console.log(err);
    } finally {
        client.close();
    }

}