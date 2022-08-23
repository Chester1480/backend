const config = require('config');
const apikey = config.get('gifphy').apikey;

const giphy = require('giphy-api');
const axios = require('axios');

const type = {
    trending: "trending",
    search: "search",
    translate: "translate",
    random: "random"
}

const limitSet = [1, 5, 10, 20, 50];//筆數
const offsetSet = [1, 5, 10, 20];//頁數
//圖片分級
const ratingSet = {
    g: "g",
    pg: "pg",
    pg13: "pg13",
    r: "r"
}

// # https://developers.giphy.com/docs/optional-settings/#rating
//Content Rating g ,pg ,pg13 ,r

/**
 * 
 * @param  { limit, offset, rating , imageType } parameter 
 */
exports.getTrending = async (params, imageType) => {
    const url = config.get('gifphy.' + imageType) + type.trending;
    params.api_key = apikey;
    if (!limit) {
        params.limit = limitSet[0];
    }
    if (!offset) {
        params.offset = offsetSet[0];
    }
    if (!rating) {
        params.rating = ratingSet.g;
    }
    const result = await axios.get(url, { params });
    return result;
}

exports.search = async (params, imageType) => {
    const url = config.get('gifphy.' + imageType) + type.search;
    params.api_key = apikey;
    if (!limit) {
        params.limit = limitSet[0];
    }
    if (!q) {
        return "";
    };

    if (!offset) {
        params.offset = offsetSet[0];
    }
    if (!rating) {
        params.rating = ratingSet.g;
    }
    const result = await axios.get(url, { params }).catch((err) => {
        console.log(err);
    });
    return result.data;
}

exports.getGifById = async (gifId) => {
    const url = config.get('gifphy');
    params.api_key = apikey;
    if (!limit) {
        params.limit = limitSet[0];
    }
    if (!gifId) {
        return;
    }
    if (!offset) {
        params.offset = offsetSet[0];
    }
    if (!rating) {
        params.rating = ratingSet.g;
    }
    const result = await axios.get(url, { params }).catch((err) => {
        console.log(err);
    });

    return result.data;
}

exports.getGifById = async (gifIds) => {
    const url = config.get('gifphy');
    params.api_key = apikey;
    if (!limit) {
        params.limit = limitSet[0];
    }
    if (!gifIds) {
        return;
    }
    if (!offset) {
        params.offset = offsetSet[0];
    }
    if (!rating) {
        params.rating = ratingSet.g;
    }
    const result = await axios.get(url, { params }).catch((err) => {
        console.log(err);
    });

    return result.data;
}
exports.translate = async (gifId) => {
    const url = config.get('gifphy.' + imageType) + type.search;
    if (!limit) {
        params.limit = limitSet[0];
    }
    if (!gifId) {
        return;
    }
    if (!offset) {
        params.offset = offsetSet[0];
    }
    if (!rating) {
        params.rating = ratingSet.g;
    }
    const result = await axios.get(url, { params }).catch((err) => {
        console.log(err);
    });

    return result.data;
}
exports.random = async (params) => {
    const url = config.get('gifphy.' + imageType) + type.search;
    if (!limit) {
        params.limit = limitSet[0];
    }
    if (!gifIds) {
        return;
    }
    if (!offset) {
        params.offset = offsetSet[0];
    }
    if (!rating) {
        params.rating = ratingSet.g;
    }
    const result = await axios.get(url, { params }).catch((err) => {
        console.log(err);
    });

    return result.data;
}