const cheerio = require('cheerio');
exports.load = async (html) =>{
    var result = cheerio.load(html);
    return result;
}