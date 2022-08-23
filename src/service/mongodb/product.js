const { mongo } = require('../../share/database/databasepackage');

const product = {
    id,
    icon,
    name,
    discount,// 10 = 10%
    price,
    type,
    updateTime,
    creatTime,
}

//取得商品
exports.getProducts = async (parameters) => {
    return await mongo.findByStream("product", parameters);
}


exports.addProduct = async (productData) => {
    return await mongo.addProduct("product", [productData]);
}

//修改商品資訊
exports.updateProducts = async () => {
    return await mongo.findOne("product", { _id:orderId });
}
//刪除商品
exports.deleteProducts = async () => {
    
}