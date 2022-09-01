const moment = require('moment');

//是否為時間格式
exports.isDate = async (date) =>{
    const utc = moment(date, "YYYY-MM-DD",true);
    var isUTC = utc.isValid();
    return isUTC;
}

exports.isBetween = async (youDate,strDate,endDate) =>{
   return moment(youDate).isBetween(strDate, endDate);
}

//yourDate是否在theDate之前
exports.isBefore = async (yourDate,theDate) =>{
    return moment(yourDate).isBefore(theDate);
}

//yourDate是否在theDate之後
exports.isAfter = async (yourDate,theDate) =>{
    return moment(yourDate).isAfter(theDate);
}

//預設比較年分 year
exports.isSame = async (yourDate,diffDate,type='year') =>{
    return moment(yourDate).isSame(diffDate,type);
}

//#region 取得
exports.getNowTime = async (date) =>{
    return moment().format('YYYY-MM-DD hh:mm:ss');
}

exports.getThisYear= async () =>{
    return moment().format('YYYY');
}
exports.getThisMonth = async () =>{
    return moment().format('MM');
}
exports.getThisDay = async () =>{
    return moment().format('DD');
}
exports.getThisTimestamp = async () =>{
    return moment().format('X');
}
//#endregion

//#region 計算

exports.seconds = async (strDate,endDate) =>{
    return diff(strDate,endDate,'seconds');
}

exports.minutes = async (strDate,endDate) =>{
    return diff(strDate,endDate,'minutes');
}

exports.hours = async (strDate,endDate) =>{
    return diff(strDate,endDate,'hours');
}

exports.days = async (strDate,endDate) =>{
   return diff(strDate,endDate,'days');
}

exports.months = async (strDate,endDate) =>{
    return diff(strDate,endDate,'months');
}

exports.years = async (strDate,endDate) =>{
    return diff(strDate,endDate,'years');
}


const diff = async (strDate,endDate,type) =>{
    const sDate = moment(strDate);
    const eDate = moment(endDate);
    return eDate.diff(strDate, type);
}
//#endregion