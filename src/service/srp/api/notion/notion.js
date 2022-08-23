
const axios = require('../../share/system/axios')

let parameter = {
    databaseId: '',
    filter: {} ,
    sorts: [],
    startCursor: '',
    pageSize:1 
}

exports.queryDatabase = async (databaseId) => {

    const url = 'https://api.notion.com/v1/databases/' + databaseId + '/query';
        
    const res = await axios({
        url,
        method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
        },
        params: { message },
    }).then((response) => {
        // console.log(response);
    }).catch(function (error) {
        // console.log(error);
    });

    
   
}

exports.updateDatabase = async (databaseId) => {

    const url = 'https://api.notion.com/v1/databases/' + databaseId;
    
}

exports.listDatabase = async (databaseId) => {

    const url = 'https://api.notion.com/v1/databases';
    
}