const cheerio = require('cheerio');
const request = require('request');
const axios = require('axios');
const utils = require('../../share/lib/utils');


exports.twseStock = async function (stockId) {
    const basicUrl = 'https://www.twse.com.tw/zh/' + stockId;
    request(basicUrl, function (err, resp, html) {
        if (!err) {
            const $ = cheerio.load(html);
            console.log(html);
        }
    });
}

exports.yahooStock = async function (stockId, params) {
    // site = "https://query1.finance.yahoo.com/v8/finance/chart/2330.TW?period1=0&period2=1549258857&interval=1d&events=history&=hP2rOschxO0"
    // if (!utils.isNumber(stockId)) {
    //     return "目前還沒支援中文搜尋 請輸入代號";
    // }
    // const jpyStock = new Set([
    //     "3293"
    // ]);
    let currency = "TW";
    // if (jpyStock.has(stockId)) {
    //     currency = "JP"; 
    // }
    const apiUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/' + stockId + '.' + currency;
    const result = await axios.get(apiUrl, { params })
    return result;
}

exports.marketwatch = async function (stockId, params) {
    let currency = "TW";
    const apiUrl = 'https://www.marketwatch.com/investing/fund/' + stockId + '?countryCode=' + currency;
    const result = await axios.get(apiUrl, { params })
    // const $ = cheerio.load(result);
    // console.log($);
    request(apiUrl, function (err, resp, html) {
        if (!err) {
            let price = [];
            const $ = cheerio.load(html);
            $('h3.intraday__price ').each(function (i, elem) {
                console.log(elem.text());
            });
            // let stockString = '股票代號: ' + meta.symbol + ' 開盤價: ' + await utils.ceil(indicators.quote[0].open[0], 0) + " ";
            // stockString += '開盤價: ' + await utils.ceil(indicators.quote[0].close[0], 0) + " ";
            // stockString += '最高價: ' + await utils.ceil(indicators.quote[0].high[0], 0) + " ";
            // stockString += '最低價: ' + await utils.ceil(indicators.quote[0].low[0], 0) + " ";
            // //  成交 
            // stockString += '均價: ' + await utils.ceil(meta.regularMarketPrice, 0) + " ";

            // console.log(html);
        }
    });
    return '';
}


exports.tradingeconomicsStock = async function (stockId) {
    const basicUrl = 'https://tradingeconomics.com/taiwan/stock-market' + stockId;
    request(basicUrl, function (err, resp, html) {
        if (!err) {
            const $ = cheerio.load(html);
            console.log(html);
        }
    });
}



