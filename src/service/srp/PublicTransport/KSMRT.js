const config = require('config');
const { axios } = require('../../share/system/systempackage');


const get = async (top) =>  {
    const url = config.get('MRT').KSApiUrl;

    const data = {
        '$top':top,
        '$format':'JSON',
    }
    const result = await axios.get(url,data); 
    return result;
}

async function parseJson (string){
    const { } = JSON.parse(string);
}

export{ get }