const fastStringify = require('fast-json-stable-stringify');

module.exports.stringify = async function (str) {
    return fastStringify(str);
}

module.exports.isJSON = async function (str) {
    if (typeof str == 'string') {
        try {
            JSON.parse(str);
            return true;
        } catch(e) {
            return false;
        }
    }
}