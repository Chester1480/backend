const qrCode = require('qrcode')

// doc:https://www.npmjs.com/package/qrcode
exports.generateQR = async (text) => {
    const segs = [
        { data: 'ABCDEFG', mode: 'alphanumeric' },
        { data: '0123456', mode: 'numeric' }
    ]
    try {
        return await qrCode.toDataURL(segs);
    } catch (err) {
        console.error(err)
    }
};
