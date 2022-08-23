const { mongo } = require('../share/database/databasepackage');
const order = {
    _id,
    userId,//下單者
    products: [//品項細節
        product
    ],
    type, //訂單種類 0:商品 1:預訂
    isCancel,//是否取消
    isPay,//是否付款
    isChange,//是否修改過
    orderTime,
}

exports.getOrders = async () => {
    return await mongo.findByStream("order");
}
exports.getOrderById = async (orderId) => {
    return await mongo.findOne("order", { _id:orderId });
}

exports.cancelOrderById = async () => {
    return await mongo.update("order", { _id:orderId , isCancel : 1 });
}

exports.addOrder = async (orderData) => {
    return await mongo.insert("order",[orderData])
}

