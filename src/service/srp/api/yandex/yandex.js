const config = require('config');

/**
 * 
 * @param { text,lang } params 
 * @returns 
 */
exports.translate = async (params) => {
    //TODO 申請帳號
    params.key = "";
    params.text = "";
    params.lang = "";
    const result = await axios.get(url, { params });
    return result;
}