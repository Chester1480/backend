async function connect(dbname){

    const database = openDB(dbname, 1, {
        // 新建/更新資料庫版本時執行此段程式
        upgrade(db) {
          // objectStoreNames是所有資料表名稱的集合 .contains() 可以確定資料表是否存在
          if (!db.objectStoreNames.contains("sheet")) {
            // 建立名為sheet的資料表，並設定 id 為key，
            // 回傳的IDBObjectStore物件可以處理索引
            // 注意資料的id不可以重複
            const store = db.createObjectStore("sheet", { keyPath: "id" });
            // 幫資料表建立索引 store.createIndex(<欄位名稱:str>, <索引名稱:str>)
            // 注意：只有前面設定的keyPath及被索引的欄位才能被檢索，並沒有類似SQL模糊搜尋
            store.createIndex('date', 'date');
          }
        }
      });
}

async function createDB (dbname,tableName){
    return new Promise( async (resolve,reject) => {
        let dbPromise = await idb.open(dbname, 1, upgradeDB => {
            upgradeDB.createObjectStore(tableName)
        })
        resolve(dbPromise);
    });
}
//return newPromise((resolve,reject) => {

//id 只要對到 就可以修改數據 沒有數據存在則會是新增
async function readwrite(dbname,tableName,cacheData){
    let db = await idb.open(dbname, 1);
    const tx = await db.transaction(tableName, 'readwrite')
    //sample { firstname: 'John', lastname: 'Doe', age: 33 }
    await store.put(cacheData)
    await tx.complete
    db.close()
}

async function clearData(dbname){
    let db = await idb.open(dbname, 1);
    dbPromise.then(db => {
        const tx = db.transaction(dbname, 'readwrite')
        tx.objectStore(dbname).clear()
        return tx.complete
    })
}

async function getAllData(dbname,tableName){
    let db = await idb.open(dbname, 1);
    let data = db.transaction(tableName, 'readonly').objectStore(tableName).getAll()
    db.close()
    return data;
}

async function getByKey(dbname,tableName,id){
    let db = await idb.open(dbname, 1);
    let data = db.transaction(tableName).objectStore(tableName).get(id)
    return data;
}

async function getAllKeys(dbname,tableName){
    let db = await idb.open(dbname, 1);
    let data = db.transaction(tableName,).objectStore(tableName).getAllKeys()
    return data;
}

async function getAllCounts(dbname,tableName){
    let db = await idb.open(dbname, 1);
    let data = db.transaction(tableName,).objectStore(tableName).count()
    return data;
}