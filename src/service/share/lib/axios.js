const axios = require('axios');

exports.get = async function (url, data) {

    const result = await axios({
        method: 'get',
        url,
        data
    }).then(function (response) {
        // handle success
        // console.log(response);
    })
    return result;
}

exports.post = async function (url,data) {
    const result = await axios({
        method: 'post',
        url,
        data
    }).then(function (response) {
        // handle success
        // console.log(response);
    })
    return result;
}