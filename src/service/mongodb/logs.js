exports.actionLog = () => {
    return {
        account: '',
        type: '', //
        function:'', //
        time: ''
    };
};

exports.errorLog = () => {
    return {
        function: '', 
        cintent:'',
        time: ''
    };
};

const { mongo } = require('../share/database/databasepackage');


exports.getSystemLog = async () => {
    const result = mongo.find("SystemLog",{});
    return result;
}



exports.getUserLog = async () => {
    const result = mongo.find("UserLog",{});
    return result;
}

exports.logType = Object.freeze(
    {
        "1": "SystemLog",
        "2": "UserLog"
    }
);

const systemLog = {

}

const userLog = {
    
}

exports.addLog = async (logType,data) => {
    const result = mongo.insert(logType, data);
    return result;
}